import React, { useEffect, useRef, useState } from "react";
import heroPhoto from "./imagee.jpg";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Quote,
  Rocket,
  X,
  Zap,
} from "lucide-react";

/* ─── constants ─────────────────────────────────────────────────────── */

const EMAIL = "saadpk848@gmail.com";
const GITHUB = "https://github.com/Saadkhan-777";
const LINKEDIN = "https://www.linkedin.com/in/saad-khan-a50953370/";

const spring = { type: "spring", stiffness: 260, damping: 25 };

const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Clients", href: "#clients" },
];

const HERO_WORKFLOWS = {
  "Agentic AI": [
    "User Query",
    "NVIDIA Nemotron Reasoning",
    "Tavily Live Web Search",
    "Validated Output",
  ],
  "Data Science": [
    "44k+ Raw Dataset",
    "Exploratory Data Analysis",
    "Scikit-Learn / NLTK Model",
    "Gradio Web App",
  ],
  Automation: [
    "Lead Capture Form",
    "Zapier / Landbot Logic",
    "Automated CRM & Email Pipeline",
  ],
};

const FOCUS_CARDS = [
  {
    icon: BookOpen,
    title: "Concepts First, Code Second",
    body: "Understanding probability distributions, model behavior, and system architecture before touching production code—so models are robust from day one.",
  },
  {
    icon: BrainCircuit,
    title: "Autonomous Agentic Workflows",
    body: "Designing multi-agent systems with NVIDIA Nemotron, Nebius Token Factory, and real-time Tavily search grounding for verifiable AI reasoning.",
  },
  {
    icon: Rocket,
    title: "End-to-End Delivery",
    body: "Taking projects from raw messy datasets and Figma prototypes all the way to live Gradio apps, Power BI dashboards, and Zapier pipelines.",
  },
];

const STATS = [
  { value: "4+", label: "End-to-End ML Suites" },
  { value: "5+", label: "Regional Business Clients" },
  { value: "10+", label: "Automated Workflows" },
  { value: "B.S. CS", label: "University of Peshawar · 2028" },
];

const PROJECT_TABS = ["All", "Agentic AI", "Data Science", "Automation"];

const PROJECTS = [
  {
    id: "peperio",
    title: "Peperio — Adversarial Pre-Mortem AI Platform",
    badge: "NVIDIA x Nebius Global AI Hackathon",
    category: "Agentic AI",
    description:
      "Multi-agent product validation platform that stress-tests startup ideas, uncovers failure modes, and grounds market research using real-time web search.",
    tags: ["NVIDIA Nemotron", "Nebius Token Factory", "Tavily Search", "Python"],
    href: GITHUB,
  },
  {
    id: "ainafit",
    title: "AinaFit — Smart Retail Virtual Try-On Display",
    badge: "BIC University of Peshawar Competition",
    category: "Agentic AI",
    description:
      "In-store interactive virtual try-on display system designed for retail clothing stores in Peshawar to boost shopper engagement and fitting speed.",
    tags: ["Computer Vision", "Retail AI", "Figma UI/UX"],
    href: GITHUB,
  },
  {
    id: "decodelab",
    title: "DecodeLab Data Science & NLP Suite",
    badge: "4-Project ML Portfolio",
    category: "Data Science",
    description:
      "End-to-end machine learning portfolio featuring Titanic survival EDA, Ramen ratings analysis, Telecom customer churn modeling, and an interactive NLTK sentiment analysis Gradio web app.",
    tags: ["Python", "Scikit-Learn", "NLTK", "Gradio", "Pandas"],
    href: GITHUB,
  },
  {
    id: "powerbi",
    title: "Enterprise Sales Analytics & Power BI Dashboard",
    badge: "Business Intelligence",
    category: "Data Science",
    description:
      "Centralized Python analytics repository paired with an interactive Power BI dashboard tracking regional sales performance and mobile KPIs.",
    tags: ["Power BI", "Python", "Data Modeling", "EDA"],
    href: GITHUB,
  },
  {
    id: "aistudios",
    title: "Custom AI Studios & Operational Automations",
    badge: "AI Ops & Workflows",
    category: "Automation",
    description:
      'Custom Gemini Gems ("SK Idea to Prompt Generator 2.0", "SK LinkedIn Content Studio 2.0"), multi-step Zapier automations (Google Forms, Sheets, Gmail), and Landbot conversational chatbots.',
    tags: ["Zapier", "Landbot", "Prompt Engineering", "Custom Gems"],
    href: GITHUB,
  },
];

