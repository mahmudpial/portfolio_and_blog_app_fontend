<template>
  <div class="fixed bottom-5 right-5 z-[9999] font-sans select-none print:hidden">
    <!-- Floating Trigger Button (Magic Entrance & Scroll Hide/Show) -->
    <div
      v-if="!isOpen"
      class="relative group transition-all"
      :class="isVisible ? 'translate-x-0 opacity-100 scale-100 pointer-events-auto' : 'translate-x-36 opacity-0 scale-75 pointer-events-none'"
      style="transition: transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease;"
    >
      <!-- Subtle ambient glow -->
      <div
        class="absolute -inset-0.5 rounded-full opacity-60 blur-sm transition duration-300 group-hover:opacity-100"
        style="background: linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-secondary, #C084FC));"
      ></div>

      <button
        @click="toggleChat"
        class="relative flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95 text-white cursor-pointer border"
        :style="{
          background: 'linear-gradient(135deg, #1E1235 0%, #120E1C 100%)',
          borderColor: 'var(--brand-border, rgba(139, 92, 246, 0.35))',
          boxShadow: '0 4px 15px -2px rgba(0, 0, 0, 0.6), 0 0 12px var(--brand-glow, rgba(139, 92, 246, 0.25))'
        }"
        aria-label="Ask AI"
      >
        <!-- Animated AI Sparkle Avatar -->
        <div
          class="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
          style="background: linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-dark, #6D28D9));"
        >
          <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" />
          </svg>
        </div>

        <span class="text-xs font-semibold tracking-wide">Ask AI</span>

        <!-- Online Pulse Dot -->
        <span class="relative flex h-2 w-2 ml-0.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </button>

      <!-- First-time Tooltip Badge -->
      <div
        v-if="showWelcomeBadge"
        class="absolute bottom-13 right-0 w-56 p-2.5 rounded-xl shadow-xl text-[11px] backdrop-blur-xl border transition-all"
        style="background: rgba(18, 14, 28, 0.96); border-color: var(--brand-border, rgba(139, 92, 246, 0.35)); color: #E2E8F0;"
      >
        <div class="flex items-start justify-between gap-2">
          <p class="m-0 leading-snug font-normal">
            👋 Have questions? Ask about Pial's <strong class="text-purple-300 font-semibold">stack, SaaS</strong> or <strong class="text-purple-300 font-semibold">pricing</strong>!
          </p>
          <button @click.stop="showWelcomeBadge = false" class="text-slate-400 hover:text-white p-0.5 cursor-pointer leading-none">✕</button>
        </div>
      </div>
    </div>

    <!-- Chat Modal Window (Professional & Compact Size) -->
    <transition
      enter-active-class="transition duration-250 ease-out transform"
      enter-from-class="opacity-0 translate-y-6 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-6 scale-95"
    >
      <div
        v-if="isOpen"
        class="w-[90vw] sm:w-[375px] max-h-[78vh] sm:max-h-[480px] h-[460px] flex flex-col rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl border"
        :style="{
          background: isDark ? 'rgba(18, 14, 28, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : '#E2E8F0',
          boxShadow: isDark
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 25px var(--brand-glow, rgba(139, 92, 246, 0.25))'
            : '0 20px 40px -10px rgba(0, 0, 0, 0.12)'
        }"
      >
        <!-- Header -->
        <div
          class="px-4 py-3 flex items-center justify-between border-b relative"
          :style="{
            background: isDark ? 'linear-gradient(135deg, #1C1130 0%, #120E1C 100%)' : '#F8FAFC',
            borderColor: isDark ? 'rgba(139, 92, 246, 0.18)' : '#E2E8F0'
          }"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="w-8 h-8 rounded-xl flex items-center justify-center shadow-md overflow-hidden flex-shrink-0"
              style="background: linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-dark, #6D28D9));"
            >
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-sm m-0 leading-tight" :style="{ color: isDark ? '#FFFFFF' : '#0F172A' }">
                Ask Pial AI
              </h3>
              <p class="text-[11px] m-0 flex items-center gap-1.5 mt-0.5" :style="{ color: isDark ? '#C9B9E8' : '#64748B' }">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block -ml-2.5"></span>
                <span>Active &amp; ready to assist</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <!-- Clear chat button -->
            <button
              @click="resetChat"
              title="Reset conversation"
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <!-- Close button -->
            <button
              @click="toggleChat"
              title="Close chat"
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Body -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs sm:text-sm scroll-smooth">
          <div v-for="(msg, idx) in messages" :key="idx" class="flex flex-col">
            <!-- Message Bubble -->
            <div
              :class="[
                'max-w-[88%] rounded-2xl p-3 leading-relaxed break-words shadow-sm transition-all',
                msg.sender === 'user' ? 'self-end text-white' : 'self-start'
              ]"
              :style="msg.sender === 'user'
                ? {
                    background: 'var(--brand-gradient, linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%))',
                    borderBottomRightRadius: '4px',
                    color: '#FFFFFF'
                  }
                : {
                    background: isDark ? 'rgba(25, 18, 38, 0.95)' : '#F1F5F9',
                    color: isDark ? '#E2E8F0' : '#1E293B',
                    border: isDark ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid #E2E8F0',
                    borderBottomLeftRadius: '4px'
                  }"
            >
              <!-- Sender label for AI -->
              <div v-if="msg.sender === 'bot'" class="flex items-center gap-1.5 mb-1">
                <span
                  class="text-[10px] font-bold tracking-wider uppercase"
                  :style="{ color: 'var(--brand-secondary, #C084FC)' }"
                >
                  ⚡ Pial AI
                </span>
                <span class="text-[10px] opacity-50">{{ msg.time }}</span>
              </div>

              <!-- Message Text -->
              <div class="prose prose-sm max-w-none text-xs leading-relaxed" v-html="formatMessage(msg.text)"></div>

              <!-- Action Buttons / Links if available -->
              <div v-if="msg.actions && msg.actions.length" class="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                <template v-for="action in msg.actions" :key="action.label">
                  <RouterLink
                    v-if="action.to"
                    :to="action.to"
                    @click="isOpen = false"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white transition hover:scale-105 active:scale-95 no-underline shadow-sm"
                    :style="{
                      background: 'var(--brand-primary, #8B5CF6)',
                      boxShadow: '0 2px 8px var(--brand-glow, rgba(139, 92, 246, 0.3))'
                    }"
                  >
                    <span>{{ action.label }}</span>
                    <span>→</span>
                  </RouterLink>

                  <a
                    v-else-if="action.href"
                    :href="action.href"
                    :target="action.href.startsWith('http') ? '_blank' : null"
                    :rel="action.href.startsWith('http') ? 'noopener noreferrer' : null"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white transition hover:scale-105 active:scale-95 no-underline"
                    :style="{
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }"
                  >
                    <span>{{ action.label }}</span>
                    <span>↗</span>
                  </a>
                </template>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div
            v-if="isTyping"
            class="self-start flex items-center gap-1.5 p-2.5 px-3 rounded-2xl rounded-bl-sm"
            :style="{
              background: isDark ? 'rgba(25, 18, 38, 0.95)' : '#F1F5F9',
              border: isDark ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid #E2E8F0'
            }"
          >
            <span class="w-1.5 h-1.5 rounded-full animate-bounce" style="background: var(--brand-primary, #8B5CF6); animation-delay: 0s;"></span>
            <span class="w-1.5 h-1.5 rounded-full animate-bounce" style="background: var(--brand-primary, #8B5CF6); animation-delay: 0.15s;"></span>
            <span class="w-1.5 h-1.5 rounded-full animate-bounce" style="background: var(--brand-primary, #8B5CF6); animation-delay: 0.3s;"></span>
            <span class="text-[11px] opacity-60 ml-1">Pial AI is answering...</span>
          </div>
        </div>

        <!-- Quick Question Suggestions Chips (Professional Vector Icons) -->
        <div
          class="px-3 py-2 border-t overflow-x-auto flex items-center gap-1.5 no-scrollbar"
          :style="{
            background: isDark ? 'rgba(18, 12, 28, 0.8)' : 'rgba(248, 250, 252, 0.9)',
            borderColor: isDark ? 'rgba(139, 92, 246, 0.15)' : '#E2E8F0'
          }"
        >
          <button
            v-for="chip in quickChips"
            :key="chip.label"
            @click="sendQuickQuery(chip.query)"
            class="text-[11px] font-medium whitespace-nowrap px-2.5 py-1 rounded-full border transition hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 flex-shrink-0"
            :style="{
              background: isDark ? 'rgba(139, 92, 246, 0.12)' : 'rgba(139, 92, 246, 0.08)',
              borderColor: 'var(--brand-border, rgba(139, 92, 246, 0.28))',
              color: 'var(--brand-secondary, #C084FC)'
            }"
          >
            <!-- Code SVG -->
            <svg v-if="chip.icon === 'code'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
            <!-- Server / SaaS SVG -->
            <svg v-else-if="chip.icon === 'server'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            <!-- Pricing / Tag SVG -->
            <svg v-else-if="chip.icon === 'tag'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <!-- User / Hire SVG -->
            <svg v-else-if="chip.icon === 'user'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <!-- Layers / Projects SVG -->
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
            </svg>

            <span>{{ chip.label }}</span>
          </button>
        </div>

        <!-- Input Box -->
        <div
          class="p-2.5 border-t relative"
          :style="{
            background: isDark ? '#120E1C' : '#FFFFFF',
            borderColor: isDark ? 'rgba(139, 92, 246, 0.18)' : '#E2E8F0'
          }"
        >
          <form @submit.prevent="handleSubmit" class="flex items-center gap-1.5">
            <input
              ref="inputField"
              v-model="inputQuery"
              type="text"
              placeholder="Ask about skills, projects, pricing..."
              class="flex-1 px-3 py-2 rounded-xl text-xs outline-none transition border"
              :style="{
                background: isDark ? 'rgba(25, 18, 38, 0.9)' : '#F8FAFC',
                borderColor: isDark ? 'rgba(139, 92, 246, 0.25)' : '#CBD5E1',
                color: isDark ? '#FFFFFF' : '#0F172A'
              }"
              :disabled="isTyping"
            />
            <!-- Send Button with Brand Gradient -->
            <button
              type="submit"
              :disabled="!inputQuery.trim() || isTyping"
              class="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer flex-shrink-0 shadow-md"
              :style="{
                background: 'var(--brand-gradient, linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%))',
                boxShadow: '0 2px 10px var(--brand-glow, rgba(139, 92, 246, 0.35))'
              }"
              aria-label="Send message"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const isOpen = ref(false)
