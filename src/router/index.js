import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import SecurityLayout from "@/layouts/SecurityLayout";
import BasicLayout from "@/layouts/BasicLayout";

const route404 = {
  element: () => import("@/pages/common/404"),
};

let routes = [
  // UserLayout
  {
    path: "user/*",
    element: <UserLayout />,
    children: [
      { path: "", element: <Navigate to="login" /> }, // Redirect
      {
        path: "login",
        element: () => import("@/pages/login"),
      },
      route404,
    ],
  },
  // 应用
  // SecurityLayout
  {
    path: "/",
    element: <SecurityLayout />,
    children: [
      { path: "", element: <Navigate to="/user/login" /> }, // Redirect
      {
        path: "",
        element: <BasicLayout />,
        children: [
          // BasicLayout 业务页面
          {
            path: "home",
            element: () => import("@/pages/home"),
          },
          {
            path: "index1",
            element: () => import("@/pages/index1"),
          },
          {
            path: "index2",
            element: () => import("@/pages/index2"),
          },
          route404,
        ],
      },
      route404,
    ],
  },
  route404,
];

function LazyElement(props) {
  const { importFunc } = props;
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<div>路由懒加载...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 处理routes 如果element是懒加载，要包裹Suspense
function dealRoutes(routesArr) {
  if (routesArr && Array.isArray(routesArr) && routesArr.length > 0) {
    routesArr.forEach((route) => {
      if (route.element && typeof route.element == "function") {
        const importFunc = route.element;
        route.element = <LazyElement importFunc={importFunc} />;
      }
      if (route.children) {
        dealRoutes(route.children);
      }
    });
  }
}
dealRoutes(routes);

export default routes;
