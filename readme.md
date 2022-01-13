# babel相关
```
npm install --save-dev babel-loader @babel/preset-react @babel/preset-env @babel/core
```
- babel-loader：使用 Babel 转换 JavaScript依赖关系的 Webpack 加载器
- @babel/preset-react：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数
- @babel/preset-env：根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性
- @babel/core：即 babel-core，将 ES6 代码转换为 ES5