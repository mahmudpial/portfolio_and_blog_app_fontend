<template>
    <!-- Laravel -->
    <svg v-if="match('laravel')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <path d="M12 2L2 7.5v11L12 24l10-5.5v-11L12 2z" fill="#FF2D20" fill-opacity="0.2" stroke="#FF2D20" stroke-width="1.8"/>
        <path d="M7 11.5l5 2.8 5-2.8M12 14.3v5.2M12 2v6.8" stroke="#FF2D20" stroke-width="1.8" stroke-linecap="round"/>
    </svg>

    <!-- Vue.js -->
    <svg v-else-if="match('vue')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M12 22L1 3h4.5L12 15 18.5 3H23L12 22z" fill="#41B883"/>
        <path d="M12 15L6.5 5.5h3L12 11.5l2.5-6h3L12 15z" fill="#35495E"/>
    </svg>

    <!-- PHP -->
    <svg v-else-if="match('php')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" fill-opacity="0.2" stroke="#777BB4" stroke-width="1.5"/>
        <text x="12" y="14.5" font-size="7.5" font-weight="900" fill="#A5B4FC" text-anchor="middle" font-family="system-ui, sans-serif">PHP</text>
    </svg>

    <!-- JavaScript / JS -->
    <svg v-else-if="match('javascript') || match('js')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#F7DF1E"/>
        <path d="M13.5 17.5c.5.8 1.3 1.3 2.5 1.3 1.4 0 2.3-.7 2.3-2.1v-5.2h2.2v5.2c0 2.6-1.6 3.8-4.3 3.8-2.3 0-3.7-1.2-4.4-2.6l1.7-.4zm-6.2.3c.4.6.9 1 1.8 1 .9 0 1.5-.4 1.5-1.2 0-.8-.5-1.1-1.6-1.6-1.5-.6-2.6-1.4-2.6-2.8 0-1.6 1.3-2.7 3.1-2.7 1.4 0 2.4.5 3 1.7l-1.6.9c-.3-.6-.7-.8-1.4-.8-.7 0-1.1.4-1.1.9 0 .6.4.9 1.4 1.3 1.7.7 2.8 1.4 2.8 3.1 0 1.8-1.4 2.8-3.4 2.8-2 0-3.1-1-3.7-2.3l1.8-.7z" fill="#000000"/>
    </svg>

    <!-- TypeScript / TS -->
    <svg v-else-if="match('typescript') || match('ts')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6"/>
        <path d="M14 17.5c.5.8 1.3 1.3 2.5 1.3 1.4 0 2.3-.7 2.3-2.1v-5.2h2.2v5.2c0 2.6-1.6 3.8-4.3 3.8-2.3 0-3.7-1.2-4.4-2.6l1.7-.4zm-8.8-7.7h6.6v1.9H9.2v7.8H6.9v-7.8H5.2V9.8z" fill="#FFFFFF"/>
    </svg>

    <!-- Tailwind CSS -->
    <svg v-else-if="match('tailwind')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2.1-1.1 3.3-.9 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.6 3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2.1 1.1-3.3.9-1-.2-1.8-1-2.6-1.8-1.4-1.4-3-3-6.6-3zM5.5 12C3.1 12 1.6 13.2 1 15.6c1-.8 2.1-1.1 3.3-.9 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.6 3 2.4 0 3.9-1.2 4.5-3.6-1 .8-2.1 1.1-3.3.9-1-.2-1.8-1-2.6-1.8-1.4-1.4-3-3-6.6-3z" fill="#38BDF8"/>
    </svg>

    <!-- MySQL / PostgreSQL / Supabase / Database -->
    <svg v-else-if="match('mysql') || match('sql') || match('supabase') || match('database') || match('postgres')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <ellipse cx="12" cy="6" rx="9" ry="3" fill="#00758F" fill-opacity="0.3" stroke="#00758F" stroke-width="1.6"/>
        <path d="M3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6" stroke="#F59E0B" stroke-width="1.6"/>
        <path d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="#00758F" stroke-width="1.6"/>
        <circle cx="15" cy="15" r="1.5" fill="#F59E0B"/>
    </svg>

    <!-- Artificial Intelligence (AI) & Machine Learning (ML) -->
    <svg v-else-if="match('artificial intelligence') || match('ai') || match('machine learning') || match('ml') || match('gemini') || match('deep learning')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="rgba(6,182,212,0.15)" stroke="#06B6D4" stroke-width="1.8"/>
        <circle cx="9" cy="9" r="2" fill="#06B6D4"/>
        <circle cx="15" cy="9" r="2" fill="#8B5CF6"/>
        <circle cx="12" cy="15" r="2" fill="#38BDF8"/>
        <path d="M9 9l3 6 3-6M1 9h3M1 15h3M20 9h3M20 15h3M9 1v3M15 1v3M9 20v3M15 20v3" stroke="#06B6D4" stroke-width="1.5" stroke-linecap="round"/>
    </svg>

    <!-- JWT Authentication / Security / RBAC -->
    <svg v-else-if="match('jwt') || match('auth') || match('security') || match('token') || match('sanctum') || match('rbac')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <rect x="5" y="11" width="14" height="10" rx="3" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" stroke-width="1.8"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="12" cy="16" r="1.5" fill="#F59E0B"/>
    </svg>

    <!-- REST API / Eloquent ORM -->
    <svg v-else-if="match('rest api') || match('api') || match('eloquent') || match('endpoint') || match('orm')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <rect x="2" y="3" width="20" height="8" rx="2" ry="2" fill="rgba(139,92,246,0.15)" />
        <rect x="2" y="13" width="20" height="8" rx="2" ry="2" fill="rgba(139,92,246,0.15)" />
        <circle cx="6" cy="7" r="1" fill="#C084FC" />
        <circle cx="6" cy="17" r="1" fill="#C084FC" />
        <path d="M14 7h4" />
        <path d="M14 17h4" />
    </svg>

    <!-- Object-Oriented Programming (OOP) / Code Structure -->
    <svg v-else-if="match('oop') || match('object-oriented') || match('clean code') || match('programming')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <rect x="3" y="4" width="18" height="16" rx="3" fill="rgba(168,85,247,0.15)" stroke="#A855F7" stroke-width="1.8"/>
        <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 9l-2 6" stroke="#A855F7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <!-- Data Structures & Algorithms (DSA) -->
    <svg v-else-if="match('dsa') || match('data structure') || match('algorithm')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <circle cx="12" cy="5" r="3" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" stroke-width="1.8"/>
        <circle cx="6" cy="18" r="3" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" stroke-width="1.8"/>
        <circle cx="18" cy="18" r="3" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" stroke-width="1.8"/>
        <path d="M10.5 7.5L7.5 15.5M13.5 7.5L16.5 15.5" stroke="#38BDF8" stroke-width="1.8"/>
    </svg>

    <!-- Systems & Architecture -->
    <svg v-else-if="match('system') || match('architecture') || match('microservice') || match('infra')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill="rgba(139,92,246,0.2)" stroke="#8B5CF6" stroke-width="1.8"/>
        <polyline points="2 17 12 22 22 17" stroke="#8B5CF6" stroke-width="1.8"/>
        <polyline points="2 12 12 17 22 12" stroke="#8B5CF6" stroke-width="1.8"/>
    </svg>

    <!-- Engineering Mathematics -->
    <svg v-else-if="match('math') || match('engineering math') || match('calculus')" :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="shrink-0">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="rgba(236,72,153,0.15)" stroke="#EC4899" stroke-width="1.8"/>
        <path d="M8 8h8M12 8v8M8 16h8" stroke="#EC4899" stroke-width="1.8" stroke-linecap="round"/>
    </svg>

    <!-- Docker -->
    <svg v-else-if="match('docker')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M22.5 10.5c-.3-.2-1.5-.4-2.5.3-.2-.8-.7-1.5-1.5-1.8l-.8-.3-.4.8c-.5 1-1.3 1.5-2.3 1.5H3.5C2.1 11 1 12.1 1 13.5c0 4.7 3.8 8.5 8.5 8.5 4.5 0 8.2-3.5 8.5-8 .8-.3 2.5-.5 3.5 1 .3-.3.8-.9.9-1.4.2-.9.4-2.3.1-3.1zM6 10h2v2H6v-2zm3 0h2v2H9v-2zm3 0h2v2h-2v-2zm-6-3h2v2H6V7zm3 0h2v2H9V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7z" fill="#2496ED"/>
    </svg>

    <!-- Git -->
    <svg v-else-if="match('git')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M21.7 10.3l-8-8c-.8-.8-2-.8-2.8 0L8.7 4.5l3.2 3.2c.8-.3 1.8-.1 2.4.6.6.6.8 1.6.6 2.4l3.1 3.1c.8-.2 1.8 0 2.4.6.8.8.8 2 0 2.8s-2 .8-2.8 0c-.6-.6-.8-1.5-.6-2.4l-3-3v4.4c.3.2.6.5.8.8.8.8.8 2 0 2.8s-2 .8-2.8 0c-.8-.8-.8-2 0-2.8.3-.3.6-.6.9-.8V8.3c-.3-.2-.6-.5-.9-.8-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l2.2 2.2 2.8-2.8-8-8c-.8-.8-2-.8-2.8 0l-8 8c-.8.8-.8 2 0 2.8l8 8c.8.8 2 .8 2.8 0l8-8c.8-.7.8-2 0-2.8z" fill="#F05032"/>
    </svg>

    <!-- Redis -->
    <svg v-else-if="match('redis')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M2 7l10-4 10 4-10 4L2 7z" fill="#DC382D"/>
        <path d="M2 12l10 4 10-4" stroke="#DC382D" stroke-width="2" stroke-linecap="round"/>
        <path d="M2 17l10 4 10-4" stroke="#DC382D" stroke-width="2" stroke-linecap="round"/>
    </svg>

    <!-- Inertia.js -->
    <svg v-else-if="match('inertia')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <polygon points="5 5 13 5 8 19 0 19" fill="#9553E9"/>
        <polygon points="16 5 24 5 19 19 11 19" fill="#9553E9"/>
    </svg>

    <!-- Vite -->
    <svg v-else-if="match('vite')" :width="size" :height="size" viewBox="0 0 24 24" class="shrink-0">
        <path d="M21.5 3.5l-9 18-9-18L12 6.5l9.5-3z" fill="#646CFF" fill-opacity="0.3"/>
        <path d="M12 2L3 4l6.5 13.5L12 21l2.5-3.5L21 4l-9-2z" fill="#646CFF"/>
        <path d="M12.5 4.5l-4 8.5h3.5l-1.5 5 6-8.5h-3.5l1.5-5h-2z" fill="#FFD62E"/>
    </svg>

    <!-- Fallback Smart Badge -->
    <div v-else class="w-full h-full rounded-lg flex items-center justify-center font-bold text-white uppercase text-[11px]"
        style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
        {{ (name || 'SK').slice(0, 2) }}
    </div>
</template>

<script setup>
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

const match = (keyword) => {
    const n = (props.name || '').trim().toLowerCase()
    return n.includes(keyword)
}
</script>
