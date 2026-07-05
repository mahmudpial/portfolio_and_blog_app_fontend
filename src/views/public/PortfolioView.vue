<template>
    <div style="background:#0A0610;min-height:100vh;">

        <!-- ── HERO HEADER ─────────────────────────────────────── -->
        <section class="relative pt-28 pb-20 px-6 md:px-16 overflow-hidden">
            <!-- Background effects -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:700px;height:700px;top:-250px;right:-150px;border-radius:50%;
          background:radial-gradient(circle,#6D28D920 0%,transparent 70%);filter:blur(50px);"></div>
                <div class="absolute" style="width:400px;height:400px;bottom:-100px;left:-50px;border-radius:50%;
          background:radial-gradient(circle,#8B5CF612 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF612 1px,transparent 1px);
          background-size:32px 32px;opacity:0.5;"></div>
            </div>

            <div class="relative z-10 max-w-4xl mx-auto text-center">
                <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                    style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">My Work</p>
                <h1 class="font-bold leading-tight mb-5"
                    style="font-size:clamp(36px,6vw,68px);font-family:'Georgia',serif;">
                    <span class="text-white">Featured </span>
                    <span style="color:#C084FC;text-shadow:0 0 40px #8B5CF650;">Projects</span>
                </h1>
                <p class="text-base leading-relaxed mb-8 mx-auto"
                    style="color:#C9B9E8;font-family:system-ui;max-width:500px;line-height:1.8;">
                    A curated selection of projects I've built — from web applications to
                    UI systems. Each one crafted with care and purpose.
                </p>
                <!-- Divider -->
                <div class="mx-auto w-16 h-0.5 rounded-full mb-12"
                    style="background:linear-gradient(90deg,transparent,#8B5CF6,transparent);"></div>

                <!-- Stats row -->
                <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div v-for="stat in headerStats" :key="stat.label"
                        class="rounded-2xl border py-7 px-4 transition-all hover:-translate-y-1"
                        style="background:#120E1C;border-color:#3B2A5A;">
                        <div class="font-bold text-white mb-1" style="font-size:36px;font-family:'Georgia',serif;">
                            {{ stat.value }}<span style="font-size:22px;color:#C084FC;">{{ stat.suffix }}</span>
                        </div>
                        <div class="text-xs font-semibold uppercase tracking-widest"
                            style="color:#475569;font-family:system-ui;letter-spacing:.15em;">
                            {{ stat.label }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── STICKY FILTER TABS ─────────────────────────────── -->
        <div class="sticky top-16 z-30 px-6 md:px-16 py-4"
            style="background:rgba(5,8,15,0.9);backdrop-filter:blur(16px);border-bottom:1px solid #241730;">
            <div class="max-w-7xl mx-auto flex flex-wrap gap-2">
                <button @click="activeFilter = ''" :style="activeFilter === ''
                    ? 'background:#8B5CF6;color:#fff;box-shadow:0 0 16px #8B5CF640;border-color:#8B5CF6;'
                    : 'background:#120E1C;color:#C9B9E8;border-color:#3B2A5A;'"
                    class="px-5 py-2 rounded-full text-sm font-semibold border transition-all hover:scale-105"
                    style="font-family:system-ui;letter-spacing:.05em;">
                    ALL
                </button>
                <button v-for="cat in categories" :key="cat" @click="activeFilter = cat" :style="activeFilter === cat
                    ? 'background:#8B5CF6;color:#fff;box-shadow:0 0 16px #8B5CF640;border-color:#8B5CF6;'
                    : 'background:#120E1C;color:#C9B9E8;border-color:#3B2A5A;'"
                    class="px-5 py-2 rounded-full text-sm font-semibold border transition-all hover:scale-105 uppercase"
                    style="font-family:system-ui;letter-spacing:.05em;">
                    {{ cat }}
                </button>
            </div>
        </div>

        <!-- ── PROJECT LIST ───────────────────────────────────── -->
        <section class="py-16 px-6 md:px-16">
            <div class="max-w-7xl mx-auto">

                <!-- Loading skeletons -->
                <div v-if="loading" class="flex flex-col gap-5">
                    <div v-for="i in 3" :key="i" class="h-52 rounded-3xl animate-pulse" style="background:#120E1C;">
                    </div>
                </div>

                <!-- Projects -->
                <div v-else-if="filteredProjects.length > 0" class="flex flex-col gap-5">
                    <div v-for="(p, i) in filteredProjects" :key="p.id" @click="goToProject(p)" class="project-row group rounded-3xl border overflow-hidden transition-all duration-300
                   hover:-translate-y-1 relative cursor-pointer" style="background:#120E1C;border-color:#3B2A5A;">

                        <!-- Category badge — top left -->
                        <div class="absolute top-5 left-5 z-20">
                            <span class="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                                style="background:#8B5CF6;font-family:system-ui;letter-spacing:.08em;">
                                {{ p.category || 'Project' }}
                            </span>
                        </div>

                        <!-- Featured + Live badges — stacked on top right -->
                        <div class="absolute top-5 right-5 z-20 flex flex-col gap-2"
                            style="display:flex;flex-direction:column;gap:8px;">
                            <span v-if="p.is_featured"
                                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                                style="background:#F59E0B15;color:#F59E0B;border:1px solid #F59E0B30;font-family:system-ui;display:inline-flex;white-space:nowrap;">
                                ★ Featured
                            </span>
                            <span v-if="p.project_url"
                                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                                style="background:#052e16;color:#4ade80;border-color:#16a34a40;font-family:system-ui;display:inline-flex;white-space:nowrap;">
                                <span class="w-1.5 h-1.5 rounded-full bg-green-400"
                                    style="box-shadow:0 0 6px #4ade80;"></span>
                                Live
                            </span>
                        </div>

                        <!-- Row layout: image left + content right -->
                        <div class="flex flex-col md:flex-row">
                            <!-- Image / placeholder -->
                            <div class="w-full md:w-64 h-52 flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                                style="background:linear-gradient(135deg,#180F28,#241338);">
                                <img v-if="p.image" :src="p.image" :alt="p.title"
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div v-else class="flex flex-col items-center gap-3">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B2A5A"
                                        stroke-width="1">
                                        <rect x="2" y="3" width="20" height="14" rx="2" />
                                        <path d="M8 21h8M12 17v4" />
                                    </svg>
                                </div>
                                <!-- Featured overlay shimmer -->
                                <div v-if="p.is_featured" class="absolute inset-0"
                                    style="background:linear-gradient(135deg,#8B5CF608,transparent 60%);"></div>
                            </div>

                            <!-- Content -->
                            <div class="flex-1 p-7 flex flex-col justify-center">
                                <h3 class="font-bold text-white mb-3"
                                    style="font-size:20px;font-family:'Georgia',serif;">
                                    {{ p.title }}
                                </h3>

                                <p class="text-sm leading-relaxed mb-6"
                                    style="color:#C9B9E8;font-family:system-ui;line-height:1.8;max-width:600px;">
                                    {{ p.description }}
                                </p>

                                <!-- Buttons -->
                                <div class="flex flex-wrap gap-3">
                                    <a v-if="p.project_url" :href="p.project_url" target="_blank" @click.stop class="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold
                           rounded-2xl transition-all hover:scale-105"
                                        style="background:#8B5CF6;box-shadow:0 0 20px #8B5CF635;font-family:system-ui;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2.5">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                        Live Demo
                                    </a>
                                    <a v-if="p.github_url" :href="p.github_url" target="_blank" @click.stop class="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-2xl
                           border transition-all hover:scale-105 hover:border-violet-500"
                                        style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                        </svg>
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-else class="text-center py-24 rounded-3xl border"
                    style="background:#120E1C;border-color:#3B2A5A;">
                    <svg class="mx-auto mb-5" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#3B2A5A"
                        stroke-width="1">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                    </svg>
                    <p class="text-white font-semibold mb-2" style="font-family:'Georgia',serif;font-size:18px;">
                        No projects yet
                    </p>
                    <p class="text-sm" style="color:#475569;font-family:system-ui;">
                        Add projects from the admin panel to display them here.
                    </p>
                </div>
            </div>
        </section>

        <!-- ── CTA SECTION ────────────────────────────────────── -->
        <section class="py-20 px-6 md:px-16" style="border-top:1px solid #241730;">
            <div class="max-w-7xl mx-auto flex justify-center relative">
                <!-- Left glow blob -->
                <div class="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" style="width:360px;height:360px;border-radius:50%;
          background:radial-gradient(circle,#8B5CF630 0%,transparent 70%);
          filter:blur(40px);transform:translateY(-50%) translateX(-30%);"></div>

                <div class="relative z-10 w-full max-w-2xl rounded-3xl border p-14 text-center overflow-hidden" style="background:#120E1C;border-color:#3B2A5A;
          box-shadow:0 0 60px #8B5CF610,0 40px 80px #00000040;">
                    <!-- Inner glow -->
                    <div class="absolute inset-0 pointer-events-none"
                        style="background:radial-gradient(ellipse 500px 250px at 50% 50%,#8B5CF608,transparent 70%);">
                    </div>
                    <div class="absolute inset-0 pointer-events-none" style="background-image:radial-gradient(circle,#8B5CF610 1px,transparent 1px);
            background-size:28px 28px;opacity:0.4;"></div>

                    <div class="relative z-10">
                        <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                            style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">
                            Open to Work
                        </p>
                        <h2 class="font-bold text-white mb-4"
                            style="font-size:clamp(24px,3.5vw,36px);font-family:'Georgia',serif;">
                            Have a Project in Mind?
                        </h2>
                        <p class="text-sm leading-relaxed mb-8 mx-auto"
                            style="color:#C9B9E8;font-family:system-ui;max-width:420px;line-height:1.8;">
                            I'm currently available for freelance projects and full-time
                            opportunities. Let's build something great together.
                        </p>
                        <RouterLink to="/contact" class="inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold
                     rounded-2xl transition-all hover:scale-105"
                            style="background:#8B5CF6;box-shadow:0 0 28px #8B5CF640;font-family:system-ui;font-size:15px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Get In Touch
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
.project-row:hover {
    border-color: #8B5CF640 !important;
    box-shadow: 0 0 40px #8B5CF612;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()
const projects = ref([])
const loading = ref(true)
const activeFilter = ref('')

// ── Generate slug from title ──────────────────────────────
const generateSlug = (title) => {
    return title
        ?.toLowerCase()
        ?.trim()
        ?.replace(/[^\w\s-]/g, '')
        ?.replace(/\s+/g, '-')
        ?.replace(/-+/g, '-') || 'project'
}

// ── Navigate to project detail page ───────────────────────
const goToProject = (project) => {
    const slug = generateSlug(project.title)
    router.push({ name: 'ProjectDetail', params: { slug } })
}

onMounted(async () => {
    try {
        const { data } = await api.get('/projects')
        projects.value = data.data || []
    } catch (e) {
        console.warn('Could not load projects:', e.message)
    } finally {
        loading.value = false
    }
})

// ── Derived categories from API data ─────────────────────
const categories = computed(() =>
    [...new Set(projects.value.map(p => p.category).filter(Boolean))]
)

// ── Filtered list ─────────────────────────────────────────
const filteredProjects = computed(() =>
    activeFilter.value
        ? projects.value.filter(p => p.category === activeFilter.value)
        : projects.value
)

// ── Header stats ──────────────────────────────────────────
const headerStats = computed(() => [
    {
        value: projects.value.length || 1,
        suffix: '+',
        label: 'Projects',
    },
    {
        value: 3,
        suffix: '+',
        label: 'Years Exp.',
    },
    {
        value: '100',
        suffix: '%',
        label: 'Satisfaction',
    },
])
</script>