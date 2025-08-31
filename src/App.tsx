import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SalesData from "./pages/SalesData";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/sales-data" element={
            <DashboardLayout>
              <SalesData />
            </DashboardLayout>
          } />
          <Route path="/tracking" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Tracking Submission Status</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </DashboardLayout>
          } />
          <Route path="/tenants" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Tenant Management</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </DashboardLayout>
          } />
          <Route path="/alerts" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Alert Configuration</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </DashboardLayout>
          } />
          <Route path="/mapping" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Data Mapping</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </DashboardLayout>
          } />
          <Route path="/users" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">User Management</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </DashboardLayout>
          } />
          <Route path="/audit" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Audit Logs</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
