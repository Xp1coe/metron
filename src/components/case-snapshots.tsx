"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { InfiniteSpiralItem } from "./infinite-spiral";
import ViewportGallery from "./viewport-gallery";
import IntegrationModal from "./integration-modal";
import IntegrationFilters from "./integration-filters";
import IntegrationAppGrid from "./integration-app-grid";
import SegmentedToggle from "./segmented-toggle";
import {
  IntegrationDescriptions,
  PlatformMetadata,
} from "./integration-details";
import { placePreview, type PreviewBox } from "@/lib/preview-position";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIntegration,
  setGalleryView,
} from "@/features/integrations/integrations-slice";
import {
  selectFilteredIntegrations,
  selectGalleryView,
  selectShowsAppGrid,
  selectVisibleSelectedIntegration,
  selectIntegrationSearch,
  selectIntegrationCategory,
} from "@/features/integrations/selectors";

const galleryLoading = () => (
  <p
    role="status"
    className="grid h-full place-items-center text-sm text-slate-400"
  >
    Loading platforms…
  </p>
);
const InfiniteSpiral = dynamic(() => import("./infinite-spiral"), {
  loading: galleryLoading,
});
const PlatformDriftWall = dynamic(() => import("./platform-drift-wall"), {
  loading: galleryLoading,
});

