import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Project = {
  num: string;
  tag: string;
  year: string;
  title: string;
  body: string;
  stack: string[];
  metrics: { val: string; label: string }[];
  github?: string;
  live?: string;
  color: string;
  thumb?: string;
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRootRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    scrollRootRef.current = document.getElementById("scroll-root");
  }, []);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 150, damping: 18 });
  const [sp, setSp] = useState({ x: -400, y: -400 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    setSp({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const reversed = index % 2 === 1;

  const fromLeft = index % 2 === 0;
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -100 : 100, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, root: scrollRootRef, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}

      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); mx.set(0); my.set(0); setSp({ x: -400, y: -400 }); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      className="group relative rounded-3xl border border-white/10 bg-[#06060f]/80 backdrop-blur-2xl overflow-hidden"
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(520px circle at ${sp.x}px ${sp.y}px, ${project.color}26, transparent 55%)` }}
      />
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

      <div className={`relative grid md:grid-cols-12 gap-0 ${reversed ? "md:[direction:rtl]" : ""}`}>
        {/* THUMBNAIL */}
        <div className="md:col-span-5 relative overflow-hidden md:[direction:ltr] bg-[#04040a]">
          <div className="aspect-[16/11] md:aspect-auto md:h-full relative">
            {project.thumb ? (
              <img
                src={project.thumb}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}30, transparent)` }} />
            )}
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060f] via-[#06060f]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06060f]/60 via-transparent to-[#06060f]/40 hidden md:block" />
            {/* giant number */}
            <div
              className="absolute bottom-3 left-4 md:bottom-5 md:left-6 font-mono font-bold leading-none tabular-nums select-none pointer-events-none"
              style={{
                fontSize: "clamp(4rem, 9vw, 8rem)",
                color: project.color,
                opacity: 0.95,
                textShadow: `0 0 40px ${project.color}80`,
                WebkitTextStroke: `1px ${project.color}`,
              }}
            >
              {project.num}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-7 p-6 md:p-9 md:[direction:ltr] flex flex-col">
          {/* tag row */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: project.color, boxShadow: `0 0 12px ${project.color}` }} />
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">{project.tag}</span>
            <span className="font-mono text-[10px] text-white/25">·</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/45">{project.year}</span>
          </div>

          {/* title */}
          <h3 className="text-2xl md:text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-white">
            {project.title}
          </h3>

          {/* body */}
          <p className="text-white/65 text-[14px] md:text-[15px] leading-relaxed mt-3">
            {project.body}
          </p>

          {/* metrics */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03]">
                <span className="font-mono text-sm font-medium tabular-nums" style={{ color: project.color }}>{m.val}</span>
                <span className="font-mono text-[10px] tracking-wider text-white/45 uppercase">{m.label}</span>
              </div>
            ))}
          </div>

          {/* divider */}
          <div className="mt-5 mb-4 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

          {/* stack */}
          <div className="flex flex-wrap gap-1.5 items-center mb-6">
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/35 uppercase mr-2">stack →</span>
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[10px] tracking-wider px-2 py-1 rounded border border-white/10 text-white/55">
                {s}
              </span>
            ))}
          </div>

          {/* CTA buttons — bigger */}
          <div className="mt-auto flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold tracking-[0.2em] px-5 py-3 rounded-xl border-2 text-white overflow-hidden transition-all hover:scale-[1.02]"
                style={{ borderColor: project.color, background: `${project.color}14` }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" style={{ background: project.color }} />
                <svg className="relative w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.6.23 2.78.12 3.08.74.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
                </svg>
                <span className="relative">GITHUB</span>
                <span className="relative">↗</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold tracking-[0.2em] px-5 py-3 rounded-xl border-2 border-white/20 text-white/90 hover:text-white hover:border-white/50 overflow-hidden transition-all hover:scale-[1.02]"
              >
                <span className="relative w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="relative">LIVE DEMO</span>
                <span className="relative">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
