// import useAppModel from '@/model'
import { Button } from 'antd'
import generateModel from '@/redux'
import Detail from './Detail'
export const { connectProvider, useModel } = generateModel(require('./model'))
function Index() {
  const { dispatch, getLoading } = useModel()
  return (
    <div>
      测试局部store
      <div></div>
      <Detail />
      <Button
        onClick={() => {
          dispatch('addCount')
        }}
        loading={getLoading('addCount')}
      >
        修改count
      </Button>
    </div>
  )
}
export default connectProvider(Index)
