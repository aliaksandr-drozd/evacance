import React, { FC } from 'react'
import { Container } from 'typedi'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useObservableState } from 'observable-hooks'

import { SearchScreenComponent } from './component'
import { SearchStateService } from '../../services'


export const SearchScreenContainer: FC = () => {
  const navigate = useNavigate()
  const { condition, results } = useObservableState(Container.get(SearchStateService).state$)

  if (!condition) {
    setTimeout(() => navigate('/'))
  }

  return (
    <>
      <NavBar onBack={ () => navigate('/') } />
      {
        !!condition && <SearchScreenComponent
          results={ results }
        />
      }
    </>
  )
}

export { SearchScreenContainer as SearchScreen }
