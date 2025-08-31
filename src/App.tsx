import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SalesData from "./pages/SalesData";
import TenantManagement from "./pages/TenantManagement";
import AlertConfiguration from "./pages/AlertConfiguration";
import DataMapping from "./pages/DataMapping";
import UserManagement from "./pages/UserManagement";
import AuditLogs from "./pages/AuditLogs";
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
              <TenantManagement />
            </DashboardLayout>
          } />
          <Route path="/alerts" element={
            <DashboardLayout>
              <AlertConfiguration />
            </DashboardLayout>
          } />
          <Route path="/mapping" element={
            <DashboardLayout>
              <DataMapping />
            </DashboardLayout>
          } />
          <Route path="/users" element={
            <DashboardLayout>
              <UserManagement />
            </DashboardLayout>
          } />
          <Route path="/audit" element={
            <DashboardLayout>
              <AuditLogs />
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
