
import { ReactNode } from "react";

interface LiveContestLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  leftPanelWidth: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

const LiveContestLayout = ({ 
  leftPanel, 
  rightPanel, 
  leftPanelWidth, 
  onResizeStart 
}: LiveContestLayoutProps) => {
  return (
    <div className="flex h-[calc(100vh-160px)]">
      {/* Left Panel - Problem Description */}
      <div 
        className="bg-craft-panel border-r border-craft-border overflow-y-auto"
        style={{ width: `${leftPanelWidth}%` }}
      >
        {leftPanel}
      </div>

      {/* Resize Handle */}
      <div 
        className="w-1 bg-craft-border hover:bg-craft-accent cursor-col-resize transition-colors"
        onMouseDown={onResizeStart}
      />

      {/* Right Panel - Code Editor */}
      <div className="flex-1 flex flex-col">
        {rightPanel}
      </div>
    </div>
  );
};

export default LiveContestLayout;
