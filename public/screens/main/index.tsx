import React, { FC } from 'react'
import { Button, Divider, Space } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { MyRequests } from './components'
import { LanguageSwitch } from '../../common/components'


export const MainScreen: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <LanguageSwitch />

      <Divider />

      <Space wrap>
        <Button
          color="primary"
          size="large"
          onClick={ () => navigate('/transportation') }
        >
          { t('i_can_deliver') }
        </Button>
        <Button
          color="primary"
          size="large"
          onClick={ () => navigate('/evacuate') }
        >
          { t('i_need_to_get') }
        </Button>
      </Space>

      <Divider />

      <MyRequests />
    </>
  )
}
