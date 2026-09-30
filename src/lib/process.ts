export type ProcessStep = {
  index: string;
  title: string;
  lead: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Consult",
    lead: "We come to you, look closely, and listen.",
    body: "A walkthrough of the space, measurements, an inspection of what is behind the surfaces, and a conversation about what you want and what is realistic.",
  },
  {
    index: "02",
    title: "Plan",
    lead: "Materials and budget, settled before work begins.",
    body: "We help you choose materials and finishes, review the budget together, and define the scope so there are few surprises later.",
  },
  {
    index: "03",
    title: "Prepare",
    lead: "The work you never see, done properly.",
    body: "Protecting your home, then demolition or surface, subfloor and site preparation, because good finishes depend on what is underneath.",
  },
  {
    index: "04",
    title: "Build",
    lead: "Skilled hands on the actual work.",
    body: "Installation or restoration carried out by our team, with one point of contact for questions along the way.",
  },
  {
    index: "05",
    title: "Finish",
    lead: "Details, checked twice.",
    body: "Sealing, trim, grout, touch-ups and quality checks, so the small things look as good as the big ones.",
  },
  {
    index: "06",
    title: "Walk through",
    lead: "We clean up, then we walk it with you.",
    body: "A final cleanup and a walkthrough of the finished work, so you see it, question it and sign off with confidence.",
  },
];
