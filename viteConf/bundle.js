import glob from 'glob'
import path from "path";
import {fileURLToPath} from "url";
import { resolve } from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 获取所有的多页文件路径
export function generateInput() {
  // 模块认证标识
  const pageURl = resolve(__dirname, '../src/pages/**/app.js')

  let pageEntry = {};
  const modulesNameArr = [];

  const allEntry = glob.sync(pageURl);
  allEntry.forEach(entry => {
    const pad = entry.split('/');
    const name = pad[pad.length - 3];

    modulesNameArr.push(name)
    // 命名input配置列表
    pageEntry[name] = pad.slice(0, pad.length - 2).join('/')  + '/index.html';
  });

  return {
    pageEntry,
    modulesNameArr
  }
}

export default {
  cssCodeSplit: false,
  sourcemap: process.env.NODE_ENV === 'production',
  rollupOptions: {
    input: {
      ...generateInput().pageEntry,
    }
  }
}
