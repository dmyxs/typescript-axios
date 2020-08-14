import { isPlainObject } from './util'

// 处理请求data，因为ajax的send不能处理对象，所有需要转成JSON字符串
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 对返回的数据处理：如果是JSON字符串，就解析成对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.error(e)
    }
  }
  return data
}
