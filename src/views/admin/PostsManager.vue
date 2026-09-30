<template>
    <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
                <h1 class="font-bold text-white text-2xl" style="font-family:'Georgia',serif;">
                    Posts Manager
                </h1>
                <p class="text-sm mt-1" style="color:#C9B9E8;font-family:system-ui;">
                    {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }} total
                </p>
            </div>
            <button @click="openAdd()" class="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold
             rounded-xl transition-all hover:scale-105"
                style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Post
            </button>
        </div>

        <transition name="fade">
            <div v-if="alertMsg" class="mb-5 p-4 rounded-xl border flex items-center gap-3 text-sm" :style="alertType === 'success'
                ? 'background:#052e16;border-color:#16a34a40;color:#4ade80;'
                : 'background:#1a0505;border-color:#dc262640;color:#f87171;'" style="font-family:system-ui;">{{
                alertMsg }}
            </div>
        </transition>

        <div class="rounded-2xl border overflow-hidden" style="background:#120E1C;border-color:#3B2A5A;">
            <div class="px-6 py-5 border-b" style="border-color:#241730;">
                <h2 class="font-bold text-white" style="font-family:'Georgia',serif;">All Posts</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr style="border-bottom:1px solid #241730;">
                            <th v-for="h in ['Title', 'Category', 'Status', 'Views', 'Actions']" :key="h"
                                class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">{{ h }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="post in paginatedPosts" :key="post.id" class="group transition-colors"
                            style="border-bottom:1px solid #241730;" onmouseover="this.style.background='#180F28'"
                            onmouseout="this.style.background='transparent'">
                            <td class="px-6 py-4">
                                <div class="font-semibold text-white text-sm mb-0.5"
                                    style="font-family:'Georgia',serif;max-width:280px;">
                                    {{ post.title }}
                                </div>
                                <div class="text-xs" style="color:#475569;font-family:system-ui;">
                                    {{ post.slug }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span v-if="post.category" class="text-xs font-semibold px-2.5 py-1 rounded-full"
                                    style="background:#8B5CF615;color:#C084FC;
                                border:1px solid #8B5CF630;font-family:system-ui;">
                                    {{ post.category.name }}
                                </span>
                                <span v-else style="color:#475569;font-size:12px;">—</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full" :style="post.status === 'published'
                                        ? 'background:#4ade80;box-shadow:0 0 6px #4ade80;'
                                        : 'background:#475569;'"></span>
                                    <span class="text-xs font-medium capitalize" :style="post.status === 'published'
                                        ? 'color:#4ade80;' : 'color:#475569;'" style="font-family:system-ui;">
                                        {{ post.status }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="flex items-center gap-1.5 text-xs"
                                    style="color:#475569;font-family:system-ui;">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    {{ post.views }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <button @click="openEdit(post)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                border transition-all hover:scale-105" style="border-color:#3B2A5A;color:#C9B9E8;
                                background:#0A0610;font-family:system-ui;">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2.5">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button @click="deletePost(post)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                border transition-all hover:scale-105" style="border-color:#dc262630;color:#f87171;
                                background:#dc262610;font-family:system-ui;">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2.5">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="posts.length === 0">
                            <td colspan="5" class="text-center py-16">
                                <div class="text-4xl mb-3">📝</div>
                                <p class="text-white font-medium mb-1" style="font-family:system-ui;">
                                    No posts yet
                                </p>
                                <p class="text-xs" style="color:#475569;font-family:system-ui;">
                                    Click "New Post" to start writing.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination Controls (3 per page) -->
            <div v-if="totalPages > 1"
                class="flex items-center justify-between px-6 py-4 border-t flex-wrap gap-3"
                style="border-color:#241730;background:#0E0A16;">
                <span class="text-xs" style="color:#94A3B8;font-family:system-ui;">
                    Showing {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, posts.length) }} of {{ posts.length }} posts
                </span>
                <div class="flex items-center gap-2">
                    <button :disabled="currentPage === 1"
                        @click="goToPage(currentPage - 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                        style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Prev
                    </button>

                    <div class="flex items-center gap-1.5">
                        <button v-for="page in totalPages" :key="page"
                            @click="goToPage(page)"
                            class="w-8 h-8 rounded-xl text-xs font-semibold transition-all flex items-center justify-center"
                            :style="currentPage === page
                                ? 'background:#8B5CF6;color:#fff;box-shadow:0 0 12px #8B5CF640;'
                                : 'background:#0A0610;border:1px solid #3B2A5A;color:#C9B9E8;'">
                            {{ page }}
                        </button>
                    </div>

                    <button :disabled="currentPage === totalPages"
                        @click="goToPage(currentPage + 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                        style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                        Next
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <transition name="modal">
            <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
                style="background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);" @click.self="modal.show = false">
                <div class="rounded-3xl border w-full max-w-3xl shadow-2xl max-h-[88vh] flex flex-col overflow-hidden transition-all animate-in zoom-in-95 duration-200"
                    style="background:#120E1C;border-color:rgba(139, 92, 246, 0.35);box-shadow:0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(139,92,246,0.2);">
                    
                    <!-- Fixed Header -->
                    <div class="flex items-center justify-between px-7 py-5 border-b shrink-0"
                        style="border-color:rgba(139, 92, 246, 0.15);background:#120E1C;">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-violet-300"
                                style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </div>
                            <h3 class="font-serif text-xl font-bold text-white">
                                {{ modal.editing ? 'Edit Article & Post' : 'Create New Article' }}
                            </h3>
                        </div>
                        <button @click="modal.show = false"
                            class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40 hover:text-white border-0 bg-transparent cursor-pointer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <!-- Scrollable Body -->
                    <div class="p-7 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
                        <!-- Title -->
                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Article Title *</label>
                            <input v-model="form.title" type="text" placeholder="e.g. Building Resilient Multi-Tenant Architectures in Laravel"
                                class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                        </div>

                        <!-- Category + Status -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Category</label>
                                <input v-model="categoryQuery" @input="syncCategorySelection" list="post-categories"
                                    type="text" placeholder="Select or type a category"
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                                <datalist id="post-categories">
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.name" />
                                </datalist>
                                <div class="flex flex-wrap gap-1.5 mt-2" v-if="categories.length">
                                    <button v-for="cat in categories.slice(0, 6)" :key="`quick-${cat.id}`" type="button"
                                        @click="selectCategory(cat)"
                                        class="px-2.5 py-1 rounded-full text-[11px] border transition-all hover:scale-105 cursor-pointer"
                                        :style="Number(form.category_id) === Number(cat.id)
                                            ? 'background:#8B5CF615;border-color:#8B5CF6;color:#C084FC;'
                                            : 'background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;'">
                                        {{ cat.name }}
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Publish Status</label>
                                <select v-model="form.status"
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border cursor-pointer"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;">
                                    <option value="draft" style="background:#120E1C;">Draft (Hidden)</option>
                                    <option value="published" style="background:#120E1C;">Published (Public Live)</option>
                                </select>
                            </div>
                        </div>

                        <!-- Hero Image & Article Image -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Hero Header Image URL</label>
                                <input v-model="form.hero_image" type="text" placeholder="https://... (banner image)"
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                            </div>
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Article Thumbnail URL</label>
                                <input v-model="form.image" type="text" placeholder="https://... (card thumbnail)"
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                            </div>
                        </div>

                        <!-- Tags -->
                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Tags</label>
                            <input v-model="tagQuery" type="text" placeholder="Search tags (e.g. Laravel, Security, Architecture)..."
                                class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                            <div v-if="form.tags.length" class="flex flex-wrap gap-2 pt-1">
                                <span v-for="tagId in form.tags" :key="`selected-${tagId}`"
                                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border"
                                    style="background:#8B5CF615;border-color:#8B5CF640;color:#C084FC;">
                                    # {{tags.find(tag => Number(tag.id) === Number(tagId))?.name || tagId}}
                                    <button type="button" @click="toggleTag(tagId)" class="hover:text-white border-0 bg-transparent cursor-pointer font-bold">×</button>
                                </span>
                            </div>
                            <div class="flex flex-wrap gap-1.5 pt-1" v-if="filteredTags.length">
                                <button v-for="tag in filteredTags.slice(0, 10)" :key="tag.id" type="button"
                                    class="px-2.5 py-1 rounded-xl border text-xs transition-all hover:scale-105 cursor-pointer" :style="form.tags.includes(Number(tag.id))
                                        ? 'background:#8B5CF615;border-color:#8B5CF6;color:#C084FC;'
                                        : 'background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;'"
                                    @click="toggleTag(tag.id)">
                                    # {{ tag.name }}
                                </button>
                            </div>
                        </div>

                        <!-- Content Body -->
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Article Content (HTML / Markdown Supported)</label>
                                <button type="button" @click="showGuide = !showGuide"
                                    class="text-xs px-3 py-1 rounded-xl border transition-all hover:scale-105 cursor-pointer" :style="showGuide
                                        ? 'background:#8B5CF615;border-color:#8B5CF6;color:#C084FC;'
                                        : 'background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;'">
                                    {{ showGuide ? '✓ Guide Open' : '📝 Formatting Guide' }}
                                </button>
                            </div>
                            <textarea v-model="form.body" rows="9"
                                placeholder="Write your post content here... (HTML and code blocks supported)"
                                class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none resize-y border" style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;
                                font-family:monospace;line-height:1.7;"></textarea>
                            
                            <!-- Formatting Guide -->
                            <transition name="slide">
                                <FormattingGuide v-if="showGuide" />
                            </transition>
                        </div>
                    </div>

                    <!-- Fixed Sticky Action Footer -->
                    <div class="flex items-center gap-4 px-7 py-4 border-t shrink-0 bg-[#120E1C]"
                        style="border-color:rgba(139, 92, 246, 0.15);box-shadow:0 -10px 25px rgba(0,0,0,0.5);">
                        <button @click="savePost" :disabled="saving" class="flex-1 py-3.5 text-white font-bold rounded-2xl text-sm
                            transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0"
                            style="background:#8B5CF6;box-shadow:0 8px 20px -4px #8B5CF650;">
                            <span>{{ saving ? 'Saving...' : modal.editing ? 'Update Post' : 'Publish Post' }}</span>
                        </button>
                        <button @click="modal.show = false"
                            class="px-7 py-3.5 rounded-2xl text-sm font-bold border transition-all hover:bg-white/5 cursor-pointer"
                            style="border-color:rgba(139, 92, 246, 0.25);color:#C9B9E8;background:transparent;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/api/axios'

const posts = ref([])
const categories = ref([])
const tags = ref([])
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')

// ── 3 ITEMS PER PAGE PAGINATION ───────────────────────────
const perPage = 3
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(posts.value.length / perPage) || 1)

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return posts.value.slice(start, start + perPage)
})

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({ title: '', slug: '', category_id: '', status: 'draft', hero_image: '', image: '', tags: [], body: '' })
const categoryQuery = ref('')
const tagQuery = ref('')

