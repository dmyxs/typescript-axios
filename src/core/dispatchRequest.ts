import { AxiosRequestConfig, AxiosPromise } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeader } from '../helpers/headers'
import { AxiosResponse } from '../types/index'

// 发送请求
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 在发送请求前对url进行处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理请求url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params) // 断言 不为空：加！
}

// 处理请求body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理请求header
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
