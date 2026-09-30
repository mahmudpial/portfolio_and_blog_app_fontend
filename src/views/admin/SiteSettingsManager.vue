<template>
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-10">

        <!-- Top Header -->
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4 pb-6 border-b" style="border-color:rgba(139, 92, 246, 0.2);">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="w-2.5 h-2.5 rounded-full bg-violet-400" style="box-shadow:0 0 10px #8B5CF6;"></span>
                    <span class="text-xs font-bold uppercase tracking-widest text-violet-400">Content Management System</span>
                </div>
                <h1 class="font-serif text-3xl font-bold text-white tracking-tight">
                    Site <span style="color:#C084FC;">Settings &amp; CMS</span>
                </h1>
                <p class="text-sm opacity-60 mt-1">Control every detail of your website: General, Home, About, Footer, FAQs, and Client Feedback.</p>
            </div>

            <div class="flex items-center gap-3">
                <button @click="saveSettings" :disabled="saving"
                    class="flex items-center gap-2 px-7 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-2xl transition-all hover:scale-105 disabled:opacity-50 shadow-lg shadow-violet-600/30 cursor-pointer border-0">
                    <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                    </svg>
                    {{ saving ? 'Saving Changes...' : 'Save All Settings' }}
                </button>
            </div>
        </div>

        <!-- Notification Toast -->
        <transition name="fade">
            <div v-if="alertMsg" class="mb-6 p-4 rounded-2xl border flex items-center justify-between gap-3"
                :class="alertType === 'success' ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-red-950/80 border-red-500/40 text-red-300'">
                <div class="flex items-center gap-3">
                    <span v-if="alertType === 'success'" class="text-xl">✅</span>
                    <span v-else class="text-xl">⚠️</span>
                    <span class="text-sm font-semibold">{{ alertMsg }}</span>
                </div>
                <button @click="alertMsg = ''" class="text-xs opacity-60 hover:opacity-100 font-bold bg-transparent border-0 cursor-pointer text-current">✕</button>
            </div>
        </transition>

        <!-- Navigation Tabs -->
        <div class="flex gap-2 mb-8 p-1.5 bg-white/5 rounded-2xl overflow-x-auto border border-white/10 scrollbar-none">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border-0"
                :class="activeTab === tab.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-white/60 hover:text-white hover:bg-white/5'">
                <span>{{ tab.icon }}</span>
                <span>{{ tab.label }}</span>
            </button>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             TAB 1: GENERAL SETTINGS
        ══════════════════════════════════════════════════════════ -->
        <div v-if="activeTab === 'general'" class="space-y-8">
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                    <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                    Brand &amp; Personal Identity
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Brand Name (Navbar Logo Text)</label>
                        <input v-model="settingsMap['brand_name']" type="text" placeholder="e.g. Pial"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Full Name</label>
                        <input v-model="settingsMap['full_name']" type="text" placeholder="e.g. Pial Mahmud"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Professional Headline / Title</label>
                        <input v-model="settingsMap['title']" type="text" placeholder="e.g. Full-Stack Software Engineer"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Availability Status Badge</label>
                        <input v-model="settingsMap['available_status']" type="text" placeholder="e.g. Available for freelance & full-time"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Custom Logo URL (Optional)</label>
                        <input v-model="settingsMap['logo_url']" type="text" placeholder="https://example.com/logo.png"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Avatar / Profile Photo URL</label>
                        <input v-model="settingsMap['avatar_url']" type="text" placeholder="https://example.com/avatar.jpg"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Resume / CV Download Link</label>
                        <input v-model="settingsMap['resume_url']" type="text" placeholder="https://example.com/resume.pdf"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Primary Color</label>
                            <div class="flex items-center gap-3">
                                <input v-model="settingsMap['primary_color']" type="color" class="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0" />
                                <input v-model="settingsMap['primary_color']" type="text" class="flex-1 px-3 py-2 text-xs rounded-lg bg-black/50 border text-white" style="border-color:rgba(139,92,246,0.25);" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Accent Color</label>
                            <div class="flex items-center gap-3">
                                <input v-model="settingsMap['secondary_color']" type="color" class="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0" />
                                <input v-model="settingsMap['secondary_color']" type="text" class="flex-1 px-3 py-2 text-xs rounded-lg bg-black/50 border text-white" style="border-color:rgba(139,92,246,0.25);" />
                            </div>
                        </div>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">SEO Meta Description</label>
                        <textarea v-model="settingsMap['site_description']" rows="2" placeholder="Full-Stack Engineer building robust systems with Laravel & Vue 3..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                            style="border-color:rgba(139, 92, 246, 0.25);"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             TAB 2: HOME PAGE CMS
        ══════════════════════════════════════════════════════════ -->
        <div v-if="activeTab === 'home'" class="space-y-8">
            <!-- Hero Section -->
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                    <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                    Hero Section
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Hero Badge Text</label>
                        <input v-model="settingsMap['home_badge_text']" type="text" placeholder="e.g. FULL-STACK DEVELOPER"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Greeting Phrase</label>
                        <input v-model="settingsMap['home_hero_greeting']" type="text" placeholder="e.g. Hi, I'm"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Main Name / Heading</label>
                        <input v-model="settingsMap['home_hero_title']" type="text" placeholder="e.g. Pial Mahmud"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Typewriter Roles (Comma Separated)</label>
                        <input v-model="settingsMap['home_hero_roles']" type="text" placeholder="e.g. Full-Stack Engineer, Laravel Specialist, Vue.js Developer, API Architect"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Hero Intro Bio</label>
                        <textarea v-model="settingsMap['home_hero_bio']" rows="3" placeholder="Crafting robust web applications with Laravel, Vue 3, and clean architecture..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                            style="border-color:rgba(139, 92, 246, 0.25);"></textarea>
                    </div>

                    <!-- Button 1 -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Primary CTA Button Text</label>
                        <input v-model="settingsMap['home_btn1_text']" type="text" placeholder="e.g. View Projects"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Primary CTA Button Link</label>
                        <input v-model="settingsMap['home_btn1_link']" type="text" placeholder="e.g. /portfolio"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <!-- Button 2 -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Secondary Button Text</label>
                        <input v-model="settingsMap['home_btn2_text']" type="text" placeholder="e.g. Contact Me"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Secondary Button Link</label>
                        <input v-model="settingsMap['home_btn2_link']" type="text" placeholder="e.g. /contact"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <!-- Hero Showcase Dual Images & Interval -->
                    <div class="md:col-span-2 pt-4 border-t" style="border-color:rgba(139, 92, 246, 0.15);">
                        <h4 class="text-xs font-bold uppercase tracking-widest text-violet-400 mb-4 flex items-center gap-2">
                            <span>📸</span>
                            <span>Hero Dual Photo Crossfade Showcase</span>
                        </h4>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Hero Showcase Photo 1 URL</label>
                        <input v-model="settingsMap['home_hero_image_1']" type="text" placeholder="/images/pial-mahmud-about.jpg or https://..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                        <p class="text-[11px] opacity-40 mt-1">First rotating portrait image shown on the hero section.</p>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Hero Showcase Photo 2 URL</label>
                        <input v-model="settingsMap['home_hero_image_2']" type="text" placeholder="/images/pial-mahmud.jpg or https://..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                        <p class="text-[11px] opacity-40 mt-1">Second rotating portrait image shown on crossfade.</p>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Auto-Switch Interval (Seconds)</label>
                        <input v-model="settingsMap['home_hero_interval_sec']" type="number" min="3" max="300" placeholder="e.g. 7"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                        <p class="text-[11px] opacity-40 mt-1">Recommended: 6–8 seconds (smooth auto-rotator between the 2 photos).</p>
                    </div>
                </div>
            </div>

            <!-- Stats Counters -->
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                    <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                    Stats Counters (Numbers &amp; Achievements)
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-for="n in 4" :key="n" class="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                        <span class="text-xs font-bold text-violet-400">Stat #{{ n }}</span>
                        <input v-model="settingsMap[`home_stat${n}_value`]" type="text" :placeholder="['3+', '25+', '100%', '24/7'][n-1]"
                            class="w-full px-3 py-2 text-sm rounded-lg bg-black/60 border text-white focus:outline-none" style="border-color:rgba(139,92,246,0.3);" />
                        <input v-model="settingsMap[`home_stat${n}_label`]" type="text" :placeholder="['Years Experience', 'Projects Delivered', 'Quality Rating', 'Support'][n-1]"
                            class="w-full px-3 py-2 text-xs rounded-lg bg-black/60 border text-white/70 focus:outline-none" style="border-color:rgba(139,92,246,0.2);" />
                    </div>
                </div>
            </div>

            <!-- Home Final CTA Banner -->
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                    <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                    Home Bottom CTA Banner
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">CTA Banner Heading</label>
                        <input v-model="settingsMap['home_cta_title']" type="text" placeholder="Ready to build something amazing?"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">CTA Banner Subtitle</label>
                        <textarea v-model="settingsMap['home_cta_desc']" rows="2" placeholder="Let's collaborate on your next project..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                            style="border-color:rgba(139, 92, 246, 0.25);"></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">CTA Button Text</label>
                        <input v-model="settingsMap['home_cta_btn_text']" type="text" placeholder="e.g. Get in Touch"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">CTA Button Link</label>
                        <input v-model="settingsMap['home_cta_btn_link']" type="text" placeholder="e.g. /contact"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             TAB 3: ABOUT PAGE CMS
        ══════════════════════════════════════════════════════════ -->
        <div v-if="activeTab === 'about'" class="space-y-8">
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                    <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                    About Page Story &amp; Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">About Hero Title</label>
                        <input v-model="settingsMap['about_hero_title']" type="text" placeholder="Architecting Robust Web Solutions"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">About Profile Image URL</label>
                        <input v-model="settingsMap['about_image']" type="text" placeholder="https://example.com/about-photo.jpg"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">About Main Description / Bio</label>
                        <textarea v-model="settingsMap['about_description']" rows="4" placeholder="I am a Full-Stack Engineer specializing in Laravel, Vue.js, MySQL..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                            style="border-color:rgba(139, 92, 246, 0.25);"></textarea>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Philosophy Section Title</label>
                        <input v-model="settingsMap['about_title']" type="text" placeholder="Building Software That Scales &amp; Endures"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             TAB 4: FOOTER CMS
        ══════════════════════════════════════════════════════════ -->
        <div v-if="activeTab === 'footer'" class="space-y-8">
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                    <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                    Footer &amp; Social Links
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Footer Short Bio</label>
                        <textarea v-model="settingsMap['footer_bio']" rows="2" placeholder="I build multi-tenant systems with role-based access control..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors resize-none"
                            style="border-color:rgba(139, 92, 246, 0.25);"></textarea>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Footer Copyright Tagline</label>
                        <input v-model="settingsMap['footer_copyright']" type="text" placeholder="e.g. Engineered with precision, security & high performance."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Contact Email</label>
                        <input v-model="settingsMap['email']" type="email" placeholder="hello@pialcodes.com"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Location Name</label>
                        <input v-model="settingsMap['location']" type="text" placeholder="Dhaka, Bangladesh"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">GitHub URL</label>
                        <input v-model="settingsMap['github_url']" type="text" placeholder="https://github.com/mahmudpial"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">LinkedIn URL</label>
                        <input v-model="settingsMap['linkedin_url']" type="text" placeholder="https://www.linkedin.com/in/pial-mahmud/"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Upwork Profile URL</label>
                        <input v-model="settingsMap['upwork_url']" type="text" placeholder="https://www.upwork.com/freelancers/..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Personal Website URL</label>
                        <input v-model="settingsMap['website_url']" type="text" placeholder="https://pialsoftdev.me"
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Discord Server / Profile URL</label>
                        <input v-model="settingsMap['discord_url']" type="text" placeholder="https://discord.gg/..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Slack Workspace URL</label>
                        <input v-model="settingsMap['slack_url']" type="text" placeholder="https://slack.com/..."
                            class="w-full px-4 py-3 rounded-xl text-sm bg-black/50 border text-white focus:outline-none focus:border-violet-500 transition-colors"
                            style="border-color:rgba(139, 92, 246, 0.25);" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             TAB 5: FAQ CMS
        ══════════════════════════════════════════════════════════ -->
        <div v-if="activeTab === 'faq'" class="space-y-6">
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                        <h3 class="text-lg font-bold text-white flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                            <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                            Frequently Asked Questions (FAQ)
                        </h3>
                        <p class="text-xs opacity-60 mt-1">Manage all public FAQs displayed on the pricing and info sections.</p>
                    </div>

                    <button @click="addFaq" class="flex items-center gap-2 px-4 py-2 bg-violet-600/30 hover:bg-violet-600 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
                        <span>＋ Add New FAQ</span>
                    </button>
                </div>

                <!-- FAQ List Items -->
                <div class="space-y-4">
                    <div v-for="(faq, index) in faqsList" :key="index"
                        class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative group">
                        
                        <div class="flex items-center justify-between gap-3">
                            <span class="text-xs font-bold text-violet-400">FAQ Item #{{ index + 1 }}</span>
                            <button @click="removeFaq(index)" class="text-xs text-red-400 hover:text-red-300 font-bold bg-transparent border-0 cursor-pointer p-1">
                                🗑️ Remove
                            </button>
                        </div>

                        <div>
                            <label class="block text-[11px] font-bold uppercase tracking-wider text-purple-300/70 mb-1">Question</label>
                            <input v-model="faq.question" type="text" placeholder="e.g. Which tech stacks do you specialize in?"
                                class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-black/60 border text-white focus:outline-none focus:border-violet-500"
                                style="border-color:rgba(139,92,246,0.3);" />
                        </div>

                        <div>
                            <label class="block text-[11px] font-bold uppercase tracking-wider text-purple-300/70 mb-1">Answer</label>
                            <textarea v-model="faq.answer" rows="3" placeholder="Provide a detailed, helpful answer..."
                                class="w-full px-3.5 py-2.5 rounded-xl text-sm bg-black/60 border text-white focus:outline-none focus:border-violet-500 resize-none"
                                style="border-color:rgba(139,92,246,0.3);"></textarea>
                        </div>
                    </div>

                    <div v-if="faqsList.length === 0" class="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                        <p class="text-sm opacity-50">No FAQs created yet. Click "Add New FAQ" to create one.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             TAB 6: CLIENT FEEDBACK / TESTIMONIALS CMS
        ══════════════════════════════════════════════════════════ -->
        <div v-if="activeTab === 'feedback'" class="space-y-6">
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                        <h3 class="text-lg font-bold text-white flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                            <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                            Client Feedback &amp; Testimonials
                        </h3>
                        <p class="text-xs opacity-60 mt-1">Manage client reviews, quotes, ratings, and roles shown on the Home page.</p>
                    </div>

                    <button @click="addTestimonial" class="flex items-center gap-2 px-4 py-2 bg-violet-600/30 hover:bg-violet-600 border border-violet-500/40 text-violet-200 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
                        <span>＋ Add Client Review</span>
                    </button>
                </div>

                <!-- Testimonials Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div v-for="(t, index) in testimonialsList" :key="index"
                        class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative">
                        
                        <div class="flex items-center justify-between gap-3">
                            <span class="text-xs font-bold text-violet-400">Review #{{ index + 1 }}</span>
                            <button @click="removeTestimonial(index)" class="text-xs text-red-400 hover:text-red-300 font-bold bg-transparent border-0 cursor-pointer">
                                🗑️ Remove
                            </button>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[11px] font-bold uppercase tracking-wider text-purple-300/70 mb-1">Client Name</label>
                                <input v-model="t.name" type="text" placeholder="Sarah Jenkins"
                                    class="w-full px-3 py-2 rounded-xl text-sm bg-black/60 border text-white focus:outline-none focus:border-violet-500"
                                    style="border-color:rgba(139,92,246,0.3);" />
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold uppercase tracking-wider text-purple-300/70 mb-1">Role / Company</label>
                                <input v-model="t.role" type="text" placeholder="CTO at TechCorp"
                                    class="w-full px-3 py-2 rounded-xl text-sm bg-black/60 border text-white focus:outline-none focus:border-violet-500"
                                    style="border-color:rgba(139,92,246,0.3);" />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[11px] font-bold uppercase tracking-wider text-purple-300/70 mb-1">Stars Rating</label>
                                <select v-model="t.stars" class="w-full px-3 py-2 rounded-xl text-sm bg-black/60 border text-white focus:outline-none" style="border-color:rgba(139,92,246,0.3);">
                                    <option :value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                                    <option :value="4">⭐⭐⭐⭐ (4 Stars)</option>
                                    <option :value="3">⭐⭐⭐ (3 Stars)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold uppercase tracking-wider text-purple-300/70 mb-1">Client Avatar URL (Opt)</label>
                                <input v-model="t.avatar" type="text" placeholder="https://..."
                                    class="w-full px-3 py-2 rounded-xl text-xs bg-black/60 border text-white focus:outline-none"
                                    style="border-color:rgba(139,92,246,0.3);" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-[11px] font-bold uppercase tracking-wider text-purple-300/70 mb-1">Client Quote / Testimonial</label>
                            <textarea v-model="t.quote" rows="3" placeholder="Delivered the project ahead of schedule with remarkable code quality..."
                                class="w-full px-3.5 py-2 rounded-xl text-sm bg-black/60 border text-white focus:outline-none focus:border-violet-500 resize-none"
                                style="border-color:rgba(139,92,246,0.3);"></textarea>
                        </div>
                    </div>

                    <div v-if="testimonialsList.length === 0" class="md:col-span-2 text-center py-10 border border-dashed border-white/10 rounded-2xl">
                        <p class="text-sm opacity-50">No reviews added yet. Click "Add Client Review" to create one.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             TAB 7: SERVICES CMS HUB
        ══════════════════════════════════════════════════════════ -->
        <div v-if="activeTab === 'services'" class="space-y-8">
            <div class="rounded-3xl border p-6 md:p-8" style="background:rgba(18, 14, 28, 0.7);border-color:rgba(139, 92, 246, 0.25);">
                <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                        <h3 class="text-lg font-bold text-white flex items-center gap-2.5" style="font-family:'Georgia',serif;">
                            <span class="w-2 h-5 bg-violet-500 rounded-full"></span>
                            Services &amp; Detail Pages CMS
                        </h3>
                        <p class="text-xs text-white/60 mt-1">Manage individual service pages (Hero, Workflow, Tech Stack, Deliverables, Pricing, and Contact buttons).</p>
                    </div>

                    <RouterLink to="/admin/services"
                        class="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-violet-600/30">
                        <span>Open Full Services Manager</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </RouterLink>
                </div>

                <div class="p-6 rounded-2xl border bg-black/40 text-center space-y-4" style="border-color:rgba(139, 92, 246, 0.2);">
                    <div class="w-16 h-16 rounded-2xl bg-violet-600/20 text-violet-400 mx-auto flex items-center justify-center text-2xl">
                        ⚡
                    </div>
                    <div class="max-w-md mx-auto">
                        <h4 class="text-white font-bold text-base mb-1">Centralized Service Content Management</h4>
                        <p class="text-xs text-purple-200/70 leading-relaxed">
                            Every service page (e.g. <code>/services/1</code>, <code>/services/5</code>) has its own rich CMS modal inside the Services Manager. You can customize the Delivery Timeline, Starting Budget, Workflow Steps, Tech Stacks, Deliverables, and Contact Inquiry CTAs.
                        </p>
                    </div>
                    <div class="pt-2">
                        <RouterLink to="/admin/services"
                            class="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl transition-all">
                            <span>Manage All Services Now</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Action Bar (Non-floating, cleanly aligned) -->
        <div class="mt-10 pt-6 border-t flex items-center justify-between flex-wrap gap-4" style="border-color:rgba(139, 92, 246, 0.2);">
            <div class="flex items-center gap-2 text-xs opacity-60" style="color:#C9B9E8;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Changes will be instantly reflected on the live website upon saving.</span>
            </div>

            <button @click="saveSettings" :disabled="saving"
                class="flex items-center gap-2.5 px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl shadow-lg shadow-violet-600/30 transition-all hover:scale-105 disabled:opacity-50 cursor-pointer border-0">
                <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>{{ saving ? 'Saving Changes...' : 'Save All Settings' }}</span>
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/api/axios'

