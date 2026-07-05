<template>
    <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style="background:#0A0610;">

        <!-- Background effects -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute" style="width:600px;height:600px;top:-200px;left:50%;
        transform:translateX(-50%);border-radius:50%;
        background:radial-gradient(circle,#6D28D920 0%,transparent 70%);filter:blur(50px);"></div>
            <div class="absolute" style="width:300px;height:300px;bottom:-100px;left:-50px;border-radius:50%;
        background:radial-gradient(circle,#8B5CF612 0%,transparent 70%);filter:blur(40px);"></div>
            <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF612 1px,transparent 1px);
        background-size:32px 32px;opacity:0.5;"></div>
        </div>

        <div class="relative z-10 w-full max-w-md">

            <!-- Logo -->
            <div class="text-center mb-8">
                <RouterLink to="/" class="inline-flex items-center gap-2 group">
                    <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">Pial</span>
                    <span class="w-2.5 h-2.5 rounded-full bg-violet-500" style="box-shadow:0 0 10px #8B5CF6,0 0 20px #8B5CF640;
            animation:logoPulse 2s ease-in-out infinite;"></span>
                    <span class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">Dev</span>
                </RouterLink>
                <p class="mt-3 text-sm" style="color:#475569;font-family:system-ui;">
                    Create your account — it's free
                </p>
            </div>

            <!-- Card -->
            <div class="rounded-2xl border p-8" style="background:#120E1C;border-color:#3B2A5A;
        box-shadow:0 0 60px #8B5CF610,0 40px 80px #00000040;">

                <!-- Header -->
                <div class="flex items-center gap-3 mb-7">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                        style="background:#8B5CF615;border:1px solid #8B5CF625;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C084FC" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <line x1="20" y1="8" x2="20" y2="14" />
                            <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="font-bold text-white" style="font-size:20px;font-family:'Georgia',serif;">
                            Create account
                        </h1>
                        <p class="text-xs" style="color:#475569;font-family:system-ui;">
                            Fill in your details to get started
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

                <form @submit.prevent="handleRegister" class="space-y-4">

                    <!-- Name -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                            Full name
                        </label>
                        <div class="relative">
                            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14"
                                height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <input v-model="form.name" type="text" required placeholder="Your full name"
                                class="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#0A0610;border:1px solid #3B2A5A;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6';this.style.boxShadow='0 0 0 3px #8B5CF618'"
                                onblur="this.style.borderColor='#3B2A5A';this.style.boxShadow='none'" />
                        </div>
                    </div>

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
                                style="background:#0A0610;border:1px solid #3B2A5A;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6';this.style.boxShadow='0 0 0 3px #8B5CF618'"
                                onblur="this.style.borderColor='#3B2A5A';this.style.boxShadow='none'" />
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                            Password
                        </label>
                        <div class="relative">
                            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14"
                                height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input v-model="form.password" :type="showPw ? 'text' : 'password'" required
                                placeholder="Min 8 characters"
                                class="w-full pl-11 pr-11 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#0A0610;border:1px solid #3B2A5A;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6';this.style.boxShadow='0 0 0 3px #8B5CF618'"
                                onblur="this.style.borderColor='#3B2A5A';this.style.boxShadow='none'" />
                            <button type="button" @click="showPw = !showPw"
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                                style="color:#475569;" onmouseover="this.style.color='#C084FC'"
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
                                : 'background:#3B2A5A;'"></div>
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
                            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14"
                                height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <input v-model="form.password_confirmation" :type="showPw2 ? 'text' : 'password'" required
                                placeholder="Repeat password"
                                class="w-full pl-11 pr-11 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#0A0610;border:1px solid #3B2A5A;
                color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#8B5CF6';this.style.boxShadow='0 0 0 3px #8B5CF618'"
                                onblur="this.style.borderColor='#3B2A5A';this.style.boxShadow='none'" />
                            <button type="button" @click="showPw2 = !showPw2"
                                class="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                                style="color:#475569;" onmouseover="this.style.color='#C084FC'"
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
                        <!-- Match indicator -->
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

                    <!-- Submit -->
                    <button type="submit" :disabled="loading" class="w-full py-3.5 text-white font-semibold rounded-xl transition-all
                   hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2 mt-2" style="background:#8B5CF6;box-shadow:0 0 24px #8B5CF635;
            font-family:system-ui;font-size:15px;">
                        <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <line x1="20" y1="8" x2="20" y2="14" />
                            <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                        <svg v-else class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        {{ loading ? 'Creating account...' : 'Create Account' }}
                    </button>
                </form>

                <!-- Divider -->
                <div class="flex items-center gap-3 my-6">
                    <div class="flex-1 h-px" style="background:#241730;"></div>
                    <span class="text-xs" style="color:#475569;font-family:system-ui;">or</span>
                    <div class="flex-1 h-px" style="background:#241730;"></div>
                </div>

                <!-- Login link -->
                <RouterLink to="/login" class="flex items-center justify-center gap-2 w-full py-3 rounded-xl border
                 text-sm font-medium transition-all hover:scale-[1.02]" style="border-color:#3B2A5A;color:#C9B9E8;
          background:#0A0610;font-family:system-ui;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Already have an account? Sign in
                </RouterLink>
            </div>

            <!-- Privacy note -->
            <p class="text-center text-xs mt-5" style="color:#475569;font-family:system-ui;">
                🔒 Your data is secure and never shared with third parties.
            </p>
        </div>
    </div>
</template>

<style scoped>
@keyframes logoPulse {

    0%,
    100% {
        box-shadow: 0 0 10px #8B5CF6, 0 0 20px #8B5CF640;
    }

    50% {
        box-shadow: 0 0 16px #8B5CF6, 0 0 32px #8B5CF680;
    }
}

input::placeholder {
    color: #475569;
}
</style>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const loading = ref(false)
const errorMsg = ref('')
const showPw = ref(false)
const showPw2 = ref(false)

const form = reactive({
    name: '', email: '',
    password: '', password_confirmation: '',
})

// ── Password strength ─────────────────────────────────────
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
    ['#f87171', '#f87171', '#F59E0B', '#C084FC', '#4ade80'][pwStrength.value]
)
const pwStrengthLabel = computed(() =>
    ['', 'Weak', 'Fair', 'Good', 'Strong'][pwStrength.value]
)
const pwMatch = computed(() =>
    form.password === form.password_confirmation &&
    form.password_confirmation !== ''
)

async function handleRegister() {
    errorMsg.value = ''
    loading.value = true
    try {
        await auth.register(form)
        router.push({ name: 'profile' })
    } catch (err) {
        const e = err.response?.data?.errors
        errorMsg.value = e
            ? Object.values(e).flat().join(' ')
            : err.response?.data?.message || 'Registration failed.'
    } finally {
        loading.value = false
    }
}
</script>