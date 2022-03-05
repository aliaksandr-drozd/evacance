import React, { FC } from 'react'
import { Card, FloatingPanel, Form, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { Request } from '../../common/components'
import { IEvacuationResponse } from '../../common/interfaces'


export interface IEvacuationMapScreenComponentProps {
}

export const EvacuationMapScreenComponent: FC<IEvacuationMapScreenComponentProps> = ({
}) => {
  const { t } = useTranslation()

  return (
    <>
      Evacuation Map
    </>
  )
}
