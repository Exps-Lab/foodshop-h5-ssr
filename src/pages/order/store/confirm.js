
import { defineStore } from 'pinia'
import { getConfirmDetail } from '@/api/order'

export const confirmStore = defineStore('confirmStore', {
  state: () => {
    return {
      isShoppingBagValid: null,
      shoppingBagValidError: null,
      shopData: {},
      choseGoodsData: {}
    }
  },
  getters: {
    ssrData (state) {
      return state.$state
    }
  },
  actions: {
    async getConfirmDetail (params, ctx) {
      try {
        const { data: { shopInfo, choseGoods } } = await getConfirmDetail({
          shoppingBagId: params.shoppingBagId
        }, ctx)
        shopInfo.pos = `${shopInfo.pos.lat}, ${shopInfo.pos.lng}`
        // 赋值
        this.shopData = shopInfo
        this.choseGoodsData = choseGoods
        this.isShoppingBagValid = true
      } catch (err) {
        console.log('=>(confirm.js:30) catch err', err)
        this.isShoppingBagValid = false
        this.shoppingBagValidError = err.data
      }
    }
  }
})
