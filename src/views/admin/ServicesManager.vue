<template>
    <div class="max-w-7xl mx-auto px-6 py-10">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div class="space-y-1">
                <h1 class="font-serif text-3xl font-bold text-white tracking-tight">
                    Services <span style="color:#8B5CF6;">Management</span>
                </h1>
                <p class="text-sm opacity-60 font-medium">
                    Managing {{ services.length }} professional capabilities and expertise levels.
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
                <span class="relative z-10">Add New Service</span>
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

        <!-- Main Services Grid/Table -->
        <div class="rounded-3xl border overflow-hidden backdrop-blur-xl transition-all" style="background:rgba(25, 18, 38, 0.6);border-color:rgba(139, 92, 246, 0.2);">
            <div class="px-8 py-6 border-b flex items-center justify-between" style="border-color:rgba(139, 92, 246, 0.1);">
                <h2 class="font-serif text-xl font-semibold text-white">Services Directory</h2>
                <div class="text-xs font-medium opacity-40 uppercase tracking-widest">Sorted by Order</div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-white/5">
                        <tr style="border-bottom:1px solid rgba(139, 92, 246, 0.1);">
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Service &amp; Description</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Icon</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Order</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y" style="border-color:rgba(139, 92, 246, 0.05);">
                        <tr v-for="service in services" :key="service.id" class="group transition-all hover:bg-white/[0.02]">
                            <td class="px-8 py-5">
                                <div class="flex items-start gap-4">
                                    <div class="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-purple-500/50 transition-all flex items-center justify-center shrink-0 text-xl"
                                        style="background:linear-gradient(135deg,#180F28,#3B2A5A);">
                                        <span v-if="service.icon">{{ service.icon }}</span>
                                        <span v-else class="text-white font-bold text-xs">{{ (service.title || service.name || 'S').slice(0, 2).toUpperCase() }}</span>
                                    </div>
                                    <div>
                                        <div class="font-bold text-white text-sm group-hover:text-purple-400 transition-colors" style="font-family:system-ui;">
                                            {{ service.title || service.name }}
                                        </div>
                                        <p v-if="service.description" class="text-xs text-white/60 mt-1 max-w-lg line-clamp-2 leading-relaxed" style="font-family:system-ui;">
                                            {{ service.description }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-5">
                                <span class="text-base px-3 py-1.5 rounded-xl border inline-flex items-center justify-center"
                                    style="background:rgba(139, 92, 246, 0.1);border-color:rgba(139, 92, 246, 0.2);">
                                    {{ service.icon || '💻' }}
                                </span>
                            </td>
                            <td class="px-8 py-5">
                                <span class="text-xs font-medium opacity-60" style="font-family:system-ui;">
                                    #{{ service.order || 0 }}
                                </span>
                            </td>
                            <td class="px-8 py-5 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <button @click="openEdit(service)" class="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all" title="Edit">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    <button @click="deleteService(service)" class="p-2 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="services.length === 0">
                            <td colspan="4" class="text-center py-24">
                                <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-4xl">⚡</div>
                                <p class="text-white font-bold text-lg mb-1">No services listed</p>
                                <p class="text-sm opacity-40">Start documenting your professional services.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Enhanced Modal -->
        <transition name="modal">
            <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 px-4"
                style="background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);" @click.self="modal.show = false">
                <div class="rounded-3xl border w-full max-w-lg shadow-2xl transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
                    style="background:#120E1C;border-color:rgba(139, 92, 246, 0.3);">
                    <div class="flex items-center justify-between px-8 py-6 border-b sticky top-0 z-10 shrink-0"
                        style="border-color:rgba(139, 92, 246, 0.1);background:#120E1C;">
                        <h3 class="font-serif text-2xl font-bold text-white">
                            {{ modal.editing ? 'Refine Service' : 'New Service' }}
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
                    <div class="p-8 space-y-5 overflow-y-auto custom-scrollbar flex-1">
                        <div v-for="f in serviceFields" :key="f.key" class="space-y-1.5">
                            <label class="block text-xs font-bold uppercase tracking-wider opacity-60 text-white">
                                {{ f.label }}
                            </label>

                            <!-- Textarea for description -->
                            <textarea v-if="f.type === 'textarea'" v-model="form[f.key]" rows="3" :placeholder="f.placeholder"
                                class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border resize-none"
                                style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='rgba(139, 92, 246, 0.2)'"></textarea>

                            <!-- Regular inputs -->
                            <input v-else v-model="form[f.key]" :type="f.type" :placeholder="f.placeholder"
                                class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                                onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />
                        </div>
                    </div>
                    <div class="flex gap-4 px-8 py-6 border-t shrink-0" style="border-color:rgba(139, 92, 246, 0.1);">
                        <button @click="saveService" :disabled="saving" class="flex-1 py-3.5 text-white font-bold rounded-2xl text-sm
                            transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                            style="background:#8B5CF6;box-shadow:0 10px 20px -5px #8B5CF640;">
                            {{ saving ? 'Saving...' : (modal.editing ? 'Update Service' : 'Save Service') }}
                        </button>
                        <button @click="modal.show = false"
                            class="px-6 py-3.5 rounded-2xl text-sm font-bold border transition-all hover:bg-white/5"
                            style="border-color:rgba(139, 92, 246, 0.2);color:#C9B9E8;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/api/axios'

const services = ref([])
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')
const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({ title: '', name: '', description: '', icon: '💻', order: 0 })

const serviceFields = [
    { key: 'title', label: 'Service Title / Name', type: 'text', placeholder: 'e.g. Full-Stack Web Development' },
    { key: 'icon', label: 'Icon / Emoji', type: 'text', placeholder: 'e.g. 💻 or ⚡ or 🛠️' },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe what this service delivers...' },
    { key: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
]

async function fetchServices() {
    try {
        const { data } = await api.get('/services')
        services.value = data.data || []
    } catch (err) {
        showAlert('Failed to load services', 'error')
    }
}

function openAdd() {
    Object.assign(form, { title: '', name: '', description: '', icon: '💻', order: 0 })
    modal.editing = false; modal.editId = null; modal.show = true
}

function openEdit(s) {
    const titleVal = s.title || s.name || ''
    Object.assign(form, {
        title: titleVal,
        name: titleVal,
        description: s.description || '',
        icon: s.icon || '💻',
        order: s.order || 0
    })
    modal.editing = true; modal.editId = s.id; modal.show = true
}

async function saveService() {
    const titleVal = form.title?.trim() || form.name?.trim()
    if (!titleVal) return showAlert('Service title is required', 'error')
    if (!form.description?.trim()) return showAlert('Service description is required', 'error')

    saving.value = true
    try {
        const payload = {
            title: titleVal,
            name: titleVal,
            description: form.description.trim(),
            icon: form.icon?.trim() || null,
            order: Number(form.order) || 0
        }

        modal.editing
            ? await api.put(`/admin/services/${modal.editId}`, payload)
            : await api.post('/admin/services', payload)

        modal.show = false
        showAlert('Service saved successfully!', 'success')
        fetchServices()
    } catch (err) {
        console.error('Save service error:', err)
        const res = err.response?.data
        let errorText = res?.message || 'Failed to save service'
        if (res?.errors) {
            const firstKey = Object.keys(res.errors)[0]
            if (firstKey && res.errors[firstKey]?.length) {
                errorText = res.errors[firstKey][0]
            }
        }
        showAlert(errorText, 'error')
    } finally {
        saving.value = false
    }
}

async function deleteService(s) {
    if (!confirm(`Delete service "${s.title || s.name}"?`)) return
    try {
        await api.delete(`/admin/services/${s.id}`)
        showAlert('Service deleted successfully!', 'success')
        fetchServices()
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to delete service', 'error')
    }
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg; alertType.value = type
    setTimeout(() => alertMsg.value = '', 4000)
}

onMounted(fetchServices)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
.modal-enter-active, .modal-leave-active { transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(.95) translateY(20px); }
</style>
