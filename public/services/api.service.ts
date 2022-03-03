import { Container, Service } from 'typedi'

import { ApiClientService } from './api-client.service'


@Service<ApiService>()
export class ApiService {
  login = () => {
    const apiClient = Container.get(ApiClientService)


  }

}
