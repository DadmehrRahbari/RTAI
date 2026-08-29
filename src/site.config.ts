// Single source of truth for site-wide text and links.
// Change the brand name, tagline, nav, or contact details HERE ONLY --
// every page and component reads from this file, nothing is hardcoded
// per-page. This is what makes the site "automatic": rebranding,
// swapping a launch date, or adding a nav item is a one-file edit,
// not a find-and-replace across the whole project.

export const site = {
  name: 'RTAI',
  legalName: 'RTAI OÜ',
  tagline: 'Reliable, self-healing AI for any autonomous or AI-driven system.',
  description:
    'RTAI is an independent trust and self-healing layer for AI decision-making, perception, control, or judgment, in any system that must keep working, and fail safely, without a human watching every inference. Framework-agnostic, model-agnostic, and deployable anywhere the model it watches runs.',
  url: 'https://example.com',
  email: 'hello@RTAI.example',
  location: 'Tallinn & Tartu, Estonia',
  social: {
    linkedin: 'https://www.linkedin.com/company/RTAI',
    github: 'https://github.com/RTAI',
  },
};

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: 'Product', href: '/product' },
  { label: 'Integrate', href: '/integrate' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technology', href: '/technology' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Company', href: '/company' },
];

export const footerLinks: NavLink[] = [
  ...nav,
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

export const currentYear = new Date().getFullYear();
