import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import NewRequestPage from "../pages/NewRequestPage";
import RequestDetailPage from "../pages/RequestDetailPage";
import RequesterDashboard from "../pages/RequesterDashboard";
import ReviewerDashboard from "../pages/ReviewerDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute role="REQUESTER">
            <RequesterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/new"
        element={
          <ProtectedRoute role="REQUESTER">
            <NewRequestPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests/:id"
        element={
          <ProtectedRoute role="REQUESTER">
            <RequestDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reviewer"
        element={
          <ProtectedRoute role="REVIEWER">
            <ReviewerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
