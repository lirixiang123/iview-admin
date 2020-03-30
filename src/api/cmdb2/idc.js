import axios from '@/libs/api.request'

// 获取IDC list

export const getIDClist= (key, value) => {
    return axios.request({
        url: '/cmdb/idcs/',
        method: 'get',
        params: {
        key,
        value,
        }
    })
}

// 操作IDC管理
export const operationIdc = (data, meth) => {
    return axios.request({
      url: '/cmdb/idcs/',
      method: meth,
      data
    })
  }