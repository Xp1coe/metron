export interface Integration {
  id: string;
  serviceName: string;
  image: { src: string; alt: string };
  platform: string;
  category: string;
  integrations: { id: string; name: string; description: string }[];
}
