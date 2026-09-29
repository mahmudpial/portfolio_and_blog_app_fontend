<template>
    <section :class="isStandalonePage ? 'py-12' : 'py-24 px-6 md:px-16'" :style="isStandalonePage ? '' : 'border-top:1px solid #241730;'">
        <div class="max-w-7xl mx-auto">

            <!-- Section Header (Only shown if not standalone or if requested) -->
            <div v-if="showHeader" class="text-center mb-16">
                <p class="text-xs font-semibold uppercase tracking-widest mb-3"
                    style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">
                    Investment &amp; Packages
                </p>
                <h2 class="font-bold text-white mb-4"
                    style="font-size:clamp(28px,4vw,44px);font-family:'Georgia',serif;">
                    Transparent Pricing Plans
                </h2>
                <p class="text-sm md:text-base leading-relaxed mx-auto max-w-xl"
                    style="color:#C9B9E8;font-family:system-ui;line-height:1.8;">
                    No hidden costs, no surprise invoices. Choose a production-ready package or reach out for custom scope.
                </p>
            </div>

            <!-- Loading State Skeleton -->
            <div v-if="loading && plans.length === 0" class="grid md:grid-cols-3 gap-8">
                <div v-for="i in 3" :key="i" class="rounded-3xl animate-pulse h-96 p-8"
                    style="background:#120E1C;border:1px solid #3B2A5A;">
                </div>
            </div>

            <!-- Pricing Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                <div v-for="plan in displayPlans" :key="plan.id"
                    class="pricing-card rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                    :class="plan.is_popular ? 'md:-translate-y-2 md:shadow-2xl popular-border-glow' : 'hover:-translate-y-2 hover:shadow-xl'"
                    :style="plan.is_popular
                        ? 'background:linear-gradient(180deg, #1A102E 0%, #120E1C 100%);border-color:#8B5CF6;box-shadow:0 0 35px rgba(139,92,246,0.25);'
                        : 'background:rgba(18, 14, 28, 0.9);border-color:#3B2A5A;'"
                    :onmouseover="!plan.is_popular ? `this.style.borderColor='#8B5CF680';this.style.boxShadow='0 20px 40px -10px rgba(139,92,246,0.2)'` : ''"
                    :onmouseout="!plan.is_popular ? `this.style.borderColor='#3B2A5A';this.style.boxShadow='none'` : ''">

                    <!-- Popular ambient top glow -->
                    <div v-if="plan.is_popular" class="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
                        style="background:radial-gradient(circle,#8B5CF640 0%,transparent 70%);filter:blur(35px);"></div>

                    <!-- Popular Ribbon -->
                    <div v-if="plan.is_popular"
                        class="absolute top-0 right-0 text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1.5 text-white shadow-lg z-10"
                        style="background:linear-gradient(135deg, #8B5CF6, #6D28D9);font-family:system-ui;box-shadow:0 0 15px rgba(139,92,246,0.4);">
                        <span class="text-amber-300 animate-pulse">★</span> Most Popular
                    </div>

                    <!-- Top Content -->
                    <div class="p-8 relative z-10">
                        <!-- Plan Name & Subtitle -->
                        <div class="mb-6">
                            <span class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3"
                                :style="plan.is_popular
                                    ? 'background:rgba(139,92,246,0.2);color:#C084FC;border:1px solid rgba(139,92,246,0.4);'
                                    : 'background:#180F28;color:#94A3B8;border:1px solid #3B2A5A;'"
                                style="font-family:system-ui;">
                                Tier 0{{ plan.order || 1 }}
                            </span>
                            <h3 class="font-serif text-2xl font-bold text-white tracking-tight"
                                :style="plan.is_popular ? 'color:#fff;' : 'color:#fff;'">
                                {{ plan.name }}
                            </h3>
                        </div>

                        <!-- Price Row -->
                        <div class="flex items-baseline gap-1.5 pb-6 mb-6 border-b"
                            :style="plan.is_popular ? 'border-color:rgba(139, 92, 246, 0.25);' : 'border-color:#241730;'">
                            <span class="text-2xl font-bold text-violet-400 font-serif">$</span>
                            <span class="text-5xl font-black text-white tracking-tight font-serif">
                                {{ formatPrice(plan.price) }}
                            </span>
                            <span class="text-xs font-medium uppercase tracking-wider ml-1" style="color:#94A3B8;font-family:system-ui;">
                                / {{ plan.duration || 'project' }}
                            </span>
                        </div>

                        <!-- Features Checklist -->
                        <div class="space-y-4">
                            <p class="text-xs font-bold uppercase tracking-wider opacity-60 text-white" style="font-family:system-ui;letter-spacing:.12em;">
                                What's included:
                            </p>
                            <ul class="space-y-3">
                                <li v-for="(feat, idx) in parseFeatures(plan.features)" :key="idx"
                                    class="flex items-start gap-3 text-sm leading-relaxed group/item transition-colors" style="color:#C9B9E8;font-family:system-ui;">
                                    <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-110"
                                        :style="plan.is_popular
                                            ? 'background:rgba(139, 92, 246, 0.25);color:#C084FC;border:1px solid rgba(139,92,246,0.4);box-shadow:0 0 10px rgba(139,92,246,0.25);'
                                            : 'background:rgba(139, 92, 246, 0.1);color:#8B5CF6;border:1px solid rgba(139,92,246,0.2);'">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span class="group-hover/item:text-purple-100 transition-colors">{{ feat }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bottom Action Button -->
                    <div class="p-8 pt-0 relative z-10">
                        <RouterLink :to="`/contact?plan=${encodeURIComponent(plan.name)}`"
                            class="w-full py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 text-center shadow-lg relative group/btn overflow-hidden"
                            :style="plan.is_popular
                                ? 'background:linear-gradient(135deg, #8B5CF6, #7C3AED, #6366F1);color:#fff;box-shadow:0 0 24px rgba(139,92,246,0.45);'
                                : 'background:#161026;border:1px solid #3B2A5A;color:#C9B9E8;'"
                            :onmouseover="!plan.is_popular ? `this.style.borderColor='#8B5CF6';this.style.backgroundColor='#1E1630';this.style.color='#fff';this.style.boxShadow='0 0 20px rgba(139,92,246,0.25)'` : ''"
                            :onmouseout="!plan.is_popular ? `this.style.borderColor='#3B2A5A';this.style.backgroundColor='#161026';this.style.color='#C9B9E8';this.style.boxShadow='none'` : ''"
                            style="font-family:system-ui;">
                            <span>Choose {{ plan.name }}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transition-transform duration-300 group-hover/btn:translate-x-1">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <!-- Custom Architecture Banner -->
            <div class="mt-14 rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
                style="background:linear-gradient(135deg, #180F28, #120E1C);border-color:#3B2A5A;"
                onmouseover="this.style.borderColor='#8B5CF680';this.style.boxShadow='0 15px 35px -10px rgba(139,92,246,0.2)'"
                onmouseout="this.style.borderColor='#3B2A5A';this.style.boxShadow='none'">
                <div class="space-y-2 text-center md:text-left">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                        style="background:#8B5CF615;color:#C084FC;border:1px solid #8B5CF630;font-family:system-ui;">
                        <span>💼</span> Custom Enterprise Scope
                    </div>
                    <h4 class="font-serif text-xl md:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                        Need a custom tailored solution or long-term retainer?
                    </h4>
                    <p class="text-sm opacity-70 max-w-xl leading-relaxed" style="color:#C9B9E8;font-family:system-ui;">
                        From high-traffic architectures and legacy code refactoring to ongoing product engineering contracts.
                    </p>
                </div>
                <RouterLink to="/contact?subject=Custom%20Enterprise%20Architecture"
                    class="px-8 py-3.5 text-white text-sm font-semibold rounded-2xl border transition-all duration-300 hover:scale-105 hover:border-violet-400 hover:bg-violet-600/20 shrink-0 text-center shadow-md"
                    style="border-color:#3B2A5A;background:#0A0610;color:#C9B9E8;font-family:system-ui;"
                    onmouseover="this.style.borderColor='#8B5CF6';this.style.color='#fff'"
                    onmouseout="this.style.borderColor='#3B2A5A';this.style.color='#C9B9E8'">
                    Request Custom Quote →
                </RouterLink>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/api/axios'

