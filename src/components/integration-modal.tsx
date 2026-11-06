"use client";

import { useEffect, useId, useRef } from "react";
import type { Integration } from "@/features/integrations/types";
import {
  IntegrationDescriptions,
  PlatformMetadata,
} from "./integration-details";

interface IntegrationModalProps {
  integration: Integration | undefined;
  open: boolean;
  onClose: () => void;
}

export default function IntegrationModal({
  integration,
  open,
  onClose,
}: IntegrationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open || !integration) return;
    // Desktop shows details in the Spotlight panel or the wall preview, so the
    // modal closes when a resize or rotation crosses into the desktop layout.
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (desktop.matches) {
      onClose();
      return;
    }
    const handleResize = () => {
      if (desktop.matches) onClose();
    };
    desktop.addEventListener("change", handleResize);
    // The native dialog traps focus, makes the page inert, and restores focus.
    dialog.showModal();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      desktop.removeEventListener("change", handleResize);
      document.documentElement.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [open, integration, onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="integration-modal rounded-2xl border border-slate-200 bg-white p-0 text-slate-950 shadow-2xl"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
    >
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold tracking-[0.15em] text-[#0739cf]">
            PLATFORM DETAILS
          </p>
          <h2
            id={titleId}
            className="text-lg font-semibold [overflow-wrap:anywhere]"
          >
            {integration?.serviceName}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close integration details"
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <div
        tabIndex={0}
        role="region"
        aria-label="Integration details content"
        className="min-h-0 overflow-y-auto overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
      >
        {integration && (
          <>
            <PlatformMetadata integration={integration} />
            <div className="mx-4 mb-4 grid gap-4 sm:mx-5 sm:mb-5">
              <IntegrationDescriptions integration={integration} />
            </div>
          </>
        )}
      </div>
      <footer className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
        <p className="text-xs text-slate-500">Explore. Connect. Integrate.</p>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 cursor-pointer rounded-lg bg-[#0739cf] px-5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Done
        </button>
      </footer>
    </dialog>
  );
}
