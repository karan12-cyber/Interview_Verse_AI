import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  BarChart3,
  Bot,
  Brain,
  Code2,
  FileSearch,
  LogOut,
  Play,
  TrendingUp,
  User,
} from 'lucide-react';
import { authService } from '../../services/authService';
import './StudentDashboard.css';

function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser && !authService.isAuthenticated()) {
      navigate('/login');
    } else {
      setUser(currentUser || { name: 'Candidate', email: 'student@example.com', targetRole: 'Software Engineer' });
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="dash-container">
      {/* Top Navbar */}
      <header className="dash-nav">
        <div className="dash-nav-inner">
          <Link to="/" className="dash-brand">
            <span className="dash-logo-badge">IV</span>
            <span className="dash-logo-text">InterviewVerse AI</span>
          </Link>

          <div className="dash-user-menu">
            <div className="dash-user-info">
              <span className="dash-user-name">{user?.name || 'Candidate'}</span>
              <span className="dash-user-role">{user?.targetRole || 'Student'}</span>
            </div>
            <button type="button" className="dash-logout-btn" onClick={handleLogout} title="Log Out">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dash-main">
        <motion.div
          className="dash-welcome-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="dash-pill">Candidate Dashboard</span>
            <h1 className="dash-welcome-title">Welcome back, {user?.name || 'Candidate'}! 👋</h1>
            <p className="dash-welcome-subtitle">
              Ready to level up your technical interview skills today? Choose a module below to start.
            </p>
          </div>
          <Link to="/" className="dash-home-btn">
            View Platform Overview
          </Link>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="dash-stats-grid">
          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon--blue">
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="dash-stat-val">78 / 100</span>
              <span className="dash-stat-lbl">Average Score</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon--green">
              <Bot size={22} />
            </div>
            <div>
              <span className="dash-stat-val">12</span>
              <span className="dash-stat-lbl">Mock Interviews</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon--purple">
              <Award size={22} />
            </div>
            <div>
              <span className="dash-stat-val">85%</span>
              <span className="dash-stat-lbl">Answer Accuracy</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <h2 className="dash-section-title">Preparation Modules</h2>
        <div className="dash-modules-grid">
          <motion.div className="dash-module-card" whileHover={{ y: -4 }}>
            <div className="dash-mod-icon dash-mod-icon--blue">
              <Brain size={28} />
            </div>
            <h3 className="dash-mod-title">AI Mock Interview</h3>
            <p className="dash-mod-desc">
              Practice role-specific technical and behavioral questions evaluated in real-time by AI.
            </p>
            <button type="button" className="dash-mod-action-btn">
              <span>Start Session</span>
              <Play size={16} />
            </button>
          </motion.div>

          <motion.div className="dash-module-card" whileHover={{ y: -4 }}>
            <div className="dash-mod-icon dash-mod-icon--purple">
              <Code2 size={28} />
            </div>
            <h3 className="dash-mod-title">Coding Practice</h3>
            <p className="dash-mod-desc">
              Solve algorithmic problems in an interactive code workspace with automated tests.
            </p>
            <button type="button" className="dash-mod-action-btn">
              <span>Open Editor</span>
              <Play size={16} />
            </button>
          </motion.div>

          <motion.div className="dash-module-card" whileHover={{ y: -4 }}>
            <div className="dash-mod-icon dash-mod-icon--green">
              <FileSearch size={28} />
            </div>
            <h3 className="dash-mod-title">Resume Analyzer</h3>
            <p className="dash-mod-desc">
              Upload your PDF resume to receive instant ATS compatibility feedback and keyword tips.
            </p>
            <button type="button" className="dash-mod-action-btn">
              <span>Analyze Resume</span>
              <Play size={16} />
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
