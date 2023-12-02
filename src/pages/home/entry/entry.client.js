import { createApp } from './app.js'

const { app, router, store } = createApp()

// wait until router is ready before mounting to ensure hydration match
if (router) {
  router.isReady().then(() => {
    if (window.__store) {
      store.state.value = JSON.parse(window.__store)
    }
    app.mount('#app')
  })
} else {
  app.mount('#app')
}
