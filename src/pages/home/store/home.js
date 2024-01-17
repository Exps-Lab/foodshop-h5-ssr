
import { defineStore } from 'pinia'
import { getKingKongSuggest } from '@api/home/index.js'

export const homeStore = defineStore('homeStore', {
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
    async getSuggestData () {
      this.loading = true
      const { data } = await getKingKongSuggest()
      this.suggestData = data
      this.loading = false
    }
  }
})
