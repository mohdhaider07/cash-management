import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/Admin";
import GuestRoute from "./components/GuestRoute";
import DashboardFragment from "./pages/admin/dashboard/DashboardFragment";
import ReportFragment from "./pages/admin/outstanding-report/ReportFragment";
import PaymentFragment from "./pages/admin/payment-report/PaymentFragment";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <SignUp />
                </GuestRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardFragment />} />
              <Route path="outstanding-report" element={<ReportFragment />} />
              <Route path="payment-report" element={<PaymentFragment />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
