import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  Copy,
  Download,
  Mail,
  Medal,
  Trophy,
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
  "Rishabh Patidar is a software engineer building backend services, integrations and AI systems. SDE Intern at MSG91 (Walkover), previously AI Engineer Intern at CogKnowEdge. B.Tech IT, MITS Gwalior.";

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

/* ───────────────────────── Motion presets ───────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;
const once = { once: true, margin: "0px 0px -60px 0px" };

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};
const chips: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.035 } } };
const chip: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease } },
};

function Index() {
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <MotionConfig reducedMotion="user">
      <ProgressBar />
      <CursorGlow />
      {/* Faint dot grid behind the top of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle,#d9d4cd_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent)] [background-size:22px_22px]"
      />
      <div
        id="top"
        className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-14 sm:px-12 md:py-20 lg:flex lg:justify-between lg:gap-12 lg:px-16 lg:py-0"
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
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
      >
        <motion.p
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs text-ink-2 shadow-[0_1px_2px_rgba(28,25,23,0.04)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.status}
        </motion.p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          <AnimatedName text={profile.name} />
        </h1>
        <motion.p variants={item} className="mt-3 text-lg font-medium text-ink">
          {profile.role}
        </motion.p>
        <motion.p variants={item} className="mt-4 max-w-sm leading-relaxed text-ink-2">
          {profile.tagline}
        </motion.p>
        <motion.p variants={item} className="mt-4 font-mono text-xs text-ink-3">
          Now: {profile.now.label} at {profile.now.org} ·{" "}
          <span className="whitespace-nowrap">{readingMinutes} min read</span>
        </motion.p>

        <motion.nav variants={item} aria-label="Sections" className="mt-14 hidden lg:block">
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
                          ? "w-14 bg-brand"
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
        </motion.nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="mt-8 flex flex-wrap items-center gap-2"
      >
        <BrandButton kind="github" href={profile.github} />
        <BrandButton kind="linkedin" href={profile.linkedin} />
        <IconButton href={`mailto:${profile.email}`} label="Email">
          <Mail className="h-4 w-4" />
        </IconButton>
        <IconButton href={profile.resume} label="Resume (PDF)">
          <Download className="h-4 w-4" />
        </IconButton>
      </motion.div>
    </header>
  );
}

function AnimatedName({ text }: { text: string }) {
  return (
    <a href="#top" aria-label={text} className="inline-block">
      {text.split(" ").map((word, wi) => (
        <span
          key={word}
          aria-hidden
          className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom last:mr-0"
        >
          {[...word].map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.2 + wi * 0.15 + ci * 0.035 }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </a>
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
        <h2 className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-ink">
          <span className="shrink-0">
            <span className="mr-3 text-brand">0{n}</span>
            {title}
          </span>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="h-px flex-1 origin-left bg-line"
          />
        </h2>
      </div>
      {children}
    </section>
  );
}

function About() {
  return (
    <>
      <motion.div
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={once}
        className="space-y-4 text-[17px] leading-relaxed text-ink-2"
      >
        {about.paragraphs.map((p) => (
          <motion.p key={p} variants={item}>
            {p}
          </motion.p>
        ))}
      </motion.div>
      <motion.dl
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={once}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {about.facts.map((f) => (
          <motion.div key={f.k} variants={item}>
            <Card className="h-full p-4">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-3">{f.k}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">
                {f.count !== undefined ? (
                  <>
                    <CountUp to={f.count} decimals={2} />
                    {f.v.replace(String(f.count), "")}
                  </>
                ) : (
                  f.v
                )}
              </dd>
            </Card>
          </motion.div>
        ))}
      </motion.dl>
    </>
  );
}

function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-1 space-y-8 border-l border-line">
      {/* Brand-colored line that draws down the timeline as you scroll */}
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute top-0 -left-px h-full w-px origin-top bg-brand"
      />
      {experience.map((job) => (
        <li key={job.role} className="relative pl-6 sm:pl-8">
          <motion.span
            aria-hidden
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className={`absolute top-7 -left-[5.5px] h-2.5 w-2.5 rounded-full ring-4 ring-paper ${
              job.current ? "bg-brand" : "bg-ink-3"
            }`}
          />
          {job.current && (
            <span
              aria-hidden
              className="absolute top-7 -left-[5.5px] h-2.5 w-2.5 animate-ping rounded-full bg-brand opacity-50 motion-reduce:animate-none"
            />
          )}
          <Reveal>
            <Card className="p-5 sm:p-6">
              <p className="font-mono text-xs text-ink-3">
                {job.period} · {job.place}
              </p>
              <h3 className="mt-1.5 text-lg leading-snug font-semibold text-ink">
                {job.role}
                <span className="text-ink-3"> · </span>
                {job.org}
              </h3>
              <Points items={job.points} />
              <Tags items={job.stack} />
            </Card>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

function Projects() {
  return (
    <>
      <div className="space-y-10">
        {featured.map((p) => (
          <Reveal key={p.title}>
            <FeaturedProject project={p} />
          </Reveal>
        ))}
      </div>

      <h3 className="mt-16 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
        More projects
      </h3>
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={once}
        className="space-y-3"
      >
        {otherProjects.map((p) => (
          <motion.li key={p.title} variants={item}>
            <Card className="flex gap-5 p-4 sm:p-5">
              <div className="hidden h-[76px] w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-paper-2 sm:block">
                <img
                  src={p.thumb}
                  alt=""
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-110"
                />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs text-ink-3">
                  {p.year} · {p.kind}
                </p>
                <h4 className="mt-1 font-semibold text-ink">{p.title}</h4>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{p.summary}</p>
                <p className="mt-2 font-mono text-[11px] text-ink-3">{p.stack.join(" · ")}</p>
                <ProjectLinks project={p} />
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
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
      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
    />
  );
  return (
    <Card>
      <div className="overflow-hidden border-b border-line bg-paper-2">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
            {image}
          </a>
        ) : (
          image
        )}
      </div>
      <div className="p-5 sm:p-6">
        <p className="font-mono text-xs text-ink-3">
          {p.year} · {p.kind}
        </p>
        <h3 className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-semibold tracking-tight text-ink">
          {p.title}
          {p.badges?.map((b) => (
            <span
              key={b}
              className="rounded-full bg-brand-soft px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-normal text-brand"
            >
              {b}
            </span>
          ))}
        </h3>
        <p className="mt-2 text-[17px] leading-relaxed text-ink">{p.summary}</p>
        {p.points && <Points items={p.points} />}
        <Tags items={p.stack} />
        <ProjectLinks project={p} />
      </div>
    </Card>
  );
}

function ProjectLinks({ project: p }: { project: Project }) {
  if (!p.live && !p.github) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {p.live && (
        <PillLink href={p.live}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live demo
        </PillLink>
      )}
      {p.github && (
        <PillLink href={p.github}>
          <GithubMark className="h-3.5 w-3.5" />
          Source code
        </PillLink>
      )}
      {p.note && <p className="w-full text-xs text-ink-3">{p.note}</p>}
    </div>
  );
}

function Skills() {
  return (
    <div className="space-y-6">
      {skills.map((s) => (
        <div key={s.group} className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink-3 sm:pt-2">
            {s.group}
          </h3>
          <motion.ul
            variants={chips}
            initial="hidden"
            whileInView="show"
            viewport={once}
            className="flex flex-wrap gap-2"
          >
            {s.items.map((t) => (
              <motion.li
                key={t}
                variants={chip}
                whileHover={{ y: -2 }}
                className="cursor-default rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-ink shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition-colors hover:border-brand/40 hover:text-brand"
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      ))}
    </div>
  );
}

const achievementIcons = { trophy: Trophy, award: Award, medal: Medal, cert: BadgeCheck };

function Achievements() {
  return (
    <motion.ul
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={once}
      className="grid gap-3 sm:grid-cols-2"
    >
      {achievements.map((a) => {
        const Icon = achievementIcons[a.icon];
        return (
          <motion.li key={a.event} variants={item}>
            <Card className="h-full p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-[11px] text-ink-3">{a.date}</p>
                  <p className="mt-0.5 font-semibold text-ink">{a.title}</p>
                  <p className="text-sm text-ink-2">{a.event}</p>
                  <p className="text-sm text-ink-3">{a.where}</p>
                </div>
              </div>
            </Card>
          </motion.li>
        );
      })}
    </motion.ul>
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
  const heading = "Let's build something together.";

  return (
    <div>
      <h3
        aria-label={heading}
        className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        {heading.split(" ").map((w, i) => (
          <span
            key={i}
            aria-hidden
            className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h3>
      <Reveal>
        <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-ink-2">
          I'm open to software engineering and AI engineering roles. If you're hiring, building
          something interesting, or have a question about anything on this page, email is the best
          way to reach me.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper shadow-sm transition-shadow hover:shadow-lg"
          >
            <Mail className="h-4 w-4" />
            Email me
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </motion.a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 font-mono text-xs text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-brand" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied!" : profile.email}
          </button>
          <PillLink href={profile.resume} size="lg">
            <Download className="h-4 w-4" />
            Resume
          </PillLink>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BrandButton kind="github" href={profile.github} />
          <BrandButton kind="linkedin" href={profile.linkedin} />
          <a
            href={profile.phoneHref}
            className="ml-1 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            {profile.phone}
          </a>
        </div>
      </Reveal>
    </div>
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
        className="group mt-6 inline-flex items-center gap-1.5 transition-colors hover:text-ink"
      >
        Back to top
        <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
      </a>
    </footer>
  );
}

/* ───────────────────────── Building blocks ───────────────────────── */

// White card that lifts on hover, with a soft spotlight that follows the cursor.
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group/card relative overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition-[box-shadow,border-color] duration-300 hover:border-[#d6d0c8] hover:shadow-[0_20px_40px_-24px_rgba(28,25,23,0.28)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), rgba(15,118,110,0.07), transparent 65%)",
        }}
      />
      {children}
    </motion.div>
  );
}

const brands = {
  github: {
    label: "GitHub",
    className: "bg-[#181717] text-white",
    Icon: GithubMark,
  },
  linkedin: {
    label: "LinkedIn",
    className: "bg-[#0A66C2] text-white",
    Icon: LinkedinBug,
  },
};

// Profile buttons in each platform's own colors and logo.
function BrandButton({ kind, href }: { kind: keyof typeof brands; href: string }) {
  const { label, className, Icon } = brands[kind];
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`group/brand inline-flex items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-medium shadow-sm transition-shadow hover:shadow-lg ${className}`}
    >
      <Icon className="h-4 w-4 transition-transform duration-300 group-hover/brand:scale-110" />
      {label}
    </motion.a>
  );
}

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <motion.a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-ink-2 shadow-sm transition-colors hover:border-ink-3 hover:text-ink"
    >
      {children}
    </motion.a>
  );
}

function PillLink({
  href,
  children,
  size = "md",
}: {
  href: string;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group/pill inline-flex items-center gap-2 rounded-full border border-line bg-card font-medium text-ink shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-3 hover:shadow-md ${
        size === "lg" ? "px-5 py-2.5 text-sm" : "px-3.5 py-1.5 text-sm"
      }`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 text-ink-3 transition-transform group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 group-hover/pill:text-ink" />
    </a>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={once}
      className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink-2"
    >
      {items.map((p) => (
        <motion.li key={p} variants={item} className="flex gap-3">
          <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-ink-3" />
          <span>{p}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={chips}
      initial="hidden"
      whileInView="show"
      viewport={once}
      className="mt-4 flex flex-wrap gap-1.5"
      aria-label="Technologies"
    >
      {items.map((t) => (
        <motion.li
          key={t}
          variants={chip}
          className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-2"
        >
          {t}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={once}
      transition={{ duration: 0.65, ease }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, decimals]);
  return (
    <span ref={ref} className="tabular-nums">
      {to.toFixed(decimals)}
    </span>
  );
}

// Soft brand-colored glow that follows the mouse on large screens.
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-0 transition-opacity duration-700 lg:block"
      style={{
        background:
          "radial-gradient(640px circle at var(--x) var(--y), rgba(15,118,110,0.07), transparent 70%)",
      }}
    />
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

/* ───────────────────────── Brand logos ───────────────────────── */

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinBug({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.889 1.637-1.84 3.37-1.84 3.601 0 4.267 2.37 4.267 4.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
