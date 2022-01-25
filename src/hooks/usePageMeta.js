import { useLocation } from 'react-router'
import routes from '../../config/routes'

export default function usePageMeta() {
  const location = useLocation()

  let meta = {}

  for (let i = 0; i < routes.length; i++) {
    let page = routes[i]
    if (page.path === location.pathname) {
      meta = page.meta || {}
      break
    }
  }

  return meta
}
