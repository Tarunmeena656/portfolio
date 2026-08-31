// Single source of truth for all portfolio content — edit this file to update the site.

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: "Tarun Meena",
  firstName: "Tarun",
  role: "Backend Developer",
  tagline: "Node.js · Python · TypeScript · AWS · AI/LLM Integration",
  location: "Bhopal, Madhya Pradesh, India",
  email: "meenatarun656@gmail.com",
  phone: "+91 84629 89962",
  linkedin: "https://linkedin.com/in/tarun-meena-3521b224b",
  github: "https://github.com/Tarunmeena656",
  githubUser: "Tarunmeena656",
  resumeUrl: asset("Tarun_Meena_Resume.pdf"),
  photo: asset("tarun.jpg"),
  availability: "Open to remote and hybrid backend / AI engineering roles",
  typingRoles: [
    "Backend Developer",
    "Node.js & TypeScript Engineer",
    "AI / LLM Integration Specialist",
    "AWS Serverless Builder",
    "RAG & Vector Search Practitioner",
  ],
  summary:
    "Backend Developer with 3.6+ years of experience building REST APIs and scalable server-side systems using Node.js, TypeScript, and Python. Skilled in integrating AI/LLM services (OpenAI, Anthropic) into production content and automation pipelines, optimizing MongoDB at 300M+ record scale, and deploying AWS serverless architecture (Lambda, S3, EC2, API Gateway).",
  summaryExtra:
    "I've delivered production systems across AI/GenAI content platforms, e-commerce, healthcare, and media — cutting infrastructure costs by up to 20% and improving API/query performance by up to 60%. I care about systems that are fast, observable, and fail gracefully.",
};

export const stats = [
  { value: 3.6, suffix: "+", decimals: 1, label: "Years of experience" },
  { value: 300, suffix: "M+", decimals: 0, label: "Records optimized in MongoDB" },
  { value: 60, suffix: "%", decimals: 0, label: "Faster query performance" },
  { value: 20, suffix: "%", decimals: 0, label: "AWS cost reduction" },
  { value: 10, suffix: "+", decimals: 0, label: "Production projects shipped" },
];

export const skills = [
  { category: "Languages", icon: "code", items: ["JavaScript (ES6+)", "TypeScript", "Python"] },
  {
    category: "Backend",
    icon: "server",
    items: ["Node.js", "Express.js", "Hapi.js", "Fastify", "FastAPI", "RESTful API Design", "Microservices"],
  },
  {
    category: "AI / LLM",
    icon: "brain",
    items: [
      "OpenAI API",
      "Anthropic API",
      "RAG",
      "Embeddings & Vector Search",
      "Prompt Engineering",
      "Structured Outputs",
      "AI Pipeline Development",
    ],
  },
  {
    category: "Databases",
    icon: "database",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "SQL", "TypeORM", "Medusa", "ChromaDB"],
  },
  {
    category: "Cloud / DevOps",
    icon: "cloud",
    items: ["AWS Lambda", "S3", "EC2", "API Gateway", "Serverless Architecture", "Nginx"],
  },
  { category: "Auth & Security", icon: "shield", items: ["JWT", "RBAC", "OAuth", "Secure API Design"] },
  { category: "Integrations", icon: "plug", items: ["Stripe", "Razorpay", "Puppeteer", "Cheerio", "FCM"] },
  { category: "Tools", icon: "tools", items: ["Git", "GitHub", "GitLab", "Bitbucket"] },
];

