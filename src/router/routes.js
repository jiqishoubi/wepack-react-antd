import React from 'react'
import { Navigate } from 'react-router-dom'

import Page404 from '@/pages/common/404'
import UserLayout from '@/layouts/UserLayout'
import Login from '@/pages/login'

import SecurityLayout from '@/layouts/SecurityLayout'
import BasicLayout from '@/layouts/BasicLayout'
import Index1 from '@/pages/index1'

const route404 = { element: <Page404 /> }

const routes = [
  // UserLayout
  {
    path: 'user/*',
    element: <UserLayout />,
    children: [
      { path: '', element: <Navigate to="login" /> }, // Redirect
      { path: 'login', element: <Login /> },
      route404
    ]
  },
  // 应用
  // SecurityLayout
  {
    path: '/',
    element: <SecurityLayout />,
    children: [
      {
        path: '',
        element: <BasicLayout />,
        children: [{ path: 'index1', element: <Index1 /> }, route404]
      },
      route404
    ]
  },
  route404
]

export default routes