async function fetchPosts() {
    try {
        const { data } = await api.get('/admin/posts', { params: { per_page: 100 } })
        const list = data.data?.data ?? data.data ?? (Array.isArray(data) ? data : [])
        posts.value = Array.isArray(list) ? list : []
        if (currentPage.value > totalPages.value) {
            currentPage.value = Math.max(1, totalPages.value)
        }
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to load posts', 'error')
    }
}

async function fetchMetadata() {
    try {
        const [catRes, tagRes] = await Promise.all([
            api.get('/admin/categories'),
            api.get('/admin/tags')
        ])
        categories.value = catRes.data.data || []
        tags.value = tagRes.data.data || []
    } catch (err) {
        console.warn('Failed to fetch post metadata')
    }
}

const filteredTags = computed(() => {
    if (!tagQuery.value) return tags.value
    return tags.value.filter(t => t.name.toLowerCase().includes(tagQuery.value.toLowerCase()))
})

function syncCategorySelection() {
    const cat = categories.value.find(c => c.name.toLowerCase() === categoryQuery.value.toLowerCase())
    if (cat) form.category_id = cat.id
}

function selectCategory(cat) {
    categoryQuery.value = cat.name
    form.category_id = cat.id
}

function toggleTag(id) {
    const idx = form.tags.indexOf(id)
    if (idx > -1) form.tags.splice(idx, 1)
    else form.tags.push(id)
}

