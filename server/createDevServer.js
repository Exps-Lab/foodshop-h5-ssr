import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { generateInput } from '../viteConf/bundle.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { modulesNameArr } = generateInput()

// 判断url属于哪个模块
const includeModuleName = (url) => {
  let resModuleName = ''
  for (let module of modulesNameArr) {
    if (url.includes(module)) {
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
      index: path.resolve(__dirname, `../src/pages/${module}/index.html`),
      server: path.resolve(__dirname, `../src/pages/${module}/entry/${module}.entry.server.js`)
    }
    return resMap
  }, {})
}

const createServer = async () => {
  const app = express()

  const vite= await import('vite')
  const viteServer = await vite.createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  app.use(viteServer.middlewares)

  app.get('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const moduleName = includeModuleName(url)
      const templatePathMap = generateTemplatePathMap()

      if (moduleName) {
        // 读取公共html，并用vite处理
        let template = fs.readFileSync(templatePathMap[moduleName].index, 'utf-8');
        template = await viteServer.transformIndexHtml(url, template);

        // 转换url为html
        const { render } = await viteServer.ssrLoadModule(templatePathMap[moduleName].server);
        const [ appHtml, renderState ] = await render(url);

        // 传递 Pinia 状态管理。自定义 window 属性 __pinia
        let appState = '';
        if (renderState) {
          appState = "<script>window.__store='" + JSON.stringify(renderState) + "'</script>";
        }

        const html = template
          .replace(`<!--app-html-->`, appHtml)
          .replace(`<!--app-state-->`, appState);
        res.status(200).set({'Content-Type': 'text/html'}).end(html);
      } else {
        res.status(404).set({'Content-Type': 'text/text'}).end('404啦~~');
      }
    } catch (err) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回你的实际源码中。
      viteServer?.ssrFixStacktrace(err);
      next(err);
    }
  })

  app.listen(3333)
  console.log(`Server running at http://localhost:3333`)
}

export {
  createServer
}
