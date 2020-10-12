import axios from '../../src/index'

// get请求带params的7种情况
// params对象里传数组
// /base/get?foo[]=bar&foo[]=baz
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// // params对象里传对象
// // /base/get?foo=%7B%22bar%22:%22baz%22%7D
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// params对象里传日期
// /base/get?date=2020-10-12T08:37:56.647Z
// const date = new Date()
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// 特殊字符
// /base/get?foo=@:$,+
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// 对象的值为null
// /base/get?foo=bar
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// 带hash
// /base/get?foo=bar
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// 带查询参数
// /base/get?foo=bar&bar=baz
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })


// post请求带data的情况
// data，不设置header是text/plan普通字符串，会返回空对象
// 传递的是json字符串，这里header已经做了默认处理
// {"a":1,"b":2}
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// buffer类型
// {"type":"Buffer","data":[21,0,0,0,31,0,0,0]}
// const arr = new Int32Array([21, 31])
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

// 添加请求头
// {"a":1,"b":2}
// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8',
//     'Accept': 'application/json,text/plain, */*'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// URLSearchParams对象 - formData对象
// Content-Type: application/x-www-form-urlencoded;charset=UTF-8
// 浏览器自动添加合适的Content-Type
// {"q":"URLUtils.searchParams","topic":"api"}
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const tao = 'name=tao&age=32'
// const searchParams = new URLSearchParams(tao)
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })



// 获取返回数据的测试：返回字符串
// 默认返回字符串，这里设置了如果不传responseType，也是返回对象
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json', // 返回对象
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(res)
})
