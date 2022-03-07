import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface ISearchInRadiusResponse {
  id: string
  distance: number
  languages: (keyof typeof LOCALE_MAP)[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
  waypoints: [LatLngTuple, LatLngTuple]
  contactData: string
}
