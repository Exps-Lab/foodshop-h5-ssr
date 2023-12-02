import { createSSRApp } from 'vue'
import App from '../App.vue'
import { createRouter } from '../router/index.js'
import { createStore } from '../store/pos.js'
import Toast from '@/plugins/Toast'
import '@common/styles/reset.less'
import '@common/styles/common-style.less'
import '@common/styles/btn_style.less'
// [note]引入Vant中函数组件css
import '@common/vantFunctionComponentsCss'
import { installDirectives } from '@common/directives'
// import { initSentry } from '@viteConf/sentryConf'

function createApp () {
  const app = createSSRApp(App)
  const router = createRouter()
  const store = createStore()

  app.use(router)
  app.use(store)
  app.use(Toast)

  // initSentry(app, router)
  installDirectives(app)

  return { app, router, store }
}

export {
  createApp
}
