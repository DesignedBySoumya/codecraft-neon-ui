
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, Terminal, Play, TestTube, Send } from "lucide-react";
import TestCaseResultItem from "./TestCaseResultItem";
import LoadingAnimation from "./LoadingAnimation";

interface TerminalDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  outputText: string;
  testResults: Array<{ id: number; passed: boolean }>;
  onRunCode: () => void;
  onRunTests: () => void;
  onSubmit: () => void;
  isRunning: boolean;
}

const TerminalDrawer = ({
  isOpen,
  onToggle,
  outputText,
  testResults,
  onRunCode,
  onRunTests,
  onSubmit,
  isRunning
}: TerminalDrawerProps) => {
  const [activeTab, setActiveTab] = useState("results");

  return (
    <div className="bg-zinc-900 mt-2 rounded-t-md border-t border-zinc-800 transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-white" />
          <span className="font-semibold text-white">Terminal</span>
        </div>
        <button 
          onClick={onToggle}
          className="text-white opacity-60 hover:opacity-100 transition-opacity"
        >
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-zinc-800 border border-zinc-700">
              <TabsTrigger 
                value="results" 
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              >
                Test Results
              </TabsTrigger>
              <TabsTrigger 
                value="custom" 
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              >
                Custom Input
              </TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="mt-4">
              <div className="max-h-[200px] overflow-auto bg-black rounded-lg p-4">
                {testResults.length > 0 ? (
                  <div className="space-y-2">
                    {testResults.map((test) => (
                      <TestCaseResultItem
                        key={test.id}
                        testNumber={test.id}
                        passed={test.passed}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="font-mono text-sm">
                    <pre className="text-green-400 whitespace-pre-wrap">
                      {outputText || "No test results to display. Run your code to see output."}
                    </pre>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-4">
              <div className="max-h-[200px] overflow-auto bg-black rounded-lg p-4">
                <textarea
                  placeholder="Enter custom input here..."
                  className="w-full h-32 bg-transparent text-green-400 font-mono text-sm resize-none border-none outline-none placeholder-zinc-500"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-zinc-800">
            <Button 
              onClick={onRunCode}
              disabled={isRunning}
              variant="outline"
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              {isRunning ? (
                <LoadingAnimation size="sm" className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              Run Code
            </Button>
            <Button 
              onClick={onRunTests}
              disabled={isRunning}
              variant="outline"
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              {isRunning ? (
                <LoadingAnimation size="sm" className="w-4 h-4 mr-2" />
              ) : (
                <TestTube className="w-4 h-4 mr-2" />
              )}
              Run Tests
            </Button>
            <Button 
              onClick={onSubmit}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 text-white"
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
      )}
    </div>
  );
};

export default TerminalDrawer;
