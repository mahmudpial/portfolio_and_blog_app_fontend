<template>
    <footer style="background:#05080F;border-top:1px solid #0f1f38;position:relative;overflow:hidden;">

        <!-- Background effects -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute" style="width:600px;height:400px;bottom:-200px;left:-100px;border-radius:50%;
        background:radial-gradient(circle,#3B82F615 0%,transparent 70%);filter:blur(60px);"></div>
            <div class="absolute" style="width:400px;height:300px;bottom:-100px;right:-50px;border-radius:50%;
        background:radial-gradient(circle,#1e40af12 0%,transparent 70%);filter:blur(50px);"></div>
            <div class="absolute inset-0" style="background-image:radial-gradient(circle,#3B82F608 1px,transparent 1px);
        background-size:32px 32px;opacity:0.4;"></div>
        </div>

        <!-- ── MAIN FOOTER ──────────────────────────────────────── -->
        <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-10">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

                <!-- Col 1 — Brand (5 cols) -->
                <div class="md:col-span-5">
                    <!-- Logo -->
                    <div class="flex items-center gap-2 mb-5">
                        <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">
                            Pial
                        </span>
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-500 mt-0.5" style="box-shadow:0 0 10px #3B82F6,0 0 20px #3B82F640;
              animation:logoPulse 2s ease-in-out infinite;"></span>
                        <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">
                            Dev
                        </span>
                    </div>

                    <p class="text-sm leading-relaxed mb-6"
                        style="color:#A8C4E8;font-family:system-ui;max-width:320px;line-height:1.8;">
                        Full-stack developer crafting fast, accessible, and beautiful
                        web applications. Open to freelance projects and full-time
                        opportunities.
                    </p>

                    <!-- Available badge -->
                    <div class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border mb-6"
                        style="background:#052e16;border-color:#16a34a30;">
                        <span class="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                            style="box-shadow:0 0 6px #4ade80;animation:greenPulse 2s infinite;"></span>
                        <span class="text-sm font-medium" style="color:#4ade80;font-family:system-ui;">
                            Available for hire
                        </span>
                    </div>

                    <!-- Tech stack badges -->
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tech in techStack" :key="tech" class="text-xs px-3 py-1.5 rounded-full border"
                            style="background:#0D1220;border-color:#1e3a5f;
              color:#A8C4E8;font-family:system-ui;">
                            {{ tech }}
                        </span>
                    </div>
                </div>

                <!-- Col 2 — Navigation (2 cols) -->
                <div class="md:col-span-2">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">
                        Navigation
                    </p>
                    <ul class="space-y-3">
                        <li v-for="link in navLinks" :key="link.to">
                            <RouterLink :to="link.to" class="flex items-center gap-2 text-sm transition-all group"
                                style="color:#A8C4E8;font-family:system-ui;text-decoration:none;"
                                onmouseover="this.style.color='#60A5FA';this.style.paddingLeft='4px'"
                                onmouseout="this.style.color='#A8C4E8';this.style.paddingLeft='0'">
                                <span class="w-1 h-1 rounded-full flex-shrink-0"
                                    style="background:#1e3a5f;transition:background .2s;"></span>
                                {{ link.label }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Col 3 — Services (2 cols) -->
                <div class="md:col-span-2">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">
                        Services
                    </p>
                    <ul class="space-y-3">
                        <li v-for="svc in services" :key="svc" class="flex items-center gap-2 text-sm"
                            style="color:#A8C4E8;font-family:system-ui;">
                            <span class="w-1 h-1 rounded-full flex-shrink-0" style="background:#1e3a5f;"></span>
                            {{ svc }}
                        </li>
                    </ul>
                </div>

                <!-- Col 4 — Contact (3 cols) -->
                <div class="md:col-span-3">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">
                        Contact
                    </p>

                    <div class="space-y-4 mb-6">
                        <a v-for="info in contactInfo" :key="info.label" :href="info.href"
                            :target="info.href.startsWith('mailto:') ? '_blank' : null"
                            :rel="info.href.startsWith('mailto:') ? 'noopener noreferrer' : null"
                            class="flex items-center gap-3 p-3 rounded-xl border transition-all
                     hover:-translate-y-0.5 group"
                            style="background:#0D1220;border-color:#1e3a5f;text-decoration:none;"
                            onmouseover="this.style.borderColor='#3B82F640'"
                            onmouseout="this.style.borderColor='#1e3a5f'">
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style="background:#3B82F615;border:1px solid #3B82F625;">
                                <svg :viewBox="info.vb" width="14" height="14" fill="none" stroke="#60A5FA"
                                    stroke-width="2" v-html="info.svgPath"></svg>
                            </div>
                            <div>
                                <div class="text-xs uppercase tracking-wider mb-0.5"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.1em;">
                                    {{ info.label }}
                                </div>
                                <div class="text-sm font-medium text-white" style="font-family:system-ui;">{{ info.value
                                }}</div>
                            </div>
                        </a>
                    </div>

                    <!-- CTA -->
                    <RouterLink :to="{ path: '/contact', hash: '#contact-form' }" class="flex items-center justify-center gap-2 py-3 rounded-xl text-sm
                   font-semibold text-white transition-all hover:scale-105 w-full"
                        style="background:#3B82F6;box-shadow:0 0 20px #3B82F635;font-family:system-ui;">
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
                style="background:linear-gradient(90deg,transparent,#1e3a5f,#3B82F630,#1e3a5f,transparent);">
            </div>

            <!-- ── BOTTOM BAR ────────────────────────────────────── -->
            <div class="flex flex-col md:flex-row items-center justify-between gap-5">

                <!-- Copyright -->
                <div class="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                    <p class="text-sm" style="color:#475569;font-family:system-ui;">
                        © {{ new Date().getFullYear() }}
                        <span class="font-semibold" style="color:#A8C4E8;">PialDev-</span>
                        Crafted with
                        <span class="font-semibold" style="color:#60A5FA;"> Pial Mahmud</span>
                    </p>


                </div>

                <!-- Right — Socials + scroll top -->
                <div class="flex items-center gap-3">
                    <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" :aria-label="s.label" class="w-9 h-9 rounded-xl border flex items-center justify-center
         transition-all hover:scale-110 hover:-translate-y-0.5"
                        style="background:#0D1220;border-color:#1e3a5f;color:#A8C4E8;"
                        :onmouseover="s.label === 'Fiverr'
                            ? `this.style.borderColor='#1dbf73';this.style.color='#1dbf73';this.style.boxShadow='0 0 10px #1dbf7330'`
                            : `this.style.borderColor='#3B82F6';this.style.color='#60A5FA';this.style.boxShadow='0 0 10px #3B82F630'`"
                        :onmouseout="s.label === 'Fiverr'
                            ? `this.style.borderColor='#1e3a5f';this.style.color='#A8C4E8';this.style.boxShadow='none'`
                            : `this.style.borderColor='#1e3a5f';this.style.color='#A8C4E8';this.style.boxShadow='none'`">
                        <!-- GitHub -->
                        <svg v-if="s.label === 'GitHub'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <!-- LinkedIn -->
                        <svg v-else-if="s.label === 'LinkedIn'" width="16" height="16" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                        <!-- Fiverr -->
                        <svg v-else-if="s.label === 'Fiverr'" width="18" height="18" viewBox="0 0 32 32"
                            fill="currentColor">
                            <path
                                d="M7 32V14h3.5v-1.5C10.5 9 12.5 7 16 7h3v5h-2.5c-1 0-1.5.5-1.5 1.5V14H18.5v5H15V32H7z" />
                            <circle cx="22.5" cy="8.5" r="3" />
                            <rect x="20" y="14" width="5" height="18" rx="1" />
                        </svg>
                        <!-- Globe -->
                        <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path
                                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    </a>
                    <!-- Divider -->
                    <div class="w-px h-6" style="background:#1e3a5f;"></div>

                    <!-- Scroll to top -->
                    <button @click="scrollToTop()" class="w-9 h-9 rounded-xl border flex items-center justify-center
                   transition-all hover:scale-110 hover:-translate-y-0.5"
                        style="background:#0D1220;border-color:#1e3a5f;color:#A8C4E8;"
                        onmouseover="this.style.borderColor='#3B82F6';this.style.color='#60A5FA';this.style.boxShadow='0 0 10px #3B82F630'"
                        onmouseout="this.style.borderColor='#1e3a5f';this.style.color='#A8C4E8';this.style.boxShadow='none'"
                        title="Back to top">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
@keyframes greenPulse {

    0%,
    100% {
        box-shadow: 0 0 6px #4ade80;
    }

    50% {
        box-shadow: 0 0 14px #4ade80, 0 0 28px #4ade8060;
    }
}

@keyframes logoPulse {

    0%,
    100% {
        box-shadow: 0 0 10px #3B82F6, 0 0 20px #3B82F640;
    }

    50% {
        box-shadow: 0 0 16px #3B82F6, 0 0 32px #3B82F680;
    }
}
</style>

<script setup>
const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/skills', label: 'Skills' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
]

const services = [
    'Web Development',
    'REST API Design',
    'UI/UX ',
    'Cloud Deployment',
    'Code Review',
    'Technical Support',
]

const techStack = [
    'Laravel', 'Vue.js 3', 'MySQL',
    'Tailwind CSS', 'PHP', 'REST API',
]

const contactInfo = [
    {
        label: 'Email',
        value: 'hello@pialcodes.com',
        href: 'mailto:hello@pialcodes.com',
        vb: '0 0 24 24',
        svgPath: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>`,
    },
    {
        label: 'Location',
        value: 'Dhaka, Bangladesh',
        href: '#',
        vb: '0 0 24 24',
        svgPath: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>`,
    },
]

const socials = [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/pial-mahmud/' },
    { label: 'Fiverr', url: 'https://www.fiverr.com/s/akD7e5g' },
    { label: 'Website', url: '#' },
]

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
