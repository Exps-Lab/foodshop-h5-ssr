import { createPinia } from 'pinia'
import { posStore } from '@pages/home/store/pos.js'
import { homeStore } from '@pages/home/store/home.js'

export const createStore = () => {
  const pinia = createPinia()
  posStore(pinia)
  homeStore(pinia)
  return pinia
}

export default createStore
