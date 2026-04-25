import { useState, useEffect } from 'react';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Achievements'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1rem 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(4,4,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,212,255,0.08)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--cyan)', letterSpacing: '0.1em' }}>
        rp<span style={{ color: 'var(--text2)' }}>://</span>portfolio
      </span>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em',
            color: 'var(--text2)', textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = 'var(--text2)'}
          >{l}</a>
        ))}
        <a href="mailto:rishabhpatidar400@gmail.com" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em',
          color: 'var(--bg)', background: 'var(--cyan)', padding: '0.4rem 1rem',
          borderRadius: '3px', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => e.target.style.opacity = '0.8'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >Hire Me</a>
      </div>

      {/* Mobile menu button */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: 'none',
        color: 'var(--cyan)', fontSize: '1.4rem', cursor: 'pointer',
      }} className="mobile-menu-btn">☰</button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
