// 类型判断文件

const toString = Object.prototype.toString

// 时间 返回：使用ts的类型保护
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 对象判断
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 继承 使用ts的泛型函数
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]

        // 如果值还是对象
        if (isPlainObject(val)) {
          // result[key]还是对象
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
