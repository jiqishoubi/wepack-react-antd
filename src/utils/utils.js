/**
 * @description 生成随机字符串
 * @param {number} [num=7]
 */
export const randomStrKey = (num = 7) => {
  return Math.random().toString(36).substr(2, num);
};

// 搜索树形结构
export const mapTree = (value, arr) => {
  let newarr = [];
  arr.forEach((element) => {
    if (element.name?.indexOf(value) > -1) {
      // 判断条件
      newarr.push(element);
    } else {
      if (element.children && element.children.length > 0) {
        let redata = mapTree(value, element.children);
        if (redata && redata.length > 0) {
          let obj = {
            ...element,
            children: redata,
          };
          newarr.push(obj);
        }
      }
    }
  });
  return newarr;
};
