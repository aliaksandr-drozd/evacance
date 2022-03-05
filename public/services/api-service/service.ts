import { Container, Service } from 'typedi'
import { DateTime } from 'luxon'
import { LatLngTuple } from 'leaflet'
import { lineString, point } from '@turf/helpers'

import { API_VERSION } from '../../common/consts'
import {
  IEvacuationRequest,
  ISearchInRadiusRequest,
  ISearchInRadiusResponse,
  ITransportationRequest,
  ITransportationResponse,
  IWaitingPassengerResponse,
  IWaitingPassengersResponse
} from '../../common/interfaces'
import { ApiClientService } from '../api-client.service'
import { IDService } from '../id.service'
import { GeospatialService } from '../geospatial.service'
import {
  ICreateRequestContact,
  ILoginRequestContract,
  ISearchInRadiusRequestContract,
  ISearchInRadiusResponseContract,
  ISearchRequestContract,
  ISearchResponseContract,
  IUserSessionRequest,
  IWaitingPassengerRequestContract,
  IWaitingPassengerResponseContract,
  IWaitingPassengersRequestContract,
  IWaitingPassengersResponseContract
} from './contracts'


@Service<ApiService>()
export class ApiService {
  private apiClient = Container.get(ApiClientService)
  private idProvider = Container.get(IDService)
  private geo = Container.get(GeospatialService)

  login = async () => {
    const body: ILoginRequestContract = {
      id: this.idProvider.getUid()
    }

    try {
      await this.apiClient.post(
        `${API_VERSION}/accounts/user-sessions/`,
        JSON.stringify(body)
      )
    } catch (e) {
      return false
    }

    return true
  }

  createRequest = async (request: IEvacuationRequest): Promise<boolean> => {
    const body: ICreateRequestContact = {
      route_length: this.geo.distance(request.waypoints[0], request.waypoints[1]),
      comment: request.contactData,
      luggage_size: request.withBaggage,
      number_of_people: request.peopleCount,
      spoken_languages: request.languages,
      user_session: Container.get(IDService).getUid(),
      with_pets: request.withPets,
      route: lineString(request.route.map((i) => i.reverse())).geometry,
      waypoints: [
        {
          order: 0,
          point: point(request.waypoints[0].reverse()).geometry
        },
        {
          order: 1,
          point: point(request.waypoints[1].reverse()).geometry
        }
      ]
    }

    try {
      await this.apiClient.post(
        `${API_VERSION}/trips/passenger/requested-trips/`,
        JSON.stringify(body)
      )


    } catch (e) {
      return false
    }

    return true
  }

  deleteRequest = async (id: string): Promise<boolean> => {
    const body: IUserSessionRequest = { user_session: this.idProvider.getUid() }

    try {
      await this.apiClient.post(`${API_VERSION}/trips/passenger/requested-trips/${id}/cancel/`, JSON.stringify(body))
    } catch (e) {
      return false
    }

    return true
  }

  completeRequest = async (id: string): Promise<boolean> => {
    const body: IUserSessionRequest = { user_session: this.idProvider.getUid() }

    try {
      await this.apiClient.post(`${API_VERSION}/trips/passenger/requested-trips/${id}/complete/`, JSON.stringify(body))
    } catch (e) {
      return false
    }

    return true
  }

  getWaitingPassengerData = async (id: string): Promise<IWaitingPassengerResponse | undefined> => {
    const params: IWaitingPassengerRequestContract = { id }

    try {
      const result = await this.apiClient.get<IWaitingPassengerResponseContract>(`${API_VERSION}/trips/driver/waiting-passengers/`, {params})

      const waypoints = result.data.waypoints.sort((i, j) => i.order - j.order)
      const point1 = waypoints[0].point.coordinates.reverse() as LatLngTuple
      const point2 = waypoints[1].point.coordinates.reverse() as LatLngTuple

      if (point1.length < 2) {
        return
      }

      if (point2.length < 2) {
        return
      }

      return {
        id: result.data.id,
        withPets: !!result.data.with_pets,
        withBaggage: result.data.luggage_size,
        peopleCount: result.data.number_of_people,
        languages: result.data.spoken_languages,
        contactData: result.data.comment,
        timestamp: DateTime.fromISO(result.data.last_active_at).toMillis(),
        waypoints: [point1, point2],
      }
    } catch (e) {}


    return undefined
  }

  getWaitingPassengers = async (page?: number): Promise<{ pages: number, results: IWaitingPassengersResponse[] }> => {
    const result: { pages: number, results: IWaitingPassengersResponse[] } = {
      pages: 0,
      results: []
    }
    const params: IWaitingPassengersRequestContract = { page }

    try {
      const results = await this.apiClient.get<IWaitingPassengersResponseContract>(`${API_VERSION}/trips/driver/waiting-passengers/`, {params})
      result.pages = results.data.total_pages
      results.data.results.map((i) => {
        if (i.starting_point.coordinates.length !== 2) {
          return
        }

        result.results.push({
          peopleCount: i.number_of_people,
          point: i.starting_point.coordinates.reverse() as [number, number]
        })
      })
    } catch (e) {}
    return result
  }

