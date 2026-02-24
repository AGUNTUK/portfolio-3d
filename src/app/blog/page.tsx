import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts, getCategories } from '@/data/blog'

export const metadata: Metadata = {
    title: 'Blog | Sohel Rana',
    description: 'Thoughts, tutorials, and insights on web development and design.',
    openGraph: {
        title: 'Blog | Sohel Rana',
        description: 'Thoughts, tutorials, and insights on web development and design.',
        type: 'website',
    },
}

export default function BlogPage() {
    const categories = getCategories()

    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="clay-orb absolute w-96 h-96 -top-48 -right-48 opacity-20 animate-float" />
                    <div className="clay-orb absolute w-64 h-64 bottom-0 -left-32 opacity-15 animate-float-slow" />
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            <span className="text-gradient">Blog</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Thoughts, tutorials, and insights on web development and design.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <button className="clay-tag bg-clay-primary/20">All Posts</button>
                        {categories.map((category) => (
                            <button key={category} className="clay-tag">
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <Link key={post.id} href={`/blog/${post.slug}`}>
                                <article
                                    className="clay-card p-6 h-full group cursor-pointer"
                                    style={{ '--accent-color': post.color } as React.CSSProperties}
                                >
                                    {/* Category Badge */}
                                    <div className="mb-4">
                                        <span
                                            className="text-sm font-medium px-3 py-1 rounded-full"
                                            style={{ backgroundColor: post.color + '30', color: post.color }}
                                        >
                                            {post.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-clay-primary transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-text-secondary mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-sm text-text-muted mt-auto pt-4 border-t border-clay-shadow/20">
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {/* Newsletter CTA */}
                    <div className="clay-card p-8 mt-16 text-center">
                        <h2 className="text-2xl font-display font-bold mb-4">
                            <span className="text-gradient">Stay Updated</span>
                        </h2>
                        <p className="text-text-secondary mb-6 max-w-md mx-auto">
                            Subscribe to get notified when I publish new articles. No spam, unsubscribe anytime.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="clay-input flex-1"
                            />
                            <button type="submit" className="clay-button px-6 py-3">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}
