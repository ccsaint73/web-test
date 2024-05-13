import axios from 'axios'
import { Message } from 'element-ui'
// import { formatSignature } from '@/utils/sign'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// console.log(process.env, 'env')

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: 'https://test.beijingcloud.com.cn/szr/web/',
    baseURL: 'https://szr.beijingcloud.com.cn/web/',
    // 超时
    timeout: 60000
})

// 请求拦截器
service.interceptors.request.use(config => {
    let secret = window.localStorage.getItem('BJY-Digital-Secret')
    let token = window.localStorage.getItem('BJY-Digital-Token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    const clientId = 'SZR_WEB'

    // formatSignature(config, service, secret, clientId)
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // console.log(res);
    // 未设置状态码则默认成功状态
    const code = res.code || res.data.code || 0;
    // 获取错误信息
    if (code == 200 || code == 1) {
        if (res.headers['x-auth-token']) {
            window.localStorage.setItem('BJY-Digital-Token', res.headers['x-auth-token'])
        }
        //return res.data
        return res.data || res
    } else {
        if (res?.data?.error?.message) {
            Message({
                message: res?.data?.error?.message,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res?.data?.error?.message))
        }

        return {}
    }
},
    error => {

        if (error?.response?.data?.code === 401) {
            window.localStorage.removeItem('BJY-Digital-UserId')
            window.localStorage.removeItem('BJY-Digital-Phone')
            window.localStorage.removeItem('BJY-Digital-Guid')
            window.localStorage.removeItem('BJY-Digital-Secret')
            window.localStorage.removeItem('BJY-Digital-Token')

            window.location.href = process.env.VUE_APP_HOME_URL
        }

        Message({
            message: error?.response?.data?.error?.message || '请求错误',
            type: 'error',
            duration: 5 * 1000
        })

        return Promise.reject(error)
        // return {}
    }
)

export const get = (url, params) => {
    return service.get(url, { params });
}

export const post = (url, params, config) => {
    return service.post(url, params, config)
}

export const del = (url, params, config) => {
    return service.delete(url, params, config)
}

export const patch = (url, params, config) => {
    return service.patch(url, params, config)
}

export const fmPost = (url, params, config) => {
    const fm = new FormData()

    for (let key in params) {
        fm.append(`${key}`, params[key])
    }

    return service.post(url, fm, config)
}

export default service
