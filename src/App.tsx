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
import LayoutPedido from './pages/pedidos/LayoutPedido.tsx'
import ListaPedidos from './pages/pedidos/ListaPedidos.tsx'
import NewPedido from './pages/pedidos/NewPedido.tsx'
import LayoutDespacho from './pages/despachos/LayoutDespacho.tsx'
import ListaDespachos from './pages/despachos/ListaDespachos.tsx'
import NewDespacho from './pages/despachos/NewDespacho.tsx'
import LayoutInforme from './pages/informes/LayoutInforme.tsx'
import Informe from './pages/informes/Informe.tsx'
import ListaPagos from './pages/pagos/ListaPagos.tsx'
import LayoutPagos from './pages/pagos/LayoutPagos.tsx'
import LayoutMuestras from './pages/muestras/LayoutMuestras.tsx'
import ListaMuestras from './pages/muestras/ListaMuestras.tsx'
import NewMuestra from './pages/muestras/NewMuestra.tsx'
import { LayoutLetras } from './pages/letras/LayoutLetras.tsx'
import ListaLetras from './pages/letras/ListaLetras.tsx'
import NewLetraV2 from './pages/letras/NewLetrav2.tsx'
import SeguimientoGuia from './pages/guias/NewSeguimiento.tsx'
import NewPagoServicio from './pages/pagos/NewPagoServicio.tsx'
import NewPagoLetra from './pages/pagos/NewPagoLetras.tsx'
import LayoutPrestamo from './pages/prestamos/LayoutPrestamo.tsx'
import ListaPrestamos from './pages/prestamos/ListaPrestamos.tsx'
import NewPrestamo from './pages/prestamos/NewPrestamo.tsx'
import NewPagoPrestamo from './pages/pagos/NewPagoPrestamos.tsx'
import ListaOrdenes from './pages/ordenes/ListaOrdenes.tsx'
import { NewOrden } from './pages/ordenes/NewOrden.tsx'
import LayoutOrden from './pages/ordenes/LayoutOrden.tsx'
import LayoutCobros from './pages/cobros/LayoutCobros.tsx'
import ListaCobros from './pages/cobros/ListaCobros.tsx'
import NewCobro from './pages/cobros/NewCobro.tsx'
import LayoutCaja from './pages/caja/LayoutCaja.tsx'
import InformeCaja from './pages/caja/InformeCaja.tsx'
import Unauthorized from './pages/pedidos/Unauthorized.tsx'
import PrivateRoute from './pages/pedidos/PrivateRouter.tsx'
import LayoutRetiro from './pages/retiros/LayoutRetiro.tsx'
import ListaRetiros from './pages/retiros/ListaRetiros.tsx'
import NewRetiro from './pages/retiros/NewRetiro.tsx'

