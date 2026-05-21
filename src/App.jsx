import { useState, useEffect, useCallback, useRef } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import { Achievements, Contact } from './components/Achievements';

const SECTIONS = [
  { id: 'hero',         label: 'About',        component: Hero         },
  { id: 'skills',       label: 'Skills',        component: Skills       },
  { id: 'experience',   label: 'Experience',    component: Experience   },
  { id: 'projects',     label: 'Projects',      component: Projects     },
  { id: 'achievements', label: 'Achievements',  component: Achievements },
  { id: 'contact',      label: 'Contact',       component: Contact      },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [dir, setDir]         = useState(1);   // 1 = forward, -1 = backward
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef(null);
  const slideRefs   = useRef([]);

  const goTo = useCallback((index) => {
    if (animating || index === current) return;
    setDir(index > current ? 1 : -1);
    setPrev(current);
    setCurrent(index);
    setAnimating(true);
    // Reset scroll of the target slide
    if (slideRefs.current[index]) {
      slideRefs.current[index].scrollTop = 0;
    }
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 600);
  }, [animating, current]);

  const goNext = useCallback(() => goTo(Math.min(current + 1, SECTIONS.length - 1)), [goTo, current]);
  const goPrev = useCallback(() => goTo(Math.max(current - 1, 0)), [goTo, current]);

  /* Keyboard */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  /* Touch swipe */
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}
    >
      {/* Slides */}
      {SECTIONS.map(({ id, component: Comp }, i) => {
        const isActive  = i === current;
        const isPrev    = i === prev;
        const isVisible = isActive || isPrev;

        let translateX = '100%';
        if (isActive && prev !== null) translateX = '0%';
        else if (isActive)             translateX = '0%';
        else if (isPrev)               translateX = dir === 1 ? '-100%' : '100%';
        else if (i < current)          translateX = '-100%';

        return (
          <div
            key={id}
            ref={el => slideRefs.current[i] = el}
            style={{
              position: 'absolute',
              inset: 0,
              overflowY: isActive ? 'auto' : 'hidden',
              overflowX: 'hidden',
              transform: `translateX(${translateX})`,
              transition: isVisible ? 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
              willChange: 'transform',
              scrollbarWidth: 'thin',
            }}
          >
            {/* Slide content */}
            <div style={{ minHeight: '100vh' }}>
              <Comp goTo={i === 0 ? goTo : undefined} />
            </div>
          </div>
        );
      })}

      {/* Top Nav */}
      <TopNav current={current} goTo={goTo} />

      {/* Side progress dots */}
      <SideDots current={current} total={SECTIONS.length} goTo={goTo} />

      {/* Prev / Next arrows */}
      <SlideArrows current={current} total={SECTIONS.length} onPrev={goPrev} onNext={goNext} />

      {/* Bottom section label */}
      <BottomLabel label={SECTIONS[current].label} index={current} total={SECTIONS.length} />
    </div>
  );
}

/* ── Top Nav ── */
function TopNav({ current, goTo }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '1rem 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(4,4,10,0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,212,255,0.07)',
    }}>
      {/* Logo */}
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--cyan)', letterSpacing: '0.1em' }}>
        rp<span style={{ color: 'var(--text3)' }}>://</span>portfolio
      </span>

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }}>
        {SECTIONS.map((s, i) => {
          const active = i === current;
          return (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              style={{
                background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
                border: active ? '1px solid rgba(0,212,255,0.25)' : '1px solid transparent',
                color: active ? 'var(--cyan)' : 'var(--text3)',
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: '0.35rem 0.85rem', borderRadius: '4px',
                cursor: 'pointer', transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'transparent'; }}}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Hire me */}
      <a
        href="mailto:rishabhpatidar400@gmail.com"
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em',
          color: 'var(--bg)', background: 'var(--cyan)', padding: '0.38rem 1rem',
          borderRadius: '3px', transition: 'opacity 0.2s', whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >Hire Me</a>

      <style>{`
        @media (max-width: 768px) {
          nav > div:nth-child(2) { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

/* ── Side dots ── */
function SideDots({ current, total, goTo }) {
  return (
    <div style={{
      position: 'fixed', right: '1.5rem', top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: '0.6rem',
      zIndex: 200,
    }}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current;
        return (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={SECTIONS[i].label}
            style={{
              width: active ? '8px' : '6px',
              height: active ? '24px' : '6px',
              borderRadius: '4px',
              background: active ? 'var(--cyan)' : 'rgba(0,212,255,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: active ? '0 0 8px rgba(0,212,255,0.5)' : 'none',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(0,212,255,0.45)'; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'rgba(0,212,255,0.2)'; }}
          />
        );
      })}
    </div>
  );
}

/* ── Arrows ── */
function SlideArrows({ current, total, onPrev, onNext }) {
  const btnStyle = (disabled) => ({
    position: 'fixed', top: '50%', zIndex: 200,
    transform: 'translateY(-50%)',
    width: '40px', height: '40px',
    border: `1px solid ${disabled ? 'rgba(255,255,255,0.04)' : 'rgba(0,212,255,0.2)'}`,
    borderRadius: '50%',
    background: disabled ? 'transparent' : 'rgba(0,212,255,0.05)',
    color: disabled ? 'var(--text3)' : 'var(--cyan)',
    fontSize: '1rem', cursor: disabled ? 'default' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', opacity: disabled ? 0.2 : 1,
    backdropFilter: 'blur(4px)',
  });

  return (
    <>
      <button
        onClick={onPrev}
        disabled={current === 0}
        style={{ ...btnStyle(current === 0), left: '1.25rem' }}
        onMouseEnter={e => { if (current !== 0) { e.currentTarget.style.background = 'rgba(0,212,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; }}}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; }}
      >←</button>
      <button
        onClick={onNext}
        disabled={current === total - 1}
        style={{ ...btnStyle(current === total - 1), right: '3.5rem' }}
        onMouseEnter={e => { if (current !== total - 1) { e.currentTarget.style.background = 'rgba(0,212,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; }}}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; }}
      >→</button>
    </>
  );
}

/* ── Bottom label ── */
function BottomLabel({ label, index, total }) {
  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: '1rem',
      zIndex: 200, pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        color: 'var(--text3)', letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        <span style={{ color: 'var(--cyan)' }}>{String(index + 1).padStart(2, '0')}</span>
        {' / '}{String(total).padStart(2, '0')} — {label}
      </span>
    </div>
  );
}