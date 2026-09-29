<template>
    <!-- AI / Assistant / Chatbot -->
    <svg v-if="categoryType === 'ai'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
        <path d="M9 10a3 3 0 0 1 6 0" />
        <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>

    <!-- Attendance / Geofencing / Location / Mobile / Map -->
    <svg v-else-if="categoryType === 'attendance' || categoryType === 'location'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" opacity="0.5"/>
    </svg>

    <!-- Security / Vault / Secret / Encryption / Auth -->
    <svg v-else-if="categoryType === 'security' || categoryType === 'vault'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" />
    </svg>

    <!-- API / Microservices / Backend -->
    <svg v-else-if="categoryType === 'api'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
        <path d="M14 6h4" />
        <path d="M14 18h4" />
    </svg>

    <!-- E-Commerce / Shop / Store -->
    <svg v-else-if="categoryType === 'ecommerce'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>

    <!-- CMS / Dashboard / Admin / ERP -->
    <svg v-else-if="categoryType === 'cms' || categoryType === 'dashboard'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>

    <!-- Web Application / Full-Stack (Default) -->
    <svg v-else :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="7 10 9 12 7 14" />
        <line x1="13" y1="14" x2="17" y2="14" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    category: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    size: {
        type: [Number, String],
        default: 32
    }
})

const categoryType = computed(() => {
    const text = `${props.category} ${props.title}`.toLowerCase()
    if (text.includes('ai') || text.includes('assistant') || text.includes('bot') || text.includes('gemini') || text.includes('gpt')) {
        return 'ai'
    }
    if (text.includes('attend') || text.includes('geofenc') || text.includes('location') || text.includes('overtime') || text.includes('map')) {
        return 'attendance'
    }
    if (text.includes('vault') || text.includes('secret') || text.includes('secur') || text.includes('encrypt') || text.includes('envshare')) {
        return 'security'
    }
    if (text.includes('api') || text.includes('microservice') || text.includes('rest')) {
        return 'api'
    }
    if (text.includes('shop') || text.includes('e-com') || text.includes('store') || text.includes('payment') || text.includes('cart')) {
        return 'ecommerce'
    }
    if (text.includes('cms') || text.includes('admin') || text.includes('dashboard') || text.includes('erp') || text.includes('panel')) {
        return 'cms'
    }
    return 'web'
})
</script>
