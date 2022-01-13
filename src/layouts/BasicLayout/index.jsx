import React, { Fragment } from 'react'
import classnames from 'classnames'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import ProLayout from '@ant-design/pro-layout'
import { renderChildren } from '@/router'
import CustomHeader from '@/components/common/CustomHeader'
import Side from '@/components/common/Side'
// import KeepAliveTabs from "@/components/common/KeepAlive/KeepAliveTabs";
import defaultSettings from '../../../config/defaultSettings'
import styles from './index.less'

function Index(props) {
  const history = useHistory()
  const pathname = history.location?.pathname

  function menuDataRender() {
    return [
      {
        name: '首页',
        path: '/home',
        key: '/home'
      },
      {
        name: '首页2',
        path: '/home2',
        key: '/home2'
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
        {renderChildren(props)}
      </ProLayout>
    </div>
  )
}

export default Index
