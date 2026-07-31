import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from "./components/Login";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Certifications from './components/Certificate';
import Shipping from './components/Shipping';
import MineralSources from './components/MineralSources';
import Records from './components/Records';
import Harvesting from './components/Harvesting';
import Settings from './components/Settings';

const pageTitles = {
  '/': 'Dashboard',
  '/certifications': 'Certifications',
  '/shipping': 'Shipping',
  '/mineral-sources': 'Mineral Sources',
  '/records': 'Records',
  '/harvesting': 'Harvesting',
  '/settings': 'Settings',
};

function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Nairobi Mining Operations';

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/mineral-sources" element={<MineralSources />} />
            <Route path="/records" element={<Records />} />
            <Route path="/harvesting" element={<Harvesting />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Removed the role for login on landing page

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