const WORK_EXP = [
  {
    role: "Data Science Intern",
    org: "DecodeLab",
    year: "2026",
    detail:
      "Built four end-to-end data analysis, churn prediction, and NLP sentiment web applications.",
  },
  {
    role: "Co-Developer & Presenter",
    org: "AinaFit",
    year: "2026",
    detail:
      "Co-developed a virtual try-on retail display and pitched at the KP Youth Innovation & Entrepreneurship Competition (BIC, UoP).",
  },
  {
    role: "Graphic Design Intern",
    org: "Ad-Aim Marketing Agency",
    year: "",
    detail:
      "Created brand identities, social campaigns, and UI/UX prototypes in Figma and Canva.",
  },
];

const EDU = [
  {
    title: "B.S. in Computer Science",
    org: "University of Peshawar",
    meta: "5th Semester · Expected 2028",
  },
  {
    title: "Diploma in Information Technology (DIT)",
    org: "1-Year Technical Program",
    meta: "Completed",
  },
];

const CERTS = [
  "Generative AI — Arfa Karim Technology Incubator",
  "7-Day AI Bootcamp — CSSC-UOP",
  "Aspire Leaders Program",
  "AI Teenpreneurship Bootcamp — Sarhad University",
];

const CLIENTS = [
  {
    name: "Cosmetic Club n Clinic",
    loc: "Peshawar",
    quote:
      "Saad streamlined our patient booking and inquiry automations flawlessly, saving our front desk hours every single week.",
    email: "info@cosmeticclubpeshawar.pk",
    site: "www.cosmeticclubpeshawar.pk",
    url: "https://www.cosmeticclubpeshawar.pk",
  },
  {
    name: "Style Coo",
    loc: "Peshawar",
    quote:
      "The conversational chatbot Saad built for our fashion brand significantly increased customer engagement and automated order queries.",
    email: "contact@stylecoo.pk",
    site: "www.stylecoo.pk",
    url: "https://www.stylecoo.pk",
  },
  {
    name: "Alpha Pipes",
    loc: "Peshawar",
    quote:
      "Exceptional data analysis and reporting dashboards that gave our management clear, actionable insights into regional sales performance.",
    email: "admin@alphapipes.com.pk",
    site: "www.alphapipes.com.pk",
    url: "https://www.alphapipes.com.pk",
  },
  {
    name: "Khyber Tech Solutions",
    loc: "Peshawar",
    quote:
      "Saad\u2019s concepts-first approach to building custom AI workflows transformed how we validate internal software products.",
    email: "hello@khybertech.pk",
    site: "www.khybertech.pk",
    url: "https://www.khybertech.pk",
  },
  {
    name: "Apex Builders & Developers",
    loc: "Peshawar",
    quote:
      "From lead capture forms to automated CRM sheets and email triggers, Saad delivered a rock-solid operational pipeline.",
    email: "ops@apexbuilders.pk",
    site: "www.apexbuilders.pk",
    url: "https://www.apexbuilders.pk",
  },
];

/* ─── reusable primitives ───────────────────────────────────────────── */

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring, delay: d },
  }),
};

