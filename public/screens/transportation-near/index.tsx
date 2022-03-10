import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Dialog, FloatingBubble, NavBar, Popup } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import useGeolocation from 'react-hook-geolocation'
import { LatLngTuple } from 'leaflet'
import { Container } from 'typedi'

import { ISearchInRadiusRequest } from '../../common/interfaces'
import { SearchInRadiusStateService } from '../../services'
import { DEFAULT_MAP_CENTER, DEFAULT_SEARCH_RADIUS } from '../../common/consts'
import { Form, Map, PickRadius } from './components'
import { LocationMarker } from "../../common/components";


export interface ITransportationNearScreenProps {
  position?: LatLngTuple
}

export const TransportationNearScreen: FC<ITransportationNearScreenProps> = ({
  position,
}) => {
  const { t } = useTranslation()
  const isGeoLocationAvailable = 'geolocation' in navigator
  const [isGettingGeolocationPending, setIsGettingGeolocationPending] = useState(false)
  const [isErrorShown, setIsErrorShown] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [markerPosition, setMarkerPosition] = useState(position || DEFAULT_MAP_CENTER)
  const [radius, setRadius] = useState(DEFAULT_SEARCH_RADIUS)
  const navigate = useNavigate()

  const back = () => navigate('/transportation-quiz')

  useEffect(() => {
    if (!position && !isErrorShown) {
      setIsErrorShown(true)

      Dialog.alert({
        content: t('geolocationDisabled'),
        confirmText: 'Ok',
      })
    }
  }, [position])

  const onGetGeolocation = () => {
    setIsGettingGeolocationPending(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setMarkerPosition([position.coords.latitude, position.coords.longitude])
      setIsGettingGeolocationPending(false)
    })
  }


  return (
    <>
      <NavBar onBack={ back }>
        <Button
          color="primary"
          onClick={ () => setIsFormVisible(true) }
        >
          { t('continue') }
        </Button>
      </NavBar>

      <Map
        radius={ radius }
        center={ position || DEFAULT_MAP_CENTER }
        markerPosition={ markerPosition }
        whenCreated={ () => {} }
        onMarkerLocationChange={ (position1) => setMarkerPosition(position1) }
      />

      <PickRadius
        onRadiusChange={ (r) => setRadius(r) }
        radius={ radius }
      />

      {
        isGeoLocationAvailable &&
        <FloatingBubble
          style={{
            '--initial-position-bottom': '174px',
            '--initial-position-right': '24px',
          }}
          onClick={ onGetGeolocation }
        >
          {
            isGettingGeolocationPending
              ? <>...</>
              : <LocationMarker
                size={32}
              />
          }
        </FloatingBubble>
      }
      <Popup
        visible={ isFormVisible }
        onMaskClick={ () => setIsFormVisible(false) }
        position="bottom"
      >
        <Form
          onSubmit={
            (data) => {
              const location = markerPosition

              const condition: ISearchInRadiusRequest = {
                ...data,
                radius,
                location,
              }

              Container.get(SearchInRadiusStateService).startSearch(condition)
              navigate('/search-near')
            }
          }
          onCancel={ () => setIsFormVisible(false) }
        />
      </Popup>

    </>
  )
}
