import { defineStore } from 'pinia'

export const PALETTES = [
  {
    id: 'violet',
    name: 'Royal Violet',
    primary: '#8B5CF6',
    secondary: '#C084FC',
    dark: '#6D28D9',
    glow: 'rgba(139, 92, 246, 0.35)',
    subtle: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.28)',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#06B6D4',
    secondary: '#38BDF8',
    dark: '#0284C7',
    glow: 'rgba(6, 182, 212, 0.35)',
    subtle: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.28)',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)'
  },
  {
    id: 'emerald',
    name: 'Emerald Pro',
    primary: '#10B981',
    secondary: '#34D399',
    dark: '#059669',
    glow: 'rgba(16, 185, 129, 0.35)',
    subtle: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.28)',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
  },
  {
    id: 'amber',
    name: 'Amber Gold',
    primary: '#F59E0B',
    secondary: '#FBBF24',
    dark: '#D97706',
    glow: 'rgba(245, 158, 11, 0.35)',
    subtle: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.28)',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
  },
  {
    id: 'rose',
    name: 'Neon Rose',
    primary: '#F43F5E',
    secondary: '#FB7185',
    dark: '#E11D48',
    glow: 'rgba(244, 63, 94, 0.35)',
    subtle: 'rgba(244, 63, 94, 0.12)',
    border: 'rgba(244, 63, 94, 0.28)',
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)'
  }
]

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: localStorage.getItem('theme-mode') || 'dark',
    paletteId: localStorage.getItem('theme-palette') || 'violet',
  }),

  getters: {
    isDark: (state) => state.mode === 'dark',
    isLight: (state) => state.mode === 'light',
    currentPalette: (state) => {
      return PALETTES.find(p => p.id === state.paletteId) || PALETTES[0]
    },
    availablePalettes: () => PALETTES,
  },

  actions: {
    setMode(mode) {
      this.mode = mode === 'light' ? 'light' : 'dark'
      localStorage.setItem('theme-mode', this.mode)
      this.applyTheme()
    },

    toggleTheme() {
      this.setMode(this.mode === 'dark' ? 'light' : 'dark')
    },

    setPalette(paletteId) {
      if (PALETTES.some(p => p.id === paletteId)) {
        this.paletteId = paletteId
        localStorage.setItem('theme-palette', this.paletteId)
        this.applyTheme()
      }
    },

    applyTheme() {
      const root = document.documentElement
      const body = document.body
      const pal = this.currentPalette

      // 1. Toggle Mode classes
      if (this.mode === 'light') {
        root.classList.add('light-mode')
        root.classList.remove('dark-mode')
        body?.classList.add('light-mode')
        body?.classList.remove('dark-mode')
      } else {
        root.classList.add('dark-mode')
        root.classList.remove('light-mode')
        body?.classList.add('dark-mode')
        body?.classList.remove('light-mode')
      }

      // 2. Set Palette classes
      PALETTES.forEach(p => {
        root.classList.remove(`palette-${p.id}`)
      })
      root.classList.add(`palette-${pal.id}`)

      // 3. Inject CSS root variables
      root.style.setProperty('--brand-primary', pal.primary)
      root.style.setProperty('--brand-secondary', pal.secondary)
      root.style.setProperty('--brand-dark', pal.dark)
      root.style.setProperty('--brand-glow', pal.glow)
      root.style.setProperty('--brand-subtle', pal.subtle)
      root.style.setProperty('--brand-border', pal.border)
      root.style.setProperty('--brand-gradient', pal.gradient)
    },

    initTheme() {
      this.applyTheme()
    }
  }
})
