
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThumbsUp, ThumbsDown, Edit, Trash2, Check, MoreVertical } from "lucide-react";
import { Problem } from "@/pages/SheetProblemManagerPage";
import { useState } from "react";

interface ProblemCardProps {
  problem: Problem;
  onEdit: (problem: Problem) => void;
  onDelete: (problem: Problem) => void;
  onStatusChange: (problemId: string, status: Problem['status']) => void;
}

const statusColors = {
  "Not Started": "bg-craft-bg text-craft-text-secondary border-craft-border",
  "Solving": "bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30",
  "Done": "bg-craft-success/20 text-craft-success border-craft-success/30"
};

const ProblemCard = ({ problem, onEdit, onDelete, onStatusChange }: ProblemCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleStatusChange = (newStatus: Problem['status']) => {
    onStatusChange(problem.id, newStatus);
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="bg-craft-panel border-craft-border hover:border-craft-accent/30 transition-all duration-300 group">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-craft-text-primary font-semibold text-lg group-hover:text-craft-accent transition-colors">
                {problem.name}
              </h3>
              <Badge className={statusColors[problem.status]}>
                {problem.status}
              </Badge>
            </div>
            
            {problem.description && (
              <div className="mb-3">
                <p className="text-craft-text-secondary text-sm">
                  {showFullDescription 
                    ? problem.description 
                    : truncateDescription(problem.description)
                  }
                  {problem.description.length > 100 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="ml-2 text-craft-accent hover:text-craft-accent/80 text-xs"
                    >
                      {showFullDescription ? "Show less" : "Show more"}
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-craft-text-secondary hover:text-craft-accent"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-craft-panel border-craft-border">
              <DropdownMenuItem 
                onClick={() => onEdit(problem)}
                className="text-craft-text-secondary hover:text-craft-accent hover:bg-craft-bg cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {problem.status !== "Done" && (
                <DropdownMenuItem 
                  onClick={() => handleStatusChange("Done")}
                  className="text-craft-text-secondary hover:text-craft-success hover:bg-craft-bg cursor-pointer"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Done
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => onDelete(problem)}
                className="text-craft-text-secondary hover:text-craft-error hover:bg-craft-bg cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tags Section */}
        {problem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {problem.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs text-craft-text-secondary border-craft-border hover:border-craft-accent/50 hover:text-craft-accent transition-all"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1 text-craft-text-secondary">
              <ThumbsUp className="w-4 h-4 text-craft-success" />
              <span>{problem.likes}</span>
            </div>
            <div className="flex items-center space-x-1 text-craft-text-secondary">
              <ThumbsDown className="w-4 h-4 text-craft-error" />
              <span>{problem.dislikes}</span>
            </div>
            <div className="text-craft-text-secondary">
              Questions: <span className="text-craft-text-primary">{problem.questions}</span>
            </div>
          </div>

          {/* Quick Status Toggle */}
          <div className="flex items-center space-x-2">
            {problem.status === "Not Started" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange("Solving")}
                className="border-craft-border text-craft-text-secondary hover:border-craft-accent-secondary hover:text-craft-accent-secondary"
              >
                Start Solving
              </Button>
            )}
            {problem.status === "Solving" && (
              <Button
                size="sm"
                onClick={() => handleStatusChange("Done")}
                className="bg-craft-success hover:bg-craft-success/80 text-white"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark Done
              </Button>
            )}
            {problem.status === "Done" && (
              <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
                <Check className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProblemCard;
