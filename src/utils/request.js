import axios from 'axios'
import { message } from 'antd'
import { ENV_CONFIG, STORAGE_TOKEN_KEY } from './consts'

const ERROR_MESSAGE = '网络异常'

/**
 *
 * @param {object} options
 * @param {string} [options.method='post']
 * @param {string} options.url
 * @param {object} options.data
 * @param {object} options.headers
 * @param {boolean} [options.isNeedErrMsg=true] 是否需要弹出错误信息
 * @returns
 */
function request(options) {
  const {
    method = 'post',
    url: urlParam,
    data,
    headers,
    isNeedErrMsg = true,
    ...restOptions
  } = options

  const token = localStorage.getItem(STORAGE_TOKEN_KEY) || null

  // data
  const postData = {
    ...data,
    sessionId: token
  }

  // url
  let url = urlParam
  if (token) {
    url = `${url}?sessionId=${token}`
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        method,
        url:
          url.indexOf('http:') > -1 || url.indexOf('https:') > -1
            ? url
            : ENV_CONFIG.apiPath + url,
        data: postData,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        timeout: 60 * 1000,
        ...restOptions
      })
      .then((res) => {
        if (res.data?.code === '0') {
          // 正常走通 resolve
          resolve(res.data.data || {})
        } else {
          reject(res.data)
          if (isNeedErrMsg) message.error(res.data?.message || ERROR_MESSAGE)
        }
      })
      .catch((err) => {
        console.log(err)
        reject(JSON.stringify(err))
        if (isNeedErrMsg) message.error(ERROR_MESSAGE)
      })
  })
}

export default request
