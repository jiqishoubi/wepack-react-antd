/* eslint-disable no-unused-vars */
function toggleCollapsedAjax(flag) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(!flag)
    }, 1000)
  })
}

const initialState = {
  isCollapsed: false,
}

const model = {
  name: 'global',
  state: initialState,
  actions: {
    async toggleCollapsedFunc({ dispatch, getState, payload }) {
      await toggleCollapsedAjax()
      const state = getState().global
      dispatch('global/save', {
        isCollapsed: !state.isCollapsed,
      })
    },
  },
  reducers: {
    save({ state, payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export default model
