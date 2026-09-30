<template>
    <div class="max-w-7xl mx-auto px-6 py-10">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div class="space-y-1">
                <h1 class="font-serif text-3xl font-bold text-white tracking-tight">
                    Pricing <span style="color:#8B5CF6;">Plans</span>
                </h1>
                <p class="text-sm opacity-60 font-medium">
                    Define your service tiers and value propositions.
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
                <span class="relative z-10">Create New Plan</span>
            </button>
        </div>

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

        <!-- Pricing Plans Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="plan in plans" :key="plan.id" class="rounded-3xl border overflow-hidden transition-all hover:scale-[1.02]"
                style="background:rgba(25, 18, 38, 0.6);border-color:rgba(139, 92, 246, 0.2);box-shadow:0 20px 40px -10px rgba(0,0,0,0.5);">

                <!-- Plan Header -->
                <div class="px-8 py-6 text-center relative overflow-hidden" :style="plan.is_popular ? 'background:linear-gradient(135deg, #8B5CF6, #6D28D9)' : 'background:rgba(139, 92, 246, 0.1)'">
                    <div v-if="plan.is_popular" class="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-tighter">
                        Most Popular
                    </div>
                    <h3 class="font-serif text-2xl font-bold text-white mb-2">{{ plan.name }}</h3>
                    <div class="flex items-baseline justify-center gap-1">
                        <span class="text-3xl font-bold text-white">$</span>
                        <span class="text-5xl font-black text-white tracking-tight">{{ plan.price }}</span>
                        <span class="text-xs font-bold uppercase opacity-60">/ {{ plan.duration || 'project' }}</span>
                    </div>
                </div>

                <!-- Plan Body -->
                <div class="p-8 space-y-6">
                    <div class="space-y-3">
                        <div class="text-xs font-bold uppercase tracking-wider opacity-40">Features Included</div>
                        <ul class="space-y-3">
                            <li v-for="(feat, idx) in plan.features" :key="idx" class="flex items-center gap-3 text-sm opacity-80">
                                <div class="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span>{{ feat }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="pt-6 border-t flex items-center justify-between" style="border-color:rgba(139, 92, 246, 0.1);">
                        <span class="text-xs font-medium opacity-40">Priority: #{{ plan.order }}</span>
                        <div class="flex gap-2">
                            <button @click="openEdit(plan)" class="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </button>
                            <button @click="deletePlan(plan)" class="p-2 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Editor Modal -->
        <transition name="modal">
            <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
                style="background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);" @click.self="modal.show = false">
                <div class="rounded-3xl border w-full max-w-xl shadow-2xl max-h-[88vh] flex flex-col overflow-hidden transition-all animate-in zoom-in-95 duration-200"
                    style="background:#120E1C;border-color:rgba(139, 92, 246, 0.35);box-shadow:0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(139,92,246,0.2);">
                    
                    <!-- Fixed Header -->
                    <div class="flex items-center justify-between px-7 py-5 border-b shrink-0"
                        style="border-color:rgba(139, 92, 246, 0.15);background:#120E1C;">
                        <h3 class="font-serif text-xl font-bold text-white">
                            {{ modal.editing ? 'Refine Pricing Plan' : 'New Pricing Plan' }}
                        </h3>
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
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Plan Name *</label>
                                <input v-model="form.name" type="text" placeholder="e.g. Professional"
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                            </div>
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Price *</label>
                                <div class="flex gap-2">
                                    <span class="flex items-center justify-center px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold">$</span>
                                    <input v-model="form.price" type="text" placeholder="499"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Billing Frequency</label>
                                <select v-model="form.duration" class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border cursor-pointer"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;">
                                    <option value="month" style="background:#120E1C;">Monthly</option>
                                    <option value="year" style="background:#120E1C;">Yearly</option>
                                    <option value="project" style="background:#120E1C;">Per Project</option>
                                    <option value="hour" style="background:#120E1C;">Hourly</option>
                                </select>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Display Priority</label>
                                <input v-model="form.order" type="number"
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase tracking-wider text-purple-200/60">Key Features (One per line)</label>
                            <textarea v-model="featureText" rows="4" placeholder="Multi-Tenant Architecture&#10;RBAC &amp; Granular Permissions&#10;RESTful API Endpoints&#10;24/7 Security Audit Support"
                                class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border resize-none"
                                style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"></textarea>
                        </div>

                        <div class="flex items-center gap-3 pt-1">
                            <div class="relative flex items-center">
                                <input type="checkbox" id="popular" v-model="form.is_popular" class="sr-only" />
                                <div class="w-10 h-6 bg-white/10 rounded-full transition-colors cursor-pointer"
                                     :class="{ '!bg-purple-600': form.is_popular }"
                                     @click="form.is_popular = !form.is_popular">
                                    <div class="w-4 h-4 bg-white rounded-full transition-transform translate-x-1 translate-y-1"
                                         :class="{ '!translate-x-5': form.is_popular }"></div>
                                </div>
                            </div>
                            <label for="popular" class="text-sm font-medium cursor-pointer text-white/80"
                                @click="form.is_popular = !form.is_popular">
                                Highlight as Most Popular / Recommended Plan
                            </label>
                        </div>
                    </div>

                    <!-- Fixed Sticky Action Footer -->
                    <div class="flex items-center gap-4 px-7 py-4 border-t shrink-0 bg-[#120E1C]"
                        style="border-color:rgba(139, 92, 246, 0.15);box-shadow:0 -10px 25px rgba(0,0,0,0.5);">
                        <button @click="savePlan" :disabled="saving" class="flex-1 py-3.5 text-white font-bold rounded-2xl text-sm
                            transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-0"
                            style="background:#8B5CF6;box-shadow:0 8px 20px -4px #8B5CF650;">
                            <span>{{ saving ? 'Saving...' : (modal.editing ? 'Update Plan' : 'Create Plan') }}</span>
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
import { ref, reactive, onMounted } from 'vue'
import api from '@/api/axios'

