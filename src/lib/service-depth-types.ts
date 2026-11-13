export type DepthDetail = {
  title: string;
  body: string;
};

export type DepthLink = {
  href: string;
  label: string;
};

export type ServiceDepth = {
  moreIntro: string[];
  moreLocal: string[];
  factorsHeading: string;
  factorsIntro: string;
  factors: DepthDetail[];
  process: DepthDetail[];
  signsHeading: string;
  signs: DepthDetail[];
  materialsHeading: string;
  materialsIntro: string;
  materials: DepthDetail[];
  costHeading: string;
  costIntro: string[];
  costFactors: DepthDetail[];
  ranges: { label: string; range: string }[];
  rangeNote: string;
  insurance?: {
    heading: string;
    paragraphs: string[];
    links?: DepthLink[];
  };
  faqs: { q: string; a: string }[];
};
