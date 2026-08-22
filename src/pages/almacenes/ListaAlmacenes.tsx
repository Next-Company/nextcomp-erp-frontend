import { useState } from "react"
import TabAlmacenes from "./componentes/TabAlmacenes"
import TabMovimientos from "./componentes/TabMovimientos"
import TabProductosV3 from "./componentes/TabProductosV3"
import TabIngresoLector from "./componentes/TabIngresoLector"
import TabCargarAcabados from "./componentes/TabCargarAcabados"
// [2026-08-08] La pestaña "Productos" usa TabProductosV3 (master-detail: lista compacta + preview de
//   almacenes por producto, matriz Variante×Almacén al desplegar). Fuente: stock en vivo
//   (GET /almacen/stockprendamatriz). Versiones anteriores (TabProductosV2 = matriz completa,
//   TabProductos = acordeones) se conservan en disco por si hay que revertir, pero ya no se importan.

/**
 * [feat 2026-06-26] Página principal de la sección "Almacenes".
 *
 * Contenedor con dos pestañas:
 *   - "Almacenes": lista paginada de almacenes existentes con filtros (TabAlmacenes).
 *   - "Productos": pestaña aún sin contenido (TabProductos, placeholder en construcción).
 *
 * El estado `tab` controla cuál pestaña está activa. Se renderiza solo el contenido
 * de la pestaña seleccionada para evitar consultas innecesarias en la pestaña oculta.
 */

// Definición declarativa de las pestañas disponibles (id + etiqueta visible).
// [feat 2026-08-07] "Movimientos" = escritura de stock de prendas (Ingreso/Retiro/Traslado) sobre
//   el stock EN VIVO (tbl2_almacen_det). Desplegada a producción 2026-08-08 (backend ya expone
//   /almacen/stockprendalive y /almacen/movimientoprenda). Estuvo gateada a staging hasta el deploy.
const TABS = [
  { id: 'almacenes', label: 'Almacenes' },
  { id: 'productos', label: 'Productos' },
  { id: 'movimientos', label: 'Movimientos' },
  // [feat 2026-08-14] Ingreso/Traslado/Retiro de stock escaneando el EAN-13 de la etiqueta (resuelve por sku).
  { id: 'ingreso', label: 'Movimiento por lector' },
  // [feat 2026-08-14] Materializa el fraccionamiento de una orden como stock inicial en ACABADOS (A2).
  { id: 'acabados', label: 'Cargar a acabados' },
]

export default function ListaAlmacenes() {
  // Pestaña activa; por defecto arranca en "almacenes".
  const [tab, setTab] = useState('almacenes')

  return (
    <>
      <div className="directory flex flex-col flex-1 min-h-0 overflow-hidden lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="flex flex-col flex-1 min-h-0 pl-2 pr-2 pt-2 h-full">

          {/* Título de la sección */}
          <h1 className="text-xl font-semibold text-black/70 mb-2">Almacenes</h1>

          {/* Barra de pestañas: resalta la activa y permite cambiar de pestaña */}
          <div className="flex flex-row gap-1 border-b border-gray-200">
            {
              TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 text-[13px] -mb-[1px] border-b-2 transition-colors ${
                    tab === t.id
                      ? 'border-blue-500 text-blue-600 font-semibold'
                      : 'border-transparent text-black/50 hover:text-black/70'
                  }`}
                >
                  {t.label}
                </button>
              ))
            }
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden pt-2">
            {tab === 'almacenes' && <TabAlmacenes />}
            {tab === 'productos' && <TabProductosV3 />}
            {tab === 'movimientos' && <TabMovimientos />}
            {tab === 'ingreso' && <TabIngresoLector />}
            {tab === 'acabados' && <TabCargarAcabados />}
          </div>

        </div>
      </div>
    </>
  )
}
