import { img, placeholderImg, type Img } from "@/lib/images";

export type ServiceGroup = "Interiors" | "Floors" | "Roof & exterior" | "Recovery";

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  tagline: string;
  summary: string;
  metaDescription: string;
  intro: string[];
  includes: string[];
  materials?: { label: string; items: string[] };
  process?: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  image: Img;
  emergency?: boolean;
};

export const serviceGroups: ServiceGroup[] = ["Interiors", "Floors", "Roof & exterior", "Recovery"];

export const serviceGroupBlurbs: Record<ServiceGroup, string> = {
  Interiors: "The rooms you live in: kitchens, baths and the finish work that ties them together.",
  Floors: "Wood, tile, vinyl and laminate, installed over a properly prepared subfloor.",
  "Roof & exterior": "What keeps the weather out, from a single repair to a complete replacement.",
  Recovery: "The first response after water or storm damage, and the repairs that follow.",
};

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    group: "Interiors",
    tagline: "The room everything happens in, rebuilt around how you live.",
    summary: "Layouts, cabinetry, counters, lighting and finishes, planned and built as one project.",
    metaDescription:
      "Kitchen remodeling in Houston, TX from Elite Restorations: layout, cabinets, countertops, backsplash, flooring and lighting, handled by one family-run team.",
    intro: [
      "A kitchen remodel touches nearly every trade at once: cabinetry, counters, tile, flooring, electrical and plumbing. We manage that choreography so you talk to one team, not six.",
      "We start by walking the space with you, measuring, and talking through how you cook, gather and store. From there we help you settle the layout, choose materials and understand the budget before demolition begins.",
    ],
    includes: [
      "Layout planning and design support",
      "Cabinets, hardware and built-in storage",
      "Countertops and backsplash",
      "Flooring transitions and repairs",
      "Lighting, including pendants and under-cabinet",
      "Full gut renovations or focused refreshes",
    ],
    faqs: [
      {
        q: "Can you handle the whole kitchen, or only parts of it?",
        a: "Both. Some clients want a full renovation; others want new counters and backsplash, or new flooring. We scope the work to what you actually need.",
      },
      {
        q: "How long will the remodel take?",
        a: "It depends on the size of the layout change and the lead time of the materials you choose. We give you a realistic sequence and schedule during the consultation, before work starts.",
      },
    ],
    related: ["countertops", "backsplash", "wood-flooring", "carpentry"],
    image: img(
      "/images/services/kitchen-remodeling.jpg",
      "Luxury kitchen with a coffered ceiling, marble island and pendant lighting",
    ),
  },
  {
    slug: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    group: "Interiors",
    tagline: "Quiet, well-lit rooms that are built to stay dry.",
    summary: "Showers, vanities, tile and fixtures, with waterproofing done properly behind the walls.",
    metaDescription:
      "Bathroom remodeling in Houston, TX: showers, tubs, vanities, tile, lighting and waterproofing from Elite Restorations, a family-owned remodeling contractor.",
    intro: [
      "Bathrooms are small rooms with unforgiving details. The tile you see is only half the job; the waterproofing, plumbing and electrical behind it decide how the room ages.",
      "We plan the layout with you, help select fixtures and tile, and prepare the walls and floors correctly before anything is finished, so the result looks good on day one and years later.",
    ],
    includes: [
      "Design guidance and fixture selection",
      "Tile for showers, floors and feature walls",
      "Vanities, tubs and shower systems",
      "Lighting and mirrors",
      "Plumbing and electrical preparation",
      "Waterproofing, plus accessibility-minded layout changes",
    ],
    faqs: [
      {
        q: "Can you change the layout of my bathroom?",
        a: "Yes. Moving a shower, vanity or tub is part of many projects. We review what the plumbing and structure allow during the consultation.",
      },
      {
        q: "Do you install large-format and patterned tile?",
        a: "Yes. Large-format porcelain, mosaics, herringbone and encaustic-style patterns all require careful layout and prep, and our tile work spans showers, floors and feature walls.",
      },
    ],
    related: ["tile-flooring", "carpentry", "water-damage-restoration", "countertops"],
    image: img(
      "/images/services/bathroom-remodeling.jpg",
      "Marble-lined shower with a frameless glass door in a remodeled bathroom",
    ),
  },
  {
    slug: "backsplash",
    name: "Backsplash",
    group: "Interiors",
    tagline: "The smallest surface in the kitchen that gets the most attention.",
    summary: "Ceramic, porcelain, glass, marble and stone tile, laid out, grouted and sealed with care.",
    metaDescription:
      "Backsplash installation and repair in Houston, TX: ceramic, porcelain, glass, marble and stone tile, with custom layouts, grouting and sealing.",
    intro: [
      "A backsplash protects the wall and sets the tone for the kitchen. Chevron, herringbone, geometric and hand-finished tile all live or die by their layout.",
      "We dry-lay patterns before setting them, so cuts land where they should and focal points center on the range or window, then grout and seal for lasting protection.",
    ],
    includes: [
      "New backsplash installation",
      "Removal and replacement of old tile",
      "Custom layouts and patterns",
      "Repairs, regrouting and sealing",
      "Waterproofing where needed",
    ],
    materials: {
      label: "Materials we set",
      items: ["Ceramic", "Porcelain", "Glass", "Marble and natural stone", "Custom tile"],
    },
    faqs: [
      {
        q: "Can you replace a backsplash without replacing my countertops?",
        a: "Usually, yes. We remove the old tile carefully and protect surrounding surfaces, though the condition of the wall behind it can affect the scope.",
      },
      {
        q: "Do you do complex patterns like herringbone or chevron?",
        a: "Yes. Those patterns need a planned layout, and we mock them up before installation.",
      },
    ],
    related: ["kitchen-remodeling", "countertops", "tile-fireplaces"],
    image: img(
      "/images/services/backsplash.webp",
      "Ornate ceramic tile backsplash above a marble kitchen counter",
    ),
  },
  {
    slug: "countertops",
    name: "Countertops",
    group: "Interiors",
    tagline: "Surfaces chosen to be lived on, and cut to fit exactly.",
    summary: "Granite, quartz, marble and solid-surface counters with custom edges and precise fabrication.",
    metaDescription:
      "Countertop installation, replacement and repair in Houston, TX: granite, quartz, marble and solid surface with custom edge profiles.",
    intro: [
      "Countertops are the surface you touch most in a kitchen or bath. The material, the edge and the seams all matter, and so does an accurate template.",
      "We help you compare granite, quartz, marble and solid surface for how they look, wear and clean, and we handle measurement, fabrication and installation.",
    ],
    includes: [
      "Installation and replacement",
      "Repairs to existing counters",
      "Custom edge profiles",
      "Precise templating and fabrication",
      "Sink and cooktop cutouts",
    ],
    materials: {
      label: "Materials",
      items: ["Granite", "Quartz", "Marble", "Solid surface"],
    },
    faqs: [
      {
        q: "Which material is best for a busy kitchen?",
        a: "It depends on how you cook and how much upkeep you want. We walk through the tradeoffs of each material in person so you can choose with confidence.",
      },
      {
        q: "Can you repair a damaged countertop instead of replacing it?",
        a: "Often, yes. We assess chips, cracks and seams first and tell you whether repair or replacement makes more sense.",
      },
    ],
    related: ["kitchen-remodeling", "bathroom-remodeling", "backsplash"],
    image: img(
      "/images/services/countertops.jpg",
      "Quartz kitchen island with woven shades in the background",
    ),
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    group: "Interiors",
    tagline: "The structure and trim that make a room feel finished.",
    summary: "Framing, trim, built-ins, stairs and millwork, from repairs to custom pieces.",
    metaDescription:
      "Carpentry in Houston, TX: framing, trim and molding, built-ins, cabinets, closets, shelving, stairs and railings from Elite Restorations.",
    intro: [
      "Good carpentry is mostly invisible: square framing, tight joints, trim that lines up. It is also what elevates a remodel from competent to considered.",
      "We handle structural framing and finish carpentry alike, including built-ins, stair work and detailed wall millwork.",
    ],
    includes: [
      "Framing and door or window openings",
      "Trim, molding and paneling",
      "Built-ins, shelving and closets",
      "Cabinet installation and modification",
      "Stairs and railings",
      "Repairs to existing woodwork",
    ],
    faqs: [
      {
        q: "Do you build custom built-ins and shelving?",
        a: "Yes. We build and install custom shelving, closets and built-ins sized to your space.",
      },
      {
        q: "Can you match existing trim in an older home?",
        a: "We can usually match profiles and proportions, or blend in new trim so it reads as intentional.",
      },
    ],
    related: ["kitchen-remodeling", "bathroom-remodeling", "painting-drywall-repair"],
    image: img(
      "/images/services/carpentry.jpg",
      "Staircase with geometric wall millwork in a custom-finished home",
    ),
  },
  {
    slug: "tile-fireplaces",
    name: "Tile Fireplaces",
    group: "Interiors",
    tagline: "A hearth that anchors the room.",
    summary: "Tile and stone fireplace surrounds, new or refreshed, set with heat-appropriate materials.",
    metaDescription:
      "Tile fireplace installation, remodeling and retiling in Houston, TX using heat-resistant tile, fire-safe mortar, grout and sealing.",
    intro: [
      "A fireplace wall is often the focal point of a living room. Whether the design is a quiet linear marble or a bold herringbone surround, it needs materials rated for the job.",
      "We install new surrounds and retile existing ones, using appropriate tile, mortar and grout, then seal for protection.",
    ],
    includes: [
      "New tile fireplace installation",
      "Remodeling and updating existing surrounds",
      "Repair and retiling",
      "Heat-resistant tile and fire-safe mortar",
      "Grouting and sealing",
    ],
    faqs: [
      {
        q: "Can you update an old brick or tile fireplace?",
        a: "Yes. We review the existing surround and recommend whether to retile, resurface or rebuild.",
      },
      {
        q: "What tile is suitable around a fireplace?",
        a: "Heat-resistant tile set with fire-safe mortar. We help you choose materials that look right and are appropriate for the application.",
      },
    ],
    related: ["backsplash", "tile-flooring", "carpentry"],
    image: img(
      "/images/services/tile-fireplaces.jpg",
      "Linear marble fireplace wall in a modern living room",
    ),
  },
  {
    slug: "wood-flooring",
    name: "Wood Flooring",
    group: "Floors",
    tagline: "Hardwood that warms a room for decades.",
    summary: "Hardwood and engineered wood: installation, replacement, dustless refinishing, staining and sealing.",
    metaDescription:
      "Wood flooring in Houston, TX: hardwood and engineered installation, replacement, dustless sanding, staining and sealing.",
    intro: [
      "Wood floors change how a whole house looks and sounds. Getting them right depends on subfloor prep, acclimation and a clean, flat installation.",
      "We install hardwood and engineered planks, replace damaged sections, and refinish existing floors, including dustless sanding to keep the house cleaner during the work.",
    ],
    includes: [
      "Hardwood and engineered wood installation",
      "Replacement of damaged boards",
      "Refinishing with dustless sanding",
      "Staining and sealing",
      "Stair landings and transitions",
    ],
    faqs: [
      {
        q: "Should I refinish or replace my hardwood?",
        a: "If the boards are sound, refinishing can renew the floor for much less than replacement. We inspect first and give you a straight recommendation.",
      },
      {
        q: "What is dustless sanding?",
        a: "Sanding equipment connected to dust extraction, which captures most of the dust as it is created and keeps the rest of your home cleaner.",
      },
    ],
    related: ["tile-flooring", "vinyl-flooring", "laminate-flooring", "water-damage-restoration"],
    image: img(
      "/images/services/wood-flooring.jpg",
      "Light wood plank flooring in an empty, sunlit room",
    ),
  },
  {
    slug: "tile-flooring",
    name: "Tile Flooring",
    group: "Floors",
    tagline: "Pattern, stone and porcelain, laid flat and true.",
    summary: "Residential and commercial tile floors, with careful layout, waterproofing, grout and sealing.",
    metaDescription:
      "Tile flooring installation and repair in Houston, TX for homes and businesses: layout, waterproof applications, grout and sealing.",
    intro: [
      "Tile floors have to be flat, and their layout has to be right from the first row. Patterned tile in particular rewards planning.",
      "We install tile in homes and commercial spaces, prepare the substrate properly, and finish with grout and sealer suited to the room.",
    ],
    includes: [
      "Residential and commercial installation",
      "Repair and replacement",
      "Layout and pattern planning",
      "Waterproof applications for wet areas",
      "Grouting and sealing",
    ],
    faqs: [
      {
        q: "Can tile be laid over my existing floor?",
        a: "Sometimes, depending on the condition and height of what is underneath. We check the substrate before recommending an approach.",
      },
      {
        q: "Do you handle patterned and encaustic-style tile?",
        a: "Yes. Those patterns need a planned layout so the design centers and repeats correctly.",
      },
    ],
    related: ["wood-flooring", "bathroom-remodeling", "tile-fireplaces"],
    image: img(
      "/images/services/tile-flooring.jpg",
      "Encaustic-style patterned tile floor",
    ),
  },
  {
    slug: "vinyl-flooring",
    name: "Vinyl Flooring",
    group: "Floors",
    tagline: "Durable, water-tolerant floors that look the part.",
    summary: "Luxury vinyl plank, sheet and tile, installed as click-lock, glue-down or floating floors.",
    metaDescription:
      "Vinyl flooring installation, replacement and repair in Houston, TX: LVP, sheet and tile with click-lock, glue-down or floating methods.",
    intro: [
      "Modern luxury vinyl plank convincingly mimics wood and stone and tolerates moisture, which makes it a practical choice for busy homes.",
      "We install LVP, sheet and vinyl tile using the method that fits your subfloor, and we repair or replace worn sections when needed.",
    ],
    includes: [
      "Luxury vinyl plank (LVP)",
      "Vinyl sheet and vinyl tile",
      "Click-lock, glue-down and floating installation",
      "Replacement and repair",
    ],
    faqs: [
      {
        q: "Is vinyl a good option for wet areas?",
        a: "Vinyl tolerates moisture better than many flooring types. We can advise on the right product for kitchens, laundry rooms and baths.",
      },
      {
        q: "Can vinyl go over my current floor?",
        a: "Often it can, if the surface is flat and sound. We check before we recommend it.",
      },
    ],
    related: ["laminate-flooring", "wood-flooring", "tile-flooring"],
    image: img(
      "/images/services/vinyl-flooring.jpg",
      "Plank flooring in a bright room with black-framed windows",
    ),
  },
  {
    slug: "laminate-flooring",
    name: "Laminate Flooring",
    group: "Floors",
    tagline: "A clean, affordable look with a quick turnaround.",
    summary: "Laminate installation, repair and replacement, including underlayment and water-resistant options.",
    metaDescription:
      "Laminate flooring installation, repair and replacement in Houston, TX with click-lock or glue installation and water-resistant options.",
    intro: [
      "Laminate delivers the look of wood with straightforward upkeep. The installation detail that matters most is a flat subfloor and correct underlayment.",
      "We install click-lock or glued laminate, handle underlayment, and replace damaged planks so the floor stays uniform.",
    ],
    includes: [
      "Laminate installation",
      "Click-lock or glue-down methods",
      "Underlayment",
      "Repair and replacement",
      "Water-resistant options",
    ],
    faqs: [
      {
        q: "Is laminate water-resistant?",
        a: "Some products are. We help you choose one that suits the room, and we tell you honestly where another floor would serve you better.",
      },
      {
        q: "Can you replace just the damaged planks?",
        a: "In many cases, yes, provided matching material is available.",
      },
    ],
    related: ["vinyl-flooring", "wood-flooring", "tile-flooring"],
    image: img(
      "/images/services/laminate-flooring.jpg",
      "Chevron plank flooring detail",
    ),
  },
  {
    slug: "roof-replacement",
    name: "Roof Replacement",
    group: "Roof & exterior",
    tagline: "A roof that protects everything underneath it.",
    summary: "Assessment, tear-off and replacement in asphalt, metal, tile, slate and composite materials.",
    metaDescription:
      "Roof replacement in Houston, TX: damage assessment, emergency tarping, tear-off and installation in asphalt, metal, tile, slate and composite, with insurance documentation help.",
    intro: [
      "A roof is the one system you only think about when it fails. When it does, or when storms have taken their toll, you need a straight assessment and a plan.",
      "We inspect the roof, document the damage, tarp if the weather demands it, and replace the roofing with materials that suit your home and budget. When an insurance claim is involved, we help with documentation.",
    ],
    includes: [
      "Roof assessment and damage documentation",
      "Emergency tarping when needed",
      "Old roof removal",
      "New roofing installation",
      "Final inspection and cleanup",
      "Help with insurance documentation",
    ],
    materials: {
      label: "Roofing materials",
      items: [
        "Asphalt architectural shingles",
        "Metal",
        "Ceramic and concrete tile",
        "Slate and composite",
        "Cool-roof membranes",
      ],
    },
    process: [
      { title: "Assess", body: "We inspect the roof and document the condition with photographs." },
      { title: "Protect", body: "If the roof is open to weather, we tarp it to keep the house dry." },
      { title: "Document", body: "We assemble the documentation an insurance claim needs, when one applies." },
      { title: "Remove", body: "The old roofing comes off and the deck is inspected." },
      { title: "Install", body: "Underlayment and new roofing go on, with flashing and vents detailed." },
      { title: "Inspect", body: "We inspect the finished roof and clean the property." },
    ],
    faqs: [
      {
        q: "Will you help with my insurance claim?",
        a: "We provide inspection photos and documentation that support a claim, and we work with your adjuster's process. Coverage decisions are your insurer's.",
      },
      {
        q: "What roofing material should I choose?",
        a: "We compare options for appearance, longevity, weight and cost, and recommend what suits your home and neighborhood.",
      },
    ],
    related: ["roofing-emergency-tarp-repair", "siding", "water-damage-restoration"],
    image: img(
      "/images/services/roof-replacement.webp",
      "Brick home with multiple gables and a newly finished roof",
    ),
  },
  {
    slug: "roofing-emergency-tarp-repair",
    name: "Emergency Roof Tarping & Repair",
    group: "Roof & exterior",
    tagline: "When water is getting in, the first job is to stop it.",
    summary: "Inspection, photo documentation and waterproof tarping to protect your home until permanent repairs.",
    metaDescription:
      "Emergency roof tarping and repair in Houston, TX: inspection, damage documentation, waterproof tarp installation and repair coordination. Call (713) 909-0034.",
    emergency: true,
    intro: [
      "After a storm or a fallen limb, the priority is keeping water out of the house. A properly anchored tarp buys time to plan permanent repairs.",
      "We inspect the damage, photograph it for your records and any claim, tarp the exposed area, and coordinate the permanent repair afterward.",
    ],
    includes: [
      "Safety inspection of the roof",
      "Photo documentation of damage",
      "Waterproof tarp installation",
      "Water diversion",
      "Planning and coordination of permanent repairs",
    ],
    process: [
      { title: "Inspect", body: "We check the roof safely and identify where water is entering." },
      { title: "Document", body: "Photographs capture the damage for your records and any insurance claim." },
      { title: "Select", body: "We choose tarp material and sizing for the opening and the weather." },
      { title: "Anchor", body: "The tarp is secured so wind will not lift it." },
      { title: "Divert", body: "We direct water away from the opening." },
      { title: "Plan", body: "We outline the permanent repair so you know what comes next." },
    ],
    faqs: [
      {
        q: "How do I reach you about an emergency?",
        a: "Call (713) 909-0034. Tell us what happened and where, and we will advise on next steps.",
      },
      {
        q: "Is a tarp a permanent fix?",
        a: "No. A tarp is temporary protection. We plan and complete the permanent repair or replacement afterward.",
      },
    ],
    related: ["roof-replacement", "water-damage-restoration", "siding"],
    image: img(
      "/images/services/roofing-emergency-tarp-repair.jpg",
      "Aerial view of a blue tarp secured across a damaged roof",
    ),
  },
  {
    slug: "siding",
    name: "Siding",
    group: "Roof & exterior",
    tagline: "The face your home shows the street.",
    summary: "Siding installation, repair and replacement, including storm-damage restoration and trim.",
    metaDescription:
      "Siding installation, repair and replacement in Houston, TX, including storm-damage restoration, sealing, trim and color matching.",
    intro: [
      "Siding protects the structure and defines the look of the house. Board-and-batten, lap and other profiles each require different detailing at corners, windows and trim.",
      "We install and replace siding, repair storm damage, seal and finish trim, and match colors so repairs blend in.",
    ],
    includes: [
      "Installation and full replacement",
      "Repair of damaged sections",
      "Storm-damage restoration",
      "Trim, sealing and color matching",
    ],
    faqs: [
      {
        q: "Can you repair a section instead of replacing all the siding?",
        a: "Often, yes. Success depends on matching the existing material and color, which we assess up front.",
      },
      {
        q: "Do you handle storm damage?",
        a: "Yes. We document the damage and repair or replace the affected siding.",
      },
    ],
    related: ["roof-replacement", "roofing-emergency-tarp-repair", "carpentry"],
    image: img(
      "/images/services/siding.jpg",
      "Farmhouse exterior with board-and-batten siding",
    ),
  },
  {
    slug: "water-damage-restoration",
    name: "Water Damage Restoration",
    group: "Recovery",
    tagline: "Dry it properly, then rebuild it right.",
    summary: "Assessment, extraction, drying, cleaning and structural repair after a leak, flood or storm.",
    metaDescription:
      "Water damage restoration in Houston, TX: moisture assessment, extraction, drying and dehumidification, cleaning, disinfection and structural repair.",
    emergency: true,
    intro: [
      "Water damage gets worse by the hour. Standing water and damp materials invite mold and warp structure, so the response is time-sensitive.",
      "We assess moisture, remove water, dry the structure with air movers and dehumidification, clean and disinfect, and then carry out the repairs, so recovery and rebuilding stay with one team. We also handle fire and storm-related repairs; ask us about your situation.",
    ],
    includes: [
      "Moisture assessment with meters and thermal imaging",
      "Water extraction",
      "Drying and dehumidification",
      "Cleaning, disinfection and odor treatment",
      "Structural repairs",
      "Help with insurance documentation",
    ],
    process: [
      { title: "Assess", body: "Moisture meters and thermal imaging map where the water went." },
      { title: "Extract", body: "Standing water is removed to stop further spread." },
      { title: "Dry", body: "Air movers and dehumidifiers dry the structure and contents." },
      { title: "Clean", body: "Affected areas are cleaned, disinfected and treated for odor." },
      { title: "Repair", body: "Damaged drywall, flooring and finishes are rebuilt." },
      { title: "Verify", body: "A final inspection confirms the structure is dry and safe." },
    ],
    faqs: [
      {
        q: "What should I do first after a leak or flood?",
        a: "If it is safe, stop the water source and call us. Avoid electrical hazards, and do not wait: drying quickly limits damage.",
      },
      {
        q: "Can you also rebuild after the drying?",
        a: "Yes. Because we are a remodeling contractor as well, we repair drywall, flooring, cabinetry and finishes once the structure is dry.",
      },
    ],
    related: ["painting-drywall-repair", "wood-flooring", "roofing-emergency-tarp-repair"],
    image: img(
      "/images/services/water-damage-restoration.jpg",
      "Air movers drying a room during water damage restoration",
    ),
  },
  {
    slug: "painting-drywall-repair",
    name: "Painting & Drywall Repair",
    group: "Recovery",
    tagline: "The clean surface every finish depends on.",
    summary: "Drywall patching and replacement, priming and interior painting, with the cleanup done.",
    metaDescription:
      "Painting and drywall repair in Houston, TX: patching, replacement, moisture assessment, priming and interior painting.",
    intro: [
      "Drywall damage from a leak, an impact or a remodel needs to be patched so it disappears under paint. Moisture must be resolved before anything is covered.",
      "We assess the cause, repair or replace drywall, prime, and paint, then clean up after ourselves.",
    ],
    includes: [
      "Drywall patching and replacement",
      "Moisture assessment before repair",
      "Priming",
      "Interior painting",
      "Cleanup",
    ],
    faqs: [
      {
        q: "Will the repair be visible after painting?",
        a: "A good repair should not be. We feather, prime and paint so patches blend into the wall.",
      },
      {
        q: "Do you repair drywall after water damage?",
        a: "Yes, and we confirm the area is dry first so problems do not return.",
      },
    ],
    related: ["water-damage-restoration", "carpentry", "kitchen-remodeling"],
    image: placeholderImg(
      "/images/placeholders/painting-drywall.svg",
      "Neutral plaster wall texture, placeholder for painting and drywall photography",
      1600,
      1200,
    ),
  },
];

export const servicesBySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string) {
  return servicesBySlug.get(slug);
}

export function servicesInGroup(group: ServiceGroup) {
  return services.filter((s) => s.group === group);
}
