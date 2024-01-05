import { createPinia } from 'pinia'
import { posStore } from '@pages/home/store/pos.js'

export const createStore = () => {
  const pinia = createPinia()
  posStore(pinia)
  return pinia
}

export default createStore
