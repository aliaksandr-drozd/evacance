import React, { FC } from 'react'
import { LatLngTuple } from 'leaflet'

import { MapComponent } from './component'


export interface IMapContainerProps {
  center: LatLngTuple
  waypoints: [LatLngTuple, LatLngTuple]
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
  onRoutesFound: (route: LatLngTuple[]) => void
}

export const MapContainer: FC<IMapContainerProps> = ({
  center,
  waypoints,
  onWaypointsChanges,
  onRoutesFound,
}) => {
  return (
    <MapComponent
      center={ center }
      waypoints={ waypoints }
      onWaypointsChanges={ onWaypointsChanges }
      onRoutesFound={ onRoutesFound }
    />
  )
}

export { MapContainer as Map }
