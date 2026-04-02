<template>
    <div style="background:#05080F;min-height:100vh;">

        <!-- ── HERO HEADER ─────────────────────────────────────── -->
        <section class="relative pt-28 pb-20 px-6 md:px-16 overflow-hidden">
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;transform:translateX(-50%);
          border-radius:50%;background:radial-gradient(circle,#1e40af22 0%,transparent 70%);filter:blur(50px);"></div>
                <div class="absolute" style="width:350px;height:350px;bottom:-50px;left:-50px;border-radius:50%;
          background:radial-gradient(circle,#3B82F610 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute" style="width:350px;height:350px;top:-50px;right:-50px;border-radius:50%;
          background:radial-gradient(circle,#3B82F610 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute inset-0" style="background-image:radial-gradient(circle,#3B82F612 1px,transparent 1px);
          background-size:32px 32px;opacity:0.5;"></div>
            </div>

            <div class="relative z-10 max-w-3xl mx-auto text-center">
                <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                    style="color:#3B82F6;font-family:system-ui;letter-spacing:.25em;">My Writing</p>
                <h1 class="font-bold leading-tight mb-5"
                    style="font-size:clamp(36px,6vw,68px);font-family:'Georgia',serif;">
                    <span class="text-white">Articles &amp; </span>
                    <span style="color:#60A5FA;text-shadow:0 0 40px #3B82F650;">Insights</span>
                </h1>
                <p class="text-base leading-relaxed mx-auto mb-8"
                    style="color:#A8C4E8;font-family:system-ui;max-width:480px;line-height:1.8;">
                    Thoughts on web development, clean code, and the tools
                    I use every day — written from real experience.
                </p>
                <div class="mx-auto w-16 h-0.5 rounded-full"
                    style="background:linear-gradient(90deg,transparent,#3B82F6,transparent);"></div>
            </div>
        </section>

        <!-- ── SEARCH BAR ─────────────────────────────────────── -->
        <div class="sticky top-16 z-30 px-6 md:px-16 py-4"
            style="background:rgba(5,8,15,0.9);backdrop-filter:blur(16px);border-bottom:1px solid #0f1f38;">
            <div class="max-w-7xl mx-auto flex gap-3 items-center">
                <div class="relative flex-1 max-w-lg">
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15"
                        viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input v-model="search" @input="fetchPosts()" type="text" placeholder="Search articles..."
                        class="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                        style="background:#0D1220;border:1px solid #1e3a5f;color:#A8C4E8;font-family:system-ui;"
                        onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                </div>
                <!-- Post count -->
                <span class="text-xs font-medium hidden md:block flex-shrink-0"
                    style="color:#475569;font-family:system-ui;">
                    {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }} found
                </span>
            </div>
        </div>

        <!-- ── MAIN CONTENT ───────────────────────────────────── -->
        <section class="py-14 px-6 md:px-16">
            <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

                <!-- ── POSTS LIST ─────────────────────────────────── -->
                <div class="flex-1 min-w-0">

                    <!-- Loading skeletons -->
                    <div v-if="loading" class="flex flex-col gap-5">
                        <div v-for="i in 4" :key="i" class="h-44 rounded-2xl animate-pulse" style="background:#0D1220;">
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div v-else-if="posts.length === 0" class="text-center py-20 rounded-2xl border"
                        style="background:#0D1220;border-color:#1e3a5f;">
                        <svg class="mx-auto mb-4" width="44" height="44" viewBox="0 0 24 24" fill="none"
                            stroke="#1e3a5f" stroke-width="1">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <p class="text-white font-semibold mb-1" style="font-family:'Georgia',serif;font-size:17px;">No
                            articles found</p>
                        <p class="text-sm" style="color:#475569;font-family:system-ui;">
                            Try a different search or category.
                        </p>
                    </div>

                    <!-- Posts -->
                    <div v-else class="flex flex-col gap-5">
                        <RouterLink v-for="post in posts" :key="post.id" :to="`/blog/${post.slug}`" class="post-card group flex rounded-2xl border overflow-hidden
                     transition-all duration-300 no-underline hover:-translate-y-1"
                            style="background:#0D1220;border-color:#1e3a5f;">

                            <!-- Thumbnail -->
                            <div class="w-48 flex-shrink-0 relative overflow-hidden"
                                style="background:linear-gradient(135deg,#0a1628,#0f2040);min-height:160px;">
                                <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-full object-cover transition-transform duration-500
                         group-hover:scale-110 absolute inset-0" />
                                <!-- Placeholder icon -->
                                <div v-else class="absolute inset-0 flex items-center justify-center">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f"
                                        stroke-width="1">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                    </svg>
                                </div>
                                <!-- Category overlay badge -->
                                <div v-if="post.category" class="absolute bottom-3 left-3">
                                    <span class="text-xs font-bold px-2.5 py-1 rounded-full"
                                        style="background:#3B82F6;color:#fff;font-family:system-ui;">
                                        {{ post.category.name }}
                                    </span>
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <!-- Meta row -->
                                    <div class="flex items-center gap-3 mb-3 flex-wrap">
                                        <span class="flex items-center gap-1.5 text-xs"
                                            style="color:#475569;font-family:system-ui;">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {{ formatDate(post.created_at) }}
                                        </span>
                                        <span class="w-1 h-1 rounded-full" style="background:#1e3a5f;"></span>
                                        <span class="flex items-center gap-1.5 text-xs"
                                            style="color:#475569;font-family:system-ui;">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                            {{ post.views }} views
                                        </span>
                                    </div>

                                    <!-- Title -->
                                    <h2 class="font-bold text-white mb-3 transition-colors group-hover:text-blue-400"
                                        style="font-size:18px;font-family:'Georgia',serif;line-height:1.4;">
                                        {{ post.title }}
                                    </h2>

                                    <!-- Tags -->
                                    <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5">
                                        <span v-for="tag in post.tags" :key="tag.id"
                                            class="text-xs px-2.5 py-1 rounded-full border" style="background:#05080F;color:#A8C4E8;
                      border-color:#1e3a5f;font-family:system-ui;">
                                            # {{ tag.name }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Read more -->
                                <div class="flex items-center gap-2 mt-4 text-sm font-medium
                            transition-colors group-hover:text-blue-400" style="color:#3B82F6;font-family:system-ui;">
                                    Read article
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" class="transition-transform group-hover:translate-x-1">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </RouterLink>
                    </div>

                    <!-- Pagination -->
                    <div v-if="pagination.last_page > 1" class="flex items-center justify-center gap-3 mt-10">
                        <button :disabled="pagination.current_page === 1"
                            @click="fetchPosts(pagination.current_page - 1)" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm border
                     disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#1e3a5f;color:#A8C4E8;background:#0D1220;font-family:system-ui;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Prev
                        </button>

                        <!-- Page numbers -->
                        <div class="flex gap-2">
                            <button v-for="page in visiblePages" :key="page" @click="fetchPosts(page)"
                                class="w-9 h-9 rounded-xl text-sm font-semibold transition-all hover:scale-105" :style="page === pagination.current_page
                                    ? 'background:#3B82F6;color:#fff;box-shadow:0 0 12px #3B82F640;border:1px solid #3B82F6;'
                                    : 'background:#0D1220;color:#A8C4E8;border:1px solid #1e3a5f;'"
                                style="font-family:system-ui;">
                                {{ page }}
                            </button>
                        </div>

                        <button :disabled="pagination.current_page === pagination.last_page"
                            @click="fetchPosts(pagination.current_page + 1)" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm border
                     disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#1e3a5f;color:#A8C4E8;background:#0D1220;font-family:system-ui;">
                            Next
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- ── SIDEBAR ─────────────────────────────────────── -->
                <aside class="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-32">

                    <!-- Categories -->
                    <div class="rounded-2xl border overflow-hidden" style="background:#0D1220;border-color:#1e3a5f;">
                        <div class="px-5 py-4 border-b" style="border-color:#0f1f38;">
                            <h3 class="font-bold text-white text-sm" style="font-family:'Georgia',serif;">
                                Categories
                            </h3>
                        </div>
                        <ul class="p-3 flex flex-col gap-1">
                            <li @click="filterByCategory('')" class="flex items-center justify-between text-sm cursor-pointer
                       py-2 px-3 rounded-xl transition-all" :style="!activeCategory
                        ? 'background:#3B82F615;color:#60A5FA;'
                        : 'color:#A8C4E8;'"
                                onmouseover="if(!this.classList.contains('active'))this.style.background='rgba(255,255,255,0.04)'"
                                onmouseout="if(!this.classList.contains('active'))this.style.background='transparent'"
                                style="font-family:system-ui;">
                                <span>All posts</span>
                                <span class="text-xs px-2 py-0.5 rounded-full"
                                    style="background:#0a1628;color:#475569;">
                                    {{ posts.length }}
                                </span>
                            </li>
                            <li v-for="cat in categories" :key="cat.id" @click="filterByCategory(cat.slug)" class="flex items-center justify-between text-sm cursor-pointer
                       py-2 px-3 rounded-xl transition-all" :style="activeCategory === cat.slug
                        ? 'background:#3B82F615;color:#60A5FA;'
                        : 'color:#A8C4E8;'" style="font-family:system-ui;">
                                <span>{{ cat.name }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Tags -->
                    <div class="rounded-2xl border overflow-hidden" style="background:#0D1220;border-color:#1e3a5f;">
                        <div class="px-5 py-4 border-b" style="border-color:#0f1f38;">
                            <h3 class="font-bold text-white text-sm" style="font-family:'Georgia',serif;">
                                Tags
                            </h3>
                        </div>
                        <div class="p-4 flex flex-wrap gap-2">
                            <span v-for="tag in tags" :key="tag.id" @click="filterByTag(tag.slug)" class="text-xs px-3 py-1.5 rounded-full cursor-pointer
                       transition-all hover:scale-105 border" :style="activeTag === tag.slug
                        ? 'background:#3B82F6;color:#fff;border-color:#3B82F6;box-shadow:0 0 10px #3B82F640;'
                        : 'background:#05080F;color:#A8C4E8;border-color:#1e3a5f;'" style="font-family:system-ui;">
                                # {{ tag.name }}
                            </span>
                            <span v-if="tags.length === 0" class="text-xs" style="color:#475569;font-family:system-ui;">
                                No tags yet.
                            </span>
                        </div>
                    </div>

                    <!-- Newsletter CTA -->
                    <div class="rounded-2xl border p-5 relative overflow-hidden"
                        style="background:#0D1220;border-color:#1e3a5f;">
                        <div class="absolute inset-0 pointer-events-none"
                            style="background:radial-gradient(ellipse 200px 150px at 50% 100%,#3B82F610,transparent 70%);">
                        </div>
                        <div class="relative z-10">
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                                style="background:#3B82F615;border:1px solid #3B82F625;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA"
                                    stroke-width="2">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </div>
                            <h4 class="font-bold text-white text-sm mb-1" style="font-family:'Georgia',serif;">Stay
                                Updated</h4>
                            <p class="text-xs leading-relaxed mb-4"
                                style="color:#A8C4E8;font-family:system-ui;line-height:1.6;">
                                New articles on Laravel, Vue.js and web development.
                            </p>
                            <RouterLink to="/contact" class="block text-center py-2.5 text-white text-xs font-semibold
                       rounded-xl transition-all hover:scale-105"
                                style="background:#3B82F6;box-shadow:0 0 14px #3B82F635;font-family:system-ui;">
                                Get In Touch
                            </RouterLink>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

    </div>
</template>

<style scoped>
.post-card:hover {
    border-color: #3B82F640 !important;
    box-shadow: 0 0 30px #3B82F610;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/axios'

const posts = ref([])
const categories = ref([])
const tags = ref([])
const loading = ref(true)
const search = ref('')
const activeCategory = ref('')
const activeTag = ref('')
const pagination = ref({ current_page: 1, last_page: 1 })

onMounted(async () => {
    try {
        const [cRes, tRes] = await Promise.all([
            api.get('/categories?type=blog'),
            api.get('/tags'),
        ])
        categories.value = cRes.data.data
        tags.value = tRes.data.data
    } catch (e) {
        console.warn('Could not load filters:', e.message)
    }
    await fetchPosts()
})

async function fetchPosts(page = 1) {
    loading.value = true
    try {
        const { data } = await api.get('/posts', {
            params: {
                page,
                search: search.value || undefined,
                category: activeCategory.value || undefined,
                tag: activeTag.value || undefined,
            }
        })
        posts.value = data.data.data
        pagination.value = {
            current_page: data.data.current_page,
            last_page: data.data.last_page,
        }
    } catch (e) {
        console.warn('Could not load posts:', e.message)
    } finally {
        loading.value = false
    }
}

// ── Visible page numbers ──────────────────────────────────
const visiblePages = computed(() => {
    const total = pagination.value.last_page
    const current = pagination.value.current_page
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
    const pages = new Set([1, total, current, current - 1, current + 1])
    return [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b)
})

function filterByCategory(slug) {
    activeCategory.value = slug
    activeTag.value = ''
    fetchPosts()
}

function filterByTag(slug) {
    activeTag.value = activeTag.value === slug ? '' : slug
    activeCategory.value = ''
    fetchPosts()
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    })
}
</script>