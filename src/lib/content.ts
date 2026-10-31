// All portfolio copy lives here so the page components stay purely presentational.

export const profile = {
  name: "Rishabh Patidar",
  role: "Software Engineer · Backend & AI",
  tagline: "I build backend services, integrations and AI systems that hold up in production.",
  status: "Open to SDE & AI engineering roles",
  now: { label: "SDE Intern", org: "MSG91 (Walkover)" },
  email: "rishabhpatidar400@gmail.com",
  phone: "+91 90987 29516",
  phoneHref: "tel:+919098729516",
  github: "https://github.com/RishabhPR77",
  linkedin: "https://linkedin.com/in/rishabh-ptdr",
  resume: "/Rishabh_Patidar_Resume.pdf",
  site: "https://rishabh.isonewho.codes",
};

export const about = {
  paragraphs: [
    "I'm a final-year Information Technology student at MITS Gwalior and an SDE intern at MSG91 (Walkover), where I'm helping build M91 — an alerting platform that keeps escalating a critical notification through push, SMS and voice calls until a real person acknowledges it.",
    "Before that, I built seven different kinds of RAG systems as an AI engineer intern at CogKnowEdge and shipped them on GCP Cloud Run. As a research assistant, I built an XGBoost pipeline that cut prediction error by 85% and never predicts something physically impossible.",
    "Most of my work sits where backend engineering meets AI: APIs and integrations, databases, retrieval, and LLMs that have to stay grounded in real data. I care about things that work outside a notebook, so most of the projects below come with a live demo.",
  ],
  facts: [
    { k: "Currently", v: "SDE Intern at MSG91 (Walkover)" },
    { k: "Studying", v: "B.Tech IT, MITS Gwalior" },
    { k: "CGPA", v: "8.12 / 10", count: 8.12 },
    { k: "Graduating", v: "May 2027" },
  ],
};

export type Job = {
  role: string;
  org: string;
  place: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    role: "Software Development Engineer (SDE) Intern",
    org: "MSG91 (Walkover)",
    place: "Indore, MP",
    period: "Oct 2026 — Present",
    current: true,
    points: [
      "Co-building M91, a human-in-the-loop alert escalation platform that routes critical notifications through push, SMS and voice calls until someone acknowledges them. Shipped multiple alerting features to production.",
      "Built the M91 plugin for viaSocket, a no-code automation platform: actions to send, fetch and close direct and channel alerts and to manage channels and recipients — so events from 1,500+ apps can now trigger an M91 alert.",
      "Wrote viaSocket plugins that integrate third-party apps through their APIs (triggers, actions and auth), plus automation workflows for the upcoming human-alert feature at MSG91 (Walkover).",
    ],
    stack: ["REST APIs", "Third-party integrations", "viaSocket", "Workflow automation"],
  },
  {
    role: "AI Engineer Intern (GenAI & Agentic AI)",
    org: "CogKnowEdge Solutions",
    place: "Remote",
    period: "Aug — Sep 2026",
    points: [
      "Designed and built 7+ RAG systems — Agentic, Hybrid, Graph, Multi-Vector, OCR and Vectorless RAG — with LangChain, LangGraph, Qdrant and Neo4j for enterprise GenAI training programs.",
      "Containerised the apps with Docker and deployed them to GCP Cloud Run, backed by MongoDB Atlas Vector Search and Supabase (PostgreSQL).",
      "Prototyped LLM applications with OpenAI, Claude, Gemini and LangFlow for consulting use cases, and wrote the lab guides that go with them.",
    ],
    stack: ["LangChain", "LangGraph", "Qdrant", "Neo4j", "Docker", "GCP Cloud Run"],
  },
  {
    role: "Undergraduate Research Assistant",
    org: "Madhav Institute of Technology & Science",
    place: "Gwalior, MP",
    period: "Jan — May 2026",
    points: [
      "Built a two-stage XGBoost regression pipeline (R² = 0.96) with 85% lower RMSE than the baseline (215.6 vs 1,452.3). A clamping step bounds every output to physical limits, so it never makes an invalid prediction.",
      "Built a stateless FastAPI microservice that calls LLM APIs to score brand–event synergy and return structured JSON negotiation reports, validating an API key on every request.",
      "Ran EDA on 50+ features; correlation-driven feature selection cut model noise by 30%.",
    ],
    stack: ["XGBoost", "FastAPI", "Pydantic", "LLM APIs", "Pandas"],
  },
];