async function savePost() {
    if (!form.title?.trim()) return showAlert('Title is required', 'error')
    saving.value = true
    try {
        const payload = { ...form }
        modal.editing
            ? await api.put(`/admin/posts/${modal.editId}`, payload)
            : await api.post('/admin/posts', payload)
        modal.show = false
        showAlert('Post saved successfully!', 'success')
        fetchPosts()
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to save post', 'error')
    } finally {
        saving.value = false
    }
}

async function deletePost(p) {
    if (!confirm(`Delete post "${p.title}"?`)) return
    try {
        await api.delete(`/admin/posts/${p.id}`)
        showAlert('Post deleted successfully!', 'success')
        fetchPosts()
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to delete post', 'error')
    }
}

function openAdd() {
    Object.assign(form, { title: '', slug: '', category_id: '', status: 'draft', hero_image: '', image: '', tags: [], body: '' })
    categoryQuery.value = ''; tagQuery.value = ''
    modal.editing = false; modal.editId = null; modal.show = true
}

function openEdit(p) {
    Object.assign(form, { ...p })
    categoryQuery.value = p.category?.name || ''
    tagQuery.value = ''
    modal.editing = true; modal.editId = p.id; modal.show = true
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg
    alertType.value = type
    setTimeout(() => { alertMsg.value = '' }, 3000)
}

onMounted(() => {
    fetchPosts()
    fetchMetadata()
})
</script>
