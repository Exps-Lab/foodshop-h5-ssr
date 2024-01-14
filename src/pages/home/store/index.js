import { createPinia } from 'pinia'
import { homeStore } from '@pages/home/store/home.js'

export const createStore = () => {
  const pinia = createPinia()
  homeStore(pinia)
  return pinia
}

export default createStore
