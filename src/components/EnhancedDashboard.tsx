import React, { useState, useEffect } from 'react';
import type { HealthScore } from '../types';
import { AnimatedScoreCard } from '../design-system/molecules/AnimatedScoreCard';
import { DashboardLayout } from '../design-system/layouts/DashboardLayout';
import { Grid, GridItem } from '../design-system/layouts/Grid';
import { Section } from '../design-system/layouts/Section';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { Loading } from '../design-system/atoms/Loading';
import { Chart } from '../design-system/molecules/Chart';
import { Navigation } from '../design-system/molecules/Navigation';
import { HealthWheelVisualization } from './HealthWheelVisualization';
import { TimeIntervalSelector, type TimeInterval } from '../design-system/molecules/TimeIntervalSelector';
import { cn } from '../design-system/utils/cn';

interface EnhancedDashboardProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
}

export const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ scores, onScoreClick }) => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('grid');
  const [selectedTimeInterval, setSelectedTimeInterval] = useState('6m');

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Navigation items
  const sidebarItems = [
    { label: 'Overview', active: true, icon: 'heart' as const, href: '#' },
    { label: 'Health Scores', icon: 'activity' as const, badge: scores.length.toString(), href: '#' },
    { label: 'Biomarkers', icon: 'pulse' as const, badge: '75', href: '#' },
    { label: 'Lab Results', icon: 'barChart' as const, badge: '8', href: '#' },
    { label: 'Trends', icon: 'trendingUp' as const, href: '#' },
    { label: 'Goals', icon: 'check' as const, href: '#' },
    { label: 'Appointments', icon: 'calendar' as const, badge: '2', href: '#' },
    { label: 'Settings', icon: 'settings' as const, href: '#' },
  ];

  const breadcrumbs = [
    { label: 'Dashboard', icon: 'home' as const, href: '#' },
    { label: 'Health Overview' },
  ];

  const viewTabs = [
    { label: 'Grid View', icon: 'menu' as const, active: activeView === 'grid', onClick: () => setActiveView('grid') },
    { label: 'List View', icon: 'barChart' as const, active: activeView === 'list', onClick: () => setActiveView('list') },
    { label: 'Wheel View', icon: 'heart' as const, active: activeView === 'wheel', onClick: () => setActiveView('wheel') },
  ];

  // Time interval options
  const timeIntervals: TimeInterval[] = [
    { label: '1M', value: '1m', months: 1 },
    { label: '3M', value: '3m', months: 3 },
    { label: '6M', value: '6m', months: 6 },
    { label: '12M', value: '12m', months: 12 },
    { label: '18M', value: '18m', months: 18 },
    { label: '3Y', value: '3y', months: 36 },
    { label: 'All', value: 'all', months: undefined },
  ];

  // Calculate statistics
  const stats = {
    optimal: scores.filter(s => s.status === 'optimal').length,
    good: scores.filter(s => s.status === 'good').length,
    attention: scores.filter(s => s.status === 'attention').length,
    concern: scores.filter(s => s.status === 'concern').length,
  };

  const overallScore = Math.round(
    scores.reduce((acc, score) => acc + score.value, 0) / scores.length
  );

  // Generate chart data based on selected time interval
  const generateChartData = () => {
    const interval = timeIntervals.find(t => t.value === selectedTimeInterval);
    const months = interval?.months || 120; // Default to 10 years for "All"
    
    // This is sample data - in real app, would fetch based on time range
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    
    if (months <= 6) {
      // For short intervals, show monthly data
      for (let i = months; i > 0; i--) {
        const value = Math.round(overallScore - (i * 2) + Math.random() * 10);
        data.push({
          label: monthLabels[(12 - i) % 12],
          value: Math.max(50, Math.min(100, value)),
          status: value >= 80 ? 'optimal' as const : value >= 60 ? 'good' as const : 'attention' as const
        });
      }
    } else if (months <= 18) {
      // For medium intervals, show bi-monthly data
      for (let i = 0; i < months; i += 2) {
        const value = Math.round(overallScore - ((months - i) * 1.5) + Math.random() * 10);
        data.push({
          label: monthLabels[i % 12],
          value: Math.max(50, Math.min(100, value)),
          status: value >= 80 ? 'optimal' as const : value >= 60 ? 'good' as const : 'attention' as const
        });
      }
    } else {
      // For long intervals, show quarterly data
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      const yearsToShow = Math.min(Math.ceil(months / 12), 5);
      for (let year = yearsToShow; year > 0; year--) {
        for (let q = 0; q < 4; q++) {
          const value = Math.round(overallScore - (year * 3) + (q * 2) + Math.random() * 10);
          data.push({
            label: year === 1 ? quarters[q] : `${quarters[q]}'${24 - year}`,
            value: Math.max(50, Math.min(100, value)),
            status: value >= 80 ? 'optimal' as const : value >= 60 ? 'good' as const : 'attention' as const
          });
        }
      }
    }
    
    // Add current value as the last point
    data.push({
      label: 'Now',
      value: overallScore,
      status: overallScore >= 80 ? 'optimal' as const : overallScore >= 60 ? 'good' as const : 'attention' as const
    });
    
    return data;
  };

  const chartData = generateChartData();

  return (
    <DashboardLayout
      title="Personal Health Dashboard"
      subtitle="Your comprehensive wellness overview"
      headerIcon="heart"
      breadcrumbs={breadcrumbs}
      sidebarItems={sidebarItems}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      headerActions={
        <div className="flex items-center gap-3">
          <Badge 
            variant={overallScore >= 80 ? 'optimal' : overallScore >= 60 ? 'good' : 'attention'} 
            size="sm"
            className="animate-fade-in"
          >
            Overall Score: {overallScore}
          </Badge>
          <Button variant="primary" size="sm" className="animate-scale-in">
            <Icon name="calendar" size="sm" />
            Schedule Assessment
          </Button>
        </div>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loading variant="heartbeat" size="xl" color="primary" />
            <Typography variant="body-md" color="muted" className="mt-4">
              Loading your health data...
            </Typography>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Optimal', value: stats.optimal, color: 'optimal' as const, icon: 'check' as const },
              { label: 'Good', value: stats.good, color: 'good' as const, icon: 'trendingUp' as const },
              { label: 'Attention', value: stats.attention, color: 'attention' as const, icon: 'alertTriangle' as const },
              { label: 'Concern', value: stats.concern, color: 'concern' as const, icon: 'alertCircle' as const },
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
                    <Typography variant="heading-xl" className="font-bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="muted">
                      {stat.label}
                    </Typography>
                  </div>
                  <Badge variant={stat.color} size="lg" dot>
                    <Icon name={stat.icon} size="sm" />
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Health Scores Section */}
          <Section
            title="Health Scores"
            description="Click on any score to view detailed components and biomarkers"
            icon="heart"
            variant="default"
            action={
              <Navigation variant="pills" items={viewTabs} size="sm" />
            }
          >
            {activeView === 'grid' ? (
              <Grid columns={3} gap={4}>
                {scores.map((score, index) => (
                  <GridItem key={score.id}>
                    <AnimatedScoreCard
                      title={score.name}
                      value={score.value}
                      trend={score.trend}
                      lastUpdate={score.lastUpdate}
                      icon={score.id === 'cardiovascular' ? 'heart' : 
                            score.id === 'metabolic' ? 'activity' : 
                            score.id === 'inflammation' ? 'pulse' : 'brain'}
                      description={`${score.components.length} components tracked`}
                      status={score.status}
                      staggerIndex={index}
                      enablePulse={score.status === 'concern'}
                      interactive
                      onClick={() => onScoreClick?.(score)}
                    />
                  </GridItem>
                ))}
              </Grid>
            ) : activeView === 'list' ? (
              <div className="space-y-3">
                {scores.map((score, index) => (
                  <div
                    key={score.id}
                    className={cn(
                      'bg-white rounded-lg p-4 border border-neutral-200',
                      'hover:shadow-card-hover transition-all duration-300 cursor-pointer',
                      'animate-slide-in-left'
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => onScoreClick?.(score)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-full flex items-center justify-center',
                          score.status === 'optimal' ? 'bg-optimal-100' :
                          score.status === 'good' ? 'bg-green-100' :
                          score.status === 'attention' ? 'bg-attention-100' :
                          'bg-concern-100'
                        )}>
                          <Icon 
                            name={score.id === 'cardiovascular' ? 'heart' : 
                                  score.id === 'metabolic' ? 'activity' : 
                                  score.id === 'inflammation' ? 'pulse' : 'brain'}
                            size="md"
                            color={score.status === 'optimal' ? 'success' :
                                   score.status === 'good' ? 'success' :
                                   score.status === 'attention' ? 'warning' :
                                   'danger'}
                          />
                        </div>
                        <div>
                          <Typography variant="heading-sm">{score.name}</Typography>
                          <Typography variant="caption" color="muted">
                            {score.components.length} components • Updated {score.lastUpdate}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Typography variant="heading-lg" className="font-bold">
                          {score.value}
                        </Typography>
                        {score.trend !== 0 && (
                          <Badge 
                            variant={score.trend > 0 ? 'success' : 'danger'} 
                            size="sm"
                          >
                            <Icon 
                              name={score.trend > 0 ? 'trendingUp' : 'trendingDown'} 
                              size="xs" 
                            />
                            {Math.abs(score.trend)}%
                          </Badge>
                        )}
                        <Icon name="chevronRight" size="sm" color="muted" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <HealthWheelVisualization 
                  scores={scores}
                  onScoreClick={onScoreClick}
                  className="max-w-lg"
                />
              </div>
            )}
          </Section>


          {/* Trend Chart */}
          <Section
            title="Overall Health Trend"
            subtitle={`${timeIntervals.find(t => t.value === selectedTimeInterval)?.label || '6M'} progression`}
            icon="trendingUp"
            variant="card"
            action={
              <TimeIntervalSelector
                intervals={timeIntervals}
                selected={selectedTimeInterval}
                onChange={setSelectedTimeInterval}
                size="sm"
              />
            }
          >
            <Chart
              title="Average Health Score"
              data={chartData}
              variant="line"
              size="lg"
              unit=" points"
              trend={chartData.length >= 2 ? 
                ((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value * 100) : 
                0
              }
              showGrid
              showLegend
            />
          </Section>

          {/* Live Monitoring Banner */}
          <div className={cn(
            'bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-4',
            'animate-slide-in-up flex items-center justify-between'
          )}>
            <div className="flex items-center gap-3">
              <Loading variant="pulse" size="sm" color="primary" />
              <div>
                <Typography variant="body-md" weight="medium" className="text-primary-900">
                  Real-time health monitoring active
                </Typography>
                <Typography variant="caption" className="text-primary-700">
                  Continuous tracking of vital biomarkers
                </Typography>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-primary-300 text-primary-700 hover:bg-primary-50">
              View Live Data
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};