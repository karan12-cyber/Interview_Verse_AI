import { Link, NavLink } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  ChevronLeft,
  Code2,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Settings,
  UserRound,
  X,
} from 'lucide-react';

const WORKSPACE_LINKS = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'AI Interviews', to: '/dashboard/interviews', icon: MessageSquareText },
  { label: 'Resume Analyzer', to: '/dashboard/resume', icon: FileText },
  { label: 'Coding Practice', to: '/dashboard/coding', icon: Code2 },
  { label: 'Analytics', to: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Interview History', to: '/dashboard/history', icon: Activity },
];

const ACCOUNT_LINKS = [
  { label: 'My Profile', to: '/dashboard/profile', icon: UserRound },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
];

function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const renderLinks = (items) => items.map(({ label, to, icon: Icon, end }) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      onClick={onClose}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) => `dashboard-sidebar__link${isActive ? ' is-active' : ''}`}
    >
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  ));

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="dashboard-sidebar__backdrop"
          aria-label="Close navigation menu"
          onClick={onClose}
        />
      )}
      <aside className={`dashboard-sidebar${isCollapsed ? ' is-collapsed' : ''}${isOpen ? ' is-open' : ''}`}>
        <div className="dashboard-sidebar__brand-row">
          <Link to="/dashboard" className="dashboard-brand" onClick={onClose} aria-label="InterviewVerse AI dashboard">
            <span className="dashboard-brand__mark" aria-hidden="true">IV</span>
            <span className="dashboard-brand__name">InterviewVerse <b>AI</b></span>
          </Link>
          <button type="button" className="dashboard-sidebar__mobile-close" onClick={onClose} aria-label="Close navigation menu">
            <X size={19} />
          </button>
        </div>

        <nav className="dashboard-sidebar__nav" aria-label="Student dashboard">
          <p className="dashboard-sidebar__section-label">Workspace</p>
          {renderLinks(WORKSPACE_LINKS)}
          <p className="dashboard-sidebar__section-label dashboard-sidebar__section-label--account">Account</p>
          {renderLinks(ACCOUNT_LINKS)}
        </nav>

        <div className="dashboard-sidebar__bottom">
          <div className="dashboard-sidebar__help">
            <span className="dashboard-sidebar__help-icon"><Activity size={16} /></span>
            <div>
              <strong>Small steps add up</strong>
              <span>Keep a steady practice rhythm.</span>
            </div>
          </div>
          <button
            type="button"
            className="dashboard-sidebar__logout"
            disabled
            title="Sign-in integration is not connected yet"
          >
            <LogOut size={18} aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>

        <button
          type="button"
          className="dashboard-sidebar__collapse"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-pressed={isCollapsed}
        >
          <ChevronLeft size={17} />
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
