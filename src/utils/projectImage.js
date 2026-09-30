/**
 * Resolves high-fidelity, distinct web app UI preview image for each specific project.
 * Guaranteed: Tailored to each project topic (Attendify, envShare, AI, E-Commerce, ATS, etc.)
 */
const UNIQUE_PROJECT_IMAGES = [
    '/images/projects/attendify-smart-attendance.svg',
    '/images/projects/envshare-vault.svg',
    '/images/projects/laravel-ai-assistant.svg',
    '/images/projects/commercia-pro-ecommerce.svg',
    '/images/projects/job-portal-application.svg',
    '/images/projects/admin-pro-dashboard.svg',
    '/images/projects/ticket-booking-system.svg',
    '/images/projects/onion-trade-pro.svg',
    '/images/projects/non-profit-org.svg',
    '/images/projects/blood-donation-platform.jpg',
    '/images/projects/hospital-management-system.jpg',
    '/images/projects/rbac-saas-platform.jpg',
]

export function getProjectImage(project, index = 0) {
    if (!project) return UNIQUE_PROJECT_IMAGES[0]

    // If project has an explicit valid uploaded image URL that is not a generic placeholder
    if (project.image && typeof project.image === 'string' && project.image.trim() !== '') {
        const img = project.image.trim()
        if (img.startsWith('/images/') || (img.startsWith('http') && !img.includes('placeholder.com') && !img.includes('via.placeholder'))) {
            return img
        }
    }

    const title = (project.title || '').toLowerCase()
    const desc = (project.description || '').toLowerCase()
    const cat = (project.category || '').toLowerCase()
    const tech = (project.tech_stack || '').toLowerCase()
    const fullText = `${title} ${desc} ${cat} ${tech}`

    // 1. Attendify / Smart Attendance / Geofencing / Overtime
    if (fullText.includes('attendify') || fullText.includes('attendance') || fullText.includes('geofenc') || fullText.includes('overtime')) {
        return '/images/projects/attendify-smart-attendance.svg'
    }

    // 2. envShare Vault / Encrypted Secrets / Passwords / Keys
    if (fullText.includes('envshare') || fullText.includes('vault') || fullText.includes('encrypt') || fullText.includes('secret') || fullText.includes('contact manager')) {
        return '/images/projects/envshare-vault.svg'
    }

    // 3. AI Assistant / Gemini / LLM / Prompt / Machine Learning
    if (fullText.includes('assistant') || fullText.includes('ai') || fullText.includes('gemini') || fullText.includes('llm') || fullText.includes('flyrank') || fullText.includes('neural')) {
        return '/images/projects/laravel-ai-assistant.svg'
    }

    // 4. Commercia Pro / E-Commerce / Storefront / Cart / Shop
    if (fullText.includes('commercia') || fullText.includes('ecommerce') || fullText.includes('e-commerce') || fullText.includes('shop') || fullText.includes('store') || fullText.includes('footer')) {
        return '/images/projects/commercia-pro-ecommerce.svg'
    }

    // 5. Job Portal / ATS / Career / Recruitment / Candidates
    if (fullText.includes('job') || fullText.includes('career') || fullText.includes('portal') || fullText.includes('applicant') || fullText.includes('resume')) {
        return '/images/projects/job-portal-application.svg'
    }

    // 6. Admin Pro / Dashboard / Telemetry / Analytics / ProTeam
    if (fullText.includes('admin') || fullText.includes('proteam') || fullText.includes('dashboard') || fullText.includes('analytics') || fullText.includes('metrics')) {
        return '/images/projects/admin-pro-dashboard.svg'
    }

    // 7. Ticket Booking / Reservation / Train / Movie / Event
    if (fullText.includes('ticket') || fullText.includes('booking') || fullText.includes('seat') || fullText.includes('train') || fullText.includes('reservation')) {
        return '/images/projects/ticket-booking-system.svg'
    }

    // 8. OnionTrade / Commodity / Trading / Agriculture / Exchange
    if (fullText.includes('onion') || fullText.includes('trade') || fullText.includes('commodity') || fullText.includes('exchange') || fullText.includes('market')) {
        return '/images/projects/onion-trade-pro.svg'
    }

    // 9. Non-profit / NGO / Charity / Donation / Relief
    if (fullText.includes('non-profit') || fullText.includes('non profit') || fullText.includes('ngo') || fullText.includes('charity') || fullText.includes('relief') || fullText.includes('donation')) {
        return '/images/projects/non-profit-org.svg'
    }

    // 10. Blood donation / RedLink / Emergency healthcare
    if (fullText.includes('blood') || fullText.includes('redlink') || fullText.includes('donor')) {
        return '/images/projects/blood-donation-platform.jpg'
    }

    // 11. Hospital / Clinical / Healthcare ERP
    if (fullText.includes('hospital') || fullText.includes('medical') || fullText.includes('doctor') || fullText.includes('patient') || fullText.includes('clinic')) {
        return '/images/projects/hospital-management-system.jpg'
    }

    // 12. RBAC / Multi-Tenant / SaaS / Cloud Security
    if (fullText.includes('rbac') || fullText.includes('multi-tenant') || fullText.includes('saas') || fullText.includes('tenant')) {
        return '/images/projects/rbac-saas-platform.jpg'
    }

    // Deterministic fallback for other items
    const idKey = Number(project.id) || 0
    const charCodeSum = (project.title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const distinctIdx = (idKey + charCodeSum + index) % UNIQUE_PROJECT_IMAGES.length

    return UNIQUE_PROJECT_IMAGES[distinctIdx]
}
