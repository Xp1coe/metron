"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { InfiniteSpiralItem } from "./infinite-spiral";
import ViewportGallery from "./viewport-gallery";
import IntegrationModal from "./integration-modal";
import {
  IntegrationDescriptions,
  PlatformMetadata,
} from "./integration-details";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIntegration } from "@/features/integrations/integrations-slice";
import {
  selectAllIntegrations,
  selectSelectedIntegration,
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

export default function CaseSnapshots({
  view = "spiral",
}: {
  view?: "spiral" | "wall";
}) {
  const dispatch = useAppDispatch();
  const integrations = useAppSelector(selectAllIntegrations);
  const selected = useAppSelector(selectSelectedIntegration);
  const [modalOpen, setModalOpen] = useState(false);
  const Heading = view === "spiral" ? "h1" : "h2";
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
  const activateItem = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) setModalOpen(true);
  };

  return (
    <section
      aria-labelledby={`snapshots-${view}-heading`}
      data-gallery-view={view}
      className="snapshots-section mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-10"
    >
      <header className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#0739cf]">
          {view === "spiral"
            ? "CONNECTED SECURITY. IN ACTION."
            : "EXPLORE THE PLATFORM CATALOG"}
        </p>
        <Heading
          id={`snapshots-${view}-heading`}
          className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl"
        >
          {view === "spiral" ? "Case Snapshots" : "Platform Drift Wall"}
        </Heading>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
          Metron builds and supports integrations across all security and ITOps
          platforms. Explore our latest solutions in action.
        </p>
      </header>
      <div className="snapshots-grid grid min-w-0 items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="snapshots-spiral relative min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-[#f8faff]">
          <ViewportGallery>
            {items.length ? (
              view === "spiral" ? (
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
                  onItemActivate={activateItem}
                />
              ) : (
                <PlatformDriftWall
                  paused={modalOpen}
                  onActivate={activateItem}
                />
              )
            ) : (
              <p className="grid h-full place-items-center text-slate-500">
                No platforms available.
              </p>
            )}
          </ViewportGallery>
          {items.length > 0 && (
            <p className="pointer-events-none absolute inset-x-0 bottom-0 z-[200000] bg-gradient-to-t from-[#f8faff] via-[#f8faff]/95 to-transparent pb-5 pt-10 text-center text-xs text-slate-500">
              <span className="lg:hidden">
                {view === "spiral"
                  ? "Drag to explore"
                  : "Explore the drifting platforms"}{" "}
                &middot; Tap an icon for details
              </span>
              <span className="hidden lg:inline">
                {view === "spiral" ? "Drag to explore" : "Hover to pause"}{" "}
                &middot; Hover or select a platform
              </span>
            </p>
          )}
        </div>
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
      </div>
      <IntegrationModal
        integration={selected}
        open={modalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
