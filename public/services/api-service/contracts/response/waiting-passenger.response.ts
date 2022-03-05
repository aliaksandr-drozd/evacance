import { Point } from 'geojson'

import { LANGUAGE_TYPE } from '../../../../common/types'
import { BaggageOption } from '../../../../common/enums'


export interface IWaitingPassengerResponseContract {
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
}
