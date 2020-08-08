// 类型定义文件

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

// 请求接口
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

// 数据返回的接口
export interface AxiosResponse {
  data: any
  status: number
  headers: any
  config: AxiosResponse
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
