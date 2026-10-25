import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

import {
  about,
  achievements,
  experience,
  featured,
  otherProjects,
  profile,
  readingMinutes,
  sections,
  skills,
  type Project,
} from "@/lib/content";

const title = "Rishabh Patidar — Software Engineer (Backend & AI)";
const description =
  "Rishabh Patidar is a software engineer building backend services, integrations and AI systems. ISE Intern at MSG91, previously AI Engineer Intern at CogKnowEdge. B.Tech IT, MITS Gwalior.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: profile.site },
      { property: "og:image", content: `${profile.site}/thumbnails/code-arch.webp` },
    ],
    links: [{ rel: "canonical", href: profile.site }],
  }),
  component: Index,
});

function Index() {
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <MotionConfig reducedMotion="user">
      <ProgressBar />
      <div
        id="top"
        className="mx-auto min-h-screen max-w-screen-xl px-6 py-14 sm:px-12 md:py-20 lg:flex lg:justify-between lg:gap-12 lg:px-16 lg:py-0"
      >
        <Intro active={active} />
        <main className="lg:w-[56%] lg:py-24">
          <Section id="about" n={1} title="About">
            <About />
          </Section>
          <Section id="experience" n={2} title="Experience">
            <Experience />
          </Section>
          <Section id="projects" n={3} title="Projects">
            <Projects />
          </Section>
          <Section id="skills" n={4} title="Skills">
            <Skills />
          </Section>
          <Section id="achievements" n={5} title="Achievements">
            <Achievements />
          </Section>
          <Section id="contact" n={6} title="Contact">
            <Contact />
          </Section>
          <Footer />
        </main>
      </div>
    </MotionConfig>
  );
}

/* ───────────────────────── Left column ───────────────────────── */

