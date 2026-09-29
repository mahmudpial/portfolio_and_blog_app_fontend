<template>
    <div style="background:#0A0610;min-height:100vh;">

        <!-- ── LOADING ─────────────────────────────────────────── -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen gap-3" style="color:#C9B9E8;">
            <svg class="animate-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6"
                stroke-width="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span style="font-family:system-ui;">Loading service details...</span>
        </div>

        <!-- ── NOT FOUND ───────────────────────────────────────── -->
        <div v-else-if="!currentService" class="flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-violet-400"
                style="background:#120E1C;border:1px solid #3B2A5A;">
                <ServiceIcon name="code" :size="32" />
            </div>
            <h1 class="text-white font-bold text-2xl" style="font-family:'Georgia',serif;">
                Service Not Found
            </h1>
            <p class="text-sm opacity-60 max-w-md" style="color:#C9B9E8;font-family:system-ui;">
                The requested service could not be located. Please check our other available services.
            </p>
            <RouterLink to="/" class="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 text-white"
                style="background:#8B5CF6;font-family:system-ui;">
                Back to Home
            </RouterLink>
        </div>

        <!-- ── SERVICE DETAIL VIEW ─────────────────────────────── -->
        <div v-else>

            <!-- ── HERO SECTION ─────────────────────────────────── -->
            <section class="relative overflow-hidden" style="padding-top:2rem;padding-bottom:2.5rem;border-bottom:1px solid #241730;">
                <!-- Ambient glow backgrounds -->
                <div class="absolute inset-0 pointer-events-none">
                    <div class="absolute" style="width:600px;height:400px;top:-150px;left:50%;
                        transform:translateX(-50%);border-radius:50%;
                        background:radial-gradient(circle,#6D28D920 0%,transparent 70%);filter:blur(60px);"></div>
                    <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF610 1px,transparent 1px);
                        background-size:32px 32px;opacity:0.5;"></div>
                </div>

                <div class="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8">
                    <!-- Breadcrumbs -->
                    <div class="flex items-center gap-2 mb-4 text-xs" style="color:#94A3B8;font-family:system-ui;">
                        <RouterLink to="/" class="transition-colors hover:text-violet-400" style="color:#94A3B8;">Home</RouterLink>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span style="color:#64748B;">Services</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span style="color:#C9B9E8;">{{ currentService.title || currentService.name }}</span>
                    </div>

                    <!-- Top Badges & Meta -->
                    <div class="flex items-center gap-3 mb-4 flex-wrap">
                        <span class="text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2"
                            style="background:#8B5CF620;color:#C084FC;border:1px solid #8B5CF640;font-family:system-ui;">
                            <ServiceIcon :name="currentService.icon || 'code'" :size="14" />
                            <span>{{ serviceDetails.badge_text || 'Professional Service' }}</span>
                        </span>
                        <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-2"
                            style="background:#052e16;color:#4ade80;border:1px solid #16a34a30;font-family:system-ui;">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-400" style="box-shadow:0 0 6px #4ade80;"></span>
                            Available for New Projects
                        </span>
                        <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-2"
                            style="background:#120E1C;color:#C9B9E8;border:1px solid #3B2A5A;font-family:system-ui;">
                            <ServiceIcon name="clock" :size="14" class="text-violet-400" />
                            <span>Delivery: {{ serviceDetails.timeline || '7-14 Days' }}</span>
                        </span>
                        <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-2"
                            style="background:#120E1C;color:#F59E0B;border:1px solid #F59E0B30;font-family:system-ui;">
                            <ServiceIcon name="shield" :size="14" class="text-amber-400" />
                            <span>{{ serviceDetails.support_guarantee || '30 Days Free Support' }}</span>
                        </span>
                    </div>

                    <!-- Main Title & Tagline -->
                    <div class="max-w-3xl">
                        <h1 class="font-bold text-white mb-4 leading-tight tracking-tight"
                            style="font-size:clamp(28px,4.5vw,46px);font-family:'Georgia',serif;">
                            {{ currentService.title || currentService.name }}
                        </h1>
                        <p class="text-base leading-relaxed" style="color:#C9B9E8;font-family:system-ui;line-height:1.8;">
                            {{ currentService.description }}
                        </p>
                    </div>
                </div>
            </section>

            <!-- ── MAIN CONTENT & SIDEBAR ───────────────────────── -->
            <section class="py-12 px-6 md:px-8">
                <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                    <!-- ── LEFT CONTENT (2/3) ───────────────────── -->
                    <div class="lg:col-span-2 space-y-10">

                        <!-- ① Overview & Value Proposition -->
                        <div class="rounded-3xl border p-8" style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="flex items-center gap-3.5 mb-5">
                                <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-violet-400"
                                    style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                    <ServiceIcon name="sparkles" :size="20" />
                                </div>
                                <h2 class="text-white text-xl font-bold font-serif">What This Service Offers</h2>
                            </div>
                            <p class="text-sm leading-relaxed mb-6" style="color:#C9B9E8;font-family:system-ui;line-height:1.85;">
                                {{ serviceDetails.overview || currentService.description }}
                            </p>
                            <div v-if="serviceDetails.highlights && serviceDetails.highlights.length" class="grid sm:grid-cols-2 gap-4 pt-4 border-t" style="border-color:#241730;">
                                <div v-for="(highlight, idx) in serviceDetails.highlights" :key="idx"
                                    class="flex items-start gap-3 p-4 rounded-2xl transition-colors hover:border-purple-500/40"
                                    style="background:rgba(25, 18, 38, 0.4);border:1px solid rgba(139, 92, 246, 0.15);">
                                    <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                        style="background:#8B5CF625;color:#C084FC;">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span class="text-xs font-medium text-white/90" style="font-family:system-ui;line-height:1.5;">
                                        {{ highlight }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- ② Delivery Workflow / How It Works -->
                        <div v-if="workflowSteps && workflowSteps.length" class="rounded-3xl border p-8" style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="flex items-center justify-between mb-8 flex-wrap gap-2">
                                <div class="flex items-center gap-3.5">
                                    <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-violet-400"
                                        style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                        <ServiceIcon name="workflow" :size="20" />
                                    </div>
                                    <div>
                                        <h2 class="text-white text-xl font-bold font-serif">How I Deliver Your Project</h2>
                                        <p class="text-xs opacity-60" style="color:#C9B9E8;font-family:system-ui;">Transparent, step-by-step workflow from idea to deployment</p>
                                    </div>
                                </div>
                                <span class="text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider"
                                    style="background:#8B5CF615;color:#C084FC;border:1px solid #8B5CF630;">
                                    {{ workflowSteps.length }}-Step Agile Process
                                </span>
                            </div>

                            <div class="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-transparent before:opacity-30">
                                <div v-for="(step, idx) in workflowSteps" :key="idx" class="relative flex items-start gap-5">
                                    <!-- Step Number Bubble -->
                                    <div class="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm text-white shrink-0 z-10 font-serif"
                                        :style="idx === 0 ? 'background:linear-gradient(135deg,#8B5CF6,#6D28D9);box-shadow:0 0 16px #8B5CF650;' : 'background:#180F28;border:1px solid #3B2A5A;'">
                                        {{ idx + 1 }}
                                    </div>
                                    <div class="flex-1 p-5 rounded-2xl border transition-all hover:border-purple-500/40"
                                        style="background:rgba(25, 18, 38, 0.4);border-color:rgba(139, 92, 246, 0.15);">
                                        <h3 class="text-white font-bold text-sm mb-1.5" style="font-family:system-ui;">
                                            {{ step.title }}
                                        </h3>
                                        <p class="text-xs leading-relaxed" style="color:#C9B9E8;font-family:system-ui;">
                                            {{ step.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ③ Technologies & Tools -->
                        <div v-if="techStack && techStack.length" class="rounded-3xl border p-8" style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="flex items-center gap-3.5 mb-6">
                                <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-violet-400"
                                    style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                    <ServiceIcon name="code" :size="20" />
                                </div>
                                <div>
                                    <h2 class="text-white text-xl font-bold font-serif">Tech Stack &amp; Tools</h2>
                                    <p class="text-xs opacity-60" style="color:#C9B9E8;font-family:system-ui;">Battle-tested modern stack used for this service</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div v-for="tech in techStack" :key="tech.name"
                                    class="p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:border-purple-500/50"
                                    style="background:rgba(25, 18, 38, 0.5);border-color:rgba(139, 92, 246, 0.15);">
                                    <div class="text-xs font-bold text-white mb-1" style="font-family:system-ui;">{{ tech.name }}</div>
                                    <div class="text-[11px] text-violet-300 opacity-70" style="font-family:system-ui;">{{ tech.role }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- ④ Security, Architecture & Quality Standards -->
                        <div class="rounded-3xl border p-8" style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="flex items-center gap-3.5 mb-6">
                                <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-violet-400"
                                    style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                    <ServiceIcon name="shield" :size="20" />
                                </div>
                                <div>
                                    <h2 class="text-white text-xl font-bold font-serif">Security &amp; Performance Standards</h2>
                                    <p class="text-xs opacity-60" style="color:#C9B9E8;font-family:system-ui;">Zero compromise on speed, safety, and scalability</p>
                                </div>
                            </div>

                            <div class="grid sm:grid-cols-2 gap-4">
                                <div v-for="sec in securityStandards" :key="sec.title"
                                    class="p-5 rounded-2xl border transition-colors hover:border-purple-500/40"
                                    style="background:rgba(25, 18, 38, 0.4);border-color:rgba(139, 92, 246, 0.15);">
                                    <div class="w-8 h-8 rounded-xl flex items-center justify-center mb-3 text-violet-400"
                                        style="background:#8B5CF615;border:1px solid #8B5CF630;">
                                        <ServiceIcon :name="sec.iconName" :size="16" />
                                    </div>
                                    <h4 class="text-white font-bold text-xs mb-1.5" style="font-family:system-ui;">{{ sec.title }}</h4>
                                    <p class="text-xs opacity-70 leading-relaxed" style="color:#C9B9E8;font-family:system-ui;">
                                        {{ sec.desc }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ⑤ Included Deliverables -->
                        <div v-if="deliverables && deliverables.length" class="rounded-3xl border p-8" style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="flex items-center gap-3.5 mb-6">
                                <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-violet-400"
                                    style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                    <ServiceIcon name="package" :size="20" />
                                </div>
                                <h2 class="text-white text-xl font-bold font-serif">What You Will Receive (Deliverables)</h2>
                            </div>

                            <ul class="space-y-3.5">
                                <li v-for="(del, i) in deliverables" :key="i" class="flex items-start gap-3 text-sm" style="color:#C9B9E8;font-family:system-ui;">
                                    <span class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                                        style="background:#052e16;color:#4ade80;border:1px solid #16a34a40;">
                                        ✓
                                    </span>
                                    <span>{{ del }}</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <!-- ── RIGHT SIDEBAR (1/3) ──────────────────── -->
                    <div class="space-y-6 lg:sticky lg:top-24">

                        <!-- Booking & CTA Card -->
                        <div class="rounded-3xl border p-7 text-center overflow-hidden relative"
                            style="background:linear-gradient(135deg,#120E1C,#1E1430);border-color:#8B5CF640;box-shadow:0 15px 35px -10px #8B5CF625;">
                            
                            <!-- Header badge -->
                            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4"
                                style="background:#8B5CF620;color:#C084FC;border:1px solid #8B5CF640;font-family:system-ui;">
                                <ServiceIcon name="sparkles" :size="12" />
                                <span>Direct Project Booking</span>
                            </div>

                            <h3 class="text-white font-bold text-xl font-serif mb-2">Ready to Start?</h3>
                            <p class="text-xs opacity-70 mb-6" style="color:#C9B9E8;font-family:system-ui;line-height:1.6;">
                                Let's build something exceptional for your business. Get a detailed plan and quote today.
                            </p>

                            <!-- Pricing Badge -->
                            <div class="p-4 rounded-2xl mb-6 border" style="background:#0A0610;border-color:#3B2A5A;">
                                <div class="text-[11px] uppercase tracking-wider font-semibold opacity-60" style="color:#C9B9E8;font-family:system-ui;">
                                    Estimated Starting Budget
                                </div>
                                <div class="text-3xl font-bold text-white mt-1 font-serif">
                                    {{ serviceDetails.startingPrice || '$250 - $650' }}
                                </div>
                                <div class="text-[11px] text-violet-400 mt-1 font-medium" style="font-family:system-ui;">
                                    {{ serviceDetails.pricing_note || 'Custom milestones & flexible payment terms' }}
                                </div>
                            </div>

                            <!-- Hire Button -->
                            <button @click="hireThisService"
                                class="w-full py-4 text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg mb-4 cursor-pointer border-0"
                                style="background:#8B5CF6;box-shadow:0 8px 25px -4px #8B5CF660;font-family:system-ui;">
                                <span>{{ serviceDetails.cta_button_text || 'Get Started with this Service' }}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>

                            <!-- Direct Fast Connect Buttons with clean SVGs -->
                            <div class="space-y-2.5 pt-2">
                                <a :href="serviceDetails.cta_email ? `mailto:${serviceDetails.cta_email}` : 'mailto:hello@pialcodes.com'"
                                    class="w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2.5 transition-all hover:bg-white/5"
                                    style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    <span>Email Inquiry</span>
                                </a>
                                <a :href="serviceDetails.cta_linkedin || 'https://www.linkedin.com/in/pial-mahmud/'" target="_blank"
                                    class="w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2.5 transition-all hover:bg-white/5"
                                    style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                        <rect x="2" y="9" width="4" height="12"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                    <span>Connect on LinkedIn</span>
                                </a>
                                <a :href="serviceDetails.cta_github || 'https://github.com/mahmudpial'" target="_blank"
                                    class="w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2.5 transition-all hover:bg-white/5"
                                    style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                    </svg>
                                    <span>View GitHub Code</span>
                                </a>
                            </div>

                            <!-- Guarantee note with SVG -->
                            <div class="mt-6 pt-5 border-t text-[11px] opacity-70 flex items-center justify-center gap-2"
                                style="border-color:#241730;color:#C9B9E8;font-family:system-ui;">
                                <ServiceIcon name="shield" :size="14" class="text-violet-400" />
                                <span>100% Satisfaction &amp; Clean Code Guaranteed</span>
                            </div>
                        </div>

                        <!-- Other Services Quick Menu -->
                        <div class="rounded-3xl border p-6" style="background:#120E1C;border-color:#3B2A5A;">
                            <h4 class="text-white font-bold text-sm mb-4 font-serif">Explore Other Services</h4>
                            <div class="space-y-2">
                                <RouterLink v-for="svc in allServices" :key="svc.id" :to="`/services/${svc.id}`"
                                    class="flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all group"
                                    :style="svc.id == currentService.id ? 'background:#8B5CF620;border-color:#8B5CF650;color:#fff;' : 'background:rgba(25,18,38,0.4);border-color:#241730;color:#C9B9E8;'"
                                    :onmouseover="svc.id != currentService.id ? `this.style.borderColor='#8B5CF6';this.style.color='#fff'` : ''"
                                    :onmouseout="svc.id != currentService.id ? `this.style.borderColor='#241730';this.style.color='#C9B9E8'` : ''">
                                    <span class="flex items-center gap-2.5">
                                        <ServiceIcon :name="svc.icon || 'code'" :size="14" class="text-violet-400" />
                                        <span class="truncate max-w-[190px]">{{ svc.title || svc.name }}</span>
                                    </span>
                                    <span class="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                                </RouterLink>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'
import ServiceIcon from '@/components/ServiceIcon.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const allServices = ref([])
const siteSettings = reactive({})

// Built-in Knowledge Base fallback
const serviceKnowledgeBase = {
    1: {
        timeline: '7 - 14 Days',
        startingPrice: '$450 - $850',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Full-Stack Engineering',
        cta_button_text: 'Get Started with this Service',
        overview: 'End-to-end full-stack web application engineering utilizing Laravel for a robust, secure backend and Vue.js 3 / Inertia.js for a blazingly responsive, interactive user interface.',
        highlights: [
            'Clean Architecture & Scalable Directory Structure',
            'Full SPA Responsiveness with Vue.js 3 & Vite',
            'Robust Laravel 11 Backend & Restful API',
            'Role-Based Access Control (RBAC) & Permissions',
            'Live Real-Time Notifications & WebSocket Readiness',
            'Cross-browser & Mobile-first Optimization'
        ],
        techStack: [
            { name: 'Laravel 11', role: 'Backend Framework' },
            { name: 'Vue.js 3 / Inertia', role: 'Frontend Architecture' },
            { name: 'Tailwind CSS', role: 'Design System' },
            { name: 'PostgreSQL / MySQL', role: 'Relational Database' },
            { name: 'Vite', role: 'High-speed Bundler' },
            { name: 'Pinia & Vue Router', role: 'State Management' }
        ],
        workflowSteps: [
            { title: '1. Discovery & Technical Blueprint', description: 'We review your exact business goals, user personas, database requirements, and technical constraints to establish a clear milestone timeline.' },
            { title: '2. Schema & UI/UX Wireframing', description: 'Design of normalized database tables, API contract endpoints, and intuitive interactive component layouts before writing production code.' },
            { title: '3. Clean & Scalable Coding', description: 'Development using Laravel 11 and Vue.js 3 following clean code standards (SOLID principles, repository patterns, component modularity).' },
            { title: '4. Security, QA & Performance Testing', description: 'Penetration checks, OWASP security validations, SQL injection prevention tests, responsive device testing, and speed benchmarking.' },
            { title: '5. Production Deployment & Handover', description: 'Deployment to your live cloud server with SSL certificates, complete Git source code handover, and a walkthrough video guide.' }
        ],
        deliverables: [
            'Complete Production-Ready Source Code with full ownership transfer',
            'Configured live production deployment on Render, VPS, AWS or DigitalOcean',
            'Interactive API documentation & Postman collection (for backend services)',
            'Database migration scripts & comprehensive seeders',
            'Video walkthrough & documentation guide explaining how everything works',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    },
    2: {
        timeline: '5 - 10 Days',
        startingPrice: '$300 - $600',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'High-Throughput APIs',
        cta_button_text: 'Build REST APIs',
        overview: 'Design and construction of high-throughput, secure RESTful APIs and microservice communication endpoints, built with standardized JSON responses, Sanctum/JWT token authentication, and interactive Swagger documentation.',
        highlights: [
            'Standardized JSON API Resource Formatting',
            'Sanctum & JWT Secure Token Authentication',
            'Rate Limiting & DDoS Prevention Guards',
            'Comprehensive Postman & OpenAPI Documentation',
            'Database Indexing for Low-Latency Query Execution',
            'Automated PHPUnit & Pest API Test Coverage'
        ],
        techStack: [
            { name: 'Laravel Sanctum / JWT', role: 'API Security' },
            { name: 'Redis', role: 'Cache & Rate Limiting' },
            { name: 'Postman / OpenAPI', role: 'Documentation' },
            { name: 'PHPUnit / Pest', role: 'Automated Testing' },
            { name: 'JSON Resources', role: 'Data Transformation' },
            { name: 'Guzzle / HTTP Client', role: 'Service Communication' }
        ],
        workflowSteps: [
            { title: '1. Endpoint & Schema Contract Design', description: 'Defining API routes, request payloads, response structures, and status codes.' },
            { title: '2. Controller & Service Implementation', description: 'Writing decoupled business logic with Form Requests and Eloquent API Resources.' },
            { title: '3. Authentication & Security Middleware', description: 'Securing routes with token guards, rate limiters, and CORS policies.' },
            { title: '4. Automated Testing & Postman Docs', description: 'Generating comprehensive documentation with automated Pest/PHPUnit tests.' },
            { title: '5. Deployment & Production Monitoring', description: 'Setting up logging, cache warmups, and staging testing.' }
        ],
        deliverables: [
            'Complete RESTful API backend codebase',
            'Sanctum / JWT Authentication setup',
            'Interactive Postman Collection & Swagger/OpenAPI docs',
            'Database schemas and migration files',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    },
    3: {
        timeline: '5 - 10 Days',
        startingPrice: '$350 - $700',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Intuitive Admin Panels',
        cta_button_text: 'Build Admin Dashboard',
        overview: 'Customized, intuitive Content Management Systems (CMS) and Admin Control Dashboards built to streamline business workflows, content publishing, user permissions, and visual data analytics.',
        highlights: [
            'Dynamic Content & Media Upload Manager',
            'Multi-Level Role & User Permission Management',
            'Real-Time Metrics & Interactive Chart Visualizations',
            'Data Export to CSV, Excel & PDF',
            'Activity Audit Logging & Action Tracking',
            'Dark / Light Mode & Mobile Admin Usability'
        ],
        techStack: [
            { name: 'Vue.js 3 & Pinia', role: 'Reactive Dashboard UI' },
            { name: 'Chart.js / ApexCharts', role: 'Visual Analytics' },
            { name: 'Spatie Permission', role: 'Role Management' },
            { name: 'Laravel MediaLibrary', role: 'Asset Management' },
            { name: 'Tailwind CSS', role: 'Component Styling' },
            { name: 'PostgreSQL', role: 'Structured Data Storage' }
        ],
        workflowSteps: [
            { title: '1. Admin Architecture Planning', description: 'Mapping out data tables, metrics, and permission levels.' },
            { title: '2. Interactive Component System', description: 'Building responsive tables, filters, search, and pagination.' },
            { title: '3. Real-Time Charting & Analytics', description: 'Connecting reactive dashboards with backend aggregation queries.' },
            { title: '4. Permissions & Audit Trails', description: 'Restricting access with RBAC and tracking user mutations.' },
            { title: '5. Launch & Training Walkthrough', description: 'Deploying the CMS with detailed video instructions.' }
        ],
        deliverables: [
            'Full Admin Dashboard SPA & CMS system',
            'Role and permission management matrices',
            'Real-time data export & analytics charts',
            'Step-by-step video guide for admin usage',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    },
    4: {
        timeline: '3 - 7 Days',
        startingPrice: '$200 - $450',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Database Architecture',
        cta_button_text: 'Optimize Database',
        overview: 'Database schema design, normalization, migration strategies, indexing, and slow-query tuning for MySQL and PostgreSQL systems to guarantee rapid queries and zero data corruption.',
        highlights: [
            'Normalized Relational Schema Architecture (3NF)',
            'Advanced Indexing & Query Execution Plan Optimization',
            'ACID-Compliant Transaction & Concurrency Safety',
            'Automated Database Migration & Seeding Pipelines',
            'Connection Pooling & Query Caching',
            'Backup Automation & Point-in-Time Recovery Setups'
        ],
        techStack: [
            { name: 'PostgreSQL', role: 'Primary Enterprise RDBMS' },
            { name: 'MySQL / MariaDB', role: 'Relational Database' },
            { name: 'Eloquent ORM', role: 'Query Optimization' },
            { name: 'Neon / AWS RDS', role: 'Cloud DB' },
            { name: 'Redis', role: 'In-Memory Cache Layer' },
            { name: 'DB Schema Visualizer', role: 'ERD Modeling' }
        ],
        workflowSteps: [
            { title: '1. Profiling & Slow Query Audit', description: 'Analyzing EXPLAIN execution plans and slow query logs.' },
            { title: '2. Schema Normalization & Index Tuning', description: 'Creating composite indexes and eliminating redundant data.' },
            { title: '3. Query Refactoring & Eloquent Optimization', description: 'Preventing N+1 problems and utilizing raw joins where needed.' },
            { title: '4. Concurrency & Locking Strategy', description: 'Ensuring atomic transactions and preventing race conditions.' },
            { title: '5. Benchmarking & Documentation', description: 'Verifying latency improvements with throughput benchmarks.' }
        ],
        deliverables: [
            'Complete optimized ERD schema and SQL scripts',
            'Performance benchmark comparison report',
            'Indexing & migration strategies',
            'Automated backup & query caching blueprints',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    },
    5: {
        timeline: '4 - 8 Days',
        startingPrice: '$250 - $500',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Payment & API Integration',
        cta_button_text: 'Integrate Payment & APIs',
        overview: 'Secure integration of multiple international and local payment gateways, webhooks, invoice generation, SMS notifications, and third-party SaaS APIs with automatic retry mechanisms.',
        highlights: [
            'Stripe, PayPal, SSLCommerz & bKash Integrations',
            'Webhook Signature Verification & Idempotency',
            'Automated PDF Invoice & Receipt Generation',
            'Transactional SMS & Email Gateway Hookups (Twilio/Mailgun)',
            'Subscription Billing & Recurring Payment Workflows',
            'PCI-DSS Compliance Best Practices'
        ],
        techStack: [
            { name: 'Stripe & PayPal SDKs', role: 'Global Checkout' },
            { name: 'SSLCommerz & bKash', role: 'Local Gateway' },
            { name: 'DomPDF / Snappy', role: 'Invoice Generation' },
            { name: 'Twilio / SMS API', role: 'SMS Notifications' },
            { name: 'Laravel Queues', role: 'Asynchronous Webhooks' },
            { name: 'Mailgun / SES', role: 'Transactional Email' }
        ],
        workflowSteps: [
            { title: '1. API Credentials & Security Setup', description: 'Configuring sandbox environments, webhook listener endpoints, and encrypting secret keys.' },
            { title: '2. Gateway & Checkout Implementation', description: 'Integrating checkout session flows, hosted checkouts, and custom card elements.' },
            { title: '3. Webhook Listener & Transaction Logging', description: 'Handling asynchronous webhook notifications, double-spend prevention, and event logging.' },
            { title: '4. Testing & Error Simulation', description: 'Simulating declined cards, network drops, and automated payment retries.' },
            { title: '5. Live Production Handover', description: 'Transitioning to live API keys and verifying real test transactions.' }
        ],
        deliverables: [
            'Complete Payment & API Gateway integration source code',
            'Webhook listener setup with signature verification',
            'Automated email receipts & PDF invoice generator',
            'Comprehensive testing suite for charge success & refund edge cases',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    },
    6: {
        timeline: '4 - 9 Days',
        startingPrice: '$250 - $550',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Modern UI/UX Frontend',
        cta_button_text: 'Build Frontend UI',
        overview: 'Converting Figma, Adobe XD, or conceptual designs into pixel-perfect, accessible, mobile-first responsive interfaces loaded with fluid transitions, micro-interactions, and pristine semantic code.',
        highlights: [
            'Pixel-Perfect Figma to Vue.js / HTML5 Translation',
            'Tailwind CSS Utility-First Architecture',
            'WCAG Accessibility & High Contrast Readability',
            'Fluid Micro-Animations & Dynamic Transitions',
            'Performance Score 95+ on Google Lighthouse',
            'Cross-Device & Tablet Responsive Perfection'
        ],
        techStack: [
            { name: 'Vue.js 3', role: 'Component Framework' },
            { name: 'Tailwind CSS', role: 'Design System' },
            { name: 'Figma', role: 'Design Tooling' },
            { name: 'Vite', role: 'Modern Build Engine' },
            { name: 'Headless UI', role: 'Accessible Components' },
            { name: 'CSS Transitions', role: 'Animation Suite' }
        ],
        workflowSteps: [
            { title: '1. Design System & Token Setup', description: 'Extracting typography, color palette, spacing, and icon sets from Figma.' },
            { title: '2. Component Architecture & Prototyping', description: 'Creating modular, reusable Vue 3 components with strict props validation.' },
            { title: '3. Responsive & Accessibility Fine-Tuning', description: 'Testing fluid layouts across mobile, tablet, and ultra-wide screens.' },
            { title: '4. Micro-Interactions & Animation Polish', description: 'Implementing smooth transitions, hover effects, and loading states.' },
            { title: '5. Production Optimization & Delivery', description: 'Purging unused CSS, lazy-loading assets, and optimizing bundle sizes.' }
        ],
        deliverables: [
            'Modular Vue.js 3 component library',
            'Responsive Tailwind CSS theme configuration',
            'High Google Lighthouse 95+ score optimization',
            'Clean semantic HTML5 structure',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    }
}

const defaultWorkflowSteps = [
    { title: '1. Discovery & Technical Blueprint', description: 'We review your exact business goals, user personas, database requirements, and technical constraints.' },
    { title: '2. Schema & UI/UX Wireframing', description: 'Design of normalized database tables, API contract endpoints, and intuitive interactive component layouts.' },
    { title: '3. Clean & Scalable Coding', description: 'Development using Laravel 11 and Vue.js 3 following clean code standards.' },
    { title: '4. Security, QA & Performance Testing', description: 'Penetration checks, OWASP validations, SQL injection prevention tests, and speed benchmarking.' },
    { title: '5. Production Deployment & Handover', description: 'Deployment to live cloud server with SSL certificates, Git handover, and video walkthrough.' }
]

const defaultDeliverables = [
    'Complete Production-Ready Source Code with full ownership transfer',
    'Configured live production deployment on Render, VPS, AWS or DigitalOcean',
    'Interactive API documentation & Postman collection',
    'Database migration scripts & comprehensive seeders',
    'Video walkthrough & documentation guide explaining how everything works',
    '30 Days of Free Bug Fixing & Priority Technical Support'
]

const securityStandards = [
    { iconName: 'shield', title: 'OWASP Security Guard', desc: 'Protected against XSS, CSRF, SQL Injection and clickjacking attacks.' },
    { iconName: 'shield', title: 'Encrypted Token Auth', desc: 'State-of-the-art Sanctum & JWT token management with secure cookie/header transmission.' },
    { iconName: 'sparkles', title: 'Sub-100ms Response', desc: 'Optimized database queries, lazy-loading, and Redis caching for blazing performance.' },
    { iconName: 'package', title: 'Versioned Codebase', desc: 'Organized Git commit history with branch protection and seamless deploy scripts.' }
]

const currentService = computed(() => {
    const id = route.params.id
    return allServices.value.find(s => String(s.id) === String(id) || String(s.order) === String(id)) || allServices.value[0] || null
})

const serviceDetails = computed(() => {
    if (!currentService.value) return {}
    const sId = currentService.value.id
    const orderKey = currentService.value.order || sId || 1

    // 1. Check if stored in siteSettings (from DB)
    const dbKey = `service_detail_${sId}`
    if (siteSettings[dbKey]) {
        try {
            const parsed = typeof siteSettings[dbKey] === 'string' ? JSON.parse(siteSettings[dbKey]) : siteSettings[dbKey]
            if (parsed && typeof parsed === 'object') return parsed
        } catch (e) {}
    }

    // 2. Check localStorage
    try {
        const local = localStorage.getItem(dbKey)
        if (local) {
            const parsed = JSON.parse(local)
            if (parsed && typeof parsed === 'object') return parsed
        }
    } catch (e) {}

    // 3. Fallback to built-in knowledge base
    return serviceKnowledgeBase[orderKey] || serviceKnowledgeBase[sId] || serviceKnowledgeBase[1] || {}
})

const workflowSteps = computed(() => {
    if (serviceDetails.value.workflowSteps && serviceDetails.value.workflowSteps.length) {
        return serviceDetails.value.workflowSteps
    }
    const orderKey = currentService.value?.order || currentService.value?.id || 1
    const fallback = serviceKnowledgeBase[orderKey] || serviceKnowledgeBase[1]
    return fallback.workflowSteps || defaultWorkflowSteps
})

const techStack = computed(() => {
    if (serviceDetails.value.techStack && serviceDetails.value.techStack.length) {
        return serviceDetails.value.techStack
    }
    const orderKey = currentService.value?.order || currentService.value?.id || 1
    const fallback = serviceKnowledgeBase[orderKey] || serviceKnowledgeBase[1]
    return fallback.techStack || []
})

const deliverables = computed(() => {
    if (serviceDetails.value.deliverables && serviceDetails.value.deliverables.length) {
        return serviceDetails.value.deliverables
    }
    const orderKey = currentService.value?.order || currentService.value?.id || 1
    const fallback = serviceKnowledgeBase[orderKey] || serviceKnowledgeBase[1]
    return fallback.deliverables || defaultDeliverables
})

async function fetchServices() {
    loading.value = true
    try {
        const [servRes, settRes] = await Promise.allSettled([
            api.get('/services'),
            api.get('/settings')
        ])

        if (servRes.status === 'fulfilled') {
            allServices.value = servRes.value.data.data || servRes.value.data || []
        }

        if (settRes.status === 'fulfilled') {
            const rawSett = settRes.value.data.data ?? settRes.value.data ?? []
            if (Array.isArray(rawSett)) {
                rawSett.forEach(s => {
                    if (s && s.key) siteSettings[s.key] = s.value
                })
            } else if (typeof rawSett === 'object' && rawSett !== null) {
                Object.entries(rawSett).forEach(([k, v]) => {
                    siteSettings[k] = v
                })
            }
        }
    } catch (err) {
        console.error('Failed to load services:', err)
    } finally {
        loading.value = false
    }
}

function hireThisService() {
    const serviceName = currentService.value?.title || currentService.value?.name || 'Full-Stack Web Development'
    router.push({
        path: '/contact',
        query: {
            service: serviceName,
            subject: 'Freelance Project'
        }
    })
}

watch(() => route.params.id, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(async () => {
    await fetchServices()
    window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<style scoped>
/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #0A0610;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #3B2A5A;
    border-radius: 9999px;
}
</style>
