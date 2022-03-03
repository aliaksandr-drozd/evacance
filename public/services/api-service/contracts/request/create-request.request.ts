export interface ICreateRequest {
  spoken_languages: string[]
  number_of_people: number
  with_pets: boolean
  comment: string
  luggage_size: number
  waypoints: {
    order: number
    point: [number, number]
  }[]
  user_session: string
}
