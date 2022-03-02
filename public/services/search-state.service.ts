import { Container, Service } from 'typedi'

import { IEvacuationResponse, ITransportationRequest } from '../common/interfaces'
import { StateService } from './state-service'
import { GunService } from './gun.service'
import { GeospatialService } from './geospatial.service'
import { BaggageOption } from "../common/enums";


export interface ISearchState {
  results: IEvacuationResponse[]
  condition?: ITransportationRequest
}

const defaultState: ISearchState = {
  results: []
}

@Service<SearchStateService>()
export class SearchStateService extends StateService<ISearchState> {
  private search: any

  constructor() {
    super(defaultState)
  }

  setCondition = (condition: ITransportationRequest) => {
    this.push({
      condition,
      results: []
    })
    this.startSearch()
  }

  append = (row: IEvacuationResponse) => {
    const { results } = this.state

    results.push(row)

    this.push({ results })
  }

  startSearch = () => {
    const geo = Container.get(GeospatialService)
    const condition = this.state.condition

    if (!condition) {
      return
    }

    if (this.search) {
      this.search.off()
    }

    this.search = Container.get(GunService).map((row) => {
      if (row.peopleCount > condition.peopleCount) {
        return
      }

      if (row.withPets && !condition.withPets) {
        return
      }

      if (row.withBaggage !== BaggageOption.BIG_CAR && condition.withBaggage === BaggageOption.BIG_CAR) {
        return
      }

      if (row.withBaggage > condition.withBaggage) {
        return
      }

      const languageIntersection = row.languages.filter(value => condition.languages.includes(value))

      if (!languageIntersection.length) {
        return
      }

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
  }
}
