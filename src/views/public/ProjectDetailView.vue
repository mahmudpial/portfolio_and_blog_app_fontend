<template>
    <div style="background:#0A0610;min-height:100vh;">
        <!-- ── NAVBAR ─────────────────────────────────────────── -->
        <PublicNavbar />

        <!-- ── LOADING ─────────────────────────────────────────── -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen gap-3" style="color:#C9B9E8;">
            <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6"
                stroke-width="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span style="font-family:system-ui;">Loading project...</span>
        </div>

        <!-- ── NOT FOUND ───────────────────────────────────────── -->
        <div v-else-if="!project" class="flex flex-col items-center justify-center min-h-screen gap-4">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#3B2A5A" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
            <p class="text-white font-bold text-xl" style="font-family:'Georgia',serif;">
                Project not found
            </p>
            <RouterLink to="/portfolio"
                class="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style="background:#8B5CF6;color:#fff;font-family:system-ui;">
                Back to Portfolio
            </RouterLink>
        </div>

        <!-- ── PROJECT ────────────────────────────────────────── -->
        <div v-else>

            <!-- Hero -->
            <section class="relative overflow-hidden " :style="project.hero_image
                ? `background:linear-gradient(to bottom,rgba(5,8,15,0.5) 0%,rgba(5,8,15,0.98) 100%),
             url(${project.hero_image}) center/cover no-repeat;min-height:460px;display:flex;align-items:flex-end;`
                : 'padding-top:7rem;padding-bottom:4rem;'">

                <!-- Fallback gradient bg when no image -->
                <div v-if="!project.hero_image" class="absolute inset-0 pointer-events-none">
                    <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;
            transform:translateX(-50%);border-radius:50%;
            background:radial-gradient(circle,#6D28D922 0%,transparent 70%);filter:blur(50px);"></div>
                    <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF612 1px,transparent 1px);
            background-size:32px 32px;opacity:0.5;"></div>
                </div>

                <div class="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 pb-12 pt-16">
                    <!-- Breadcrumb -->
                    <div class="flex items-center gap-2 mb-6 text-xs" style="color:#475569;font-family:system-ui;">
                        <RouterLink to="/portfolio" class="transition-colors hover:text-violet-400"
                            style="color:#475569;">
                            Portfolio
                        </RouterLink>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span style="color:#C9B9E8;">{{ project.title }}</span>
                    </div>

                    <!-- Category + status badges -->
                    <div class="flex items-center gap-3 mb-5 flex-wrap" style="display:inline-flex;gap:8px;">
                        <span v-if="project.category" class="text-xs font-bold px-3 py-1.5 rounded-full"
                            style="background:#8B5CF6;color:#fff;font-family:system-ui;">
                            {{ project.category }}
                        </span>
                        <span v-if="project.is_featured"
                            class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                            style="background:#F59E0B15;color:#F59E0B;border:1px solid #F59E0B30;font-family:system-ui;display:inline-flex;">
                            ★ Featured
                        </span>
                        <span v-if="project.project_url"
                            class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                            style="background:#052e16;color:#4ade80;border-color:#16a34a40;border:1px solid;font-family:system-ui;display:inline-flex;">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-400"
                                style="box-shadow:0 0 6px #4ade80;"></span>
                            Live Project
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="font-bold text-white leading-tight mb-5" style="font-size:clamp(28px,4.5vw,52px);font-family:'Georgia',serif;
            letter-spacing:-.5px;max-width:760px;">
                        {{ project.title }}
                    </h1>

                    <!-- Meta row: links and actions -->
                    <div class="flex items-center gap-4 flex-wrap">
                        <!-- Live Demo Button -->
                        <a v-if="project.project_url" :href="project.project_url" target="_blank"
                            class="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-2xl transition-all hover:scale-105"
                            style="background:#8B5CF6;box-shadow:0 0 20px #8B5CF635;font-family:system-ui;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Live Demo
                        </a>

                        <!-- GitHub Button -->
                        <a v-if="project.github_url" :href="project.github_url" target="_blank"
                            class="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-2xl border transition-all hover:scale-105 hover:border-violet-500"
                            style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            GitHub
                        </a>

                        <!-- Back button -->
                        <RouterLink to="/portfolio"
                            class="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-2xl border transition-all hover:scale-105"
                            style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back
                        </RouterLink>
                    </div>
                </div>
            </section>

            <!-- ── PROJECT IMAGE SHOWCASE ─────────────────────── -->
            <section v-if="project.image" class="px-6 md:px-8 py-12">
                <div class="max-w-5xl mx-auto">
                    <div class="rounded-2xl overflow-hidden border"
                        style="border-color:#3B2A5A;box-shadow:0 0 40px rgba(59,130,246,0.1);">
                        <img :src="project.image" :alt="project.title"
                            style="width:100%;height:auto;max-height:600px;object-fit:cover;display:block;" />
                    </div>
                </div>
            </section>

            <!-- ── PROJECT BODY + SIDEBAR ──────────────────────── -->
            <section class="py-14 px-6 md:px-8">
                <div class="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">

                    <!-- Project description -->
                    <article class="flex-1 min-w-0">
                        <!-- Divider -->
                        <div class="w-full h-px mb-10"
                            style="background:linear-gradient(90deg,#8B5CF6,#3B2A5A,transparent);"></div>

                        <!-- Description content -->
                        <div class="prose-custom"
                            style="color:#C9B9E8;font-family:system-ui;font-size:16px;line-height:1.9;">
                            <h2
                                style="color:#fff;font-size:24px;font-weight:bold;margin-bottom:1rem;font-family:'Georgia',serif;">
                                Project Overview
                            </h2>
                            <p style="margin-bottom:1.5rem;">{{ project.description }}</p>

                            <!-- ── IMPORTANT LINKS SECTION ──────────────── -->
                            <div
                                style="background:#120E1C;border:1px solid #3B2A5A;border-radius:12px;padding:1.5rem;margin:2rem 0;">
                                <h3
                                    style="color:#fff;font-size:16px;font-weight:600;margin-bottom:1rem;font-family:system-ui;">
                                    🔗 Important Links
                                </h3>
                                <div style="display:grid;grid-template-columns:1fr;gap:0.75rem;">
                                    <a v-if="project.project_url" :href="project.project_url" target="_blank"
                                        class="flex items-center gap-3 px-4 py-3 rounded-lg border transition-all hover:bg-violet-500 hover:bg-opacity-10"
                                        style="border-color:#8B5CF630;text-decoration:none;">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C084FC"
                                            stroke-width="2.5">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                        <div style="flex:1;">
                                            <p style="color:#C084FC;font-weight:600;font-size:14px;">View Live Project
                                            </p>
                                            <p style="color:#475569;font-size:12px;">{{ project.project_url }}</p>
                                        </div>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569"
                                            stroke-width="2.5">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </a>
                                    <a v-if="project.github_url" :href="project.github_url" target="_blank"
                                        class="flex items-center gap-3 px-4 py-3 rounded-lg border transition-all hover:bg-violet-500 hover:bg-opacity-10"
                                        style="border-color:#8B5CF630;text-decoration:none;">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#C084FC">
                                            <path
                                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                        </svg>
                                        <div style="flex:1;">
                                            <p style="color:#C084FC;font-weight:600;font-size:14px;">View Source Code
                                            </p>
                                            <p style="color:#475569;font-size:12px;">GitHub Repository</p>
                                        </div>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569"
                                            stroke-width="2.5">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <!-- ── TECHNOLOGY STACK ──────────────────── -->
                            <h3
                                style="color:#C9B9E8;font-size:18px;font-weight:600;margin-top:2rem;margin-bottom:1rem;font-family:system-ui;">
                                Technologies Used
                            </h3>
                            <p style="margin-bottom:1rem;color:#C9B9E8;">
                                This project was built using modern web technologies and best practices to ensure
                                scalability,
                                performance, and maintainability.
                            </p>
                            <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:2rem;">
                                <span v-for="tech in projectTechs" :key="tech"
                                    class="px-4 py-2 rounded-full text-xs font-semibold border"
                                    style="background:#8B5CF610;border-color:#8B5CF630;color:#C084FC;font-family:system-ui;">
                                    {{ tech }}
                                </span>
                            </div>

                            <!-- Tech Stack (if available in description) -->
                            <h3
                                style="color:#C9B9E8;font-size:18px;font-weight:600;margin-top:2rem;margin-bottom:1rem;font-family:system-ui;">
                                Details
                            </h3>
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li v-if="project.category"
                                    style="margin-bottom:0.75rem;padding-left:1.5rem;position:relative;">
                                    <span style="position:absolute;left:0;color:#8B5CF6;">→</span>
                                    <strong>Category:</strong> {{ project.category }}
                                </li>
                                <li v-if="project.is_featured"
                                    style="margin-bottom:0.75rem;padding-left:1.5rem;position:relative;">
                                    <span style="position:absolute;left:0;color:#F59E0B;">★</span>
                                    <strong style="color:#F59E0B;">Featured Project</strong>
                                </li>
                            </ul>
                        </div>

                        <!-- ── CTA ── -->
                        <div class="mt-16 pt-8 border-t" style="border-color:#241730;">
                            <p class="text-sm font-semibold text-white mb-4" style="font-family:'Georgia',serif;">
                                Interested in a similar project?
                            </p>
                            <RouterLink to="/contact"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                                style="background:#8B5CF6;color:#fff;box-shadow:0 0 20px #8B5CF635;font-family:system-ui;">
                                Get in Touch
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </RouterLink>
                        </div>
                    </article>

                    <!-- ── SIDEBAR ──────────────────────────────── -->
                    <aside class="w-full lg:w-72 flex-shrink-0">
                        <!-- Project stats -->
                        <div class="rounded-2xl p-5 mb-8" style="background:#120E1C;border:1px solid #3B2A5A;">
                            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4"
                                style="color:#C9B9E8;font-family:system-ui;letter-spacing:.08em;">
                                Quick Info
                            </h4>

                            <div class="space-y-4">
                                <!-- Category -->
                                <div>
                                    <p class="text-xs font-semibold mb-2" style="color:#475569;font-family:system-ui;">
                                        Category
                                    </p>
                                    <p class="text-sm font-medium text-white" style="font-family:system-ui;">
                                        {{ project.category || 'Not specified' }}
                                    </p>
                                </div>

                                <!-- Status -->
                                <div>
                                    <p class="text-xs font-semibold mb-2" style="color:#475569;font-family:system-ui;">
                                        Status
                                    </p>
                                    <span v-if="project.project_url"
                                        class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                                        style="background:#052e16;color:#4ade80;font-family:system-ui;">
                                        <span class="w-1.5 h-1.5 rounded-full bg-green-400"
                                            style="box-shadow:0 0 6px #4ade80;"></span>
                                        Live
                                    </span>
                                    <span v-else class="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full"
                                        style="background:#1f2937;color:#9ca3af;font-family:system-ui;">
                                        Work in Progress
                                    </span>
                                </div>

                                <!-- Featured badge -->
                                <div v-if="project.is_featured">
                                    <p class="text-xs font-semibold mb-2" style="color:#475569;font-family:system-ui;">
                                        Highlight
                                    </p>
                                    <span
                                        class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                                        style="background:#F59E0B15;color:#F59E0B;border:1px solid #F59E0B30;font-family:system-ui;">
                                        ★ Featured
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- ── RELATED PROJECTS ─────────────────────── -->
                        <div v-if="relatedProjects.length > 0" class="rounded-2xl p-5"
                            style="background:#120E1C;border:1px solid #3B2A5A;">
                            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4"
                                style="color:#C9B9E8;font-family:system-ui;letter-spacing:.08em;">
                                Similar Projects
                            </h4>

                            <div class="space-y-3">
                                <RouterLink v-for="p in relatedProjects" :key="p.id"
                                    :to="{ name: 'ProjectDetail', params: { slug: generateSlug(p.title) } }"
                                    class="flex items-start gap-3 p-3 rounded-xl border transition-all hover:bg-violet-500 hover:bg-opacity-10"
                                    style="border-color:#3B2A5A;text-decoration:none;">
                                    <!-- Thumbnail -->
                                    <div v-if="p.image" class="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                                        <img :src="p.image" :alt="p.title"
                                            style="width:100%;height:100%;object-fit:cover;" />
                                    </div>
                                    <div v-else
                                        class="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                                        style="background:#3B2A5A;">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569"
                                            stroke-width="1">
                                            <rect x="2" y="3" width="20" height="14" rx="2" />
                                            <path d="M8 21h8M12 17v4" />
                                        </svg>
                                    </div>

                                    <!-- Content -->
                                    <div class="flex-1 min-w-0">
                                        <p class="text-xs font-semibold text-white truncate"
                                            style="font-family:system-ui;">
                                            {{ p.title }}
                                        </p>
                                        <p class="text-xs mt-0.5" style="color:#475569;font-family:system-ui;">
                                            {{ p.category }}
                                        </p>
                                    </div>

                                    <!-- Arrow -->
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" style="color:#475569;flex-shrink:0;margin-top:2px;">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </RouterLink>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <!-- ── FOOTER ───────────────────────────────────────── -->
            <PublicFooter />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import PublicNavbar from '@/components/PublicNavbar.vue'
