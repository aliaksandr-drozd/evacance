import { Container } from 'typedi'
import { IDService, MyRequestsStateService } from './services'
import './common/components/i18n/config'

const userId = Container.get(IDService).getUid()

console.log(`User: ${userId}`)

/*
Container.get(GunService).map(
  Container.get(MyRequestsStateService).append
)
*/
