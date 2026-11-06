"use client";

import { useMemo } from "react";
import DriftWall from "./drift-wall";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIntegration } from "@/features/integrations/integrations-slice";
import {
  selectFilteredIntegrations,
  selectVisibleSelectedIntegration,
} from "@/features/integrations/selectors";

export default function PlatformDriftWall({
  paused = false,
  onActivate,
  onHover,
}: {
  paused?: boolean;
  onActivate: (id: string, anchor: DOMRect) => void;
  onHover?: (id: string, anchor: DOMRect) => void;
}) {
  const dispatch = useAppDispatch();
  const integrations = useAppSelector(selectFilteredIntegrations);
  const selected = useAppSelector(selectVisibleSelectedIntegration);
  const items = useMemo(
    () =>
      integrations.map((item) => ({
        id: item.id,
        image: item.image.src,
        title: item.serviceName,
        alt: item.image.alt,
      })),
    [integrations],
  );

  return (
    <DriftWall
      items={items}
      columns={8}
      tileWidth={144}
      tileHeight={112}
      gap={12}
      tilt={12}
      turn={-12}
      perspective={1200}
      depth={80}
      speed={32}
      variance={0.45}
      parallax={0.4}
      lift={36}
      fade={0.45}
      dim={0.85}
      overlayColor="#e7eeff"
      imageFit="contain"
      pauseOnHover
      paused={paused}
      selectedId={selected?.id}
      onItemSelect={(item) => {
        if (typeof item.id === "string") dispatch(selectIntegration(item.id));
      }}
      onItemActivate={(item, anchor) => {
        if (typeof item.id === "string") onActivate(item.id, anchor);
      }}
      onItemHover={(item, anchor) => {
        if (typeof item.id === "string") onHover?.(item.id, anchor);
      }}
    />
  );
}
