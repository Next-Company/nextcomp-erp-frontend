import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Home2 } from './Home'
import { Login } from './Login'
import { Dasboard } from './Dasboard'
import { Config } from './Config'
import Authorization from './Authorization.tsx'
import { Directory } from './Directory.tsx'
import { Soporte } from './Soporte.tsx'
import { Settings } from './pages/Settings/Settings.tsx'
import { ChatRoom } from './pages/ChatRoom.tsx'
import { Agenda } from './pages/Agenda.tsx'
import Operaciones from './Operaciones.tsx'
import Inicio from './components/operaciones/inicio.tsx'
import { NuevaOrdenProduccion } from './components/operaciones/nuevo.tsx'
import Estampado from './pages/estampado/Estampado.tsx'
import ListaEstampado from './pages/estampado/ListaEstampado.tsx'
import NuevoEstampado from './pages/estampado/NuevoEstampado.tsx'
import ReviewEstampado from './pages/estampado/ReviewEstampado.tsx'
import LayoutGuia from './pages/guias/LayoutGuia.tsx'
import ListaGuias from './pages/guias/ListaGuias.tsx'
import NewGuia from './pages/guias/NewGuia.tsx'

const routes = [
  {
    path: "/otro",
    element: <Home2 />
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
      { path: "chatroom", element: <ChatRoom /> },
      { path: "calendario", element: <Agenda /> },
      { 
        path: "estampado", 
        element: <Estampado/>,
        children: [
          { path: "inicio", element: <ListaEstampado/> },
          { path: "nuevo", element: <NuevoEstampado/> },
          { path: "nuevo/:id", element: <NuevoEstampado/> },
          { path: "review/:id", element: <ReviewEstampado/> },
        ]
      },
      { 
        path: "guias", 
        element: <LayoutGuia/>,
        children: [
          { path: "inicio", element: <ListaGuias/> },
          { path: "nuevo", element: <NewGuia/> },
          // { path: "nuevo/:id", element: <NuevoEstampado/> },
          // { path: "review/:id", element: <ReviewEstampado/> },
        ]
      },
      { path: "soporte", element: <Soporte /> },
      {
        path: "operaciones",
        element: <Operaciones />,
        children: [
          { path: "inicio", element: <Inicio /> },
          // { path: "nuevo", element: <><h1>Editando el detalle</h1></> }
          { path: "nuevo", element: <NuevaOrdenProduccion/> },
          { path: "nuevo/:id", element: <NuevaOrdenProduccion/> }
        ]
      }
    ]
  },
  {
    path: "/config",
    element: <Config />,
    children: [
      { path: "home", element: <Home /> },
      { path: "settings", element: <Settings /> }
    ]
  }
]
const router = createBrowserRouter(routes)

function App() {
  return (
    <Authorization>
      <RouterProvider router={router} />
    </Authorization>
  )
}
export default App
