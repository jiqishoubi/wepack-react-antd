import classnames from 'classnames'
import { useLocation, Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ProLayout from '@ant-design/pro-layout'
import styles from './index.less'

function Index(props) {
  const location = useLocation()
  const { pathname } = location

  function menuDataRender() {
    return [
      {
        name: 'index1',
        path: '/index1',
        key: '/index1'
      },
      {
        name: 'index2',
        path: '/index2',
        key: '/index2'
      }
    ]
  }

  return (
    <div style={{ height: '100vh' }}>
      <ProLayout
        layout="mix"
        fixedHeader={true}
        headerTheme="light"
        navTheme="light"
        title="Remax"
        logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        menuItemRender={(item, dom) => {
          return (
            <Link
              className={classnames({
                [styles.menu]: true,
                [styles.active]: pathname === item.path
              })}
              to={item.path}>
              {item.name}
            </Link>
          )
        }}
        subMenuItemRender={(_, dom) => {
          return <Link></Link>
        }}
        menuDataRender={menuDataRender}>
        <Outlet />
      </ProLayout>
    </div>
  )
}

export default Index
