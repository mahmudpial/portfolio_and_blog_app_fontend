<template>
    <div style="background:#0A0610;min-height:100vh;color:#fff;font-family:system-ui;">
        <div class="max-w-7xl mx-auto px-6 py-10">

            <!-- Header Section -->
            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div class="space-y-1">
                    <h1 class="font-serif text-3xl font-bold text-white tracking-tight">
                        Project <span style="color:#8B5CF6;">Portfolio</span>
                    </h1>
                    <p class="text-sm opacity-60 font-medium">
                        Managing {{ projects.length }} professional works in your showcase.
                    </p>
                </div>
                <button @click="openAdd" class="group relative flex items-center gap-3 px-6 py-3 text-white text-sm font-bold
                 rounded-2xl transition-all active:scale-95 overflow-hidden"
                    style="background:#8B5CF6;box-shadow:0 10px 20px -5px #8B5CF640;">
                    <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <svg class="relative z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="3">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span class="relative z-10">Add New Project</span>
                </button>
            </div>

            <!-- Alert System -->
            <transition name="fade">
                <div v-if="alertMsg" class="mb-8 p-4 rounded-2xl border-l-4 flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-4"
                    :style="alertType === 'success'
                        ? 'background:rgba(16, 185, 129, 0.1);border-color:#10b981;color:#34d399;'
                        : 'background:rgba(239, 68, 68, 0.1);border-color:#ef4444;color:#f87171;'">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :style="alertType === 'success' ? 'background:#10b981' : 'background:#ef4444'">
                        <svg class="text-white" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    {{ alertMsg }}
                </div>
            </transition>

            <!-- Main Projects Grid/Table -->
            <div class="rounded-3xl border overflow-hidden backdrop-blur-xl transition-all" style="background:rgba(25, 18, 38, 0.6);border-color:rgba(139, 92, 246, 0.2);">
                <div class="px-8 py-6 border-b flex items-center justify-between" style="border-color:rgba(139, 92, 246, 0.1);">
                    <h2 class="font-serif text-xl font-semibold text-white">Curated Works</h2>
                    <div class="text-xs font-medium opacity-40 uppercase tracking-widest">Sorted by Order</div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-white/5">
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Project Details</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Category</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Visibility</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Links</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y" style="border-color:rgba(139, 92, 246, 0.05);">
                        <tr v-for="p in paginatedProjects" :key="p.id" class="group transition-all hover:bg-white/[0.02]">
                            <td class="px-8 py-5">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-purple-500/50 transition-all">
                                        <img v-if="p.image" :src="p.image" class="w-full h-full object-cover" />
                                        <div v-else class="w-full h-full bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">{{ p.title }}</div>
                                        <div class="text-xs opacity-50 truncate max-w-xs">{{ p.description }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-5">
                                <span v-if="p.category" class="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter"
                                    style="background:rgba(139, 92, 246, 0.1);color:#C084FC;border:1px solid rgba(139, 92, 246, 0.2);">
                                    {{ p.category }}
                                </span>
                                <span v-else class="text-xs opacity-30">—</span>
                            </td>
                            <td class="px-8 py-5">
                                <div class="flex items-center gap-2">
                                    <div class="w-2 h-2 rounded-full" :style="p.is_featured ? 'background:#F59E0B;box-shadow:0 0 8px #F59E0B;' : 'background:#3B2A5A;'"></div>
                                    <span class="text-xs font-medium" :style="p.is_featured ? 'color:#F59E0B;' : 'color:#475569;'">
                                        {{ p.is_featured ? 'Featured' : 'Standard' }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-8 py-5">
                                <div class="flex gap-3">
                                    <a v-if="p.project_url" :href="p.project_url" target="_blank"
                                        class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all" title="View Live Site">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="2" y1="12" x2="22" y2="12" />
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                    </a>
                                    <a v-if="p.github_url" :href="p.github_url" target="_blank"
                                        class="p-2 rounded-lg bg-white/5 text-white hover:bg-purple-500/20 transition-all" title="GitHub Repository">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 0-5-4.8-5-4.8s3-.3 5-.3 5 3.8 5 3.8 5-4.8 5-4.8-5-.3-5-.3-5 3.8-5 3.8z"/><path d="M20 7h-9"/><path d="M14 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M10 11V9a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                                    </a>
                                </div>
                            </td>
                            <td class="px-8 py-5 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <button @click="openEdit(p)" class="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    <button @click="deleteProject(p)" class="p-2 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                            <tr v-if="projects.length === 0">
                                <td colspan="5" class="text-center py-24">
                                    <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-4xl">📂</div>
                                    <p class="text-white font-bold text-lg mb-1">Your gallery is empty</p>
                                    <p class="text-sm opacity-40">Start by adding your first masterpiece.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Controls (3 per page) -->
                <div v-if="totalPages > 1"
                    class="flex items-center justify-between px-8 py-5 border-t flex-wrap gap-4"
                    style="border-color:rgba(139, 92, 246, 0.1);background:rgba(18, 14, 28, 0.4);">
                    <span class="text-xs" style="color:#94A3B8;font-family:system-ui;">
                        Showing {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, projects.length) }} of {{ projects.length }} projects
                    </span>
                    <div class="flex items-center gap-2">
                        <button :disabled="currentPage === 1"
                            @click="goToPage(currentPage - 1)"
                            class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                            style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
                            @click="goToPage(currentPage + 1)"
                            class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                            style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                            Next
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Enhanced Modal -->
            <transition name="modal">
                <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 px-4"
                    style="background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);" @click.self="modal.show = false">
                    <div class="rounded-3xl border w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto transition-all animate-in zoom-in-95 duration-200"
                        style="background:#120E1C;border-color:rgba(139, 92, 246, 0.3);">
                        <div class="flex items-center justify-between px-8 py-6 border-b sticky top-0 z-10"
                            style="border-color:rgba(139, 92, 246, 0.1);background:#120E1C;">
                            <h3 class="font-serif text-2xl font-bold text-white">
                                {{ modal.editing ? 'Refine Project' : 'New Project' }}
                            </h3>
                            <button @click="modal.show = false"
                                class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div class="p-8 space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider opacity-50">Project Title</label>
                                    <input v-model="form.title" type="text" placeholder="e.g. AI Portfolio"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                        @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />
                                </div>
                                <div class="space-y-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider opacity-50">Category</label>
                                    <input v-model="form.category" type="text" placeholder="e.g. Fullstack Development"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                        @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider opacity-50">Description</label>
                                <textarea v-model="form.description" rows="4" placeholder="Describe the impact and your role..."
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border resize-none"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                    @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'"></textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider opacity-50">Project Image URL</label>
                                    <input v-model="form.image" type="text" placeholder="https://... (thumbnail)"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                        @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />
                                </div>
                                <div class="space-y-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider opacity-50">Hero Image URL</label>
                                    <input v-model="form.hero_image" type="text" placeholder="https://... (full header)"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                        @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider opacity-50">Live URL</label>
                                    <input v-model="form.project_url" type="url" placeholder="https://..."
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                        @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />
                                </div>
                                <div class="space-y-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider opacity-50">GitHub URL</label>
                                    <input v-model="form.github_url" type="url" placeholder="https://github.com/..."
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                        @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider opacity-50">Technologies</label>
                                <textarea v-model="form.tech_stack" rows="2"
                                    placeholder="e.g. Vue.js, Laravel, MySQL, Tailwind CSS"
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border resize-none"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                    @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'"></textarea>
                            </div>

                            <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div class="flex items-center gap-3">
                                    <div class="relative">
                                        <input type="checkbox" id="featured" v-model="form.is_featured" class="sr-only" />
                                        <div @click="form.is_featured = !form.is_featured"
                                            class="w-11 h-6 rounded-full cursor-pointer transition-all flex items-center px-1"
                                            :style="form.is_featured ? 'background:#8B5CF6;box-shadow:0 0 12px #8B5CF660;' : 'background:#3B2A5A;'">
                                            <div class="w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                                                :style="form.is_featured ? 'transform:translateX(20px);' : ''"></div>
                                        </div>
                                    </div>
                                    <label for="featured" class="text-sm font-medium cursor-pointer text-white/80"
                                        @click="form.is_featured = !form.is_featured">
                                        Featured Showcase
                                    </label>
                                </div>
                                <div class="flex items-center gap-3">
                                    <label class="text-xs font-bold uppercase tracking-wider opacity-50">Order</label>
                                    <input v-model="form.order" type="number"
                                        class="w-20 px-3 py-2 rounded-xl text-sm focus:outline-none border text-center"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-4 px-8 pb-8">
                            <button @click="saveProject" :disabled="saving" class="flex-1 py-4 text-white font-bold rounded-2xl text-sm
                                transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                style="background:#8B5CF6;box-shadow:0 10px 20px -5px #8B5CF640;">
                                {{ saving ? 'Processing...' : (modal.editing ? 'Update Project' : 'Create Project') }}
                            </button>
                            <button @click="modal.show = false"
                                class="px-8 py-4 rounded-2xl text-sm font-bold border transition-all hover:bg-white/5"
                                style="border-color:rgba(139, 92, 246, 0.2);color:#C9B9E8;">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
