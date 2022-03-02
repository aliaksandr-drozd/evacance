import { BehaviorSubject, Observable } from 'rxjs'

export interface IStateService<ServiceDataModel> {
  defaultState: ServiceDataModel
  state: ServiceDataModel
  changes$: Observable<ServiceDataModel>
  state$: BehaviorSubject<ServiceDataModel>

  selectChanges$<K extends keyof ServiceDataModel>(key: K): Observable<ServiceDataModel[K]>
  setDefaultState(): void
  destroy(): void
}
