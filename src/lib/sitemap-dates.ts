import { execFileSync } from 'node:child_process';

import { olderEsAreaSlugs } from '@/lib/es/city-landings';
import snapshot from '@/lib/sitemap-file-dates.json';

/**
 * Used only when a page has no date in its copy and no git history for its
 * source file. This is a fixed date, not the time the sitemap is built.
 */
export const SITEMAP_FALLBACK_LASTMOD = new Date('2026-11-13T00:00:00.000Z');

const briefFiles: Record<string, string> = {
  'kitchen-remodeling': 'src/lib/local/spec-kitchen.ts',
  'bathroom-remodeling': 'src/lib/local/briefs/bathroom.ts',
  backsplash: 'src/lib/local/briefs/backsplash.ts',
  countertops: 'src/lib/local/briefs/countertops.ts',
  'wood-flooring': 'src/lib/local/briefs/floors-a.ts',
  'tile-flooring': 'src/lib/local/briefs/floors-a.ts',
  'vinyl-flooring': 'src/lib/local/briefs/floors-b.ts',
  'laminate-flooring': 'src/lib/local/briefs/floors-b.ts',
  carpentry: 'src/lib/local/briefs/millwork.ts',
  'tile-fireplaces': 'src/lib/local/briefs/millwork.ts',
  roofing: 'src/lib/local/briefs/roofs.ts',
  'roof-replacement': 'src/lib/local/briefs/roofs.ts',
  'roofing-emergency-tarp-repair': 'src/lib/local/briefs/exterior-more.ts',
  siding: 'src/lib/local/briefs/exterior-more.ts',
  'patios-decks': 'src/lib/local/briefs/water-patio.ts',
  'water-damage-restoration': 'src/lib/local/briefs/water-patio.ts',
  'insurance-claims': 'src/lib/local/briefs/claims-paint.ts',
  'painting-drywall-repair': 'src/lib/local/briefs/claims-paint.ts',
};

const esPostFiles: Record<string, string> = {
  'houston-hail-storm-roof-claims': 'src/lib/es/posts-a.ts',
  'emergency-tarp-and-board-up-houston': 'src/lib/es/posts-a.ts',
  'houston-leaks-pipes-heater-dishwasher-toilet': 'src/lib/es/posts-a.ts',
  'houston-flood-damage-repair': 'src/lib/es/posts-a.ts',
  'houston-kitchen-remodel-ideas': 'src/lib/es/posts-a.ts',
  'houston-bathroom-remodel-guide': 'src/lib/es/posts-b.ts',
  'houston-flooring-for-humidity': 'src/lib/es/posts-b.ts',
  'houston-roof-replacement-guide': 'src/lib/es/posts-b.ts',
  'first-24-hours-water-damage-houston': 'src/lib/es/posts-b.ts',
  'remodeling-a-houston-ranch-house': 'src/lib/es/posts-b.ts',
  'patio-cover-gazebo-cypress-bridgeland': 'src/lib/es/posts-b.ts',
  'quartz-vs-granite-countertops-houston': 'src/lib/es/posts-c.ts',
  'carpentry-for-houston-humidity': 'src/lib/es/posts-c.ts',
  'tile-fireplace-surround-houston': 'src/lib/es/posts-c.ts',
  'drywall-repair-after-a-leak-houston': 'src/lib/es/posts-c.ts',
  'deck-material-for-houston-humidity': 'src/lib/es/posts-c.ts',
  'best-fence-for-houston-weather': 'src/lib/es/posts-c.ts',
  'gutter-size-for-houston-rain': 'src/lib/es/posts-c.ts',
  'kitchen-backsplash-cinco-ranch-katy': 'src/lib/es/posts-c.ts',
  'woodlands-spring-first-freeze-prep': 'src/lib/es/posts-c.ts',
  'sugar-land-tub-to-shower-conversion': 'src/lib/es/posts-c.ts',
};

let fileDates: Map<string, Date> | undefined;

function parseGitLog(output: string) {
  const dates = new Map<string, Date>();
  let current: Date | undefined;
  for (const line of output.split('\n')) {
    if (!line) {
      current = undefined;
      continue;
    }
    if (/^\d{4}-\d{2}-\d{2}T/.test(line)) {
      const parsed = new Date(line);
      current = Number.isNaN(parsed.getTime()) ? undefined : parsed;
      continue;
    }
    if (current && !dates.has(line)) dates.set(line, current);
  }
  return dates;
}

function snapshotDates() {
  const dates = new Map<string, Date>();
  for (const [file, iso] of Object.entries(snapshot)) {
    const parsed = new Date(iso);
    if (!Number.isNaN(parsed.getTime())) dates.set(file, parsed);
  }
  return dates;
}

/** Last commit date of each tracked file. Falls back to the committed snapshot. */
function loadFileDates() {
  if (fileDates) return fileDates;
  try {
    const output = execFileSync(
      'git',
      ['log', '--pretty=format:%cI', '--name-only', '--diff-filter=AMDR'],
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        maxBuffer: 8 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
      },
    );
    const parsed = parseGitLog(output);
    fileDates = parsed.size > 0 ? parsed : snapshotDates();
  } catch {
    fileDates = snapshotDates();
  }
  return fileDates;
}

export function landingSourceFiles(serviceSlug: string) {
  return [
    'src/lib/local-landings.ts',
    'src/lib/local/areas.ts',
    'src/lib/local/place.ts',
    briefFiles[serviceSlug] ?? 'src/lib/local/copy.ts',
  ];
}

export function esLandingSourceFiles(areaSlug: string) {
  const files = ['src/lib/es/city-landings.ts', 'src/lib/es/city-area-copy.ts', 'src/lib/local/areas.ts'];
  if (olderEsAreaSlugs.has(areaSlug)) files.push('src/lib/es/city-area-copy-older.ts');
  return files;
}

export function esPostSourceFile(slug: string) {
  return esPostFiles[slug] ?? 'src/lib/es/posts.ts';
}

export function brandSourceFiles(slug: string) {
  if (
    slug.startsWith('sherwin-williams') ||
    slug.startsWith('floor-and-decor') ||
    slug.startsWith('expo-stone')
  ) {
    return ['src/lib/brand-pages-products.ts', 'src/lib/brand-pages.ts'];
  }
  if (slug.startsWith('abc-supply') || slug.startsWith('ferguson')) {
    return ['src/lib/brand-pages-suppliers.ts', 'src/lib/brand-pages.ts'];
  }
  return ['src/lib/brand-pages.ts'];
}

/**
 * Latest real date among the content files and an optional date written in
 * the copy. Never the clock time of the build.
 */
export function lastModified(files: readonly string[], contentDate?: Date) {
  const dates = loadFileDates();
  let latest = contentDate;
  for (const file of files) {
    const found = dates.get(file);
    if (!found) continue;
    if (!latest || found > latest) latest = found;
  }
  return latest ?? SITEMAP_FALLBACK_LASTMOD;
}
