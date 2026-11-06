"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

export interface InfiniteSpiralItem {
  id?: string | number;
  src: string;
  alt?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  label?: string;
}

export interface InfiniteSpiralProps {
  items?: Array<string | InfiniteSpiralItem>;
  speed?: number;
  direction?: "up" | "down";
  animationMode?: "auto" | "drag" | "scroll" | "all";
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  rotation?: number;
  cardTilt?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeFade?: number;
  edgeBlur?: number;
  pauseOnHover?: boolean;
  imageFit?: CSSProperties["objectFit"];
  grayscale?: number;
  className?: string;
  selectedId?: string | number;
  onItemSelect?: (item: InfiniteSpiralItem) => void;
  onItemActivate?: (item: InfiniteSpiralItem) => void;
  paused?: boolean;
}

type NormalizedItem = InfiniteSpiralItem & { alt: string };
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const modulo = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;
const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

/** React Bits InfiniteSpiral, extended with selection and keyboard support. */
export default function InfiniteSpiral({
  items = [],
  speed = 0.55,
  direction = "up",
  animationMode = "auto",
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardsPerTurn = 7,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 10,
  centerScale = 1.2,
  edgeFade = 0.3,
  edgeBlur = 6,
  pauseOnHover = true,
  imageFit = "cover",
  grayscale = 0,
  className = "",
  selectedId,
  onItemSelect,
  onItemActivate,
  paused = false,
}: InfiniteSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const visibleRef = useRef(false);
  const draggingRef = useRef(false);
  const startPointerYRef = useRef(0);
  const lastPointerYRef = useRef(0);
  const dragMovedRef = useRef(false);
  const requestRenderRef = useRef<() => void>(() => {});
  const normalizedItems = useMemo<NormalizedItem[]>(
    () =>
      items.map((item, index) =>
        typeof item === "string"
          ? { src: item, alt: `Spiral image ${index + 1}` }
          : { alt: `Spiral image ${index + 1}`, ...item },
      ),
    [items],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || normalizedItems.length === 0) return;
    let frameId = 0;
    let layoutDirty = true;
    let lastProgress = Number.NaN;
    let activeCards = new Set<number>();
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollEnabled = animationMode === "scroll" || animationMode === "all";
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55;
    let lastScrollY = window.scrollY;
    const resizeObserver = new ResizeObserver(() => {
      bounds = root.getBoundingClientRect();
      layoutDirty = true;
      requestRender();
    });
    resizeObserver.observe(root);
    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (
        paused ||
        !scrollEnabled ||
        !visibleRef.current ||
        focusedRef.current ||
        scrollDelta === 0 ||
        reducedMotion.matches
      )
        return;
      targetProgressRef.current += clamp(
        (scrollDelta * scrollSpeedMultiplier) /
          Math.max(verticalSpacing * 2, 1),
        -1.5,
        1.5,
      );
      requestRender();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const render = (time: number) => {
      frameId = 0;
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const autoEnabled = animationMode === "auto" || animationMode === "all";
      const motionPaused =
        paused ||
        draggingRef.current ||
        focusedRef.current ||
        (pauseOnHover && hoveredRef.current);
      const desiredAutoSpeed =
        autoEnabled &&
        visibleRef.current &&
        !reducedMotion.matches &&
        !motionPaused
          ? speed * (direction === "down" ? -1 : 1)
          : 0;
      autoSpeedRef.current +=
        (desiredAutoSpeed - autoSpeedRef.current) * (1 - Math.exp(-delta * 7));
      targetProgressRef.current += autoSpeedRef.current * delta;
      if (paused || reducedMotion.matches) {
        autoSpeedRef.current = 0;
        progressRef.current = targetProgressRef.current;
      } else {
        progressRef.current +=
          (targetProgressRef.current - progressRef.current) *
          (1 - Math.exp(-delta * (draggingRef.current ? 22 : 11)));
      }
      const count = normalizedItems.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      const fit = Math.min(
        1,
        width / (cardWidth * 2.8),
        height / (cardHeight * 2.35),
      );
      const responsiveRadius =
        Math.min(radius, Math.max(72, width * 0.36)) * fit;
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);
      // The old loop animated every catalog record, even thousands of pixels outside
      // the container. Bound the work to the viewport plus a small entry/exit margin.
      const windowHalf = Math.min(
        half,
        Math.ceil(height / (2 * Math.max(verticalSpacing * fit, 1)) + 1.5),
      );
      if (
        layoutDirty ||
        Math.abs(progressRef.current - lastProgress) > 0.0001 ||
        Number.isNaN(lastProgress)
      ) {
        const nextActiveCards = new Set<number>();
        const center = Math.floor(progressRef.current);
        for (
          let step = -Math.ceil(windowHalf);
          step <= Math.ceil(windowHalf);
          step++
        ) {
          const index = modulo(center + step, count);
          if (nextActiveCards.has(index)) continue;
          const card = cardRefs.current[index];
          if (!card) continue;
          const offset =
            modulo(index - progressRef.current + half, count) - half;
          if (Math.abs(offset) > windowHalf) continue;
          nextActiveCards.add(index);
          const edge = Math.min(Math.abs(offset) / Math.max(windowHalf, 1), 1);
          const edgeOpacity = 1 - smoothstep(fadeStart, 1, edge);
          const focus =
            1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
          const scale = (1 + (centerScale - 1) * focus) * fit;
          const angleRadians =
            ((offset * (360 / turnSize) + rotation) * Math.PI) / 180;
          const x = Math.sin(angleRadians) * responsiveRadius;
          const z = Math.cos(angleRadians) * responsiveRadius;
          const depthScale = clamp(
            perspective / Math.max(perspective - z, 1),
            0.72,
            1.45,
          );
          const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
          // Fade rear cards continuously as they cross the center behind the front card.
          const centerOverlap =
            1 - smoothstep(0, 0.65, Math.abs(Math.sin(angleRadians)));
          const opacity =
            edgeOpacity * (1 - 0.75 * (1 - depth) * centerOverlap);
          const blur = edgeBlur * smoothstep(0.35, 1, edge);
          if (!activeCards.has(index)) {
            const img = card.querySelector<HTMLImageElement>("img[data-src]");
            if (img && !img.getAttribute("src"))
              img.src = normalizedItems[index].src;
            card.style.willChange = "transform, opacity";
          }
          card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * verticalSpacing * fit}px, 0) rotateZ(${cardTilt}deg) scale(${scale * depthScale})`;
          card.style.opacity = opacity.toFixed(3);
          const filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
          if (card.style.filter !== filter) card.style.filter = filter;
          const zIndex = String(Math.round(depth * 100000) + index);
          if (card.style.zIndex !== zIndex) card.style.zIndex = zIndex;
          const pointerEvents = opacity > 0.25 ? "auto" : "none";
          if (card.style.pointerEvents !== pointerEvents)
            card.style.pointerEvents = pointerEvents;
        }
        for (const index of activeCards) {
          if (nextActiveCards.has(index)) continue;
          const card = cardRefs.current[index];
          if (!card) continue;
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.willChange = "auto";
          card.style.filter = "none";
        }
        activeCards = nextActiveCards;
        lastProgress = progressRef.current;
        layoutDirty = false;
      }
      const settling =
        Math.abs(autoSpeedRef.current) > 0.001 ||
        Math.abs(targetProgressRef.current - progressRef.current) > 0.001;
      const autoRunning =
        autoEnabled && !motionPaused && !reducedMotion.matches;
      if (
        visibleRef.current &&
        !document.hidden &&
        (autoRunning || settling || draggingRef.current)
      )
        frameId = requestAnimationFrame(render);
    };
    function requestRender() {
      if (!frameId && visibleRef.current && !document.hidden) {
        previousTime = performance.now();
        frameId = requestAnimationFrame(render);
      }
    }
    requestRenderRef.current = requestRender;
    const updateAnimation = () => {
      if (visibleRef.current && !document.hidden) {
        if (!frameId) {
          previousTime = performance.now();
          frameId = requestAnimationFrame(render);
        }
      } else {
        cancelAnimationFrame(frameId);
        frameId = 0;
        autoSpeedRef.current = 0;
        // Do not accumulate page-scroll motion while the component is offscreen.
        lastScrollY = window.scrollY;
      }
    };
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current =
          entry.isIntersecting && entry.intersectionRatio > 0;
        updateAnimation();
      },
      { threshold: [0, 0.01] },
    );
    intersectionObserver.observe(root);
    document.addEventListener("visibilitychange", updateAnimation);
    reducedMotion.addEventListener("change", updateAnimation);
    // Position the cards once even before the observer's initial callback.
    frameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", updateAnimation);
      reducedMotion.removeEventListener("change", updateAnimation);
      requestRenderRef.current = () => {};
    };
  }, [
    normalizedItems,
    speed,
    direction,
    animationMode,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
    pauseOnHover,
    paused,
  ]);

  const dragEnabled = animationMode === "drag" || animationMode === "all";
  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.style.cursor = dragEnabled ? "grab" : "default";
    requestRenderRef.current();
  };
  const rootStyle: CSSProperties = {
    perspective: `${perspective}px`,
    cursor: dragEnabled ? "grab" : "default",
    touchAction: dragEnabled ? "pan-x" : "auto",
    userSelect: dragEnabled ? "none" : "auto",
  };
  const imageStyle: CSSProperties = {
    width: cardWidth,
    height: cardHeight,
    maxWidth: "none",
    maxHeight: "none",
    objectFit: imageFit,
    filter: grayscale > 0 ? `grayscale(${clamp(grayscale, 0, 1)})` : undefined,
  };

  return (
    <div
      ref={rootRef}
      className={`relative isolate h-full min-h-0 w-full overflow-hidden ${className}`}
      style={rootStyle}
      onMouseEnter={() => {
        hoveredRef.current = true;
        requestRenderRef.current();
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        requestRenderRef.current();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focusedRef.current = false;
          requestRenderRef.current();
        }
      }}
      onPointerDown={(event) => {
        if (!dragEnabled || event.button !== 0) return;
        draggingRef.current = true;
        dragMovedRef.current = false;
        startPointerYRef.current = lastPointerYRef.current = event.clientY;
        targetProgressRef.current = progressRef.current;
        requestRenderRef.current();
      }}
      onPointerMove={(event) => {
        if (!draggingRef.current) return;
        if (
          !dragMovedRef.current &&
          Math.abs(event.clientY - startPointerYRef.current) <= 5
        )
          return;
        if (!dragMovedRef.current) {
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.style.cursor = "grabbing";
        }
        dragMovedRef.current = true;
        targetProgressRef.current -=
          (event.clientY - lastPointerYRef.current) /
          Math.max(verticalSpacing, 1);
        lastPointerYRef.current = event.clientY;
        requestRenderRef.current();
      }}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId))
          stopDragging(event);
      }}
      onClickCapture={(event) => {
        if (dragMovedRef.current) {
          event.preventDefault();
          event.stopPropagation();
          dragMovedRef.current = false;
        }
      }}
    >
      <div
        className="absolute inset-0"
        role="list"
        aria-label="Security platform integrations"
      >
        {normalizedItems.map((item, index) => {
          const content = (
            // Plain images allow the supplied component to support arbitrary URLs and SVGs without Next image configuration.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="block h-full w-full select-none object-center"
              src={index < 4 ? item.src : undefined}
              data-src={item.src}
              alt={item.alt}
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              style={imageStyle}
            />
          );
          const select = () => {
            if (!draggingRef.current) onItemSelect?.(item);
          };
          const activate = () => {
            if (draggingRef.current) return;
            onItemSelect?.(item);
            onItemActivate?.(item);
          };
          const focus = (
            event: ReactFocusEvent<HTMLAnchorElement | HTMLButtonElement>,
          ) => {
            focusedRef.current = true;
            // Only keyboard focus recenters a card; moving it during a tap can lose the click.
            if (event.currentTarget.matches(":focus-visible")) {
              const count = normalizedItems.length;
              const offset =
                modulo(index - progressRef.current + count / 2, count) -
                count / 2;
              targetProgressRef.current = progressRef.current += offset;
            }
            autoSpeedRef.current = 0;
            requestRenderRef.current();
            onItemSelect?.(item);
          };
          const interactiveClass =
            "block h-full w-full cursor-pointer overflow-hidden rounded-[inherit] focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-blue-600";
          return (
            <div
              key={item.id ?? `${item.src}-${index}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              role="listitem"
              className="absolute left-1/2 top-1/2 overflow-hidden border bg-white opacity-0 shadow-[0_8px_24px_rgba(25,50,95,0.10)] transition-opacity duration-200 ease-out motion-reduce:transition-none [backface-visibility:hidden]"
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: cardRadius,
                pointerEvents: "none",
                borderColor:
                  selectedId != null && selectedId === item.id
                    ? "#3165ff"
                    : "#e2e8f0",
              }}
              onPointerEnter={select}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.target}
                  rel={item.target === "_blank" ? "noreferrer" : undefined}
                  className={interactiveClass}
                  onFocus={focus}
                  onClick={activate}
                  aria-label={item.label ?? item.alt}
                >
                  {content}
                </a>
              ) : onItemSelect || onItemActivate ? (
                <button
                  type="button"
                  className={interactiveClass}
                  onFocus={focus}
                  onClick={activate}
                  aria-label={item.label ?? item.alt}
                  aria-pressed={selectedId != null && selectedId === item.id}
                >
                  {content}
                </button>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
