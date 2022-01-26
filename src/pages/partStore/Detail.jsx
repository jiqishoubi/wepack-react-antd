import { useModel } from './index'
function Index() {
  const { state } = useModel()
  const { count } = state
  return <div>{count}</div>
}
export default Index
