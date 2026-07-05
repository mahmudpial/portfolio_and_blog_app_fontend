<template>
    <nav class="sticky top-0 z-50" style="background:rgba(5,8,15,0.85);backdrop-filter:blur(20px);
    border-bottom:1px solid #241730;">

        <div class="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">

            <!-- Logo -->
            <RouterLink to="/" class="flex items-center gap-1.5 group flex-shrink-0">
                <span class="font-bold text-white tracking-tight"
                    style="font-size:20px;font-family:'Georgia',serif;">Pial</span>
                <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:#8B5CF6;box-shadow:0 0 8px #8B5CF6,0 0 16px #8B5CF640;
          animation:logoPulse 2s ease-in-out infinite;
          transition:transform .2s;margin-top:1px;" onmouseover="this.style.transform='scale(1.4)'"
                    onmouseout="this.style.transform='scale(1)'"></span>
                <span class="font-bold text-white tracking-tight"
                    style="font-size:20px;font-family:'Georgia',serif;">Dev</span>
            </RouterLink>

            <!-- Desktop nav -->
            <div class="hidden md:flex items-center gap-1">
                <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
                    class="nav-link relative px-4 py-2 text-sm font-medium rounded-lg transition-all"
                    style="color:#C9B9E8;font-family:system-ui;" active-class="nav-active">
                    {{ link.label }}
                </RouterLink>
            </div>

            <!-- Right side -->
            <div class="hidden md:flex items-center gap-3">
                <!-- Admin badge -->
                <RouterLink v-if="auth.isAdmin" to="/admin" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold
                 transition-all hover:scale-105" style="border-color:#dc262630;color:#f87171;
          background:#dc262610;font-family:system-ui;">
                    <span class="w-1.5 h-1.5 rounded-full bg-red-400" style="box-shadow:0 0 4px #f87171;"></span>
                    Admin
                </RouterLink>

                <template v-if="!auth.isLoggedIn">
                    <RouterLink to="/login"
                        class="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105 text-white"
                        style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                        Login
                    </RouterLink>
                </template>
                <template v-else>
                    <div class="relative" ref="profileMenuRef">
                        <button @click="profileMenuOpen = !profileMenuOpen" class="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all hover:scale-105"
                            style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="w-6 h-6 rounded-full flex items-center justify-center
                            text-xs font-bold text-white"
                                style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);font-family:system-ui;">
                                {{ auth.user?.name?.[0]?.toUpperCase() }}
                            </div>
                            <span class="text-xs font-medium" style="color:#C9B9E8;font-family:system-ui;">
                                {{ auth.user?.name?.split(' ')[0] }}
                            </span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5" class="transition-transform"
                                :style="profileMenuOpen ? 'transform:rotate(180deg);color:#C084FC;' : 'color:#C9B9E8;'">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        <transition name="dropdown">
                            <div v-if="profileMenuOpen" class="absolute right-0 mt-3 w-48 rounded-2xl border p-2"
                                style="background:#120E1C;border-color:#3B2A5A;box-shadow:0 24px 64px #00000055;">
                                <RouterLink to="/profile" @click="closeProfileMenu"
                                    class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                                    style="color:#C9B9E8;font-family:system-ui;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    Profile
                                </RouterLink>
                                <button @click="handleLogout" class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                                    style="color:#f87171;font-family:system-ui;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </transition>
                    </div>
                </template>
            </div>

            <!-- Mobile toggle -->
            <button class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors hover:bg-white/5"
                style="color:#C9B9E8;" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
                <span class="block w-5 h-0.5 rounded-full transition-all" :style="menuOpen
                    ? 'background:#8B5CF6;transform:translateY(8px) rotate(45deg);'
                    : 'background:#C9B9E8;'"></span>
                <span class="block w-5 h-0.5 rounded-full transition-all"
                    :style="menuOpen ? 'opacity:0;' : 'background:#C9B9E8;'"></span>
                <span class="block w-5 h-0.5 rounded-full transition-all" :style="menuOpen
                    ? 'background:#8B5CF6;transform:translateY(-8px) rotate(-45deg);'
                    : 'background:#C9B9E8;'"></span>
            </button>
        </div>

        <!-- Mobile menu -->
        <transition name="mobile-menu">
            <div v-if="menuOpen" class="md:hidden border-t overflow-hidden"
                style="background:#120E1C;border-color:#241730;">
                <div class="px-6 py-5 flex flex-col gap-1">
                    <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="menuOpen = false" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                   transition-all hover:bg-white/5" style="color:#C9B9E8;font-family:system-ui;"
                        active-class="mobile-active">
                        <span class="w-1 h-1 rounded-full flex-shrink-0" style="background:#8B5CF6;"></span>
                        {{ link.label }}
                    </RouterLink>

                    <div class="h-px my-3" style="background:#241730;"></div>

                    <RouterLink v-if="auth.isLoggedIn" to="/profile" @click="menuOpen = false"
                        class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/5"
                        style="color:#C9B9E8;font-family:system-ui;">
                        <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                            {{ auth.user?.name?.[0]?.toUpperCase() }}
                        </span>
                        Profile
                    </RouterLink>

                    <RouterLink v-if="auth.isAdmin" to="/admin" @click="menuOpen = false"
                        class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                        style="color:#f87171;background:#dc262610;font-family:system-ui;">
                        <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        Admin Panel
                    </RouterLink>

                    <RouterLink v-if="!auth.isLoggedIn" to="/login" @click="menuOpen = false" class="flex items-center justify-center gap-2 py-3 rounded-xl text-sm
                   font-semibold text-white transition-all mt-1"
                        style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                        Login
                    </RouterLink>
                    <button v-else @click="auth.logout()" class="flex items-center justify-center gap-2 py-3 rounded-xl text-sm
                   font-medium border transition-all mt-1"
                        style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
@keyframes logoPulse {

    0%,
    100% {
        box-shadow: 0 0 8px #8B5CF6, 0 0 16px #8B5CF640;
    }

    50% {
        box-shadow: 0 0 14px #8B5CF6, 0 0 28px #8B5CF680;
    }
}

/* Nav link hover + active */
.nav-link:hover {
    color: #C084FC !important;
    background: rgba(59, 130, 246, 0.06);
}

.nav-active {
    color: #C084FC !important;
    background: rgba(59, 130, 246, 0.08) !important;
    position: relative;
}

.nav-active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background: #8B5CF6;
    border-radius: 99px;
    box-shadow: 0 0 6px #8B5CF6;
}

/* Mobile active */
.mobile-active {
    color: #C084FC !important;
    background: rgba(59, 130, 246, 0.08) !important;
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all .25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all .18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-6px) scale(.98);
}
</style>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const menuOpen = ref(false)
const profileMenuOpen = ref(false)
const profileMenuRef = ref(null)

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/skills', label: 'Skills' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
]

function closeProfileMenu() {
    profileMenuOpen.value = false
}

async function handleLogout() {
    closeProfileMenu()
    await auth.logout()
}

function handleClickOutside(event) {
    if (!profileMenuRef.value?.contains(event.target)) {
        closeProfileMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