.modal-enter-active, .modal-leave-active { transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(.95) translateY(20px); }
</style>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/api/axios'

const projects = ref([])
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')
const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({
    title: '', description: '', image: '', hero_image: '',
    project_url: '', github_url: '', category: '',
    is_featured: false, order: 0, tech_stack: ''
})

// ── 3 ITEMS PER PAGE PAGINATION ───────────────────────────
const perPage = 3
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(projects.value.length / perPage) || 1)

const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return projects.value.slice(start, start + perPage)
})

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

onMounted(fetchProjects)

async function fetchProjects() {
    try {
        const { data } = await api.get('/projects')
        projects.value = data.data || []
        if (currentPage.value > totalPages.value) {
            currentPage.value = Math.max(1, totalPages.value)
        }
    } catch (err) {
        console.error('Error fetching projects:', err)
        showAlert('Failed to load projects: ' + (err.response?.data?.message || err.message), 'error')
    }
}
function openAdd() {
    Object.assign(form, {
        title: '', description: '', image: '', hero_image: '',
        project_url: '', github_url: '', category: '', is_featured: false, order: 0, tech_stack: ''
    })
    modal.editing = false; modal.editId = null; modal.show = true
}
function openEdit(p) {
    Object.assign(form, { ...p }); modal.editing = true; modal.editId = p.id; modal.show = true
}
async function saveProject() {
    if (!form.title?.trim()) {
        showAlert('Project title is required', 'error')
        return
    }
    if (!form.description?.trim()) {
        showAlert('Project description is required', 'error')
        return
    }

    saving.value = true
    try {
        const payload = { ...form }
        if (payload.is_featured === undefined) payload.is_featured = false
        if (!payload.order) payload.order = 0

        if (modal.editing) {
            await api.put(`/admin/projects/${modal.editId}`, payload)
            showAlert('Project updated successfully!', 'success')
        } else {
            await api.post('/admin/projects', payload)
            showAlert('Project created successfully!', 'success')
        }

        modal.show = false
        await fetchProjects()
    } catch (err) {
        console.error('Error saving project:', err.response?.data || err)
        const errorMsg = err.response?.data?.message || err.response?.data?.errors?.[Object.keys(err.response?.data?.errors || {})[0]]?.[0] || 'Failed to save project'
        showAlert(errorMsg, 'error')
    } finally {
        saving.value = false
    }
}
async function deleteProject(p) {
    if (!confirm(`Delete "${p.title}"?`)) return

    try {
        await api.delete(`/admin/projects/${p.id}`)
        showAlert('Project deleted successfully!', 'success')
        await fetchProjects()
    } catch (err) {
        console.error('Error deleting project:', err.response?.data || err)
        showAlert(err.response?.data?.message || 'Failed to delete project', 'error')
    }
}
function showAlert(msg, type = 'success') {
    alertMsg.value = msg; alertType.value = type
    setTimeout(() => alertMsg.value = '', 3000)
}
</script>
