import axios from '../../src/index'


// 请求拦截 在headers.test 添加数字
// 结果test: 321
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
let interceptor1 =  axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})


// 删除第3个请求拦截器
axios.interceptors.request.eject(interceptor1)


// 响应拦截
axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})

let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

// 删除第2个响应拦截器
axios.interceptors.response.eject(interceptor)


// 请求测试
axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
//   console.log(res)
  console.log(res.data)  // hello13
})
