import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HealthScore } from '../types';
import { DashboardLayout } from '../design-system/layouts/DashboardLayout';
import { Typography } from '../design-system/atoms/Typography';
import { Badge } from '../design-system/atoms/Badge';
import { Button } from '../design-system/atoms/Button';
import { Icon } from '../design-system/atoms/Icon';
import { cn } from '../design-system/utils/cn';

interface MainDashboardProps {
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

export const MainDashboard: React.FC<MainDashboardProps> = ({
  scores,
  onScoreClick,
  className
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [showNetwork, setShowNetwork] = useState(true);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Create wheel segments with equal distribution
  const wheelSegments: WheelSegment[] = useMemo(() => {
    const segmentAngle = 360 / scores.length;
    
    return scores.map((score, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const centerAngle = startAngle + segmentAngle / 2;
      
      // Calculate pulse intensity based on recent changes (more subtle for premium feel)
      const pulseIntensity = Math.abs(score.trend) / 20; // Reduced intensity for elegance
      
      return {
        id: score.id,
        score,
        startAngle,
        endAngle,
        centerAngle,
        radius: 140, // Slightly smaller for better proportions
        pulseIntensity: Math.max(0.05, pulseIntensity)
      };
    });
  }, [scores]);

  // Enhanced network connections with Next Health health science
  const networkConnections: NetworkConnection[] = useMemo(() => {
    const connections: NetworkConnection[] = [];
    
    // Refined health metric relationships based on Next Health's approach
    const relationshipMap: Record<string, { targets: string[], strength: number }[]> = {
      'cardiovascular': [
        { targets: ['metabolic', 'activity'], strength: 0.9 },
        { targets: ['stress', 'sleep'], strength: 0.7 },
        { targets: ['nutrition'], strength: 0.6 }
      ],
      'metabolic': [
        { targets: ['cardiovascular', 'nutrition'], strength: 0.9 },
        { targets: ['activity', 'hormonal'], strength: 0.7 },
        { targets: ['sleep'], strength: 0.5 }
      ],
      'cognitive': [
        { targets: ['sleep', 'stress'], strength: 0.8 },
        { targets: ['nutrition', 'activity'], strength: 0.6 },
        { targets: ['hormonal'], strength: 0.5 }
      ],
      'immune': [
        { targets: ['stress', 'sleep'], strength: 0.8 },
        { targets: ['nutrition', 'activity'], strength: 0.7 },
        { targets: ['hormonal'], strength: 0.4 }
      ],
      'sleep': [
        { targets: ['cognitive', 'stress'], strength: 0.8 },
        { targets: ['hormonal', 'immune'], strength: 0.7 },
        { targets: ['cardiovascular'], strength: 0.6 }
      ],
      'stress': [
        { targets: ['cardiovascular', 'immune'], strength: 0.8 },
        { targets: ['cognitive', 'sleep'], strength: 0.8 },
        { targets: ['digestive'], strength: 0.6 }
      ],
      'hormonal': [
        { targets: ['sleep', 'stress'], strength: 0.7 },
        { targets: ['reproductive', 'metabolic'], strength: 0.8 },
        { targets: ['bone'], strength: 0.6 }
      ],
      'nutrition': [
        { targets: ['metabolic', 'immune'], strength: 0.8 },
        { targets: ['digestive', 'activity'], strength: 0.7 },
        { targets: ['cognitive'], strength: 0.5 }
      ],
      'activity': [
        { targets: ['cardiovascular', 'metabolic'], strength: 0.9 },
        { targets: ['bone', 'nutrition'], strength: 0.7 },
        { targets: ['sleep'], strength: 0.6 }
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
              animated: Math.abs(segment.score.trend) > 3 || Math.abs(targetSegment.score.trend) > 3
            });
          }
        });
      });
    });

    return connections;
  }, [wheelSegments]);

  // Navigation items for sidebar
  const sidebarItems = [
    { label: 'Health Overview', active: true, icon: 'heart' as const, href: '#' },
    { label: 'Health Scores', icon: 'activity' as const, badge: scores.length.toString(), href: '#' },
    { label: 'Biomarkers', icon: 'pulse' as const, badge: '75', href: '#' },
    { label: 'Lab Results', icon: 'barChart' as const, badge: '8', href: '#' },
    { label: 'Trends & Analytics', icon: 'trendingUp' as const, href: '#' },
    { label: 'Health Goals', icon: 'check' as const, href: '#' },
    { label: 'Appointments', icon: 'calendar' as const, badge: '2', href: '#' },
    { label: 'Settings', icon: 'settings' as const, href: '#' },
  ];

  const breadcrumbs = [
    { label: 'Dashboard', icon: 'home' as const, href: '#' },
    { label: 'Health Overview' },
  ];

  // Calculate overall health score
  const overallScore = Math.round(
    scores.reduce((sum, score) => sum + score.value, 0) / scores.length
  );

  // Get Next Health brand colors for segments
  const getSegmentColor = (status: string, opacity: number = 1) => {
    const colors = {
      'optimal': `rgba(16, 185, 129, ${opacity})`, // Emerald
      'good': `rgba(34, 197, 94, ${opacity})`,     // Green
      'attention': `rgba(245, 158, 11, ${opacity})`, // Amber
      'concern': `rgba(239, 68, 68, ${opacity})`,   // Red
      'no-data': `rgba(125, 139, 160, ${opacity})`  // Neutral
    };
    return colors[status as keyof typeof colors] || colors['no-data'];
  };

  // Calculate segment path for SVG
  const getSegmentPath = (segment: WheelSegment, innerRadius: number = 50) => {
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
  const getSegmentCenter = (segment: WheelSegment, radius: number = 95) => {
    const centerRad = (segment.centerAngle * Math.PI) / 180;
    return {
      x: Math.cos(centerRad) * radius,
      y: Math.sin(centerRad) * radius
    };
  };

  // Get connection line path with elegant curves
  const getConnectionPath = (from: WheelSegment, to: WheelSegment) => {
    const fromCenter = getSegmentCenter(from, 70);
    const toCenter = getSegmentCenter(to, 70);
    
    // Create subtle curved path for premium feel
    const midX = (fromCenter.x + toCenter.x) / 2;
    const midY = (fromCenter.y + toCenter.y) / 2;
    const curvature = 0.2; // Reduced curvature for subtlety
    const controlX = midX + (midY * curvature);
    const controlY = midY - (midX * curvature);
    
    return `M ${fromCenter.x} ${fromCenter.y} Q ${controlX} ${controlY} ${toCenter.x} ${toCenter.y}`;
  };

  return (
    <DashboardLayout
      title="Health Overview"
      subtitle="Your comprehensive wellness dashboard"
      headerIcon="heart"
      breadcrumbs={breadcrumbs}
      sidebarItems={sidebarItems}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      headerActions={
        <div className="flex items-center gap-3">
          <Badge variant="primary" size="sm">
            {scores.length} Health Metrics
          </Badge>
          <Badge 
            variant={overallScore >= 80 ? 'optimal' : overallScore >= 60 ? 'good' : 'attention'} 
            size="sm"
          >
            Overall: {overallScore}
          </Badge>
          <Button variant="primary" size="sm">
            <Icon name="calendar" size="sm" />
            Schedule Assessment
          </Button>
        </div>
      }
    >
      <div className={cn('flex flex-col h-full', className)}>
        {/* Vitality Quote */}
        <div className="mb-6 text-center">
          <Typography variant="body-lg" className="italic text-neutral-600 font-serif">
            "Health is not the absence of disease. Health is the abundance of vitality."
          </Typography>
          <Typography variant="caption" color="muted" className="mt-1">
            — Next Health Philosophy
          </Typography>
        </div>

        {/* Wheel Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Typography variant="heading-md" weight="bold">
              Your Health Network
            </Typography>
            <Typography variant="body-sm" color="muted">
              {scores.length} interconnected health metrics
            </Typography>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant={showNetwork ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowNetwork(!showNetwork)}
            >
              <Icon name="plus" size="sm" />
              Connections
            </Button>
            
            <Button
              variant={pulseAnimation ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setPulseAnimation(!pulseAnimation)}
            >
              <Icon name="activity" size="sm" />
              Live Pulse
            </Button>
          </div>
        </div>

        {/* Main Wheel Visualization */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <svg width="320" height="320" viewBox="-160 -160 320 320" className="overflow-visible">
              {/* Background Circles */}
              <circle cx="0" cy="0" r="50" fill="none" stroke="rgb(208, 216, 224)" strokeWidth="1" opacity="0.3" />
              <circle cx="0" cy="0" r="95" fill="none" stroke="rgb(208, 216, 224)" strokeWidth="1" opacity="0.2" />
              <circle cx="0" cy="0" r="140" fill="none" stroke="rgb(208, 216, 224)" strokeWidth="1" opacity="0.2" />

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
                    stroke="#4a74b8" // Next Health primary blue
                    strokeWidth={isHighlighted ? connection.strength * 2.5 : connection.strength * 1.2}
                    opacity={isHighlighted ? 0.6 : 0.25}
                    strokeDasharray={connection.animated ? "3,3" : "none"}
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      strokeDashoffset: connection.animated ? [0, -6] : 0
                    }}
                    transition={{ 
                      pathLength: { duration: 1.2, ease: "easeOut" },
                      strokeDashoffset: { 
                        duration: 3, 
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
                const segmentColor = getSegmentColor(segment.score.status);
                
                return (
                  <g key={segment.id}>
                    {/* Segment Path */}
                    <motion.path
                      d={getSegmentPath(segment)}
                      fill={segmentColor}
                      stroke="white"
                      strokeWidth="2"
                      opacity={isSelected || isHovered ? 0.9 : 0.8}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      animate={{
                        scale: pulseAnimation ? [1, 1 + segment.pulseIntensity * 0.1, 1] : 1
                      }}
                      transition={{
                        scale: {
                          duration: 4 + segment.pulseIntensity * 2, // Slower, more elegant
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
                            y={center.y - 4}
                            textAnchor="middle"
                            fill="white"
                            fontSize="13"
                            fontWeight="600"
                            fontFamily="Montserrat, sans-serif"
                            className="pointer-events-none"
                          >
                            {segment.score.value}
                          </text>
                          <text
                            x={center.x}
                            y={center.y + 10}
                            textAnchor="middle"
                            fill="white"
                            fontSize="9"
                            opacity="0.95"
                            fontFamily="Montserrat, sans-serif"
                            className="pointer-events-none"
                          >
                            {segment.score.name.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })()}
                    
                    {/* Trend Indicator */}
                    {Math.abs(segment.score.trend) > 2 && (
                      <motion.circle
                        cx={getSegmentCenter(segment, 125).x}
                        cy={getSegmentCenter(segment, 125).y}
                        r="3"
                        fill={segment.score.trend > 0 ? '#10b981' : '#ef4444'}
                        stroke="white"
                        strokeWidth="1"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Central Health Score */}
              <motion.circle
                cx="0"
                cy="0"
                r="40"
                fill="url(#centralGradient)"
                stroke="white"
                strokeWidth="3"
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                animate={{
                  scale: pulseAnimation ? [1, 1.03, 1] : 1
                }}
                transition={{
                  duration: 6,
                  repeat: pulseAnimation ? Infinity : 0,
                  ease: "easeInOut"
                }}
                onClick={() => setSelectedSegment(null)}
              />
              
              <text
                x="0"
                y="-6"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="700"
                fontFamily="Montserrat, sans-serif"
                className="pointer-events-none"
              >
                {overallScore}
              </text>
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fill="white"
                fontSize="10"
                opacity="0.95"
                fontFamily="Montserrat, sans-serif"
                className="pointer-events-none"
              >
                Overall
              </text>

              {/* SVG Definitions */}
              <defs>
                <radialGradient id="centralGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4a74b8" />
                  <stop offset="100%" stopColor="#314570" />
                </radialGradient>
              </defs>
            </svg>

            {/* Floating Metric Details */}
            <AnimatePresence>
              {selectedSegment && (
                <motion.div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 min-w-[280px] z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
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
                          <Typography variant="heading-sm" className="font-display">
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
                              {segment.score.trend > 0 ? '+' : ''}{segment.score.trend}% vs last assessment
                            </Typography>
                          </div>
                        )}
                        
                        <div className="border-t border-neutral-200 pt-3">
                          <Typography variant="body-sm" weight="medium" className="mb-2">
                            Connected Health Areas:
                          </Typography>
                          <div className="flex flex-wrap gap-1">
                            {connectedMetrics.slice(0, 4).map((name, index) => (
                              <Badge key={index} variant="outline" size="xs">
                                {name}
                              </Badge>
                            ))}
                            {connectedMetrics.length > 4 && (
                              <Badge variant="outline" size="xs">
                                +{connectedMetrics.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                          <Button variant="primary" size="sm" className="flex-1">
                            Optimize
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Health Status Legend */}
        <div className="flex items-center justify-center gap-6 pt-6 border-t border-neutral-200 mt-6">
          {[
            { status: 'optimal', label: 'Optimal', count: scores.filter(s => s.status === 'optimal').length },
            { status: 'good', label: 'Good', count: scores.filter(s => s.status === 'good').length },
            { status: 'attention', label: 'Attention', count: scores.filter(s => s.status === 'attention').length },
            { status: 'concern', label: 'Concern', count: scores.filter(s => s.status === 'concern').length }
          ].map(item => (
            <div key={item.status} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getSegmentColor(item.status) }}
              />
              <Typography variant="caption" color="muted">
                {item.label} ({item.count})
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};