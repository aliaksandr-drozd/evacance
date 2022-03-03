import { BaggageOption } from '../../../../common/enums'
import { LANGUAGE_TYPE } from '../../../../common/types'


export interface ISearchResponse {
  count: number
  next: string
  previous: string
  results: {
    last_active_at: string
    spoken_languages: LANGUAGE_TYPE[]
    number_of_people: number
    with_pets: boolean
    comment: string
    luggage_size: BaggageOption
    waypoints: {
      order: number
      point: [number, number]
    }[]
  }[]
}
