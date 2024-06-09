import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './Home'
import { Login } from './Login'
import { Dasboard } from './Dasboard'
import { About } from './About'
import { Config } from './Config'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/main" element={<Dasboard/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/config" element={<Config/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
