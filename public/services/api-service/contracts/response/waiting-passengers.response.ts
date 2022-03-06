import { Point } from 'geojson'


export interface IWaitingPassengersResponseContract {
  count: number
  total_pages: number
  next: string
  previous: string
  results: {
    id: string
    starting_point: Point,
    number_of_people: number
  }[]
}
