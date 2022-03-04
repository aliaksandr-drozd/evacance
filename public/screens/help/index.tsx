import React, { FC } from 'react'
import { Button, Card, Popup, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { useLocalStorage } from '../../common/hooks'
import { DEFAULT_APP_LANGUAGE, HELP_LOCALSTORAGE_KEY, LANGUAGE_LOCALSTORAGE_KEY } from '../../common/consts'
import { LanguageSwitch } from '../../common/components'
import styles from './styles.module.less'


export const HelpScreen: FC = () => {
  const [lang] = useLocalStorage(LANGUAGE_LOCALSTORAGE_KEY, DEFAULT_APP_LANGUAGE)
  const [isHelpVisible, setIsHelpVisible] = useLocalStorage(HELP_LOCALSTORAGE_KEY, false)
  const { t } = useTranslation()

  return (
    <Popup
      visible={ isHelpVisible }
      position="bottom"
      bodyStyle={{ minHeight: '80vh' }}
      destroyOnClose={ true }
      className={ styles.container }
    >
      <Card>
        <LanguageSwitch />
      </Card>
      <Card>
        HEPL HERE { lang }
      </Card>
      <Card>
        <Space>
          <Button
            color="primary"
            onClick={ () => setIsHelpVisible(false) }
          >
            { t('accept') }
          </Button>
        </Space>
      </Card>
    </Popup>
  )
}
