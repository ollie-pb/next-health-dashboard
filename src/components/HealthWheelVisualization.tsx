import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthScore } from '../types';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Icon } from '../design-system/atoms/Icon';
import { cn } from '../design-system/utils/cn';

interface HealthWheelVisualizationProps {
  scores: HealthScore[];
  onScoreClick?: (score: HealthScore) => void;
  className?: string;
}

interface ConstellationCircle {
  id: string;
  score: HealthScore;
  x: number;
  y: number;
  angle: number;
}

export const HealthWheelVisualization: React.FC<HealthWheelVisualizationProps> = ({
  scores,
  onScoreClick,
  className
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Create constellation layout - circles arranged in single layer around center  
  const constellationCircles: ConstellationCircle[] = useMemo(() => {
    const totalCircles = scores.length;
    const radius = 160; // Increased radius for more space
    
    return scores.map((score, index) => {
      const angle = (index / totalCircles) * 360;
      const radian = (angle * Math.PI) / 180;
      
      return {
        id: score.id,
        score,
        x: Math.cos(radian) * radius,
        y: Math.sin(radian) * radius,
        angle
      };
    });
  }, [scores]);

  // Calculate overall health score
  const overallScore = Math.round(
    scores.reduce((sum, score) => sum + score.value, 0) / scores.length
  );

  // Get status colors matching the design
  const getStatusColor = (status: string) => {
    const colorMap = {
      'optimal': '#10b981',  // Green
      'good': '#10b981',     // Green  
      'attention': '#f59e0b', // Orange
      'concern': '#ef4444',   // Red
      'no-data': '#7d8ba0'    // Gray
    };
    return colorMap[status as keyof typeof colorMap] || colorMap['no-data'];
  };


  return (
    <div className={cn('flex flex-col items-center justify-center w-full h-full', className)}>
      {/* Health Constellation Visualization */}
      <div className="flex items-center justify-center w-full flex-1">
        <div className="relative w-full max-w-2xl aspect-square">
          <svg 
            className="w-full h-full overflow-visible" 
            viewBox="-240 -240 480 480" 
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Individual health metric circles */}
            {constellationCircles.map((circle, index) => {
              const isSelected = selectedSegment === circle.id;
              const isHovered = hoveredSegment === circle.id;
              const statusColor = getStatusColor(circle.score.status);
              
              return (
                <motion.g 
                  key={circle.id}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  {/* Subtle glow effect on hover */}
                  {isHovered && (
                    <motion.circle
                      cx={circle.x}
                      cy={circle.y}
                      r="35"
                      fill={statusColor}
                      opacity="0.15"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.15 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none"
                    />
                  )}
                  
                  {/* Metric circle */}
                  <motion.circle
                    cx={circle.x}
                    cy={circle.y}
                    r="28"
                    fill="white"
                    stroke={statusColor}
                    strokeWidth={isSelected ? "4" : isHovered ? "3" : "3"}
                    className="cursor-pointer drop-shadow-lg"
                    whileHover={{ 
                      scale: 1.12,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      strokeWidth: isSelected ? 4 : isHovered ? 3 : 3,
                    }}
                    transition={{
                      strokeWidth: { duration: 0.2 }
                    }}
                    onClick={() => {
                      setSelectedSegment(isSelected ? null : circle.id);
                      onScoreClick?.(circle.score);
                    }}
                    onMouseEnter={() => setHoveredSegment(circle.id)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                  
                  {/* Score value */}
                  <motion.text
                    x={circle.x}
                    y={circle.y + 6}
                    textAnchor="middle"
                    fill="#1a1d21"
                    fontSize="18"
                    fontWeight="700"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none"
                    animate={{
                      fontSize: isHovered ? "20" : "18"
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {circle.score.value}
                  </motion.text>
                  
                  {/* Label below circle */}
                  <motion.text
                    x={circle.x}
                    y={circle.y + 48}
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    className="pointer-events-none"
                    animate={{
                      fill: isHovered ? "#374151" : "#6b7280",
                      fontSize: isHovered ? "9" : "8"
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {circle.score.name.toUpperCase()}
                  </motion.text>
                </motion.g>
              );
            })}

            {/* Central overall score */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.3,
                duration: 0.8,
                type: "spring",
                stiffness: 80,
                damping: 20
              }}
            >
              {/* Subtle breathing animation */}
              <motion.circle
                cx="0"
                cy="0"
                r="52"
                fill="#374151"
                opacity="0.08"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.08, 0.12, 0.08]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="pointer-events-none"
              />
              
              <motion.circle
                cx="0"
                cy="0"
                r="45"
                fill="white"
                stroke="#374151"
                strokeWidth="3"
                className="cursor-pointer drop-shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSegment(null)}
              />
              
              <motion.text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="#1f2937"
                fontSize="28"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="pointer-events-none"
                animate={{
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {overallScore}
              </motion.text>
              
              <text
                x="0"
                y="16"
                textAnchor="middle"
                fill="#6b7280"
                fontSize="9"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="pointer-events-none"
              >
                OVERALL
              </text>
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fill="#6b7280"
                fontSize="9"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="pointer-events-none"
              >
                HEALTH SCORE
              </text>
            </motion.g>
          </svg>

          {/* Floating metric details */}
          <AnimatePresence>
            {selectedSegment && (
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 min-w-[240px] z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {(() => {
                  const circle = constellationCircles.find(c => c.id === selectedSegment);
                  if (!circle) return null;
                  
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Typography variant="heading-sm">
                          {circle.score.name}
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
                          {circle.score.value}/100
                        </Typography>
                        <Badge variant={circle.score.status === 'no-data' ? 'outline' : circle.score.status}>
                          {circle.score.status}
                        </Badge>
                      </div>
                      
                      {circle.score.trend !== 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <Icon 
                            name={circle.score.trend > 0 ? 'trendingUp' : 'trendingDown'} 
                            size="sm" 
                            color={circle.score.trend > 0 ? 'success' : 'danger'}
                          />
                          <Typography variant="body-sm">
                            {circle.score.trend > 0 ? '+' : ''}{circle.score.trend}% change
                          </Typography>
                        </div>
                      )}
                      
                      <div className="border-t border-neutral-200 pt-3">
                        <Typography variant="body-sm" color="muted">
                          {circle.score.components.length} components • Updated {circle.score.lastUpdate}
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

    </div>
  );
};