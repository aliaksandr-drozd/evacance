import React, { FC, useState } from 'react'
import { LatLngTuple } from 'leaflet'
import { useNavigate, useParams } from 'react-router'
import { Button, NavBar, Popup } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import { Container } from 'typedi'

import { DEFAULT_ROUTE, DEFAULT_TOLERANCE } from '../../common/consts'
import { ITransportationRequest } from '../../common/interfaces'
import { SearchStateService } from '../../services'
import { Form, Map, PickRouteDeviation } from './components'


let segment: LatLngTuple[] = []

export const TransportationScreen: FC = () => {
  const { t } = useTranslation()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { lat1, lng1, lat2, lng2, tolerance } = useParams()
  const [cTolerance, setCTolerance] = useState(DEFAULT_TOLERANCE)
  const setSegment = (newSegment: LatLngTuple[]) => {segment = newSegment}
  const [waypoints, setWaypoints] = useState(DEFAULT_ROUTE)
  const navigate = useNavigate()

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

  const onToleranceChange = (__tolerance: number) => {
    navigate(`/transportation/${waypoints[0][0]}/${waypoints[0][1]}/${waypoints[1][0]}/${waypoints[1][1]}/${__tolerance}`, { replace: true })
  }

  return (
    <>
      <NavBar onBack={ () => navigate('/') }>
        <Button
          onClick={ () => setIsFormVisible(true) }
        >
          { t('continue') }
        </Button>
      </NavBar>

      <Map
        waypoints={ waypoints }
        tolerance={ cTolerance }
        onSegment={ setSegment }
        onWaypointsChanges={ onWaypointsChanges }
      />
      <Popup
        visible={ isFormVisible }
        onMaskClick={() => setIsFormVisible(false)}
        position="bottom"
        bodyStyle={{ minHeight: '70vh' }}
      >
        <Form onSubmit={ (req) => {
          const condition: ITransportationRequest = {
            ...req,
            segment,
            waypoints,
            tolerance: cTolerance,
          }

          Container.get(SearchStateService).setCondition(condition)
          navigate('/search')
        } } />
      </Popup>

      <PickRouteDeviation
        tolerance={ cTolerance }
        onToleranceChange={ onToleranceChange }
      />
    </>
  )
}
