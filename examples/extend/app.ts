import axios from '../../src/index'

// 拓展请求方法
// url在config中
// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// 双参数实现
// axios('/extend/post', {
//     method: 'post',
//     data: {
//       msg: 'hello'
//     }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })


// 使用泛型接口
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
}

// 定义函数: T 是user，ResponseData是返回的是类型，接收user
function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

// 调用函数
async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user)
  }
}
test()
