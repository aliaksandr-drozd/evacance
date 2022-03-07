import React, { FC, useState } from 'react'
import { LatLngTuple } from 'leaflet'
import { useNavigate, useParams } from 'react-router'
import { Button, FloatingBubble, NavBar, Popup } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import { Container } from 'typedi'

import { DEFAULT_ROUTE, DEFAULT_TOLERANCE } from '../../common/consts'
import { ITransportationRequest } from '../../common/interfaces'
import { SearchStateService } from '../../services'
import { LocationMarker } from '../../common/components'
import { Form, Map, PickRouteDeviation } from './components'


let segment: LatLngTuple[] = []

export interface ITransportationScreenProps {
  position?: LatLngTuple
}

export const TransportationScreen: FC<ITransportationScreenProps> = ({ position }) => {
  const isGeoLocationAvailable = 'geolocation' in navigator
  const [isGettingGeolocationPending, setIsGettingGeolocationPending] = useState(false)
  const { t } = useTranslation()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { lat1, lng1, lat2, lng2, tolerance } = useParams()
  const [cTolerance, setCTolerance] = useState(DEFAULT_TOLERANCE)
  const setSegment = (newSegment: LatLngTuple[]) => {segment = newSegment}
  const defaultRoute: [LatLngTuple, LatLngTuple] = position ? [position, DEFAULT_ROUTE[1]] : DEFAULT_ROUTE
  const [waypoints, setWaypoints] = useState(defaultRoute)
  const navigate = useNavigate()
  const center = waypoints[0]

  if (tolerance && cTolerance !== +tolerance) {
    setCTolerance(+tolerance)
  }

  if (lat1 && lat2 && lng1 && lng2 && +lat1 !== waypoints[0][0] && +lng1 !== waypoints[0][1] && +lat2 !== waypoints[1][0] && +lng2 !== waypoints[1][1]) {
    setWaypoints([[+lat1, +lng1], [+lat2, +lng2]])
  }


  const onWaypointsChanges = (_waypoint: LatLngTuple[]) => {
    // piece of shit/hack?
    let __tolerance: number = +(window.location.pathname
      .split('/')
      .filter((i) => !!i)
      .pop() || '')

    if (Number.isNaN(__tolerance)) {
      __tolerance = cTolerance
    }
    // end piece of shit/hack

    navigate(`/transportation/${_waypoint[0][0]}/${_waypoint[0][1]}/${_waypoint[1][0]}/${_waypoint[1][1]}/${__tolerance}`, { replace: true })
  }

  const onGetGeolocation = () => {
    setIsGettingGeolocationPending(true)
    navigator.geolocation.getCurrentPosition((pos) => {
      setWaypoints([[pos.coords.latitude, pos.coords.longitude], [waypoints[1][0], waypoints[1][1]]])

      setIsGettingGeolocationPending(false)
    })
  }

  const onToleranceChange = (__tolerance: number) => {
    navigate(`/transportation/${waypoints[0][0]}/${waypoints[0][1]}/${waypoints[1][0]}/${waypoints[1][1]}/${__tolerance}`, { replace: true })
  }

  return (
    <>
      <NavBar onBack={ () => navigate('/transportation-quiz') }>
        <Button
          onClick={ () => setIsFormVisible(true) }
          color="primary"
        >
          { t('continue') }
        </Button>
      </NavBar>

      <Map
        center={ center }
        waypoints={ waypoints }
        tolerance={ cTolerance }
        onSegment={ setSegment }
        onWaypointsChanges={ onWaypointsChanges }
      />

      {
        isGeoLocationAvailable &&
        <FloatingBubble
          style={{
            '--initial-position-bottom': '215px',
            '--initial-position-right': '24px',
          }}
          onClick={ onGetGeolocation }
        >
          {
            isGettingGeolocationPending
              ? <>...</>
              : <LocationMarker
                size={ 32 }
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
          onCancel={ () => setIsFormVisible(false) }
          onSubmit={ (req) => {
            const condition: ITransportationRequest = {
              ...req,
              segment,
              waypoints,
              tolerance: cTolerance,
            }

            Container.get(SearchStateService).startSearch(condition)
            navigate('/search')
          } }
        />
      </Popup>

      <PickRouteDeviation
        tolerance={ cTolerance }
        onToleranceChange={ onToleranceChange }
      />
    </>
  )
}
