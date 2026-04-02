<template>
    <div style="background:#05080F;min-height:100vh;">

        <!-- ═══════════════════════════════════════════════════════
         ① HERO SECTION
    ════════════════════════════════════════════════════════ -->
        <section class="relative min-h-screen flex items-center overflow-hidden">

            <!-- Background effects -->
            <div class="absolute inset-0 pointer-events-none">
                <!-- Dot grid -->
                <div class="absolute inset-0" style="background-image:radial-gradient(circle,#3B82F618 1px,transparent 1px);
          background-size:32px 32px;opacity:0.6;"></div>
                <!-- Radial glow orb 1 — animated -->
                <div class="absolute orb-1" style="width:700px;height:700px;top:-200px;right:-100px;border-radius:50%;
          background:radial-gradient(circle,#1e40af25 0%,transparent 70%);filter:blur(40px);"></div>
                <!-- Radial glow orb 2 — animated slower -->
                <div class="absolute orb-2" style="width:500px;height:500px;bottom:-100px;left:-100px;border-radius:50%;
          background:radial-gradient(circle,#3B82F618 0%,transparent 70%);filter:blur(60px);"></div>
                <!-- Thin horizontal lines -->
                <div class="absolute inset-0" style="background:linear-gradient(transparent 0%,transparent calc(50% - 1px),#3B82F608 50%,transparent calc(50% + 1px),transparent 100%);
          background-size:100% 120px;"></div>
            </div>

            <div class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-28
                  grid md:grid-cols-2 gap-16 items-center">

                <!-- LEFT — Text content -->
                <div class="hero-left">

                    <!-- Available badge -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium badge-fade-in"
                        style="border-color:#1e3a5f;background:#0D1220;color:#4ade80;font-family:system-ui;">
                        <span class="w-2 h-2 rounded-full bg-green-400"
                            style="animation:greenPulse 2s infinite;"></span>
                        Available for hire
                    </div>

                    <!-- Main heading — owner name from config -->
                    <div class="hero-title-block mb-6">
                        <h1 class="font-bold leading-none mb-1 hero-line-1" style="font-size:clamp(40px,5.5vw,72px);color:#fff;font-family:'Georgia',serif;
              letter-spacing:-1px;">
                            Hi, I'm
                        </h1>
                        <h1 class="font-bold leading-none hero-line-2" style="font-size:clamp(40px,5.5vw,72px);font-family:'Georgia',serif;
              letter-spacing:-1px;color:#60A5FA;text-shadow:0 0 40px #3B82F650;">
                            {{ ownerName }}
                        </h1>
                    </div>

                    <!-- Typewriter role rotator -->
                    <div class="flex items-center gap-3 mb-6 hero-role">
                        <div class="w-1 h-8 rounded-full flex-shrink-0"
                            style="background:#3B82F6;box-shadow:0 0 10px #3B82F6;"></div>
                        <div class="text-lg font-medium overflow-hidden"
                            style="color:#A8C4E8;font-family:system-ui;min-width:260px;">
                            <span class="typewriter-text">{{ currentRole }}</span>
                            <span class="typewriter-cursor" style="color:#3B82F6;">|</span>
                        </div>
                    </div>

                    <!-- Bio -->
                    <p class="leading-relaxed mb-10 hero-bio"
                        style="color:#A8C4E8;max-width:480px;font-family:system-ui;font-size:16px;line-height:1.8;">
                        I build fast, accessible, and beautiful web applications — from
                        pixel-perfect frontends to robust backend systems. Passionate
                        about clean code and great user experiences.
                    </p>

                    <!-- CTA buttons -->
                    <div class="flex flex-wrap gap-4 mb-10 hero-btns">
                        <RouterLink to="/portfolio" class="flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-2xl
                     transition-all hover:scale-105 hover:shadow-2xl" style="background:#3B82F6;box-shadow:0 0 28px #3B82F640;
              font-family:system-ui;font-size:15px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <path d="M8 21h8M12 17v4" />
                            </svg>
                            View My Work
                        </RouterLink>
                        <RouterLink to="/contact" class="flex items-center gap-2 px-7 py-3.5 font-semibold rounded-2xl border
                     transition-all hover:scale-105 hover:border-blue-500" style="border-color:#1e3a5f;color:#A8C4E8;background:#0D1220;
              font-family:system-ui;font-size:15px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Get In Touch
                        </RouterLink>
                    </div>

                    <!-- Social icons -->
                    <div class="flex items-center gap-4 hero-socials">
                        <span class="text-xs uppercase tracking-widest" style="color:#475569;font-family:system-ui;">
                            Find me on
                        </span>
                        <!-- GitHub -->
                        <a href="https://github.com/mahmudpial" target="_blank" class="social-btn" aria-label="GitHub">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>

                        <!-- LinkedIn -->
                        <a href="https://www.linkedin.com/in/pial-mahmud/" target="_blank" class="social-btn"
                            aria-label="LinkedIn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>

                        <!-- Fiverr -->
                        <a href="https://www.fiverr.com/s/akD7e5g" target="_blank" class="social-btn"
                            aria-label="Fiverr">
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                                <path
                                    d="M7 32V14h3.5v-1.5C10.5 9 12.5 7 16 7h3v5h-2.5c-1 0-1.5.5-1.5 1.5V14H18.5v5H15V32H7z" />
                                <circle cx="22.5" cy="8.5" r="3" />
                                <rect x="20" y="14" width="5" height="18" rx="1" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- RIGHT — Profile card -->
                <div class="hidden md:flex justify-end items-center hero-card">
                    <div class="relative w-[22rem] lg:w-[24rem]">

                        <!-- Floating "Clean Code" badge -->
                        <div class="absolute -top-5 left-2 z-20 flex items-center gap-2 px-4 py-2
                        rounded-xl border text-sm font-medium floating-badge-1" style="background:#0D1220;border-color:#1e3a5f;color:#A8C4E8;
              font-family:system-ui;box-shadow:0 8px 32px #00000060;">
                            <span style="color:#60A5FA;font-weight:600;">&lt;/&gt;</span> Clean Code
                        </div>

                        <!-- Card -->
                        <div class="rounded-3xl border overflow-hidden" style="background:#0D1220;border-color:#1e3a5f;
              box-shadow:0 0 80px #3B82F618,0 40px 80px #00000060;">

                            <!-- Card header with avatar -->
                            <div class="relative flex flex-col items-center pt-14 pb-10 px-8"
                                style="background:linear-gradient(180deg,#0a1628 0%,#0D1220 100%);">
                                <!-- Corner dots -->
                                <div class="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500"
                                    style="box-shadow:0 0 8px #3B82F6;animation:dotPulse 3s infinite;"></div>
                                <div class="absolute bottom-6 left-4 w-1.5 h-1.5 rounded-full"
                                    style="background:#1e3a5f;"></div>

                                <!-- Avatar circle with ring -->
                                <div class="relative mb-0">
                                    <div class="w-28 h-28 rounded-full flex items-center justify-center
                              text-3xl font-bold text-white" style="background:linear-gradient(135deg,#1e3a5f 0%,#2563EB 100%);
                    box-shadow:0 0 0 4px #0D1220,0 0 0 7px #1e3a5f,0 0 40px #3B82F630;overflow:hidden;">
                                        <img v-if="homeAvatarUrl && !homeAvatarLoadFailed" :src="homeAvatarUrl" alt="Admin avatar"
                                            class="w-full h-full object-cover" @error="homeAvatarLoadFailed = true" />
                                        <span v-else>{{ ownerInitials }}</span>
                                    </div>
                                    <!-- Online indicator -->
                                    <div class="absolute bottom-1 right-1 w-5 h-5 rounded-full border-[3px] bg-green-400"
                                        style="border-color:#0D1220;box-shadow:0 0 6px #4ade80;"></div>
                                </div>
                            </div>

                            <!-- Card body -->
                            <div class="px-8 pb-8">
                                <h3 class="font-bold text-white text-[26px] mb-2 text-center" style="font-family:'Georgia',serif;">
                                    {{ ownerName }}
                                </h3>
                                <p class="text-base mb-7 text-center" style="color:#A8C4E8;font-family:system-ui;">
                                    Full-Stack Developer
                                </p>

                                <!-- Stats row -->
                                <div class="grid grid-cols-3 gap-3 mb-7">
                                    <div v-for="stat in profileStats" :key="stat.label"
                                        class="text-center py-4 rounded-2xl transition-all hover:scale-105 cursor-default"
                                        style="background:#05080F;border:1px solid #0f1f38;">
                                        <div class="font-bold text-white text-xl" style="font-family:'Georgia',serif;">
                                            {{ stat.value }}
                                        </div>
                                        <div class="text-xs mt-1" style="color:#A8C4E8;font-family:system-ui;">{{ stat.label
                                            }}</div>
                                    </div>
                                </div>

                                <!-- Open to work -->
                                <div class="flex justify-center">
                                    <div class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                                        style="background:#052e16;color:#4ade80;font-family:system-ui;">
                                        <span class="w-2 h-2 rounded-full bg-green-400"
                                            style="box-shadow:0 0 6px #4ade80;animation:greenPulse 2s infinite;"></span>
                                        Open to Work
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating glow ring behind card -->
                        <div class="absolute inset-0 -z-10 rounded-3xl"
                            style="box-shadow:0 0 80px #3B82F620;transform:scale(1.05);"></div>
                    </div>
                </div>
            </div>

            <!-- Scroll indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
                <span class="text-xs uppercase tracking-widest"
                    style="color:#475569;font-family:system-ui;">Scroll</span>
                <div class="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
                    style="border-color:#1e3a5f;">
                    <div class="w-1 h-2 rounded-full bg-blue-500 scroll-dot"></div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ② SERVICES SECTION
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #0f1f38;">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-3"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">What I Do</p>
                    <h2 class="font-bold text-white"
                        style="font-size:clamp(28px,4vw,44px);font-family:'Georgia',serif;">
                        Services I Offer
                    </h2>
                </div>

                <div class="grid md:grid-cols-3 gap-5">
                    <div v-for="(svc, i) in services" :key="svc.title" class="service-card rounded-2xl border p-6 transition-all duration-300
                   hover:-translate-y-2 hover:scale-[1.02] cursor-default"
                        :style="`background:#0D1220;border-color:#1e3a5f;animation-delay:${i * 80}ms`">
                        <!-- Icon tile -->
                        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-xl"
                            style="background:#3B82F615;border:1px solid #3B82F625;">
                            <span style="filter:drop-shadow(0 0 4px #3B82F6);">{{ svc.icon }}</span>
                        </div>
                        <h3 class="font-bold text-white text-lg mb-3" style="font-family:'Georgia',serif;">
                            {{ svc.title }}
                        </h3>
                        <p class="text-sm leading-relaxed" style="color:#A8C4E8;font-family:system-ui;">
                            {{ svc.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ③ CORE TECHNOLOGIES
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #0f1f38;">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-start justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-widest mb-2"
                            style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">Tech Stack</p>
                        <h2 class="font-bold text-white text-3xl" style="font-family:'Georgia',serif;">
                            Core Technologies
                        </h2>
                    </div>
                    <RouterLink to="/skills"
                        class="flex items-center gap-1.5 text-sm font-medium transition-colors self-end pb-1"
                        style="color:#A8C4E8;font-family:system-ui;" onmouseover="this.style.color='#60A5FA'"
                        onmouseout="this.style.color='#A8C4E8'">
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
                   transition-all hover:-translate-y-1 hover:scale-105 cursor-default"
                        style="background:#0D1220;border-color:#1e3a5f;">
                        <!-- Letter avatar -->
                        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style="background:linear-gradient(135deg,#1e3a5f,#2563EB);">
                            {{ skill.name[0].toUpperCase() }}
                        </div>
                        <span class="text-sm font-medium text-white" style="font-family:system-ui;">{{ skill.name
                            }}</span>
                        <span class="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style="background:#3B82F615;color:#60A5FA;font-family:system-ui;">
                            {{ skill.percentage }}%
                        </span>
                    </div>
                </div>

                <!-- Fallback static tags -->
                <div v-else-if="skillsLoading" class="flex flex-wrap gap-3">
                    <div v-for="i in 8" :key="i" class="h-14 w-36 rounded-xl animate-pulse" style="background:#0D1220;">
                    </div>
                </div>
                <div v-else class="flex flex-wrap gap-3">
                    <div v-for="tag in fallbackTags" :key="tag"
                        class="px-5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:scale-105"
                        style="background:#0D1220;border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                        {{ tag }}
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ④ FEATURED PROJECTS
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #0f1f38;">
            <div class="max-w-7xl mx-auto">
                <div class="flex items-start justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-widest mb-2"
                            style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">Recent Work</p>
                        <h2 class="font-bold text-white text-3xl" style="font-family:'Georgia',serif;">
                            Featured Projects
                        </h2>
                    </div>
                    <RouterLink to="/portfolio"
                        class="flex items-center gap-1.5 text-sm font-medium transition-colors self-end pb-1"
                        style="color:#A8C4E8;font-family:system-ui;" onmouseover="this.style.color='#60A5FA'"
                        onmouseout="this.style.color='#A8C4E8'">
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
                        style="background:#0D1220;height:360px;"></div>
                </div>

                <!-- Projects from API -->
                <div v-else-if="projects.length > 0" class="grid md:grid-cols-3 gap-6">
                    <div v-for="(p, i) in projects" :key="p.id" class="project-card rounded-2xl border overflow-hidden transition-all duration-300
                   hover:-translate-y-2 group"
                        :style="`background:#0D1220;border-color:#1e3a5f;animation-delay:${i * 100}ms`">

                        <!-- Image / placeholder -->
                        <div class="h-48 relative overflow-hidden flex items-center justify-center"
                            style="background:linear-gradient(135deg,#0a1628 0%,#0f2040 100%);">
                            <img v-if="p.image" :src="p.image" :alt="p.title"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div v-else class="flex flex-col items-center gap-3">
                                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f"
                                    stroke-width="1">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <path d="M8 21h8M12 17v4" />
                                </svg>
                                <span class="text-xs font-medium" style="color:#1e3a5f;font-family:system-ui;">No
                                    preview</span>
                            </div>

                            <!-- Featured badge -->
                            <div v-if="p.is_featured"
                                class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-lg"
                                style="background:#F59E0B20;color:#F59E0B;border:1px solid #F59E0B40;font-family:system-ui;">
                                ★ Featured
                            </div>

                            <!-- Overlay on hover -->
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                                style="background:#05080Fcc;">
                                <a v-if="p.project_url" :href="p.project_url" target="_blank"
                                    class="px-4 py-2 text-white text-xs font-semibold rounded-xl transition-all hover:scale-105"
                                    style="background:#3B82F6;font-family:system-ui;">
                                    Live Demo
                                </a>
                                <a v-if="p.github_url" :href="p.github_url" target="_blank"
                                    class="px-4 py-2 text-xs font-semibold rounded-xl border transition-all hover:scale-105"
                                    style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                                    GitHub
                                </a>
                            </div>
                        </div>

                        <!-- Project info -->
                        <div class="p-5">
                            <div class="flex items-center justify-between mb-2">
                                <span v-if="p.category"
                                    class="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                    style="background:#3B82F615;color:#60A5FA;font-family:system-ui;">
                                    {{ p.category }}
                                </span>
                            </div>
                            <h3 class="font-bold text-white mb-2" style="font-family:'Georgia',serif;font-size:17px;">
                                {{ p.title }}
                            </h3>
                            <p class="text-sm leading-relaxed mb-4" style="color:#A8C4E8;font-family:system-ui;">
                                {{ p.description?.substring(0, 110) }}{{ p.description?.length > 110 ? '...' : '' }}
                            </p>
                            <div class="flex gap-2">
                                <a v-if="p.project_url" :href="p.project_url" target="_blank" class="flex-1 text-center py-2.5 text-white text-xs font-semibold rounded-xl
                         transition-all hover:scale-105" style="background:#3B82F6;font-family:system-ui;
                  box-shadow:0 0 16px #3B82F630;">
                                    Live Demo
                                </a>
                                <a v-if="p.github_url" :href="p.github_url" target="_blank" class="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl border
                         transition-colors hover:border-blue-500"
                                    style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                                    GitHub
                                </a>
                                <RouterLink v-if="!p.project_url && !p.github_url" to="/portfolio" class="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl border
                         transition-colors" style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                                    View Details
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Graceful empty state -->
                <div v-else class="text-center py-16 rounded-2xl border"
                    style="background:#0D1220;border-color:#1e3a5f;">
                    <svg class="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f"
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
         ⑤ TESTIMONIALS
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16 relative overflow-hidden" style="border-top:1px solid #0f1f38;">
            <!-- Section glow -->
            <div class="absolute bottom-0 right-0 pointer-events-none" style="width:600px;height:400px;
        background:radial-gradient(circle at 80% 90%,#1e40af15,transparent 60%);"></div>

            <div class="max-w-7xl mx-auto relative z-10">
                <div class="text-center mb-16">
                    <p class="text-xs font-semibold uppercase tracking-widest mb-3"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">Kind Words</p>
                    <h2 class="font-bold text-white"
                        style="font-size:clamp(28px,4vw,44px);font-family:'Georgia',serif;">
                        Client Feedback
                    </h2>
                </div>

                <div class="grid md:grid-cols-3 gap-5">
                    <div v-for="(t, i) in testimonials" :key="t.name"
                        class="testimonial-card rounded-2xl border p-7 transition-all hover:-translate-y-1"
                        :style="`background:#0D1220;border-color:#1e3a5f;animation-delay:${i * 100}ms`">
                        <!-- Stars -->
                        <div class="flex gap-1 mb-5">
                            <span v-for="s in t.stars" :key="s" style="color:#F59E0B;font-size:18px;">★</span>
                            <span v-for="s in (5 - t.stars)" :key="'e' + s"
                                style="color:#1e3a5f;font-size:18px;">★</span>
                        </div>
                        <!-- Quote -->
                        <p class="text-sm leading-relaxed mb-6 italic"
                            style="color:#A8C4E8;font-family:system-ui;line-height:1.8;">
                            "{{ t.quote }}"
                        </p>
                        <!-- Author -->
                        <div class="flex items-center gap-3 pt-5 border-t" style="border-color:#0f1f38;">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center
                          font-bold text-white text-sm flex-shrink-0"
                                style="background:linear-gradient(135deg,#1e3a5f,#2563EB);">
                                {{ t.name[0] }}
                            </div>
                            <div>
                                <div class="font-semibold text-white text-sm" style="font-family:'Georgia',serif;">
                                    {{ t.name }}
                                </div>
                                <div class="text-xs" style="color:#A8C4E8;font-family:system-ui;">{{ t.role }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════
         ⑥ FINAL CTA
    ════════════════════════════════════════════════════════ -->
        <section class="py-24 px-6 md:px-16" style="border-top:1px solid #0f1f38;">
            <div class="max-w-7xl mx-auto flex justify-center">
                <div class="w-full max-w-3xl rounded-3xl border p-14 md:p-16 text-center relative overflow-hidden"
                    style="background:#0D1220;border-color:#1e3a5f;
          box-shadow:0 0 80px #3B82F610,0 40px 80px #00000040;">

                    <!-- Glowing radial backdrop -->
                    <div class="absolute inset-0 pointer-events-none">
                        <div class="absolute inset-0"
                            style="background:radial-gradient(ellipse 700px 400px at 50% 50%,#3B82F60a,transparent 70%);">
                        </div>
                        <!-- Corner glow accents -->
                        <div class="absolute top-0 left-0 w-32 h-32 rounded-full"
                            style="background:radial-gradient(circle,#3B82F615,transparent 70%);transform:translate(-50%,-50%);">
                        </div>
                        <div class="absolute bottom-0 right-0 w-32 h-32 rounded-full"
                            style="background:radial-gradient(circle,#3B82F615,transparent 70%);transform:translate(50%,50%);">
                        </div>
                        <!-- Subtle grid -->
                        <div class="absolute inset-0 opacity-30" style="background-image:radial-gradient(circle,#3B82F610 1px,transparent 1px);
              background-size:28px 28px;"></div>
                    </div>

                    <div class="relative z-10">
                        <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                            style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">
                            Ready to Build?
                        </p>
                        <h2 class="font-bold text-white leading-tight mb-2"
                            style="font-size:clamp(26px,4vw,44px);font-family:'Georgia',serif;">
                            Let's Create Something
                        </h2>
                        <h2 class="font-bold leading-tight mb-5" style="font-size:clamp(26px,4vw,44px);font-family:'Georgia',serif;
              color:#60A5FA;text-shadow:0 0 30px #3B82F640;">
                            Remarkable
                        </h2>
                        <p class="text-sm leading-relaxed mb-10 mx-auto"
                            style="color:#A8C4E8;max-width:420px;font-family:system-ui;line-height:1.8;">
                            Whether it's a new product, a redesign, or a complex backend — I'm
                            ready to help turn your vision into reality.
                        </p>
                        <div class="flex flex-wrap gap-4 justify-center">
                            <RouterLink to="/contact"
                                class="px-8 py-3.5 text-white font-semibold rounded-2xl transition-all hover:scale-105"
                                style="background:#3B82F6;box-shadow:0 0 28px #3B82F640;
                font-family:system-ui;font-size:15px;">
                                Start a Project
                            </RouterLink>
                            <RouterLink to="/portfolio" class="px-8 py-3.5 font-semibold rounded-2xl border transition-all hover:scale-105
                       hover:border-blue-500"
                                style="border-color:#334155;color:#A8C4E8;font-family:system-ui;font-size:15px;">
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
        box-shadow: 0 0 6px #3B82F6;
        opacity: 1;
    }

    50% {
        box-shadow: 0 0 14px #3B82F6, 0 0 28px #3B82F660;
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
    border-color: #3B82F640 !important;
    box-shadow: 0 0 30px #3B82F610;
}

.project-card:hover {
    border-color: #3B82F650 !important;
    box-shadow: 0 0 30px #3B82F615;
}

.testimonial-card:hover {
    border-color: #3B82F640 !important;
}

.skill-chip:hover {
    border-color: #3B82F640 !important;
    box-shadow: 0 0 12px #3B82F610;
}

/* Social buttons */
.social-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid #1e3a5f;
    background: #0D1220;
    color: #A8C4E8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;
}

.social-btn:hover {
    border-color: #3B82F6;
    color: #60A5FA;
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 0 12px #3B82F630;
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// ── Owner config (mirrors Laravel config('app.owner_name')) ──
const ownerName = ref('Pial Mahmud')
const ownerInitials = computed(() =>
    ownerName.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
)
const homeAvatarLoadFailed = ref(false)
const homeAvatarUrl = computed(() =>
    auth.isAdmin ? auth.user?.profile_image?.trim?.() || '' : ''
)

watch(homeAvatarUrl, () => {
    homeAvatarLoadFailed.value = false
})

// ── Typewriter role rotator ──────────────────────────────
const roles = [
    'Full-Stack Developer',
    'Laravel Expert',
    'UI/UX Enthusiast',
    'API Architect',
    'Problem Solver',
]
const currentRole = ref('')
const currentRoleIdx = ref(0)
const isDeleting = ref(false)
let typeTimer = null

function typewrite() {
    const target = roles[currentRoleIdx.value]
    if (!isDeleting.value) {
        currentRole.value = target.slice(0, currentRole.value.length + 1)
        if (currentRole.value === target) {
            // Pause then start deleting
            typeTimer = setTimeout(() => { isDeleting.value = true; typewrite() }, 2200)
            return
        }
    } else {
        currentRole.value = currentRole.value.slice(0, -1)
        if (currentRole.value === '') {
            isDeleting.value = false
            currentRoleIdx.value = (currentRoleIdx.value + 1) % roles.length
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
    { value: projects.value.length > 0 ? projects.value.length + '+' : '3+', label: 'Projects' },
    { value: '3+', label: 'Years' },
    { value: skills.value.length > 0 ? skills.value.length + '+' : '10+', label: 'Skills' },
])

// ── Fallback static skill tags ───────────────────────────
const fallbackTags = [
    'Laravel', 'Vue.js 3', 'MySQL', 'REST API',
    'Tailwind CSS', 'PHP 8', 'Git', 'Docker',
    'JavaScript', 'Eloquent ORM', 'JWT Auth', 'Vite',
]

// ── Services ─────────────────────────────────────────────
const services = [
    { icon: '🖥', title: 'Web Development', desc: 'Full-stack web applications built with Laravel, Vue, and modern tooling — fast, secure, and scalable.' },
    { icon: '📱', title: 'Responsive UI Design', desc: 'Pixel-perfect interfaces that look stunning on every screen size, crafted with Tailwind CSS.' },
    { icon: '⚡', title: 'REST API Development', desc: 'Well-structured, documented REST APIs for web and mobile clients with JWT auth and rate limiting.' },
    { icon: '☁️', title: 'Cloud Deployment', desc: 'Deploy and manage applications on VPS, shared hosting, or cloud providers with CI/CD pipelines.' },
    { icon: '📊', title: 'Performance Optimization', desc: 'Audit and optimize queries, caching, and asset delivery to make your app blazingly fast.' },
    { icon: '🔧', title: 'Technical Support', desc: 'Bug fixes, code reviews, and ongoing maintenance for existing projects and legacy codebases.' },
]

// ── Testimonials ─────────────────────────────────────────
const testimonials = [
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

// ── Lifecycle ────────────────────────────────────────────
onMounted(async () => {
    // Start typewriter after short delay
    typeTimer = setTimeout(typewrite, 600)

    // Fetch data
    try {
        if (auth.isLoggedIn && auth.isAdmin && !auth.user?.profile_image) {
            await auth.fetchProfile()
        }

        const [sRes, pRes] = await Promise.all([
            api.get('/skills'),
            api.get('/projects?featured=1'),
        ])
        skills.value = sRes.data.data || []
        projects.value = pRes.data.data?.slice(0, 3) || []
    } catch (e) {
        console.warn('Could not fetch portfolio data:', e.message)
    } finally {
        skillsLoading.value = false
        projectsLoading.value = false
    }
})

onUnmounted(() => {
    clearTimeout(typeTimer)
})
</script>
