import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';
import Button from '../common/Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        {/* Text Content */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            AI-Powered Interview Preparation
          </div>

          <h1 className="hero__title">
            Prepare Smarter.{' '}
            <span className="hero__title-accent">Interview Better.</span>{' '}
            Get Hired.
          </h1>

          <p className="hero__description">
            Practice real-world interviews, improve your technical skills and
            receive personalized AI-powered feedback — all in one platform.
          </p>

          <div className="hero__actions">
            <Button variant="primary" size="lg" to="/register">
              Start Practicing
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg" href="#features">
              Explore Features
            </Button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <Users size={16} className="hero__stat-icon" />
              <span>Built for Students &amp; Graduates</span>
            </div>
            <div className="hero__stat">
              <CheckCircle size={16} className="hero__stat-icon" />
              <span>AI-Evaluated Answers</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="hero__visual">
          <div className="hero__preview">
            {/* Top bar */}
            <div className="preview__header">
              <div className="preview__dots">
                <span /><span /><span />
              </div>
              <span className="preview__title">Dashboard Overview</span>
            </div>

            {/* Score row */}
            <div className="preview__scores">
              <div className="preview__score-card preview__score-card--primary">
                <div className="preview__score-value">78</div>
                <div className="preview__score-label">Overall Score</div>
                <div className="preview__score-bar">
                  <div className="preview__score-fill" style={{ width: '78%' }} />
                </div>
              </div>
              <div className="preview__score-card">
                <div className="preview__score-value">12</div>
                <div className="preview__score-label">Interviews</div>
                <TrendingUp size={14} className="preview__trend" />
              </div>
              <div className="preview__score-card">
                <div className="preview__score-value">85%</div>
                <div className="preview__score-label">Accuracy</div>
                <BarChart3 size={14} className="preview__trend" />
              </div>
            </div>

            {/* Activity list */}
            <div className="preview__activity">
              <div className="preview__activity-title">Recent Activity</div>
              <div className="preview__activity-item">
                <Clock size={14} />
                <span>Frontend Developer Interview</span>
                <span className="preview__activity-score">82/100</span>
              </div>
              <div className="preview__activity-item">
                <Clock size={14} />
                <span>Data Structures &amp; Algorithms</span>
                <span className="preview__activity-score">91/100</span>
              </div>
              <div className="preview__activity-item">
                <Clock size={14} />
                <span>Behavioral Round — STAR Method</span>
                <span className="preview__activity-score">76/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
