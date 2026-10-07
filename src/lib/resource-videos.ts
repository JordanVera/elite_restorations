/**
 * Project video library for the homeowner and realtor portals.
 *
 * To swap placeholder footage:
 * 1. Change `placeholderVideo` to update every step that does not set its own `video`.
 * 2. Or set `video` on a single step. Use `kind: "youtube"` with a video id in `src`,
 *    or `kind: "file"` with a direct MP4/WebM URL.
 * 3. Set `placeholder: false` once the clip is real footage so the badge hides.
 */

export const PLACEHOLDER_LABEL = 'Placeholder – replace with real footage';

export type VideoSource = {
  kind: 'youtube' | 'file';
  /** YouTube video id when kind is "youtube", or a direct media URL when kind is "file". */
  src: string;
  /** Hide the placeholder badge once this clip is real project footage. */
  placeholder?: boolean;
};

/** Shared stand-in. Big Buck Bunny (Blender Foundation, CC BY) until real job footage is ready. */
export const placeholderVideo: VideoSource = {
  kind: 'youtube',
  src: 'aqz-KE-bpKQ',
  placeholder: true,
};

export type MicroStep = {
  title: string;
  description: string;
  video?: VideoSource;
};

export type ProjectType = {
  slug: string;
  name: string;
  summary: string;
  steps: MicroStep[];
};

export type VideoCategory = {
  slug: string;
  name: string;
  summary: string;
  projects: ProjectType[];
};

