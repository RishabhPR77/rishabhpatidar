import { useState, useEffect } from 'react';

const roles = ['Data Scientist', 'ML Engineer', 'Research Assistant', 'Problem Solver'];

function GridBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />
      {/* Large ambient glow left */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />
      {/* Amber glow right */}
      <div style={{
        position: 'absolute', bottom: '15%', right: '15%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,66,0.05) 0%, transparent 65%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.4) 50%, transparent 100%)',
        animation: 'scanline 8s linear infinite',
      }} />
      <style>{`
        @keyframes scanline { 0% { top: -2px; opacity: 0.15; } 50% { opacity: 0.25; } 100% { top: 100%; opacity: 0.15; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .id-card { min-height: auto !important; }
        }
      `}</style>
    </div>
  );
}

/* Corner bracket decoration */
function Corner({ pos }) {
  const size = 16;
  const thick = 2;
  const color = 'rgba(0,212,255,0.5)';
  const s = {
    position: 'absolute',
    width: size, height: size,
    ...pos,
  };
  const top = pos.top !== undefined;
  const left = pos.left !== undefined;
  return (
    <div style={s}>
      <div style={{ position: 'absolute', top: 0, [left ? 'left' : 'right']: 0, width: size, height: thick, background: color }} />
      <div style={{ position: 'absolute', [top ? 'top' : 'bottom']: 0, [left ? 'left' : 'right']: 0, width: thick, height: size, background: color }} />
    </div>
  );
}


