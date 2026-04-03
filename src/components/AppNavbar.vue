<template>
    <nav class="sticky top-0 z-50" style="background:#0D1220;border-bottom:1px solid #0f1f38;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">

            <div class="flex items-center gap-3 min-w-0">
                <RouterLink to="/" class="flex items-center gap-1.5 group flex-shrink-0">
                    <span class="font-bold text-white" style="font-family:'Georgia',serif;font-size:17px;">Pial</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                        style="box-shadow:0 0 6px #3B82F6;"></span>
                    <span class="font-bold text-white" style="font-family:'Georgia',serif;font-size:17px;">Dev</span>
                </RouterLink>

                <div class="hidden sm:flex items-center gap-2 min-w-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" stroke-width="2.5"
                        class="flex-shrink-0">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                    <span class="text-xs font-semibold uppercase tracking-widest truncate"
                        style="color:#475569;font-family:system-ui;letter-spacing:.15em;">
                        Admin Panel
                    </span>
                </div>
            </div>

            <div class="hidden md:flex items-center gap-2 flex-shrink-0">
                <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                 border transition-all hover:bg-white/5"
                    style="border-color:transparent;color:#475569;font-family:system-ui;"
                    active-class="admin-nav-active">
                    <svg v-if="link.icon === 'dashboard'" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <svg v-else-if="link.icon === 'eye'" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    {{ link.label }}
                </RouterLink>

                <div class="w-px h-5 mx-1" style="background:#1e3a5f;"></div>

                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
                    style="background:#05080F;border-color:#1e3a5f;">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style="background:linear-gradient(135deg,#1e3a5f,#2563EB);font-size:9px;">
                        {{ auth.user?.name?.[0]?.toUpperCase() }}
                    </div>
                    <span class="text-xs font-medium max-w-20 truncate"
                        style="color:#A8C4E8;font-family:system-ui;">
                        {{ firstName }}
                    </span>
                    <span class="text-xs px-1.5 py-0.5 rounded-full" style="background:#dc262615;color:#f87171;
            border:1px solid #dc262630;font-family:system-ui;font-size:10px;">
                        Admin
                    </span>
                </div>

                <div class="w-px h-5 mx-1" style="background:#1e3a5f;"></div>

                <button @click="auth.logout()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                 border transition-all hover:scale-105" style="border-color:#dc262630;color:#f87171;
          background:#dc262610;font-family:system-ui;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>

            <button class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors hover:bg-white/5 flex-shrink-0"
                style="color:#A8C4E8;" @click="menuOpen = !menuOpen" aria-label="Toggle admin menu">
                <span class="block w-5 h-0.5 rounded-full transition-all" :style="menuOpen
                    ? 'background:#3B82F6;transform:translateY(8px) rotate(45deg);'
                    : 'background:#A8C4E8;'"></span>
                <span class="block w-5 h-0.5 rounded-full transition-all"
                    :style="menuOpen ? 'opacity:0;' : 'background:#A8C4E8;'"></span>
                <span class="block w-5 h-0.5 rounded-full transition-all" :style="menuOpen
                    ? 'background:#3B82F6;transform:translateY(-8px) rotate(-45deg);'
                    : 'background:#A8C4E8;'"></span>
            </button>
        </div>

        <transition name="mobile-menu">
            <div v-if="menuOpen" class="md:hidden border-t" style="background:#0D1220;border-color:#0f1f38;">
                <div class="px-4 sm:px-6 py-4 flex flex-col gap-3">
                    <div class="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
                        style="background:#05080F;border-color:#1e3a5f;">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style="background:linear-gradient(135deg,#1e3a5f,#2563EB);">
                                {{ auth.user?.name?.[0]?.toUpperCase() }}
                            </div>
                            <div class="min-w-0">
                                <div class="text-sm font-medium text-white truncate" style="font-family:system-ui;">
                                    {{ auth.user?.name }}
                                </div>
                                <div class="text-xs" style="color:#f87171;font-family:system-ui;">
                                    Administrator
                                </div>
                            </div>
                        </div>
                        <span class="text-[10px] font-semibold uppercase tracking-[0.2em]"
                            style="color:#475569;font-family:system-ui;">
                            Admin
                        </span>
                    </div>

                    <RouterLink v-for="link in links" :key="link.to" :to="link.to" @click="menuOpen = false"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:bg-white/5"
                        style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;"
                        active-class="mobile-admin-active">
                        <svg v-if="link.icon === 'dashboard'" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" class="flex-shrink-0">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        <svg v-else-if="link.icon === 'eye'" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" class="flex-shrink-0">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        {{ link.label }}
                    </RouterLink>

                    <button @click="logoutFromMenu" class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
                 border transition-all" style="border-color:#dc262630;color:#f87171;
          background:#dc262610;font-family:system-ui;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </transition>
    </nav>
</template>

<style scoped>
.admin-nav-active {
    color: #60A5FA !important;
    border-color: #3B82F630 !important;
    background: rgba(59, 130, 246, 0.08) !important;
}

.mobile-admin-active {
    color: #60A5FA !important;
    border-color: #3B82F630 !important;
    background: rgba(59, 130, 246, 0.08) !important;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all .25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const menuOpen = ref(false)

const links = [
    { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { to: '/', label: 'View Site', icon: 'eye' },
]

const firstName = computed(() => auth.user?.name?.split(' ')[0] || 'Admin')

async function logoutFromMenu() {
    menuOpen.value = false
    await auth.logout()
}
</script>
