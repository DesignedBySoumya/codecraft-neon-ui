
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, ThumbsUp, ThumbsDown, Edit, Trash2 } from "lucide-react";
import AddEditProblemModal from "@/components/AddEditProblemModal";
import SheetProblemCard from "@/components/SheetProblemCard";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface Problem {
  id: string;
  name: string;
  description?: string;
  likes: number;
  dislikes: number;
  questions: number;
  tags: string[];
  status: "Not Started" | "Solving" | "Done";
  addedDate: Date;
}

const SheetProblemManagerPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Mock sheet data - in real app this would come from API/database
  const [sheetName, setSheetName] = useState("Binary Tree Practice");
  const [problems, setProblems] = useState<Problem[]>([
    {
      id: "1",
      name: "Max Depth of Binary Tree",
      description: "Find the maximum depth of a binary tree",
      likes: 254,
      dislikes: 12,
      questions: 1,
      tags: ["tree", "binary"],
      status: "Not Started",
      addedDate: new Date('2024-01-15')
    },
    {
      id: "2", 
      name: "Path Sum II",
      description: "Find all root-to-leaf paths where sum equals target",
      likes: 134,
      dislikes: 3,
      questions: 2,
      tags: ["tree", "dp"],
      status: "Done",
      addedDate: new Date('2024-01-10')
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);

  // Calculate progress
  const completedProblems = problems.filter(p => p.status === "Done").length;
  const totalProblems = problems.length;
  const progressPercentage = totalProblems > 0 ? (completedProblems / totalProblems) * 100 : 0;

  // Sort problems by added date (newest first)
  const sortedProblems = [...problems].sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime());

  const handleAddProblem = (problemData: Omit<Problem, 'id' | 'addedDate'>) => {
    const newProblem: Problem = {
      ...problemData,
      id: Date.now().toString(),
      addedDate: new Date()
    };
    setProblems(prev => [...prev, newProblem]);
    setIsModalOpen(false);
    toast({
      title: "Problem Added",
      description: `"${problemData.name}" has been added to the sheet.`,
    });
  };

  const handleEditProblem = (problemData: Omit<Problem, 'id' | 'addedDate'>) => {
    if (!editingProblem) return;
    
    setProblems(prev => prev.map(p => 
      p.id === editingProblem.id 
        ? { ...p, ...problemData }
        : p
    ));
    setEditingProblem(null);
    setIsModalOpen(false);
    toast({
      title: "Problem Updated",
      description: `"${problemData.name}" has been updated.`,
    });
  };

  const handleDeleteProblem = (problem: Problem) => {
    setProblemToDelete(problem);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProblem = () => {
    if (!problemToDelete) return;
    
    setProblems(prev => prev.filter(p => p.id !== problemToDelete.id));
    setDeleteDialogOpen(false);
    setProblemToDelete(null);
    toast({
      title: "Problem Deleted",
      description: `"${problemToDelete.name}" has been removed from the sheet.`,
    });
  };

  const handleStatusChange = (problemId: string, newStatus: Problem['status']) => {
    setProblems(prev => prev.map(p => 
      p.id === problemId ? { ...p, status: newStatus } : p
    ));
    
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      toast({
        title: "Status Updated",
        description: `"${problem.name}" marked as ${newStatus}.`,
      });
    }
  };

  const openEditModal = (problem: Problem) => {
    setEditingProblem(problem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProblem(null);
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
              {sheetName}
            </h1>
            <p className="text-craft-text-secondary">
              Manage and track problems in this sheet
            </p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Problem
          </Button>
        </div>

        {/* Progress Section */}
        <Card className="bg-craft-panel border-craft-border mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-craft-text-primary font-semibold">Progress</h3>
              <span className="text-craft-text-secondary text-sm">
                {completedProblems} of {totalProblems} completed ({Math.round(progressPercentage)}%)
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="w-full h-3"
            />
          </div>
        </Card>

        {/* Problems List */}
        <div className="space-y-4">
          {sortedProblems.length === 0 ? (
            <Card className="bg-craft-panel border-craft-border">
              <div className="p-12 text-center">
                <p className="text-craft-text-secondary mb-4">No problems in this sheet yet</p>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Problem
                </Button>
              </div>
            </Card>
          ) : (
            sortedProblems.map((problem) => (
              <SheetProblemCard
                key={problem.id}
                problem={problem}
                onEdit={openEditModal}
                onDelete={handleDeleteProblem}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Problem Modal */}
      <AddEditProblemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingProblem ? handleEditProblem : handleAddProblem}
        editingProblem={editingProblem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-craft-panel border-craft-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-craft-text-primary">
              Delete Problem
            </AlertDialogTitle>
            <AlertDialogDescription className="text-craft-text-secondary">
              Are you sure you want to delete "{problemToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteProblem}
              className="bg-craft-error hover:bg-craft-error/80 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SheetProblemManagerPage;
