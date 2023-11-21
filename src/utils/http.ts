import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需要拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时，默认 60s
    options.timeout = 10000
    // 3. 添加小程序端请求标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    // console.log(options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadfile', httpInterceptor)

/**
 * 封装请求函数
 * @param options
 * @returns
 */

interface Data<T> {
  code: string
  msg: string
  result: T
}

// 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回 Promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功
      success(res) {
        // 状态码再 2xx 范围内
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 提取核心数据
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401 未登录 清理登录信息，跳转到登录页面
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          // 跳转到登录页面
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            title: (res.data as Data<T>).msg || '请求失败',
            icon: 'none',
          })
          reject(res)
        }
      },
      // 请求失败
      fail(err) {
        reject(err)
      },
    })
  })
}
