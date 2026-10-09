export type Testimonial = {
  quote: string;
  author: string;
  detail: string;
  source: string;
  rating: number;
};

/** Google listing for Elite Restorations, 511 Crestwater Ct, Houston. */
export const googleReviews = {
  score: 4.8,
  count: 83,
  fiveStarCount: 76,
  href: "https://www.google.com/maps/place/?q=place_id:ChIJxXXLtHLBQIYRoQotAZs5SWw",
} as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Elite Restorations truly came to my rescue during an emergency when all the water pipes burst at my Bryan property. Carlos and Jose showed up quickly, handled everything with urgency and professionalism, and got the situation under control when I needed it most.\n\nI also want to give a special thank you to George, the owner, and his entire team. This level of service is a direct reflection of strong leadership and a company that truly stands behind its work.\n\nThis wasn’t my first time working with them either. They’ve completed renovations on multiple properties for me in Galena Park, Bryan, and Marlin, Texas, and every single time the results have been phenomenal. They consistently transform my homes into spaces that feel clean, comfortable, and even have a luxury touch.\n\nTo this day, I still receive compliments on how well those homes were renovated, which speaks volumes about their quality and attention to detail.\n\nIf you’re looking for a reliable, skilled, and trustworthy team, Elite Restorations is it. I’ll definitely continue using them for my future flip projects.",
    author: "Catricia Roberson",
    detail: "Water damage and renovations",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "We recently completed a bathroom remodel and could not be happier with the experience. From the initial consultation to the final walkthrough, the team was professional, responsive, and genuinely cared about delivering a quality result.\n\nThe communication throughout the project was excellent. They took the time to answer our questions, kept us informed of progress, and made sure every detail was completed to our expectations. The craftsmanship and attention to detail were outstanding, and the finished bathroom exceeded what we had envisioned.\n\nWhat stood out most was how easy they made the entire process. Remodeling can be stressful, but their organization, expertise, and commitment to customer satisfaction gave us confidence every step of the way.\n\nWe would gladly recommend them to anyone looking for a trustworthy and skilled company. Thank you for a great experience and a beautiful new bathroom.",
    author: "Patrick Polomsky",
    detail: "Bathroom remodel",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "I can't say enough about the great job that the Elite Restorations' team did to my kitchen. Everyone from the beginning of the quote process to the completed job were fanominal! Their customer service, communication, & promptness was by far the best experience I've ever had during a home remodel job! I have other work down the line & I'm looking forward to working withthem again, very soon! My kitchen doesn't look the same, I love it!\n\nThanks George, Douglas, Juan, the pleasant lady in the office, who I spoke with prior to the start of the job, & the amazing install guys!",
    author: "Shronda Allen",
    detail: "Kitchen remodel",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "The team at Elite were great! They completed multiple projects for my family and each was done with care and expertise. George and Daniela were very attentive to my text and phone calls even responding after hours. I would definitely recommend this company for any future projects. We have just reached out to him again to help us with our backyard.",
    author: "Amy Davidson",
    detail: "Repeat home projects",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "We have really enjoyed working with Elite Restorations to convert our dining room into a home office. Their customer service is excellent & their work is exceptional. They were in constant contact with us during our project to keep us posted on each step. We are very pleased with the finished project.",
    author: "Wanda Tezeno",
    detail: "Dining room to home office",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Elite has once again offered the BEST SERVICE. It was a minor job but they were there to help! Highly recommend!!!",
    author: "John Wilson",
    detail: "Repeat customer",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "We were very pleased with Elite Restorations. George went out of his way to ensure we were happy with the final product. I would highly recommend.",
    author: "David Madden",
    detail: "Finished remodel",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Very happy with how it came out! Excellent work!",
    author: "Carlos Cristobal",
    detail: "Home project",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Excellent company! Everyone was very polite and they did a wonderful job. Highly recommend.",
    author: "Isaac",
    detail: "June 2025",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Good company and good people. They will help you with your water issues. Techs are trained and know what they are doing!",
    author: "Oscar Meza",
    detail: "Water restoration · June 2025",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Exceptional service and very fast. Their team is very knowledgeable.",
    author: "Danny Meza",
    detail: "June 2025",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Very knowledgable and professional!",
    author: "Geovanna Arvizu",
    detail: "June 2025",
    source: "Google",
    rating: 5,
  },
];
