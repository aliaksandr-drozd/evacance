import React, { FC } from 'react'
import { LatLngTuple, Map as LeafletMap } from 'leaflet'

import { Map, RoutineMachine } from '../../../../common/components'


export interface IMapComponentProps {
  center: LatLngTuple
  waypoints: [LatLngTuple, LatLngTuple]
  whenCreated: (map: LeafletMap) => void
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
  onRoutesFound: (routes: any) => void
}

export const MapComponent: FC<IMapComponentProps> = ({
  center,
  waypoints,
  whenCreated,
  onRoutesFound,
  onWaypointsChanges,
}) => {
  return (
    <Map
      center={ center }
      whenCreated={ whenCreated }
    >
      <RoutineMachine
        key={ JSON.stringify(waypoints) }
        onRoutesFound={ onRoutesFound }
        onWaypointsChanges={ onWaypointsChanges }
        waypoints={ waypoints }
      />
    </Map>
  )
}
