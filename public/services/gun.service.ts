import { Service } from 'typedi'
import { LatLngTuple } from 'leaflet'
import Gun from 'gun/gun'
import 'gun/sea'

import { IEvacuationRequest, IEvacuationResponse } from '../common/interfaces'
import { GUN_EVACUATION_REQUESTS_KEY } from '../common/consts'
import { ITS } from '../common/interfaces'


@Service<GunService>()
export class GunService {
  private readonly gun = new Gun({ peers: process.env.GUN_PEERS.split(',').map(i => i.trim()), localStorage: false, radisk: false })
  private readonly user: any

  constructor() {
    localStorage.removeItem('/gun')
    this.gun = new Gun({ peers: process.env.GUN_PEERS.split(',').map(i => i.trim()) })
    this.user = this.gun.user().recall({ sessionStorage: true })
  }

  addEvacuationRequest = (request: IEvacuationRequest) => {
    const toSend: IEvacuationRequest & ITS= {
      ...request,
      timestamp: Date.now()
    }

    this.gun.get(GUN_EVACUATION_REQUESTS_KEY)
      .set(toSend)
  }

  map = (onRow: (data: IEvacuationResponse) => void) => {
    return this.gun.get(GUN_EVACUATION_REQUESTS_KEY)
      .map()
      .on((data, id) => {
        try {
          const waypointsStr: [string, string, string, string] = data.waypoints.split(',')
          const waypoints: [LatLngTuple, LatLngTuple] = [[+waypointsStr[0], +waypointsStr[1]], [+waypointsStr[2], +waypointsStr[3]]]

          const row: IEvacuationResponse = {
            id,
            userId: data.userId,
            timestamp: +data.timestamp,
            contactData: data.contactData,
            languages: data.languages.split(',').map((l: string) => l.trim()),
            peopleCount: +data.peopleCount,
            withBaggage: +data.withBaggage,
            withPets: !!data.withPets,
            waypoints,
          }

          onRow(row)
        } catch (e) {}
      })
  }

  delete = (id: string) => {
    this.gun.get(GUN_EVACUATION_REQUESTS_KEY)
      .get(id)
      // @ts-ignore
      .put(null)
  }
}
