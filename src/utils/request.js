import { message } from 'antd'
import axios from 'axios'
import { ENV_CONFIG, LOGIN_TOKEN_KEY } from './consts'

const ERROR_MESSAGE = '网络异常'

// data过滤一下 null undefined
function haveValue(v) {
  if (v === null || v === undefined) {
    return false
  }
  return true
}

/**
 *
 * @param {object} options
 * @param {string} options.url
 * @param {any} options.data
 * @param {string} [options.method='post']
 * @param {object} [options.headers={}]
 * @param {boolean} [options.errMsg=true] 默认message弹出报错信息
 * @returns
 */
function request(options = {}) {
  const { url, data = {}, method = 'post', headers = {}, errMsg = true, ...restOptions } = options
  const token = localStorage.getItem(LOGIN_TOKEN_KEY) || null
  // postData
  let postData = {}
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const v = data[key]
      if (haveValue(v)) {
        postData[key] = v
      }
    }
  }
  // postUrl
  let postUrl = url.indexOf('http:') > -1 || url.indexOf('https:') > -1 ? url : ENV_CONFIG.apiPath + url
  if (token) {
    postUrl = `${postUrl}?sessionId=${token}`
  }
  return new Promise((resolve, reject) => {
    return axios
      .request({
        url: postUrl,
        method,
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "application/x-www-form-urlencoded",
          // "Content-Type": "multipart/form-data",
          ...headers,
        },
        data: postData,
        timeout: 60 * 1000,
        ...restOptions,
      })
      .then((response) => {
        if (response.data) {
          const res = response.data
          if (res.code == '0') {
            // 业务成功
            return resolve(res.data)
          } else if (res.code === '9999') {
            // 登录失效
            if (errMsg) {
              try {
                message.destroy()
              } catch (e) {
                console.log('request err', e)
              }
              message.warning(res.message || '登录失效')
            }
            // todo跳转
            return reject(res)
          } else {
            // 业务失败
            if (errMsg) message.warning(res.message || ERROR_MESSAGE)
            return reject(res)
          }
        } else {
          // 网络没通
          if (errMsg) message.warning(ERROR_MESSAGE)
          return reject(response)
        }
      })
      .catch((err) => {
        // 网络没通
        if (errMsg) message.warning(ERROR_MESSAGE)
        reject(err)
      })
  })
}

export default request
