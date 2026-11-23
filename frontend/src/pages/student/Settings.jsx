import { Bell, LockKeyhole, SlidersHorizontal } from 'lucide-react';

const SETTING_ITEMS = [
  { title: 'Practice reminders', description: 'Reminder preferences will be available after account integration.', icon: Bell },
  { title: 'Privacy and data', description: 'Account data controls are not connected in this preview.', icon: LockKeyhole },
  { title: 'Workspace preferences', description: 'Personal dashboard preferences will be stored with your profile.', icon: SlidersHorizontal },
];

function Settings() {
  return (
    <section className="dashboard-panel dashboard-settings">
      <div className="dashboard-panel__heading">
        <div><h2>Settings</h2><p>Manage your student workspace preferences.</p></div>
        <span className="dashboard-demo-chip">Preview</span>
      </div>
      <div className="dashboard-settings__list">
        {SETTING_ITEMS.map(({ title, description, icon: Icon }) => (
          <article className="dashboard-settings__item" key={title}>
            <span className="dashboard-settings__icon"><Icon size={18} /></span>
            <div><h3>{title}</h3><p>{description}</p></div>
            <span className="dashboard-settings__pending">Not connected</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Settings;
