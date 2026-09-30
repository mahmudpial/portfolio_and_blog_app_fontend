<template>
  <section class="py-20 px-6 md:px-16 relative overflow-hidden" style="border-top:1px solid #241730; background: linear-gradient(180deg, #0A0610 0%, #0F0918 50%, #0A0610 100%);">
    <!-- Ambient glows -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute" style="width:500px;height:500px;top:0;left:10%;border-radius:50%;background:radial-gradient(circle,#8B5CF612 0%,transparent 70%);filter:blur(60px);"></div>
      <div class="absolute" style="width:450px;height:450px;bottom:0;right:10%;border-radius:50%;background:radial-gradient(circle,#06B6D410 0%,transparent 70%);filter:blur(60px);"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="flex items-start justify-between mb-12 flex-wrap gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border"
            style="background:rgba(139, 92, 246, 0.1);border-color:rgba(139, 92, 246, 0.3);color:#C084FC;font-family:system-ui;">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Open Source Activity</span>
          </div>
          <h2 class="font-bold text-white text-3xl md:text-4xl" style="font-family:'Georgia',serif;">
            GitHub Real-Time Telemetry
          </h2>
        </div>

        <a :href="userProfile.html_url || 'https://github.com/mahmudpial'" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition hover:scale-105"
          style="background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;"
          onmouseover="this.style.borderColor='#8B5CF6';this.style.color='#fff'"
          onmouseout="this.style.borderColor='#3B2A5A';this.style.color='#C9B9E8'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>@{{ userProfile.login || 'mahmudpial' }} on GitHub ↗</span>
        </a>
      </div>

      <!-- Top Stats Counter Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div class="p-5 rounded-2xl border" style="background:#120E1C;border-color:#3B2A5A;">
          <span class="text-xs uppercase tracking-wider text-purple-300/70 font-semibold block mb-1">Public Repos</span>
          <span class="text-2xl sm:text-3xl font-bold text-white font-serif">{{ userProfile.public_repos || 25 }}+</span>
        </div>
        <div class="p-5 rounded-2xl border" style="background:#120E1C;border-color:#3B2A5A;">
          <span class="text-xs uppercase tracking-wider text-purple-300/70 font-semibold block mb-1">Primary Stacks</span>
          <span class="text-2xl sm:text-3xl font-bold text-violet-400 font-serif">PHP • Vue 3</span>
        </div>
        <div class="p-5 rounded-2xl border" style="background:#120E1C;border-color:#3B2A5A;">
          <span class="text-xs uppercase tracking-wider text-purple-300/70 font-semibold block mb-1">Total Followers</span>
          <span class="text-2xl sm:text-3xl font-bold text-white font-serif">{{ userProfile.followers || 18 }}+</span>
        </div>
        <div class="p-5 rounded-2xl border" style="background:#120E1C;border-color:#3B2A5A;">
          <span class="text-xs uppercase tracking-wider text-purple-300/70 font-semibold block mb-1">Commit Status</span>
          <span class="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Active Contributor</span>
          </span>
        </div>
      </div>

      <!-- Repositories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="repo in displayRepos"
          :key="repo.id"
          class="p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden"
          style="background: rgba(18, 14, 28, 0.9); border-color: #3B2A5A; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);"
          onmouseover="this.style.borderColor='#8B5CF680';this.style.boxShadow='0 15px 30px -10px rgba(139,92,246,0.25)'"
          onmouseout="this.style.borderColor='#3B2A5A';this.style.boxShadow='0 10px 25px -5px rgba(0,0,0,0.5)'"
        >
          <div>
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2 overflow-hidden">
                <svg class="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="font-bold text-sm text-white hover:text-purple-300 transition truncate no-underline" style="font-family:system-ui;">
                  {{ repo.name }}
                </a>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded-full border border-purple-500/30 text-purple-300 bg-purple-500/10 shrink-0 uppercase font-semibold">
                {{ repo.visibility || 'public' }}
              </span>
            </div>

            <p class="text-xs text-purple-300/70 leading-relaxed mb-6 line-clamp-2" style="font-family:system-ui;">
              {{ repo.description || 'Open source software architecture & clean code implementation.' }}
            </p>
          </div>

          <!-- Repo Metadata Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
            <div class="flex items-center gap-2 text-slate-300">
              <span class="w-2.5 h-2.5 rounded-full" :style="{ background: getLangColor(repo.language) }"></span>
              <span class="font-medium text-[11px]">{{ repo.language || 'PHP' }}</span>
            </div>

            <div class="flex items-center gap-3 text-slate-400 text-[11px]">
              <span class="flex items-center gap-1" title="Stars">
                ★ {{ repo.stargazers_count || 0 }}
              </span>
              <span class="flex items-center gap-1" title="Forks">
                ⌥ {{ repo.forks_count || 0 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userProfile = ref({
  login: 'mahmudpial',
  public_repos: 28,
  followers: 16,
  html_url: 'https://github.com/mahmudpial'
})

const displayRepos = ref([
  {
    id: 1,
    name: 'multi-tenant-saas-core',
    description: 'Enterprise Laravel multi-tenant RBAC core with database isolation, Stripe subscriptions, and audit logs.',
    language: 'PHP',
    stargazers_count: 14,
    forks_count: 5,
    html_url: 'https://github.com/mahmudpial/portfolio_and_blog_app_fontend'
  },
  {
    id: 2,
    name: 'portfolio_and_blog_app_frontend',
    description: 'Modern reactive Vue 3 (Composition API) + Tailwind CSS client with real-time AI assistant and multi-theme engine.',
    language: 'Vue',
    stargazers_count: 12,
    forks_count: 4,
    html_url: 'https://github.com/mahmudpial/portfolio_and_blog_app_fontend'
  },
  {
    id: 3,
    name: 'hospital-management-system-api',
    description: 'High-throughput RESTful API architecture for healthcare providers with patient records and automated billing.',
    language: 'PHP',
    stargazers_count: 8,
    forks_count: 2,
    html_url: 'https://github.com/mahmudpial'
  },
  {
    id: 4,
    name: 'lifeblood-donor-network',
    description: 'Real-time geo-matching emergency blood donor discovery platform with automated SMS notification gateways.',
    language: 'PHP',
    stargazers_count: 9,
    forks_count: 3,
    html_url: 'https://github.com/mahmudpial'
  },
  {
    id: 5,
    name: 'rest-api-sanctum-auth',
    description: 'Modular authentication boilerplates with token rotation, refresh tokens, rate limiting, and role middleware.',
    language: 'PHP',
    stargazers_count: 6,
    forks_count: 1,
    html_url: 'https://github.com/mahmudpial'
  },
  {
    id: 6,
    name: 'ecommerce-multivendor-engine',
    description: 'Scalable vendor payouts, inventory management, and multi-gateway checkout engine.',
    language: 'Vue',
    stargazers_count: 11,
    forks_count: 3,
    html_url: 'https://github.com/mahmudpial'
  }
])

function getLangColor(lang) {
  const map = {
    PHP: '#8892BE',
    Vue: '#42B883',
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    HTML: '#E34F26',
    CSS: '#1572B6'
  }
  return map[lang] || '#8B5CF6'
}

onMounted(async () => {
  try {
    const [userRes, reposRes] = await Promise.allSettled([
      fetch('https://api.github.com/users/mahmudpial'),
      fetch('https://api.github.com/users/mahmudpial/repos?sort=updated&per_page=6')
    ])

    if (userRes.status === 'fulfilled' && userRes.value.ok) {
      const userData = await userRes.value.json()
      if (userData?.login) {
        userProfile.value = userData
      }
    }

    if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
      const reposData = await reposRes.value.json()
      if (Array.isArray(reposData) && reposData.length > 0) {
        displayRepos.value = reposData.map(r => ({
          id: r.id,
          name: r.name,
          description: r.description,
          language: r.language || 'PHP',
          stargazers_count: r.stargazers_count || 0,
          forks_count: r.forks_count || 0,
          html_url: r.html_url
        }))
      }
    }
  } catch {
    // Graceful fallback to static high quality data
  }
})
</script>
