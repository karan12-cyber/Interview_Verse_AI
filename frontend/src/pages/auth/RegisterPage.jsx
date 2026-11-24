import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Bot,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  LineChart,
  Lock,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
} from 'lucide-react';
import { authService } from '../../services/authService';
import './RegisterPage.css';

const TARGET_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Structures & Algorithms',
  'DevOps / Cloud Engineer',
  'Data Scientist / ML Engineer',
  'Software Engineer (General)',
];

function RegisterPage() {
  const navigate = useNavigate();

  // Step state: 'form' | 'otp'
  const [step, setStep] = useState('form');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRole: TARGET_ROLES[0],
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP State
  const [otpCode, setOtpCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Status & Validation States
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Resend Countdown Timer
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, resendTimer]);

  // Form Validation
  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.targetRole) {
      errs.targetRole = 'Please select a target role.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirming your password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms of Service to continue.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  // Submit Registration Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const result = await authService.register(
        formData.name.trim(),
        formData.email.trim(),
        formData.targetRole,
        formData.password
      );

      if (result.success) {
        setSuccessMessage(result.message || 'Verification code sent to your email.');
        setStep('otp');
        setResendTimer(30);
        setCanResend(false);
      }
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit numerical code.' });
      return;
    }

    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const result = await authService.verifyOtp(formData.email.trim(), otpCode.trim());
      if (result.success) {
        setSuccessMessage('Account verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      }
    } catch (err) {
      setServerError(err.message || 'Invalid or expired verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP Code
  const handleResendOtp = async () => {
    if (!canResend || isLoading) return;
    setIsLoading(true);
    setServerError('');
    try {
      const result = await authService.resendOtp(formData.email.trim());
      setSuccessMessage(result.message || 'New verification code sent.');
      setResendTimer(30);
      setCanResend(false);
    } catch (err) {
      setServerError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="register-wrapper">
        {/* ==============================================================
            LEFT SECTION: Branding, Copy & Feature Highlights
            ============================================================== */}
        <motion.div
          className="register-brand-panel"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Brand Logo & Name */}
          <Link to="/" className="register-brand-link" title="Return to Home">
            <span className="register-brand-badge" aria-hidden="true">IV</span>
            <span className="register-brand-name">InterviewVerse AI</span>
          </Link>

          {/* Intro Heading & Description */}
          <div className="register-intro-content">
            <span className="register-pill">
              <Sparkles size={14} className="register-pill-icon" />
              Candidate Onboarding
            </span>
            <h1 className="register-intro-title">Start Your Interview Preparation Journey</h1>
            <p className="register-intro-tagline">
              Master technical and behavioral interviews with real-time AI guidance.
            </p>
            <p className="register-intro-desc">
              Create your account to unlock AI-driven mock interviews tailored to your target role,
              instant STAR-method answer evaluation, hands-on coding challenges, and ATS resume scoring.
            </p>
          </div>

          {/* Attractive Interview-Related Visual Preview Card */}
          <div className="register-preview-card">
            <div className="register-preview-header">
              <div className="preview-indicator">
                <span className="preview-dot preview-dot--pulse" />
                <span className="preview-mode">Preparation Track</span>
              </div>
              <span className="register-role-badge">{formData.targetRole || 'Full Stack'}</span>
            </div>

            <div className="register-preview-milestones">
              <div className="milestone-item milestone-item--active">
                <div className="milestone-bullet">1</div>
                <div className="milestone-text">
                  <span className="milestone-title">Role-Based Question Bank</span>
                  <span className="milestone-sub">DSA, Frameworks & System Architecture</span>
                </div>
              </div>

              <div className="milestone-item milestone-item--active">
                <div className="milestone-bullet">2</div>
                <div className="milestone-text">
                  <span className="milestone-title">AI Answer Evaluation</span>
                  <span className="milestone-sub">STAR Rubric Scoring & Instant Feedback</span>
                </div>
              </div>

              <div className="milestone-item">
                <div className="milestone-bullet">3</div>
                <div className="milestone-text">
                  <span className="milestone-title">Readiness Analytics</span>
                  <span className="milestone-sub">Benchmark: 88% Placement Readiness</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Feature Highlights */}
          <div className="register-highlights">
            <div className="highlight-item">
              <div className="highlight-icon-wrap highlight-icon-wrap--blue">
                <Brain size={18} />
              </div>
              <div>
                <span className="highlight-title">AI-Powered Mock Interviews</span>
                <span className="highlight-desc">Adaptive questions by seniority & domain</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-wrap highlight-icon-wrap--green">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <span className="highlight-title">Personalized Feedback</span>
                <span className="highlight-desc">Actionable STAR scoring & weakness alerts</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-wrap highlight-icon-wrap--purple">
                <LineChart size={18} />
              </div>
              <div>
                <span className="highlight-title">Track Your Progress</span>
                <span className="highlight-desc">Comprehensive growth charts & interview history</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==============================================================
            RIGHT SECTION: Registration / OTP Verification Form
            ============================================================== */}
        <motion.div
          className="register-form-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="register-card">
            {/* Top Navigation */}
            <div className="register-card-top-nav">
              <Link to="/" className="register-back-button">
                <ArrowLeft size={16} />
                <span>Home</span>
              </Link>
            </div>

            {/* Error & Success Banners */}
            <AnimatePresence>
              {serverError && (
                <motion.div
                  className="register-alert register-alert--error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span>{serverError}</span>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  className="register-alert register-alert--success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CheckCircle2 size={16} />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ==============================================
                STEP 1: REGISTRATION FORM
                ============================================== */}
            {step === 'form' ? (
              <>
                <div className="register-card-header">
                  <h2 className="register-card-title">Create your account</h2>
                  <p className="register-card-subtitle">
                    Join students and fresh graduates preparing smarter for top opportunities.
                  </p>
                </div>

                <form className="register-form" onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className="register-field">
                    <label htmlFor="reg-name" className="register-field-label">
                      Full Name
                    </label>
                    <div
                      className={`register-input-box ${
                        errors.name ? 'register-input-box--error' : ''
                      }`}
                    >
                      <User size={18} className="register-field-icon" />
                      <input
                        id="reg-name"
                        type="text"
                        name="name"
                        className="register-input"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    {errors.name && <span className="register-error-text">{errors.name}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="register-field">
                    <label htmlFor="reg-email" className="register-field-label">
                      Email Address
                    </label>
                    <div
                      className={`register-input-box ${
                        errors.email ? 'register-input-box--error' : ''
                      }`}
                    >
                      <Mail size={18} className="register-field-icon" />
                      <input
                        id="reg-email"
                        type="email"
                        name="email"
                        className="register-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    {errors.email && <span className="register-error-text">{errors.email}</span>}
                  </div>

                  {/* Target Interview Role */}
                  <div className="register-field">
                    <label htmlFor="reg-role" className="register-field-label">
                      Target Interview Role
                    </label>
                    <div className="register-input-box">
                      <Briefcase size={18} className="register-field-icon" />
                      <select
                        id="reg-role"
                        name="targetRole"
                        className="register-input register-select"
                        value={formData.targetRole}
                        onChange={handleChange}
                        disabled={isLoading}
                      >
                        {TARGET_ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.targetRole && (
                      <span className="register-error-text">{errors.targetRole}</span>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="register-field">
                    <label htmlFor="reg-password" className="register-field-label">
                      Password
                    </label>
                    <div
                      className={`register-input-box ${
                        errors.password ? 'register-input-box--error' : ''
                      }`}
                    >
                      <Lock size={18} className="register-field-icon" />
                      <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="register-input"
                        placeholder="Create a password (min. 6 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="register-pwd-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="register-error-text">{errors.password}</span>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="register-field">
                    <label htmlFor="reg-confirm-password" className="register-field-label">
                      Confirm Password
                    </label>
                    <div
                      className={`register-input-box ${
                        errors.confirmPassword ? 'register-input-box--error' : ''
                      }`}
                    >
                      <Lock size={18} className="register-field-icon" />
                      <input
                        id="reg-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        className="register-input"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="register-pwd-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="register-error-text">{errors.confirmPassword}</span>
                    )}
                  </div>

                  {/* Terms & Privacy Agreement */}
                  <div className="register-checkbox-wrap">
                    <label className="register-checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="register-checkbox"
                        disabled={isLoading}
                      />
                      <span>
                        I agree to the <a href="#terms" className="register-inline-link">Terms of Service</a> and <a href="#privacy" className="register-inline-link">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <span className="register-error-text">{errors.agreeTerms}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="register-submit-btn"
                    disabled={isLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isLoading ? (
                      <span className="btn-spinner-wrap">
                        <span className="btn-spinner" />
                        Creating account...
                      </span>
                    ) : (
                      'Get Started'
                    )}
                  </motion.button>
                </form>

                {/* Card Footer */}
                <div className="register-card-footer">
                  <p className="register-footer-text">
                    Already have an account?{' '}
                    <Link to="/login" className="register-footer-link">
                      Sign In
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              /* ==============================================
                 STEP 2: OTP VERIFICATION
                 ============================================== */
              <div className="otp-verification-panel">
                <div className="otp-icon-wrap">
                  <ShieldCheck size={36} />
                </div>
                <h2 className="register-card-title">Verify Your Email</h2>
                <p className="register-card-subtitle">
                  We've sent a 6-digit verification code to <br />
                  <strong className="otp-recipient-email">{formData.email}</strong>
                </p>

                <form className="register-form" onSubmit={handleVerifyOtp}>
                  <div className="register-field">
                    <label htmlFor="otp-input" className="register-field-label">
                      Enter 6-Digit Code
                    </label>
                    <div className="register-input-box">
                      <input
                        id="otp-input"
                        type="text"
                        maxLength="6"
                        className="register-input otp-number-input"
                        placeholder="••••••"
                        value={otpCode}
                        onChange={(e) => {
                          setOtpCode(e.target.value.replace(/\D/g, ''));
                          setErrors({});
                          setServerError('');
                        }}
                        autoFocus
                        disabled={isLoading}
                        required
                      />
                    </div>
                    {errors.otp && <span className="register-error-text">{errors.otp}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className="register-submit-btn"
                    disabled={isLoading || otpCode.length !== 6}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isLoading ? (
                      <span className="btn-spinner-wrap">
                        <span className="btn-spinner" />
                        Verifying code...
                      </span>
                    ) : (
                      'Verify & Continue'
                    )}
                  </motion.button>
                </form>

                <div className="otp-resend-row">
                  {canResend ? (
                    <button
                      type="button"
                      className="otp-resend-btn"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                    >
                      <RotateCcw size={14} />
                      <span>Resend Verification Code</span>
                    </button>
                  ) : (
                    <span className="otp-timer-text">
                      <Clock size={14} />
                      Resend code in {resendTimer}s
                    </span>
                  )}
                </div>

                <div className="otp-back-row">
                  <button
                    type="button"
                    className="otp-back-link"
                    onClick={() => {
                      setStep('form');
                      setServerError('');
                      setSuccessMessage('');
                    }}
                  >
                    ← Edit registration details
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
