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
