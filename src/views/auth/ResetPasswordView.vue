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
                <RouterLink to="/" class="inline-flex items-center gap-2">
                    <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">Pial</span>
                    <span class="w-2.5 h-2.5 rounded-full bg-blue-500" style="box-shadow:0 0 10px #3B82F6,0 0 20px #3B82F640;
            animation:logoPulse 2s ease-in-out infinite;"></span>
                    <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">Dev</span>
                </RouterLink>
            </div>

            <div class="rounded-2xl border p-8" style="background:#0D1220;border-color:#1e3a5f;
        box-shadow:0 0 60px #3B82F610,0 40px 80px #00000040;">

                <!-- Icon -->
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style="background:#3B82F615;border:1px solid #3B82F625;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                </div>

                <h1 class="font-bold text-white text-center mb-2" style="font-size:22px;font-family:'Georgia',serif;">
                    Set New Password
                </h1>
                <p class="text-sm text-center mb-7" style="color:#475569;font-family:system-ui;line-height:1.6;">
                    Enter your email, paste the reset token, and choose a new password.
                </p>

                <!-- Success -->
                <div v-if="successMsg" class="mb-5 p-4 rounded-xl border flex items-center gap-3"
                    style="background:#052e16;border-color:#16a34a40;">
                    <svg class="flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80"
                        stroke-width="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span class="text-sm font-medium" style="color:#4ade80;font-family:system-ui;">{{ successMsg
                        }}</span>
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

                <form @submit.prevent="handleReset" class="space-y-4">

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
                            <input v-model="form.email" type="email" placeholder="your@email.com" required
                                class="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#05080F;border:1px solid #1e3a5f;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'"
                                onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                        </div>
                    </div>

                    <!-- Token -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                            Reset token
                        </label>
                        <input v-model="form.token" type="text" placeholder="Paste token from email" required
                            class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all" style="background:#05080F;border:1px solid #1e3a5f;
              color:#60A5FA;font-family:'Courier New',monospace;"
                            onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'"
                            onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                        <p class="text-xs mt-1.5" style="color:#475569;font-family:system-ui;">
                            Check your inbox for the token we sent.
                        </p>
                    </div>

                    <!-- New password -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                            New password
                        </label>
                        <div class="relative">
                            <input v-model="form.password" :type="showPw ? 'text' : 'password'"
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
                                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path
                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </button>
                        </div>
                        <!-- Strength bar -->
                        <div v-if="form.password" class="flex gap-1 mt-2">
                            <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded-full transition-all" :style="i <= pwStrength
                                ? `background:${pwStrengthColor};`
                                : 'background:#1e3a5f;'"></div>
                        </div>
                        <p v-if="form.password" class="text-xs mt-1"
                            :style="`color:${pwStrengthColor};font-family:system-ui;`">
                            {{ pwStrengthLabel }}
                        </p>
                    </div>

                    <!-- Confirm password -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                            Confirm password
                        </label>
                        <div class="relative">
                            <input v-model="form.password_confirmation" :type="showPw2 ? 'text' : 'password'"
                                placeholder="Repeat new password" required
                                class="w-full px-4 py-3 pr-11 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#05080F;border:1px solid #1e3a5f;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F618'"
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
                                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path
                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </button>
                        </div>
                        <!-- Match -->
                        <p v-if="form.password_confirmation" class="text-xs mt-1 flex items-center gap-1"
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
                   flex items-center justify-center gap-2 mt-2" style="background:#3B82F6;box-shadow:0 0 24px #3B82F635;
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

            <p class="text-center text-xs mt-6" style="color:#475569;font-family:system-ui;">
                Remember your password?
                <RouterLink to="/login" class="font-medium ml-1 transition-colors" style="color:#3B82F6;"
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
</style>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const showPw = ref(false)
const showPw2 = ref(false)

const form = reactive({
    email: '',
    token: route.query.token || '',
    password: '',
    password_confirmation: '',
})

const pwStrength = computed(() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
})
const pwStrengthColor = computed(() =>
    ['#f87171', '#f87171', '#F59E0B', '#60A5FA', '#4ade80'][pwStrength.value]
)
const pwStrengthLabel = computed(() =>
    ['', 'Weak', 'Fair', 'Good', 'Strong'][pwStrength.value]
)
const pwMatch = computed(() =>
    form.password === form.password_confirmation &&
    form.password_confirmation !== ''
)

async function handleReset() {
    successMsg.value = ''
    errorMsg.value = ''
    loading.value = true
    try {
        await api.post('/auth/reset-password', form)
        successMsg.value = 'Password updated! Redirecting to login...'
        setTimeout(() => router.push({ name: 'login' }), 1800)
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to reset password.'
    } finally {
        loading.value = false
    }
}
</script>