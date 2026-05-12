import { SectionHeader } from './Skills';

const achievements = [
  {
    rank: '🥈',
    title: '1st Runner-Up',
    event: "SSH '26 National Hackathon",
    org: 'SSH',
    date: 'Feb 2026',
    color: '#c0c0c0',
  },
  {
    rank: '🏆',
    title: 'Top Performer — WebDev Track',
    event: 'Hacksagon',
    org: 'ABV IIITM Gwalior',
    date: 'Apr 2026',
    color: 'var(--amber)',
  },
  {
    rank: '🎯',
    title: 'Finalist',
    event: 'ABV-IIITM Hackatron',
    org: 'ABV-IIITM × GitHub',
    date: 'Oct 2025',
    color: 'var(--violet)',
  },
];

export function Achievements() {
  return (
    <section id="achievements" style={{
      padding: '8rem 0',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)',
    }}>
      <div className="container">
        <SectionHeader tag="05" title="Achievements" subtitle="Recognition" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.2rem',
          marginTop: '3rem',
        }}>
          {achievements.map((a, i) => (
            <div key={i} style={{
              border: '1px solid var(--border2)',
              borderRadius: '12px',
              padding: '2rem',
              background: 'var(--surface)',
              transition: 'all 0.3s',
              position: 'relative',
              overflow: 'hidden',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${a.color}40`;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${a.color}10`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border2)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{a.rank}</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700,
                color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.5rem',
              }}>{a.title}</div>
              <div style={{ color: a.color, fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{a.event}</div>
              <div style={{ color: 'var(--text3)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginTop: '0.3rem' }}>{a.org} · {a.date}</div>

              {/* Decorative corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '60px', height: '60px',
                background: `radial-gradient(circle at top right, ${a.color}12, transparent)`,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" style={{ padding: '8rem 0 6rem' }}>
      <div className="container">
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 5vw, 4rem)',
          background: 'var(--surface)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px', height: '200px',
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), transparent)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: '1rem', opacity: 0.7,
            }}>06 // Let's Connect</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 2.8vw, 2.6rem)',
              fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}>
              Building something<br />
              <span style={{ color: 'var(--cyan)' }}>data-driven?</span>
            </h2>

            <p style={{ color: 'var(--text2)', fontSize: '1rem', maxWidth: '460px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Open to internships, research collaborations, and full-time roles in Data Science & ML. Let's talk.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:rishabhpatidar400@gmail.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--cyan)', color: 'var(--bg)',
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.05em',
                padding: '0.85rem 2rem', borderRadius: '4px', fontWeight: 600,
                transition: 'all 0.2s', boxShadow: '0 0 20px rgba(0,212,255,0.25)',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.5)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.25)'}
              >✉ Email Me</a>
              <a href="https://linkedin.com/in/rishabh-ptdr" target="_blank" rel="noopener" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                border: '1px solid var(--border)', color: 'var(--text2)',
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.05em',
                padding: '0.85rem 2rem', borderRadius: '4px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
              >in LinkedIn</a>
              <a href="https://github.com/rishabhpatidar" target="_blank" rel="noopener" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                border: '1px solid var(--border)', color: 'var(--text2)',
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.05em',
                padding: '0.85rem 2rem', borderRadius: '4px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
              >⌥ GitHub</a>
            </div>

            {/* Phone */}
            <div style={{
              marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
              color: 'var(--text3)',
            }}>+91 9098729516</div>

            {/* Resume downloads */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>⬇ Download Resume</div>
              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { label: 'Data Science', sub: 'Analytics · EDA · Modelling', file: '/Rishabh_Patidar_DS.pdf', color: 'var(--cyan)', raw: '0,212,255' },
                  { label: 'ML Engineering', sub: 'CV · LLM · Deployment', file: '/Rishabh_Patidar_ML.pdf', color: '#a855f7', raw: '168,85,247' },
                ].map(r => (
                  <a key={r.label} href={r.file} download style={{
                    display: 'flex', flexDirection: 'column', padding: '0.6rem 1.2rem',
                    border: `1px solid rgba(${r.raw},0.2)`, borderRadius: '6px',
                    background: `rgba(${r.raw},0.04)`, transition: 'all 0.2s', minWidth: '145px',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = `rgba(${r.raw},0.1)`; e.currentTarget.style.borderColor = `rgba(${r.raw},0.45)`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `rgba(${r.raw},0.04)`; e.currentTarget.style.borderColor = `rgba(${r.raw},0.2)`; e.currentTarget.style.transform = 'none'; }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: r.color }}>{r.label} ↓</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text3)', marginTop: '0.15rem' }}>{r.sub}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '3rem', textAlign: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          color: 'var(--text3)',
        }}>
          © 2026 Rishabh Patidar · Built with React + Vite
        </div>
      </div>
    </section>
  );
}