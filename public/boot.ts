import { Container } from 'typedi'
import { ApiService, IDService } from './services'
import './common/components/i18n/config'

const userId = Container.get(IDService).getUid()

console.log(`User: ${userId}`)


Container.get(ApiService).login()

// Container.get(MyRequestsStateService).append
