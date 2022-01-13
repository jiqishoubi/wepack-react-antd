import request from '@/utils/request'

const initialState = {
  token: '',
  userInfo: null
}

const model = {
  name: 'login',
  state: initialState,
  actions: {
    async getInitInfo({ dispatch, getState, payload }) {
      dispatch('login/getUserInfo')
    },
    async getUserInfo({ dispatch, getState, payload }) {
      const data = await request({
        url: '/web/getLoginUserInfo'
      })
      if (data) {
        dispatch('login/save', {
          userInfo: data
        })
      }
    }
  },
  reducers: {
    save({ state, payload, dispatch }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default model
