import { blogPosts } from '@/data/blog'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sohelrana.dev'

const APOS_ENTITY = '\x26apos;'

function escapeXml(str: string): string {
    // Use split/join to avoid regex replacement issues with XML entities
    let result = str
    result = result.split('&').join('&')
    result = result.split('<').join('<')
    result = result.split('>').join('>')
    result = result.split('"').join('"')
    result = result.split("'").join(APOS_ENTITY)
    return result
}

export async function GET() {
    const posts = blogPosts

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sohel Rana - Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Thoughts, tutorials, and insights on web development and design.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
            .map(
                (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join('') : ''}
      ${post.author ? `<author>${post.author.name}</author>` : ''}
    </item>`
            )
            .join('')}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
