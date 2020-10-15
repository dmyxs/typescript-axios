// 创建实例，从核心中new一个Axios 实例

import { AxiosInstance, AxiosRequestConfig } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './types/defaults'

// 创建实例，返回实例对象
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)

  // 绑定this
  const instance = Axios.prototype.request.bind(context)

  // 拷贝
  extend(instance, context)

  // 断言为AxiosInstance
  return instance as AxiosInstance
}

// 混合对象，实际调用的是request
const axios = createInstance(defaults)
// console.log(axios);

export default axios
