import { createPinia } from 'pinia'
import { homeStore } from '@pages/home/store/home.js'
import { shopDetailStore } from '@pages/home/store/shop_detail.js'

export const createStore = () => {
  const pinia = createPinia()
  homeStore(pinia)
  shopDetailStore(pinia)
  return pinia
}

export default createStore
