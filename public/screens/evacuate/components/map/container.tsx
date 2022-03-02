import React, { FC } from 'react'
import { LatLngTuple } from 'leaflet'
import { MapComponent } from './component'

import { DEFAULT_MAP_CENTER } from '../../../../common/consts'


export interface IMapContainerProps {
  waypoints: [LatLngTuple, LatLngTuple]
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
}

export const MapContainer: FC<IMapContainerProps> = ({
  waypoints,
  onWaypointsChanges,
}) => {
  return (
    <MapComponent
      center={ DEFAULT_MAP_CENTER }
      waypoints={ waypoints }
      onWaypointsChanges={ onWaypointsChanges }
    />
  )
}

export { MapContainer as Map }
