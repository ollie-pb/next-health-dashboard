import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthScore, Component } from '../types';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { Section } from '../design-system/layouts/Section';
import { Grid, GridItem } from '../design-system/layouts/Grid';
import { cn } from '../design-system/utils/cn';

interface AttentionDashboardProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
  onComponentClick?: (component: Component) => void;
  className?: string;
}

interface AttentionItem {
  id: string;
  type: 'score' | 'component' | 'biomarker';
  name: string;
  value: number | string;
  status: 'attention' | 'concern';
  trend?: number;
  lastUpdate: string;
  description?: string;
  parentScore?: string;
  actionRequired?: string;
  severity: 1 | 2 | 3; // 1 = low attention, 2 = moderate, 3 = high concern
}

  // Helper function to determine status based on value
  const getStatusFromValue = (value: number): 'attention' | 'concern' | 'good' => {
    if (value <= 40) return 'concern';
    if (value <= 60) return 'attention';
    return 'good';
  };

  // Helper function to determine biomarker status
  const getBiomarkerStatus = (value: number, referenceRange: { min: number; max: number }): 'attention' | 'concern' | 'good' => {
    if (value < referenceRange.min * 0.7 || value > referenceRange.max * 1.3) return 'concern';
    if (value < referenceRange.min || value > referenceRange.max) return 'attention';
    return 'good';
  };

