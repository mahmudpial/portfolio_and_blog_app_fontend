<template>
    <div class="max-w-7xl mx-auto px-6 py-10">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-violet-400" style="box-shadow:0 0 10px #8B5CF6;"></span>
                    <span class="text-xs font-bold uppercase tracking-widest text-violet-400">CMS &amp; Offerings</span>
                </div>
                <h1 class="font-serif text-3xl font-bold text-white tracking-tight">
                    Services <span style="color:#8B5CF6;">Management</span>
                </h1>
                <p class="text-sm opacity-60 font-medium">
                    Manage and customize all content, workflow steps, deliverables, tech stacks &amp; pricing for all service pages.
                </p>
            </div>
            <button @click="openAdd" class="group relative flex items-center gap-3 px-6 py-3 text-white text-sm font-bold
                 rounded-2xl transition-all active:scale-95 overflow-hidden border-0 cursor-pointer"
                    style="background:#8B5CF6;box-shadow:0 10px 20px -5px #8B5CF640;">
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <svg class="relative z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="3">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span class="relative z-10">Add New Service</span>
            </button>
        </div>

        <!-- Alert System -->
        <transition name="fade">
            <div v-if="alertMsg" class="mb-8 p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm font-medium"
                :style="alertType === 'success'
                    ? 'background:rgba(16, 185, 129, 0.1);border-color:#10b981;color:#34d399;'
                    : 'background:rgba(239, 68, 68, 0.1);border-color:#ef4444;color:#f87171;'">
                <div class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :style="alertType === 'success' ? 'background:#10b981' : 'background:#ef4444'">
                        <svg class="text-white" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <span>{{ alertMsg }}</span>
                </div>
                <button @click="alertMsg = ''" class="text-xs opacity-60 hover:opacity-100 font-bold bg-transparent border-0 cursor-pointer text-current">✕</button>
            </div>
        </transition>

        <!-- Main Services Grid/Table -->
        <div class="rounded-3xl border overflow-hidden backdrop-blur-xl transition-all" style="background:rgba(25, 18, 38, 0.6);border-color:rgba(139, 92, 246, 0.2);">
            <div class="px-8 py-6 border-b flex items-center justify-between flex-wrap gap-4" style="border-color:rgba(139, 92, 246, 0.1);">
                <div>
                    <h2 class="font-serif text-xl font-semibold text-white">Services Directory &amp; CMS</h2>
                    <p class="text-xs opacity-50 mt-0.5">Click edit to manage full page details (Deliverables, Workflow, Tech Stack, Pricing, etc.)</p>
                </div>
                <div class="text-xs font-medium opacity-40 uppercase tracking-widest">Sorted by Order</div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-white/5">
                        <tr style="border-bottom:1px solid rgba(139, 92, 246, 0.1);">
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Service &amp; Description</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Icon &amp; Meta</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Order</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y" style="border-color:rgba(139, 92, 246, 0.05);">
                        <tr v-for="service in paginatedServices" :key="service.id" class="group transition-all hover:bg-white/[0.02]">
                            <td class="px-8 py-5">
                                <div class="flex items-start gap-4">
                                    <div class="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-purple-500/50 transition-all flex items-center justify-center shrink-0 text-violet-400"
                                        style="background:linear-gradient(135deg,#180F28,#3B2A5A);">
                                        <ServiceIcon :name="service.icon || 'code'" :size="20" />
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-white text-sm group-hover:text-purple-400 transition-colors" style="font-family:system-ui;">
                                                {{ service.title || service.name }}
                                            </span>
                                            <a :href="`/services/${service.id}`" target="_blank"
                                                class="text-[11px] px-2 py-0.5 rounded-full border text-violet-300 hover:text-white transition-all flex items-center gap-1"
                                                style="background:rgba(139,92,246,0.15);border-color:rgba(139,92,246,0.3);"
                                                title="Open public service page">
                                                <span>Live</span>
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </div>
                                        <p v-if="service.description" class="text-xs text-white/60 mt-1 max-w-lg line-clamp-2 leading-relaxed" style="font-family:system-ui;">
                                            {{ service.description }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-5">
                                <div class="flex flex-col gap-1">
                                    <span class="text-xs px-3 py-1 rounded-xl border inline-flex items-center gap-2 font-mono w-fit"
                                        style="background:rgba(139, 92, 246, 0.1);border-color:rgba(139, 92, 246, 0.2);color:#C084FC;">
                                        <ServiceIcon :name="service.icon || 'code'" :size="14" />
                                        <span>{{ service.icon || 'code' }}</span>
                                    </span>
                                </div>
                            </td>
                            <td class="px-8 py-5">
                                <span class="text-xs font-medium opacity-60" style="font-family:system-ui;">
                                    #{{ service.order || 0 }}
                                </span>
                            </td>
                            <td class="px-8 py-5 text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <button @click="openEdit(service)" class="p-2.5 rounded-xl border text-violet-300 hover:text-white hover:bg-violet-600/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
                                        style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.1);" title="Edit Service CMS Details">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        <span>Edit CMS</span>
                                    </button>
                                    <button @click="deleteService(service)" class="p-2.5 rounded-xl border text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                        style="border-color:rgba(239,68,68,0.2);" title="Delete Service">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="services.length === 0">
                            <td colspan="4" class="text-center py-24">
                                <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-violet-400">
                                    <ServiceIcon name="code" :size="32" />
                                </div>
                                <p class="text-white font-bold text-lg mb-1">No services listed</p>
                                <p class="text-sm opacity-40">Start documenting your professional services.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination Controls (4 per page) -->
            <div v-if="totalPages > 1"
                class="flex items-center justify-between px-8 py-5 border-t flex-wrap gap-4"
                style="border-color:rgba(139, 92, 246, 0.1);background:rgba(18, 14, 28, 0.4);">
                <span class="text-xs" style="color:#94A3B8;font-family:system-ui;">
                    Showing {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, services.length) }} of {{ services.length }} services
                </span>
                <div class="flex items-center gap-2">
                    <button :disabled="currentPage === 1"
                        @click="goToPage(currentPage - 1)"
                        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                        style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Prev
                    </button>

                    <div class="flex items-center gap-1.5">
                        <button v-for="page in totalPages" :key="page"
                            @click="goToPage(page)"
                            class="w-8 h-8 rounded-xl text-xs font-semibold transition-all flex items-center justify-center"
                            :style="currentPage === page
                                ? 'background:#8B5CF6;color:#fff;box-shadow:0 0 12px #8B5CF640;'
                                : 'background:#0A0610;border:1px solid #3B2A5A;color:#C9B9E8;'">
                            {{ page }}
                        </button>
                    </div>

                    <button :disabled="currentPage === totalPages"
                        @click="goToPage(currentPage + 1)"
                        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                        style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                        Next
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════
             COMPREHENSIVE FULL-CONTROL SERVICE CMS MODAL
        ══════════════════════════════════════════════════════════ -->
        <transition name="modal">
            <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 px-4 py-6"
                style="background:rgba(0,0,0,0.85);backdrop-filter:blur(14px);" @click.self="modal.show = false">
                <div class="rounded-3xl border w-full max-w-4xl shadow-2xl transition-all animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
                    style="background:#120E1C;border-color:rgba(139, 92, 246, 0.35);">
                    
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between px-8 py-5 border-b sticky top-0 z-10 shrink-0"
                        style="border-color:rgba(139, 92, 246, 0.15);background:#120E1C;">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-violet-400"
                                style="background:#8B5CF620;border:1px solid #8B5CF640;">
                                <ServiceIcon :name="form.icon || 'code'" :size="20" />
                            </div>
                            <div>
                                <h3 class="font-serif text-xl font-bold text-white">
                                    {{ modal.editing ? `Edit Service CMS: ${form.title || 'Service'}` : 'Create New Service' }}
                                </h3>
                                <p class="text-xs opacity-60" style="color:#C9B9E8;">Full CMS control over hero, workflow steps, tech stack, pricing &amp; deliverables</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-3">
                            <a v-if="modal.editing && modal.editId" :href="`/services/${modal.editId}`" target="_blank"
                                class="px-3.5 py-1.5 rounded-xl border text-xs font-semibold text-violet-300 hover:text-white transition-all flex items-center gap-1.5"
                                style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.1);">
                                <span>Preview Page</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                            <button @click="modal.show = false"
                                class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40 hover:text-white border-0 bg-transparent cursor-pointer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Editor Sub-Tabs -->
                    <div class="flex gap-2 px-8 pt-4 pb-2 border-b bg-white/[0.02] overflow-x-auto scrollbar-none shrink-0"
                        style="border-color:rgba(139, 92, 246, 0.1);">
                        <button v-for="st in editorTabs" :key="st.id" @click="activeModalTab = st.id"
                            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border-0"
                            :class="activeModalTab === st.id ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' : 'text-white/60 hover:text-white hover:bg-white/5'">
                            {{ st.label }}
                        </button>
                    </div>

                    <!-- Modal Body / Content Tabs -->
                    <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">

                        <!-- ─── TAB 1: BASIC & HERO INFO ─── -->
                        <div v-show="activeModalTab === 'basic'" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="space-y-1.5 md:col-span-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Service Title / Header Name *
                                    </label>
                                    <input v-model="form.title" type="text" placeholder="e.g. Full-Stack Web Development"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Display Order
                                    </label>
                                    <input v-model="form.order" type="number" placeholder="1"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Service Badge Text
                                    </label>
                                    <input v-model="form.details.badge_text" type="text" placeholder="e.g. Professional Service"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>
                            </div>

                            <!-- Icon Selector -->
                            <div class="space-y-2">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                    Service Icon
                                </label>
                                <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    <button v-for="ico in iconOptions" :key="ico.key" type="button" @click="form.icon = ico.key"
                                        class="p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-medium transition-all cursor-pointer"
                                        :style="form.icon === ico.key ? 'background:#8B5CF630;border-color:#8B5CF6;color:#fff;box-shadow:0 0 10px #8B5CF630;' : 'background:#0A0610;border-color:rgba(139,92,246,0.15);color:#C9B9E8;'">
                                        <ServiceIcon :name="ico.key" :size="20" class="text-violet-400" />
                                        <span class="text-[11px]">{{ ico.label }}</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Short Description / Tagline -->
                            <div class="space-y-1.5">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                    Short Tagline / Hero Description *
                                </label>
                                <textarea v-model="form.description" rows="3" placeholder="A concise summary displayed on the hero section and service cards..."
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border resize-none"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;"></textarea>
                            </div>
                        </div>

                        <!-- ─── TAB 2: PRICING & SIDEBAR CTA ─── -->
                        <div v-show="activeModalTab === 'pricing'" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Estimated Price / Budget Range
                                    </label>
                                    <input v-model="form.details.startingPrice" type="text" placeholder="e.g. $250 - $650"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Estimated Delivery Timeline
                                    </label>
                                    <input v-model="form.details.timeline" type="text" placeholder="e.g. 4 - 8 Days"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Pricing Note / Terms
                                    </label>
                                    <input v-model="form.details.pricing_note" type="text" placeholder="e.g. Custom milestones & flexible payment terms"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Support Guarantee Badge
                                    </label>
                                    <input v-model="form.details.support_guarantee" type="text" placeholder="e.g. 30 Days Free Support"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5 md:col-span-2">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Primary Booking / CTA Button Text
                                    </label>
                                    <input v-model="form.details.cta_button_text" type="text" placeholder="e.g. Get Started with this Service"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Direct Email Inquiry
                                    </label>
                                    <input v-model="form.details.cta_email" type="email" placeholder="e.g. hello@pialcodes.com"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>

                                <div class="space-y-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        LinkedIn Profile URL
                                    </label>
                                    <input v-model="form.details.cta_linkedin" type="text" placeholder="https://www.linkedin.com/in/pial-mahmud/"
                                        class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                        style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;" />
                                </div>
                            </div>
                        </div>

                        <!-- ─── TAB 3: IN-DEPTH OVERVIEW & HIGHLIGHTS ─── -->
                        <div v-show="activeModalTab === 'overview'" class="space-y-6">
                            <div class="space-y-1.5">
                                <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                    Full In-Depth Overview &amp; Value Proposition
                                </label>
                                <textarea v-model="form.details.overview" rows="4" placeholder="Detailed architectural description of what this service offers..."
                                    class="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all border"
                                    style="background:#0A0610;border-color:rgba(139, 92, 246, 0.25);color:#fff;"></textarea>
                            </div>

                            <!-- Highlights List -->
                            <div class="space-y-3 pt-2">
                                <div class="flex items-center justify-between">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Key Highlights &amp; Architectural Features
                                    </label>
                                    <button type="button" @click="addHighlight"
                                        class="px-3 py-1.5 rounded-xl text-xs font-bold text-violet-300 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 cursor-pointer">
                                        + Add Highlight
                                    </button>
                                </div>

                                <div class="space-y-2">
                                    <div v-for="(hl, idx) in form.details.highlights" :key="idx"
                                        class="flex items-center gap-2 p-2 rounded-xl border bg-black/40" style="border-color:rgba(139, 92, 246, 0.2);">
                                        <span class="w-6 h-6 rounded-lg bg-violet-600/20 text-violet-400 text-xs flex items-center justify-center font-mono shrink-0">
                                            {{ idx + 1 }}
                                        </span>
                                        <input v-model="form.details.highlights[idx]" type="text" placeholder="e.g. Robust Laravel 11 Backend & Restful API"
                                            class="flex-1 px-3 py-2 rounded-lg text-xs bg-transparent border-0 text-white focus:outline-none" />
                                        <button type="button" @click="removeHighlight(idx)"
                                            class="w-8 h-8 rounded-lg text-red-400 hover:bg-red-500/20 border-0 bg-transparent flex items-center justify-center cursor-pointer">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ─── TAB 4: DELIVERY WORKFLOW STEPS ─── -->
                        <div v-show="activeModalTab === 'workflow'" class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-white font-bold text-sm">Delivery Workflow Steps</h4>
                                    <p class="text-xs opacity-50">Step-by-step process shown on the service page</p>
                                </div>
                                <button type="button" @click="addWorkflowStep"
                                    class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-violet-300 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 cursor-pointer">
                                    + Add Step
                                </button>
                            </div>

                            <div class="space-y-4">
                                <div v-for="(st, idx) in form.details.workflowSteps" :key="idx"
                                    class="p-4 rounded-2xl border bg-black/40 space-y-3" style="border-color:rgba(139, 92, 246, 0.2);">
                                    <div class="flex items-center justify-between gap-3">
                                        <div class="flex items-center gap-2 flex-1">
                                            <span class="w-7 h-7 rounded-xl bg-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                                                {{ idx + 1 }}
                                            </span>
                                            <input v-model="st.title" type="text" placeholder="Step Title (e.g. 1. Technical Discovery)"
                                                class="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white font-bold focus:outline-none focus:border-violet-500" />
                                        </div>
                                        <button type="button" @click="removeWorkflowStep(idx)"
                                            class="w-8 h-8 rounded-lg text-red-400 hover:bg-red-500/20 border-0 bg-transparent flex items-center justify-center cursor-pointer shrink-0">
                                            ✕
                                        </button>
                                    </div>
                                    <div>
                                        <textarea v-model="st.description" rows="2" placeholder="Step description..."
                                            class="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500 resize-none"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ─── TAB 5: TECH STACK & QUALITY STANDARDS ─── -->
                        <div v-show="activeModalTab === 'tech'" class="space-y-6">
                            <!-- Tech Stack -->
                            <div class="space-y-3">
                                <div class="flex items-center justify-between">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-purple-300">
                                        Tech Stack &amp; Tools Used
                                    </label>
                                    <button type="button" @click="addTech"
                                        class="px-3 py-1.5 rounded-xl text-xs font-bold text-violet-300 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 cursor-pointer">
                                        + Add Tech
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div v-for="(t, idx) in form.details.techStack" :key="idx"
                                        class="p-3 rounded-xl border bg-black/40 flex items-center gap-2" style="border-color:rgba(139, 92, 246, 0.2);">
                                        <div class="flex-1 space-y-1.5">
                                            <input v-model="t.name" type="text" placeholder="Name (e.g. Laravel 11)"
                                                class="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white font-bold focus:outline-none focus:border-violet-500" />
                                            <input v-model="t.role" type="text" placeholder="Role (e.g. Backend API)"
                                                class="w-full px-2.5 py-1.5 rounded-lg text-[11px] bg-white/5 border border-white/10 text-violet-300 focus:outline-none focus:border-violet-500" />
                                        </div>
                                        <button type="button" @click="removeTech(idx)"
                                            class="w-7 h-7 rounded-lg text-red-400 hover:bg-red-500/20 border-0 bg-transparent flex items-center justify-center cursor-pointer">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ─── TAB 6: DELIVERABLES ─── -->
                        <div v-show="activeModalTab === 'deliverables'" class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h4 class="text-white font-bold text-sm">Included Deliverables</h4>
                                    <p class="text-xs opacity-50">What the client will receive upon completion</p>
                                </div>
                                <button type="button" @click="addDeliverable"
                                    class="px-3.5 py-1.5 rounded-xl text-xs font-bold text-violet-300 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 cursor-pointer">
                                    + Add Deliverable
                                </button>
                            </div>

                            <div class="space-y-2">
                                <div v-for="(del, idx) in form.details.deliverables" :key="idx"
                                    class="flex items-center gap-2 p-2 rounded-xl border bg-black/40" style="border-color:rgba(139, 92, 246, 0.2);">
                                    <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold shrink-0">
                                        ✓
                                    </span>
                                    <input v-model="form.details.deliverables[idx]" type="text" placeholder="e.g. Complete Production-Ready Source Code"
                                        class="flex-1 px-3 py-2 rounded-lg text-xs bg-transparent border-0 text-white focus:outline-none" />
                                    <button type="button" @click="removeDeliverable(idx)"
                                        class="w-8 h-8 rounded-lg text-red-400 hover:bg-red-500/20 border-0 bg-transparent flex items-center justify-center cursor-pointer">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Modal Footer Action Buttons -->
                    <div class="flex items-center justify-between gap-4 px-8 py-5 border-t shrink-0 bg-black/40" style="border-color:rgba(139, 92, 246, 0.15);">
                        <div class="text-xs opacity-50" style="color:#C9B9E8;">
                            All changes sync directly to public service pages.
                        </div>
                        <div class="flex items-center gap-3">
                            <button @click="modal.show = false"
                                class="px-6 py-3 rounded-2xl text-xs font-bold border transition-all hover:bg-white/5 cursor-pointer"
                                style="border-color:rgba(139, 92, 246, 0.25);color:#C9B9E8;">
                                Cancel
                            </button>
                            <button @click="saveService" :disabled="saving" class="flex items-center gap-2 px-8 py-3 text-white font-bold rounded-2xl text-xs
                                transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer border-0 shadow-lg"
                                style="background:#8B5CF6;box-shadow:0 10px 20px -5px #8B5CF650;">
                                <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>{{ saving ? 'Saving CMS...' : (modal.editing ? 'Update Service CMS' : 'Save New Service') }}</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/api/axios'
