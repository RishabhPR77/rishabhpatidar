import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ProjectCard } from "@/components/ProjectCard";
import ScrollScene from "@/components/ScrollScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rishabh Patidar — Data Scientist & ML Engineer" },
      { name: "description", content: "Portfolio of Rishabh Patidar — B.Tech IT undergrad at MITS Gwalior building production ML systems, RAG pipelines and LLM-powered analytics. Open to internships." },
      { property: "og:title", content: "Rishabh Patidar — Data Scientist & ML Engineer" },
      { property: "og:description", content: "Production ML, RAG and LLM systems. Research assistant at MITS Gwalior. Open to internships." },
    ],
  }),
  component: Index,
});

const projects = [
  {
    num: "01",
    tag: "RAG · LLM SYSTEMS",
    year: "2026",
    title: "Code Archaeologist",
    body: "Production RAG pipeline that ingests any public GitHub repo, classifies commits by developer intent, and answers \"why\" questions over commit history with grounded LLM citations.",
    stack: ["Pinecone", "BGE Embeddings", "BM25", "LLaMA-3.3-70B", "Groq API", "Redis", "Streamlit"],
    metrics: [
      { val: "60/40", label: "Dense/BM25" },
      { val: "6", label: "Analysis Modes" },
      { val: "Multi", label: "Namespaces" },
      { val: "TTL", label: "Auto-cleanup" },
    ],
    github: "https://github.com/RishabhPR77/code-archaeologist-demo",
    live: "https://code-archaeology-rag.streamlit.app",
    color: "#0ea5e9",
    thumb: "/thumbnails/code-arch.png",
  },
  {
    num: "02",
    tag: "FULL-STACK · ML SAAS",
    year: "2026",
    title: "SponsorWise",
    body: "Event sponsorship intelligence platform on a distributed microservices model — FastAPI inference engine, Node/Express backend, React 18 SPA, real-time Socket.IO negotiation rooms with RBAC.",
    stack: ["React 18", "FastAPI", "XGBoost", "MongoDB", "Socket.IO", "Groq API"],
    metrics: [
      { val: "0.96", label: "Model R²" },
      { val: "215.6", label: "RMSE" },
      { val: "100%", label: "Safe Preds" },
      { val: "JWT", label: "+ RBAC" },
    ],
    github: "https://github.com/RishabhPR77/eventsight",
    color: "#22c55e",
    thumb: "/thumbnails/footfall.png",
  },
  {
    num: "03",
    tag: "CHURN INTELLIGENCE",
    year: "2025",
    title: "Customer Segmentation & Churn",
    body: "Engineered 22 RFM features from 2.5M+ raw transactions via a modular SQL-to-Pandas ETL pipeline, then surfaced a 15.7% churn cohort and translated probabilities into a $233K revenue-at-risk estimate.",
    stack: ["Scikit-learn", "XGBoost", "SHAP", "SMOTE", "Streamlit", "SQL"],
    metrics: [
      { val: "2.5M+", label: "Transactions" },
      { val: "0.8793", label: "ROC-AUC" },
      { val: "$233K", label: "At-Risk" },
      { val: "4", label: "Segments" },
    ],
    github: "https://github.com/RishabhPR77/customer-churn",
    live: "https://customer-churn-dunhumby.streamlit.app/",
    color: "#00d4ff",
    thumb: "/thumbnails/churn.png",
  },
  {
    num: "04",
    tag: "BOX OFFICE · LLM",
    year: "2025",
    title: "CinemaIQ",
    body: "Box office intelligence platform with novel actor/director/composer power-indices, five benchmarked regression models, and LLaMA-3.3 commentary served through a 3-tab Streamlit forecasting dashboard.",
    stack: ["XGBoost", "Plotly", "Streamlit", "Groq API", "LLaMA 3.3"],
    metrics: [
      { val: "5", label: "Models" },
      { val: "30+", label: "Features" },
      { val: "3-Tab", label: "Dashboard" },
      { val: "AI", label: "Commentary" },
    ],
    github: "https://github.com/RishabhPR77/movie-success-predictor",
    live: "https://movie-success-predictor-xu2vnp53g3jg8a3pmrr3k3.streamlit.app/",
    color: "#ff8c42",
    thumb: "/thumbnails/cinemaiq.png",
  },
  {
    num: "05",
    tag: "COMPUTER VISION",
    year: "2025",
    title: "Video Target ID",
    body: "Forensic biometric pipeline fusing InsightFace 512-d ArcFace embeddings with MediaPipe 12-d pose descriptors via weighted cosine similarity for cross-camera person re-identification.",
    stack: ["InsightFace", "MediaPipe", "OpenCV", "Streamlit", "ArcFace"],
    metrics: [
      { val: "512-d", label: "Face Embed" },
      { val: "12-d", label: "Pose Vec" },
      { val: "0.7/0.3", label: "Fusion" },
      { val: "Multi", label: "CCTV Scan" },
    ],
    github: "https://github.com/RishabhPR77/video-target-id",
    live: "https://video-target-id-lnjmjrh3ap8jafch7wrbme.streamlit.app/",
    color: "#a855f7",
    thumb: "/thumbnails/vtis.png",
  },
];

