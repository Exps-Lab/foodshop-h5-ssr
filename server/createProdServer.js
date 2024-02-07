import express from 'express'
import fs from 'fs'
import { generateInput } from '../viteConf/bundle.js'

const { modulesNameArr } = generateInput()

import jsdom from 'jsdom'
const { JSDOM } = jsdom
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost:3333/",
})
global.location = dom.window.location;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;
global.sessionStorage = dom.window.sessionStorage;
global.onbeforeunload = dom.window.onbeforeunload;

// 判断url属于哪个模块
const includeModuleName = (url) => {
  let resModuleName = ''
  let baseUrl = url.split('?')[0]
  for (let module of modulesNameArr) {
    if (baseUrl.includes(module)) {
      resModuleName = module
      break
    }
  }
  return resModuleName
}

// 生成模块的资源链接
const generateTemplatePathMap = () => {
  return modulesNameArr.reduce((resMap, module) => {
    resMap[module] = {
      index: `./hi-user-ssr/client/src/pages/${module}/index.html`,
      server: `../hi-user-ssr/server/${module}.entry.server.js`
    }
    return resMap
  }, {})
}

const createServer = async () => {
  const app = express()
  const sirv = (await import('sirv')).default
  const compression = (await import('compression')).default

  app.use('/', sirv('./hi-user-ssr/client', { extensions: [] }))
  app.use(compression())
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      const moduleName = includeModuleName(url)
      const templatePathMap = generateTemplatePathMap()

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
