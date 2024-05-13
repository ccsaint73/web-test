import { get, post, fmPost } from "./api";

const baseUrl = 'https://test.beijingcloud.com.cn/szr/api/mt'
const suffix = `userName=15010167519&debug=true`

// 查询腾讯oss的token
export const getUploadToken = () => post(`/BjcUtilApi/getTxToken`)

export const handleUpload = (file, ticket, signature, app_id) => {
    return fmPost(`${baseUrl}/upload?${suffix}`, { file: file }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 扩图api
export const handleImageExt = (params) => post(`${baseUrl}/add?${suffix}`, params)

// 查询制作进度
export const getImageExtProgress = (id, taskId) => get(`${baseUrl}/getResult?taskId=${taskId}&id=${id}&${suffix}`)

// 获取历史记录
export const getImageExtHistory = () => get(`${baseUrl}/_search?orderBy=createTime desc&${suffix}`)
