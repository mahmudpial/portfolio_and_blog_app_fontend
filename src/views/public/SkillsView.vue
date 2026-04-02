<template>
    <div style="background:#05080F;min-height:100vh;">

        <!-- ── HERO HEADER ─────────────────────────────────────── -->
        <section class="relative pt-28 pb-20 px-6 md:px-16 overflow-hidden">
            <!-- Background orbs -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:600px;height:600px;top:-200px;right:-100px;border-radius:50%;
          background:radial-gradient(circle,#1e40af20 0%,transparent 70%);filter:blur(50px);"></div>
                <div class="absolute" style="width:400px;height:400px;bottom:-100px;left:-50px;border-radius:50%;
          background:radial-gradient(circle,#3B82F615 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute inset-0" style="background-image:radial-gradient(circle,#3B82F614 1px,transparent 1px);
          background-size:32px 32px;opacity:0.5;"></div>
            </div>

            <div class="relative z-10 max-w-4xl mx-auto text-center">
                <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                    style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">What I Bring</p>
                <h1 class="font-bold leading-tight mb-6"
                    style="font-size:clamp(36px,6vw,68px);font-family:'Georgia',serif;">
                    <span class="text-white">Skills &amp; </span>
                    <span style="color:#60A5FA;text-shadow:0 0 40px #3B82F650;">Expertise</span>
                </h1>
                <p class="text-base leading-relaxed mb-8 mx-auto"
                    style="color:#A8C4E8;font-family:system-ui;max-width:520px;line-height:1.8;">
                    Technologies and tools I've worked with professionally — built
                    through real projects, not just tutorials.
                </p>
                <!-- Divider line -->
                <div class="mx-auto w-16 h-0.5 rounded-full mb-12"
                    style="background:linear-gradient(90deg,transparent,#3B82F6,transparent);"></div>

                <!-- Stats row -->
                <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div v-for="stat in headerStats" :key="stat.label"
                        class="rounded-2xl border py-7 px-4 transition-all hover:-translate-y-1"
                        style="background:#0D1220;border-color:#1e3a5f;">
                        <div class="font-bold text-white mb-1" style="font-size:36px;font-family:'Georgia',serif;">
                            {{ stat.value }}<span style="font-size:20px;color:#60A5FA;">{{ stat.suffix }}</span>
                        </div>
                        <div class="text-xs font-semibold uppercase tracking-widest"
                            style="color:#475569;font-family:system-ui;letter-spacing:.15em;">
                            {{ stat.label }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── CATEGORY FILTER TABS ───────────────────────────── -->
        <div class="sticky top-16 z-30 px-6 md:px-16 py-4"
            style="background:rgba(5,8,15,0.9);backdrop-filter:blur(16px);border-bottom:1px solid #0f1f38;">
            <div class="max-w-7xl mx-auto flex flex-wrap gap-2">
                <button @click="activeCategory = ''" :style="activeCategory === ''
                    ? 'background:#3B82F6;color:#fff;box-shadow:0 0 16px #3B82F640;border-color:#3B82F6;'
                    : 'background:#0D1220;color:#A8C4E8;border-color:#1e3a5f;'"
                    class="px-5 py-2 rounded-full text-sm font-semibold border transition-all hover:scale-105"
                    style="font-family:system-ui;letter-spacing:.05em;">
                    ALL
                </button>
                <button v-for="cat in categories" :key="cat" @click="activeCategory = cat" :style="activeCategory === cat
                    ? 'background:#3B82F6;color:#fff;box-shadow:0 0 16px #3B82F640;border-color:#3B82F6;'
                    : 'background:#0D1220;color:#A8C4E8;border-color:#1e3a5f;'"
                    class="px-5 py-2 rounded-full text-sm font-semibold border transition-all hover:scale-105 uppercase"
                    style="font-family:system-ui;letter-spacing:.05em;">
                    {{ cat }}
                </button>
            </div>
        </div>

        <!-- ── SKILLS BY CATEGORY ─────────────────────────────── -->
        <section class="py-16 px-6 md:px-16">
            <div class="max-w-7xl mx-auto">

                <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div v-for="i in 6" :key="i" class="h-36 rounded-2xl animate-pulse" style="background:#0D1220;">
                    </div>
                </div>

                <div v-else>
                    <div v-for="(group, category) in filteredGrouped" :key="category" class="mb-14">

                        <!-- Category heading -->
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center gap-4">
                                <h2 class="font-bold text-white lowercase"
                                    style="font-size:22px;font-family:'Georgia',serif;letter-spacing:-.3px;">
                                    {{ category }}
                                </h2>
                                <div class="h-px flex-1 min-w-16"
                                    style="background:linear-gradient(90deg,#1e3a5f,transparent);width:200px;"></div>
                            </div>
                            <span class="text-xs font-medium" style="color:#475569;font-family:system-ui;">
                                {{ group.length }} skill{{ group.length !== 1 ? 's' : '' }}
                            </span>
                        </div>

                        <!-- Skill cards grid -->
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div v-for="skill in group" :key="skill.id"
                                class="skill-card rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 group"
                                style="background:#0D1220;border-color:#1e3a5f;">

                                <!-- Card header -->
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <!-- Letter avatar -->
                                        <div class="w-10 h-10 rounded-xl flex items-center justify-center
                                text-sm font-bold text-white flex-shrink-0"
                                            style="background:linear-gradient(135deg,#1e3a5f,#2563EB);">
                                            {{ skill.name.slice(0, 2).toUpperCase() }}
                                        </div>
                                        <div>
                                            <div class="font-bold text-white text-sm"
                                                style="font-family:'Georgia',serif;">
                                                {{ skill.name }}
                                            </div>
                                            <div class="text-xs" style="color:#475569;font-family:system-ui;">
                                                {{ skill.order || 3 }}y exp.
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Level badge -->
                                    <span class="text-xs font-semibold px-3 py-1.5 rounded-full border"
                                        :style="getLevelStyle(skill.percentage)">
                                        {{ getLevel(skill.percentage) }}
                                    </span>
                                </div>

                                <!-- Proficiency bar -->
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-xs"
                                        style="color:#475569;font-family:system-ui;">Proficiency</span>
                                    <span class="text-xs font-bold" style="color:#60A5FA;font-family:system-ui;">
                                        {{ skill.percentage }}%
                                    </span>
                                </div>
                                <div class="w-full h-1.5 rounded-full overflow-hidden" style="background:#0a1628;">
                                    <div class="h-1.5 rounded-full transition-all duration-700" :style="{
                                        width: skill.percentage + '%',
                                        background: 'linear-gradient(90deg,#3B82F6,#60A5FA)',
                                        boxShadow: '0 0 8px #3B82F660'
                                    }"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div v-if="Object.keys(filteredGrouped).length === 0" class="text-center py-20">
                        <p class="text-white font-medium mb-1" style="font-family:system-ui;">
                            No skills in this category yet.
                        </p>
                        <p class="text-sm" style="color:#475569;font-family:system-ui;">
                            Add skills from the admin panel.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── CURRENTLY LEARNING ─────────────────────────────── -->
        <section class="py-16 px-6 md:px-16" style="border-top:1px solid #0f1f38;">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-center gap-4 mb-8">
                    <h2 class="font-bold text-white text-2xl whitespace-nowrap" style="font-family:'Georgia',serif;">
                        Currently Learning</h2>
                    <div class="flex-1 h-px" style="background:linear-gradient(90deg,#1e3a5f,transparent);"></div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
                    <div v-for="item in currentlyLearning" :key="item"
                        class="flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all hover:-translate-y-1 hover:scale-105"
                        style="background:#0D1220;border-color:#1e3a5f;"
                        onmouseover="this.style.borderColor='#3B82F640'" onmouseout="this.style.borderColor='#1e3a5f'">
                        <span class="w-2 h-2 rounded-full flex-shrink-0 bg-blue-500"
                            style="box-shadow:0 0 6px #3B82F6;"></span>
                        <span class="text-sm font-medium text-white" style="font-family:system-ui;">{{ item }}</span>
                    </div>
                </div>

                <!-- ── CTA CARD ────────────────────────────────────── -->
                <div class="relative rounded-3xl border overflow-hidden p-12 text-center"
                    style="background:#0D1220;border-color:#1e3a5f;">
                    <!-- Glow blob -->
                    <div class="absolute left-0 top-0 bottom-0 w-64 pointer-events-none"
                        style="background:radial-gradient(circle at 0% 50%,#3B82F625,transparent 70%);"></div>
                    <div class="absolute inset-0 pointer-events-none"
                        style="background:radial-gradient(ellipse 600px 300px at 50% 50%,#3B82F608,transparent 70%);">
                    </div>

                    <div class="relative z-10">
                        <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                            style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">
                            Let's Collaborate
                        </p>
                        <h2 class="font-bold text-white mb-4"
                            style="font-size:clamp(22px,3.5vw,36px);font-family:'Georgia',serif;">
                            Need These Skills on Your Team?
                        </h2>
                        <p class="text-sm leading-relaxed mb-8 mx-auto"
                            style="color:#A8C4E8;font-family:system-ui;max-width:480px;line-height:1.8;">
                            I'm open to freelance projects and full-time roles.
                            Let's talk about what you're building.
                        </p>
                        <div class="flex flex-wrap gap-4 justify-center">
                            <RouterLink to="/contact" class="flex items-center gap-2 px-7 py-3 text-white font-semibold rounded-2xl
                       transition-all hover:scale-105"
                                style="background:#3B82F6;box-shadow:0 0 24px #3B82F640;font-family:system-ui;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                Hire Me
                            </RouterLink>
                            <RouterLink to="/portfolio" class="flex items-center gap-2 px-7 py-3 font-semibold rounded-2xl border
                       transition-all hover:scale-105 hover:border-blue-500"
                                style="border-color:#334155;color:#A8C4E8;font-family:system-ui;">
                                View Work
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
.skill-card:hover {
    border-color: #3B82F640 !important;
    box-shadow: 0 0 24px #3B82F612;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/axios'

const skills = ref([])
const loading = ref(true)
const activeCategory = ref('')

const currentlyLearning = [
    'AI / Machine Learning',
    'DevOps & CI/CD',
    'TypeScript',
    'System Design',
]

onMounted(async () => {
    try {
        const { data } = await api.get('/skills')
        skills.value = data.data || []
    } catch (e) {
        console.warn('Could not load skills:', e.message)
    } finally {
        loading.value = false
    }
})

// ── Derived categories ────────────────────────────────────
const categories = computed(() => [
    ...new Set(skills.value.map(s => s.category).filter(Boolean))
])

// ── Grouped by category, filtered by activeCategory ───────
const filteredGrouped = computed(() => {
    const filtered = activeCategory.value
        ? skills.value.filter(s => s.category === activeCategory.value)
        : skills.value

    return filtered.reduce((groups, skill) => {
        const cat = skill.category || 'General'
        if (!groups[cat]) groups[cat] = []
        groups[cat].push(skill)
        return groups
    }, {})
})

// ── Header stats ──────────────────────────────────────────
const headerStats = computed(() => {
    const expertCount = skills.value.filter(s => s.percentage >= 80).length
    return [
        {
            value: skills.value.length || 1,
            suffix: '+',
            label: 'Technologies',
        },
        {
            value: 3,
            suffix: '+',
            label: 'Years Active',
        },
        {
            value: expertCount,
            suffix: '',
            label: 'Expert Level',
        },
    ]
})

// ── Level label + style from percentage ───────────────────
function getLevel(pct) {
    if (pct >= 90) return 'Expert'
    if (pct >= 75) return 'Advanced'
    if (pct >= 50) return 'Intermediate'
    if (pct >= 25) return 'Familiar'
    return 'Learning'
}

function getLevelStyle(pct) {
    if (pct >= 90) return 'background:#f59e0b15;color:#f59e0b;border-color:#f59e0b30;'
    if (pct >= 75) return 'background:#3B82F615;color:#60A5FA;border-color:#3B82F630;'
    if (pct >= 50) return 'background:#3B82F615;color:#60A5FA;border-color:#3B82F630;'
    if (pct >= 25) return 'background:#1e3a5f;color:#A8C4E8;border-color:#1e3a5f;'
    return 'background:#1e3a5f;color:#A8C4E8;border-color:#1e3a5f;'
}
</script>