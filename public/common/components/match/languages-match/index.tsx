import React, { FC } from 'react'
import { Badge } from 'antd-mobile'

import { LOCALE_MAP } from '../../i18n'


export interface ILanguageMatchProps {
  languageCode: keyof typeof LOCALE_MAP
}

export const LanguageMatch: FC<ILanguageMatchProps> = ({ languageCode }) =>
  <Badge
    color="teal"
    content={ LOCALE_MAP[languageCode] }
  />

