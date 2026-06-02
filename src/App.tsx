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
import ManageUsers from "./pages/ManageUsers";
import ManageStores from "./pages/ManageStores";
import ManageTables from "./pages/ManageTables";
import AddProduct from "./pages/AddProduct";
import ProductWiseReport from "./pages/ProductWiseReport";
import TotalStoreWiseReport from "./pages/TotalStoreWiseReport";
import CompanyInfo from "./pages/CompanyInfo";
import StockHistoryPage from "./pages/screen";
import SupplierPage from "./pages/Supplier";
import PurchasePage from "./pages/Purchase";
import Permissions from "./pages/Permissions";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import AddUser from "./pages/AddUser";

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
          path="/reports/product-wise"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <ProductWiseReport />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/store-wise"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <TotalStoreWiseReport />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-info"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <CompanyInfo />
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
        <Route
          path="/permissions"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Permissions />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Profile />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <Category />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-user"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <AddUser />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <ManageUsers />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-stores"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <ManageStores />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-tables"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <ManageTables />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AppLayout
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
              >
                <AddProduct />
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
