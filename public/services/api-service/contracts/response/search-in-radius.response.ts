import { Point } from 'geojson'

import { BaggageOption } from '../../../../common/enums'
import { LANGUAGE_TYPE } from '../../../../common/types'


export interface ISearchInRadiusResponseContract {
  count: number
  total_pages: number
  next: string
  previous: string
  results: {
    id: string
    last_active_at: string
    distance_in_km: number
    spoken_languages: LANGUAGE_TYPE[]
    number_of_people: number
    with_pets: boolean
    comment: string
    luggage_size: BaggageOption
    waypoints: {
      order: number
      point: Point
    }[]
  }[]
}
