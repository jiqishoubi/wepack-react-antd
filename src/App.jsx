import { HashRouter, useRoutes } from "react-router-dom";
import routes from "@/router";
import { ContextProvider } from "@/models";
import "./global.less";
// 渲染路由
function RouteElement() {
  const element = useRoutes(routes);
  return element;
}
function App() {
  return (
    <HashRouter>
      <ContextProvider>
        <RouteElement />
      </ContextProvider>
    </HashRouter>
  );
}
export default App;