import PublicFooter from '@/components/PublicFooter.vue'
import api from '@/api/axios'

const route = useRoute()
const router = useRouter()
const project = ref(null)
const allProjects = ref([])
const loading = ref(true)

// ── Generate slug from title ──────────────────────────────
const generateSlug = (title) => {
    return title
        ?.toLowerCase()
        ?.trim()
        ?.replace(/[^\w\s-]/g, '')
        ?.replace(/\s+/g, '-')
        ?.replace(/-+/g, '-') || 'project'
}

// ── Default technologies for projects ─────────────────────
const defaultTechs = computed(() => {
    const techMap = {
        'web app': ['Vue.js', 'Laravel', 'MySQL', 'Tailwind CSS', 'REST API'],
        'web design': ['Figma', 'Vue.js', 'CSS3', 'JavaScript'],
        'mobile app': ['React Native', 'Firebase', 'Node.js'],
        'backend': ['Laravel', 'MySQL', 'Redis', 'JWT', 'Docker'],
        'frontend': ['Vue.js', 'Tailwind CSS', 'Vite', 'JavaScript'],
        'fullstack': ['Vue.js', 'Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
    }

    const categoryLower = project.value?.category?.toLowerCase() || ''
    for (const [key, value] of Object.entries(techMap)) {
        if (categoryLower.includes(key)) {
            return value
        }
    }
    return ['Vue.js', 'Node.js', 'JavaScript', 'Web Development']
})

// ── Get technologies from project or defaults ──────────────
const projectTechs = computed(() => {
    if (project.value?.tech_stack) {
        return project.value.tech_stack
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0)
    }
    return defaultTechs.value
})

