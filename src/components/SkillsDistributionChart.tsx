
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SkillsDistributionChartProps {
  skills: {
    communication: number;
    confidence: number;
    clarity: number;
    structure: number;
    enthusiasm: number;
    technicalKnowledge: number;
  };
}

const SkillsDistributionChart = ({ skills }: SkillsDistributionChartProps) => {
  const data = [
    { name: 'Communication', value: skills.communication, color: '#3b82f6' },
    { name: 'Confidence', value: skills.confidence, color: '#10b981' },
    { name: 'Clarity', value: skills.clarity, color: '#f59e0b' },
    { name: 'Structure', value: skills.structure, color: '#ef4444' },
    { name: 'Enthusiasm', value: skills.enthusiasm, color: '#8b5cf6' },
    { name: 'Technical', value: skills.technicalKnowledge, color: '#06b6d4' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-craft-text-primary mb-4">Skills Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name}: ${Math.round(value)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${Math.round(Number(value))}%`, 'Score']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SkillsDistributionChart;
