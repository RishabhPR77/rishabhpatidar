import { useState, useEffect } from 'react';

const roles = ['Data Scientist', 'ML Engineer', 'Research Assistant', 'Problem Solver'];

function GridBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '60%', right: '10%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,66,0.04) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} />
      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
        opacity: 0.3,
        animation: 'scanline 6s linear infinite',
      }} />
      <style>{`
        @keyframes scanline {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section id="hero" style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      <GridBackground />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '6rem', paddingBottom: '4rem' }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)',
          padding: '0.35rem 0.9rem', borderRadius: '100px',
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)',
          letterSpacing: '0.06em', marginBottom: '2rem',
          animation: 'fadeUp 0.6s ease both',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#22c55e', display: 'inline-block',
            boxShadow: '0 0 6px #22c55e',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute', inset: '-2px', borderRadius: '50%',
              border: '1px solid #22c55e',
              animation: 'pulse-ring 1.5s ease-out infinite',
            }} />
          </span>
          Open to Opportunities · B.Tech IT @ MITS Gwalior
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 800, lineHeight: 1.0,
          letterSpacing: '-0.02em',
          animation: 'fadeUp 0.6s ease 0.1s both',
        }}>
          Rishabh<br />
          <span style={{
            WebkitTextStroke: '1px rgba(0,212,255,0.4)',
            color: 'transparent',
          }}>Patidar</span>
        </h1>

        {/* Typewriter role */}
        <div style={{
          marginTop: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
          color: 'var(--text2)',
          animation: 'fadeUp 0.6s ease 0.2s both',
        }}>
          <span style={{ color: 'var(--cyan)' }}>~/</span>
          <span style={{ color: 'var(--text)' }}> {displayed}</span>
          <span style={{
            display: 'inline-block', width: '2px', height: '1.2em',
            background: 'var(--cyan)', marginLeft: '2px', verticalAlign: 'middle',
            animation: 'blink 0.9s step-end infinite',
          }} />
        </div>

        {/* Description */}
        <p style={{
          marginTop: '1.8rem', maxWidth: '540px',
          color: 'var(--text2)', fontSize: '1.05rem', lineHeight: 1.75,
          animation: 'fadeUp 0.6s ease 0.3s both',
        }}>
          Final-year IT student building production-grade ML systems — from
          2.5M-transaction churn models to LLM-powered analytics pipelines.
          Research-backed, hackathon-tested.
        </p>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
          marginTop: '2.5rem',
          animation: 'fadeUp 0.6s ease 0.4s both',
        }}>
          {[
            { val: '8.12', label: 'CGPA', suffix: '' },
            { val: '0.96', label: 'Best R²', suffix: '' },
            { val: '0.88', label: 'ROC-AUC', suffix: '' },
            { val: '2.5M+', label: 'Transactions', suffix: '' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700,
                color: 'var(--cyan)', lineHeight: 1,
              }}>{s.val}{s.suffix}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text3)', marginTop: '0.3rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          marginTop: '2.5rem',
          animation: 'fadeUp 0.6s ease 0.5s both',
        }}>
          <a href="#projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--cyan)', color: 'var(--bg)',
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.05em',
            padding: '0.75rem 1.8rem', borderRadius: '4px', fontWeight: 600,
            transition: 'all 0.2s', boxShadow: '0 0 20px rgba(0,212,255,0.2)',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.45)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)'}
          >View Projects →</a>
          <a href="https://github.com/rishabhpatidar" target="_blank" rel="noopener" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1px solid var(--border)', color: 'var(--text2)',
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.05em',
            padding: '0.75rem 1.8rem', borderRadius: '4px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >⌥ GitHub</a>
          <a href="https://linkedin.com/in/rishabh-ptdr" target="_blank" rel="noopener" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1px solid var(--border)', color: 'var(--text2)',
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.05em',
            padding: '0.75rem 1.8rem', borderRadius: '4px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
          >in LinkedIn</a>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(transparent, var(--bg))',
        zIndex: 1,
      }} />
    </section>
  );
}