function SpotlightCard({ children, className = "", ...motionProps }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...motionProps}
      className={
        "group relative overflow-hidden rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/[0.08] transition-shadow duration-300 hover:shadow-[0_8px_40px_-12px_rgba(245,158,11,0.18)] " +
        className
      }
    >
      {/* mouse-tracking radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(245,158,11,0.12), transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

function SectionHeader({ label, title, subtitle }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-10"
    >
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base text-zinc-400 max-w-xl">{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ─── main app ──────────────────────────────────────────────────────── */

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [heroTab, setHeroTab] = useState("Agentic AI");
  const [projectTab, setProjectTab] = useState("All");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* noop */
    }
  };

  const filteredProjects =
    projectTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === projectTab);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-[#09090B] text-zinc-100 font-body">
        {/* ambient top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 -top-40 h-[600px] mx-auto w-[900px] rounded-full bg-amber-500/[0.07] blur-[140px]"
        />

        {/* ── NAVBAR ─────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <nav
            aria-label="Main"
            className="pointer-events-auto relative flex items-center gap-2 sm:gap-6 rounded-full bg-zinc-900/70 backdrop-blur-xl border border-white/10 px-5 py-2.5 shadow-2xl"
          >
            {/* logo */}
            <a
              href="#hero"
              className="flex items-center gap-2 pr-2 sm:pr-4 border-r border-white/10 shrink-0"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/15 text-amber-400 text-[11px] font-bold font-mono">
                SK
              </span>
              <span className="hidden sm:block text-sm font-semibold text-white tracking-tight">
                Saad Khan
              </span>
            </a>

            {/* desktop links with sliding pill */}
            <div
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.label)}
                  className="relative z-10 px-3 py-1.5 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {hoveredNav === link.label && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={spring}
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              ))}
            </div>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <a
                href="#contact"
                className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-amber-300 active:scale-95 transition-all whitespace-nowrap"
              >
                Get in Touch
              </a>
              <button
                type="button"
                onClick={() => setMobileMenu(!mobileMenu)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenu}
                className="md:hidden h-8 w-8 flex items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                {mobileMenu ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </nav>

          {/* mobile drawer */}
          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-auto absolute top-full mt-2 right-4 w-52 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-1.5 md:hidden shadow-2xl"
              >
                {NAV.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenu(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.06] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <main className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 pt-28 pb-20 space-y-28">
          {/* ── HERO ────────────────────────────────────────────── */}
          <section id="hero" className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* status pill */}
              <motion.div
                variants={reveal}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-3 rounded-full bg-zinc-900/60 backdrop-blur-xl border border-white/[0.08] px-4 py-2 text-sm text-zinc-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>Available for new projects</span>
                <span className="h-3 w-px bg-zinc-700" />
                <span className="text-zinc-500">Peshawar, Pakistan</span>
              </motion.div>

              {/* headline */}
              <motion.div
                variants={reveal}
                initial="hidden"
                animate="visible"
                custom={0.06}
              >
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                  Saad Khan
                </h1>
                <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                  Data Scientist &amp; Agentic AI Developer
                </p>
              </motion.div>

              {/* bio */}
              <motion.p
                variants={reveal}
                initial="hidden"
                animate="visible"
                custom={0.12}
                className="max-w-lg text-[15px] leading-relaxed text-zinc-400"
              >
                I build autonomous AI agents, end-to-end machine learning
                pipelines, and workflow automations. Guided by a{" "}
                <span className="text-amber-300 font-medium">
                  &ldquo;Concepts First, Code Second&rdquo;
                </span>{" "}
                approach—grounding every system in solid mathematical and
                architectural fundamentals before writing production code.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={reveal}
                initial="hidden"
                animate="visible"
                custom={0.18}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-300 active:scale-[0.97] transition-all"
                >
                  View Selected Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900/60 backdrop-blur-xl border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-amber-400/40 hover:text-white active:scale-[0.97] transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-zinc-500" />
                      Copy Email
                    </>
                  )}
                </button>
              </motion.div>
            </div>

            {/* hero portrait + interactive card */}
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              custom={0.14}
              className="lg:col-span-5 space-y-4"
            >
              {/* portrait frame */}
              <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-white/[0.08] shadow-2xl">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
                />
                <div className="relative aspect-[4/3.8] w-full overflow-hidden">
                  <img
                    src={heroPhoto}
                    alt="Saad Khan — Data Scientist & Agentic AI Developer"
                    className="h-full w-full object-cover object-[50%_18%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/20 to-transparent"
                  />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white tracking-tight">
                        Saad Khan
                      </p>
                      <p className="text-xs text-zinc-400">
                        Peshawar, Pakistan
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Concepts First
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-2xl">
                <div className="border-b border-white/[0.06] px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400">
                    How I build systems
                  </span>
                  <span className="text-[11px] text-zinc-600">
                    Interactive
                  </span>
                </div>

                {/* tabs */}
                <div className="flex border-b border-white/[0.06]">
                  {Object.keys(HERO_WORKFLOWS).map((tab) => {
                    const active = heroTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setHeroTab(tab)}
                        className={`relative flex-1 py-2.5 text-xs font-medium text-center transition-colors ${
                          active
                            ? "text-amber-400"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="hero-tab"
                            transition={spring}
                            className="absolute inset-x-0 -bottom-px h-[2px] bg-amber-400 rounded-full"
                          />
                        )}
                        <span className="relative">{tab}</span>
                      </button>
                    );
                  })}
                </div>

                {/* workflow steps */}
                <div className="p-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={heroTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-2.5"
                    >
                      {HERO_WORKFLOWS[heroTab].map((step, i) => (
                        <div key={step} className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400 text-[11px] font-bold">
                            {i + 1}
                          </span>
                          <span className="text-sm text-zinc-300">{step}</span>
                          {i < HERO_WORKFLOWS[heroTab].length - 1 && (
                            <ChevronRight className="h-3.5 w-3.5 text-zinc-600 ml-auto shrink-0" />
                          )}
                          {i === HERO_WORKFLOWS[heroTab].length - 1 && (
                            <Check className="h-3.5 w-3.5 text-emerald-400 ml-auto shrink-0" />
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── ABOUT ───────────────────────────────────────────── */}
          <section id="about">
            <SectionHeader
              title="How I Work"
              subtitle="Combining theoretical depth with practical product execution."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {FOCUS_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <SpotlightCard
                    key={card.title}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i * 0.07}
                    className="p-6"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {card.body}
                    </p>
                  </SpotlightCard>
                );
              })}
            </div>

            {/* stats row */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="px-5 py-5 text-center">
                  <p className="text-2xl font-bold text-amber-400">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ── SELECTED WORK ───────────────────────────────────── */}
          <section id="work">
            <SectionHeader
              title="Selected Work"
              subtitle="Production AI applications, data science suites, and automation systems."
            />

            {/* filter tabs */}
            <div className="flex flex-wrap items-center gap-1.5 mb-8 rounded-full bg-zinc-900/50 backdrop-blur-xl border border-white/[0.08] p-1.5 w-fit">
              {PROJECT_TABS.map((tab) => {
                const active = projectTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setProjectTab(tab)}
                    className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "text-zinc-950"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="project-filter-pill"
                        transition={spring}
                        className="absolute inset-0 rounded-full bg-amber-400"
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>

            {/* project cards */}
            <motion.div
              layout
              className="grid sm:grid-cols-2 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <SpotlightCard
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={spring}
                    className="p-6 flex flex-col justify-between"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="inline-flex rounded-full bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-[11px] font-medium text-amber-300">
                          {project.badge}
                        </span>
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${project.title} source`}
                          className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full border border-white/[0.08] text-zinc-500 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-[11px] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* ── EXPERIENCE & EDUCATION ──────────────────────────── */}
          <section id="experience">
            <SectionHeader title="Experience & Education" />

            <div className="grid lg:grid-cols-2 gap-8">
              {/* work experience */}
              <div className="space-y-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                  Work Experience
                </h3>
                {WORK_EXP.map((item, i) => (
                  <motion.div
                    key={item.role}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i * 0.06}
                    className="relative pl-6 border-l-2 border-zinc-800 pb-6 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-amber-400"
                    />
                    <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                      <h4 className="text-[15px] font-semibold text-white">
                        {item.role}
                      </h4>
                      <span className="text-sm text-zinc-500">
                        · {item.org}
                        {item.year && ` (${item.year})`}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* education + certs */}
              <div className="space-y-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
                  Education & Certifications
                </h3>
                {EDU.map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={i * 0.06}
                    className="relative pl-6 border-l-2 border-zinc-800 pb-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full border-2 border-amber-400 bg-[#09090B]"
                    />
                    <h4 className="text-[15px] font-semibold text-white mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-500">
                      {item.org} · {item.meta}
                    </p>
                  </motion.div>
                ))}

                <motion.div
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.12}
                  className="relative pl-6 border-l-2 border-zinc-800"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full border-2 border-amber-400 bg-[#09090B]"
                  />
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                    Certifications & Bootcamps
                  </p>
                  <ul className="space-y-2">
                    {CERTS.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-sm text-zinc-400"
                      >
                        <Award className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── CLIENTS ─────────────────────────────────────────── */}
          <section id="clients">
            <SectionHeader
              title="Trusted by Regional Businesses"
              subtitle="Delivering practical automation, chatbots, and analytics across Peshawar."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CLIENTS.map((c, i) => (
                <SpotlightCard
                  key={c.name}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={i * 0.06}
                  className="p-6 flex flex-col justify-between"
                >
                  <div>
                    <Quote className="h-5 w-5 text-amber-400/40 mb-3" />
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      &ldquo;{c.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                    <p className="text-sm font-semibold text-white">
                      {c.name}
                    </p>
                    <p className="text-xs text-zinc-500">{c.loc}</p>
                    <div className="flex flex-col gap-1 pt-1 text-xs">
                      <a
                        href={`mailto:${c.email}`}
                        className="text-zinc-500 hover:text-amber-300 transition-colors truncate"
                      >
                        {c.email}
                      </a>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        {c.site}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* ── CONTACT FOOTER ──────────────────────────────────── */}
          <section id="contact">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/[0.08] p-8 sm:p-12 text-center"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-amber-400/10 blur-3xl"
              />

              <h2 className="relative text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Let&rsquo;s build something impactful together.
              </h2>
              <p className="relative text-sm text-zinc-400 mb-8 max-w-md mx-auto">
                Available for AI engineering, data science pipelines, and
                automation projects.
              </p>

              <div className="relative flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-300 active:scale-[0.97] transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Email
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-800/60 border border-white/[0.08] px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Mail className="h-4 w-4 text-amber-400" />
                  Email
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-800/60 border border-white/[0.08] px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Github className="h-4 w-4 text-amber-400" />
                  GitHub
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-800/60 border border-white/[0.08] px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-amber-400" />
                  LinkedIn
                </a>
              </div>

              <p className="relative mt-10 pt-6 border-t border-white/[0.06] text-xs text-zinc-600">
                Saad Khan · Peshawar, Pakistan · Concepts First, Code Second
              </p>
            </motion.div>
          </section>
        </main>

        {/* clipboard toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={spring}
              className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-xl"
            >
              <Check className="h-4 w-4" />
              Email copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
