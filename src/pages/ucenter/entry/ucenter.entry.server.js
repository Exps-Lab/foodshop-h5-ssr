import { renderToString } from 'vue/server-renderer'
import { createApp } from './app.js'

export async function render (url, ctx) {
  const { app, router } = createApp()

  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)
  return [html]
}
