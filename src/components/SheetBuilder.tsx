
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, GripVertical, CheckCircle } from "lucide-react";
import { Problem } from "@/pages/CreateListPage";
import { useDrag, useDrop } from "react-dnd";

interface SheetBuilderProps {
  problems: Problem[];
  onRemoveProblem: (problemId: number) => void;
  onReorderProblems: (newOrder: Problem[]) => void;
}

interface DragItem {
  id: number;
  index: number;
  type: string;
}

const ProblemItem = ({ 
  problem, 
  index, 
  onRemove, 
  moveItem 
}: { 
  problem: Problem; 
  index: number; 
  onRemove: (id: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'problem',
    item: { id: problem.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'problem',
    hover: (item: DragItem) => {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  const difficultyColors = {
    Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Hard: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`transition-all ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="bg-craft-bg/30 border-craft-border hover:border-craft-accent/50 transition-all p-4 cursor-move">
        <div className="flex items-center space-x-3">
          <GripVertical className="w-4 h-4 text-craft-text-secondary" />
          
          <div className="text-craft-text-secondary font-mono text-sm">
            {index + 1}.
          </div>

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
            
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-craft-text-secondary">
                XP: {problem.xp}
              </span>
              <div className="flex gap-1">
                {problem.topics.slice(0, 2).map(topic => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="text-xs text-craft-text-secondary border-craft-border"
                  >
                    {topic}
                  </Badge>
                ))}
                {problem.topics.length > 2 && (
                  <Badge variant="outline" className="text-xs text-craft-text-secondary border-craft-border">
                    +{problem.topics.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRemove(problem.id)}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

const SheetBuilder = ({ problems, onRemoveProblem, onReorderProblems }: SheetBuilderProps) => {
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newProblems = [...problems];
    const draggedItem = newProblems[dragIndex];
    newProblems.splice(dragIndex, 1);
    newProblems.splice(hoverIndex, 0, draggedItem);
    onReorderProblems(newProblems);
  };

  const totalXP = problems.reduce((sum, problem) => sum + problem.xp, 0);
  const solvedCount = problems.filter(p => p.solved).length;
  const difficultyBreakdown = {
    Easy: problems.filter(p => p.difficulty === 'Easy').length,
    Medium: problems.filter(p => p.difficulty === 'Medium').length,
    Hard: problems.filter(p => p.difficulty === 'Hard').length,
  };

  return (
    <Card className="bg-craft-panel/50 border-craft-border backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-craft-text-primary">
            🗂️ Your Sheet
          </h2>
          <div className="text-craft-text-secondary text-sm">
            {problems.length} problems
          </div>
        </div>

        {/* Progress Stats */}
        {problems.length > 0 && (
          <Card className="bg-craft-bg/30 border-craft-border p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-craft-text-secondary text-sm">Progress</p>
                <p className="text-craft-text-primary font-semibold">
                  {solvedCount}/{problems.length} solved
                </p>
              </div>
              <div>
                <p className="text-craft-text-secondary text-sm">Total XP</p>
                <p className="text-craft-accent font-semibold">{totalXP}</p>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-craft-text-secondary text-sm mb-2">Difficulty Breakdown</p>
              <div className="flex space-x-4 text-xs">
                <span className="text-green-400">Easy: {difficultyBreakdown.Easy}</span>
                <span className="text-yellow-400">Medium: {difficultyBreakdown.Medium}</span>
                <span className="text-red-400">Hard: {difficultyBreakdown.Hard}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Problems List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {problems.length === 0 ? (
            <div className="text-center py-12 text-craft-text-secondary">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-craft-accent/10 flex items-center justify-center">
                <GripVertical className="w-8 h-8 text-craft-accent/50" />
              </div>
              <p className="text-lg font-medium mb-2">📝 Drag & Drop problems here</p>
              <p className="text-sm">Start building your custom problem sheet by adding problems from the left panel.</p>
            </div>
          ) : (
            problems.map((problem, index) => (
              <ProblemItem
                key={problem.id}
                problem={problem}
                index={index}
                onRemove={onRemoveProblem}
                moveItem={moveItem}
              />
            ))
          )}
        </div>

        {/* Quick Actions */}
        {problems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-craft-border">
            <div className="flex items-center space-x-2 text-sm text-craft-text-secondary">
              <GripVertical className="w-4 h-4" />
              <span>↕️ Drag to reorder • 🗑️ Click to remove</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SheetBuilder;
