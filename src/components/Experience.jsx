import { SectionHeader } from './Skills';

const experience = {
  title: 'Undergraduate Research Assistant',
  company: 'Madhav Institute of Technology and Science',
  location: 'Gwalior, MP',
  period: 'Jan – Apr 2026',
  bullets: [
    'Conducted end-to-end EDA on event marketing datasets covering 50+ features, identifying key footfall drivers through correlation analysis and domain-informed feature selection — reducing model noise by 30%.',
    'Built a two-stage XGBoost Regressor pipeline (R² = 0.96) with a Dynamic Physical Clamping algorithm enforcing venue-capacity constraints at inference — achieving zero invalid output predictions across all test cases.',
    'Integrated LLaMA-3.3-70B via Groq API to automate brand-event synergy scoring and generate structured JSON negotiation reports, deployed as a stateless FastAPI microservice enabling data-driven sponsorship ROI estimation.',
  ],
  tags: ['XGBoost', 'FastAPI', 'LLaMA-3.3-70B', 'Groq API', 'GridSearchCV'],
};

export default function Experience() {
  return (
    <section id="experience" style={{
      minHeight: '100vh',
      padding: '80px 0 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)',
    }}>
      <div className="container">
        <SectionHeader tag="03" title="Experience" subtitle="Work" compact />

        {/* Experience card */}
        <div style={{
          marginTop: '1.25rem',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          overflow: 'hidden',
          background: 'var(--surface)',
        }}>
          {/* Card header */}
          <div style={{
            padding: '1.25rem 1.8rem',
            borderBottom: '1px solid var(--border2)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            flexWrap: 'wrap', gap: '0.75rem',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.04), transparent)',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: '0.3rem',
              }}>Research · Academic</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700,
                color: 'var(--text)', lineHeight: 1.2,
              }}>{experience.title}</h3>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--text2)', marginTop: '0.2rem',
              }}>{experience.company} · {experience.location}</div>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.73rem',
              color: 'var(--text3)', background: 'rgba(0,212,255,0.06)',
              border: '1px solid var(--border)',
              padding: '0.3rem 0.8rem', borderRadius: '100px',
              whiteSpace: 'nowrap', alignSelf: 'flex-start',
            }}>{experience.period}</div>
          </div>

          {/* Bullets */}
          <div style={{ padding: '1.25rem 1.8rem' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {experience.bullets.map((text, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--cyan)', fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem', marginTop: '0.18rem', flexShrink: 0,
                  }}>▸</span>
                  <span style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.65 }}>{text}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
              marginTop: '1.1rem', paddingTop: '1rem',
              borderTop: '1px solid var(--border2)',
            }}>
              {experience.tags.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.67rem',
                  color: 'var(--text3)', background: 'var(--surface2)',
                  border: '1px solid var(--border2)',
                  padding: '0.2rem 0.55rem', borderRadius: '3px',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Education — horizontal compact row */}
        <div style={{
          marginTop: '0.65rem',
          border: '1px solid var(--border2)',
          borderRadius: '10px',
          padding: '1.1rem 1.8rem',
          background: 'var(--surface)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: 'var(--amber)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '0.3rem',
            }}>Education</div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
              lineHeight: 1.2,
            }}>
              B.Tech in Information Technology
            </h3>
            <div style={{ color: 'var(--text2)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Madhav Institute of Technology and Science · Gwalior
            </div>
            <div style={{
              color: 'var(--text3)', fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)', marginTop: '0.2rem',
            }}>
              ML · AI · DSA · DBMS · Statistics · Linear Algebra
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: '0.25rem',
              background: 'rgba(255,140,66,0.08)',
              border: '1px solid rgba(255,140,66,0.2)',
              borderRadius: '7px', padding: '0.4rem 0.85rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.35rem',
                fontWeight: 700, color: 'var(--amber)', lineHeight: 1,
              }}>8.124</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text3)' }}>/10</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>CGPA · Exp. May 2027</div>
          </div>
        </div>
      </div>
    </section>
  );
}