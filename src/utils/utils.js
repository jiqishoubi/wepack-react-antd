/**
 * @description 生成随机字符串
 * @param {number} [num=7]
 */
export const randomStrKey = (num = 7) => {
  return Math.random().toString(36).substr(2, num)
}
