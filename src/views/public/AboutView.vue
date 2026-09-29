<template>
    <div class="min-h-screen transition-colors duration-300" style="background:#0A0610;min-height:100vh;">

        <!-- ── HERO SECTION ─────────────────────────────────────── -->
        <section class="relative pt-32 pb-20 px-6 md:px-16 overflow-hidden">
            <!-- Background effects -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;transform:translateX(-50%);
                    border-radius:50%;background:radial-gradient(circle,#6D28D922 0%,transparent 70%);filter:blur(50px);"></div>
                <div class="absolute" style="width:450px;height:450px;top:-100px;left:-50px;border-radius:50%;
                    background:radial-gradient(circle,#8B5CF612 0%,transparent 70%);filter:blur(60px);"></div>
                <div class="absolute" style="width:450px;height:450px;top:-100px;right:-50px;border-radius:50%;
                    background:radial-gradient(circle,#8B5CF612 0%,transparent 70%);filter:blur(60px);"></div>
                <!-- Grid pattern -->
                <div class="absolute inset-0" style="background-image:linear-gradient(90deg,#3B2A5A08 1px,transparent 1px);
                    background-size:80px 100%;opacity:0.8;"></div>
                <div class="absolute inset-0" style="background-image:linear-gradient(#3B2A5A06 1px,transparent 1px);
                    background-size:100% 80px;opacity:0.8;"></div>
            </div>

            <div class="relative z-10 max-w-4xl mx-auto text-center">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6"
                    style="background:#120E1C;border-color:#3B2A5A;">
                    <span class="w-2 h-2 rounded-full bg-violet-400" style="box-shadow:0 0 8px #8B5CF6;"></span>
                    <span class="text-xs font-semibold uppercase tracking-widest text-violet-300"
                        style="letter-spacing:.2em;font-family:system-ui;">About Me</span>
                </div>

                <h1 class="font-bold leading-tight mb-6"
                    style="font-size:clamp(36px,5.5vw,64px);font-family:'Georgia',serif;">
                    <span class="text-white">Architecting Robust </span>
                    <span style="color:#C084FC;text-shadow:0 0 40px #8B5CF650;">Web Solutions</span>
                </h1>

                <p class="text-base md:text-lg leading-relaxed mb-10 mx-auto"
                    style="color:#C9B9E8;font-family:system-ui;max-width:720px;line-height:1.85;">
                    {{ settings['about_description'] || 'Software Developer (PHP Laravel) at Smart Software Ltd, Dhaka. I build secure, multi-tenant backend systems using Laravel, Vue.js 3, and Inertia.js — with a hands-on focus on RBAC, tenant isolation, and fail-closed access control design.' }}
                </p>

                <div class="flex flex-wrap items-center justify-center gap-4">
                    <RouterLink :to="{ path: '/contact', hash: '#contact-form' }"
                        class="px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 flex items-center gap-2 shadow-lg cursor-pointer"
                        style="background:#8B5CF6;box-shadow:0 0 25px #8B5CF645;font-family:system-ui;text-decoration:none;">
                        <span>Let's Work Together</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </RouterLink>

                    <a v-if="settings['resume_url']" :href="settings['resume_url']" target="_blank"
                        class="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-105 border cursor-pointer"
                        style="background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;text-decoration:none;"
                        onmouseover="this.style.borderColor='#8B5CF6';this.style.color='#C084FC'"
                        onmouseout="this.style.borderColor='#3B2A5A';this.style.color='#C9B9E8'">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Download CV</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- ── STATS COUNTER STRIP (SCROLL TRIGGERED ANIMATION) ─── -->
        <section ref="statsSection" class="py-12 px-6 md:px-16 border-y relative overflow-hidden" style="background:#120E1C;border-color:#241730;">
            <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#241730]">
                
                <!-- Stat 1: Years Experience -->
                <div class="p-4 flex flex-col items-center justify-center">
                    <div class="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-violet-400"
                        style="background:#8B5CF618;border:1px solid #8B5CF630;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </div>
                    <div class="text-4xl md:text-5xl font-bold mb-1.5 font-serif text-white tracking-tight"
                        style="color:#C084FC;text-shadow:0 0 25px #8B5CF640;">
                        {{ animatedStats[0] }}<span class="text-violet-400 font-sans">+</span>
                    </div>
                    <div class="text-xs uppercase tracking-wider font-semibold"
                        style="color:#94A3B8;font-family:system-ui;letter-spacing:.14em;">
                        Years Experience
                    </div>
                </div>

                <!-- Stat 2: Projects Delivered -->
                <div class="p-4 flex flex-col items-center justify-center">
                    <div class="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-violet-400"
                        style="background:#8B5CF618;border:1px solid #8B5CF630;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            <polyline points="9 13 12 16 15 13"></polyline>
                        </svg>
                    </div>
                    <div class="text-4xl md:text-5xl font-bold mb-1.5 font-serif text-white tracking-tight"
                        style="color:#C084FC;text-shadow:0 0 25px #8B5CF640;">
                        {{ animatedStats[1] }}<span class="text-violet-400 font-sans">+</span>
                    </div>
                    <div class="text-xs uppercase tracking-wider font-semibold"
                        style="color:#94A3B8;font-family:system-ui;letter-spacing:.14em;">
                        Projects Delivered
                    </div>
                </div>

                <!-- Stat 3: Commitment to Quality -->
                <div class="p-4 flex flex-col items-center justify-center">
                    <div class="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-emerald-400"
                        style="background:#10B98118;border:1px solid #10B98130;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </div>
                    <div class="text-4xl md:text-5xl font-bold mb-1.5 font-serif text-white tracking-tight"
                        style="color:#34D399;text-shadow:0 0 25px #10B98140;">
                        {{ animatedStats[2] }}<span class="text-emerald-400 font-sans">%</span>
                    </div>
                    <div class="text-xs uppercase tracking-wider font-semibold"
                        style="color:#94A3B8;font-family:system-ui;letter-spacing:.14em;">
                        Commitment to Quality
                    </div>
                </div>

            </div>
        </section>

        <!-- ── MAIN STORY & PROFILE SECTION ─────────────────────── -->
        <section class="py-24 px-6 md:px-16">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-12 gap-12 items-center">
                    
                    <!-- Left: Profile card (5 cols) -->
                    <div class="md:col-span-5">
                        <div class="relative rounded-3xl p-6 border overflow-hidden"
                            style="background:#120E1C;border-color:#3B2A5A;box-shadow:0 20px 50px rgba(0,0,0,0.6);">
                            
                            <!-- Ambient Glow Behind Photo -->
                            <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-30"
                                style="background:#8B5CF6;"></div>

                            <div class="relative rounded-2xl overflow-hidden border border-white/10 mb-6 aspect-[4/5] bg-black/40 flex items-center justify-center">
                                <img v-if="settings['avatar_url'] || settings['about_image']"
                                    :src="settings['avatar_url'] || settings['about_image']"
                                    alt="Pial Mahmud" class="w-full h-full object-cover" />
                                <div v-else class="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center"
                                    style="background:linear-gradient(145deg,#120E1C,#1E1430);">
                                    <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-violet-400"
                                        style="background:#8B5CF620;border:1px solid #8B5CF640;box-shadow:0 0 20px #8B5CF630;">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="16 18 22 12 16 6"></polyline>
                                            <polyline points="8 6 2 12 8 18"></polyline>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-base font-bold text-white font-serif">Pial Mahmud</div>
                                        <div class="text-xs text-violet-400 mt-0.5">Software Developer (PHP &amp; Laravel)</div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-xl font-bold text-white" style="font-family:'Georgia',serif;">
                                        {{ settings['full_name'] || 'Pial Mahmud' }}
                                    </h3>
                                    <p class="text-xs font-semibold text-violet-400 mt-0.5 flex items-center gap-1.5">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                            <path d="M20 7h-7L10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                                        </svg>
                                        <span>{{ settings['title'] || 'Software Developer (PHP & Laravel)' }}</span>
                                    </p>
                                </div>
                                <div class="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse"
                                    style="box-shadow:0 0 12px #34d399;" title="Available for hire"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Narrative & Engineering Principles (7 cols) -->
                    <div class="md:col-span-7 space-y-8">
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-widest text-violet-400"
                                style="letter-spacing:.2em;font-family:system-ui;">My Philosophy</span>
                            <h2 class="text-2xl md:text-3xl font-bold text-white mt-2 mb-4"
                                style="font-family:'Georgia',serif;">
                                {{ settings['about_title'] || 'Building Secure, Resilient & Multi-Tenant Systems' }}
                            </h2>
                            <p class="text-sm md:text-base leading-relaxed mb-4"
                                style="color:#C9B9E8;font-family:system-ui;line-height:1.85;">
                                Software Developer (PHP Laravel) at Smart Software Ltd, Dhaka. I build secure, multi-tenant backend systems using Laravel, Vue.js 3, and Inertia.js — with a hands-on focus on RBAC, tenant isolation, and fail-closed access control design.
                            </p>
                            <p class="text-sm md:text-base leading-relaxed"
                                style="color:#C9B9E8;font-family:system-ui;line-height:1.85;">
                                From database indexing and concurrency safety in MySQL/PostgreSQL to crafting snappy reactive interfaces in Vue 3, I ensure every layer of the system is built with high reliability and zero security loopholes.
                            </p>
                        </div>

                        <!-- 4 Key Pillars with Crisp Professional SVGs -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <!-- Pillar 1: Clean Architecture -->
                            <div class="p-5 rounded-2xl border transition-all hover:border-violet-500/40 hover:-translate-y-0.5"
                                style="background:#120E1C;border-color:#3B2A5A;">
                                <div class="flex items-center gap-3 mb-2.5">
                                    <div class="w-9 h-9 rounded-xl flex items-center justify-center text-violet-400 shrink-0"
                                        style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                            <polyline points="2 17 12 22 22 17"></polyline>
                                            <polyline points="2 12 12 17 22 12"></polyline>
                                        </svg>
                                    </div>
                                    <span class="font-bold text-sm text-white" style="font-family:system-ui;">
                                        Clean Architecture
                                    </span>
                                </div>
                                <p class="text-xs leading-relaxed" style="color:#94A3B8;font-family:system-ui;">
                                    Writing decoupled, SOLID-compliant, and testable enterprise backend code.
                                </p>
                            </div>

                            <!-- Pillar 2: High Performance -->
                            <div class="p-5 rounded-2xl border transition-all hover:border-violet-500/40 hover:-translate-y-0.5"
                                style="background:#120E1C;border-color:#3B2A5A;">
                                <div class="flex items-center gap-3 mb-2.5">
                                    <div class="w-9 h-9 rounded-xl flex items-center justify-center text-violet-400 shrink-0"
                                        style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                        </svg>
                                    </div>
                                    <span class="font-bold text-sm text-white" style="font-family:system-ui;">
                                        High Performance
                                    </span>
                                </div>
                                <p class="text-xs leading-relaxed" style="color:#94A3B8;font-family:system-ui;">
                                    Optimized database queries, query execution plans, Redis caching, and fast load speeds.
                                </p>
                            </div>

                            <!-- Pillar 3: Modern UI/UX -->
                            <div class="p-5 rounded-2xl border transition-all hover:border-violet-500/40 hover:-translate-y-0.5"
                                style="background:#120E1C;border-color:#3B2A5A;">
                                <div class="flex items-center gap-3 mb-2.5">
                                    <div class="w-9 h-9 rounded-xl flex items-center justify-center text-violet-400 shrink-0"
                                        style="background:#8B5CF618;border:1px solid #8B5CF630;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="3" y1="9" x2="21" y2="9"></line>
                                            <line x1="9" y1="21" x2="9" y2="9"></line>
                                        </svg>
                                    </div>
                                    <span class="font-bold text-sm text-white" style="font-family:system-ui;">
                                        Modern UI/UX
                                    </span>
                                </div>
                                <p class="text-xs leading-relaxed" style="color:#94A3B8;font-family:system-ui;">
                                    Reactive Vue.js 3 SPAs, smooth micro-interactions, and accessible Tailwind CSS design.
                                </p>
                            </div>

                            <!-- Pillar 4: Security & RBAC -->
                            <div class="p-5 rounded-2xl border transition-all hover:border-violet-500/40 hover:-translate-y-0.5"
                                style="background:#120E1C;border-color:#3B2A5A;">
                                <div class="flex items-center gap-3 mb-2.5">
                                    <div class="w-9 h-9 rounded-xl flex items-center justify-center text-emerald-400 shrink-0"
                                        style="background:#10B98118;border:1px solid #10B98130;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </div>
                                    <span class="font-bold text-sm text-white" style="font-family:system-ui;">
                                        Security &amp; RBAC
                                    </span>
                                </div>
                                <p class="text-xs leading-relaxed" style="color:#94A3B8;font-family:system-ui;">
                                    Multi-tenant data isolation, fail-closed access control, and OWASP security compliance.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── CAREER & ENGINEERING EXPERIENCE JOURNEY ───────────── -->
        <section class="py-20 px-6 md:px-16 border-t" style="background:#0D0814;border-color:#241730;">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-16">
                    <span class="text-xs font-semibold uppercase tracking-widest text-violet-400"
                        style="letter-spacing:.2em;font-family:system-ui;">Experience</span>
                    <h2 class="text-2xl md:text-3xl font-bold text-white mt-2" style="font-family:'Georgia',serif;">
                        Professional Experience &amp; Engineering Track
                    </h2>
                    <p class="text-xs text-slate-400 mt-2 max-w-lg mx-auto" style="font-family:system-ui;">
                        Hands-on production software engineering, AI-integrated backend systems, and client solutions.
                    </p>
                </div>

                <div class="relative border-l-2 ml-4 md:ml-8 space-y-12" style="border-color:#3B2A5A;">
                    <div v-for="(item, idx) in timeline" :key="idx" class="relative pl-6 md:pl-8 group">
                        
                        <!-- Timeline Node Indicator -->
                        <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all group-hover:scale-125"
                            :style="idx === 0 ? 'background:#8B5CF6;border-color:#C084FC;box-shadow:0 0 12px #8B5CF6;' : 'background:#0A0610;border-color:#8B5CF6;box-shadow:0 0 10px #8B5CF660;'"></div>

                        <!-- Card Container -->
                        <div class="p-7 rounded-3xl border transition-all duration-300 hover:border-violet-500/50 hover:shadow-2xl"
                            style="background:#120E1C;border-color:#3B2A5A;box-shadow:0 10px 30px rgba(0,0,0,0.4);">
                            
                            <!-- Header Row -->
                            <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <div>
                                    <div class="flex items-center gap-2 flex-wrap">
                                        <h3 class="text-lg font-bold text-white" style="font-family:'Georgia',serif;">
                                            {{ item.role }}
                                        </h3>
                                        <span v-if="item.badge" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                                            :style="item.badgeStyle || 'background:#8B5CF620;color:#C084FC;border:1px solid #8B5CF640;'">
                                            {{ item.badge }}
                                        </span>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs font-semibold text-purple-400 mt-1 flex-wrap">
                                        <span class="flex items-center gap-1">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M3 21h18"></path>
                                                <path d="M5 21V7l8-4v18"></path>
                                                <path d="M19 21V11l-6-4"></path>
                                            </svg>
                                            <span>{{ item.company }}</span>
                                        </span>
                                        <span>•</span>
                                        <span class="text-slate-400">{{ item.location }}</span>
                                    </div>
                                </div>

                                <span class="px-3.5 py-1.5 rounded-full text-xs font-semibold text-violet-300 border flex items-center gap-1.5 shrink-0"
                                    style="background:#8B5CF615;border-color:#8B5CF630;font-family:system-ui;">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{{ item.period }}</span>
                                </span>
                            </div>

                            <!-- Intro Summary -->
                            <p v-if="item.summary" class="text-sm leading-relaxed mb-4 text-purple-200/90" style="font-family:system-ui;">
                                {{ item.summary }}
                            </p>

                            <!-- Key Highlights / Bullets -->
                            <ul v-if="item.bullets && item.bullets.length" class="space-y-2 mb-5 pl-0 list-none">
                                <li v-for="(b, bIdx) in item.bullets" :key="bIdx" class="flex items-start gap-2.5 text-xs md:text-sm text-[#C9B9E8] leading-relaxed" style="font-family:system-ui;">
                                    <span class="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0"></span>
                                    <span>{{ b }}</span>
                                </li>
                            </ul>

                            <!-- Tech Stack / Skills Badges -->
                            <div v-if="item.skills && item.skills.length" class="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5">
                                <span v-for="skill in item.skills" :key="skill"
                                    class="text-[11px] px-2.5 py-1 rounded-lg border text-violet-300 font-medium"
                                    style="background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.2);font-family:system-ui;">
                                    {{ skill }}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── CTA BOTTOM SECTION ───────────────────────────────── -->
        <section class="py-20 px-6 md:px-16 text-center">
            <div class="max-w-3xl mx-auto rounded-3xl p-10 border relative overflow-hidden"
                style="background:linear-gradient(135deg,#120E1C,#1E1430);border-color:#3B2A5A;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
                <div class="relative z-10">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-4" style="font-family:'Georgia',serif;">
                        Have a project or opportunity?
                    </h2>
                    <p class="text-sm md:text-base mb-8 max-w-xl mx-auto" style="color:#C9B9E8;font-family:system-ui;">
                        Let's connect and discuss how we can build secure, high-performing software tailored to your requirements.
                    </p>
                    <RouterLink :to="{ path: '/contact', hash: '#contact-form' }"
                        class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 cursor-pointer shadow-lg"
                        style="background:#8B5CF6;box-shadow:0 0 25px #8B5CF650;font-family:system-ui;text-decoration:none;">
                        <span>Get In Touch</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import api from '@/api/axios'

const settings = ref({})
const statsSection = ref(null)

// Target numbers for counting animation
const targetStats = [3, 25, 100]
const animatedStats = ref([0, 0, 0])
let hasAnimated = false
let observer = null

function runCountingAnimation() {
    if (hasAnimated) return
    hasAnimated = true

    const duration = 1800 // 1.8 seconds
    const startTime = performance.now()

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease-out cubic formula for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3)

        animatedStats.value = targetStats.map(target => {
            return Math.floor(easeOut * target)
        })

        if (progress < 1) {
            requestAnimationFrame(updateCounter)
        } else {
            animatedStats.value = [...targetStats]
        }
    }

    requestAnimationFrame(updateCounter)
}

const timeline = [
    {
        role: 'Software Developer (PHP & Laravel)',
        company: 'Smart Software Ltd.',
        location: 'Dhaka, Bangladesh · On-site',
        period: 'Jul 2026 — Present · 3 mos',
        badge: 'Current Full-Time',
        badgeStyle: 'background:#052e16;color:#4ade80;border:1px solid #16a34a40;',
        summary: 'Delivering client web applications built on PHP/Laravel, including authentication systems, CMS, OTP/SMS integration, and admin dashboards.',
        bullets: [
            'Rebuilt a malfunctioning production blood donation platform (redlinkbd.org) — fixed authentication, security, CMS, OTP verification, SMS settings, and admin dashboard based on client-documented requirements.',
            'Delivered a complete hospital management web application for a client, including SEO, security hardening, and a CMS system.',
            'Working via feature branches on private repos, coordinating with a senior developer on merge/release flow.'
        ],
        skills: ['PHP', 'Laravel 11', 'Multi-tenant RBAC', 'MySQL', 'SMS Gateway & OTP', 'CMS Architecture', 'Security Hardening', 'Git Workflow']
    },
    {
        role: 'Backend AI Engineer - Intern / Laravel Developer',
        company: 'FlyRank AI',
        location: 'Dhaka, Bangladesh · Remote',
        period: 'Jul 2026 — Aug 2026 · 3 mos',
        badge: 'AI Systems Track',
        badgeStyle: 'background:#8B5CF620;color:#C084FC;border:1px solid #8B5CF640;',
        summary: 'Self-directed internship program (AI-Integrated Backend Engineering track) — building and optimizing scalable, AI-first backend systems and practical AI pipelines.',
        bullets: [
            'Built and tested Laravel REST API endpoints as part of the Backend AI Engineering track.',
            'Integrated the Google Gemini API to deliver AI-powered functionality within Laravel services.',
            'Containerized services with Docker for consistent local and deployment environments.',
            'Applied prompt engineering and AI-driven workflow design to extend backend capabilities.'
        ],
        skills: ['Google Gemini API', 'Artificial Intelligence (AI)', 'Docker', 'RESTful APIs', 'Server-Side Programming', 'Prompt Engineering']
    },
    {
        role: 'Full-Stack Web Engineer',
        company: 'Client Collaborations & Independent Projects',
        location: 'Remote / Dhaka',
        period: '2024 — 2026',
        badge: 'Freelance & Contract',
        badgeStyle: 'background:rgba(255,255,255,0.05);color:#E2E8F0;border:1px solid rgba(255,255,255,0.15);',
        summary: 'Architected and deployed custom web applications, SaaS platforms, and client dashboards with modern frontend frameworks and relational databases.',
        bullets: [
            'Engineered responsive SPAs using Vue.js 3, Pinia, and Tailwind CSS integrated with Laravel RESTful APIs.',
            'Integrated international and local payment gateways (Stripe, SSLCommerz, bKash) with webhook listener verification.',
            'Designed normalized database schemas, queries optimization, and caching with Redis.'
        ],
        skills: ['Vue.js 3', 'Tailwind CSS', 'Payment Gateways', 'PostgreSQL / MySQL', 'Redis', 'Inertia.js']
    }
]

onMounted(async () => {
    // 1. Scroll-triggered IntersectionObserver for Counter animation
    if (statsSection.value) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCountingAnimation()
                }
            })
        }, { threshold: 0.25 })

        observer.observe(statsSection.value)
    }

    // 2. Fetch CMS settings
    try {
        const { data } = await api.get('/settings')
        const list = data.data?.data ?? data.data ?? (Array.isArray(data) ? data : [])
        if (Array.isArray(list)) {
            settings.value = list.reduce((acc, s) => {
                if (s && s.key) acc[s.key] = s.value
                return acc
            }, {})
        } else if (typeof list === 'object' && list !== null) {
            settings.value = list
        }
    } catch (e) {
        console.warn('Could not load about settings:', e.message)
    }
})

onUnmounted(() => {
    if (observer && statsSection.value) {
        observer.unobserve(statsSection.value)
    }
})
</script>

<style scoped>
/* Smooth transitions */
</style>
