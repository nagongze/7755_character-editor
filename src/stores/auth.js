import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isSignedIn: false,
    isInitialized: false
  }),

  getters: {
    canUseGoogleDrive: (state) => state.isSignedIn && state.isInitialized
  },

  actions: {
    setSignedIn(status) {
      this.isSignedIn = status
    },

    setInitialized(status) {
      this.isInitialized = status
    },

    reset() {
      this.isSignedIn = false
      this.isInitialized = false
    }
  }
})