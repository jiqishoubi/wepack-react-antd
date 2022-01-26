// 初始化一个全局的model、且分模块管理
import generateModel from '@/redux'
import global from './modules/global'
import login from './modules/login'
const { connectProvider, useModel } = generateModel([global, login])
export const connectAppProvider = connectProvider
export default useModel
