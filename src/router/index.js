import React from 'react'
import { Redirect } from 'react-router-dom'

const Page404 = React.lazy(() => import('../pages/common/404'))

const routes = [
  {
    component: React.lazy(() => import('../layouts/SecurityLayout')),
    routes: [
      // 登录
      {
        path: '/user',
        component: React.lazy(() => import('../layouts/UserLayout')),
        routes: [
          {
            path: '/user',
            exact: true,
            render: () => <Redirect to="/user/login" />
          },
          {
            path: '/user/login',
            component: React.lazy(() => import('../pages/login'))
          },
          { component: Page404 }
        ]
      },
      // 业务页面
      {
        path: '/',
        component: React.lazy(() => import('../layouts/BasicLayout')),
        routes: [
          {
            path: '/',
            exact: true,
            render: () => <Redirect to="/home" />
          },
          {
            path: '/home',
            component: React.lazy(() => import('../pages/home'))
          },
          {
            path: '/home2',
            component: React.lazy(() => import('../pages/home2'))
          },
          { component: Page404 }
        ]
      },
      { component: Page404 }
    ]
  }
]

export default routes
