import { LogoutOutlined } from '@ant-design/icons'
import useAppModel from '@/model'
import styles from './index.less'
import { showConfirm } from '@/utils/confirm'
export default function HeaderAccount() {
  const {
    state: {
      login: { userInfo },
    },
    dispatch,
  } = useAppModel()
  function handleLogout() {
    showConfirm('确定注销账户？', () => dispatch('login/logout'))
  }
  return (
    <div className={styles.account_wrap}>
      {userInfo?.loginName}
      {userInfo?.realName && <span>（{userInfo?.realName}）</span>}
      {/* 注销按钮 */}
      {userInfo && (
        <div className={styles.logout_btn} onClick={handleLogout}>
          <LogoutOutlined style={{ fontSize: 17, color: 'red' }} />
        </div>
      )}
    </div>
  )
}
