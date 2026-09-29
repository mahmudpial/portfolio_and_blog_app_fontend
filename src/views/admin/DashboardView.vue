<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <!-- ── PAGE HEADER ──────────────────────────────────── -->
        <div class="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div class="min-w-0">
                <h1 class="font-bold text-white text-2xl" style="font-family:'Georgia',serif;">
                    Dashboard
                </h1>
                <p class="text-sm mt-1 break-words" style="color:#C9B9E8;font-family:system-ui;">
                    Welcome back, <span class="text-white font-medium">{{ auth.user?.name }}</span>
                </p>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm w-full sm:w-auto justify-center sm:justify-start"
                style="background:#120E1C;border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                <span class="w-2 h-2 rounded-full bg-green-400" style="box-shadow:0 0 6px #4ade80;"></span>
                {{ formatDate(new Date()) }}
            </div>
        </div>

        <!-- ── STATS ROW ────────────────────────────────────── -->
        <div class="dashboard-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div v-for="stat in statsCards" :key="stat.label"
                class="rounded-2xl border p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 group cursor-default"
                style="background:#120E1C;border-color:#3B2A5A;"
                onmouseover="this.style.borderColor=this.getAttribute('data-glow');"
                onmouseout="this.style.borderColor='#3B2A5A';"
                :data-glow="stat.glow">
                <!-- ambient glow -->
                <div class="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100" 
                     :style="`background:radial-gradient(circle, ${stat.glow}25 0%, transparent 70%); transform:translate(30%,-30%);`"></div>
                
                <div class="flex items-center gap-3 mb-3 relative z-10">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                        :style="`background:${stat.glow}18; border:1px solid ${stat.glow}40; color:${stat.color}; box-shadow: 0 4px 12px ${stat.glow}15;`">
                        <svg v-if="stat.type === 'users'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <svg v-else-if="stat.type === 'active'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else-if="stat.type === 'admins'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </div>
                    <span class="text-xs font-semibold uppercase tracking-wider"
                        style="color:#94A3B8;font-family:system-ui;letter-spacing:.12em;">
                        {{ stat.label }}
                    </span>
                </div>
                <div class="font-bold text-3xl" :style="{ color: stat.color, fontFamily: 'Georgia,serif' }">
                    {{ stat.value }}
                </div>
            </div>
        </div>

        <!-- ── NAV CARDS ────────────────────────────────────── -->
        <div class="dashboard-nav-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <RouterLink v-for="card in navCards" :key="card.to" :to="card.to" 
                class="rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1.5 no-underline group relative overflow-hidden flex flex-col items-center justify-center"
                style="background:#120E1C;border-color:#3B2A5A;"
                onmouseover="this.style.borderColor=this.getAttribute('data-color'); this.style.boxShadow='0 10px 25px -5px ' + this.getAttribute('data-color') + '25';"
                onmouseout="this.style.borderColor='#3B2A5A'; this.style.boxShadow='none';"
                :data-color="card.color">
                
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    :style="`background:radial-gradient(circle at 50% 40%, ${card.color}15, transparent 70%);`">
                </div>
                
                <!-- Nav Card Vector Icon -->
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 relative z-10 transition-all duration-300 group-hover:scale-110 shadow-lg"
                     :style="`background:${card.color}15; border:1px solid ${card.color}35; color:${card.color};`">
                    
                    <!-- Posts Icon -->
                    <svg v-if="card.type === 'posts'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>

                    <!-- Projects Icon -->
                    <svg v-else-if="card.type === 'projects'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>

                    <!-- Skills Icon -->
                    <svg v-else-if="card.type === 'skills'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>

                    <!-- Services Icon -->
                    <svg v-else-if="card.type === 'services'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>

                    <!-- Comments Icon -->
                    <svg v-else-if="card.type === 'comments'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>

                <div class="font-semibold text-white text-sm mb-1 relative z-10 group-hover:text-purple-300 transition-colors" style="font-family:'Georgia',serif;">
                    {{ card.label }}
                </div>
                <div class="text-xs relative z-10 transition-colors text-slate-400 group-hover:text-purple-200" style="font-family:system-ui;">
                    {{ card.sub }}
                </div>
            </RouterLink>
        </div>

        <!-- ── ALERT ────────────────────────────────────────── -->
        <transition name="fade">
            <div v-if="alertMsg" class="mb-5 p-4 rounded-xl border flex items-center gap-3 text-sm" :style="alertType === 'success'
                ? 'background:#052e16;border-color:#16a34a40;color:#4ade80;'
                : 'background:#1a0505;border-color:#dc262640;color:#f87171;'">
                <svg v-if="alertType === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <span style="font-family:system-ui;">{{ alertMsg }}</span>
            </div>
        </transition>

        <!-- ── USERS TABLE CARD ─────────────────────────────────────── -->
        <div class="rounded-2xl border overflow-hidden" style="background:#120E1C;border-color:#3B2A5A;">

            <!-- Card header -->
            <div class="px-6 py-5 border-b flex items-center justify-between flex-wrap gap-3"
                style="border-color:#241730;">
                <div>
                    <h2 class="font-bold text-white text-lg" style="font-family:'Georgia',serif;">
                        User Management
                    </h2>
                    <p class="text-xs mt-0.5" style="color:#475569;font-family:system-ui;">
                        {{ filteredUsers.length }} user{{ filteredUsers.length !== 1 ? 's' : '' }} found
                    </p>
                </div>
                <button @click="openAddUser()" class="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold
                   rounded-xl transition-all hover:scale-105"
                    style="background:#8B5CF6;box-shadow:0 0 16px #8B5CF635;font-family:system-ui;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add User
                </button>
            </div>

            <!-- Filters -->
            <div class="px-6 py-4 border-b flex flex-wrap gap-3 items-center" style="border-color:#241730;">
                <div class="relative flex-1 min-w-48">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14"
                        height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input v-model="search" @input="filterUsers()" type="text"
                        placeholder="Search by name or email..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                        style="background:#0A0610;border:1px solid #3B2A5A;color:#C9B9E8;font-family:system-ui;"
                        onfocus="this.style.borderColor='#8B5CF6'" onblur="this.style.borderColor='#3B2A5A'" />
                </div>
                <select v-model="filterRole" @change="filterUsers()"
                    class="px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                    style="background:#0A0610;border:1px solid #3B2A5A;color:#C9B9E8;font-family:system-ui;">
                    <option value="">All roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <select v-model="filterStatus" @change="filterUsers()"
                    class="px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                    style="background:#0A0610;border:1px solid #3B2A5A;color:#C9B9E8;font-family:system-ui;">
                    <option value="">All status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <!-- Clear filters -->
                <button v-if="search || filterRole || filterStatus" @click="clearFilters()"
                    class="px-4 py-2.5 rounded-xl text-xs font-medium border transition-colors hover:bg-white/5"
                    style="border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                    Clear
                </button>
            </div>

            <!-- Table -->
            <div class="sm:hidden px-4 py-4 space-y-3">
                <div v-for="u in filteredUsers" :key="`mobile-${u.id}`" class="rounded-2xl border p-4"
                    style="background:#0A0610;border-color:#3B2A5A;">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                {{ initials(u.name) }}
                            </div>
                            <div class="min-w-0">
                                <div class="font-semibold text-white text-sm truncate" style="font-family:system-ui;">
                                    {{ u.name }}
                                </div>
                                <div class="text-xs break-all mt-1" style="color:#C9B9E8;font-family:system-ui;">
                                    {{ u.email }}
                                </div>
                            </div>
                        </div>
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0"
                            :style="u.role === 'admin'
                                ? 'background:#dc262615;color:#f87171;border:1px solid #dc262630;'
                                : 'background:#8B5CF615;color:#C084FC;border:1px solid #8B5CF630;'"
                            style="font-family:system-ui;">
                                {{ u.role }}
                            </span>
                        </div>

                        <div class="grid grid-cols-2 gap-3 mb-4">
                            <div class="rounded-xl border px-3 py-2.5" style="border-color:#241730;background:#120E1C;">
                                <div class="text-[10px] font-semibold uppercase tracking-[0.18em]"
                                    style="color:#475569;font-family:system-ui;">
                                    Status
                                </div>
                                <div class="flex items-center gap-2 mt-2">
                                    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="u.status === 'active'
                                        ? 'background:#4ade80;box-shadow:0 0 6px #4ade80;'
                                        : 'background:#475569;'">
                                    </span>
                                    <span class="text-xs font-medium capitalize"
                                        :style="u.status === 'active' ? 'color:#4ade80;' : 'color:#94a3b8;'"
                                        style="font-family:system-ui;">
                                        {{ u.status }}
                                    </span>
                                </div>
                            </div>
                            <div class="rounded-xl border px-3 py-2.5" style="border-color:#241730;background:#120E1C;">
                                <div class="text-[10px] font-semibold uppercase tracking-[0.18em]"
                                    style="color:#475569;font-family:system-ui;">
                                    Joined
                                </div>
                                <div class="text-xs mt-2" style="color:#C9B9E8;font-family:system-ui;">
                                    {{ formatDate(u.created_at) }}
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <button @click="openEdit(u)" class="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs
                             border transition-all hover:scale-[1.01]"
                                style="border-color:#3B2A5A;color:#C9B9E8;background:#120E1C;font-family:system-ui;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Edit User
                            </button>
                            <button @click="toggleStatus(u)" class="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs
                             border transition-all hover:scale-[1.01]" :style="u.status === 'active'
                                ? 'border-color:#dc262630;color:#f87171;background:#dc262610;font-family:system-ui;'
                                : 'border-color:#16a34a30;color:#4ade80;background:#16a34a10;font-family:system-ui;'">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2.5">
                                    <path v-if="u.status === 'active'" d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                                    <path v-else d="M5 3l14 9-14 9V3z" />
                                </svg>
                                {{ u.status === 'active' ? 'Disable User' : 'Enable User' }}
                            </button>
                            <button v-if="u.role !== 'admin'" @click="deleteUser(u)" class="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs
                             border transition-all hover:scale-[1.01]"
                                style="border-color:#dc262630;color:#f87171;background:#dc262610;font-family:system-ui;"
                                onmouseover="this.style.background='#dc262625'"
                                onmouseout="this.style.background='#dc262610'">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                </svg>
                                Delete User
                            </button>
                        </div>
                    </div>

                    <div v-if="filteredUsers.length === 0" class="text-center py-12">
                        <svg class="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none"
                            stroke="#3B2A5A" stroke-width="1">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <p class="text-sm font-medium text-white mb-1" style="font-family:system-ui;">
                            No users found
                        </p>
                        <p class="text-xs" style="color:#475569;font-family:system-ui;">
                            Try adjusting your filters.
                        </p>
                    </div>
                </div>

                <div class="hidden sm:block overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr style="border-bottom:1px solid #241730;">
                                <th class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">User</th>
                                <th class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Email</th>
                                <th class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Role</th>
                                <th class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Status</th>
                                <th class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Joined</th>
                                <th class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="u in filteredUsers" :key="u.id" class="group transition-colors cursor-default"
                                style="border-bottom:1px solid #241730;" onmouseover="this.style.background='#180F28'"
                                onmouseout="this.style.background='transparent'">

                                <!-- User -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-full flex items-center justify-center
                                text-xs font-bold text-white flex-shrink-0"
                                            style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                            {{ initials(u.name) }}
                                        </div>
                                        <div>
                                            <div class="font-semibold text-white text-sm"
                                                style="font-family:system-ui;">{{ u.name }}</div>
                                        </div>
                                    </div>
                                </td>

                                <!-- Email -->
                                <td class="px-6 py-4 text-sm" style="color:#C9B9E8;font-family:system-ui;">
                                    {{ u.email }}
                                </td>

                                <!-- Role -->
                                <td class="px-6 py-4">
                                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :style="u.role === 'admin'
                                        ? 'background:#dc262615;color:#f87171;border:1px solid #dc262630;'
                                        : 'background:#8B5CF615;color:#C084FC;border:1px solid #8B5CF630;'"
                                        style="font-family:system-ui;">
                                        {{ u.role }}
                                    </span>
                                </td>

                                <!-- Status -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="u.status === 'active'
                                            ? 'background:#4ade80;box-shadow:0 0 6px #4ade80;'
                                            : 'background:#475569;'">
                                        </span>
                                        <span class="text-xs font-medium"
                                            :style="u.status === 'active' ? 'color:#4ade80;' : 'color:#475569;'"
                                            style="font-family:system-ui;">
                                            {{ u.status }}
                                        </span>
                                    </div>
                                </td>

                                <!-- Joined -->
                                <td class="px-6 py-4 text-xs" style="color:#475569;font-family:system-ui;">
                                    {{ formatDate(u.created_at) }}
                                </td>

                                <!-- Actions -->
                                <td class="px-6 py-4">
                                    <div class="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <button @click="openEdit(u)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                            border transition-all hover:scale-105"
                                            style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button @click="toggleStatus(u)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                            border transition-all hover:scale-105" :style="u.status === 'active'
                                                ? 'border-color:#dc262630;color:#f87171;background:#dc262610;font-family:system-ui;'
                                                : 'border-color:#16a34a30;color:#4ade80;background:#16a34a10;font-family:system-ui;'">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <path v-if="u.status === 'active'"
                                                    d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                                                <path v-else d="M5 3l14 9-14 9V3z" />
                                            </svg>
                                            {{ u.status === 'active' ? 'Disable' : 'Enable' }}
                                        </button>
                                        <button v-if="u.role !== 'admin'" @click="deleteUser(u)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                            border transition-all hover:scale-105"
                                                style="border-color:#dc262630;color:#f87171;background:#dc262610;font-family:system-ui;"
                                                onmouseover="this.style.background='#dc262625'"
                                                onmouseout="this.style.background='#dc262610'">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredUsers.length === 0">
                                <td colspan="6" class="text-center py-16">
                                    <svg class="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none"
                                        stroke="#3B2A5A" stroke-width="1">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                    <p class="text-sm font-medium text-white mb-1" style="font-family:system-ui;">
                                        No users found
                                    </p>
                                    <p class="text-xs" style="color:#475569;font-family:system-ui;">
                                        Try adjusting your filters.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// ── State ──────────────────────────────────────────────────
