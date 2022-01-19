import lodash from "lodash";

export default function dealMenu(arr) {
  const allMenu = lodash.cloneDeep(arr);

  const itemMap = {};
  const childrenMap = {};
  const rootArr = [];
  const rightsArr = []; // 权限级别

  // rootArr.push({
  //   name: '首页',
  //   path: '/home'
  // })
  allMenu.forEach((item) => {
    // 修改item
    if (item.menuTitle) item.name = item.menuTitle;
    if (item.menuUrl) item.path = item.menuUrl;

    itemMap[item.menuCode] = item;
    if (!childrenMap[item.menuCode]) childrenMap[item.menuCode] = [];
    item.children = childrenMap[item.menuCode];

    if (!item.parentCode && item.menuLevel === 0) {
      // 一级目录
      rootArr.push(item);
    } else {
      // 找到它的父级的children
      if (!childrenMap[item.parentCode]) childrenMap[item.parentCode] = [];
      childrenMap[item.parentCode].push(item);
    }
  });

  return {
    allMenu,
    menuTree: rootArr,
    rightsArr,
  };
}
