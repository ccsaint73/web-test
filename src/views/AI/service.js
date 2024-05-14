import { get, post, fmPost } from "./api";
import { getToken } from "@/utils/auth"
import { getTicketDetail } from "@/api/home"

// const baseUrl = 'https://test.beijingcloud.com.cn/szr/api/mt'
// const suffix = `userName=15010167519&debug=true`

const baseUrl = 'https://szr.beijingcloud.com.cn/api/mt'

const tp = {
    token: getToken(),
    type: "bjc_digital",
}

export const handleUpload = (file) => {
    return new Promise((resolve, reject) => {
        getTicketDetail(tp).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            fmPost(`${baseUrl}/upload?${suffix}`, { file }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => resolve(res))
        })
    })
}

// 扩图api
export const handleImageExt = (params) => {

    return new Promise((resolve, reject) => {
        getTicketDetail(tp).then((response) => {
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
        getTicketDetail(tp).then((response) => {
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
        getTicketDetail(tp).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            get(`${baseUrl}/_search?orderBy=createTime desc&${suffix}`).then(res => resolve(res))
        })
    })
}

// 
export const handleTxt2Img = (params) => {

    return new Promise((resolve, reject) => {
        getTicketDetail(tp).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            post(`${baseUrl}/txt2img/add?${suffix}`, params).then((res) => resolve(res))
        })
    })
}


// 获取历史记录
export const getTxt2ImgHistory = (type = 1) => {

    return new Promise((resolve, reject) => {
        getTicketDetail(tp).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            get(`${baseUrl}/txt2img/_search?orderBy=createTime desc&type=${type}&${suffix}`).then(res => resolve(res))
        })
    })
}

export const getTxt2ImgProgress = (id, taskId) => {

    return new Promise((resolve, reject) => {
        getTicketDetail(tp).then((response) => {
            const ticket = response.data.ticket
            const signature = response.data.signature
            const app_id = response.data.app_id

            const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

            get(`${baseUrl}/txt2img/getResult?taskId=${taskId}&id=${id}&${suffix}`).then((res) => resolve(res))
        })
    })
}

export const getImageProgress = async (id, taskId) => {

    try {
        const res = await getTicketDetail(tp)

        const { ticket, signature, app_id } = res.data

        const suffix = `ticket=${ticket}&signature=${signature}&app_id=${app_id}`

        const response = await get(`${baseUrl}/txt2img/getResult?taskId=${taskId}&id=${id}&${suffix}`)

        return response
    } catch (error) {
        console.log(error)
    }
}