const props = defineProps({
    showHeader: {
        type: Boolean,
        default: true
    },
    isStandalonePage: {
        type: Boolean,
        default: false
    }
})

const plans = ref([])
const loading = ref(true)

// High-quality fallback tiers matching Neon DB seed data
const fallbackPlans = [
    {
        id: 1,
        name: 'Starter Tier',
        price: '150',
        duration: 'project',
        features: [
            'Modern Responsive Single/Multi-page Website',
            'Vue.js 3 + Tailwind CSS Clean UI',
            'Blazing Fast Performance & SEO Optimized',
            'Contact Form & Social Media Integration',
            'Cross-browser & Mobile Compatible',
            '3 Days Delivery & Free Bug Fixing'
        ],
        is_popular: false,
        order: 1
    },
    {
        id: 2,
        name: 'Professional Full-Stack',
        price: '450',
        duration: 'project',
        features: [
            'Complete Laravel + Vue.js / Inertia.js Architecture',
            'Custom Admin Dashboard & Role-based Access Control (RBAC)',
            'RESTful API Integration & Secure Authentication (Sanctum/JWT)',
            'Database Design (MySQL / PostgreSQL) & Optimized Queries',
            'Payment Gateway (Stripe / SSLCommerz / bKash / PayPal)',
            '7 Days Delivery + 1 Month Free Support'
        ],
        is_popular: true,
        order: 2
    },
    {
        id: 3,
        name: 'Enterprise SaaS',
        price: '950',
        duration: 'project',
        features: [
            'Full-Scale SaaS Application / Custom ERP / Attendance System',
            'High-traffic Architecture, Real-time WebSockets & Background Jobs',
            'Advanced Security, Automated Backups & Cloud Deployment',
            'Complex Third-party API Integrations & Webhooks',
            'Geofencing / Location Services / Overtime Automation',
            'Dedicated Priority Support & Maintenance'
        ],
        is_popular: false,
        order: 3
    }
]

