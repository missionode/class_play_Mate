# Agent Context & Workspace Rules

## 🎯 Project Profile
* **Stack**: Next.js 15 (App Router), TypeScript 5.5, Tailwind CSS v4, Prisma ORM
* **Domain**: E-commerce checkout platform
* **Core Rule**: Prefer functional components, strict TypeScript typing, and immutable state. Never use `any`.

## 💻 Executable Commands
* **Build**: `npm run build`
* **Lint & Format**: `npm run lint` / `npx prettier --write .`
* **Test Suite**: `npm run test`
* **Database Migration**: `npx prisma migrate dev`

## 🛠️ Tool & Cost Optimization (Token Savers)
* **Never Crawler**: Do not index or search the `node_modules/`, `.next/`, `dist/`, or `public/` directories.
* **Execution Limit**: Stop and ask for permission immediately if a proposed bug fix requires altering more than 3 files.
* **No Fluff**: Omit conversational commentary or file-by-file explanations. Output code blocks or concrete summaries directly.
* **Context Verification**: If you lack context, ask me directly instead of guessing or initiating expansive repository searches.

## 🧪 Testing Workflow
* **Auto-Test**: Run `npm run test` automatically after any file mutation inside `src/lib/` or `src/components/`.
* **Coverage Rule**: New feature implementations must include a corresponding integration test in the `tests/` directory.
* **Error Handling**: If tests fail during a subagent workflow, immediately halt execution and output the exact error block.

## 🔒 Security & Critical Boundaries
* **Secrets**: Never read, write, or touch `.env`, `.env.local`, or anything under `.github/secrets/`.
* **Third-Party Code**: Never modify files inside the `src/vendor/` directory.
* **Authentication**: All logic modifications inside `src/app/api/auth/` require a manual review state. Do not execute autonomously.

## 📝 Git & Commit Standards
* **Format**: Semantic commits matching `feat(scope): message` or `fix(scope): message`.
* **Branching**: Always generate a temporary feature branch before initiating any background subagent refactoring (`/agent refactor`).
