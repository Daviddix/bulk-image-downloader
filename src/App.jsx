import { Route, Routes } from 'react-router-dom'
import CSS from './App.css'
import Home from './pages/Home/Home'
import Results from './pages/Results/Results'
import PackView from './pages/PackView/PackView'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/packview" element={<PackView />} />
    </Routes>

  )
}

export default App
