<template>
    <div style="background:#05080F;min-height:100vh;">
        <div class="max-w-7xl mx-auto px-6 py-8">

            <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest mb-1"
                        style="color:#3B82F6;font-family:system-ui;letter-spacing:.2em;">Admin Panel</p>
                    <h1 class="font-bold text-white text-2xl" style="font-family:'Georgia',serif;">
                        Comments Manager
                    </h1>
                    <p class="text-sm mt-1" style="color:#A8C4E8;font-family:system-ui;">
                        {{ comments.length }} comment{{ comments.length !== 1 ? 's' : '' }} found
                    </p>
                </div>
                <select v-model="filterApproved" @change="fetchComments()"
                    class="px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                    style="background:#0D1220;border:1px solid #1e3a5f;color:#A8C4E8;font-family:system-ui;">
                    <option value="">All comments</option>
                    <option value="0">Pending only</option>
                    <option value="1">Approved only</option>
                </select>
            </div>

            <transition name="fade">
                <div v-if="alertMsg" class="mb-5 p-4 rounded-xl border flex items-center gap-3 text-sm" :style="alertType === 'success'
                    ? 'background:#052e16;border-color:#16a34a40;color:#4ade80;'
                    : 'background:#1a0505;border-color:#dc262640;color:#f87171;'" style="font-family:system-ui;">{{
                    alertMsg }}
                </div>
            </transition>

            <!-- Stats row -->
            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="rounded-2xl border p-4" style="background:#0D1220;border-color:#1e3a5f;">
                    <div class="text-xs font-semibold uppercase tracking-wider mb-1"
                        style="color:#475569;font-family:system-ui;">Total</div>
                    <div class="text-2xl font-bold text-white" style="font-family:'Georgia',serif;">{{ totalComments
                    }}</div>
                </div>
                <div class="rounded-2xl border p-4" style="background:#0D1220;border-color:#1e3a5f;">
                    <div class="text-xs font-semibold uppercase tracking-wider mb-1"
                        style="color:#475569;font-family:system-ui;">Pending</div>
                    <div class="text-2xl font-bold" style="color:#F59E0B;font-family:'Georgia',serif;">
                        {{ pendingComments }}
                    </div>
                </div>
                <div class="rounded-2xl border p-4" style="background:#0D1220;border-color:#1e3a5f;">
                    <div class="text-xs font-semibold uppercase tracking-wider mb-1"
                        style="color:#475569;font-family:system-ui;">Approved</div>
                    <div class="text-2xl font-bold" style="color:#4ade80;font-family:'Georgia',serif;">
                        {{ approvedComments }}
                    </div>
                </div>
            </div>

            <div class="rounded-2xl border overflow-hidden" style="background:#0D1220;border-color:#1e3a5f;">
                <div class="px-6 py-5 border-b" style="border-color:#0f1f38;">
                    <h2 class="font-bold text-white" style="font-family:'Georgia',serif;">All Comments</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr style="border-bottom:1px solid #0f1f38;">
                                <th v-for="h in ['Author', 'Post', 'Comment', 'Status', 'Actions']" :key="h"
                                    class="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider"
                                    style="color:#475569;font-family:system-ui;letter-spacing:.12em;">{{ h }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in comments" :key="c.id" class="group transition-colors"
                                style="border-bottom:1px solid #0f1f38;" onmouseover="this.style.background='#0a1628'"
                                onmouseout="this.style.background='transparent'">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full flex items-center justify-center
                                text-xs font-bold text-white flex-shrink-0"
                                            style="background:linear-gradient(135deg,#1e3a5f,#2563EB);">
                                            {{ (c.user?.name || c.guest_name || 'A')[0].toUpperCase() }}
                                        </div>
                                        <div>
                                            <div class="text-sm font-semibold text-white"
                                                style="font-family:system-ui;">
                                                {{ c.user?.name || c.guest_name }}
                                            </div>
                                            <div class="text-xs" style="color:#475569;font-family:system-ui;">
                                                {{ c.user?.email || c.guest_email }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-xs font-medium" style="color:#A8C4E8;font-family:system-ui;max-width:180px;
                    display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                        {{ c.post?.title || '—' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm" style="color:#A8C4E8;font-family:system-ui;max-width:240px;
                    display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                        {{ c.body }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 rounded-full" :style="c.is_approved
                                            ? 'background:#4ade80;box-shadow:0 0 6px #4ade80;'
                                            : 'background:#F59E0B;box-shadow:0 0 6px #F59E0B;'"></span>
                                        <span class="text-xs font-medium"
                                            :style="isApproved(c) ? 'color:#4ade80;' : 'color:#F59E0B;'"
                                            style="font-family:system-ui;">
                                            {{ isApproved(c) ? 'Approved' : 'Pending' }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <button v-if="!isApproved(c)" @click="approveComment(c)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                             border transition-all hover:scale-105" style="border-color:#16a34a30;color:#4ade80;
                      background:#16a34a10;font-family:system-ui;">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Approve
                                        </button>
                                        <button @click="deleteComment(c)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                             border transition-all hover:scale-105" style="border-color:#dc262630;color:#f87171;
                      background:#dc262610;font-family:system-ui;">
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
                            <tr v-if="comments.length === 0">
                                <td colspan="5" class="text-center py-16">
                                    <div class="text-4xl mb-3">💬</div>
                                    <p class="text-white font-medium mb-1" style="font-family:system-ui;">
                                        No comments found
                                    </p>
                                    <p class="text-xs" style="color:#475569;font-family:system-ui;">
                                        Comments will appear here once readers engage.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="pagination.last_page > 1"
                    class="flex items-center justify-between px-6 py-4 border-t flex-wrap gap-3"
                    style="border-color:#0f1f38;">
                    <span class="text-xs" style="color:#475569;font-family:system-ui;">
                        Page {{ pagination.current_page }} of {{ pagination.last_page }}
                    </span>
                    <div class="flex gap-2">
                        <button :disabled="pagination.current_page === 1"
                            @click="fetchComments(pagination.current_page - 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
                     disabled:opacity-40 transition-all hover:scale-105"
                            style="border-color:#1e3a5f;color:#A8C4E8;background:#05080F;font-family:system-ui;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Prev
                        </button>
                        <button :disabled="pagination.current_page === pagination.last_page"
                            @click="fetchComments(pagination.current_page + 1)" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs border
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
import { ref, reactive, onMounted, computed } from 'vue'
import api from '@/api/axios'

const comments = ref([])
const filterApproved = ref('')
const alertMsg = ref('')
const alertType = ref('success')
const pagination = reactive({ current_page: 1, last_page: 1 })
const totalComments = computed(() => comments.value.length)
const pendingComments = computed(() => comments.value.filter(c => !isApproved(c)).length)
const approvedComments = computed(() => comments.value.filter(c => isApproved(c)).length)

onMounted(fetchComments)

async function fetchComments(page = 1) {
    const { data } = await api.get('/admin/comments', {
        params: { page, approved: filterApproved.value !== '' ? filterApproved.value : undefined }
    })
    const items = normalizeItems(data)
    comments.value = items
    pagination.current_page = data.data?.current_page || data.current_page || 1
    pagination.last_page = data.data?.last_page || data.last_page || 1
}
async function approveComment(c) {
    await api.patch(`/admin/comments/${c.id}/approve`)
    showAlert('Comment approved.', 'success'); fetchComments()
}
async function deleteComment(c) {
    if (!confirm('Delete this comment?')) return
    await api.delete(`/admin/comments/${c.id}`)
    showAlert('Comment deleted.', 'success'); fetchComments()
}
function showAlert(msg, type = 'success') {
    alertMsg.value = msg; alertType.value = type
    setTimeout(() => alertMsg.value = '', 3000)
}

function normalizeItems(response) {
    if (Array.isArray(response?.data?.data)) return response.data.data
    if (Array.isArray(response?.data)) return response.data
    if (Array.isArray(response?.comments)) return response.comments
    return []
}

function isApproved(comment) {
    return Boolean(comment.is_approved ?? comment.approved ?? comment.status === 'approved')
}
</script>
