function StatCard({ label, value, detail, icon: Icon, tone = 'blue' }) {
  return (
    <article className="dashboard-stat-card">
      <div className={`dashboard-stat-card__icon dashboard-stat-card__icon--${tone}`}>
        <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <p className="dashboard-stat-card__label">{label}</p>
      <div className="dashboard-stat-card__value-row">
        <strong>{value}</strong>
        <span className="dashboard-stat-card__detail">{detail}</span>
      </div>
    </article>
  );
}

export default StatCard;
