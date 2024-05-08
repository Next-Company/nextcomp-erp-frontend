// import { useState,  } from 'react'
// import { * } from 'react-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Home } from './Home'
import { Login } from './Login'
import { Dasboard } from './Dasboard'

function App() {
  return (
    <>
      <Router>
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr /> */}

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          {/* <Route path="/" element={<Login/>} /> */}
          <Route path="/" element={<Dasboard/>} />
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Routes>
    </Router>
    </>
    
  )
}

export default App
