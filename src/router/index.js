import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  // ── Public pages ───────────────────────────────────────────
  {
    path: "/",
    name: "home",
    component: () => import("@/views/public/HomeView.vue"),
  },
  {
    path: "/skills",
    name: "skills",
    component: () => import("@/views/public/SkillsView.vue"),
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () => import("@/views/public/PortfolioView.vue"),
  },
  {
    path: "/portfolio/:slug",
    name: "ProjectDetail",
    component: () => import("@/views/public/ProjectDetailView.vue"),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/public/BlogView.vue"),
  },
  {
    path: "/blog/:slug",
    name: "blog-post",
    component: () => import("@/views/public/BlogPostView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/public/ContactView.vue"),
  },

  // ── Auth pages ─────────────────────────────────────────────
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/RegisterView.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/auth/ForgotPasswordView.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("@/views/auth/ResetPasswordView.vue"),
    meta: { guestOnly: true },
  },

  // ── Protected user pages ───────────────────────────────────
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/user/ProfileView.vue"),
    meta: { requiresAuth: true },
  },

  // ── Admin pages ────────────────────────────────────────────
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/DashboardView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/skills",
    name: "admin-skills",
    component: () => import("@/views/admin/SkillsManager.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/projects",
    name: "admin-projects",
    component: () => import("@/views/admin/ProjectsManager.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/posts",
    name: "admin-posts",
    component: () => import("@/views/admin/PostsManager.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/comments",
    name: "admin-comments",
    component: () => import("@/views/admin/CommentsManager.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/messages",
    name: "admin-messages",
    component: () => import("@/views/admin/MessagesManager.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 96,
      };
    }

    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.guestOnly && auth.isLoggedIn) {
    return auth.isAdmin ? { name: "admin" } : { name: "profile" };
  }
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: "login" };
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: "home" };
  }
});

export default router;
