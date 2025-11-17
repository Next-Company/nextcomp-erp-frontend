import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
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
import ListaMovimientosAlmacen from './pages/almacen/ListaMovimientos.tsx'
import LayoutAlmacen from './pages/almacen/LayoutAlmacen.tsx'
import LayoutMovimientos from './pages/almacen/LayoutMovimientos.tsx'
import LayoutInventario from './pages/almacen/LayoutInventario.tsx'
import NewInOut from './pages/almacen/NewIngresoEgreso.tsx'
import ListaInventarioAlmacen from './pages/almacen/ListaInventario.tsx'
import LayoutSolicitud from './pages/almacen/LayoutSolicitud.tsx'
import ListaSolicitudes from './pages/almacen/ListaSolicitudes.tsx'
import RevisionSolicitud from './pages/almacen/RevisionSolicitud.tsx'
import ErrorController from './pages/error/ErrorBoundary.tsx'
import LayoutProductos from './pages/productos/LayoutProductos.tsx'
import ListaProductos from './pages/productos/ListaProductos.tsx'
import { NewProducto } from './pages/productos/NewProducto.tsx'
import CuadreCorte from './pages/almacen/NewCuadre.tsx'
import NewMovimiento from './pages/almacen/NewMovimiento.tsx'
import LayoutRecetas from './pages/recetas/LayoutRecetas.tsx'
import ListaRecetas from './pages/recetas/ListaRecetas.tsx'
import { NewReceta } from './pages/recetas/NewReceta.tsx'
import ListaProveedores from './pages/proveedores/ListaProveedores.tsx'
import { NewProveedor } from './pages/proveedores/NewProveedor.tsx'
import LayoutMantenimiento from './pages/mantenimiento/LayoutMantenimiento.tsx'
import Configuracion from './pages/mantenimiento/Configuracion.tsx'



