<template>
    <!-- Laravel -->
    <svg v-if="normalized === 'laravel'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <path d="M12 2L2 7.5v11L12 24l10-5.5v-11L12 2z" fill="#FF2D20" fill-opacity="0.15" stroke="#FF2D20" stroke-width="1.8"/>
        <path d="M7 11.5l5 2.8 5-2.8M12 14.3v5.2M12 2v6.8" stroke="#FF2D20" stroke-width="1.8" stroke-linecap="round"/>
    </svg>

    <!-- Vue.js -->
    <svg v-else-if="normalized === 'vue' || normalized === 'vue.js' || normalized === 'vuejs' || normalized === 'vue 3' || normalized === 'vue.js 3'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M12 22L1 3h4.5L12 15 18.5 3H23L12 22z" fill="#41B883"/>
        <path d="M12 15L6.5 5.5h3L12 11.5l2.5-6h3L12 15z" fill="#35495E"/>
    </svg>

    <!-- PHP -->
    <svg v-else-if="normalized === 'php' || normalized === 'php 8' || normalized === 'php8'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" fill-opacity="0.2" stroke="#777BB4" stroke-width="1.5"/>
        <text x="12" y="14" font-size="7" font-weight="900" fill="#777BB4" text-anchor="middle" font-family="system-ui, sans-serif">PHP</text>
    </svg>

    <!-- JavaScript / JS -->
    <svg v-else-if="normalized === 'javascript' || normalized === 'js'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#F7DF1E"/>
        <path d="M13.5 17.5c.5.8 1.3 1.3 2.5 1.3 1.4 0 2.3-.7 2.3-2.1v-5.2h2.2v5.2c0 2.6-1.6 3.8-4.3 3.8-2.3 0-3.7-1.2-4.4-2.6l1.7-.4zm-6.2.3c.4.6.9 1 1.8 1 .9 0 1.5-.4 1.5-1.2 0-.8-.5-1.1-1.6-1.6-1.5-.6-2.6-1.4-2.6-2.8 0-1.6 1.3-2.7 3.1-2.7 1.4 0 2.4.5 3 1.7l-1.6.9c-.3-.6-.7-.8-1.4-.8-.7 0-1.1.4-1.1.9 0 .6.4.9 1.4 1.3 1.7.7 2.8 1.4 2.8 3.1 0 1.8-1.4 2.8-3.4 2.8-2 0-3.1-1-3.7-2.3l1.8-.7z" fill="#000000"/>
    </svg>

    <!-- TypeScript / TS -->
    <svg v-else-if="normalized === 'typescript' || normalized === 'ts'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6"/>
        <path d="M14 17.5c.5.8 1.3 1.3 2.5 1.3 1.4 0 2.3-.7 2.3-2.1v-5.2h2.2v5.2c0 2.6-1.6 3.8-4.3 3.8-2.3 0-3.7-1.2-4.4-2.6l1.7-.4zm-8.8-7.7h6.6v1.9H9.2v7.8H6.9v-7.8H5.2V9.8z" fill="#FFFFFF"/>
    </svg>

    <!-- Tailwind CSS -->
    <svg v-else-if="normalized === 'tailwind' || normalized === 'tailwind css' || normalized === 'tailwindcss'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2.1-1.1 3.3-.9 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.6 3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2.1 1.1-3.3.9-1-.2-1.8-1-2.6-1.8-1.4-1.4-3-3-6.6-3zM5.5 12C3.1 12 1.6 13.2 1 15.6c1-.8 2.1-1.1 3.3-.9 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.6 3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2.1 1.1-3.3.9-1-.2-1.8-1-2.6-1.8-1.4-1.4-3-3-6.6-3z" fill="#38BDF8"/>
    </svg>

    <!-- MySQL -->
    <svg v-else-if="normalized === 'mysql'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <ellipse cx="12" cy="6" rx="9" ry="3" fill="#00758F" fill-opacity="0.2" stroke="#00758F" stroke-width="1.6"/>
        <path d="M3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6" stroke="#F29111" stroke-width="1.6"/>
        <path d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="#00758F" stroke-width="1.6"/>
        <circle cx="15" cy="15" r="1.5" fill="#F29111"/>
    </svg>

    <!-- PostgreSQL / Postgres -->
    <svg v-else-if="normalized === 'postgresql' || normalized === 'postgres'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#336791" fill-opacity="0.2"/>
        <path d="M8 8c1.5-2 5.5-2 7 0 1 1.5 1 4 0 6-1 2-3.5 3-3.5 5h-1c0-2-1.5-3.5-2.5-5.5C7.2 12 7.2 9.5 8 8z" fill="#336791"/>
        <circle cx="10" cy="10" r="1" fill="#FFFFFF"/>
        <circle cx="14" cy="10" r="1" fill="#FFFFFF"/>
    </svg>

    <!-- Docker -->
    <svg v-else-if="normalized === 'docker'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M22.5 10.5c-.3-.2-1.5-.4-2.5.3-.2-.8-.7-1.5-1.5-1.8l-.8-.3-.4.8c-.5 1-1.3 1.5-2.3 1.5H3.5C2.1 11 1 12.1 1 13.5c0 4.7 3.8 8.5 8.5 8.5 4.5 0 8.2-3.5 8.5-8 .8-.3 2.5-.5 3.5 1 .3-.3.8-.9.9-1.4.2-.9.4-2.3.1-3.1zM6 10h2v2H6v-2zm3 0h2v2H9v-2zm3 0h2v2h-2v-2zm-6-3h2v2H6V7zm3 0h2v2H9V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7z" fill="#2496ED"/>
    </svg>

    <!-- Git -->
    <svg v-else-if="normalized === 'git'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M21.7 10.3l-8-8c-.8-.8-2-.8-2.8 0L8.7 4.5l3.2 3.2c.8-.3 1.8-.1 2.4.6.6.6.8 1.6.6 2.4l3.1 3.1c.8-.2 1.8 0 2.4.6.8.8.8 2 0 2.8s-2 .8-2.8 0c-.6-.6-.8-1.5-.6-2.4l-3-3v4.4c.3.2.6.5.8.8.8.8.8 2 0 2.8s-2 .8-2.8 0c-.8-.8-.8-2 0-2.8.3-.3.6-.6.9-.8V8.3c-.3-.2-.6-.5-.9-.8-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l2.2 2.2 2.8-2.8-8-8c-.8-.8-2-.8-2.8 0l-8 8c-.8.8-.8 2 0 2.8l8 8c.8.8 2 .8 2.8 0l8-8c.8-.7.8-2 0-2.8z" fill="#F05032"/>
    </svg>

    <!-- Redis -->
    <svg v-else-if="normalized === 'redis'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M2 7l10-4 10 4-10 4L2 7z" fill="#DC382D"/>
        <path d="M2 12l10 4 10-4" stroke="#DC382D" stroke-width="2" stroke-linecap="round"/>
        <path d="M2 17l10 4 10-4" stroke="#DC382D" stroke-width="2" stroke-linecap="round"/>
    </svg>

    <!-- Inertia.js -->
    <svg v-else-if="normalized === 'inertia' || normalized === 'inertia.js' || normalized === 'inertiajs'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <polygon points="5 5 13 5 8 19 0 19" fill="#9553E9"/>
        <polygon points="16 5 24 5 19 19 11 19" fill="#9553E9"/>
    </svg>

    <!-- Vite -->
    <svg v-else-if="normalized === 'vite'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M21.5 3.5l-9 18-9-18L12 6.5l9.5-3z" fill="#646CFF" fill-opacity="0.3"/>
        <path d="M12 2L3 4l6.5 13.5L12 21l2.5-3.5L21 4l-9-2z" fill="#646CFF"/>
        <path d="M12.5 4.5l-4 8.5h3.5l-1.5 5 6-8.5h-3.5l1.5-5h-2z" fill="#FFD62E"/>
    </svg>

    <!-- REST API / Eloquent / JWT Auth -->
    <svg v-else-if="normalized === 'rest api' || normalized === 'jwt auth' || normalized === 'jwt' || normalized === 'sanctum' || normalized === 'eloquent orm' || normalized === 'auth'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
        <path d="M14 6h4" />
        <path d="M14 18h4" />
    </svg>

    <!-- HTML / HTML5 -->
    <svg v-else-if="normalized === 'html' || normalized === 'html5'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" fill="#E34F26"/>
        <path d="M12 3.8v16.3l5.8-1.5 1.3-14.8H12z" fill="#EF652A"/>
        <path d="M7 6.5h10l-.2 2.3H9.4l.2 2.3h7l-.5 5.6-4.1 1.2-4.1-1.2-.3-3.1h2.2l.1 1.5 2.1.6 2.1-.6.3-2.6H7.1L7 6.5z" fill="#FFFFFF"/>
    </svg>

    <!-- CSS / CSS3 -->
    <svg v-else-if="normalized === 'css' || normalized === 'css3'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3z" fill="#1572B6"/>
        <path d="M12 3.8v16.3l5.8-1.5 1.3-14.8H12z" fill="#33A9DC"/>
        <path d="M12 6.5h4.9l-.3 2.3H12v2.3h4.4l-.5 5.6-3.9 1.2V16l2.1-.6.3-2.6H12V6.5zM12 11.1H7.5L7.3 8.8H12V6.5H7.1L7 6.5l.6 6.9H12v-2.3zm0 6.8l-3.9-1.2-.3-3.1H10l.1 1.5 1.9.6v2.2z" fill="#FFFFFF"/>
    </svg>

    <!-- Python -->
    <svg v-else-if="normalized === 'python'" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M11.9 2c-4.8 0-4.5 2.1-4.5 2.1l.1 2.2h4.5v.7H4.5S2 6.7 2 11.5c0 4.8 2.2 4.6 2.2 4.6h1.3v-2.2s-.1-2.2 2.2-2.2h4.5s2.1.1 2.1-2.1V4.1s.4-2.1-2.4-2.1zm-1.4 1.4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#3776AB"/>
        <path d="M12.1 22c4.8 0 4.5-2.1 4.5-2.1l-.1-2.2h-4.5V17h7.5s2.5.3 2.5-4.5c0-4.8-2.2-4.6-2.2-4.6h-1.3v2.2s.1 2.2-2.2 2.2h-4.5s-2.1-.1-2.1 2.1v5.5s-.4 2.1 2.4 2.1zm1.4-1.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFD43B"/>
    </svg>

    <!-- Fallback Clean Code Badge -->
    <div v-else class="w-full h-full rounded-lg flex items-center justify-center font-bold text-white uppercase text-xs"
        style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
        {{ (name || 'SK').slice(0, 2) }}
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    size: {
        type: [Number, String],
        default: 20
    }
})

const normalized = computed(() => {
    return (props.name || '').trim().toLowerCase()
})
</script>
