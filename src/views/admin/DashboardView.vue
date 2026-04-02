<!-- src/views/admin/DashboardView.vue -->
<template>
    <div style="background:#05080F;min-height:100vh;">
        <div class="max-w-7xl mx-auto px-6 py-8">

            <!-- ── PAGE HEADER ──────────────────────────────────── -->
            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest mb-1"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">Admin Panel</p>
                    <h1 class="font-bold text-white text-2xl" style="font-family:'Georgia',serif;">
                        Dashboard
                    </h1>
                    <p class="text-sm mt-1" style="color:#A8C4E8;font-family:system-ui;">
                        Welcome back, <span class="text-white font-medium">{{ auth.user?.name }}</span>
                    </p>
                </div>
                <div class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm"
                    style="background:#0D1220;border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                    <span class="w-2 h-2 rounded-full bg-green-400" style="box-shadow:0 0 6px #4ade80;"></span>
                    {{ formatDate(new Date()) }}
                </div>
            </div>

            <!-- ── STATS ROW ────────────────────────────────────── -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div v-for="stat in statsCards" :key="stat.label"
                    class="rounded-2xl border p-5 relative overflow-hidden transition-all hover:-translate-y-0.5"
                    style="background:#0D1220;border-color:#1e3a5f;">
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
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <RouterLink v-for="card in navCards" :key="card.to" :to="card.to" class="rounded-2xl border p-5 text-center transition-all duration-300
                 hover:-translate-y-1 no-underline group relative overflow-hidden"
                    style="background:#0D1220;border-color:#1e3a5f;"
                    onmouseover="this.style.borderColor='#3B82F6';this.style.boxShadow='0 0 24px #3B82F618'"
                    onmouseout="this.style.borderColor='#1e3a5f';this.style.boxShadow='none'">
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style="background:radial-gradient(ellipse 120px 80px at 50% 50%,#3B82F608,transparent 70%);">
                    </div>
                    <div class="text-3xl mb-3 relative z-10">{{ card.icon }}</div>
                    <div class="font-semibold text-white text-sm mb-1 relative z-10
                      group-hover:text-blue-400 transition-colors" style="font-family:'Georgia',serif;">
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

            <!-- ── USERS TABLE CARD ─────────────────────────────── -->
            <div class="rounded-2xl border overflow-hidden" style="background:#0D1220;border-color:#1e3a5f;">

                <!-- Card header -->
                <div class="px-6 py-5 border-b flex items-center justify-between flex-wrap gap-3"
                    style="border-color:#0f1f38;">
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
                        style="background:#3B82F6;box-shadow:0 0 16px #3B82F635;font-family:system-ui;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add User
                    </button>
                </div>

                <!-- Filters -->
                <div class="px-6 py-4 border-b flex flex-wrap gap-3 items-center" style="border-color:#0f1f38;">
                    <div class="relative flex-1 min-w-48">
                        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="14"
                            height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input v-model="search" @input="filterUsers()" type="text"
                            placeholder="Search by name or email..."
                            class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                            style="background:#05080F;border:1px solid #1e3a5f;color:#A8C4E8;font-family:system-ui;"
                            onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                    </div>
                    <select v-model="filterRole" @change="filterUsers()"
                        class="px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                        style="background:#05080F;border:1px solid #1e3a5f;color:#A8C4E8;font-family:system-ui;">
                        <option value="">All roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select v-model="filterStatus" @change="filterUsers()"
                        class="px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                        style="background:#05080F;border:1px solid #1e3a5f;color:#A8C4E8;font-family:system-ui;">
                        <option value="">All status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <!-- Clear filters -->
                    <button v-if="search || filterRole || filterStatus" @click="clearFilters()"
                        class="px-4 py-2.5 rounded-xl text-xs font-medium border transition-colors hover:bg-white/5"
                        style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                        Clear
                    </button>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr style="border-bottom:1px solid #0f1f38;">
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
                                style="border-bottom:1px solid #0f1f38;" onmouseover="this.style.background='#0a1628'"
                                onmouseout="this.style.background='transparent'">

                                <!-- User -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-full flex items-center justify-center
                                text-xs font-bold text-white flex-shrink-0"
                                            style="background:linear-gradient(135deg,#1e3a5f,#2563EB);">
                                            {{ initials(u.name) }}
                                        </div>
                                        <div>
                                            <div class="font-semibold text-white text-sm"
                                                style="font-family:system-ui;">{{ u.name }}</div>
                                        </div>
                                    </div>
                                </td>

                                <!-- Email -->
                                <td class="px-6 py-4 text-sm" style="color:#A8C4E8;font-family:system-ui;">
                                    {{ u.email }}
                                </td>

                                <!-- Role -->
                                <td class="px-6 py-4">
                                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :style="u.role === 'admin'
                                        ? 'background:#dc262615;color:#f87171;border:1px solid #dc262630;'
                                        : 'background:#3B82F615;color:#60A5FA;border:1px solid #3B82F630;'"
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
                                            style="border-color:#1e3a5f;color:#A8C4E8;background:#05080F;font-family:system-ui;">
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

                            <!-- Empty state -->
                            <tr v-if="filteredUsers.length === 0">
                                <td colspan="6" class="text-center py-16">
                                    <svg class="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none"
                                        stroke="#1e3a5f" stroke-width="1">
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

                <!-- Pagination -->
                <div v-if="pagination.last_page > 1"
                    class="flex items-center justify-between px-6 py-4 border-t flex-wrap gap-3"
                    style="border-color:#0f1f38;">
                    <span class="text-xs" style="color:#475569;font-family:system-ui;">
                        Page {{ pagination.current_page }} of {{ pagination.last_page }}
                    </span>
                    <div class="flex gap-2">
                        <button :disabled="pagination.current_page === 1"
                            @click="fetchUsers(pagination.current_page - 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
                     disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#1e3a5f;color:#A8C4E8;background:#05080F;font-family:system-ui;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Prev
                        </button>
                        <button :disabled="pagination.current_page === pagination.last_page"
                            @click="fetchUsers(pagination.current_page + 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
                     disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#1e3a5f;color:#A8C4E8;background:#05080F;font-family:system-ui;">
                            Next
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ── EDIT USER MODAL ──────────────────────────────────── -->
        <transition name="modal">
            <div v-if="editModal.show" class="fixed inset-0 flex items-center justify-center z-50 px-4"
                style="background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);" @click.self="editModal.show = false">
                <div class="rounded-2xl border w-full max-w-md shadow-2xl"
                    style="background:#0D1220;border-color:#1e3a5f;">

                    <!-- Modal header -->
                    <div class="flex items-center justify-between px-6 py-5 border-b" style="border-color:#0f1f38;">
                        <div>
                            <h3 class="font-bold text-white text-lg" style="font-family:'Georgia',serif;">
                                Edit User
                            </h3>
                            <p class="text-xs mt-0.5" style="color:#475569;font-family:system-ui;">
                                Update user information
                            </p>
                        </div>
                        <button @click="editModal.show = false"
                            class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                            style="color:#475569;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <!-- Modal body -->
                    <div class="p-6 space-y-4">
                        <div v-for="field in editFields" :key="field.key">
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                {{ field.label }}
                            </label>
                            <input v-if="field.type !== 'select'" v-model="editModal.form[field.key]" :type="field.type"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                            <select v-else v-model="editModal.form[field.key]"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;">
                                <option v-for="opt in field.options" :key="opt.value" :value="opt.value"
                                    style="background:#0D1220;">{{ opt.label }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="flex gap-3 px-6 pb-6">
                        <button @click="saveEdit()" class="flex-1 py-3 text-white font-semibold rounded-xl text-sm
                     transition-all hover:scale-105"
                            style="background:#3B82F6;box-shadow:0 0 16px #3B82F635;font-family:system-ui;">
                            Save Changes
                        </button>
                        <button @click="editModal.show = false"
                            class="flex-1 py-3 rounded-xl text-sm border transition-colors hover:bg-white/5"
                            style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <!-- ── ADD USER MODAL ───────────────────────────────────── -->
        <transition name="modal">
            <div v-if="addModal.show" class="fixed inset-0 flex items-center justify-center z-50 px-4"
                style="background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);" @click.self="addModal.show = false">
                <div class="rounded-2xl border w-full max-w-md shadow-2xl"
                    style="background:#0D1220;border-color:#1e3a5f;">

                    <!-- Header -->
                    <div class="flex items-center justify-between px-6 py-5 border-b" style="border-color:#0f1f38;">
                        <div>
                            <h3 class="font-bold text-white text-lg" style="font-family:'Georgia',serif;">
                                Add New User
                            </h3>
                            <p class="text-xs mt-0.5" style="color:#475569;font-family:system-ui;">
                                Create a new account
                            </p>
                        </div>
                        <button @click="addModal.show = false"
                            class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                            style="color:#475569;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <!-- Body -->
                    <div class="p-6 space-y-4">
                        <div v-for="field in addFields" :key="field.key">
                            <label class="block text-xs font-semibold uppercase tracking-wider mb-2"
                                style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                {{ field.label }}
                            </label>
                            <input v-if="field.type !== 'select'" v-model="addModal.form[field.key]" :type="field.type"
                                :placeholder="field.placeholder"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;"
                                onfocus="this.style.borderColor='#3B82F6'" onblur="this.style.borderColor='#1e3a5f'" />
                            <select v-else v-model="addModal.form[field.key]"
                                class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                style="background:#05080F;border:1px solid #1e3a5f;color:#fff;font-family:system-ui;">
                                <option v-for="opt in field.options" :key="opt.value" :value="opt.value"
                                    style="background:#0D1220;">{{ opt.label }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="flex gap-3 px-6 pb-6">
                        <button @click="createUser()" class="flex-1 py-3 text-white font-semibold rounded-xl text-sm
                     transition-all hover:scale-105"
                            style="background:#3B82F6;box-shadow:0 0 16px #3B82F635;font-family:system-ui;">
                            Create User
                        </button>
                        <button @click="addModal.show = false"
                            class="flex-1 py-3 rounded-xl text-sm border transition-colors hover:bg-white/5"
                            style="border-color:#1e3a5f;color:#A8C4E8;font-family:system-ui;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition: all .25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(.96) translateY(8px);
}
</style>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const users = ref([])
const search = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const alertMsg = ref('')
const alertType = ref('success')
const pagination = reactive({ current_page: 1, last_page: 1 })

// ── Nav cards ─────────────────────────────────────────────
const navCards = [
    { to: '/admin/skills', icon: '⚡', label: 'Skills', sub: 'Manage skills' },
    { to: '/admin/projects', icon: '💻', label: 'Projects', sub: 'Portfolio items' },
    { to: '/admin/posts', icon: '📝', label: 'Blog', sub: 'Write & publish' },
    { to: '/admin/comments', icon: '💬', label: 'Comments', sub: 'Approve & manage' },
    { to: '/admin/messages', icon: '✉️', label: 'Messages', sub: 'Contact inbox' },
]

// ── Stats ─────────────────────────────────────────────────
const statsCards = computed(() => [
    {
        label: 'Total Users', icon: '👥',
        value: users.value.length,
        color: '#fff', glow: '#3B82F6',
    },
    {
        label: 'Active', icon: '✅',
        value: users.value.filter(u => u.status === 'active').length,
        color: '#4ade80', glow: '#4ade80',
    },
    {
        label: 'Inactive', icon: '⏸',
        value: users.value.filter(u => u.status === 'inactive').length,
        color: '#f87171', glow: '#f87171',
    },
    {
        label: 'Admins', icon: '🛡',
        value: users.value.filter(u => u.role === 'admin').length,
        color: '#60A5FA', glow: '#3B82F6',
    },
])

// ── Filtered users ────────────────────────────────────────
const filteredUsers = computed(() =>
    users.value.filter(u => {
        const q = search.value.toLowerCase()
        return (
            (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
            (!filterRole.value || u.role === filterRole.value) &&
            (!filterStatus.value || u.status === filterStatus.value)
        )
    })
)

// ── Edit modal ────────────────────────────────────────────
const editModal = reactive({
    show: false, userId: null,
    form: { name: '', email: '', role: 'user', status: 'active' },
})
const editFields = [
    { key: 'name', label: 'Full name', type: 'text', placeholder: 'Full name' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
    {
        key: 'role', label: 'Role', type: 'select',
        options: [{ value: 'user', label: 'User' }, { value: 'admin', label: 'Admin' }]
    },
    {
        key: 'status', label: 'Status', type: 'select',
        options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]
    },
]

// ── Add modal ─────────────────────────────────────────────
const addModal = reactive({
    show: false,
    form: { name: '', email: '', role: 'user', password: '' },
})
const addFields = [
    { key: 'name', label: 'Full name', type: 'text', placeholder: 'Full name' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
    {
        key: 'role', label: 'Role', type: 'select',
        options: [{ value: 'user', label: 'User' }, { value: 'admin', label: 'Admin' }]
    },
    { key: 'password', label: 'Password', type: 'password', placeholder: 'Min 8 characters' },
]

onMounted(fetchUsers)

async function fetchUsers(page = 1) {
    try {
        const { data } = await api.get('/admin/users', { params: { page } })
        users.value = data.data.data
        pagination.current_page = data.data.current_page
        pagination.last_page = data.data.last_page
    } catch {
        showAlert('Failed to load users.', 'error')
    }
}

function filterUsers() { /* filteredUsers computed is reactive */ }
function clearFilters() { search.value = ''; filterRole.value = ''; filterStatus.value = '' }

function initials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function openEdit(u) {
    editModal.userId = u.id
    Object.assign(editModal.form, { name: u.name, email: u.email, role: u.role, status: u.status })
    editModal.show = true
}

async function saveEdit() {
    try {
        await api.put(`/admin/users/${editModal.userId}`, editModal.form)
        editModal.show = false
        showAlert('User updated successfully.', 'success')
        fetchUsers(pagination.current_page)
    } catch (err) {
        showAlert(err.response?.data?.message || 'Update failed.', 'error')
    }
}

async function toggleStatus(u) {
    try {
        await api.patch(`/admin/users/${u.id}/status`)
        showAlert(`${u.name} is now ${u.status === 'active' ? 'inactive' : 'active'}.`, 'success')
        fetchUsers(pagination.current_page)
    } catch {
        showAlert('Failed to update status.', 'error')
    }
}

async function deleteUser(u) {
    if (!confirm(`Delete ${u.name}? This cannot be undone.`)) return
    try {
        await api.delete(`/admin/users/${u.id}`)
        showAlert(`${u.name} deleted.`, 'success')
        fetchUsers(pagination.current_page)
    } catch {
        showAlert('Failed to delete user.', 'error')
    }
}

function openAddUser() {
    Object.assign(addModal.form, { name: '', email: '', role: 'user', password: '' })
    addModal.show = true
}

async function createUser() {
    try {
        await api.post('/auth/register', {
            ...addModal.form,
            password_confirmation: addModal.form.password,
        })
        addModal.show = false
        showAlert('User created successfully.', 'success')
        fetchUsers()
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to create user.', 'error')
    }
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg
    alertType.value = type
    setTimeout(() => alertMsg.value = '', 3500)
}
</script>