const activeTab = ref('general')
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')
const settingsMap = reactive({})

const faqsList = ref([])
const testimonialsList = ref([])

const tabs = [
    { id: 'general', label: 'General', icon: '🌐' },
    { id: 'home', label: 'Home Page', icon: '🏠' },
    { id: 'about', label: 'About Page', icon: '👤' },
    { id: 'footer', label: 'Footer & Links', icon: '🦶' },
    { id: 'faq', label: 'FAQ Manager', icon: '❓' },
    { id: 'feedback', label: 'Client Feedback', icon: '⭐' },
    { id: 'services', label: 'Services CMS', icon: '⚡' },
]

const defaultFaqs = [
    {
        question: 'How does the milestone and payment process work?',
        answer: 'Typically, projects follow a standard 50% upfront deposit to initiate development and 50% upon final acceptance, demo walkthrough, and live deployment.'
    },
    {
        question: 'Which tech stacks and architectures do you use?',
        answer: 'I specialize in full-stack web applications using Laravel, Vue.js 3, Tailwind CSS, PostgreSQL/MySQL, Inertia.js, Pinia, RESTful APIs, and Redis.'
    },
    {
        question: 'Do you provide post-launch support and bug fixes?',
        answer: 'Yes! Every project package includes dedicated post-delivery support and bug-fixing warranty.'
    },
    {
        question: 'Can you work on existing codebases or perform refactoring?',
        answer: 'Yes, I frequently audit, fix security issues, optimize slow database queries, and refactor existing Laravel/Vue codebases to scale cleanly.'
    }
]

