import { createPinia } from 'pinia'
import { confirmStore } from '@pages/order/store/confirm.js'

export const createStore = () => {
  const pinia = createPinia()
  confirmStore(pinia)
  return pinia
}

export default createStore
