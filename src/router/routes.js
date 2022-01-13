import React from 'react'
// import { Redirect } from 'react-router-dom'

// const Page404 = React.lazy(() => import('../pages/common/404'))
import Login from '@/pages/login'

const routes = [
  {
    path: '/user/login',
    element: <Login />
  }
]

export default routes