const isVisible = ref(false)
const isTyping = ref(false)
const showWelcomeBadge = ref(true)
const inputQuery = ref('')
const messagesContainer = ref(null)
const inputField = ref(null)
let scrollTimeout = null

function handleScroll() {
  if (isOpen.value) return
  isVisible.value = false
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isVisible.value = true
  }, 420)
}

const quickChips = [
  {
    label: 'Tech Stack & Skills',
    query: 'What is your tech stack & skills?',
    icon: 'code'
  },
  {
    label: 'Multi-Tenant & SaaS',
    query: 'Tell me about your SaaS & Multi-tenant experience',
    icon: 'server'
  },
  {
    label: 'Pricing & Packages',
    query: 'What are your pricing packages and rates?',
    icon: 'tag'
  },
  {
    label: 'Hire Pial Mahmud',
    query: 'How can I hire Pial or contact him?',
    icon: 'user'
  },
  {
    label: 'Featured Projects',
    query: 'Show me your featured projects and work',
    icon: 'layers'
  }
]

const messages = ref([
  {
    sender: 'bot',
    text: `Hello! 👋 I'm **Pial AI**, your interactive assistant. I can answer questions about Pial Mahmud's **Laravel & Vue 3 expertise**, multi-tenant SaaS architecture, completed projects, and pricing plans.

What would you like to know?`,
    time: getCurrentTime(),
    actions: [
      { label: 'View Portfolio', to: '/portfolio' },
      { label: 'Check Pricing', to: '/pricing' }
    ]
  }
])

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    showWelcomeBadge.value = false
    nextTick(() => {
      scrollToBottom()
      inputField.value?.focus()
    })
  }
}

