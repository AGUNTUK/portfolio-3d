import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sohelrana.dev'

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/#about',
        '/#skills',
        '/#projects',
        '/#experience',
        '/#testimonials',
        '/#blog',
        '/#contact',
    ]

    const projects = [
        'restiqo',
        'hodo',
        'joborafy',
        'staysfy',
        'onlinekorun',
        'stackry',
        'velora',
    ]

    const blogPosts = [
        'building-interactive-3d-experiences-with-three-js',
        'modern-react-patterns-2024',
        'art-of-claymorphism-in-ui-design',
        'optimizing-nextjs-for-production',
    ]

    const staticRoutes = routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const projectRoutes = projects.map((slug) => ({
        url: `${siteUrl}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const blogRoutes = blogPosts.map((slug) => ({
        url: `${siteUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
