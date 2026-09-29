<template>
    <div class="max-w-5xl mx-auto px-6 py-10">
        <!-- Header -->
        <div class="flex items-center justify-between mb-10">
            <div class="space-y-1">
                <p class="text-xs font-bold uppercase tracking-widest mb-2" style="color:#A78BFA;opacity:0.8;">Configuration</p>
                <h1 class="font-serif text-4xl font-bold text-white tracking-tight">Site <span style="color:#8B5CF6;">Settings</span></h1>
                <p class="text-sm opacity-60 font-medium">Control every detail of your public portfolio and blog.</p>
            </div>
            <button @click="saveSettings" :disabled="saving" class="px-6 py-3 bg-purple-600 text-white text-sm font-bold rounded-2xl transition-all hover:scale-105 disabled:opacity-50 shadow-lg shadow-purple-600/20">
                {{ saving ? 'Saving...' : 'Save All Changes' }}
            </button>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-8 p-1 bg-white/5 rounded-2xl w-fit border border-white/10">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                class="px-6 py-2 rounded-xl text-sm font-medium transition-all"
                :class="activeTab === tab.id ? 'bg-purple-600 text-white shadow-md' : 'text-white/60 hover:bg-white/5'">
                {{ tab.label }}
            </button>
        </div>

        <!-- Settings Content -->
        <div class="grid grid-cols-1 gap-8">
            <div v-for="group in filteredSettings" :key="group.group" class="rounded-3xl border p-8 transition-all"
                style="background:rgba(25, 18, 38, 0.6);border-color:rgba(139, 92, 246, 0.2);">
                <h3 class="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                    <span class="w-2 h-6 bg-purple-500 rounded-full"></span>
                    {{ group.group.toUpperCase() }}
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="setting in group.settings" :key="setting.key" class="space-y-2">
                        <label class="block text-xs font-bold uppercase tracking-wider opacity-50">
                            {{ setting.label }}
                        </label>
                        <input v-if="setting.type === 'text'" v-model="settingsMap[setting.key]" type="text"
                            class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none border transition-all"
                            style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                            @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'" />

                        <textarea v-else-if="setting.type === 'textarea'" v-model="settingsMap[setting.key]" rows="3"
                            class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none border transition-all resize-none"
                            style="background:#0A0610;border-color:rgba(139, 92, 246, 0.2);color:#fff;"
                            @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'"></textarea>

                        <input v-else-if="setting.type === 'color'" v-model="settingsMap[setting.key]" type="color"
                            class="w-full h-12 rounded-xl bg-transparent border-none cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import api from '@/api/axios'

const activeTab = ref('general')
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')
const settingsMap = reactive({})

const tabs = [
    { id: 'general', label: 'General' },
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'footer', label: 'Footer' },
]

// Definition of all settings for the UI
const settingsDefinitions = [
    // General
    { key: 'site_name', label: 'Website Name', group: 'general', type: 'text' },
    { key: 'site_description', label: 'SEO Description', group: 'general', type: 'textarea' },
    { key: 'primary_color', label: 'Theme Primary Color', group: 'general', type: 'color' },

    // Home
    { key: 'home_hero_title', label: 'Hero Title', group: 'home', type: 'text' },
    { key: 'home_hero_subtitle', label: 'Hero Subtitle', group: 'home', type: 'textarea' },
    { key: 'home_cta_text', label: 'CTA Button Text', group: 'home', type: 'text' },
    { key: 'home_hero_image', label: 'Hero Background Image', group: 'home', type: 'text' },

    // About
    { key: 'about_title', label: 'About Section Title', group: 'about', type: 'text' },
    { key: 'about_description', label: 'About Description', group: 'about', type: 'textarea' },
    { key: 'about_image', label: 'About Profile Image', group: 'about', type: 'text' },

    // Footer
    { key: 'footer_text', label: 'Footer Copyright Text', group: 'footer', type: 'text' },
    { key: 'footer_email', label: 'Contact Email', group: 'footer', type: 'text' },
    { key: 'footer_github', label: 'GitHub Profile Link', group: 'footer', type: 'text' },
]

const filteredSettings = computed(() => {
    const groupMap = {}
    settingsDefinitions.forEach(def => {
        if (def.group === activeTab.value) {
            if (!groupMap[def.group]) groupMap[def.group] = { group: def.group, settings: [] }
            groupMap[def.group].settings.push(def)
        }
    })
    return Object.values(groupMap)
})

onMounted(fetchSettings)

async function fetchSettings() {
    try {
        let res
        try {
            res = await api.get('/settings')
        } catch (e) {
            res = await api.get('/admin/settings')
        }
        const settings = res.data?.data || res.data || []
        if (Array.isArray(settings)) {
            settings.forEach(s => {
                if (s && s.key) settingsMap[s.key] = s.value ?? ''
            })
        } else if (typeof settings === 'object' && settings !== null) {
            Object.entries(settings).forEach(([k, v]) => {
                settingsMap[k] = v ?? ''
            })
        }
    } catch (err) {
        showAlert('Failed to load settings', 'error')
    }
}

async function saveSettings() {
    saving.value = true
    try {
        const payload = {
            settings: Object.entries(settingsMap).map(([key, value]) => ({ key, value }))
        }
        try {
            await api.put('/settings', payload)
        } catch (e) {
            try {
                await api.put('/admin/settings', payload)
            } catch (e2) {
                await api.post('/admin/settings', payload)
            }
        }
        showAlert('Site settings saved successfully!', 'success')
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to save settings', 'error')
    } finally {
        saving.value = false
    }
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg; alertType.value = type
    setTimeout(() => alertMsg.value = '', 3000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
