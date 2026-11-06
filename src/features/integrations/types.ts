export interface Integration {
  id: string;
  serviceName: string;
  image: { src: string; alt: string };
  platform: string;
  category: string;
  categories: string[];
  palette: { foreground: string; background: string; border: string };
  integrations: { id: string; name: string; description: string }[];
}

/** Which animated gallery the Case Snapshots section shows. */
export type GalleryView = "wall" | "spiral";
/** Whether platforms appear in the animated gallery or as a grid of apps. */
export type GalleryLayout = "animation" | "grid";
