
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Trophy, Star } from "lucide-react";

interface CelebrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  xpGained: number;
  currentXP: number;
  newXP: number;
}

const CelebrationPopup = ({ isOpen, onClose, xpGained, currentXP, newXP }: CelebrationPopupProps) => {
  const [animatedXP, setAnimatedXP] = useState(currentXP);
  const [showGoldenEffects, setShowGoldenEffects] = useState(false);
  const [showXPSparkle, setShowXPSparkle] = useState(false);
  const [titleLetters, setTitleLetters] = useState<boolean[]>([]);

  useEffect(() => {
    if (isOpen) {
      setShowGoldenEffects(true);
      
      // Animate title letters one by one
      const title = "You Crushed It!";
      const letterTimings = title.split("").map((_, i) => setTimeout(() => {
        setTitleLetters(prev => {
          const newLetters = [...prev];
          newLetters[i] = true;
          return newLetters;
        });
      }, i * 100));

      // Animate XP count up
      const duration = 1500;
      const steps = 60;
      const increment = (newXP - currentXP) / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        if (step <= steps) {
          setAnimatedXP(currentXP + (increment * step));
        } else {
          setAnimatedXP(newXP);
          setShowXPSparkle(true);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => {
        clearInterval(timer);
        letterTimings.forEach(clearTimeout);
      };
    } else {
      setTitleLetters([]);
      setShowXPSparkle(false);
    }
  }, [isOpen, currentXP, newXP]);

  // Golden confetti particles
  const goldenConfetti = Array.from({ length: 25 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-bounce"
      style={{
        width: Math.random() * 6 + 4 + 'px',
        height: Math.random() * 6 + 4 + 'px',
        backgroundColor: ['#FFD700', '#FFB400', '#FFF2CC', '#FFAC33'][i % 4],
        borderRadius: Math.random() > 0.5 ? '50%' : '0%',
        left: `${10 + (i * 3.2)}%`,
        top: `${5 + (i % 5) * 15}%`,
        animationDelay: `${i * 120}ms`,
        animationDuration: `${2500 + (i * 150)}ms`,
        boxShadow: '0 0 6px rgba(255, 215, 0, 0.6)',
      }}
    />
  ));

  // Sparkle trails
  const sparkleTrails = Array.from({ length: 12 }, (_, i) => (
    <div
      key={`sparkle-${i}`}
      className="absolute w-1 h-1 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full animate-ping"
      style={{
        left: `${20 + (i * 5)}%`,
        top: `${15 + (i % 3) * 20}%`,
        animationDelay: `${i * 200}ms`,
        animationDuration: '1.5s',
      }}
    />
  ));

  const titleText = "You Crushed It!";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-0 max-w-md mx-auto overflow-hidden bg-gradient-to-br from-[#191919] to-[#3a2f1f] shadow-2xl shadow-amber-500/20">
        {/* Golden glow background */}
        <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent" />
        
        {/* Golden effects overlay */}
        {showGoldenEffects && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {goldenConfetti}
            {sparkleTrails}
            
            {/* Floating light rays */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`ray-${i}`}
                  className="absolute w-px h-20 bg-gradient-to-b from-amber-300/60 to-transparent animate-pulse"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: '10%',
                    transform: `rotate(${i * 45}deg)`,
                    animationDelay: `${i * 300}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative z-10 text-center p-6 space-y-6 animate-scale-in">
          {/* Central Trophy with Golden Glow */}
          <div className="flex justify-center">
            <div className="relative animate-bounce">
              {/* Golden glow behind trophy */}
              <div className="absolute inset-0 w-24 h-24 bg-gradient-radial from-amber-400/40 via-amber-500/20 to-transparent rounded-full animate-pulse scale-150" />
              
              {/* Trophy container with metallic effect */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50 border-2 border-amber-200">
                <Trophy className="w-10 h-10 text-amber-900 drop-shadow-sm" />
                
                {/* Metallic shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent rounded-full" />
              </div>
              
              {/* Rotating stars around trophy */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center animate-spin shadow-lg shadow-amber-400/50">
                <Star className="w-3 h-3 text-amber-900" />
              </div>
            </div>
          </div>

          {/* Animated Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-amber-100 flex justify-center space-x-1">
              {titleText.split("").map((letter, i) => (
                <span
                  key={i}
                  className={`inline-block transition-all duration-300 ${
                    titleLetters[i] 
                      ? 'transform scale-100 opacity-100 text-amber-200' 
                      : 'transform scale-0 opacity-0'
                  } ${
                    letter === "!" 
                      ? 'animate-bounce text-amber-300 drop-shadow-lg' 
                      : ''
                  }`}
                  style={{
                    animationDelay: letter === "!" ? '0.5s' : '0ms',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
              <span className="text-2xl">🎉</span>
            </h2>
            <p className="text-amber-200/80 animate-fade-in" style={{ animationDelay: '1s' }}>
              All test cases passed successfully
            </p>
          </div>

          {/* XP Gain Display with Embossed Badge */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-3">
              {/* Embossed XP Badge */}
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg border border-amber-200">
                <Zap className="w-6 h-6 text-amber-900" />
                {/* Metallic embossed effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/20 rounded-lg" />
                <div className="absolute inset-0 shadow-inner rounded-lg" />
              </div>
              
              {/* Animated XP Text */}
              <span className={`text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent transition-all duration-500 ${
                showXPSparkle ? 'animate-bounce' : ''
              }`}>
                +{xpGained} XP
                {showXPSparkle && (
                  <span className="inline-block ml-2 text-yellow-300 animate-ping">✨</span>
                )}
              </span>
            </div>

            {/* XP Progress with Golden Ring */}
            <div className="flex items-center justify-center space-x-3 text-sm">
              <span className="text-amber-200/80">
                {Math.floor(animatedXP)} XP
              </span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              
              {/* Level Badge with Animated Ring */}
              <div className="relative">
                <Badge className="bg-gradient-to-r from-amber-600/30 to-amber-500/30 text-amber-200 border border-amber-400/50 backdrop-blur-sm">
                  Level 12
                </Badge>
                
                {/* Animated progress ring around badge */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-60 animate-spin" 
                     style={{ clipPath: 'polygon(0% 0%, 70% 0%, 70% 100%, 0% 100%)' }} />
              </div>
            </div>
          </div>

          {/* Premium CTA Button */}
          <Button
            onClick={onClose}
            className="group relative w-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:via-yellow-400 hover:to-amber-500 text-amber-900 font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-300 overflow-hidden"
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Shooting stars on hover */}
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500" style={{ animationDelay: '200ms' }} />
            
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Keep Solving!</span>
              <span className="text-lg">🚀</span>
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationPopup;
