import { Code2, MessageSquareText } from 'lucide-react';
import { SAMPLE_ACTIVITIES } from '../../components/dashboard/dashboardData';

function InterviewHistory() {
  return (
    <section className="dashboard-panel dashboard-history">
      <div className="dashboard-panel__heading">
        <div><h2>Interview history</h2><p>Review a sample of recent practice activity.</p></div>
        <span className="dashboard-demo-chip">Sample data</span>
      </div>
      <div className="dashboard-activity__table-wrap">
        <table className="dashboard-activity__table dashboard-history__table">
          <thead><tr><th scope="col">Activity</th><th scope="col">Date</th><th scope="col">Score</th><th scope="col">Status</th></tr></thead>
          <tbody>
            {SAMPLE_ACTIVITIES.map((activity) => {
              const Icon = activity.kind === 'coding' ? Code2 : MessageSquareText;
              return (
                <tr key={activity.title}>
                  <td><span className="dashboard-activity__title"><span className="dashboard-activity__icon"><Icon size={16} /></span>{activity.title}</span></td>
                  <td>{activity.date}</td><td className="dashboard-activity__score">{activity.score}</td>
                  <td><span className={`dashboard-status dashboard-status--${activity.status.toLowerCase().replace(' ', '-')}`}>{activity.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="dashboard-data-disclaimer">Sample activity only. Session records will appear when the interview and coding modules are connected.</p>
    </section>
  );
}

export default InterviewHistory;
