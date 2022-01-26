# 介绍

基于 webpack 5、react 17、react-router-dom 6、antd 4，从零搭建 react 后台管理系统  
菜单权限全部都是从后端获取：从后端拿到全部的菜单+权限，处理成树形结构

# layout

- 组件`src/components/layout/ContentLayout`实现了 antd/pro-layout 的效果
- 侧边菜单，支持搜索菜单功能

# 路由

使用 react-router-dom v6

- 实现集中配置路由 `src/router/index.js`
- 实现路由懒加载

# 路由、登录鉴权

路由、登录鉴权可以通过修改`src/layouts/SecurityLayout`里的逻辑进行实现

# 状态管理 `generateModel`

未使用 react-redux  
使用 useContext、useReducer 实现了一个 dva 的状态管理，核心代码`src/redux/index.js`  
最终暴露出来一个`generateModel`

## 用法

generateModel 可以接收数组、对象、requie()、例如下面 global 和 login 是一个类似于 dva 的 model 的对象。  
connectProvider 是一个高阶组件，给传入的组件包裹上 Provider。  
然后在组件中使用 useModel 就可以拿到 state 和 dispatch 了。

```
// Parent.jsx
export const { connectProvider, useModel } = generateModel([global, login])

function Parent() {
    const { state, dispatch, getLoading } = useModel() // 可以拿到state、dispatch
    return <Detail/>
}
export default connectProvider(Parent)
```

```
// Detail.jsx
import { useModel } from './Parent.jsx'

function Detail() {
    const { state } = useModel() // 可以拿到state、dispatch
    const { count } = state
    return <div>{count}</div>
}
export default connectProvider(Parent)
```

具体可以查看工程中的示例。。。

# Prettier

最小成本接入了 prettier + husky，git commit 之前格式化代码，保证团队开发代码格式一致性

# ESLint

接入了简单的 eslint，但是未开启 commit 校验，如需开启，在`package.json`的 lint-staged 中添加校验即可，注意校验 eslint 要在 prettier 之前

# 其它

## babel 相关

```
npm install --save-dev babel-loader @babel/preset-react @babel/preset-env @babel/core
```

- babel-loader：使用 Babel 转换 JavaScript 依赖关系的 Webpack 加载器
- @babel/preset-react：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数
- @babel/preset-env：根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性
- @babel/core：即 babel-core，将 ES6 代码转换为 ES5
