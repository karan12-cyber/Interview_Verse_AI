import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import './CTASection.css';

function CTASection() {
  return (
    <section className="cta section">
      <div className="container">
        <div className="cta__card">
          <div className="cta__content">
            <h2 className="cta__title">Your Next Interview Starts Here.</h2>
            <p className="cta__description">
              Build confidence, practice consistently and prepare for your next
              opportunity.
            </p>
            <Button variant="primary" size="lg" to="/register">
              Start Your Preparation
              <ArrowRight size={18} />
            </Button>
          </div>

          {/* Background decorative elements */}
          <div className="cta__decor cta__decor--1" aria-hidden="true" />
          <div className="cta__decor cta__decor--2" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default CTASection;
