
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import TerminalCard from "@/components/TerminalCard";
import TimerCountdown from "@/components/TimerCountdown";
import SummaryPopup from "@/components/SummaryPopup";
import CameraPreview from "@/components/CameraPreview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { toast } from "sonner";

const LiveContestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Contest state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  
  // Question states
  const [questionStates, setQuestionStates] = useState([
    { id: 1, answered: false, timeSpent: 0 },
    { id: 2, answered: false, timeSpent: 0 },
    { id: 3, answered: false, timeSpent: 0 },
    { id: 4, answered: false, timeSpent: 0 }
  ]);

  const questions = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      starterCode: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your solution here
    pass`
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      description: "You are given two non-empty linked lists representing two non-negative integers.",
      starterCode: `def addTwoNumbers(l1, l2):
    """
    :type l1: ListNode
    :type l2: ListNode
    :rtype: ListNode
    """
    # Your solution here
    pass`
    },
    {
      id: 3,
      title: "Longest Substring",
      difficulty: "Medium",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      starterCode: `def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    # Your solution here
    pass`
    },
    {
      id: 4,
      title: "Median of Two Arrays",
      difficulty: "Hard",
      description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median.",
      starterCode: `def findMedianSortedArrays(nums1, nums2):
    """
    :type nums1: List[int]
    :type nums2: List[int]
    :rtype: float
    """
    # Your solution here
    pass`
    }
  ];

  // Request camera permission on load
  useEffect(() => {
    const requestCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermission(true);
        toast.success("Camera access granted");
      } catch (error) {
        setCameraPermission(false);
        toast.error("Camera permission denied");
      }
    };
    requestCamera();
  }, []);

  // Set initial code when question changes
  useEffect(() => {
    setCode(questions[currentQuestion].starterCode);
  }, [currentQuestion]);

  const handleQuestionChange = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    setShowTerminal(false);
  };

  const handleRunCode = () => {
    setShowTerminal(true);
    setTerminalOutput("Running test cases...\n\nTest Case 1: ✅ Passed (2ms)\nTest Case 2: ✅ Passed (1ms)\nTest Case 3: ❌ Failed (Expected: [1,2], Got: [2,1])");
    toast("Code executed");
  };

  const handleSubmitContest = () => {
    setShowSummary(true);
  };

  const handleTimeUp = () => {
    setShowSummary(true);
    toast.error("Time's up! Contest ended.");
  };

  const handleSubmitFinal = () => {
    setShowSummary(false);
    navigate(`/results/${id}`);
    toast.success("Contest submitted successfully!");
  };

  const markQuestionAnswered = () => {
    setQuestionStates(prev => 
      prev.map((q, idx) => 
        idx === currentQuestion ? { ...q, answered: true } : q
      )
    );
  };

  const answeredCount = questionStates.filter(q => q.answered).length;
  const unansweredCount = questionStates.length - answeredCount;

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      {/* Top Panel */}
      <div className="sticky top-[80px] bg-craft-panel border-b border-craft-border p-4 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-craft-text-primary font-semibold">
              Questions: {questions.length}
            </span>
            <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
              Answered: {answeredCount}
            </Badge>
            <Badge className="bg-craft-text-secondary/20 text-craft-text-secondary border-craft-text-secondary/30">
              Remaining: {unansweredCount}
            </Badge>
          </div>
          
          <TimerCountdown 
            timeLeft={timeLeft}
            onTimeUp={handleTimeUp}
            setTimeLeft={setTimeLeft}
          />
          
          <Button 
            onClick={handleSubmitContest}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
          >
            Submit Contest
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Left Column - Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="bg-craft-panel border-craft-border p-4 h-full">
              <h3 className="text-craft-text-primary font-semibold mb-4">Questions</h3>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionChange(index)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      currentQuestion === index
                        ? 'border-craft-accent bg-craft-accent/10'
                        : questionStates[index].answered
                        ? 'border-craft-success bg-craft-success/10'
                        : 'border-craft-border bg-craft-bg hover:border-craft-accent/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-craft-text-primary font-medium">
                        {index + 1}. {question.title}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${
                        questionStates[index].answered 
                          ? 'bg-craft-success' 
                          : 'bg-craft-text-secondary/30'
                      }`} />
                    </div>
                    <Badge className="bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30 mt-1">
                      {question.difficulty}
                    </Badge>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Question and Editor */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Question Content */}
            <Card className="bg-craft-panel border-craft-border p-6 mb-4">
              <h2 className="text-xl font-bold text-craft-text-primary mb-2">
                {questions[currentQuestion].title}
              </h2>
              <Badge className="bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30 mb-4">
                {questions[currentQuestion].difficulty}
              </Badge>
              <p className="text-craft-text-secondary leading-relaxed">
                {questions[currentQuestion].description}
              </p>
            </Card>

            {/* Code Editor */}
            <Card className="bg-craft-panel border-craft-border flex-1 flex flex-col">
              <div className="p-4 border-b border-craft-border">
                <div className="flex items-center justify-between">
                  <select className="bg-craft-bg border border-craft-border rounded px-3 py-1 text-craft-text-primary">
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={handleRunCode}
                      variant="outline"
                      className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run
                    </Button>
                    <Button 
                      onClick={markQuestionAnswered}
                      className="bg-craft-success hover:bg-craft-success/80 text-white"
                    >
                      Mark Solved
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <CodeEditor 
                  value={code}
                  onChange={setCode}
                  language="python"
                />
              </div>
            </Card>

            {/* Terminal Card */}
            <TerminalCard
              outputText={terminalOutput}
              testResults={[]}
              isVisible={showTerminal}
              onClose={() => setShowTerminal(false)}
            />
          </div>
        </div>
      </div>

      {/* Camera Preview */}
      <CameraPreview enabled={cameraPermission} />

      {/* Summary Popup */}
      <SummaryPopup
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        onSubmit={handleSubmitFinal}
        questionStates={questionStates}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default LiveContestPage;
