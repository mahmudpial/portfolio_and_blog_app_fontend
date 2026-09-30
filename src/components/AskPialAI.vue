<template>
  <div class="fixed bottom-6 right-6 z-50 font-sans select-none print:hidden">
    <!-- Floating Trigger Button -->
    <div v-if="!isOpen" class="relative group">
      <!-- Glow effect -->
      <div
        class="absolute -inset-1 rounded-full opacity-75 blur-md transition duration-500 group-hover:opacity-100 group-hover:scale-110"
        style="background: linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-secondary, #EC4899));"
      ></div>

      <button
        @click="toggleChat"
        class="relative flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-105 active:scale-95 text-white font-semibold cursor-pointer border"
        :style="{
          background: 'linear-gradient(135deg, #1E1035 0%, #120E1C 100%)',
          borderColor: 'var(--brand-border, rgba(139, 92, 246, 0.4))',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px var(--brand-glow, rgba(139, 92, 246, 0.35))'
        }"
        aria-label="Ask Pial AI Assistant"
      >
        <!-- Animated AI Sparkle Avatar -->
        <div class="relative w-7 h-7 rounded-full flex items-center justify-center overflow-hidden"
          style="background: linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-secondary, #EC4899));">
          <svg class="w-4 h-4 text-white animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" />
          </svg>
        </div>

        <span class="text-sm font-medium tracking-wide">Ask Pial AI</span>

        <!-- Online Pulse Dot -->
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
      </button>

      <!-- First-time Tooltip Badge -->
      <div
        v-if="showWelcomeBadge"
        class="absolute bottom-16 right-0 w-64 p-3 rounded-2xl shadow-xl text-xs backdrop-blur-xl border transition-all animate-bounce"
        style="background: rgba(18, 14, 28, 0.95); border-color: var(--brand-border, rgba(139, 92, 246, 0.4)); color: #E2E8F0;"
      >
        <div class="flex items-start justify-between gap-2">
          <p class="m-0 leading-relaxed font-normal">
            👋 Have questions about Pial's stack, projects, or pricing? <strong class="text-violet-400">Ask me anything!</strong>
          </p>
          <button @click.stop="showWelcomeBadge = false" class="text-slate-400 hover:text-white p-0.5 cursor-pointer">✕</button>
        </div>
      </div>
    </div>

    <!-- Chat Modal Window -->
    <transition
      enter-active-class="transition duration-300 ease-out transform"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in transform"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-8 scale-95"
    >
      <div
        v-if="isOpen"
        class="w-[92vw] sm:w-[420px] max-h-[85vh] sm:max-h-[620px] h-[580px] flex flex-col rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl border"
        :style="{
          background: isDark ? 'rgba(15, 10, 26, 0.96)' : 'rgba(255, 255, 255, 0.97)',
          borderColor: 'var(--brand-border, rgba(139, 92, 246, 0.35))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px var(--brand-glow, rgba(139, 92, 246, 0.25))'
        }"
      >
        <!-- Header -->
        <div
          class="px-5 py-4 flex items-center justify-between border-b relative"
          :style="{
            background: isDark ? 'linear-gradient(135deg, rgba(30, 16, 53, 0.8), rgba(18, 14, 28, 0.8))' : 'linear-gradient(135deg, rgba(243, 232, 255, 0.8), rgba(255, 255, 255, 0.8))',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
          }"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
              style="background: linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-secondary, #EC4899));"
            >
              <svg class="w-5 h-5 text-white animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-base m-0 leading-tight" :style="{ color: isDark ? '#FFFFFF' : '#0F172A' }">
                  Ask Pial AI
                </h3>
                <span
                  class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                  :style="{
                    background: 'var(--brand-subtle, rgba(139, 92, 246, 0.15))',
                    color: 'var(--brand-primary, #8B5CF6)',
                    border: '1px solid var(--brand-border, rgba(139, 92, 246, 0.3))'
                  }"
                >
                  Portfolio Bot
                </span>
              </div>
              <p class="text-xs m-0 flex items-center gap-1.5 mt-0.5" :style="{ color: isDark ? '#94A3B8' : '#64748B' }">
                <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block -ml-3"></span>
                <span>Active & ready to assist</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <!-- Clear chat button -->
            <button
              @click="resetChat"
              title="Reset conversation"
              class="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/10 transition cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <!-- Close button -->
            <button
              @click="toggleChat"
              title="Close chat"
              class="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/10 transition cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Body -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
          <!-- Intro / Welcome Message -->
          <div v-for="(msg, idx) in messages" :key="idx" class="flex flex-col">
            <!-- Message Bubble -->
            <div
              :class="[
                'max-w-[85%] rounded-2xl p-3.5 leading-relaxed break-words shadow-md transition-all',
                msg.sender === 'user'
                  ? 'self-end text-white'
                  : 'self-start'
              ]"
              :style="msg.sender === 'user'
                ? {
                    background: 'linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-secondary, #EC4899))',
                    borderBottomRightRadius: '4px'
                  }
                : {
                    background: isDark ? 'rgba(30, 22, 45, 0.85)' : '#F1F5F9',
                    color: isDark ? '#E2E8F0' : '#1E293B',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0',
                    borderBottomLeftRadius: '4px'
                  }"
            >
              <!-- Sender label for AI -->
              <div v-if="msg.sender === 'bot'" class="flex items-center gap-1.5 mb-1.5">
                <span
                  class="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded"
                  :style="{ color: 'var(--brand-primary, #8B5CF6)' }"
                >
                  ⚡ Pial AI
                </span>
                <span class="text-[10px] text-slate-400">{{ msg.time }}</span>
              </div>

              <!-- Message Text (supports markdown-like formatting) -->
              <div class="prose prose-sm max-w-none text-xs sm:text-sm" v-html="formatMessage(msg.text)"></div>

              <!-- Action Buttons / Links if available -->
              <div v-if="msg.actions && msg.actions.length" class="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                <template v-for="action in msg.actions" :key="action.label">
                  <RouterLink
                    v-if="action.to"
                    :to="action.to"
                    @click="isOpen = false"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition hover:scale-105 active:scale-95 no-underline"
                    :style="{
                      background: 'var(--brand-primary, #8B5CF6)',
                      boxShadow: '0 4px 12px var(--brand-glow, rgba(139, 92, 246, 0.3))'
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
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition hover:scale-105 active:scale-95 no-underline"
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
          <div v-if="isTyping" class="self-start flex items-center gap-2 p-3 rounded-2xl rounded-bl-sm"
            :style="{
              background: isDark ? 'rgba(30, 22, 45, 0.85)' : '#F1F5F9',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0'
            }"
          >
            <span class="w-2 h-2 rounded-full animate-bounce" style="background: var(--brand-primary, #8B5CF6); animation-delay: 0s;"></span>
            <span class="w-2 h-2 rounded-full animate-bounce" style="background: var(--brand-primary, #8B5CF6); animation-delay: 0.15s;"></span>
            <span class="w-2 h-2 rounded-full animate-bounce" style="background: var(--brand-primary, #8B5CF6); animation-delay: 0.3s;"></span>
            <span class="text-xs text-slate-400 ml-1">Pial AI is thinking...</span>
          </div>
        </div>

        <!-- Quick Question Suggestions Chips -->
        <div
          class="px-4 py-2 border-t overflow-x-auto flex items-center gap-2 no-scrollbar"
          :style="{
            background: isDark ? 'rgba(20, 14, 33, 0.6)' : 'rgba(248, 250, 252, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'
          }"
        >
          <button
            v-for="chip in quickChips"
            :key="chip"
            @click="sendQuickQuery(chip)"
            class="text-[11px] font-medium whitespace-nowrap px-3 py-1.5 rounded-full border transition hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
            :style="{
              background: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.08)',
              borderColor: 'var(--brand-border, rgba(139, 92, 246, 0.3))',
              color: 'var(--brand-primary, #8B5CF6)'
            }"
          >
            {{ chip }}
          </button>
        </div>

        <!-- Input Box -->
        <div
          class="p-3 border-t relative"
          :style="{
            background: isDark ? 'rgba(18, 14, 28, 0.95)' : '#FFFFFF',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
          }"
        >
          <form @submit.prevent="handleSubmit" class="flex items-center gap-2">
            <input
              ref="inputField"
              v-model="inputQuery"
              type="text"
              placeholder="Ask anything (e.g. tech stack, pricing, hire)..."
              class="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition border"
              :style="{
                background: isDark ? 'rgba(30, 22, 45, 0.7)' : '#F8FAFC',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#CBD5E1',
                color: isDark ? '#FFFFFF' : '#0F172A'
              }"
              :disabled="isTyping"
            />
            <button
              type="submit"
              :disabled="!inputQuery.trim() || isTyping"
              class="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer flex-shrink-0 shadow-md"
              :style="{
                background: 'linear-gradient(135deg, var(--brand-primary, #8B5CF6), var(--brand-secondary, #EC4899))'
              }"
              aria-label="Send message"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
