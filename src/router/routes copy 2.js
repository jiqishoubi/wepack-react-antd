import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import UserLayout from '@/layouts/UserLayout'
import SecurityLayout from '@/layouts/SecurityLayout'
import BasicLayout from '@/layouts/BasicLayout'

const route404 = {
  element: <LazyElement importFunc={() => import('@/pages/common/404')} />
}

function LazyElement(props) {
  const { importFunc } = props
  const LazyComponent = lazy(importFunc)
  return (
    <Suspense fallback={<div>路由懒加载...</div>}>
      <LazyComponent />
    </Suspense>
  )
}

const routes = [
  // UserLayout
  {
    path: 'user/*',
    element: <UserLayout />,
    children: [
      { path: '', element: <Navigate to="login" /> }, // Redirect
      {
        path: 'login',
        element: <LazyElement importFunc={() => import('@/pages/login')} />
      },
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
          {
            path: 'index1',
            element: <LazyElement importFunc={() => import('@/pages/index1')} />
          },
          {
            path: 'index2',
            element: <LazyElement importFunc={() => import('@/pages/index2')} />
          },
          route404
        ]
      },
      route404
    ]
  },
  route404
]

export default routes
