<template>
    <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style="background:#05080F;">

        <!-- Background effects -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute" style="width:600px;height:600px;top:-200px;left:50%;
        transform:translateX(-50%);border-radius:50%;
        background:radial-gradient(circle,#1e40af20 0%,transparent 70%);filter:blur(50px);"></div>
            <div class="absolute" style="width:300px;height:300px;bottom:-100px;right:-50px;border-radius:50%;
        background:radial-gradient(circle,#3B82F612 0%,transparent 70%);filter:blur(40px);"></div>
            <div class="absolute inset-0" style="background-image:radial-gradient(circle,#3B82F612 1px,transparent 1px);
        background-size:32px 32px;opacity:0.5;"></div>
        </div>

        <div class="relative z-10 w-full max-w-md">

            <!-- Logo -->
            <div class="text-center mb-8">
                <RouterLink to="/" class="inline-flex items-center gap-2 group">
                    <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">Pial</span>
                    <span class="w-2.5 h-2.5 rounded-full bg-blue-500" style="box-shadow:0 0 10px #3B82F6,0 0 20px #3B82F640;
            animation:logoPulse 2s ease-in-out infinite;"></span>
                    <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">Dev</span>
                </RouterLink>
                <p class="mt-3 text-sm" style="color:#475569;font-family:system-ui;">
                    Sign in to your account
                </p>
            </div>

            <!-- Card -->
            <div class="rounded-2xl border p-8" style="background:#0D1220;border-color:#1e3a5f;
        box-shadow:0 0 60px #3B82F610,0 40px 80px #00000040;">

                <!-- Header -->
                <div class="flex items-center gap-3 mb-7">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                        style="background:#3B82F615;border:1px solid #3B82F625;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="font-bold text-white" style="font-size:20px;font-family:'Georgia',serif;">
                            Welcome back
                        </h1>
                        <p class="text-xs" style="color:#475569;font-family:system-ui;">
                            Enter your credentials to continue
                        </p>
                    </div>
                </div>

                <!-- Error -->
                <div v-if="errorMsg" class="mb-5 p-3.5 rounded-xl border flex items-center gap-2.5 text-sm" style="background:#1a0505;border-color:#dc262640;
          color:#f87171;font-family:system-ui;">
                    <svg class="flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {{ errorMsg }}
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">

                    <!-- Email -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                            Email address
                        </label>
                        <div class="relative">
                            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14"
                                height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input v-model="form.email" type="email" required placeholder="your@email.com"
                                class="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#05080F;border:1px solid #1e3a5f;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'"
                                onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="text-xs font-semibold uppercase tracking-wider"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                Password
                            </label>
                            <RouterLink to="/forgot-password" class="text-xs font-medium transition-colors"
                                style="color:#3B82F6;font-family:system-ui;" onmouseover="this.style.color='#60A5FA'"
                                onmouseout="this.style.color='#3B82F6'">
                                Forgot password?
                            </RouterLink>
                        </div>
                        <div class="relative">
                            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14"
                                height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input v-model="form.password" :type="showPw ? 'text' : 'password'" required
                                placeholder="••••••••"
                                class="w-full pl-11 pr-11 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#05080F;border:1px solid #1e3a5f;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'"
                                onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                            <button type="button" @click="showPw = !showPw"
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                                style="color:#475569;" onmouseover="this.style.color='#60A5FA'"
                                onmouseout="this.style.color='#475569'">
                                <svg v-if="!showPw" width="15" height="15" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path
                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Submit -->
                    <button type="submit" :disabled="loading" class="w-full py-3.5 text-white font-semibold rounded-xl transition-all
                   hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2 mt-2" style="background:#3B82F6;box-shadow:0 0 24px #3B82F635;
            font-family:system-ui;font-size:15px;">
                        <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        <svg v-else class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        {{ loading ? 'Signing in...' : 'Sign In' }}
                    </button>
                </form>

                <!-- Divider -->
                <div class="flex items-center gap-3 my-6">
                    <div class="flex-1 h-px" style="background:#0f1f38;"></div>
                    <span class="text-xs" style="color:#475569;font-family:system-ui;">or</span>
                    <div class="flex-1 h-px" style="background:#0f1f38;"></div>
                </div>

                <!-- Register link -->
                <RouterLink to="/register" class="flex items-center justify-center gap-2 w-full py-3 rounded-xl border
                 text-sm font-medium transition-all hover:scale-[1.02]" style="border-color:#1e3a5f;color:#A8C4E8;
          background:#05080F;font-family:system-ui;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                    Create a new account
                </RouterLink>
            </div>

            <!-- Privacy note -->
            <p class="text-center text-xs mt-5" style="color:#475569;font-family:system-ui;">
                🔒 Your data is secure and never shared.
            </p>
        </div>
    </div>
</template>

<style scoped>
@keyframes logoPulse {

    0%,
    100% {
        box-shadow: 0 0 10px #3B82F6, 0 0 20px #3B82F640;
    }

    50% {
        box-shadow: 0 0 16px #3B82F6, 0 0 32px #3B82F680;
    }
}

input::placeholder {
    color: #475569;
}
</style>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const loading = ref(false)
const errorMsg = ref('')
const showPw = ref(false)
const form = reactive({ email: '', password: '' })

async function handleLogin() {
    errorMsg.value = ''
    loading.value = true
    try {
        const result = await auth.login(form)
        router.push(result.user.role === 'admin' ? { name: 'admin' } : { name: 'profile' })
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Login failed.'
    } finally {
        loading.value = false
    }
}
</script>