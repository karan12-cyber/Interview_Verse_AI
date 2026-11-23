import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Code,
  Target,
  TrendingUp,
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import './ProductPreview.css';

/* Sample demonstration data */
const SKILLS = [
  { name: 'JavaScript', progress: 82 },
  { name: 'React', progress: 74 },
  { name: 'Data Structures', progress: 68 },
  { name: 'System Design', progress: 55 },
];

const RECENT_INTERVIEWS = [
  { role: 'Frontend Developer', score: 82, date: 'Nov 20', icon: Code },
  { role: 'DSA Problem Solving', score: 91, date: 'Nov 18', icon: Target },
  { role: 'Behavioral — STAR', score: 76, date: 'Nov 15', icon: BookOpen },
];

function ProductPreview() {
  return (
    <section className="product-preview section" id="product-preview">
      <div className="container">
        <SectionHeading
          label="Student Dashboard"
          title="Track Your Interview Preparation Progress"
          subtitle="A comprehensive dashboard to monitor your performance, track skill growth and review past interview sessions."
        />

        <div className="product-preview__wrapper">
          <div className="product-preview__card">
            {/* Header */}
            <div className="pp-header">
              <div className="pp-header__left">
                <div className="pp-header__dots">
                  <span /><span /><span />
                </div>
                <span className="pp-header__title">Student Dashboard</span>
              </div>
              <span className="pp-header__badge">Demo Preview</span>
            </div>

            {/* Stats Row */}
            <div className="pp-stats">
              <div className="pp-stat pp-stat--accent">
                <div className="pp-stat__icon-wrap pp-stat__icon-wrap--blue">
                  <TrendingUp size={18} />
                </div>
                <div className="pp-stat__info">
                  <span className="pp-stat__value">78/100</span>
                  <span className="pp-stat__label">Overall Score</span>
                </div>
              </div>
              <div className="pp-stat">
                <div className="pp-stat__icon-wrap pp-stat__icon-wrap--green">
                  <CheckCircle size={18} />
                </div>
                <div className="pp-stat__info">
                  <span className="pp-stat__value">12</span>
                  <span className="pp-stat__label">Completed</span>
                </div>
              </div>
              <div className="pp-stat">
                <div className="pp-stat__icon-wrap pp-stat__icon-wrap--amber">
                  <Clock size={18} />
                </div>
                <div className="pp-stat__info">
                  <span className="pp-stat__value">4.2h</span>
                  <span className="pp-stat__label">Practice Time</span>
                </div>
              </div>
              <div className="pp-stat">
                <div className="pp-stat__icon-wrap pp-stat__icon-wrap--purple">
                  <BarChart3 size={18} />
                </div>
                <div className="pp-stat__info">
                  <span className="pp-stat__value">+15%</span>
                  <span className="pp-stat__label">Improvement</span>
                </div>
              </div>
            </div>

            {/* Body: Skills + Activity */}
            <div className="pp-body">
              {/* Skill Progress */}
              <div className="pp-skills">
                <h4 className="pp-section-title">Skill Progress</h4>
                <div className="pp-skills__list">
                  {SKILLS.map((skill) => (
                    <div key={skill.name} className="pp-skill">
                      <div className="pp-skill__header">
                        <span className="pp-skill__name">{skill.name}</span>
                        <span className="pp-skill__pct">{skill.progress}%</span>
                      </div>
                      <div className="pp-skill__bar">
                        <div
                          className="pp-skill__fill"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="pp-activity">
                <h4 className="pp-section-title">Recent Interviews</h4>
                <div className="pp-activity__list">
                  {RECENT_INTERVIEWS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.role} className="pp-activity__item">
                        <div className="pp-activity__icon">
                          <Icon size={16} />
                        </div>
                        <div className="pp-activity__detail">
                          <span className="pp-activity__role">{item.role}</span>
                          <span className="pp-activity__date">{item.date}</span>
                        </div>
                        <span className="pp-activity__score">{item.score}/100</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Performance Chart (CSS-only bar chart) */}
            <div className="pp-chart">
              <h4 className="pp-section-title">Weekly Performance</h4>
              <div className="pp-chart__bars">
                {[65, 72, 68, 78, 82, 75, 88].map((val, i) => (
                  <div key={i} className="pp-chart__col">
                    <div className="pp-chart__bar-track">
                      <div
                        className="pp-chart__bar-fill"
                        style={{ height: `${val}%` }}
                      />
                    </div>
                    <span className="pp-chart__label">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPreview;
