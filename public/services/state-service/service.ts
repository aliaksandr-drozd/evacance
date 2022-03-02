import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs'

import { IStateService } from './interfaces'


export class StateService<ServiceDataModel> implements IStateService<ServiceDataModel> {
  public readonly defaultState: ServiceDataModel
  private readonly subject$: BehaviorSubject<ServiceDataModel>

  constructor(defaultState: ServiceDataModel) {
    this.defaultState = defaultState
    this.subject$ = new BehaviorSubject(defaultState)
  }

  protected push(newState: Partial<ServiceDataModel>): void {
    const currentState: ServiceDataModel = this.state
    const nextState: ServiceDataModel = { ...currentState, ...newState }

    this.subject$.next(nextState)
  }

  public get state(): ServiceDataModel {
    return this.subject$.getValue()
  }

  public get state$(): BehaviorSubject<ServiceDataModel> {
    return this.subject$
  }

  public get changes$(): Observable<ServiceDataModel> {
    return this.subject$.pipe(
      distinctUntilChanged()
    )
  }

  public selectChanges$<K extends keyof ServiceDataModel>(key: K): Observable<ServiceDataModel[K]> {
    return this.subject$.pipe(
      map((state: ServiceDataModel) => state[key]),
      distinctUntilChanged()
    )
  }

  public setDefaultState(): void {
    this.push(this.defaultState)
  }

  public destroy(): void {
    this.subject$.complete()
  }
}
