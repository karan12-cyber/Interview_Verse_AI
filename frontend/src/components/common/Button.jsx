import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Reusable Button component
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {string} props.to - React Router link destination
 * @param {string} props.href - Anchor link (for in-page navigation)
 * @param {Function} props.onClick
 * @param {React.ReactNode} props.children
 */
function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
