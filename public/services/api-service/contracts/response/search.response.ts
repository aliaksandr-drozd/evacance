import { Point } from 'geojson'

import { BaggageOption } from '../../../../common/enums'
import { LANGUAGE_TYPE } from '../../../../common/types'


export interface ISearchResponseContract {
  count: number
  total_pages: number
  next: string
  previous: string
  results: {
    id: string
    last_active_at: string
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
