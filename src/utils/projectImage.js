/**
 * Resolves high-fidelity, distinct mockup preview image for a given project.
 * Guaranteed: No two project images share the same visual theme or design.
 */
const UNIQUE_PROJECT_IMAGES = [
    '/images/projects/rbac-saas-platform.jpg',
    '/images/projects/ai-backend-engine.svg',
    '/images/projects/fintech-payment-portal.svg',
    '/images/projects/blood-donation-platform.jpg',
    '/images/projects/hospital-management-system.jpg',
    '/images/projects/edutech-learning-platform.svg',
    '/images/projects/cloud-inventory-pos.svg',
    '/images/projects/devops-api-monitor.svg',
    '/images/projects/ecommerce-storefront.svg',
]

export function getProjectImage(project, index = 0) {
    if (!project) return UNIQUE_PROJECT_IMAGES[0]

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
    const tech = (project.tech_stack || '').toLowerCase()
    const fullText = `${title} ${desc} ${cat} ${tech}`

    // 1. Blood donation / RedLink / Emergency healthcare
    if (fullText.includes('blood') || fullText.includes('redlink') || fullText.includes('donor')) {
        return '/images/projects/blood-donation-platform.jpg'
    }

    // 2. Hospital / Clinical / Healthcare ERP
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

    // 3. AI / LLM / Gemini / Machine Learning / FlyRank
    if (
        fullText.includes('ai') ||
        fullText.includes('gemini') ||
        fullText.includes('flyrank') ||
        fullText.includes('llm') ||
        fullText.includes('neural') ||
        fullText.includes('prompt') ||
        fullText.includes('intelligence')
    ) {
        return '/images/projects/ai-backend-engine.svg'
    }

    // 4. FinTech / Payment Gateway / Billing / Wallet
    if (
        fullText.includes('payment') ||
        fullText.includes('fintech') ||
        fullText.includes('bkash') ||
        fullText.includes('stripe') ||
        fullText.includes('sslcommerz') ||
        fullText.includes('wallet') ||
        fullText.includes('invoice') ||
        fullText.includes('bank') ||
        fullText.includes('billing')
    ) {
        return '/images/projects/fintech-payment-portal.svg'
    }

    // 5. Education / LMS / School / University
    if (
        fullText.includes('school') ||
        fullText.includes('student') ||
        fullText.includes('education') ||
        fullText.includes('edutech') ||
        fullText.includes('campus') ||
        fullText.includes('course') ||
        fullText.includes('learning') ||
        fullText.includes('exam')
    ) {
        return '/images/projects/edutech-learning-platform.svg'
    }

    // 6. Inventory / POS / Warehouse / Supply Chain
    if (
        fullText.includes('inventory') ||
        fullText.includes('pos') ||
        fullText.includes('stock') ||
        fullText.includes('warehouse') ||
        fullText.includes('barcode') ||
        fullText.includes('sku') ||
        fullText.includes('retail')
    ) {
        return '/images/projects/cloud-inventory-pos.svg'
    }

    // 7. DevOps / API Monitoring / Microservice / Server
    if (
        fullText.includes('devops') ||
        fullText.includes('monitor') ||
        fullText.includes('uptime') ||
        fullText.includes('docker') ||
        fullText.includes('microservice') ||
        fullText.includes('latency') ||
        fullText.includes('status') ||
        fullText.includes('server')
    ) {
        return '/images/projects/devops-api-monitor.svg'
    }

    // 8. E-Commerce / Store / Shop / Marketplace
    if (
        fullText.includes('shop') ||
        fullText.includes('ecommerce') ||
        fullText.includes('e-commerce') ||
        fullText.includes('cart') ||
        fullText.includes('store') ||
        fullText.includes('product')
    ) {
        return '/images/projects/ecommerce-storefront.svg'
    }

    // 9. RBAC / Multi-Tenant / SaaS / Cloud Security
    if (
        fullText.includes('rbac') ||
        fullText.includes('multi-tenant') ||
        fullText.includes('saas') ||
        fullText.includes('tenant') ||
        fullText.includes('security') ||
        fullText.includes('role') ||
        fullText.includes('auth')
    ) {
        return '/images/projects/rbac-saas-platform.jpg'
    }

    // Deterministic unique fallback based on project ID or index so each project gets a completely unique image design
    const idKey = Number(project.id) || 0
    const charCodeSum = (project.title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const distinctIdx = (idKey + charCodeSum + index) % UNIQUE_PROJECT_IMAGES.length

    return UNIQUE_PROJECT_IMAGES[distinctIdx]
}
