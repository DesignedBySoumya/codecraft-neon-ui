
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface LeaderboardData {
  rank: number;
  name: string;
  timeTaken: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  rating: number;
}

interface LeaderboardTableProps {
  data: LeaderboardData[];
}

const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
        2: "bg-gray-400/20 text-gray-400 border-gray-400/30",
        3: "bg-amber-600/20 text-amber-600 border-amber-600/30"
      };
      return <Badge className={colors[rank as keyof typeof colors]}>#{rank}</Badge>;
    }
    return <Badge className="bg-craft-text-secondary/20 text-craft-text-secondary border-craft-text-secondary/30">#{rank}</Badge>;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating 
                ? "text-yellow-500 fill-yellow-500" 
                : "text-craft-text-secondary"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-craft-panel border-craft-border">
      <Table>
        <TableHeader>
          <TableRow className="border-craft-border">
            <TableHead className="text-craft-text-primary">Rank</TableHead>
            <TableHead className="text-craft-text-primary">Participant</TableHead>
            <TableHead className="text-craft-text-primary">Time Taken</TableHead>
            <TableHead className="text-craft-text-primary">Questions</TableHead>
            <TableHead className="text-craft-text-primary">Correct</TableHead>
            <TableHead className="text-craft-text-primary">Wrong</TableHead>
            <TableHead className="text-craft-text-primary">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((participant) => (
            <TableRow key={participant.rank} className="border-craft-border hover:bg-craft-bg/50">
              <TableCell>
                {getRankBadge(participant.rank)}
              </TableCell>
              
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-craft-accent text-craft-bg text-xs">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-craft-text-primary font-medium">
                    {participant.name}
                  </span>
                </div>
              </TableCell>
              
              <TableCell className="text-craft-text-secondary">
                {participant.timeTaken}
              </TableCell>
              
              <TableCell className="text-craft-text-secondary">
                {participant.totalQuestions}
              </TableCell>
              
              <TableCell>
                <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
                  {participant.correctAnswers}
                </Badge>
              </TableCell>
              
              <TableCell>
                <Badge className="bg-craft-error/20 text-craft-error border-craft-error/30">
                  {participant.wrongAnswers}
                </Badge>
              </TableCell>
              
              <TableCell>
                {renderStars(participant.rating)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LeaderboardTable;