const users = ref([])
const search = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const alertMsg = ref('')
const alertType = ref('success')

const statsCards = computed(() => [
    { type: 'users', label: 'Total Users', value: users.value.length, glow: '#8B5CF6', color: '#C084FC' },
    { type: 'active', label: 'Active', value: users.value.filter(u => u.status === 'active').length, glow: '#10B981', color: '#4ADE80' },
    { type: 'admins', label: 'Admins', value: users.value.filter(u => u.role === 'admin').length, glow: '#EF4444', color: '#F87171' },
    { type: 'inactive', label: 'Inactive', value: users.value.filter(u => u.status === 'inactive').length, glow: '#64748B', color: '#94A3B8' },
])

const navCards = [
    { to: '/admin/posts', label: 'Blog Posts', sub: 'Manage content', type: 'posts', color: '#8B5CF6' },
    { to: '/admin/projects', label: 'Projects', sub: 'Showcase work', type: 'projects', color: '#06B6D4' },
    { to: '/admin/skills', label: 'Skills', sub: 'Update stack', type: 'skills', color: '#F59E0B' },
    { to: '/admin/services', label: 'Services', sub: 'Offerings', type: 'services', color: '#EC4899' },
    { to: '/admin/comments', label: 'Comments', sub: 'Engagement', type: 'comments', color: '#10B981' },
]

