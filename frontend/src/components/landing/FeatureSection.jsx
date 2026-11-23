import {
  Bot,
  FileSearch,
  Code2,
  MessageSquare,
  Upload,
  Search,
  Terminal,
  Puzzle,
  Star,
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import './FeatureSection.css';

const FEATURES = [
  {
    id: 'mock-interview',
    icon: Bot,
    title: 'AI Mock Interview',
    description:
      'Practice with AI-generated interview questions tailored to your desired role, experience level and domain.',
    highlights: [
      { icon: MessageSquare, text: 'Role-based technical & HR questions' },
      { icon: Star, text: 'Personalized answer feedback' },
      { icon: Bot, text: 'AI-evaluated performance scoring' },
    ],
    accent: 'blue',
  },
  {
    id: 'resume-analyzer',
    icon: FileSearch,
    title: 'Smart Resume Analyzer',
    description:
      'Upload your resume and get instant AI analysis with actionable suggestions to improve your chances.',
    highlights: [
      { icon: Upload, text: 'PDF & DOCX upload support' },
      { icon: Search, text: 'Role-based skill matching' },
      { icon: Star, text: 'Missing keyword suggestions' },
    ],
    accent: 'green',
  },
  {
    id: 'coding-practice',
    icon: Code2,
    title: 'Coding Practice',
    description:
      'Solve programming challenges in a built-in code editor with AI-assisted code review and feedback.',
    highlights: [
      { icon: Terminal, text: 'In-browser coding editor' },
      { icon: Puzzle, text: 'Programming challenges by difficulty' },
      { icon: Star, text: 'AI-assisted code review' },
    ],
    accent: 'purple',
  },
];

function FeatureSection() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <SectionHeading
          label="Core Features"
          title="Everything You Need to Prepare"
          subtitle="A complete set of AI-powered tools designed to help you practice, improve and track your interview preparation."
        />

        <div className="features__grid">
          {FEATURES.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`feature-card feature-card--${feature.accent}`}
              >
                <div className={`feature-card__icon feature-card__icon--${feature.accent}`}>
                  <FeatureIcon size={24} />
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
                <div className="feature-card__highlights">
                  {feature.highlights.map((h) => {
                    const HIcon = h.icon;
                    return (
                      <div key={h.text} className="feature-card__highlight">
                        <HIcon size={15} className="feature-card__highlight-icon" />
                        <span>{h.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
