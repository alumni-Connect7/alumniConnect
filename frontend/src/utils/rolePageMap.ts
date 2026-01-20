/**
 * Role-to-Pages Mapping for Alumni Connect
 *
 * This object defines which pages are accessible by each role.
 * Used for navigation guards, sidebar menu generation, and access control.
 */

export const ROLE_PAGE_MAP = {
  student: {
    label: 'Student',
    pages: {
      dashboard: '/student/dashboard',
      alumni_listing: '/alumni-listing',
      mentorship: '/mentorship',
      resume_analysis: '/resume-analysis',
      events: '/events',
      career_recommendation: '/career-recommendation',
      profile: '/profile',
      settings: '/settings',
    },
    defaultRoute: '/student/dashboard',
  },
  alumni: {
    label: 'Alumni',
    pages: {
      dashboard: '/alumni/dashboard',
      mentorship: '/mentorship',
      profile: '/profile',
      settings: '/settings',
      events: '/events',
    },
    defaultRoute: '/alumni/dashboard',
  },
  admin: {
    label: 'Admin',
    pages: {
      dashboard: '/management/dashboard',
      user_management: '/management/dashboard',
      reports: '/reports',
      settings: '/settings',
    },
    defaultRoute: '/management/dashboard',
  },
} as const;

export type PageKey = string;
export type RoleType = keyof typeof ROLE_PAGE_MAP;

/**
 * Helper function to check if a route is accessible by a role
 */
export const isRouteAllowed = (route: string, role: RoleType): boolean => {
  const pages = ROLE_PAGE_MAP[role].pages;
  return Object.values(pages).includes(route as any);
};

/**
 * Helper function to get available pages for a role
 */
export const getAvailablePages = (role: RoleType) => {
  return ROLE_PAGE_MAP[role].pages;
};

/**
 * Helper function to get the default route for a role
 */
export const getDefaultRoute = (role: RoleType): string => {
  return ROLE_PAGE_MAP[role].defaultRoute;
};
