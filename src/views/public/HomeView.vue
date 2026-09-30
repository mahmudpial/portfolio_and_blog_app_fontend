<template>
    <div style="background:#0A0610;min-height:100vh;">

        <!-- ═══════════════════════════════════════════════════════
         ① HERO SECTION
    ════════════════════════════════════════════════════════ -->
        <section class="relative min-h-screen flex items-center overflow-hidden">

            <!-- Background effects -->
            <div class="absolute inset-0 pointer-events-none">
                <!-- Dot grid -->
                <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF618 1px,transparent 1px);
          background-size:32px 32px;opacity:0.6;"></div>
                <!-- Radial glow orb 1 — animated -->
                <div class="absolute orb-1" style="width:700px;height:700px;top:-200px;right:-100px;border-radius:50%;
          background:radial-gradient(circle,#6D28D925 0%,transparent 70%);filter:blur(40px);"></div>
                <!-- Radial glow orb 2 — animated slower -->
                <div class="absolute orb-2" style="width:500px;height:500px;bottom:-100px;left:-100px;border-radius:50%;
          background:radial-gradient(circle,#8B5CF618 0%,transparent 70%);filter:blur(60px);"></div>
                <!-- Thin horizontal lines -->
                <div class="absolute inset-0" style="background:linear-gradient(transparent 0%,transparent calc(50% - 1px),#8B5CF608 50%,transparent calc(50% + 1px),transparent 100%);
          background-size:100% 120px;"></div>
            </div>

            <div class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-28
                  grid md:grid-cols-2 gap-16 items-center">

                <!-- LEFT — Text content -->
                <div class="hero-left">

                    <!-- Available badge -->
                    <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 text-xs font-semibold badge-fade-in shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                        style="border-color:rgba(74,222,128,0.3);background:rgba(5,46,22,0.6);color:#4ade80;font-family:system-ui;backdrop-filter:blur(8px);">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        {{ settings['available_status'] || settings['home_badge_text'] || 'Available for hire' }}
                    </div>

                    <!-- Main heading — owner name from config -->
                    <div class="hero-title-block mb-6">
                        <h1 class="font-bold leading-none mb-1 hero-line-1" style="font-size:clamp(40px,5.5vw,72px);color:#fff;font-family:'Georgia',serif;
              letter-spacing:-1px;">
                            {{ settings['home_hero_greeting'] || "Hi, I'm" }}
                        </h1>
                        <h1 class="font-bold leading-none hero-line-2" style="font-size:clamp(40px,5.5vw,72px);font-family:'Georgia',serif;
              letter-spacing:-1px;color:#C084FC;text-shadow:0 0 40px #8B5CF650;">
                            {{ settings['home_hero_title'] || settings['full_name'] || ownerName }}
                        </h1>
                    </div>

                    <!-- Typewriter role rotator -->
                    <div class="flex items-center gap-3 mb-6 hero-role">
                        <div class="w-1 h-8 rounded-full flex-shrink-0"
                            style="background:#8B5CF6;box-shadow:0 0 10px #8B5CF6;"></div>
                        <div class="text-lg font-medium overflow-hidden"
                            style="color:#C9B9E8;font-family:system-ui;min-width:260px;">
                            <span class="typewriter-text">{{ currentRole }}</span>
                            <span class="typewriter-cursor" style="color:#8B5CF6;">|</span>
                        </div>
                    </div>

                    <!-- Bio -->
                    <p class="leading-relaxed mb-10 hero-bio"
                        style="color:#C9B9E8;max-width:520px;font-family:system-ui;font-size:16px;line-height:1.8;">
                        {{ settings['home_hero_bio'] || 'Software Developer (PHP Laravel) at Smart Software Ltd, Dhaka. I build secure, multi-tenant backend systems using Laravel, Vue.js 3, and Inertia.js — with a hands-on focus on RBAC, tenant isolation, and fail-closed access control design.' }}
                    </p>

                    <!-- CTA buttons -->
                    <div class="flex flex-wrap gap-4 mb-10 hero-btns">
                        <RouterLink :to="settings['home_btn1_link'] || '/portfolio'" class="flex items-center gap-2.5 px-7 py-3.5 text-white font-bold rounded-2xl
                     transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group/btn relative overflow-hidden text-decoration-none" style="background:linear-gradient(135deg,#8B5CF6 0%,#6D28D9 100%);box-shadow:0 0 28px rgba(139,92,246,0.45);
              font-family:system-ui;font-size:15px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5" class="transition-transform duration-300 group-hover/btn:scale-110">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <path d="M8 21h8M12 17v4" />
                            </svg>
                            <span>{{ settings['home_btn1_text'] || 'View My Work' }}</span>
                            <span class="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                        </RouterLink>
                        <RouterLink :to="settings['home_btn2_link'] || '/contact'" class="flex items-center gap-2.5 px-7 py-3.5 font-bold rounded-2xl border
                     transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-violet-600/20 hover:text-white hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] text-decoration-none" style="border-color:#3B2A5A;color:#C9B9E8;background:#140F24;
              font-family:system-ui;font-size:15px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>{{ settings['home_btn2_text'] || 'Get In Touch' }}</span>
                        </RouterLink>
                    </div>

                    <!-- Social icons -->
                    <div class="flex items-center gap-3.5 hero-socials">
                        <!-- GitHub -->
                        <a href="https://github.com/mahmudpial" target="_blank" class="social-btn social-github" aria-label="GitHub">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>

                        <!-- LinkedIn -->
                        <a href="https://www.linkedin.com/in/pial-mahmud/" target="_blank" class="social-btn social-linkedin"
                            aria-label="LinkedIn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>

                        <!-- Discord -->
                        <a href="https://discord.com/" target="_blank" class="social-btn social-discord" aria-label="Discord">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                        </a>

                        <!-- Upwork -->
                        <a href="https://www.upwork.com/freelancers/~01e5ccd10431c78406?mp_source=share" target="_blank"
                            class="social-btn social-upwork" aria-label="Upwork">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M13.5 3.5c-1.7 0-3.2 1.1-3.8 2.9l-1.3 4.2c-.4 1.2-.7 2.6-.7 3.7 0 2.3 1.9 4.2 4.2 4.2 2.4 0 4.3-1.9 4.3-4.3 0-2.3-1.9-4.2-4.3-4.2-.6 0-1.2.1-1.7.3l.7-2.1c.6-.2 1.2-.3 1.8-.3 1.7 0 3.1 1.3 3.1 3.1 0 1.7-1.3 3.1-3.1 3.1-.8 0-1.5-.3-2-.8l-.8 2.3c.7.7 1.6 1.2 2.6 1.2 2.5 0 4.5-2 4.5-4.5 0-2.5-2-4.5-4.5-4.5z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- RIGHT — Large Professional Tech Lead Profile Showcase -->
                <div class="flex justify-center md:justify-end items-center hero-card mt-8 md:mt-0">
                    <div class="relative w-[19rem] sm:w-[22rem] md:w-[23rem] lg:w-[26rem]">

                        <!-- Ambient Glow Rings Behind Photo -->
                        <div class="absolute -top-12 -left-12 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-40"
                            style="background:radial-gradient(circle, #8B5CF6 0%, transparent 70%);"></div>
                        <div class="absolute -bottom-10 -right-10 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-35"
                            style="background:radial-gradient(circle, #06B6D4 0%, transparent 70%);"></div>

                        <!-- Top Left Floating Role Badge -->
                        <div class="absolute -top-5 -left-4 z-30 flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold floating-badge-1"
                            style="background:rgba(20, 15, 36, 0.94);border-color:rgba(139, 92, 246, 0.45);color:#E2D9F3;font-family:system-ui;box-shadow:0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(139,92,246,0.3);backdrop-filter:blur(12px);">
                            <div class="w-2.5 h-2.5 rounded-full bg-violet-400" style="box-shadow:0 0 8px #8B5CF6;"></div>
                            <span class="text-violet-300 font-extrabold">&lt;/&gt;</span>
                            <span>PHP &amp; Laravel Developer</span>
                        </div>

                        <!-- Top Right Floating Open-To-Work Badge -->
                        <div class="absolute -top-4 -right-3 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-transform hover:scale-105"
                            style="background:rgba(5, 46, 22, 0.92);color:#4ade80;border-color:rgba(74,222,128,0.4);box-shadow:0 8px 25px rgba(0,0,0,0.5), 0 0 15px rgba(74,222,128,0.25);backdrop-filter:blur(10px);font-family:system-ui;">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span>Open to Work</span>
                        </div>

                        <!-- Main Portrait Showcase Frame -->
                        <div class="relative rounded-3xl border overflow-hidden group transition-all duration-500 hover:shadow-[0_0_90px_rgba(139,92,246,0.3)]"
                            style="background:#120E1C;border-color:#3B2A5A;box-shadow:0 25px 60px -15px rgba(0,0,0,0.8), 0 0 50px rgba(139,92,246,0.18);"
                            @mouseenter="isHeroPaused = true"
                            @mouseleave="isHeroPaused = false">
                            
                            <!-- Large Portrait Photo -->
                            <div class="relative w-full aspect-[4/5] overflow-hidden bg-[#0A0610] flex items-center justify-center select-none">
                                <!-- Dual Crossfade Images -->
                                <div v-for="(imgSrc, idx) in heroImages" :key="idx"
                                    class="absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center"
                                    :class="currentHeroImgIdx === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'">
                                    <img :src="imgSrc"
                                        :alt="`${ownerName} - Photo ${idx + 1}`"
                                        class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        loading="eager" />
                                </div>
                                
                                <!-- Bottom gradient fade for text clarity -->
                                <div class="absolute inset-0 pointer-events-none z-10"
                                    style="background:linear-gradient(to bottom, transparent 45%, rgba(10,6,16,0.5) 75%, rgba(18,14,28,0.98) 100%);"></div>

                                <!-- Subtle edge lighting / vignette -->
                                <div class="absolute inset-0 pointer-events-none z-10"
                                    style="box-shadow:inset 0 0 30px rgba(0,0,0,0.5);"></div>

                                <!-- Manual Switch Arrows (Visible on hover) -->
                                <button @click.stop="prevHeroImage" 
                                    class="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border flex items-center justify-center text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                                    style="background:rgba(18,14,28,0.85);border-color:rgba(139,92,246,0.4);backdrop-filter:blur(8px);"
                                    title="Previous photo">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <button @click.stop="nextHeroImage" 
                                    class="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border flex items-center justify-center text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                                    style="background:rgba(18,14,28,0.85);border-color:rgba(139,92,246,0.4);backdrop-filter:blur(8px);"
                                    title="Next photo">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>

                                <!-- Top-Right Dynamic Photo Indicators -->
                                <div class="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-full border"
                                    style="background:rgba(18,14,28,0.85);border-color:rgba(139,92,246,0.35);backdrop-filter:blur(10px);box-shadow:0 4px 15px rgba(0,0,0,0.5);">
                                    <button v-for="(_, idx) in heroImages" :key="'dot-' + idx"
                                        @click.stop="setHeroImage(idx)"
                                        class="transition-all duration-300 rounded-full flex items-center justify-center border-0 cursor-pointer p-0"
                                        :style="currentHeroImgIdx === idx 
                                            ? 'width:20px;height:7px;background:#8B5CF6;box-shadow:0 0 8px #8B5CF6;' 
                                            : 'width:7px;height:7px;background:rgba(255,255,255,0.3);'"
                                        :title="`Photo ${idx + 1}`">
                                    </button>
                                </div>

                                <!-- Floating Experience & Credentials Bar (Bottom) -->
                                <div class="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3.5 rounded-2xl border"
                                    style="background:rgba(18, 14, 28, 0.88);border-color:rgba(139, 92, 246, 0.3);backdrop-filter:blur(12px);box-shadow:0 8px 30px rgba(0,0,0,0.6);">
                                    <div>
                                        <div class="text-white font-bold text-base flex items-center gap-1.5" style="font-family:'Georgia',serif;">
                                            {{ ownerName }}
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="#8B5CF6" class="shrink-0">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                            </svg>
                                        </div>
                                        <div class="text-[11px] font-semibold text-violet-300" style="font-family:system-ui;">
                                            Software Developer · Smart Software Ltd
                                        </div>
                                    </div>
                                    <div class="text-right border-l pl-3.5" style="border-color:rgba(139,92,246,0.25);">
                                        <div class="text-xs font-bold text-white font-serif">3+ Years</div>
                                        <div class="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">25+ Projects</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating glow ring behind card -->
                        <div class="absolute inset-0 -z-10 rounded-3xl"
                            style="box-shadow:0 0 80px rgba(139,92,246,0.22);transform:scale(1.04);"></div>
                    </div>
                </div>
            </div>

            <!-- Scroll indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
                <span class="text-xs uppercase tracking-widest"
                    style="color:#475569;font-family:system-ui;">Scroll</span>
                <div class="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
                    style="border-color:#3B2A5A;">
                    <div class="w-1 h-2 rounded-full bg-violet-500 scroll-dot"></div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ② SERVICES SECTION
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #241730;">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-3"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">What I Do</p>
                    <h2 class="font-bold text-white"
                        style="font-size:clamp(28px,4vw,44px);font-family:'Georgia',serif;">
                        Services I Offer
                    </h2>
                </div>

                <!-- Loading skeleton -->
                <div v-if="servicesLoading" class="grid md:grid-cols-3 gap-5">
                    <div v-for="i in 3" :key="i" class="rounded-2xl animate-pulse"
                        style="background:#120E1C;height:200px;border:1px solid #3B2A5A;">
                    </div>
                </div>

                <!-- Services from API -->
                <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <RouterLink v-for="(svc, i) in services" :key="svc.id" :to="`/services/${svc.id}`"
                        class="service-card group rounded-3xl border p-7 transition-all duration-300
                        hover:-translate-y-2.5 flex flex-col justify-between relative overflow-hidden"
                        :style="`background:rgba(18, 14, 28, 0.95);border-color:#3B2A5A;animation-delay:${i * 80}ms;box-shadow:0 10px 30px -10px rgba(0,0,0,0.5);`"
                        :onmouseover="`this.style.borderColor='${getServiceAccent(i).color}80';this.style.boxShadow='0 20px 40px -10px ${getServiceAccent(i).glow}'`"
                        :onmouseout="`this.style.borderColor='#3B2A5A';this.style.boxShadow='0 10px 30px -10px rgba(0,0,0,0.5)'`">
                        
                        <!-- Top ambient hover highlight with dynamic color -->
                        <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            :style="`background:radial-gradient(circle,${getServiceAccent(i).color}30 0%,transparent 70%);filter:blur(30px);`"></div>

                        <div>
                            <!-- Top row: Icon tile & Arrow -->
                            <div class="flex items-center justify-between mb-5">
                                <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                                    :style="`background:${getServiceAccent(i).bg};border:1px solid ${getServiceAccent(i).border};color:${getServiceAccent(i).color};box-shadow:0 0 20px ${getServiceAccent(i).glow};`">
                                    <ServiceIcon :name="svc.icon || 'code'" :size="24" />
                                </div>
                                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                                    :style="`background:${getServiceAccent(i).bg};color:${getServiceAccent(i).color};border:1px solid ${getServiceAccent(i).border};`">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <!-- Title -->
                            <h3 class="font-bold text-white text-xl mb-3 group-hover:text-purple-200 transition-colors" style="font-family:'Georgia',serif;">
                                {{ svc.title || svc.name }}
                            </h3>

                            <!-- Description -->
                            <p class="text-sm leading-relaxed mb-6 line-clamp-3" style="color:#C9B9E8;font-family:system-ui;line-height:1.7;">
                                {{ svc.description }}
                            </p>
                        </div>

                        <!-- Card Footer Action -->
                        <div class="pt-5 border-t flex items-center justify-between text-xs font-semibold" style="border-color:rgba(139, 92, 246, 0.15);">
                            <span class="transition-colors flex items-center gap-1.5" :style="`color:${getServiceAccent(i).color};font-family:system-ui;`">
                                Explore Details &amp; Workflow
                            </span>
                            <span class="text-white/40 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 flex items-center gap-1">
                                View <span>→</span>
                            </span>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ③ CORE TECHNOLOGIES
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #241730;">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-start justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-widest mb-2"
                            style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">Tech Stack</p>
                        <h2 class="font-bold text-white text-3xl" style="font-family:'Georgia',serif;">
                            Core Technologies
                        </h2>
                    </div>
                    <RouterLink to="/skills"
                        class="flex items-center gap-1.5 text-sm font-medium transition-colors self-end pb-1"
                        style="color:#C9B9E8;font-family:system-ui;" onmouseover="this.style.color='#C084FC'"
                        onmouseout="this.style.color='#C9B9E8'">
                        View all skills
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </RouterLink>
                </div>

                <!-- Dynamic from API -->
                <div v-if="!skillsLoading && skills.length > 0" class="flex flex-wrap gap-3">
                    <div v-for="skill in skills.slice(0, 12)" :key="skill.id" class="skill-chip flex items-center gap-3 px-4 py-3 rounded-xl border
                   transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-default group/skill"
                        style="background:#120E1C;border-color:#3B2A5A;">
                        <!-- Tech brand icon -->
                        <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/skill:scale-110"
                            style="background:rgba(139, 92, 246, 0.1);border:1px solid rgba(139, 92, 246, 0.25);">
                            <TechIcon :name="skill.name" :size="20" />
                        </div>
                        <span class="text-sm font-medium text-white group-hover/skill:text-purple-200 transition-colors" style="font-family:system-ui;">{{ skill.name }}</span>
                        <span class="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style="background:#8B5CF615;color:#C084FC;font-family:system-ui;">
                            {{ skill.percentage }}%
                        </span>
                    </div>
                </div>

                <!-- Fallback static tags -->
                <div v-else-if="skillsLoading" class="flex flex-wrap gap-3">
                    <div v-for="i in 8" :key="i" class="h-14 w-36 rounded-xl animate-pulse" style="background:#120E1C;">
                    </div>
                </div>
                <div v-else class="flex flex-wrap gap-3">
                    <div v-for="tag in fallbackTags" :key="tag"
                        class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all hover:scale-105 group/tag cursor-default"
                        style="background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                        <TechIcon :name="tag" :size="18" />
                        <span class="group-hover/tag:text-white transition-colors">{{ tag }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ④ FEATURED PROJECTS
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #241730;">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-start justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-widest mb-2"
                            style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">Recent Work</p>
                        <h2 class="font-bold text-white text-3xl" style="font-family:'Georgia',serif;">
                            Featured Projects
                        </h2>
                    </div>
                    <RouterLink to="/portfolio"
                        class="flex items-center gap-1.5 text-sm font-medium transition-colors self-end pb-1"
                        style="color:#C9B9E8;font-family:system-ui;" onmouseover="this.style.color='#C084FC'"
                        onmouseout="this.style.color='#C9B9E8'">
                        View all projects
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </RouterLink>
                </div>

                <!-- Loading skeleton -->
                <div v-if="projectsLoading" class="grid md:grid-cols-3 gap-6">
                    <div v-for="i in 3" :key="i" class="rounded-2xl overflow-hidden animate-pulse"
                        style="background:#120E1C;height:360px;"></div>
                </div>

                <!-- Projects from API -->
                <div v-else-if="projects.length > 0" class="grid md:grid-cols-3 gap-6">
                    <div v-for="(p, i) in projects" :key="p.id" class="project-card rounded-2xl border overflow-hidden transition-all duration-300
                   hover:-translate-y-2.5 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] group flex flex-col justify-between"
                        :style="`background:#120E1C;border-color:#3B2A5A;animation-delay:${i * 100}ms`"
                        onmouseover="this.style.borderColor='#8B5CF6'"
                        onmouseout="this.style.borderColor='#3B2A5A'">

                        <!-- Image / preview -->
                        <div class="h-48 relative overflow-hidden flex items-center justify-center"
                            style="background:linear-gradient(135deg,#180F28 0%,#241338 100%);">
                            <img :src="getProjectImage(p, i)" :alt="p.title"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div class="absolute inset-0 pointer-events-none"
                                style="background:linear-gradient(to top, rgba(18,14,28,0.4) 0%, transparent 60%);"></div>

                            <!-- Featured badge -->
                            <div v-if="p.is_featured"
                                class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md"
                                style="background:rgba(245, 158, 11, 0.15);color:#F59E0B;border:1px solid rgba(245, 158, 11, 0.4);font-family:system-ui;">
                                <span class="text-amber-400">★</span> Featured
                            </div>

                            <!-- Overlay on hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                                style="background:#0A0610dd;backdrop-filter:blur(2px);">
                                <a v-if="p.project_url" :href="p.project_url" target="_blank"
                                    class="px-4 py-2 text-white text-xs font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-lg"
                                    style="background:linear-gradient(135deg,#10B981,#059669);font-family:system-ui;box-shadow:0 0 20px rgba(16,185,129,0.45);">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="2" y1="12" x2="22" y2="12" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                    Live Demo
                                </a>
                                <a v-if="p.github_url" :href="p.github_url" target="_blank"
                                    class="px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 hover:bg-violet-600/20 hover:text-white hover:border-violet-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                                    style="border-color:#3B2A5A;background:#140F24;color:#C9B9E8;font-family:system-ui;">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    GitHub
                                </a>
                            </div>
                        </div>

                        <!-- Project info -->
                        <div class="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <span v-if="p.category"
                                        class="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                        style="background:#8B5CF615;color:#C084FC;font-family:system-ui;">
                                        {{ p.category }}
                                    </span>
                                </div>
                                <h3 class="font-bold text-white mb-2 group-hover:text-purple-200 transition-colors" style="font-family:'Georgia',serif;font-size:17px;">
                                    {{ p.title }}
                                </h3>
                                <p class="text-sm leading-relaxed mb-5 line-clamp-3" style="color:#C9B9E8;font-family:system-ui;">
                                    {{ p.description }}
                                </p>
                            </div>
                            <div class="flex gap-2 pt-2">
                                <a v-if="p.project_url" :href="p.project_url" target="_blank" class="flex-1 text-center py-2.5 text-white text-xs font-bold rounded-xl
                         transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-1.5 shadow-md" style="background:linear-gradient(135deg,#10B981,#059669);font-family:system-ui;
                  box-shadow:0 0 16px rgba(16,185,129,0.35);">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="2" y1="12" x2="22" y2="12" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                    Live Demo
                                </a>
                                <a v-if="p.github_url" :href="p.github_url" target="_blank" class="flex-1 text-center py-2.5 text-xs font-bold rounded-xl border
                         transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-1.5 hover:bg-violet-600/20 hover:text-white hover:border-violet-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                                    style="border-color:#3B2A5A;background:#140F24;color:#C9B9E8;font-family:system-ui;">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    GitHub
                                </a>
                                <RouterLink v-if="!p.project_url && !p.github_url" to="/portfolio" class="flex-1 text-center py-2.5 text-xs font-bold rounded-xl border
                         transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:bg-violet-600/20 hover:text-white hover:border-violet-400" style="border-color:#3B2A5A;background:#140F24;color:#C9B9E8;font-family:system-ui;">
                                    View Details
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Graceful empty state -->
                <div v-else class="text-center py-16 rounded-2xl border"
                    style="background:#120E1C;border-color:#3B2A5A;">
                    <svg class="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B2A5A"
                        stroke-width="1">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                    </svg>
                    <p class="text-sm font-medium mb-1 text-white" style="font-family:system-ui;">No projects yet</p>
                    <p class="text-xs" style="color:#475569;font-family:system-ui;">
                        Add projects from the admin panel to display them here.
                    </p>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ⑤ PRICING & PACKAGES SECTION
        ════════════════════════════════════════════════════════ -->
        <PricingSection />

        <!-- ═══════════════════════════════════════════════════════
         ⑥ TESTIMONIALS
        ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16 relative overflow-hidden" style="border-top:1px solid #241730;">
            <!-- Section glow -->
            <div class="absolute bottom-0 right-0 pointer-events-none" style="width:600px;height:400px;
        background:radial-gradient(circle at 80% 90%,#6D28D915,transparent 60%);"></div>

            <div class="max-w-7xl mx-auto relative z-10">
                <div class="text-center mb-16">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-3"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">Kind Words</p>
                    <h2 class="font-bold text-white"
                        style="font-size:clamp(28px,4vw,44px);font-family:'Georgia',serif;">
                        Client Feedback
                    </h2>
                </div>

                <div class="grid md:grid-cols-3 gap-5">
                    <div v-for="(t, i) in testimonials" :key="t.name"
                        class="testimonial-card rounded-2xl border p-7 transition-all hover:-translate-y-1"
                        :style="`background:#120E1C;border-color:#3B2A5A;animation-delay:${i * 100}ms`">
                        <!-- Stars -->
                        <div class="flex gap-1 mb-5">
                            <span v-for="s in t.stars" :key="s" style="color:#F59E0B;font-size:18px;">★</span>
                            <span v-for="s in (5 - t.stars)" :key="'e' + s"
                                style="color:#3B2A5A;font-size:18px;">★</span>
                        </div>
                        <!-- Quote -->
                        <p class="text-sm leading-relaxed mb-6 italic"
                            style="color:#C9B9E8;font-family:system-ui;line-height:1.8;">
                            "{{ t.quote }}"
                        </p>
                        <!-- Author -->
                        <div class="flex items-center gap-3 pt-5 border-t" style="border-color:#241730;">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center
                          font-bold text-white text-sm flex-shrink-0"
                                style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                {{ t.name[0] }}
                            </div>
                            <div>
                                <div class="font-semibold text-white text-sm" style="font-family:'Georgia',serif;">
                                    {{ t.name }}
                                </div>
                                <div class="text-xs" style="color:#C9B9E8;font-family:system-ui;">{{ t.role }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ⑥ FINAL CTA
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #241730;">
            <div class="max-w-7xl mx-auto flex justify-center">
                <div class="w-full max-w-3xl rounded-3xl border p-14 md:p-16 text-center relative overflow-hidden"
                    style="background:#120E1C;border-color:#3B2A5A;
          box-shadow:0 0 80px #8B5CF610,0 40px 80px #00000040;">

                    <!-- Glowing radial backdrop -->
                    <div class="absolute inset-0 pointer-events-none">
                        <div class="absolute inset-0"
                            style="background:radial-gradient(ellipse 700px 400px at 50% 50%,#8B5CF60a,transparent 70%);">
                        </div>
                        <!-- Corner glow accents -->
                        <div class="absolute top-0 left-0 w-32 h-32 rounded-full"
                            style="background:radial-gradient(circle,#8B5CF615,transparent 70%);transform:translate(-50%,-50%);">
                        </div>
                        <div class="absolute bottom-0 right-0 w-32 h-32 rounded-full"
                            style="background:radial-gradient(circle,#8B5CF615,transparent 70%);transform:translate(50%,50%);">
                        </div>
                        <!-- Subtle grid -->
                        <div class="absolute inset-0 opacity-30" style="background-image:radial-gradient(circle,#8B5CF610 1px,transparent 1px);
              background-size:28px 28px;"></div>
                    </div>

                    <div class="relative z-10">
                        <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                            style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">
                            Ready to Build?
                        </p>
                        <h2 class="font-bold leading-tight mb-5" style="font-size:clamp(26px,4vw,44px);font-family:'Georgia',serif;
              color:#C084FC;text-shadow:0 0 30px #8B5CF640;">
                            {{ settings['home_cta_title'] || "Let's Create Something Remarkable" }}
                        </h2>
                        <p class="text-sm leading-relaxed mb-10 mx-auto"
                            style="color:#C9B9E8;max-width:480px;font-family:system-ui;line-height:1.8;">
                            {{ settings['home_cta_desc'] || "Whether it's a new product, a redesign, or a complex backend — I'm ready to help turn your vision into reality." }}
                        </p>
                        <div class="flex flex-wrap gap-4 justify-center">
                            <RouterLink :to="settings['home_cta_btn_link'] || '/contact'"
                                class="px-8 py-3.5 text-white font-semibold rounded-2xl transition-all hover:scale-105 text-decoration-none"
                                style="background:#8B5CF6;box-shadow:0 0 28px #8B5CF640;
                font-family:system-ui;font-size:15px;">
                                {{ settings['home_cta_btn_text'] || 'Start a Project' }}
                            </RouterLink>
                            <RouterLink to="/portfolio" class="px-8 py-3.5 font-semibold rounded-2xl border transition-all hover:scale-105
                       hover:border-violet-500 text-decoration-none"
                                style="border-color:#334155;color:#C9B9E8;font-family:system-ui;font-size:15px;">
                                See My Work
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
/* ── Keyframes ─────────────────────────────────────────── */
@keyframes greenPulse {

    0%,
    100% {
        box-shadow: 0 0 6px #4ade80;
    }

    50% {
        box-shadow: 0 0 16px #4ade80, 0 0 32px #4ade8060;
    }
}

@keyframes dotPulse {

    0%,
    100% {
        box-shadow: 0 0 6px #8B5CF6;
        opacity: 1;
    }

    50% {
        box-shadow: 0 0 14px #8B5CF6, 0 0 28px #8B5CF660;
        opacity: .7;
    }
}

@keyframes orbFloat1 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    33% {
        transform: translate(30px, -20px) scale(1.05);
    }

    66% {
        transform: translate(-20px, 15px) scale(.97);
    }
}

@keyframes orbFloat2 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    50% {
        transform: translate(-25px, 20px) scale(1.08);
    }
}

@keyframes scrollBounce {

    0%,
    100% {
        transform: translateY(0);
        opacity: 1;
    }

    50% {
        transform: translateY(10px);
        opacity: .4;
    }
}

@keyframes fadeSlideUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes floatBadge1 {

    0%,
    100% {
        transform: translateY(0) rotate(-1deg);
    }

    50% {
        transform: translateY(-6px) rotate(0deg);
    }
}

@keyframes typewriterBlink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

/* ── Applied animations ────────────────────────────────── */
.orb-1 {
    animation: orbFloat1 12s ease-in-out infinite;
}

.orb-2 {
    animation: orbFloat2 16s ease-in-out infinite;
}

.scroll-dot {
    animation: scrollBounce 1.8s ease-in-out infinite;
}

.scroll-indicator {
    animation: fadeSlideUp .8s ease both;
    animation-delay: 1.4s;
    opacity: 0;
}

.floating-badge-1 {
    animation: floatBadge1 4s ease-in-out infinite;
}

.typewriter-cursor {
    animation: typewriterBlink .7s ease-in-out infinite;
}

/* Staggered hero reveal */
.badge-fade-in {
    animation: fadeSlideUp .7s ease both;
    animation-delay: .1s;
    opacity: 0;
}

.hero-title-block {
    animation: fadeSlideUp .7s ease both;
    animation-delay: .25s;
    opacity: 0;
}

.hero-role {
    animation: fadeSlideUp .7s ease both;
    animation-delay: .4s;
    opacity: 0;
}

.hero-bio {
    animation: fadeSlideUp .7s ease both;
    animation-delay: .55s;
    opacity: 0;
}

.hero-btns {
    animation: fadeSlideUp .7s ease both;
    animation-delay: .7s;
    opacity: 0;
}

.hero-socials {
    animation: fadeSlideUp .7s ease both;
    animation-delay: .85s;
    opacity: 0;
}

.hero-card {
    animation: fadeSlideUp .8s ease both;
    animation-delay: .4s;
    opacity: 0;
}

/* Card / service hover glow */
.service-card:hover {
    border-color: #8B5CF640 !important;
    box-shadow: 0 0 30px #8B5CF610;
}

.project-card:hover {
    border-color: #8B5CF650 !important;
    box-shadow: 0 0 30px #8B5CF615;
}

.testimonial-card:hover {
    border-color: #8B5CF640 !important;
}

.skill-chip {
    position: relative;
    overflow: hidden;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
}

.skill-chip:hover {
    transform: translateY(-4px) scale(1.03);
    border-color: rgba(168, 85, 247, 0.8) !important;
    background: linear-gradient(145deg, #1C1330 0%, #120E1C 100%) !important;
    box-shadow: 0 12px 30px -5px rgba(139, 92, 246, 0.4), 0 0 20px -3px rgba(168, 85, 247, 0.3) !important;
}

.skill-chip::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
    transform: skewX(-20deg);
    transition: left 0.65s ease;
    pointer-events: none;
}

.skill-chip:hover::before {
    left: 140%;
}

/* Social buttons */
.social-btn {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    border: 1px solid #3B2A5A;
    background: #140F24;
    color: #C9B9E8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .25s ease;
}

.social-btn:hover {
    transform: scale(1.12) translateY(-2px);
}

.social-github:hover {
    border-color: #A855F7;
    background: rgba(168, 85, 247, 0.15);
    color: #FFFFFF;
    box-shadow: 0 0 16px rgba(168, 85, 247, 0.4);
}

.social-linkedin:hover {
    border-color: #38BDF8;
    background: rgba(56, 189, 248, 0.15);
    color: #38BDF8;
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
}

.social-discord:hover {
    border-color: #5865F2;
    background: rgba(88, 101, 242, 0.15);
    color: #818CF8;
    box-shadow: 0 0 16px rgba(88, 101, 242, 0.4);
}

.social-upwork:hover {
    border-color: #10B981;
    background: rgba(16, 185, 129, 0.15);
    color: #34D399;
    box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'
import ServiceIcon from '@/components/ServiceIcon.vue'
import TechIcon from '@/components/TechIcon.vue'
import ProjectIcon from '@/components/ProjectIcon.vue'
import PricingSection from '@/components/PricingSection.vue'
import { getProjectImage } from '@/utils/projectImage'

const auth = useAuthStore()

// ── Owner config & CMS Settings ───────────────────────────
const settings = ref({})
const ownerName = computed(() => settings.value['home_hero_title'] || settings.value['full_name'] || 'Pial Mahmud')
const ownerInitials = computed(() =>
    ownerName.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
)

// ── Hero Dual Image Carousel & Crossfade Rotator ─────────
const currentHeroImgIdx = ref(0)
const isHeroPaused = ref(false)
let heroImageTimer = null

const heroImages = computed(() => {
    const img1 = settings.value['home_hero_image_1'] || settings.value['avatar_url'] || settings.value['about_image'] || auth.user?.profile_image?.trim?.() || '/images/pial-mahmud-about.jpg'
    const img2 = settings.value['home_hero_image_2'] || '/images/pial-mahmud.jpg'
    return [img1, img2]
})

function nextHeroImage() {
    currentHeroImgIdx.value = (currentHeroImgIdx.value + 1) % heroImages.value.length
}

function prevHeroImage() {
    currentHeroImgIdx.value = (currentHeroImgIdx.value - 1 + heroImages.value.length) % heroImages.value.length
}

function setHeroImage(idx) {
    currentHeroImgIdx.value = idx
}

function startHeroImageRotator() {
    if (heroImageTimer) clearInterval(heroImageTimer)
    // Default interval: 7 seconds (or configured in CMS settings, clamped between 3s and 120s)
    const intervalSec = Math.max(3, Number(settings.value['home_hero_interval_sec']) || 7)
    heroImageTimer = setInterval(() => {
        if (!isHeroPaused.value) {
            nextHeroImage()
        }
    }, intervalSec * 1000)
}

// ── Typewriter role rotator ──────────────────────────────
const defaultRoles = [
    'Software Developer (PHP & Laravel)',
    'Laravel Backend & REST APIs',
    'Vue.js 3 & Multi-tenant RBAC',
    'AI-Integrated Backend Systems',
]
const roles = computed(() => {
    if (settings.value['home_hero_roles']) {
        const list = settings.value['home_hero_roles'].split(',').map(s => s.trim()).filter(Boolean)
        if (list.length > 0) return list
    }
    return defaultRoles
})

const currentRole = ref('')
const currentRoleIdx = ref(0)
const isDeleting = ref(false)
let typeTimer = null

function typewrite() {
    const list = roles.value
    if (!list || list.length === 0) return
    const target = list[currentRoleIdx.value % list.length]
    if (!isDeleting.value) {
        currentRole.value = target.slice(0, currentRole.value.length + 1)
        if (currentRole.value === target) {
            typeTimer = setTimeout(() => { isDeleting.value = true; typewrite() }, 2200)
            return
        }
    } else {
        currentRole.value = currentRole.value.slice(0, -1)
        if (currentRole.value === '') {
            isDeleting.value = false
            currentRoleIdx.value = (currentRoleIdx.value + 1) % list.length
        }
    }
    typeTimer = setTimeout(typewrite, isDeleting.value ? 55 : 90)
}

// ── Data ─────────────────────────────────────────────────
const skills = ref([])
const projects = ref([])
const skillsLoading = ref(true)
const projectsLoading = ref(true)

const profileStats = computed(() => [
    { value: settings.value['home_stat1_value'] || '3+', label: settings.value['home_stat1_label'] || 'Years Exp.' },
    { value: settings.value['home_stat2_value'] || '25+', label: settings.value['home_stat2_label'] || 'Projects' },
    { value: settings.value['home_stat3_value'] || '100%', label: settings.value['home_stat3_label'] || 'Quality' },
])

// ── Fallback static skill tags ───────────────────────────
const fallbackTags = [
    'Laravel', 'Vue.js 3', 'MySQL', 'REST API',
    'Tailwind CSS', 'PHP 8', 'Git', 'Docker',
    'JavaScript', 'Eloquent ORM', 'JWT Auth', 'Vite',
]

// ── Services ─────────────────────────────────────────────
const services = ref([])
const servicesLoading = ref(true)

const serviceAccents = [
    { color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.3)', glow: 'rgba(139, 92, 246, 0.3)' }, // Violet
    { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)', glow: 'rgba(6, 182, 212, 0.3)' }, // Cyan
    { color: '#A855F7', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)', glow: 'rgba(168, 85, 247, 0.3)' }, // Purple
    { color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)', glow: 'rgba(16, 185, 129, 0.3)' }, // Emerald
    { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', glow: 'rgba(245, 158, 11, 0.3)' }, // Amber
    { color: '#EC4899', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)', glow: 'rgba(236, 72, 153, 0.3)' }, // Pink
]

function getServiceAccent(index) {
    return serviceAccents[index % serviceAccents.length]
}

// ── Testimonials ─────────────────────────────────────────
const defaultTestimonials = [
    {
        stars: 5,
        quote: 'Delivered the project ahead of schedule with exceptional attention to detail. The codebase is clean and easy to maintain.',
        name: 'Sarah M.',
        role: 'Startup Founder',
    },
    {
        stars: 5,
        quote: 'Outstanding UI work. Every interaction feels polished. Highly recommend for anyone needing a skilled full-stack developer.',
        name: 'James K.',
        role: 'Product Manager',
    },
    {
        stars: 5,
        quote: 'Reliable, communicative, and technically strong. Our go-to developer for complex Laravel projects.',
        name: 'Lena R.',
        role: 'Agency Director',
    },
]

const testimonials = computed(() => {
    if (settings.value['testimonials_json']) {
        try {
            const parsed = JSON.parse(settings.value['testimonials_json'])
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
        } catch {}
    }
    return defaultTestimonials
})

// ── Lifecycle ────────────────────────────────────────────
onMounted(async () => {
    typeTimer = setTimeout(typewrite, 600)
    startHeroImageRotator()

    try {
        if (auth.isLoggedIn && auth.isAdmin && !auth.user?.profile_image) {
            await auth.fetchProfile()
        }

        const [skillsRes, projectsRes, servicesRes, settingsRes] = await Promise.allSettled([
            api.get('/skills'),
            api.get('/projects?featured=1'),
            api.get('/services'),
            api.get('/settings'),
        ])

        if (skillsRes.status === 'fulfilled') skills.value = skillsRes.value.data.data || []
        if (projectsRes.status === 'fulfilled') projects.value = projectsRes.value.data.data?.slice(0, 3) || []
        if (servicesRes.status === 'fulfilled') services.value = servicesRes.value.data.data || []
        if (settingsRes.status === 'fulfilled' && settingsRes.value?.data) {
            const data = settingsRes.value.data
            const list = data.data?.data ?? data.data ?? (Array.isArray(data) ? data : [])
            if (Array.isArray(list)) {
                settings.value = list.reduce((acc, s) => {
                    if (s && s.key) acc[s.key] = s.value
                    return acc
                }, {})
            } else if (typeof list === 'object' && list !== null) {
                settings.value = list
            }
            // Restart rotator if custom interval was received from backend
            startHeroImageRotator()
        }
    } catch (e) {
        console.warn('Could not fetch portfolio data:', e.message)
    } finally {
        skillsLoading.value = false
        projectsLoading.value = false
        servicesLoading.value = false
    }
})

onUnmounted(() => {
    clearTimeout(typeTimer)
    if (heroImageTimer) clearInterval(heroImageTimer)
})
</script>
