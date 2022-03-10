import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface ISearchInRadiusRequestForm {
  languages: (keyof typeof LOCALE_MAP)[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
}

export interface ISearchInRadiusRequestLocation {
  location: LatLngTuple
  radius: number
}

export type ISearchInRadiusRequest = ISearchInRadiusRequestLocation & ISearchInRadiusRequestForm
