import { Container, Service } from 'typedi'
import { DateTime } from 'luxon'

import { API_VERSION } from '../../common/consts'
import { ApiClientService } from '../api-client.service'
import { IDService } from '../id.service'
import { IEvacuationRequest, ITransportationRequest, ITransportationResponse } from '../../common/interfaces'
import { ICreateRequest, ILoginRequest, ISearchRequest, ISearchResponse } from './contracts'
import { GeospatialService } from "../geospatial.service";


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
      waypoints: [
        {
          order: 0,
          point: request.waypoints[0]
        },
        {
          order: 1,
          point: request.waypoints[1]
        }
      ]
    }

    try {
      await apiClient.post(
        `trips/${API_VERSION}/requested-trips/`,
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
      await apiClient.delete(`trips/${API_VERSION}/requested-trips/${requestId}/`)
    } catch (e) {
      return false
    }

    return true
  }

  completeRequest = async (requestId: string): Promise<boolean> => {
    const apiClient = Container.get(ApiClientService)

    try {
      await apiClient.post(`trips/${API_VERSION}/requested-trips/${requestId}/complete/`)
    } catch (e) {
      return false
    }

    return true
  }

  searchRequests = async (onlyMy: boolean, condition: ITransportationRequest, page?: number): Promise<{ pages: number, results: ITransportationResponse[] }> => {
    const apiClient = Container.get(ApiClientService)
    const result: { pages: number, results: ITransportationResponse[] } = {
      pages: 0,
      results: []
    }
    const params: ISearchRequest & { user_session?: string } = {
      luggage_size: condition.withBaggage,
      number_of_people: condition.peopleCount,
      spoken_languages: condition.languages.join(','),
      with_pets: condition.withPets,
      ...onlyMy ? { user_session: Container.get(IDService).getUid() } : {},
      page,
    }

    try {
      const results = await apiClient.get<ISearchResponse>(`trips/${API_VERSION}/requested-trips`, { params })

      result.pages = results.data.total_pages
      results.data.results.map((i) => {
        const waypoints = i.waypoints.sort((i, j) => i.order - j.order)

        result.results.push({
          timestamp: DateTime.fromISO(i.last_active_at).toMillis(),
          contactData: i.comment,
          languages: i.spoken_languages,
          peopleCount: i.number_of_people,
          waypoints: [[waypoints[0].point[0], waypoints[0].point[1]], [waypoints[1].point[0], waypoints[1].point[1]]],
          withBaggage: i.luggage_size,
          withPets: i.with_pets
        })
      })
    } catch (e) {}

    return result
  }
}
