
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Terminal } from "lucide-react";
import ToggleViewSwitcher from "./ToggleViewSwitcher";
import TestCaseResultItem from "./TestCaseResultItem";
import OutputTerminalBlock from "./OutputTerminalBlock";

interface TerminalCardProps {
  outputText: string;
  testResults: Array<{ id: number; passed: boolean }>;
  isVisible: boolean;
  onClose: () => void;
}

const TerminalCard = ({ outputText, testResults, isVisible, onClose }: TerminalCardProps) => {
  const [viewMode, setViewMode] = useState<"output" | "testcases">("testcases");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-switch to test cases if we have test results
  const currentViewMode = testResults.length > 0 ? "testcases" : viewMode;

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-craft-panel border-t border-craft-border shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-craft-border">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-craft-accent" />
          <h3 className="text-craft-text-primary font-semibold">Terminal</h3>
          {testResults.length > 0 && (
            <span className="text-craft-text-secondary text-sm">
              ({testResults.filter(t => t.passed).length}/{testResults.length} passed)
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <ToggleViewSwitcher
            currentView={currentViewMode}
            onViewChange={setViewMode}
            hasTestResults={testResults.length > 0}
          />
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-craft-text-secondary hover:text-craft-accent"
          >
            {isCollapsed ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="text-craft-text-secondary hover:text-craft-accent"
          >
            ×
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 max-h-72 overflow-y-auto">
          {currentViewMode === "output" ? (
            <OutputTerminalBlock outputText={outputText} />
          ) : (
            <div className="space-y-2">
              {testResults.map((test) => (
                <TestCaseResultItem
                  key={test.id}
                  testNumber={test.id}
                  passed={test.passed}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TerminalCard;
