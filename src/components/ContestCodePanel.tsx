
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Send, Settings } from "lucide-react";
import CodeEditor from "./CodeEditor";
import TerminalCard from "./TerminalCard";
import LoadingAnimation from "./LoadingAnimation";

interface ContestCodePanelProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onRunCode: () => void;
  onMarkSolved: () => void;
  isRunning: boolean;
  showTerminal: boolean;
  terminalOutput: string;
  terminalTestResults: Array<{ id: number; passed: boolean }>;
  onCloseTerminal: () => void;
}

const ContestCodePanel = ({
  code,
  onChange,
  language,
  onLanguageChange,
  onRunCode,
  onMarkSolved,
  isRunning,
  showTerminal,
  terminalOutput,
  terminalTestResults,
  onCloseTerminal
}: ContestCodePanelProps) => {
  return (
    <>
      {/* Editor Header */}
      <div className="bg-craft-panel border-b border-craft-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select 
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
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
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={onRunCode}
              disabled={isRunning}
              variant="outline" 
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
              title="Run your code"
            >
              {isRunning ? (
                <LoadingAnimation size="sm" className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              Run
            </Button>
            <Button 
              onClick={onMarkSolved}
              disabled={isRunning}
              className="bg-craft-success hover:bg-craft-success/80 text-white"
              title="Submit your solution"
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
      </div>

      {/* Code Editor */}
      <div className="flex-1">
        <CodeEditor 
          value={code}
          onChange={onChange}
          language={language}
        />
      </div>

      {/* Terminal Card */}
      <TerminalCard
        outputText={terminalOutput}
        testResults={terminalTestResults}
        isVisible={showTerminal}
        onClose={onCloseTerminal}
      />
    </>
  );
};

export default ContestCodePanel;
