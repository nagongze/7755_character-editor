import { defineStore } from 'pinia'
import { CHARACTER_TEMPLATE } from '@/utils/constants'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    character: { ...CHARACTER_TEMPLATE },
    currentFileId: null,
    isDirty: false
  }),

  getters: {
    characterName: (state) => state.character.personalInfo.name || '未命名角色',
    hasUnsavedChanges: (state) => state.isDirty
  },

  actions: {
    updateCharacter(newData) {
      this.character = { ...newData }
      this.isDirty = true
    },

    resetCharacter() {
      this.character = { ...CHARACTER_TEMPLATE }
      this.currentFileId = null
      this.isDirty = false
    },

    setCurrentFileId(fileId) {
      this.currentFileId = fileId
      this.isDirty = false
    },

    markAsSaved() {
      this.isDirty = false
    },

    markAsDirty() {
      this.isDirty = true
    }
  }
})