import useWinSize from '@/hooks/useWinSize'
import { useState } from 'react'

export interface UseIsCollapsedType {
  isCollapsed: boolean
  setIsCollapsed: (flag: boolean) => void
  toggleIsCollapsed: () => void
}
export default function useIsCollapsed(isCollapsedWidth: number) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(document.documentElement.clientWidth < isCollapsedWidth ? true : false)
  useWinSize((res) => {
    if (res.width < 900) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(false)
    }
  })
  function toggleIsCollapsed() {
    setIsCollapsed(!isCollapsed)
  }
  return {
    isCollapsed,
    setIsCollapsed,
    toggleIsCollapsed,
  }
}
