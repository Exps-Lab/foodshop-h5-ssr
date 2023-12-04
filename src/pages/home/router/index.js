import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/home/roiPicker',
    name: 'roiPicker',
    component: () => import('../views/roi_picker/index.vue')
  },
  {
    path: '/home/chooseCity',
    name: 'chooseCity',
    component: () => import('../views/choose_city/index.vue')
  },
  {
    path: '/home/searchResult',
    name: 'searchResult',
    component: () => import('../views/search_result/index.vue')
  },
  {
    path: '/home/shopTopic',
    name: 'shopTopic',
    component: () => import('../views/shop_topic/index.vue')
  },
  {
    path: '/home/shopDetail',
    name: 'shopDetail',
    component: () => import('../views/shop_detail/index.vue')
  },
  {
    path: '/home/shopDetail/map',
    name: 'shopDetailMap',
    component: () => import('../views/shop_detail/show_in_map.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../../404.vue')
  }
]

function createRouter () {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}

export { createRouter }
