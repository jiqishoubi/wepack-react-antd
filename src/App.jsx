import { HashRouter, useRoutes } from 'react-router-dom'
import routes from '@/router'
import { connectAppProvider } from '@/model'
import './global.less'

// 渲染路由
function RouteElement() {
  const element = useRoutes(routes)
  return element
}
function App() {
  return (
    <HashRouter>
      <RouteElement />
    </HashRouter>
  )
}
export default connectAppProvider(App)
