<template>
    <div style="background:#0A0610;min-height:100vh;">
        <div class="max-w-7xl mx-auto px-6 py-8">

            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest mb-1"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">Admin Panel</p>
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
                            <tr v-for="post in posts" :key="post.id" class="group transition-colors"
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

                <!-- Pagination -->
                <div v-if="pagination.last_page > 1"
                    class="flex items-center justify-between px-6 py-4 border-t flex-wrap gap-3"
                    style="border-color:#241730;">
                    <span class="text-xs" style="color:#475569;font-family:system-ui;">
                        Page {{ pagination.current_page }} of {{ pagination.last_page }}
                    </span>
                    <div class="flex gap-2">
                        <button :disabled="pagination.current_page === 1"
                            @click="fetchPosts(pagination.current_page - 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
                     disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Prev
                        </button>
                        <button :disabled="pagination.current_page === pagination.last_page"
                            @click="fetchPosts(pagination.current_page + 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
                     disabled:opacity-40 transition-all hover:scale-105"
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
        </div>

        <!-- Modal -->
        <transition name="modal">
            <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 px-4"
                style="background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);" @click.self="modal.show = false">
                <div class="rounded-2xl border w-full max-w-2xl shadow-2xl max-h-screen overflow-y-auto"
                    style="background:#120E1C;border-color:#3B2A5A;">
                    <div class="flex items-center justify-between px-6 py-5 border-b sticky top-0 z-10"
                        style="border-color:#241730;background:#120E1C;">
                        <h3 class="font-bold text-white text-lg" style="font-family:'Georgia',serif;">
                            {{ modal.editing ? 'Edit Post' : 'New Post' }}
                        </h3>
                        <button @click="modal.show = false"
                            class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5"
                            style="color:#475569;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-6 space-y-4">
                        <!-- Title -->
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Title</label>
                            <input v-model="form.title" type="text" placeholder="Post title..."
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='#3B2A5A'" />
                        </div>
                        <!-- Category + Status -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Category</label>
                                <input v-model="categoryQuery" @input="syncCategorySelection" list="post-categories"
                                    type="text" placeholder="Select or type a category"
                                    class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                    style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                    onfocus="this.style.borderColor='#8B5CF6'"
                                    onblur="this.style.borderColor='#3B2A5A'" />
                                <datalist id="post-categories">
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.name" />
                                </datalist>
                                <div class="flex flex-wrap gap-2 mt-2" v-if="categories.length">
                                    <button v-for="cat in categories.slice(0, 6)" :key="`quick-${cat.id}`" type="button"
                                        @click="selectCategory(cat)"
                                        class="px-2.5 py-1 rounded-full text-xs border transition-all hover:scale-105"
                                        :style="Number(form.category_id) === Number(cat.id)
                                            ? 'background:#8B5CF615;border-color:#8B5CF6;color:#C084FC;'
                                            : 'background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;'">
                                        {{ cat.name }}
                                    </button>
                                </div>
                                <p class="text-xs mt-2" style="color:#475569;font-family:system-ui;">
                                    You can type to search, or click a suggested category.
                                </p>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Status</label>
                                <select v-model="form.status"
                                    class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                    style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;">
                                    <option value="draft" style="background:#120E1C;">Draft</option>
                                    <option value="published" style="background:#120E1C;">Published</option>
                                </select>
                            </div>
                        </div>
                        <!-- Hero Image URL -->
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Hero Image URL (Hero
                                Section Background)</label>
                            <input v-model="form.hero_image" type="text" placeholder="https://... (for page header)"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='#3B2A5A'" />
                        </div>
                        <!-- Hero Image URL -->
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Hero Image URL (Page
                                Header Background)</label>
                            <input v-model="form.hero_image" type="text" placeholder="https://... (hero section)"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='#3B2A5A'" />
                        </div>
                        <!-- Article Image URL -->
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Article Image URL
                                (Content Body)</label>
                            <input v-model="form.image" type="text" placeholder="https://... (article content)"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='#3B2A5A'" />
                        </div>
                        <!-- Tags -->
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-3"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Tags</label>
                            <input v-model="tagQuery" type="text" placeholder="Search tags..."
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none mb-3"
                                style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='#3B2A5A'" />
                            <div v-if="form.tags.length" class="flex flex-wrap gap-2 mb-3">
                                <span v-for="tagId in form.tags" :key="`selected-${tagId}`"
                                    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border"
                                    style="background:#8B5CF615;border-color:#8B5CF630;color:#C084FC;font-family:system-ui;">
                                    # {{tags.find(tag => Number(tag.id) === Number(tagId))?.name || tagId}}
                                    <button type="button" @click="toggleTag(tagId)" style="color:inherit;">×</button>
                                </span>
                            </div>
                            <div class="flex flex-wrap gap-2" v-if="filteredTags.length">
                                <button v-for="tag in filteredTags" :key="tag.id" type="button"
                                    class="px-3 py-2 rounded-xl border text-xs transition-all hover:scale-105" :style="form.tags.includes(Number(tag.id))
                                        ? 'background:#8B5CF615;border-color:#8B5CF6;color:#C084FC;'
                                        : 'background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;'"
                                    style="font-family:system-ui;" @click="toggleTag(tag.id)">
                                    # {{ tag.name }}
                                </button>
                            </div>
                            <p v-else class="text-xs" style="color:#475569;font-family:system-ui;">
                                No tags found. Try a different search or check the tags API.
                            </p>
                            <p class="text-xs mt-2" style="color:#475569;font-family:system-ui;">
                                Click tags to add or remove them from the post.
                            </p>
                            <div v-if="!tags.length" class="text-xs mt-2" style="color:#f87171;font-family:system-ui;">
                                Tags could not be loaded from the API.
                            </div>
                        </div>
                        <!-- Body -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Content</label>
                                <button type="button" @click="showGuide = !showGuide"
                                    class="text-xs px-2 py-1 rounded border transition-all hover:scale-105" :style="showGuide
                                        ? 'background:#8B5CF615;border-color:#8B5CF6;color:#C084FC;'
                                        : 'background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;'"
                                    style="font-family:system-ui;">
                                    {{ showGuide ? '✓ Guide Open' : '📝 Show Guide' }}
                                </button>
                            </div>
                            <textarea v-model="form.body" rows="10"
                                placeholder="Write your post content here... (HTML supported)"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none" style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;
                font-family:'Courier New',monospace;line-height:1.7;" onfocus="this.style.borderColor='#8B5CF6'"
                                onblur="this.style.borderColor='#3B2A5A'"></textarea>
                            <p class="text-xs mt-2" style="color:#475569;font-family:system-us;margin-bottom:1rem;">
                                HTML is supported. {{ form.body.length }} characters.
                            </p>
                            <!-- Formatting Guide -->
                            <transition name="slide">
                                <FormattingGuide v-if="showGuide" />
                            </transition>
                        </div>
                    </div>
                    <div class="flex gap-3 px-6 pb-6">
                        <button @click="savePost" :disabled="saving" class="flex-1 py-3 text-white font-semibold rounded-xl text-sm
                     transition-all hover:scale-105 disabled:opacity-50"
                            style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                            {{ saving ? 'Saving...' : modal.editing ? 'Update Post' : 'Publish Post' }}
                        </button>
                        <button @click="modal.show = false"
                            class="flex-1 py-3 rounded-xl text-sm border hover:bg-white/5"
                            style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0
}

