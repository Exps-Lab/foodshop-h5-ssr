import { createApp } from './app.js'

const { app, router, store } = createApp()

// wait until router is ready before mounting to ensure hydration match
if (router) {
  router.isReady().then(() => {
    app.mount('#app')
    console.log(store)
  })
} else {
  app.mount('#app')
}
