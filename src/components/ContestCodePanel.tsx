
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import CodeEditor from "./CodeEditor";
import TerminalDrawer from "./TerminalDrawer";

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
  const handleRunTests = () => {
    // This will be the same as run code for now, but could be different
    onRunCode();
  };

  return (
    <div className="flex flex-col h-full">
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
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <CodeEditor 
          value={code}
          onChange={onChange}
          language={language}
        />
        
        {/* Terminal Drawer */}
        <div className="absolute bottom-0 left-0 right-0">
          <TerminalDrawer
            isOpen={showTerminal}
            onToggle={onCloseTerminal}
            outputText={terminalOutput}
            testResults={terminalTestResults}
            onRunCode={onRunCode}
            onRunTests={handleRunTests}
            onSubmit={onMarkSolved}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default ContestCodePanel;
