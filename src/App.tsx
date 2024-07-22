import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ModalWindowProvider } from './components/ModalWindow/ModalWindowProvider.tsx'
import './App.css'
import { Home } from './pages/Home'
import { Login } from './Login'
import { Dasboard } from './Dasboard'
import { Config } from './Config'
import Authorization from './Authorization.tsx'
import { Directory } from './Directory.tsx'
import { Soporte } from './Soporte.tsx'

const routes = [
  {
    path: "/otro",
    element: <Home />
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/main",
    element: <Dasboard />,
    children: [
      { path: "home", element: <Home /> },
      { path: "directorio", element: <Directory /> },
      { path: "directorio/:directoryId", element: <Directory /> },
      { path: "soporte", element: <Soporte /> }
    ]
  },
  {
    path: "/config",
    element: <Config />
  }
]
const router = createBrowserRouter(routes)

function App() {
  const [status, setStatus] = useState(false)
  return (
    <Authorization>
      <ModalWindowProvider>
        <RouterProvider router={router} />
      </ModalWindowProvider>
    </Authorization>
  )
}
export default App
