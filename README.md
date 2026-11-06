# Metron integration explorer

Next.js App Router, TypeScript, Tailwind CSS, and Redux Toolkit.

```sh
npm install
npm run dev
```

Open http://localhost:3000. The **Spiral** appears first; scroll down to the separate **Platform Drift Wall** section to browse the same catalog. Hover, focus, or select a card to update its details. Below 1024px, tap or activate a card to open a modal with a header, scrollable content, and footer. Desktop keeps the inline details panel. Drag the spiral to browse platforms; rear cards fade as they cross the center. Automatic animation pauses on hover, keyboard focus, or while the modal is open, and respects reduced motion.

## Directory structure

```text
src/
  app/                         # Next.js routes, global styles, root layout
  components/
    case-snapshots.tsx         # Two-column explorer connected to Redux
    infinite-spiral.tsx        # Supplied React Bits component + selection support
    drift-wall.tsx             # React Bits wall with adaptive columns and selection
    platform-drift-wall.tsx    # Redux-connected wall using the same catalog
    drift-wall-snapshots.tsx   # Separate wall section rendered below the spiral
    viewport-gallery.tsx      # Mount animations when close to the viewport
    integration-details.tsx    # Shared platform metadata and descriptions
    integration-modal.tsx      # Mobile dialog, focus handling, and scroll lock
  data/
    integrations.ts           # Imported platform catalog from the workbook
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

The catalog contains 108 platforms and all 111 assignments across eight categories from `tests/Platform List.xlsx`. Platforms listed in multiple categories are merged, with all memberships retained in `categories` and summarized in `category`. The workbook supplies names and categories only: integration labels use the platform names, descriptions remain empty, and the UI displays a missing-description message. SVG images are text placeholders, not official brand logos. Category assignments are preserved as supplied, including unusual classifications.

To reimport the local workbook, run `python scripts/import-platforms.py`. To verify the catalog matches the workbook, run `python scripts/import-platforms.py --check`. The import uses Python's standard library and requires no additional packages. The reference spreadsheet remains local and untracked.

Select an existing service with `dispatch(selectIntegration(id))`. Unknown IDs are ignored. `dispatch(replaceIntegrations(records))` replaces the collection, preserves an existing valid selection, selects the first available record when needed, and supports an empty collection.

## Checks

```sh
npm test
npm run lint
npm run build
npm run test:e2e
```

The spiral implementation is based on the React Bits source supplied in the task. The extended API adds `selectedId`, `onItemSelect` for hover/focus/selection, `onItemActivate` for click/tap/keyboard activation, and `paused` for external control.

The Drift Wall uses the other supplied React Bits component, with responsive column counts, native keyboard-operable buttons, callbacks into Redux, and visibility/reduced-motion handling. Both views share the details components and modal.

## Animation performance

Animation bundles are dynamically imported when the gallery is within 200px of the viewport. The page and initial details retain server rendering; the loading placeholder has the same fixed layout on the server and first client render.

The spiral only updates cards within the viewport plus an entry/exit margin, rather than animating all 108 catalog entries every frame. Inactive cards remain available to keyboard focus, but do not retain promoted GPU layers; their images are requested when they first enter the visible window. The gallery disables per-card animated blur and avoids a no-op grayscale filter. The requestAnimationFrame loop stops when motion settles during hover, keyboard focus, modal display, reduced motion, or offscreen visibility, and restarts for user interaction.

This page already builds as a prerendered route with static catalog data and local assets. Adding a server data cache cannot accelerate the animation calculations that run on the visitor's device. Lazy loading improves initial loading, while limiting per-frame work addresses animation lag.

Install the browser once with `npx playwright install chromium`. The E2E suite starts a development server (or reuses localhost:3000) and fails on hydration warnings and uncaught browser errors on desktop and mobile, including reloads and modal interactions. Set `PLAYWRIGHT_BASE_URL` to check another running server. Development mode is intentional: production can omit attribute mismatch warnings.

If your regular browser reports mismatches containing `bis_skin_checked`, `bis_register`, or `cz-shortcut-listen`, try a clean browser profile with extensions disabled. The local development logs showed these attributes being injected into the HTML before hydration. Exclude localhost from the responsible extensions or disable those extensions while developing. The application does not suppress hydration warnings.
