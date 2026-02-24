export interface Project {
    id: number
    slug: string
    title: string
    description: string
    longDescription?: string
    image: string
    images?: string[]
    tags: string[]
    color: string
    link: string
    github: string
    featured?: boolean
    year?: string
    client?: string
    role?: string
    challenges?: string[]
    solutions?: string[]
    features?: string[]
}

export const projects: Project[] = [
    {
        id: 1,
        slug: 'restiqo',
        title: 'Restiqo - Booking Marketplace',
        description: 'A comprehensive booking marketplace platform for hotels and accommodations with real-time availability, secure payments, and user reviews.',
        longDescription: 'Restiqo is a full-featured booking marketplace that connects travelers with hotels and accommodations. The platform features real-time availability checking, secure payment processing through Stripe, a comprehensive review system, and an intuitive admin dashboard for property managers.',
        image: '/projects/restiqo.png',
        images: ['/projects/restiqo.png'],
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind', 'Stripe', 'Prisma'],
        color: '#6366f1',
        link: 'https://restiqo.vercel.app',
        github: 'https://github.com/sohelrana/restiqo',
        featured: true,
        year: '2024',
        role: 'Full Stack Developer',
        challenges: [
            'Implementing real-time availability without overbooking',
            'Handling multiple timezone conversions for international bookings',
            'Optimizing search performance for thousands of properties',
        ],
        solutions: [
            'Implemented optimistic locking with PostgreSQL transactions',
            'Created a timezone-aware booking system with moment-timezone',
            'Built an Elasticsearch integration for fast property searches',
        ],
        features: [
            'Real-time availability calendar',
            'Secure payment processing',
            'User reviews and ratings',
            'Property management dashboard',
            'Email notifications',
            'Mobile-responsive design',
        ],
    },
    {
        id: 2,
        slug: 'hodo',
        title: 'Hodo E-commerce',
        description: 'Full-featured e-commerce platform with product catalog, shopping cart, secure checkout, and admin dashboard.',
        longDescription: 'Hodo is a modern e-commerce platform built with scalability in mind. It features a beautiful product catalog, intelligent search, shopping cart with persistence, secure checkout via Stripe, and a comprehensive admin dashboard for inventory management.',
        image: '/projects/hodo-ecommerce.png',
        images: ['/projects/hodo-ecommerce.png'],
        tags: ['Next.js', 'React', 'Stripe', 'MongoDB', 'Tailwind', 'Redux'],
        color: '#38bdf8',
        link: 'https://hodo-ecommerce.vercel.app',
        github: 'https://github.com/sohelrana/hodo',
        featured: true,
        year: '2024',
        role: 'Full Stack Developer',
        challenges: [
            'Managing complex cart state with persistence',
            'Implementing secure payment flow',
            'Handling inventory synchronization',
        ],
        solutions: [
            'Used Redux Persist for cart state management',
            'Implemented Stripe Elements with 3D Secure support',
            'Built real-time inventory updates with webhooks',
        ],
        features: [
            'Product catalog with categories',
            'Advanced search and filtering',
            'Shopping cart with persistence',
            'Secure checkout process',
            'Order tracking',
            'Admin inventory management',
        ],
    },
    {
        id: 3,
        slug: 'joborafy',
        title: 'Joborafy - Job Listing Platform',
        description: 'Modern job listing platform with advanced search, filters, application tracking, and employer dashboard.',
        longDescription: 'Joborafy is a comprehensive job listing platform that connects job seekers with employers. Features include advanced job search with multiple filters, application tracking system, employer dashboard for posting jobs, and candidate management.',
        image: '/projects/joborafy.png',
        images: ['/projects/joborafy.png'],
        tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
        color: '#22d3ee',
        link: 'https://joborafy.vercel.app',
        github: 'https://github.com/sohelrana/joborafy',
        featured: true,
        year: '2023',
        role: 'Full Stack Developer',
        challenges: [
            'Building efficient search with multiple filter combinations',
            'Implementing application workflow state machine',
            'Handling resume file uploads securely',
        ],
        solutions: [
            'Implemented faceted search with PostgreSQL',
            'Created a state machine for application status tracking',
            'Used AWS S3 with presigned URLs for secure uploads',
        ],
        features: [
            'Advanced job search',
            'Application tracking',
            'Resume builder',
            'Employer dashboard',
            'Email notifications',
            'Job alerts',
        ],
    },
    {
        id: 4,
        slug: 'staysfy',
        title: 'Staysfy - Hotel Booking',
        description: 'Hotel booking marketplace with real-time availability, instant booking, reviews, and secure payment integration.',
        longDescription: 'Staysfy is a hotel booking platform focused on providing a seamless booking experience. It features instant booking confirmation, real-time availability updates, comprehensive review system, and secure payment processing.',
        image: '/projects/staysfy.png',
        images: ['/projects/staysfy.png'],
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
        color: '#a78bfa',
        link: 'https://staysfy.vercel.app',
        github: 'https://github.com/sohelrana/staysfy',
        year: '2023',
        role: 'Full Stack Developer',
        challenges: [
            'Preventing double bookings',
            'Handling payment failures gracefully',
            'Optimizing image loading for hotel photos',
        ],
        solutions: [
            'Implemented atomic booking operations',
            'Created a retry mechanism with webhook confirmations',
            'Used progressive image loading with blur placeholders',
        ],
        features: [
            'Instant booking',
            'Real-time availability',
            'Guest reviews',
            'Secure payments',
            'Booking management',
            'Host dashboard',
        ],
    },
    {
        id: 5,
        slug: 'onlinekorun',
        title: 'Onlinekorun - Brand Agency',
        description: 'Brand website creating agency platform with portfolio showcase, client testimonials, and service offerings.',
        longDescription: 'Onlinekorun is a brand agency website showcasing creative services. It features an impressive portfolio gallery, client testimonials, service descriptions, and a contact system for potential clients.',
        image: '/projects/onlinekorun.png',
        images: ['/projects/onlinekorun.png'],
        tags: ['Next.js', 'React', 'Tailwind', 'Framer Motion', 'Sanity'],
        color: '#f472b6',
        link: 'https://onlinekorun.vercel.app',
        github: 'https://github.com/sohelrana/onlinekorun',
        year: '2023',
        role: 'Frontend Developer',
        challenges: [
            'Creating smooth animations without performance issues',
            'Building a flexible portfolio system',
            'Implementing CMS for easy content updates',
        ],
        solutions: [
            'Used Framer Motion with will-change optimizations',
            'Created a modular portfolio component system',
            'Integrated Sanity CMS for content management',
        ],
        features: [
            'Animated portfolio gallery',
            'Client testimonials',
            'Service showcase',
            'Contact form',
            'Blog section',
            'CMS integration',
        ],
    },
    {
        id: 6,
        slug: 'velora',
        title: 'Velora4You - E-commerce',
        description: 'Modern e-commerce store with beautiful product displays, smooth checkout experience, and inventory management.',
        longDescription: 'Velora4You is a modern e-commerce platform focused on providing an exceptional shopping experience. It features beautiful product displays, smooth animations, a streamlined checkout process, and comprehensive inventory management.',
        image: '/projects/velora4you.png',
        images: ['/projects/velora4you.png'],
        tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind', 'Prisma'],
        color: '#fb923c',
        link: 'https://velora4you.vercel.app',
        github: 'https://github.com/sohelrana/velora',
        year: '2023',
        role: 'Full Stack Developer',
        challenges: [
            'Creating smooth product animations',
            'Implementing variant selection system',
            'Handling complex shipping calculations',
        ],
        solutions: [
            'Used CSS transforms with hardware acceleration',
            'Built a flexible variant combination system',
            'Integrated with shipping APIs for real-time rates',
        ],
        features: [
            'Product variants',
            'Wishlist functionality',
            'Order history',
            'Inventory alerts',
            'Discount codes',
            'Analytics dashboard',
        ],
    },
]

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug)
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((project) => project.featured)
}

export function getProjectSlugs(): string[] {
    return projects.map((project) => project.slug)
}
