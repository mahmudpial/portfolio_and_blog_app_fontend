/**
 * Resolves high-fidelity mockup preview image for a given project
 * Matches based on project image field or contextual keywords (e.g. blood donation, hospital, RBAC SaaS)
 */
export function getProjectImage(project) {
    if (!project) return '/images/projects/rbac-saas-platform.jpg'

    // If project has an explicit uploaded/valid image URL that is not a generic placeholder
    if (project.image && typeof project.image === 'string' && project.image.trim() !== '') {
        const img = project.image.trim()
        if (img.startsWith('/images/') || (img.startsWith('http') && !img.includes('placeholder.com') && !img.includes('via.placeholder'))) {
            return img
        }
    }

    const title = (project.title || '').toLowerCase()
    const desc = (project.description || '').toLowerCase()
    const cat = (project.category || '').toLowerCase()
    const fullText = `${title} ${desc} ${cat}`

    if (fullText.includes('blood') || fullText.includes('redlink') || fullText.includes('donor')) {
        return '/images/projects/blood-donation-platform.jpg'
    }

    if (
        fullText.includes('hospital') ||
        fullText.includes('medical') ||
        fullText.includes('doctor') ||
        fullText.includes('patient') ||
        fullText.includes('clinic') ||
        fullText.includes('health')
    ) {
        return '/images/projects/hospital-management-system.jpg'
    }

    // Default to RBAC SaaS Platform / Multi-tenant system mockup
    return '/images/projects/rbac-saas-platform.jpg'
}
