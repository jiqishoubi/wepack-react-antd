import { useContentLayoutContext } from "../ContentLayout/index";
import styles from "./index.less";
function Index() {
  const { headerHeight } = useContentLayoutContext();
  return (
    <div className={styles.header} style={{ height: headerHeight }}>
      header
    </div>
  );
}

export default Index;
