import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthScore } from '../types';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { cn } from '../design-system/utils/cn';

interface VitalWheelNetworkProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
  className?: string;
}

interface WheelSegment {
  id: string;
  score: HealthScore;
  startAngle: number;
  endAngle: number;
  centerAngle: number;
  radius: number;
  pulseIntensity: number;
}

interface NetworkConnection {
  from: string;
  to: string;
  strength: number;
  animated: boolean;
}

export const VitalWheelNetwork: React.FC<VitalWheelNetworkProps> = ({
  scores,
  onScoreClick,
  className
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [showNetwork, setShowNetwork] = useState(true);
  const [timelinePosition, setTimelinePosition] = useState(1);
  const [pulseAnimation, setPulseAnimation] = useState(true);

  // Create wheel segments with equal distribution
  const wheelSegments: WheelSegment[] = useMemo(() => {
    const segmentAngle = 360 / scores.length;
    
    return scores.map((score, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const centerAngle = startAngle + segmentAngle / 2;
      
      // Calculate pulse intensity based on recent changes
      const pulseIntensity = Math.abs(score.trend) / 10; // 0-1 scale
      
      return {
        id: score.id,
        score,
        startAngle,
        endAngle,
        centerAngle,
        radius: 150,
        pulseIntensity: Math.max(0.1, pulseIntensity)
      };
    });
  }, [scores]);

  // Generate network connections based on health correlations
  const networkConnections: NetworkConnection[] = useMemo(() => {
    const connections: NetworkConnection[] = [];
    
    // Define health metric relationships
    const relationshipMap: Record<string, { targets: string[], strength: number }[]> = {
      'cardiovascular': [
        { targets: ['metabolic', 'activity'], strength: 0.9 },
        { targets: ['stress', 'sleep'], strength: 0.7 }
      ],
      'metabolic': [
        { targets: ['cardiovascular', 'nutrition'], strength: 0.9 },
        { targets: ['activity', 'hormonal'], strength: 0.6 }
      ],
      'cognitive': [
        { targets: ['sleep', 'stress'], strength: 0.8 },
        { targets: ['nutrition', 'activity'], strength: 0.5 }
      ],
      'immune': [
        { targets: ['stress', 'sleep'], strength: 0.7 },
        { targets: ['nutrition'], strength: 0.8 }
      ],
      'sleep': [
        { targets: ['cognitive', 'stress'], strength: 0.8 },
        { targets: ['hormonal', 'immune'], strength: 0.6 }
      ],
      'stress': [
        { targets: ['cardiovascular', 'immune'], strength: 0.7 },
        { targets: ['cognitive', 'sleep'], strength: 0.8 }
      ]
    };

    wheelSegments.forEach(segment => {
      const segmentName = segment.score.name.toLowerCase();
      const relationships = relationshipMap[segmentName] || [];
      
      relationships.forEach(rel => {
        rel.targets.forEach(targetName => {
          const targetSegment = wheelSegments.find(s => 
            s.score.name.toLowerCase().includes(targetName)
          );
          
          if (targetSegment) {
            connections.push({
              from: segment.id,
              to: targetSegment.id,
              strength: rel.strength,
              animated: Math.abs(segment.score.trend) > 5 || Math.abs(targetSegment.score.trend) > 5
            });
          }
        });
      });
    });

    return connections;
  }, [wheelSegments]);

  // Calculate segment path for SVG
  const getSegmentPath = (segment: WheelSegment, innerRadius: number = 60) => {
    const { startAngle, endAngle, radius } = segment;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = Math.cos(startRad) * innerRadius;
    const y1 = Math.sin(startRad) * innerRadius;
    const x2 = Math.cos(endRad) * innerRadius;
    const y2 = Math.sin(endRad) * innerRadius;
    const x3 = Math.cos(endRad) * radius;
    const y3 = Math.sin(endRad) * radius;
    const x4 = Math.cos(startRad) * radius;
    const y4 = Math.sin(startRad) * radius;

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  };

  // Get segment center position for labels
  const getSegmentCenter = (segment: WheelSegment, radius: number = 105) => {
    const centerRad = (segment.centerAngle * Math.PI) / 180;
    return {
      x: Math.cos(centerRad) * radius,
      y: Math.sin(centerRad) * radius
    };
  };

  // Get connection line path
  const getConnectionPath = (from: WheelSegment, to: WheelSegment) => {
    const fromCenter = getSegmentCenter(from, 80);
    const toCenter = getSegmentCenter(to, 80);
    
    // Create curved path
    const midX = (fromCenter.x + toCenter.x) / 2;
    const midY = (fromCenter.y + toCenter.y) / 2;
    const curvature = 0.3;
    const controlX = midX + (midY * curvature);
    const controlY = midY - (midX * curvature);
    
    return `M ${fromCenter.x} ${fromCenter.y} Q ${controlX} ${controlY} ${toCenter.x} ${toCenter.y}`;
  };

  // Get status colors
  const getStatusColor = (status: string) => {
    const colorMap = {
      'optimal': '#10b981',
      'good': '#22c55e',
      'attention': '#f59e0b',
      'concern': '#ef4444',
      'no-data': '#6b7280'
    };
    return colorMap[status as keyof typeof colorMap] || colorMap['no-data'];
  };

  return (
    <div className={cn('relative w-full h-full flex flex-col', className)}>
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div>
          <Typography variant="heading-lg" weight="bold">
            Vital Wheel Network
          </Typography>
          <Typography variant="body-sm" color="muted">
            Interactive health relationship mapping
          </Typography>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={showNetwork ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowNetwork(!showNetwork)}
          >
            <Icon name="plus" size="sm" />
            Network {showNetwork ? 'On' : 'Off'}
          </Button>
          
          <Button
            variant={pulseAnimation ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setPulseAnimation(!pulseAnimation)}
          >
            <Icon name="activity" size="sm" />
            Pulse {pulseAnimation ? 'On' : 'Off'}
          </Button>
        </div>
      </div>

      {/* Main Wheel Visualization */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          <svg width="400" height="400" viewBox="-200 -200 400 400" className="overflow-visible">
            {/* Background Circles */}
            <circle cx="0" cy="0" r="60" fill="none" stroke="rgb(229, 231, 235)" strokeWidth="1" opacity="0.5" />
            <circle cx="0" cy="0" r="105" fill="none" stroke="rgb(229, 231, 235)" strokeWidth="1" opacity="0.3" />
            <circle cx="0" cy="0" r="150" fill="none" stroke="rgb(229, 231, 235)" strokeWidth="1" opacity="0.3" />

            {/* Network Connections */}
            {showNetwork && networkConnections.map(connection => {
              const fromSegment = wheelSegments.find(s => s.id === connection.from);
              const toSegment = wheelSegments.find(s => s.id === connection.to);
              
              if (!fromSegment || !toSegment) return null;
              
              const isHighlighted = hoveredSegment === connection.from || 
                                 hoveredSegment === connection.to ||
                                 selectedSegment === connection.from ||
                                 selectedSegment === connection.to;
              
              return (
                <motion.path
                  key={`${connection.from}-${connection.to}`}
                  d={getConnectionPath(fromSegment, toSegment)}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth={isHighlighted ? connection.strength * 3 : connection.strength * 1.5}
                  opacity={isHighlighted ? 0.8 : 0.3}
                  strokeDasharray={connection.animated ? "5,5" : "none"}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    strokeDashoffset: connection.animated ? [0, -10] : 0
                  }}
                  transition={{ 
                    pathLength: { duration: 0.8 },
                    strokeDashoffset: { 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }
                  }}
                />
              );
            })}

            {/* Wheel Segments */}
            {wheelSegments.map(segment => {
              const isSelected = selectedSegment === segment.id;
              const isHovered = hoveredSegment === segment.id;
              const segmentColor = getStatusColor(segment.score.status);
              
              return (
                <g key={segment.id}>
                  {/* Segment Path */}
                  <motion.path
                    d={getSegmentPath(segment)}
                    fill={segmentColor}
                    stroke="white"
                    strokeWidth="2"
                    opacity={isSelected || isHovered ? 0.9 : 0.7}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    animate={{
                      scale: pulseAnimation ? [1, 1 + segment.pulseIntensity * 0.1, 1] : 1
                    }}
                    transition={{
                      scale: {
                        duration: 2 + segment.pulseIntensity,
                        repeat: pulseAnimation ? Infinity : 0,
                        ease: "easeInOut"
                      }
                    }}
                    onClick={() => {
                      setSelectedSegment(isSelected ? null : segment.id);
                      onScoreClick?.(segment.score);
                    }}
                    onMouseEnter={() => setHoveredSegment(segment.id)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  
                  {/* Segment Label */}
                  {(() => {
                    const center = getSegmentCenter(segment);
                    return (
                      <g>
                        <text
                          x={center.x}
                          y={center.y - 5}
                          textAnchor="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {segment.score.value}
                        </text>
                        <text
                          x={center.x}
                          y={center.y + 8}
                          textAnchor="middle"
                          fill="white"
                          fontSize="8"
                          opacity="0.9"
                          className="pointer-events-none"
                        >
                          {segment.score.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })()}
                  
                  {/* Trend Indicator */}
                  {segment.score.trend !== 0 && (
                    <motion.circle
                      cx={getSegmentCenter(segment, 140).x}
                      cy={getSegmentCenter(segment, 140).y}
                      r="4"
                      fill={segment.score.trend > 0 ? '#10b981' : '#ef4444'}
                      stroke="white"
                      strokeWidth="1"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* Center Hub */}
            <motion.circle
              cx="0"
              cy="0"
              r="50"
              fill="url(#centerGradient)"
              stroke="white"
              strokeWidth="3"
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedSegment(null)}
            />
            
            <text
              x="0"
              y="-5"
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontWeight="bold"
              className="pointer-events-none"
            >
              {Math.round(scores.reduce((sum, score) => sum + score.value, 0) / scores.length)}
            </text>
            <text
              x="0"
              y="10"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              opacity="0.9"
              className="pointer-events-none"
            >
              Overall
            </text>

            {/* SVG Definitions */}
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                <stop offset="100%" stopColor="rgb(29, 78, 216)" />
              </radialGradient>
            </defs>
          </svg>

          {/* Floating Metric Details */}
          <AnimatePresence>
            {selectedSegment && (
              <motion.div
                className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 min-w-[250px] z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {(() => {
                  const segment = wheelSegments.find(s => s.id === selectedSegment);
                  if (!segment) return null;
                  
                  const connectedMetrics = networkConnections
                    .filter(c => c.from === segment.id || c.to === segment.id)
                    .map(c => c.from === segment.id ? c.to : c.from)
                    .map(id => wheelSegments.find(s => s.id === id)?.score.name)
                    .filter(Boolean);
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Typography variant="heading-sm">
                          {segment.score.name}
                        </Typography>
                        <button
                          onClick={() => setSelectedSegment(null)}
                          className="text-neutral-400 hover:text-neutral-600"
                        >
                          <Icon name="x" size="sm" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <Typography variant="heading-lg" weight="bold">
                          {segment.score.value}/100
                        </Typography>
                        <Badge variant={segment.score.status === 'no-data' ? 'outline' : segment.score.status}>
                          {segment.score.status}
                        </Badge>
                      </div>
                      
                      {segment.score.trend !== 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <Icon 
                            name={segment.score.trend > 0 ? 'trendingUp' : 'trendingDown'} 
                            size="sm" 
                            color={segment.score.trend > 0 ? 'success' : 'danger'}
                          />
                          <Typography variant="body-sm">
                            {segment.score.trend > 0 ? '+' : ''}{segment.score.trend}% change
                          </Typography>
                        </div>
                      )}
                      
                      <div className="border-t border-neutral-200 pt-3">
                        <Typography variant="body-sm" weight="medium" className="mb-2">
                          Connected Metrics:
                        </Typography>
                        <div className="flex flex-wrap gap-1">
                          {connectedMetrics.map((name, index) => (
                            <Badge key={index} variant="outline" size="xs">
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-4">
          <Typography variant="body-sm" color="muted">
            Timeline:
          </Typography>
          <div className="flex-1 max-w-md">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={timelinePosition}
              onChange={(e) => setTimelinePosition(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <Typography variant="body-sm" color="muted">
            {timelinePosition === 1 ? 'Current' : `${Math.round((1 - timelinePosition) * 12)} months ago`}
          </Typography>
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-neutral-200">
        {[
          { status: 'optimal', label: 'Optimal', color: '#10b981' },
          { status: 'good', label: 'Good', color: '#22c55e' },
          { status: 'attention', label: 'Attention', color: '#f59e0b' },
          { status: 'concern', label: 'Concern', color: '#ef4444' }
        ].map(item => (
          <div key={item.status} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <Typography variant="caption" color="muted">
              {item.label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};