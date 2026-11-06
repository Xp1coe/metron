"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
} from "react";
import {
  centeringCopy,
  centeringOffset,
  trackShift,
  wallCopies,
  wallReach,
} from "@/lib/drift-wall-layout";

export interface DriftWallItem {
  id?: string | number;
  image: string;
  title?: string;
  alt?: string;
  href?: string;
}

export interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: "up" | "down";
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: CSSProperties;
  imageFit?: CSSProperties["objectFit"];
  selectedId?: string | number;
  paused?: boolean;
  onItemSelect?: (item: DriftWallItem) => void;
  /** Click, tap, or keyboard activation, with the tile's viewport rectangle. */
  onItemActivate?: (item: DriftWallItem, anchor: DOMRect) => void;
  /** Mouse hover or keyboard focus, with the tile's viewport rectangle. */
  onItemHover?: (item: DriftWallItem, anchor: DOMRect) => void;
}

const EMPTY_ITEMS: DriftWallItem[] = [];
const cx = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join(" ");
const columnFactor = (index: number, variance: number) =>
  1 + variance * (((index * 0.6180339887 + 0.35) % 1) * 2 - 1);

/** Supplied React Bits DriftWall, adapted for selection, responsive columns, and visibility. */
export default function DriftWall({
  items = EMPTY_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = "up",
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = "#060010",
  className = "",
  style,
  imageFit = "cover",
  selectedId,
  paused = false,
  onItemSelect,
  onItemActivate,
  onItemHover,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const activeIdRef = useRef<string | null>(null);
  const hoveredColRef = useRef(-1);
  const focusedColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const reducedRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  // Deterministic initial measurements keep server and client markup identical.
  const [size, setSize] = useState({ width: 600, height: 600 });
  const [activeId, setActiveId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const initialBounds = container.getBoundingClientRect();
    setSize({ width: initialBounds.width, height: initialBounds.height });
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height },
      );
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const columnCount = Math.max(
    1,
    Math.min(
      Math.floor(columns),
      Math.floor(size.width / Math.max(tileWidth + gap, 1)),
    ),
  );
  const columnItems = useMemo(() => {
    const cols: DriftWallItem[][] = Array.from(
      { length: columnCount },
      () => [],
    );
    items.forEach((item, index) => cols[index % columnCount].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columnCount]);
  const reach = wallReach(size.height);
  const columnMeta = useMemo(
    () =>
      columnItems.map((col) => {
        const copyHeight = Math.max(
          tileHeight + gap,
          col.length * (tileHeight + gap),
        );
        return { copyHeight, copies: wallCopies(reach, copyHeight) };
      }),
    [columnItems, tileHeight, gap, reach],
  );
  // The plane is as tall as its tallest track and is centered on the stage.
  const planeHeight = useMemo(
    () =>
      Math.max(0, ...columnMeta.map((meta) => meta.copyHeight * meta.copies)),
    [columnMeta],
  );
  const baseVelocities = useMemo(
    () =>
      columnItems.map(
        (_, index) =>
          speed *
          columnFactor(index, variance) *
          (direction === "up" ? 1 : -1) *
          (index % 2 === 0 ? 1 : -1),
      ),
    [columnItems, speed, direction, variance],
  );

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      if (planeRef.current)
        planeRef.current.style.transform = `translate(-50%, -50%) scale(1.18) rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth],
  );

  useEffect(() => {
    offsetsRef.current = columnMeta.map(
      (meta, index) => meta.copyHeight * ((index * 0.37) % 1),
    );
    velocitiesRef.current = columnMeta.map(() => 0);
  }, [columnMeta]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;
    let frame: number | null = null;
    let previousTime: number | null = null;
    let visible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = reducedMotion.matches;

    const animate = (time: number) => {
      frame = null;
      const delta = Math.min(
        0.05,
        Math.max(0, time - (previousTime ?? time)) / 1000,
      );
      previousTime = time;
      const keyboardPaused = focusedColRef.current !== -1;
      const motionPaused = paused || keyboardPaused || reducedRef.current;
      const strength = motionPaused ? 0 : parallax * 8;
      const damp = 1 - Math.exp(-delta / 0.12);
      pointerDampedRef.current.x +=
        (pointerRef.current.x * strength - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y +=
        (-pointerRef.current.y * strength - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(
        pointerDampedRef.current.x,
        pointerDampedRef.current.y,
      );

      columnMeta.forEach((meta, index) => {
        const columnPaused =
          motionPaused ||
          (wallHoveredRef.current && pauseOnHover) ||
          hoveredColRef.current === index;
        const target = columnPaused ? 0 : baseVelocities[index];
        velocitiesRef.current[index] +=
          (target - velocitiesRef.current[index]) *
          (1 - Math.exp(-delta / (target === 0 ? 0.16 : 0.28)));
        if (!motionPaused) {
          const next =
            (offsetsRef.current[index] ?? 0) +
            velocitiesRef.current[index] * delta;
          offsetsRef.current[index] =
            ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
        }
        const track = trackRefs.current[index];
        if (track)
          track.style.transform = `translate3d(0, ${trackShift(planeHeight, reach, offsetsRef.current[index] ?? 0)}px, 0)`;
      });
      if (visible && !document.hidden && !paused && !reducedRef.current)
        frame = requestAnimationFrame(animate);
    };
    const updateAnimation = () => {
      if (visible && !document.hidden) {
        if (frame === null) {
          previousTime = null;
          frame = requestAnimationFrame(animate);
        }
      } else {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previousTime = null;
        velocitiesRef.current.fill(0);
      }
    };
    const handleReducedMotion = () => {
      reducedRef.current = reducedMotion.matches;
      updateAnimation();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0;
        updateAnimation();
      },
      { threshold: [0, 0.01] },
    );
    observer.observe(container);
    document.addEventListener("visibilitychange", updateAnimation);
    reducedMotion.addEventListener("change", handleReducedMotion);
    // Render a stationary first frame even before intersection is reported.
    frame = requestAnimationFrame(animate);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateAnimation);
      reducedMotion.removeEventListener("change", handleReducedMotion);
    };
  }, [
    items.length,
    columnMeta,
    planeHeight,
    reach,
    baseVelocities,
    pauseOnHover,
    parallax,
    applyPlaneTransform,
    paused,
  ]);

  const activate = (key: string, column: number, item: DriftWallItem) => {
    if (activeIdRef.current === key) return;
    activeIdRef.current = key;
    hoveredColRef.current = column;
    setActiveId(key);
    onItemSelect?.(item);
  };
  const release = () => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (bounds && parallax > 0 && !reducedRef.current && !paused)
      pointerRef.current = {
        x: (event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5,
        y: (event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5,
      };
  };
  const focusTile = (
    event: FocusEvent<HTMLElement>,
    key: string,
    column: number,
    copy: number,
    index: number,
    item: DriftWallItem,
  ) => {
    focusedColRef.current = column;
    velocitiesRef.current.fill(0);
    if (event.currentTarget.matches(":focus-visible")) {
      // Bring the keyboard-focused tile to the center of the plane.
      offsetsRef.current[column] = centeringOffset(
        reach,
        columnMeta[column].copyHeight,
        (index + 0.5) * (tileHeight + gap),
        copy,
      );
      const track = trackRefs.current[column];
      if (track)
        track.style.transform = `translate3d(0, ${trackShift(planeHeight, reach, offsetsRef.current[column])}px, 0)`;
    }
    activate(key, column, item);
    // A responsive column rebuild can reuse a tile key for a different platform.
    // Keyboard focus must always select the actual focused record.
    onItemSelect?.(item);
  };

  const mask =
    "radial-gradient(ellipse 78% 82% at 50% 46%, #000 var(--dw-edge), transparent 100%), linear-gradient(to top, #000 var(--dw-edge), transparent 100%)";
  const cssVars = {
    "--dw-tile-w": `${tileWidth}px`,
    "--dw-tile-h": `${tileHeight}px`,
    "--dw-gap": `${gap}px`,
    "--dw-radius": `${radius}px`,
    "--dw-lift": `${lift}px`,
    "--dw-dim": dim,
    "--dw-gray": grayscale ? 1 : 0,
    "--dw-overlay": overlayColor,
    "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
    perspective: `${perspective}px`,
    perspectiveOrigin: "50% 50%",
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
    ...style,
  } as CSSProperties;
  const innerClass = cx(
    "pointer-events-none absolute inset-[calc(var(--dw-gap)/2)] block overflow-hidden bg-white rounded-[var(--dw-radius)] border border-slate-200 opacity-[var(--dw-dim)] [transform:translateZ(0)]",
    "transition-[transform,opacity,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
    "group-[.is-active]/tile:opacity-100 group-[.is-active]/tile:[transform:translateZ(var(--dw-lift))] group-[.is-active]/tile:shadow-[0_12px_30px_-12px_rgba(15,23,42,0.4)]",
    "group-focus-visible/tile:opacity-100 group-focus-visible/tile:[transform:translateZ(var(--dw-lift))] group-focus-visible/tile:ring-2 group-focus-visible/tile:ring-blue-600",
  );

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Drifting wall of platforms"
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        wallHoveredRef.current = false;
        pointerRef.current = { x: 0, y: 0 };
        release();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focusedColRef.current = -1;
          release();
        }
      }}
    >
      <div
        ref={planeRef}
        data-drift-plane
        // The plane, columns, tracks, and tiles share one 3D plane, so the
        // browser can sort an empty layer in front of a tile. Only the tiles
        // take pointer input, which keeps every tile hoverable and tappable.
        className="pointer-events-none absolute left-1/2 top-1/2 flex flex-row [transform-style:preserve-3d] [transform-origin:50%_50%] will-change-transform"
      >
        {columnItems.map((col, column) => (
          <div
            key={column}
            className="relative w-[calc(var(--dw-tile-w)+var(--dw-gap))] shrink-0 [transform-style:preserve-3d]"
          >
            <div
              ref={(node) => {
                trackRefs.current[column] = node;
              }}
              data-drift-track
              className="flex flex-col [transform-style:preserve-3d] will-change-transform"
            >
              {Array.from({ length: columnMeta[column].copies }, (_, copy) =>
                col.map((item, index) => {
                  const key = `${column}-${copy}-${index}`;
                  const content = (
                    <span className={innerClass}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.alt ?? item.title ?? ""}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="block h-full w-full select-none [filter:grayscale(var(--dw-gray))] group-[.is-active]/tile:[filter:grayscale(0)]"
                        style={{ objectFit: imageFit }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[var(--dw-overlay)] opacity-20 transition-opacity duration-[420ms] group-[.is-active]/tile:opacity-0 group-focus-visible/tile:opacity-0 motion-reduce:transition-none"
                      />
                    </span>
                  );
                  const common = {
                    className: cx(
                      "group/tile pointer-events-auto relative block h-[calc(var(--dw-tile-h)+var(--dw-gap))] w-full flex-none cursor-pointer outline-none [transform-style:preserve-3d]",
                      activeId === key && "is-active",
                    ),
                    "data-tile-id": key,
                    "aria-label": item.title ?? "Platform",
                    // Only the copy that can be centered without leaving a
                    // gap in its column is reachable with the keyboard.
                    tabIndex:
                      copy ===
                      centeringCopy(
                        reach,
                        columnMeta[column].copyHeight,
                        (index + 0.5) * (tileHeight + gap),
                      )
                        ? 0
                        : -1,
                    onFocus: (event: FocusEvent<HTMLElement>) => {
                      focusTile(event, key, column, copy, index, item);
                      onItemHover?.(
                        item,
                        event.currentTarget.getBoundingClientRect(),
                      );
                    },
                    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
                      activate(key, column, item);
                      // Touch has no hover; a tap is reported as an activation.
                      if (event.pointerType === "mouse")
                        onItemHover?.(
                          item,
                          event.currentTarget.getBoundingClientRect(),
                        );
                    },
                    onClick: (event: React.MouseEvent<HTMLElement>) => {
                      onItemSelect?.(item);
                      onItemActivate?.(
                        item,
                        event.currentTarget.getBoundingClientRect(),
                      );
                    },
                  };
                  return item.href ? (
                    <a
                      key={`${item.id ?? item.image}-${copy}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      {...common}
                    >
                      {content}
                    </a>
                  ) : (
                    <button
                      key={`${item.id ?? item.image}-${copy}`}
                      type="button"
                      aria-pressed={
                        selectedId != null && selectedId === item.id
                      }
                      {...common}
                    >
                      {content}
                    </button>
                  );
                }),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
