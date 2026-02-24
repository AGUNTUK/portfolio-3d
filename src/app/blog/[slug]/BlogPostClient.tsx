'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlogPost } from '@/data/blog'

interface BlogPostClientProps {
    post: BlogPost
    relatedPosts: BlogPost[]
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    return (
        <main className="min-h-screen pt-24 pb-20">
            <article>
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <div
                            className="clay-orb absolute w-96 h-96 -top-48 -right-48 opacity-20 animate-float"
                            style={{ backgroundColor: post.color }}
                        />
                        <div
                            className="clay-orb absolute w-64 h-64 bottom-0 -left-32 opacity-15 animate-float-slow"
                            style={{ backgroundColor: post.color }}
                        />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 relative z-10">
                        {/* Breadcrumb */}
                        <motion.nav
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <Link href="/blog" className="text-text-secondary hover:text-clay-primary transition-colors">
                                ← Back to Blog
                            </Link>
                        </motion.nav>

                        {/* Header */}
                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Category */}
                            <div className="mb-4">
                                <span
                                    className="text-sm font-medium px-3 py-1 rounded-full"
                                    style={{ backgroundColor: post.color + '30', color: post.color }}
                                >
                                    {post.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                                <span className="text-gradient">{post.title}</span>
                            </h1>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-text-muted mb-8">
                                {post.author && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-clay-primary/20 overflow-hidden">
                                            <img
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement
                                                    target.style.display = 'none'
                                                }}
                                            />
                                        </div>
                                        <span className="font-medium text-text-secondary">{post.author.name}</span>
                                    </div>
                                )}
                                <span>•</span>
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>

                            {/* Tags */}
                            {post.tags && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="clay-tag">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.header>

                        {/* Featured Image */}
                        {post.image && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="clay-card p-2 mb-12 overflow-hidden"
                            >
                                <div className="relative aspect-video rounded-clay overflow-hidden bg-gradient-to-br from-clay-primary/20 to-accent-purple/20">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-lg max-w-none"
                        >
                            {/* Blog content would go here - for now showing excerpt */}
                            <p className="text-xl text-text-secondary leading-relaxed mb-8">
                                {post.excerpt}
                            </p>

                            {/* Placeholder content */}
                            <div className="clay-card p-8 mb-8">
                                <h2 className="text-2xl font-display font-bold mb-4">Introduction</h2>
                                <p className="text-text-secondary mb-4">
                                    This is a placeholder for the full blog post content. In a real implementation,
                                    this would be rendered from MDX content with syntax highlighting for code blocks.
                                </p>
                                <p className="text-text-secondary mb-4">
                                    The blog system supports:
                                </p>
                                <ul className="list-disc list-inside text-text-secondary space-y-2">
                                    <li>MDX for rich content authoring</li>
                                    <li>Syntax highlighting for code blocks</li>
                                    <li>Reading time calculation</li>
                                    <li>Categories and tags</li>
                                    <li>RSS feed generation</li>
                                </ul>
                            </div>

                            <div className="clay-card p-8">
                                <h2 className="text-2xl font-display font-bold mb-4">Code Example</h2>
                                <pre className="bg-clay-surface p-4 rounded-clay overflow-x-auto">
                                    <code className="text-sm">
                                        {`// Example code block with syntax highlighting
function greet(name: string) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
                                    </code>
                                </pre>
                            </div>
                        </motion.div>

                        {/* Share */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="clay-card p-6 mt-12"
                        >
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <h3 className="font-display font-semibold">Share this article</h3>
                                    <p className="text-text-muted text-sm">Help others discover this content</p>
                                </div>
                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={() => {
                                            if (typeof window !== 'undefined') {
                                                window.open(
                                                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
                                                    '_blank'
                                                )
                                            }
                                        }}
                                        className="clay-button px-4 py-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        🐦 Tweet
                                    </motion.button>
                                    <motion.button
                                        onClick={() => {
                                            if (typeof window !== 'undefined') {
                                                window.open(
                                                    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`,
                                                    '_blank'
                                                )
                                            }
                                        }}
                                        className="clay-button px-4 py-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        💼 Share
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-16"
                            >
                                <h2 className="text-2xl font-display font-bold mb-8">
                                    <span className="text-gradient">Related Articles</span>
                                </h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                                            <article className="clay-card p-4 h-full group cursor-pointer">
                                                <div className="mb-3">
                                                    <span
                                                        className="text-xs font-medium px-2 py-1 rounded-full"
                                                        style={{ backgroundColor: relatedPost.color + '30', color: relatedPost.color }}
                                                    >
                                                        {relatedPost.category}
                                                    </span>
                                                </div>
                                                <h3 className="font-display font-semibold mb-2 group-hover:text-clay-primary transition-colors">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-text-muted text-sm line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>
                </section>
            </article>
        </main>
    )
}
