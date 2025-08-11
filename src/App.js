// src/App.js
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import ModeToggle from "./components/ModeToggle";
import BentoBox from "./components/BentoBox";
import AssetRequestPage from "./pages/AssetRequestPage";
import FormLayout from "./components/FormLayout";

function Layout() {
  const location = useLocation();
  const isAssetRequestPage = location.pathname === "/asset-request";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <AnimatedBackground />
      <ModeToggle />
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
      </Route>
    </Routes>
  );
}
