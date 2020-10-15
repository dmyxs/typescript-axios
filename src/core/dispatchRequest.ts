// 发送请求

import { AxiosRequestConfig, AxiosPromise } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeader, flattenHeaders } from '../helpers/headers'
import { AxiosResponse } from '../types/index'

// 派发请求，返回promise对象
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 在发起请求之前，处理请求设置config
  processConfig(config)
  // 发送请求
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 在发送请求前对url进行处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 这里要先处理headers，不然data就转成JSON了
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理请求url
// ts类型断言 不为空：加！
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理请求body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理请求header
function transformHeaders(config: AxiosRequestConfig): any {
  // 没传header默认是对象，以便processHeader判断处理
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

// 处理返回的data
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
