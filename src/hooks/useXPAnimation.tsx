
import { useState, useEffect } from "react";

interface UseXPAnimationProps {
  targetXP: number;
  currentXP: number;
  isActive: boolean;
  duration?: number;
}

export const useXPAnimation = ({ 
  targetXP, 
  currentXP, 
  isActive, 
  duration = 1500 
}: UseXPAnimationProps) => {
  const [animatedXP, setAnimatedXP] = useState(currentXP);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isActive && targetXP !== currentXP) {
      setIsAnimating(true);
      const steps = 60;
      const increment = (targetXP - currentXP) / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        if (step <= steps) {
          setAnimatedXP(currentXP + (increment * step));
        } else {
          setAnimatedXP(targetXP);
          setIsAnimating(false);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => {
        clearInterval(timer);
        setIsAnimating(false);
      };
    }
  }, [isActive, targetXP, currentXP, duration]);

  return { animatedXP: Math.floor(animatedXP), isAnimating };
};
