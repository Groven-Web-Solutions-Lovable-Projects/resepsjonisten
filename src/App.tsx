import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalculatorProvider } from "@/contexts/CalculatorContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import Personvern from "./pages/Personvern.tsx";
import Kalkulator from "./pages/Kalkulator.tsx";
import Takk from "./pages/Takk.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CalculatorProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/personvern" element={<Personvern />} />
            <Route path="/kalkulator" element={<Kalkulator />} />
            <Route path="/takk" element={<Takk />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CalculatorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
