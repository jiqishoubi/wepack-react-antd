import routes from './routes'
function renderChildren(o) {
  // // 可能是props或者routes。props:props.route.routes
  // let renderRts = []
  // if (Object.prototype.toString.call(o) === '[object Array]') {
  //   renderRts = o
  // } else if (Object.prototype.toString.call(o) === '[object Object]') {
  //   renderRts = o.route?.routes || []
  // } else {
  //   renderRts = routes
  // }
  // return renderRoutes(renderRts)
}
export { routes, renderChildren }
