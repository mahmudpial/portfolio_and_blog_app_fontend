<template>
  <section class="py-20 px-6 md:px-16 relative overflow-hidden" style="border-top: 1px solid #241730; background: linear-gradient(180deg, #0A0610 0%, #0D0816 50%, #0A0610 100%);">
    <!-- Ambient Background Blobs -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute"
        style="width:600px; height:600px; top:10%; right:-150px; border-radius:50%; background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%); filter: blur(70px);"
      ></div>
      <div
        class="absolute"
        style="width:500px; height:500px; bottom:10%; left:-100px; border-radius:50%; background: radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%); filter: blur(70px);"
      ></div>
      <div
        class="absolute inset-0 opacity-20"
        style="background-image: radial-gradient(circle, #8B5CF615 1px, transparent 1px); background-size: 32px 32px;"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border"
          style="background: rgba(139, 92, 246, 0.12); border-color: rgba(139, 92, 246, 0.3); color: #C084FC; font-family: system-ui;"
        >
          <span class="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
          <span>Interactive Cost Estimator</span>
        </div>
        <h2
          class="font-bold text-white mb-4"
          style="font-size: clamp(28px, 4.5vw, 46px); font-family: 'Georgia', serif;"
        >
          Calculate Your <span style="color: #C084FC; text-shadow: 0 0 30px rgba(139, 92, 246, 0.4);">Project Estimate</span>
        </h2>
        <p class="text-sm md:text-base leading-relaxed mx-auto max-w-2xl" style="color: #C9B9E8; font-family: system-ui; line-height: 1.8;">
          Select your desired architecture, core modules, design fidelity, and timeline preference to calculate an instant estimated budget and delivery roadmap.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- ── LEFT COLUMN: Interactive Options (8 Cols) ─────────── -->
        <div class="lg:col-span-8 space-y-10">
          <!-- Step 1: Project Type / Architecture -->
          <div class="rounded-3xl border p-6 md:p-8" style="background: rgba(18, 14, 28, 0.85); border-color: #3B2A5A; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style="background: linear-gradient(135deg, #8B5CF6, #6D28D9);">1</span>
              <div>
                <h3 class="text-lg font-bold text-white m-0" style="font-family: 'Georgia', serif;">Core Architecture &amp; System Scope</h3>
                <p class="text-xs text-purple-300/70 m-0">Choose the foundation of your digital platform</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="type in projectTypes"
                :key="type.id"
                @click="selectedType = type"
                class="p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group"
                :style="selectedType.id === type.id
                  ? 'background: linear-gradient(145deg, #241442, #180F28); border-color: #8B5CF6; box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);'
                  : 'background: #140E20; border-color: #2D1F47;'"
                :onmouseover="selectedType.id !== type.id ? `this.style.borderColor='rgba(139, 92, 246, 0.5)'` : ''"
                :onmouseout="selectedType.id !== type.id ? `this.style.borderColor='#2D1F47'` : ''"
              >
                <!-- Selection Radio Dot -->
                <div class="flex items-start justify-between gap-3 mb-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :style="`background:${type.iconBg}; color:${type.iconColor}; border:1px solid ${type.iconBorder};`">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" v-html="type.svg"></svg>
                  </div>
                  <div class="w-5 h-5 rounded-full border flex items-center justify-center" :style="selectedType.id === type.id ? 'border-color:#8B5CF6; background:#8B5CF6;' : 'border-color:#475569;'">
                    <span v-if="selectedType.id === type.id" class="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                </div>

                <h4 class="font-bold text-sm text-white mb-1.5" style="font-family: system-ui;">{{ type.title }}</h4>
                <p class="text-xs text-purple-300/70 leading-relaxed mb-4" style="font-family: system-ui;">{{ type.desc }}</p>

                <div class="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-semibold">
                  <span class="text-violet-400 font-serif text-sm">${{ type.basePrice }} base</span>
                  <span class="text-slate-400 font-normal">~{{ type.baseDays }} days</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Modules & Features -->
          <div class="rounded-3xl border p-6 md:p-8" style="background: rgba(18, 14, 28, 0.85); border-color: #3B2A5A; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);">
            <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style="background: linear-gradient(135deg, #8B5CF6, #6D28D9);">2</span>
                <div>
                  <h3 class="text-lg font-bold text-white m-0" style="font-family: 'Georgia', serif;">Specialized Features &amp; Modules</h3>
                  <p class="text-xs text-purple-300/70 m-0">Select all capabilities required for your project</p>
                </div>
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/40">
                {{ selectedFeatures.length }} selected
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div
                v-for="feat in featureList"
                :key="feat.id"
                @click="toggleFeature(feat)"
                class="p-4 rounded-2xl border transition-all duration-250 cursor-pointer flex items-start gap-3.5 select-none group"
                :style="isFeatureSelected(feat.id)
                  ? 'background: linear-gradient(145deg, #22143F, #160F25); border-color: #8B5CF6; box-shadow: 0 0 16px rgba(139, 92, 246, 0.22);'
                  : 'background: #140E20; border-color: #2D1F47;'"
                :onmouseover="!isFeatureSelected(feat.id) ? `this.style.borderColor='rgba(139, 92, 246, 0.4)'` : ''"
                :onmouseout="!isFeatureSelected(feat.id) ? `this.style.borderColor='#2D1F47'` : ''"
              >
                <!-- Checkbox -->
                <div class="w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                  :style="isFeatureSelected(feat.id) ? 'background:#8B5CF6; border-color:#8B5CF6;' : 'border-color:#475569; background:#0D0915;'">
                  <svg v-if="isFeatureSelected(feat.id)" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-2">
                    <h4 class="font-semibold text-xs text-white truncate" style="font-family: system-ui;">{{ feat.name }}</h4>
                    <span class="text-xs font-bold text-violet-400 font-serif shrink-0">+${{ feat.price }}</span>
                  </div>
                  <p class="text-[11px] text-purple-300/70 leading-relaxed mt-1 m-0">{{ feat.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Design Fidelity & UI/UX Complexity -->
          <div class="rounded-3xl border p-6 md:p-8" style="background: rgba(18, 14, 28, 0.85); border-color: #3B2A5A; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style="background: linear-gradient(135deg, #8B5CF6, #6D28D9);">3</span>
              <div>
                <h3 class="text-lg font-bold text-white m-0" style="font-family: 'Georgia', serif;">UI/UX Design &amp; Aesthetic Level</h3>
                <p class="text-xs text-purple-300/70 m-0">Determine front-end visual polish and interactions</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                v-for="tier in designTiers"
                :key="tier.id"
                @click="selectedDesign = tier"
                class="p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between"
                :style="selectedDesign.id === tier.id
                  ? 'background: linear-gradient(145deg, #241442, #180F28); border-color: #8B5CF6; box-shadow: 0 0 18px rgba(139, 92, 246, 0.25);'
                  : 'background: #140E20; border-color: #2D1F47;'"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-lg">{{ tier.icon }}</span>
                    <span class="text-xs font-bold text-violet-400 font-serif">+${{ tier.price }}</span>
                  </div>
                  <h4 class="font-bold text-xs text-white mb-1.5" style="font-family: system-ui;">{{ tier.name }}</h4>
                  <p class="text-[11px] text-purple-300/70 leading-relaxed">{{ tier.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Speed & Delivery Pace -->
          <div class="rounded-3xl border p-6 md:p-8" style="background: rgba(18, 14, 28, 0.85); border-color: #3B2A5A;">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style="background: linear-gradient(135deg, #8B5CF6, #6D28D9);">4</span>
              <div>
                <h3 class="text-lg font-bold text-white m-0" style="font-family: 'Georgia', serif;">Delivery Timeline Preference</h3>
                <p class="text-xs text-purple-300/70 m-0">Choose your sprint priority</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="speed in speedOptions"
                :key="speed.id"
                @click="selectedSpeed = speed"
                class="p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5"
                :style="selectedSpeed.id === speed.id
                  ? 'background: linear-gradient(145deg, #241442, #180F28); border-color: #8B5CF6; box-shadow: 0 0 18px rgba(139, 92, 246, 0.25);'
                  : 'background: #140E20; border-color: #2D1F47;'"
              >
                <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" :style="selectedSpeed.id === speed.id ? 'background: #8B5CF6; color: white;' : 'background: #1C1330; color: #C084FC;'">
                  <span class="text-base">{{ speed.icon }}</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-xs text-white m-0">{{ speed.title }}</h4>
                    <span v-if="speed.multiplier > 1" class="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">+20% rush</span>
                  </div>
                  <p class="text-[11px] text-purple-300/70 m-0 mt-0.5">{{ speed.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── RIGHT COLUMN: Live Calculation Summary (4 Cols Sticky) ─ -->
        <div class="lg:col-span-4 sticky top-24 space-y-5">
          <div
            class="rounded-3xl border p-6 md:p-7 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
            style="background: linear-gradient(180deg, rgba(26, 17, 46, 0.95) 0%, rgba(18, 14, 28, 0.98) 100%); border-color: #8B5CF6; box-shadow: 0 0 40px rgba(139, 92, 246, 0.25);"
          >
            <!-- Glowing accent pill -->
            <div class="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <span class="text-xs font-bold uppercase tracking-widest text-purple-300/80" style="font-family: system-ui;">Estimate Summary</span>
              <button @click="resetEstimator" class="text-[11px] text-purple-400 hover:text-white transition flex items-center gap-1 cursor-pointer">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span>Reset</span>
              </button>
            </div>

            <!-- Price Range Highlight -->
            <div class="mb-6 p-4 rounded-2xl border" style="background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.3);">
              <span class="text-[11px] font-semibold text-purple-300/80 block uppercase tracking-wider mb-1">Estimated Investment</span>
              <div class="flex items-baseline gap-2">
                <span class="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
                  ${{ totalEstimate.min }}
                </span>
                <span class="text-lg text-purple-300/60 font-serif">to</span>
                <span class="text-3xl sm:text-4xl font-black text-violet-400 font-serif tracking-tight">
                  ${{ totalEstimate.max }}
                </span>
              </div>
              <p class="text-[10px] text-purple-300/60 m-0 mt-1.5 flex items-center gap-1">
                <span>✓ Fixed milestone contracts &amp; zero hidden fees</span>
              </p>
            </div>

            <!-- Timeline Estimate -->
            <div class="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 mb-6 text-xs">
              <span class="text-purple-300/80 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Estimated Timeline:
              </span>
              <span class="font-bold text-white font-serif text-sm">
                {{ totalEstimate.daysMin }} – {{ totalEstimate.daysMax }} Working Days
              </span>
            </div>

            <!-- Itemized Scope Breakdown -->
            <div class="space-y-2.5 mb-6 max-h-56 overflow-y-auto pr-1">
              <span class="text-[11px] font-bold uppercase tracking-wider text-purple-300/70 block">Scope Breakdown:</span>
              
              <div class="flex justify-between text-xs py-1 border-b border-white/5">
                <span class="text-slate-300 truncate max-w-[190px]">{{ selectedType.title }}</span>
                <span class="font-bold text-white font-serif">${{ selectedType.basePrice }}</span>
              </div>

              <div v-for="feat in selectedFeatures" :key="feat.id" class="flex justify-between text-xs py-1 border-b border-white/5">
                <span class="text-slate-300 truncate max-w-[190px]">+ {{ feat.name }}</span>
                <span class="font-semibold text-purple-300 font-serif">+${{ feat.price }}</span>
              </div>

              <div v-if="selectedDesign.price > 0" class="flex justify-between text-xs py-1 border-b border-white/5">
                <span class="text-slate-300 truncate max-w-[190px]">+ {{ selectedDesign.name }}</span>
                <span class="font-semibold text-purple-300 font-serif">+${{ selectedDesign.price }}</span>
              </div>

              <div v-if="selectedSpeed.multiplier > 1" class="flex justify-between text-xs py-1 border-b border-white/5">
                <span class="text-amber-300/90 truncate max-w-[190px]">Priority Sprint Speedup</span>
                <span class="font-semibold text-amber-400 font-serif">+20%</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="space-y-2.5">
              <button
                @click="sendProposal"
                class="w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%); box-shadow: 0 0 24px rgba(139, 92, 246, 0.45); font-family: system-ui;"
              >
                <span>Book This Scope &amp; Proposal</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              <button
                @click="copySummary"
                class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition hover:bg-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                style="border-color: #3B2A5A; background: #120E1C; color: #C9B9E8;"
              >
                <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <svg v-else class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{{ copied ? 'Copied to Clipboard!' : 'Copy Summary as Text' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const copied = ref(false)

// 1. Architecture Types
const projectTypes = [
  {
    id: 'landing',
    title: 'Landing Page & MVP Web',
    desc: 'High-converting responsive single/multi-page web application with clean Vue 3 + Tailwind UI.',
    basePrice: 150,
    baseDays: 5,
    iconBg: 'rgba(139, 92, 246, 0.15)',
    iconColor: '#C084FC',
    iconBorder: 'rgba(139, 92, 246, 0.3)',
    svg: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Custom Web App',
    desc: 'Custom Laravel 11 Backend + Vue.js 3 reactive frontend with database design and API integration.',
    basePrice: 450,
    baseDays: 12,
    iconBg: 'rgba(6, 182, 212, 0.15)',
    iconColor: '#38BDF8',
    iconBorder: 'rgba(6, 182, 212, 0.3)',
    svg: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
  },
  {
    id: 'saas',
    title: 'Multi-Tenant SaaS Platform',
    desc: 'Multi-tenant database isolation, RBAC security, automated billing, and high-performance caching.',
    basePrice: 850,
    baseDays: 20,
    iconBg: 'rgba(16, 185, 129, 0.15)',
    iconColor: '#34D399',
    iconBorder: 'rgba(16, 185, 129, 0.3)',
    svg: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'
  },
  {
    id: 'api',
    title: 'RESTful API & Microservices',
    desc: 'High-throughput secure RESTful APIs with Sanctum/JWT, Swagger docs, and Redis caching.',
    basePrice: 350,
    baseDays: 8,
    iconBg: 'rgba(245, 158, 11, 0.15)',
    iconColor: '#FBBF24',
    iconBorder: 'rgba(245, 158, 11, 0.3)',
    svg: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>'
  }
]

const selectedType = ref(projectTypes[1]) // Default to Full-Stack

// 2. Feature Modules
const featureList = [
  {
    id: 'auth_rbac',
    name: 'Advanced Auth & Multi-Role RBAC',
    desc: 'Super-Admin, Admin, Manager, and End-User granular permission matrix.',
    price: 100,
    days: 3
  },
  {
    id: 'payment',
    name: 'Payment Gateway Integration',
    desc: 'Stripe, PayPal, SSLCommerz, and automated recurring subscription webhooks.',
    price: 130,
    days: 3
  },
  {
    id: 'realtime',
    name: 'Real-Time WebSocket & Chat',
    desc: 'Live notifications, instant messaging, or real-time dashboard state sync.',
    price: 120,
    days: 4
  },
  {
    id: 'analytics',
    name: 'Interactive Analytics & Reports',
    desc: 'Charts, date filtering, and automated CSV/PDF report generators.',
    price: 90,
    days: 2
  },
  {
    id: 'ai',
    name: 'AI Integration (Gemini / OpenAI)',
    desc: 'Smart chatbots, prompt grounding, automated content generation, or embeddings.',
    price: 150,
    days: 3
  },
  {
    id: 'i18n',
    name: 'Multi-Language Support (i18n)',
    desc: 'Dynamic locale switcher for English, Bengali, and global languages.',
    price: 70,
    days: 2
  },
  {
    id: 'redis_queue',
    name: 'Redis Queue & Email Automation',
    desc: 'Asynchronous background job worker, email triggers, and scheduled tasks.',
    price: 80,
    days: 2
  },
  {
    id: 'security',
    name: 'Security Hardening & Rate Limiting',
    desc: 'CSRF/XSS protection, brute-force throttles, and SQL injection sanitization.',
    price: 90,
    days: 2
  }
]

const selectedFeatures = ref([featureList[0], featureList[1]]) // Default selected Auth & Payment

function isFeatureSelected(id) {
  return selectedFeatures.value.some(f => f.id === id)
}

function toggleFeature(feat) {
  const idx = selectedFeatures.value.findIndex(f => f.id === feat.id)
  if (idx > -1) {
    selectedFeatures.value.splice(idx, 1)
  } else {
    selectedFeatures.value.push(feat)
  }
}

// 3. Design Tiers
const designTiers = [
  {
    id: 'clean',
    name: 'Standard Clean UI',
    desc: 'Modern Tailwind CSS responsive layout with clean hierarchy.',
    price: 0,
    days: 0,
    icon: '🎨'
  },
  {
    id: 'luxury',
    name: 'Luxury Glass & Motion',
    desc: 'Tailored dark/light theme, micro-interactions, and neon glow accents.',
    price: 90,
    days: 2,
    icon: '✨'
  },
  {
    id: 'dashboard',
    name: 'Complex Dashboard Visuals',
    desc: 'Custom data visualizations, interactive filter tables, and state widgets.',
    price: 160,
    days: 4,
    icon: '📊'
  }
]

const selectedDesign = ref(designTiers[1]) // Default Luxury

// 4. Delivery Speed
const speedOptions = [
  {
    id: 'normal',
    title: 'Standard Timeline',
    desc: 'Steady sprint milestone cadence.',
    multiplier: 1,
    timeFactor: 1,
    icon: '🗓️'
  },
  {
    id: 'express',
    title: 'Priority Sprint (Fast-Track)',
    desc: 'High-priority delivery completed in ~30% less calendar time.',
    multiplier: 1.2,
    timeFactor: 0.7,
    icon: '⚡'
  }
]

const selectedSpeed = ref(speedOptions[0])

// ── Computed Calculation Engine ───────────────────────────────────
const totalEstimate = computed(() => {
  let subtotal = selectedType.value.basePrice
  let days = selectedType.value.baseDays

  // Add features
  selectedFeatures.value.forEach(f => {
    subtotal += f.price
    days += f.days
  })

  // Add design
  subtotal += selectedDesign.value.price
  days += selectedDesign.value.days

  // Apply speed factor
  const finalPrice = Math.round(subtotal * selectedSpeed.value.multiplier)
  const finalDays = Math.max(4, Math.round(days * selectedSpeed.value.timeFactor))

  return {
    min: finalPrice,
    max: Math.round(finalPrice * 1.22),
    daysMin: finalDays,
    daysMax: Math.round(finalDays * 1.3)
  }
})

function resetEstimator() {
  selectedType.value = projectTypes[1]
  selectedFeatures.value = [featureList[0], featureList[1]]
  selectedDesign.value = designTiers[1]
  selectedSpeed.value = speedOptions[0]
}

function generateSummaryText() {
  const feats = selectedFeatures.value.map(f => f.name).join(', ') || 'None'
  return `📋 Project Scope Estimate for Pial Mahmud:
• Architecture: ${selectedType.value.title}
• Modules: ${feats}
• UI/UX Level: ${selectedDesign.value.name}
• Timeline Preference: ${selectedSpeed.value.title}
• Estimated Budget: $${totalEstimate.value.min} - $${totalEstimate.value.max} USD
• Estimated Delivery: ${totalEstimate.value.daysMin} - ${totalEstimate.value.daysMax} Working Days`
}

function copySummary() {
  const summary = generateSummaryText()
  navigator.clipboard.writeText(summary)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2500)
}

function sendProposal() {
  const summary = generateSummaryText()
  router.push({
    path: '/contact',
    query: {
      subject: `Project Estimate: ${selectedType.value.title}`,
      message: summary
    },
    hash: '#contact-form'
  })
}
</script>
