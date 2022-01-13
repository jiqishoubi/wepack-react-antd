// 登录页
import React from 'react'
import Footer from '@/components/layout/Footer'
import { renderChildren } from '@/router'
import styles from './index.less'

function Index(props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{renderChildren(props)}</div>
      <Footer />
    </div>
  )
}

export default Index