const plans = ref([])
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')

const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({ name: '', price: '', duration: 'month', is_popular: false, order: 0 })
const featureText = ref('')

async function fetchPlans() {
    try {
        const { data } = await api.get('/pricing')
        plans.value = data.data || []
    } catch (err) {
        showAlert('Failed to load plans', 'error')
    }
}

function openAdd() {
    Object.assign(form, { name: '', price: '', duration: 'month', is_popular: false, order: 0 })
    featureText.value = ''
    modal.editing = false; modal.editId = null; modal.show = true
}

function openEdit(p) {
    Object.assign(form, { ...p })
    featureText.value = Array.isArray(p.features) ? p.features.join('\n') : ''
    modal.editing = true; modal.editId = p.id; modal.show = true
}

async function savePlan() {
    if (!form.name?.trim() || !form.price?.trim()) {
        showAlert('Plan name and price are required', 'error')
        return
    }

    saving.value = true
    try {
        const payload = {
            ...form,
            features: featureText.value.split('\n').filter(f => f.trim() !== '')
        }
        modal.editing
            ? await api.put(`/admin/pricing/${modal.editId}`, payload)
            : await api.post('/admin/pricing', payload)
        modal.show = false; showAlert('Pricing plan saved successfully!', 'success'); fetchPlans()
    } catch (err) { showAlert(err.response?.data?.message || 'Failed to save plan', 'error') }
    finally { saving.value = false }
}

async function deletePlan(p) {
    if (!confirm(`Delete plan "${p.name}"?`)) return
    try {
        await api.delete(`/admin/pricing/${p.id}`)
        showAlert('Pricing plan deleted successfully!', 'success'); fetchPlans()
    } catch (err) { showAlert(err.response?.data?.message || 'Failed to delete plan', 'error') }
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg; alertType.value = type
    setTimeout(() => alertMsg.value = '', 3000)
}

onMounted(fetchPlans)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
.modal-enter-active, .modal-leave-active { transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(.95) translateY(20px); }
</style>
