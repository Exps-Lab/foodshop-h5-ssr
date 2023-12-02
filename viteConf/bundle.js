import glob from 'glob'
import { resolve } from 'path'

// 公共的index模板
const pageURl = resolve(__dirname, '../src/pages/**/app.js')
const { NODE_ENV: mode } = process.env

// 获取所有的多页文件路径
function generateInput() {
  let pageEntry = {};
  const allEntry = glob.sync(pageURl);

  allEntry.forEach(entry => {
    const pad = entry.split('/');
    const name = pad[pad.length - 3];

    // 命名input配置列表
    pageEntry[name] = pad.slice(0, pad.length - 2).join('/')  + '/index.html';
  });

  return pageEntry
}

export default {
  cssCodeSplit: false,
  sourcemap: mode === 'production',
  rollupOptions: {
    input: {
      ...generateInput(),
    }
  }
}
