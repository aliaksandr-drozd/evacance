import React, { FC, useState } from 'react'
import { LatLngTuple } from 'leaflet'
import { useNavigate, useParams } from 'react-router'
import { Button, FloatingBubble, NavBar, Popup, Toast } from 'antd-mobile'
import { Container } from 'typedi'
import { useTranslation } from 'react-i18next'

import { DEFAULT_ROUTE } from '../../common/consts'
import { ApiService, IDService } from '../../services'
import { LocationMarker } from '../../common/components'
import { Form, Map } from './components'
import styles from './styles.module.less'


export const EvacuateScreen: FC = () => {
  const isGeoLocationAvailable = 'geolocation' in navigator
  const [isGettingGeolocationPending, setIsGettingGeolocationPending] = useState(false)
  const { t } = useTranslation()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(true)
  const navigate = useNavigate()
  const { lat1, lng1, lat2, lng2 } = useParams()
  const waypoints: [LatLngTuple, LatLngTuple] = (lat1 && lng1 && lat2 && lng2) ? [[+lat1, +lng1], [+lat2, +lng2]] : DEFAULT_ROUTE

  const onWaypointsChanges = (_waypoint: LatLngTuple[]) => {
    navigate(`/evacuate/${_waypoint[0][0]}/${_waypoint[0][1]}/${_waypoint[1][0]}/${_waypoint[1][1]}`, { replace: true })
  }

  const onGetGeolocation = () => {
    setIsGettingGeolocationPending(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setIsGettingGeolocationPending(false)
      navigate(`/evacuate/${position.coords.latitude}/${position.coords.longitude}/${waypoints[1][0]}/${waypoints[1][1]}`, { replace: true })
    })
  }


  return (
    <>
      <NavBar
        onBack={ () => navigate('/') }
      >
        <Button
          color="primary"
          onClick={ () => setIsFormVisible(true) }
        >
          { t('continue') }
        </Button>
      </NavBar>
      <Map
        waypoints={ waypoints }
        onWaypointsChanges={ onWaypointsChanges }
      />
      {
        isGeoLocationAvailable &&
        <FloatingBubble
          className={
            // @ts-ignore
            styles.marker
          }
          style={{
            '--initial-position-bottom': '24px',
            '--initial-position-right': '24px',
          }}
          onClick={ onGetGeolocation }
        >
          <LocationMarker
            isActive={ isGettingGeolocationPending }
            size={ 32 }
          />
        </FloatingBubble>
      }
      <Popup
        visible={ isFormVisible }
        onMaskClick={ () => setIsFormVisible(false) }
        position="bottom"
      >
        <Form
          isSubmitAvailable={ isSubmitAvailable }
          onCancel={ () => setIsFormVisible(false) }
          onSubmit={
            async (data) => {
              setIsSubmitAvailable(false)

              const isSubmitted = await Container.get(ApiService).createRequest({
                ...data,
                waypoints: waypoints,
                userId: Container.get(IDService).getUid()
              })

              if (isSubmitted) {
                Toast.show({ content: t('requestAdded') })
                navigate('/')
              } else {
                Toast.show({ content: t('somethingWentWrong') })
              }
              setIsSubmitAvailable(true)
            }
          }
        />
      </Popup>
    </>
  )
}
