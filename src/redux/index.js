/// models核心代码
import { useContext, useRef, useEffect, useReducer, createContext } from 'react'
import lodash from 'lodash'

/**
 *
 * @param {object} allModule // { key: module }
 * @returns state
 */
function getInitStateFunc(allModule) {
  const state = {}
  for (const key in allModule) {
    state[key] = allModule[key].state
  }
  return state
}

/**
 * 生成reducer
 * @param {object} options
 * @param {object} options.allModule
 * @returns
 */
function generateReducer({ allModule }) {
  /**
   * reducer 原生的dispatch触发的 就是这个
   * @param {*} allState
   * @param {object} options
   * @returns
   */
  return function (allState, options) {
    const { modelName, methodName, payload, dispatch } = options

    const modelReducer = allModule[modelName].reducers?.[methodName]

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
function generateProvider({ context, allModule }) {
  const reducer = generateReducer({ allModule })

  return function ProviderComponent(props) {
    const [allState, dispatch] = useReducer(reducer, getInitStateFunc(allModule))
    return <context.Provider value={{ state: allState, dispatch }}>{props.children}</context.Provider>
  }
}

/**
 * 生成一个useModel
 * @param {object} options
 * @param {*} options.context
 * @param {object} options.allModule
 * @param {function} [options.dealExport]
 * @param {boolean} [options.isOnlyOneModule=false]
 */
function generateUseModel({ context, allModule, dealExport, isOnlyOneModule = false }) {
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
      return { ...(isOnlyOneModule ? stateRef.current['main'] : stateRef.current) }
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
      const modelName = isOnlyOneModule ? 'main' : type.split('/')[0]
      const methodName = isOnlyOneModule ? type : type.split('/')[1]

      const modelAction = allModule[modelName].actions?.[methodName]

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
    const { loading, ...restState } = state
    const defaultExport = {
      state: isOnlyOneModule ? { loading, ...restState[Object.keys(restState)[0]] } : state,
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
function generateLoadingModule() {
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

function addModule(moduleMap, module, isOnlyOneModule = false) {
  if (!module.name) {
    throw 'module需要有name'
  }
  moduleMap[isOnlyOneModule ? 'main' : module.name] = module
}

export default function generateModel(param) {
  let isOnlyOneModule = false
  let moduleMap = {}
  if (Object.prototype.toString.call(param) === '[object Array]') {
    console.log('数组')
    param.forEach((module) => {
      addModule(moduleMap, module)
    })
  } else if (Object.prototype.toString.call(param) === '[object Object]') {
    console.log('对象')
    const module = param
    addModule(moduleMap, module, true)
  } else if (Object.prototype.toString.call(param) === '[object Module]') {
    console.log('require')
    const module = param.default
    addModule(moduleMap, module, true)
  }
  if (Object.keys(moduleMap).length == 1) {
    isOnlyOneModule = true
  }
  const allModule = {
    loading: generateLoadingModule(),
    ...moduleMap,
  }

  const Context = createContext()

  // Provider
  const Provider = generateProvider({
    context: Context,
    allModule,
  })

  /**
   * @returns {{
   * 	state:object;
   * 	dispatch:function;
   *  getLoading:function;
   * }}
   */
  const useModel = generateUseModel({
    context: Context,
    allModule,
    isOnlyOneModule,
  })

  // 给Component包裹Provider的高阶组件
  function connectProvider(Component) {
    return function ProviderWrappedComponent(props) {
      return (
        <Provider>
          <Component {...props} />
        </Provider>
      )
    }
  }

  return { connectProvider, useModel }
}
