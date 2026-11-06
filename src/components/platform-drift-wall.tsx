"use client";

import { useMemo } from "react";
import DriftWall from "./drift-wall";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIntegration } from "@/features/integrations/integrations-slice";
import {
  selectAllIntegrations,
  selectSelectedIntegration,
} from "@/features/integrations/selectors";

export default function PlatformDriftWall({
  paused = false,
  onActivate,
}: {
  paused?: boolean;
  onActivate: () => void;
}) {
  const dispatch = useAppDispatch();
  const integrations = useAppSelector(selectAllIntegrations);
  const selected = useAppSelector(selectSelectedIntegration);
  const items = useMemo(
    () =>
      integrations.map((item) => ({
        id: item.id,
        image: item.image.src,
        title: item.serviceName,
      })),
    [integrations],
  );

  return (
    <DriftWall
      items={items}
      columns={5}
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
      onItemActivate={onActivate}
    />
  );
}
