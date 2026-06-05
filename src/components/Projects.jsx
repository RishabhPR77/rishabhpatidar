import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SectionHeader } from './Skills';

const projects = [
  {
    id: 'ai-interview',
    num: '01',
    title: 'AI Interview Platform',
    subtitle: "SSH '26 National Hackathon · Runner-Up",
    color: '#6366f1',
    colorHex: '#6366f1',
    github: '',
    live: '',
    thumbnail: '/thumbnails/ai-interview.png',
    isPrivate: true,
    tags: ['FastAPI', 'LLaMA-3.3-70B', 'Whisper', 'MediaPipe', 'React', 'TypeScript'],
    metrics: [
      { val: 'Adaptive', label: 'Question Engine' },
      { val: 'Multimodal', label: 'Behaviour Analysis' },
      { val: 'Runner-Up', label: "SSH '26 Hackathon" },
      { val: 'Full-Stack', label: 'React + FastAPI' },
    ],
    bullets: [
      'Built an adaptive AI interview engine powered by LLaMA-3.3-70B via Groq API — generates role and resume-specific question banks, then dynamically selects follow-ups or injects curveballs based on answer quality and topic coverage gaps.',
      'Engineered a real-time multimodal behavioural analysis pipeline fusing Whisper audio signals (WPM, filler words, confidence language score) with MediaPipe video signals (eye contact %, posture score, gaze direction, nervousness indicators including lip compression and brow furrow).',
      'Deployed a full React/TypeScript frontend (Vite) with camera pre-check, live interview flow, session resume on reconnect, performance comparison across attempts, and one-click PDF report export — backed by a modular FastAPI scoring engine with customisable weighted rubrics.',
    ],
  },
  {
    id: 'churn',
    num: '02',
    title: 'Customer Segmentation & Churn Prediction',
    subtitle: 'Revenue Intelligence at Scale',
    color: 'var(--cyan)',
    colorHex: '#06b6d4',
    github: 'https://github.com/RishabhPR77/customer-churn',
    live: 'https://customer-churn-dunhumby.streamlit.app/',
    thumbnail: '/thumbnails/churn.png',
    isPrivate: false,
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
    num: '03',
    title: 'CinemaIQ — Box Office Intelligence Platform',
    subtitle: 'AI-Powered Revenue Forecasting',
    color: 'var(--amber)',
    colorHex: '#f59e0b',
    github: 'https://github.com/RishabhPR77/movie-success-predictor',
    live: 'https://movie-success-predictor-xu2vnp53g3jg8a3pmrr3k3.streamlit.app/',
    thumbnail: '/thumbnails/cinemaiq.png',
    isPrivate: false,
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
    num: '04',
    title: 'Video Target Identification System',
    subtitle: 'Forensic Biometric Analytics',
    color: '#a855f7',
    colorHex: '#a855f7',
    github: 'https://github.com/RishabhPR77/video-target-id',
    live: 'https://video-target-id-lnjmjrh3ap8jafch7wrbme.streamlit.app/',
    thumbnail: '/thumbnails/vtis.png',
    isPrivate: false,
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
    num: '05',
    title: 'Event Footfall Prediction & Sponsorship Engine',
    subtitle: 'Research Project · LLM-Integrated ML Pipeline',
    color: '#22c55e',
    colorHex: '#22c55e',
    github: 'https://github.com/RishabhPR77/eventsight',
    live: '',
    thumbnail: '/thumbnails/footfall.png',
    isPrivate: false,
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
    num: '06',
    title: 'Code Archaeologist',
    subtitle: 'RAG System for Git History Analysis',
    color: '#0ea5e9',
    colorHex: '#0ea5e9',
    github: '',
    live: 'https://code-archaeology-rag.streamlit.app',
    thumbnail: '/thumbnails/code-arch.png',
    isPrivate: false,
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

/* ── Thumbnail component — image with fallback ── */
function Thumbnail({ project, height = 160 }) {
  const [failed, setFailed] = useState(false);
  const c = project.colorHex;

  if (failed || !project.thumbnail) {
    // CSS stat-card fallback — special for footfall, generic gradient for others
    return (
      <div style={{
        height, flexShrink: 0,
        background: `linear-gradient(135deg, ${c}18 0%, ${c}06 100%)`,
        borderBottom: `1px solid ${c}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${c}10 1px, transparent 1px), linear-gradient(90deg, ${c}10 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />
        {/* Center content */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '2rem',
            fontWeight: 800, color: c, lineHeight: 1,
            textShadow: `0 0 24px ${c}60`,
          }}>{project.metrics[0].val}</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: `${c}99`, textTransform: 'uppercase',
            letterSpacing: '0.12em', marginTop: '0.3rem',
          }}>{project.metrics[0].label}</div>
          {project.isPrivate && (
            <div style={{
              marginTop: '0.75rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: `${c}80`, border: `1px solid ${c}30`,
              padding: '0.2rem 0.6rem', borderRadius: '100px',
              display: 'inline-block', letterSpacing: '0.1em',
            }}>RESEARCH · PRIVATE</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height, flexShrink: 0, overflow: 'hidden', borderBottom: `1px solid ${c}18`, background: '#06060f' }}>
      <img
        src={project.thumbnail}
        alt={project.title}
        onError={() => setFailed(true)}
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center',
          display: 'block', background: '#06060f',
        }}
      />
    </div>
  );
}

/* ── Modal ── */
function ProjectModal({ project, onClose }) {
  const c = project.color;
  const ch = project.colorHex;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${ch}30`,
          borderRadius: '16px',
          width: '100%', maxWidth: '740px',
          maxHeight: '88vh',
          overflowY: 'auto',
          animation: 'slideUp 0.25s ease',
          scrollbarWidth: 'thin',
        }}
      >
        {/* Modal header */}
        <div style={{
          padding: '1.75rem 2.25rem 1.25rem',
          borderBottom: `1px solid ${ch}18`,
          position: 'sticky', top: 0,
          background: 'var(--surface)', zIndex: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.45rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: c, opacity: 0.7 }}>{project.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.subtitle}</span>
              {project.isPrivate && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: `${ch}90`, border: `1px solid ${ch}30`, padding: '0.15rem 0.5rem', borderRadius: '100px', letterSpacing: '0.08em' }}>
                  Research · Private
                </span>
              )}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, margin: '0 0 1rem 0' }}>
              {project.title}
            </h3>

            {/* Links */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.05em',
                  padding: '0.4rem 0.9rem', borderRadius: '5px', textDecoration: 'none',
                  border: `1px solid ${ch}35`, color: c, background: `${ch}10`, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${ch}20`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${ch}10`; e.currentTarget.style.transform = 'none'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.382 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.05em',
                  padding: '0.4rem 0.9rem', borderRadius: '5px', textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text2)',
                  background: 'rgba(255,255,255,0.04)', transition: 'all 0.2s',
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
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text2)', borderRadius: '8px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, fontSize: '1.1rem', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >✕</button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '1.75rem 2.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                color: c, background: `${ch}12`, border: `1px solid ${ch}28`,
                padding: '0.25rem 0.6rem', borderRadius: '4px',
              }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
            {project.metrics.map(m => (
              <div key={m.label} style={{ background: 'var(--surface2)', borderRadius: '8px', padding: '1rem', textAlign: 'center', border: `1px solid ${ch}15` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: c }}>{m.val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem' }}>{m.label}</div>
              </div>
            ))}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: c, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.22rem', flexShrink: 0 }}>▸</span>
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
    </div>,
    document.body
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
        background: 'var(--surface)',
        border: `1px solid ${hovered ? c + '40' : 'var(--border2)'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'all 0.22s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 8px 28px ${c}20` : 'none',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Thumbnail */}
      <Thumbnail project={project} height={130} />

      {/* Card content */}
      <div style={{ padding: '1.1rem 1.25rem', position: 'relative' }}>
        {/* Accent line */}
        <div style={{
          position: 'absolute', left: 0, top: '12px', bottom: '12px',
          width: '3px', borderRadius: '0 3px 3px 0',
          background: c, opacity: hovered ? 1 : 0.35,
          transition: 'opacity 0.22s ease',
        }} />
        <div style={{ paddingLeft: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: c, opacity: 0.75 }}>{project.num}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{project.subtitle}</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700,
            color: hovered ? 'var(--text)' : 'var(--text2)',
            lineHeight: 1.3, margin: '0 0 0.6rem 0',
            transition: 'color 0.22s ease',
          }}>{project.title}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem', alignItems: 'center' }}>
            {project.tags.slice(0, 3).map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                color: c, background: `${c}12`, border: `1px solid ${c}20`,
                padding: '0.13rem 0.42rem', borderRadius: '3px',
              }}>{t}</span>
            ))}
            {project.tags.length > 3 && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text3)' }}>+{project.tags.length - 3} more</span>
            )}
          </div>
        </div>
        <div style={{
          position: 'absolute', right: '1rem', top: '50%',
          transform: `translateY(-50%) translateX(${hovered ? '0' : '4px'})`,
          color: c, opacity: hovered ? 0.8 : 0,
          transition: 'all 0.22s ease', fontSize: '0.85rem',
        }}>→</div>
      </div>
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.85rem',
          marginTop: '3rem',
        }}>
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onClick={() => setActiveProject(p)} />
          ))}
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
          color: 'var(--text3)', textAlign: 'center',
          marginTop: '1.5rem', letterSpacing: '0.05em',
        }}>Click any card to view full details</p>
      </div>
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
}