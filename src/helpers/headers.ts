// 处理请求头

import { isPlainObject } from './util'

// header名字处理
function normalizeHeaderName(headers: any, normalizedName: string): void {
  //   console.log(headers)

  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    // console.log(name)

    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 处理请求头
export function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  // 如果data是对象才处理请求头
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 将返回的数据转成对象格式
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null) // 创建空对象

  if (!headers) {
    return parsed
  }
  // console.log(headers)

  // 使用回车符和换行符分割
  headers.split('\r\n').forEach(line => {
    // console.log(line)

    // 以：分割，解构
    let [key, val] = line.split(':')

    // key去除空格转小写
    key = key.trim().toLowerCase()
    // console.log(key, val)

    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }

    // 动态生成对象
    parsed[key] = val
  })

  return parsed
}
