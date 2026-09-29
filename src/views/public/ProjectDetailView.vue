<template>
    <div style="background:#0A0610;min-height:100vh;">
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
            <section class="relative overflow-hidden" :style="project.hero_image
                ? `background:linear-gradient(to bottom,rgba(5,8,15,0.7) 0%,rgba(5,8,15,0.98) 100%),
             url(${project.hero_image}) center/cover no-repeat;`
                : ''" style="padding-top:2rem;padding-bottom:2rem;">

                <!-- Fallback gradient bg when no image -->
                <div v-if="!project.hero_image" class="absolute inset-0 pointer-events-none">
                    <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;
            transform:translateX(-50%);border-radius:50%;
            background:radial-gradient(circle,#6D28D922 0%,transparent 70%);filter:blur(50px);"></div>
                    <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF612 1px,transparent 1px);
            background-size:32px 32px;opacity:0.5;"></div>
                </div>

                <div class="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8">
                    <!-- Breadcrumb -->
                    <div class="flex items-center gap-2 mb-6 text-xs" style="color:#94A3B8;font-family:system-ui;">
                        <RouterLink to="/portfolio" class="transition-colors hover:text-violet-400"
                            style="color:#94A3B8;">
                            Portfolio
                        </RouterLink>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span style="color:#C9B9E8;">{{ project.title }}</span>
                    </div>

                    <!-- Title -->
                    <h1 class="font-bold text-white leading-tight mb-5" style="font-size:clamp(26px,3.6vw,44px);font-family:'Georgia',serif;
            letter-spacing:-.5px;max-width:920px;line-height:1.25;">
                        {{ project.title }}
                    </h1>

                    <!-- Meta row: links and actions -->
                    <div class="flex items-center gap-4 flex-wrap">
                        <!-- Live Demo Button -->
                        <a v-if="project.project_url" :href="project.project_url" target="_blank"
                            class="flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] active:scale-95"
                            style="background:linear-gradient(135deg,#10B981,#059669);font-family:system-ui;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            Live Demo
                        </a>

                        <!-- GitHub Button -->
                        <a v-if="project.github_url" :href="project.github_url" target="_blank"
                            class="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-2xl border transition-all hover:scale-105 hover:bg-violet-600/20 hover:text-white hover:border-violet-400"
                            style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            Source Code
                        </a>

                        <!-- Back button -->
                        <RouterLink to="/portfolio"
                            class="flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-2xl border transition-all hover:bg-white/5 hover:text-white hover:border-violet-400"
                            style="border-color:#3B2A5A;color:#94A3B8;font-family:system-ui;">
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
                                style="background:linear-gradient(145deg,#161224 0%,#0A0610 100%);border:1px solid #3B2A5A;border-radius:16px;padding:1.5rem;margin:2rem 0;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                                <h3
                                    style="color:#fff;font-size:16px;font-weight:600;margin-bottom:1rem;font-family:system-ui;">
                                    🔗 Important Links
                                </h3>
                                <div style="display:grid;grid-template-columns:1fr;gap:0.75rem;">
                                    <a v-if="project.project_url" :href="project.project_url" target="_blank"
                                        class="group flex items-center gap-3.5 px-5 py-4 rounded-xl border transition-all duration-300 hover:bg-[#062c1d]/40 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.01]"
                                        style="border-color:#3B2A5A;background:#120E1C;text-decoration:none;">
                                        <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                                            style="background:rgba(16,185,129,0.15);color:#4ADE80;">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="2" y1="12" x2="22" y2="12" />
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                            </svg>
                                        </div>
                                        <div style="flex:1;">
                                            <p class="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                                                View Live Project
                                            </p>
                                            <p class="text-xs transition-colors" style="color:#C9B9E8;">
                                                {{ project.project_url }}
                                            </p>
                                        </div>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80"
                                            stroke-width="2.5" class="transition-transform duration-300 group-hover:translate-x-1">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </a>
                                    <a v-if="project.github_url" :href="project.github_url" target="_blank"
                                        class="group flex items-center gap-3.5 px-5 py-4 rounded-xl border transition-all duration-300 hover:bg-[#1E1630] hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:scale-[1.01]"
                                        style="border-color:#3B2A5A;background:#120E1C;text-decoration:none;">
                                        <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                                            style="background:rgba(139,92,246,0.15);color:#C084FC;">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                            </svg>
                                        </div>
                                        <div style="flex:1;">
                                            <p class="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                                                View Source Code
                                            </p>
                                            <p class="text-xs transition-colors" style="color:#C9B9E8;">
                                                GitHub Repository
                                            </p>
                                        </div>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C084FC"
                                            stroke-width="2.5" class="transition-transform duration-300 group-hover:translate-x-1">
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
                    </article>

                    <!-- ── SIDEBAR ──────────────────────────────── -->
                    <aside class="w-full lg:w-72 flex-shrink-0 space-y-6">
                        <!-- Project stats -->
                        <div class="rounded-2xl p-5" style="background:#120E1C;border:1px solid #3B2A5A;">
                            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4"
                                style="color:#C9B9E8;font-family:system-ui;letter-spacing:.08em;">
                                Quick Info
                            </h4>

                            <div class="space-y-4">
                                <!-- Category -->
                                <div>
                                    <p class="text-xs font-semibold mb-2" style="color:#94A3B8;font-family:system-ui;">
                                        Category
                                    </p>
                                    <p class="text-sm font-medium text-white" style="font-family:system-ui;">
                                        {{ project.category || 'Not specified' }}
                                    </p>
                                </div>

                                <!-- Status -->
                                <div>
                                    <p class="text-xs font-semibold mb-2" style="color:#94A3B8;font-family:system-ui;">
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
                                    <p class="text-xs font-semibold mb-2" style="color:#94A3B8;font-family:system-ui;">
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

                        <!-- ── RELATED / SIMILAR PROJECTS ────────────── -->
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
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8"
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
                                        <p class="text-xs mt-0.5" style="color:#94A3B8;font-family:system-ui;">
                                            {{ p.category }}
                                        </p>
                                    </div>

                                    <!-- Arrow -->
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" style="color:#94A3B8;flex-shrink:0;margin-top:2px;">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </RouterLink>
                            </div>
                        </div>

                        <!-- ── INTERESTED IN A SIMILAR PROJECT CTA CARD ── -->
                        <div class="rounded-2xl p-6 text-center relative overflow-hidden border transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] group"
                            style="background:linear-gradient(145deg, #1A102E 0%, #120E1C 100%);border-color:#3B2A5A;"
                            onmouseover="this.style.borderColor='#8B5CF680'"
                            onmouseout="this.style.borderColor='#3B2A5A'">
                            
                            <!-- Ambient top glow -->
                            <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full pointer-events-none"
                                style="background:radial-gradient(circle,rgba(139,92,246,0.25) 0%,transparent 70%);filter:blur(20px);"></div>

                            <!-- Icon -->
                            <div class="w-12 h-12 rounded-2xl mx-auto mb-3.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);color:#C084FC;box-shadow:0 0 15px rgba(139,92,246,0.2);">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>

                            <!-- Heading -->
                            <h4 class="text-base font-bold text-white mb-2 group-hover:text-purple-200 transition-colors" style="font-family:'Georgia',serif;">
                                Interested in a similar project?
                            </h4>

                            <!-- Description -->
                            <p class="text-xs leading-relaxed mb-5" style="color:#C9B9E8;font-family:system-ui;">
                                Have an idea or looking for custom software development? Let's discuss your requirements!
                            </p>

                            <!-- CTA Button -->
                            <RouterLink :to="`/contact?subject=${encodeURIComponent('Inquiry: ' + (project.title || 'Project'))}`"
                                class="w-full py-3 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg group/cbtn"
                                style="background:linear-gradient(135deg,#8B5CF6,#6D28D9);box-shadow:0 0 20px rgba(139,92,246,0.4);font-family:system-ui;">
                                <span>Get in Touch</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="transition-transform duration-300 group-hover/cbtn:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </RouterLink>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
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
