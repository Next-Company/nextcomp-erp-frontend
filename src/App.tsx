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
import { Directory } from './Directory.tsx'
import { Soporte } from './Soporte.tsx'


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
    element: <Dasboard/>,
    children: [
      {path: "directorio", element: <Directory/>},
      {path: "directorio/:directoryId", element: <Directory/>},
      {path: "soporte", element: <Soporte/>}
    ]
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
  )
}

export default App
