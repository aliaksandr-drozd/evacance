import React, { FC } from 'react'
import { Badge } from 'antd-mobile'


export interface ILanguageMatchProps {
  languageCode: string
}

export const LanguageMatch: FC<ILanguageMatchProps> = ({ languageCode }) => {
  let text

  switch (languageCode.toUpperCase()) {
    case 'EN':
      text = 'English'
      break
    case 'PL':
      text = 'Polski'
      break
    case 'RU':
      text = 'Русский'
      break
    default:
      text = 'Українськa'
  }

  return (
    <Badge
      color="teal"
      content={ text }
    />
  )
}
