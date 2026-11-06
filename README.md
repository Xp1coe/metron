# Metron integration explorer

Next.js App Router, TypeScript, Tailwind CSS, and Redux Toolkit.

```sh
npm install
npm run dev
```

Open http://localhost:3000. The page has two **Case Snapshots** sections and no view toggle.

- **Spiral (first section).** On desktop the spiral sits beside the Integration Spotlight panel; hover, focus, or select a card to update the panel. Drag the spiral to browse platforms; rear cards fade as they cross the center. On screens narrower than 1024px, tapping a card opens a details modal with a header, scrollable content, and a footer.
- **Drift Wall (second section).** The wall is full width and as tall as the screen. On desktop, clicking or tapping a tile (or pressing Enter on a focused tile) shows the Spotlight card inside the gallery, beside the tile and within the gallery's bounds; hovering only pauses the wall and lifts the tile. The wall stays paused while the card is shown. The card closes when the same tile is activated again, on a press outside the card and tiles, on Escape, when keyboard focus leaves the gallery, or with its close button. On screens narrower than 1024px, tapping a tile opens the same details modal.

Automatic animation pauses on hover, keyboard focus, or while details are shown, and respects reduced motion.

Search platform names, integration names, descriptions, or categories using the search bar. Combine the query with a category filter. Controls in both sections stay synchronized through Redux, show the result count, and offer a reset action. While a search or category filter is active, each section replaces its animation with a simple grid of app icons; clearing the filters restores the animation. Hovering or selecting an app updates the first section's Spotlight panel; in the wall's grid, clicking or tapping an app shows the same in-gallery Spotlight card. A filtered-out selection falls back to the first matching platform; no results show an empty state.

## Directory structure

```text
src/
  app/                         # Next.js routes, global styles, root layout
    opengraph-image.tsx        # Generated share image
  components/
    case-snapshots.tsx         # Both sections: filters, gallery, Spotlight, modal
    infinite-spiral.tsx        # Supplied React Bits component + selection support
    drift-wall.tsx             # React Bits wall with adaptive columns and selection
    platform-drift-wall.tsx    # Redux-connected wall using the same catalog
    drift-wall-snapshots.tsx   # Separate wall section rendered below the spiral
    viewport-gallery.tsx      # Mount animations when close to the viewport
    integration-details.tsx    # Shared platform metadata and descriptions
    integration-modal.tsx      # Mobile dialog, focus handling, and scroll lock
    integration-filters.tsx    # Shared search and category controls
    integration-app-grid.tsx   # App-icon grid shown while filters are active
  data/
    integrations.ts           # Imported platform catalog from the workbook
  features/integrations/
    types.ts                  # Integration data contract
    integrations-slice.ts     # Normalized entities, selected ID, search, category
    selectors.ts              # Typed, memoized selectors for UI consumers
  lib/
    site-metadata.ts          # Metadata and JSON-LD image catalog
    preview-position.ts       # Placement of the wall's Spotlight card
  store/
    index.ts                  # Store factory and inferred TypeScript types
    hooks.ts                  # Typed Redux hooks
    provider.tsx              # Stable store per mounted provider
public/companies/             # Supplied company PNGs (57 platforms use them)
public/images/services/       # Colored SVG fallbacks for the other platforms
scripts/import-platforms.py   # Generates the catalog and fallback artwork
tests/store.test.ts           # Store, filtering, data integrity, palettes, images
tests/preview-position.test.ts # Spotlight card placement inside the gallery
```

The root layout wraps the app in `StoreProvider`. Its lazy initializer creates an independent store for each provider, avoiding a server-side singleton. Redux contains normalized integration entities, a selected ID, the search query, and the category filter; animation frames, pointer positions, and the wall's Spotlight card position remain local to the components.

## Updating the data

Edit `src/data/integrations.ts`. Every service has `id`, `serviceName`, `image: { src, alt }`, `platform`, `category`, `categories`, `palette: { foreground, background, border }`, and an `integrations` array containing `id`, `name`, and `description`. Image paths resolve from `public/`. Every image description includes its platform name and category memberships, and is passed to the spiral, wall, and detail images. Each platform has a distinct palette used by its fallback artwork, app icon, and metadata; palette text has at least 4.5:1 contrast against its background.

