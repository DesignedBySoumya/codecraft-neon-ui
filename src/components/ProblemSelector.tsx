
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, CheckCircle } from "lucide-react";
import { Problem } from "@/pages/CreateListPage";

interface ProblemSelectorProps {
  onAddProblem: (problem: Problem) => void;
  selectedProblems: Problem[];
}

const mockProblems: Problem[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topics: ["Array", "Hash Table"], xp: 50, solved: true },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", topics: ["Linked List", "Math"], xp: 70, solved: false },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topics: ["Hash Table", "String"], xp: 75, solved: false },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", topics: ["Array", "Binary Search"], xp: 120, solved: false },
  { id: 5, title: "Palindromic Substrings", difficulty: "Medium", topics: ["String", "Dynamic Programming"], xp: 80, solved: true },
  { id: 6, title: "LRU Cache", difficulty: "Hard", topics: ["Hash Table", "Design"], xp: 130, solved: false },
  { id: 7, title: "Maximum Subarray (Kadane's Algorithm)", difficulty: "Easy", topics: ["Array", "Dynamic Programming"], xp: 60, solved: false },
  { id: 8, title: "Merge Intervals", difficulty: "Medium", topics: ["Array", "Greedy"], xp: 85, solved: false },
];

const allTopics = ["Array", "Hash Table", "String", "Dynamic Programming", "Linked List", "Math", "Binary Search", "Design", "Greedy"];

const difficultyColors = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const ProblemSelector = ({ onAddProblem, selectedProblems }: ProblemSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const filteredProblems = useMemo(() => {
    return mockProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopics = selectedTopics.length === 0 || 
        selectedTopics.some(topic => problem.topics.includes(topic));
      return matchesSearch && matchesTopics;
    });
  }, [searchTerm, selectedTopics]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const isSelected = (problemId: number) => {
    return selectedProblems.some(p => p.id === problemId);
  };

  return (
    <Card className="bg-craft-panel/50 border-craft-border backdrop-blur-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-craft-text-primary mb-4">
          🧩 Problems Selector
        </h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-craft-text-secondary w-4 h-4" />
          <Input
            placeholder="🔍 Search problems by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-craft-bg/50 border-craft-border text-craft-text-primary"
          />
        </div>

        {/* Topic Filters */}
        <div className="mb-6">
          <p className="text-craft-text-primary text-sm font-medium mb-2">🏷️ Filter by topics:</p>
          <div className="flex flex-wrap gap-2">
            {allTopics.map(topic => (
              <Badge
                key={topic}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  selectedTopics.includes(topic)
                    ? 'bg-craft-accent/20 text-craft-accent border-craft-accent/50'
                    : 'border-craft-border text-craft-text-secondary hover:border-craft-accent/50 hover:text-craft-accent'
                }`}
                onClick={() => toggleTopic(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredProblems.map(problem => (
            <Card
              key={problem.id}
              className="bg-craft-bg/30 border-craft-border hover:border-craft-accent/50 transition-all p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {problem.solved && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    <h3 className="text-craft-text-primary font-medium">
                      {problem.title}
                    </h3>
                    <Badge className={difficultyColors[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {problem.topics.map(topic => (
                      <Badge
                        key={topic}
                        variant="outline"
                        className="text-xs text-craft-text-secondary border-craft-border"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-xs text-craft-text-secondary">
                    XP: {problem.xp}
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={() => onAddProblem(problem)}
                  disabled={isSelected(problem.id)}
                  className={`${
                    isSelected(problem.id)
                      ? 'bg-craft-accent/20 text-craft-accent border border-craft-accent/50'
                      : 'bg-craft-accent hover:bg-craft-accent/80 text-craft-bg'
                  }`}
                >
                  {isSelected(problem.id) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-8 text-craft-text-secondary">
            No problems found matching your criteria.
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProblemSelector;
