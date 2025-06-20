import { useEffect, useState, useRef } from 'react';
import { cn } from '../../utils/cn';
import { ScoreCard, type ScoreCardProps } from '../ScoreCard';
import { transitions, hoverScale, focusRing } from '../../utils/animations';

interface AnimatedScoreCardProps extends ScoreCardProps {
  animateOnMount?: boolean;
  animationDelay?: number;
  enableHoverScale?: boolean;
  enablePulse?: boolean;
  staggerIndex?: number;
}

export const AnimatedScoreCard = ({
  animateOnMount = true,
  animationDelay = 0,
  enableHoverScale = true,
  enablePulse = false,
  staggerIndex = 0,
  className,
  value,
  ...props
}: AnimatedScoreCardProps) => {
  const [isVisible, setIsVisible] = useState(!animateOnMount);
  const [animatedValue, setAnimatedValue] = useState(animateOnMount ? 0 : value);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    if (!animateOnMount || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add stagger delay based on index
            const delay = animationDelay + (staggerIndex * 100);
            setTimeout(() => {
              setIsVisible(true);
              // Animate value counting up
              animateValueCount();
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [animateOnMount, animationDelay, staggerIndex]);

  // Animate value counting up
  const animateValueCount = () => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedValue(Math.round(increment * currentStep));
      } else {
        setAnimatedValue(value);
        clearInterval(timer);
      }
    }, stepDuration);
  };

  // Determine animation classes
  const animationClasses = cn(
    // Base transitions
    transitions.base,
    
    // Mount animation
    animateOnMount && (isVisible ? 'animate-scale-in opacity-100' : 'scale-95 opacity-0'),
    
    // Hover scale effect
    enableHoverScale && hoverScale.sm,
    
    // Pulse effect for critical values
    enablePulse && value < 40 && 'animate-pulse',
    
    // Focus ring
    focusRing.default,
    
    // Additional hover effects
    'hover:shadow-card-hover hover:border-primary-300',
    
    // Active state
    'active:shadow-card'
  );


  return (
    <div ref={cardRef} className={cn(animationClasses, className)}>
      <ScoreCard
        {...props}
        value={animatedValue}
        className="border-0 shadow-none hover:shadow-none"
      />
      
      {/* Additional animation elements */}
      {props.status === 'optimal' && isVisible && (
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-optimal-500 rounded-full animate-ping" />
          <div className="absolute inset-0 w-3 h-3 bg-optimal-500 rounded-full" />
        </div>
      )}
      
      {/* Heartbeat effect for health scores */}
      {props.icon === 'heart' && enablePulse && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 right-4 text-concern-500 animate-heartbeat">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedScoreCard;