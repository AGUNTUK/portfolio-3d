import { Metadata } from 'next'
import ResumeClient from './ResumeClient'

export const metadata: Metadata = {
    title: 'Resume | Sohel Rana',
    description: 'Download my resume or view my professional experience, skills, and qualifications.',
    openGraph: {
        title: 'Resume | Sohel Rana',
        description: 'Download my resume or view my professional experience, skills, and qualifications.',
        type: 'website',
    },
}

export default function ResumePage() {
    return <ResumeClient />
}