export const experience = [
  {
    title: "Backend Developer",
    company: "Rootlex Technology Pvt. Ltd.",
    location: "Remote, India",
    period: "Jul 2024 – Present",
    current: true,
    stack: ["Node.js", "TypeScript", "Python", "AWS", "OpenAI", "Anthropic"],
    bullets: [
      "Architected and maintained RESTful backend APIs for multiple client products (Lucidream, Hinch, Netros, TheSpice.AI, MaterialFlow) using Node.js, TypeScript, Python, and AWS.",
      "Built AI-driven content and order-processing pipelines integrating OpenAI/Anthropic LLM APIs, combining prompt engineering with backend workflow design for real-time, multi-platform systems.",
      "Implemented Python-based automation scripts and AI/LLM workflows to streamline content processing, data enrichment, and structured extraction from unstructured input.",
    ],
  },
  {
    title: "Node.js Developer",
    company: "Bigscal Technologies Pvt. Ltd.",
    location: "Surat, Gujarat, India",
    period: "Jul 2023 – Jun 2024",
    stack: ["Node.js", "TypeScript", "MongoDB", "AWS Lambda", "Stripe", "Razorpay"],
    bullets: [
      "Reduced AWS infrastructure costs by 20% by migrating scraping workloads to AWS Lambda serverless functions.",
      "Cut MongoDB response time 40–60% across 300M+ records through strategic indexing and aggregation pipelines; built RBAC for S3 and MongoDB resources.",
      "Integrated payment gateways (Stripe, Razorpay) and third-party APIs, improving transaction reliability across client applications.",
      "Delivered multiple client-facing projects using TypeScript, Node.js, and MongoDB within Agile sprints.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Bigscal Technologies Pvt. Ltd.",
    location: "Surat, Gujarat, India",
    period: "Jan 2023 – Jun 2023",
    stack: ["Node.js", "MongoDB", "REST APIs"],
    bullets: [
      "Improved REST API response time by 25% through server-side caching and MongoDB query optimization.",
    ],
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / LLM" },
  { id: "backend", label: "Backend" },
  { id: "cloud", label: "Cloud & Data" },
];

export const projects = [
  {
    id: "ai-support-agent",
    featured: true,
    title: "AI Customer Support Agent",
    subtitle: "RAG-powered support with confidence-gated human handoff",
    category: "ai",
    tags: ["Python", "FastAPI", "React", "ChromaDB", "Anthropic Claude", "JWT", "RAG"],
    description:
      "An end-to-end AI support platform: customers chat with an agent that answers only from company documents via RAG, reports its confidence, cites sources, and escalates to a human agent (auto-creating a ticket) when unsure — or whenever the AI layer fails.",
    highlights: [
      "Document ingestion → paragraph-aware chunking → embeddings → top-k vector retrieval, behind a pluggable VectorStore interface (ChromaDB + custom BM25 fallback).",
      "Structured JSON outputs from the LLM ({answer, confidence, needs_human}) drive a confidence gate — no fragile string parsing.",
      "TTL+LRU answer cache with knowledge-base-aware invalidation, plus prompt caching to cut LLM cost.",
      "JWT auth with customer/admin roles, ticketing, human-agent inbox, and a dashboard tracking escalation rate, avg confidence, and CSAT from per-answer feedback.",
    ],
    links: { github: "https://github.com/Tarunmeena656/AI-Support-Agent" },
    screenshots: [
      { src: asset("screenshots/chat.png"), caption: "Customer chat — confidence badge, sources, feedback" },
      { src: asset("screenshots/chat-escalated.png"), caption: "Low confidence → escalated to a human agent" },
      { src: asset("screenshots/admin-dashboard.png"), caption: "Admin dashboard — escalation rate, confidence, CSAT" },
      { src: asset("screenshots/admin-inbox.png"), caption: "Agent inbox — reply as a human in the same thread" },
      { src: asset("screenshots/admin-knowledge-base.png"), caption: "Knowledge base — upload docs, test retrieval" },
    ],
  },
  {
    id: "lucidream",
    title: "Lucidream — AI Content Chief of Staff",
    subtitle: "Long-form media → publish-ready content, with approval-first publishing",
    category: "ai",
    tags: ["AI/GenAI", "LLMs", "Python", "Node.js", "Content Automation"],
    description:
      "Backend and AI workflows that transform long-form podcast and video content into clips, captions, show notes, articles, and social-media posts.",
    highlights: [
      "Automated content-generation pipelines converting unstructured media into brand-specific, publish-ready assets.",
      "Approval-first publishing workflow so users review AI-generated content before it goes live on connected platforms.",
    ],
    links: {},
  },
  {
    id: "materialflow",
    title: "MaterialFlow — AI Order & Inventory Platform",
    subtitle: "WhatsApp text, images, PDFs and voice notes → structured orders",
    category: "ai",
    tags: ["Node.js", "Python", "TypeScript", "AI/LLM", "AWS"],
    description:
      "An AI-assisted order extraction system that turns messy multi-format WhatsApp input into structured catalogue and order data connected to live inventory.",
    highlights: [
      "Hinglish and trade-slang matching with confidence scoring to identify catalogue items from unstructured input.",
      "AI processing wired into real-time inventory, picking, packing, and dispatch workflows across Web, Android, and iOS.",
    ],
    links: {},
  },
  {
    id: "enterprise-rag",
    title: "Enterprise Knowledge Assistant — RAG Platform",
    subtitle: "Hybrid semantic + BM25 retrieval with guardrails",
    category: "ai",
    tags: ["Python", "FastAPI", "LLM APIs", "Embeddings", "Vector Database"],
    description:
      "A Retrieval-Augmented Generation backend covering document ingestion, chunking, embeddings, vector retrieval, top-k search, and re-ranking.",
    highlights: [
      "Semantic search combined with BM25 hybrid retrieval to handle both natural-language questions and exact technical terms.",
      "Prompt engineering, context management, structured output validation, and guardrails for reliable, grounded responses.",
    ],
    links: {},
  },
  {
    id: "thespice",
    title: "TheSpice.AI — AI-Powered Podcast Platform",
    subtitle: "Automated podcast ingestion, summarization and tagging",
    category: "ai",
    tags: ["Python", "AWS Lambda", "OpenAI", "Anthropic"],
    description:
      "Integrated OpenAI and Anthropic LLM APIs for automated podcast content generation, summarization, and tagging.",
    highlights: [
      "Python-based audio/content processing workflows and REST APIs automating podcast ingestion and downstream content generation.",
    ],
    links: {},
  },
  {
    id: "hinch",
    title: "Hinch — E-Commerce Platform",
    subtitle: "Multi-brand commerce backend: 10,000+ SKUs across 200+ brands",
    category: "backend",
    tags: ["Node.js", "TypeScript", "MongoDB", "AWS"],
    description:
      "Backend APIs for a multi-brand e-commerce platform supporting 10,000+ SKUs across 200+ brands.",
    highlights: [
      "Product catalogue, cart, order management, payment integration, and real-time delivery tracking workflows.",
    ],
    links: {},
  },
  {
    id: "netros",
    title: "Netros — Hospital Management System",
    subtitle: "Patient records, scheduling, billing with role-based access",
    category: "backend",
    tags: ["Node.js", "TypeScript", "MongoDB", "RBAC"],
    description:
      "Backend services for patient records, appointment scheduling, billing, and hospital workflows.",
    highlights: ["Role-based access control for doctors, nurses, administrators, and other system users."],
    links: {},
  },
  {
    id: "storagedna",
    title: "StorageDNA — Storage Backend",
    subtitle: "MongoDB at 300M+ records, S3-compatible local server",
    category: "cloud",
    tags: ["Node.js", "MongoDB", "AWS S3", "RBAC"],
    description:
      "Optimized MongoDB workloads across 300M+ records, cutting response time 40–60% through indexing and aggregation pipelines.",
    highlights: [
      "RBAC for S3/MongoDB resources and a local S3-compatible server (s3rver) with multipart upload support.",
    ],
    links: {},
  },
  {
    id: "spiral-scraper",
    title: "Spiral Scraper — Spiralyze",
    subtitle: "Serverless scraping with A/B-testing tool integrations",
    category: "cloud",
    tags: ["Node.js", "AWS Lambda", "VWO", "Optimizely", "Convert", "Google Optimize"],
    description: "Migrated scraping workloads to AWS Lambda, cutting infrastructure costs by approximately 20%.",
    highlights: [
      "Improved scraping efficiency 20% through parallel processing and job queuing; integrated VWO, Convert, Optimizely, and Google Optimize.",
    ],
    links: {},
  },
  {
    id: "news-scraper",
    title: "News Scraper",
    subtitle: "Scheduled scraping with sentiment enrichment",
    category: "backend",
    tags: ["Node.js", "Cron", "MongoDB", "Sentiment Analysis API"],
    description:
      "Scheduled news-scraping workflows using cron jobs, parallel processing, and job queues, improving accuracy and timeliness by ~50%.",
    highlights: ["Sentiment analysis API integration to enrich scraped content, plus role-based authentication."],
    links: {},
  },
];

export const education = {
  degree: "Master of Computer Applications (MCA)",
  school: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)",
  location: "Bhopal, India",
  period: "May 2021 – Jun 2024",
  gpa: "8.93 / 10.0",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];
