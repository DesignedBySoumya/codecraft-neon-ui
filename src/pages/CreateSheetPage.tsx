
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreateSheetPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublic: false,
    tags: ""
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a sheet title",
        variant: "destructive"
      });
      return;
    }

    console.log("Saving sheet:", formData);
    
    toast({
      title: "Success",
      description: "Sheet created successfully!",
    });

    navigate("/sheets");
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/sheets")}
            className="text-craft-text-secondary hover:text-craft-text-primary self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sheets
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-craft-text-primary">Create New Sheet</h1>
            <p className="text-craft-text-secondary mt-1">Build a custom collection of problems</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Form - Takes up 2 columns on xl screens */}
            <div className="xl:col-span-2 order-1">
              <Card className="bg-craft-panel border-craft-border p-4 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-craft-text-primary font-medium">
                      Sheet Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Dynamic Programming Essentials"
                      className="mt-2 bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-craft-text-primary font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe what this sheet covers and who it's for..."
                      className="mt-2 bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent min-h-24 resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags" className="text-craft-text-primary font-medium">
                      Tags (comma-separated)
                    </Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange("tags", e.target.value)}
                      placeholder="e.g., DP, Interview, Advanced"
                      className="mt-2 bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                    <div className="flex-1">
                      <Label htmlFor="public" className="text-craft-text-primary font-medium">
                        Make Public
                      </Label>
                      <p className="text-sm text-craft-text-secondary mt-1">
                        Allow others to discover and fork your sheet
                      </p>
                    </div>
                    <Switch
                      id="public"
                      checked={formData.isPublic}
                      onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                      className="self-start sm:self-center"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Stacks below form on smaller screens */}
            <div className="space-y-4 sm:space-y-6 order-2 xl:order-2">
              <Card className="bg-craft-panel/50 border-craft-border p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                  Next Steps
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <span className="text-craft-accent font-semibold min-w-[1.25rem]">1.</span>
                    <span className="text-craft-text-secondary">
                      Create your sheet with basic info
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-craft-text-secondary font-semibold min-w-[1.25rem]">2.</span>
                    <span className="text-craft-text-secondary">
                      Add problems using our problem builder
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-craft-text-secondary font-semibold min-w-[1.25rem]">3.</span>
                    <span className="text-craft-text-secondary">
                      Organize and reorder problems
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-craft-text-secondary font-semibold min-w-[1.25rem]">4.</span>
                    <span className="text-craft-text-secondary">
                      Share with the community
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="bg-craft-panel/30 border-craft-border p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                  Tips
                </h3>
                <div className="space-y-2 text-sm text-craft-text-secondary">
                  <p>• Use descriptive titles that indicate difficulty level</p>
                  <p>• Add relevant tags to help others discover your sheet</p>
                  <p>• Include a mix of difficulty levels for balanced practice</p>
                  <p>• Consider progression from basic to advanced concepts</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 sm:mt-8 pt-6 border-t border-craft-border">
            <Button
              variant="outline"
              onClick={() => navigate("/sheets")}
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg order-1 sm:order-2"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Sheet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSheetPage;
