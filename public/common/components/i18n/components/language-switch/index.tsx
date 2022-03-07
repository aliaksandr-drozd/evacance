import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Space } from 'antd-mobile'

import { useLocalStorage } from '../../../../hooks'
import { DEFAULT_APP_LANGUAGE, LANGUAGE_LOCALSTORAGE_KEY } from '../../../../consts'
import { LOCALE_MAP } from '../../locale-map'


export const LanguageSwitch: FC = () => {
  const [ ,setLanguageInLocalStorage ] = useLocalStorage<string>(LANGUAGE_LOCALSTORAGE_KEY, DEFAULT_APP_LANGUAGE)
  const { i18n } = useTranslation()

  const setLanguage = (code: string) => async () => {
    await i18n.changeLanguage(code)
    setLanguageInLocalStorage(code)
  }

  return (
    <div>
      <Space wrap>
        {
          Object.entries(LOCALE_MAP).map(([code, name]) =>
            <Button
              onClick={ setLanguage(code) }
              color={ i18n.language === code ? 'primary' : 'default' }
              size="small"
            >
              { name }
            </Button>
          )
        }
      </Space>
    </div>
  )
}
