import React, { FC, useState } from 'react'
import { LatLngTuple } from 'leaflet'
import { useNavigate, useParams } from 'react-router'
import { Button, Card, FloatingBubble, FloatingPanel, NavBar, Popup, Space, Toast } from 'antd-mobile'
import { Container } from 'typedi'
import { useTranslation } from 'react-i18next'

import { DEFAULT_ROUTE } from '../../common/consts'
import { ApiService, IDService, MyRequestsStateService } from '../../services'
import { LocationMarker } from '../../common/components'
import { Form, Map } from './components'


export const EvacuateScreen: FC = () => {
  const isGeoLocationAvailable = 'geolocation' in navigator
  const [isGettingGeolocationPending, setIsGettingGeolocationPending] = useState(false)
  const { t } = useTranslation()
  const [route, setRoute] = useState<LatLngTuple[]>([])
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
      <FloatingPanel
        anchors={ [140, 140] }
        handleDraggingOfContent={ false }
      >
        <Card>
          { t('mapUsage') }
        </Card>
      </FloatingPanel>
      <Map
        waypoints={ waypoints }
        onRoutesFound={ (route) => setRoute(route) }
        onWaypointsChanges={ onWaypointsChanges }
      />
      {
        isGeoLocationAvailable &&
        <FloatingBubble
          style={{
            '--initial-position-bottom': '154px',
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
          isSubmitAvailable={ isSubmitAvailable }
          onCancel={ () => setIsFormVisible(false) }
          onSubmit={
            async (data) => {
              setIsSubmitAvailable(false)

              const isSubmitted = await Container.get(ApiService).createRequest({
                ...data,
                route,
                waypoints: waypoints,
                userId: Container.get(IDService).getUid()
              })

              await Container.get(MyRequestsStateService).get()

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
