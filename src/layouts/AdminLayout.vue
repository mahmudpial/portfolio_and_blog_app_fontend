<template>
    <div class="flex min-h-screen" style="background:#0A0610; color:#fff; font-family:system-ui;">
        <!-- Slim-to-Full Sidebar -->
        <aside
            class="fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out group border-r"
            :class="isExpanded ? 'w-64' : 'w-20'"
            style="background:rgba(18, 14, 28, 0.8); backdrop-filter:blur(20px); border-color:rgba(139, 92, 246, 0.1);"
            @mouseenter="isExpanded = true"
            @mouseleave="isExpanded = false"
        >
            <div class="flex flex-col h-full">
                <!-- Logo Section -->
                <div class="p-6 mb-6 flex items-center gap-4 overflow-hidden">
                    <div class="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ring-2 ring-purple-500/30"
                         style="background:linear-gradient(135deg,#8B5CF6,#C084FC);">
                        <span class="font-bold text-white">P</span>
                    </div>
                    <span v-if="isExpanded" class="font-serif text-xl font-bold text-white transition-opacity duration-300 whitespace-nowrap">
                        Admin<span style="color:#8B5CF6;">Panel</span>
                    </span>
                </div>

                <!-- Nav Links -->
                <nav class="flex-1 px-3 space-y-2">
                    <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path"
                        class="flex items-center gap-4 px-3 py-3 rounded-2xl transition-all group/item"
                        :class="router.currentRoute.value.path === item.path
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'"
                    >
                        <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center transition-transform group-hover/item:scale-110">
                            <component :is="item.icon" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" />
                        </div>
                        <span v-if="isExpanded" class="text-sm font-medium transition-opacity duration-300 whitespace-nowrap">
                            {{ item.label }}
                        </span>
                    </RouterLink>
                </nav>

                <!-- User Profile Bottom -->
                <div class="p-4 border-t transition-all" style="border-color:rgba(139, 92, 246, 0.1);">
                    <div class="flex items-center gap-3 p-2 rounded-2xl bg-white/5">
                        <div class="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-tr from-purple-600 to-pink-500"></div>
                        <div v-if="isExpanded" class="overflow-hidden">
                            <p class="text-xs font-bold text-white truncate">Pial Mahmud</p>
                            <p class="text-[10px] opacity-50 truncate">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main
            class="flex-1 transition-all duration-300 ease-in-out"
            :class="isExpanded ? 'ml-64' : 'ml-20'"
        >
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
    { label: 'Dashboard', path: '/admin/dashboard', icon: IconDashboard },
    { label: 'Blog Posts', path: '/admin/posts', icon: IconPosts },
    { label: 'Projects', path: '/admin/projects', icon: IconProjects },
    { label: 'Skills', path: '/admin/skills', icon: IconSkills },
    { label: 'Services', path: '/admin/services', icon: IconServices },
    { label: 'Pricing', path: '/admin/pricing', icon: IconPricing },
    { label: 'Comments', path: '/admin/comments', icon: IconComments },
    { label: 'Messages', path: '/admin/messages', icon: IconMessages },
    { label: 'Site Settings', path: '/admin/settings', icon: IconSettings },
]
</script>

<style scoped>
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>
