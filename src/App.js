// src/App.js
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import ModeToggle from "./components/ModeToggle";
import BentoBox from "./components/BentoBox";
import AssetRequestPage from "./pages/AssetRequestPage";
import FormLayout from "./components/FormLayout";
import AssetListPage from "./pages/AssetListPage";
import AssetDetailPage from "./pages/AssetDetailPage";
import AdminAssetPage from "./pages/AdminAssetPage";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const isAssetRequestPage = location.pathname === "/asset-request";
  const { role, loginAsAdmin, loginAsUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <AnimatedBackground />
      <ModeToggle />
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {role === 'admin' ? (
          <button onClick={loginAsUser} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Switch to User</button>
        ) : (
          <button onClick={loginAsAdmin} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Login as Admin</button>
        )}
      </div>
      {!isAssetRequestPage && (
        <header className="mb-12 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-xl mb-2 font-inter">
            NETL Web Portal
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-inter">
            Quick access to essential IT services for your organization.
          </p>
        </header>
      )}

      {/* This is where each route’s content will render */}
      <div className="z-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BentoBox />} />
        <Route path="/asset-request" element={<AssetRequestPage />} />
        <Route path="/assets" element={<AssetListPage />} />
        <Route path="/assets/:id" element={<AssetDetailPage />} />
        <Route path="/admin/add" element={<AdminAssetPage />} />
        <Route path="/admin/edit/:id" element={<AdminAssetPage />} />
      </Route>
    </Routes>
  );
}
