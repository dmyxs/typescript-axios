// 处理请求头

import { isPlainObject } from './util'

// 处理请求头：添加Content-Type
// 依赖config中的header 和 data
export function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  // 如果data是对象才处理请求头
  if (isPlainObject(data)) {
    // 有headers，并且没有配置Content-Type
    if (headers && !headers['Content-Type']) {
      // 默认转换为application/json
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// header名字处理：大小写
function normalizeHeaderName(headers: any, normalizedName: string): void {
  //   console.log(headers)
  if (!headers) {
    return
  }

  // name就是每一项的key
  Object.keys(headers).forEach(name => {
    // console.log(name)

    // 如果headers的Content-Type 不等于 上面传入的Content-Type，因为可能是小写
    // 并且 转换后是等于的情况就是使用Content-Type，删除旧有的
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 将返回的字符串数据转成对象格式
export function parseHeaders(headers: string): any {
  // 创建空对象
  let parsed = Object.create(null)

  // 如果headers不存在，就返回空对象
  if (!headers) {
    return parsed
  }
  console.log(headers)

  // 使用回车符和换行符分割
  headers.split('\r\n').forEach(line => {
    console.log(line)

    // 以：分割，解构
    let [key, val] = line.split(':')

    // key去除空格转小写
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    // 生成对象
    parsed[key] = val
  })

  return parsed
}
