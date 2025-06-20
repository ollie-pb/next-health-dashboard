import React, { useState, useEffect } from 'react';
import type { HealthScore, Component, Biomarker } from '../types';
import { DashboardLayout } from '../design-system/layouts/DashboardLayout';
import { Grid, GridItem } from '../design-system/layouts/Grid';
import { Section } from '../design-system/layouts/Section';
import { ScoreCard } from '../design-system/molecules/ScoreCard';
import { Chart } from '../design-system/molecules/Chart';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { Loading } from '../design-system/atoms/Loading';
import { Navigation } from '../design-system/molecules/Navigation';
import { cn } from '../design-system/utils/cn';

interface EnhancedBiomarkersViewProps {
  score: HealthScore;
  component: Component;
  onBackToComponents?: () => void;
  onBackToDashboard?: () => void;
}

export const EnhancedBiomarkersView: React.FC<EnhancedBiomarkersViewProps> = ({ 
  score, 
  component,
  onBackToComponents,
  onBackToDashboard
}) => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Navigation items
  const sidebarItems = [
    { label: 'Overview', icon: 'heart' as const, onClick: onBackToDashboard },
    { label: 'Health Scores', icon: 'activity' as const, onClick: onBackToDashboard },
    { label: 'Components', icon: 'pulse' as const, onClick: onBackToComponents },
    { label: 'Biomarkers', active: true, icon: 'barChart' as const, href: '#' },
    { label: 'Lab Results', icon: 'check' as const, badge: '8', href: '#' },
    { label: 'Trends', icon: 'trendingUp' as const, href: '#' },
    { label: 'Goals', icon: 'settings' as const, href: '#' },
  ];

  const breadcrumbs = [
    { label: 'Dashboard', icon: 'home' as const, onClick: onBackToDashboard },
    { label: score.name, icon: 'heart' as const, onClick: onBackToComponents },
    { label: component.name, onClick: onBackToComponents },
    { label: 'Biomarkers' },
  ];

  const viewTabs = [
    { label: 'List View', icon: 'menu' as const, active: viewMode === 'list', onClick: () => setViewMode('list') },
    { label: 'Graph View', icon: 'barChart' as const, active: viewMode === 'graph', onClick: () => setViewMode('graph') },
  ];

  // Categorize biomarkers
  const biomarkerCategories = ['all', ...new Set(component.biomarkers.map(b => b.category || 'general'))];
  const filteredBiomarkers = selectedCategory === 'all' 
    ? component.biomarkers 
    : component.biomarkers.filter(b => (b.category || 'general') === selectedCategory);

  // Calculate statistics
  const stats = {
    inRange: component.biomarkers.filter(b => 
      b.value >= b.referenceRange.min && b.value <= b.referenceRange.max
    ).length,
    outOfRange: component.biomarkers.filter(b => 
      b.value < b.referenceRange.min || b.value > b.referenceRange.max
    ).length,
    improving: component.biomarkers.filter(b => (b.trend || 0) > 0).length,
    withTimeline: component.biomarkers.filter(b => 
      b.dataPoints && b.dataPoints.length > 0
    ).length,
  };

  // Generate chart data for biomarkers with timeline data
  const chartBiomarkers = component.biomarkers.filter(b => 
    b.dataPoints && b.dataPoints.length > 0
  );

  // Helper function to get biomarker status
  const getBiomarkerStatus = (biomarker: Biomarker) => {
    if (biomarker.value >= biomarker.referenceRange.min && biomarker.value <= biomarker.referenceRange.max) {
      return 'optimal' as const;
    }
    if (biomarker.value < biomarker.referenceRange.min * 0.8 || biomarker.value > biomarker.referenceRange.max * 1.2) {
      return 'concern' as const;
    }
    return 'attention' as const;
  };

  // Helper function to format biomarker value
  const formatBiomarkerValue = (biomarker: Biomarker) => {
    return `${biomarker.value}${biomarker.unit ? ` ${biomarker.unit}` : ''}`;
  };

  return (
    <DashboardLayout
      title={`${component.name} Biomarkers`}
      subtitle={`${component.biomarkers.length} biomarkers • ${Math.round((stats.inRange / component.biomarkers.length) * 100)}% in range`}
      headerIcon="barChart"
      breadcrumbs={breadcrumbs}
      sidebarItems={sidebarItems}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      headerActions={
        <div className="flex items-center gap-3">
          <Badge 
            variant={component.value >= 80 ? 'optimal' : component.value >= 60 ? 'good' : component.value >= 40 ? 'attention' : 'concern'} 
            size="sm"
            className="animate-fade-in"
          >
            Component: {component.value}
          </Badge>
          <Button variant="primary" size="sm" className="animate-scale-in">
            <Icon name="calendar" size="sm" />
            Retest Biomarkers
          </Button>
        </div>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loading variant="heartbeat" size="xl" color="primary" />
            <Typography variant="body-md" color="muted" className="mt-4">
              Loading biomarker data...
            </Typography>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Component Summary */}
          <Section
            title="Component Overview"
            description="Your biomarkers contributing to this health component"
            icon="pulse"
            variant="card"
          >
            <Grid columns={4} gap={6}>
              <GridItem span={2}>
                <ScoreCard
                  title={component.name}
                  value={component.value}
                  trend={component.trend || 0}
                  lastUpdate="2 days ago"
                  status={component.value >= 80 ? 'optimal' : component.value >= 60 ? 'good' : component.value >= 40 ? 'attention' : 'concern'}
                  size="lg"
                  description={`Based on ${component.biomarkers.length} biomarkers`}
                />
              </GridItem>
              <GridItem>
                <div className="space-y-4">
                  {[
                    { label: 'In Range', value: stats.inRange, color: 'optimal' as const, icon: 'check' as const },
                    { label: 'Out of Range', value: stats.outOfRange, color: 'concern' as const, icon: 'alertTriangle' as const },
                    { label: 'Improving', value: stats.improving, color: 'good' as const, icon: 'trendingUp' as const },
                  ].map((stat, index) => (
                    <div 
                      key={stat.label}
                      className={cn(
                        'bg-white rounded-lg p-4 border border-neutral-200 animate-slide-in-up',
                        'hover:shadow-card-hover transition-all duration-300'
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Typography variant="heading-md" className="font-bold">
                            {stat.value}
                          </Typography>
                          <Typography variant="caption" color="muted">
                            {stat.label}
                          </Typography>
                        </div>
                        <Badge variant={stat.color} size="lg">
                          <Icon name={stat.icon} size="sm" />
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </GridItem>
              <GridItem>
                {chartBiomarkers.length > 0 ? (
                  <Chart
                    title="Trend Overview"
                    data={chartBiomarkers.slice(0, 6).map(b => ({
                      label: b.name.split(' ')[0],
                      value: b.value,
                      status: getBiomarkerStatus(b)
                    }))}
                    variant="line"
                    size="md"
                    showLegend
                  />
                ) : (
                  <div className="bg-neutral-50 rounded-lg p-6 text-center">
                    <Icon name="barChart" size="xl" color="muted" className="mb-2" />
                    <Typography variant="body-sm" color="muted">
                      No trend data available
                    </Typography>
                  </div>
                )}
              </GridItem>
            </Grid>
          </Section>

          {/* Biomarkers Section */}
          <Section
            title="Biomarkers"
            description="Detailed analysis of individual biomarkers"
            icon="barChart"
            variant="default"
            action={
              <div className="flex items-center gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-neutral-200 rounded-md bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {biomarkerCategories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <Navigation variant="pills" items={viewTabs} size="sm" />
              </div>
            }
          >
            {filteredBiomarkers.length > 0 ? (
              viewMode === 'list' ? (
                <div className="space-y-3">
                  {filteredBiomarkers.map((biomarker, index) => {
                    const status = getBiomarkerStatus(biomarker);
                    const isInRange = biomarker.value >= biomarker.referenceRange.min && biomarker.value <= biomarker.referenceRange.max;
                    
                    return (
                      <div
                        key={biomarker.id}
                        className={cn(
                          'bg-white rounded-lg p-6 border border-neutral-200',
                          'hover:shadow-card-hover transition-all duration-300',
                          'animate-slide-in-left'
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              'w-12 h-12 rounded-full flex items-center justify-center',
                              status === 'optimal' ? 'bg-optimal-100' :
                              status === 'attention' ? 'bg-attention-100' :
                              'bg-concern-100'
                            )}>
                              <Icon 
                                name="barChart"
                                size="md"
                                color={status === 'optimal' ? 'success' :
                                       status === 'attention' ? 'warning' :
                                       'danger'}
                              />
                            </div>
                            <div>
                              <Typography variant="heading-sm">{biomarker.name}</Typography>
                              <Typography variant="caption" color="muted">
                                Range: {biomarker.referenceRange.min} - {biomarker.referenceRange.max} {biomarker.unit}
                              </Typography>
                              {biomarker.category && (
                                <Badge variant="outline" size="xs" className="mt-1">
                                  {biomarker.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <Typography variant="heading-lg" className="font-bold">
                                {formatBiomarkerValue(biomarker)}
                              </Typography>
                              {biomarker.trend && biomarker.trend !== 0 && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Icon 
                                    name={biomarker.trend > 0 ? 'trendingUp' : 'trendingDown'} 
                                    size="sm" 
                                    color={biomarker.trend > 0 ? 'success' : 'danger'}
                                  />
                                  <Typography variant="caption" color="muted">
                                    {Math.abs(biomarker.trend || 0).toFixed(1)}%
                                  </Typography>
                                </div>
                              )}
                            </div>
                            <Badge 
                              variant={isInRange ? 'optimal' : 'concern'} 
                              size="sm"
                            >
                              {isInRange ? 'In Range' : 'Out of Range'}
                            </Badge>
                          </div>
                        </div>
                        
                        {biomarker.description && (
                          <div className="mt-4 pt-4 border-t border-neutral-100">
                            <Typography variant="body-sm" color="muted">
                              {biomarker.description}
                            </Typography>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-8">
                  {chartBiomarkers.length > 0 ? (
                    chartBiomarkers.map((biomarker, index) => (
                      <div
                        key={biomarker.id}
                        className={cn(
                          'bg-white rounded-lg p-6 border border-neutral-200 animate-scale-in'
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Typography variant="heading-sm">{biomarker.name}</Typography>
                            <Typography variant="caption" color="muted">
                              Current: {formatBiomarkerValue(biomarker)}
                            </Typography>
                          </div>
                          <Badge 
                            variant={getBiomarkerStatus(biomarker)} 
                            size="sm"
                          >
                            {getBiomarkerStatus(biomarker).charAt(0).toUpperCase() + getBiomarkerStatus(biomarker).slice(1)}
                          </Badge>
                        </div>
                        <Chart
                          title=""
                          data={biomarker.dataPoints?.map((point, i) => ({
                            label: `Day ${i + 1}`,
                            value: point.value,
                            status: point.value >= biomarker.referenceRange.min && point.value <= biomarker.referenceRange.max ? 'optimal' as const : 'concern' as const
                          })) || []}
                          variant="line"
                          size="lg"
                          showLegend={false}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center animate-fade-in">
                      <Icon name="barChart" size="3xl" color="muted" className="mb-4" />
                      <Typography variant="heading-md" className="mb-2">
                        No Timeline Data Available
                      </Typography>
                      <Typography variant="body-sm" color="muted" className="mb-6">
                        Charts will appear here once we have multiple data points for your biomarkers.
                      </Typography>
                      <Button variant="primary">
                        <Icon name="calendar" size="sm" />
                        Schedule Follow-up Test
                      </Button>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center animate-fade-in">
                <Icon name="barChart" size="3xl" color="muted" className="mb-4" />
                <Typography variant="heading-md" className="mb-2">
                  No Biomarkers in This Category
                </Typography>
                <Typography variant="body-sm" color="muted" className="mb-6">
                  Try selecting a different category or view all biomarkers.
                </Typography>
                <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                  View All Biomarkers
                </Button>
              </div>
            )}
          </Section>

          {/* Insights & Recommendations */}
          {component.biomarkers.length > 0 && (
            <Section
              title="Biomarker Insights"
              subtitle="Personalized recommendations based on your results"
              icon="brain"
              variant="card"
            >
              <div className="space-y-4">
                <div className={cn(
                  'bg-gradient-to-r from-optimal-50 to-optimal-100 border border-optimal-200 rounded-lg p-4',
                  'animate-slide-in-up flex items-start gap-3'
                )}>
                  <Icon name="check" color="success" className="mt-1" />
                  <div>
                    <Typography variant="body-md" weight="medium" className="text-optimal-900">
                      Optimal Results
                    </Typography>
                    <Typography variant="body-sm" className="text-optimal-700">
                      {stats.inRange} of your biomarkers are within optimal ranges. Excellent work maintaining your health!
                    </Typography>
                  </div>
                </div>

                {stats.outOfRange > 0 && (
                  <div className={cn(
                    'bg-gradient-to-r from-attention-50 to-attention-100 border border-attention-200 rounded-lg p-4',
                    'animate-slide-in-up flex items-start gap-3'
                  )} style={{ animationDelay: '150ms' }}>
                    <Icon name="alertTriangle" color="warning" className="mt-1" />
                    <div>
                      <Typography variant="body-md" weight="medium" className="text-attention-900">
                        Areas for Attention
                      </Typography>
                      <Typography variant="body-sm" className="text-attention-700">
                        {stats.outOfRange} biomarkers are outside optimal ranges. Consider consulting with your healthcare provider.
                      </Typography>
                    </div>
                  </div>
                )}

                <div className={cn(
                  'bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-4',
                  'animate-slide-in-up flex items-start gap-3'
                )} style={{ animationDelay: '300ms' }}>
                  <Icon name="trendingUp" color="primary" className="mt-1" />
                  <div>
                    <Typography variant="body-md" weight="medium" className="text-primary-900">
                      Continue Monitoring
                    </Typography>
                    <Typography variant="body-sm" className="text-primary-700">
                      Regular testing helps track progress and optimize your health interventions.
                    </Typography>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Quick Actions */}
          <div className={cn(
            'bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6',
            'animate-slide-in-up flex items-center justify-between'
          )}>
            <div className="flex items-center gap-3">
              <Loading variant="pulse" size="sm" color="primary" />
              <div>
                <Typography variant="body-md" weight="medium" className="text-primary-900">
                  Ready for your next biomarker panel?
                </Typography>
                <Typography variant="caption" className="text-primary-700">
                  Track changes and optimize your {component.name.toLowerCase()} health
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-primary-300 text-primary-700 hover:bg-primary-50">
                View History
              </Button>
              <Button variant="primary" size="sm">
                Schedule Retest
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};