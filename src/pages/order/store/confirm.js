
import { defineStore } from 'pinia'

export const confirmStore = defineStore('confirmStore', {
  state: () => {
    return {
      suggestData: [],
      loading: false
    }
  },
  getters: {
    ssrData (state) {
      return state.$state
    }
  },
  actions: {
    async getSuggestData (params, ctx) {
    }
  }
})
