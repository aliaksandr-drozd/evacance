import React, { FC } from 'react'
import { LatLngTuple, Map as LeafletMap } from 'leaflet'

import { Map, RoutineMachine } from '../../../../common/components'


export interface IMapComponentProps {
  center: LatLngTuple
  waypoints: [LatLngTuple, LatLngTuple]
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
  whenCreated?: (map: LeafletMap) => void
}

export const MapComponent: FC<IMapComponentProps> = ({
  center,
  waypoints,
  onWaypointsChanges,
  whenCreated,
}) => {
  return (
    <Map
      center={ center }
      whenCreated={ whenCreated ? whenCreated : () => {} }
    >
      <RoutineMachine
        key={ JSON.stringify(waypoints) }
        onWaypointsChanges={onWaypointsChanges}
        waypoints={waypoints}
      />
    </Map>
  )
}
