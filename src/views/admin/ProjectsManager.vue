<template>
    <div style="background:#05080F;min-height:100vh;">
        <div class="max-w-7xl mx-auto px-6 py-8">

            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest mb-1"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">Admin Panel</p>
                    <h1 class="font-bold text-white text-2xl" style="font-family:'Georgia',serif;">
                        Projects Manager
                    </h1>
                    <p class="text-sm mt-1" style="color:#A8C4E8;font-family:system-ui;">
                        {{ projects.length }} project{{ projects.length !== 1 ? 's' : '' }} total
                    </p>
                </div>
                <button @click="openAdd()" class="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold
                 rounded-xl transition-all hover:scale-105"
                    style="background:#3B82F6;box-shadow:0 0 16px #3B82F635;font-family:system-ui;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Project
                </button>
            </div>

            <transition name="fade">
                <div v-if="alertMsg" class="mb-5 p-4 rounded-xl border flex items-center gap-3 text-sm" :style="alertType === 'success'
                    ? 'background:#052e16;border-color:#16a34a40;color:#4ade80;'
                    : 'background:#1a0505;border-color:#dc262640;color:#f87171;'" style="font-family:system-ui;">
                    {{ alertMsg }}
                </div>
            </transition>

            <div class="rounded-2xl border overflow-hidden" style="background:#0D1220;border-color:#1e3a5f;">
                <div class="px-6 py-5 border-b" style="border-color:#0f1f38;">
                    <h2 class="font-bold text-white" style="font-family:'Georgia',serif;">All Projects</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr style="border-bottom:1px solid #0f1f38;">
                                <th v-for="h in ['Project', 'Category', 'Featured', 'Links', 'Actions']" :key="h"
                                    class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">{{ h }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in projects" :key="p.id" class="group transition-colors"
                                style="border-bottom:1px solid #0f1f38;" onmouseover="this.style.background='#0a1628'"
                                onmouseout="this.style.background='transparent'">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex
                                items-center justify-center"
                                            style="background:linear-gradient(135deg,#0a1628,#1e3a5f);">
                                            <img v-if="p.image" :src="p.image" class="w-full h-full object-cover" />
                                            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                stroke="#1e3a5f" stroke-width="1.5">
                                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                                <path d="M8 21h8M12 17v4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-white text-sm"
                                                style="font-family:system-ui;">{{ p.title }}</div>
                                            <div class="text-xs mt-0.5" style="color:#475569;font-family:system-ui;">
                                                {{ p.description?.substring(0, 50) }}...
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="p.category" class="text-xs font-semibold px-2.5 py-1 rounded-full"
                                        style="background:#3B82F615;color:#60A5FA;
                    border:1px solid #3B82F630;font-family:system-ui;">
                                        {{ p.category }}
                                    </span>
                                    <span v-else style="color:#475569;font-size:12px;">—</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="flex items-center gap-1.5 text-xs font-medium" :style="p.is_featured
                                        ? 'color:#F59E0B;'
                                        : 'color:#475569;'" style="font-family:system-ui;">
                                        <span>{{ p.is_featured ? '★' : '☆' }}</span>
                                        {{ p.is_featured ? 'Featured' : 'No' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-2">
                                        <a v-if="p.project_url" :href="p.project_url" target="_blank"
                                            class="text-xs px-2.5 py-1 rounded-lg border transition-colors hover:scale-105"
                                            style="border-color:#3B82F630;color:#60A5FA;
                      background:#3B82F610;font-family:system-ui;">
                                            Live
                                        </a>
                                        <a v-if="p.github_url" :href="p.github_url" target="_blank"
                                            class="text-xs px-2.5 py-1 rounded-lg border transition-colors hover:scale-105"
                                            style="border-color:#1e3a5f;color:#A8C4E8;
                      background:#05080F;font-family:system-ui;">
                                            GitHub
                                        </a>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <button @click="openEdit(p)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                             border transition-all hover:scale-105" style="border-color:#1e3a5f;color:#A8C4E8;
                      background:#05080F;font-family:system-ui;">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button @click="deleteProject(p)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
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
                            <tr v-if="projects.length === 0">
                                <td colspan="5" class="text-center py-16">
                                    <div class="text-4xl mb-3">💻</div>
                                    <p class="text-white font-medium mb-1" style="font-family:system-ui;">
                                        No projects yet
                                    </p>
                                    <p class="text-xs" style="color:#475569;font-family:system-ui;">
                                        Click "Add Project" to showcase your work.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <transition name="modal">
            <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 px-4"
                style="background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);" @click.self="modal.show = false">
                <div class="rounded-2xl border w-full max-w-xl shadow-2xl max-h-screen overflow-y-auto"
                    style="background:#0D1220;border-color:#1e3a5f;">
                    <div class="flex items-center justify-between px-6 py-5 border-b sticky top-0 z-10"
                        style="border-color:#0f1f38;background:#0D1220;">
                        <h3 class="font-bold text-white text-lg" style="font-family:'Georgia',serif;">
                            {{ modal.editing ? 'Edit Project' : 'Add Project' }}
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
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Title</label>
                            <input v-model="form.title" type="text" placeholder="Project name"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Description</label>
                            <textarea v-model="form.description" rows="3" placeholder="Project description..."
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'"
                                onblur="this.style.borderColor='#1e3a5f'"></textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Category</label>
                            <input v-model="form.category" type="text" placeholder="e.g. Web App"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Hero Image URL (Hero
                                Section Background)</label>
                            <input v-model="form.hero_image" type="text" placeholder="https://... (for page header)"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Project Image URL
                                (Showcase Section)</label>
                            <input v-model="form.image" type="text" placeholder="https://... (for project showcase)"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Live URL</label>
                                <input v-model="form.project_url" type="url" placeholder="https://..."
                                    class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                    style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                    onfocus="this.style.borderColor='#3B82F6'"
                                    onblur="this.style.borderColor='#1e3a5f'" />
                            </div>
                            <div>
                                <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">GitHub URL</label>
                                <input v-model="form.github_url" type="url" placeholder="https://github.com/..."
                                    class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                    style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                    onfocus="this.style.borderColor='#3B82F6'"
                                    onblur="this.style.borderColor='#1e3a5f'" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Technologies
                                (comma-separated)</label>
                            <textarea v-model="form.tech_stack" rows="2"
                                placeholder="e.g. Vue.js, Laravel, MySQL, Tailwind CSS"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'"
                                onblur="this.style.borderColor='#1e3a5f'"></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Order</label>
                                <input v-model="form.order" type="number"
                                    class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                    style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                    onfocus="this.style.borderColor='#3B82F6'"
                                    onblur="this.style.borderColor='#1e3a5f'" />
                            </div>
                            <div class="flex items-center gap-3 pt-8">
                                <div class="relative">
                                    <input type="checkbox" id="featured" v-model="form.is_featured" class="sr-only" />
                                    <div @click="form.is_featured = !form.is_featured"
                                        class="w-10 h-6 rounded-full cursor-pointer transition-all flex items-center px-0.5"
                                        :style="form.is_featured
                                            ? 'background:#3B82F6;box-shadow:0 0 8px #3B82F640;'
                                            : 'background:#1e3a5f;'">
                                        <div class="w-5 h-5 rounded-full bg-white shadow transition-transform"
                                            :style="form.is_featured ? 'transform:translateX(16px);' : ''"></div>
                                    </div>
                                </div>
                                <label for="featured" class="text-sm cursor-pointer"
                                    style="color:#A8C4E8;font-family:system-ui;"
                                    @click="form.is_featured = !form.is_featured">
                                    Mark as featured
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-3 px-6 pb-6">
                        <button @click="saveProject" :disabled="saving" class="flex-1 py-3 text-white font-semibold rounded-xl text-sm
                     transition-all hover:scale-105 disabled:opacity-50"
                            style="background:#3B82F6;box-shadow:0 0 16px #3B82F635;font-family:system-ui;">
                            {{ saving ? 'Saving...' : 'Save Project' }}
                        </button>
                        <button @click="modal.show = false"
                            class="flex-1 py-3 rounded-xl text-sm border hover:bg-white/5"
                            style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
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
import { ref, reactive, onMounted } from 'vue'
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

onMounted(fetchProjects)

async function fetchProjects() {
    try {
        const { data } = await api.get('/projects')
        projects.value = data.data || []
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
    // Validate required fields
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

        // Ensure boolean is properly sent
        if (payload.is_featured === undefined) {
            payload.is_featured = false
        }
        if (!payload.order) {
            payload.order = 0
        }

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
