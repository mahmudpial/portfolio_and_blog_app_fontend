import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api/axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  // ── State ───────────────────────────────────────────────────
  const token = ref(localStorage.getItem("token") || null);
  const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

  // ── Getters ─────────────────────────────────────────────────
  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  // ── Actions ─────────────────────────────────────────────────

  async function register(payload) {
    const { data } = await api.post("/auth/register", payload);
    _setSession(data.token, data.user);
    return data;
  }

  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    _setSession(data.token, data.user);
    return data;
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      _clearSession();
      router.push({ name: "login" });
    }
  }

  async function fetchProfile() {
    const { data } = await api.get("/user/profile");
    user.value = data.user;
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }

  async function updateProfile(payload) {
    const { data } = await api.put("/user/profile", payload);
    user.value = data.user;
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }

  async function changePassword(payload) {
    const { data } = await api.put("/user/change-password", payload);
    return data;
  }

  // ── Private helpers ─────────────────────────────────────────
  function _setSession(newToken, newUser) {
    token.value = newToken;
    user.value = newUser;
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function _clearSession() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    token,
    user,
    isLoggedIn,
    isAdmin,
    register,
    login,
    logout,
    fetchProfile,
    updateProfile,
    changePassword,
  };
});
