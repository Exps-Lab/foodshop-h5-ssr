import express from 'express'
import fs from 'fs'

const includeModuleName = (url) => {
  let resModuleName = ''
  const modulesArr = ['home', 'login', 'order', 'ucenter']
  for (let module of modulesArr) {
    if (url.includes(module)) {
      resModuleName = module
      break
    }
  }
  return resModuleName
}

const createServer = async () => {
  const app = express()
  const sirv = (await import('sirv')).default

  app.use('/', sirv('./hi-user-ssr/client', { extensions: [] }))
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      const moduleName = includeModuleName(url)
      const templatePathMap = {
        'home': {
          index: './hi-user-ssr/client/src/pages/home/index.html',
          server: '../hi-user-ssr/server/home.entry.server.js',
        },
        'login': {
          index: './hi-user-ssr/client/src/pages/login/index.html',
          server: '../hi-user-ssr/server/login.entry.server.js',
        },
        'order': {
          index: './hi-user-ssr/client/src/pages/order/index.html',
          server: '../hi-user-ssr/server/order.entry.server.js',
        },
        'ucenter': {
          index: './hi-user-ssr/client/src/pages/ucenter/index.html',
          server: '../hi-user-ssr/server/ucenter.entry.server.js',
        },
      }

      if (moduleName) {
        const templateIndexHtml = fs.readFileSync(templatePathMap[moduleName].index, 'utf-8')
        const ssrManifest = fs.readFileSync('./hi-user-ssr/client/ssr-manifest.json', 'utf-8')

        const { render } = await import(templatePathMap[moduleName].server)
        const [ renderedHtml, renderState ] = await render(url, ssrManifest)

        // 传递 Pinia 状态管理，自定义 window 属性 __store。
        let appState = '';
        if (renderState) {
          appState = "<script>window.__store='" + JSON.stringify(renderState) + "'</script>";
        }

        const html = templateIndexHtml
          .replace(`<!--app-html-->`, renderedHtml)
          .replace(`<!--app-state-->`, appState);

        res.status(200).set({'Content-Type': 'text/html'}).end(html)
      } else {
        res.status(404).set({'Content-Type': 'text/text'}).end('404啦~~');
      }
    } catch (e) {
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(3333)
  console.log(`Server running at http://localhost:3333`)
}

export {
  createServer
}
