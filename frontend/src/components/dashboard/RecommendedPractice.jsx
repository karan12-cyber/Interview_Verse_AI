import { ArrowRight, BookOpenCheck, Code2, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

function RecommendedPractice() {
  return (
    <section className="dashboard-panel dashboard-recommendations" aria-labelledby="recommendations-title">
      <div className="dashboard-panel__heading">
        <div>
          <h2 id="recommendations-title">Recommended practice</h2>
          <p>Ideas for your next study session</p>
        </div>
        <span className="dashboard-recommendations__spark"><Target size={17} /></span>
      </div>

      <div className="dashboard-recommendations__group">
        <p className="dashboard-recommendations__label">Focus area <span>Sample</span></p>
        <div className="dashboard-recommendation-item">
          <span className="dashboard-recommendation-item__icon dashboard-recommendation-item__icon--blue"><BookOpenCheck size={17} /></span>
          <div><strong>Data structures</strong><p>Revisit tree traversal and hash maps.</p></div>
        </div>
      </div>

      <div className="dashboard-recommendations__group">
        <p className="dashboard-recommendations__label">Try a topic <span>Sample</span></p>
        <div className="dashboard-topic-tags"><span>Behavioral stories</span><span>Time complexity</span></div>
      </div>

      <div className="dashboard-recommendations__exercise">
        <span className="dashboard-recommendation-item__icon dashboard-recommendation-item__icon--navy"><Code2 size={17} /></span>
        <div><small>Suggested challenge</small><strong>Two Sum</strong><span>Arrays · Easy</span></div>
        <Link to="/dashboard/coding" aria-label="Open coding practice"><ArrowRight size={17} /></Link>
      </div>
      <p className="dashboard-recommendations__note">Example suggestions only. Personalized recommendations will be available after the practice service is connected.</p>
    </section>
  );
}

export default RecommendedPractice;
