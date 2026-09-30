import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminLayout from "@/layouts/AdminLayout.vue";

const routes = [
  // ── Public pages ───────────────────────────────────────────
  {
    path: "/",
    name: "home",
    component: () => import("@/views/public/HomeView.vue"),
    meta: {
      title: "Pial Mahmud | Software Developer (PHP & Laravel)",
      description: "Software Developer (PHP & Laravel) at Smart Software Ltd, Dhaka. Building secure, multi-tenant backend architectures with Laravel and Vue.js.",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/public/AboutView.vue"),
    meta: {
      title: "About Me | Pial Mahmud - Software Developer",
      description: "Learn more about Pial Mahmud, Software Developer at Smart Software Ltd, professional career timeline, technical philosophy, and experience.",
    },
  },
  {
    path: "/skills",
    name: "skills",
    component: () => import("@/views/public/SkillsView.vue"),
    meta: {
      title: "Skills & Technologies | Pial Mahmud",
      description: "Technical stack, tools, and expertise including Laravel 11, PHP 8.3, Vue.js 3, Inertia, Multi-Tenant RBAC, MySQL, Docker, and AI integrations.",
    },
  },
  {
    path: "/pricing",
    name: "pricing",
    component: () => import("@/views/public/PricingView.vue"),
    meta: {
      title: "Pricing & Service Packages | Pial Mahmud",
      description: "Transparent development pricing packages for custom Laravel web apps, SaaS MVPs, API development, and enterprise backend engineering.",
    },
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () => import("@/views/public/PortfolioView.vue"),
    meta: {
      title: "Featured Projects & Portfolio | Pial Mahmud",
      description: "Explore featured projects, multi-tenant RBAC platforms, AI assistants, e-commerce applications, and secure backend systems built by Pial Mahmud.",
    },
  },
  {
    path: "/portfolio/:slug",
    name: "ProjectDetail",
    component: () => import("@/views/public/ProjectDetailView.vue"),
    meta: {
      title: "Project Case Study | Pial Mahmud Portfolio",
      description: "Detailed case study, architecture design, and live demo of software projects built by Pial Mahmud.",
    },
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/public/BlogView.vue"),
    meta: {
      title: "Engineering Blog & Articles | Pial Mahmud",
      description: "Technical articles on PHP, Laravel best practices, multi-tenant RBAC, clean code architecture, and AI-integrated backend systems.",
    },
  },
  {
    path: "/blog/:slug",
    name: "blog-post",
    component: () => import("@/views/public/BlogPostView.vue"),
    meta: {
      title: "Blog Article | Pial Mahmud",
      description: "Read in-depth software engineering guides, architectural blueprints, and full-stack development tutorials.",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/public/ContactView.vue"),
    meta: {
      title: "Contact & Hire | Pial Mahmud",
      description: "Get in touch with Pial Mahmud for software engineering opportunities, backend consulting, or full-stack web application development.",
    },
  },
  {
    path: "/services/:id",
    name: "service-detail",
    component: () => import("@/views/public/ServiceDetailView.vue"),
    meta: {
      title: "Service Details | Pial Mahmud",
      description: "Full-stack software engineering, Laravel backend architecture, multi-tenant SaaS engineering, and AI integration services.",
    },
  },

  // ── Auth pages ─────────────────────────────────────────────
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: { guestOnly: true, title: "Sign In | Pial Mahmud Portfolio" },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/RegisterView.vue"),
    meta: { guestOnly: true, title: "Create Account | Pial Mahmud Portfolio" },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/auth/ForgotPasswordView.vue"),
    meta: { guestOnly: true, title: "Forgot Password | Pial Mahmud Portfolio" },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("@/views/auth/ResetPasswordView.vue"),
    meta: { guestOnly: true, title: "Reset Password | Pial Mahmud Portfolio" },
  },

  // ── Protected user pages ───────────────────────────────────
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/user/ProfileView.vue"),
    meta: { requiresAuth: true, title: "My Profile | Pial Mahmud Portfolio" },
  },

  // ── Admin pages ────────────────────────────────────────────
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true, title: "Admin Portal | Pial Mahmud" },
    children: [
      {
        path: "",
        alias: "dashboard",
        name: "admin",
        component: () => import("@/views/admin/DashboardView.vue"),
        meta: { title: "Admin Dashboard | Pial Mahmud" },
      },
      {
        path: "skills",
        name: "admin-skills",
        component: () => import("@/views/admin/SkillsManager.vue"),
        meta: { title: "Manage Skills | Admin" },
      },
      {
        path: "projects",
        name: "admin-projects",
        component: () => import("@/views/admin/ProjectsManager.vue"),
        meta: { title: "Manage Projects | Admin" },
      },
      {
        path: "posts",
        name: "admin-posts",
        component: () => import("@/views/admin/PostsManager.vue"),
        meta: { title: "Manage Blog Posts | Admin" },
      },
      {
        path: "comments",
        name: "admin-comments",
        component: () => import("@/views/admin/CommentsManager.vue"),
        meta: { title: "Manage Comments | Admin" },
      },
      {
        path: "messages",
        name: "admin-messages",
        component: () => import("@/views/admin/MessagesManager.vue"),
        meta: { title: "Manage Messages | Admin" },
      },
      {
        path: "services",
        name: "admin-services",
        component: () => import("@/views/admin/ServicesManager.vue"),
        meta: { title: "Manage Services | Admin" },
      },
      {
        path: "pricing",
        name: "admin-pricing",
        component: () => import("@/views/admin/PricingManager.vue"),
        meta: { title: "Manage Pricing Packages | Admin" },
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("@/views/admin/SiteSettingsManager.vue"),
        meta: { title: "Site Settings | Admin" },
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

// Dynamic Title & Meta Description updater for SEO
router.afterEach((to) => {
  const pageTitle = to.meta?.title || "Pial Mahmud | Software Developer (PHP & Laravel)";
  document.title = pageTitle;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta && to.meta?.description) {
    descMeta.setAttribute("content", to.meta.description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", pageTitle);
  }

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute("content", pageTitle);
  }
});

export default router;
