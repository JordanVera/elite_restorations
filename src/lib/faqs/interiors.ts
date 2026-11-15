import { assertFaqMap, type Faq } from "@/lib/faqs/types";

const phone = "(713) 909-0034";

export const interiorFaqs: Record<string, Faq[]> = {
  "kitchen-remodeling": [
    {
      q: "Do I need to be home every day of a kitchen remodel?",
      a: "Someone needs to let us in at the start and when a decision is waiting. You do not have to stand in the kitchen all day. If you will be at work, leave a way to reach you and tell us about alarms, pets, and which door to use.",
    },
    {
      q: "Can we still cook while the kitchen is torn apart?",
      a: "Plan on a stretch with no sink and no range. A lot of Houston families set up a temporary coffee and microwave station in another room. We tell you which days the water and the cooktop will be out before we start.",
    },
    {
      q: "Does an HOA review an interior kitchen?",
      a: "Usually no. Associations in Cinco Ranch, The Woodlands, and many Houston townhome sections review roofs, fences, and exterior color. Cabinets inside the house are a different question. A city or county permit is separate, and it shows up when plumbing, electrical, or structure moves.",
    },
    {
      q: "What if a leak already swelled the sink cabinet?",
      a: "That cabinet is not a finish problem. Soft wood and a wet slab have to be dried and repaired before new counters go on. We say so on the visit. A planned remodel and a water loss are different jobs, and your insurer decides any claim.",
    },
    {
      q: "Which City of Houston jobs need a kitchen permit?",
      a: "A new counter and paint on the same layout often do not. Moving a wall, a drain, or wiring usually does. If the address is Bellaire, West University, Sugar Land, or a county lot in Katy or The Woodlands, the counter is not the City of Houston. We name the office from the address.",
    },
    {
      q: "Why do cabinet doors stick in a Houston summer?",
      a: "Gulf humidity swells cheap boxes. We talk about plywood cabinets and a finish that can live through August before you order the pretty door. That choice is part of the price. It is also why a door that closed in a showroom can drag in July.",
    },
    {
      q: "Can you remodel a small Heights or West University kitchen?",
      a: "Yes. Those rooms are often crooked, and the plumbing may sit in a crawl space instead of a slab. We measure before we promise a wall or a sink can move. An open Katy plan is a different puzzle. The island has to work for the whole room.",
    },
    {
      q: "How do I start a kitchen conversation?",
      a: `Call or text ${phone}. The office at 511 Crestwater Ct, Houston, TX 77082, is open Monday through Saturday, 8:00 AM to 6:00 PM. The visit is how a planning range becomes a price. Family-owned since 1993.`,
    },
  ],
  "bathroom-remodeling": [
    {
      q: "Do I need to be home while the bathroom is rebuilt?",
      a: "Yes at the start, and when we need a decision on tile or a fixture. You do not have to watch every cut. Tell us how to get in, and which other bathroom the house can use while this one is closed.",
    },
    {
      q: "Can the rest of the house stay usable?",
      a: "Usually, if you have a second bath. Dust and a closed door are the real limits. A powder room that is the only toilet in the house is a shorter, more careful job. We say which case you are in before demolition.",
    },
    {
      q: "Should I keep the tub or switch to a shower?",
      a: "It depends on who uses the room. A tub that nobody sits in is often the space a shower needs. On a slab, moving the drain is the expensive part. Keeping the drain and rebuilding the shower is a smaller job. We measure before we promise either one.",
    },
    {
      q: "What if the wall behind the old tile is soft?",
      a: "Then the pretty tile is not the first task. Wet board has to come out and the wall has to dry. Houston humidity will not finish that job if we close it up. A leak repair and a planned remodel can share a bathroom. They are still two conversations.",
    },
    {
      q: "Does a window inside the shower change the work?",
      a: "Yes. The window has to be built into the waterproofing, or it comes out. Older Houston baths often have that window. We price it as part of the shower, not as a surprise after the tile is up.",
    },
    {
      q: "Will a new fan stop ceiling mildew by itself?",
      a: "Only if it actually exhausts outside and someone runs it. A fan that dumps into the attic recycles the steam. Paint over mildew without drying the source comes back. We look at the fan, the vent, and the wet wall together.",
    },
    {
      q: "Does an HOA approve a bathroom remodel?",
      a: "Interior tile and a vanity are rarely an association review. A new window on the street side can be. The building permit, when the drain or a circuit moves, follows the city or the county on the address. We check both.",
    },
    {
      q: "How fast can you look at a leaking shower?",
      a: `If water is spreading, call ${phone} any time. We will tell you the next safe step. A planned bath remodel is a scheduled visit, Monday through Saturday, 8:00 AM to 6:00 PM. Stop using that shower if the ceiling below is staining.`,
    },
  ],
  backsplash: [
    {
      q: "Do I need to be home while the backsplash goes up?",
      a: "Someone should be there at the start so we can confirm the layout in the real light. After that, many jobs can run while you are at work if we can lock up. Outlets and the range hood are the spots that need a look before we cover them.",
    },
    {
      q: "How long does a backsplash take?",
      a: "A straight ceramic wall is often a day or two once the tile is on site. A pattern, a stone, or a wall that is out of plumb takes longer. We will not lock a day count until we see the kitchen. Grout needs time before you splash it.",
    },
    {
      q: "Will steam and tomato sauce stain the grout?",
      a: "They can. A kitchen backsplash is wiped every day in Houston humidity. We talk about a grout you can clean, and a sealer when the material needs one. Glossy tile shows grease. Matte tile shows the wave in an old wall.",
    },
    {
      q: "Can you tile around the outlets without moving them?",
      a: "Often, yes. The plates come off and the tile is cut to the box. If an outlet sits in the middle of a pattern you care about, moving it is electrical work and may need a permit. We say which one it is before we cut.",
    },
    {
      q: "What if the wall is wavy?",
      a: "Older Heights and Bellaire kitchens often are. Large glossy tile will show every dip. We flatten the wall first, or we pick a tile that forgives it. Skipping that step is how a backsplash looks crooked in the afternoon light.",
    },
    {
      q: "Should the backsplash wait until the counters are in?",
      a: "Yes, on a remodel. The stone is scribed to the wall. Tile set first leaves a gap the counter cannot close. A backsplash-only job on counters that are already in is different, and we protect the stone.",
    },
    {
      q: "Is a permit part of a backsplash?",
      a: "Tile on a sound wall usually is not. Moving plumbing or wiring behind it can be. The City of Houston, Bellaire, and a county address are not the same counter. We say which case the plan is.",
    },
    {
      q: "Can you replace a few cracked tiles?",
      a: "Sometimes, if the same tile still exists and the wall behind it is sound. A leak that cracked the tile is a drying job first. A patch that cannot be matched is an honest conversation before we start a full wall.",
    },
  ],
  countertops: [
    {
      q: "Do I need to be home when you measure?",
      a: "Yes. The template is taken from the cabinets that are actually there, not from a drawing. Houston kitchens are rarely square. If you will not be home, someone who can unlock the house and answer a question about the sink should be.",
    },
    {
      q: "How long from the measure to the install?",
      a: "It depends on the stone and the shop. Stock quartz is faster than a slab that has to be ordered. We give you the sequence after the measure. We do not promise a citywide number of days on this page.",
    },
    {
      q: "Can I use the sink the day the counter goes in?",
      a: "Not always. The sink and the cooktop have to be set, and the plumbing has to be reconnected. We tell you whether that is the same day or the next visit. Plan one night without a kitchen sink.",
    },
    {
      q: "What if the cabinets are out of level?",
      a: "Then the stone is not the first fix. A counter follows the boxes under it. Soft or swollen cabinets, often from a slow leak, get repaired first. Setting a heavy top on a bad box cracks the top or opens the seams.",
    },
    {
      q: "Will a hot pan hurt the counter?",
      a: "It can, depending on the material. Quartz and solid surface do not like a pan straight off the burner. Granite is more forgiving and still not a trivet. We talk about how you cook before you pick the slab.",
    },
    {
      q: "Do you cut the sink and the cooktop?",
      a: "The openings are part of the fabrication, from the template, not a guess in the driveway. If the sink is staying, we need to see it. If it is new, we need the model before the slab is cut.",
    },
    {
      q: "Do you haul away the old counter?",
      a: "Yes, when we are replacing it and the cabinets can take the new one. A stone top is heavy. We protect the floors on the way out. If the cabinet below is rotten, that repair is separate and it happens first.",
    },
    {
      q: "Will an HOA care about kitchen counters?",
      a: "Almost never. Counters are inside. The association questions we see are about roofs, fences, and paint on the street. Your building permit, if the sink moves, is a city or county matter, not an HOA color chip.",
    },
  ],
  carpentry: [
    {
      q: "Can you match baseboards after a water repair?",
      a: "When that profile is still sold, yes. A lot of older Houston trim is not. We show you the closest match before we run it around the room. A short patch that does not match is more obvious than a planned change.",
    },
    {
      q: "Do I need to be home for trim and built-ins?",
      a: "For the measure, yes. For a day of installing shoe and casing, someone needs to let us in and lock up. Built-ins that change a closet need you there when we confirm the shelves. Pets and alarms are worth a mention.",
    },
    {
      q: "How long do custom built-ins take?",
      a: "It depends on the room and whether the wood has to be ordered. A simple shelf is not a floor-to-ceiling bookcase. We put the sequence in the estimate. Houston humidity means the wood should sit in the house before it is finished.",
    },
    {
      q: "Will a new wood door swell in the summer?",
      a: "It can, if it was fitted in dry indoor air and the house then sits humid. We fit doors for the season you live in and leave a little room. A door that sticks only in August is often the house, not a bad hinge.",
    },
    {
      q: "Can you repair a rotten window sill without a new window?",
      a: "Sometimes. If the rot is the sill and the frame is sound, we repair the wood. If the sash is soft or the opening leaked into the wall, the window is part of the job. We say which one after we probe it.",
    },
    {
      q: "Does interior trim need a City of Houston permit?",
      a: "Trim and shelves usually do not. Opening a wall, moving a header, or changing structure can. We do not pull a permit for baseboard. We do name it when the carpentry is really a structural repair.",
    },
    {
      q: "Can built-ins be part of a storm or water rebuild?",
      a: "Yes, after the room is dry. We do not close trim over damp drywall. Photos of what came out can go in the record you share with your insurer. We are not public adjusters. Your insurer decides any payment.",
    },
    {
      q: "What if the walls are not plumb?",
      a: "Then a long built-in will show the gap. Older houses inside the Loop are often out of square. We scribe the piece to the wall instead of pretending the wall is straight. That takes longer, and it is the right work.",
    },
  ],
  "tile-fireplaces": [
    {
      q: "Does it matter if the fireplace actually burns?",
      a: "Yes. A gas log, a wood fire, and a fireplace that is only a shelf are different heat. We ask before we order tile. A surround that never sees flame can use materials a working firebox should not.",
    },
    {
      q: "Do I need to be home for a fireplace remodel?",
      a: "For the layout, yes. The hearth and the mantel are easier to decide in the room than from a text. Once the tile is chosen, someone still needs to let us in. You do not have to watch every cut.",
    },
    {
      q: "How long does a surround take?",
      a: "A straightforward tile surround is often a few days once the material is here. A new mantel, rebuilt brick, or a hearth that has to come up takes longer. We tell you after we see the fireplace. Grout and thinset need time before you load the mantel.",
    },
    {
      q: "Can you tile a fireplace we never light?",
      a: "Yes. Many Houston fireplaces are decorative. We still look at the firebox so we do not cover a problem. If you might light it later, say so. The material choice is cheaper to make now.",
    },
    {
      q: "Can heat crack the tile?",
      a: "It can, if the tile and the set are wrong for a fire you actually use. We match the material to that use. A surround that only holds photos is a different spec. We do not promise a tile will ignore a hot firebox.",
    },
    {
      q: "Is a permit part of a new surround?",
      a: "Tile over a sound face usually is not. Changing the firebox, the gas line, or the structure can be. Gas work stays with the trade that is allowed to do it. We say what is tile and what is not.",
    },
    {
      q: "Should paint happen before or after the tile?",
      a: "Usually paint after the dusty work, or tape carefully if the walls are already finished. A living-room remodel that includes the fireplace should sequence the tile, the mantel, and the paint so nobody cuts into fresh color.",
    },
    {
      q: "What if the old brick is loose?",
      a: "Then tile does not go on yet. Loose brick and a soft hearth get repaired first. Covering them hides the failure. We probe the face on the visit and tell you what has to be solid before the finish.",
    },
  ],
};

assertFaqMap(interiorFaqs);
