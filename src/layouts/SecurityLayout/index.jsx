import { useEffect, useMemo } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useModel } from '@/models'
import { STORAGE_TOKEN_KEY } from '@/utils/consts'

const loginUrl = '/user/login'

function Index(props) {
  const navigate = useNavigate()
  //   const { location } = history
  //   const { state, dispatch } = useModel()

  //   const token = useMemo(() => {
  //     return localStorage.getItem(STORAGE_TOKEN_KEY)
  //   }, [])

  //   useEffect(() => {
  //     if (token && location.pathname !== loginUrl && !state.login.userInfo) {
  //       dispatch('login/getInitInfo')
  //     }
  //   }, [])

  //   /**
  //    * 渲染
  //    */
  //   if (!token && location.pathname !== loginUrl) {
  //     console.log('跳转login')
  //     history.replace(loginUrl)
  //     return
  //   }

  return <Outlet />
}

export default Index
