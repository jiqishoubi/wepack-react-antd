import React from 'react'
import { Navigate } from 'react-router-dom'

import Page404 from '@/pages/common/404'
import UserLayout from '@/layouts/UserLayout'
import Login from '@/pages/login'

import SecurityLayout from '@/layouts/SecurityLayout'
import BasicLayout from '@/layouts/BasicLayout'
import Index1 from '@/pages/index1'
import Index2 from '@/pages/index2'

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
      { path: '', element: <Navigate to="/user/login" /> }, // Redirect
      {
        path: '',
        element: <BasicLayout />,
        children: [
          // BasicLayout 业务页面
          { path: 'index1', element: <Index1 /> },
          { path: 'index2', element: <Index2 /> },
          route404
        ]
      },
      route404
    ]
  },
  route404
]

export default routes
