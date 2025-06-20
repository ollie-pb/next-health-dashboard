import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthScore } from '../types';
import { DashboardLayout } from '../design-system/layouts/DashboardLayout';
import { Typography } from '../design-system/atoms/Typography';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { Icon } from '../design-system/atoms/Icon';
import { Navigation } from '../design-system/molecules/Navigation';
import { HealthConstellation } from './HealthConstellation';
import { VitalWheelNetwork } from './VitalWheelNetwork';
import { HarmonyCircles } from './HarmonyCircles';
import { cn } from '../design-system/utils/cn';

interface WheelDashboardShowcaseProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
  className?: string;
}

type WheelVisualization = 'constellation' | 'network' | 'harmony';

interface VisualizationOption {
  id: WheelVisualization;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export const WheelDashboardShowcase: React.FC<WheelDashboardShowcaseProps> = ({
  scores,
  onScoreClick,
  className
}) => {
  const [activeVisualization, setActiveVisualization] = useState<WheelVisualization>('constellation');
  const [showComparison, setShowComparison] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auto-rotate between visualizations for demo purposes
  useEffect(() => {
    if (!autoRotate) return;

    const visualizations: WheelVisualization[] = ['constellation', 'network', 'harmony'];
    let currentIndex = visualizations.indexOf(activeVisualization);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % visualizations.length;
      setActiveVisualization(visualizations[currentIndex]);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, [autoRotate, activeVisualization]);

  // Visualization options with metadata
  const visualizationOptions: VisualizationOption[] = [
    {
      id: 'constellation',
      name: 'Health Constellation',
      description: 'Orbital view showing health metrics as interconnected celestial bodies',
      icon: 'heart',
      color: 'from-blue-500 to-purple-600',
      features: ['Orbital Motion', 'Connection Lines', 'Gravity Effects', 'Educational']
    },
    {
      id: 'network',
      name: 'Vital Wheel Network',
      description: 'Segmented wheel with dynamic network connections and pulse animations',
      icon: 'activity',
      color: 'from-green-500 to-blue-600',
      features: ['Network Lines', 'Pulse Animation', 'Time Travel', 'Correlation Strength']
    },
    {
      id: 'harmony',
      name: 'Harmony Circles',
      description: 'Concentric rings with breathing animations and harmonic resonance',
      icon: 'target',
      color: 'from-purple-500 to-pink-600',
      features: ['Breathing Effect', 'Harmonic Flow', 'Ring Isolation', 'Mindful Design']
    }
  ];

  // Navigation items for sidebar
  const sidebarItems = [
    { label: 'Overview', icon: 'home' as const, href: '#' },
    { label: 'Wheel Designs', active: true, icon: 'heart' as const, href: '#' },
    { label: 'Components', icon: 'pulse' as const, href: '#' },
    { label: 'Biomarkers', icon: 'barChart' as const, href: '#' },
    { label: 'Insights', icon: 'brain' as const, href: '#' },
    { label: 'Settings', icon: 'settings' as const, href: '#' },
  ];

  // Navigation tabs for visualization switching
  const visualizationTabs = visualizationOptions.map(option => ({
    label: option.name,
    icon: option.icon as any,
    active: activeVisualization === option.id,
    onClick: () => setActiveVisualization(option.id)
  }));

  // Calculate overall health statistics
  const healthStats = {
    overall: Math.round(scores.reduce((sum, score) => sum + score.value, 0) / scores.length),
    optimal: scores.filter(s => s.status === 'optimal').length,
    attention: scores.filter(s => s.status === 'attention' || s.status === 'concern').length,
    trending: scores.filter(s => s.trend > 5).length
  };

  // Render active visualization
  const renderActiveVisualization = () => {
    const props = { scores, onScoreClick, className: "h-full" };
    
    switch (activeVisualization) {
      case 'constellation':
        return <HealthConstellation {...props} />;
      case 'network':
        return <VitalWheelNetwork {...props} />;
      case 'harmony':
        return <HarmonyCircles {...props} />;
      default:
        return <HealthConstellation {...props} />;
    }
  };

  return (
    <DashboardLayout
      title="Wheel Dashboard Concepts"
      subtitle="Innovative circular visualizations for health data"
      headerIcon="heart"
      sidebarItems={sidebarItems}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      headerActions={
        <div className="flex items-center gap-3">
          <Badge variant="primary" size="sm">
            {scores.length} Metrics
          </Badge>
          <Badge 
            variant={healthStats.overall >= 80 ? 'optimal' : healthStats.overall >= 60 ? 'good' : 'attention'} 
            size="sm"
          >
            {healthStats.overall} Overall
          </Badge>
          <Button
            variant={autoRotate ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            <Icon name={autoRotate ? 'minus' : 'plus'} size="sm" />
            Auto Demo
          </Button>
        </div>
      }
    >
      <div className={cn('flex flex-col h-full space-y-6', className)}>
        {/* Visualization Controls */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Navigation 
              variant="pills" 
              items={visualizationTabs} 
              size="md"
              className="mb-4"
            />
            
            {/* Active Visualization Info */}
            <motion.div
              key={activeVisualization}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 border border-primary-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Typography variant="heading-sm" className="text-primary-900 mb-1">
                    {visualizationOptions.find(v => v.id === activeVisualization)?.name}
                  </Typography>
                  <Typography variant="body-sm" className="text-primary-700 mb-3">
                    {visualizationOptions.find(v => v.id === activeVisualization)?.description}
                  </Typography>
                  <div className="flex flex-wrap gap-1">
                    {visualizationOptions.find(v => v.id === activeVisualization)?.features.map(feature => (
                      <Badge key={feature} variant="primary" size="xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  className="border-primary-300 text-primary-700 hover:bg-primary-50"
                >
                  <Icon name="menu" size="sm" />
                  {showComparison ? 'Single' : 'Compare'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Health Overview Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Overall Score', value: healthStats.overall, color: 'primary', icon: 'heart' },
            { label: 'Optimal', value: healthStats.optimal, color: 'optimal', icon: 'check' },
            { label: 'Need Attention', value: healthStats.attention, color: 'attention', icon: 'alertTriangle' },
            { label: 'Improving', value: healthStats.trending, color: 'good', icon: 'trendingUp' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-lg p-4 border border-neutral-200 hover:shadow-card-hover transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="heading-lg" weight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="muted">
                    {stat.label}
                  </Typography>
                </div>
                <Badge variant={stat.color as any} size="lg">
                  <Icon name={stat.icon as any} size="sm" />
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Visualization Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {showComparison ? (
              // Comparison View - Show all three side by side
              <motion.div
                key="comparison"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 gap-6 h-full"
              >
                {visualizationOptions.map(option => (
                  <div
                    key={option.id}
                    className={cn(
                      'bg-white rounded-lg border-2 overflow-hidden transition-all duration-300',
                      activeVisualization === option.id
                        ? 'border-primary-500 shadow-lg'
                        : 'border-neutral-200 hover:border-neutral-300'
                    )}
                  >
                    <div className="p-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2 h-2 rounded-full bg-gradient-to-r',
                          option.color
                        )} />
                        <Typography variant="heading-xs" weight="medium">
                          {option.name}
                        </Typography>
                      </div>
                    </div>
                    <div className="h-64 p-2">
                      {/* Render scaled-down version of each visualization */}
                      <div className="transform scale-50 origin-top-left w-[200%] h-[200%]">
                        {option.id === 'constellation' && <HealthConstellation scores={scores.slice(0, 8)} />}
                        {option.id === 'network' && <VitalWheelNetwork scores={scores.slice(0, 8)} />}
                        {option.id === 'harmony' && <HarmonyCircles scores={scores.slice(0, 8)} />}
                      </div>
                    </div>
                    <div className="p-3 border-t border-neutral-100">
                      <Button
                        variant={activeVisualization === option.id ? 'primary' : 'outline'}
                        size="sm"
                        className="w-full"
                        onClick={() => setActiveVisualization(option.id)}
                      >
                        {activeVisualization === option.id ? 'Active' : 'Select'}
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              // Single Visualization View
              <motion.div
                key={activeVisualization}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg border border-neutral-200 shadow-sm h-full"
              >
                {renderActiveVisualization()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Design Insights Panel */}
        <motion.div
          className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg p-6 border border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg border border-neutral-200">
              <Icon name="info" size="md" color="primary" />
            </div>
            <div className="flex-1">
              <Typography variant="heading-sm" className="mb-2">
                Design Philosophy
              </Typography>
              <Typography variant="body-sm" color="muted" className="mb-3">
                Each wheel visualization offers a unique perspective on health data, emphasizing different aspects of the user experience:
              </Typography>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Typography variant="body-sm" weight="medium" className="text-blue-700 mb-1">
                    Health Constellation
                  </Typography>
                  <Typography variant="caption" color="muted">
                    Educational and intuitive, using astronomical metaphors to show health relationships
                  </Typography>
                </div>
                <div>
                  <Typography variant="body-sm" weight="medium" className="text-green-700 mb-1">
                    Vital Wheel Network
                  </Typography>
                  <Typography variant="caption" color="muted">
                    Technical and precise, emphasizing data relationships and temporal analysis
                  </Typography>
                </div>
                <div>
                  <Typography variant="body-sm" weight="medium" className="text-purple-700 mb-1">
                    Harmony Circles
                  </Typography>
                  <Typography variant="caption" color="muted">
                    Mindful and balanced, promoting holistic wellness through visual harmony
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};