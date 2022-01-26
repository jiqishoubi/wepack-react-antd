import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import InputSMS from '../InputSMS'
import useAppModel from '@/model'
import { ENV_CONFIG, LOGIN_TOKEN_KEY } from '@/utils/consts'
import request from '@/utils/request'

/**
 * @param {object} props
 */
const Index = () => {
  const navigate = useNavigate()
  const { dispatch } = useAppModel()
  const [formRef] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  //提交
  const handleSubmit = (values) => {
    const postData = {
      loginName: values.loginName,
      loginPassword: values.loginPassword,
      captcha: values.sms.v,
      captchaKey: values.sms.key,
    }
    setSubmitting(true)
    request({
      url: '/web/doLogin',
      data: postData,
    })
      .finally(() => {
        setSubmitting(false)
      })
      .then((data) => {
        //二、初始化信息
        localStorage.setItem(LOGIN_TOKEN_KEY, data.loginSessionId) //保存token
        dispatch('login/initInfo')
        //跳转
        goto('/home')
      })
  }

  /** 此方法会跳转到 redirect 参数所在的位置 */
  function goto(url) {
    if (!navigate) return
    navigate(url || '/')
  }

  return (
    <Form form={formRef} onFinish={handleSubmit}>
      <Form.Item name="loginName" required rules={[{ required: true, message: '请输入账号' }]}>
        <Input placeholder="请输入账号" prefix={<UserOutlined />} allowClear />
      </Form.Item>
      <Form.Item name="loginPassword" required rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="请输入密码" prefix={<UnlockOutlined />} allowClear />
      </Form.Item>
      <Form.Item name="sms" required rules={[{ required: true, message: '请输入验证码' }]}>
        <InputSMS
          getImgSrc={(key) => {
            return `${ENV_CONFIG.apiPath}/captcha?key=${key}`
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting} style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Index
