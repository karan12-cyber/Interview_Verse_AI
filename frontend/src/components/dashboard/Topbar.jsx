import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';

function Topbar({ title, onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar__leading">
        <button type="button" className="dashboard-topbar__menu" onClick={onMenuClick} aria-label="Open navigation menu">
          <Menu size={20} />
        </button>
        <div>
          <p className="dashboard-topbar__eyebrow">Student workspace</p>
          <h1 className="dashboard-topbar__title">{title}</h1>
        </div>
      </div>

      <div className="dashboard-topbar__tools">
        <label className="dashboard-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search dashboard</span>
          <input type="search" placeholder="Search" aria-label="Search dashboard" />
          <kbd>/</kbd>
        </label>

        <button type="button" className="dashboard-topbar__notification" aria-label="Notifications, no new alerts">
          <Bell size={19} strokeWidth={1.8} />
        </button>

        <div className="dashboard-profile-menu">
          <button
            type="button"
            className="dashboard-profile-menu__trigger"
            onClick={() => setIsProfileOpen((open) => !open)}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            <span className="dashboard-avatar" aria-hidden="true">AM</span>
            <span className="dashboard-profile-menu__name"><strong>Alex Morgan</strong><small>Student</small></span>
            <ChevronDown size={15} aria-hidden="true" />
          </button>
          {isProfileOpen && (
            <div className="dashboard-profile-menu__dropdown" role="menu">
              <div className="dashboard-profile-menu__summary">
                <strong>Alex Morgan</strong>
                <span>Sample profile</span>
              </div>
              <Link to="/dashboard/profile" role="menuitem" onClick={() => setIsProfileOpen(false)}>My profile</Link>
              <Link to="/dashboard/settings" role="menuitem" onClick={() => setIsProfileOpen(false)}>Settings</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
