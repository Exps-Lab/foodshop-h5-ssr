
import { defineStore } from 'pinia'
import { getShopDetail, getShopGoods } from '@api/shop'

export const shopDetailStore = defineStore('shopDetailStore', {
  state: () => {
    return {
      shopBaseInfo: {},
      menuData: []
    }
  },
  getters: {
    ssrData (state) {
      return state.$state
    }
  },
  actions: {
    async getShopInfo (reqData, ctx) {
      const { data } = await getShopDetail(reqData, ctx)
      this.shopBaseInfo = data
    },
    async getShopGoodsData (reqData) {
      const { data } = await getShopGoods(reqData)
      this.menuData = data
    }
  }
})