const achievements = [
  { y: "FEB 2026", t: "1st Runner-Up", s: "SSH '26 National Hackathon", c: "#00d4ff" },
  { y: "APR 2026", t: "Top Performer · WebDev", s: "Hacksagon · ABV IIITM Gwalior", c: "#ff8c42" },
  { y: "OCT 2025", t: "Finalist", s: "ABV-IIITM Hackatron × GitHub", c: "#a855f7" },
  { y: "2025", t: "NPTEL · 73/100", s: "Math Foundations of ML · IIT Madras", c: "#22c55e" },
];

function Index() {
  return (
    <div id="scroll-root" className="relative h-screen overflow-y-auto overflow-x-hidden text-white bg-[#04040a]">
      <ScrollScene />
      {/* readability vignette */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,4,10,0.55)_70%,rgba(4,4,10,0.85)_100%)]" />
      <Cursor />
      <ScrollBar />
      <Nav />

      <main className="relative">
        {/* HERO */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto w-full"
          >
            <div className="font-mono text-[11px] tracking-[0.4em] text-[#00d4ff] mb-6 flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              OPEN TO INTERNSHIPS · SUMMER 2026
            </div>
            <h1 className="text-[clamp(2.75rem,12vw,11rem)] leading-[0.9] font-semibold tracking-[-0.02em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              <span className="block">RISHABH</span>
              <span className="block">PATIDAR<span className="text-[#00d4ff]">.</span></span>
            </h1>

            <RoleRotator />

            <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <p className="max-w-md text-white/80 text-lg leading-relaxed backdrop-blur-sm">
                B.Tech IT undergrad at MITS Gwalior. I build production ML systems — from 2.5M-transaction churn pipelines to LLM-powered RAG over Git history.
              </p>
              <div className="font-mono text-xs text-white/60 tracking-widest">
                MITS GWALIOR · CGPA 8.124 · IT 2027
              </div>
            </div>
          </motion.div>

          <ScrollHint />
        </section>





        {/* ABOUT */}
        <section id="about" className="relative z-10 min-h-screen flex items-center px-6 md:px-12 py-32">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-8">
            <StickyLabel n="001" label="WHO" />
            <Reveal className="md:col-span-8 space-y-6">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                I build <span className="text-[#00d4ff]">production ML</span> systems that ship.
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl backdrop-blur-sm">
                Final-year Information Technology student at MITS Gwalior working under Dr. Neha Bhardwaj as an Undergraduate Research Assistant. I work across the stack — feature engineering with Pandas, training XGBoost & boosted ensembles, then shipping behind FastAPI and Streamlit. Recently obsessed with hybrid retrieval and LLM-grounded analytics.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
                {[
                  { k: "CGPA", v: "8.124" },
                  { k: "BEST R²", v: "0.96" },
                  { k: "ROC-AUC", v: "0.88" },
                  { k: "ROWS", v: "2.5M+" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
                    <div className="font-mono text-[10px] tracking-widest text-[#00d4ff]">{s.k}</div>
                    <div className="text-3xl font-semibold mt-1 font-mono tabular-nums">{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SKILLS */}
        <SkillsSection />

        {/* RESEARCH */}
        <section id="research" className="relative z-10 min-h-screen flex items-center px-6 md:px-12 py-32">

          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-8">
            <StickyLabel n="003" label="RESEARCH" />
            <Reveal className="md:col-span-8 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
                <div className="text-white/50 font-mono text-xs mb-2">JAN — MAY 2026 · MITS GWALIOR</div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight">Undergraduate Research Assistant</h3>
                <div className="text-white/60 mb-5 font-mono text-sm">Supervisor: Dr. Neha Bhardwaj · Dept. of Information Technology</div>
                <ul className="space-y-3 text-white/75">
                  {[
                    "EDA over 50+ event marketing features; reduced model noise by 30% through correlation analysis and domain-informed feature selection.",
                    "Two-stage XGBoost regressor (R²=0.96, RMSE 215.6 vs 1,452.3 baseline) with GridSearchCV hyperparameter tuning.",
                    "Dynamic Physical Clamping algorithm enforces hard venue-capacity constraints at inference — zero invalid predictions on 100% of test cases.",
                    "Integrated LLaMA-3.3-70B via Groq API for brand-event synergy scoring, deployed as a stateless FastAPI microservice with zero-trust key validation.",
                  ].map((b) => (
                    <li key={b} className="flex gap-3"><span className="text-[#00d4ff] font-mono shrink-0">▸</span><span>{b}</span></li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t border-white/10 text-white/50 text-sm italic">
                  Academic report "SponsorWise: An AI-Powered Event Sponsorship Intelligence Platform" — approved and signed by faculty and Head of Department.
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="relative z-10 px-6 md:px-12 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <StickyLabel inline n="004" label="SELECTED WORK" />
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3">
                  Projects<span className="text-[#00d4ff]">.</span>
                </h2>
              </div>
              <div className="hidden md:block font-mono text-xs text-white/50 max-w-[200px]">
                hover any card →<br/>tilts in 3D
              </div>
            </div>
            <div className="space-y-8">
              {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="wins" className="relative z-10 px-6 md:px-12 py-32">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
            <StickyLabel n="005" label="WINS & CERTS" />
            <Reveal className="md:col-span-8 grid sm:grid-cols-2 gap-4">
              {achievements.map((a) => (
                <motion.div key={a.t + a.s} whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 cursor-default">
                  <div className="w-10 h-10 rounded-full mb-3" style={{ background: `radial-gradient(circle at 30% 30%, ${a.c}, transparent 70%)`, boxShadow: `0 0 30px ${a.c}` }} />
                  <div className="font-mono text-[10px] tracking-widest" style={{ color: a.c }}>{a.y}</div>
                  <div className="text-lg font-semibold mt-1 tracking-tight">{a.t}</div>
                  <div className="text-white/60 text-sm mt-1">{a.s}</div>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative z-10 min-h-screen flex items-center px-6 md:px-12 py-32">
          <div className="max-w-6xl mx-auto w-full">
            <Reveal>
              <StickyLabel inline n="006" label="LET'S TALK" />
              <h2 className="text-[clamp(2.5rem,10vw,8rem)] leading-[0.95] font-semibold tracking-[-0.02em] mt-4">
                Building something <span className="italic font-light text-[#00d4ff]">data driven?</span>
              </h2>
              <p className="mt-6 text-white/60 max-w-lg text-lg">
                Open to internships, research collaborations, and full-time roles in Data Science & ML. Let's talk.
              </p>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-2 gap-4">
              {[
                { k: "EMAIL", v: "rishabhpatidar400@gmail.com", h: "mailto:rishabhpatidar400@gmail.com", c: "#00d4ff", icon: "mail" },
                { k: "PHONE", v: "+91 9098729516", h: "tel:+919098729516", c: "#22c55e", icon: "phone" },
                { k: "GITHUB", v: "github.com/RishabhPR77", h: "https://github.com/RishabhPR77", c: "#ffffff", icon: "github" },
                { k: "LINKEDIN", v: "/in/rishabh-ptdr", h: "https://linkedin.com/in/rishabh-ptdr", c: "#0ea5e9", icon: "linkedin" },
                { k: "RESUME", v: "Download PDF · 2 pages", h: "/Rishabh Patidar.pdf", c: "#ff8c42", icon: "doc" },
              ].map((c, i) => <ContactCard key={c.k} {...c} index={i} />)}
            </div>
          </div>
        </section>

        <footer className="relative z-10 px-6 md:px-12 py-10 border-t border-white/10 font-mono text-[10px] tracking-widest text-white/40 flex justify-between backdrop-blur-md bg-black/30">
          <span>© 2026 RISHABH PATIDAR</span>
          <span className="hidden md:inline">CRAFTED WITH THREE.JS · REACT · ☕</span>
          <span>SCROLL TO RESTART ↑</span>
        </footer>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="font-mono text-xs tracking-[0.3em] text-white">RP<span className="text-[#00d4ff]">.</span></div>
      <div className="hidden md:flex gap-8 font-mono text-[11px] tracking-widest text-white/60">
        <a href="#about" className="hover:text-white transition">ABOUT</a>
        <a href="#skills" className="hover:text-white transition">SKILLS</a>

        <a href="#research" className="hover:text-white transition">RESEARCH</a>
        <a href="#work" className="hover:text-white transition">WORK</a>
        <a href="#wins" className="hover:text-white transition">WINS</a>
        <a href="#contact" className="hover:text-white transition">CONTACT</a>
      </div>
      <a href="mailto:rishabhpatidar400@gmail.com" className="font-mono text-[11px] tracking-widest px-4 py-2 rounded-full border border-white/20 hover:bg-[#00d4ff] hover:text-[#04040a] hover:border-[#00d4ff] transition">
        HIRE ME ↗
      </a>
    </nav>
  );
}

function StickyLabel({ n, label, inline = false }: { n: string; label: string; inline?: boolean }) {
  if (inline) return <div className="font-mono text-[11px] tracking-[0.3em] text-[#00d4ff]">⏵ {n} / {label}</div>;
  return (
    <div className="md:col-span-4">
      <div className="md:sticky md:top-32 font-mono text-[11px] tracking-[0.3em] text-[#00d4ff]">⏵ {n} / {label}</div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, from = "up" }: { children: React.ReactNode; className?: string; delay?: number; from?: "up" | "left" | "right" }) {
  const initial =
    from === "left" ? { opacity: 0, x: -70, y: 0, filter: "blur(6px)" } :
    from === "right" ? { opacity: 0, x: 70, y: 0, filter: "blur(6px)" } :
    { opacity: 0, x: 0, y: 50, filter: "blur(6px)" };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  );
}


function ScrollBar() {
  const { scrollYProgress } = useScroll({ container: typeof window !== "undefined" ? { current: document.getElementById("scroll-root") } as any : undefined });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4ff] via-[#ff8c42] to-[#00d4ff] z-50 origin-left" style={{ scaleX }} />;
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/60 tracking-widest flex flex-col items-center gap-2 pointer-events-none">
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-px h-10 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent" />
      SCROLL · MOVE CURSOR
    </div>
  );
}

function RoleRotator() {
  const roles = [
    { t: "DATA SCIENTIST", c: "#00d4ff" },
    { t: "ML ENGINEER", c: "#22c55e" },
    { t: "AI ENGINEER", c: "#a855f7" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, []);
  const r = roles[i];
  return (
    <div className="mt-8 flex items-center gap-4 flex-wrap">
      <div className="font-mono text-[11px] tracking-[0.4em] text-white/40">I AM A</div>
      <div className="relative h-10 md:h-12 overflow-hidden flex items-center px-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md min-w-[230px] md:min-w-[280px]">
        <motion.div
          key={r.t}
          initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-sm md:text-base font-semibold tracking-[0.25em] flex items-center gap-2"
          style={{ color: r.c }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: r.c, boxShadow: `0 0 12px ${r.c}` }} />
          {r.t}
        </motion.div>
      </div>
      <div className="hidden md:flex gap-2">
        {roles.map((_, k) => (
          <span key={k} className="block h-1 rounded-full transition-all" style={{ width: k === i ? 28 : 10, background: k === i ? roles[k].c : "rgba(255,255,255,0.18)" }} />
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  const groups = [
    {
      g: "LANGUAGES",
      c: "#00d4ff",
      icon: "{}",
      items: ["Python", "SQL", "TypeScript", "Java", "C / C++"],
    },
    {
      g: "AI · LLM",
      c: "#a855f7",
      icon: "✦",
      items: ["RAG", "Vector Embeddings", "Sentence Transformers", "Prompt Engineering", "LLaMA-3.3-70B", "Groq API", "Hybrid Search (Dense + BM25)", "Pinecone", "Redis", "Whisper (Audio)", "Semantic Similarity"],
    },
    {
      g: "ML · MODELLING",
      c: "#ff8c42",
      icon: "◆",
      items: ["Scikit-learn", "XGBoost", "Random Forest", "Gradient Boosting", "KMeans", "PCA", "SHAP", "SMOTE", "RFM Analysis", "Feature Engineering", "Hyperparameter Tuning", "A/B Testing", "Hypothesis Testing"],
    },
    {
      g: "DATA · ANALYTICS",
      c: "#22c55e",
      icon: "▤",
      items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "SciPy", "Statsmodels", "Excel"],
    },
    {
      g: "WEB · DEPLOYMENT",
      c: "#0ea5e9",
      icon: "▲",
      items: ["React 18", "Node.js", "Express.js", "FastAPI", "Pydantic V2", "MongoDB", "Socket.IO", "Streamlit", "REST APIs", "WebSockets", "JWT", "RBAC"],
    },
    {
      g: "COMPUTER VISION",
      c: "#f43f5e",
      icon: "◉",
      items: ["InsightFace (ArcFace)", "MediaPipe (468-pt Face Mesh)", "OpenCV", "face-api.js"],
    },
    {
      g: "TOOLS",
      c: "#eab308",
      icon: "⚙",
      items: ["Git", "GitPython", "Docker (basic)", "Jupyter", "Google Colab", "Vercel", "Cloudinary CDN"],
    },
  ];
  return (
    <section id="skills" className="relative z-10 px-6 md:px-12 py-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        <StickyLabel n="002" label="SKILLS" />
        <div className="md:col-span-8">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-3">
              Technical skills<span className="text-[#00d4ff]">.</span>
            </h2>
            <p className="text-white/60 max-w-xl mb-10">
              Languages, frameworks and tools I work with — grouped by what they actually do.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {groups.map((grp, gi) => (
              <Reveal key={grp.g} from={gi % 2 === 0 ? "left" : "right"} delay={gi * 0.06}>
                <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 overflow-hidden transition-colors hover:border-white/25 h-full">
                  <span
                    className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 group-hover:opacity-60 transition-opacity blur-2xl"
                    style={{ background: grp.c }}
                  />
                  <div className="relative flex items-center gap-3 mb-5">
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
                      style={{ background: `${grp.c}1f`, color: grp.c, border: `1px solid ${grp.c}55` }}
                    >
                      {grp.icon}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: grp.c }}>{`0${gi + 1}`}</div>
                      <div className="font-semibold text-white text-base tracking-tight">{grp.g}</div>
                    </div>
                  </div>
                  <div className="relative flex flex-wrap gap-1.5">
                    {grp.items.map((it) => (
                      <span
                        key={it}
                        className="font-mono text-[11px] tracking-wide px-2.5 py-1 rounded-md border border-white/10 bg-black/30 text-white/75 hover:text-white transition-colors"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



const ICONS: Record<string, React.ReactNode> = {
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.6.23 2.78.12 3.08.74.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>,
};

function ContactCard({ k, v, h, c, icon, index }: { k: string; v: string; h: string; c: string; icon: string; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });
  const fromLeft = index % 2 === 0;
  return (
    <motion.a
      ref={ref}
      href={h}
      target={h.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, x: fromLeft ? -80 : 80, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}

      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-6 flex items-center gap-5 overflow-hidden transition-colors hover:border-white/30"
    >
      {/* hover gradient wash */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(420px circle at 0% 100%, ${c}22, transparent 60%)` }}
      />
      {/* icon tile */}
      <div
        className="relative shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border transition-all group-hover:scale-105"
        style={{ background: `${c}14`, borderColor: `${c}40`, color: c, boxShadow: `0 0 0 0 ${c}` }}
      >
        <span className="w-6 h-6 block">{ICONS[icon]}</span>
      </div>
      {/* text */}
      <div className="relative flex-1 min-w-0">
        <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: c }}>{k}</div>
        <div className="text-base md:text-lg mt-1 truncate text-white group-hover:text-white transition">{v}</div>
      </div>
      {/* arrow */}
      <div
        className="relative shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all group-hover:rotate-[-45deg]"
        style={{ borderColor: `${c}66`, color: c }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M5 12h14M13 5l7 7-7 7"/>
        </svg>
      </div>
    </motion.a>
  );
}

function Cursor() {
  const x = useSpring(0, { stiffness: 500, damping: 28 });
  const y = useSpring(0, { stiffness: 500, damping: 28 });
  const rx = useSpring(0, { stiffness: 120, damping: 18 });
  const ry = useSpring(0, { stiffness: 120, damping: 18 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY); rx.set(e.clientX); ry.set(e.clientY);
      const tgt = e.target as HTMLElement;
      setHover(!!tgt.closest("a,button,[data-cursor=hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, rx, ry]);
  return (
    <>
      <motion.div style={{ x, y }} className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00d4ff] mix-blend-difference hidden md:block" />
      <motion.div style={{ x: rx, y: ry, scale: hover ? 1.8 : 1 }} className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/40 mix-blend-difference hidden md:block" />
    </>
  );
}
