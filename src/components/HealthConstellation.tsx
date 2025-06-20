import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthScore } from '../types';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { cn } from '../design-system/utils/cn';

interface HealthConstellationProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
  className?: string;
}

interface OrbitingMetric {
  id: string;
  score: HealthScore;
  angle: number;
  radius: number;
  orbitSpeed: number;
  connections: string[];
}

interface ConnectionLine {
  from: string;
  to: string;
  strength: number;
  visible: boolean;
}

export const HealthConstellation: React.FC<HealthConstellationProps> = ({
  scores,
  onScoreClick,
  className
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const constellationRef = useRef<HTMLDivElement>(null);

  // Calculate overall health score (average of all scores)
  const overallScore = Math.round(
    scores.reduce((sum, score) => sum + score.value, 0) / scores.length
  );

  // Create orbiting metrics with physics-based positioning
  const orbitingMetrics: OrbitingMetric[] = scores.map((score, index) => {
    const totalScores = scores.length;
    const baseAngle = (360 / totalScores) * index;
    const radiusVariation = 0.1; // 10% variation for organic feel
    const baseRadius = 160;
    const radius = baseRadius + (Math.sin(index * 0.7) * baseRadius * radiusVariation);
    
    return {
      id: score.id,
      score,
      angle: baseAngle,
      radius,
      orbitSpeed: 0.02 + (index * 0.005), // Slightly different speeds for each
      connections: generateConnections(score, scores)
    };
  });

  // Generate realistic health metric connections
  function generateConnections(score: HealthScore, allScores: HealthScore[]): string[] {
    const connectionMap: Record<string, string[]> = {
      'cardiovascular': ['metabolic', 'sleep', 'stress'],
      'metabolic': ['cardiovascular', 'nutrition', 'activity'],
      'cognitive': ['sleep', 'stress', 'hormonal'],
      'immune': ['stress', 'sleep', 'nutrition'],
      'sleep': ['stress', 'cognitive', 'hormonal'],
      'stress': ['cardiovascular', 'immune', 'cognitive'],
      'hormonal': ['sleep', 'stress', 'reproductive'],
      'nutrition': ['metabolic', 'immune', 'digestive'],
      'activity': ['cardiovascular', 'metabolic', 'bone'],
      'bone': ['activity', 'hormonal', 'nutrition'],
      'digestive': ['nutrition', 'immune', 'stress'],
      'reproductive': ['hormonal', 'stress', 'cardiovascular']
    };

    const scoreName = score.name.toLowerCase();
    const connections = connectionMap[scoreName] || [];
    
    return connections
      .map(connectionName => 
        allScores.find(s => s.name.toLowerCase().includes(connectionName))?.id
      )
      .filter(Boolean) as string[];
  }

  // Animation frame for continuous orbital motion
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setSelectedMetric(prev => prev); // Trigger re-render for orbital motion
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Calculate metric position with orbital motion
  const getMetricPosition = (metric: OrbitingMetric, time: number = Date.now()) => {
    const animatedAngle = metric.angle + (time * metric.orbitSpeed);
    const x = Math.cos((animatedAngle * Math.PI) / 180) * metric.radius;
    const y = Math.sin((animatedAngle * Math.PI) / 180) * metric.radius;
    return { x, y, angle: animatedAngle };
  };

  // Get connections for visualization
  const getVisibleConnections = (): ConnectionLine[] => {
    if (!showConnections && !hoveredMetric) return [];

    const connections: ConnectionLine[] = [];
    
    orbitingMetrics.forEach(metric => {
      metric.connections.forEach(connectionId => {
        const targetMetric = orbitingMetrics.find(m => m.id === connectionId);
        if (targetMetric) {
          const shouldShow = showConnections || 
                           hoveredMetric === metric.id || 
                           hoveredMetric === connectionId;
          
          connections.push({
            from: metric.id,
            to: connectionId,
            strength: calculateConnectionStrength(metric.score, targetMetric.score),
            visible: shouldShow
          });
        }
      });
    });

    return connections;
  };

  // Calculate connection strength based on health score correlation
  const calculateConnectionStrength = (score1: HealthScore, score2: HealthScore): number => {
    const valueDiff = Math.abs(score1.value - score2.value);
    const maxDiff = 100;
    return 1 - (valueDiff / maxDiff); // Stronger connection for similar values
  };

  // Get status color for health scores
  const getStatusColor = (status: string) => {
    const colorMap = {
      'optimal': 'from-optimal-400 to-optimal-600',
      'good': 'from-green-400 to-green-600', 
      'attention': 'from-attention-400 to-attention-600',
      'concern': 'from-concern-400 to-concern-600',
      'no-data': 'from-neutral-300 to-neutral-500'
    };
    return colorMap[status as keyof typeof colorMap] || colorMap['no-data'];
  };

  // Calculate center position (50% of container)
  const centerX = 200; // Half of 400px container
  const centerY = 200;

  return (
    <div className={cn('relative w-full h-full flex flex-col', className)}>
      {/* Constellation Controls */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div>
          <Typography variant="heading-lg" weight="bold">
            Your Health Universe
          </Typography>
          <Typography variant="body-sm" color="muted">
            {scores.length} interconnected health metrics
          </Typography>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={showConnections ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowConnections(!showConnections)}
          >
            <Icon name="plus" size="sm" />
            {showConnections ? 'Hide' : 'Show'} Connections
          </Button>
          
          <Button
            variant={isAnimating ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setIsAnimating(!isAnimating)}
          >
            <Icon name={isAnimating ? 'minus' : 'plus'} size="sm" />
            {isAnimating ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>

      {/* Constellation Visualization */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div 
          ref={constellationRef}
          className="relative w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)'
          }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0">
            {[80, 120, 160, 200].map(radius => (
              <div
                key={radius}
                className="absolute border border-primary-200/30 rounded-full"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  left: centerX - radius,
                  top: centerY - radius
                }}
              />
            ))}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {getVisibleConnections().map(connection => {
              const fromMetric = orbitingMetrics.find(m => m.id === connection.from);
              const toMetric = orbitingMetrics.find(m => m.id === connection.to);
              
              if (!fromMetric || !toMetric || !connection.visible) return null;
              
              const fromPos = getMetricPosition(fromMetric);
              const toPos = getMetricPosition(toMetric);
              
              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  x1={centerX + fromPos.x}
                  y1={centerY + fromPos.y}
                  x2={centerX + toPos.x}
                  y2={centerY + toPos.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth={Math.max(1, connection.strength * 3)}
                  opacity={connection.strength * 0.7}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}
            
            {/* SVG Gradients */}
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(147, 197, 253)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Health Score */}
          <motion.div
            className="absolute flex flex-col items-center justify-center cursor-pointer group"
            style={{
              left: centerX - 50,
              top: centerY - 50,
              width: 100,
              height: 100
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedMetric(null)}
          >
            <div className={cn(
              'w-full h-full rounded-full flex flex-col items-center justify-center',
              'bg-gradient-to-br from-primary-500 to-primary-700',
              'text-white shadow-lg border-4 border-white',
              'group-hover:shadow-xl transition-all duration-300'
            )}>
              <motion.div
                className="text-2xl font-bold"
                animate={{ 
                  scale: isAnimating ? [1, 1.1, 1] : 1 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: isAnimating ? Infinity : 0,
                  ease: "easeInOut" 
                }}
              >
                {overallScore}
              </motion.div>
              <div className="text-xs opacity-90">Overall</div>
            </div>
          </motion.div>

          {/* Orbiting Health Metrics */}
          {orbitingMetrics.map((metric) => {
            const position = getMetricPosition(metric);
            const isSelected = selectedMetric === metric.id;
            const isHovered = hoveredMetric === metric.id;
            
            return (
              <motion.div
                key={metric.id}
                className="absolute cursor-pointer group"
                style={{
                  left: centerX + position.x - 30,
                  top: centerY + position.y - 30,
                  width: 60,
                  height: 60
                }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  x: isAnimating ? [0, 2, 0, -2, 0] : 0,
                  y: isAnimating ? [0, -1, 0, 1, 0] : 0
                }}
                transition={{
                  duration: 3 + (metric.radius / 50),
                  repeat: isAnimating ? Infinity : 0,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  setSelectedMetric(isSelected ? null : metric.id);
                  onScoreClick?.(metric.score);
                }}
                onMouseEnter={() => setHoveredMetric(metric.id)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <div className={cn(
                  'w-full h-full rounded-full flex flex-col items-center justify-center',
                  'bg-gradient-to-br', getStatusColor(metric.score.status),
                  'text-white shadow-md border-2 border-white',
                  'group-hover:shadow-lg transition-all duration-300',
                  isSelected && 'ring-4 ring-primary-400 ring-opacity-60',
                  isHovered && 'ring-2 ring-primary-300 ring-opacity-40'
                )}>
                  <div className="text-sm font-bold">{metric.score.value}</div>
                  <div className="text-xs opacity-90 text-center leading-tight">
                    {metric.score.name.split(' ')[0]}
                  </div>
                </div>

                {/* Metric Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute z-20 bg-white rounded-lg shadow-lg border border-neutral-200 p-3 min-w-[200px]"
                      style={{
                        left: position.x > 0 ? -220 : 70,
                        top: -20
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Typography variant="heading-sm" className="mb-1">
                        {metric.score.name}
                      </Typography>
                      <div className="flex items-center gap-2 mb-2">
                        <Typography variant="heading-md" weight="bold">
                          {metric.score.value}
                        </Typography>
                        <Badge variant={metric.score.status === 'no-data' ? 'outline' : metric.score.status} size="xs">
                          {metric.score.status}
                        </Badge>
                      </div>
                      <Typography variant="caption" color="muted">
                        {metric.score.components.length} components • Updated {metric.score.lastUpdate}
                      </Typography>
                      {metric.score.trend !== 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <Icon 
                            name={metric.score.trend > 0 ? 'trendingUp' : 'trendingDown'} 
                            size="xs" 
                            color={metric.score.trend > 0 ? 'success' : 'danger'}
                          />
                          <Typography variant="caption" color="muted">
                            {metric.score.trend > 0 ? '+' : ''}{metric.score.trend}% vs last month
                          </Typography>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Constellation Info Panel */}
          <AnimatePresence>
            {selectedMetric && (
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg border border-neutral-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {(() => {
                  const metric = orbitingMetrics.find(m => m.id === selectedMetric);
                  if (!metric) return null;
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Typography variant="heading-sm">
                          {metric.score.name}
                        </Typography>
                        <button
                          onClick={() => setSelectedMetric(null)}
                          className="text-neutral-400 hover:text-neutral-600"
                        >
                          <Icon name="x" size="sm" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <Typography variant="heading-lg" weight="bold">
                          {metric.score.value}/100
                        </Typography>
                        <Badge variant={metric.score.status === 'no-data' ? 'outline' : metric.score.status}>
                          {metric.score.status}
                        </Badge>
                      </div>
                      <Typography variant="body-sm" color="muted">
                        Connected to {metric.connections.length} other health metrics
                      </Typography>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-neutral-200">
        {[
          { status: 'optimal', label: 'Optimal', color: 'from-optimal-400 to-optimal-600' },
          { status: 'good', label: 'Good', color: 'from-green-400 to-green-600' },
          { status: 'attention', label: 'Attention', color: 'from-attention-400 to-attention-600' },
          { status: 'concern', label: 'Concern', color: 'from-concern-400 to-concern-600' }
        ].map(item => (
          <div key={item.status} className="flex items-center gap-2">
            <div className={cn(
              'w-3 h-3 rounded-full bg-gradient-to-br',
              item.color
            )} />
            <Typography variant="caption" color="muted">
              {item.label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};