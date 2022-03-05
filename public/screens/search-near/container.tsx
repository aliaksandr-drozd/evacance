import React, { FC } from 'react'
import { Container } from 'typedi'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useObservableState } from 'observable-hooks'

import { SearchNearScreenComponent } from './component'
import { SearchInRadiusStateService } from '../../services'


export const SearchNearScreenContainer: FC = () => {
  const navigate = useNavigate()
  const { condition, results, isSearchPending } = useObservableState(Container.get(SearchInRadiusStateService).state$)

  if (!condition) {
    setTimeout(() => navigate('/'))
  }

  return (
    <>
      <NavBar onBack={ () => navigate('/') } />
      {
        !!condition && <SearchNearScreenComponent
          isSearchPending={ isSearchPending }
          results={ results }
        />
      }
    </>
  )
}

export { SearchNearScreenContainer as SearchNearScreen }
