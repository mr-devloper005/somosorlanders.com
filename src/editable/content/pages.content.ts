import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated bookmarks, collections, and resources',
      description: 'Explore curated bookmarks, useful collections, and public resources through a focused discovery experience.',
      openGraphTitle: 'Curated bookmarks, collections, and resources',
      openGraphDescription: 'Discover useful links, tools, references, and resource collections.',
      keywords: ['bookmarks', 'collections', 'resources', 'curated links'],
    },
    hero: {
      badge: 'Collections · Curators',
      title: ['Explore useful resources,', 'organized for discovery.'],
      description: 'Browse bookmarks, collections, tools, references, and resource pages organized for fast public discovery.',
      primaryCta: { label: 'Explore collections', href: '/sbm' },
      secondaryCta: { label: 'Suggest a resource', href: '/contact' },
      searchPlaceholder: 'Search tools, references, collections...',
      focusLabel: 'Collection focus',
      featureCardBadge: 'featured resource',
      featureCardTitle: 'Useful links stay organized by collection, source, and context.',
      featureCardDescription: 'Fresh bookmarks and evergreen references shape the homepage without changing platform behavior.',
    },
    intro: {
      badge: 'About the library',
      title: 'Built for saving, browsing, and revisiting useful resources.',
      paragraphs: [
        'This site brings together bookmarked links, useful references, and collection-based discovery so visitors can move naturally between resource topics.',
        'Instead of scattering useful links across disconnected pages, the platform keeps them organized in one public library.',
        'Whether someone starts with a tool, guide, reference, or saved link, they can keep discovering related resources without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Resource-first homepage with stronger emphasis on saved links.',
        'Connected sections for bookmarks, categories, and supporting references.',
        'Cleaner browsing rhythm designed to make discovery feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse collections', href: '/sbm' },
      secondaryLink: { label: 'Search resources', href: '/search' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore bookmarks and resources through one connected library.',
      description: 'Move between saved links, collection shelves, and reference pages through one clearer discovery system.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to explore useful resources.',
    description: `${slot4BrandConfig.siteName} is built to make curated bookmarks, references, and resource discovery feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting useful links into disconnected pages, the platform keeps related resources easy to move through and easy to understand.',
      'Whether someone starts with a tool, reference, guide, or saved link, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Resource-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can browse and discover without noise.',
      },
      {
        title: 'Connected collections',
        description: 'Bookmarks, references, and resources stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Suggest a resource, partnership, or collection idea.',
    description: 'Tell us what you are trying to submit, organize, or improve. We will route it through the right curation lane.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search bookmarks, topics, categories, and resources across the site.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find bookmarks, collections, and resources faster.',
      description: 'Use keywords, categories, and resource types to discover useful saved links across the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable resources',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit a resource for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to add a resource.',
      description: 'Use your account to open the curation workspace and create resource submissions for this site.',
    },
    hero: {
      badge: 'Curation workspace',
      title: 'Add a bookmark or resource.',
      description: 'Choose a collection, add details, and prepare a clean resource with links, summary, and notes.',
    },
    formTitle: 'Resource details',
    submitLabel: 'Submit resource',
    successTitle: 'Resource submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your resource space.',
      description: 'Login to continue browsing, managing submissions, and adding resources from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start curating.',
      description: 'Create an account to access the curation workspace, save details, and submit resources through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
