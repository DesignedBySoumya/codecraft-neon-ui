
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Podium from "@/components/Podium";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users } from "lucide-react";

const ResultsPage = () => {
  const { id } = useParams();

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: "Alice Johnson",
      timeTaken: "8:45",
      totalQuestions: 4,
      correctAnswers: 4,
      wrongAnswers: 0,
      rating: 5
    },
    {
      rank: 2,
      name: "Bob Smith",
      timeTaken: "9:12",
      totalQuestions: 4,
      correctAnswers: 4,
      wrongAnswers: 0,
      rating: 5
    },
    {
      rank: 3,
      name: "Carol Davis",
      timeTaken: "9:58",
      totalQuestions: 4,
      correctAnswers: 4,
      wrongAnswers: 0,
      rating: 5
    },
    {
      rank: 4,
      name: "David Wilson",
      timeTaken: "7:32",
      totalQuestions: 4,
      correctAnswers: 3,
      wrongAnswers: 1,
      rating: 4
    },
    {
      rank: 5,
      name: "Eva Brown",
      timeTaken: "8:21",
      totalQuestions: 4,
      correctAnswers: 3,
      wrongAnswers: 1,
      rating: 4
    },
    {
      rank: 6,
      name: "Frank Miller",
      timeTaken: "9:45",
      totalQuestions: 4,
      correctAnswers: 3,
      wrongAnswers: 1,
      rating: 4
    },
    {
      rank: 7,
      name: "Grace Taylor",
      timeTaken: "6:18",
      totalQuestions: 4,
      correctAnswers: 2,
      wrongAnswers: 2,
      rating: 3
    },
    {
      rank: 8,
      name: "Henry Anderson",
      timeTaken: "9:03",
      totalQuestions: 4,
      correctAnswers: 2,
      wrongAnswers: 2,
      rating: 3
    }
  ];

  const topThree = leaderboardData.slice(0, 3);
  const contestStats = {
    title: "Weekly Contest 387",
    totalParticipants: 12847,
    avgTime: "8:34",
    difficulty: "Mixed"
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Contest Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-craft-text-primary mb-4">Contest Results</h1>
          
          <Card className="bg-craft-panel border-craft-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-craft-text-primary mb-2">{contestStats.title}</h2>
                <div className="flex items-center space-x-6 text-sm text-craft-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{contestStats.totalParticipants.toLocaleString()} participants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Avg time: {contestStats.avgTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>4 problems</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
                Completed
              </Badge>
            </div>
          </Card>
        </div>

        {/* Podium */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-craft-text-primary mb-6">Top Performers</h2>
          <Podium winners={topThree} />
        </div>

        {/* Full Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold text-craft-text-primary mb-6">Full Leaderboard</h2>
          <LeaderboardTable data={leaderboardData} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
