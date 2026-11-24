import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import './LoginPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid registered email address.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="login-wrapper" style={{ gridTemplateColumns: '1fr', maxWidth: '480px', minHeight: 'auto' }}>
        <div className="login-form-panel" style={{ padding: '2.5rem' }}>
          <div className="login-card" style={{ maxWidth: '100%' }}>
            <div className="login-card-top-nav">
              <Link to="/login" className="login-back-button">
                <ArrowLeft size={16} />
                <span>Back to Login</span>
              </Link>
            </div>

            <div className="login-card-header">
              <h2 className="login-card-title">Reset your password</h2>
              <p className="login-card-subtitle">
                Enter your email and we'll send you recovery instructions.
              </p>
            </div>

            {error && <div className="login-alert login-alert--error">{error}</div>}

            {isSubmitted ? (
              <motion.div
                className="auth-success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '1.5rem 0' }}
              >
                <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', marginBottom: '1rem' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#192957', marginBottom: '0.5rem' }}>Check your inbox</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  We have sent password reset instructions to <strong>{email}</strong> if it matches an account in our system.
                </p>
                <Link to="/login" className="login-submit-btn" style={{ textDecoration: 'none' }}>
                  Return to Sign In
                </Link>
              </motion.div>
            ) : (
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-field">
                  <label htmlFor="reset-email" className="login-field-label">
                    Email Address
                  </label>
                  <div className="login-input-box">
                    <Mail size={18} className="login-field-icon" />
                    <input
                      id="reset-email"
                      type="email"
                      className="login-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="login-submit-btn"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ForgotPasswordPage;
