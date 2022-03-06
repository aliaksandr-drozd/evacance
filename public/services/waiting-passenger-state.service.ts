import { Container, Service } from 'typedi'

import { IWaitingPassengerResponse } from '../common/interfaces'
import { StateService } from './state-service'
import { ApiService } from './api-service'


export interface IWaitingPassengerState {
  data?: IWaitingPassengerResponse
  isLoading: boolean
}

const defaultState: IWaitingPassengerState = {
  isLoading: false
}

@Service<WaitingPassengerState>()
export class WaitingPassengerState extends StateService<IWaitingPassengerState> {
  constructor() {
    super(defaultState)
  }

  close = () => this.push({ isLoading: false, data: undefined })

  open = async (id: string) => {
    const api = Container.get(ApiService)

    this.push({ isLoading: true })

    const data = await api.getWaitingPassengerData(id)

    this.push({ isLoading: false, data })
  }
}
