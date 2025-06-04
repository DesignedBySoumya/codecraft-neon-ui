
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ProblemDescription from "@/components/ProblemDescription";
import TestResults from "@/components/TestResults";
import CelebrationPopup from "@/components/CelebrationPopup";
import LoadingAnimation from "@/components/LoadingAnimation";
import TerminalCard from "@/components/TerminalCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Send, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const ProblemSolvePage = () => {
  const { id } = useParams();
  const [code, setCode] = useState(`def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your solution here
    pass`);
  
  const [language, setLanguage] = useState("python");
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(35);
  
  // Terminal card state
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");
  const [terminalTestResults, setTerminalTestResults] = useState([]);
  
  // XP and celebration state
  const [currentXP, setCurrentXP] = useState(247);
  const [targetXP, setTargetXP] = useState(247);
  const [animateXP, setAnimateXP] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Mock problem data - in real app this would come from API
  const problem = {
    id: parseInt(id || "1"),
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6", 
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ]
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    toast("Running code...");
    
    // Show terminal card when running
    setShowTerminal(true);
    setTerminalOutput("Running code...\n");
    
    // Simulate API call
    setTimeout(() => {
      // Mock output and test results
      const mockOutput = `Input: [2,7,11,15], target = 9
Output: [0,1]
Expected: [0,1]

Input: [3,2,4], target = 6
Output: [1,2]
Expected: [1,2]

Input: [3,3], target = 6
Output: Time Limit Exceeded
Expected: [0,1]`;

      const mockTerminalTests = [
        { id: 1, passed: true },
        { id: 2, passed: true },
        { id: 3, passed: false }
      ];

      setTerminalOutput(mockOutput);
      setTerminalTestResults(mockTerminalTests);
      
      setTestResults({
        passed: 2,
        total: 3,
        cases: [
          { input: "[2,7,11,15], 9", expected: "[0,1]", actual: "[0,1]", passed: true, time: "1ms" },
          { input: "[3,2,4], 6", expected: "[1,2]", actual: "[1,2]", passed: true, time: "1ms" },
          { input: "[3,3], 6", expected: "[0,1]", actual: "Time Limit Exceeded", passed: false, time: ">1000ms" }
        ]
      });
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
    setCurrentXP(targetXP); // Update current XP to new value
    setAnimateXP(false);
  };

  // Check if all tests passed for Submit button state
  const allTestsPassed = terminalTestResults.length > 0 && terminalTestResults.every(test => test.passed);

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
            
            <ProblemDescription problem={problem} />
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
        <div className="flex-1 flex flex-col relative">
          {/* Editor Header */}
          <div className="bg-craft-panel border-b border-craft-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-craft-bg border border-craft-border rounded px-3 py-1 text-craft-text-primary focus:border-craft-accent"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <Button size="sm" variant="ghost" className="text-craft-text-secondary hover:text-craft-accent">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Code Editor Container with Floating Action Buttons */}
          <div className="flex-1 relative">
            <CodeEditor 
              value={code}
              onChange={setCode}
              language={language}
            />
            
            {/* Floating Action Buttons - Top Right Corner */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
              <Button 
                onClick={handleRunCode}
                disabled={isRunning}
                variant="outline" 
                className="border-craft-border bg-craft-panel/90 backdrop-blur-sm text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent shadow-lg"
              >
                {isRunning ? (
                  <LoadingAnimation size="sm" className="w-4 h-4 mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                Run
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isRunning || !allTestsPassed}
                className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg shadow-lg disabled:opacity-50"
              >
                {isRunning ? (
                  <LoadingAnimation size="sm" className="w-4 h-4 mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Submit
              </Button>
            </div>
          </div>

          {/* Terminal Card - Fixed Position Below Editor */}
          <div className="relative">
            <TerminalCard
              outputText={terminalOutput}
              testResults={terminalTestResults}
              isVisible={showTerminal}
              onClose={() => setShowTerminal(false)}
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
