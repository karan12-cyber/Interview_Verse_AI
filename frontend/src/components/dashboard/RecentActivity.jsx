import { ArrowRight, Code2, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SAMPLE_ACTIVITIES } from './dashboardData';

function RecentActivity() {
  return (
    <section className="dashboard-panel dashboard-activity" aria-labelledby="recent-activity-title">
      <div className="dashboard-panel__heading">
        <div>
          <h2 id="recent-activity-title">Recent activity</h2>
          <p>A sample of your latest practice sessions</p>
        </div>
        <Link className="dashboard-text-link" to="/dashboard/history">View history <ArrowRight size={15} /></Link>
      </div>
      <div className="dashboard-activity__table-wrap">
        <table className="dashboard-activity__table">
          <thead><tr><th scope="col">Activity</th><th scope="col">Date</th><th scope="col">Score</th><th scope="col">Status</th></tr></thead>
          <tbody>
            {SAMPLE_ACTIVITIES.map((activity) => {
              const Icon = activity.kind === 'coding' ? Code2 : MessageSquareText;
              return (
                <tr key={activity.title}>
                  <td><span className="dashboard-activity__title"><span className="dashboard-activity__icon"><Icon size={16} /></span>{activity.title}</span></td>
                  <td>{activity.date}</td>
                  <td className="dashboard-activity__score">{activity.score}</td>
                  <td><span className={`dashboard-status dashboard-status--${activity.status.toLowerCase().replace(' ', '-')}`}>{activity.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentActivity;
