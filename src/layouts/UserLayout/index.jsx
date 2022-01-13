// 登录页
import React from 'react'
import Footer from '@/components/layout/Footer'
import styles from './index.less'
import { Outlet } from 'react-router-dom' // Outlet用于渲染children
function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Index
