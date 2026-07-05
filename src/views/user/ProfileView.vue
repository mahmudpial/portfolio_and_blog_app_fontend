<template>
    <div class="page">
        <div class="container">

            <div class="profile-card">
                <!-- Header -->
                <div class="profile-header">
                    <div class="avatar">
                        <img v-if="displayedAvatarUrl && !avatarLoadFailed" :src="displayedAvatarUrl" alt="Profile avatar"
                            class="avatar-image" @error="avatarLoadFailed = true" />
                        <span v-else>{{ initials }}</span>
                    </div>
                    <div>
                        <h2>{{ user.name }}</h2>
                        <span class="badge" :class="user.role === 'admin' ? 'badge-admin' : 'badge-user'">
                            {{ user.role }}
                        </span>
                    </div>
                    <button class="btn-outline ml-auto" @click="editMode = !editMode">
                        {{ editMode ? 'Cancel' : 'Edit profile' }}
                    </button>
                </div>

                <!-- View mode -->
                <div v-if="!editMode" class="profile-info">
                    <div class="info-row"><span>Email</span><span>{{ user.email }}</span></div>
                    <div class="info-row"><span>Phone</span><span>{{ user.phone || '—' }}</span></div>
                    <div class="info-row"><span>Status</span>
                        <span class="badge badge-active">{{ user.status }}</span>
                    </div>
                </div>

                <!-- Edit mode -->
                <form v-else @submit.prevent="handleUpdateProfile">
                    <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>
                    <div v-if="errorMsg" class="alert alert-error">{{ errorMsg }}</div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Name</label>
                            <input v-model="profileForm.name" type="text" />
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input v-model="profileForm.phone" type="text" placeholder="+880..." />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Profile image URL</label>
                        <input v-model="profileForm.profile_image" type="url" placeholder="https://..." />
                        <p class="helper-text">Paste a direct image link to update your avatar.</p>
                    </div>
                    <button type="submit" class="btn-primary" :disabled="loading">
                        {{ loading ? 'Saving...' : 'Save changes' }}
                    </button>
                </form>
            </div>

            <!-- Change password card -->
            <div class="profile-card" style="margin-top: 1rem">
                <h3>Change password</h3>
                <form @submit.prevent="handleChangePassword">
                    <div v-if="pwSuccess" class="alert alert-success">{{ pwSuccess }}</div>
                    <div v-if="pwError" class="alert alert-error">{{ pwError }}</div>
                    <div class="form-group">
                        <label>Current password</label>
                        <input v-model="pwForm.current_password" type="password" required />
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>New password</label>
                            <input v-model="pwForm.password" type="password" required />
                        </div>
                        <div class="form-group">
                            <label>Confirm password</label>
                            <input v-model="pwForm.password_confirmation" type="password" required />
                        </div>
                    </div>
                    <button type="submit" class="btn-primary" :disabled="pwLoading">
                        {{ pwLoading ? 'Updating...' : 'Update password' }}
                    </button>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)
const editMode = ref(false)
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const avatarLoadFailed = ref(false)

const initials = computed(() =>
    user.value?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'
)

const displayedAvatarUrl = computed(() =>
    (editMode.value ? profileForm.profile_image : user.value?.profile_image)?.trim() || ''
)

const profileForm = reactive({
    name: '', phone: '', profile_image: '',
})

watch(displayedAvatarUrl, () => {
    avatarLoadFailed.value = false
})

onMounted(async () => {
    await auth.fetchProfile()
    profileForm.name = user.value?.name || ''
    profileForm.phone = user.value?.phone || ''
    profileForm.profile_image = user.value?.profile_image || ''
})

async function handleUpdateProfile() {
    successMsg.value = ''
    errorMsg.value = ''
    loading.value = true
    try {
        await auth.updateProfile(profileForm)
        successMsg.value = 'Profile updated successfully!'
        editMode.value = false
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Update failed.'
    } finally {
        loading.value = false
    }
}

// Change password
const pwLoading = ref(false)
const pwSuccess = ref('')
const pwError = ref('')
const pwForm = reactive({
    current_password: '', password: '', password_confirmation: '',
})

async function handleChangePassword() {
    pwSuccess.value = ''
    pwError.value = ''
    pwLoading.value = true
    try {
        await auth.changePassword(pwForm)
        pwSuccess.value = 'Password changed successfully!'
        Object.assign(pwForm, { current_password: '', password: '', password_confirmation: '' })
    } catch (err) {
        pwError.value = err.response?.data?.message || 'Failed to change password.'
    } finally {
        pwLoading.value = false
    }
}
</script>

<style scoped>
.page {
    min-height: 100vh;
    background: #0A0610;
    color: #fff;
}

.container {
    max-width: 760px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.profile-card {
    background: #120E1C;
    border: 1px solid #3B2A5A;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0 60px #8B5CF610, 0 40px 80px #00000040;
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #8B5CF620;
    border: 1px solid #8B5CF640;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
    color: #C084FC;
    flex-shrink: 0;
    overflow: hidden;
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-header h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
    font-family: 'Georgia', serif;
}

.badge {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: capitalize;
    font-family: system-ui;
}

.badge-admin {
    background: #7C3AED20;
    color: #A78BFA;
    border: 1px solid #7C3AED40;
}

.badge-user {
    background: #8B5CF615;
    color: #C084FC;
    border: 1px solid #8B5CF630;
}

.badge-active {
    background: #16a34a20;
    color: #4ade80;
    border: 1px solid #16a34a40;
}

.helper-text {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: #475569;
    font-family: system-ui;
}

.ml-auto {
    margin-left: auto;
}

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #0A0610;
    border: 1px solid #3B2A5A;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-family: system-ui;
}

.info-row span:first-child {
    color: #475569;
    font-weight: 500;
}

.info-row span:last-child {
    color: #fff;
}

.profile-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 1.25rem;
    font-family: 'Georgia', serif;
    color: #fff;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.form-group label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #475569;
    font-family: system-ui;
}

.form-group input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    background: #0A0610;
    border: 1px solid #3B2A5A;
    color: #fff;
    font-size: 0.875rem;
    font-family: system-ui;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
}

.form-group input:focus {
    border-color: #8B5CF6;
    box-shadow: 0 0 0 3px #8B5CF618;
}

.form-group input::placeholder {
    color: #475569;
}

.btn-primary {
    padding: 0.75rem 1.5rem;
    background: #8B5CF6;
    color: #fff;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: system-ui;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
    box-shadow: 0 0 24px #8B5CF635;
}

.btn-primary:hover:not(:disabled) {
    transform: scale(1.02);
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-outline {
    padding: 0.6rem 1.25rem;
    background: transparent;
    color: #C9B9E8;
    border: 1px solid #3B2A5A;
    border-radius: 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: system-ui;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
    white-space: nowrap;
}

.btn-outline:hover {
    border-color: #8B5CF6;
    transform: scale(1.02);
}

.alert {
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-family: system-ui;
    margin-bottom: 1rem;
}

.alert-success {
    background: #16a34a15;
    border: 1px solid #16a34a40;
    color: #4ade80;
}

.alert-error {
    background: #1a0505;
    border: 1px solid #dc262640;
    color: #f87171;
}

@media (max-width: 600px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>
