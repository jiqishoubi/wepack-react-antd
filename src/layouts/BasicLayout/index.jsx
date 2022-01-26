import { Outlet } from 'react-router-dom'
import ContentLayout from '@/components/layout/ContentLayout'
import HeaderAccount from '@/components/HeaderAccount'
import useAppModel from '@/model'
import styles from './index.less'

function Index() {
  const {
    state: {
      login: { allMenu, menuTree },
    },
  } = useAppModel()
  return (
    <ContentLayout
      // header
      renderHeaderLeft={() => {
        return 'header-left'
      }}
      renderHeaderRight={<HeaderAccount />}
      // sideMenu
      renderLogo={() => {
        return <div>side-logo</div>
      }}
      allMenu={allMenu}
      menuTree={menuTree}
      menuValueKey="menuCode" // 作为唯一key
      sideMenuShowSearch={true}
    >
      <div className={styles.main_wrap}>
        <Outlet />
      </div>
    </ContentLayout>
  )
}

export default Index
