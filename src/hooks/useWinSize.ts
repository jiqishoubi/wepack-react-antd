import { useCallback, useEffect, useState } from 'react'
interface WinSizeType {
  width: number
  height: number
}
export default function useWinSize(callback: (res: WinSizeType) => void): WinSizeType {
  const [size, setSize] = useState<WinSizeType>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = useCallback(() => {
    const res = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
    setSize(res)
    callback && callback(res)
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return size
}
