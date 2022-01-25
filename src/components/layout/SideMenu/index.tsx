import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Input } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons'
import { useContentLayoutContext } from '../ContentLayout/index'
import useSearchMenu from './useSearchMenu'
import styles from './index.less'
import './index.global.less'
// type
interface SideMenuProps {}
// type end
const { SubMenu } = Menu
const Index: React.FC<SideMenuProps> = () => {
  const { pathname } = useLocation()
  const {
    // state
    headerHeight,
    // props
    renderLogo,
    allMenu = [],
    menuTree = [],
    menuValueKey = '',
    sideMenuShowSearch,
    // 后加的
    showWidth,
    collapsedController,
  } = useContentLayoutContext()
  const [curMenu, setCurMenu] = useState<any>({})
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const { searchValue, setSearchValue, showMenuTree } = useSearchMenu(menuTree, (arr: any[]) => {
    setOpenKeys(arr.map((menu) => menu[menuValueKey]))
  })
  useEffect(setCurMenuOpenKeys, [pathname, allMenu])
  /**
   * 方法
   */
  // 渲染菜单
  function renderMenu(arr: Array<any>) {
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.map((menu) => {
        if (menu.children?.length > 0) {
          return (
            <SubMenu key={menu[menuValueKey]} title={menu.name}>
              {renderMenu(menu.children)}
            </SubMenu>
          )
        }
        return menu.path ? (
          <Menu.Item key={menu[menuValueKey]}>
            <Link to={menu.path}>{menu.name}</Link>
          </Menu.Item>
        ) : null
      })
    }
    return null
  }
  // 根据当前pathname计算openKeys
  function setCurMenuOpenKeys() {
    const currentMenu = allMenu?.find((item) => item.path == pathname)
    const parentMenu = allMenu?.find((item) => item[menuValueKey] == currentMenu?.parentCode)
    setCurMenu(currentMenu ?? {})
    setOpenKeys(parentMenu ? [parentMenu[menuValueKey]] : [])
  }
  /**
   * 渲染
   */
  const logoDOM = typeof renderLogo == 'function' ? renderLogo() : renderLogo
  const logoHeight = headerHeight
  const searchHeight = 39
  const footerHeight = 40
  const menuContentHeight = `calc(100vh - ${headerHeight! + footerHeight + searchHeight}px)`
  return (
    <div className={styles.side_wrap} style={{ width: showWidth }}>
      <div className={styles.side_header} style={{ height: logoHeight }}>
        {logoDOM}
      </div>
      {sideMenuShowSearch && (
        <div className={styles.search_wrap} style={{ height: searchHeight }}>
          <Input
            placeholder="搜索菜单"
            value={searchValue}
            onChange={(e) => {
              const v = e.target.value
              setSearchValue(e.target.value)
              if (!v) {
                setCurMenuOpenKeys()
              }
            }}
            allowClear
            prefix={<SearchOutlined />}
          />
        </div>
      )}
      {/* menuContent */}
      <div className={styles.side_content} style={{ height: menuContentHeight }}>
        <Menu
          style={{ width: showWidth + 'px' }}
          mode="inline"
          inlineCollapsed={collapsedController!.isCollapsed}
          openKeys={openKeys}
          selectedKeys={[curMenu[menuValueKey] ?? '']}
          onOpenChange={setOpenKeys}
        >
          {renderMenu(showMenuTree as Array<any>)}
        </Menu>
      </div>
      {/* footer */}
      <div className={styles.side_footer} style={{ height: footerHeight }} onClick={collapsedController!.toggleIsCollapsed}>
        <div className={styles.collapsed_btn}>{collapsedController!.isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
      </div>
    </div>
  )
}

export default Index
