import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    // Mock client-side sign-in flow (pending backend auth API connection)
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-card__back">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">
            <span className="auth-card__logo-icon">IV</span>
            <span className="auth-card__logo-text">InterviewVerse AI</span>
          </Link>
          <h1 className="auth-card__title">Welcome Back</h1>
          <p className="auth-card__subtitle">
            Sign in to continue your personalized interview preparation.
          </p>
        </div>

        {error && <div className="auth-alert auth-alert--error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email" className="auth-field__label">
              Email Address
            </label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-field__row">
              <label htmlFor="password" className="auth-field__label">
                Password
              </label>
              <a href="#forgot" className="auth-link-subtle">
                Forgot password?
              </a>
            </div>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="auth-field__checkbox">
            <input
              id="rememberMe"
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me for 30 days</label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="auth-btn-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="auth-card__footer">
          <span>Don't have an account? </span>
          <Link to="/register" className="auth-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
