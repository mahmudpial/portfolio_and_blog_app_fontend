<template>
    <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style="background:#05080F;">

        <!-- Background effects -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute" style="width:600px;height:600px;top:-200px;left:50%;
        transform:translateX(-50%);border-radius:50%;
        background:radial-gradient(circle,#1e40af20 0%,transparent 70%);filter:blur(50px);"></div>
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
            </div>

            <!-- ── STEP 1: Enter email ─────────────────────────── -->
            <transition name="step" mode="out-in">
                <div v-if="step === 1" key="step1" class="rounded-2xl border p-8" style="background:#0D1220;border-color:#1e3a5f;
          box-shadow:0 0 60px #3B82F610,0 40px 80px #00000040;">

                    <!-- Icon -->
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style="background:#3B82F615;border:1px solid #3B82F625;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>

                    <h1 class="font-bold text-white text-center mb-2"
                        style="font-size:22px;font-family:'Georgia',serif;">
                        Forgot Password?
                    </h1>
                    <p class="text-sm text-center mb-7" style="color:#475569;font-family:system-ui;line-height:1.6;">
                        No worries — enter your email and we'll send you a reset link.
                    </p>

                    <!-- Error -->
                    <div v-if="errorMsg" class="mb-5 p-3.5 rounded-xl border flex items-center gap-2.5 text-sm" style="background:#1a0505;border-color:#dc262640;
            color:#f87171;font-family:system-ui;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {{ errorMsg }}
                    </div>

                    <form @submit.prevent="handleForgot" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                Email address
                            </label>
                            <div class="relative">
                                <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="15"
                                    height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2">
                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input v-model="email" type="email" placeholder="your@email.com" required
                                    class="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                    style="background:#05080F;border:1px solid #1e3a5f;
                  color:#fff;font-family:system-ui;"
                                    onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'"
                                    onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                            </div>
                        </div>

                        <button type="submit" :disabled="loading" class="w-full py-3.5 text-white font-semibold rounded-xl transition-all
                     hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2" style="background:#3B82F6;box-shadow:0 0 24px #3B82F635;
              font-family:system-ui;font-size:15px;">
                            <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            <svg v-else class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            {{ loading ? 'Sending...' : 'Send Reset Link' }}
                        </button>
                    </form>

                    <div class="mt-6 text-center">
                        <RouterLink to="/login" class="inline-flex items-center gap-1.5 text-sm transition-colors"
                            style="color:#475569;font-family:system-ui;" onmouseover="this.style.color='#60A5FA'"
                            onmouseout="this.style.color='#475569'">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to login
                        </RouterLink>
                    </div>
                </div>

                <!-- ── STEP 2: Set new password ──────────────────── -->
                <div v-else key="step2" class="rounded-2xl border p-8" style="background:#0D1220;border-color:#1e3a5f;
          box-shadow:0 0 60px #3B82F610,0 40px 80px #00000040;">

                    <!-- Success banner -->
                    <div class="mb-6 p-4 rounded-xl border flex items-start gap-3"
                        style="background:#052e16;border-color:#16a34a40;">
                        <svg class="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#4ade80" stroke-width="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <div>
                            <div class="text-sm font-semibold mb-0.5" style="color:#4ade80;font-family:system-ui;">
                                Reset link sent!
                            </div>
                            <div class="text-xs" style="color:#16a34a;font-family:system-ui;">
                                Check your inbox at <strong style="color:#4ade80;">{{ email }}</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Icon -->
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style="background:#3B82F615;border:1px solid #3B82F625;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>

                    <h1 class="font-bold text-white text-center mb-2"
                        style="font-size:22px;font-family:'Georgia',serif;">
                        Set New Password
                    </h1>
                    <p class="text-sm text-center mb-7" style="color:#475569;font-family:system-ui;line-height:1.6;">
                        Paste the token from your email and choose a strong new password.
                    </p>

                    <!-- Error -->
                    <div v-if="errorMsg" class="mb-5 p-3.5 rounded-xl border flex items-center gap-2.5 text-sm" style="background:#1a0505;border-color:#dc262640;
            color:#f87171;font-family:system-ui;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {{ errorMsg }}
                    </div>

                    <form @submit.prevent="handleReset" class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                Reset token
                            </label>
                            <input v-model="resetForm.token" type="text" placeholder="Paste token from email" required
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none
                       font-mono transition-all" style="background:#05080F;border:1px solid #1e3a5f;
                color:#60A5FA;font-family:'Courier New',monospace;"
                                onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'"
                                onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                        </div>

                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                New password
                            </label>
                            <div class="relative">
                                <input v-model="resetForm.password" :type="showPw ? 'text' : 'password'"
                                    placeholder="Min 8 characters" required
                                    class="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none transition-all"
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
                                    <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2">
                                        <path
                                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path
                                            d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                </button>
                            </div>
                            <!-- Password strength -->
                            <div v-if="resetForm.password" class="flex gap-1 mt-2">
                                <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded-full transition-all" :style="i <= pwStrength
                                    ? `background:${pwStrengthColor};`
                                    : 'background:#1e3a5f;'"></div>
                            </div>
                            <p v-if="resetForm.password" class="text-xs mt-1"
                                :style="`color:${pwStrengthColor};font-family:system-ui;`">
                                {{ pwStrengthLabel }}
                            </p>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                Confirm password
                            </label>
                            <div class="relative">
                                <input v-model="resetForm.password_confirmation" :type="showPw2 ? 'text' : 'password'"
                                    placeholder="Repeat new password" required
                                    class="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none transition-all"
                                    style="background:#05080F;border:1px solid #1e3a5f;
                  color:#fff;font-family:system-ui;"
                                    :onfocus="`this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'`"
                                    onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                                <button type="button" @click="showPw2 = !showPw2"
                                    class="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                                    style="color:#475569;" onmouseover="this.style.color='#60A5FA'"
                                    onmouseout="this.style.color='#475569'">
                                    <svg v-if="!showPw2" width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2">
                                        <path
                                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path
                                            d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                </button>
                            </div>
                            <!-- Match indicator -->
                            <p v-if="resetForm.password_confirmation" class="text-xs mt-1 flex items-center gap-1"
                                :style="pwMatch ? 'color:#4ade80;' : 'color:#f87171;'" style="font-family:system-ui;">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <polyline v-if="pwMatch" points="20 6 9 17 4 12" />
                                    <line v-else x1="18" y1="6" x2="6" y2="18" />
                                    <line v-if="!pwMatch" x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                {{ pwMatch ? 'Passwords match' : 'Passwords do not match' }}
                            </p>
                        </div>

                        <button type="submit" :disabled="loading || !pwMatch" class="w-full py-3.5 text-white font-semibold rounded-xl transition-all
                     hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2" style="background:#3B82F6;box-shadow:0 0 24px #3B82F635;
              font-family:system-ui;font-size:15px;">
                            <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <svg v-else class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2.5">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            {{ loading ? 'Updating...' : 'Update Password' }}
                        </button>
                    </form>
                </div>
            </transition>

            <!-- Bottom link -->
            <p class="text-center text-xs mt-6" style="color:#475569;font-family:system-ui;">
                Remember your password?
                <RouterLink to="/login" class="font-medium transition-colors ml-1" style="color:#3B82F6;"
                    onmouseover="this.style.color='#60A5FA'" onmouseout="this.style.color='#3B82F6'">
                    Sign in
                </RouterLink>
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

.step-enter-active,
.step-leave-active {
    transition: all .3s ease;
}

.step-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.step-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()
const step = ref(1)
const loading = ref(false)
const errorMsg = ref('')
const email = ref('')
const showPw = ref(false)
const showPw2 = ref(false)

const resetForm = reactive({
    token: '', email: '',
    password: '', password_confirmation: '',
})

// ── Password strength ─────────────────────────────────────
const pwStrength = computed(() => {
    const p = resetForm.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
})
const pwStrengthColor = computed(() => {
    const c = ['#f87171', '#f87171', '#F59E0B', '#60A5FA', '#4ade80']
    return c[pwStrength.value]
})
const pwStrengthLabel = computed(() => {
    const l = ['', 'Weak', 'Fair', 'Good', 'Strong']
    return l[pwStrength.value]
})
const pwMatch = computed(() =>
    resetForm.password === resetForm.password_confirmation &&
    resetForm.password_confirmation !== ''
)

async function handleForgot() {
    errorMsg.value = ''
    loading.value = true
    try {
        await api.post('/auth/forgot-password', { email: email.value })
        resetForm.email = email.value
        step.value = 2
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to send reset link.'
    } finally {
        loading.value = false
    }
}

async function handleReset() {
    errorMsg.value = ''
    loading.value = true
    try {
        await api.post('/auth/reset-password', resetForm)
        router.push({ name: 'login' })
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to reset password.'
    } finally {
        loading.value = false
    }
}
</script>