import { LineString, Point } from 'geojson'

import { BaggageOption } from '../../../../common/enums'
import { LANGUAGE_TYPE } from '../../../../common/types'


export interface ICreateRequestContact {
  spoken_languages: LANGUAGE_TYPE[]
  number_of_people: number
  with_pets: boolean
  comment: string
  luggage_size: BaggageOption
  waypoints: {
    order: number
    point: Point
  }[]
  route: LineString
  user_session: string
  route_length: number
}
