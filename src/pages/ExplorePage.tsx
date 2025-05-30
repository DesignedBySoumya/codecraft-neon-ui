
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Zap, Users, Trophy, Star, Clock, Code } from "lucide-react";

const ExplorePage = () => {
  const stats = [
    { label: "Active Coders", value: "50K+", icon: Users },
    { label: "Challenges", value: "2.5K+", icon: Code },
    { label: "Companies", value: "100+", icon: Trophy }
  ];

  const challenges = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      xp: 50,
      time: "15 min",
      tags: ["Array", "Hash Table"]
    },
    {
      id: 2,
      title: "Merge Intervals",
      difficulty: "Medium",
      xp: 120,
      time: "30 min",
      tags: ["Array", "Sorting"]
    },
    {
      id: 3,
      title: "Word Ladder",
      difficulty: "Hard",
      xp: 250,
      time: "45 min",
      tags: ["BFS", "String"]
    }
  ];

  const topics = [
    { name: "Arrays", count: "142 Challenges", progress: 65 },
    { name: "Strings", count: "128 Challenges", progress: 42 },
    { name: "Trees", count: "98 Challenges", progress: 78 },
    { name: "Graphs", count: "87 Challenges", progress: 23 },
    { name: "Dynamic Programming", count: "156 Challenges", progress: 15 },
    { name: "Sorting", count: "67 Challenges", progress: 89 }
  ];

  const tags = [
    "Binary-search", "Dynamic-programming", "Brute-force", "Graph",
    "Simulation", "Sliding-window", "Greedy", "Topological-sort"
  ];

  const liveSolving = [
    { name: "Luna Zhang", status: "live", challenge: "Maximum Linked List" },
    { name: "Taylor Swift", status: "offline", challenge: "Is Valid BST" },
    { name: "Luna Zhang", status: "live", challenge: "Roman To Int" },
    { name: "Chris Wilson", status: "live", challenge: "Symmetric Tree" }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", xp: "2,546 XP" },
    { rank: 2, name: "Sarah Kumar", xp: "2,156 XP" },
    { rank: 3, name: "Mike Rodriguez", xp: "2,008 XP" },
    { rank: 4, name: "Emma Thompson", xp: "1,999 XP" },
    { rank: 5, name: "David Park", xp: "1,820 XP" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-craft-success";
      case "Medium": return "text-craft-accent-secondary";
      case "Hard": return "text-craft-error";
      default: return "text-craft-text-secondary";
    }
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-craft-text-primary mb-4">
            <span className="bg-gradient-to-r from-craft-accent to-craft-accent-secondary bg-clip-text text-transparent">
              EXPLORE
            </span>
          </h1>
          <h2 className="text-2xl text-craft-text-primary mb-6">SOLVE & LEVEL UP</h2>
          <p className="text-craft-text-secondary max-w-2xl mx-auto mb-8">
            Dive into the neon-powered coding universe. Master algorithms, 
            conquer challenges, and become the developer you've always dreamed of being.
          </p>
          <Button className="bg-gradient-to-r from-craft-accent to-craft-accent-secondary hover:from-craft-accent/80 hover:to-craft-accent-secondary/80 text-craft-bg font-semibold px-8 py-3 text-lg">
            Start a Challenge
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-craft-accent mb-2">{stat.value}</div>
              <div className="text-craft-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-craft-text-secondary w-5 h-5" />
              <Input
                placeholder="Search challenges, topics, or companies..."
                className="pl-10 bg-craft-panel border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent">
                All
              </Button>
              <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg">
                Suggest Me One
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Challenge */}
            <Card className="bg-gradient-to-r from-craft-panel to-craft-accent/10 border-craft-accent/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-craft-accent text-craft-bg mb-2">FEATURED</Badge>
                  <Badge variant="outline" className="border-craft-accent-secondary text-craft-accent-secondary ml-2">Medium</Badge>
                </div>
                <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg">
                  Start Challenge →
                </Button>
              </div>
              <h3 className="text-2xl font-bold text-craft-text-primary mb-3">
                Binary Tree Maximum Path Sum
              </h3>
              <p className="text-craft-text-secondary mb-4">
                A challenging tree problem that tests your understanding of recursion and dynamic programming. Perfect for preparing for tech interviews.
              </p>
              <div className="flex items-center gap-4 text-sm text-craft-text-secondary">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  150 XP
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  45 min
                </span>
                <span>Solved by 12.4K developers</span>
              </div>
            </Card>

            {/* Explore Challenges */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-craft-text-primary">
                  Explore <span className="text-craft-accent">Challenges</span>
                </h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-craft-accent text-craft-accent">Trending</Badge>
                  <Badge variant="outline" className="border-craft-border text-craft-text-secondary">Easy</Badge>
                  <Badge variant="outline" className="border-craft-border text-craft-text-secondary">Problem Sheets</Badge>
                </div>
              </div>
              
              <div className="grid gap-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="bg-craft-panel border-craft-border hover:border-craft-accent/50 transition-all duration-300 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-craft-text-primary font-semibold mb-2">{challenge.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {challenge.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-craft-border text-craft-text-secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-craft-text-secondary">
                          <span className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            +{challenge.xp} XP
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {challenge.time}
                          </span>
                        </div>
                      </div>
                      <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg">
                        Solve Challenge
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Topics to Explore */}
            <div>
              <h2 className="text-2xl font-bold text-craft-text-primary mb-6">
                Topics to <span className="text-craft-accent">Explore</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((topic, index) => (
                  <Card key={index} className="bg-craft-panel border-craft-border hover:border-craft-accent/50 transition-all duration-300 p-4 text-center">
                    <div className="w-12 h-12 bg-craft-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Code className="w-6 h-6 text-craft-accent" />
                    </div>
                    <h3 className="text-craft-text-primary font-semibold mb-2">{topic.name}</h3>
                    <p className="text-craft-text-secondary text-sm mb-3">{topic.count}</p>
                    <div className="w-full bg-craft-bg rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-craft-accent to-craft-accent-secondary h-2 rounded-full"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-craft-accent text-sm">{topic.progress}% Complete</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Explore by Tags */}
            <div>
              <h2 className="text-2xl font-bold text-craft-text-primary mb-6">
                Explore by <span className="text-craft-accent">Tags</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent cursor-pointer transition-all duration-200 px-4 py-2"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Trending Challenges */}
            <div>
              <h2 className="text-2xl font-bold text-craft-text-primary mb-6">
                Trending <span className="text-craft-accent">Challenges</span>
              </h2>
              <Card className="bg-craft-panel border-craft-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-craft-accent-secondary/20 text-craft-accent-secondary">Easy</Badge>
                  <span className="text-craft-accent-secondary text-sm">+893 XP</span>
                </div>
                <h3 className="text-xl font-bold text-craft-text-primary mb-2">Two Sum</h3>
                <p className="text-craft-text-secondary text-sm mb-4">
                  Array - Hash Table
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-craft-text-secondary">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      15 min • 2,347 solved
                    </span>
                  </div>
                  <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg">
                    Solve Challenge
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Solving */}
            <Card className="bg-craft-panel border-craft-border p-4">
              <h3 className="text-craft-text-primary font-semibold mb-4">Live Solving</h3>
              <div className="space-y-3">
                {liveSolving.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'live' ? 'bg-craft-accent animate-pulse' : 'bg-craft-text-secondary'}`}></div>
                    <div className="flex-1">
                      <div className="text-craft-text-primary text-sm font-medium">{user.name}</div>
                      <div className="text-craft-text-secondary text-xs">{user.challenge}</div>
                    </div>
                    {user.status === 'live' && (
                      <Badge className="bg-craft-accent/20 text-craft-accent text-xs">LIVE</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="bg-craft-panel border-craft-border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-craft-text-primary font-semibold">Leaderboard</h3>
                <div className="flex gap-1">
                  <Button size="sm" className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg text-xs">
                    Daily
                  </Button>
                  <Button size="sm" variant="outline" className="border-craft-border text-craft-text-secondary text-xs">
                    Weekly
                  </Button>
                  <Button size="sm" variant="outline" className="border-craft-border text-craft-text-secondary text-xs">
                    All Time
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-craft-accent/20 flex items-center justify-center text-craft-accent text-xs font-bold">
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-craft-text-primary text-sm">{user.name}</div>
                      <div className="text-craft-accent text-xs">{user.xp}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent text-sm">
                View Full Rankings
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