import ServiceIcon from '@/components/ServiceIcon.vue'

const services = ref([])
const saving = ref(false)
const alertMsg = ref('')
const alertType = ref('success')
const activeModalTab = ref('basic')

const editorTabs = [
    { id: 'basic', label: '1. Basic & Hero' },
    { id: 'pricing', label: '2. Pricing & Timeline' },
    { id: 'overview', label: '3. Overview & Highlights' },
    { id: 'workflow', label: '4. Workflow Steps' },
    { id: 'tech', label: '5. Tech Stack' },
    { id: 'deliverables', label: '6. Deliverables' },
]

const modal = reactive({ show: false, editing: false, editId: null })
const form = reactive({
    title: '',
    name: '',
    description: '',
    icon: 'code',
    order: 0,
    details: {
        timeline: '7 - 14 Days',
        startingPrice: '$250 - $650',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Professional Service',
        cta_button_text: 'Get Started with this Service',
        cta_email: 'hello@pialcodes.com',
        cta_linkedin: 'https://www.linkedin.com/in/pial-mahmud/',
        cta_github: 'https://github.com/mahmudpial',
        overview: '',
        highlights: [],
        workflowSteps: [],
        techStack: [],
        deliverables: []
    }
})

// ── 4 ITEMS PER PAGE PAGINATION ───────────────────────────
const perPage = 4
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(services.value.length / perPage) || 1)

