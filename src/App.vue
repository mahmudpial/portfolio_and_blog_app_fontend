<template>
  <div>
    <PublicNavbar v-if="isPublicPage" />
    <RouterView />
    <PublicFooter v-if="isPublicPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicNavbar from '@/components/PublicNavbar.vue'
import PublicFooter from '@/components/PublicFooter.vue'

const route = useRoute()
const publicPages = ['home', 'about', 'skills', 'pricing', 'portfolio', 'ProjectDetail', 'blog', 'blog-post', 'contact', 'profile']
const authPages = ['login', 'register', 'forgot-password', 'reset-password']

const isAdminPage = computed(() => {
  return route.path.startsWith('/admin') || route.matched.some(record => record.meta?.requiresAdmin)
})
const isAuthPage = computed(() => {
  return authPages.includes(route.name) || route.matched.some(record => record.meta?.guestOnly)
})
const isPublicPage = computed(() => !isAdminPage.value && !isAuthPage.value)
</script>
