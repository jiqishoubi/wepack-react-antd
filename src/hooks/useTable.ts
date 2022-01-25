/* eslint-disable */
import { useState, useEffect, useMemo } from 'react'
import _ from 'lodash'
import type { ProColumns } from '@ant-design/pro-table'

interface ColumnsStateType {
  [propName: string]: ProColumns
}

const setColumnsStateStorage = (columnsState: ColumnsStateType) => {
  const url = window.location.href
  const key = url.split('?')[0] + '_columnsState'
  localStorage.setItem(key, JSON.stringify(columnsState))
}

const getColumnsStateStorage = () => {
  const url = window.location.href
  const key = url.split('?')[0] + '_columnsState'
  const jsonStr = localStorage.getItem(key)
  let state = {}
  try {
    if (jsonStr) {
      state = JSON.parse(jsonStr)
    }
  } catch (e) {}
  return state
}

//useTable参数
interface useTableParamsType<T extends object> {
  tableId?: string
  rowKey?: string
  ajax: (pageObj: { page: number; pageSize: number }) => Promise<{ list: T[]; total: number }>
  columns?: ProColumns<T>[]
  columnsWidth?: number
  depParamsArr?: Array<any> // 数组变了 就重新请求
  ready?: boolean // 只有ready为true的时候才请求
}

//useTable返回值
interface useTableExportType<T extends object> {
  //表格
  currentPage: number
  currentPageSize: number
  tableData: readonly T[]
  tableTotalNum: number
  isTableLoading: boolean
  //方法
  setCurrentPage: Function
  setCurrentPageSize: Function
  getData: Function //刷新表格 页码不变
  search: Function //刷新表格 页码变成1
  //columns
  showColumns: any[]
  columnsState: ColumnsStateType
  setColumnsState: Function
  //批量操作
  selectedRows: T[]
  selectedRowKeys: string[]
  setSelectedRows: Function
  updateSelectedRows: (isSelect: boolean, arr: T[]) => void
  //table宽度
  tableWidth: number
}

export default function useTable<T extends object>({
  tableId,
  rowKey = 'id',
  ajax,
  columns,
  columnsWidth = 200,
  depParamsArr = [],
  ready = true,
}: useTableParamsType<T>): useTableExportType<T> {
  //表格
  const [currentPage, setCurrentPage] = useState<number>(1) //当前的页码
  const [currentPageSize, setCurrentPageSize] = useState<number>(10)
  const [tableData, setTableData] = useState<T[]>([]) //表格的数据
  const [tableTotalNum, setTableTotalNum] = useState<number>(0) //表格数据总量
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false)

  //批量
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const selectedRowKeys = selectedRows.map((item) => item[rowKey])

  //columns // { 0:{show:false} }
  const [columnsState, setColumnsState] = useState(() => {
    return getColumnsStateStorage()
  })
  const showColumns =
    (columns &&
      Array.isArray(columns) &&
      _.cloneDeep(columns).map((item) => {
        return {
          ...item,
          key: item.dataIndex,
          align: 'center',
          width: (item.width || columnsWidth) as number,
        }
      })) ||
    [] //处理 key
  //columns end

  //table宽度
  const tableWidth = useMemo(() => {
    let w = 0
    if (tableId && showColumns && showColumns.length > 0) {
      const tableDom = document.getElementById(tableId)
      if (tableDom) {
        const tableDomWidth = tableDom.clientWidth
        const columnsDomWidth = showColumns.reduce((accumulator: number, item) => {
          return accumulator + item.width
        }, 0)
        if (columnsDomWidth >= tableDomWidth) {
          w = columnsDomWidth
        }
      }
    }
    return w
  }, [isTableLoading])

  //方法
  const getData = () => {
    setIsTableLoading(true)
    ajax({
      page: currentPage,
      pageSize: currentPageSize,
    })
      .finally(() => {
        setIsTableLoading(false)
      })
      .then(({ list, total }) => {
        setTableData(list)
        setTableTotalNum(total)
      })
  }

  /**
   * 更新批量选择
   * @param {boolean} selected
   * @param {Array} rows
   */
  const updateSelectedRows = (selected: boolean, rows: T[]) => {
    let selectedRowsTemp = _.cloneDeep(selectedRows)
    let selectedRowsTempNew = []

    if (selected) {
      //增加
      selectedRowsTemp = [...selectedRowsTemp, ...rows]
      const res = new Map()
      selectedRowsTempNew = selectedRowsTemp.filter((item) => !res.has(item[rowKey]) && res.set(item[rowKey], 1))
    } else {
      //删除
      selectedRowsTempNew = selectedRowsTemp.filter((item) => {
        let filterArr = rows.filter((obj) => obj[rowKey] == item[rowKey])
        return !filterArr[0]
      })
    }

    setSelectedRows(selectedRowsTempNew)
  }

  /**
   * 触发查询
   */
  const search = () => {
    if (currentPage == 1) {
      getData()
    } else {
      setCurrentPage(1)
    }
  }

  //副作用
  //数据
  useEffect(() => {
    if (ready) {
      getData()
    }
  }, [currentPage, currentPageSize, ready, ...depParamsArr])

  //columns
  useEffect(() => {
    setColumnsStateStorage(columnsState)
  }, [columnsState])

  return {
    //表格
    currentPage,
    currentPageSize,
    tableData,
    tableTotalNum,
    isTableLoading,
    //方法
    setCurrentPage,
    setCurrentPageSize,
    getData, //刷新表格 页码不变
    search, //刷新表格 页码变成1
    //columns
    showColumns,
    columnsState,
    setColumnsState,
    //批量操作
    selectedRows,
    selectedRowKeys,
    setSelectedRows,
    updateSelectedRows,
    //table宽度
    tableWidth,
  }
}
