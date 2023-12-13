// 获取定位中经纬度信息

import { defineStore } from 'pinia'
import { getPosByTX, getPosByTXIP } from '@utils/getAccuratePos'
import { HOMECHOSEPOS } from '@utils/sessionStorage_keys.js'

export const posStore = defineStore('posStore', {
  state: () => {
    return {
      posData: {},
      positioning: false,
      constData: {
        isPosing: true,
        pos: ''
      }
    }
  },
  getters: {
    firstPosStr (state) {
      const { lat, lng } = state.posData
      return `${lat},${lng}`
    }
  },
  actions: {
    async getPosByTXReq (option = {}) {
      this.positioning = true
      try {
        this.posData = await getPosByTX(option)
        return this.posData
      } catch {
        return {}
      } finally {
        this.positioning = false
      }
    },
    async getPosByTXReqIP (option = {}) {
      this.positioning = true
      try {
        this.posData = await getPosByTXIP()
        return this.posData
      } catch {
        return {}
      } finally {
        this.positioning = false
      }
    },
    // 首页获取定位信息
    async getPos () {
      if (!import.meta.env.SSR) {
        const { title = '' } = JSON.parse(sessionStorage.getItem(HOMECHOSEPOS)) || {}
        if (title) {
          this.constData.pos = title
          this.constData.isPosing = false
          return true
        }
        const { addr, district, city } = await this.getPosByTXReq()
        this.constData.pos = addr || district || city
        this.constData.isPosing = false
      } else {
        const { addr, district, city } = await this.getPosByTXReqIP()
        this.constData.pos = addr || district || city
        this.constData.isPosing = false
      }
    }
  }
})
