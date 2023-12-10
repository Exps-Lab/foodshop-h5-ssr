import { renderToString } from 'vue/server-renderer'
import { createApp } from './app.js'

export async function render (url) {
  const { app, router, store } = createApp()
  await router.push(url)
  await router.isReady()

  // 匹配路由是否存在
  const matchedComponents = router.currentRoute.value.matched.map((i) => {
    return i.components.default
  })
  // 存在路由
  if (matchedComponents.length) {
    await Promise.all(matchedComponents.map(async component => {
      if (component.asyncData) {
        return component.asyncData(store)
      }
      return null
    }))
  }

  const ctx = {}
  const html = await renderToString(app, ctx)
  return [html, store.state.value]
}
