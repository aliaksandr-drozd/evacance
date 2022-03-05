import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LANGUAGE_TYPE } from '../types'


export interface ISearchInRadiusRequestForm {
  radius: number
  languages: LANGUAGE_TYPE[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
}

export interface ISearchInRadiusRequestLocation {
  location: LatLngTuple
}

export type ISearchInRadiusRequest = ISearchInRadiusRequestLocation & ISearchInRadiusRequestForm
