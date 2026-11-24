import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Bot,
  Brain,
  CheckCircle2,
  Eye,
  EyeOff,
  LineChart,
  Lock,
  Mail,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { authService } from '../../services/authService';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Validation
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear inline error on change
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (authError) setAuthError('');
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setAuthError('');

    try {
      const result = await authService.login(
        formData.email.trim(),
        formData.password,
        formData.rememberMe
      );
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setAuthError(err.message || 'Unable to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Handler
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setAuthError('');
    try {
      await authService.loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setAuthError('Google sign in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="login-wrapper">
        {/* =========================================
            LEFT SECTION — Branding & Introduction
            ========================================= */}
        <motion.div
          className="login-brand-panel"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Header Brand Link */}
          <Link to="/" className="login-brand-link" title="Return to Home">
            <span className="login-brand-badge" aria-hidden="true">IV</span>
            <span className="login-brand-name">InterviewVerse AI</span>
          </Link>

          {/* Heading and Copy */}
          <div className="login-intro-content">
            <span className="login-pill">
              <Sparkles size={14} className="login-pill-icon" />
              Next-Gen Preparation
            </span>
            <h1 className="login-intro-title">Welcome Back!</h1>
            <p className="login-intro-tagline">
              Your next opportunity starts with better preparation.
            </p>
            <p className="login-intro-desc">
              Practice role-tailored technical & behavioral interviews, master coding challenges
              in real time, and receive instant AI-powered feedback designed to land your dream role.
            </p>
          </div>

          {/* Interactive Mockup / Illustration Card */}
          <div className="login-preview-card">
            <div className="preview-top-bar">
              <div className="preview-indicator">
                <span className="preview-dot preview-dot--pulse" />
                <span className="preview-mode">Active AI Session</span>
              </div>
              <span className="preview-role-tag">Frontend Developer</span>
            </div>

            <div className="preview-dialogue-box">
              <div className="preview-avatar">
                <Bot size={18} />
              </div>
              <div className="preview-bubble">
                <p className="preview-q-text">
                  "Explain the internal virtual DOM reconciliation algorithm in React."
                </p>
              </div>
            </div>

            <div className="preview-feedback-strip">
              <div className="feedback-score-badge">
                <TrendingUp size={16} />
                <span>AI Score: 94/100</span>
              </div>
              <span className="feedback-note">High technical accuracy & STAR alignment</span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="login-highlights">
            <div className="highlight-item">
              <div className="highlight-icon-wrap highlight-icon-wrap--blue">
                <Brain size={18} />
              </div>
              <div>
                <span className="highlight-title">AI-Powered Mock Interviews</span>
                <span className="highlight-desc">Customized questions per target role</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-wrap highlight-icon-wrap--green">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <span className="highlight-title">Personalized Feedback</span>
                <span className="highlight-desc">Actionable tips & metric scores</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-wrap highlight-icon-wrap--purple">
                <LineChart size={18} />
              </div>
              <div>
                <span className="highlight-title">Track Your Progress</span>
                <span className="highlight-desc">Historical readiness analytics</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            RIGHT SECTION — Login Form Card
            ========================================= */}
        <motion.div
          className="login-form-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="login-card">
            {/* Mobile Header Brand & Back */}
            <div className="login-card-top-nav">
              <Link to="/" className="login-back-button">
                <ArrowLeft size={16} />
                <span>Home</span>
              </Link>
            </div>

            <div className="login-card-header">
              <h2 className="login-card-title">Sign in to your account</h2>
              <p className="login-card-subtitle">
                Continue your interview preparation journey.
              </p>
            </div>

            {/* Error Notification */}
            <AnimatePresence>
              {authError && (
                <motion.div
                  className="login-alert login-alert--error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span>{authError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign In Button */}
            <motion.button
              type="button"
              className="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
            </motion.button>

            {/* Divider */}
            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">OR</span>
              <span className="login-divider-line" />
            </div>

            {/* Login Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <div className="login-field">
                <label htmlFor="login-email" className="login-field-label">
                  Email Address
                </label>
                <div
                  className={`login-input-box ${
                    formErrors.email ? 'login-input-box--error' : ''
                  }`}
                >
                  <Mail size={18} className="login-field-icon" />
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    className="login-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
                {formErrors.email && (
                  <span className="login-error-text">{formErrors.email}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="login-password" className="login-field-label">
                    Password
                  </label>
                  <Link to="/forgot-password" className="login-forgot-link">
                    Forgot Password?
                  </Link>
                </div>
                <div
                  className={`login-input-box ${
                    formErrors.password ? 'login-input-box--error' : ''
                  }`}
                >
                  <Lock size={18} className="login-field-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="login-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="login-pwd-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formErrors.password && (
                  <span className="login-error-text">{formErrors.password}</span>
                )}
              </div>

              {/* Remember Me */}
              <div className="login-checkbox-row">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="login-checkbox"
                  />
                  <span>Remember Me</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <span className="btn-spinner-wrap">
                    <span className="btn-spinner" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>

            {/* Card Footer */}
            <div className="login-card-footer">
              <p className="login-footer-text">
                Don't have an account?{' '}
                <Link to="/register" className="login-footer-link">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
