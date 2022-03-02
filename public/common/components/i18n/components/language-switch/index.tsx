import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Space } from 'antd-mobile'

import { useLocalStorage } from '../../../../hooks'
import { DEFAULT_APP_LANGUAGE, LANGUAGE_LOCAL_STORAGE_KEY } from '../../../../consts'


export const LanguageSwitch: FC = () => {
  const [ ,setLanguageInLocalStorage ] = useLocalStorage<string>(LANGUAGE_LOCAL_STORAGE_KEY, DEFAULT_APP_LANGUAGE)
  const { i18n, t } = useTranslation()

  const setLanguage = (code: string) => async () => {
    await i18n.changeLanguage(code)
    setLanguageInLocalStorage(code)
  }

  return (
    <div>
      <h4>{ t('preferredLanguage') }</h4>

      <Space wrap>
        <Button
          onClick={ setLanguage('ua') }
          color={ i18n.language === 'ua' ? 'primary' : 'default' }
          size="small"
        >
          Українськa
        </Button>

        <Button
          onClick={ setLanguage('pl') }
          color={ i18n.language === 'pl' ? 'primary' : 'default' }
          size="small"
        >
          Polski
        </Button>

        <Button
          onClick={ setLanguage('en') }
          color={ i18n.language === 'en' ? 'primary' : 'default' }
          size="small"
        >
          English
        </Button>

        <Button
          onClick={ setLanguage('ru') }
          color={ i18n.language === 'ru' ? 'primary' : 'default' }
          size="small"
        >
          Русский
        </Button>
      </Space>
    </div>
  )
}
