import { useState } from 'react';
import { SectionHeader } from './Skills';

const projects = [
  {
    id: 'churn',
    num: '01',
    title: 'Customer Segmentation & Churn Prediction',
    subtitle: 'Revenue Intelligence at Scale',
    color: 'var(--cyan)',
    tags: ['Scikit-learn', 'XGBoost', 'SHAP', 'SMOTE', 'Streamlit', 'SQL'],
    metrics: [
      { val: '2.5M+', label: 'Transactions' },
      { val: '0.8793', label: 'ROC-AUC' },
      { val: '$233,917', label: 'Revenue-at-Risk' },
      { val: '40%', label: 'Pipeline Speedup' },
    ],
    bullets: [
      'Engineered 22 RFM & behavioural features from 2.5M+ raw transactions using a modular SQL-to-Pandas ETL pipeline, reducing feature computation time by 40%.',
      'Applied KMeans (k=4) clustering to surface 4 actionable customer segments including a 15.7% churn-rate cohort. Trained Random Forest (ROC-AUC 0.8793) with SMOTE cross-validation.',
      'Used SHAP TreeExplainer to confirm recency as the #1 churn driver — translating probability scores into $233,917 revenue-at-risk across 392 high-risk households via interactive Streamlit dashboard.',
    ],
  },
  {
    id: 'cinemaiq',
    num: '02',
    title: 'CinemaIQ — Box Office Intelligence Platform',
    subtitle: 'AI-Powered Revenue Forecasting',
    color: 'var(--amber)',
    tags: ['XGBoost', 'Scikit-learn', 'Streamlit', 'Plotly', 'Groq API', 'LLaMA 3.3'],
    metrics: [
      { val: '5', label: 'Models Benchmarked' },
      { val: '30+', label: 'Domain Features' },
      { val: '3-Tab', label: 'Streamlit App' },
      { val: 'LLaMA 3.3', label: 'AI Commentary' },
    ],
    bullets: [
      'Designed novel actor, director, and composer power-indices from historical data using weighted aggregation and multi-hot genre encoding — creating 30+ domain-specific features for South Asian film revenue prediction.',
      'Benchmarked 5 regression models (Linear, Ridge, Random Forest, Gradient Boosting, XGBoost) with consistent train/val/test splits and log1p target transformation. Selected XGBoost on lowest RMSE.',
      'Deployed a 3-tab Streamlit dashboard with Pessimistic/Base/Optimistic scenario forecasting, ROI gauges, and LLaMA 3.3-powered AI commentary via Groq API for non-technical stakeholders.',
    ],
  },
  {
    id: 'vtis',
    num: '03',
    title: 'Video Target Identification System',
    subtitle: 'Forensic Biometric Analytics',
    color: '#a855f7',
    tags: ['InsightFace', 'MediaPipe', 'OpenCV', 'Streamlit', 'ArcFace 512-d'],
    metrics: [
      { val: '512-d', label: 'ArcFace Embeddings' },
      { val: '12-d', label: 'Pose Descriptors' },
      { val: '0.7/0.3', label: 'Face/Pose Weights' },
      { val: 'Multi-CCTV', label: 'Batch Scanning' },
    ],
    bullets: [
      'Built a biometric analytics pipeline fusing InsightFace 512-d face embeddings and MediaPipe 12-d pose/gait descriptors via weighted cosine similarity (face 0.7, pose 0.3) for person re-identification across CCTV feeds.',
      'Engineered consecutive-frame validation logic and configurable confidence thresholds to suppress false positives, improving identification precision in low-quality footage scenarios.',
      'Deployed a Streamlit forensic dashboard supporting multi-video batch scanning, structured evidence export (PDF report, CSV log, ZIP of face crops), and visual similarity score analytics.',
    ],
  },
  {
    id: 'footfall',
    num: '04',
    title: 'Event Footfall Prediction & Sponsorship Engine',
    subtitle: 'Research Project · LLM-Integrated ML Pipeline',
    color: '#22c55e',
    tags: ['XGBoost', 'FastAPI', 'LLaMA-3.3-70B', 'Groq API', 'Pydantic V2'],
    metrics: [
      { val: 'R²=0.96', label: 'Model Accuracy' },
      { val: '50+', label: 'Features Analyzed' },
      { val: '0', label: 'Invalid Predictions' },
      { val: '30%', label: 'Noise Reduction' },
    ],
    bullets: [
      'Conducted end-to-end EDA on event marketing datasets (50+ features), identifying key footfall drivers via correlation analysis and domain-informed feature selection — reducing model noise by 30%.',
      'Built a two-stage XGBoost pipeline (R² = 0.96) with a Dynamic Physical Clamping algorithm enforcing venue-capacity constraints at inference, achieving zero physically invalid predictions.',
      'Integrated LLaMA-3.3-70B via Groq API for semantic brand-event synergy scoring, generating structured JSON negotiation reports deployed as a stateless FastAPI microservice.',
    ],
  },
];

function ProjectCard({ project, isExpanded, onToggle }) {
  const c = project.color;
  return (
    <div style={{
      border: `1px solid ${isExpanded ? c + '30' : 'var(--border2)'}`,
      borderRadius: '12px',
      background: 'var(--surface)',
      overflow: 'hidden',
      transition: 'border-color 0.3s',
    }}>
      {/* Card header */}
      <button onClick={onToggle} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: '2rem 2.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        gap: '1rem', textAlign: 'left',
        borderBottom: isExpanded ? `1px solid ${c}18` : 'none',
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = `${c}04`}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: c, opacity: 0.6 }}>{project.num}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.subtitle}</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700,
            color: 'var(--text)', lineHeight: 1.2,
          }}>{project.title}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                color: c, background: `${c}10`,
                border: `1px solid ${c}25`, padding: '0.2rem 0.55rem', borderRadius: '3px',
              }}>{t}</span>
            ))}
          </div>
        </div>
        <span style={{
          color: c, fontSize: '1.2rem', lineHeight: 1,
          transform: isExpanded ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s',
          flexShrink: 0, marginTop: '0.2rem',
        }}>+</span>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{ padding: '2rem 2.5rem' }}>
          {/* Metrics */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem', marginBottom: '2rem',
          }}>
            {project.metrics.map(m => (
              <div key={m.label} style={{
                background: 'var(--surface2)', borderRadius: '8px',
                padding: '1rem', textAlign: 'center',
                border: `1px solid ${c}15`,
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: c }}>{m.val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Bullets */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: c, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.2rem', flexShrink: 0 }}>▸</span>
                <span style={{ color: 'var(--text2)', fontSize: '0.93rem', lineHeight: 1.7 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState('churn');

  return (
    <section id="projects" style={{ padding: '8rem 0' }}>
      <div className="container">
        <SectionHeader tag="04" title="Projects" subtitle="Work" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              isExpanded={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
