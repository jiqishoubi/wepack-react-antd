import { Outlet } from 'react-router-dom'
import ContentLayout from '@/components/layout/ContentLayout'
import { useModel } from '@/models'
import styles from './index.less'

function Index() {
  const {
    state: {
      login: { allMenu, menuTree },
    },
  } = useModel()
  return (
    <ContentLayout
      // header
      renderHeaderLeft={() => {
        return 'left'
      }}
      renderHeaderRight={() => {
        return '登录账号'
      }}
      // sideMenu
      renderLogo={() => {
        return <div>logo1</div>
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
