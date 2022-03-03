import { Container, Service } from 'typedi'

import { API_VERSION } from '../../common/consts'
import { ApiClientService } from '../api-client.service'
import { IDService } from '../id.service'
import { IEvacuationRequest, ITransportationRequest } from '../../common/interfaces'
import { ICreateRequest, ILoginRequest } from './contracts'


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

  searchRequests = async (condition: ITransportationRequest): Promise<boolean> => {
    return true
  }
}
