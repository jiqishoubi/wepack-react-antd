import classnames from "classnames";
import { useLocation, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import ContentLayout from "@/components/layout/ContentLayout";
import { useModel } from "@/models";
import styles from "./index.less";

function Index(props) {
  const location = useLocation();
  const { pathname } = location;
  const {
    state: {
      login: { menuTree },
    },
  } = useModel();

  function menuDataRender() {
    console.log(menuTree);
    return [];
    // return [
    //   {
    //     name: "首页",
    //     path: "web/company/home",
    //     key: "web/company/home",
    //     routes: [
    //       {
    //         name: "首页2",
    //         path: "web/company/home2",
    //         key: "web/company/home2",
    //       },
    //     ],
    //   },
    // ];
  }

  return (
    <ContentLayout>
      <Outlet />
    </ContentLayout>
  );
}

export default Index;
