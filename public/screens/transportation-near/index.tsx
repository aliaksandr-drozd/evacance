import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { Dialog, NavBar } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import useGeolocation from 'react-hook-geolocation'
import { Container } from 'typedi'

import { ISearchInRadiusRequest } from '../../common/interfaces'
import { SearchInRadiusStateService } from '../../services'
import { Form } from './components'


export const TransportationNearScreen: FC = () => {
  const { t } = useTranslation()
  const [isErrorShown, setIsErrorShown] = useState(false)
  const navigate = useNavigate()
  const geolocation = useGeolocation()

  const back = () => navigate('/transportation-quiz')

  if (geolocation.error && !isErrorShown) {
    setIsErrorShown(true)

    Dialog.alert({
      content: t('geolocationDisabled'),
      confirmText: 'Ok',
      onConfirm: back
    })
  }

  return (
    <>
      <NavBar onBack={ back } />

      <Form
        isDisabled={ !!geolocation.error }
        isActive={ geolocation.longitude !== null && geolocation.latitude !== null }
        onSubmit={
          (data) => {
            const location = [geolocation.latitude, geolocation.longitude] as [number, number]

            const condition: ISearchInRadiusRequest = {
              ...data,
              location,
            }

            Container.get(SearchInRadiusStateService).startSearch(condition)
            navigate('/search-near')
          }
        }
        onCancel={ back }
      />

    </>
  )
}
