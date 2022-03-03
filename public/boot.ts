import { Container } from 'typedi'
import { ApiService, IDService } from './services'
import './common/components/i18n/config'
import { BaggageOption } from "./common/enums";

const userId = Container.get(IDService).getUid()

console.log(`User: ${userId}`)


Container.get(ApiService).login()

Container.get(ApiService).searchRequests({
  tolerance: 1,
  waypoints: [[1,2], [3,4]],
  segment: [],
  languages: ["en"],
  peopleCount: 1,
  withBaggage: BaggageOption.SMALL_CAR,
  withPets: false
})

// Container.get(ApiService).completeRequest('b3b0a356-9fa8-4b3e-b491-0daf2e6f29bc')

/*Container.get(ApiService).createRequest({
  languages: ["en"],
  userId: "sfsdfsf",
  waypoints: [[1,2], [3,4]],
  contactData: "fsdf",
  peopleCount: 1,
  withBaggage: 1,
  withPets: false
})*/

// Container.get(MyRequestsStateService).append
