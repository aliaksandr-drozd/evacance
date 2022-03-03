import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { BaggageOption } from '../../enums'


export interface IBaggageMatchProps {
  option: BaggageOption
}

export const BaggageMatch: FC<IBaggageMatchProps> = ({ option }) => {
  const { t } = useTranslation()
  let text

  switch (option) {
    case BaggageOption.TRUCK:
      text = t('cargoDelivery')
      break
    case BaggageOption.SMALL_CAR:
      text = t('smallCarIsEnough')
      break
    case BaggageOption.BIG_CAR:
    default:
      text = t('needBigCarOrBus')

  }

  return (
    <>{ text }</>
  )
}