// const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
// const Home2 = lazy(() => import('./Home').then(module => ({ default: module.Home2 })));
// const Login = lazy(() => import('./Login').then(module => ({ default: module.Login })));
// const Dasboard = lazy(() => import('./Dasboard').then(module => ({ default: module.Dasboard })));
// const Config = lazy(() => import('./Config').then(module => ({ default: module.Config })));
// const Authorization = lazy(() => import('./Authorization.tsx'));
// const Directory = lazy(() => import('./Directory.tsx').then(module => ({ default: module.Directory })));
// const Soporte = lazy(() => import('./Soporte.tsx').then(module => ({ default: module.Soporte })));
// const Settings = lazy(() => import('./pages/Settings/Settings.tsx').then(module => ({ default: module.Settings })));
// const ChatRoom = lazy(() => import('./pages/ChatRoom.tsx').then(module => ({ default: module.ChatRoom })));
// const Agenda = lazy(() => import('./pages/Agenda.tsx').then(module => ({ default: module.Agenda })));
// const Operaciones = lazy(() => import('./Operaciones.tsx'));
// const Inicio = lazy(() => import('./components/operaciones/inicio.tsx'));
// const NuevaOrdenProduccion = lazy(() => import('./components/operaciones/nuevo.tsx').then(module => ({ default: module.NuevaOrdenProduccion })));
// const Estampado = lazy(() => import('./pages/estampado/Estampado.tsx'));
// const ListaEstampado = lazy(() => import('./pages/estampado/ListaEstampado.tsx'));
// const NuevoEstampado = lazy(() => import('./pages/estampado/NuevoEstampado.tsx'));
// const ReviewEstampado = lazy(() => import('./pages/estampado/ReviewEstampado.tsx'));
// const LayoutGuia = lazy(() => import('./pages/guias/LayoutGuia.tsx'));
// const ListaGuias = lazy(() => import('./pages/guias/ListaGuias.tsx'));
// const NewGuia = lazy(() => import('./pages/guias/NewGuia.tsx'));
// const LayoutPedido = lazy(() => import('./pages/pedidos/LayoutPedido.tsx'));
// const ListaPedidos = lazy(() => import('./pages/pedidos/ListaPedidos.tsx'));
// const NewPedido = lazy(() => import('./pages/pedidos/NewPedido.tsx'));
// const LayoutDespacho = lazy(() => import('./pages/despachos/LayoutDespacho.tsx'));
// const ListaDespachos = lazy(() => import('./pages/despachos/ListaDespachos.tsx'));
// const NewDespacho = lazy(() => import('./pages/despachos/NewDespacho.tsx'));
// const LayoutInforme = lazy(() => import('./pages/informes/LayoutInforme.tsx'));
// const Informe = lazy(() => import('./pages/informes/Informe.tsx'));
// const ListaPagos = lazy(() => import('./pages/pagos/ListaPagos.tsx'));
// const LayoutPagos = lazy(() => import('./pages/pagos/LayoutPagos.tsx'));
// const LayoutMuestras = lazy(() => import('./pages/muestras/LayoutMuestras.tsx'));
// const ListaMuestras = lazy(() => import('./pages/muestras/ListaMuestras.tsx'));
// const NewMuestra = lazy(() => import('./pages/muestras/NewMuestra.tsx'));
// const LayoutLetras = lazy(() => import('./pages/letras/LayoutLetras.tsx').then(module => ({ default: module.LayoutLetras })));
// const ListaLetras = lazy(() => import('./pages/letras/ListaLetras.tsx'));
// const NewLetraV2 = lazy(() => import('./pages/letras/NewLetrav2.tsx'));
// const SeguimientoGuia = lazy(() => import('./pages/guias/NewSeguimiento.tsx'));
// const NewPagoServicio = lazy(() => import('./pages/pagos/NewPagoServicio.tsx'));
// const NewPagoLetra = lazy(() => import('./pages/pagos/NewPagoLetras.tsx'));
// const LayoutPrestamo = lazy(() => import('./pages/prestamos/LayoutPrestamo.tsx'));
// const ListaPrestamos = lazy(() => import('./pages/prestamos/ListaPrestamos.tsx'));
// const NewPrestamo = lazy(() => import('./pages/prestamos/NewPrestamo.tsx'));
// const NewPagoPrestamo = lazy(() => import('./pages/pagos/NewPagoPrestamos.tsx'));
// const ListaOrdenes = lazy(() => import('./pages/ordenes/ListaOrdenes.tsx'));
// const NewOrden = lazy(() => import('./pages/ordenes/NewOrden.tsx').then(module => ({ default: module.NewOrden })));
// const LayoutOrden = lazy(() => import('./pages/ordenes/LayoutOrden.tsx'));
// const LayoutCobros = lazy(() => import('./pages/cobros/LayoutCobros.tsx'));
// const ListaCobros = lazy(() => import('./pages/cobros/ListaCobros.tsx'));
// const NewCobro = lazy(() => import('./pages/cobros/NewCobro.tsx'));
// const LayoutCaja = lazy(() => import('./pages/caja/LayoutCaja.tsx'));
// const InformeCaja = lazy(() => import('./pages/caja/InformeCaja.tsx'));
// const Unauthorized = lazy(() => import('./pages/pedidos/Unauthorized.tsx'));
// const PrivateRoute = lazy(() => import('./pages/pedidos/PrivateRouter.tsx'));
// const LayoutRetiro = lazy(() => import('./pages/retiros/LayoutRetiro.tsx'));
// const ListaRetiros = lazy(() => import('./pages/retiros/ListaRetiros.tsx'));
// const NewRetiro = lazy(() => import('./pages/retiros/NewRetiro.tsx'));
// const ListaMovimientosAlmacen = lazy(() => import('./pages/almacen/ListaMovimientos.tsx'));
// const LayoutAlmacen = lazy(() => import('./pages/almacen/LayoutAlmacen.tsx'));
// const LayoutMovimientos = lazy(() => import('./pages/almacen/LayoutMovimientos.tsx'));
// const LayoutInventario = lazy(() => import('./pages/almacen/LayoutInventario.tsx'));
// const NewInOut = lazy(() => import('./pages/almacen/NewIngresoEgreso.tsx'));
// const ListaInventarioAlmacen = lazy(() => import('./pages/almacen/ListaInventario.tsx'));
// const LayoutSolicitud = lazy(() => import('./pages/almacen/LayoutSolicitud.tsx'));
// const ListaSolicitudes = lazy(() => import('./pages/almacen/ListaSolicitudes.tsx'));
// const RevisionSolicitud = lazy(() => import('./pages/almacen/RevisionSolicitud.tsx'));
// const ErrorController = lazy(() => import('./pages/error/ErrorBoundary.tsx'));
// const LayoutProductos = lazy(() => import('./pages/productos/LayoutProductos.tsx'));
// const ListaProductos = lazy(() => import('./pages/productos/ListaProductos.tsx'));
// const NewProducto = lazy(() => import('./pages/productos/NewProducto.tsx').then(module => ({ default: module.NewProducto })));
// const CuadreCorte = lazy(() => import('./pages/almacen/NewCuadre.tsx'));
// const NewMovimiento = lazy(() => import('./pages/almacen/NewMovimiento.tsx'));
// const LayoutRecetas = lazy(() => import('./pages/recetas/LayoutRecetas.tsx'));
// const ListaRecetas = lazy(() => import('./pages/recetas/ListaRecetas.tsx'));
// const NewReceta = lazy(() => import('./pages/recetas/NewReceta.tsx').then(module => ({ default: module.NewReceta })));
// const ListaProveedores = lazy(() => import('./pages/proveedores/ListaProveedores.tsx'));
// const NewProveedor = lazy(() => import('./pages/proveedores/NewProveedor.tsx').then(module => ({ default: module.NewProveedor })));
// const LayoutMantenimiento = lazy(() => import('./pages/mantenimiento/LayoutMantenimiento.tsx'));
// const Configuracion = lazy(()=>import('./pages/mantenimiento/Configuracion.tsx'))


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
          { path: "", element: <Suspense fallback={"Cargando informacion....."}><ListaGuias /></Suspense> },
          { path: "nuevo", element: <NewGuia />, error: <ErrorController/> },
          { path: "nuevo/:id", element: <NewGuia />, error: <ErrorController/> },
          { path: "seguimiento/:id", element: <SeguimientoGuia />, error: <ErrorController/> },
        ]
      },
      {
        path: "muestras",
        element: <PrivateRoute><LayoutMuestras /></PrivateRoute>,
        children: [
          { path: "", element: <ListaMuestras /> },
          { path: "nuevo", element: <NewMuestra />, error: <ErrorController/> },
          { path: "nuevo/:id", element: <NewMuestra />, error: <ErrorController/> },
          // { path: "nuevo/:id", element: <NuevoEstampado/> },
          // { path: "review/:id", element: <ReviewEstampado/> },
        ] 
      },
      {
        path: "pedidos",
        element: <PrivateRoute><LayoutPedido /></PrivateRoute>,
        children: [
          { path: "", element: <ListaPedidos /> },
          { path: "nuevo", element: <NewPedido />, error: <ErrorController/> },
          { path: "nuevo/:id", element: <NewPedido />, error: <ErrorController/> },
          // { path: "nuevo/:id", element: <NuevoEstampado/> },
          // { path: "review/:id", element: <ReviewEstampado/> },
        ]
      },
      {
        path: "ordenes",
        element: <PrivateRoute><LayoutOrden /></PrivateRoute>,
        children: [
          { path: "", element: <ListaOrdenes /> },
          { path: "nuevo", element: <NewOrden />, error: <ErrorController/> },
          { path: "nuevo/:id", element: <NewOrden />, error: <ErrorController/> },
        ]
      },
      {
        path: "despachos",
        element: <PrivateRoute><LayoutDespacho /></PrivateRoute>,
        children: [
          { path: "", element: <ListaDespachos /> },
          { path: "nuevo", element: <NewDespacho />, error: <ErrorController/> },
          { path: "nuevo/:id", element: <NewDespacho />, error: <ErrorController/> },
          { path: "load/:idmuestra", element: <NewDespacho />, error: <ErrorController/> },
        ]
      },
      {
        path: "retiros",
        element: <PrivateRoute><LayoutRetiro /></PrivateRoute>,
        children: [
          { path: "", element: <ListaRetiros /> },
          { path: "nuevo", element: <NewRetiro />, error: <ErrorController/> },
          { path: "nuevo/:id", element: <NewRetiro />, error: <ErrorController/> },
          { path: "load/:idmuestra", element: <NewRetiro />, error: <ErrorController/> },
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
        element: <PrivateRoute><LayoutInforme /></PrivateRoute>,
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
      },
      {
        path: "almacen",
        element: <PrivateRoute><LayoutAlmacen /></PrivateRoute>,
        children: [
          { 
            path: "movimientos", 
            element: <LayoutMovimientos />,
            children: [
              { path: "", element: <ListaMovimientosAlmacen />, error: <ErrorController/> },
              // { path: "nuevo", element: <NewInOut />, error: <ErrorController/> },
              { path: "nuevo", element: <NewMovimiento />, error: <ErrorController/> },
              { path: "nuevo/:id", element: <NewMovimiento />, error: <ErrorController/> },
              { path: "cuadre/:id", element: <CuadreCorte /> }
            ]
          },
          { 
            path: "inventario", 
            element: <LayoutInventario />,
            children: [
              { path: "", element: <ListaInventarioAlmacen />, error: <ErrorController/> },
            ]
          },
          { 
            path: "solicitudes", 
            element: <LayoutSolicitud />,
            children: [
              { path: "", element: <ListaSolicitudes /> },
              { path: "nuevo", element: <RevisionSolicitud /> },
              { path: "cuadre", element: <CuadreCorte /> },
            ]
          }
        ]
      },
      {
        path: "mantenimiento",
        element: <PrivateRoute><LayoutMantenimiento/></PrivateRoute>,
        children: [
          { 
            path: "", 
            element: <Configuracion/>,
            // children: [
            //   { path: "", element: <ListaMovimientosAlmacen />, error: <ErrorController/> },
            //   { path: "nuevo", element: <NewMovimiento />, error: <ErrorController/> },
            //   { path: "nuevo/:id", element: <NewMovimiento />, error: <ErrorController/> },
            //   { path: "cuadre/:id", element: <CuadreCorte /> }
            // ]
          }
        ]
      },
      {
        path: "recetas",
        element: <PrivateRoute><LayoutRecetas/></PrivateRoute>,
        children: [
          { path: "",element: <ListaRecetas />, error: <ErrorController/> },
          { path: "nuevo",element: <NewReceta />, error: <ErrorController/> },
          { path: "nuevo/:id",element: <NewReceta />, error: <ErrorController/> }
        ]
      },
      {
        path: "productos",
        element: <PrivateRoute><LayoutProductos/></PrivateRoute>,
        children: [
          { path: "",element: <ListaProductos />, error: <ErrorController/> },
          { path: "nuevo",element: <NewProducto />, error: <ErrorController/> },
          { path: "nuevo/:id",element: <NewProducto />, error: <ErrorController/> }
        ]
      },
      {
        path: "proveedores",
        element: <PrivateRoute><LayoutProductos/></PrivateRoute>,
        children: [
          { path: "",element: <ListaProveedores />, error: <ErrorController/> },
          { path: "nuevo",element: <NewProveedor />, error: <ErrorController/> },
          { path: "nuevo/:id",element: <NewProveedor />, error: <ErrorController/> }
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