// ── Computed ────────────────────────────────────────────────
const filteredUsers = computed(() => {
    return users.value.filter(u => {
        const matchSearch = !search.value ||
            u.name.toLowerCase().includes(search.value.toLowerCase()) ||
            u.email.toLowerCase().includes(search.value.toLowerCase())
        const matchRole = !filterRole.value || u.role === filterRole.value
        const matchStatus = !filterStatus.value || u.status === filterStatus.value
        return matchSearch && matchRole && matchStatus
    })
})

// ── Methods ─────────────────────────────────────────────────
function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(date))
}

function initials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

async function fetchUsers() {
    try {
        const { data } = await api.get('/admin/users')
        users.value = data.data || []
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to fetch users', 'error')
    }
}

function clearFilters() {
    search.value = ''; filterRole.value = ''; filterStatus.value = ''
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg
    alertType.value = type
    setTimeout(() => { alertMsg.value = '' }, 3000)
}

// User Management (Simplified for Dashboard)
const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({ name: '', email: '', role: 'user', status: 'active' })

function openAddUser() {
    Object.assign(form, { name: '', email: '', role: 'user', status: 'active' })
    modal.editing = false; modal.editId = null; modal.show = true
}

function openEdit(u) {
    Object.assign(form, { ...u })
    modal.editing = true; modal.editId = u.id; modal.show = true
}

async function toggleStatus(u) {
    try {
        const newStatus = u.status === 'active' ? 'inactive' : 'active'
        await api.patch(`/admin/users/${u.id}`, { status: newStatus })
        await fetchUsers()
        showAlert('User status updated!', 'success')
    } catch (err) {
        showAlert(err.response?.data?.message || 'Update failed', 'error')
    }
}

async function deleteUser(u) {
    if (!confirm(`Delete user ${u.name}?`)) return
    try {
        await api.delete(`/admin/users/${u.id}`)
        await fetchUsers()
        showAlert('User deleted!', 'success')
    } catch (err) {
        showAlert(err.response?.data?.message || 'Delete failed', 'error')
    }
}

onMounted(fetchUsers)
</script>