export type Project = {
  title: string;
  kind: string;
  year: string;
  summary: string;
  points?: string[];
  badges?: string[];
  stack: string[];
  thumb: string;
  github?: string;
  live?: string;
  note?: string;
};

export const featured: Project[] = [
  {
    title: "Code Archaeologist",
    kind: "Git history RAG platform",
    year: "2026",
    badges: ["Live in production"],
    summary:
      "Connect a GitHub repository and ask why any code was written, in plain English. Answers come from its commits, pull requests and code reviews, with links to the sources — plus file timelines, hot spots and who owns what.",
    points: [
      "Multi-user web app that ingests a repo's commits, diffs, PRs and reviews — public, or private through a read-only GitHub App — then answers “why was this written?” citing the source commit SHAs. Runs as one Docker container on Render with Neon PostgreSQL and Pinecone.",
      "Hybrid retrieval: Pinecone dense search plus BM25 reranking at 60/40, with per-user, per-repo namespaces. Ingestion runs as background jobs with live progress and commit-intent classification.",
      "Bring your own model: adapters for 5 LLM providers (Anthropic, OpenAI, Gemini, Groq, OpenRouter) with live model discovery, and API keys encrypted at rest with Fernet.",
      "Secured with httpOnly JWT sessions, bcrypt, GitHub App and Google OAuth (PKCE), email verification and per-IP rate limiting. Covered by 70+ pytest tests, with Alembic migrations.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Pinecone", "React", "TypeScript", "Docker"],
    thumb: "/thumbnails/code-arch.webp",
    github: "https://github.com/RishabhPR77/code-archaeology-rag",
    live: "https://code-archaeologist-a9ms.onrender.com/",
    note: "Runs on Render's free tier, so the first visit can take about a minute to wake up.",
  },
  {
    title: "Tejaskrit",
    kind: "AI interview practice platform",
    year: "2026",
    badges: ["Live in production", "1st Runner-Up · SSH '26"],
    summary:
      "Practice interviews written from a real job description and your resume, with follow-ups when you're vague — then a scored report on what you said, how you said it and how you came across.",
    points: [
      "Took our SSH '26 1st Runner-Up team project to production on Azure (Docker, Caddy HTTPS, PostgreSQL). It reads a JD and resume, generates role-tailored questions, and runs a video interview with adaptive follow-ups.",
      "Built a two-stage answer pipeline. A quick pass (ffmpeg, speech-to-text, librosa audio signals and a fast-model first estimate) picks the next question in seconds, then a low-priority background queue runs MediaPipe eye-contact and posture analysis and full rubric scoring.",
      "The hire / no-hire report builds in the background with live progress, is emailed if you've left the page, and exports to PDF.",
      "Added passwordless email-code sign-in with rate limits, bring-your-own keys for 5 LLM providers, and database-persisted sessions. Tuned peak memory to about 550 MB so it runs on a 1 GB VM.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "MediaPipe",
      "Docker",
      "Azure",
    ],
    thumb: "/thumbnails/ai-interview.webp",
    github: "https://github.com/RishabhPR77/ai-interview",
    live: "https://tejaskrit-rishabh.koreacentral.cloudapp.azure.com/",
  },
  {
    title: "Customer Segmentation & Churn",
    kind: "ML · retention analytics",
    year: "2025",
    summary:
      "Finds which households are about to stop shopping, and puts a dollar figure on what that would cost.",
    points: [
      "Engineered 22 RFM features from 2.5M+ transactions and segmented customers with KMeans (k = 4).",
      "Random Forest churn classifier at ROC-AUC 0.879; SHAP turns its predictions into a $233,917 revenue-at-risk estimate.",
    ],
    stack: ["Scikit-learn", "XGBoost", "SHAP", "SMOTE", "Pandas", "SQL", "Streamlit"],
    thumb: "/thumbnails/churn.webp",
    github: "https://github.com/RishabhPR77/customer-churn",
    live: "https://customer-churn-dunhumby.streamlit.app/",
  },
];

