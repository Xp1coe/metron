"use client";

import Image from "next/image";
import type { Integration } from "@/features/integrations/types";

interface IntegrationAppGridProps {
  items: Integration[];
  selectedId?: string;
  onSelect: (item: Integration) => void;
  onActivate: () => void;
  onPreview?: (id: string, anchor: DOMRect) => void;
}

export default function IntegrationAppGrid({
  items,
  selectedId,
  onSelect,
  onActivate,
  onPreview,
}: IntegrationAppGridProps) {
  return (
    <div className="h-full overflow-y-auto overscroll-contain p-4 sm:p-6">
      <div
        role="list"
        aria-label="Integration apps"
        className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] content-start gap-4"
      >
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <button
              type="button"
              aria-label={item.serviceName}
              aria-pressed={selectedId === item.id}
              onMouseEnter={(event) => {
                onSelect(item);
                onPreview?.(
                  item.id,
                  event.currentTarget.getBoundingClientRect(),
                );
              }}
              onFocus={(event) => {
                onSelect(item);
                onPreview?.(
                  item.id,
                  event.currentTarget.getBoundingClientRect(),
                );
              }}
              onClick={(event) => {
                onSelect(item);
                onPreview?.(
                  item.id,
                  event.currentTarget.getBoundingClientRect(),
                );
                onActivate();
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
