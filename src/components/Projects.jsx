import { useState, useEffect } from 'react';
import { SectionHeader } from './Skills';

const projects = [
  {
    id: 'churn',
    num: '01',
    title: 'Customer Segmentation & Churn Prediction',
    subtitle: 'Revenue Intelligence at Scale',
    color: 'var(--cyan)',
    colorHex: '#06b6d4',
    github: 'https://github.com/RishabhPR77/customer-churn',
    live: 'https://customer-churn-dunhumby.streamlit.app/',
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
    colorHex: '#f59e0b',
    github: 'https://github.com/RishabhPR77/movie-success-predictor',
    live: 'https://movie-success-predictor-xu2vnp53g3jg8a3pmrr3k3.streamlit.app/',
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
    colorHex: '#a855f7',
    github: 'https://github.com/RishabhPR77/video-target-id',
    live: 'https://video-target-id-lnjmjrh3ap8jafch7wrbme.streamlit.app/',
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
    colorHex: '#22c55e',
    github: 'https://github.com/RishabhPR77/eventsight',
    live: '',
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
  {
    id: 'code-archaeologist',
    num: '05',
    title: 'Code Archaeologist',
    subtitle: 'RAG System for Git History Analysis',
    color: '#f43f5e',
    colorHex: '#f43f5e',
    github: 'https://github.com/RishabhPR77/code-archaeology-rag',
    live: 'https://code-archaeology-rag.streamlit.app',
    tags: ['RAG', 'LLaMA-3.3-70B', 'Pinecone', 'NetworkX', 'Groq API', 'Streamlit', 'BGE Embeddings', 'BM25'],
    metrics: [
      { val: '60/40', label: 'Dense/BM25 Hybrid' },
      { val: '6', label: 'Analysis Modes' },
      { val: 'LLaMA 3.3', label: 'LLM Backend' },
      { val: 'Multi-repo', label: 'Support' },
    ],
    bullets: [
      'Built a full RAG pipeline that ingests Git commit history via GitPython + GitHub API, embeds chunks with BAAI/bge-small-en-v1.5 into Pinecone per-repo namespaces — answering "why" questions over any public codebase in plain English.',
      'Implemented hybrid search combining 60% dense vector retrieval and 40% BM25 keyword matching so exact function names and file paths are found alongside conceptual queries, with LLaMA-3.3-70B generating commit-cited grounded answers.',
      'Deployed a 6-page Streamlit app (Ask, File Timeline, Hot Files, Co-Change Analysis, Author Breakdown, Multi-repo Ingest) powered by a NetworkX knowledge graph linking commits temporally across files.',
    ],
  },
];

/* ── Modal ── */
function ProjectModal({ project, onClose }) {
  const c = project.color;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${project.colorHex}30`,
          borderRadius: '16px',
          width: '100%', maxWidth: '720px',
          maxHeight: '85vh',
          overflowY: 'auto',
          animation: 'slideUp 0.25s ease',
          scrollbarWidth: 'thin',
        }}
      >
        {/* Modal header */}
        <div style={{
          padding: '2rem 2.5rem 1.5rem',
          borderBottom: `1px solid ${project.colorHex}18`,
          position: 'sticky', top: 0,
          background: 'var(--surface)',
          zIndex: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: c, opacity: 0.7,
              }}>{project.num}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>{project.subtitle}</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700,
              color: 'var(--text)', lineHeight: 1.25, margin: '0 0 1rem 0',
            }}>{project.title}</h3>

            {/* Links — shown in header */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.github && (
                <a
                  href={project.github} target="_blank" rel="noopener"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.05em',
                    padding: '0.4rem 0.9rem', borderRadius: '5px',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    border: `1px solid ${project.colorHex}35`,
                    color: c, background: `${project.colorHex}10`,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${project.colorHex}20`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${project.colorHex}10`; e.currentTarget.style.transform = 'none'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.382 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live} target="_blank" rel="noopener"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.05em',
                    padding: '0.4rem 0.9rem', borderRadius: '5px',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'var(--text2)', background: 'rgba(255,255,255,0.04)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text2)', borderRadius: '8px',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              fontSize: '1.1rem', lineHeight: 1,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text2)'; }}
            aria-label="Close"
          >✕</button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '2rem 2.5rem' }}>
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                color: c, background: `${project.colorHex}12`,
                border: `1px solid ${project.colorHex}28`,
                padding: '0.25rem 0.6rem', borderRadius: '4px',
              }}>{t}</span>
            ))}
          </div>

          {/* Metrics */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.85rem', marginBottom: '2rem',
          }}>
            {project.metrics.map(m => (
              <div key={m.label} style={{
                background: 'var(--surface2)', borderRadius: '8px',
                padding: '1rem', textAlign: 'center',
                border: `1px solid ${project.colorHex}15`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                  fontWeight: 700, color: c,
                }}>{m.val}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.63rem',
                  color: 'var(--text3)', textTransform: 'uppercase',
                  letterSpacing: '0.08em', marginTop: '0.25rem',
                }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Bullets */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  color: c, fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem', marginTop: '0.22rem', flexShrink: 0,
                }}>▸</span>
                <span style={{ color: 'var(--text2)', fontSize: '0.93rem', lineHeight: 1.7 }}>{b}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}

/* ── Compact Card ── */
function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const c = project.colorHex;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${c}08` : 'var(--surface)',
        border: `1px solid ${hovered ? c + '40' : 'var(--border2)'}`,
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'all 0.22s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 8px 24px ${c}18` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent line on left */}
      <div style={{
        position: 'absolute', left: 0, top: '16px', bottom: '16px',
        width: '3px', borderRadius: '0 3px 3px 0',
        background: c,
        opacity: hovered ? 1 : 0.35,
        transition: 'opacity 0.22s ease',
      }} />

      <div style={{ paddingLeft: '0.5rem' }}>
        {/* Number + subtitle row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            color: c, opacity: 0.75,
          }}>{project.num}</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>{project.subtitle}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700,
          color: hovered ? 'var(--text)' : 'var(--text2)',
          lineHeight: 1.3, margin: '0 0 0.65rem 0',
          transition: 'color 0.22s ease',
        }}>{project.title}</h3>

        {/* Tags (first 3 only) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
          {project.tags.slice(0, 3).map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: c, background: `${c}12`,
              border: `1px solid ${c}20`,
              padding: '0.15rem 0.45rem', borderRadius: '3px',
            }}>{t}</span>
          ))}
          {project.tags.length > 3 && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--text3)',
            }}>+{project.tags.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Arrow hint */}
      <div style={{
        position: 'absolute', right: '1.25rem', top: '50%',
        transform: `translateY(-50%) translateX(${hovered ? '0' : '4px'})`,
        color: c, opacity: hovered ? 0.8 : 0,
        transition: 'all 0.22s ease',
        fontSize: '0.9rem',
      }}>→</div>
    </button>
  );
}

/* ── Section ── */
export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" style={{ padding: '8rem 0' }}>
      <div className="container">
        <SectionHeader tag="04" title="Projects" subtitle="Work" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.85rem',
          marginTop: '3rem',
        }}>
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={() => setActiveProject(p)}
            />
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
          color: 'var(--text3)', textAlign: 'center',
          marginTop: '1.5rem', letterSpacing: '0.05em',
        }}>
          Click any card to view full details
        </p>
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}