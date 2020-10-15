// 将定义的接口类型暴露出去给外部使用，不然访问不到
// error处理需要用到

import axios from './axios'

export * from './types'

export default axios