The catalog contains 108 platforms and all 111 assignments across eight categories from `tests/Platform List.xlsx`. Platforms listed in multiple categories are merged, with all memberships retained in `categories` and summarized in `category`. The workbook supplies names and categories only: integration labels use the platform names, descriptions remain empty, and the UI displays a missing-description message. Category assignments are preserved as supplied, including unusual classifications.

Fifty-seven platforms use the company PNGs supplied in `public/companies`; some products share their vendor's image. The other 51 use generated SVG fallbacks from `public/images/services`: the supplied "Company Logo Placeholder" artwork with the platform name as a label in the platform's palette. These are not official brand logos. The fallbacks embed `scripts/assets/logo-placeholder.webp`, a 400px copy of the supplied placeholder image; the original stays local. The importer matches company images by normalized name plus explicit vendor and product aliases, and never modifies the supplied PNGs.

To reimport the local workbook, run `python scripts/import-platforms.py`. To verify the generated catalog and that every referenced image exists, run `python scripts/import-platforms.py --check`. The import uses Python's standard library and requires no additional packages. Reimporting needs the local workbook and the company images. The reference spreadsheet remains local and untracked.

Select an existing service with `dispatch(selectIntegration(id))`. Unknown IDs are ignored. `dispatch(replaceIntegrations(records))` replaces the collection, preserves an existing valid selection, selects the first available record when needed, and supports an empty collection.

## Checks

```sh
npm test
npm run lint
npm run build
python scripts/import-platforms.py --check
```

These are the routine checks. The Playwright suite (`npm run test:e2e`) is opt-in and is not part of routine verification; see `AGENTS.md`. Its specs have not been run since the wall preview and the filtered app grid were added, so they may describe older behavior.

The spiral implementation is based on the React Bits source supplied in the task. The extended API adds `selectedId`, `onItemSelect` for hover/focus/selection, `onItemActivate` for click/tap/keyboard activation, and `paused` for external control.

The Drift Wall uses the other supplied React Bits component, with responsive column counts, native keyboard-operable buttons, callbacks into Redux, and visibility/reduced-motion handling. Both sections share the detail components. On desktop the spiral uses its inline panel and the wall uses the in-gallery Spotlight card; both use the modal on smaller screens. The wall's `onItemActivate` callback reports the activated tile's bounding rectangle, and `src/lib/preview-position.ts` places the card on the tile's right or left, narrowing it when neither side has room, so it stays inside the gallery and beside the tile.

## SEO and image metadata

Next.js App Router's server-rendered Metadata API fills Helmet's role. `src/lib/site-metadata.ts` defines the title, description, canonical URL, Open Graph and Twitter card tags, and a JSON-LD catalog containing all platform image URLs and captions. `src/app/opengraph-image.tsx` generates a cached PNG share image with descriptive alt text at build time. No client-side Helmet provider or external image requests are needed.

Set `NEXT_PUBLIC_SITE_URL` to the canonical deployment URL when using a custom domain. Otherwise the Vercel production domain is used when available, with localhost as the development fallback.

## Animation performance

Animation bundles are dynamically imported when the gallery is within 200px of the viewport. The page and initial details retain server rendering; the loading placeholder has the same fixed layout on the server and first client render.

The spiral only updates cards within the viewport plus an entry/exit margin, rather than animating all 108 catalog entries every frame. Inactive cards remain available to keyboard focus, but do not retain promoted GPU layers; their images are requested when they first enter the visible window. The gallery disables per-card animated blur and avoids a no-op grayscale filter. The requestAnimationFrame loop stops when motion settles during hover, keyboard focus, modal display, reduced motion, or offscreen visibility, and restarts for user interaction.

This page already builds as a prerendered route with static catalog data and local assets. Adding a server data cache cannot accelerate the animation calculations that run on the visitor's device. Lazy loading improves initial loading, while limiting per-frame work addresses animation lag.

## Optional E2E suite

Run this suite only on request. Install the browser once with `npx playwright install chromium`. The E2E suite starts a development server (or reuses localhost:3000) and fails on hydration warnings and uncaught browser errors on desktop and mobile, including reloads and modal interactions. Set `PLAYWRIGHT_BASE_URL` to check another running server. Development mode is intentional: production can omit attribute mismatch warnings.

If your regular browser reports mismatches containing `bis_skin_checked`, `bis_register`, or `cz-shortcut-listen`, try a clean browser profile with extensions disabled. The local development logs showed these attributes being injected into the HTML before hydration. Exclude localhost from the responsible extensions or disable those extensions while developing. The application does not suppress hydration warnings.
