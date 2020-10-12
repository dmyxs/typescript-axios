// 类型定义文件

// ts类型别名
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 通用请求接口
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // xml原生类型对象
  timeout?: number
}

// 数据返回的接口
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// promise接口: 使用ts的继承 + 泛型接口
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 错误接口
export interface AxiosError extends Error {
  isAxiosError: boolean //
  config: AxiosRequestConfig // 配置
  code?: string | null
  request?: any // 请求
  response?: AxiosResponse // 响应
}

// 混合对象接口，支持多个方法,
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// 实例函数接口
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise

  // 双参数实现
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
