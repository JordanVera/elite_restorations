export type NeighborhoodLink = {
  href: string;
  label: string;
  note?: string;
};

export type NeighborhoodPage = {
  slug: string;
  path: string;
  name: string;
  title: string;
  description: string;
  lede: string;
  paragraphs: readonly string[];
  services: readonly NeighborhoodLink[];
  faqs: readonly { q: string; a: string }[];
  also: readonly NeighborhoodLink[];
  ctaTitle: string;
  ctaBody: string;
};
