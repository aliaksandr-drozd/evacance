import { LatLngTuple } from 'leaflet'


export interface IWaitingPassengersResponse {
  id: string
  peopleCount: number
  point: LatLngTuple
}