  getMyRequests = async (condition?: ITransportationRequest, page?: number): Promise<{ pages: number, results: ITransportationResponse[] }> => {
    const result: { pages: number, results: ITransportationResponse[] } = {
      pages: 0,
      results: []
    }
    const params: ISearchRequestContract = {
      ...condition ? { luggage_size: condition.withBaggage } : {},
      ...condition ? { number_of_people: condition.peopleCount } : {},
      ...condition ? { spoken_languages: condition.languages.join(',') } : {},
      ...condition ? { with_pets: condition.withPets ? 'true' : 'false' } : {},
      user_session: this.idProvider.getUid(),
      page,
    }

    try {
      const results = await this.apiClient.get<ISearchResponseContract>(`${API_VERSION}/trips/passenger/requested-trips/`, { params })

      result.pages = results.data.total_pages
      results.data.results.map((i) => {
        const waypoints = i.waypoints.sort((i, j) => i.order - j.order)
        const point1 = waypoints[0].point.coordinates.reverse() as LatLngTuple
        const point2 = waypoints[1].point.coordinates.reverse() as LatLngTuple

        if (point1.length < 2) {
          return
        }

        if (point2.length < 2) {
          return
        }

        result.results.push({
          id: i.id,
          timestamp: DateTime.fromISO(i.last_active_at).toMillis(),
          contactData: i.comment,
          languages: i.spoken_languages,
          peopleCount: i.number_of_people,
          waypoints: [point1, point2],
          withBaggage: i.luggage_size,
          withPets: i.with_pets
        })
      })
    } catch (e) {}

    return result
  }

  searchInRadius = async (condition?: ISearchInRadiusRequest, page?: number): Promise<{ pages: number, results: ISearchInRadiusResponse[] }> => {
    const result: { pages: number, results: ISearchInRadiusResponse[] } = {
      pages: 0,
      results: []
    }

    const params: ISearchInRadiusRequestContract = {
      ...condition ? {
        luggage_size: condition.withBaggage,
        number_of_people: condition.peopleCount,
        spoken_languages: condition.languages.join(','),
        with_pets: condition.withPets ? 'true' : 'false',
        lat: condition.location[0],
        lon: condition.location[1],
      } : {},
      user_session: this.idProvider.getUid(),
      page,
    }

    try {
      const results = await this.apiClient.get<ISearchInRadiusResponseContract>(`${API_VERSION}/trips/driver/requested-trips/`, { params })

      result.pages = results.data.total_pages
      results.data.results.map((i) => {
        const waypoints = i.waypoints.sort((i, j) => i.order - j.order)
        const point1 = waypoints[0].point.coordinates.reverse() as LatLngTuple
        const point2 = waypoints[1].point.coordinates.reverse() as LatLngTuple

        if (point1.length < 2) {
          return
        }

        if (point2.length < 2) {
          return
        }

        result.results.push({
          id: i.id,
          distance: i.distance_in_km,
          contactData: i.comment,
          languages: i.spoken_languages,
          peopleCount: i.number_of_people,
          waypoints: [point1, point2],
          withBaggage: i.luggage_size,
          withPets: i.with_pets
        })
      })
    } catch (e) {}

    return result
  }

  searchRequests = async (condition?: ITransportationRequest, page?: number): Promise<{ pages: number, results: ITransportationResponse[] }> => {
    const result: { pages: number, results: ITransportationResponse[] } = {
      pages: 0,
      results: []
    }
    const params: ISearchRequestContract = {
      ...condition ? { luggage_size: condition.withBaggage } : {},
      ...condition ? { number_of_people: condition.peopleCount } : {},
      ...condition ? { spoken_languages: condition.languages.join(',') } : {},
      ...condition ? { with_pets: condition.withPets ? 'true' : 'false' } : {},
      user_session: this.idProvider.getUid(),
      page,
    }

    try {
      const results = await this.apiClient.get<ISearchResponseContract>(`${API_VERSION}/trips/driver/requested-trips/`, { params })

      result.pages = results.data.total_pages
      results.data.results.map((i) => {
        const waypoints = i.waypoints.sort((i, j) => i.order - j.order)
        const point1 = waypoints[0].point.coordinates.reverse() as LatLngTuple
        const point2 = waypoints[1].point.coordinates.reverse() as LatLngTuple

        if (point1.length < 2) {
          return
        }

        if (point2.length < 2) {
          return
        }

        result.results.push({
          id: i.id,
          timestamp: DateTime.fromISO(i.last_active_at).toMillis(),
          contactData: i.comment,
          languages: i.spoken_languages,
          peopleCount: i.number_of_people,
          waypoints: [point1, point2],
          withBaggage: i.luggage_size,
          withPets: i.with_pets
        })
      })
    } catch (e) {}

    return result
  }
}
