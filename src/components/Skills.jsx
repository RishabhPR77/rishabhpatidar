const skillGroups = [
  {
    label: 'Languages',
    color: 'var(--cyan)',
    icon: '{ }',
    skills: ['Python', 'SQL', 'Java', 'C/C++'],
  },
  {
    label: 'Data & Analytics',
    color: 'var(--amber)',
    icon: '∑',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'SciPy', 'Statsmodels', 'Excel'],
  },
  {
    label: 'ML / Modelling',
    color: '#a855f7',
    icon: '⌬',
    skills: ['Scikit-learn', 'XGBoost', 'Random Forest', 'Gradient Boosting', 'KMeans', 'PCA', 'SHAP', 'SMOTE', 'RFM Analysis', 'A/B Testing', 'Hypothesis Testing', 'Feature Engineering', 'Prompt Engineering', 'LLaMA-3.3-70B'],
  },
  {
    label: 'Deployment & Tools',
    color: '#22c55e',
    icon: '⚙',
    skills: ['Streamlit', 'FastAPI', 'Groq API', 'Pydantic V2', 'Git', 'Jupyter', 'Docker', 'Google Colab'],
  },
  {
    label: 'Computer Vision',
    color: '#f43f5e',
    icon: '◉',
    skills: ['InsightFace', 'MediaPipe', 'OpenCV', 'ArcFace Embeddings', 'Person Re-ID'],
  },
];

function SkillPill({ label, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.3rem 0.75rem',
      border: `1px solid ${color}28`,
      borderRadius: '3px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.73rem',
      color: color,
      background: `${color}08`,
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${color}18`;
        e.currentTarget.style.boxShadow = `0 0 12px ${color}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${color}08`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >{label}</span>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '8rem 0', position: 'relative' }}>
      <div className="container">
        <SectionHeader tag="02" title="Technical Skills" subtitle="Toolbox" />

        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '3rem' }}>
          {skillGroups.map(group => (
            <div key={group.label} style={{
              padding: '1.5rem 2rem',
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              borderRadius: '8px',
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${group.color}30`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '1rem',
                  color: group.color, opacity: 0.8,
                }}>{group.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: 'var(--text3)',
                }}>{group.label}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.skills.map(s => <SkillPill key={s} label={s} color={group.color} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ tag, title, subtitle }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase',
        marginBottom: '0.5rem', opacity: 0.7,
      }}>{tag} // {subtitle}</div>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700, lineHeight: 1.1,
        letterSpacing: '-0.01em',
      }}>{title}</h2>
      <div style={{ width: '40px', height: '2px', background: 'var(--cyan)', marginTop: '1rem' }} />
    </div>
  );
}
