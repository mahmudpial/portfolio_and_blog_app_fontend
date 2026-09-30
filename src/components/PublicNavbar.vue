<template>
    <nav class="sticky top-0 z-50 transition-all duration-300"
         :style="`background:rgba(${themeColors.bg}, 0.85); backdrop-filter:blur(20px); border-bottom:1px solid ${themeColors.border};`">

        <div class="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">

            <!-- Logo (CMS Controlled) -->
            <RouterLink to="/" class="flex items-center gap-1.5 group flex-shrink-0 text-decoration-none">
                <div v-if="settings['logo_url']" class="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10">
                    <img :src="settings['logo_url']" alt="Logo" class="w-full h-full object-cover" />
                </div>
                <span v-else class="font-bold text-white tracking-tight"
                    :style="`color: var(--color-heading);`"
                    style="font-size:20px;font-family:'Georgia',serif;">
                    {{ settings['brand_name'] || 'Pial' }}
                </span>
                <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:#8B5CF6;box-shadow:0 0 8px #8B5CF6,0 0 16px #8B5CF640;
                  animation:logoPulse 2s ease-in-out infinite;
                  transition:transform .2s;margin-top:1px;" onmouseover="this.style.transform='scale(1.4)'"
                    onmouseout="this.style.transform='scale(1)'"></span>
                <span v-if="!settings['logo_url']" class="font-bold tracking-tight"
                    :style="`color: var(--color-heading);`"
                    style="font-size:20px;font-family:'Georgia',serif;">Dev</span>
            </RouterLink>

            <!-- Desktop nav -->
            <div class="hidden md:flex items-center gap-1">
                <!-- Home -->
                <RouterLink to="/" class="nav-link relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all"
                    :style="`color: var(--color-text);`" active-class="nav-active">
                    Home
                </RouterLink>

                <!-- About -->
                <RouterLink to="/about" class="nav-link relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all"
                    :style="`color: var(--color-text);`" active-class="nav-active">
                    About
                </RouterLink>

                <!-- Services & Solutions Dropdown Group -->
                <div class="relative" ref="servicesDropdownRef" @mouseenter="servicesMenuOpen = true" @mouseleave="servicesMenuOpen = false">
                    <button @click="servicesMenuOpen = !servicesMenuOpen"
                        class="nav-link relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border-0 bg-transparent"
                        :class="{ 'nav-active': isServicesActive }"
                        :style="`color: var(--color-text);`">
                        <span>Services &amp; Pricing</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                            class="transition-transform duration-200 text-purple-300"
                            :style="servicesMenuOpen ? 'transform:rotate(180deg);color:#C084FC;' : ''">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    <!-- Mega Dropdown Panel -->
                    <transition name="dropdown">
                        <div v-if="servicesMenuOpen"
                            class="absolute left-1/2 -translate-x-1/2 mt-1 w-72 rounded-2xl border p-2.5 shadow-2xl z-50 overflow-hidden"
                            style="background:rgba(18, 14, 28, 0.96); backdrop-filter:blur(24px); border-color:rgba(139, 92, 246, 0.25); box-shadow:0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(139,92,246,0.15);">
                            
                            <!-- Skills -->
                            <RouterLink to="/skills" @click="servicesMenuOpen = false"
                                class="flex items-start gap-3 p-2.5 rounded-xl transition-all hover:bg-white/10 group text-decoration-none">
                                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform group-hover:scale-110"
                                    style="background:rgba(139, 92, 246, 0.15); border:1px solid rgba(139, 92, 246, 0.35); color:#C084FC; box-shadow:0 0 14px rgba(139,92,246,0.2);">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                                        Skills Matrix
                                    </div>
                                    <div class="text-[11px] text-purple-300/70 leading-tight mt-0.5">
                                        Tech stack, frameworks &amp; languages
                                    </div>
                                </div>
                            </RouterLink>

                            <!-- Services -->
                            <RouterLink to="/#services" @click="servicesMenuOpen = false"
                                class="flex items-start gap-3 p-2.5 rounded-xl transition-all hover:bg-white/10 group text-decoration-none">
                                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform group-hover:scale-110"
                                    style="background:rgba(6, 182, 212, 0.15); border:1px solid rgba(6, 182, 212, 0.35); color:#38BDF8; box-shadow:0 0 14px rgba(6,182,212,0.2);">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                        <line x1="8" y1="21" x2="16" y2="21"></line>
                                        <line x1="12" y1="17" x2="12" y2="21"></line>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                                        Service Offerings
                                    </div>
                                    <div class="text-[11px] text-purple-300/70 leading-tight mt-0.5">
                                        Full-stack systems, APIs &amp; architecture
                                    </div>
                                </div>
                            </RouterLink>

                            <!-- Pricing -->
                            <RouterLink to="/pricing" @click="servicesMenuOpen = false"
                                class="flex items-start gap-3 p-2.5 rounded-xl transition-all hover:bg-white/10 group text-decoration-none">
                                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform group-hover:scale-110"
                                    style="background:rgba(16, 185, 129, 0.15); border:1px solid rgba(16, 185, 129, 0.35); color:#34D399; box-shadow:0 0 14px rgba(16,185,129,0.2);">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
                                        <path d="M2 9h20"></path>
                                        <path d="M12 21L8 9l4-6 4 6-4 12z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                                        Pricing &amp; Plans
                                    </div>
                                    <div class="text-[11px] text-purple-300/70 leading-tight mt-0.5">
                                        Predictable tiers, scopes &amp; milestones
                                    </div>
                                </div>
                            </RouterLink>
                        </div>
                    </transition>
                </div>

                <!-- Portfolio -->
                <RouterLink to="/portfolio" class="nav-link relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all"
                    :style="`color: var(--color-text);`" active-class="nav-active">
                    Portfolio
                </RouterLink>

                <!-- Blog -->
                <RouterLink to="/blog" class="nav-link relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all"
                    :style="`color: var(--color-text);`" active-class="nav-active">
                    Blog
                </RouterLink>

                <!-- Contact -->
                <RouterLink to="/contact" class="nav-link relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all"
                    :style="`color: var(--color-text);`" active-class="nav-active">
                    Contact
                </RouterLink>
            </div>

            <!-- Right side -->
            <div class="hidden md:flex items-center gap-3">
                <!-- Theme Toggle -->
                <button @click="themeStore.toggleTheme()" class="p-2 rounded-xl border transition-all hover:scale-110 cursor-pointer"
                    style="background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;"
                    title="Toggle Dark / Light Theme"
                    aria-label="Toggle Theme">
                    <span v-if="themeStore.isDark">☀️</span>
                    <span v-else>🌙</span>
                </button>

                <!-- Guest Login -->
                <template v-if="!auth.isLoggedIn">
                    <RouterLink to="/login"
                        class="px-5 py-2 text-sm font-semibold rounded-xl transition-all hover:scale-105 text-white text-decoration-none"
                        style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                        Login
                    </RouterLink>
                </template>

                <!-- Profile Dropdown Section (Matched with Admin layout) -->
                <template v-else>
                    <div class="relative" ref="profileMenuRef">
                        <button @click="profileMenuOpen = !profileMenuOpen"
                            class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all hover:scale-105 cursor-pointer"
                            style="background:rgba(18, 14, 28, 0.85); border-color:rgba(139, 92, 246, 0.25);">
                            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style="background:linear-gradient(135deg,#7C3AED,#C084FC); box-shadow:0 0 10px rgba(139,92,246,0.3);">
                                {{ (auth.user?.name || 'U')[0].toUpperCase() }}
                            </div>
                            <div class="flex flex-col text-left">
                                <span class="text-xs font-semibold text-white leading-tight truncate max-w-[110px]">
                                    {{ auth.user?.name || 'User' }}
                                </span>
                                <span class="text-[10px] text-purple-300/70 font-medium">
                                    {{ auth.isAdmin ? 'Administrator' : 'Member' }}
                                </span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                class="transition-transform duration-200 text-purple-300"
                                :style="profileMenuOpen ? 'transform:rotate(180deg);' : ''">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        <transition name="dropdown">
                            <div v-if="profileMenuOpen"
                                class="absolute right-0 mt-2 w-64 rounded-2xl border p-2 shadow-2xl z-50 overflow-hidden"
                                style="background:rgba(18, 14, 28, 0.96); backdrop-filter:blur(24px); border-color:rgba(139, 92, 246, 0.25); box-shadow:0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(139,92,246,0.15);">
                                
                                <!-- User Info Header -->
                                <div class="p-3 mb-1 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                                        style="background:linear-gradient(135deg,#7C3AED,#C084FC);">
                                        {{ (auth.user?.name || 'U')[0].toUpperCase() }}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-xs font-bold text-white truncate m-0">{{ auth.user?.name || 'User' }}</p>
                                        <p class="text-[11px] text-purple-300/70 truncate m-0">{{ auth.user?.email }}</p>
                                    </div>
                                </div>

                                <!-- Menu links -->
                                <div class="space-y-1">
                                    <!-- Profile -->
                                    <RouterLink to="/profile" @click="closeProfileMenu"
                                        class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors text-decoration-none">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <span>My Profile</span>
                                    </RouterLink>

                                    <!-- Admin Panel (if admin) -->
                                    <RouterLink v-if="auth.isAdmin" to="/admin" @click="closeProfileMenu"
                                        class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-300/90 hover:text-red-200 hover:bg-red-500/10 transition-colors text-decoration-none">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="7" height="7" />
                                            <rect x="14" y="3" width="7" height="7" />
                                            <rect x="14" y="14" width="7" height="7" />
                                            <rect x="3" y="14" width="7" height="7" />
                                        </svg>
                                        <span>Admin Dashboard</span>
                                    </RouterLink>

                                    <!-- Theme setting toggle -->
                                    <button @click="themeStore.toggleTheme()"
                                        class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 bg-transparent text-left">
                                        <div class="flex items-center gap-2.5">
                                            <svg v-if="themeStore.isDark" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                            </svg>
                                            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="5" />
                                                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                            </svg>
                                            <span>Theme Mode</span>
                                        </div>
                                        <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide uppercase"
                                            style="background:rgba(139,92,246,0.2); color:#C084FC;">
                                            {{ themeStore.isDark ? 'Dark' : 'Light' }}
                                        </span>
                                    </button>
                                </div>

                                <div class="my-1.5 h-px bg-white/10"></div>

                                <!-- Logout -->
                                <button @click="handleLogout"
                                    class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-red-500/15 cursor-pointer border-0 bg-transparent text-left"
                                    style="color:#f87171;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </transition>
                    </div>
                </template>
            </div>

            <!-- Mobile toggle -->
            <button class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors hover:bg-white/5 cursor-pointer border-0 bg-transparent"
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
                style="background:var(--color-background-soft);border-color:var(--color-border);">
                <div class="px-6 py-5 flex flex-col gap-1">
                    <RouterLink to="/" @click="menuOpen = false" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 text-decoration-none" :style="`color: var(--color-text);`" style="font-family:system-ui;" active-class="mobile-active">
                        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#8B5CF6;"></span>
                        Home
                    </RouterLink>

                    <RouterLink to="/about" @click="menuOpen = false" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 text-decoration-none" :style="`color: var(--color-text);`" style="font-family:system-ui;" active-class="mobile-active">
                        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#8B5CF6;"></span>
                        About
                    </RouterLink>

                    <!-- Mobile Services Accordion -->
                    <div class="py-1">
                        <button @click="mobileServicesOpen = !mobileServicesOpen"
                            class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 cursor-pointer border-0 bg-transparent"
                            :style="`color: var(--color-text);`" style="font-family:system-ui;">
                            <div class="flex items-center gap-3">
                                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#8B5CF6;"></span>
                                <span>Services &amp; Pricing</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                class="transition-transform duration-200 text-purple-300"
                                :style="mobileServicesOpen ? 'transform:rotate(180deg);color:#C084FC;' : ''">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        <div v-if="mobileServicesOpen" class="pl-6 pr-4 space-y-2 mt-2 border-l ml-4" style="border-color:rgba(139,92,246,0.25);">
                            <RouterLink to="/skills" @click="menuOpen = false" class="flex items-center gap-2.5 py-1.5 text-xs font-semibold text-purple-200 hover:text-white text-decoration-none group">
                                <div class="w-6 h-6 rounded-lg flex items-center justify-center text-violet-400 shrink-0"
                                    style="background:rgba(139,92,246,0.15); border:1px solid rgba(139,92,246,0.3);">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
                                </div>
                                <span>Skills Matrix</span>
                            </RouterLink>
                            <RouterLink to="/#services" @click="menuOpen = false" class="flex items-center gap-2.5 py-1.5 text-xs font-semibold text-cyan-200 hover:text-white text-decoration-none group">
                                <div class="w-6 h-6 rounded-lg flex items-center justify-center text-cyan-400 shrink-0"
                                    style="background:rgba(6,182,212,0.15); border:1px solid rgba(6,182,212,0.3);">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                        <line x1="8" y1="21" x2="16" y2="21"></line>
                                        <line x1="12" y1="17" x2="12" y2="21"></line>
                                    </svg>
                                </div>
                                <span>Service Offerings</span>
                            </RouterLink>
                            <RouterLink to="/pricing" @click="menuOpen = false" class="flex items-center gap-2.5 py-1.5 text-xs font-semibold text-emerald-200 hover:text-white text-decoration-none group">
                                <div class="w-6 h-6 rounded-lg flex items-center justify-center text-emerald-400 shrink-0"
                                    style="background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3);">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
                                        <path d="M2 9h20"></path>
                                        <path d="M12 21L8 9l4-6 4 6-4 12z"></path>
                                    </svg>
                                </div>
                                <span>Pricing &amp; Plans</span>
                            </RouterLink>
                        </div>
                    </div>

                    <RouterLink to="/portfolio" @click="menuOpen = false" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 text-decoration-none" :style="`color: var(--color-text);`" style="font-family:system-ui;" active-class="mobile-active">
                        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#8B5CF6;"></span>
                        Portfolio
                    </RouterLink>

                    <RouterLink to="/blog" @click="menuOpen = false" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 text-decoration-none" :style="`color: var(--color-text);`" style="font-family:system-ui;" active-class="mobile-active">
                        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#8B5CF6;"></span>
                        Blog
                    </RouterLink>

                    <RouterLink to="/contact" @click="menuOpen = false" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 text-decoration-none" :style="`color: var(--color-text);`" style="font-family:system-ui;" active-class="mobile-active">
                        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#8B5CF6;"></span>
                        Contact
                    </RouterLink>

                    <div class="h-px my-3" style="background:var(--color-border);"></div>

                    <template v-if="auth.isLoggedIn">
                        <RouterLink to="/profile" @click="menuOpen = false"
                            class="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/5 text-decoration-none"
                            :style="`color: var(--color-text);`" style="font-family:system-ui;">
                            <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                {{ auth.user?.name?.[0]?.toUpperCase() }}
                            </span>
                            <div class="flex flex-col text-left">
                                <span>{{ auth.user?.name }}</span>
                                <span class="text-[10px] text-purple-400 font-normal">{{ auth.isAdmin ? 'Administrator' : 'Member' }}</span>
                            </div>
                        </RouterLink>

                        <RouterLink v-if="auth.isAdmin" to="/admin" @click="menuOpen = false"
                            class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-decoration-none"
                            style="color:#f87171;background:#dc262610;font-family:system-ui;">
                            <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            Admin Panel
                        </RouterLink>

                        <button @click="auth.logout(); menuOpen = false;" class="flex items-center justify-center gap-2 py-3 rounded-xl text-sm
                       font-medium border transition-all mt-1 cursor-pointer bg-transparent"
                            :style="`border-color:var(--color-border);color: #f87171;`" style="font-family:system-ui;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </template>

                    <RouterLink v-else to="/login" @click="menuOpen = false" class="flex items-center justify-center gap-2 py-3 rounded-xl text-sm
                   font-semibold text-white transition-all mt-1 text-decoration-none"
                        style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                        Login
                    </RouterLink>
                </div>
            </div>
        </transition>
    </nav>
</template>

<style scoped>
@keyframes logoPulse {
    0%, 100% { box-shadow: 0 0 8px #8B5CF6, 0 0 16px #8B5CF640; }
    50% { box-shadow: 0 0 14px #8B5CF6, 0 0 28px #8B5CF680; }
}
.nav-link:hover {
    color: #C084FC !important;
    background: rgba(139, 92, 246, 0.1);
}
.nav-active {
    color: #C084FC !important;
    background: rgba(139, 92, 246, 0.1) !important;
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
.mobile-active {
    color: #C084FC !important;
    background: rgba(139, 92, 246, 0.1) !important;
}
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: all .25s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }
.dropdown-enter-active, .dropdown-leave-active { transition: all .18s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px) scale(.98); }
</style>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import api from '@/api/axios'

const auth = useAuthStore()
const themeStore = useThemeStore()
const route = useRoute()

const menuOpen = ref(false)
const servicesMenuOpen = ref(false)
const servicesDropdownRef = ref(null)
const mobileServicesOpen = ref(false)
const profileMenuOpen = ref(false)
const profileMenuRef = ref(null)
const settings = ref({})

const isServicesActive = computed(() => {
    return ['/skills', '/pricing'].includes(route.path) || route.path.startsWith('/services')
})

const themeColors = computed(() => {
    return themeStore.isDark
        ? { bg: '18, 14, 28', border: '#3B2A5A' }
        : { bg: '240, 240, 245', border: '#D1D5DB' }
})

async function fetchSettings() {
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
        console.warn('Could not load settings:', e.message)
    }
}

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
    if (!servicesDropdownRef.value?.contains(event.target)) {
        servicesMenuOpen.value = false
    }
}

onMounted(async () => {
    document.addEventListener('click', handleClickOutside)
    await fetchSettings()
    themeStore.applyTheme()
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
