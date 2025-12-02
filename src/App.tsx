import React from 'react'
import { Route, Routes } from 'react-router-dom'
import KhushiPortfolio from './pages/PortfolioPage'
import KhushiPortfolio2 from './pages/PortfolioPage2'
import PalashPortfolio from './pages/PalashPortfolioPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<KhushiPortfolio />} />
      <Route path="/1" element={<KhushiPortfolio2 />} />
      <Route path="/palash" element={<PalashPortfolio />} />
    </Routes>
  )
}

export default App