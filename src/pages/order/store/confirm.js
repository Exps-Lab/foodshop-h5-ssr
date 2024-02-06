
import { defineStore } from 'pinia'
import { getConfirmDetail } from '@/api/order'
import { useOrderInfo } from '@pages/order/hooks/orderInfo.js'

export const confirmStore = defineStore('confirmStore', {
  state: () => {
    return {
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
      const { handleErr } = useOrderInfo()
      try {
        const { data: { shopInfo, choseGoods } } = await getConfirmDetail({
          shoppingBagId: params.shoppingBagId
        }, ctx)
        shopInfo.pos = `${shopInfo.pos.lat}, ${shopInfo.pos.lng}`
        // 赋值
        this.shopData = shopInfo
        this.choseGoodsData = choseGoods
      } catch (err) {
        handleErr(err)
      }
    }
  }
})
