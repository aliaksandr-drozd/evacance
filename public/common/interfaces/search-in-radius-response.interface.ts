import { LatLngTuple } from 'leaflet'
import { DateTime } from 'luxon'

import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface ISearchInRadiusResponse {
  id: string
  activeUntil: DateTime
  updatedAt: DateTime
  distance: number
  languages: (keyof typeof LOCALE_MAP)[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
  waypoints: [LatLngTuple, LatLngTuple]
  contactData: string
}
