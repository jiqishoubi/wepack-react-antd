import React, { createContext, useContext, useMemo, useState } from "react";
import SideMenu from "../SideMenu";
import Header from "../Header";
import styles from "./index.less";
// type
interface ContentLayoutProps {
  sideWidth: number;
  collapsedSideWidth: number;
  headerHeight: number;
  isCollapsed: boolean;
  [propName: string]: any;
  // props
  allMenu: Array<any>;
  menuTree: Array<any>;
  menuValueKey: string;
  sideMenuShowSearch: boolean;
}
type ContentLayoutContextType = Partial<ContentLayoutProps>;
// type end
const defaultContextState = {
  sideWidth: 200,
  collapsedSideWidth: 50,
  headerHeight: 46,
  menuTree: [],
};
export const ContentLayoutContext =
  createContext<ContentLayoutContextType>(defaultContextState);
export function useContentLayoutContext() {
  return useContext(ContentLayoutContext);
}
const Index: React.FC<ContentLayoutProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const showWidth = useMemo(
    () =>
      isCollapsed
        ? defaultContextState.collapsedSideWidth
        : defaultContextState.sideWidth,
    [isCollapsed]
  );
  function toggleIsCollapsed() {
    setIsCollapsed(!isCollapsed);
  }
  const contentLayoutState = {
    ...defaultContextState,
    ...props,
    isCollapsed,
    toggleIsCollapsed,
    showWidth,
  };
  return (
    <ContentLayoutContext.Provider value={contentLayoutState}>
      <div className={styles.content_wrap}>
        <SideMenu />
        <div
          className={styles.right_content_wrap}
          style={{ width: `calc(100vw - ${showWidth}px)` }}
        >
          <Header />
          <main className={styles.main_wrap}>{props.children}</main>
        </div>
      </div>
    </ContentLayoutContext.Provider>
  );
};
export default Index;
