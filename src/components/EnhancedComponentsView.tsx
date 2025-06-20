import React, { useState, useEffect } from 'react';
import type { HealthScore, Component } from '../types';
import { DashboardLayout } from '../design-system/layouts/DashboardLayout';
import { Grid, GridItem } from '../design-system/layouts/Grid';
import { Section } from '../design-system/layouts/Section';
import { ScoreCard } from '../design-system/molecules/ScoreCard';
import { Chart } from '../design-system/molecules/Chart/Chart';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { Loading } from '../design-system/atoms/Loading';
import { Navigation } from '../design-system/molecules/Navigation';
import { cn } from '../design-system/utils/cn';

interface EnhancedComponentsViewProps {
  score: HealthScore;
  onComponentClick?: (component: Component) => void;
  onBackToDashboard?: () => void;
}

export const EnhancedComponentsView: React.FC<EnhancedComponentsViewProps> = ({ 
  score, 
  onComponentClick,
  onBackToDashboard
}) => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Navigation items
  const sidebarItems = [
    { label: 'Overview', icon: 'heart' as const, onClick: onBackToDashboard },
    { label: 'Health Scores', active: true, icon: 'activity' as const, href: '#' },
    { label: 'Biomarkers', icon: 'pulse' as const, badge: '75', href: '#' },
    { label: 'Lab Results', icon: 'barChart' as const, badge: '8', href: '#' },
    { label: 'Trends', icon: 'trendingUp' as const, href: '#' },
    { label: 'Goals', icon: 'check' as const, href: '#' },
    { label: 'Settings', icon: 'settings' as const, href: '#' },
  ];

  const breadcrumbs = [
    { label: 'Dashboard', icon: 'home' as const, onClick: onBackToDashboard },
    { label: 'Health Scores', icon: 'heart' as const, onClick: onBackToDashboard },
    { label: score.name },
  ];

  const viewTabs = [
    { label: 'Grid View', icon: 'menu' as const, active: viewMode === 'grid', onClick: () => setViewMode('grid') },
    { label: 'List View', icon: 'barChart' as const, active: viewMode === 'list', onClick: () => setViewMode('list') },
  ];

  // Calculate statistics
  const stats = {
    complete: score.components.filter(c => c.completionRate === 1.0).length,
    partial: score.components.filter(c => c.completionRate < 1.0 && c.completionRate > 0.5).length,
    limited: score.components.filter(c => c.completionRate <= 0.5).length,
    totalBiomarkers: score.components.reduce((sum, c) => sum + c.biomarkers.length, 0),
  };

  // Generate chart data from components
  const chartData = score.components.map(component => ({
    label: component.name.split(' ')[0], // Use first word for shorter labels
    value: component.value,
    status: component.value >= 80 ? 'optimal' as const :
            component.value >= 60 ? 'good' as const :
            component.value >= 40 ? 'attention' as const :
            'concern' as const
  }));

  // Sort components by completion rate and value
  const sortedComponents = [...score.components].sort((a, b) => {
    if (a.completionRate !== b.completionRate) {
      return b.completionRate - a.completionRate;
    }
    return b.value - a.value;
  });

  return (
    <DashboardLayout
      title={`${score.name} Components`}
      subtitle={`${score.components.length} components • ${Math.round((stats.complete / score.components.length) * 100)}% complete`}
      headerIcon="activity"
      breadcrumbs={breadcrumbs}
      sidebarItems={sidebarItems}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      headerActions={
        <div className="flex items-center gap-3">
          <Badge 
            variant={score.status === 'no-data' ? 'outline' : score.status} 
            size="sm"
            className="animate-fade-in"
          >
            Score: {score.value}
          </Badge>
          <Button variant="primary" size="sm" className="animate-scale-in">
            <Icon name="calendar" size="sm" />
            Schedule Test
          </Button>
        </div>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loading variant="heartbeat" size="xl" color="primary" />
            <Typography variant="body-md" color="muted" className="mt-4">
              Loading component data...
            </Typography>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Overall Score Summary */}
          <Section
            title="Overall Score"
            description="Your comprehensive health metric based on all components"
            icon="heart"
            variant="card"
          >
            <Grid columns={4} gap={6}>
              <GridItem span={2}>
                <ScoreCard
                  title={score.name}
                  value={score.value}
                  trend={score.trend}
                  lastUpdate={score.lastUpdate}
                  status={score.status}
                  size="lg"
                  description={`Based on ${score.components.length} components`}
                />
              </GridItem>
              <GridItem>
                <Chart
                  title="Component Breakdown"
                  data={chartData.slice(0, 6)} // Show top 6 components
                  variant="bar"
                  size="md"
                  showLegend
                />
              </GridItem>
              <GridItem>
                <div className="space-y-4">
                  {[
                    { label: 'Complete', value: stats.complete, color: 'optimal' as const, icon: 'check' as const },
                    { label: 'Partial', value: stats.partial, color: 'attention' as const, icon: 'clock' as const },
                    { label: 'Limited', value: stats.limited, color: 'concern' as const, icon: 'alertTriangle' as const },
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
            </Grid>
          </Section>

          {/* Components Section */}
          <Section
            title="Components"
            description="Click on any component to view detailed biomarkers and analysis"
            icon="pulse"
            variant="default"
            action={
              <Navigation variant="pills" items={viewTabs} size="sm" />
            }
          >
            {score.components.length > 0 ? (
              viewMode === 'grid' ? (
                <Grid columns="auto" gap={6}>
                  {sortedComponents.map((component, index) => (
                    <GridItem key={component.id}>
                      <div
                        className={cn(
                          'animate-scale-in cursor-pointer transition-all duration-300',
                          'hover:scale-[1.02] active:scale-[0.98]'
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => onComponentClick?.(component)}
                      >
                        <ScoreCard
                          title={component.name}
                          value={component.value}
                          trend={component.trend || 0}
                          icon="pulse"
                          description={`${component.biomarkers.length} biomarkers • ${Math.round(component.completionRate * 100)}% complete`}
                          interactive
                          status={component.value >= 80 ? 'optimal' :
                                 component.value >= 60 ? 'good' :
                                 component.value >= 40 ? 'attention' :
                                 'concern'}
                        />
                      </div>
                    </GridItem>
                  ))}
                </Grid>
              ) : (
                <div className="space-y-3">
                  {sortedComponents.map((component, index) => (
                    <div
                      key={component.id}
                      className={cn(
                        'bg-white rounded-lg p-6 border border-neutral-200',
                        'hover:shadow-card-hover transition-all duration-300 cursor-pointer',
                        'animate-slide-in-left'
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => onComponentClick?.(component)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            'w-12 h-12 rounded-full flex items-center justify-center',
                            component.value >= 80 ? 'bg-optimal-100' :
                            component.value >= 60 ? 'bg-green-100' :
                            component.value >= 40 ? 'bg-attention-100' :
                            'bg-concern-100'
                          )}>
                            <Icon 
                              name="pulse"
                              size="md"
                              color={component.value >= 80 ? 'success' :
                                     component.value >= 60 ? 'success' :
                                     component.value >= 40 ? 'warning' :
                                     'danger'}
                            />
                          </div>
                          <div>
                            <Typography variant="heading-sm">{component.name}</Typography>
                            <Typography variant="caption" color="muted">
                              {component.biomarkers.length} biomarkers • {Math.round(component.completionRate * 100)}% complete
                            </Typography>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Typography variant="heading-lg" className="font-bold">
                            {component.value}
                          </Typography>
                          <Badge 
                            variant={component.completionRate === 1.0 ? 'optimal' : 
                                    component.completionRate > 0.5 ? 'attention' : 'concern'} 
                            size="sm"
                          >
                            {Math.round(component.completionRate * 100)}% data
                          </Badge>
                          <Icon name="chevronRight" size="sm" color="muted" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center animate-fade-in">
                <Icon name="pulse" size="3xl" color="muted" className="mb-4" />
                <Typography variant="heading-md" className="mb-2">
                  No Components Available
                </Typography>
                <Typography variant="body-sm" color="muted" className="mb-6">
                  We haven't collected any {score.name.toLowerCase()} data yet. Schedule your first assessment to start tracking this important health metric.
                </Typography>
                <Button variant="primary">
                  <Icon name="calendar" size="sm" />
                  Schedule Assessment
                </Button>
              </div>
            )}
          </Section>

          {/* Insights & Recommendations */}
          {score.components.length > 0 && (
            <Section
              title="Health Insights"
              subtitle="Personalized recommendations based on your data"
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
                      Strong Performance
                    </Typography>
                    <Typography variant="body-sm" className="text-optimal-700">
                      {stats.complete} of your components are performing optimally. Keep up the excellent work!
                    </Typography>
                  </div>
                </div>

                {stats.partial > 0 && (
                  <div className={cn(
                    'bg-gradient-to-r from-attention-50 to-attention-100 border border-attention-200 rounded-lg p-4',
                    'animate-slide-in-up flex items-start gap-3'
                  )} style={{ animationDelay: '150ms' }}>
                    <Icon name="alertTriangle" color="warning" className="mt-1" />
                    <div>
                      <Typography variant="body-md" weight="medium" className="text-attention-900">
                        Areas for Improvement
                      </Typography>
                      <Typography variant="body-sm" className="text-attention-700">
                        {stats.partial} components have partial data. Consider additional testing for a complete picture.
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
                      Track Your Progress
                    </Typography>
                    <Typography variant="body-sm" className="text-primary-700">
                      Regular monitoring helps identify trends and optimize your health interventions.
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
                  Ready for your next assessment?
                </Typography>
                <Typography variant="caption" className="text-primary-700">
                  Stay on track with regular health monitoring
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-primary-300 text-primary-700 hover:bg-primary-50">
                View Schedule
              </Button>
              <Button variant="primary" size="sm">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};