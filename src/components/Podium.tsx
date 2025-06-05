
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

interface Winner {
  rank: number;
  name: string;
  timeTaken: string;
  correctAnswers: number;
  totalQuestions: number;
}

interface PodiumProps {
  winners: Winner[];
}

const Podium = ({ winners }: PodiumProps) => {
  const getPositionIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return null;
    }
  };

  const getPositionHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-40";
      case 2:
        return "h-32";
      case 3:
        return "h-24";
      default:
        return "h-20";
    }
  };

  const getPositionColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-t from-yellow-500/20 to-yellow-500/10 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-t from-gray-400/20 to-gray-400/10 border-gray-400/30";
      case 3:
        return "bg-gradient-to-t from-amber-600/20 to-amber-600/10 border-amber-600/30";
      default:
        return "bg-craft-panel border-craft-border";
    }
  };

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [winners[1], winners[0], winners[2]].filter(Boolean);

  return (
    <div className="flex items-end justify-center space-x-4 mb-8">
      {podiumOrder.map((winner, index) => {
        const actualRank = winner.rank;
        const displayOrder = [2, 1, 3][index];
        
        return (
          <div key={winner.rank} className="flex flex-col items-center">
            {/* Winner Info */}
            <Card className="bg-craft-panel border-craft-border p-4 mb-4 text-center min-w-[160px]">
              <div className="flex justify-center mb-3">
                {getPositionIcon(actualRank)}
              </div>
              
              <Avatar className="w-12 h-12 mx-auto mb-2">
                <AvatarFallback className="bg-craft-accent text-craft-bg">
                  {winner.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="font-semibold text-craft-text-primary text-sm mb-1">
                {winner.name}
              </h3>
              
              <div className="text-xs text-craft-text-secondary space-y-1">
                <div>Time: {winner.timeTaken}</div>
                <div>Score: {winner.correctAnswers}/{winner.totalQuestions}</div>
              </div>
            </Card>
            
            {/* Podium Base */}
            <div className={`
              w-24 ${getPositionHeight(actualRank)} 
              ${getPositionColor(actualRank)}
              border-2 rounded-t-lg flex items-center justify-center
              transition-all duration-300
            `}>
              <div className="text-2xl font-bold text-craft-text-primary">
                {actualRank}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Podium;