const defaultTestimonials = [
    {
        name: 'Sarah M.',
        role: 'Startup Founder',
        quote: 'Delivered the project ahead of schedule with exceptional attention to detail. The codebase is clean and easy to maintain.',
        stars: 5,
        avatar: '',
    },
    {
        name: 'James K.',
        role: 'Product Manager',
        quote: 'Outstanding UI work. Every interaction feels polished. Highly recommend for anyone needing a skilled full-stack developer.',
        stars: 5,
        avatar: '',
    },
    {
        name: 'Lena R.',
        role: 'Agency Director',
        quote: 'Reliable, communicative, and technically strong. Our go-to developer for complex Laravel projects.',
        stars: 5,
        avatar: '',
    }
]

function addFaq() {
    faqsList.value.push({ question: '', answer: '' })
}

function removeFaq(index) {
    faqsList.value.splice(index, 1)
}

function addTestimonial() {
    testimonialsList.value.push({ name: '', role: '', quote: '', stars: 5, avatar: '' })
}

function removeTestimonial(index) {
    testimonialsList.value.splice(index, 1)
}

onMounted(fetchSettings)

async function fetchSettings() {
    try {
        let res
        try {
            res = await api.get('/settings')
        } catch {
            res = await api.get('/admin/settings')
        }
        const settings = res.data?.data ?? res.data ?? []
        if (Array.isArray(settings)) {
            settings.forEach(s => {
                if (s && s.key) settingsMap[s.key] = s.value ?? ''
            })
        } else if (typeof settings === 'object' && settings !== null) {
            Object.entries(settings).forEach(([k, v]) => {
                settingsMap[k] = v ?? ''
            })
        }

        // Parse FAQs
        if (settingsMap['faqs_json']) {
            try {
                faqsList.value = JSON.parse(settingsMap['faqs_json'])
            } catch {
                faqsList.value = defaultFaqs
            }
        } else {
            faqsList.value = defaultFaqs
        }

        // Parse Testimonials
        if (settingsMap['testimonials_json']) {
            try {
                testimonialsList.value = JSON.parse(settingsMap['testimonials_json'])
            } catch {
                testimonialsList.value = defaultTestimonials
            }
        } else {
            testimonialsList.value = defaultTestimonials
        }

    } catch (err) {
        showAlert('Failed to load settings', 'error')
    }
}

async function saveSettings() {
    saving.value = true
    try {
        // Serialize lists
        settingsMap['faqs_json'] = JSON.stringify(faqsList.value)
        settingsMap['testimonials_json'] = JSON.stringify(testimonialsList.value)

        const payload = {
            settings: Object.entries(settingsMap).map(([key, value]) => ({ key, value }))
        }

        try {
            await api.put('/settings', payload)
        } catch {
            try {
                await api.put('/admin/settings', payload)
            } catch {
                await api.post('/admin/settings', payload)
            }
        }
        showAlert('All CMS settings saved successfully!', 'success')
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to save settings', 'error')
    } finally {
        saving.value = false
    }
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg
    alertType.value = type
    setTimeout(() => alertMsg.value = '', 3500)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
