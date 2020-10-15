// 方法拓展

import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

// 拦截器
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  // 实现函数重载，核心方法
  // 实现axios调用时支持双参数：url设置为any是为了兼容
  request(url: any, config?: any): AxiosPromise {
    //   console.log(url);

    // 如果传了第一个参数是url字符串，就有可能是两个参数的类型
    if (typeof url === 'string') {
      // 第二个参数没有传的情况，设置为空
      if (!config) {
        config = {}
      }
      // 给config赋值，因为真正发送请求的是dispatchRequest，使用的是接口（对象），url在config里
      config.url = url
    } else {
      // 如果只传了一个参数，url就是第一个参数，其实是传递过来的config对象
      config = url
    }
    // console.log(url);
    // console.log(config);

    // 配置合并
    config = mergeConfig(this.defaults, config)

    // Promise的调用链
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // 使用内部定义的forEach遍历拦截器
    // 添加请求拦截器 到执行数组
    this.interceptors.request.forEach(interceptor => {
      // 后添加先执行
      chain.unshift(interceptor)
    })

    // 添加响应拦截器 到执行数组
    this.interceptors.response.forEach(interceptor => {
      // 后添加先执行
      chain.push(interceptor)
    })

    // 链式调用
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    // return dispatchRequest(config)
    return promise
  }

  // get方法
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  // delete方法
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  // head方法
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  // options方法
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  // post方法  + data
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  // put方法  + data
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  // patch方法  + data
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  // 封装方法
  // 请求方法 + 没有data，不能传data
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      // 对象合并，config可能为空，设置空对象
      Object.assign(config || {}, {
        method: method,
        url
      })
    )
  }

  // 请求方法 + 有data
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      // 对象合并
      Object.assign(config || {}, {
        method: method,
        url,
        data
      })
    )
  }
}
