import type { Article } from '@/lib/articles';

const help =
  'Need help? Elite Restorations is a family-owned Houston company serving homeowners since 1993. Call (713) 909-0034 to schedule an estimate, or contact us.';

export const hoaTips: Article[] = [
  {
    slug: 'houston-freeze-prep-for-pipes',
    title: 'Freeze prep: protecting your Houston pipes',
    metaTitle: 'Houston Freeze Prep for Pipes',
    crumb: 'Freeze prep',
    lines: ['Before a Houston freeze.', 'And if a pipe lets go.'],
    description:
      'How to prepare Houston pipes before a freeze, and the first steps if a line freezes or bursts in an attic, wall, or hose bib.',
    lede: 'Houston does not freeze often, but when it does, many homes are not ready for it. Most of our pipes run through attics, exterior walls, and slab edges, so a single night in the low 20s can split a line. A little prep goes a long way.',
    image: '/images/services/water-damage-restoration.jpg',
    service: 'water-damage-restoration',
    ctaTitle: 'Need help after a freeze?',
    ctaBody: help,
    related: ['frozen-and-burst-pipes-in-houston', 'how-to-prevent-water-damage-in-your-home'],
    sections: [
      {
        heading: 'Before a Houston freeze',
        blocks: [
          {
            type: 'list',
            items: [
              'Insulate exposed pipes. Foam pipe sleeves from any hardware store fit pipes in the attic, garage, and exterior walls, and on outdoor hose bibs. Towels get wet and stop insulating, so they are a poor long-term fix.',
              'Cover outdoor faucets. Disconnect and drain garden hoses, then put an insulated faucet cover on every hose bib.',
              'Shut off and drain your sprinkler system, including the backflow preventer, which is often the first thing to crack.',
              'Open cabinet doors under kitchen and bathroom sinks on outside walls so warm air can reach the pipes.',
              'Let faucets drip. A slow drip of hot and cold on the faucets farthest from where water enters your house keeps water moving and relieves pressure.',
              'Know where your main shutoff is. It is usually in a box near the street or where the line enters the house. Make sure it turns, and keep a water-meter key handy.',
              'Keep the heat on at 55°F or higher, even if you are traveling.',
            ],
          },
        ],
      },
      {
        heading: 'If a Houston pipe freezes',
        blocks: [
          {
            type: 'p',
            text: 'If a faucet only trickles or nothing comes out, the line is probably frozen. Leave the faucet open and gently warm the pipe with a hair dryer or space heater, keeping the heater away from anything that can burn. Never use an open flame.',
          },
        ],
      },
      {
        heading: 'If a Houston pipe bursts',
        blocks: [
          {
            type: 'list',
            items: [
              'Shut off the main water valve right away. Then turn off the water heater.',
              'Turn off power to any area where water is near outlets or fixtures, if you can do it safely.',
              'Take photos and video of the damage before you clean up. Your insurance company will want them.',
              'Remove standing water and wet items, and get air moving with fans.',
              'Call a plumber for the broken pipe, and tell your insurer what happened.',
            ],
          },
          {
            type: 'p',
            text: 'Drywall, insulation, and flooring that stay wet for 24 to 48 hours can start growing mold. If water soaked into walls, ceilings, or carpet, a water-damage crew can measure the moisture behind the surface and dry it out properly, which helps keep a burst pipe from turning into a mold problem. The page on frozen and burst pipes is the closer read for that first hour. If insurance is involved, Elite works with your insurance company as your contractor and negotiates the claim scope with the adjuster. We are not public adjusters.',
          },
          {
            type: 'p',
            text: help,
          },
          {
            type: 'links',
            items: [
              { href: '/water-damage-restoration', label: 'Water damage restoration' },
              { href: '/frozen-and-burst-pipes-in-houston', label: 'What to do first if a pipe freezes or bursts' },
              { href: '/burst-frozen-pipe-water-damage-houston', label: 'Burst pipe water damage in Houston' },
              { href: '/contact', label: 'Contact us' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'ground-check-after-a-houston-storm',
    title: 'After the storm: a roof and exterior check from the ground',
    metaTitle: 'Houston Storm Check from the Ground',
    crumb: 'Storm check from the ground',
    lines: ['After the storm.', 'Stay on the ground.'],
    description:
      'A ground-level Houston checklist after hail, wind, or heavy rain: shingles, gutters, siding, trees, fences, and what to photograph.',
    lede: 'Spring in Houston brings hail, high winds, and heavy rain. After a big storm, it is worth spending 15 minutes walking around your home. Damage you find early is usually cheaper to fix. Stay off the roof. Wet shingles are slippery, and most of what you need to see is visible from the ground.',
    image: '/images/projects/roofing/brick-home-multi-gable.webp',
    service: 'roofing',
    ctaTitle: 'See something from the yard?',
    ctaBody: help,
    related: ['storm-and-hail-roof-repair-houston', 'hurricane-season-prep-houston'],
    sections: [
      {
        heading: 'A Houston walk-around from the ground',
        blocks: [
          {
            type: 'list',
            items: [
              'Shingles: use binoculars or your phone\'s zoom. Look for missing, lifted, or creased shingles, and for dark patches where the granules have washed off.',
              'Gutters and downspouts: look for dents, sagging sections, and gutters pulling away from the house. A pile of shingle granules at the bottom of a downspout can mean hail damage.',
              'Soft metals: check roof vents, air conditioners, mailboxes, and the top of the fence for small dents. They are an easy way to tell whether hail was big enough to mark the roof.',
              'Siding, trim, and windows: look for cracked siding, chipped paint, torn screens, and broken window seals.',
              'Trees and debris: look for broken limbs hanging over the roof and branches resting on it or on power lines. Stay away from downed lines and call CenterPoint at 713-207-2222.',
              'Fences and outbuildings: check for leaning posts and missing boards.',
            ],
          },
        ],
      },
      {
        heading: 'Then look inside the house',
        blocks: [
          {
            type: 'p',
            text: 'Look for new stains or bubbling paint on ceilings, especially near exterior walls. If you can safely get into the attic with a flashlight, look for damp insulation, drips, or daylight coming through.',
          },
        ],
      },
      {
        heading: 'Document the Houston storm',
        blocks: [
          {
            type: 'p',
            text: 'Take dated photos and video of anything you find, from several angles. Write down the storm date. Cover an active leak with a tarp only if you can do it safely from the ground or a short ladder, and keep your receipts. Ask your insurer how they want notice of the loss, and what deadline your policy uses. Policies are not all the same. Your insurer decides whether temporary protection is paid. If insurance is involved, Elite works with your insurance company as your contractor and negotiates the claim scope with the adjuster. We are not public adjusters.',
          },
        ],
      },
      {
        heading: 'When to call a Houston roofer',
        blocks: [
          {
            type: 'p',
            text: 'Call a roofer if you see missing shingles, interior leaks, dented vents, or widespread granule loss, or if neighbors are having their roofs replaced. A written inspection should come with photos you can keep. The longer guide on storm and hail repair is the next page if the roof itself is the question. This walk is only what you can see without climbing.',
          },
        ],
      },
      {
        heading: 'Storm chasers after a Houston storm',
        blocks: [
          {
            type: 'p',
            text: 'Be careful with anyone who knocks on your door right after a storm, asks for a large deposit up front, or offers to cover your deductible, which is illegal in Texas. Hire a local company you can call back, and check references. We work from our office in west Houston (77082).',
          },
          {
            type: 'p',
            text: help,
          },
          {
            type: 'links',
            items: [
              { href: '/roofing', label: 'Roofing' },
              { href: '/houston-storm-damage', label: 'Houston storm damage help' },
              { href: '/storm-and-hail-roof-repair-houston', label: 'Storm and hail roof repair' },
              { href: '/contact', label: 'Contact us' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'plan-kitchen-bath-remodel-2027',
    title: 'Planning a Houston kitchen or bath remodel for 2027',
    metaTitle: 'Plan a Houston Remodel for 2027',
    crumb: 'Plan a 2027 remodel',
    lines: ['Plan the remodel', 'before the calendar fills.'],
    description:
      'How to plan a Houston kitchen or bathroom remodel for 2027: budget, timeline, permits, HOA rules, and how to compare bids.',
    lede: 'Winter is a good time to plan a Houston remodel for spring or summer. Contractors\' calendars fill up quickly once the weather warms, and the decisions you make now affect both cost and stress. Here is how to start.',
    image: '/images/services/kitchen-remodeling.jpg',
    service: 'kitchen-remodeling',
    ctaTitle: 'Planning a kitchen or a bath?',
    ctaBody: help,
    related: ['houston-kitchen-remodel-ideas', 'houston-bathroom-remodel-guide'],
    sections: [
      {
        heading: 'Set a Houston remodel budget, then add 10 to 15 percent',
        blocks: [
          {
            type: 'p',
            text: 'Before you get bids, decide on a total you are comfortable spending. Then set aside 10 to 15 percent of it for surprises like hidden water damage, outdated wiring, or plumbing that has to be moved. Cabinets usually take the biggest share of a kitchen budget, while tile and labor tend to drive the cost of a bathroom. Moving plumbing, gas lines, or walls adds cost quickly, so keeping the layout the same is the easiest way to save. Those shares are typical, and they vary by the job. They are not a bid.',
          },
        ],
      },
      {
        heading: 'Know your priorities',
        blocks: [
          {
            type: 'p',
            text: 'Make a list of must-haves and nice-to-haves. Do you need more storage, better lighting, a walk-in shower, or a layout that is easier to get around as you age? A clear list makes bids easier to compare and keeps the project from growing.',
          },
        ],
      },
      {
        heading: 'Plan the timeline for a 2027 Houston remodel',
        blocks: [
          {
            type: 'list',
            items: [
              'Design and selections: often 2 to 6 weeks.',
              'Permits and HOA approval: often 2 to 6 weeks.',
              'Material lead times: custom cabinets and special-order tile can take 6 to 12 weeks.',
              'Construction: about 3 to 6 weeks for a typical bath and 6 to 12 weeks for a typical kitchen.',
            ],
          },
          {
            type: 'p',
            text: 'These are typical planning ranges, and they vary by the job. Order your materials before demolition starts so the job does not stall halfway through. The kitchen ideas guide and the bathroom guide go deeper on the rooms themselves. This page is the calendar and the budget in front of that work.',
          },
        ],
      },
      {
        heading: 'Houston permits and HOA approval',
        blocks: [
          {
            type: 'p',
            text: 'In Houston and most nearby cities, work that changes plumbing, electrical, gas, or structure generally needs a permit. A licensed contractor should pull the permits, so be cautious if someone tells you to skip them. Also check your HOA\'s architectural guidelines. Exterior changes, dumpsters, and portable storage containers often need approval ahead of time. An association review and a city permit are not the same counter.',
          },
        ],
      },
      {
        heading: 'Compare Houston remodel bids carefully',
        blocks: [
          {
            type: 'p',
            text: 'Get at least two or three written bids that cover the same scope. Ask each contractor for proof of insurance, references, and recent photos of their work, and ask how they handle change orders. A good contract includes a payment schedule tied to finished work, not large payments up front.',
          },
        ],
      },
      {
        heading: 'Prepare for living through a kitchen or bath remodel',
        blocks: [
          {
            type: 'p',
            text: 'Set up a temporary kitchen with a microwave, a coffee maker, and a fridge, or plan around a second bathroom. Ask how the crew will control dust and protect your floors.',
          },
          {
            type: 'p',
            text: help,
          },
          {
            type: 'links',
            items: [
              { href: '/kitchen-remodeling', label: 'Kitchen remodeling' },
              { href: '/bathroom-remodeling', label: 'Bathroom remodeling' },
              { href: '/kitchen-remodel-cost-houston', label: 'What changes a kitchen remodel cost' },
              { href: '/bathroom-remodel-cost-houston', label: 'What changes a bathroom remodel cost' },
              { href: '/contact', label: 'Contact us' },
            ],
          },
        ],
      },
    ],
  },
];
