import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../common/Button';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Brand */}
        <Link to="/" className="navbar__brand" onClick={closeMobile}>
          <span className="navbar__logo-icon" aria-hidden="true">IV</span>
          <span className="navbar__logo-text">InterviewVerse AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="navbar__actions">
          <Button variant="ghost" size="sm" to="/login">
            Log In
          </Button>
          <Button variant="primary" size="sm" to="/register">
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="navbar__mobile">
          <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__mobile-link"
                onClick={closeMobile}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="navbar__mobile-actions">
            <Button variant="outline" size="md" to="/login" onClick={closeMobile}>
              Log In
            </Button>
            <Button variant="primary" size="md" to="/register" onClick={closeMobile}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
