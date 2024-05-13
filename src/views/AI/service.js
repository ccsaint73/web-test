import { get, post, fmPost } from "./api";
import { getToken } from "@/utils/auth"
import { getTicketDetail } from "@/api/home"

// const baseUrl = 'https://test.beijingcloud.com.cn/szr/api/mt'
// const suffix = `userName=15010167519&debug=true`

const baseUrl = 'https://szr.beijingcloud.com.cn/api/mt'

const params = {
    token: getToken(),
    type: "bjc_digital",
}

export const handleUpload = (file, ticket, signature, app_id) => {
    const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

    return fmPost(`${baseUrl}/upload?${suffix}`, { file }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 扩图api
export const handleImageExt = (params) => {

    return new Promise((resolve, reject) => {
        getTicketDetail(params).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            post(`${baseUrl}/add?${suffix}`, params).then((res) => resolve(res))
        })
    })
}

// 查询制作进度
export const getImageExtProgress = (id, taskId) => {

    return new Promise((resolve, reject) => {
        getTicketDetail(params).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            get(`${baseUrl}/getResult?taskId=${taskId}&id=${id}&${suffix}`).then((res) => resolve(res))
        })
    })
}

// 获取历史记录
export const getImageExtHistory = () => {

    return new Promise((resolve, reject) => {
        getTicketDetail(params).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            get(`${baseUrl}/_search?orderBy=createTime desc&${suffix}`).then(res => resolve(res))
        })
    })
}

