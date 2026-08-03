import { useState } from "react"
import TabAlmacenes from "./componentes/TabAlmacenes"
import TabProductos from "./componentes/TabProductos"

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
const TABS = [
  { id: 'almacenes', label: 'Almacenes' },
  { id: 'productos', label: 'Productos' },
]

export default function ListaAlmacenes() {
  // Pestaña activa; por defecto arranca en "almacenes".
  const [tab, setTab] = useState('almacenes')

  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="flex flex-col flex-1 pl-2 pr-2 pt-2 h-full">

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
          <div className="flex flex-col flex-1 overflow-hidden pt-2">
            {tab === 'almacenes' && <TabAlmacenes />}
            {tab === 'productos' && <TabProductos />}
          </div>

        </div>
      </div>
    </>
  )
}
