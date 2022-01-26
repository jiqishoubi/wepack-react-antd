/* eslint-disable no-unused-vars */
import lodash from 'lodash'
import request from '@/utils/request'
import dealMenu from '@/utils/dealMenu'
import { LOGIN_TOKEN_KEY } from '@/utils/consts'

const initialState = {
  token: '',
  userInfo: null,
  // 菜单
  allMenu: [],
  menuTree: [],
  rightsArr: [],
}

const model = {
  name: 'login',
  state: lodash.cloneDeep(initialState),
  actions: {
    async initInfo({ dispatch, getState, payload }) {
      dispatch('login/getUserInfo')
      dispatch('login/getMenuTree')
    },
    async getUserInfo({ dispatch, getState, payload }) {
      const data = await request({
        url: '/web/getLoginStaffInfo',
      })
      if (data) {
        dispatch('login/save', {
          userInfo: data,
        })
      }
    },
    async getMenuTree({ dispatch, getState, payload }) {
      const data = await request({
        url: '/web/menu/getAllMenuList',
      })
      const menuRes = dealMenu(data)
      dispatch('login/save', {
        allMenu: menuRes.allMenu ?? [],
        menuTree: menuRes.menuTree ?? [],
        rightsArr: menuRes.rightsArr ?? [],
      })
    },
    async logout({ dispatch, getState, payload }) {
      localStorage.removeItem(LOGIN_TOKEN_KEY)
      dispatch('login/save', initialState)
    },
  },
  reducers: {
    save({ state, payload, dispatch }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export default model