function Intro({ active }: { active: string }) {
  return (
    <header className="mb-16 lg:sticky lg:top-0 lg:mb-0 lg:flex lg:h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-ink-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.status}
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          <a href="#top">{profile.name}</a>
        </h1>
        <p className="mt-3 text-lg font-medium text-ink">{profile.role}</p>
        <p className="mt-4 max-w-sm leading-relaxed text-ink-2">{profile.tagline}</p>
        <p className="mt-4 font-mono text-xs text-ink-3">
          Now: {profile.now.label} at {profile.now.org} ·{" "}
          <span className="whitespace-nowrap">{readingMinutes} min read</span>
        </p>

        <nav aria-label="Sections" className="mt-14 hidden lg:block">
          <ol>
            {sections.map((s, i) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-center py-2.5"
                  >
                    <span className="mr-3 w-5 font-mono text-[11px] tabular-nums text-ink-3">
                      0{i + 1}
                    </span>
                    <span
                      className={`mr-4 h-px transition-all duration-300 ${
                        isActive
                          ? "w-14 bg-ink"
                          : "w-6 bg-ink-3 group-hover:w-14 group-hover:bg-ink"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                        isActive ? "text-ink" : "text-ink-3 group-hover:text-ink"
                      }`}
                    >
                      {s.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <div className="mt-8 flex items-center gap-1">
        <IconLink href={profile.github} label="GitHub">
          <GithubIcon />
        </IconLink>
        <IconLink href={profile.linkedin} label="LinkedIn">
          <LinkedinIcon />
        </IconLink>
        <IconLink href={`mailto:${profile.email}`} label="Email">
          <Mail className="h-5 w-5" />
        </IconLink>
        <IconLink href={profile.resume} label="Resume (PDF)">
          <FileText className="h-5 w-5" />
        </IconLink>
        <span className="mx-2 h-5 w-px bg-line" />
        <ThemeToggle />
      </div>
    </header>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="rounded-md p-2 text-ink-3 transition-colors hover:bg-paper-2 hover:text-ink"
    >
      {children}
    </a>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="rounded-md p-2 text-ink-3 transition-colors hover:bg-paper-2 hover:text-ink"
    >
      <Moon className="h-5 w-5 dark:hidden" />
      <Sun className="hidden h-5 w-5 dark:block" />
    </button>
  );
}

/* ───────────────────────── Sections ───────────────────────── */

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={title} className="mb-24 scroll-mt-14 md:mb-32 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-6 bg-paper/85 px-6 py-4 backdrop-blur sm:-mx-12 sm:px-12 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
          <span className="mr-3 text-brand">0{n}</span>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function About() {
  return (
    <Reveal>
      <div className="space-y-4 text-[17px] leading-relaxed text-ink-2">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {about.facts.map((f) => (
          <div key={f.k} className="bg-paper p-4">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-3">{f.k}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{f.v}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function Experience() {
  return (
    <ol className="relative ml-1 space-y-12 border-l border-line">
      {experience.map((job) => (
        <li key={job.role} className="relative pl-7 sm:pl-8">
          <Reveal>
            <span
              className={`absolute top-1.5 -left-[5.5px] h-2.5 w-2.5 rounded-full ring-4 ring-paper ${
                job.current ? "bg-brand" : "bg-ink-3"
              }`}
            />
            {job.current && (
              <span className="absolute top-1.5 -left-[5.5px] h-2.5 w-2.5 animate-ping rounded-full bg-brand opacity-50 motion-reduce:animate-none" />
            )}
            <p className="font-mono text-xs text-ink-3">
              {job.period} · {job.place}
            </p>
            <h3 className="mt-1.5 text-lg leading-snug font-semibold text-ink">
              {job.role}
              <span className="text-ink-3"> · </span>
              {job.orgUrl ? <ExternalLink href={job.orgUrl}>{job.org}</ExternalLink> : job.org}
            </h3>
            <Points items={job.points} />
            <Tags items={job.stack} />
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

function Projects() {
  return (
    <>
      <div className="space-y-16">
        {featured.map((p) => (
          <Reveal key={p.title}>
            <FeaturedProject project={p} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-20 mb-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
          More projects
        </h3>
        <ul className="divide-y divide-line border-b border-line">
          {otherProjects.map((p) => (
            <li key={p.title} className="flex gap-5 py-6">
              <img
                src={p.thumb}
                alt=""
                loading="lazy"
                width={1600}
                height={1000}
                className="hidden h-[72px] w-28 shrink-0 rounded-md border border-line object-cover object-top sm:block"
              />
              <div className="min-w-0">
                <p className="font-mono text-xs text-ink-3">
                  {p.year} · {p.kind}
                </p>
                <h4 className="mt-1 font-semibold text-ink">{p.title}</h4>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{p.summary}</p>
                <p className="mt-2 font-mono text-[11px] text-ink-3">{p.stack.join(" · ")}</p>
                <ProjectLinks project={p} />
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}

function FeaturedProject({ project: p }: { project: Project }) {
  const href = p.live ?? p.github;
  const image = (
    <img
      src={p.thumb}
      alt={`Screenshot of ${p.title}`}
      loading="lazy"
      width={1600}
      height={1000}
      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
    />
  );
  return (
    <article className="group">
      <div className="overflow-hidden rounded-xl border border-line bg-paper-2">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
            {image}
          </a>
        ) : (
          image
        )}
      </div>
      <div className="mt-5">
        <p className="font-mono text-xs text-ink-3">
          {p.year} · {p.kind}
        </p>
        <h3 className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-semibold tracking-tight text-ink">
          {p.title}
          {p.badge && (
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-normal text-brand">
              {p.badge}
            </span>
          )}
        </h3>
        <p className="mt-2 text-[17px] leading-relaxed text-ink">{p.summary}</p>
        {p.points && <Points items={p.points} />}
        <Tags items={p.stack} />
        <ProjectLinks project={p} />
      </div>
    </article>
  );
}

function ProjectLinks({ project: p }: { project: Project }) {
  if (!p.live && !p.github) return null;
  return (
    <div className="mt-4 flex gap-5 text-sm font-medium">
      {p.live && <ExternalLink href={p.live}>Live demo</ExternalLink>}
      {p.github && <ExternalLink href={p.github}>Source code</ExternalLink>}
    </div>
  );
}

function Skills() {
  return (
    <Reveal>
      <dl className="divide-y divide-line border-y border-line">
        {skills.map((s) => (
          <div key={s.group} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="font-mono text-xs uppercase tracking-wider text-ink-3 sm:pt-0.5">
              {s.group}
            </dt>
            <dd className="leading-relaxed text-ink">{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function Achievements() {
  return (
    <Reveal>
      <ul className="divide-y divide-line border-y border-line">
        {achievements.map((a) => (
          <li
            key={a.event}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-medium text-ink">
                {a.title} <span className="font-normal text-ink-2">— {a.event}</span>
              </p>
              <p className="text-sm text-ink-3">{a.where}</p>
            </div>
            <p className="shrink-0 font-mono text-xs text-ink-3">{a.date}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Reveal>
      <h3 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Let's build something together.
      </h3>
      <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-ink-2">
        I'm open to software engineering and AI engineering roles. If you're hiring, building
        something interesting, or have a question about anything on this page, email is the best way
        to reach me.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          <Mail className="h-4 w-4" />
          Email me
        </a>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-xs text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : profile.email}
        </button>
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-3"
        >
          <Download className="h-4 w-4" />
          Resume
        </a>
      </div>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        <li>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
        </li>
        <li>
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
        </li>
        <li>
          <a href={profile.phoneHref} className="text-ink-2 transition-colors hover:text-ink">
            {profile.phone}
          </a>
        </li>
      </ul>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line pt-8 pb-4 text-sm text-ink-3">
      <p className="text-ink">You made it to the end — thanks for reading.</p>
      <p className="mt-1">
        © 2026 {profile.name}. Designed and built with React, TanStack Start and Tailwind CSS.
      </p>
      <a
        href="#top"
        className="mt-6 inline-flex items-center gap-1.5 transition-colors hover:text-ink"
      >
        Back to top <ArrowUp className="h-3.5 w-3.5" />
      </a>
    </footer>
  );
}

/* ───────────────────────── Building blocks ───────────────────────── */

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink-2">
      {items.map((p) => (
        <li key={p} className="flex gap-3">
          <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-ink-3" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-ink-2"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex items-center gap-0.5 text-ink transition-colors hover:text-brand"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand"
    />
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // The last section is short, so it never reaches the middle band; mark it when at the bottom.
    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) setActive(ids[ids.length - 1]);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.6.23 2.78.12 3.08.74.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
