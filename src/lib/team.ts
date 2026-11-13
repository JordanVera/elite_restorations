import { img, type Img } from '@/lib/images';
import { absoluteUrl } from '@/lib/seo';
import { site } from '@/lib/site';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  body: string;
  jobTitle: string;
  description: string;
  photo?: Img;
  tall?: boolean;
  imageClassName?: string;
};

const aboutUrl = absoluteUrl('/about');

export const team: TeamMember[] = [
  {
    id: 'george-rodriguez-jr',
    name: 'George Rodriguez Jr.',
    role: 'Owner',
    jobTitle: 'Owner',
    body: 'Started in construction at 17, working beside his father, and took over the company when his father retired. His son, George III, now works alongside him.',
    description:
      'Started in construction at 17, working beside his father, and took over the company when his father retired. His son, George III, now works alongside him.',
    photo: img(
      '/images/about/george_and_harltley.webp',
      'George Rodriguez with a teammate at a softball field',
    ),
    tall: true,
  },
  {
    id: 'michael-hanson',
    name: 'Michael Hanson',
    role: 'Sales representative and project manager',
    jobTitle: 'Sales Representative and Project Manager',
    body: 'Sales representative and project manager. He talks through the scope with you and coordinates the project.',
    description:
      'Sales representative and project manager. He talks through the scope with you and coordinates the project.',
    photo: img(
      '/images/about/michael_hanson.webp',
      'Michael Hanson, sales representative and project manager',
    ),
  },
  {
    id: 'daniela-morris',
    name: 'Daniela Morris',
    role: "George's personal assistant",
    jobTitle: 'Personal Assistant',
    body: "George's personal assistant. She handles phone calls, scheduling appointments, and initial deposits.",
    description:
      "George's personal assistant. She handles phone calls, scheduling appointments, and initial deposits.",
    photo: img('/images/about/daniela.webp', "Daniela Morris, George's personal assistant"),
  },
  {
    id: 'norma-escalante',
    name: 'Norma Escalante',
    role: 'Project manager',
    jobTitle: 'Project Manager',
    body: 'Project manager. She handles customer service and project coordination.',
    description: 'Project manager. She handles customer service and project coordination.',
    photo: img('/images/about/norma.webp', 'Norma Escalante, project manager'),
    imageClassName: 'object-[center_22%]',
  },
  {
    id: 'jordan-vera',
    name: 'Jordan Vera',
    role: 'Sales representative and project manager',
    jobTitle: 'Sales Representative and Project Manager',
    body: 'Sales representative and project manager. He talks through the scope with you and coordinates the project.',
    description:
      'Sales representative and project manager. He talks through the scope with you and coordinates the project.',
  },
];

const georgeIII = {
  id: 'george-iii',
  name: 'George III',
  description: 'Works in the family business alongside his father, George Rodriguez Jr.',
};

export function teamSchema() {
  const people: {
    id: string;
    name: string;
    description: string;
    jobTitle?: string;
    image?: string;
  }[] = [
    ...team.map((person) => ({
      id: person.id,
      name: person.name,
      description: person.description,
      jobTitle: person.jobTitle,
      ...(person.photo ? { image: absoluteUrl(person.photo.src) } : {}),
    })),
    {
      id: georgeIII.id,
      name: georgeIII.name,
      description: georgeIII.description,
    },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#business`,
        name: site.name,
        url: site.url,
        employee: people.map((person) => ({ '@id': `${aboutUrl}#${person.id}` })),
      },
      ...people.map((person) => ({
        '@type': 'Person',
        '@id': `${aboutUrl}#${person.id}`,
        name: person.name,
        ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
        description: person.description,
        url: aboutUrl,
        worksFor: { '@id': `${site.url}/#business` },
        ...(person.image ? { image: person.image } : {}),
      })),
    ],
  };
}
