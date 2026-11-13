export type GuidePoint = {
  title: string;
  body: string;
};

export type GuideSection = {
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  points?: readonly GuidePoint[];
};

export type GuideStep = {
  title: string;
  body: string;
};

export type ServiceGuide = {
  sections: readonly GuideSection[];
  faqs: readonly { q: string; a: string }[];
  /** Used when the service does not already define its own steps. */
  process?: readonly GuideStep[];
};
