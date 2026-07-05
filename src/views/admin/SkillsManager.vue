<template>
    <div style="background:#0A0610;min-height:100vh;">
        <div class="max-w-7xl mx-auto px-6 py-8">

            <!-- Header -->
            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest mb-1"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">Admin Panel</p>
                    <h1 class="font-bold text-white text-2xl" style="font-family:'Georgia',serif;">
                        Skills Manager
                    </h1>
                    <p class="text-sm mt-1" style="color:#C9B9E8;font-family:system-ui;">
                        {{ skills.length }} skill{{ skills.length !== 1 ? 's' : '' }} total
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
                    Add Skill
                </button>
            </div>

            <!-- Alert -->
            <transition name="fade">
                <div v-if="alertMsg" class="mb-5 p-4 rounded-xl border flex items-center gap-3 text-sm" :style="alertType === 'success'
                    ? 'background:#052e16;border-color:#16a34a40;color:#4ade80;'
                    : 'background:#1a0505;border-color:#dc262640;color:#f87171;'" style="font-family:system-ui;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <polyline v-if="alertType === 'success'" points="20 6 9 17 4 12" />
                        <circle v-else cx="12" cy="12" r="10" />
                    </svg>
                    {{ alertMsg }}
                </div>
            </transition>

            <!-- Table card -->
            <div class="rounded-2xl border overflow-hidden" style="background:#120E1C;border-color:#3B2A5A;">
                <div class="px-6 py-5 border-b" style="border-color:#241730;">
                    <h2 class="font-bold text-white" style="font-family:'Georgia',serif;">All Skills</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr style="border-bottom:1px solid #241730;">
                                <th v-for="h in ['Skill', 'Category', 'Proficiency', 'Order', 'Actions']" :key="h"
                                    class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">{{ h }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="skill in skills" :key="skill.id" class="group transition-colors"
                                style="border-bottom:1px solid #241730;" onmouseover="this.style.background='#180F28'"
                                onmouseout="this.style.background='transparent'">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-xl flex items-center justify-center
                                text-xs font-bold text-white flex-shrink-0"
                                            style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                            {{ skill.name.slice(0, 2).toUpperCase() }}
                                        </div>
                                        <span class="font-semibold text-white text-sm" style="font-family:system-ui;">{{
                                            skill.name }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full" style="background:#8B5CF615;color:#C084FC;
                    border:1px solid #8B5CF630;font-family:system-ui;">
                                        {{ skill.category || '—' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 w-52">
                                    <div class="flex items-center gap-3">
                                        <div class="flex-1 h-1.5 rounded-full overflow-hidden"
                                            style="background:#180F28;">
                                            <div class="h-1.5 rounded-full transition-all" :style="{
                                                width: skill.percentage + '%',
                                                background: 'linear-gradient(90deg,#8B5CF6,#C084FC)',
                                                boxShadow: '0 0 6px #8B5CF650'
                                            }"></div>
                                        </div>
                                        <span class="text-xs font-bold flex-shrink-0"
                                            style="color:#C084FC;font-family:system-ui;min-width:32px;">
                                            {{ skill.percentage }}%
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm" style="color:#475569;font-family:system-ui;">
                                    {{ skill.order }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <button @click="openEdit(skill)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                             border transition-all hover:scale-105" style="border-color:#3B2A5A;color:#C9B9E8;
                      background:#0A0610;font-family:system-ui;">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button @click="deleteSkill(skill)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
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
                            <tr v-if="skills.length === 0">
                                <td colspan="5" class="text-center py-16">
                                    <div class="text-4xl mb-3">⚡</div>
                                    <p class="text-white font-medium mb-1" style="font-family:system-ui;">No skills yet
                                    </p>
                                    <p class="text-xs" style="color:#475569;font-family:system-ui;">
                                        Click "Add Skill" to get started.
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
                <div class="rounded-2xl border w-full max-w-md shadow-2xl"
                    style="background:#120E1C;border-color:#3B2A5A;">
                    <div class="flex items-center justify-between px-6 py-5 border-b" style="border-color:#241730;">
                        <h3 class="font-bold text-white text-lg" style="font-family:'Georgia',serif;">
                            {{ modal.editing ? 'Edit Skill' : 'Add Skill' }}
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
                        <div v-for="f in skillFields" :key="f.key">
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                {{ f.label }}
                                <span v-if="f.key === 'percentage'" style="color:#C084FC;">
                                    — {{ form.percentage }}%
                                </span>
                            </label>
                            <input v-model="form[f.key]" :type="f.type" :placeholder="f.placeholder" :min="f.min"
                                :max="f.max" :step="f.step"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                :class="f.type === 'range' ? 'accent-violet-500' : ''" :style="f.type === 'range'
                                    ? 'background:transparent;border:none;padding:8px 0;'
                                    : 'background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;'"
                                onfocus="if(this.type!=='range'){this.style.borderColor='#8B5CF6'}"
                                onblur="if(this.type!=='range'){this.style.borderColor='#3B2A5A'}" />
                            <!-- Range preview bar -->
                            <div v-if="f.type === 'range'" class="w-full h-1.5 rounded-full mt-1 overflow-hidden"
                                style="background:#180F28;">
                                <div class="h-1.5 rounded-full" :style="{
                                    width: form.percentage + '%',
                                    background: 'linear-gradient(90deg,#8B5CF6,#C084FC)'
                                }"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-3 px-6 pb-6">
                        <button @click="saveSkill" :disabled="saving" class="flex-1 py-3 text-white font-semibold rounded-xl text-sm
                     transition-all hover:scale-105 disabled:opacity-50"
                            style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                            {{ saving ? 'Saving...' : 'Save Skill' }}
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

const skills = ref([])
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')
const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({ name: '', category: '', percentage: 50, icon: '', order: 0 })

const skillFields = [
    { key: 'name', label: 'Skill name', type: 'text', placeholder: 'e.g. Vue.js' },
    { key: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Frontend' },
    { key: 'percentage', label: 'Level', type: 'range', min: 0, max: 100, step: 5 },
    { key: 'icon', label: 'Icon class', type: 'text', placeholder: 'fab fa-vuejs' },
    { key: 'order', label: 'Order', type: 'number', placeholder: '0' },
]

onMounted(fetchSkills)

async function fetchSkills() {
    const { data } = await api.get('/skills')
    skills.value = data.data
}
function openAdd() {
    Object.assign(form, { name: '', category: '', percentage: 50, icon: '', order: 0 })
    modal.editing = false; modal.editId = null; modal.show = true
}
function openEdit(s) {
    Object.assign(form, { ...s }); modal.editing = true; modal.editId = s.id; modal.show = true
}
async function saveSkill() {
    saving.value = true
    try {
        modal.editing
            ? await api.put(`/admin/skills/${modal.editId}`, form)
            : await api.post('/admin/skills', form)
        modal.show = false; showAlert('Skill saved.', 'success'); fetchSkills()
    } catch (err) { showAlert(err.response?.data?.message || 'Failed.', 'error') }
    finally { saving.value = false }
}
async function deleteSkill(s) {
    if (!confirm(`Delete "${s.name}"?`)) return
    await api.delete(`/admin/skills/${s.id}`)
    showAlert('Skill deleted.', 'success'); fetchSkills()
}
function showAlert(msg, type = 'success') {
    alertMsg.value = msg; alertType.value = type
    setTimeout(() => alertMsg.value = '', 3000)
}
</script>
