import { img, type Img } from '@/lib/images';
import { site } from '@/lib/site';

export type TeamMember = {
  name: string;
  role: string;
  body: string;
  photo?: Img;
  tall?: boolean;
  imageClassName?: string;
};

export const team: readonly TeamMember[] = [
  {
    name: 'George Rodriguez Jr.',
    role: 'Owner',
    body: 'Started in construction at 17, working beside his father, and took over the company when his father retired. His son, George III, now works alongside him.',
    photo: img(
      '/images/about/george_and_harltley.webp',
      'George Rodriguez with a teammate at a softball field',
    ),
    tall: true,
  },
  {
    name: 'Daniela Morris',
    role: 'Personal Assistant',
    body: "George's personal assistant. She handles phone calls, schedules appointments, and takes initial deposits.",
    photo: img('/images/about/daniela.webp', 'Daniela Morris, personal assistant'),
  },
  {
    name: 'Norma Escalante',
    role: 'Project Manager and Coordinator',
    body: 'Project manager and project coordinator. She handles customer service and project coordination.',
    photo: img(
      '/images/about/norma.webp',
      'Norma Escalante, project manager and project coordinator',
    ),
    imageClassName: 'object-[center_22%]',
  },
  {
    name: 'Jordan Vera',
    role: 'Sales Representative and Project Manager',
    body: 'Sales representative and project manager.',
  },
  {
    name: 'Michael Hanson',
    role: 'Sales Representative and Project Manager',
    body: 'Sales representative and project manager.',
    photo: img(
      '/images/about/michael_hanson.webp',
      'Michael Hanson, sales representative and project manager',
    ),
  },
];

export function personAnchor(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${site.url}/about#${slug}`;
}

export function employeeRefs() {
  return team.map((person) => ({ '@id': personAnchor(person.name) }));
}

export function personSchemaNodes() {
  return team.map((person) => ({
    '@type': 'Person',
    '@id': personAnchor(person.name),
    name: person.name,
    jobTitle: person.role,
    description: person.body,
    url: `${site.url}/about`,
    worksFor: { '@id': `${site.url}/#business` },
    ...(person.photo ? { image: `${site.url}${person.photo.src}` } : {}),
  }));
}
