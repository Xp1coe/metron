"use client";

import Image from "next/image";
import type { Integration } from "@/features/integrations/types";

interface IntegrationAppGridProps {
  items: Integration[];
  selectedId?: string;
  onSelect: (item: Integration) => void;
  /** Click, tap, or keyboard activation, with the app's viewport rectangle. */
  onActivate: (id: string, anchor: DOMRect) => void;
  /** Mouse hover or keyboard focus, with the app's viewport rectangle. */
  onHover?: (id: string, anchor: DOMRect) => void;
  onHoverEnd?: () => void;
}

export default function IntegrationAppGrid({
  items,
  selectedId,
  onSelect,
  onActivate,
  onHover,
  onHoverEnd,
}: IntegrationAppGridProps) {
  return (
    <div
      onScroll={(event) => {
        if (!onHover) return;
        // Scrolling moves apps away from a card anchored to them. Browsers
        // also scroll a keyboard-focused app into view after its focus event,
        // so follow that app while it is visible and otherwise dismiss.
        const bounds = event.currentTarget.getBoundingClientRect();
        const focused = event.currentTarget.querySelector<HTMLElement>(
          "button[data-app-id]:focus-visible",
        );
        const anchor = focused?.getBoundingClientRect();
        if (
          focused?.dataset.appId &&
          anchor &&
          anchor.bottom > bounds.top &&
          anchor.top < bounds.bottom
        )
          onHover(focused.dataset.appId, anchor);
        else onHoverEnd?.();
      }}
      // The wall's stage fills the screen, so its grid hands scrolling back to
      // the page at either end instead of trapping touch scrolling.
      className="h-full overflow-y-auto overscroll-contain p-4 sm:p-6 [[data-gallery-view=wall]_&]:overscroll-auto"
    >
      <div
        role="list"
        aria-label="Integration apps"
        className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] content-start gap-4"
      >
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <button
              type="button"
              data-app-id={item.id}
              aria-label={item.serviceName}
              aria-pressed={selectedId === item.id}
              onMouseEnter={(event) => {
                onSelect(item);
                onHover?.(item.id, event.currentTarget.getBoundingClientRect());
              }}
              onFocus={(event) => {
                onSelect(item);
                onHover?.(item.id, event.currentTarget.getBoundingClientRect());
              }}
              onClick={(event) => {
                onSelect(item);
                onActivate(
                  item.id,
                  event.currentTarget.getBoundingClientRect(),
                );
              }}
              className="group flex h-full w-full cursor-pointer flex-col items-center gap-3 rounded-xl p-3 text-center transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-blue-600 motion-reduce:transition-none"
            >
              <span
                className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border shadow-sm transition-transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none"
                style={{
                  backgroundColor: item.palette.background,
                  borderColor:
                    selectedId === item.id
                      ? item.palette.foreground
                      : item.palette.border,
                }}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </span>
              <span
                className="text-sm font-semibold leading-5 [overflow-wrap:anywhere]"
                style={{ color: item.palette.foreground }}
              >
                {item.serviceName}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
