import { renderToString } from 'vue/server-renderer'
import { createApp } from './app.js'

export async function render (url) {
  const { app, router, store } = createApp()

  await router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)
  return [html, store.state.value]
}
