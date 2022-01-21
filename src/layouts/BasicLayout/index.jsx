import { Outlet } from "react-router-dom";
import ContentLayout from "@/components/layout/ContentLayout";
import { useModel } from "@/models";

function Index() {
  const {
    state: {
      login: { allMenu, menuTree },
    },
  } = useModel();
  return (
    <ContentLayout
      // header
      // renderHeader={() => {
      //   return "登录账号";
      // }}
      // sideMenu
      allMenu={allMenu}
      menuTree={menuTree}
      menuValueKey="menuCode"
      sideMenuShowSearch={true}
    >
      <Outlet />
    </ContentLayout>
  );
}

export default Index;
