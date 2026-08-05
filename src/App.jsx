import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Certifications from "./components/Certificate";
import Shipping from "./components/Shipping";
import MineralSources from "./components/MineralSources";
import Records from "./components/Records";
import Harvesting from "./components/Harvesting";
import Settings from "./components/Settings";
import ForgotPassword from "./context/ForgotPassword";
import ResetPassword from "./context/ResetPassword";

const pageTitles = {
  "/": "Dashboard",
  "/certifications": "Certificates",
  "/shipping": "Verification",
  "/mineral-sources": "Analytics",
  "/records": "Reports",
  "/harvesting": "Training",
  "/settings": "Settings",
};

function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "N.M.O";

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#0A1628]">
      {/* Full-screen mining hero background */}
      <div className="mining-bg" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />

        <main className="relative flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pb-8">
          <div className="mx-auto max-w-[1600px]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/mineral-sources" element={<MineralSources />} />
              <Route path="/records" element={<Records />} />
              <Route path="/harvesting" element={<Harvesting />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
      <BrowserRouter>
        <Routes>

          {/* Authentication */}

          <Route path="/login" element={<Login />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          {/* Main Application */}

          <Route path="/*" element={<Layout />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
