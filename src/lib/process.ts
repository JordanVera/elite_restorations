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
    lead: "We come to the house, look closely, and listen.",
    body: "We walk the space, measure it, look at what is behind the surfaces, and talk about what you want and what is realistic.",
  },
  {
    index: "02",
    title: "Plan",
    lead: "We settle materials and the budget before work begins.",
    body: "We help you choose materials and finishes, review the budget together, and write down the work so there are few surprises later.",
  },
  {
    index: "03",
    title: "Prepare",
    lead: "The work you never see is done with care.",
    body: "We protect your home, then handle demolition and the layer under the finished floor, because a good finish depends on what is underneath.",
  },
  {
    index: "04",
    title: "Build",
    lead: "Our crew does the work itself.",
    body: "Our team handles the installation or the restoration, and you have one person to call with questions along the way.",
  },
  {
    index: "05",
    title: "Finish",
    lead: "We check the details twice.",
    body: "We look over the sealing, trim, grout, and touch-ups, so the small things look as good as the big ones.",
  },
  {
    index: "06",
    title: "Walk through",
    lead: "We clean up, then walk the finished work with you.",
    body: "After the cleanup we walk the finished work with you, so you can see it, ask questions, and feel settled about what you are looking at.",
  },
];
