"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Keep a stable server-rendered placeholder; load animation code near the viewport. */
export default function ViewportGallery({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={rootRef} className="h-full w-full">
      {ready ? (
        children
      ) : (
        <p
          role="status"
          className="grid h-full place-items-center text-sm text-slate-400"
        >
          Loading platforms…
        </p>
      )}
    </div>
  );
}
