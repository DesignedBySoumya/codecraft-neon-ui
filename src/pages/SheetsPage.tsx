import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, Heart, Share, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SheetsPage = () => {
  const navigate = useNavigate();

  const mySheets = [
    {
      id: 1,
      title: "Array Fundamentals",
      description: "Essential array problems for beginners",
      problemCount: 25,
      completedCount: 18,
      isPublic: true,
      likes: 142
    },
    {
      id: 2,
      title: "Dynamic Programming Marathon",
      description: "Comprehensive DP problems from basic to advanced",
      problemCount: 50,
      completedCount: 32,
      isPublic: false,
      likes: 0
    }
  ];

  const publicSheets = [
    {
      id: 3,
      title: "FAANG Interview Prep",
      author: "Alex Chen",
      description: "Top interview questions from FAANG companies",
      problemCount: 75,
      completedCount: 0,
      likes: 1247,
      tags: ["Interview", "Hard", "FAANG"]
    },
    {
      id: 4,
      title: "Blind 75",
      author: "CodeCraft Team",
      description: "The legendary 75 problems every programmer should solve",
      problemCount: 75,
      completedCount: 23,
      likes: 2847,
      tags: ["Popular", "Interview", "Essential"]
    }
  ];

  const SheetCard = ({ sheet, isOwned = false }: { sheet: any, isOwned?: boolean }) => (
    <Card className="bg-craft-panel border-craft-border hover:border-craft-accent/50 transition-all duration-300 group cursor-pointer">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-craft-text-primary font-semibold text-lg group-hover:text-craft-accent transition-colors mb-2">
              {sheet.title}
            </h3>
            <p className="text-craft-text-secondary text-sm mb-3">{sheet.description}</p>
            {sheet.author && (
              <p className="text-craft-text-secondary text-xs">by {sheet.author}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {sheet.likes > 0 && (
              <div className="flex items-center space-x-1 text-craft-text-secondary">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{sheet.likes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {sheet.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs text-craft-text-secondary border-craft-border">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-craft-text-secondary">
              {sheet.completedCount}/{sheet.problemCount} solved
            </span>
            <div className="w-20 h-2 bg-craft-bg rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-craft-accent to-craft-accent-secondary"
                style={{ width: `${(sheet.completedCount / sheet.problemCount) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isOwned && (
              <Button size="sm" variant="outline" className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent">
                <Copy className="w-3 h-3 mr-1" />
                Fork
              </Button>
            )}
            {isOwned && (
              <Button size="sm" variant="outline" className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent">
                <Share className="w-3 h-3 mr-1" />
                Share
              </Button>
            )}
            <Button 
              size="sm" 
              className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
              onClick={() => navigate(`/sheet/${sheet.id}`)}
            >
              Open
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-craft-text-primary mb-2">Problem Sheets</h1>
            <p className="text-craft-text-secondary">Curated collections of problems for focused practice</p>
          </div>
          <Button 
            onClick={() => navigate("/sheets/create")}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Sheet
          </Button>
        </div>

        <Tabs defaultValue="my-sheets" className="w-full">
          <TabsList className="bg-craft-panel border border-craft-border mb-8">
            <TabsTrigger value="my-sheets" className="data-[state=active]:bg-craft-accent data-[state=active]:text-craft-bg">
              My Sheets
            </TabsTrigger>
            <TabsTrigger value="public-sheets" className="data-[state=active]:bg-craft-accent data-[state=active]:text-craft-bg">
              <Users className="w-4 h-4 mr-2" />
              Public Sheets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-sheets">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mySheets.map((sheet) => (
                <SheetCard key={sheet.id} sheet={sheet} isOwned={true} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="public-sheets">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publicSheets.map((sheet) => (
                <SheetCard key={sheet.id} sheet={sheet} isOwned={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SheetsPage;
