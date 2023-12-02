import { createSSRApp } from 'vue'
import App from '../App.vue'
import '@common/styles/reset.less'
// [note]引入Vant中函数组件css
import '@common/vantFunctionComponentsCss'
// import { initSentry } from '@viteConf/sentryConf'

function createApp () {
  const app = createSSRApp(App)
  // initSentry(app)

  return { app }
}

export { createApp }
