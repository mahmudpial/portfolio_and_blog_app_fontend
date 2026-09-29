<template>
    <div class="min-h-screen transition-colors duration-300" :style="`background: var(--color-background);`">
        <!-- ── HERO SECTION ─────────────────────────────────────── -->
        <section class="relative pt-32 pb-20 px-6 md:px-16 overflow-hidden">
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:600px;height:600px;top:-200px;right:-100px;border-radius:50%;
                    background:radial-gradient(circle,var(--brand-primary)20%,transparent 70%);filter:blur(60px);opacity:0.15;"></div>
                <div class="absolute inset-0" style="background-image:radial-gradient(circle,var(--brand-primary) 1px,transparent 1px);
                    background-size:32px 32px;opacity:0.2;"></div>
            </div>

            <div class="relative z-10 max-w-4xl mx-auto text-center">
                <p class="text-xs font-bold uppercase tracking-widest mb-4"
                    style="color:var(--brand-primary);font-family:system-ui;letter-spacing:.2em;">About Me</p>
                <h1 class="font-bold leading-tight mb-6"
                    style="font-size:clamp(32px,5vw,56px);font-family:'Georgia',serif;color:var(--color-heading);">
                    Crafting Digital <span style="color:var(--brand-secondary);">Experiences</span>
                </h1>
                <p class="text-base leading-relaxed mb-10 mx-auto opacity-80"
                    style="color:var(--color-text);font-family:system-ui;max-width:600px;line-height:1.8;">
                    {{ settings['about_description'] || 'Loading my story...' }}
                </p>
                <div class="mx-auto w-12 h-0.5 rounded-full"
                    style="background:linear-gradient(90deg,transparent,var(--brand-primary),transparent);"></div>
            </div>
        </section>

        <!-- ── CONTENT SECTION ────────────────────────────────────── -->
        <section class="py-20 px-6 md:px-16">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-2 gap-16 items-center">
                    <!-- Image Side -->
                    <div class="relative">
                        <div class="relative z-10 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                            <img v-if="settings['about_image']" :src="settings['about_image']" alt="About Me" class="w-full h-auto object-cover" />
                            <div v-else class="aspect-square bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
                                <span class="text-6xl">👨‍💻</span>
                            </div>
                        </div>
                        <!-- Decorative elements -->
                        <div class="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-3xl opacity-30" style="background:var(--brand-primary);"></div>
                        <div class="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-30" style="background:var(--brand-secondary);"></div>
                    </div>

                    <!-- Text Side -->
                    <div class="space-y-8">
                        <div class="space-y-4">
                            <h2 class="text-3xl font-bold" style="font-family:'Georgia',serif;color:var(--color-heading);">
                                {{ settings['about_title'] || 'My Journey' }}
                            </h2>
                            <p class="text-base leading-relaxed opacity la-80" style="color:var(--color-text);font-family:system-ui;">
                                I am a passionate Full-Stack Developer dedicated to building scalable, high-performance web applications.
                                With a strong foundation in Laravel and Vue.js, I focus on writing clean, maintainable code
                                and creating intuitive user interfaces.
                            </p>
                            <p class="text-base leading-relaxed opacity la-80" style="color:var(--color-text);font-family:system-ui;">
                                My approach combines technical rigor with a deep understanding of user needs,
                                ensuring that every line of code contributes to a meaningful business outcome.
                            </p>
                        </div>

                        <!-- Key Pillars -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div v-for="pillar in pillars" :key="pillar.label" class="p-4 rounded-2xl border transition-all hover:bg-white/5"
                                style="background:var(--color-background-soft);border-color:var(--color-border);">
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-xl">{{ pillar.icon }}</span>
                                    <span class="font-bold text-sm" style="color:var(--brand-primary);">{{ pillar.label }}</span>
                                </div>
                                <p class="text-xs opacity-60" style="color:var(--color-text);">{{ pillar.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'

const settings = ref({})

const pillars = [
    { label: 'Clean Code', icon: '✨', desc: 'Writing scalable and maintainable software.' },
    { label: 'Performance', icon: '⚡', desc: 'Optimizing for speed and efficiency.' },
    { label: 'User-Centric', icon: '🎯', java: 'Designing for the end user.' },
    { label: 'Continuous Learning', icon: '📚', desc: 'Always evolving with new tech.' },
]

onMounted(async () => {
    try {
        const { data } = await api.get('/settings')
        const s = data.data || []
        settings.value = s.reduce((acc, item) => {
            acc[item.key] = item.value
            return acc
        }, {})
    } catch (e) {
        console.warn('Could not load about settings:', e.message)
    }
})
</script>

<style scoped>
.transition-all { transition: all 0.3s ease; }
</style>
