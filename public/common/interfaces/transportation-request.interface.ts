import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface ITransportationRequestForm {
  languages: (keyof typeof LOCALE_MAP)[]
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
