<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <!-- ── PAGE HEADER ──────────────────────────────────── -->
        <div class="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div class="min-w-0">
                <p class="text-xs font-semibold uppercase tracking-widest mb-1"
                    style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">Admin Panel</p>
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
                class="rounded-2xl border p-5 relative overflow-hidden transition-all hover:-translate-y-0.5"
                style="background:#120E1C;border-color:#3B2A5A;">
                <div class="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none" :style="`background:radial-gradient(circle,${stat.glow}20 0%,transparent 70%);
                transform:translate(30%,-30%);`"></div>
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        :style="`background:${stat.glow}15;border:1px solid ${stat.glow}25;`">
                        <span style="font-size:16px;">{{ stat.icon }}</span>
                    </div>
                    <span class="text-xs font-semibold uppercase tracking-wider"
                        style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
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
            <RouterLink v-for="card in navCards" :key="card.to" :to="card.to" class="rounded-2xl border p-5 text-center transition-all duration-300
             hover:-translate-y-1 no-underline group relative overflow-hidden"
                style="background:#120E1C;border-color:#3B2A5A;"
                onmouseover="this.style.borderColor='#8B5CF6';this.style.boxShadow='0 0 24px #8B5CF618'"
                onmouseout="this.style.borderColor='#3B2A5A';this.style.boxShadow='none'">
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style="background:radial-gradient(ellipse 120px 80px at 50% 50%,#8B5CF608,transparent 70%);">
                </div>
                <div class="text-3xl mb-3 relative z-10">{{ card.icon }}</div>
                <div class="font-semibold text-white text-sm mb-1 relative z-10
                  group-hover:text-violet-400 transition-colors" style="font-family:'Georgia',serif;">
                    {{ card.label }}
                </div>
                <div class="text-xs relative z-10" style="color:#475569;font-family:system-ui;">
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
    </div>
</template>
