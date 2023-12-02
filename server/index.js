
// 根据不同的环境加载server
const isProduction = process.env.NODE_ENV === 'production'
const { createServer } = isProduction
  ? await import('./createProdServer.js')
  : await import('./createDevServer.js')

createServer()
