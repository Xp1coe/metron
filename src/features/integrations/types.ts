export interface Integration {
  id: string;
  serviceName: string;
  image: { src: string; alt: string };
  platform: string;
  category: string;
  categories: string[];
  integrations: { id: string; name: string; description: string }[];
}
