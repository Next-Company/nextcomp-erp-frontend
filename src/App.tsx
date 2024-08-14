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
import { Settings } from './pages/Settings/Settings.tsx'
import { ChatRoom } from './pages/ChatRoom.tsx'
import { Agenda } from './pages/Agenda.tsx'

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
      { path: "chatroom", element: <ChatRoom /> },
      { path: "calendario", element: <Agenda /> },
      { path: "soporte", element: <Soporte /> }
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
      <ModalWindowProvider>
        <RouterProvider router={router} />
      </ModalWindowProvider>
    </Authorization>
  )
}
export default App
