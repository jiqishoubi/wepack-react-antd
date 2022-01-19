import request from "@/utils/request";
import dealMenu from "@/utils/dealMenu";

const initialState = {
  token: "",
  userInfo: null,
  // 菜单
  allMenu: [],
  menuTree: [],
  rightsArr: [],
};

const model = {
  name: "login",
  state: initialState,
  actions: {
    async initInfo({ dispatch, getState, payload }) {
      dispatch("login/getUserInfo");
      dispatch("login/getMenuTree");
    },
    async getUserInfo({ dispatch, getState, payload }) {
      const data = await request({
        url: "/web/getLoginStaffInfo",
      });
      if (data) {
        dispatch("login/save", {
          userInfo: data,
        });
      }
    },
    async getMenuTree({ dispatch, getState, payload }) {
      const data = await request({
        url: "/web/menu/getAllMenuList",
      });
      const menuRes = dealMenu(data);
      dispatch("login/save", {
        allMenu: menuRes.allMenu ?? [],
        menuTree: menuRes.menuTree ?? [],
        rightsArr: menuRes.rightsArr ?? [],
      });
    },
  },
  reducers: {
    save({ state, payload, dispatch }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default model;
