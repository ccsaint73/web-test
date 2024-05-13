import request from '@/utils/request'

export function homeGetList (data) {
    return request({
        url: '/aindex/getList',
        method: 'post',
        data
    })
}

export function getTicketDetail (data) {
    return request({
        url: 'https://aiapi.beijingcloud.com.cn/web.php/BjcDigitalMan/getSign?token=663f3f10250eb34&type=bjc_digital',
        method: 'get',
    })
}