export const videoCategories: VideoCategory[] = [
  {
    slug: 'bathroom',
    name: 'Bathroom',
    summary:
      'Showers, vanities, tile, and full remodels, broken into the steps homeowners actually ask about.',
    projects: [
      {
        slug: 'shower-renovation',
        name: 'Shower Renovation',
        summary: 'From the old enclosure coming out to a watertight, finished shower.',
        steps: [
          {
            title: '1. Demo & Removal',
            description:
              'We protect the rest of the room, then remove the old shower, fixtures, and any damaged substrate so the new work starts on a sound base.',
          },
          {
            title: '2. Waterproofing',
            description:
              'Membranes, corners, and the pan go in before any tile. This is the step that keeps water in the shower.',
          },
          {
            title: '3. Tile',
            description:
              'Layout, thinset, and tile, with grout lines kept consistent from the niche to the curb.',
          },
          {
            title: '4. Fixtures',
            description:
              'Valve trim, head, and glass are set once the tile has cured and the waterproofing can stay undisturbed.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We clean the space and walk the finished shower with you, checking the drain, door, and details.',
          },
        ],
      },
      {
        slug: 'vanity-renovation',
        name: 'Vanity Renovation',
        summary: 'A new vanity, top, and fixtures without rebuilding the whole room.',
        steps: [
          {
            title: '1. Demo & Removal',
            description:
              'The old vanity, top, and faucet come out, and the wall and floor behind them are checked before anything new is set.',
          },
          {
            title: '2. Plumbing',
            description:
              'Supply lines and the drain are aligned to the new cabinet so the faucet and trap sit where they should.',
          },
          {
            title: '3. Vanity & Top',
            description:
              'The cabinet is leveled and fastened, then the top is set and sealed at the wall.',
          },
          {
            title: '4. Fixtures & Mirror',
            description:
              'Faucet, drain, mirror, and lighting go on last, once the top and cabinet are locked in.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We run the water, check the drawers and doors, and walk the finished vanity with you.',
          },
        ],
      },
      {
        slug: 'full-bathroom-remodel',
        name: 'Full Bathroom Remodel',
        summary: 'A complete bathroom, sequenced so finishes land on work that is already right.',
        steps: [
          {
            title: '1. Demo & Protection',
            description:
              'The room is protected and cleared down to what needs to stay, so plumbing and layout changes can happen cleanly.',
          },
          {
            title: '2. Rough-in',
            description:
              'Plumbing and electrical move to the new plan before walls close and finishes begin.',
          },
          {
            title: '3. Waterproofing & Tile',
            description:
              'Wet areas are waterproofed, then floors and walls are tiled in the order the layout requires.',
          },
          {
            title: '4. Fixtures & Finishes',
            description:
              'Vanity, toilet, shower trim, glass, and accessories are installed on the finished surfaces.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We clean the room and walk every fixture and finish with you before the job is closed.',
          },
        ],
      },
      {
        slug: 'tile-work',
        name: 'Tile Work',
        summary: 'Floors, walls, and showers where the tile itself is the scope.',
        steps: [
          {
            title: '1. Surface Prep',
            description:
              'The substrate is flattened, secured, and made ready so tile does not telegraph what is underneath.',
          },
          {
            title: '2. Layout',
            description:
              'Lines are snapped and cuts are planned so the eye lands on full tiles, not awkward slivers.',
          },
          {
            title: '3. Setting Tile',
            description:
              'Tile is set in a consistent bed, with joints kept even as the field grows.',
          },
          {
            title: '4. Grout & Seal',
            description:
              'Joints are grouted, cleaned, and sealed where the material calls for it.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We look over lippage, joints, and edges with you, then leave the surface clean.',
          },
        ],
      },
    ],
  },
  {
    slug: 'kitchen',
    name: 'Kitchen',
    summary:
      'Cabinet updates, new counters, and full kitchen remodels, shown in the order the work happens.',
    projects: [
      {
        slug: 'cabinet-refresh',
        name: 'Cabinet Refresh',
        summary: 'New doors, paint, or hardware when the boxes are still sound.',
        steps: [
          {
            title: '1. Empty & Protect',
            description:
              'The kitchen is cleared and protected so finishes can be worked without damaging counters or floors.',
          },
          {
            title: '2. Removal',
            description:
              'Doors, drawers, and old hardware come off so the boxes can be prepped evenly.',
          },
          {
            title: '3. Refinish',
            description:
              'Fronts are painted or replaced, and the boxes are cleaned up to match the new finish.',
          },
          {
            title: '4. Hardware & Adjustments',
            description:
              'Pulls go on, hinges are tuned, and doors and drawers are aligned.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We put the kitchen back together with you and check every door and drawer.',
          },
        ],
      },
      {
        slug: 'countertop-replacement',
        name: 'Countertop Replacement',
        summary: 'Templating through sink and faucet, without a full kitchen gut.',
        steps: [
          {
            title: '1. Measure & Template',
            description:
              'The existing layout is measured and templated, including sinks, cooktops, and overhangs.',
          },
          {
            title: '2. Removal',
            description:
              'The old top, sink, and faucet come out, and the cabinets underneath are checked before the new top arrives.',
          },
          {
            title: '3. Substrate Check',
            description:
              'Cabinets are leveled and reinforced where the new material needs a flatter, stronger base.',
          },
          {
            title: '4. Set the Top',
            description:
              'The new countertop is set, seamed, and fastened, with the sink opening finished cleanly.',
          },
          {
            title: '5. Fixtures & Walkthrough',
            description:
              'Sink and faucet go back in, the water is tested, and we walk the edges and seams with you.',
          },
        ],
      },
      {
        slug: 'full-kitchen-remodel',
        name: 'Full Kitchen Remodel',
        summary: 'A full kitchen, from demolition through the day you cook in it again.',
        steps: [
          {
            title: '1. Demo',
            description:
              'Cabinets, counters, and finishes come out in a controlled sequence, with the rest of the house protected.',
          },
          {
            title: '2. Rough-in',
            description:
              'Plumbing, electrical, and any layout changes are completed before new cabinets arrive.',
          },
          {
            title: '3. Cabinets',
            description:
              'Boxes are set level and plumb, then fillers, panels, and end panels close the gaps.',
          },
          {
            title: '4. Counters & Backsplash',
            description:
              'Tops are templated and installed, then the backsplash is set against the finished edge.',
          },
          {
            title: '5. Fixtures & Walkthrough',
            description:
              'Appliances, faucet, lighting, and hardware are finished, then we walk the kitchen with you.',
          },
        ],
      },
    ],
  },
  {
    slug: 'whole-home',
    name: 'Whole Home',
    summary: 'Broader interior work that touches more than one room.',
    projects: [
      {
        slug: 'interior-refresh',
        name: 'Interior Refresh',
        summary: 'Paint, millwork, and flooring updates coordinated across the house.',
        steps: [
          {
            title: '1. Scope Walk',
            description:
              'We walk the rooms together and mark what is paint, what is repair, and what is new material.',
          },
          {
            title: '2. Surface Prep',
            description:
              'Walls, trim, and floors are protected or prepped so the finish work has a clean start.',
          },
          {
            title: '3. Paint & Millwork',
            description:
              'Paint and trim are completed in an order that keeps fresh work from being damaged by the next trade.',
          },
          {
            title: '4. Flooring Transitions',
            description:
              'Floors are installed and transitions between rooms are finished so the house reads as one project.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We review each room with you, note any touch-ups, and complete them before we leave.',
          },
        ],
      },
      {
        slug: 'addition-prep',
        name: 'Addition Prep',
        summary: 'Opening an existing house so a new space can tie in cleanly.',
        steps: [
          {
            title: '1. Existing Conditions',
            description:
              'We document structure, utilities, and finishes at the tie-in so the new work meets the old house honestly.',
          },
          {
            title: '2. Structural Openings',
            description:
              'Walls are opened and temporary support is in place before anything permanent is removed.',
          },
          {
            title: '3. Weather Protection',
            description:
              'The opening is closed to weather at the end of each day so the rest of the house stays dry.',
          },
          {
            title: '4. Rough Coordination',
            description:
              'Framing, mechanical, and electrical rough-in are sequenced so finishes are not waiting on hidden work.',
          },
          {
            title: '5. Ready for Finishes',
            description:
              'We walk the shell with you before drywall and trim, while changes are still straightforward.',
          },
        ],
      },
      {
        slug: 'flooring-replacement',
        name: 'Flooring Replacement',
        summary: 'Removing what is there and installing a floor that meets the rest of the house.',
        steps: [
          {
            title: '1. Furniture & Protection',
            description:
              'Rooms are cleared and adjacent finishes are protected before the old floor comes up.',
          },
          {
            title: '2. Removal',
            description:
              'The existing floor is removed and the subfloor is inspected for soft spots and height issues.',
          },
          {
            title: '3. Subfloor Prep',
            description:
              'The subfloor is flattened, fastened, and made ready for the material you chose.',
          },
          {
            title: '4. Installation',
            description:
              'The new floor is installed with transitions planned at doors, stairs, and cabinets.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We walk the floors with you, check transitions, and leave the space clean.',
          },
        ],
      },
    ],
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    summary: 'Decks and exterior refreshes, shown as the sequence a crew actually follows.',
    projects: [
      {
        slug: 'deck-rebuild',
        name: 'Deck Rebuild',
        summary: 'A deck taken down to what is sound, then framed and finished again.',
        steps: [
          {
            title: '1. Demo & Inspection',
            description:
              'Old decking and rails come off so framing, ledger, and footings can be inspected before new lumber goes down.',
          },
          {
            title: '2. Framing',
            description:
              'Joists, beams, and posts are repaired or replaced, and the frame is checked for level and attachment.',
          },
          {
            title: '3. Decking',
            description:
              'Decking is fastened in a consistent pattern, with ends and picture-frame borders finished cleanly.',
          },
          {
            title: '4. Rails & Stairs',
            description:
              'Guards, handrails, and stairs are built to the new deck height and checked for a solid feel.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We walk the deck with you, including stairs and gates, and review care for the material.',
          },
        ],
      },
      {
        slug: 'exterior-refresh',
        name: 'Exterior Refresh',
        summary: 'Siding, trim, and paint work that changes how the house meets the street.',
        steps: [
          {
            title: '1. Assess',
            description:
              'We look at siding, trim, and paint up close so the scope covers what is failing, not only what shows from the curb.',
          },
          {
            title: '2. Repair',
            description:
              'Rot, loose trim, and failed caulk are repaired before any finish is applied.',
          },
          {
            title: '3. Prep',
            description:
              'Surfaces are washed, scraped, and masked so the new finish has something to hold.',
          },
          {
            title: '4. Finish',
            description:
              'Siding, trim, or paint goes on in the order that keeps fresh work protected.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We walk the elevations with you and note any touch-ups while the crew is still on site.',
          },
        ],
      },
      {
        slug: 'patio-cover',
        name: 'Patio Cover',
        summary: 'A covered outdoor room, from posts to the finished ceiling.',
        steps: [
          {
            title: '1. Layout',
            description:
              'Post locations and roof pitch are marked against the existing house before any concrete or steel is set.',
          },
          {
            title: '2. Structure',
            description:
              'Posts, beams, and the ledger or attachment are set and checked before decking or roofing begins.',
          },
          {
            title: '3. Roof',
            description:
              'The roof is dried in and tied to the house so water sheds away from the wall.',
          },
          {
            title: '4. Ceiling & Lights',
            description:
              'The underside, fans, and lighting are finished once the structure is closed.',
          },
          {
            title: '5. Final Walkthrough',
            description:
              'We walk the cover with you and review drainage, lights, and how it meets the house.',
          },
        ],
      },
    ],
  },
];

export function stepVideo(step: MicroStep): VideoSource {
  return step.video ?? placeholderVideo;
}

export function isPlaceholderClip(step: MicroStep) {
  return stepVideo(step).placeholder !== false;
}

export function getCategory(slug: string) {
  return videoCategories.find((category) => category.slug === slug);
}

export function getProject(categorySlug: string, projectSlug: string) {
  const category = getCategory(categorySlug);
  const project = category?.projects.find((item) => item.slug === projectSlug);
  if (!category || !project) return undefined;
  return { category, project };
}