.slide-enter-active,
.slide-leave-active {
    transition: all .3s ease
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px)
}

.modal-enter-active,
.modal-leave-active {
    transition: all .25s ease
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(.96) translateY(8px)
}
</style>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import api from '@/api/axios'
import FormattingGuide from '@/components/FormattingGuide.vue'

const posts = ref([])
const categories = ref([])
const tags = ref([])
const categoryQuery = ref('')
const tagQuery = ref('')
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')
const showGuide = ref(false)
const pagination = reactive({ current_page: 1, last_page: 1 })
const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({
    title: '', body: '', image: '', hero_image: '',
    category_id: '', status: 'draft', tags: [],
})

const filteredTags = computed(() => {
    const query = tagQuery.value.trim().toLowerCase()
    if (!query) return tags.value
    return tags.value.filter(tag => tag.name?.toLowerCase().includes(query))
})

onMounted(async () => {
    const [cRes, tRes] = await Promise.all([
        api.get('/categories?type=blog'),
        api.get('/tags'),
    ])
    categories.value = normalizeItems(cRes.data)
    tags.value = normalizeItems(tRes.data)
    fetchPosts()
})

async function fetchPosts(page = 1) {
    const { data } = await api.get('/admin/posts', { params: { page } })
    posts.value = data.data.data
    pagination.current_page = data.data.current_page
    pagination.last_page = data.data.last_page
}
function openAdd() {
    Object.assign(form, { title: '', body: '', image: '', category_id: '', status: 'draft', tags: [] })
    categoryQuery.value = ''
    tagQuery.value = ''
    modal.editing = false; modal.editId = null; modal.show = true
}
function openEdit(post) {
    const normalizedTags = (post.tags || []).map(tag => Number(tag.id))
    Object.assign(form, {
        title: post.title, body: post.body,
        image: post.image || '', category_id: post.category_id || '',
        status: post.status, tags: normalizedTags,
    })
    categoryQuery.value = post.category?.name || categories.value.find(cat => Number(cat.id) === Number(post.category_id))?.name || ''
    tagQuery.value = ''
    modal.editing = true; modal.editId = post.id; modal.show = true
}
async function savePost() {
    saving.value = true
    try {
        syncCategorySelection()
        const payload = {
            ...form,
            category_id: form.category_id || null,
            category: categoryQuery.value.trim() || null,
            tags: form.tags.map(Number),
        }
        modal.editing
            ? await api.put(`/admin/posts/${modal.editId}`, payload)
            : await api.post('/admin/posts', payload)
        modal.show = false; showAlert('Post saved.', 'success'); fetchPosts()
    } catch (err) { showAlert(err.response?.data?.message || 'Failed.', 'error') }
    finally { saving.value = false }
}
async function deletePost(post) {
    if (!confirm(`Delete "${post.title}"?`)) return
    await api.delete(`/admin/posts/${post.id}`)
    showAlert('Post deleted.', 'success'); fetchPosts()
}
function showAlert(msg, type = 'success') {
    alertMsg.value = msg; alertType.value = type
    setTimeout(() => alertMsg.value = '', 3000)
}

function normalizeItems(response) {
    if (Array.isArray(response)) return response
    if (Array.isArray(response?.data)) return response.data
    if (Array.isArray(response?.data?.data)) return response.data.data
    if (Array.isArray(response?.items)) return response.items
    return []
}

function syncCategorySelection() {
    const match = categories.value.find(cat =>
        cat.name?.trim().toLowerCase() === categoryQuery.value.trim().toLowerCase()
    )
    form.category_id = match ? Number(match.id) : ''
}

function selectCategory(category) {
    categoryQuery.value = category.name
    form.category_id = Number(category.id)
}

function toggleTag(tagId) {
    const normalizedId = Number(tagId)
    if (form.tags.includes(normalizedId)) {
        form.tags = form.tags.filter(id => Number(id) !== normalizedId)
        return
    }
    form.tags.push(normalizedId)
}
</script>
