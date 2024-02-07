
import { defineStore } from 'pinia'
import { getOrderDetail } from '@/api/order'

export const orderDetailStore = defineStore('orderDetailStore', {
  state: () => {
    return {
      orderInfo: {}
    }
  },
  getters: {
    ssrData (state) {
      return state.$state
    }
  },
  actions: {
    async getOrderDetail (params, ctx) {
      try {
        const { data } = await getOrderDetail({
          orderNum: params.orderNum
        }, ctx)
        this.orderInfo = data || {}
      } catch (err) {
        console.log('=>(confirm.js:30) catch err', err)
      }
    }
  }
})
