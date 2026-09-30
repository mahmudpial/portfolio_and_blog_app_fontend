<template>
    <div style="background:#0A0610;min-height:100vh;">

        <!-- ── HERO HEADER ─────────────────────────────────────── -->
        <section class="relative pt-28 pb-16 px-6 md:px-16 overflow-hidden">
            <!-- Ambient glows -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;transform:translateX(-50%);
                    border-radius:50%;background:radial-gradient(circle,#6D28D922 0%,transparent 70%);filter:blur(50px);"></div>
                <div class="absolute" style="width:400px;height:400px;top:-100px;left:-50px;border-radius:50%;
                    background:radial-gradient(circle,#8B5CF610 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute" style="width:400px;height:400px;top:-100px;right:-50px;border-radius:50%;
                    background:radial-gradient(circle,#8B5CF610 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF612 1px,transparent 1px);
                    background-size:32px 32px;opacity:0.5;"></div>
            </div>

            <div class="relative z-10 max-w-4xl mx-auto text-center">
                <!-- Breadcrumb -->
                <div class="inline-flex items-center gap-2 mb-6 text-xs" style="color:#94A3B8;font-family:system-ui;">
                    <RouterLink to="/" class="transition-colors hover:text-violet-400" style="color:#94A3B8;">Home</RouterLink>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                    <span style="color:#C9B9E8;">Pricing &amp; Plans</span>
                </div>

                <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                    style="color:#8B5CF6;font-family:system-ui;letter-spacing:.25em;">
                    Investment &amp; Tiers
                </p>
                <h1 class="font-bold leading-tight mb-6"
                    style="font-size:clamp(36px,6vw,64px);font-family:'Georgia',serif;">
                    <span class="text-white">Predictable Plans for </span>
                    <span style="color:#C084FC;text-shadow:0 0 40px #8B5CF650;">High-Impact Results</span>
                </h1>
                <p class="text-base leading-relaxed mx-auto mb-8 max-w-xl"
                    style="color:#C9B9E8;font-family:system-ui;line-height:1.8;">
                    Every project is crafted with modern security standards, optimized database queries, and clean architecture.
                    Pick the plan that aligns with your vision.
                </p>
                <div class="mx-auto w-16 h-0.5 rounded-full"
                    style="background:linear-gradient(90deg,transparent,#8B5CF6,transparent);"></div>
            </div>
        </section>

        <!-- ── PRICING CARDS SECTION ────────────────────────────── -->
        <div class="px-6 md:px-16 pb-12">
            <PricingSection :show-header="false" :is-standalone-page="true" />
        </div>

        <!-- ── INTERACTIVE PROJECT ESTIMATOR ────────────────────── -->
        <ProjectEstimator />

        <!-- ── FAQ SECTION ──────────────────────────────────────── -->
        <section class="py-20 px-6 md:px-16" style="border-top:1px solid #241730;background:#0D0814;">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-16">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-3"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">
                        Frequently Asked Questions
                    </p>
                    <h2 class="font-bold text-white text-3xl md:text-4xl" style="font-family:'Georgia',serif;">
                        Common Questions &amp; Answers
                    </h2>
                </div>

                <div class="space-y-4">
                    <div v-for="(faq, idx) in faqs" :key="idx"
                        class="rounded-2xl border transition-all duration-300 overflow-hidden"
                        :style="openFaq === idx
                            ? 'background:#180F28;border-color:#8B5CF640;'
                            : 'background:#120E1C;border-color:#3B2A5A;'">
                        <button @click="toggleFaq(idx)"
                            class="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white transition-colors"
                            style="font-family:system-ui;">
                            <span class="text-base md:text-lg">{{ faq.question }}</span>
                            <span class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm transition-transform duration-300"
                                :style="openFaq === idx ? 'background:#8B5CF6;color:#fff;transform:rotate(180deg);' : 'background:#0A0610;color:#C9B9E8;border:1px solid #3B2A5A;'">
                                ↓
                            </span>
                        </button>
                        <transition name="faq">
                            <div v-if="openFaq === idx" class="px-6 pb-6 text-sm leading-relaxed"
                                style="color:#C9B9E8;font-family:system-ui;line-height:1.8;">
                                {{ faq.answer }}
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── BOTTOM CTA ───────────────────────────────────────── -->
        <section class="py-20 px-6 md:px-16" style="border-top:1px solid #241730;">
            <div class="max-w-4xl mx-auto rounded-3xl border p-10 md:p-14 text-center relative overflow-hidden"
                style="background:linear-gradient(135deg, #180F28, #120E1C);border-color:#3B2A5A;box-shadow:0 0 60px #8B5CF615;">
                <h3 class="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                    Have specific custom requirements?
                </h3>
                <p class="text-sm md:text-base opacity-75 max-w-lg mx-auto mb-8 leading-relaxed" style="color:#C9B9E8;font-family:system-ui;">
                    Let's schedule a consultation to discuss your technical architecture, database design, and delivery roadmap.
                </p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <RouterLink to="/contact"
                        class="px-8 py-3.5 text-white font-semibold rounded-2xl transition-all hover:scale-105"
                        style="background:#8B5CF6;box-shadow:0 0 24px #8B5CF640;font-family:system-ui;">
                        Contact Me Directly
                    </RouterLink>
                    <RouterLink to="/portfolio"
                        class="px-8 py-3.5 font-semibold rounded-2xl border transition-all hover:scale-105"
                        style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                        Explore Showcase
                    </RouterLink>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PricingSection from '@/components/PricingSection.vue'
import ProjectEstimator from '@/components/ProjectEstimator.vue'

const openFaq = ref(0)

function toggleFaq(idx) {
    openFaq.value = openFaq.value === idx ? -1 : idx
}

const faqs = [
    {
        question: 'How does the milestone and payment process work?',
        answer: 'Typically, projects follow a standard 50% upfront deposit to initiate development and 50% upon final acceptance, demo walkthrough, and live deployment. For larger enterprise or monthly contracts, milestone-based payments are also supported.'
    },
    {
        question: 'Which tech stacks and architectures do you use?',
        answer: 'I specialize in full-stack web applications using Laravel, Vue.js 3, Tailwind CSS, PostgreSQL/MySQL, Inertia.js, Pinia, RESTful APIs, Redis caching, and WebSocket realtime channels.'
    },
    {
        question: 'Do you provide post-launch support and bug fixes?',
        answer: 'Yes! Every project package includes dedicated post-delivery support and bug-fixing warranty. If anything unexpected arises within the warranty window, it is fixed promptly at no extra cost.'
    },
    {
        question: 'Can you work on existing codebases or perform refactoring?',
        answer: 'Yes, I frequently audit, fix security issues, optimize slow database queries, and refactor existing Laravel/Vue codebases to scale cleanly.'
    },
    {
        question: 'How do we communicate throughout the sprint?',
        answer: 'We maintain clear daily/weekly progress updates via WhatsApp, Slack, Discord, or Email with live staging links so you always have full visibility into the development progress.'
    }
]
</script>

<style scoped>
.faq-enter-active,
.faq-leave-active {
    transition: all 0.25s ease;
}

.faq-enter-from,
.faq-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
