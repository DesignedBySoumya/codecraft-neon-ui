
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProblemsPage from "./pages/ProblemsPage";
import SheetsPage from "./pages/SheetsPage";
import SheetProblemManagerPage from "./pages/SheetProblemManagerPage";
import ContestsPage from "./pages/ContestsPage";
import InterviewPage from "./pages/InterviewPage";
import InterviewSessionPage from "./pages/InterviewSessionPage";
import InterviewAnalysisPage from "./pages/InterviewAnalysisPage";
import ProblemSolvePage from "./pages/ProblemSolvePage";
import CreateProblemPage from "./pages/CreateProblemPage";
import CreateListPage from "./pages/CreateListPage";
import CreateSheetPage from "./pages/CreateSheetPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/problems/create" element={<CreateProblemPage />} />
            <Route path="/sheets" element={<SheetsPage />} />
            <Route path="/sheets/create" element={<CreateSheetPage />} />
            <Route path="/sheet/:id" element={<SheetProblemManagerPage />} />
            <Route path="/create-list/:sourceId" element={<CreateListPage />} />
            <Route path="/contests" element={<ContestsPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/interview-session" element={<InterviewSessionPage />} />
            <Route path="/interview-analysis" element={<InterviewAnalysisPage />} />
            <Route path="/problem/:id" element={<ProblemSolvePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
