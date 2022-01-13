import { Suspense } from 'react'
import { RouterPro } from 'react-router-pro'
import routes from '@/router'
import './global.less'

function App() {
  return (
    <Suspense fallback={'loading'}>
      <RouterPro data={routes} />
    </Suspense>
  )
}
export default App
