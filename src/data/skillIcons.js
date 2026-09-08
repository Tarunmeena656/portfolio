// Logo per skill, rendered inside the skill chips. `src` files live in public/skills (Devicon, MIT;
// Simple Icons, CC0). `mono` marks single-colour black logos that are inverted on the dark theme.
// Skills that are concepts rather than products get a `glyph` from the Feather icon set instead.
export const SKILL_ICONS = {
  // Languages
  "JavaScript (ES6+)": { src: "javascript.svg" },
  TypeScript: { src: "typescript.svg" },
  Python: { src: "python.svg" },

  // Backend
  "Node.js": { src: "nodejs.svg" },
  "Express.js": { src: "express.svg", mono: true },
  "Hapi.js": { glyph: "server" },
  Fastify: { src: "fastify.svg", mono: true },
  FastAPI: { src: "fastapi.svg" },
  "RESTful API Design": { glyph: "globe" },
  Microservices: { glyph: "grid" },

  // AI / LLM
  "OpenAI API": { glyph: "cpu" },
  "Anthropic API": { src: "anthropic.svg", mono: true },
  RAG: { glyph: "search" },
  "Embeddings & Vector Search": { glyph: "layers" },
  "Prompt Engineering": { glyph: "prompt" },
  "Structured Outputs": { glyph: "box" },
  "AI Pipeline Development": { glyph: "pipeline" },

  // Databases
  MongoDB: { src: "mongodb.svg" },
  Mongoose: { src: "mongoose.svg" },
  PostgreSQL: { src: "postgresql.svg" },
  SQL: { glyph: "database" },
  TypeORM: { src: "typeorm.svg" },
  Medusa: { src: "medusa.svg", mono: true },
  ChromaDB: { glyph: "database" },

  // Cloud / DevOps
  "AWS Lambda": { glyph: "cloud" },
  S3: { glyph: "cloud" },
  EC2: { glyph: "cloud" },
  "API Gateway": { glyph: "cloud" },
  "Serverless Architecture": { src: "serverless.svg" },
  Nginx: { src: "nginx.svg" },

  // Auth & Security
  JWT: { src: "jsonwebtokens.svg", mono: true },
  RBAC: { glyph: "users" },
  OAuth: { glyph: "key" },
  "Secure API Design": { glyph: "lock" },

  // Integrations
  Stripe: { src: "stripe.svg" },
  Razorpay: { src: "razorpay.svg", mono: true },
  Puppeteer: { src: "puppeteer.svg" },
  Cheerio: { src: "cheerio.svg" },
  FCM: { src: "firebase.svg" },

  // Tools
  Git: { src: "git.svg" },
  GitHub: { src: "github.svg", mono: true },
  GitLab: { src: "gitlab.svg" },
  Bitbucket: { src: "bitbucket.svg" },
};
