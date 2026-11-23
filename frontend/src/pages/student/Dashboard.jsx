import { lazy, Suspense } from 'react';
import { Activity, BarChart3, Code2, MessageSquareText } from 'lucide-react';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity';
import RecommendedPractice from '../../components/dashboard/RecommendedPractice';
import StatCard from '../../components/dashboard/StatCard';
import { SAMPLE_STATS } from '../../components/dashboard/dashboardData';

const PerformanceChart = lazy(() => import('../../components/dashboard/PerformanceChart'));

const STAT_ICONS = [MessageSquareText, BarChart3, Code2, Activity];
const STAT_TONES = ['blue', 'green', 'violet', 'amber'];

function Dashboard() {
  return (
    <div className="dashboard-overview">
      <section className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">Your learning snapshot</p>
          <h2>Welcome back, Alex!</h2>
          <p>Continue your interview preparation and track your progress.</p>
        </div>
        <span className="dashboard-demo-chip"><span aria-hidden="true" /> Demonstration data</span>
      </section>

      <section className="dashboard-stat-grid" aria-label="Sample progress statistics">
        {SAMPLE_STATS.map((stat, index) => (
          <StatCard key={stat.label} {...stat} icon={STAT_ICONS[index]} tone={STAT_TONES[index]} />
        ))}
      </section>

      <QuickActions />

      <div className="dashboard-overview__analytics-grid">
        <Suspense fallback={<div className="dashboard-chart dashboard-chart--loading" role="status">Loading performance chart…</div>}>
          <PerformanceChart />
        </Suspense>
        <RecommendedPractice />
      </div>

      <RecentActivity />
      <p className="dashboard-data-disclaimer">All names, scores, activity, and progress shown here are sample content for the interface preview. They are not connected to a student account or backend.</p>
    </div>
  );
}

export default Dashboard;
