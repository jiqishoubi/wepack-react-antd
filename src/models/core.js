import { useContext, useRef, useEffect, useReducer } from 'react'
import lodash from 'lodash'

/**
 *
 * @param {object} allModel // {key:model}
 * @returns state
 */
export function getInitStateFunc(allModel) {
  const state = {}
  for (const key in allModel) {
    state[key] = allModel[key].state
  }
  return state
}

/**
 * 生成reducer
 * @param {object} options
 * @param {object} options.allModel
 * @returns
 */
export function generateReducer({ allModel }) {
  /**
   * reducer 原生的dispatch触发的 就是这个
   * @param {*} allState
   * @param {object} options
   * @returns
   */
  return function (allState, options) {
    const { modelName, methodName, payload, dispatch } = options

    const modelReducer = allModel[modelName].reducers?.[methodName]

    if (modelReducer && typeof modelReducer == 'function') {
      const oldModelState = allState[modelName]
      const newModelState = modelReducer({
        state: oldModelState,
        payload,
        dispatch,
      })

      return lodash.cloneDeep({
        ...allState,
        [modelName]: newModelState,
      })
    } else {
      throw '请确定action是否正确'
    }
  }
}

/**
 * 生成一个provider
 */
export function generateProvider({ context, allModel }) {
  const reducer = generateReducer({ allModel })

  return function ProviderComponent(props) {
    const [allState, dispatch] = useReducer(
      reducer,
      getInitStateFunc(allModel)
      // initStateFunc
    )
    return <context.Provider value={{ state: allState, dispatch }}>{props.children}</context.Provider>
  }
}

/**
 * 生成一个useModel
 * @param {object} options
 * @param {*} options.context
 * @param {object} options.allModel
 * @param {function} [options.dealExport]
 */
export function generateUseModel({ context, allModel, dealExport }) {
  /**
   * @returns {{
   *  state,
   *  dispatch,
   *  getLoading
   * }}
   */
  return function () {
    const { state, dispatch } = useContext(context)

    const stateRef = useRef(state)

    useEffect(() => {
      stateRef.current = state
    }, [state])

    function getState() {
      return { ...stateRef.current }
    }

    // loading
    function setLoading(type, flag) {
      dispatch({
        modelName: 'loading',
        methodName: 'setLoading',
        payload: {
          type,
          loading: flag,
        },
        dispatch: thunkDispatch,
      })
    }

    function getLoading(type) {
      return state.loading[type] || false
    }

    /**
     * 最终暴露出去的，外面用到的dispatch 可以处理异步
     * @param {string} type // 'global/toggle'
     * @param {*} payload // 自定义携带参数
     */
    function thunkDispatch(type, payload) {
      const modelName = type.split('/')[0]
      const methodName = type.split('/')[1]

      const modelAction = allModel[modelName].actions?.[methodName]

      if (modelAction) {
        // 异步
        setLoading(type, true)
        modelAction({
          getState,
          payload,
          dispatch: thunkDispatch,
        }).finally(() => {
          setLoading(type, false)
        })
      } else {
        // 同步
        dispatch({
          modelName,
          methodName,
          payload,
          dispatch: thunkDispatch,
        })
      }
    }

    // 暴露出去
    const defaultExport = {
      state,
      dispatch: thunkDispatch,
      getLoading,
    }

    if (dealExport) {
      return dealExport(defaultExport)
    }
    return defaultExport
  }
}

/**
 * 生成一个loading model
 * @returns model
 */
export function generateLoadingModel() {
  return {
    name: 'loading',
    state: {},
    reducers: {
      // eslint-disable-next-line no-unused-vars
      setLoading({ state, payload, dispatch }) {
        const { type, loading } = payload

        const newState = { ...state }

        if (loading) {
          newState[type] = true
        } else {
          delete newState[type]
        }

        return newState
      },
    },
  }
}
