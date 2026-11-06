"use client";

import { useId } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import SegmentedToggle from "./segmented-toggle";
import { galleryOptions, gridOption } from "./gallery-icons";
import {
  resetIntegrationFilters,
  setGalleryLayout,
  setIntegrationCategory,
  setIntegrationSearch,
} from "@/features/integrations/integrations-slice";
import {
  selectAllIntegrations,
  selectFilteredIntegrations,
  selectGalleryView,
  selectIntegrationCategories,
  selectIntegrationCategory,
  selectIntegrationSearch,
  selectIntegrationsFiltered,
  selectShowsAppGrid,
} from "@/features/integrations/selectors";

export default function IntegrationFilters() {
  const id = useId();
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectIntegrationSearch);
  const category = useAppSelector(selectIntegrationCategory);
  const categories = useAppSelector(selectIntegrationCategories);
  const results = useAppSelector(selectFilteredIntegrations);
  const all = useAppSelector(selectAllIntegrations);
  const view = useAppSelector(selectGalleryView);
  const filtered = useAppSelector(selectIntegrationsFiltered);
  const showsGrid = useAppSelector(selectShowsAppGrid);

  return (
    <div className="mx-auto mt-6 max-w-4xl">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.55fr)] lg:grid-cols-[minmax(0,1fr)_minmax(12rem,0.55fr)_auto]">
        <div>
          <label
            htmlFor={`${id}-search`}
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Search integrations
          </label>
          <div className="relative">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              id={`${id}-search`}
              type="search"
              value={search}
              onChange={(event) =>
                dispatch(setIntegrationSearch(event.target.value))
              }
              placeholder="Search platforms or integrations…"
              className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-2 focus:outline-blue-600"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={`${id}-category`}
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Filter by category
          </label>
          <select
            id={`${id}-category`}
            value={category}
            onChange={(event) =>
              dispatch(setIntegrationCategory(event.target.value))
            }
            className="h-12 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:border-blue-600 focus:outline-2 focus:outline-blue-600"
          >
            <option value="">All categories</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <p
            id={`${id}-layout`}
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Show as
          </p>
          <SegmentedToggle
            label="Show as"
            labelledBy={`${id}-layout`}
            className="w-full"
            value={showsGrid ? "grid" : "animation"}
            onChange={(layout) => dispatch(setGalleryLayout(layout))}
            options={[
              {
                value: "animation",
                ...galleryOptions[view],
                // Search and category results are always shown as a grid.
                disabled: filtered,
                hint: "Reset the filters to show this view",
              },
              { value: "grid", ...gridOption },
            ]}
          />
        </div>
      </div>
      <div className="mt-3 flex min-h-6 items-center justify-between gap-3 text-xs text-slate-500">
        <p role="status" aria-live="polite">
          Showing {results.length} of {all.length} platforms
        </p>
        {(search || category) && (
          <button
            type="button"
            onClick={() => dispatch(resetIntegrationFilters())}
            className="cursor-pointer rounded px-1 py-1 font-medium text-[#0739cf] hover:underline focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
