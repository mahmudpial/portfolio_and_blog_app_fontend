import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: localStorage.getItem('theme-mode') || 'dark',
  }),
  getters: {
    isDark: (state) => state.mode === 'dark',
    isLight: (state) => state.mode === 'light',
  },
  actions: {
    toggleTheme() {
      this.mode = this.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme-mode', this.mode)
      this.applyTheme()
    },
    applyTheme() {
      if (this.mode === 'light') {
        document.documentElement.classList.add('light-mode')
        document.documentElement.classList.remove('dark-mode')
      } else {
        document.documentElement.classList.add('dark-mode')
        document.documentElement.classList.remove('light-mode')
      }
    }
  }
})
