import { notAPublicAdjuster, rangeNote } from '@/lib/service-depth-shared';
import type { ServiceDepth } from '@/lib/service-depth-types';

const roofInsuranceLinks = [
  { href: '/storm-and-hail-roof-repair-houston', label: 'Storm and hail roof repair in Houston' },
  { href: '/roof-replacement-cost-houston', label: 'What changes a roof replacement cost' },
];

export const exteriorDepth: Record<string, ServiceDepth> = {
  roofing: {
    moreIntro: [
      'We inspect the material, the flashing, the pipe boots, the valleys, and the attic ventilation, then we say whether a repair will hold or the roof needs to come off. The answer is about the roof in front of us.',
      'After hail or a tropical system, the first job is often to keep water out. We photograph the slopes before a tarp covers them. Your insurer decides what a policy pays. A repair price is not a claim decision.',
    ],
    moreLocal: [
      'Spring hail and the hurricane season that runs from June through November are the two weather facts on this roof. Wind-driven rain finds a lifted shingle, a tired pipe boot, and a valley that was only caulked. Attic heat is the other Houston fact. Ventilation is part of a roof that lasts, not an accessory we add if the budget is comfortable.',
    ],
    factorsHeading: 'Hail, wind, heat, and the house under the roof.',
    factorsIntro:
      'The same shingle does not live the same life on a one-story ranch in Alief and on a two-story brick house in Memorial. Pitch, shade, and the last storm all show up on the inspection.',
    factors: [
      {
        title: 'Hail and wind',
        body: 'Spring storms bruise shingles and dent soft metal. Tropical wind lifts tabs and drives rain under the flashing. A few damaged shingles can be a repair. Bruising across the field is often a replacement. We say which one after we are on the roof.',
      },
      {
        title: 'Heat and ventilation',
        body: 'An attic that cannot exhaust cooks the roof from below. Ridge vents, intake, and bath fans that actually leave the house are part of the system. We look at that when we are up there, because a new shingle on a sealed attic is still living in Houston heat.',
      },
      {
        title: 'Older roofs and newer tracts',
        body: 'A Memorial or Bellaire roof may be on its second or third covering, with layers, patched valleys, and flashing that was bent to fit an addition. A newer Katy or Woodlands roof is often a simpler hip with more penetrations from the original build. Both get the same inspection. The repair is not the same.',
      },
      {
        title: 'Permits and HOAs',
        body: 'A small repair often stays a repair. A full replacement in the City of Houston is typically permitted, and we treat the permit as part of planning that job, not as a surprise after the shingles are on. Katy, Pearland, Sugar Land, and Montgomery County have their own desks. A Katy address is not always the City of Katy. Roof color and material are a common HOA review in Cinco Ranch, The Woodlands, and other master-planned communities.',
      },
    ],
    process: [
      {
        title: 'Inspect',
        body: 'We get on the roof when it is safe and look at the field, the flashing, the boots, the valleys, and the deck edges. Inside, we look for stains and for what the attic is doing with heat and moisture.',
      },
      {
        title: 'Document',
        body: 'Photographs are taken for you and, if you ask, for your insurer. We do not write a coverage opinion on the photo.',
      },
      {
        title: 'Decide',
        body: 'Repair or replacement is a recommendation after the inspection. We do not sell a tear-off when a repair will hold.',
      },
      {
        title: 'Protect',
        body: 'If the roof is open, we tarp it. The tarp is temporary, and we say when it should be checked.',
      },
      {
        title: 'Repair or replace',
        body: 'A repair is the flashing, the boots, or the field that can be matched. A replacement is tear-off, a look at the deck, underlayment, flashing, vents, and the material you chose. Soft decking is extra, and we say so before the job grows.',
      },
      {
        title: 'Walk through',
        body: 'We look at the finished work with you and clean the site. You leave with the photos and a description of what was done.',
      },
    ],
    signsHeading: 'Signs the roof needs a look.',
    signs: [
      {
        title: 'Granules in the gutters',
        body: 'A heavy loss of granules, or tabs that are cracked and cupping, is the field aging out. It is worth an inspection before the next spring hail finds it.',
      },
      {
        title: 'A stain that comes and goes',
        body: 'A ceiling stain after wind-driven rain is often flashing, a boot, or a valley, not a whole-roof failure. We find the entry point. Painting the stain does not.',
      },
      {
        title: 'Soft metal is dented',
        body: 'Dented gutters, vents, and flashing after a storm are a reason to look at the shingles, not proof by themselves that the field is done. The photos should show both.',
      },
      {
        title: 'Daylight in the attic',
        body: 'Light where the deck has opened, or a deck that feels soft underfoot, is past a caulk repair. That is a replacement conversation, and it may need a tarp first.',
      },
    ],
    materialsHeading: 'Asphalt, metal, tile, and the pieces you do not see.',
    materialsIntro:
      'Architectural asphalt is the common Houston roof. Metal, tile, and composite are options when the structure and the look call for them. The underlayment and the flashing are part of whichever one you choose.',
    materials: [
      {
        title: 'Architectural asphalt',
        body: 'The usual residential roof: a dimensional shingle, underlayment, and a flashing package. Some shingles carry an impact-resistance rating. Whether that changes your premium is a question for your insurer. We can install the product you choose. We do not promise a discount.',
      },
      {
        title: 'Metal',
        body: 'Standing seam and other metal profiles are a different look and a different install. They are lighter than tile. Oil canning, the fastener pattern, and the flashing at the walls are the details that make it look finished on a brick house. Color is an HOA question in a lot of suburbs.',
      },
      {
        title: 'Tile and composite',
        body: 'Concrete and clay tile are heavy. The structure has to carry them, and we do not put tile on a frame that was not built for it. Composite can give a tile look at a lower weight. Slate is a specialty weight and a specialty price. We compare those on the house.',
      },
      {
        title: 'Flashing, boots, and vents',
        body: 'Pipe boots, step flashing, valleys, and attic vents fail before the field does on a lot of Houston roofs. A replacement includes them. A repair often is them. Caulk over a tired boot is not a five-year plan.',
      },
    ],
    costHeading: 'What roof work tends to cost.',
    costIntro: [
      'A repair and a replacement are different orders of magnitude. The repair ranges below are typical planning ranges for common Houston calls. The replacement ranges are the same ones on our roof replacement cost guide. Pitch, stories, and the deck change both.',
      'There is no honest single price per square written before the inspection. A steep two-story with a lot of valleys is not a simple hip on a one-story ranch.',
    ],
    costFactors: [
      {
        title: 'Repair or replacement',
        body: 'A pipe boot is not a tear-off. We recommend the smaller scope when it will hold. We recommend replacement when the field or the deck will not.',
      },
      {
        title: 'Shape and access',
        body: 'Stories, pitch, valleys, and the number of penetrations change the time on the roof and the flashing. A low ranch and a cut-up Memorial roof are different days.',
      },
      {
        title: 'The deck',
        body: 'Soft decking shows up after the old roofing comes off. Replacing a bad sheet is typically about $75 to $150 per 4x8 sheet, and we tell you before that work grows past the roof we priced.',
      },
    ],
    ranges: [
      { label: 'Pipe boot or a small flashing repair', range: '$350 to $900' },
      { label: 'A section of shingles and flashing', range: '$800 to $2,500' },
      { label: 'Architectural asphalt replacement', range: '$12,000 to $24,000' },
      { label: 'Metal, tile, or composite replacement', range: '$20,000 to $45,000' },
    ],
    rangeNote: rangeNote('roof repair or replacement'),
    insurance: {
      heading: 'Photos, a repair price, and the claim.',
      paragraphs: [
        'If you are going to ask your insurer about a storm, photograph the slopes, the soft metal, and any interior stains before the repair covers them. We do that on the inspection. Note the date of the storm. Many Texas policies treat wind and hail under a deductible that is different from a plumbing leak, sometimes a percentage of the dwelling limit. Your form controls that. We do not know it.',
        'A repair quote is not a claim, and a claim payment is not our bid. We can meet an adjuster and speak to what we see and to the work you hire. We do not argue the policy.',
        notAPublicAdjuster,
      ],
      links: roofInsuranceLinks,
    },
    faqs: [
      {
        q: 'What does a Houston roof repair typically cost?',
        a: 'A pipe boot or a small flashing repair often plans at $350 to $900. A section of shingles and flashing often plans at $800 to $2,500. A larger slope, a steep pitch, or a two-story access changes that. These are typical planning ranges, not a quote. Replacement is a different range, published on the roof cost guide.',
      },
      {
        q: 'How do I tell hail damage from ordinary wear?',
        a: 'Wear is granules, curling, and age across the sunny slopes. Hail is bruising and soft-metal dents that show up with a storm date. We photograph both and say what we think the roof needs. Your insurer decides whether the storm is covered. The two questions are not the same question.',
      },
      {
        q: 'Does a roof repair need a permit in Houston?',
        a: 'A small repair often does not. A full replacement in the City of Houston typically does. Other cities and the county have their own rules, and a suburban mailing address does not tell you the jurisdiction. We say which case the job is after we see the address and the scope.',
      },
      {
        q: 'Will my HOA have to approve the shingle?',
        a: 'Often, yes, in master-planned communities. Cinco Ranch, The Woodlands, and many Katy and Sugar Land neighborhoods review roof color and material. Inside the Loop, many houses have no HOA. We flag it when the address is the kind of neighborhood that has architectural review. The HOA is the authority on its own rules.',
      },
      {
        q: 'Do you only replace roofs, or do you repair them?',
        a: 'Both. The inspection decides. A sound field with a bad boot is a repair. A field that is bruised across the slopes, or a deck that is soft, is a replacement. We would rather repair a roof that will hold than sell a tear-off it does not need.',
      },
      {
        q: 'What if water is in the ceiling right now?',
        a: 'Call (713) 909-0034 and say so. A tarp stops more water from entering. Wet insulation and drywall are a drying job, and we do that restoration as well. The photos happen before the opening is covered when it is safe to take them.',
      },
    ],
  },
  'roof-replacement': {
    moreIntro: [
      'A replacement is a tear-off, a look at the deck, and a new system: underlayment, flashing, ventilation, and the material you chose. It is not a second layer nailed over a tired one. Covering a bad roof hides the deck and adds weight. We take the old roofing off.',
      'Color and profile change how a brick Memorial house or a newer Katy roof reads from the street. That choice is made with the structure. Tile is heavy. Metal is not. Asphalt is the common middle. We compare them on your house, including whether an HOA has already limited the color.',
    ],
    moreLocal: [
      'Houston heat is why ventilation is in the replacement and not on a wish list. Intake and exhaust that actually move air keep the attic from cooking the new roof from below. Wind-driven rain is why the valleys, the step flashing, and the pipe boots are detailed with the field, not caulked on the last afternoon.',
    ],
    factorsHeading: 'The deck, the wind, and the street elevation.',
    factorsIntro:
      'The new roof has to fit the frame, the weather, and the rules at the address. Those three are settled before the dumpster arrives.',
    factors: [
      {
        title: 'What the tear-off reveals',
        body: 'Soft decking, skipped sheathing, and rotten eaves show up when the shingles come off. Replacing a bad 4x8 sheet is typically about $75 to $150. We tell you before that work expands past the roof that was priced. A few sheets and a field of bad deck are different conversations.',
      },
      {
        title: 'Wind and hail',
        body: 'The new roof still lives in spring hail and in hurricane season, June through November. Underlayment, the fastening pattern, and the flashing are how wind-driven rain stays out. Some asphalt shingles carry an impact-resistance rating. A premium discount, if any, is your insurer’s decision. We do not promise one.',
      },
      {
        title: 'Older houses and newer roofs',
        body: 'An older Bellaire or Memorial roof may have been layered, patched, and added onto. A newer Woodlands or Katy roof is often a cleaner tear-off with more pipes through it. Both get a new system. The labor is not identical, and the price should not pretend that it is.',
      },
      {
        title: 'Permit and the HOA',
        body: 'A full replacement in the City of Houston is typically permitted. The permit is part of the plan. Suburban cities and Montgomery County issue their own. HOAs in Cinco Ranch, The Woodlands, and similar communities commonly review color and material before the roof goes on. We will not order a color the architectural committee has not cleared when we know that review applies.',
      },
    ],
    process: [
      {
        title: 'Assess',
        body: 'We inspect the roof, the attic, and the elevations. Photographs document the condition. You get a recommendation: repair if it will hold, replacement if it will not. Material options are compared for weight, heat, and the look from the street.',
      },
      {
        title: 'Protect',
        body: 'If the roof is open to weather while we schedule the tear-off, we tarp it. The tarp is not the new roof. It buys a dry house until the replacement can be done safely.',
      },
      {
        title: 'Document',
        body: 'Photos and a written scope are yours. If a claim is open, you can share them. We do not turn the scope into a coverage decision, and we do not negotiate the claim.',
      },
      {
        title: 'Remove',
        body: 'The old roofing comes off down to the deck. We look at the sheathing, the edges, and the flashing lines. Soft decking is marked and discussed before it is replaced. The yard and the plants are protected for the tear-off.',
      },
      {
        title: 'Install',
        body: 'Underlayment, self-adhered membrane at valleys and penetrations, new flashing, vents, and the roofing material go on as one system. Pipe boots are replaced, not reused if they are cracked. Valleys are detailed for wind-driven rain.',
      },
      {
        title: 'Inspect',
        body: 'We inspect the finished roof, clean the site, and walk the result with you. Magnets pick up nails. You see the ventilation and the flashing, not only the color from the curb.',
      },
    ],
    signsHeading: 'Signs the roof should come off.',
    signs: [
      {
        title: 'The field is tired everywhere',
        body: 'Curling, cracking, and granule loss across the slopes, not in one patch, is a replacement. A repair of the worst slope leaves the next slope for next year.',
      },
      {
        title: 'More than one layer',
        body: 'A roof that already has a layer over the original is heavier and harder to flash. The honest replacement takes both off and looks at the deck.',
      },
      {
        title: 'The deck is soft',
        body: 'A soft spot underfoot, daylight in the attic, or a sag at the eave is the sheathing. Shingles do not fix that. The tear-off is how we see how far it goes.',
      },
      {
        title: 'Storm damage across the slopes',
        body: 'Hail bruising or wind that lifted the field, documented in photos, is often a replacement rather than a handful of shingles. The insurance question is separate from that building judgment.',
      },
    ],
    materialsHeading: 'The system, not only the shingle.',
    materialsIntro:
      'You see the asphalt, the metal, or the tile. The roof that keeps water out is the underlayment, the flashing, and the vents installed with them.',
    materials: [
      {
        title: 'Architectural asphalt',
        body: 'The common replacement. Dimensional shingles, a synthetic or felt underlayment as specified, new boots, and new flashing. Color is chosen in daylight against the brick or the siding, and against any HOA palette.',
      },
      {
        title: 'Metal',
        body: 'A different profile from the street and a different fastening system. Lighter than tile. The flashing at sidewalls and the ridge detail are what make a metal roof look finished rather than fastened on. We compare it when the architecture wants it.',
      },
      {
        title: 'Tile, slate, and composite',
        body: 'Tile and slate need a structure that can carry them. We do not upgrade the look and ignore the weight. Composite is the lighter tile-look option. If the frame cannot take the material you want, we say that before it is ordered.',
      },
      {
        title: 'Ventilation and flashing',
        body: 'Ridge and intake vents, step flashing, counterflashing at a chimney or a wall, and new pipe boots. These are in the replacement because they are the usual leak paths on a Houston roof after the field itself is new.',
      },
    ],
    costHeading: 'What a Houston roof replacement tends to cost.',
    costIntro: [
      'These are the same planning ranges as our roof replacement cost guide. They assume a typical house, not a very large or very cut-up roof. Deck repair is listed separately because it is found after the tear-off, not guessed from the curb.',
      'Insurance does not set this price. The insurer decides what the policy pays. We price the roof you hire us to build.',
    ],
    costFactors: [
      {
        title: 'Squares, pitch, and stories',
        body: 'The area is the start. A steep two-story with valleys and dormers takes longer and uses more flashing than a simple one-story hip.',
      },
      {
        title: 'The material',
        body: 'Architectural asphalt is the lower range. Metal, tile, and composite are the higher one. Weight and the structure can take a material off the list.',
      },
      {
        title: 'Deck and extras',
        body: 'Soft sheets, new gutters if they are in the scope, and skylights that have to be reflashed move the number after the base roof is priced.',
      },
    ],
    ranges: [
      { label: 'Architectural asphalt replacement', range: '$12,000 to $24,000' },
      { label: 'Metal, tile, or composite', range: '$20,000 to $45,000' },
      { label: 'Deck repairs found after tear-off', range: '$500 to $2,000' },
    ],
    rangeNote: rangeNote('a roof replacement'),
    insurance: {
      heading: 'The claim and the contract are different papers.',
      paragraphs: [
        'A replacement after hail or wind often happens beside an insurance claim. We photograph the roof and we build the roof you hire. The payment, the deductible, and any depreciation the policy holds back are between you and the insurer. Many coastal Texas policies use a wind or hail deductible that is not the same as the deductible on a kitchen leak. Ask the company that wrote the policy which one applies.',
        'We can be on site when an adjuster looks at the roof and speak to the condition and the scope. We are not there to negotiate.',
        notAPublicAdjuster,
      ],
      links: roofInsuranceLinks,
    },
    faqs: [
      {
        q: 'What does a full roof replacement typically cost in Houston?',
        a: 'Architectural asphalt on a typical house often plans at $12,000 to $24,000. Metal, tile, or composite often plans at $20,000 to $45,000. Deck repairs found after tear-off often add $500 to $2,000, and a bad sheet of decking is typically about $75 to $150. These are typical planning ranges, not a quote. Pitch and size move them.',
      },
      {
        q: 'Why is there no price per square on this page?',
        a: 'Because a per-square number written before the inspection leaves out the pitch, the stories, the valleys, and the deck. Two roofs with the same square footage are not the same job. The visit is how the scope gets real.',
      },
      {
        q: 'Does insurance set the price of the new roof?',
        a: 'No. Your insurer decides what the policy pays. We price the replacement. Those numbers can differ, including when a deductible or depreciation is involved. We do not close that gap by calling it coverage, and we do not negotiate the claim.',
      },
      {
        q: 'What if the deck is rotten after the shingles come off?',
        a: 'We stop and show you. Soft decking is replaced before the new roof goes on, because the new system has to be fastened to something solid. You hear the added scope before it is built. A few sheets and a widespread problem are priced differently.',
      },
      {
        q: 'Do you need a permit to replace a roof?',
        a: 'In the City of Houston, a full replacement is typically permitted. Other jurisdictions in the metro issue their own permits. The permit is scheduled as part of the job, not discovered after the roof is on.',
      },
      {
        q: 'Can the new roof change the color of the house?',
        a: 'Yes. Material, color, and profile change the elevation. If you are in an HOA that reviews roofs, that approval comes before we order. If you are not, we still look at the brick or the siding in daylight before the color is final.',
      },
    ],
  },
  'roofing-emergency-tarp-repair': {
    moreIntro: [
      'A tarp is temporary protection. It is not a roof, and it is not a repair you leave through the next season. The job is to stop water, photograph the opening, and anchor the cover so the next wind does not turn the tarp into the problem. The permanent roof is planned after the house is dry enough to think.',
      'We do not climb a roof in an active thunderstorm to prove speed. When it is safe to be up there, we go. If water is already in the ceilings, say that on the call. The tarp stops more water. The insulation and the drywall are a drying job we also do.',
    ],
    moreLocal: [
      'Hurricane season, June through November, and the squalls that ride with it are when these calls cluster, from Clear Lake and Galveston inland to Katy and The Woodlands. A limb, a lifted slope, or wind-driven rain at a valley is the usual opening. The neighborhoods change. The first night does not: cover the hole, keep the photos, keep the water out of the attic.',
    ],
    factorsHeading: 'Wind after the tarp, and water already inside.',
    factorsIntro:
      'The storm that opened the roof is often not the last band of weather that week. The tarp has to survive what is still in the forecast, and the ceiling may already be wet.',
    factors: [
      {
        title: 'The next wind',
        body: 'A loose tarp becomes a sail. We anchor it for the weather that is still coming, and we tell you when it should be checked. A cover that was fine on a calm morning can lift in the afternoon line. Temporary means temporary, and it also means secure.',
      },
      {
        title: 'Where the water went',
        body: 'An opening in the roof wets insulation, the top of the drywall, and sometimes the rooms two floors down. On a one-story slab house the stain shows at the ceiling. The attic is where the water is sitting. We look at both. Drying does not wait on a convenient week.',
      },
      {
        title: 'Steep and two-story roofs',
        body: 'A low porch and a steep two-story are different tarping jobs. Access, the size of the opening, and how much of the slope has to be covered change the work. We say what we can cover safely.',
      },
      {
        title: 'Photos before the cover',
        body: 'We photograph the opening and the surrounding roof before the tarp hides it, when it is safe to do that. Those pictures are for you. If you file a claim, your insurer decides what they mean. The permit, if one is required, belongs to the permanent repair, not to the night we stop the leak.',
      },
    ],
    process: [
      {
        title: 'Inspect',
        body: 'We check the roof safely and find where the water is entering. Limbs, lifted shingles, and a punctured deck are marked. If the roof is not safe to walk, we say that and we still look for a way to keep the water out.',
      },
      {
        title: 'Document',
        body: 'Photographs of the opening, the slopes around it, and any interior stains are taken before the cover goes on. You get a record of what the storm did, not only a picture of blue plastic.',
      },
      {
        title: 'Select',
        body: 'The tarp and the size are chosen for the opening and for the weather still forecast. A small puncture and a whole slope that lost its shingles are not the same cover.',
      },
      {
        title: 'Anchor',
        body: 'The tarp is fastened so wind will not lift it. Boards or battens, the method the roof and the wind require, are part of the install. A few nails through the middle of a loose sheet is not an anchor.',
      },
      {
        title: 'Divert',
        body: 'Water is directed off the cover and away from the opening, including at a valley or a wall where the storm found a path. The inside of the house is checked for what is still dripping.',
      },
      {
        title: 'Plan',
        body: 'We outline the permanent repair or the replacement, and the drying if the ceilings are wet. You know what is temporary and what has to be scheduled. The tarp’s job ends when that work is done.',
      },
    ],
    signsHeading: 'When to call before the next band of rain.',
    signs: [
      {
        title: 'You can see daylight or sky',
        body: 'An open deck, a missing section, or a limb through the roof is not a wait-until-Monday leak. Call (713) 909-0034. If you cannot call, the emergency form on this site reaches the same team.',
      },
      {
        title: 'Shingles are off and rain is coming',
        body: 'A slope that is down to the underlayment may hold for a sprinkle and fail in a thunderstorm. Covering it is the conservative move. The photos come first.',
      },
      {
        title: 'The ceiling is dripping',
        body: 'The roof is still the entry, and the ceiling is already a restoration. Say both when you call. A bucket is not a drying plan in this humidity.',
      },
      {
        title: 'A tarp is already flapping',
        body: 'A cover someone tied on in the dark can be the next leak. We re-anchor it or replace it, and we photograph what is under it if that record does not exist yet.',
      },
    ],
    materialsHeading: 'What a temporary cover actually is.',
    materialsIntro:
      'The materials are simple on purpose. The work is the anchor and the water path. The permanent roof is a different material list, and it is not chosen in the rain.',
    materials: [
      {
        title: 'The tarp',
        body: 'A heavy cover sized past the opening so the edges land on sound roofing, not on the hole. Thin plastic and a short sheet that ends in the valley will fail. We size it to the damage and the slope.',
      },
      {
        title: 'Anchors',
        body: 'Battens or other securement that holds the sheet in wind. The fasteners go into a plan, not through the middle of the only dry patch. When the permanent roof is built, those penetrations are part of what comes off.',
      },
      {
        title: 'Water path',
        body: 'The cover has to shed, not pond. A belly of water on a tarp becomes a collapse. We set the slope of the cover so water leaves the house.',
      },
      {
        title: 'The permanent roof, later',
        body: 'Asphalt, metal, tile, or a repair of the field are decided after the deck can be seen. Emergency night is the wrong time to pick a shingle color. It is the right time to keep the attic dry.',
      },
    ],
    costHeading: 'What emergency tarping tends to cost.',
    costIntro: [
      'The price is the size of the opening, the steepness, the stories, and whether we can do the work safely in the weather that is left. A small one-story puncture and a steep two-story slope are not the same call. The permanent repair is not included in the tarp.',
    ],
    costFactors: [
      {
        title: 'How big the opening is',
        body: 'A pipe-boot hole and a slope that lost its shingles use different amounts of cover and time.',
      },
      {
        title: 'Access',
        body: 'Height, pitch, and a roof that is slick or unstable change the work. If we cannot do it safely, we will say that rather than pretend we can.',
      },
      {
        title: 'What is wet inside',
        body: 'The tarp price is the roof. Extraction and drying inside are the restoration scope. We separate them so you can see both.',
      },
    ],
    ranges: [
      { label: 'A localized opening on a one-story roof', range: '$450 to $1,200' },
      { label: 'A larger, steeper, or two-story tarp', range: '$1,000 to $3,000' },
    ],
    rangeNote: rangeNote('emergency roof tarping'),
    insurance: {
      heading: 'Cover the house, and keep the pictures.',
      paragraphs: [
        'Protecting the house from more water is the priority, and policies generally expect you not to let a small opening become a wet second floor. Photograph before you cover, or have us do it. Then tarp. Do not throw wet insulation away before it is in a picture if you can keep it safely.',
        'We do not tell you to wait on an adjuster while rain is entering. We also do not tell you the tarp will be reimbursed. That is a coverage question.',
        notAPublicAdjuster,
      ],
      links: [
        { href: '/hurricane-season-prep-houston', label: 'Hurricane season prep for a Houston home' },
        { href: '/storm-and-hail-roof-repair-houston', label: 'Storm and hail roof repair in Houston' },
      ],
    },
    faqs: [
      {
        q: 'What does emergency roof tarping typically cost?',
        a: 'A localized opening on a one-story roof often plans at $450 to $1,200. A larger, steeper, or two-story cover often plans at $1,000 to $3,000. These are typical planning ranges, not a quote. The permanent repair is separate. Call (713) 909-0034 if water is coming in.',
      },
      {
        q: 'Should I wait for the insurance adjuster before the roof is covered?',
        a: 'No. Stop the water. Photographs of the opening come first, then the tarp. An adjuster can see the pictures and the cover. Leaving the attic open through another storm to preserve a view of the hole is how the ceiling comes down.',
      },
      {
        q: 'How long can a tarp stay on?',
        a: 'Until the permanent repair, and not as a season-long roof. Wind and sun work on a temporary cover. We tell you when it should be checked, and we schedule the real roof as soon as the scope and the weather allow.',
      },
      {
        q: 'What if the ceiling is already wet?',
        a: 'Say so when you call. The tarp is the roof. Wet insulation and drywall are dried as a restoration, with air movers and dehumidification, because Houston air is often too wet to dry a house by opening the windows.',
      },
    ],
  },
  siding: {
    moreIntro: [
      'Siding is the wall you see from the street and the layer that is supposed to shed water before it reaches the sheathing. Board-and-batten, lap, and the trim at the windows are one elevation. A new profile with the old trim left in place looks like two projects.',
      'We repair a section when the material and the faded color can be matched. South and west walls in Houston bleach faster than the north side. A repair is matched to the boards that are on the house now, not to the chip from the year they were installed.',
    ],
    moreLocal: [
      'Humidity, sun, and the occasional wind-driven rain are the climate load. Fiber cement is common here because it handles moisture better than wood lap and it is not a meal for insects the way untreated wood is. Wood and engineered wood are still options when the elevation wants them, with a finish plan that accepts Houston sun. We talk through that before the order, including paint versus a factory finish.',
    ],
    factorsHeading: 'Sun, water behind the wall, and the HOA.',
    factorsIntro:
      'The color is the decision you see. The weather-resistive layer and the sheathing are the decision the house cares about. An HOA may care about both the color and the profile.',
    factors: [
      {
        title: 'Sun on the south and west',
        body: 'Those walls fade first. A patch from a new bundle will not match a ten-year-old south wall even when the product name matches. We say when a section will blend and when the elevation wants more than a patch.',
      },
      {
        title: 'What is behind the siding',
        body: 'Rotten sheathing, a missing wrap, and foam that has turned to powder show up when the boards come off. Storm water that got past the caulk lives there. The new siding goes on a wall that can take it. Hidden rot is extra, and we show you before we cover it back up.',
      },
      {
        title: 'Older walls and newer elevations',
        body: 'A Memorial or Spring Branch house may be getting a section matched to wood or an older fiber cement. A Cinco Ranch or Woodlands elevation is often a full profile change, board-and-batten or a new lap, chosen for the street. The detailing at corners and windows is what makes either one look finished.',
      },
      {
        title: 'Permits and architectural review',
        body: 'A small repair may not need a permit. A full re-side, or work that replaces sheathing, often does, and the city or county depends on the address. HOAs in master-planned communities commonly review siding material and color. That approval is before the order, not after the wall is up.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the elevation, the fade, the caulk joints, and any soft spots at the trim. You say whether you want a match or a new profile. We say which one the wall will allow.',
      },
      {
        title: 'Plan',
        body: 'Profile, color, trim, and the corners are chosen together. If an HOA reviews exteriors, that submission is part of the plan. Flashings at windows and the wrap, if the wall is opening, are specified.',
      },
      {
        title: 'Prepare',
        body: 'Plants and walks are protected. The old siding comes off where the scope says so. Sheathing is inspected. Rotten board is replaced before the new skin goes on. We do not side over mush.',
      },
      {
        title: 'Build',
        body: 'The new boards are installed with the fastening and the clearance the product wants, including at the roof and at the slab. Window trim, corners, and soffits are detailed so the elevation reads as one.',
      },
      {
        title: 'Finish',
        body: 'Caulk, paint or the factory finish, and the touch-up at the cuts close the wall. A field finish is the coating the sun will see. We do not leave raw cuts on a south wall.',
      },
      {
        title: 'Walk through',
        body: 'We walk the elevations with you, including the corners and the windows. You see the color in daylight. Anything that needs a joint or a paint touch is listed while we are there.',
      },
    ],
    signsHeading: 'Signs the siding is failing.',
    signs: [
      {
        title: 'Boards are soft at the bottom',
        body: 'Swelling at the first course, or a soft spot at a hose bib, is water in the wall. Paint will not dry that out. The board and what is behind it come off.',
      },
      {
        title: 'The south wall does not match the north',
        body: 'Fade is normal. A repair planned from a new sample against a faded wall will look like a patch. We look at the wall in the sun before we promise a blend.',
      },
      {
        title: 'Caulk has pulled away from the windows',
        body: 'That joint is a water path in a wind-driven rain. Sometimes it is a caulk repair. Sometimes the trim and the paper behind it are already wet. We open what we need to open.',
      },
      {
        title: 'You want a different elevation',
        body: 'Lap to board-and-batten, or a new color, is a replacement, not a repair. It is also the project an HOA is most likely to review.',
      },
    ],
    materialsHeading: 'Fiber cement, wood, and the trim.',
    materialsIntro:
      'The profile is a design choice. The material is a climate choice. Houston sun and humidity are why we talk about both before a bundle is ordered.',
    materials: [
      {
        title: 'Fiber cement',
        body: 'The common Houston siding because it handles moisture and it does not rot the way wood does. It is heavy, it is cut with the right blade, and the paint or the factory color is the finish. We install lap, board-and-batten, and the trim shapes that go with them.',
      },
      {
        title: 'Wood and engineered wood',
        body: 'A different look, and a finish that the sun will consume if it is ignored. Engineered wood and real wood are not the same maintenance. We say which one is specified and how the bottom edge meets the slab so it is not sitting in irrigation.',
      },
      {
        title: 'Trim, corners, and soffits',
        body: 'The wall is finished at the windows, the corners, and the roof edge. New field boards with tired trim still look tired. Those pieces are in the scope when the elevation is the project.',
      },
      {
        title: 'The layer behind',
        body: 'Wrap, flashing tape at the windows, and sound sheathing. If we are opening the wall, that layer is the water management. Siding is the rain screen you see. It is not a substitute for the flashing.',
      },
    ],
    costHeading: 'What siding tends to cost.',
    costIntro: [
      'A matched repair, one elevation, and a whole-house re-side are different projects. Stories, the number of windows, and rotten sheathing move the number. Color and profile do too, once the HOA and the house agree.',
    ],
    costFactors: [
      {
        title: 'How much wall',
        body: 'A section that can be matched is labor and a few boards. One elevation is a visible face. A whole house is every course, corner, and window.',
      },
      {
        title: 'What we find underneath',
        body: 'Sound sheathing is a re-side. Soft sheathing is carpentry before the new boards. We price that when we see it, not as a guess from the curb.',
      },
      {
        title: 'Height and detail',
        body: 'Two stories, a lot of windows, and a complicated gable take longer than a simple one-story ranch. Trim details are part of that time.',
      },
    ],
    ranges: [
      { label: 'A matched section repair', range: '$800 to $3,000' },
      { label: 'One elevation', range: '$3,500 to $9,000' },
      { label: 'Whole-house re-side, a typical home', range: '$14,000 to $32,000' },
    ],
    rangeNote: rangeNote('siding repair or replacement'),
    insurance: {
      heading: 'Storm damage and a faded wall are different.',
      paragraphs: [
        'Wind can take a section of siding off and wet the sheathing. That is worth photographing before it is repaired: the missing boards, the wrap, and any stain inside. Fade, chalking, and a color you are tired of are maintenance, not a storm. We do not write a maintenance repaint as hail.',
        notAPublicAdjuster,
      ],
    },
    faqs: [
      {
        q: 'What does siding replacement typically cost in Houston?',
        a: 'A matched section often plans at $800 to $3,000. One elevation often plans at $3,500 to $9,000. A whole-house re-side on a typical one- or two-story house often plans at $14,000 to $32,000. Rotten sheathing, a lot of windows, and a third story move the number. These are typical planning ranges, not a quote.',
      },
      {
        q: 'Can you match siding on a faded south wall?',
        a: 'Sometimes. We compare the new board to the wall in the sun, not to a sample in the shade. If the fade is strong, a patch will show, and we will say that a larger area will look more intentional.',
      },
      {
        q: 'Does new siding need a permit or HOA approval?',
        a: 'A small repair often does not need a permit. A full re-side often does, and the city or county depends on the address. HOAs in Cinco Ranch, The Woodlands, and many master-planned neighborhoods review material and color. We want that answer before we order.',
      },
      {
        q: 'Why not side over the old boards?',
        a: 'Because the sheathing is where the rot is. Covering it hides a wet wall and adds weight and thickness at the windows. We take off what the scope calls for and we look at the wall before the new skin goes on.',
      },
    ],
  },
  'patios-decks': {
    moreIntro: [
      'A deck or a patio is the floor outside the back door, and in Houston it has to shed water away from the house. We start with what is holding the deck up: the ledger at the wall, the posts, and the footings. New boards on a rotten ledger are a new walking surface on a bad connection.',
      'Sun and rain decide the material. A cover, the rails, and the stairs are planned with the surface so the outdoor room drains and the walk down is solid. The door, the siding, and the deck are detailed together.',
    ],
    moreLocal: [
      'Irrigation and a slab that the soil has piled against are how water sits at the house. A new patio that slopes back toward the brick will put rain in the wall and, on a slab, across the floor inside. We set the slope away from the house. Attached covers and decks are also the projects an HOA and a permit office are most likely to review.',
    ],
    factorsHeading: 'Drainage, the ledger, and the HOA.',
    factorsIntro:
      'The yard and the door ask for a ground-level patio, a raised deck, or a cover. Houston rain and the rules at the address decide how it is built.',
    factors: [
      {
        title: 'Water at the house',
        body: 'The surface, the gaps in a deck, and the slope of a patio have one job: move water away from the wall and the slab. A cover needs a roof that drains, not a pan that dumps at the door. Gutters and the soil against the brick are part of what we look at, because a perfect deck beside a buried foundation still floods the living room.',
      },
      {
        title: 'The ledger and the footings',
        body: 'The board where the deck meets the house is a common failure, especially when flashing was skipped and Houston rain sat in the joint. Posts need footings, not a paver on the dirt. We open what we need to open on a rebuild. Sound framing can stay. Rotted framing comes out.',
      },
      {
        title: 'Sun',
        body: 'A west-facing deck in Katy or the Energy Corridor takes a full afternoon of sun. Wood needs a finish plan. Composite and PVC move less and still get hot underfoot. A cover is a shade decision and a structure decision. We talk through both.',
      },
      {
        title: 'Permits and architectural review',
        body: 'An attached deck, a raised structure, and a patio cover often need a permit. The City of Houston, the City of Katy, Sugar Land, and the county are different offices, and a neighborhood name does not pick the office. HOAs in Cinco Ranch, The Woodlands, and similar communities commonly review decks, covers, and sometimes the stain color. Interior work does not. This does.',
      },
    ],
    process: [
      {
        title: 'Consult',
        body: 'We look at the door, the grade, the existing framing, and how you want to use the yard. A rebuild starts by finding what is still sound. A new patio starts from the slope and the door it has to meet.',
      },
      {
        title: 'Plan',
        body: 'Wood or composite, rails, stairs, and a cover are drawn together. Footings and the ledger flashing are in the plan. If a permit or an HOA review applies, that is on the schedule before we dig.',
      },
      {
        title: 'Prepare',
        body: 'The site is marked. Bad framing comes out. Footings are dug to what the structure needs. The wall is protected where the ledger lands, and the siding or the brick is flashed before new boards hide the joint.',
      },
      {
        title: 'Build',
        body: 'Posts, beams, joists, and the ledger are set, then the decking or the patio surface. A cover’s posts and roof are built so water sheds away from the house. Rails and stairs are part of the same structure, not a kit added at the end.',
      },
      {
        title: 'Finish',
        body: 'A wood deck gets the finish it was specified with. Composite gets the ends and the picture-frame details closed. The patio slope is checked with water in mind. Gates, if they are in the scope, are hung so they swing on the grade that is there.',
      },
      {
        title: 'Walk through',
        body: 'We walk the stairs, the rails, and the door threshold with you. You see where the water is supposed to go. Anything loose in a rail or a board is tightened before we call it done.',
      },
    ],
    signsHeading: 'Signs the deck or patio is unsafe or tired.',
    signs: [
      {
        title: 'The ledger is soft',
        body: 'A spongey board where the deck meets the house, or nails that have pulled away, is the connection failing. New decking on top of that is the wrong order.',
      },
      {
        title: 'Rails move',
        body: 'A rail that flexes is a fall, not a stain color. We look at the posts and the fasteners before we talk about a new board color.',
      },
      {
        title: 'Water sits against the brick',
        body: 'A patio that ponds at the wall, or soil piled above the slab line, is how rain comes inside. The slope is the repair. Furniture does not fix it.',
      },
      {
        title: 'You want shade more than a new board',
        body: 'A cover is the project if the afternoon sun is why you do not use the patio. It is planned with the posts and the drainage, and it is often the piece the permit office and the HOA both want to see.',
      },
    ],
    materialsHeading: 'Wood, composite, concrete, and a cover.',
    materialsIntro:
      'The surface is what you walk on. The framing and the slope are what keep it attached and keep the house dry. We specify both.',
    materials: [
      {
        title: 'Wood decking',
        body: 'Pressure-treated pine is the common structure and a common walking surface. Cedar is a different look and a different upkeep. Both want a finish in this sun, and both want air under the boards so they can dry after a storm. The ledger is flashed either way.',
      },
      {
        title: 'Composite and PVC',
        body: 'Less finish work, more attention to gapping and to how hot the color gets in full sun. The frame underneath is still usually wood or another structure we have to see. A composite board does not save a rotten joist.',
      },
      {
        title: 'Concrete patios',
        body: 'A slab on grade, sloped away from the house, with the joints and the finish you choose. It meets the door without trapping water at the threshold. Soil and mulch are kept off the brick above the new concrete.',
      },
      {
        title: 'Patio covers',
        body: 'Posts, beams, and a roof that sheds. Tied into the house or set so it does not dump water at the wall. The cover is engineered as a structure in the wind this city gets, not as a shade sail nailed to the fascia.',
      },
    ],
    costHeading: 'What a patio or deck tends to cost.',
    costIntro: [
      'A ground-level platform, a raised deck, a concrete patio, and a cover are different structures. Size is the multiplier. Footings, height, rails, and the permit are the lines that move a job inside the range. These are typical planning ranges for ordinary yards, not a quote for a second-story deck over a slope.',
    ],
    costFactors: [
      {
        title: 'New or a rebuild',
        body: 'Saving sound joists and replacing the boards is less than a new frame, new footings, and a new ledger. We only save what is sound.',
      },
      {
        title: 'Material and rails',
        body: 'Wood decking, composite, and concrete are different prices. Rails and stairs are a large part of a raised deck and a small part of a patio on grade.',
      },
      {
        title: 'The cover',
        body: 'Posts and a roof are a structure. They are priced with the patio they shade, including how they attach to the house and where the water lands.',
      },
    ],
    ranges: [
      { label: 'Concrete patio', range: '$4,500 to $12,000' },
      { label: 'Wood deck, about 200 sq ft at grade', range: '$7,000 to $15,000' },
      { label: 'Composite deck, similar size', range: '$12,000 to $24,000' },
      { label: 'Patio cover', range: '$5,000 to $16,000' },
    ],
    rangeNote: rangeNote('a patio, deck, or cover'),
    faqs: [
      {
        q: 'What does a new deck or patio typically cost in Houston?',
        a: 'A concrete patio often plans at $4,500 to $12,000. A ground-level wood deck of about 200 square feet often plans at $7,000 to $15,000. A composite deck of similar size often plans at $12,000 to $24,000. A patio cover often plans at $5,000 to $16,000. Height, rails, and footings move these. They are typical planning ranges, not a quote.',
      },
      {
        q: 'Do decks and patio covers need a permit?',
        a: 'Often, yes, when they are attached to the house or when a cover is a roof. The permit office follows the jurisdiction, not the neighborhood nickname. An HOA in a master-planned community may also have to approve the structure and the color. We sort that out before we build.',
      },
      {
        q: 'Can you replace the boards and leave the frame?',
        a: 'When the ledger, the joists, and the footings are sound. We look at those first. Rotted wood at the house comes out. New boards on a soft ledger are how the next failure happens faster.',
      },
      {
        q: 'How should the patio drain in a Houston rain?',
        a: 'Away from the house. A slope back to the brick or the slab is how water crosses the threshold. We set the grade so the yard takes the water, and we look at gutters and the soil piled against the wall because those undo a good slope.',
      },
    ],
  },
};
