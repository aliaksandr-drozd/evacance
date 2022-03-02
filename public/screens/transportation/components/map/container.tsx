import React, { FC, memo, useEffect, useState } from 'react'
import { LatLng, LatLngTuple, Map as LeafletMap, Polygon, polygon } from 'leaflet'
import { Container } from 'typedi'

import { DEFAULT_MAP_CENTER } from '../../../../common/consts'
import { GeospatialService } from '../../../../services'
import { MapComponent } from './component'


export interface IMapContainerProps {
  tolerance: number
  waypoints: [LatLngTuple, LatLngTuple]
  onSegment: (segment: LatLngTuple[]) => void
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
}

export const MapContainer: FC<IMapContainerProps> = memo(({
  tolerance,
  waypoints,
  onSegment,
  onWaypointsChanges,
}) => {
  const [map, setMap] = useState<LeafletMap>()
  const [zone, setZone] = useState<Polygon>()
  const [zoneHash, setZoneHash] = useState<string>('')
  const [path, setPath] = useState<LatLngTuple[]>()

  const recreateZone = () => {
    if (!path || !map) {
      return
    }

    const poly = Container.get(GeospatialService).lineToSegment(path, tolerance)
    const lpoly = polygon(poly)

    if (JSON.stringify(poly) != zoneHash) {
      if (zone) {
        zone.remove()
      }

      if (map) {
        lpoly.addTo(map)
        setZone(lpoly)
        setZoneHash(JSON.stringify(poly))
      }
    }

    return poly
  }

  useEffect(() => {
    const newSegment = recreateZone()

    if (newSegment) {
      onSegment(newSegment)
    }
  })

  const whenCreated = (map: LeafletMap) => {
    setMap(map)
  }

  const onFound = (routes: any) => {
    setPath(routes.routes[0].coordinates.map((pair: LatLng) => [pair.lat, pair.lng]))
  }

  return (
    <MapComponent
      center={ DEFAULT_MAP_CENTER }
      waypoints={ waypoints }
      onRoutesFound={ onFound }
      onWaypointsChanges={ onWaypointsChanges }
      whenCreated={ whenCreated }
    />
  )
})

export { MapContainer as Map }
