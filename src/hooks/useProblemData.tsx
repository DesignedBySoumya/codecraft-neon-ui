
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  starter_code: string;
}

interface TestCase {
  id: number;
  problem_id: number;
  input: string;
  expected_output: string;
}

export const useProblemData = (problemId: number) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setLoading(true);
        
        // Fetch problem data
        const { data: problemData, error: problemError } = await supabase
          .from('problems')
          .select('*')
          .eq('id', problemId)
          .single();

        if (problemError) {
          throw problemError;
        }

        // Fetch test cases
        const { data: testCasesData, error: testCasesError } = await supabase
          .from('test_cases')
          .select('*')
          .eq('problem_id', problemId);

        if (testCasesError) {
          throw testCasesError;
        }

        setProblem(problemData);
        setTestCases(testCasesData || []);
      } catch (err) {
        console.error('Error fetching problem data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load problem');
      } finally {
        setLoading(false);
      }
    };

    fetchProblemData();
  }, [problemId]);

  return { problem, testCases, loading, error };
};
