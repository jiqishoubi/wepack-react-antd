import { useEffect } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import useAppModel from '@/model'
import { LOGIN_TOKEN_KEY } from '@/utils/consts'

const loginUrl = '/user/login'

function Index() {
  const location = useLocation()
  const { state, dispatch } = useAppModel()
  const token = localStorage.getItem(LOGIN_TOKEN_KEY) ?? ''
  useEffect(() => {
    if (token && location.pathname !== loginUrl && !state.login.userInfo) {
      dispatch('login/initInfo')
    }
  }, [])
  /**
   * 渲染
   */
  if (!token && location.pathname !== loginUrl) {
    return <Navigate to={loginUrl} />
  }
  return <Outlet />
}

export default Index
