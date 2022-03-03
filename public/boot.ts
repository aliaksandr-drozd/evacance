import { Container } from 'typedi'
import { ApiService, IDService } from './services'
import './common/components/i18n/config'

const userId = Container.get(IDService).getUid()

console.log(`User: ${userId}`)


Container.get(ApiService).login()
Container.get(ApiService).createRequest({
  languages: ["en"],
  userId: "sfsdfsf",
  waypoints: [[1,2], [3,4]],
  contactData: "fsdf",
  peopleCount: 1,
  withBaggage: 1,
  withPets: false
})

// Container.get(MyRequestsStateService).append
