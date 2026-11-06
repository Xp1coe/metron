import type { ReactNode } from "react";
import { TbLayoutGrid, TbSpiral, TbWall } from "react-icons/tb";
import type { GalleryView } from "@/features/integrations/types";

/** Names and icons for the gallery choices, shared by both toggles. */
export const galleryOptions: Record<
  GalleryView,
  { label: string; icon: ReactNode }
> = {
  wall: { label: "Drift wall", icon: <TbWall aria-hidden="true" /> },
  spiral: { label: "Spiral", icon: <TbSpiral aria-hidden="true" /> },
};

export const gridOption = {
  label: "Grid view",
  icon: <TbLayoutGrid aria-hidden="true" />,
};
