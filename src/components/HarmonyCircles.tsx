import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthScore } from '../types';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { cn } from '../design-system/utils/cn';

interface HarmonyCirclesProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
  className?: string;
}


interface RippleEffect {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

export const HarmonyCircles: React.FC<HarmonyCirclesProps> = ({
  scores,
  onScoreClick,
  className
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [breathingMode, setBreathingMode] = useState(true);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [harmoniResonance, setHarmonicResonance] = useState(false);

  // Position metrics evenly around circle with radius based on score
  const positionedMetrics = useMemo(() => {
    return scores.map((score, index) => {
      // Calculate radius based on score value (60-180 range for visibility)
      const minRadius = 60;  // Minimum distance from center (low scores)
      const maxRadius = 180; // Maximum distance from center (high scores)
      const radius = minRadius + ((score.value / 100) * (maxRadius - minRadius));
      
      // Distribute metrics evenly around the circle (360 degrees / number of metrics)
      const angleStep = 360 / scores.length;
      const baseAngle = index * angleStep;
      
      return {
        id: score.id,
        score,
        radius,
        baseAngle: baseAngle * (Math.PI / 180), // Convert to radians
        rotationSpeed: 0.05, // Consistent slow rotation for all metrics
      };
    });
  }, [scores]);

  // Calculate overall health as simple average
  const overallHealth = useMemo(() => {
    const total = scores.reduce((sum, score) => sum + score.value, 0);
    return Math.round(total / scores.length);
  }, [scores]);

  // Generate breathing animation based on health harmony
  const breathingIntensity = useMemo(() => {
    const variance = scores.reduce((acc, score, _, arr) => {
      const mean = arr.reduce((sum, s) => sum + s.value, 0) / arr.length;
      return acc + Math.pow(score.value - mean, 2);
    }, 0) / scores.length;
    
    // Lower variance = more harmonious = deeper breathing
    return Math.max(0.02, 0.1 - (variance / 10000));
  }, [scores]);

  // Handle metric interaction with ripple effect
  const handleMetricClick = (metric: HealthScore, x: number, y: number) => {
    setSelectedMetric(selectedMetric === metric.id ? null : metric.id);
    onScoreClick?.(metric);
    
    // Create ripple effect
    const newRipple: RippleEffect = {
      id: `ripple-${Date.now()}`,
      x,
      y,
      timestamp: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Trigger harmonic resonance
    setHarmonicResonance(true);
    setTimeout(() => setHarmonicResonance(false), 1000);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
  };

  // Calculate metric position based on score value
  const getMetricPosition = (metric: any, time: number = Date.now()) => {
    const animatedAngle = metric.baseAngle + (time * metric.rotationSpeed * 0.001);
    
    return {
      x: Math.cos(animatedAngle) * metric.radius,
      y: Math.sin(animatedAngle) * metric.radius,
      angle: animatedAngle
    };
  };

  // Get status color with harmony considerations
  const getHarmonyColor = (status: string, harmonyLevel: number = 1) => {
    const baseColors = {
      'optimal': { h: 142, s: 76, l: 54 },
      'good': { h: 101, s: 61, l: 56 },
      'attention': { h: 38, s: 92, l: 50 },
      'concern': { h: 0, s: 84, l: 60 },
      'no-data': { h: 220, s: 9, l: 46 }
    };
    
    const color = baseColors[status as keyof typeof baseColors] || baseColors['no-data'];
    const adjustedSaturation = Math.min(100, color.s * harmonyLevel);
    const adjustedLightness = Math.min(95, color.l + (10 * (1 - harmonyLevel)));
    
    return `hsl(${color.h}, ${adjustedSaturation}%, ${adjustedLightness}%)`;
  };

  return (
    <div className={cn('relative w-full h-full flex flex-col', className)}>
      {/* Harmony Controls */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div>
          <Typography variant="heading-lg" weight="bold">
            Harmony Circles
          </Typography>
          <Typography variant="body-sm" color="muted">
            Finding balance in your wellness journey
          </Typography>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={breathingMode ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setBreathingMode(!breathingMode)}
          >
            <Icon name="heart" size="sm" />
            Breathing {breathingMode ? 'On' : 'Off'}
          </Button>
          
          <Typography variant="body-sm" color="muted">
            Distance from center = Health score
          </Typography>
        </div>
      </div>

      {/* Main Harmony Visualization */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-[400px] h-[400px]">
          <svg 
            width="400" 
            height="400" 
            viewBox="-200 -200 400 400" 
            className="overflow-visible"
          >
            {/* Background Guide Circles */}
            {[60, 120, 180].map((radius, index) => (
              <motion.circle
                key={`guide-${radius}`}
                cx="0"
                cy="0"
                r={radius}
                fill="none"
                stroke="rgba(59, 130, 246, 0.08)"
                strokeWidth="1"
                strokeDasharray="2,4"
                animate={{
                  scale: breathingMode ? [1, 1 + breathingIntensity, 1] : 1
                }}
                transition={{
                  duration: 4 + index,
                  repeat: breathingMode ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Radial Guide Lines */}
            {positionedMetrics.map((metric, index) => {
              const outerPosition = {
                x: Math.cos(metric.baseAngle) * 190,
                y: Math.sin(metric.baseAngle) * 190
              };
              
              return (
                <motion.line
                  key={`radial-${metric.id}`}
                  x1="0"
                  y1="0"
                  x2={outerPosition.x}
                  y2={outerPosition.y}
                  stroke="rgba(59, 130, 246, 0.05)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              );
            })}

            {/* Connection Lines to adjacent metrics */}
            {positionedMetrics.map((metric, index) => {
              const position = getMetricPosition(metric);
              // Connect to next metric in circle (wrapping around)
              const nextIndex = (index + 1) % positionedMetrics.length;
              const nextMetric = positionedMetrics[nextIndex];
              const nextPosition = getMetricPosition(nextMetric);

              return (
                <motion.line
                  key={`connection-${metric.id}-${nextMetric.id}`}
                  x1={position.x}
                  y1={position.y}
                  x2={nextPosition.x}
                  y2={nextPosition.y}
                  stroke="rgba(59, 130, 246, 0.15)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: harmoniResonance ? 1 : 0.4 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}

            {/* Metric Circles */}
            {positionedMetrics.map((metric) => {
              const position = getMetricPosition(metric);
              const isSelected = selectedMetric === metric.score.id;
              const harmonyLevel = 1 - (Math.abs(metric.score.value - overallHealth) / 100);
                
              return (
                <g key={metric.score.id}>
                  {/* Metric Glow Effect */}
                  <motion.circle
                    cx={position.x}
                    cy={position.y}
                    r="25"
                    fill={`url(#glow-${metric.score.id})`}
                    opacity={isSelected ? 0.4 : 0.2}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: isSelected ? [0.4, 0.6, 0.4] : [0.2, 0.3, 0.2]
                    }}
                    transition={{
                      duration: 2 + (harmonyLevel * 2),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Main Metric Circle */}
                  <motion.circle
                    cx={position.x}
                    cy={position.y}
                    r="18"
                    fill={getHarmonyColor(metric.score.status, harmonyLevel)}
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: breathingMode ? [1, 1 + breathingIntensity * harmonyLevel, 1] : 1
                    }}
                    transition={{
                      duration: 3 + harmonyLevel,
                      repeat: breathingMode ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    onClick={() => {
                      handleMetricClick(metric.score, position.x + 200, position.y + 200);
                    }}
                  />
                  
                  {/* Metric Value */}
                  <text
                    x={position.x}
                    y={position.y + 2}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {metric.score.value}
                  </text>
                  
                  {/* Metric Label */}
                  <text
                    x={position.x}
                    y={position.y + 35}
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="10"
                    opacity="0.8"
                    className="pointer-events-none"
                  >
                    {metric.score.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* Central Harmony Score */}
            <motion.g>
              <motion.circle
                cx="0"
                cy="0"
                r="40"
                fill="url(#centralGradient)"
                stroke="white"
                strokeWidth="3"
                className="cursor-pointer"
                animate={{
                  scale: breathingMode ? [1, 1 + breathingIntensity * 2, 1] : 1
                }}
                transition={{
                  duration: 6,
                  repeat: breathingMode ? Infinity : 0,
                  ease: "easeInOut"
                }}
                onClick={() => setSelectedMetric(null)}
              />
              
              <text
                x="0"
                y="-8"
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {overallHealth}
              </text>
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fill="white"
                fontSize="10"
                opacity="0.9"
                className="pointer-events-none"
              >
                Harmony
              </text>
            </motion.g>

            {/* Ripple Effects */}
            {ripples.map(ripple => (
              <motion.circle
                key={ripple.id}
                cx={ripple.x - 200}
                cy={ripple.y - 200}
                r="0"
                fill="none"
                stroke="rgba(59, 130, 246, 0.6)"
                strokeWidth="2"
                initial={{ r: 0, opacity: 1 }}
                animate={{ r: 50, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            ))}

            {/* SVG Gradients */}
            <defs>
              <radialGradient id="centralGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                <stop offset="100%" stopColor="rgb(29, 78, 216)" />
              </radialGradient>
              
              {scores.map(metric => (
                <radialGradient key={`glow-${metric.id}`} id={`glow-${metric.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={getHarmonyColor(metric.status, 0.8)} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={getHarmonyColor(metric.status, 0.4)} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>
          </svg>

          {/* Floating Metric Details */}
          <AnimatePresence>
            {selectedMetric && (
              <motion.div
                className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg border border-neutral-200 p-4 min-w-[250px] z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {(() => {
                  const metric = scores.find(s => s.id === selectedMetric);
                  if (!metric) return null;
                  
                  const harmonyLevel = 1 - (Math.abs(metric.value - overallHealth) / 100);
                  const positionedMetric = positionedMetrics.find(m => m.score.id === selectedMetric);
                  const distanceFromCenter = positionedMetric ? positionedMetric.radius : 0;
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Typography variant="heading-sm">
                          {metric.name}
                        </Typography>
                        <button
                          onClick={() => setSelectedMetric(null)}
                          className="text-neutral-400 hover:text-neutral-600"
                        >
                          <Icon name="x" size="sm" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <Typography variant="heading-lg" weight="bold">
                          {metric.value}/100
                        </Typography>
                        <Badge variant={metric.status === 'no-data' ? 'outline' : metric.status}>
                          {metric.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between">
                          <Typography variant="body-sm" color="muted">
                            Distance from Center:
                          </Typography>
                          <Typography variant="body-sm">
                            {Math.round(distanceFromCenter)}px
                          </Typography>
                        </div>
                        <div className="flex justify-between">
                          <Typography variant="body-sm" color="muted">
                            Harmony Level:
                          </Typography>
                          <Typography variant="body-sm">
                            {Math.round(harmonyLevel * 100)}%
                          </Typography>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                        <Typography variant="body-sm" weight="medium" className="text-blue-900 mb-1">
                          Harmony Insight
                        </Typography>
                        <Typography variant="body-sm" className="text-blue-700">
                          {metric.value >= 80 ? 
                            "This metric shows excellent health and is positioned in the outer harmony zone." :
                            metric.value >= 60 ?
                            "This metric is performing well and contributes positively to your overall health." :
                            "This metric is closer to center, indicating room for improvement in your health journey."
                          }
                        </Typography>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Score Distribution Legend */}
      <div className="flex items-center justify-center gap-8 pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-300" />
          <Typography variant="caption" color="muted">
            Center (Lower scores)
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="w-8 h-1 bg-gradient-to-r from-neutral-300 to-primary-500 rounded-full" />
          <div className="w-1 h-1 bg-primary-500 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500" />
          <Typography variant="caption" color="muted">
            Outer ring (Higher scores)
          </Typography>
        </div>
      </div>
    </div>
  );
};