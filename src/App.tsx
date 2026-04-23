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

// Layout for authenticated pages
const AppLayout = ({ 
  children, 
  isMobileOpen, 
  setIsMobileOpen 
}: { 
  children: React.ReactNode, 
  isMobileOpen: boolean, 
  setIsMobileOpen: (open: boolean) => void 
}) => (
  <div className="app-container">
    <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
    <main className="main-content">
      <Navbar onMenuClick={() => setIsMobileOpen(true)} />
      <div className="page-content">{children}</div>
    </main>
  </div>
);

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
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/inventory"
          element={
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <Inventory />
            </AppLayout>
          }
        />
        <Route
          path="/customers"
          element={
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <Customers />
            </AppLayout>
          }
        />
        <Route
          path="/products"
          element={
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <Products />
            </AppLayout>
          }
        />
        <Route
          path="/screen"
          element={
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <POSScreen />
            </AppLayout>
          }
        />

        {/* Placeholders for other routes */}
        <Route
          path="/billing"
          element={
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <Billing />
            </AppLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <Analytics />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen}>
              <Settings />
            </AppLayout>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