export const AttentionDashboard: React.FC<AttentionDashboardProps> = ({
  scores,
  onScoreClick,
  onComponentClick,
  className
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'attention' | 'concern'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | '1' | '2' | '3'>('all');

  // Extract all items that need attention
  const attentionItems: AttentionItem[] = useMemo(() => {
    const items: AttentionItem[] = [];

    scores.forEach(score => {
      // Add scores that need attention
      if (score.status === 'attention' || score.status === 'concern') {
        items.push({
          id: `score-${score.id}`,
          type: 'score',
          name: score.name,
          value: score.value,
          status: score.status,
          trend: score.trend,
          lastUpdate: score.lastUpdate,
          severity: score.status === 'concern' ? 3 : 2,
          actionRequired: score.status === 'concern' 
            ? 'Immediate consultation recommended' 
            : 'Monitor and consider lifestyle adjustments'
        });
      }

      // Add components that need attention
      score.components.forEach(component => {
        const componentStatus = getStatusFromValue(component.value);
        if (componentStatus === 'attention' || componentStatus === 'concern') {
          items.push({
            id: `component-${component.id}`,
            type: 'component',
            name: component.name,
            value: component.value,
            status: componentStatus,
            trend: component.trend,
            lastUpdate: score.lastUpdate, // Use score's lastUpdate since component doesn't have it
            parentScore: score.name,
            severity: componentStatus === 'concern' ? 3 : 2,
            actionRequired: componentStatus === 'concern'
              ? 'Targeted intervention needed'
              : 'Regular monitoring advised'
          });

          // Add biomarkers that need attention
          component.biomarkers?.forEach(biomarker => {
            const biomarkerStatus = getBiomarkerStatus(biomarker.value, biomarker.referenceRange);
            if (biomarkerStatus === 'attention' || biomarkerStatus === 'concern') {
              items.push({
                id: `biomarker-${biomarker.id}`,
                type: 'biomarker',
                name: biomarker.name,
                value: `${biomarker.value} ${biomarker.unit}`,
                status: biomarkerStatus,
                lastUpdate: biomarker.lastUpdate,
                parentScore: score.name,
                description: biomarker.description,
                severity: biomarkerStatus === 'concern' ? 3 : 
                         (biomarker.value < biomarker.referenceRange.min * 0.8 || 
                          biomarker.value > biomarker.referenceRange.max * 1.2) ? 2 : 1,
                actionRequired: biomarkerStatus === 'concern'
                  ? 'Lab follow-up required'
                  : 'Retest in 3-6 months'
              });
            }
          });
        }
      });
    });

    return items.sort((a, b) => b.severity - a.severity);
  }, [scores]);

  // Filter items based on selected filters
  const filteredItems = useMemo(() => {
    return attentionItems.filter(item => {
      const statusMatch = selectedFilter === 'all' || item.status === selectedFilter;
      const severityMatch = selectedSeverity === 'all' || item.severity.toString() === selectedSeverity;
      return statusMatch && severityMatch;
    });
  }, [attentionItems, selectedFilter, selectedSeverity]);

  // Get icon for item type
  const getItemIcon = (type: AttentionItem['type']) => {
    switch (type) {
      case 'score': return 'heart';
      case 'component': return 'activity';
      case 'biomarker': return 'pulse';
      default: return 'alertCircle';
    }
  };

  // Get severity color
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 3: return 'danger';
      case 2: return 'warning';
      case 1: return 'success';
      default: return 'muted';
    }
  };

  // Get priority label
  const getPriorityLabel = (severity: number) => {
    switch (severity) {
      case 3: return 'High Priority';
      case 2: return 'Moderate Priority';
      case 1: return 'Low Priority';
      default: return 'Normal';
    }
  };

  if (attentionItems.length === 0) {
    return (
      <Section
        title="Health Attention Dashboard"
        subtitle="All health metrics are performing well"
        icon="check"
        variant="card"
        className={className}
      >
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-optimal-100 rounded-full flex items-center justify-center mb-4">
            <Icon name="check" size="xl" color="success" />
          </div>
          <Typography variant="heading-md" className="mb-2">
            Excellent Health Status
          </Typography>
          <Typography variant="body-md" color="muted">
            No health metrics require immediate attention. Keep up the great work!
          </Typography>
        </div>
      </Section>
    );
  }

  return (
    <Section
      title="Health Attention Dashboard"
      subtitle={`${filteredItems.length} items requiring attention`}
      icon="alertTriangle"
      variant="card"
      className={className}
      action={
        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
            {['all', 'attention', 'concern'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFilter(filter as any)}
                className={cn(
                  'min-w-0 px-3 py-1 capitalize',
                  selectedFilter === filter 
                    ? 'bg-primary-500 text-white shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                )}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
            {['all', '3', '2', '1'].map((severity) => (
              <Button
                key={severity}
                variant={selectedSeverity === severity ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedSeverity(severity as any)}
                className={cn(
                  'min-w-0 px-2 py-1',
                  selectedSeverity === severity 
                    ? 'bg-primary-500 text-white shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                )}
              >
                {severity === 'all' ? 'All' : `P${severity}`}
              </Button>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="heading-lg" weight="bold" color="danger">
                  {attentionItems.filter(item => item.severity === 3).length}
                </Typography>
                <Typography variant="caption" color="muted">
                  High Priority
                </Typography>
              </div>
              <Icon name="alertCircle" size="lg" color="danger" />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="heading-lg" weight="bold" color="warning">
                  {attentionItems.filter(item => item.severity === 2).length}
                </Typography>
                <Typography variant="caption" color="muted">
                  Moderate Priority
                </Typography>
              </div>
              <Icon name="alertTriangle" size="lg" color="warning" />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="heading-lg" weight="bold" color="success">
                  {attentionItems.filter(item => item.severity === 1).length}
                </Typography>
                <Typography variant="caption" color="muted">
                  Low Priority
                </Typography>
              </div>
              <Icon name="info" size="lg" color="success" />
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="heading-lg" weight="bold" color="primary">
                  {attentionItems.length}
                </Typography>
                <Typography variant="caption" color="muted">
                  Total Items
                </Typography>
              </div>
              <Icon name="activity" size="lg" color="primary" />
            </div>
          </div>
        </div>

        {/* Attention Items List */}
        <AnimatePresence mode="popLayout">
          <Grid columns={1} gap={3}>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <GridItem>
                  <div className={cn(
                    'bg-white border rounded-lg p-4 hover:shadow-card-hover transition-all duration-300',
                    item.severity === 3 ? 'border-red-200 hover:border-red-300' :
                    item.severity === 2 ? 'border-yellow-200 hover:border-yellow-300' :
                    'border-neutral-200 hover:border-neutral-300'
                  )}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center',
                          item.severity === 3 ? 'bg-red-100' :
                          item.severity === 2 ? 'bg-yellow-100' :
                          'bg-green-100'
                        )}>
                          <Icon 
                            name={getItemIcon(item.type)} 
                            size="md" 
                            color={getSeverityColor(item.severity) as any}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Typography variant="heading-sm" className="truncate">
                              {item.name}
                            </Typography>
                            <Badge variant={item.status} size="xs">
                              {item.status}
                            </Badge>
                            <Badge variant={getSeverityColor(item.severity) as any} size="xs">
                              {getPriorityLabel(item.severity)}
                            </Badge>
                          </div>
                          
                          {item.parentScore && (
                            <Typography variant="caption" color="muted" className="mb-1">
                              Part of {item.parentScore}
                            </Typography>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-neutral-600">
                            <span className="font-medium">Value: {item.value}</span>
                            {item.trend !== undefined && item.trend !== 0 && (
                              <div className="flex items-center gap-1">
                                <Icon 
                                  name={item.trend > 0 ? 'trendingUp' : 'trendingDown'} 
                                  size="xs" 
                                  color={item.trend > 0 ? 'success' : 'danger'}
                                />
                                <span className={item.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {item.trend > 0 ? '+' : ''}{item.trend}%
                                </span>
                              </div>
                            )}
                            <span>Updated {item.lastUpdate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (item.type === 'score') {
                              const score = scores.find(s => s.id === item.id.replace('score-', ''));
                              if (score) onScoreClick?.(score);
                            } else if (item.type === 'component') {
                              // Find and trigger component click
                              const componentId = item.id.replace('component-', '');
                              const component = scores
                                .flatMap(s => s.components)
                                .find(c => c.id === componentId);
                              if (component) onComponentClick?.(component);
                            }
                          }}
                        >
                          <Icon name="chevronRight" size="xs" />
                          View Details
                        </Button>
                      </div>
                    </div>

                    {item.actionRequired && (
                      <div className={cn(
                        'mt-3 p-3 rounded-lg border-l-4',
                        item.severity === 3 ? 'bg-red-50 border-red-400' :
                        item.severity === 2 ? 'bg-yellow-50 border-yellow-400' :
                        'bg-green-50 border-green-400'
                      )}>
                        <Typography variant="body-sm" weight="medium" className="mb-1">
                          Recommended Action:
                        </Typography>
                        <Typography variant="body-sm" color="muted">
                          {item.actionRequired}
                        </Typography>
                      </div>
                    )}

                    {item.description && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <Typography variant="body-sm" color="muted">
                          {item.description}
                        </Typography>
                      </div>
                    )}
                  </div>
                </GridItem>
              </motion.div>
            ))}
          </Grid>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <Typography variant="body-md" color="muted">
              No items match the current filters
            </Typography>
          </div>
        )}
      </div>
    </Section>
  );
};