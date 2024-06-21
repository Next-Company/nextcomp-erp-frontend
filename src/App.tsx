import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom'
import './App.css'
import { Home } from './Home'
import { Login } from './Login'
import { Dasboard } from './Dasboard'
// import { About } from './About'
import { Config } from './Config'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authorization from './Authorization.tsx'


const routes = [
  {
    path: "/otro",
    element: <Home/>
  },
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/main",
    element: <Dasboard/>
  },
  {
    path: "/config",
    element: <Config/>
  }
]
const router = createBrowserRouter(routes)

function App() {
  const [status,setStatus] = useState(false)
  return (
    <Authorization>
      <RouterProvider router={router}/>
    </Authorization>
    // <>
    //   <h1>Hola mudno</h1>
    //   <Router>
    //     <Routes>
    //       <Route path='/' element={
    //         !status ? <Login/> : <Navigate to={'/main'}/>
    //       }/>
    //       <Route path="/about" element={<About/>} />
    //       <Route path="/main" element={<Dasboard/>}/>
    //       <Route path="/home" element={<Home/>} />
    //       <Route path="/config" element={<Config/>} />
    //     </Routes>
    //   </Router>
    // </>
  )
}

export default App
