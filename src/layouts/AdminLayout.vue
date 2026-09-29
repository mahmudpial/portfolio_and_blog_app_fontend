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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Zap,
    Settings,
    MessageSquare,
    Mail,
    CreditCard,
    Wrench
} from 'lucide-vue-next'

const router = useRouter()
const isExpanded = ref(false)

const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Blog Posts', path: '/admin/posts', icon: FileText },
    { label: 'Projects', path: '/admin/projects', icon: Briefcase },
    { label: 'Skills', path: '/admin/skills', icon: Zap },
    { label: 'Services', path: '/admin/services', icon: Wrench },
    { label: 'Pricing', path: '/admin/pricing', icon: CreditCard },
    { label: 'Comments', path: '/admin/comments', icon: MessageSquare },
    { label: 'Messages', path: '/admin/messages', icon: Mail },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
]
</script>

<style scoped>
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>
