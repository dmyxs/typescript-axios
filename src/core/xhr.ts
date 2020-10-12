// 定义xhr

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

// ts使用接口，返回接口
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()
    // 如果自己设置了responseType，就用设置的
    if (responseType) {
      request.responseType = responseType
    }

    // 请求超时设置：默认是0，如果己设置了timeout，就用设置的
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      if (request.status === 0) {
        return
      }

      // parseHeaders将返回的字符串数据转成对象格式
      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 原生方法
      // 数据的响应类型：如果传递了responseType，并且不等于text（字符串），就返回对象格式
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText

      // 构建返回的对象
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 处理网络错误，使用自定义的错误处理
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 处理超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, null, request))
    }

    // 设置header
    Object.keys(headers).forEach(name => {
      // 如果data为空，没有请求data，有content-type，就删除
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        // 原生方法 设置请求头
        request.setRequestHeader(name, headers[name])
      }
    })

    // 发送请求
    request.send(data)

    // 处理状态码错误
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && request.status < 300) {
        resolve(response) // 请求成功
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
