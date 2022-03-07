import React, { FC } from 'react'
import { LatLng, LatLngTuple, Map as LeafletMap } from 'leaflet'

import { LeafletControlGeocoder, Map, RoutineMachine } from '../../../../common/components'


export interface IMapComponentProps {
  center: LatLngTuple
  waypoints: [LatLngTuple, LatLngTuple]
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
  whenCreated?: (map: LeafletMap) => void
  onRoutesFound: (route: LatLngTuple[]) => void
}

export const MapComponent: FC<IMapComponentProps> = ({
  center,
  waypoints,
  whenCreated,
  onRoutesFound,
  onWaypointsChanges,
}) => {
  const _onRoutesFound = (routes: { routes: { coordinates: LatLng[] }[] }) => {
    if (!routes.routes.length) {
      return
    }

    const fixed = routes.routes[0].coordinates.map(i => [i.lat, i.lng] as [number, number])

    onRoutesFound(fixed)
  }

  return (
    <Map
      center={ center }
      whenCreated={ whenCreated ? whenCreated : () => {} }
    >
      <LeafletControlGeocoder />
      <RoutineMachine
        key={ JSON.stringify(waypoints) }
        onWaypointsChanges={ onWaypointsChanges }
        waypoints={ waypoints }
        onRoutesFound={ _onRoutesFound }
      />
    </Map>
  )
}
