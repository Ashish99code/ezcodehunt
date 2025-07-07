import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import AdminDashboard from "pages/admin-dashboard";
import ToolComparison from "pages/tool-comparison";
import ToolsDirectory from "pages/tools-directory";
import ToolSubmission from "pages/tool-submission";
import ToolDetails from "pages/tool-details";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/tool-comparison" element={<ToolComparison />} />
        <Route path="/tools-directory" element={<ToolsDirectory />} />
        <Route path="/tool-submission" element={<ToolSubmission />} />
        <Route path="/tool-details" element={<ToolDetails />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;