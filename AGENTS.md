<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Hydration verification

- The user requested that E2E testing stop. Do not run Playwright/E2E or browser smoke tests unless the user explicitly requests them again. Use relevant unit tests, lint, and production builds for verification. The existing E2E suite remains available but is not run automatically.
- Keep the first server and client render deterministic. Read browser APIs in effects or event handlers and use CSS for responsive layout.
- Do not hide hydration bugs with broad `suppressHydrationWarning` usage or disable SSR as a workaround.
- If a warning contains `bis_skin_checked`, `bis_register`, or `cz-shortcut-listen`, compare with a clean browser profile first. These attributes were observed in local browser-extension mutations, not in application markup.
- In development, `src/components/extension-attribute-cleanup.tsx` removes those extension attributes (and `__processed_…`) before hydration. For another extension attribute, add its name there. Do not widen it to attributes the application renders.
