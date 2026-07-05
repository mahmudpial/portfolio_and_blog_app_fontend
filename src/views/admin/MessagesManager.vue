<template>
    <div style="background:#0A0610;min-height:100vh;">
        <div class="max-w-7xl mx-auto px-6 py-8">
            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest mb-1"
                        style="color:#8B5CF6;font-family:system-ui;letter-spacing:.2em;">Admin Panel</p>
                    <h1 class="font-bold text-white text-2xl" style="font-family:'Georgia',serif;">
                        Messages Manager
                    </h1>
                    <p class="text-sm mt-1" style="color:#C9B9E8;font-family:system-ui;">
                        {{ visibleMessages.length }} message{{ visibleMessages.length !== 1 ? 's' : '' }} in this view
                    </p>
                </div>

                <div class="flex items-center gap-3 flex-wrap">
                    <div class="relative">
                        <select v-model="statusFilter" @change="fetchMessages()"
                            class="px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                            style="background:#120E1C;border:1px solid #3B2A5A;color:#C9B9E8;font-family:system-ui;">
                            <option value="all">All messages</option>
                            <option value="unread">Unread only</option>
                            <option value="read">Read only</option>
                        </select>
                    </div>
                    <button @click="fetchMessages(pagination.current_page)" class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border
                        transition-all hover:scale-105"
                        style="border-color:#3B2A5A;color:#C9B9E8;background:#120E1C;font-family:system-ui;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                            <polyline points="21 3 21 9 15 9" />
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            <transition name="fade">
                <div v-if="alertMsg" class="mb-5 p-4 rounded-xl border flex items-center gap-3 text-sm"
                    :style="alertType === 'success'
                        ? 'background:#052e16;border-color:#16a34a40;color:#4ade80;'
                        : 'background:#1a0505;border-color:#dc262640;color:#f87171;'">
                    <span style="font-family:system-ui;">{{ alertMsg }}</span>
                </div>
            </transition>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="rounded-2xl border p-4" style="background:#120E1C;border-color:#3B2A5A;">
                    <div class="text-xs font-semibold uppercase tracking-wider mb-1"
                        style="color:#475569;font-family:system-ui;">Total</div>
                    <div class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">{{ totalCount }}</div>
                </div>
                <div class="rounded-2xl border p-4" style="background:#120E1C;border-color:#3B2A5A;">
                    <div class="text-xs font-semibold uppercase tracking-wider mb-1"
                        style="color:#475569;font-family:system-ui;">Unread</div>
                    <div class="text-2xl font-bold" style="color:#F59E0B;font-family:'Georgia',serif;">
                        {{ unreadCount }}
                    </div>
                </div>
                <div class="rounded-2xl border p-4" style="background:#120E1C;border-color:#3B2A5A;">
                    <div class="text-xs font-semibold uppercase tracking-wider mb-1"
                        style="color:#475569;font-family:system-ui;">Read</div>
                    <div class="text-2xl font-bold" style="color:#4ade80;font-family:'Georgia',serif;">
                        {{ readCount }}
                    </div>
                </div>
            </div>

            <div class="rounded-2xl border overflow-hidden" style="background:#120E1C;border-color:#3B2A5A;">
                <div class="px-6 py-5 border-b" style="border-color:#241730;">
                    <h2 class="font-bold text-white" style="font-family:'Georgia',serif;">Contact Inbox</h2>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr style="border-bottom:1px solid #241730;">
                                <th v-for="heading in ['Sender', 'Subject', 'Message', 'Received', 'Status', 'Actions']"
                                    :key="heading"
                                    class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                    {{ heading }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="message in visibleMessages" :key="message.id" class="group transition-colors"
                                style="border-bottom:1px solid #241730;"
                                onmouseover="this.style.background='#180F28'"
                                onmouseout="this.style.background='transparent'">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-full flex items-center justify-center
                                            text-xs font-bold text-white flex-shrink-0"
                                            style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                            {{ initials(message.name) }}
                                        </div>
                                        <div>
                                            <div class="text-sm font-semibold text-white" style="font-family:system-ui;">
                                                {{ message.name }}
                                            </div>
                                            <div class="text-xs" style="color:#475569;font-family:system-ui;">
                                                {{ message.email }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-medium text-white" style="font-family:system-ui;max-width:220px;
                                        display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                        {{ message.subject }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-sm" style="color:#C9B9E8;font-family:system-ui;max-width:360px;
                                        display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                                        {{ message.message }}
                                    </p>
                                </td>
                                <td class="px-6 py-4 text-xs" style="color:#475569;font-family:system-ui;">
                                    {{ formatDate(message.createdAt) }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full" :style="message.isRead
                                            ? 'background:#4ade80;box-shadow:0 0 6px #4ade80;'
                                            : 'background:#F59E0B;box-shadow:0 0 6px #F59E0B;'"></span>
                                        <span class="text-xs font-medium"
                                            :style="message.isRead ? 'color:#4ade80;' : 'color:#F59E0B;'"
                                            style="font-family:system-ui;">
                                            {{ message.isRead ? 'Read' : 'Unread' }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <button v-if="!message.isRead" @click="markAsRead(message)"
                                            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:scale-105"
                                            style="border-color:#16a34a30;color:#4ade80;background:#16a34a10;font-family:system-ui;">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Mark Read
                                        </button>
                                        <button @click="deleteMessage(message)"
                                            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:scale-105"
                                            style="border-color:#dc262630;color:#f87171;background:#dc262610;font-family:system-ui;">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr v-if="visibleMessages.length === 0 && !loading">
                                <td colspan="6" class="text-center py-16">
                                    <div class="text-4xl mb-3">✉️</div>
                                    <p class="text-white font-medium mb-1" style="font-family:system-ui;">
                                        No messages found
                                    </p>
                                    <p class="text-xs" style="color:#475569;font-family:system-ui;">
                                        Contact form submissions will appear here.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="pagination.last_page > 1"
                    class="flex items-center justify-between px-6 py-4 border-t flex-wrap gap-3"
                    style="border-color:#241730;">
                    <span class="text-xs" style="color:#475569;font-family:system-ui;">
                        Page {{ pagination.current_page }} of {{ pagination.last_page }}
                    </span>
                    <div class="flex gap-2">
                        <button :disabled="pagination.current_page === 1"
                            @click="fetchMessages(pagination.current_page - 1)"
                            class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                            Prev
                        </button>
                        <button :disabled="pagination.current_page === pagination.last_page"
                            @click="fetchMessages(pagination.current_page + 1)"
                            class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#3B2A5A;color:#C9B9E8;background:#0A0610;font-family:system-ui;">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0
}
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