// ── Find project by slug ──────────────────────────────────
const findProjectBySlug = (slug) => {
    return allProjects.value.find(p => generateSlug(p.title) === slug)
}

// ── Load project on mount ─────────────────────────────────
onMounted(async () => {
    try {
        // Load all projects
        const { data } = await api.get('/projects')
        allProjects.value = data.data || []

        // Find project by slug from route
        const foundProject = findProjectBySlug(route.params.slug)
        if (foundProject) {
            project.value = foundProject
        }
    } catch (e) {
        console.error('Error loading project:', e.message)
        project.value = null
    } finally {
        loading.value = false
    }
})

// ── Related projects (same category, different project) ────
const relatedProjects = computed(() => {
    if (!project.value) return []
    return allProjects.value
        .filter(p => p.category === project.value.category && p.id !== project.value.id)
        .slice(0, 3)
})
</script>

<style scoped>
.prose-custom p {
    margin-bottom: 1.5rem;
}

.prose-custom h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.prose-custom ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
}

.prose-custom li {
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
}

.prose-custom li:before {
    content: '→';
    position: absolute;
    left: 0;
    color: #8B5CF6;
}

.prose-custom a {
    color: #C084FC;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.2s;
}

.prose-custom a:hover {
    color: #93C5FD;
}
</style>
