import React, { Suspense } from 'react'
import { HashRouter, useRoutes } from 'react-router-dom'
import LazyLoading from '@/components/layout/LazyLoading'
import { routes } from '@/router'
import { ContextProvider } from '@/models'
import './global.less'
// 渲染路由
function RouteElement() {
  const element = useRoutes(routes)
  return element
}
function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LazyLoading />}>
        <ContextProvider>
          <RouteElement />
        </ContextProvider>
      </Suspense>
    </HashRouter>
  )
}
export default App
