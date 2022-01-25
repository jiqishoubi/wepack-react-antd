import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
export function showConfirm(content = '', onOk = () => {}) {
  Modal.confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content,
    onOk,
    onCancel() {},
  })
}
