import {
  Layers,
  UserCog,
  BarChart2,
  LineChart,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import './WhyChooseUs.css';

const REASONS = [
  {
    icon: Layers,
    title: 'Structured Preparation',
    description:
      'Follow a clear, step-by-step approach to interview readiness instead of scattered, unorganized practice.',
  },
  {
    icon: UserCog,
    title: 'Personalized Practice',
    description:
      'Get interview questions and feedback tailored to your target role, experience and skill level.',
  },
  {
    icon: BarChart2,
    title: 'Measurable Improvement',
    description:
      'Track your scores, accuracy and growth over time with detailed analytics on each practice session.',
  },
  {
    icon: LineChart,
    title: 'Performance Tracking',
    description:
      'Monitor your progress across different topics and identify weak areas that need more attention.',
  },
  {
    icon: Wrench,
    title: 'All-in-One Platform',
    description:
      'Mock interviews, resume analysis, coding practice and feedback — everything you need in a single place.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for Students',
    description:
      'Designed specifically for students and fresh graduates preparing for their first technical interviews.',
  },
];

function WhyChooseUs() {
  return (
    <section className="why-choose section" id="about">
      <div className="container">
        <SectionHeading
          label="Why InterviewVerse AI"
          title="Built to Help You Succeed"
          subtitle="InterviewVerse AI brings together the tools and insights you need for focused, effective interview preparation."
        />

        <div className="why-choose__grid">
          {REASONS.map((reason) => {
            const ReasonIcon = reason.icon;
            return (
              <div key={reason.title} className="reason-card">
                <div className="reason-card__icon">
                  <ReasonIcon size={22} />
                </div>
                <h3 className="reason-card__title">{reason.title}</h3>
                <p className="reason-card__desc">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
