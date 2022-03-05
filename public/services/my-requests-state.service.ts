import { Container, Service } from 'typedi'

import { IEvacuationResponse } from '../common/interfaces'
import { StateService } from './state-service'
import { IDService } from './id.service'
import { ApiService } from './api-service'


export interface IRequestsState {
  requests: IEvacuationResponse[]
}

const defaultState: IRequestsState = {
  requests: []
}

@Service<MyRequestsStateService>()
export class MyRequestsStateService extends StateService<IRequestsState> {
  private readonly userId = Container.get(IDService).getUid()

  constructor() {
    super(defaultState)
  }

/*  append = (request: IEvacuationResponse) => {
    if (request.userId !== this.userId) {
      return
    }

    const requests = this.state.requests

    if (requests.findIndex((i) => i.id === request.id) > -1) {
      return
    }

    requests.push(request)

    this.push({ requests })
  }*/

  delete = (id: string) => {
    const requests = this.state.requests
    const index = requests.findIndex((i) => i.id === id)

    if (index < 0) {
      return
    }

    requests.splice(index, 1)

    this.push({ requests })
  }

  get = async () => {
    const apiService = Container.get(ApiService)

    const result = await apiService.searchMyRequests()
    const requests = result.results

    this.push({ requests })
  }
}
