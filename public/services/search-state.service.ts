import { Container, Service } from 'typedi'

import { IEvacuationResponse, ITransportationRequest } from '../common/interfaces'
import { StateService } from './state-service'
import { GeospatialService } from './geospatial.service'
import { ApiService } from './api-service'


export interface ISearchState {
  results: IEvacuationResponse[]
  condition?: ITransportationRequest
  isSearchPending: boolean
}

const defaultState: ISearchState = {
  results: [],
  isSearchPending: false
}

@Service<SearchStateService>()
export class SearchStateService extends StateService<ISearchState> {
  private abortControllers: AbortController[] = []

  constructor() {
    super(defaultState)
  }

  append = (row: IEvacuationResponse) => {
    const { results } = this.state

    results.push(row)

    this.push({ results })
  }

  abortSearch = () => {
    this.abortControllers.map((c) => c.abort())
  }

  startSearch = (condition: ITransportationRequest) => {
    this.abortSearch()

    const newController = new AbortController()

    this.abortControllers.push(newController)
    this.push({ condition, results: [] })
    void this.search(newController.signal)
  }

  private search = async (signal: AbortSignal) => {
    const geo = Container.get(GeospatialService)
    const api = Container.get(ApiService)
    const condition = this.state.condition
    let currentPage = 1
    let totalPages = 0

    if (!condition) {
      return
    }

    this.push({ isSearchPending: true, results: [] })

    while (currentPage === 1 || currentPage <= totalPages) {
      const part = await api.searchRequests(condition, currentPage)

      if (signal.aborted) {
        return
      }

      if (!totalPages) {
        totalPages = part.pages
      }

      part.results.map((row) => {
        if (!geo.isPointInsidePolygon(row.waypoints[0], condition.segment)) {
          return
        }

        if (!geo.isPointInsidePolygon(row.waypoints[1], condition.segment)) {
          return
        }

        const startToStart = geo.distance(row.waypoints[0], condition.waypoints[0])
        const endToEnd = geo.distance(row.waypoints[1], condition.waypoints[1])

        const endToStart = geo.distance(row.waypoints[1], condition.waypoints[0])
        const startToEnd = geo.distance(row.waypoints[0], condition.waypoints[1])

        if ((endToStart + startToEnd) < (startToStart + endToEnd)) {
          return
        }

        this.append(row)
      })

      currentPage++
    }

    this.push({ isSearchPending: false })
  }
}
