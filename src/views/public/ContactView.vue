<template>
    <div style="background:#05080F;min-height:100vh;">

        <!-- ── HERO HEADER ─────────────────────────────────────── -->
        <section class="relative pt-28 pb-20 px-6 md:px-16 overflow-hidden">
            <!-- Background effects -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;transform:translateX(-50%);
          border-radius:50%;background:radial-gradient(circle,#1e40af22 0%,transparent 70%);filter:blur(50px);"></div>
                <div class="absolute" style="width:400px;height:400px;top:-100px;left:-50px;border-radius:50%;
          background:radial-gradient(circle,#3B82F610 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute" style="width:400px;height:400px;top:-100px;right:-50px;border-radius:50%;
          background:radial-gradient(circle,#3B82F610 0%,transparent 70%);filter:blur(60px);"></div>
                <!-- Vertical grid lines -->
                <div class="absolute inset-0" style="background-image:linear-gradient(90deg,#1e3a5f08 1px,transparent 1px);
          background-size:80px 100%;opacity:0.8;"></div>
                <div class="absolute inset-0" style="background-image:linear-gradient(#1e3a5f06 1px,transparent 1px);
          background-size:100% 80px;opacity:0.8;"></div>
            </div>

            <div class="relative z-10 max-w-3xl mx-auto text-center">
                <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                    style="color:#3B82F6;font-family:system-ui;letter-spacing:.25em;">Get In Touch</p>
                <h1 class="font-bold leading-tight mb-6"
                    style="font-size:clamp(36px,6vw,68px);font-family:'Georgia',serif;">
                    <span class="text-white">Let's </span>
                    <span style="color:#60A5FA;text-shadow:0 0 40px #3B82F650;">Work Together</span>
                </h1>
                <p class="text-base leading-relaxed mx-auto"
                    style="color:#A8C4E8;font-family:system-ui;max-width:480px;line-height:1.8;">
                    Have a project in mind or want to collaborate? I'd love to
                    hear from you. Drop a message and I'll get back within 24 hours.
                </p>
                <!-- Divider -->
                <div class="mx-auto mt-8 w-16 h-0.5 rounded-full"
                    style="background:linear-gradient(90deg,transparent,#3B82F6,transparent);"></div>
            </div>
        </section>

        <!-- ── MAIN CONTENT ───────────────────────────────────── -->
        <section class="pb-24 px-6 md:px-16">
            <div class="max-w-6xl mx-auto grid md:grid-cols-5 gap-6 items-start">

                <!-- ── LEFT COLUMN (2/5) ────────────────────────── -->
                <div class="md:col-span-2 flex flex-col gap-4">

                    <!-- Contact info card -->
                    <div class="rounded-2xl border p-6" style="background:#0D1220;border-color:#1e3a5f;">
                        <h2 class="font-bold text-white text-xl mb-6" style="font-family:'Georgia',serif;">Contact Info
                        </h2>

                        <div class="flex flex-col gap-5">
                            <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style="background:#3B82F615;border:1px solid #3B82F625;">
                                    <component :is="'svg'" v-bind="info.svgProps" v-html="info.svgPath"
                                        class="text-blue-400" style="color:#60A5FA;">
                                    </component>
                                </div>
                                <div>
                                    <div class="text-xs font-semibold uppercase tracking-widest mb-0.5"
                                        style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                        {{ info.label }}
                                    </div>
                                    <div class="font-medium text-white text-sm" style="font-family:system-ui;">
                                        {{ info.value }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Availability badge -->
                    <div class="rounded-2xl border px-6 py-4 flex items-center gap-3"
                        style="background:#052e16;border-color:#16a34a30;">
                        <span class="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0"
                            style="box-shadow:0 0 8px #4ade80;animation:greenPulse 2s infinite;"></span>
                        <span class="font-semibold text-sm" style="color:#4ade80;font-family:system-ui;">
                            Available for freelance &amp; full-time
                        </span>
                    </div>

                    <!-- Find me online card -->
                    <div class="rounded-2xl border p-6" style="background:#0D1220;border-color:#1e3a5f;">
                        <p class="text-xs font-semibold uppercase tracking-widest mb-5"
                            style="color:#475569;font-family:system-ui;letter-spacing:.15em;">
                            Find Me Online
                        </p>
                        <div class="flex gap-3">
                            <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" :aria-label="s.label"
                                class="w-9 h-9 rounded-xl border flex items-center justify-center
         transition-all hover:scale-110 hover:-translate-y-0.5"
                                style="background:#0D1220;border-color:#1e3a5f;color:#A8C4E8;"
                                :onmouseover="s.label === 'Fiverr'
                                    ? `this.style.borderColor='#1dbf73';this.style.color='#1dbf73';this.style.boxShadow='0 0 10px #1dbf7330'`
                                    : `this.style.borderColor='#3B82F6';this.style.color='#60A5FA';this.style.boxShadow='0 0 10px #3B82F630'`"
                                :onmouseout="s.label === 'Fiverr'
                                    ? `this.style.borderColor='#1e3a5f';this.style.color='#A8C4E8';this.style.boxShadow='none'`
                                    : `this.style.borderColor='#1e3a5f';this.style.color='#A8C4E8';this.style.boxShadow='none'`">
                                <!-- GitHub -->
                                <svg v-if="s.label === 'GitHub'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                <!-- LinkedIn -->
                                <svg v-else-if="s.label === 'LinkedIn'" width="16" height="16" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                                <!-- Fiverr -->
                                <svg v-else-if="s.label === 'Fiverr'" width="18" height="18" viewBox="0 0 32 32"
                                    fill="currentColor">
                                    <!-- F stem -->
                                    <path
                                        d="M7 32V14h3.5v-1.5C10.5 9 12.5 7 16 7h3v5h-2.5c-1 0-1.5.5-1.5 1.5V14H18.5v5H15V32H7z" />
                                    <!-- i dot -->
                                    <circle cx="22.5" cy="8.5" r="3" />
                                    <!-- i stem -->
                                    <rect x="20" y="14" width="5" height="18" rx="1" />
                                </svg>
                                <!-- Globe -->
                                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path
                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- ── RIGHT COLUMN (3/5) — Form ────────────────── -->
                <div id="contact-form" class="md:col-span-3 scroll-mt-28">
                    <div class="rounded-2xl border p-8" style="background:#0D1220;border-color:#1e3a5f;">

                        <h2 class="font-bold text-white text-2xl mb-1" style="font-family:'Georgia',serif;">Send a
                            Message</h2>
                        <p class="text-sm mb-8" style="color:#475569;font-family:system-ui;">
                            All fields are required. I'll respond as soon as possible.
                        </p>

                        <!-- Success message -->
                        <div v-if="successMsg" class="mb-6 p-4 rounded-xl border flex items-center gap-3"
                            style="background:#052e16;border-color:#16a34a40;color:#4ade80;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span class="text-sm font-medium" style="font-family:system-ui;">{{ successMsg }}</span>
                        </div>

                        <!-- Error message -->
                        <div v-if="errorMsg" class="mb-6 p-4 rounded-xl border flex items-center gap-3"
                            style="background:#1a0505;border-color:#dc262640;color:#f87171;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <span class="text-sm font-medium" style="font-family:system-ui;">{{ errorMsg }}</span>
                        </div>

                        <form @submit.prevent="handleSubmit" class="space-y-5">

                            <!-- Name + Email row -->
                            <div class="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label class="block text-xs font-semibold uppercase tracking-widest mb-2"
                                        style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                        Full Name <span style="color:#3B82F6;">*</span>
                                    </label>
                                    <input v-model="form.name" type="text" placeholder="John Doe" required
                                        class="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                                        style="background:#05080F;border:1px solid #1e3a5f;color:#fff;
                    font-family:system-ui;"
                                        onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F620'"
                                        onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold uppercase tracking-widest mb-2"
                                        style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                        Email Address <span style="color:#3B82F6;">*</span>
                                    </label>
                                    <input v-model="form.email" type="email" placeholder="john@example.com" required
                                        class="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                                        style="background:#05080F;border:1px solid #1e3a5f;color:#fff;
                    font-family:system-ui;"
                                        onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F620'"
                                        onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'" />
                                </div>
                            </div>

                            <!-- Subject dropdown -->
                            <div>
                                <label class="block text-xs font-semibold uppercase tracking-widest mb-2"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                    Subject <span style="color:#3B82F6;">*</span>
                                </label>
                                <div class="relative">
                                    <select v-model="form.subject" required class="w-full px-4 py-3 rounded-xl text-sm appearance-none
                           transition-all focus:outline-none cursor-pointer" style="background:#05080F;border:1px solid #1e3a5f;color:#fff;
                    font-family:system-ui;" onfocus="this.style.borderColor='#3B82F6'"
                                        onblur="this.style.borderColor='#1e3a5f'">
                                        <option value="" disabled style="background:#0D1220;">
                                            Select a subject...
                                        </option>
                                        <option v-for="s in subjects" :key="s" :value="s"
                                            style="background:#0D1220;color:#fff;">{{ s }}</option>
                                    </select>
                                    <!-- Chevron -->
                                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569"
                                            stroke-width="2.5">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Message textarea -->
                            <div>
                                <label class="block text-xs font-semibold uppercase tracking-widest mb-2"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                    Message <span style="color:#3B82F6;">*</span>
                                </label>
                                <textarea v-model="form.message" rows="6"
                                    placeholder="Tell me about your project or idea..." required minlength="20" class="w-full px-4 py-3 rounded-xl text-sm resize-none
                         transition-all focus:outline-none" style="background:#05080F;border:1px solid #1e3a5f;color:#fff;
                  font-family:system-ui;line-height:1.7;"
                                    onfocus="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 0 3px #3B82F620'"
                                    onblur="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'"></textarea>
                                <p class="text-xs mt-2" style="color:#475569;font-family:system-ui;">
                                    Minimum 250 characters.
                                    <span v-if="form.message.length > 0"
                                        :style="form.message.length >= 250 ? 'color:#4ade80;' : 'color:#f87171;'">
                                        ({{ form.message.length }} / 250)
                                    </span>
                                </p>
                            </div>

                            <!-- Submit button -->
                            <button type="submit" :disabled="loading || form.message.length < 250" class="w-full py-4 text-white font-semibold rounded-2xl
                       transition-all hover:scale-[1.01] disabled:opacity-50
                       disabled:cursor-not-allowed flex items-center justify-center gap-3" style="background:#3B82F6;box-shadow:0 0 28px #3B82F640;
                font-family:system-ui;font-size:15px;">
                                <svg v-if="!loading" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <path
                                        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <!-- Spinner -->
                                <svg v-else class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                                {{ loading ? 'Sending...' : 'Send Message' }}
                            </button>
                        </form>
                    </div>

                    <!-- Privacy note -->
                    <p class="text-center text-xs mt-5" style="color:#475569;font-family:system-ui;">
                        🔒 Your information is private and will never be shared with third parties.
                    </p>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
@keyframes greenPulse {

    0%,
    100% {
        box-shadow: 0 0 6px #4ade80;
    }

    50% {
        box-shadow: 0 0 14px #4ade80, 0 0 28px #4ade8060;
    }
}

/* Fix placeholder color for dark inputs */
input::placeholder,
textarea::placeholder {
    color: #475569;
}

select option {
    background: #0D1220;
    color: #fff;
}
</style>

<script setup>
import { ref, reactive } from 'vue'
import api from '@/api/axios'

const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
})

const subjects = [
    'Freelance Project',
    'Full-Time Opportunity',
    'Collaboration',
    'Code Review / Consultation',
    'Bug Fix / Support',
    'Other',
]

const contactInfo = [
    {
        label: 'Email',
        value: 'hello@pialcodes.com',
        svgProps: {
            width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none',
            stroke: 'currentColor', 'stroke-width': '2'
        },
        svgPath: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>`,
    },
    {
        label: 'Location',
        value: 'Dhaka, Bangladesh',
        svgProps: {
            width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none',
            stroke: 'currentColor', 'stroke-width': '2'
        },
        svgPath: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>`,
    },
    {
        label: 'Response Time',
        value: 'Within 24 hours',
        svgProps: {
            width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none',
            stroke: 'currentColor', 'stroke-width': '2'
        },
        svgPath: `<circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>`,
    },
]

const socials = [
    { label: 'GitHub', url: 'https://github.com/mahmudpial' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/pial-mahmud/' },
    { label: 'Fiverr', url: 'https://www.fiverr.com/s/akD7e5g' },
    { label: 'Website', url: '#' },
]

async function handleSubmit() {
    if (form.message.length < 250) return
    loading.value = true
    successMsg.value = ''
    errorMsg.value = ''
    try {
        await api.post('/contacts', form)
        successMsg.value = 'Message sent! I\'ll get back to you within 24 hours.'
        Object.assign(form, { name: '', email: '', subject: '', message: '' })
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to send. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>
