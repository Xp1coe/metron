# Metron integration explorer

Next.js App Router, TypeScript, Tailwind CSS, and Redux Toolkit.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Hover, focus, or select a spiral card to update its details. Below 1024px, tap or activate a card to open a modal with a header, scrollable content, and footer. Desktop keeps the inline details panel. Drag the spiral to browse platforms; rear cards fade as they cross the center. Automatic animation pauses on hover, keyboard focus, or while the modal is open, and respects reduced motion.

## Directory structure

```text
src/
  app/                         # Next.js routes, global styles, root layout
  components/
    case-snapshots.tsx         # Two-column explorer connected to Redux
    infinite-spiral.tsx        # Supplied React Bits component + selection support
    integration-details.tsx    # Shared platform metadata and descriptions
    integration-modal.tsx      # Mobile dialog, focus handling, and scroll lock
  data/
    integrations.ts           # Dummy services and integration descriptions
  features/integrations/
    types.ts                  # Integration data contract
    integrations-slice.ts     # Normalized entities and selected ID
    selectors.ts              # Typed selectors for UI consumers
  store/
    index.ts                  # Store factory and inferred TypeScript types
    hooks.ts                  # Typed Redux hooks
    provider.tsx              # Stable store per mounted provider
public/images/services/       # Local placeholder artwork
tests/store.test.ts           # Store isolation, selection, and data integrity
```

The root layout wraps the app in `StoreProvider`. Its lazy initializer creates an independent store for each provider, avoiding a server-side singleton. Redux contains normalized integration entities and a selected ID; animation frames and pointer positions remain local to the spiral.

## Updating the data

Edit `src/data/integrations.ts`. Every service has `id`, `serviceName`, `image: { src, alt }`, `platform`, `category`, and an `integrations` array containing `id`, `name`, and `description`. Image paths resolve from `public/`.

These are demonstration records, not a verified portfolio. The Armis description follows the supplied reference; other descriptions are illustrative. SVG images are text placeholders, not official brand logos.

Select an existing service with `dispatch(selectIntegration(id))`. Unknown IDs are ignored. `dispatch(replaceIntegrations(records))` replaces the collection, preserves an existing valid selection, selects the first available record when needed, and supports an empty collection.

## Checks

```sh
npm test
npm run lint
npm run build
npm run test:e2e
```

The spiral implementation is based on the React Bits source supplied in the task. The extended API adds `selectedId`, `onItemSelect` for hover/focus/selection, `onItemActivate` for click/tap/keyboard activation, and `paused` for external control.

Install the browser once with `npx playwright install chromium`. The E2E suite starts a development server (or reuses localhost:3000) and fails on hydration warnings and uncaught browser errors on desktop and mobile, including reloads and modal interactions. Set `PLAYWRIGHT_BASE_URL` to check another running server. Development mode is intentional: production can omit attribute mismatch warnings.

If your regular browser reports mismatches containing `bis_skin_checked`, `bis_register`, or `cz-shortcut-listen`, try a clean browser profile with extensions disabled. The local development logs showed these attributes being injected into the HTML before hydration. Exclude localhost from the responsible extensions or disable those extensions while developing. The application does not suppress hydration warnings.
