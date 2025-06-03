
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface LiveQuestionBoxProps {
  question: string;
  questionNumber: number;
}

const LiveQuestionBox = ({ question, questionNumber }: LiveQuestionBoxProps) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-600 rounded-lg">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-600">Question {questionNumber}</Badge>
            <span className="text-sm text-gray-500">AI Interviewer</span>
          </div>
          
          <p className="text-lg text-gray-900 leading-relaxed">{question}</p>
          
          <div className="mt-4 text-sm text-gray-600">
            💡 Take your time and speak clearly. The AI is listening to your response.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveQuestionBox;
