import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/navbar";
import AuthPage from "./pages/login/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";

import Products from "./pages/Products";
import POSScreen from "./pages/screen";
import "./App.css";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import StockHistoryPage from "./pages/screen";
import SupplierPage from "./pages/Supplier";
import PurchasePage from "./pages/Purchase";

// Layout for authenticated pages
const AppLayout = ({
  children,
  isMobileOpen,
  setIsMobileOpen,
}: {
  children: React.ReactNode;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}) => (
  <div className="app-container">
    <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
    <main className="main-content">
      <Navbar onMenuClick={() => setIsMobileOpen(true)} />
      <div className="page-content">{children}</div>
    </main>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Inventory />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Customers />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Products />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/screen"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <POSScreen />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Placeholders for other routes */}
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Billing />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Analytics />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock-history"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <StockHistoryPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <SupplierPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchase"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <PurchasePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
