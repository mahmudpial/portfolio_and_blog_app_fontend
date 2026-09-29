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
const publicPages = ['home', 'skills', 'portfolio', 'ProjectDetail', 'blog', 'blog-post', 'contact', 'profile']
const authPages = ['login', 'register', 'forgot-password', 'reset-password']

const isAdminPage = computed(() => Boolean(route.meta.requiresAdmin))
const isAuthPage = computed(() => authPages.includes(route.name))
const isPublicPage = computed(
  () => (publicPages.includes(route.name) || !isAdminPage.value) && !isAdminPage.value && !isAuthPage.value,
)
</script>
