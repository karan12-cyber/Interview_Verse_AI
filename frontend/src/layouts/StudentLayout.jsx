import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import '../styles/dashboard.css';

const PAGE_TITLES = {
  '/dashboard': 'Overview',
  '/dashboard/interviews': 'AI Interviews',
  '/dashboard/resume': 'Resume Analyzer',
  '/dashboard/coding': 'Coding Practice',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/history': 'Interview History',
  '/dashboard/profile': 'My Profile',
  '/dashboard/settings': 'Settings',
};

function StudentLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pageTitle = PAGE_TITLES[location.pathname] || 'Overview';

  useEffect(() => {
    if (!isSidebarOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  return (
    <div className={`dashboard-shell${isSidebarCollapsed ? ' dashboard-shell--collapsed' : ''}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
      />
      <div className="dashboard-main">
        <Topbar title={pageTitle} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
