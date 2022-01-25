import { useContentLayoutContext } from '../ContentLayout/index'
import styles from './index.less'
function Index() {
  const {
    headerHeight,
    // props
    renderHeaderLeft,
    renderHeaderRight,
  } = useContentLayoutContext()
  return (
    <div className={styles.header} style={{ height: headerHeight }}>
      <div className={styles.header_left}>{(renderHeaderLeft && renderHeaderLeft()) || null}</div>
      {renderHeaderRight()}
    </div>
  )
}

export default Index
