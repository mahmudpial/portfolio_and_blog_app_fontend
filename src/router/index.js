import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminLayout from "@/layouts/AdminLayout.vue";

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
    path: "/pricing",
    name: "pricing",
    component: () => import("@/views/public/PricingView.vue"),
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
  {
    path: "/services/:id",
    name: "service-detail",
    component: () => import("@/views/public/ServiceDetailView.vue"),
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
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        alias: "dashboard",
        name: "admin",
        component: () => import("@/views/admin/DashboardView.vue"),
      },
      {
        path: "skills",
        name: "admin-skills",
        component: () => import("@/views/admin/SkillsManager.vue"),
      },
      {
        path: "projects",
        name: "admin-projects",
        component: () => import("@/views/admin/ProjectsManager.vue"),
      },
      {
        path: "posts",
        name: "admin-posts",
        component: () => import("@/views/admin/PostsManager.vue"),
      },
      {
        path: "comments",
        name: "admin-comments",
        component: () => import("@/views/admin/CommentsManager.vue"),
      },
      {
        path: "messages",
        name: "admin-messages",
        component: () => import("@/views/admin/MessagesManager.vue"),
      },
      {
        path: "services",
        name: "admin-services",
        component: () => import("@/views/admin/ServicesManager.vue"),
      },
      {
        path: "pricing",
        name: "admin-pricing",
        component: () => import("@/views/admin/PricingManager.vue"),
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("@/views/admin/SiteSettingsManager.vue"),
      },
    ],
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
  const isGuestOnly = to.matched.some((record) => record.meta?.guestOnly);
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta?.requiresAdmin);

  if (isGuestOnly && auth.isLoggedIn) {
    return auth.isAdmin ? { name: "admin" } : { name: "profile" };
  }
  if (requiresAuth && !auth.isLoggedIn) {
    return { name: "login" };
  }
  if (requiresAdmin && !auth.isAdmin) {
    return { name: "home" };
  }
});

export default router;
