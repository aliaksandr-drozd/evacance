import { LatLngTuple } from 'leaflet'
import { DateTime } from 'luxon'

import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface IEvacuationResponse {
  id: string
  activeUntil: DateTime
  updatedAt: DateTime
  languages: (keyof typeof LOCALE_MAP)[]
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
  waypoints: [LatLngTuple, LatLngTuple]
}
