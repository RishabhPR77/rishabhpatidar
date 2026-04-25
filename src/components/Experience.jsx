import { SectionHeader } from './Skills';

const experience = {
  title: 'Undergraduate Research Assistant',
  company: 'Madhav Institute of Technology and Science',
  location: 'Gwalior, MP',
  period: 'Jan – Apr 2026',
  bullets: [
    {
      icon: '▸',
      text: 'Conducted end-to-end EDA on event marketing datasets covering 50+ features, identifying key footfall drivers through correlation analysis and domain-informed feature selection — reducing model noise by 30%.',
    },
    {
      icon: '▸',
      text: 'Built a two-stage XGBoost Regressor pipeline (R² = 0.96) with a Dynamic Physical Clamping algorithm enforcing venue-capacity constraints at inference — achieving zero invalid output predictions across all test cases.',
    },
    {
      icon: '▸',
      text: 'Integrated LLaMA-3.3-70B via Groq API to automate brand-event synergy scoring and generate structured JSON negotiation reports, deployed as a stateless FastAPI microservice enabling data-driven sponsorship ROI estimation.',
    },
  ],
  tags: ['XGBoost', 'FastAPI', 'LLaMA-3.3-70B', 'Groq API', 'GridSearchCV'],
};

export default function Experience() {
  return (
    <section id="experience" style={{
      padding: '8rem 0', position: 'relative',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)',
    }}>
      <div className="container">
        <SectionHeader tag="03" title="Experience" subtitle="Work" />

        <div style={{ marginTop: '3rem' }}>
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'var(--surface)',
          }}>
            {/* Header */}
            <div style={{
              padding: '2rem 2.5rem',
              borderBottom: '1px solid var(--border2)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              flexWrap: 'wrap', gap: '1rem',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.04), transparent)',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>Research · Academic</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700,
                  color: 'var(--text)',
                }}>{experience.title}</h3>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                  color: 'var(--text2)', marginTop: '0.3rem',
                }}>{experience.company} · {experience.location}</div>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--text3)', background: 'rgba(0,212,255,0.06)',
                border: '1px solid var(--border)',
                padding: '0.35rem 0.9rem', borderRadius: '100px',
                whiteSpace: 'nowrap',
              }}>{experience.period}</div>
            </div>

            {/* Bullets */}
            <div style={{ padding: '2rem 2.5rem' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {experience.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginTop: '0.15rem', flexShrink: 0 }}>{b.icon}</span>
                    <span style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.7 }}>{b.text}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.8rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border2)' }}>
                {experience.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    color: 'var(--text3)', background: 'var(--surface2)',
                    border: '1px solid var(--border2)', padding: '0.25rem 0.65rem', borderRadius: '3px',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education box */}
        <div style={{
          marginTop: '1.5rem',
          border: '1px solid var(--border2)',
          borderRadius: '12px',
          padding: '1.8rem 2.5rem',
          background: 'var(--surface)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Education</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700 }}>
              B.Tech in Information Technology
            </h3>
            <div style={{ color: 'var(--text2)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              Madhav Institute of Technology and Science · Gwalior
            </div>
            <div style={{ color: 'var(--text3)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginTop: '0.3rem' }}>
              ML · AI · DSA · DBMS · Statistics · Linear Algebra
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--amber)' }}>8.12</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>CGPA · Exp. May 2027</div>
          </div>
        </div>
      </div>
    </section>
  );
}
