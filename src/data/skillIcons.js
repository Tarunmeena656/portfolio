// Logo per skill, rendered inside the skill chips. `src` files live in public/skills (Devicon, MIT;
// Simple Icons, CC0). `mono` marks single-colour black logos that are inverted on the dark theme.
// Skills that are concepts rather than products get a `glyph` from the Feather icon set instead.
export const SKILL_ICONS = {
  // Languages
  "JavaScript (ES6+)": { src: "javascript.svg" },
  TypeScript: { src: "typescript.svg" },
  Python: { src: "python.svg" },

  // Frontend
  React: { src: "react.svg" },
  "Next.js": { src: "nextdotjs.svg", mono: true },
  "React Hooks": { src: "react.svg" },
  Redux: { src: "redux.svg" },
  "Context API": { src: "react.svg" },
  HTML5: { src: "html5.svg" },
  CSS3: { src: "css.svg" },
  "Tailwind CSS": { src: "tailwindcss.svg" },
  "Responsive Design": { glyph: "layout" },

  // Backend (Node.js)
  "Node.js": { src: "nodejs.svg" },
  "Express.js": { src: "express.svg", mono: true },
  NestJS: { src: "nestjs.svg" },
  "Hapi.js": { glyph: "server" },
  Fastify: { src: "fastify.svg", mono: true },
  "RESTful API Design": { glyph: "globe" },
  Microservices: { glyph: "grid" },
  "Swagger/OpenAPI": { src: "swagger.svg" },

  // Backend (Python)
  FastAPI: { src: "fastapi.svg" },
  Flask: { src: "flask.svg", mono: true },
  Django: { src: "django.svg" },
  "Django REST Framework": { src: "django.svg" },
  Pydantic: { src: "pydantic.svg" },
  SQLAlchemy: { src: "sqlalchemy.svg" },
  Celery: { src: "celery.svg" },

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
  Redis: { src: "redis.svg" },
  Medusa: { src: "medusa.svg", mono: true },
  ChromaDB: { glyph: "database" },

  // Cloud / DevOps
  "AWS Lambda": { glyph: "cloud" },
  S3: { glyph: "cloud" },
  EC2: { glyph: "cloud" },
  "API Gateway": { glyph: "cloud" },
  "Serverless Architecture": { src: "serverless.svg" },
  Docker: { src: "docker.svg" },
  Kubernetes: { src: "kubernetes.svg" },
  "CI/CD Pipelines": { glyph: "pipeline" },
  Nginx: { src: "nginx.svg" },

  // Auth & Security
  JWT: { src: "jsonwebtokens.svg", mono: true },
  RBAC: { glyph: "users" },
  OAuth: { glyph: "key" },
  "Secure API Design": { glyph: "lock" },

  // Testing
  Jest: { src: "jest.svg" },
  Pytest: { src: "pytest.svg" },
  Postman: { glyph: "send" },

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
