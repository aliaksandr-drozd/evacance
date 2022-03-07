import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface ISearchInRadiusRequestForm {
  radius: number
  languages: (keyof typeof LOCALE_MAP)[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
}

export interface ISearchInRadiusRequestLocation {
  location: LatLngTuple
}

export type ISearchInRadiusRequest = ISearchInRadiusRequestLocation & ISearchInRadiusRequestForm
