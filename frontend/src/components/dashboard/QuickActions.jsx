import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, FileSearch, MessageSquareText } from 'lucide-react';

const ACTIONS = [
  { title: 'Start AI interview', description: 'Practice role-based questions', to: '/dashboard/interviews', icon: MessageSquareText, tone: 'navy' },
  { title: 'Analyze resume', description: 'Review skills and keywords', to: '/dashboard/resume', icon: FileSearch, tone: 'blue' },
  { title: 'Practice coding', description: 'Work through a challenge', to: '/dashboard/coding', icon: Code2, tone: 'teal' },
];

function QuickActions() {
  return (
    <section className="dashboard-section" aria-labelledby="quick-actions-title">
      <div className="dashboard-section__heading dashboard-section__heading--compact">
        <div>
          <p className="dashboard-eyebrow">Pick up where you left off</p>
          <h2 id="quick-actions-title">Quick actions</h2>
        </div>
      </div>
      <div className="dashboard-quick-actions">
        {ACTIONS.map(({ title, description, to, icon: Icon, tone }) => (
          <Link className="dashboard-action-card" to={to} key={to}>
            <span className={`dashboard-action-card__icon dashboard-action-card__icon--${tone}`}>
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="dashboard-action-card__copy">
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <ArrowUpRight className="dashboard-action-card__arrow" size={17} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
