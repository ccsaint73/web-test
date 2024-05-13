import COS from 'cos-js-sdk-v5';
import { getUploadToken } from './service'

// 鼠标是否在节点内
export const isNodeInside = (e, node, scale = 1) => {
    return (
        e.offsetX > node.x * scale &&
        e.offsetX < (node.x + node.width) * scale &&
        e.offsetY > node.y * scale &&
        e.offsetY < (node.y + node.height) * scale
    )
}

export const formatCOSClient = (res) => {
    const token = res
    return new COS({
        getAuthorization: function (options, callback) {
            callback({
                TmpSecretId: token.payload.credentials.tmpSecretId,
                TmpSecretKey: token.payload.credentials.tmpSecretKey,
                SecurityToken: token.payload.credentials.token,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                // StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: token.payload.expiredTime, // 时间戳，单位秒，如：1580000000
            });
        }
    });
}

// 腾讯oss
export const upload2COS = (file) => {
    return new Promise((resolve, reject) => {

        getUploadToken().then((res) => {
            if (res.code === 200) {
                try {
                    const json = JSON.parse(res.data)

                    const url = new URL(json.payload.pathPrefix)

                    const bucket = url.host.split(".")[0]
                    const region = url.host.split(".")[2]
                    const key = url.pathname
                    const type = "photo/"

                    // 创建客户端
                    const client = formatCOSClient(json)

                    client.uploadFile(
                        {
                            Bucket: bucket /* 填写自己的 bucket，必须字段 */,
                            Region: region /* 存储桶所在地域，必须字段 */,
                            Key: `${key}${type}${file.name}`,
                            Body: file, // 上传文件对象
                        },
                        (err, data) => {
                            if (!err && data.Location) {
                                resolve(`https://${data.Location}`)
                            }
                        },
                    )
                } catch (error) {
                    reject(error)
                }
            } else {
                reject()
            }
        })
    })
}