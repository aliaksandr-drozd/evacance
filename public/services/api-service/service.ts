import { AxiosResponse } from 'axios'
import { Container, Service } from 'typedi'

import { API_VERSION } from '../../common/consts'
import { ApiClientService } from '../api-client.service'
import { IDService } from '../id.service'
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
    } catch (e) {}
  }

}
