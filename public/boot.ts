import { Container } from 'typedi'
import './common/components/i18n/config'

import { ApiService, IDService, MyRequestsStateService } from './services'


const userId = Container.get(IDService).getUid()

console.log(`User: ${userId}`)

const run = async () => {
  await Container.get(ApiService).login()
  await Container.get(MyRequestsStateService).get()
}

run()