export const otherProjects: Project[] = [
  {
    title: "SponsorWise",
    kind: "Full-stack ML SaaS",
    year: "2026",
    summary:
      "Event sponsorship platform: FastAPI inference service, Node/Express backend, React SPA and real-time Socket.IO negotiation rooms.",
    stack: ["React", "FastAPI", "XGBoost", "MongoDB", "Socket.IO"],
    thumb: "/thumbnails/footfall.webp",
    github: "https://github.com/RishabhPR77/eventsight",
  },
  {
    title: "CinemaIQ",
    kind: "Box-office forecasting",
    year: "2025",
    summary:
      "Revenue forecasts from actor, director and composer power indices, five benchmarked models and LLM commentary.",
    stack: ["XGBoost", "Plotly", "Streamlit", "LLM APIs"],
    thumb: "/thumbnails/cinemaiq.webp",
    github: "https://github.com/RishabhPR77/movie-success-predictor",
    live: "https://movie-success-predictor-xu2vnp53g3jg8a3pmrr3k3.streamlit.app/",
  },
  {
    title: "Video Target ID",
    kind: "Computer vision",
    year: "2025",
    summary:
      "Finds the same person across CCTV feeds by fusing ArcFace face embeddings with MediaPipe pose descriptors.",
    stack: ["InsightFace", "MediaPipe", "OpenCV", "Streamlit"],
    thumb: "/thumbnails/vtis.webp",
    github: "https://github.com/RishabhPR77/video-target-id",
    live: "https://video-target-id-lnjmjrh3ap8jafch7wrbme.streamlit.app/",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "SQL", "Java", "C/C++"] },
  {
    group: "Backend & Web",
    items: [
      "FastAPI",
      "SQLAlchemy",
      "Pydantic",
      "REST APIs",
      "JWT & OAuth 2.0",
      "React",
      "API integrations",
      "viaSocket plugins",
    ],
  },
  {
    group: "Databases",
    items: ["PostgreSQL (Neon, Supabase)", "MongoDB (Atlas)", "SQLite", "Neo4j"],
  },
  {
    group: "AI & LLMs",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Pinecone",
      "Qdrant",
      "Atlas Vector Search",
      "OpenAI / Claude / Gemini",
    ],
  },
  {
    group: "ML & Data",
    items: [
      "Scikit-learn",
      "XGBoost",
      "SHAP",
      "Pandas",
      "NumPy",
      "OpenCV",
      "MediaPipe",
      "librosa",
      "Whisper",
    ],
  },
  {
    group: "Cloud & Tools",
    items: [
      "Docker",
      "Azure VM",
      "GCP Cloud Run",
      "Render",
      "Caddy",
      "Alembic",
      "pytest",
      "Git",
      "GitHub",
    ],
  },
];

export const achievements: {
  icon: "trophy" | "award" | "medal" | "cert";
  title: string;
  event: string;
  where: string;
  date: string;
}[] = [
  {
    icon: "trophy",
    title: "1st Place",
    event: "IKIGAI '26 National Hackathon",
    where: "AITR Indore",
    date: "Aug 2026",
  },
  {
    icon: "award",
    title: "Top Performer, Web Dev Track",
    event: "Hacksagon",
    where: "ABV-IIITM Gwalior",
    date: "Apr 2026",
  },
  {
    icon: "medal",
    title: "1st Runner-Up",
    event: "SSH '26 National Hackathon",
    where: "with team Tejaskrit",
    date: "Feb 2026",
  },
  {
    icon: "cert",
    title: "NPTEL Certification",
    event: "Mathematical Foundations of ML",
    where: "IIT Madras · 73/100",
    date: "2026",
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

// Rough reading time for the whole page, shown in the header so visitors know it's short.
const allText = [
  profile.tagline,
  ...about.paragraphs,
  ...experience.flatMap((j) => j.points),
  ...[...featured, ...otherProjects].flatMap((p) => [p.summary, ...(p.points ?? [])]),
].join(" ");
export const readingMinutes = Math.max(1, Math.round(allText.split(/\s+/).length / 230));
