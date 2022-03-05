import React, { FC } from 'react'
import { LatLngTuple } from 'leaflet'
import { MapComponent } from './component'

import { DEFAULT_MAP_CENTER } from '../../../../common/consts'


export interface IMapContainerProps {
  waypoints: [LatLngTuple, LatLngTuple]
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
  onRoutesFound: (route: LatLngTuple[]) => void
}

export const MapContainer: FC<IMapContainerProps> = ({
  waypoints,
  onWaypointsChanges,
  onRoutesFound,
}) => {
  return (
    <MapComponent
      center={ DEFAULT_MAP_CENTER }
      waypoints={ waypoints }
      onWaypointsChanges={ onWaypointsChanges }
      onRoutesFound={ onRoutesFound }
    />
  )
}

export { MapContainer as Map }
