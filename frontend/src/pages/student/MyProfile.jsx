import { BriefcaseBusiness, GraduationCap, MapPin, UserRound } from 'lucide-react';

function MyProfile() {
  return (
    <section className="dashboard-panel dashboard-profile-page">
      <div className="dashboard-panel__heading">
        <div><h2>My profile</h2><p>Example profile details for the dashboard preview.</p></div>
        <span className="dashboard-demo-chip">Sample profile</span>
      </div>
      <div className="dashboard-profile-card">
        <span className="dashboard-profile-card__avatar">AM</span>
        <div><h3>Alex Morgan</h3><p>Student profile preview</p></div>
      </div>
      <div className="dashboard-profile-details">
        <div><GraduationCap size={18} /><span><small>Education</small><strong>Computer Science</strong></span></div>
        <div><BriefcaseBusiness size={18} /><span><small>Target role</small><strong>Frontend Developer</strong></span></div>
        <div><MapPin size={18} /><span><small>Experience level</small><strong>Entry level</strong></span></div>
        <div><UserRound size={18} /><span><small>Account</small><strong>Not connected</strong></span></div>
      </div>
      <p className="dashboard-data-disclaimer">Profile editing will be available after authentication and profile storage are integrated.</p>
    </section>
  );
}

export default MyProfile;
