import { useContentLayoutContext } from '../ContentLayout/index'
import styles from './index.less'
function Index() {
  const {
    headerHeight,
    // props
    renderHeaderLeft,
    renderHeaderRight,
  } = useContentLayoutContext()
  const headerLeftDOM = typeof renderHeaderLeft == 'function' ? renderHeaderLeft() : renderHeaderLeft
  const headerRightDOM = typeof renderHeaderRight == 'function' ? renderHeaderRight() : renderHeaderRight
  return (
    <div className={styles.header} style={{ height: headerHeight }}>
      <div className={styles.header_left}>{headerLeftDOM}</div>
      {headerRightDOM}
    </div>
  )
}

export default Index
