import { Container, Service } from 'typedi'

import { IWaitingPassengersResponse } from '../common/interfaces'
import { StateService } from './state-service'
import { ApiService } from './api-service'


export interface IEvacuationState {
  results: IWaitingPassengersResponse[]
  isSearchPending: boolean
}

const defaultState: IEvacuationState = {
  results: [],
  isSearchPending: false
}

@Service<EvacuationStateService>()
export class EvacuationStateService extends StateService<IEvacuationState> {
  private abortControllers: AbortController[] = []

  constructor() {
    super(defaultState)
  }

  append = (row: IWaitingPassengersResponse) => {
    const { results } = this.state

    results.push(row)

    this.push({ results })
  }

  abortSearch = () => {
    this.abortControllers.map((c) => c.abort())
  }

  startSearch = () => {
    this.abortSearch()

    const newController = new AbortController()

    this.abortControllers.push(newController)
    this.push({ results: [] })
    void this.search(newController.signal)
  }

  private search = async (signal: AbortSignal) => {
    const api = Container.get(ApiService)
    let currentPage = 1
    let totalPages = 0

    this.push({ isSearchPending: true, results: [] })

    while (currentPage === 1 || currentPage <= totalPages) {
      const part = await api.getWaitingPassengers(currentPage)

      if (signal.aborted) {
        return
      }

      if (!totalPages) {
        totalPages = part.pages
      }

      part.results.map((row) => {
        this.append(row)
      })

      currentPage++
    }

    this.push({ isSearchPending: false })
  }
}
