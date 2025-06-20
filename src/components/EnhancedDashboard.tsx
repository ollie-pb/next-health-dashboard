import React, { useState, useEffect } from 'react';
import type { HealthScore, Component } from '../types';
import { AnimatedScoreCard } from '../design-system/molecules/AnimatedScoreCard';
import { DashboardLayout } from '../design-system/layouts/DashboardLayout';
import { Grid, GridItem } from '../design-system/layouts/Grid';
import { Section } from '../design-system/layouts/Section';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { Loading } from '../design-system/atoms/Loading';
import { ChartWrapper } from '../design-system/molecules/Chart/ChartWrapper';
import { EnhancedComboChart } from '../design-system/molecules/Chart/EnhancedComboChart';
import { Navigation } from '../design-system/molecules/Navigation';
import { HealthWheelVisualization } from './HealthWheelVisualization';
import { AttentionDashboard } from './AttentionDashboard';
import { TimeIntervalSelector, type TimeInterval } from '../design-system/molecules/TimeIntervalSelector';
import { cn } from '../design-system/utils/cn';

interface EnhancedDashboardProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
  onComponentClick?: (component: Component) => void;
}

export const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ scores, onScoreClick, onComponentClick }) => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('wheel');
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
      title="Health Optimization Dashboard"
      subtitle="Next Health - Personalized Longevity & Performance"
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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


          {/* Main Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Primary Charts */}
            <div className="xl:col-span-2 space-y-6">
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
                <ChartWrapper
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
                  useEnhanced={true}
                />
              </Section>

              {/* Multi-Metric Health Analysis */}
              <Section
                title="Comprehensive Health Analysis"
                subtitle="Combined view of key health indicators"
                icon="activity"
                variant="card"
              >
                <EnhancedComboChart
                  title="Health Metrics Overview"
                  subtitle="Tracking multiple health dimensions over time"
                  data={chartData.map((point, index) => ({
                    name: point.label,
                    overall: point.value,
                    cardiovascular: point.value + Math.sin(index * 0.5) * 10,
                    metabolic: point.value - Math.cos(index * 0.3) * 8,
                    inflammation: point.value + Math.sin(index * 0.7) * 5,
                  }))}
                  series={[
                    { dataKey: 'overall', name: 'Overall Health', type: 'area', color: '#3B82F6' },
                    { dataKey: 'cardiovascular', name: 'Cardiovascular', type: 'line', color: '#EF4444' },
                    { dataKey: 'metabolic', name: 'Metabolic', type: 'line', color: '#10B981' },
                    { dataKey: 'inflammation', name: 'Inflammation', type: 'line', color: '#F59E0B' },
                  ]}
                  height={350}
                  unit=" pts"
                  showGrid
                  showLegend
                  referenceValue={80}
                  trend={chartData.length >= 2 ? 
                    ((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value * 100) : 
                    0
                  }
                />
              </Section>
            </div>

            {/* Right Column - Secondary Charts and Metrics */}
            <div className="space-y-6">
              <ChartWrapper
                title="Sleep Quality Trend"
                data={chartData.map(point => ({
                  ...point,
                  value: Math.max(50, Math.min(100, point.value + (Math.random() - 0.5) * 20))
                }))}
                variant="area"
                size="md"
                unit=" pts"
                icon="brain"
                showGrid
                useEnhanced={true}
              />
              
              <ChartWrapper
                title="Activity Levels"
                data={chartData.map(point => ({
                  ...point,
                  value: Math.max(40, Math.min(100, point.value + (Math.random() - 0.5) * 15))
                }))}
                variant="line"
                size="md"
                unit=" pts"
                icon="activity"
                showGrid
                useEnhanced={true}
              />
            </div>
          </div>

          {/* Additional Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <ChartWrapper
              title="Heart Rate Variability"
              data={chartData.map(point => ({
                ...point,
                value: Math.max(30, Math.min(80, point.value * 0.6 + (Math.random() - 0.5) * 10))
              }))}
              variant="line"
              size="sm"
              unit=" ms"
              icon="heart"
              showGrid
              useEnhanced={true}
            />
            
            <ChartWrapper
              title="Stress Index"
              data={chartData.map(point => ({
                ...point,
                value: Math.max(20, Math.min(100, 100 - point.value + (Math.random() - 0.5) * 15))
              }))}
              variant="area"
              size="sm"
              unit="/100"
              icon="brain"
              showGrid
              useEnhanced={true}
            />

            <ChartWrapper
              title="Recovery Score"
              data={chartData.map(point => ({
                ...point,
                value: Math.max(40, Math.min(100, point.value + (Math.random() - 0.5) * 12))
              }))}
              variant="line"
              size="sm"
              unit="%"
              icon="refresh"
              showGrid
              useEnhanced={true}
            />

            <ChartWrapper
              title="Energy Levels"
              data={chartData.map(point => ({
                ...point,
                value: Math.max(50, Math.min(100, point.value + (Math.random() - 0.5) * 18))
              }))}
              variant="area"
              size="sm"
              unit=" pts"
              icon="activity"
              showGrid
              useEnhanced={true}
            />
          </div>

          {/* Attention Dashboard */}
          <AttentionDashboard 
            scores={scores}
            onScoreClick={onScoreClick}
            onComponentClick={onComponentClick}
          />

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