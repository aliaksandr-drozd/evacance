import { Container, Service } from 'typedi'

import {
  IEvacuationResponse,
  ISearchInRadiusRequest,
  ISearchInRadiusResponse,
  ITransportationRequest
} from '../common/interfaces'
import { StateService } from './state-service'
import { GeospatialService } from './geospatial.service'
import { ApiService } from './api-service'


export interface ISearchInRadiusState {
  results: ISearchInRadiusResponse[]
  condition?: ISearchInRadiusRequest
  isSearchPending: boolean
}

const defaultState: ISearchInRadiusState = {
  results: [],
  isSearchPending: false
}

@Service<SearchInRadiusStateService>()
export class SearchInRadiusStateService extends StateService<ISearchInRadiusState> {
  private abortControllers: AbortController[] = []

  constructor() {
    super(defaultState)
  }

  append = (row: ISearchInRadiusResponse) => {
    const { results } = this.state

    results.push(row)

    this.push({ results })
  }

  abortSearch = () => {
    this.abortControllers.map((c) => c.abort())
  }

  startSearch = (condition: ISearchInRadiusRequest) => {
    this.abortSearch()

    const newController = new AbortController()

    this.abortControllers.push(newController)
    this.push({ condition, results: [] })
    void this.search(newController.signal)
  }

  private search = async (signal: AbortSignal) => {
    const api = Container.get(ApiService)
    const condition = this.state.condition
    let currentPage = 1
    let totalPages = 0

    if (!condition) {
      return
    }

    this.push({ isSearchPending: true, results: [] })

    while (currentPage === 1 || currentPage <= totalPages) {
      const part = await api.searchInRadius(condition, currentPage)

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
