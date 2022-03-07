import React, { FC } from 'react'
import { Button, Divider, Space } from 'antd-mobile'
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

      <span
        style={{
          width: '32px',
          height: '32px',
          display: 'inline-block',
          borderRadius: '50%',
          background: 'cadetblue',
          lineHeight: '30px',
          textAlign: 'center',
          fontSize: '27px',
          cursor: "pointer",
          color: "white"
        }}
        onClick={ () => setIsHelpVisible(true) }
      >
        ?
      </span>

      <span
        style={{
          width: '32px',
          height: '32px',
          display: 'inline-block',
          borderRadius: '50%',
          background: 'cadetblue',
          lineHeight: '30px',
          textAlign: 'center',
          fontSize: '27px',
          cursor: "pointer",
          color: "white",
          verticalAlign: 'bottom',
          marginLeft: '10px'
        }}
        onClick={ () => { window.open('https://t.me/freeseat') } }
      >
        <TelegramIcon size={ 32 } />
      </span>

      <Space wrap>
        <Button
          color="primary"
          size="large"
          onClick={ () => navigate('/transportation-quiz') }
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

        <Button
          size="large"
          onClick={ () => navigate('/other-volunteer-organizations') }
        >
          { t('otherVolunteerOrganizations') }
        </Button>
      </Space>

      <Divider />

      <MyRequests />
    </>
  )
}
