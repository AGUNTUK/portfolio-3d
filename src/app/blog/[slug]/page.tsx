import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogPostSlugs, blogPosts } from '@/data/blog'
import BlogPostClient from './BlogPostClient'

interface BlogPostPageProps {
    params: { slug: string }
}

export async function generateStaticParams() {
    return getBlogPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | Sohel Rana`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Sohel Rana'],
            images: post.image ? [post.image] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: post.image ? [post.image] : [],
        },
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    // Get related posts (same category or recent)
    const relatedPosts = blogPosts
        .filter((p) => p.id !== post.id)
        .sort((a, b) => {
            // Prioritize same category
            if (a.category === post.category && b.category !== post.category) return -1
            if (a.category !== post.category && b.category === post.category) return 1
            return 0
        })
        .slice(0, 3)

    return <BlogPostClient post={post} relatedPosts={relatedPosts} />
}
