import React, { FC, memo, useEffect } from 'react'
import L, { LatLng, LatLngTuple } from 'leaflet'
import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-routing-machine'


export interface IRoutineMachineProps {
  onRoutesFound?: (routes: any) => void
  onWaypointsChanges: (info: [LatLngTuple, LatLngTuple]) => void
  waypoints: [LatLngTuple, LatLngTuple]
}

const router = L.Routing.control({
  router: L.Routing.osrmv1({
    serviceUrl: process.env.ROUTING_SERVICE,
    useHints: false,
  }),
  lineOptions: {
    extendToWaypoints: true,
    missingRouteTolerance: 1,
    styles: [{ color: '#6FA1EC', weight: 4, }],
  },
  // @ts-ignore
  routeLine: (route, options) => {
    // @ts-ignore
    const line = L.polyline(route.coordinates)

    line.arrowheads({
      frequency: '40px',
      color: 'red',
      yawn: 40,
      size: '13px'
    })

    return line
  },
  show: false,
  waypointMode: 'snap',
  addWaypoints: false,
  routeWhileDragging: true,
  // @ts-ignore
  draggableWaypoints: true,
  fitSelectedRoutes: false,
  showAlternatives: false,
  autoRoute: false
})

const RoutineMachineComponent = memo(createControlComponent(() => router))


export const RoutineMachine: FC<IRoutineMachineProps> = ({
  onRoutesFound,
  onWaypointsChanges,
  waypoints,
}) => {
  useEffect(() => {
    const lwaypoints = waypoints.map((i) => L.latLng(i))
    onRoutesFound && router.on('routesfound', onRoutesFound)
    router.on('waypointschanged', (e) => {
      const points = e.waypoints.map((w: { latLng: LatLng }) => [w.latLng.lat, w.latLng.lng])

      onWaypointsChanges(points)
    })
    router.setWaypoints(lwaypoints)
    router.route()

    return () => {
      // @ts-ignore
      router.off('routesfound')
      // @ts-ignore
      router.off('waypointschanged')
    }
  }, [])


  return (
    <RoutineMachineComponent />
  )
}