export default function CaseSnapshots() {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectGalleryView);
  const showsGrid = useAppSelector(selectShowsAppGrid);
  const integrations = useAppSelector(selectFilteredIntegrations);
  const selected = useAppSelector(selectVisibleSelectedIntegration);
  const search = useAppSelector(selectIntegrationSearch);
  const category = useAppSelector(selectIntegrationCategory);
  // A card belongs to the gallery it was opened in. Any change closes it.
  const contextKey = [search, category, view, showsGrid].join("\u0000");
  const stageRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<
    (PreviewBox & { id: string; contextKey: string }) | null
  >(null);
  const closePreview = useCallback(() => setPreview(null), []);
  const previewItem =
    preview?.contextKey === contextKey
      ? integrations.find((item) => item.id === preview.id)
      : undefined;
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const items = useMemo(
    () =>
      integrations.map((item) => ({
        id: item.id,
        src: item.image.src,
        alt: item.image.alt,
        label: item.serviceName,
      })),
    [integrations],
  );
  const selectItem = (item: InfiniteSpiralItem) => {
    if (typeof item.id === "string") dispatch(selectIntegration(item.id));
  };
  /** Small screens show details in the modal. Returns whether it opened. */
  const openModalOnMobile = () => {
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    if (mobile) setModalOpen(true);
    return mobile;
  };
  /** Laptops and larger screens show the wall's Spotlight card beside the tile or app. */
  const showPreviewAt = (id: string, anchor: DOMRect) => {
    if (view !== "wall" || !window.matchMedia("(min-width: 1024px)").matches)
      return;
    const stage = stageRef.current?.getBoundingClientRect();
    if (!stage) return;
    setPreview({ id, contextKey, ...placePreview(stage, anchor) });
  };
  /** A tap opens the modal on small screens and the card on large touch screens. */
  const activateAt = (id: string, anchor: DOMRect) => {
    if (!openModalOnMobile()) showPreviewAt(id, anchor);
  };
  const previewOpen = Boolean(previewItem);
  useEffect(() => {
    if (!previewOpen) return;
    // Besides the pointer leaving the gallery, the card closes on a press
    // outside the card and the tiles, on Escape, and when keyboard focus moves
    // out of the gallery. Touch screens have no hover to end.
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        !target ||
        !stageRef.current?.contains(target) ||
        !target.closest("button, [data-spotlight-card]")
      )
        closePreview();
    };
    const handleFocusIn = (event: FocusEvent) => {
      if (
        event.target instanceof Node &&
        !stageRef.current?.contains(event.target)
      )
        closePreview();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewOpen, closePreview]);

  return (
    <section
      aria-labelledby="snapshots-heading"
      data-gallery-view={view}
      className={`snapshots-section w-full ${view === "spiral" ? "mx-auto max-w-[1320px] px-4 sm:px-8 lg:px-10" : "px-4 sm:px-6 lg:px-8"}`}
    >
      <header className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#0739cf]">
          {view === "spiral"
            ? "CONNECTED SECURITY. IN ACTION."
            : "EXPLORE THE PLATFORM CATALOG"}
        </p>
        <h1
          id="snapshots-heading"
          className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl"
        >
          Case Snapshots
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
          Metron builds and supports integrations across all security and ITOps
          platforms. Explore our latest solutions in action.
        </p>
        <SegmentedToggle
          label="Gallery"
          className="mt-6"
          value={view}
          onChange={(next) => dispatch(setGalleryView(next))}
          options={[
            { value: "wall", label: "Drift wall" },
            { value: "spiral", label: "Spiral" },
          ]}
        />
      </header>
      <IntegrationFilters />
      <div
        className={`snapshots-grid min-w-0 ${view === "spiral" ? "grid items-center gap-6 lg:grid-cols-2 lg:gap-10" : ""}`}
      >
        <div
          ref={stageRef}
          onMouseLeave={closePreview}
          className="snapshots-spiral relative min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-[#f8faff]"
        >
          <ViewportGallery>
            {items.length ? (
              showsGrid ? (
                <IntegrationAppGrid
                  items={integrations}
                  selectedId={selected?.id}
                  onSelect={(item) => dispatch(selectIntegration(item.id))}
                  onActivate={activateAt}
                  onHover={showPreviewAt}
                  onHoverEnd={closePreview}
                />
              ) : view === "spiral" ? (
                <InfiniteSpiral
                  items={items}
                  animationMode="all"
                  speed={0.55}
                  radius={170}
                  cardWidth={124}
                  cardHeight={104}
                  verticalSpacing={65}
                  perspective={1000}
                  cardRadius={10}
                  centerScale={1.2}
                  edgeBlur={0}
                  cardsPerTurn={7}
                  imageFit="contain"
                  pauseOnHover
                  paused={modalOpen}
                  selectedId={selected?.id}
                  onItemSelect={selectItem}
                  onItemActivate={openModalOnMobile}
                />
              ) : (
                <PlatformDriftWall
                  paused={modalOpen || previewOpen}
                  onActivate={activateAt}
                  onHover={showPreviewAt}
                />
              )
            ) : (
              <p className="grid h-full place-items-center text-slate-500">
                No integrations match your search. Try another name or reset the
                filters.
              </p>
            )}
          </ViewportGallery>
          {items.length > 0 && !showsGrid && (
            <p className="pointer-events-none absolute inset-x-0 bottom-0 z-[200000] bg-gradient-to-t from-[#f8faff] via-[#f8faff]/95 to-transparent pb-5 pt-10 text-center text-xs text-slate-500">
              <span className="lg:hidden">
                {view === "spiral"
                  ? "Drag to explore"
                  : "Explore the drifting platforms"}{" "}
                &middot; Tap an icon for details
              </span>
              <span className="hidden lg:inline">
                {view === "spiral" ? "Drag to explore" : "Hover to pause"}{" "}
                &middot;{" "}
                {view === "spiral"
                  ? "Hover or select a platform"
                  : "Hover or click a platform for details"}
              </span>
            </p>
          )}
          {view === "wall" && preview && previewItem && (
            <article
              aria-label="Integration Spotlight preview"
              data-spotlight-card
              className="absolute z-[200001] hidden flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl lg:flex"
              style={{
                left: preview.left,
                top: preview.top,
                width: preview.width,
                maxHeight: preview.maxHeight,
              }}
            >
              <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-2">
                <p className="text-xs font-semibold tracking-wider text-[#0739cf]">
                  INTEGRATION SPOTLIGHT
                </p>
                <button
                  type="button"
                  onClick={closePreview}
                  aria-label="Close integration preview"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  ×
                </button>
              </header>
              <div
                className="min-h-0 overflow-y-auto overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
                tabIndex={0}
                role="region"
                aria-label="Integration preview content"
              >
                <PlatformMetadata integration={previewItem} />
                <div className="mx-4 mb-4 grid gap-3">
                  <IntegrationDescriptions integration={previewItem} />
                </div>
              </div>
            </article>
          )}
        </div>
        {view === "spiral" && (
          <div className="snapshots-details hidden min-w-0 lg:flex">
            <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-slate-400">
              INTEGRATION SPOTLIGHT
            </p>
            {selected ? (
              <article
                aria-label="Selected platform details"
                className="snapshots-card flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)]"
              >
                <h2 className="sr-only">{selected.serviceName}</h2>
                <PlatformMetadata integration={selected} />
                <div
                  className="snapshots-description mx-4 mb-4 grid min-h-0 gap-4 overflow-y-auto overscroll-contain rounded-lg focus-visible:outline-2 focus-visible:outline-blue-600 sm:mx-5 sm:mb-5"
                  tabIndex={0}
                  role="region"
                  aria-label="Integration descriptions"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <IntegrationDescriptions integration={selected} />
                </div>
              </article>
            ) : (
              <p className="rounded-xl border border-slate-200 p-8 text-slate-500">
                Select a platform to explore its integrations.
              </p>
            )}
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              <span>Explore. Connect. Integrate.</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </div>
        )}
      </div>
      <IntegrationModal
        integration={selected}
        open={modalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
