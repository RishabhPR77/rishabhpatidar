const skillGroups = [
  {
    label: 'Languages',
    color: 'var(--cyan)',
    icon: '{ }',
    skills: ['Python', 'SQL', 'Java', 'C/C++'],
  },
  {
    label: 'AI / LLM',
    color: '#f43f5e',
    icon: '◈',
    skills: ['RAG', 'LLaMA-3.3-70B', 'Groq API', 'Prompt Engineering', 'Vector Embeddings', 'Hybrid Search', 'Knowledge Graphs', 'Pinecone', 'ChromaDB', 'BGE Embeddings', 'BM25'],
  },
  {
    label: 'ML / Modelling',
    color: '#a855f7',
    icon: '⌬',
    skills: ['Scikit-learn', 'XGBoost', 'Random Forest', 'Gradient Boosting', 'KMeans', 'PCA', 'SHAP', 'SMOTE', 'RFM Analysis', 'Feature Engineering', 'Hyperparameter Tuning', 'A/B Testing', 'Hypothesis Testing'],
  },
  {
    label: 'Data & Analytics',
    color: 'var(--amber)',
    icon: '∑',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'SciPy', 'Statsmodels', 'Excel'],
  },
  {
    label: 'Deployment & Tools',
    color: '#22c55e',
    icon: '⚙',
    skills: ['Streamlit', 'FastAPI', 'Pydantic V2', 'Git', 'GitPython', 'Docker', 'Jupyter', 'Google Colab'],
  },
  {
    label: 'Computer Vision',
    color: 'var(--cyan)',
    icon: '◉',
    skills: ['InsightFace', 'MediaPipe', 'OpenCV', 'ArcFace Embeddings', 'Person Re-ID'],
  },
];

function SkillPill({ label, color }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        border: `1px solid ${color}28`,
        borderRadius: '3px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: color,
        background: `${color}08`,
        whiteSpace: 'nowrap',
        transition: 'all 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${color}18`;
        e.currentTarget.style.boxShadow = `0 0 10px ${color}28`;
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
    <section id="skills" style={{
      minHeight: '100vh',
      padding: '80px 0 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div className="container">
        <SectionHeader tag="02" title="Technical Skills" subtitle="Toolbox" compact />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.6rem',
          marginTop: '1.25rem',
        }}>
          {skillGroups.map(group => (
            <div
              key={group.label}
              style={{
                padding: '0.9rem 1.2rem',
                background: 'var(--surface)',
                border: '1px solid var(--border2)',
                borderRadius: '8px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${group.color}30`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
            >
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.65rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                  color: group.color, opacity: 0.85, lineHeight: 1,
                }}>{group.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: 'var(--text3)',
                }}>{group.label}</span>
              </div>

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {group.skills.map(s => <SkillPill key={s} label={s} color={group.color} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #skills .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export function SectionHeader({ tag, title, subtitle, compact }) {
  return (
    <div style={{ marginBottom: compact ? '0.25rem' : '1rem' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase',
        marginBottom: '0.4rem', opacity: 0.7,
      }}>{tag} // {subtitle}</div>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: compact ? 'clamp(1.6rem, 3vw, 2.2rem)' : 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700, lineHeight: 1.1,
        letterSpacing: '-0.01em',
      }}>{title}</h2>
      <div style={{ width: '36px', height: '2px', background: 'var(--cyan)', marginTop: '0.65rem' }} />
    </div>
  );
}