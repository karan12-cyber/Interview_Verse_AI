import './SectionHeading.css';

/**
 * Reusable section heading with label, title and subtitle
 * @param {Object} props
 * @param {string} props.label - Small colored label above title
 * @param {string} props.title - Main heading
 * @param {string} props.subtitle - Description text
 * @param {'left'|'center'} props.align
 */
function SectionHeading({ label, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label && <span className="section-heading__label">{label}</span>}
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
