import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LANGUAGE_TYPE } from '../types'


export interface ISearchInRadiusResponse {
  id: string
  distance: number
  languages: LANGUAGE_TYPE[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
  waypoints: [LatLngTuple, LatLngTuple]
  contactData: string
}
