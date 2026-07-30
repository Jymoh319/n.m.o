import { useState } from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import Shipping from './components/Shipping';
import MineralSources from './components/MineralSources';
import Royalties from './components/Royalties';
import Harvesting from './components/Harvesting';
import Settings from './components/Settings';

const pageTitles = {
  '/': 'Dashboard',
  '/certificate': 'Certificate',
  '/shipping': 'Shipping',
  '/mineral-sources': 'Mineral Sources',
  '/royalties': 'Royalties',
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
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/mineral-sources" element={<MineralSources />} />
            <Route path="/royalties" element={<Royalties />} />
            <Route path="/harvesting" element={<Harvesting />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [role, setRole] = useState(null);

  if (!role) {
    return <Login onLogin={setRole} />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout role={role} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;