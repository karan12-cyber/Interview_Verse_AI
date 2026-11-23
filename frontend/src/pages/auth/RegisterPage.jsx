import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Lock, Mail, User } from 'lucide-react';
import Button from '../../components/common/Button';
import './RegisterPage.css';

const TARGET_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Structures & Algorithms',
  'DevOps / Cloud Engineer',
  'Data Scientist / ML Engineer',
];

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRole: TARGET_ROLES[0],
    password: '',
    confirmPassword: '',
    agreeTerms: false,
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

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);

    // Mock registration flow (pending backend auth API connection)
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <Link to="/" className="auth-card__back">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">
            <span className="auth-card__logo-icon">IV</span>
            <span className="auth-card__logo-text">InterviewVerse AI</span>
          </Link>
          <h1 className="auth-card__title">Create Account</h1>
          <p className="auth-card__subtitle">
            Join students and graduates preparing smarter for technical interviews.
          </p>
        </div>

        {error && <div className="auth-alert auth-alert--error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name" className="auth-field__label">
              Full Name
            </label>
            <div className="auth-input-wrapper">
              <User size={18} className="auth-input-icon" />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="reg-email" className="auth-field__label">
              Email Address
            </label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                id="reg-email"
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
            <label htmlFor="targetRole" className="auth-field__label">
              Target Interview Role
            </label>
            <div className="auth-input-wrapper">
              <Briefcase size={18} className="auth-input-icon" />
              <select
                id="targetRole"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                className="auth-input auth-select"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="reg-password" className="auth-field__label">
              Password
            </label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="reg-password"
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword" className="auth-field__label">
              Confirm Password
            </label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="auth-field__checkbox">
            <input
              id="agreeTerms"
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="auth-btn-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Get Started'}
          </Button>
        </form>

        <div className="auth-card__footer">
          <span>Already have an account? </span>
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
