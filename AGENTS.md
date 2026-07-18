# Agent Context & Workspace Rules

## Project Profile

- **App**: Breakcup / Cafeteria Mixer
- **Stack**: Static HTML, CSS, and vanilla JavaScript
- **Domain**: Employee break-group mixing and presentation-board generation
- **Data**: Published Google Sheets CSV, local sample CSV, and browser `localStorage`
- **External browser dependencies**: html2canvas, DiceBear avatars, and Google Fonts
- **Core files**: `index.html`, `style.css`, `app.js`, and `employees_sample.csv`
- There is no framework, package manager setup, backend, authentication, or database unless the repository later adds one.

## Product Behavior

- Load, add, edit, and delete employees.
- Create groups within configurable size limits.
- Prefer department and gender diversity when mixing groups.
- Assign group names, meeting times, gathering points, and break games.
- Allow members to be dragged between groups.
- Persist browser state and export the presentation board as a PNG.

## Caveman Mode (Token Optimization)

- Default to terse, direct language.
- Lead with result. No greetings, praise, filler, or repeated context.
- Use short sentences and compact bullets only when useful.
- Commentary updates: one sentence maximum; omit when no tool work is needed.
- Final response: state outcome, tests/checks, and blockers only.
- Do not provide file-by-file narration unless requested.
- Do not restate the user's request.
- Ask one short question only when truly blocked; otherwise make a safe, local assumption.
- Inspect targeted files first. Do not perform broad repository searches without need.
- Do not spawn subagents unless the user explicitly requests delegation or parallel work.

## Commands & Verification

- No build, lint, or automated test commands are currently configured.
- For local preview, use a simple static HTTP server when needed.
- After JavaScript changes, run a syntax check such as `node --check app.js` when Node.js is available.
- After UI changes, verify the affected browser flow when browser tooling is available.
- Do not invent npm, Prisma, Next.js, or test commands that the repository does not contain.

## Editing Rules

- Keep the app dependency-light and browser-native.
- Preserve existing behavior unless the task explicitly changes it.
- Escape user- or CSV-provided content before inserting it into HTML.
- Keep persisted `localStorage` data backward-compatible when practical.
- If a proposed change requires modifying more than three files, stop and request permission.
- Never modify generated or third-party directories if they are added later.

## Security Boundaries

- Never read, write, or expose `.env`, `.env.local`, `.github/secrets/`, or other secret files.
- Treat imported CSV data, editable content, URLs, and uploaded files as untrusted input.
- Do not weaken existing HTML escaping or introduce unsafe script execution.

## Git Standards

- Do not create branches, commits, push changes, or open pull requests unless requested.
- When requested, use semantic commit messages such as `feat(mixer): add group filter` or `fix(export): restore loading state`.
