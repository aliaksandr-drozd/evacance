import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'


export interface ITransportationRequestForm {
  languages: string[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
}

export interface ITransportationRequestWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
  segment: LatLngTuple[]
  tolerance: number
}

export type ITransportationRequest = ITransportationRequestWaypoints & ITransportationRequestForm
