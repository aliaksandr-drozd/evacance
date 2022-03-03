import { Container, Service } from 'typedi'

import { API_VERSION } from '../../common/consts'
import { ApiClientService } from '../api-client.service'
import { IDService } from '../id.service'
import { IEvacuationRequest, ITransportationRequest } from '../../common/interfaces'
import { ILoginRequest } from './contracts'


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
    return true
  }

  deleteRequest = async (requestId: string): Promise<boolean> => {
    return true
  }

  completeRequest = async (requestId: string): Promise<boolean> => {
    return true
  }

  searchRequests = async (condition: ITransportationRequest): Promise<boolean> => {
    return true
  }
}