import { ref, computed, nextTick, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.currentTheme === 'dark')

const isOpen = ref(false)
const isTyping = ref(false)
const showWelcomeBadge = ref(true)
const inputQuery = ref('')
const messagesContainer = ref(null)
const inputField = ref(null)

const quickChips = [
  '💻 Tech Stack & Skills',
  '🚀 Multi-tenant & SaaS Experience',
  '💰 Pricing & Packages',
  '📬 How to Hire Pial',
  '📂 Featured Projects'
]

const messages = ref([
  {
    sender: 'bot',
    text: `Hello! 👋 I'm **Pial AI**, your interactive assistant. I can answer questions about Pial Mahmud's **Full-Stack Engineering skills (Laravel & Vue 3)**, multi-tenant architectures, completed projects, and project pricing.

How can I help you today?`,
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
      text: `Chat reset! 🔄 Ask me anything about Pial Mahmud's software development experience, projects, or how to collaborate.`,
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
  // Clean chip icon
  const clean = query.replace(/^[^\w\s]+/, '').trim()
  inputQuery.value = clean
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

  // Simulate realistic AI thinking response
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
  }, 650)
}

// ── Smart Grounded Knowledge Engine for Pial Mahmud ────────────────
function generateAiResponse(rawQuery) {
  const q = rawQuery.toLowerCase()

  // 1. Tech Stack / Skills
  if (q.includes('stack') || q.includes('skill') || q.includes('technology') || q.includes('tech') || q.includes('framework') || q.includes('language') || q.includes('vue') || q.includes('laravel')) {
    return {
      text: `Pial Mahmud is a **Full-Stack Software Engineer** with deep expertise across modern web and cloud architectures:

- **Backend**: Laravel (v9, 10, 11), PHP 8.x, RESTful API Design, Microservices, Eloquent ORM, MySQL, PostgreSQL, Redis Caching.
- **Frontend**: Vue.js 3 (Composition API, Pinia, Vue Router), Inertia.js, Tailwind CSS, Vite, Responsive Design.
- **Architecture**: Multi-tenant Systems, Role-Based Access Control (RBAC), Payment Gateways (Stripe, SSLCommerz), CI/CD, Docker.
- **Tools**: Git/GitHub, Postman, Nginx, Linux Server Management.`,
      actions: [
        { label: 'View All Skills', to: '/skills' },
        { label: 'Explore Projects', to: '/portfolio' }
      ]
    }
  }

  // 2. Multi-tenant / SaaS / Architecture
  if (q.includes('saas') || q.includes('multi-tenant') || q.includes('tenant') || q.includes('rbac') || q.includes('architecture') || q.includes('system design')) {
    return {
      text: `Yes! Multi-tenant SaaS and enterprise RBAC (Role-Based Access Control) are Pial's core specializations:

- **Database-per-tenant & Shared-database** tenancy models with automatic data isolation.
- **Granular Permissions & Roles**: Super-Admin, Admin, Manager, and End-User levels.
- **Automated Billing**: Subscription life-cycles, webhooks, and multi-currency billing integration.
- **Performance**: Heavy database index tuning, eager loading to prevent N+1 queries, and Redis caching.`,
      actions: [
        { label: 'View SaaS Projects', to: '/portfolio' },
        { label: 'Discuss Your SaaS Project', to: '/contact' }
      ]
    }
  }

  // 3. Pricing / Cost / Budget / Charges
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('charge') || q.includes('budget') || q.includes('how much')) {
    return {
      text: `Pial offers transparent, milestone-driven pricing tailored to project requirements:

1. **Starter / MVP**: Ideal for fast product launches, portfolio/business websites, or custom API prototypes.
2. **Professional SaaS / Full-Stack**: Complete custom multi-role platforms, payment gateway integration, and admin dashboards.
3. **Enterprise Custom Architecture**: Complex multi-tenant SaaS, high-traffic database optimization, and end-to-end cloud deployments.

*Every package includes clean code, responsive design, security audits, and post-launch support!*`,
      actions: [
        { label: 'Explore Pricing Plans', to: '/pricing' },
        { label: 'Get a Custom Quote', to: '/contact' }
      ]
    }
  }

  // 4. Hiring / Contact / Availability
  if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('available') || q.includes('freelance') || q.includes('upwork') || q.includes('call') || q.includes('message')) {
    return {
      text: `Pial is currently **open for full-time remote contracts, freelance SaaS development, and technical consulting**! 🚀

You can connect directly through:
- 📧 **Email**: [pialmahmud.dev@gmail.com](mailto:pialmahmud.dev@gmail.com)
- 💼 **Upwork**: [Hire on Upwork](https://www.upwork.com/freelancers/~01e5ccd10431c78406?mp_source=share)
- 💬 **Discord / LinkedIn / GitHub**: Accessible from the footer or contact page.`,
      actions: [
        { label: 'Send Direct Message', to: '/contact' },
        { label: 'Upwork Profile', href: 'https://www.upwork.com/freelancers/~01e5ccd10431c78406?mp_source=share' }
      ]
    }
  }

  // 5. Projects / Portfolio
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('sample') || q.includes('case study') || q.includes('experience')) {
    return {
      text: `Here are some highlighted systems built by Pial:

- 🛡️ **Enterprise Multi-Tenant SaaS**: Tenant isolation, automated billing, role matrices, and audit logging.
- 🏥 **Hospital Management System**: Patient records, appointment scheduling, billing, and pharmacy modules.
- 🩸 **LifeBlood Donation Network**: Geolocation matching for instant blood donor discovery.
- ⚡ **Personal Portfolio & CMS Engine**: High-performance headless API, real-time analytics, and theme customizer.`,
      actions: [
        { label: 'View All Live Projects', to: '/portfolio' }
      ]
    }
  }

  // 6. About Pial / Bio
  if (q.includes('who are you') || q.includes('who is pial') || q.includes('about') || q.includes('background') || q.includes('location') || q.includes('education')) {
    return {
      text: `**Pial Mahmud** is a Passionate Full-Stack Engineer and Architect based in Dhaka, Bangladesh.

He specializes in turning complex business logic into clean, reactive, and scalable digital products. When he isn't writing code, he writes technical blogs on backend optimization and software architecture.`,
      actions: [
        { label: 'Read Full Bio', to: '/about' },
        { label: 'Read Tech Blogs', to: '/blog' }
      ]
    }
  }

  // 7. Greetings / Pleasantries
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('salam') || q.includes('good morning') || q.includes('good evening')) {
    return {
      text: `Hello! 👋 It's wonderful to meet you! How can I assist you with Pial Mahmud's software development portfolio today? Feel free to ask about his **skills, SaaS projects, pricing**, or **how to hire him**.`,
      actions: [
        { label: 'Explore Skills', to: '/skills' },
        { label: 'View Portfolio', to: '/portfolio' }
      ]
    }
  }

  // Fallback AI response
  return {
    text: `That's a great question! Pial Mahmud specializes in building high-performance web applications, multi-tenant SaaS platforms, and custom APIs using **Laravel & Vue 3**.

Would you like to explore his featured projects, review his pricing packages, or send him a direct message?`,
    actions: [
      { label: 'View Projects', to: '/portfolio' },
      { label: 'Check Pricing', to: '/pricing' },
      { label: 'Contact Pial', to: '/contact' }
    ]
  }
}

// Simple Markdown parser for bold, lists, and links
function formatMessage(text) {
  if (!text) return ''
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono text-xs">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-violet-400 underline hover:text-violet-300 font-semibold">$1</a>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n- /g, '<br/>• ')
    .replace(/\n/g, '<br/>')

  return html
}

onMounted(() => {
  // Auto-hide the welcome badge after 12 seconds
  setTimeout(() => {
    showWelcomeBadge.value = false
  }, 12000)
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