function resetChat() {
  messages.value = [
    {
      sender: 'bot',
      text: `Chat reset! 🔄 Ask me anything about Pial Mahmud's software development experience, projects, or pricing.`,
      time: getCurrentTime()
    }
  ]
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function sendQuickQuery(query) {
  inputQuery.value = query
  handleSubmit()
}

async function handleSubmit() {
  const query = inputQuery.value.trim()
  if (!query || isTyping.value) return

  // Push user message
  messages.value.push({
    sender: 'user',
    text: query,
    time: getCurrentTime()
  })

  inputQuery.value = ''
  scrollToBottom()
  isTyping.value = true

  // Simulate thinking
  setTimeout(() => {
    const reply = generateAiResponse(query)
    messages.value.push({
      sender: 'bot',
      text: reply.text,
      time: getCurrentTime(),
      actions: reply.actions || []
    })
    isTyping.value = false
    scrollToBottom()
  }, 500)
}

// ── Smart Grounded Knowledge Engine for Pial Mahmud ────────────────
function generateAiResponse(rawQuery) {
  const q = rawQuery.toLowerCase()

  // 1. Tech Stack / Skills
  if (q.includes('stack') || q.includes('skill') || q.includes('technology') || q.includes('tech') || q.includes('framework') || q.includes('language') || q.includes('vue') || q.includes('laravel')) {
    return {
      text: `Pial Mahmud is a **Full-Stack Software Engineer** specializing in:

- **Backend**: Laravel (v9, 10, 11), PHP 8.x, RESTful API Architecture, Microservices, Eloquent ORM, MySQL, PostgreSQL, Redis Caching.
- **Frontend**: Vue.js 3 (Composition API, Pinia, Vue Router), Inertia.js, Tailwind CSS, Vite.
- **Security & Cloud**: Multi-tenant Systems, RBAC (Role-Based Access Control), Payment Gateways (Stripe, SSLCommerz), Docker, Linux.`,
      actions: [
        { label: 'View All Skills', to: '/skills' },
        { label: 'Explore Projects', to: '/portfolio' }
      ]
    }
  }

  // 2. Multi-tenant / SaaS / Architecture
  if (q.includes('saas') || q.includes('multi-tenant') || q.includes('tenant') || q.includes('rbac') || q.includes('architecture') || q.includes('system design')) {
    return {
      text: `Multi-tenant SaaS and enterprise RBAC are Pial's core specializations:

- **Data Isolation**: Database-per-tenant and Shared-database multi-tenancy models.
- **Granular Permissions**: Role-matrix access control (Super-Admin, Admin, Manager, User).
- **Billing & Subscriptions**: Stripe/SSLCommerz subscription life-cycles and webhooks.
- **Performance**: Query optimization, index tuning, and Redis caching.`,
      actions: [
        { label: 'View SaaS Projects', to: '/portfolio' },
        { label: 'Discuss Your Project', to: '/contact' }
      ]
    }
  }

  // 3. Pricing / Cost / Budget / Charges
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('charge') || q.includes('budget') || q.includes('how much')) {
    return {
      text: `Pial offers milestone-driven, transparent pricing packages:

1. **Starter / MVP**: Ideal for fast product launches, portfolio, or custom API prototypes.
2. **Professional SaaS**: Multi-role web platforms, payment integrations, and custom dashboards.
3. **Enterprise Architecture**: High-traffic multi-tenant SaaS, cloud architecture, and security audits.`,
      actions: [
        { label: 'Explore Pricing Plans', to: '/pricing' },
        { label: 'Request Custom Quote', to: '/contact' }
      ]
    }
  }

  // 4. Hiring / Contact / Availability
  if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('available') || q.includes('freelance') || q.includes('upwork') || q.includes('call') || q.includes('message')) {
    return {
      text: `Pial is available for **full-time remote roles, freelance development, and technical consulting**! 🚀

Direct Channels:
- 📧 **Email**: [pialmahmud.dev@gmail.com](mailto:pialmahmud.dev@gmail.com)
- 💼 **Upwork**: [Hire on Upwork](https://www.upwork.com/freelancers/~01e5ccd10431c78406?mp_source=share)
- 💬 **Discord / LinkedIn / GitHub**: Accessible from the contact page.`,
      actions: [
        { label: 'Send Direct Message', to: '/contact' },
        { label: 'Hire on Upwork', href: 'https://www.upwork.com/freelancers/~01e5ccd10431c78406?mp_source=share' }
      ]
    }
  }

  // 5. Projects / Portfolio
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('sample') || q.includes('case study') || q.includes('experience')) {
    return {
      text: `Highlighted production projects built by Pial:

- 🛡️ **Multi-Tenant RBAC SaaS**: Tenant isolation, automated billing, and audit logging.
- 🏥 **Hospital Management System**: Patient records, appointments, and pharmacy modules.
- 🩸 **LifeBlood Donation Network**: Geolocation matching for instant blood donor discovery.
- ⚡ **Personal Portfolio & CMS Engine**: High-performance headless API, real-time analytics, and theme engine.`,
      actions: [
        { label: 'View All Live Projects', to: '/portfolio' }
      ]
    }
  }

  // 6. About Pial / Bio
  if (q.includes('who are you') || q.includes('who is pial') || q.includes('about') || q.includes('background') || q.includes('location') || q.includes('education')) {
    return {
      text: `**Pial Mahmud** is a Full-Stack Software Engineer based in Dhaka, Bangladesh.

He specializes in Laravel and Vue.js 3 architectures, converting business requirements into scalable, clean-code web platforms.`,
      actions: [
        { label: 'Read Full Bio', to: '/about' },
        { label: 'Read Tech Blogs', to: '/blog' }
      ]
    }
  }

  // 7. Greetings
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('salam') || q.includes('good morning') || q.includes('good evening')) {
    return {
      text: `Hello! 👋 It's great to meet you! How can I help you today regarding Pial Mahmud's **skills, SaaS projects, pricing**, or **hiring**?`,
      actions: [
        { label: 'Explore Skills', to: '/skills' },
        { label: 'View Portfolio', to: '/portfolio' }
      ]
    }
  }

  // Fallback
  return {
    text: `Pial Mahmud specializes in high-performance web applications, multi-tenant SaaS, and custom APIs with **Laravel & Vue 3**.

Feel free to check out his live projects, explore pricing packages, or send him a message!`,
    actions: [
      { label: 'View Projects', to: '/portfolio' },
      { label: 'Check Pricing', to: '/pricing' },
      { label: 'Contact Pial', to: '/contact' }
    ]
  }
}

function formatMessage(text) {
  if (!text) return ''
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic opacity-90">$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 font-mono text-[11px]">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-400 underline hover:text-purple-300 font-semibold">$1</a>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n- /g, '<br/>• ')
    .replace(/\n/g, '<br/>')

  return html
}

onMounted(() => {
  // Magic Entrance entrance on page load
  setTimeout(() => {
    isVisible.value = true
  }, 600)

  window.addEventListener('scroll', handleScroll, { passive: true })

  setTimeout(() => {
    showWelcomeBadge.value = false
  }, 10000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) clearTimeout(scrollTimeout)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
