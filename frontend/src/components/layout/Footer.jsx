import { Link } from 'react-router-dom';
import './Footer.css';

const PRODUCT_LINKS = [
  { label: 'AI Mock Interview', href: '#features' },
  { label: 'Resume Analyzer', href: '#features' },
  { label: 'Coding Practice', href: '#features' },
  { label: 'Performance Analytics', href: '#features' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand-col">
            <Link to="/" className="footer__brand">
              <span className="footer__logo-icon" aria-hidden="true">IV</span>
              <span className="footer__logo-text">InterviewVerse AI</span>
            </Link>
            <p className="footer__description">
              An AI-powered interview preparation platform designed to help students
              and fresh graduates build confidence and land their dream jobs.
            </p>
          </div>

          {/* Product Links */}
          <div className="footer__links-col">
            <h4 className="footer__heading">Product</h4>
            <nav aria-label="Product links">
              {PRODUCT_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footer__link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Navigation Links */}
          <div className="footer__links-col">
            <h4 className="footer__heading">Navigation</h4>
            <nav aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footer__link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Account Links */}
          <div className="footer__links-col">
            <h4 className="footer__heading">Account</h4>
            <nav aria-label="Account links">
              <Link to="/login" className="footer__link">Log In</Link>
              <Link to="/register" className="footer__link">Create Account</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} InterviewVerse AI. Built as a B.Tech CSE Final Year Project.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