function ResumeDownloads() {
  const resumes = [
    {
      label: 'Data Science',
      sub: 'Analytics · EDA · Modelling',
      file: '/Rishabh_Patidar_DS.pdf',
      color: 'var(--cyan)',
      colorRaw: '0,212,255',
    },
    {
      label: 'ML Engineering',
      sub: 'CV · LLM · Deployment',
      file: '/Rishabh_Patidar_ML.pdf',
      color: '#a855f7',
      colorRaw: '168,85,247',
    },
  ];

  return (
    <div style={{ animation: 'fadeUp 0.6s ease 0.65s both' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase',
        marginBottom: '0.6rem',
      }}>⬇ Download Resume</div>
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        {resumes.map(r => (
          <a
            key={r.label}
            href={r.file}
            download
            style={{
              display: 'flex', flexDirection: 'column',
              padding: '0.6rem 1.1rem',
              border: `1px solid rgba(${r.colorRaw},0.2)`,
              borderRadius: '6px',
              background: `rgba(${r.colorRaw},0.04)`,
              transition: 'all 0.2s',
              textDecoration: 'none',
              minWidth: '140px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `rgba(${r.colorRaw},0.1)`;
              e.currentTarget.style.borderColor = `rgba(${r.colorRaw},0.45)`;
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 4px 16px rgba(${r.colorRaw},0.15)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `rgba(${r.colorRaw},0.04)`;
              e.currentTarget.style.borderColor = `rgba(${r.colorRaw},0.2)`;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              fontWeight: 600, color: r.color, letterSpacing: '0.04em',
            }}>{r.label} ↓</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--text3)', marginTop: '0.15rem', letterSpacing: '0.06em',
            }}>{r.sub}</span>
          </a>
        ))}
      </div>
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

      <div className="container" style={{
        position: 'relative', zIndex: 1,
        paddingTop: '7rem', paddingBottom: '5rem',
        width: '100%',
      }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '3.5rem',
          alignItems: 'center',
          minHeight: '82vh',
        }}>

          {/* ── LEFT: Identity card ── */}
          <div style={{ animation: 'fadeLeft 0.7s ease both' }}>
            <div className="id-card" style={{
              position: 'relative',
              background: 'linear-gradient(145deg, rgba(15,15,32,0.9), rgba(8,8,18,0.95))',
              border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: '16px',
              padding: '3rem 2.8rem',
              minHeight: '420px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 60px rgba(0,212,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
              {/* Corner brackets */}
              <Corner pos={{ top: -1, left: -1 }} />
              <Corner pos={{ top: -1, right: -1 }} />
              <Corner pos={{ bottom: -1, left: -1 }} />
              <Corner pos={{ bottom: -1, right: -1 }} />

              {/* Top row: id tag */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '2.5rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--text3)', letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>ID <span style={{ color: 'var(--cyan)' }}>#RP-2026</span></span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--text3)', letterSpacing: '0.1em',
                }}>B.TECH IT</span>
              </div>

              {/* Name block */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/* First name */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  marginBottom: '0.15em',
                }}>Rishabh</div>

                {/* Last name — accent style */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(90deg, var(--cyan) 0%, rgba(0,212,255,0.4) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '2rem',
                }}>Patidar</div>

                {/* Divider line */}
                <div style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(0,212,255,0.3) 0%, transparent 80%)',
                  marginBottom: '1.5rem',
                }} />

                {/* Detail rows */}
                {[
                  { label: 'Institute', value: 'MITS Gwalior' },
                  { label: 'Degree', value: 'B.Tech IT · 2027' },
                  { label: 'CGPA', value: '8.124 / 10.0' },
                ].map(row => (
                  <div key={row.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                    marginBottom: '0.6rem',
                  }}>
                    <span style={{ color: 'var(--text3)', letterSpacing: '0.08em' }}>{row.label}</span>
                    <span style={{ color: 'var(--text2)' }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Bottom row: social links */}
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '2rem' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/RishabhPR77' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/rishabh-ptdr' },
                  { label: 'Email', href: 'mailto:rishabhpatidar400@gmail.com' },
                ].map(s => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener"
                    style={{
                      flex: 1, textAlign: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                      letterSpacing: '0.06em', color: 'var(--text3)',
                      border: '1px solid rgba(0,212,255,0.1)',
                      padding: '0.45rem 0', borderRadius: '4px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--cyan)';
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)';
                      e.currentTarget.style.background = 'rgba(0,212,255,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text3)';
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)',
              padding: '0.35rem 1rem', borderRadius: '100px',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)',
              letterSpacing: '0.06em', marginBottom: '2rem',
              animation: 'fadeUp 0.6s ease 0.15s both',
              width: 'fit-content',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#22c55e', display: 'inline-block',
                boxShadow: '0 0 8px #22c55e', position: 'relative', flexShrink: 0,
              }}>
                <span style={{
                  position: 'absolute', inset: '-3px', borderRadius: '50%',
                  border: '1px solid #22c55e',
                  animation: 'pulse-ring 1.8s ease-out infinite',
                }} />
              </span>
              Open to Opportunities
            </div>

            {/* Typewriter */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              color: 'var(--text2)',
              animation: 'fadeUp 0.6s ease 0.25s both',
              marginBottom: '1.6rem',
            }}>
              <span style={{ color: 'var(--cyan)', opacity: 0.7 }}>~/</span>
              <span style={{ color: 'var(--text)', fontWeight: 500 }}> {displayed}</span>
              <span style={{
                display: 'inline-block', width: '2px', height: '1.1em',
                background: 'var(--cyan)', marginLeft: '3px', verticalAlign: 'middle',
                animation: 'blink 0.9s step-end infinite',
              }} />
            </div>

            {/* Description */}
            <p style={{
              color: 'var(--text2)', fontSize: '0.97rem', lineHeight: 1.85,
              animation: 'fadeUp 0.6s ease 0.35s both',
              marginBottom: '2.5rem',
              paddingLeft: '1rem',
              borderLeft: '2px solid rgba(0,212,255,0.18)',
              maxWidth: '440px',
            }}>
              Final-year IT student building production-grade ML systems — from
              2.5M-transaction churn models to LLM-powered analytics pipelines.
              Research-backed, hackathon-tested.
            </p>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
              border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: '10px', overflow: 'hidden',
              background: 'rgba(15,15,32,0.6)',
              animation: 'fadeUp 0.6s ease 0.45s both',
              marginBottom: '2rem',
            }}>
              {[
                { val: '8.12', label: 'CGPA' },
                { val: '0.96', label: 'Best R²' },
                { val: '0.88', label: 'ROC-AUC' },
                { val: '2.5M+', label: 'Rows' },
              ].map((s, i) => (
                <div key={s.label} style={{
                  padding: '1.25rem 0.75rem', textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(0,212,255,0.08)' : 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700,
                    color: 'var(--cyan)', lineHeight: 1,
                  }}>{s.val}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text3)',
                    marginTop: '0.4rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{
              display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
              animation: 'fadeUp 0.6s ease 0.55s both',
              marginBottom: '1rem',
            }}>
              <a href="#projects" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: 'var(--cyan)', color: '#04040a',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.05em', fontWeight: 600,
                padding: '0.78rem 1.6rem', borderRadius: '6px',
                transition: 'all 0.2s', boxShadow: '0 4px 24px rgba(0,212,255,0.25)',
                whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 36px rgba(0,212,255,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,212,255,0.25)'; e.currentTarget.style.transform = 'none'; }}
              >View Projects →</a>

              <a href="#skills" style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1px solid rgba(0,212,255,0.2)', color: 'var(--text2)',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.05em',
                padding: '0.78rem 1.6rem', borderRadius: '6px',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
                background: 'rgba(0,212,255,0.02)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)'; e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.transform = 'none'; }}
              >Explore Skills</a>

              <a href="mailto:rishabhpatidar400@gmail.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                border: '1px solid rgba(255,140,66,0.25)', color: 'var(--amber)',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.05em',
                padding: '0.78rem 1.6rem', borderRadius: '6px',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
                background: 'rgba(255,140,66,0.04)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,140,66,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,140,66,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,140,66,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,140,66,0.25)'; e.currentTarget.style.transform = 'none'; }}
              >✉ Hire Me</a>
            </div>

            {/* Resume downloads */}
            <ResumeDownloads />
          </div>

        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px',
        background: 'linear-gradient(transparent, var(--bg))', zIndex: 1,
      }} />
    </section>
  );
}