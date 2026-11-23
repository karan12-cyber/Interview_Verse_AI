import { UserCheck, BrainCircuit, TrendingUp } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import './HowItWorks.css';

const STEPS = [
  {
    number: '01',
    icon: UserCheck,
    title: 'Choose Your Role',
    description:
      'Select your desired job role, experience level and preferred difficulty to get a customized practice experience.',
  },
  {
    number: '02',
    icon: BrainCircuit,
    title: 'Practice with AI',
    description:
      'Answer realistic interview questions and solve coding challenges powered by AI — at your own pace.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Improve Your Performance',
    description:
      'Review detailed feedback, identify areas to improve and track your progress across multiple sessions.',
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <SectionHeading
          label="How It Works"
          title="Start Preparing in Three Simple Steps"
          subtitle="InterviewVerse AI makes interview preparation structured, personalized and easy to follow."
        />

        <div className="how-it-works__steps">
          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={step.number} className="step">
                {/* Connector line (between steps) */}
                {index < STEPS.length - 1 && (
                  <div className="step__connector" aria-hidden="true" />
                )}

                <div className="step__number">{step.number}</div>
                <div className="step__icon">
                  <StepIcon size={28} />
                </div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__description">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
