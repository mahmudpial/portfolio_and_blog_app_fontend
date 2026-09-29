<template>
    <div class="min-h-screen transition-colors duration-300" style="background:#0A0610;min-height:100vh;">

        <!-- ── HERO SECTION ─────────────────────────────────────── -->
        <section class="relative pt-32 pb-20 px-6 md:px-16 overflow-hidden">
            <!-- Background effects -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;transform:translateX(-50%);
                    border-radius:50%;background:radial-gradient(circle,#6D28D922 0%,transparent 70%);filter:blur(50px);"></div>
                <div class="absolute" style="width:450px;height:450px;top:-100px;left:-50px;border-radius:50%;
                    background:radial-gradient(circle,#8B5CF612 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute" style="width:450px;height:450px;top:-100px;right:-50px;border-radius:50%;
                    background:radial-gradient(circle,#8B5CF612 0%,transparent 70%);filter:blur(60px);"></div>
                <!-- Grid pattern -->
                <div class="absolute inset-0" style="background-image:linear-gradient(90deg,#3B2A5A08 1px,transparent 1px);
                    background-size:80px 100%;opacity:0.8;"></div>
                <div class="absolute inset-0" style="background-image:linear-gradient(#3B2A5A06 1px,transparent 1px);
                    background-size:100% 80px;opacity:0.8;"></div>
            </div>

            <div class="relative z-10 max-w-4xl mx-auto text-center">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
                    style="background:#120E1C;border-color:#3B2A5A;">
                    <span class="w-2 h-2 rounded-full bg-violet-400" style="box-shadow:0 0 8px #8B5CF6;"></span>
                    <span class="text-xs font-semibold uppercase tracking-widest text-violet-300"
                        style="letter-spacing:.2em;font-family:system-ui;">About Me</span>
                </div>

                <h1 class="font-bold leading-tight mb-6"
                    style="font-size:clamp(36px,5.5vw,64px);font-family:'Georgia',serif;">
                    <span class="text-white">Architecting Robust </span>
                    <span style="color:#C084FC;text-shadow:0 0 40px #8B5CF650;">Web Solutions</span>
                </h1>

                <p class="text-base md:text-lg leading-relaxed mb-10 mx-auto"
                    style="color:#C9B9E8;font-family:system-ui;max-width:680px;line-height:1.8;">
                    {{ settings['about_description'] || 'I am a Full-Stack Engineer specializing in Laravel, Vue.js, MySQL, and resilient system architectures. I love crafting high-concurrency systems, role-based access controls, and sleek interactive frontends.' }}
                </p>

                <div class="flex flex-wrap items-center justify-center gap-4">
                    <RouterLink :to="{ path: '/contact', hash: '#contact-form' }"
                        class="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                        style="background:#8B5CF6;box-shadow:0 0 20px #8B5CF640;font-family:system-ui;text-decoration:none;">
                        Let's Work Together
                    </RouterLink>

                    <a v-if="settings['resume_url']" :href="settings['resume_url']" target="_blank"
                        class="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 border"
                        style="background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;text-decoration:none;"
                        onmouseover="this.style.borderColor='#8B5CF6';this.style.color='#C084FC'"
                        onmouseout="this.style.borderColor='#3B2A5A';this.style.color='#C9B9E8'">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download CV
                    </a>
                </div>
            </div>
        </section>

        <!-- ── STATS COUNTER STRIP ──────────────────────────────── -->
        <section class="py-8 px-6 md:px-16 border-y" style="background:#120E1C;border-color:#241730;">
            <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div v-for="stat in stats" :key="stat.label" class="p-4">
                    <div class="text-3xl md:text-4xl font-bold mb-1"
                        style="color:#C084FC;font-family:'Georgia',serif;text-shadow:0 0 20px #8B5CF630;">
                        {{ stat.value }}
                    </div>
                    <div class="text-xs uppercase tracking-wider"
                        style="color:#94A3B8;font-family:system-ui;letter-spacing:.12em;">
                        {{ stat.label }}
                    </div>
                </div>
            </div>
        </section>

        <!-- ── MAIN STORY & PROFILE SECTION ─────────────────────── -->
        <section class="py-24 px-6 md:px-16">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-12 gap-12 items-center">
                    
                    <!-- Left: Profile card (5 cols) -->
                    <div class="md:col-span-5">
                        <div class="relative rounded-3xl p-6 border overflow-hidden"
                            style="background:#120E1C;border-color:#3B2A5A;box-shadow:0 20px 50px rgba(0,0,0,0.6);">
                            
                            <!-- Ambient Glow Behind Photo -->
                            <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-30"
                                style="background:#8B5CF6;"></div>

                            <div class="relative rounded-2xl overflow-hidden border border-white/10 mb-6 aspect-[4/5] bg-black/40">
                                <img v-if="settings['avatar_url'] || settings['about_image']"
                                    :src="settings['avatar_url'] || settings['about_image']"
                                    alt="Pial Mahmud" class="w-full h-full object-cover" />
                                <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3">
                                    <span class="text-7xl">👨‍💻</span>
                                    <span class="text-sm font-semibold text-violet-300">Pial Mahmud</span>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-xl font-bold text-white" style="font-family:'Georgia',serif;">
                                        {{ settings['full_name'] || 'Pial Mahmud' }}
                                    </h3>
                                    <p class="text-xs font-medium text-violet-400 mt-0.5">
                                        {{ settings['title'] || 'Full-Stack Software Engineer' }}
                                    </p>
                                </div>
                                <div class="w-3 h-3 rounded-full bg-emerald-400"
                                    style="box-shadow:0 0 10px #34d399;" title="Available for hire"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Narrative & Engineering Principles (7 cols) -->
                    <div class="md:col-span-7 space-y-8">
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-widest text-violet-400"
                                style="letter-spacing:.2em;font-family:system-ui;">My Philosophy</span>
                            <h2 class="text-2xl md:text-3xl font-bold text-white mt-2 mb-4"
                                style="font-family:'Georgia',serif;">
                                {{ settings['about_title'] || 'Building Software That Scales & Endures' }}
                            </h2>
                            <p class="text-sm md:text-base leading-relaxed mb-4"
                                style="color:#C9B9E8;font-family:system-ui;line-height:1.8;">
                                I build multi-tenant systems, enterprise dashboards, and scalable REST APIs with a relentless focus on clean database schema design, security, and developer ergonomics.
                            </p>
                            <p class="text-sm md:text-base leading-relaxed"
                                style="color:#C9B9E8;font-family:system-ui;line-height:1.8;">
                                Whether structuring Role-Based Access Control (RBAC) in Laravel or crafting micro-interactions in Vue 3, my goal is always to deliver software that is resilient, performant, and delightful to use.
                            </p>
                        </div>

                        <!-- 4 Key Pillars -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div v-for="p in pillars" :key="p.label"
                                class="p-4 rounded-2xl border transition-all hover:border-violet-500/40 hover:-translate-y-0.5"
                                style="background:#120E1C;border-color:#3B2A5A;">
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-xl p-2 rounded-xl" style="background:#8B5CF615;border:1px solid #8B5CF625;">
                                        {{ p.icon }}
                                    </span>
                                    <span class="font-bold text-sm text-white" style="font-family:system-ui;">
                                        {{ p.label }}
                                    </span>
                                </div>
                                <p class="text-xs leading-relaxed" style="color:#94A3B8;font-family:system-ui;">
                                    {{ p.desc }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── TIMELINE JOURNEY ─────────────────────────────────── -->
        <section class="py-20 px-6 md:px-16 border-t" style="background:#0D0814;border-color:#241730;">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-16">
                    <span class="text-xs font-semibold uppercase tracking-widest text-violet-400"
                        style="letter-spacing:.2em;font-family:system-ui;">Milestones</span>
                    <h2 class="text-2xl md:text-3xl font-bold text-white mt-2" style="font-family:'Georgia',serif;">
                        Career & Engineering Journey
                    </h2>
                </div>

                <div class="relative border-l-2 ml-4 md:ml-8 space-y-12" style="border-color:#3B2A5A;">
                    <div v-for="(item, idx) in timeline" :key="idx" class="relative pl-6 md:pl-8 group">
                        <!-- Bullet point -->
                        <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all group-hover:scale-125"
                            style="background:#0A0610;border-color:#8B5CF6;box-shadow:0 0 10px #8B5CF660;"></div>

                        <div class="p-6 rounded-2xl border transition-all group-hover:border-violet-500/50"
                            style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <h3 class="text-lg font-bold text-white" style="font-family:'Georgia',serif;">
                                    {{ item.role }}
                                </h3>
                                <span class="px-3 py-1 rounded-full text-xs font-semibold text-violet-300 border"
                                    style="background:#8B5CF615;border-color:#8B5CF630;font-family:system-ui;">
                                    {{ item.period }}
                                </span>
                            </div>
                            <p class="text-xs font-semibold text-purple-400 mb-3">{{ item.company }}</p>
                            <p class="text-sm leading-relaxed" style="color:#C9B9E8;font-family:system-ui;line-height:1.7;">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── CTA BOTTOM SECTION ───────────────────────────────── -->
        <section class="py-20 px-6 md:px-16 text-center">
            <div class="max-w-3xl mx-auto rounded-3xl p-10 border relative overflow-hidden"
                style="background:linear-gradient(135deg,#120E1C,#1E1430);border-color:#3B2A5A;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
                <div class="relative z-10">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-4" style="font-family:'Georgia',serif;">
                        Have a project or opportunity?
                    </h2>
                    <p class="text-sm md:text-base mb-8 max-w-xl mx-auto" style="color:#C9B9E8;font-family:system-ui;">
                        Let's connect and discuss how we can bring your ideas to life with modern, maintainable code.
                    </p>
                    <RouterLink :to="{ path: '/contact', hash: '#contact-form' }"
                        class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105"
                        style="background:#8B5CF6;box-shadow:0 0 25px #8B5CF650;font-family:system-ui;text-decoration:none;">
                        Get In Touch
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'

const settings = ref({})

const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '25+', label: 'Projects Delivered' },
    { value: '100%', label: 'Commitment to Quality' },
    { value: '24/7', label: 'Technical Dedication' },
]

const pillars = [
    { label: 'Clean Architecture', icon: '⚡', desc: 'Writing decoupled, testable, and robust enterprise code.' },
    { label: 'High Performance', icon: '🚀', desc: 'Optimizing SQL queries, caching, and frontend load speeds.' },
    { label: 'Modern UI/UX', icon: '🎨', desc: 'Crafting responsive, accessible, and intuitive interfaces.' },
    { label: 'Security & RBAC', icon: '🔒', desc: 'Multi-tenant isolation and role-based permissions.' },
]

const timeline = [
    {
        role: 'Full-Stack Software Engineer',
        company: 'Freelance & Independent Projects',
        period: '2023 — Present',
        description: 'Architecting custom web applications, SaaS platforms, and enterprise APIs using Laravel 11, Vue 3, Tailwind CSS, and MySQL.',
    },
    {
        role: 'Web Application Developer',
        company: 'Client Collaborations',
        period: '2021 — 2023',
        description: 'Engineered RESTful backends, responsive user dashboards, third-party API integrations, and payment gateways.',
    },
]

onMounted(async () => {
    try {
        const { data } = await api.get('/settings')
        const list = data.data?.data ?? data.data ?? (Array.isArray(data) ? data : [])
        if (Array.isArray(list)) {
            settings.value = list.reduce((acc, s) => {
                if (s && s.key) acc[s.key] = s.value
                return acc
            }, {})
        } else if (typeof list === 'object' && list !== null) {
            settings.value = list
        }
    } catch (e) {
        console.warn('Could not load about settings:', e.message)
    }
})
</script>
