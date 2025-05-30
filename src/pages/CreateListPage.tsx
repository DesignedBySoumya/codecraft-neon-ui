
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";
import ProblemSelector from "@/components/ProblemSelector";
import SheetBuilder from "@/components/SheetBuilder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  xp: number;
  solved: boolean;
}

const CreateListPage = () => {
  const { sourceId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);
  
  const sourceTitle = sourceId === "120-dsa-questions" ? "120 DSA Questions" : "Problem Set";

  const handleAddProblem = (problem: Problem) => {
    if (!selectedProblems.find(p => p.id === problem.id)) {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  const handleRemoveProblem = (problemId: number) => {
    setSelectedProblems(selectedProblems.filter(p => p.id !== problemId));
  };

  const handleReorderProblems = (newOrder: Problem[]) => {
    setSelectedProblems(newOrder);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...", { title, description, isPublic, selectedProblems });
  };

  const handlePublish = () => {
    console.log("Publishing sheet...", { title, description, isPublic, selectedProblems });
  };

  const totalXP = selectedProblems.reduce((sum, problem) => sum + problem.xp, 0);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-craft-bg">
        <Header />
        
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to="/sheets">
                <Button variant="ghost" className="text-craft-text-secondary hover:text-craft-accent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sheets
                </Button>
              </Link>
            </div>

            <h1 className="text-4xl font-bold text-craft-text-primary mb-2 bg-gradient-to-r from-craft-accent to-craft-accent-secondary bg-clip-text text-transparent">
              Create Your Sheet from {sourceTitle}
            </h1>
          </div>

          {/* Sheet Configuration */}
          <Card className="bg-craft-panel/50 border-craft-border backdrop-blur-sm mb-8">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-craft-text-primary font-medium mb-2">
                    📝 List Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your sheet title..."
                    className="bg-craft-bg/50 border-craft-border text-craft-text-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-craft-text-primary font-medium mb-2">
                    📊 Progress
                  </label>
                  <div className="text-craft-text-secondary">
                    {selectedProblems.length} problems selected • {totalXP} XP total
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-craft-text-primary font-medium mb-2">
                  🧾 Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your problem sheet..."
                  className="bg-craft-bg/50 border-craft-border text-craft-text-primary"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <label className="text-craft-text-primary font-medium">
                    🔒 Privacy:
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isPublic ? 'text-craft-accent' : 'text-craft-text-secondary'}`}>
                      Public
                    </span>
                    <Switch
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                      className="data-[state=checked]:bg-craft-accent"
                    />
                    <span className={`text-sm ${!isPublic ? 'text-craft-accent' : 'text-craft-text-secondary'}`}>
                      Private
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    onClick={handleSaveDraft}
                    variant="outline"
                    className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={handlePublish}
                    className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                    disabled={!title || selectedProblems.length === 0}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Publish Sheet
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProblemSelector onAddProblem={handleAddProblem} selectedProblems={selectedProblems} />
            <SheetBuilder 
              problems={selectedProblems}
              onRemoveProblem={handleRemoveProblem}
              onReorderProblems={handleReorderProblems}
            />
          </div>

          {/* Tips Banner */}
          <Card className="bg-craft-panel/30 border-craft-accent/30 backdrop-blur-sm mt-8">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-craft-accent rounded-full animate-pulse"></div>
                <span className="text-craft-text-primary font-medium">💡 Pro Tip:</span>
                <span className="text-craft-text-secondary">
                  Start with easier problems and gradually increase difficulty. A good mix is 40% Easy, 40% Medium, 20% Hard.
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};

export default CreateListPage;