const displayPlans = computed(() => {
    if (plans.value && plans.value.length > 0) {
        return plans.value
    }
    return fallbackPlans
})

function formatPrice(val) {
    if (!val) return '0'
    const num = Number(val)
    if (!isNaN(num)) {
        return num.toLocaleString()
    }
    return val
}

function parseFeatures(feat) {
    if (Array.isArray(feat)) return feat
    if (typeof feat === 'string') {
        try {
            const parsed = JSON.parse(feat)
            if (Array.isArray(parsed)) return parsed
        } catch {
            return feat.split('\n').filter(s => s.trim() !== '')
        }
    }
    return []
}

async function fetchPlans() {
    loading.value = true
    try {
        const { data } = await api.get('/pricing')
        const list = data.data?.data ?? data.data ?? (Array.isArray(data) ? data : [])
        if (Array.isArray(list) && list.length > 0) {
            plans.value = list.sort((a, b) => (a.order || 0) - (b.order || 0))
        }
    } catch (err) {
        console.warn('Could not load dynamic pricing plans from API, using default plans:', err.message)
    } finally {
        loading.value = false
    }
}

onMounted(fetchPlans)
</script>

<style scoped>
.pricing-card {
    will-change: transform, box-shadow;
}

.popular-border-glow {
    animation: popularGlow 4s ease-in-out infinite alternate;
}

@keyframes popularGlow {
    0% {
        box-shadow: 0 0 25px rgba(139, 92, 246, 0.25), 0 10px 30px -10px rgba(0,0,0,0.5);
    }
    100% {
        box-shadow: 0 0 45px rgba(139, 92, 246, 0.45), 0 15px 40px -10px rgba(139, 92, 246, 0.2);
    }
}
</style>
