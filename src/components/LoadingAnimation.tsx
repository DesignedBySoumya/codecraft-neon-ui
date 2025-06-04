
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LoadingAnimationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingAnimation = ({ className = "", size = 'md' }: LoadingAnimationProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={sizeClasses[size]}>
        <DotLottieReact
          src="https://lottie.host/72c72f1e-5a09-4abd-88c4-e93dc96b34ec/q8DuAuLIof.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
