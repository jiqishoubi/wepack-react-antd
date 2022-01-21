import { useEffect, useMemo, useState } from 'react'
import { mapTree } from '@/utils/utils'

export default function useSearchMenu(
  menuTree: any[],
  onSearchSuccess: (arr: any[]) => void
): {
  searchValue: string
  setSearchValue: (v: string) => void
  showMenuTree: any[]
} {
  const [searchValue, setSearchValue] = useState<string>('')
  const showMenuTree = useMemo(() => {
    const arr = mapTree(searchValue, menuTree)
    return arr
  }, [menuTree, searchValue])
  useEffect(() => {
    if (searchValue && showMenuTree.length > 0) {
      onSearchSuccess(showMenuTree)
    }
  }, [searchValue, showMenuTree])
  return {
    searchValue,
    setSearchValue,
    showMenuTree,
  }
}
