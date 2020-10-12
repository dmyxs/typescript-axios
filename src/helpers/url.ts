import { isDate, isPlainObject } from './util'

// 创建生成url：可以传数组，对象，特殊字符，判断是null，
export function buildURL(url: string, params?: any): string {
  // 如果没有传params，直接返回url
  if (!params) {
    return url
  }

  // 键值对数组
  const parts: string[] = []

  // params是一个对象
  Object.keys(params).forEach(key => {
    const val = params[key]
    console.log(val)
    // 如果是空值
    if (val === null || typeof val === 'undefined') {
      return
    }

    // 统一变成数组：因为val有可能是数组，也有可能不是，需要处理
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    // console.log(values)

    values.forEach(val => {
      // 如果是时间类型
      if (isDate(val)) {
        val = val.toISOString()

        // 如果是对象类型
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  //   console.log(parts)

  // 拼接成字符串，数组内有两个值的才拼接，如果只有一个值，会只返回该值而不添加&
  // www.dmyxs.com/user?name="li"&age=18#
  let seriqlizedParams = parts.join('&')
  //   console.log(seriqlizedParams)

  if (seriqlizedParams) {
    // 去除#
    const marIndex = url.indexOf('#')
    if (marIndex !== -1) {
      url = url.slice(0, marIndex)
    }

    // 处理？或 &
    // 判断url是否已经出现？如果没有加？，有就加&号
    url += (url.indexOf('?') === -1 ? '?' : '&') + seriqlizedParams
  }

  return url
}

// 处理特殊字符：替换掉一些字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
