import React, { FC, useState } from 'react'
import { LatLngTuple } from 'leaflet'
import { useNavigate, useParams } from 'react-router'
import { Button, NavBar, Popup, Toast } from 'antd-mobile'
import { Container } from 'typedi'
import { useTranslation } from 'react-i18next'

import { DEFAULT_ROUTE } from '../../common/consts'
import { GunService, IDService } from '../../services'
import { Form, Map } from './components'


export const EvacuateScreen: FC = () => {
  const { t } = useTranslation()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const navigate = useNavigate()
  const { lat1, lng1, lat2, lng2 } = useParams()
  const waypoints: [LatLngTuple, LatLngTuple] = (lat1 && lng1 && lat2 && lng2) ? [[+lat1, +lng1], [+lat2, +lng2]] : DEFAULT_ROUTE

  const onWaypointsChanges = (_waypoint: LatLngTuple[]) => {
    navigate(`/evacuate/${_waypoint[0][0]}/${_waypoint[0][1]}/${_waypoint[1][0]}/${_waypoint[1][1]}`, { replace: true })
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
      <Popup
        visible={ isFormVisible }
        onMaskClick={() => setIsFormVisible(false)}
        position="bottom"
        bodyStyle={{ minHeight: '70vh' }}
      >
        <Form
          onSubmit={ (data) => {
            Container.get(GunService).addEvacuationRequest({
              ...data,
              waypoints: waypoints.map(v => v.join(',')).join(','),
              userId: Container.get(IDService).getUid()
            })

            Toast.show({ content: t('requestAdded') })

            navigate('/')
          } }
        />
      </Popup>
    </>
  )
}
