import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SAMPLE_PERFORMANCE, SAMPLE_SKILLS } from './dashboardData';

function PerformanceChart() {
  return (
    <section className="dashboard-panel dashboard-performance" aria-labelledby="performance-title">
      <div className="dashboard-panel__heading">
        <div>
          <h2 id="performance-title">Performance</h2>
          <p>Interview scores and practice time this week</p>
        </div>
        <span className="dashboard-demo-chip">Sample data</span>
      </div>

      <div className="dashboard-chart" role="img" aria-label="Sample weekly interview scores and practice time chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={SAMPLE_PERFORMANCE} margin={{ top: 10, right: 2, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="#edf1f6" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8793a5', fontSize: 12 }} dy={9} />
            <YAxis yAxisId="score" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8793a5', fontSize: 11 }} />
            <YAxis yAxisId="minutes" orientation="right" domain={[0, 60]} hide />
            <Tooltip
              cursor={{ fill: '#f5f8fc' }}
              contentStyle={{ border: '1px solid #e5ebf3', borderRadius: 10, boxShadow: '0 8px 24px rgba(15, 23, 42, .08)' }}
              formatter={(value, key) => [key === 'score' ? `${value}%` : `${value} min`, key === 'score' ? 'Interview score' : 'Practice time']}
            />
            <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontSize: 11, color: '#64748b' }} />
            <Bar yAxisId="minutes" dataKey="minutes" name="Practice time" fill="#dceaff" radius={[4, 4, 0, 0]} barSize={17} />
            <Line yAxisId="score" dataKey="score" name="Interview score" type="monotone" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-skill-progress">
        <div className="dashboard-skill-progress__heading">
          <h3>Skill progress</h3>
          <span>Demo indicators</span>
        </div>
        {SAMPLE_SKILLS.map((skill) => (
          <div className="dashboard-skill-row" key={skill.name}>
            <div className="dashboard-skill-row__meta"><span>{skill.name}</span><strong>{skill.progress}%</strong></div>
            <div className="dashboard-progress-track" role="progressbar" aria-label={`${skill.name} progress`} aria-valuenow={skill.progress} aria-valuemin="0" aria-valuemax="100">
              <span style={{ width: `${skill.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PerformanceChart;
