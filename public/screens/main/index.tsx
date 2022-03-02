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
          { t('iCanDeliver') }
        </Button>
        <Button
          color="primary"
          size="large"
          onClick={ () => navigate('/evacuate') }
        >
          { t('iNeedToGet') }
        </Button>
      </Space>

      <Divider />

      <MyRequests />
    </>
  )
}
