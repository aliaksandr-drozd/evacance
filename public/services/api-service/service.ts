import { Container, Service } from 'typedi'
import { DateTime } from 'luxon'
import { LatLngTuple } from 'leaflet'
import { lineString, point } from '@turf/helpers'

import { API_VERSION } from '../../common/consts'
import { IEvacuationRequest, ITransportationRequest, ITransportationResponse } from '../../common/interfaces'
import { ApiClientService } from '../api-client.service'
import { IDService } from '../id.service'
import { GeospatialService } from '../geospatial.service'
import { ICreateRequest, ILoginRequest, ISearchRequest, ISearchResponse } from './contracts'


@Service<ApiService>()
export class ApiService {
  login = async () => {
    const apiClient = Container.get(ApiClientService)

    const body: ILoginRequest = {
      id: Container.get(IDService).getUid()
    }

    try {
      await apiClient.post(
        `accounts/${API_VERSION}/user-sessions/`,
        JSON.stringify(body)
      )
    } catch (e) {
      return false
    }

    return true
  }

  createRequest = async (request: IEvacuationRequest): Promise<boolean> => {
    const apiClient = Container.get(ApiClientService)
    const body: ICreateRequest = {
      route_length: Container.get(GeospatialService).distance(request.waypoints[0], request.waypoints[1]),
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
      await apiClient.post(
        `${API_VERSION}/trips/requested-trips/`,
        JSON.stringify(body)
      )


    } catch (e) {
      return false
    }

    return true
  }

  deleteRequest = async (requestId: string): Promise<boolean> => {
    const apiClient = Container.get(ApiClientService)

    try {
      await apiClient.delete(`${API_VERSION}/trips/requested-trips/${requestId}/`)
    } catch (e) {
      return false
    }

    return true
  }

  completeRequest = async (requestId: string): Promise<boolean> => {
    const apiClient = Container.get(ApiClientService)

    try {
      await apiClient.post(`${API_VERSION}/trips/requested-trips/${requestId}/complete/`)
    } catch (e) {
      return false
    }

    return true
  }

  searchMyRequests = async (condition?: ITransportationRequest, page?: number): Promise<{ pages: number, results: ITransportationResponse[] }> => {
    const apiClient = Container.get(ApiClientService)
    const result: { pages: number, results: ITransportationResponse[] } = {
      pages: 0,
      results: []
    }
    const params: ISearchRequest & { user_session?: string } = {
      ...condition ? { luggage_size: condition.withBaggage } : {},
      ...condition ? { number_of_people: condition.peopleCount } : {},
      ...condition ? { spoken_languages: condition.languages.join(',') } : {},
      ...condition ? { with_pets: condition.withPets ? 'true' : 'false' } : {},
      user_session: Container.get(IDService).getUid(),
      page,
    }

    try {
      const results = await apiClient.get<ISearchResponse>(`${API_VERSION}/trips/requested-trips`, { params })

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

  searchRequests = async (condition?: ITransportationRequest, page?: number): Promise<{ pages: number, results: ITransportationResponse[] }> => {
    const apiClient = Container.get(ApiClientService)
    const result: { pages: number, results: ITransportationResponse[] } = {
      pages: 0,
      results: []
    }
    const params: ISearchRequest & { user_session?: string } = {
      ...condition ? { luggage_size: condition.withBaggage } : {},
      ...condition ? { number_of_people: condition.peopleCount } : {},
      ...condition ? { spoken_languages: condition.languages.join(',') } : {},
      ...condition ? { with_pets: condition.withPets ? 'true' : 'false' } : {},
      page,
    }

    try {
      const results = await apiClient.get<ISearchResponse>(`${API_VERSION}/trips/requested-trips`, { params })

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
