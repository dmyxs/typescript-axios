// 配置合并，及合并策略

import { isPlainObject, deepMerge } from '../helpers/util'
import { AxiosRequestConfig } from '../types/index'

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  // 创建空对象
  const config = Object.create(null)

  // 遍历config2
  for (let key in config2) {
    mergeField(key)
  }

  // 遍历config1，因为有些是config2可能没有的值
  for (let key in config1) {
    // 如果key不在config2中
    if (!config2[key]) {
      mergeField(key)
    }
  }

  // 定义合并字段的函数
  function mergeField(key: string): void {
    // key优先使用用户传递的配置，如果没有，就使用默认的
    // 策略函数
    const strat = strats[key] || defaultStrat

    // 这里必须使用索引签名，否则是未知的值
    config[key] = strat(config1[key], config2![key])
  }

  // 返回最终合并的对象
  // config1 = {method:'get',timeout:0}
  // config2 = {url:'./xxx', method:'post'}
  // 合并成： {url:'./xxx', method:'post', timeout:0}
  return config
  console.log(config)
}

// 策略对象
const strats = Object.create(null)

// 这些数据必须由用户传递：使用策略2
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  // 策略对象的key = 函数
  strats[key] = fromVal2Strat
})

// 默认策略1：
// 优先使用val2的值，用户传递的配置，如果没有就使用val1
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 策略2：只取用户传递的值
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 深度合并策略
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const StratKeysDeepMerge = ['headers']

StratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
