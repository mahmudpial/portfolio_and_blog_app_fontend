<template>
    <nav style="background:#0D1220;border-bottom:1px solid #0f1f38;">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">

            <!-- Left — Logo + breadcrumb -->
            <div class="flex items-center gap-4">
                <RouterLink to="/" class="flex items-center gap-1.5 group">
                    <span class="font-bold text-white" style="font-family:'Georgia',serif;font-size:17px;">Pial</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"
                        style="box-shadow:0 0 6px #3B82F6;"></span>
                    <span class="font-bold text-white" style="font-family:'Georgia',serif;font-size:17px;">Dev</span>
                </RouterLink>

                <div class="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" stroke-width="2.5">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                    <span class="text-xs font-semibold uppercase tracking-widest"
                        style="color:#475569;font-family:system-ui;letter-spacing:.15em;">
                        Admin Panel
                    </span>
                </div>
            </div>

            <!-- Right — nav links + user + logout -->
            <div class="flex items-center gap-2">
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

                <!-- User info -->
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
                    style="background:#05080F;border-color:#1e3a5f;">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center
                      text-xs font-bold text-white flex-shrink-0"
                        style="background:linear-gradient(135deg,#1e3a5f,#2563EB);font-size:9px;">
                        {{ auth.user?.name?.[0]?.toUpperCase() }}
                    </div>
                    <span class="text-xs font-medium" style="color:#A8C4E8;font-family:system-ui;">
                        {{ auth.user?.name?.split(' ')[0] }}
                    </span>
                    <span class="text-xs px-1.5 py-0.5 rounded-full" style="background:#dc262615;color:#f87171;
            border:1px solid #dc262630;font-family:system-ui;font-size:10px;">
                        Admin
                    </span>
                </div>

                <div class="w-px h-5 mx-1" style="background:#1e3a5f;"></div>

                <!-- Logout -->
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
        </div>
    </nav>
</template>

<style scoped>
.admin-nav-active {
    color: #60A5FA !important;
    border-color: #3B82F630 !important;
    background: rgba(59, 130, 246, 0.08) !important;
}
</style>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const links = [
    { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { to: '/', label: 'View Site', icon: 'eye' },
]
</script>