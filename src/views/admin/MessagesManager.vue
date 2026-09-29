<template>
    <div style="background:#0A0610;min-height:100vh;color:#fff;font-family:system-ui;">
        <div class="max-w-7xl mx-auto px-6 py-10">

            <!-- Header Section -->
            <div class="flex items-center justify-between mb-10 flex-wrap gap-6">
                <div class="space-y-1">
                    <p class="text-xs font-bold uppercase tracking-[0.3em] mb-2"
                        style="color:#A78BFA;opacity:0.8;">Communication Control</p>
                    <h1 class="font-serif text-4xl font-bold text-white tracking-tight">
                        Contact <span style="color:#8B5CF6;">Inbox</span>
                    </h1>
                    <p class="text-sm opacity-60 font-medium">
                        Managing {{ visibleMessages.length }} incoming inquiries and requests.
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <select v-model="statusFilter" @change="fetchMessages()"
                        class="px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all border"
                        style="background:#120E1C;border-color:rgba(139, 92, 246, 0.2);color:#C9B9E8;font-family:system-ui;"
                        @focus="this.style.borderColor='#8B5CF6'" @blur="this.style.borderColor='rgba(139, 92, 246, 0.2)'">
                        <option value="all">All messages</option>
                        <option value="unread">Unread only</option>
                        <option value="read">Read only</option>
                    </select>
                    <button @click="fetchMessages(pagination.current_page)" class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border
                        transition-all hover:scale-105 active:scale-95"
                        style="border-color:rgba(139, 92, 246, 0.2);color:#C9B9E8;background:rgba(139, 92, 246, 0.05);font-family:system-ui;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            <!-- Alert System -->
            <transition name="fade">
                <div v-if="alertMsg" class="mb-8 p-4 rounded-2xl border-l-4 flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-4"
                    :style="alertType === 'success'
                        ? 'background:rgba(16, 185, 129, 0.1);border-color:#10b981;color:#34d399;'
                        : 'background:rgba(239, 68, 68, 0.1);border-color:#ef4444;color:#f87171;'">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0" :style="alertType === 'success' ? 'background:#10b981' : 'background:#ef4444'">
                        <svg class="text-white" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    {{ alertMsg }}
                </div>
            </transition>

            <!-- Stats Section -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div class="rounded-3xl border p-6 transition-all hover:scale-[1.02]"
                    style="background:rgba(25, 18, 38, 0.6);border-color:rgba(139, 92, 246, 0.2);box-shadow:0 10px 20px -5px rgba(0,0,0,0.3);">
                    <div class="text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Total Inquiries</div>
                    <div class="text-4xl font-serif font-bold text-white">{{ totalCount }}</div>
                </div>
                <div class="rounded-3xl border p-6 transition-all hover:scale-[1.02]"
                    style="background:rgba(25, 18, 38, 0.6);border-color:rgba(245, 158, 11, 0.2);box-shadow:0 10px 20px -5px rgba(0,0,0,0.3);">
                    <div class="text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Unread Messages</div>
                    <div class="text-4xl font-serif font-bold" style="color:#F59E0B;">{{ unreadCount }}</div>
                </div>
                <div class="rounded-3xl border p-6 transition-all hover:scale-[1.02]"
                    style="background:rgba(25, 18, 38, 0.6);border-color:rgba(74, 222, 128, 0.2);box-shadow:0 10px 20px -5px rgba(0,0,0,0.3);">
                    <div class="text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Processed</div>
                    <div class="text-4xl font-serif font-bold" style="color:#4ade80;">{{ readCount }}</div>
                </div>
            </div>

            <!-- Messages Table -->
            <div class="rounded-3xl border overflow-hidden backdrop-blur-xl transition-all" style="background:rgba(25, 18, 38, 0.6);border-color:rgba(139, 92, 246, 0.2);">
                <div class="px-8 py-6 border-b flex items-center justify-between" style="border-color:rgba(139, 92, 246, 0.1);">
                    <h2 class="font-serif text-xl font-semibold text-white">Incoming Messages</h2>
                    <div class="text-xs font-medium opacity-40 uppercase tracking-widest">Latest First</div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-white/5">
                            <tr style="border-bottom:1px solid rgba(139, 92, 246, 0.1);">
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Sender</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Subject</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Message</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Received</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50">Status</th>
                                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider opacity-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y" style="border-color:rgba(139, 92, 246, 0.05);">
                            <tr v-for="message in visibleMessages" :key="message.id" class="group transition-all hover:bg-white/[0.02]">
                                <td class="px-8 py-5">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-purple-500/50 transition-all flex items-center justify-center"
                                            style="background:linear-gradient(135deg,#180F28,#3B2A5A);">
                                            <span class="text-white font-bold text-xs">{{ initials(message.name) }}</span>
                                        </div>
                                        <div>
                                            <div class="font-bold text-white text-sm group-hover:text-purple-400 transition-colors" style="font-family:system-ui;">
                                                {{ message.name }}
                                            </div>
                                            <div class="text-xs opacity-40 font-mono">{{ message.email }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-8 py-5">
                                    <div class="text-sm font-medium text-white/80 truncate max-w-xs transition-colors group-hover:text-white" style="font-family:'Georgia',serif;">
                                        {{ message.subject }}
                                    </div>
                                </td>
                                <td class="px-8 py-5">
                                    <div class="text-sm opacity-70 truncate max-w-md font-medium" style="color:#C9B9E8;font-family:system-ui;">
                                        {{ message.message }}
                                    </div>
                                </td>
                                <td class="px-8 py-5">
                                    <div class="text-xs font-medium opacity-50" style="font-family:system-ui;">
                                        {{ formatDate(message.createdAt) }}
                                    </div>
                                </td>
                                <td class="px-8 py-5">
                                    <div class="flex items-center gap-2">
                                        <div class="w-2 h-2 rounded-full" :style="message.isRead ? 'background:#4ade80;box-shadow:0 0 8px #4ade80;' : 'background:#F59E0B;box-shadow:0 0 8px #F59E0B;'"></div>
                                        <span class="text-xs font-bold uppercase tracking-tighter" :style="message.isRead ? 'color:#4ade80;' : 'color:#F59E0B;'">
                                            {{ message.isRead ? 'Read' : 'Unread' }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-8 py-5 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <button v-if="!message.isRead" @click="markAsRead(message)"
                                            class="p-2 rounded-xl text-white/60 hover:text-green-400 hover:bg-green-500/10 transition-all" title="Mark as Read">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </button>
                                        <button @click="deleteMessage(message)"
                                            class="p-2 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete Message">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="visibleMessages.length === 0 && !loading">
                                <td colspan="6" class="text-center py-24">
                                    <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center text-4xl">✉️</div>
                                    <p class="text-white font-bold text-lg mb-1">Inbox is empty</p>
                                    <p class="text-sm opacity-40">Contact form submissions will appear here.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="pagination.last_page > 1"
                    class="flex items-center justify-between px-8 py-5 border-t flex-wrap gap-4"
                    style="border-color:rgba(139, 92, 246, 0.1);">
                    <span class="text-xs opacity-50 font-medium">
                        Page {{ pagination.current_page }} of {{ pagination.last_page }}
                    </span>
                    <div class="flex gap-3">
                        <button :disabled="pagination.current_page === 1"
                            @click="fetchMessages(pagination.current_page - 1)" class="px-4 py-2 rounded-xl text-xs border transition-all hover:scale-105 disabled:opacity-30"
                            style="border-color:rgba(139, 92, 246, 0.2);color:#C9B9E8;background:rgba(139, 92, 246, 0.05);">
                            Prev
                        </button>
                        <button :disabled="pagination.current_page === pagination.last_page"
                            @click="fetchMessages(pagination.current_page + 1)" class="px-4 py-2 rounded-xl text-xs border transition-all hover:scale-105 disabled:opacity-30"
                            style="border-color:rgba(139, 92, 246, 0.2);color:#C9B9E8;background:rgba(139, 92, 246, 0.05);">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>

<script setup>
import { computed, reactive, ref, onMounted } from 'vue'
import api from '@/api/axios'

const MESSAGE_ENDPOINTS = ['/admin/messages', '/admin/contacts']

const loading = ref(false)
const rawMessages = ref([])
const statusFilter = ref('all')
const alertMsg = ref('')
const alertType = ref('success')
const activeEndpoint = ref(MESSAGE_ENDPOINTS[0])
const pagination = reactive({ current_page: 1, last_page: 1 })

const visibleMessages = computed(() =>
    rawMessages.value
        .map(normalizeMessage)
        .filter(message => {
            if (statusFilter.value === 'read') return message.isRead
            if (statusFilter.value === 'unread') return !message.isRead
            return true
        }),
)

const totalCount = computed(() => rawMessages.value.length)
const unreadCount = computed(() => visibleMessages.value.filter(message => !message.isRead).length)
const readCount = computed(() => visibleMessages.value.filter(message => message.isRead).length)

onMounted(() => fetchMessages())

async function fetchMessages(page = 1) {
    loading.value = true
    alertMsg.value = ''

    let lastError = null

    for (const endpoint of MESSAGE_ENDPOINTS) {
        try {
            const { data } = await api.get(endpoint, {
                params: {
                    page,
                    status: statusFilter.value === 'all' ? undefined : statusFilter.value,
                    is_read: statusFilter.value === 'all'
                        ? undefined
                        : statusFilter.value === 'read' ? 1 : 0,
                },
            })

            const paginated = data.data?.data ? data.data : null
            const items = paginated?.data ?? data.data ?? data.messages ?? []

            rawMessages.value = Array.isArray(items) ? items : []
            pagination.current_page = paginated?.current_page ?? 1
            pagination.last_page = paginated?.last_page ?? 1
            activeEndpoint.value = endpoint
            return
        } catch (error) {
            lastError = error
        }
    }

    rawMessages.value = []
    pagination.current_page = 1
    pagination.last_page = 1
    showAlert(lastError?.response?.data?.message || 'Failed to load messages.', 'error')
    throw lastError
}

async function markAsRead(message) {
    const endpoints = [
        `${activeEndpoint.value}/${message.id}/read`,
        `${activeEndpoint.value}/${message.id}`,
    ]

    for (const endpoint of endpoints) {
        try {
            await api.patch(endpoint, { is_read: true, read: true, status: 'read' })
            await fetchMessages(pagination.current_page)
            showAlert('Message marked as read.', 'success')
            return
        } catch (error) {
            if (endpoint === endpoints[endpoints.length - 1]) {
                showAlert(error.response?.data?.message || 'Unable to mark the message as read.', 'error')
            }
        }
    }
}

async function deleteMessage(message) {
    if (!confirm('Delete this message?')) return

    try {
        await api.delete(`${activeEndpoint.value}/${message.id}`)
        showAlert('Message deleted.', 'success')
        await fetchMessages(pagination.current_page)
    } catch (error) {
        showAlert(error.response?.data?.message || 'Failed to delete message.', 'error')
    }
}

function normalizeMessage(message) {
    return {
        id: message.id,
        name: message.name || message.full_name || message.sender_name || 'Unknown Sender',
        email: message.email || message.sender_email || 'No email provided',
        subject: message.subject || 'No subject',
        message: message.message || message.body || message.content || '',
        createdAt: message.created_at || message.createdAt || message.updated_at || null,
        isRead: Boolean(
            message.is_read
            ?? message.read_at
            ?? message.read
            ?? (message.status === 'read'),
        ),
    }
}

function initials(name) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase())
        .join('') || 'M'
}

function formatDate(value) {
    if (!value) return 'Unknown'

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(value))
}

function showAlert(message, type = 'success') {
    alertMsg.value = message
    alertType.value = type
    setTimeout(() => {
        alertMsg.value = ''
    }, 3000)
}
</script>