const routes = [
  {
    path: "unauthorized", element: <Unauthorized />
  },
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
      {
        path: "unauthorized", element: <Unauthorized />
      },
      { path: "home", element: <Home /> },
      // { path: "directorio", element: <Directory /> },
      { 
        path: "directorio", element: <PrivateRoute><Directory /></PrivateRoute>,
      },
      { path: "directorio/:directoryId", element: <Directory /> },
      { path: "chatroom", element: <ChatRoom /> },
      { path: "calendario", element: <Agenda /> },
      {
        path: "estampado",
        element: <Estampado />,
        children: [
          { path: "", element: <ListaEstampado /> },
          { path: "nuevo", element: <NuevoEstampado /> },
          { path: "nuevo/:id", element: <NuevoEstampado /> },
          { path: "review/:id", element: <ReviewEstampado /> },
        ]
      },
      {
        path: "guias",
        element: <PrivateRoute><LayoutGuia /></PrivateRoute>,
        children: [
          { path: "", element: <ListaGuias /> },
          { path: "nuevo", element: <NewGuia /> },
          { path: "nuevo/:id", element: <NewGuia /> },
          { path: "seguimiento/:id", element: <SeguimientoGuia /> },
        ]
      },
      {
        path: "muestras",
        element: <PrivateRoute><LayoutMuestras /></PrivateRoute>,
        children: [
          { path: "", element: <ListaMuestras /> },
          { path: "nuevo", element: <NewMuestra /> },
          { path: "nuevo/:id", element: <NewMuestra /> },
          // { path: "nuevo/:id", element: <NuevoEstampado/> },
          // { path: "review/:id", element: <ReviewEstampado/> },
        ] 
      },
      {
        path: "pedidos",
        element: <PrivateRoute><LayoutPedido /></PrivateRoute>,
        children: [
          { path: "", element: <ListaPedidos /> },
          { path: "nuevo", element: <NewPedido /> },
          { path: "nuevo/:id", element: <NewPedido /> },
          // { path: "nuevo/:id", element: <NuevoEstampado/> },
          // { path: "review/:id", element: <ReviewEstampado/> },
        ]
      },
      {
        path: "ordenes",
        element: <PrivateRoute><LayoutOrden /></PrivateRoute>,
        children: [
          { path: "", element: <ListaOrdenes /> },
          { path: "nuevo", element: <NewOrden /> },
          { path: "nuevo/:id", element: <NewOrden /> },
        ]
      },
      {
        path: "despachos",
        element: <PrivateRoute><LayoutDespacho /></PrivateRoute>,
        children: [
          { path: "", element: <ListaDespachos /> },
          { path: "nuevo", element: <NewDespacho /> },
          { path: "nuevo/:id", element: <NewDespacho /> },
          { path: "load/:idmuestra", element: <NewDespacho /> },
        ]
      },
      {
        path: "retiros",
        element: <PrivateRoute><LayoutRetiro /></PrivateRoute>,
        children: [
          { path: "", element: <ListaRetiros /> },
          { path: "nuevo", element: <NewRetiro /> },
          { path: "nuevo/:id", element: <NewRetiro /> },
          { path: "load/:idmuestra", element: <NewRetiro /> },
        ]
      },
      {
        path: "letras",
        element: <PrivateRoute><LayoutLetras /></PrivateRoute>,
        children: [
          { path: "", element: <ListaLetras /> },
          { path: "nuevo", element: <NewLetraV2 /> },
          { path: "nuevo/:id", element: <NewLetraV2 /> },
          // { path: "nuevo/:id/:altura", element: <NewPago/> },
        ]
      },
      {
        path: "prestamos",
        element: <PrivateRoute><LayoutPrestamo /></PrivateRoute>,
        children: [
          { path: "", element: <ListaPrestamos /> },
          { path: "nuevo", element: <NewPrestamo /> },
          { path: "nuevo/:id", element: <NewPrestamo /> },
        ]
      },
      {
        path: "pagos",
        element: <PrivateRoute><LayoutPagos /></PrivateRoute>,
        children: [
          { path: "", element: <ListaPagos /> },
          { path: "nuevopagoservicio/:id", element: <NewPagoServicio /> },
          { path: "nuevopagoservicio/:id/:tipo", element: <NewPagoServicio /> },
          { path: "nuevopagoletra/:id", element: <NewPagoLetra /> },
          { path: "nuevopagoletra/:id/:tipo", element: <NewPagoLetra /> },
          { path: "nuevopagoprestamo/:id", element: <NewPagoPrestamo /> },
          { path: "nuevopagoprestamo/:id/:tipo", element: <NewPagoPrestamo /> },
          // { path: "nuevo/:id/:altura", element: <NewPagoServicio/> },
        ]
      },
      {
        path: "cobros",
        element: <PrivateRoute><LayoutCobros /></PrivateRoute>,
        children: [
          { path: "", element: <ListaCobros /> },
          { path: "nuevocobro/:id/:tipo", element: <NewCobro /> },
        ]
      },
      {
        path: "caja",
        element: <PrivateRoute><LayoutCaja /></PrivateRoute>,
        children: [
          { path: "", element: <InformeCaja /> },
        ]
      },
      {
        path: "informes",
        element: <LayoutInforme />,
        children: [
          { path: "", element: <Informe /> },
        ]
      },
      { path: "soporte", element: <Soporte /> },
      {
        path: "operaciones",
        element: <Operaciones />,
        children: [
          { path: "", element: <Inicio /> },
          // { path: "nuevo", element: <><h1>Editando el detalle</h1></> }
          { path: "nuevo", element: <NuevaOrdenProduccion /> },
          { path: "nuevo/:id", element: <NuevaOrdenProduccion /> }
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
