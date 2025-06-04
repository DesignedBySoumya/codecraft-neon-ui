import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ProblemDescription from "@/components/ProblemDescription";
import TestResults from "@/components/TestResults";
import CelebrationPopup from "@/components/CelebrationPopup";
import { useProblemData } from "@/hooks/useProblemData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Send, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const ProblemSolvePage = () => {
  const { id } = useParams();
  const problemId = parseInt(id || "1");
  const { problem, testCases, loading, error } = useProblemData(problemId);
  
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(35);
  
  // XP and celebration state
  const [currentXP, setCurrentXP] = useState(247);
  const [targetXP, setTargetXP] = useState(247);
  const [animateXP, setAnimateXP] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Set starter code when problem loads
  useEffect(() => {
    if (problem?.starter_code && code === "") {
      setCode(problem.starter_code);
    }
  }, [problem?.starter_code, code]);

  const handleRunCode = async () => {
    setIsRunning(true);
    toast("Running code...");
    
    // Simulate API call
    setTimeout(() => {
      if (testCases.length > 0) {
        // Simulate test results based on actual test cases
        const results = testCases.map((testCase, index) => ({
          input: testCase.input,
          expected: testCase.expected_output,
          actual: index < testCases.length - 1 ? testCase.expected_output : "Time Limit Exceeded",
          passed: index < testCases.length - 1,
          time: index < testCases.length - 1 ? "1ms" : ">1000ms"
        }));
        
        setTestResults({
          passed: results.filter(r => r.passed).length,
          total: results.length,
          cases: results
        });
      }
      setIsRunning(false);
      toast("Code execution completed");
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    toast("Submitting solution...");
    
    // Simulate submission
    setTimeout(() => {
      // Check if all test cases pass (simulate success)
      const allTestsPassed = testResults?.passed === testResults?.total;
      
      if (allTestsPassed) {
        // Show celebration popup and animate XP
        const xpGained = 30;
        setTargetXP(currentXP + xpGained);
        setShowCelebration(true);
        setAnimateXP(true);
        toast.success("Solution accepted!");
      } else {
        toast.error("Some test cases failed. Please fix your solution.");
      }
      setIsRunning(false);
    }, 3000);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    setCurrentXP(targetXP);
    setAnimateXP(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-craft-bg">
        <Header 
          currentXP={currentXP}
          targetXP={targetXP}
          animateXP={animateXP}
        />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-craft-text-primary">Loading problem...</div>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-craft-bg">
        <Header 
          currentXP={currentXP}
          targetXP={targetXP}
          animateXP={animateXP}
        />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-craft-error">
            {error || "Problem not found"}
          </div>
        </div>
      </div>
    );
  }

  // Convert problem data to the format expected by ProblemDescription
  const problemForDescription = {
    id: problem.id,
    title: problem.title,
    difficulty: problem.difficulty,
    description: problem.description,
    examples: testCases.slice(0, 2).map((testCase, index) => ({
      input: testCase.input,
      output: testCase.expected_output,
      explanation: `Test case ${index + 1} explanation.`
    })),
    constraints: [
      "Follow the problem constraints as specified",
      "Optimize for time and space complexity"
    ]
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header 
        currentXP={currentXP}
        targetXP={targetXP}
        animateXP={animateXP}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Problem Description */}
        <div 
          className="bg-craft-panel border-r border-craft-border overflow-y-auto"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-craft-text-primary">
                  {problem.id}. {problem.title}
                </h1>
                <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
                  {problem.difficulty}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-craft-text-secondary hover:text-craft-accent">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-craft-text-secondary hover:text-craft-accent">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <ProblemDescription problem={problemForDescription} />
          </div>
        </div>

        {/* Resize Handle */}
        <div 
          className="w-1 bg-craft-border hover:bg-craft-accent cursor-col-resize transition-colors"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startWidth = leftPanelWidth;
            
            const handleMouseMove = (e: MouseEvent) => {
              const diff = e.clientX - startX;
              const newWidth = startWidth + (diff / window.innerWidth) * 100;
              setLeftPanelWidth(Math.max(20, Math.min(60, newWidth)));
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor Header */}
          <div className="bg-craft-panel border-b border-craft-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-craft-bg border border-craft-border rounded px-3 py-1 text-craft-text-primary focus:border-craft-accent"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <Button size="sm" variant="ghost" className="text-craft-text-secondary hover:text-craft-accent">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  variant="outline" 
                  className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isRunning}
                  className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <CodeEditor 
              value={code}
              onChange={setCode}
              language={language}
            />
          </div>

          {/* Test Results */}
          {testResults && (
            <TestResults results={testResults} />
          )}
        </div>
      </div>

      {/* Celebration Popup */}
      <CelebrationPopup
        isOpen={showCelebration}
        onClose={handleCelebrationClose}
        xpGained={30}
        currentXP={currentXP}
        newXP={targetXP}
      />
    </div>
  );
};

export default ProblemSolvePage;
