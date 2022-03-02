import React, { FC } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router'

import { EvacuateScreen } from './evacuate'
import { MainScreen } from './main'
import { SearchScreen } from './search'
import { TransportationScreen } from './transportation'
import { GDPRScreen } from './gdpr'

import './styles.module.less'


export const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <MainScreen /> } />
          <Route path="/transportation" element={ <TransportationScreen /> } />
          <Route path="/transportation/:lat1/:lng1/:lat2/:lng2/:tolerance" element={ <TransportationScreen /> } />

          <Route path="/evacuate" element={ <EvacuateScreen /> } />
          <Route path="/evacuate/:lat1/:lng1/:lat2/:lng2" element={ <EvacuateScreen /> } />

          <Route path="/search" element={ <SearchScreen /> } />
        </Routes>
      </BrowserRouter>
      <GDPRScreen />
    </>
  )
}
