<template>
    <div class="flex min-h-screen" style="background:#0A0610; color:#fff; font-family:system-ui;">
        <!-- Slim-to-Full Sidebar -->
        <aside
            class="fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out group border-r flex flex-col justify-between"
            :class="isExpanded ? 'w-64' : 'w-20'"
            style="background:rgba(18, 14, 28, 0.95); backdrop-filter:blur(20px); border-color:rgba(139, 92, 246, 0.15);"
            @mouseenter="isExpanded = true"
            @mouseleave="isExpanded = false"
        >
            <div class="flex flex-col h-full overflow-hidden">
                <!-- Logo Section -->
                <div class="p-5 mb-2 flex items-center gap-3 overflow-hidden border-b" style="border-color:rgba(139, 92, 246, 0.1);">
                    <div class="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ring-2 ring-purple-500/30"
                         style="background:linear-gradient(135deg,#8B5CF6,#C084FC);">
                        <span class="font-bold text-white text-lg" style="font-family:'Georgia',serif;">P</span>
                    </div>
                    <div v-if="isExpanded" class="flex flex-col transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                        <span class="font-bold text-white text-base tracking-wide" style="font-family:'Georgia',serif;">
                            Admin<span style="color:#8B5CF6;">Panel</span>
                        </span>
                        <span class="text-[10px] uppercase tracking-widest text-purple-400/80 font-semibold">Workspace</span>
                    </div>
                </div>

                <!-- Nav Links -->
                <nav class="flex-1 px-3 py-3 space-y-1.5 overflow-y-auto custom-scrollbar">
                    <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path"
                        class="flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all group/item text-sm font-medium"
                        :class="isActiveRoute(item.path)
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-semibold'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'"
                    >
                        <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center transition-transform group-hover/item:scale-110">
                            <component :is="item.icon" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" />
                        </div>
                        <span v-if="isExpanded" class="transition-opacity duration-300 whitespace-nowrap">
                            {{ item.label }}
                        </span>
                    </RouterLink>
                </nav>

                <!-- User Profile & Quick Actions at Bottom -->
                <div class="p-3 border-t transition-all space-y-2" style="border-color:rgba(139, 92, 246, 0.1);">
                    <!-- User badge -->
                    <div class="flex items-center gap-3 p-2 rounded-xl bg-white/5">
                        <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs text-white"
                             style="background:linear-gradient(135deg,#7C3AED,#C084FC);">
                            {{ (auth.user?.name || 'A')[0].toUpperCase() }}
                        </div>
                        <div v-if="isExpanded" class="overflow-hidden min-w-0 flex-1">
                            <p class="text-xs font-bold text-white truncate">{{ auth.user?.name || 'Administrator' }}</p>
                            <p class="text-[10px] text-purple-300/60 truncate">{{ auth.user?.email || 'Admin' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content Area with integrated Header -->
        <div
            class="flex-1 flex flex-col transition-all duration-300 ease-in-out min-w-0"
            :class="isExpanded ? 'ml-64' : 'ml-20'"
        >
            <!-- Integrated Top Bar -->
            <header class="sticky top-0 z-40 h-16 border-b flex items-center justify-between px-6 sm:px-8"
                style="background:rgba(10, 6, 16, 0.85); backdrop-filter:blur(16px); border-color:rgba(139, 92, 246, 0.12);">
                <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-purple-500" style="box-shadow:0 0 8px #8B5CF6;"></span>
                    <span class="text-xs font-bold uppercase tracking-widest text-purple-300/80">Admin Console</span>
                </div>

                <div class="flex items-center gap-3">
                    <!-- View Live Site Link -->
                    <RouterLink to="/" target="_blank"
                        class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:bg-white/5 hover:scale-105"
                        style="border-color:rgba(139, 92, 246, 0.3); color:#C9B9E8; background:rgba(18, 14, 28, 0.6);">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>View Site</span>
                    </RouterLink>

                    <!-- Logout Button -->
                    <button @click="auth.logout()"
                        class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-105"
                        style="border-color:rgba(239, 68, 68, 0.3); color:#f87171; background:rgba(239, 68, 68, 0.08);">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <!-- Routed Child View -->
            <main class="flex-1">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const isExpanded = ref(false)

const IconDashboard = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1 }),
    h('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1 }),
    h('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 }),
    h('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1 })
])

const IconPosts = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
    h('polyline', { points: '14 2 14 8 20 8' }),
    h('line', { x1: 16, y1: 13, x2: 8, y2: 13 }),
    h('line', { x1: 16, y1: 17, x2: 8, y2: 17 })
])

const IconProjects = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('rect', { x: 2, y: 7, width: 20, height: 14, rx: 2 }),
    h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' })
])

const IconSkills = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })
])

const IconServices = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' })
])

const IconPricing = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('rect', { x: 1, y: 4, width: 22, height: 16, rx: 2 }),
    h('line', { x1: 1, y1: 10, x2: 23, y2: 10 })
])

const IconComments = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
])

const IconMessages = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
    h('polyline', { points: '22,6 12,13 2,6' })
])

const IconSettings = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('circle', { cx: 12, cy: 12, r: 3 }),
    h('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' })
])

const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: IconDashboard },
    { label: 'Blog Posts', path: '/admin/posts', icon: IconPosts },
    { label: 'Projects', path: '/admin/projects', icon: IconProjects },
    { label: 'Skills', path: '/admin/skills', icon: IconSkills },
    { label: 'Services', path: '/admin/services', icon: IconServices },
    { label: 'Pricing', path: '/admin/pricing', icon: IconPricing },
    { label: 'Comments', path: '/admin/comments', icon: IconComments },
    { label: 'Messages', path: '/admin/messages', icon: IconMessages },
    { label: 'Site Settings', path: '/admin/settings', icon: IconSettings },
]

function isActiveRoute(path) {
    if (path === '/admin') {
        return route.path === '/admin' || route.path === '/admin/dashboard'
    }
    return route.path.startsWith(path)
}
</script>

<style scoped>
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.2);
    border-radius: 4px;
}
</style>
