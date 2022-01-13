import React from 'react'
import {
  generateLoadingModel,
  generateProvider,
  generateUseModel
} from '@/models/core.js'
import global from './global'
import login from './login'

const allModel = {
  loading: generateLoadingModel(),
  global,
  login
}

/**
 * redux
 */
const IndexContext = React.createContext()

// Provider
const ContextProvider = generateProvider({
  context: IndexContext,
  allModel
})

/**
 * @returns {{
 * 	state:object;
 * 	dispatch:function;
 *  getLoading:function;
 * }}
 */
const useModel = generateUseModel({
  context: IndexContext,
  allModel
})

export { ContextProvider, useModel }
