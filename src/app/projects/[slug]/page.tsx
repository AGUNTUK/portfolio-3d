import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug, getProjectSlugs } from '@/data/projects'
import ProjectDetailClient from './ProjectDetailClient'

interface ProjectPageProps {
    params: { slug: string }
}

export async function generateStaticParams() {
    return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = getProjectBySlug(params.slug)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} | Sohel Rana`,
        description: project.description,
        openGraph: {
            title: `${project.title} | Sohel Rana`,
            description: project.description,
            images: [project.image],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} | Sohel Rana`,
            description: project.description,
            images: [project.image],
        },
    }
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = getProjectBySlug(params.slug)

    if (!project) {
        notFound()
    }

    // Get related projects (excluding current)
    const relatedProjects = projects
        .filter((p) => p.id !== project.id)
        .slice(0, 3)

    return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
}
