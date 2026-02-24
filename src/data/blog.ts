export interface BlogPost {
    id: number
    slug: string
    title: string
    excerpt: string
    content?: string
    date: string
    readTime: string
    category: string
    tags?: string[]
    color: string
    image?: string
    author?: {
        name: string
        avatar: string
    }
    featured?: boolean
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'building-interactive-3d-experiences-with-three-js',
        title: 'Building Interactive 3D Experiences with Three.js',
        excerpt: 'Learn how to create stunning 3D web experiences using Three.js and React Three Fiber. This comprehensive guide covers everything from basic setup to advanced animations.',
        date: 'Feb 15, 2024',
        readTime: '8 min read',
        category: '3D Development',
        tags: ['Three.js', 'React', 'WebGL', '3D'],
        color: '#e8b4b8',
        image: '/blog/threejs.jpg',
        featured: true,
        author: {
            name: 'Sohel Rana',
            avatar: '/images/profile.jpg',
        },
    },
    {
        id: 2,
        slug: 'modern-react-patterns-2024',
        title: 'Modern React Patterns in 2024',
        excerpt: 'Explore the latest React patterns and best practices for building scalable applications. From hooks to server components, learn what\'s new in the React ecosystem.',
        date: 'Feb 10, 2024',
        readTime: '6 min read',
        category: 'React',
        tags: ['React', 'TypeScript', 'Patterns', 'Best Practices'],
        color: '#a8dadc',
        image: '/blog/react-patterns.jpg',
        featured: true,
        author: {
            name: 'Sohel Rana',
            avatar: '/images/profile.jpg',
        },
    },
    {
        id: 3,
        slug: 'art-of-claymorphism-in-ui-design',
        title: 'The Art of Claymorphism in UI Design',
        excerpt: 'Discover how to create soft, clay-like interfaces that feel tactile and engaging. Learn the principles and techniques behind this emerging design trend.',
        date: 'Feb 5, 2024',
        readTime: '5 min read',
        category: 'Design',
        tags: ['UI Design', 'CSS', 'Claymorphism', 'Trends'],
        color: '#a7c4a0',
        image: '/blog/claymorphism.jpg',
        author: {
            name: 'Sohel Rana',
            avatar: '/images/profile.jpg',
        },
    },
    {
        id: 4,
        slug: 'optimizing-nextjs-for-production',
        title: 'Optimizing Next.js for Production',
        excerpt: 'Best practices for optimizing your Next.js applications for maximum performance. Learn about caching strategies, image optimization, and more.',
        date: 'Jan 28, 2024',
        readTime: '7 min read',
        category: 'Next.js',
        tags: ['Next.js', 'Performance', 'Optimization', 'Production'],
        color: '#c9b1ff',
        image: '/blog/nextjs-optimization.jpg',
        featured: true,
        author: {
            name: 'Sohel Rana',
            avatar: '/images/profile.jpg',
        },
    },
    {
        id: 5,
        slug: 'typescript-tips-for-react-developers',
        title: 'TypeScript Tips for React Developers',
        excerpt: 'Level up your React development with these essential TypeScript tips. From component typing to generic patterns, improve your type safety.',
        date: 'Jan 20, 2024',
        readTime: '6 min read',
        category: 'TypeScript',
        tags: ['TypeScript', 'React', 'Tips', 'Best Practices'],
        color: '#f4a261',
        image: '/blog/typescript-tips.jpg',
        author: {
            name: 'Sohel Rana',
            avatar: '/images/profile.jpg',
        },
    },
    {
        id: 6,
        slug: 'building-scalable-apis-with-nodejs',
        title: 'Building Scalable APIs with Node.js',
        excerpt: 'Learn how to design and implement scalable REST APIs using Node.js and Express. Cover architecture, authentication, and best practices.',
        date: 'Jan 15, 2024',
        readTime: '9 min read',
        category: 'Backend',
        tags: ['Node.js', 'API', 'Express', 'Architecture'],
        color: '#e76f51',
        image: '/blog/nodejs-api.jpg',
        author: {
            name: 'Sohel Rana',
            avatar: '/images/profile.jpg',
        },
    },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPosts(): BlogPost[] {
    return blogPosts
}

export function getFeaturedBlogPosts(): BlogPost[] {
    return blogPosts.filter((post) => post.featured)
}

export function getBlogPostSlugs(): string[] {
    return blogPosts.map((post) => post.slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
    return blogPosts.filter((post) => post.category === category)
}

export function getCategories(): string[] {
    return Array.from(new Set(blogPosts.map((post) => post.category)))
}
