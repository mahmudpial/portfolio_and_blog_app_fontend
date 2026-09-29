<template>
    <footer style="background:#0A0610;border-top:1px solid #241730;position:relative;overflow:hidden;">

        <!-- Background effects -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute" style="width:600px;height:400px;bottom:-200px;left:-100px;border-radius:50%;
        background:radial-gradient(circle,#8B5CF615 0%,transparent 70%);filter:blur(60px);"></div>
            <div class="absolute" style="width:400px;height:300px;bottom:-100px;right:-50px;border-radius:50%;
        background:radial-gradient(circle,#6D28D912 0%,transparent 70%);filter:blur(50px);"></div>
            <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF608 1px,transparent 1px);
        background-size:32px 32px;opacity:0.4;"></div>
        </div>

        <!-- ── MAIN FOOTER ──────────────────────────────────────── -->
        <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

                <!-- Col 1 — Brand & Socials (5 cols) -->
                <div class="md:col-span-5">
                    <!-- Logo -->
                    <RouterLink to="/" class="inline-flex items-center gap-2 mb-5 group text-decoration-none">
                        <span class="text-2xl font-bold text-white tracking-tight" style="font-family:'Georgia',serif;">
                            {{ settings['brand_name'] || 'Pial' }}
                        </span>
                        <span class="w-2.5 h-2.5 rounded-full bg-violet-500 mt-0.5" style="box-shadow:0 0 10px #8B5CF6,0 0 20px #8B5CF640;
              animation:logoPulse 2s ease-in-out infinite;"></span>
                        <span class="text-2xl font-bold text-white tracking-tight" style="font-family:'Georgia',serif;">
                            Dev
                        </span>
                    </RouterLink>

                    <p class="text-sm leading-relaxed mb-6"
                        style="color:#C9B9E8;font-family:system-ui;max-width:380px;line-height:1.8;">
                        {{ settings['footer_bio'] || 'I build multi-tenant systems with role-based access control that actually hold up under real use cases. Specializing in high-performance Laravel architectures, reactive Vue 3 applications, and resilient cloud infrastructures.' }}
                    </p>

                    <!-- Social Icons Section directly under subheading -->
                    <div class="flex flex-wrap items-center gap-2.5 pt-1">
                        <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" rel="noopener noreferrer"
                            :aria-label="s.label" :title="s.label"
                            class="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group text-decoration-none"
                            :style="`background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;`"
                            :onmouseover="`this.style.borderColor='${s.hoverColor}';this.style.color='${s.hoverColor}';this.style.boxShadow='0 0 14px ${s.glowColor}'`"
                            :onmouseout="`this.style.borderColor='#3B2A5A';this.style.color='#C9B9E8';this.style.boxShadow='none'`">
                            
                            <!-- GitHub -->
                            <svg v-if="s.label === 'GitHub'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>

                            <!-- LinkedIn -->
                            <svg v-else-if="s.label === 'LinkedIn'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>

                            <!-- Discord -->
                            <svg v-else-if="s.label === 'Discord'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>

                            <!-- Slack -->
                            <svg v-else-if="s.label === 'Slack'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                            </svg>

                            <!-- Upwork -->
                            <svg v-else-if="s.label === 'Upwork'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                            </svg>

                            <!-- Website / Globe -->
                            <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Col 2 — Navigation (2 cols) -->
                <div class="md:col-span-2">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">
                        Navigation
                    </p>
                    <ul class="space-y-3 p-0 m-0 list-none">
                        <li v-for="link in navLinks" :key="link.to">
                            <RouterLink :to="link.to" class="flex items-center gap-2 text-sm transition-all group"
                                style="color:#C9B9E8;font-family:system-ui;text-decoration:none;"
                                onmouseover="this.style.color='#C084FC';this.style.paddingLeft='4px'"
                                onmouseout="this.style.color='#C9B9E8';this.style.paddingLeft='0'">
                                <span class="w-1 h-1 rounded-full flex-shrink-0"
                                    style="background:#3B2A5A;transition:background .2s;"></span>
                                {{ link.label }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Col 3 — Top Services (2 cols) -->
                <div class="md:col-span-2">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">
                        Top Services
                    </p>
                    <ul class="space-y-3 p-0 m-0 list-none">
                        <li v-for="svc in displayedServices" :key="svc.name || svc.title || svc">
                            <RouterLink v-if="svc.id" :to="`/services/${svc.id}`"
                                class="flex items-center gap-2 text-sm transition-all group"
                                style="color:#C9B9E8;font-family:system-ui;text-decoration:none;"
                                onmouseover="this.style.color='#C084FC';this.style.paddingLeft='4px'"
                                onmouseout="this.style.color='#C9B9E8';this.style.paddingLeft='0'">
                                <span class="w-1 h-1 rounded-full flex-shrink-0"
                                    style="background:#3B2A5A;transition:background .2s;"></span>
                                <span>{{ svc.title || svc.name }}</span>
                            </RouterLink>
                            <RouterLink v-else :to="{ path: '/contact', hash: '#contact-form' }"
                                class="flex items-center gap-2 text-sm transition-all group"
                                style="color:#C9B9E8;font-family:system-ui;text-decoration:none;"
                                onmouseover="this.style.color='#C084FC';this.style.paddingLeft='4px'"
                                onmouseout="this.style.color='#C9B9E8';this.style.paddingLeft='0'">
                                <span class="w-1 h-1 rounded-full flex-shrink-0"
                                    style="background:#3B2A5A;transition:background .2s;"></span>
                                <span>{{ svc }}</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Col 4 — Contact (3 cols) -->
                <div class="md:col-span-3">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">
                        Contact
                    </p>

                    <div class="space-y-4 mb-6">
                        <a v-for="info in contactInfo" :key="info.label" :href="info.href"
                            :target="info.href.startsWith('http') ? '_blank' : null"
                            :rel="info.href.startsWith('http') ? 'noopener noreferrer' : null" class="flex items-center gap-3 p-3 rounded-xl border transition-all
                     hover:-translate-y-0.5 group"
                            style="background:#120E1C;border-color:#3B2A5A;text-decoration:none;"
                            onmouseover="this.style.borderColor='#8B5CF640'"
                            onmouseout="this.style.borderColor='#3B2A5A'">
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style="background:#8B5CF615;border:1px solid #8B5CF625;">
                                <svg :viewBox="info.vb" width="14" height="14" fill="none" stroke="#C084FC"
                                    stroke-width="2" v-html="info.svgPath"></svg>
                            </div>
                            <div class="overflow-hidden">
                                <div class="text-xs uppercase tracking-wider mb-0.5"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.1em;">
                                    {{ info.label }}
                                </div>
                                <div class="text-sm font-medium text-white truncate" style="font-family:system-ui;">
                                    {{ info.value }}
                                </div>
                            </div>
                        </a>
                    </div>

                    <!-- CTA -->
                    <RouterLink :to="{ path: '/contact', hash: '#contact-form' }" class="flex items-center justify-center gap-2 py-3 rounded-xl text-sm
                   font-semibold text-white transition-all hover:scale-105 w-full text-decoration-none"
                        style="background:#8B5CF6;box-shadow:0 0 20px #8B5CF635;font-family:system-ui;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Start a Conversation
                    </RouterLink>
                </div>
            </div>

            <!-- ── DIVIDER ───────────────────────────────────────── -->
            <div class="w-full h-px mb-8"
                style="background:linear-gradient(90deg,transparent,#3B2A5A,#8B5CF630,#3B2A5A,transparent);">
            </div>

            <!-- ── BOTTOM BAR ────────────────────────────────────── -->
            <div class="flex flex-col md:flex-row items-center justify-between gap-5">

                <!-- Copyright & Professional Attribution -->
                <div class="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                    <p class="text-xs md:text-sm m-0 text-slate-400 flex flex-wrap items-center justify-center md:justify-start gap-x-2.5 gap-y-1" style="font-family:system-ui;">
                        <span>
                            © {{ new Date().getFullYear() }}
                            <span class="font-semibold text-white">{{ settings['full_name'] || 'Pial Mahmud' }}</span>.
                            All rights reserved.
                        </span>
                        <span class="hidden md:inline" style="color:#3B2A5A;">•</span>
                        <span class="text-purple-300/80">
                            {{ settings['footer_copyright'] || 'Engineered with precision, security & high performance.' }}
                        </span>
                    </p>
                </div>

                <!-- Scroll to top -->
                <div class="flex items-center gap-3">
                    <button @click="scrollToTop()" class="flex items-center gap-2 px-3.5 py-2 rounded-xl border
                   transition-all hover:scale-105 hover:-translate-y-0.5 cursor-pointer text-xs font-semibold"
                        style="background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;"
                        onmouseover="this.style.borderColor='#8B5CF6';this.style.color='#C084FC';this.style.boxShadow='0 0 10px #8B5CF630'"
                        onmouseout="this.style.borderColor='#3B2A5A';this.style.color='#C9B9E8';this.style.boxShadow='none'"
                        title="Back to top" aria-label="Back to top">
                        <span>Back to top</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
@keyframes logoPulse {
    0%, 100% { box-shadow: 0 0 8px #8B5CF6, 0 0 16px #8B5CF640; }
    50% { box-shadow: 0 0 16px #8B5CF6, 0 0 32px #8B5CF680; }
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/axios'

const settings = ref({})
const rawServices = ref([])

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
]

const defaultServices = [
    { id: 1, title: 'Full-Stack Web Engineering' },
    { id: 2, title: 'RESTful API & Backend' },
    { id: 3, title: 'Custom CMS & Dashboards' },
    { id: 5, title: 'Payment Gateway Integration' },
]

const displayedServices = computed(() => {
    if (rawServices.value && rawServices.value.length > 0) {
        return rawServices.value.slice(0, 4)
    }
    return defaultServices
})

const contactInfo = computed(() => [
    {
        label: 'Email',
        value: settings.value['email'] || 'hello@pialcodes.com',
        href: `mailto:${settings.value['email'] || 'hello@pialcodes.com'}`,
        vb: '0 0 24 24',
        svgPath: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>`,
    },
    {
        label: 'Location',
        value: settings.value['location'] || 'Dhaka, Bangladesh',
        href: 'https://maps.google.com/?q=Dhaka,Bangladesh',
        vb: '0 0 24 24',
        svgPath: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>`,
    },
])

const socials = computed(() => [
    {
        label: 'GitHub',
        url: settings.value['github_url'] || 'https://github.com/mahmudpial',
        hoverColor: '#C084FC',
        glowColor: '#8B5CF635',
    },
    {
        label: 'LinkedIn',
        url: settings.value['linkedin_url'] || 'https://www.linkedin.com/in/pial-mahmud/',
        hoverColor: '#0A66C2',
        glowColor: '#0A66C235',
    },
    {
        label: 'Discord',
        url: settings.value['discord_url'] || 'https://discord.com',
        hoverColor: '#5865F2',
        glowColor: '#5865F235',
    },
    {
        label: 'Slack',
        url: settings.value['slack_url'] || 'https://slack.com',
        hoverColor: '#E01E5A',
        glowColor: '#E01E5A35',
    },
    {
        label: 'Upwork',
        url: settings.value['upwork_url'] || 'https://www.upwork.com/freelancers/~01e5ccd10431c78406?mp_source=share',
        hoverColor: '#6fda44',
        glowColor: '#6fda4435',
    },
    {
        label: 'Website',
        url: settings.value['website_url'] || 'https://pialsoftdev.me',
        hoverColor: '#38BDF8',
        glowColor: '#38BDF835',
    },
])

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function loadData() {
    try {
        const [settingsRes, servicesRes] = await Promise.allSettled([
            api.get('/settings'),
            api.get('/services')
        ])

        if (settingsRes.status === 'fulfilled' && settingsRes.value?.data) {
            const data = settingsRes.value.data
            const list = data.data?.data ?? data.data ?? (Array.isArray(data) ? data : [])
            if (Array.isArray(list)) {
                settings.value = list.reduce((acc, s) => {
                    if (s && s.key) acc[s.key] = s.value
                    return acc
                }, {})
            } else if (typeof list === 'object' && list !== null) {
                settings.value = list
            }
        }

        if (servicesRes.status === 'fulfilled' && servicesRes.value?.data) {
            const data = servicesRes.value.data
            rawServices.value = data.data || []
        }
    } catch {
        // Fallback gracefully
    }
}

onMounted(() => {
    loadData()
})
</script>
