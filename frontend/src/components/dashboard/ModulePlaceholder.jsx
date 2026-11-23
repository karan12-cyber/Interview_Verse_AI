import { ArrowLeft, CircleDashed } from 'lucide-react';
import { Link } from 'react-router-dom';

function ModulePlaceholder({ title, description }) {
  return (
    <section className="dashboard-panel dashboard-module-placeholder">
      <span className="dashboard-module-placeholder__icon"><CircleDashed size={22} /></span>
      <p className="dashboard-eyebrow">Module connection pending</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="dashboard-module-placeholder__note">This area is a route placeholder. No AI, upload, or practice workflow is simulated here.</p>
      <Link className="dashboard-text-link" to="/dashboard"><ArrowLeft size={15} /> Back to overview</Link>
    </section>
  );
}

export default ModulePlaceholder;
