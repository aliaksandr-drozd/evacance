import React, { FC } from 'react'
import { Button, Card, Popup, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { useLocalStorage } from '../../common/hooks'
import { IS_GDPR_ACCEPTED } from '../../common/consts'
import { LanguageSwitch } from '../../common/components'
import styles from './styles.module.less'


export const GDPRScreen: FC = () => {
  const [isGdprAccepted, setGdprAccepted] = useLocalStorage(IS_GDPR_ACCEPTED, false)
  const { t } = useTranslation()

  return (
    <Popup
      visible={ !isGdprAccepted }
      position="bottom"
      bodyStyle={{ minHeight: '80vh' }}
      destroyOnClose={ true }
      className={ styles.container }
    >
      <Card>
        <LanguageSwitch />
      </Card>
      <Card>
        <h2>{ t('gdpr') }</h2>
      </Card>
      <Card>
        <Space>
          <Button
            color="primary"
            onClick={ () => setGdprAccepted(true) }
          >
            { t('accept') }
          </Button>

          <Button
            color="danger"
            onClick={ () => window.location.href = 'https://google.eu/' }
          >
            { t('decline') }
          </Button>
        </Space>
      </Card>
    </Popup>
  )
}
