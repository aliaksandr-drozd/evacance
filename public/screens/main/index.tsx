import React, { FC } from 'react'
import { Button, Divider, FloatingBubble, Space } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { LanguageSwitch, TelegramIcon } from '../../common/components'
import { useLocalStorage } from '../../common/hooks'
import { HELP_LOCALSTORAGE_KEY } from '../../common/consts'
import { MyRequests } from './components'


export const MainScreen: FC = () => {
  const [, setIsHelpVisible] = useLocalStorage(HELP_LOCALSTORAGE_KEY, false)
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

      <FloatingBubble
        style={{
          '--initial-position-top': '14px',
          '--initial-position-right': '34px',
          '--size': '32px'
        }}
        onClick={ () => setIsHelpVisible(true) }
      >
        <h3>?</h3>
      </FloatingBubble>

      <FloatingBubble
        style={{
          '--initial-position-top': '14px',
          '--initial-position-right': '80px',
          '--size': '32px',
          // @ts-ignore
          '--adm-color-primary': 'transparent'
        }}
        onClick={ () => { window.open('https://t.me/freeseat') } }
      >
        <TelegramIcon size={ 32 } />
      </FloatingBubble>

      <Divider />

      <MyRequests />
    </>
  )
}
