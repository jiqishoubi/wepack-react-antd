import React, { createContext, useContext, useMemo, useState } from 'react'
import SideMenu from '../SideMenu'
import Header from '../Header'
import Footer from '../Footer'
import useIsCollapsed, { UseIsCollapsedType } from './useIsCollapsed'
import styles from './index.less'
// type
// state
interface ContextState {
  headerHeight: number
  sideWidth: number
  collapsedSideWidth: number
}
// props
interface ContentLayoutProps {
  renderHeaderLeft: React.ReactElement | (() => React.ReactElement)
  renderHeaderRight: React.ReactElement | (() => React.ReactElement)
  renderLogo: React.ReactElement | (() => React.ReactElement)
  allMenu: Array<any>
  menuTree: Array<any>
  menuValueKey: string
  sideMenuShowSearch: boolean
}
interface ContentLayoutContextType extends ContextState, ContentLayoutProps {
  // 后加的
  showWidth: number
  collapsedController: UseIsCollapsedType
}
// type end

const isCollapsedWidth = 900
// 这里可以根据样式更改
const defaultContextState = {
  headerHeight: 46,
  sideWidth: 200,
  collapsedSideWidth: 50,
}
export const ContentLayoutContext = createContext<Partial<ContentLayoutContextType>>(defaultContextState)
export function useContentLayoutContext() {
  return useContext(ContentLayoutContext)
}
const Index: React.FC<ContentLayoutProps> = (props) => {
  const collapsedController = useIsCollapsed(isCollapsedWidth)
  const showWidth = useMemo(
    () => (collapsedController.isCollapsed ? defaultContextState.collapsedSideWidth : defaultContextState.sideWidth),
    [collapsedController.isCollapsed]
  )
  // export context state
  const contentLayoutState = {
    ...defaultContextState,
    ...props,
    // 后加的
    showWidth,
    collapsedController,
  }
  return (
    <ContentLayoutContext.Provider value={contentLayoutState}>
      <div className={styles.content_wrap}>
        <SideMenu />
        <div className={styles.right_content_wrap} style={{ width: `calc(100vw - ${showWidth}px)` }}>
          <Header />
          <main className={styles.main_wrap}>{props.children}</main>
          <Footer />
        </div>
      </div>
    </ContentLayoutContext.Provider>
  )
}
export default Index
