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

      <Space wrap>
        <Button
          onClick={ () => setIsHelpVisible(true) }
          size="mini"
          color="warning"
        >
          { t('howToUse') }
        </Button>

        <Button
          onClick={ () => { window.open('https://t.me/freeseat') } }
          size="mini"
          color="warning"
          style={ { display: "flex", verticalAlign: 'center', gap: '10px' } }
        >
          { t('support') }
          <TelegramIcon size={ 18 } />
        </Button>
      </Space>

      <Divider />

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