const paginatedServices = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return services.value.slice(start, start + perPage)
})

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const iconOptions = [
    { key: 'code', label: 'Full-Stack' },
    { key: 'api', label: 'REST API' },
    { key: 'dashboard', label: 'Admin/CMS' },
    { key: 'database', label: 'Database' },
    { key: 'payment', label: 'Payments' },
    { key: 'uiux', label: 'UI/UX' },
]

// Default templates for quick population
const defaultKnowledgeBase = {
    1: {
        timeline: '7 - 14 Days',
        startingPrice: '$450 - $850',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Full-Stack Engineering',
        cta_button_text: 'Get Started with this Service',
        cta_email: 'hello@pialcodes.com',
        cta_linkedin: 'https://www.linkedin.com/in/pial-mahmud/',
        cta_github: 'https://github.com/mahmudpial',
        overview: 'End-to-end full-stack web application engineering utilizing Laravel for a robust, secure backend and Vue.js 3 / Inertia.js for a blazingly responsive, interactive user interface.',
        highlights: [
            'Clean Architecture & Scalable Directory Structure',
            'Full SPA Responsiveness with Vue.js 3 & Vite',
            'Robust Laravel 11 Backend & Restful API',
            'Role-Based Access Control (RBAC) & Permissions',
            'Live Real-Time Notifications & WebSocket Readiness',
            'Cross-browser & Mobile-first Optimization'
        ],
        techStack: [
            { name: 'Laravel 11', role: 'Backend Framework' },
            { name: 'Vue.js 3 / Inertia', role: 'Frontend Architecture' },
            { name: 'Tailwind CSS', role: 'Design System' },
            { name: 'PostgreSQL / MySQL', role: 'Relational Database' },
            { name: 'Vite', role: 'High-speed Bundler' },
            { name: 'Pinia & Vue Router', role: 'State Management' }
        ],
        workflowSteps: [
            { title: '1. Discovery & Technical Blueprint', description: 'We review your exact business goals, user personas, database requirements, and technical constraints.' },
            { title: '2. Schema & UI/UX Wireframing', description: 'Design of normalized database tables, API contract endpoints, and intuitive interactive component layouts.' },
            { title: '3. Clean & Scalable Coding', description: 'Development using Laravel 11 and Vue.js 3 following clean code standards (SOLID, repository patterns).' },
            { title: '4. Security, QA & Testing', description: 'Penetration checks, OWASP validations, SQL injection prevention tests, and speed benchmarking.' },
            { title: '5. Production Deployment & Handover', description: 'Deployment to live cloud server with SSL certificates, Git handover, and video walkthrough.' }
        ],
        deliverables: [
            'Complete Production-Ready Source Code with full ownership transfer',
            'Configured live production deployment on Render, VPS, AWS or DigitalOcean',
            'Interactive API documentation & Postman collection',
            'Database migration scripts & comprehensive seeders',
            'Video walkthrough & documentation guide explaining how everything works',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    },
    5: {
        timeline: '4 - 8 Days',
        startingPrice: '$250 - $500',
        pricing_note: 'Custom milestones & flexible payment terms',
        support_guarantee: '30 Days Free Support',
        badge_text: 'Payment & API Integration',
        cta_button_text: 'Integrate Payment & APIs',
        cta_email: 'hello@pialcodes.com',
        cta_linkedin: 'https://www.linkedin.com/in/pial-mahmud/',
        cta_github: 'https://github.com/mahmudpial',
        overview: 'Secure integration of multiple international and local payment gateways, webhooks, invoice generation, SMS notifications, and third-party SaaS APIs with automatic retry mechanisms.',
        highlights: [
            'Stripe, PayPal, SSLCommerz & bKash Integrations',
            'Webhook Signature Verification & Idempotency',
            'Automated PDF Invoice & Receipt Generation',
            'Transactional SMS & Email Gateway Hookups',
            'Subscription Billing & Recurring Payment Workflows',
            'PCI-DSS Compliance Best Practices'
        ],
        techStack: [
            { name: 'Stripe & PayPal SDKs', role: 'Global Checkout' },
            { name: 'SSLCommerz & bKash', role: 'Local Gateway' },
            { name: 'DomPDF / Snappy', role: 'Invoice Generation' },
            { name: 'Twilio / SMS API', role: 'SMS Notifications' },
            { name: 'Laravel Queues', role: 'Asynchronous Webhooks' },
            { name: 'Mailgun / SES', role: 'Transactional Email' }
        ],
        workflowSteps: [
            { title: '1. API Credentials & Security Setup', description: 'Configuring sandbox environments, webhook listener endpoints, and encrypting secret keys.' },
            { title: '2. Gateway & Checkout Implementation', description: 'Integrating checkout session flows, hosted checkouts, and custom card elements.' },
            { title: '3. Webhook Listener & Transaction Logging', description: 'Handling asynchronous webhook notifications, double-spend prevention, and event logging.' },
            { title: '4. Testing & Error Simulation', description: 'Simulating declined cards, network drops, and automated payment retries.' },
            { title: '5. Live Production Handover', description: 'Transitioning to live API keys and verifying real test transactions.' }
        ],
        deliverables: [
            'Complete Payment & API Gateway integration source code',
            'Webhook listener setup with signature verification',
            'Automated email receipts & PDF invoice generator',
            'Comprehensive testing suite for charge success & refund edge cases',
            '30 Days of Free Bug Fixing & Priority Technical Support'
        ]
    }
}

// Helpers to add / remove dynamic repeater rows
function addHighlight() {
    form.details.highlights.push('')
}
function removeHighlight(idx) {
    form.details.highlights.splice(idx, 1)
}

function addWorkflowStep() {
    form.details.workflowSteps.push({
        title: `${form.details.workflowSteps.length + 1}. New Step Title`,
        description: ''
    })
}
function removeWorkflowStep(idx) {
    form.details.workflowSteps.splice(idx, 1)
}

function addTech() {
    form.details.techStack.push({ name: '', role: '' })
}
function removeTech(idx) {
    form.details.techStack.splice(idx, 1)
}

function addDeliverable() {
    form.details.deliverables.push('')
}
function removeDeliverable(idx) {
    form.details.deliverables.splice(idx, 1)
}

async function fetchServices() {
    try {
        const { data } = await api.get('/services')
        services.value = data.data || []
        if (currentPage.value > totalPages.value) {
            currentPage.value = Math.max(1, totalPages.value)
        }
    } catch (err) {
        showAlert('Failed to load services', 'error')
    }
}

async function openAdd() {
    const template = defaultKnowledgeBase[1]
    Object.assign(form, {
        title: '',
        name: '',
        description: '',
        icon: 'code',
        order: (services.value.length || 0) + 1,
        details: JSON.parse(JSON.stringify(template))
    })
    activeModalTab.value = 'basic'
    modal.editing = false
    modal.editId = null
    modal.show = true
}

async function openEdit(s) {
    const titleVal = s.title || s.name || ''
    
    // Attempt to load extended details from settings / localStorage / default templates
    let loadedDetails = null

    // 1. Check localStorage first
    try {
        const local = localStorage.getItem(`service_detail_${s.id}`)
        if (local) loadedDetails = JSON.parse(local)
    } catch (e) {}

    // 2. If not found, fetch from settings API
    if (!loadedDetails) {
        try {
            const { data } = await api.get('/settings')
            const settings = data.data ?? data ?? []
            let val = null
            if (Array.isArray(settings)) {
                const found = settings.find(item => item.key === `service_detail_${s.id}`)
                if (found) val = found.value
            } else if (typeof settings === 'object' && settings[`service_detail_${s.id}`]) {
                val = settings[`service_detail_${s.id}`]
            }
            if (val) {
                loadedDetails = typeof val === 'string' ? JSON.parse(val) : val
            }
        } catch (e) {}
    }

    // 3. Fallback to default knowledge base template
    if (!loadedDetails) {
        const key = s.id == 5 ? 5 : 1
        loadedDetails = defaultKnowledgeBase[key] || defaultKnowledgeBase[1]
    }

    // Clone details safely
    const detailsClone = JSON.parse(JSON.stringify(loadedDetails))
    if (!detailsClone.overview) detailsClone.overview = s.description || ''
    if (!detailsClone.highlights) detailsClone.highlights = []
    if (!detailsClone.workflowSteps) detailsClone.workflowSteps = []
    if (!detailsClone.techStack) detailsClone.techStack = []
    if (!detailsClone.deliverables) detailsClone.deliverables = []

    Object.assign(form, {
        title: titleVal,
        name: titleVal,
        description: s.description || '',
        icon: s.icon || 'code',
        order: s.order || 0,
        details: detailsClone
    })

    activeModalTab.value = 'basic'
    modal.editing = true
    modal.editId = s.id
    modal.show = true
}

async function saveService() {
    const titleVal = form.title?.trim() || form.name?.trim()
    if (!titleVal) return showAlert('Service title is required', 'error')
    if (!form.description?.trim()) return showAlert('Service description is required', 'error')

    saving.value = true
    try {
        const basicPayload = {
            title: titleVal,
            name: titleVal,
            description: form.description.trim(),
            icon: form.icon?.trim() || 'code',
            order: Number(form.order) || 0
        }

        let savedServiceId = modal.editId

        if (modal.editing) {
            await api.put(`/admin/services/${modal.editId}`, basicPayload)
        } else {
            const { data } = await api.post('/admin/services', basicPayload)
            savedServiceId = data.data?.id || data.id || null
        }

        // Save rich details into settings table and localStorage
        if (savedServiceId) {
            const detailPayload = JSON.parse(JSON.stringify(form.details))
            detailPayload.title = titleVal
            detailPayload.description = form.description.trim()
            detailPayload.icon = form.icon

            const jsonStr = JSON.stringify(detailPayload)
            
            // Save to localStorage immediately
            try {
                localStorage.setItem(`service_detail_${savedServiceId}`, jsonStr)
            } catch (e) {}

            // Save to database settings table
            try {
                const settingsPayload = {
                    settings: [
                        { key: `service_detail_${savedServiceId}`, value: jsonStr }
                    ]
                }
                try {
                    await api.put('/settings', settingsPayload)
                } catch {
                    try {
                        await api.put('/admin/settings', settingsPayload)
                    } catch {
                        await api.post('/admin/settings', settingsPayload)
                    }
                }
            } catch (e) {
                console.warn('Could not sync to settings API:', e)
            }
        }

        modal.show = false
        showAlert('Service & CMS details saved successfully!', 'success')
        fetchServices()
    } catch (err) {
        console.error('Save service error:', err)
        const res = err.response?.data
        let errorText = res?.message || 'Failed to save service'
        if (res?.errors) {
            const firstKey = Object.keys(res.errors)[0]
            if (firstKey && res.errors[firstKey]?.length) {
                errorText = res.errors[firstKey][0]
            }
        }
        showAlert(errorText, 'error')
    } finally {
        saving.value = false
    }
}

async function deleteService(s) {
    if (!confirm(`Delete service "${s.title || s.name}"?`)) return
    try {
        await api.delete(`/admin/services/${s.id}`)
        try {
            localStorage.removeItem(`service_detail_${s.id}`)
        } catch (e) {}
        showAlert('Service deleted successfully!', 'success')
        fetchServices()
    } catch (err) {
        showAlert(err.response?.data?.message || 'Failed to delete service', 'error')
    }
}

function showAlert(msg, type = 'success') {
    alertMsg.value = msg
    alertType.value = type
    setTimeout(() => alertMsg.value = '', 4000)
}

onMounted(fetchServices)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
.modal-enter-active, .modal-leave-active { transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(.95) translateY(20px); }

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #0A0610;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #3B2A5A;
    border-radius: 9999px;
}
</style>
