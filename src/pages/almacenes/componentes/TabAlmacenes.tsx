import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { Search } from "../../../components/Atoms/Search/Search"
import { Button } from "../../../components/Atoms/Button/Button"
import { toast } from "react-toastify"

/**
 * [feat 2026-06-26] Pestaña "Almacenes": lista paginada de los almacenes existentes con filtros.
 *
 * Fuente de datos: GET /almacen/listaralmacenesall (devuelve TODOS los almacenes de la empresa).
 * Como son pocas decenas de registros, el filtrado y la paginación se hacen en el cliente:
 *   - Filtro por texto (nombre o dirección).
 *   - Filtro por tipo (T=Tienda, A=Almacén, O=Local, C=Almacén de proceso).
 *   - Paginación de tamaño fijo (PAGE_SIZE) con controles anterior/siguiente.
 *
 * [refactor 2026-08-14] UI alineada al listado de ÓRDENES DE SERVICIO (ver ListaGuias.tsx):
 *   cabecera con título + átomo <Search>, barra de sub-pestañas con SUBRAYADO azul para el filtro
 *   por tipo (en lugar de un <select>), tabla con las clases compartidas del sistema y pie con
 *   <Button>. Se reutilizan los átomos Search/Button. Cambio SOLO presentacional: la lógica de
 *   filtros/paginación y la columna "Stock global" se conservan.
 */

// Etiquetas legibles para el campo `tipo` de tbl2_almacen.
const TIPO_LABEL: Record<string, string> = {
  T: 'Tienda',
  A: 'Almacén',
  O: 'Local',
  C: 'Almacén proceso',
}

// [refactor 2026-08-14] Color del badge por tipo de almacén. Reutiliza el IDIOMA de píldoras del
//   sistema (mismas familias de color que `colorfase` en utils): categórico = píldora rellena de
//   color con texto blanco. Da lectura de un vistazo del tipo sin depender solo del texto.
const TIPO_BADGE: Record<string, string> = {
  T: 'bg-blue-500',    // Tienda
  A: 'bg-purple-500',  // Almacén
  O: 'bg-orange-500',  // Local
  C: 'bg-gray-500',    // Almacén de proceso
}

// [refactor 2026-08-14] Sub-pestañas de filtro por tipo (mismo patrón que las pestañas de estado de
//   ListaGuias). id '' = todos. El filtrado sigue siendo en cliente (no golpea al backend).
const TIPO_TABS = [
  { id: '', label: 'Todos' },
  { id: 'T', label: 'Tiendas' },
  { id: 'A', label: 'Almacenes' },
  { id: 'O', label: 'Locales' },
  { id: 'C', label: 'Almacén proceso' },
]

// Cantidad de filas por página.
const PAGE_SIZE = 10

export default function TabAlmacenes() {
  const { setOpenloader } = useContext(ModalWindowContext)
  const lista = useRef(null)

  // Data cruda traída del backend (todos los almacenes).
  const [rows, setRows] = useState<any[]>([])
  // [feat 2026-08-14] "Stock global" por almacén (total de unidades de prenda en vivo), indexado
  //   por id de almacén. Se trae de un endpoint APARTE (/almacen/stockglobalalmacen) en paralelo al
  //   listado; si ese fetch falla, el mapa queda vacío y la columna muestra 0 sin romper la lista.
  const [stockGlobal, setStockGlobal] = useState<Record<number, number>>({})
  // Filtros activos.
  const [search, setSearch] = useState('')
  const [tipo, setTipo] = useState('')   // '' = todos
  // Página actual (base 1).
  const [page, setPage] = useState(1)

  // [refactor 2026-08-14] Carga extraída a una función reutilizable para poder reusarla en el botón
  //   "Actualizar" (patrón de las demás listas). Trae el listado (con loader global) y, en paralelo,
  //   los totales de stock (secundarios, sin bloquear el loader).
  const cargar = () => {
    setOpenloader(true)
    Consulta({ url: 'almacen/listaralmacenesall' })
      .then((resp) => {
        setRows(Array.isArray(resp) ? resp : [])
      })
      .catch(() => {
        toast.error('Error al cargar los almacenes', { theme: 'colored' })
      })
      .finally(() => {
        setOpenloader(false)
      })

    // [feat 2026-08-14] Totales de "stock global" en paralelo. Va aparte del listado y NO bloquea el
    //   loader: es un dato secundario, si falla la lista debe cargar igual (columna en 0).
    Consulta({ url: 'almacen/stockglobalalmacen' })
      .then((resp) => {
        const mapa: Record<number, number> = {}
        if (Array.isArray(resp)) {
          for (const r of resp) mapa[Number(r.id_almacen)] = Number(r.stock_global) || 0
        }
        setStockGlobal(mapa)
      })
      .catch(() => {
        // Silencioso: la lista de almacenes ya funciona; solo se pierde la columna de stock.
      })
  }

  // Carga inicial: trae todos los almacenes una sola vez.
  useEffect(() => {
    cargar()
  }, [])

  // Aplica los filtros (texto + tipo) sobre la data cruda. Se recalcula solo cuando cambian.
  const filtradas = useMemo(() => {
    const q = search.trim().toLowerCase()
    return rows.filter((r) => {
      const coincideTexto =
        q === '' ||
        `${r.nom ?? ''} ${r.dir ?? ''}`.toLowerCase().includes(q)
      const coincideTipo = tipo === '' || r.tipo === tipo
      return coincideTexto && coincideTipo
    })
  }, [rows, search, tipo])

  // Total de páginas según el resultado filtrado.
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE))
  // Página acotada al rango válido (evita quedar fuera de rango tras filtrar).
  const paginaActual = Math.min(page, totalPaginas)
  // Subconjunto visible de la página actual.
  const visibles = filtradas.slice((paginaActual - 1) * PAGE_SIZE, paginaActual * PAGE_SIZE)

  // [refactor 2026-08-14] La búsqueda ahora la maneja el átomo <Search> (debounce interno). Su
  //   `action` entrega el input; leemos su value para el filtrado en cliente y volvemos a la pág. 1.
  const onBuscar = (input: any) => { setSearch(input?.value ?? ''); setPage(1) }
  // [refactor 2026-08-14] Cambio de sub-pestaña de tipo (mismo gesto que filtrarestado de ListaGuias,
  //   pero en cliente): fija el tipo desde data-tipo y vuelve a la primera página.
  const filtrartipo = (e: any) => {
    const nuevoTipo = e.currentTarget.dataset.tipo ?? ''
    setTipo(nuevoTipo)
    setPage(1)
  }

  // Navegación de páginas (acotada al rango válido).
  const irAnterior = () => setPage((p) => Math.max(1, p - 1))
  const irSiguiente = () => setPage((p) => Math.min(totalPaginas, p + 1))

  // Índices "Mostrando X a Y de Z" para el pie.
  const desde = filtradas.length === 0 ? 0 : (paginaActual - 1) * PAGE_SIZE + 1
  const hasta = Math.min(paginaActual * PAGE_SIZE, filtradas.length)

  return (
    <div className="flex flex-col flex-1 pl-2 pr-2 h-full">
      {/* Cabecera: título + búsqueda (mismo layout que Órdenes de servicio). */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[16px] flex flex-row"><strong>Listado de almacenes</strong></h2>
          <div className="w-[500px] mb-1 flex justify-end">
            <div className="w-[260px]">
              <Search config={{ width: '250px' }} action={onBuscar} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200"></div>

      <div className="text-left scrollbar-special flex flex-col flex-1 overflow-hidden">
        {/* Sub-pestañas de tipo con subrayado azul (idéntico patrón a las pestañas de estado de guias). */}
        <div>
          <ul ref={lista} className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
            {
              TIPO_TABS.map((t) => (
                <button key={t.id || 'all'} className={`group ${tipo === t.id ? 'active' : ''}`} data-tipo={t.id} onClick={filtrartipo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    {t.label}
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              ))
            }
          </ul>
        </div>
        <hr />

        <div className="flex-1 scrollbar-special overflow-y-scroll relative mb-2">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_th]:px-[10px] [&_tr]:border-b [&_td]:px-[10px] [&_td]:py-2 [&_td]:align-middle [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>
                <th className="lg:table-cell">Tipo</th>
                <th className="lg:table-cell">Serie</th>
                <th className="lg:table-cell">Nombre</th>
                <th className="lg:table-cell">Dirección</th>
                <th className="lg:table-cell">Distrito</th>
                <th className="lg:table-cell">Teléfono</th>
                {/* [feat 2026-08-14] Total de unidades de prenda en vivo del almacén */}
                <th className="lg:table-cell text-right">Stock global</th>
                <th className="lg:table-cell text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {
                visibles.length > 0
                  ? visibles.map((row, key) => {
                    // Stock global de la fila (0 si el almacén no tiene prendas en vivo).
                    const stock = stockGlobal[Number(row.idx)] ?? 0
                    const activo = String(row.estado) === '1'
                    return (
                    <tr key={key}>
                      {/* Identificador secundario: atenuado para que la vista jerarquice el Nombre. */}
                      <td className="text-gray-400 tabular-nums">{row.idx}</td>
                      {/* Tipo como badge de color (idioma de píldoras del sistema). */}
                      <td>
                        <div className={`inline-flex justify-center min-w-[92px] text-white text-center text-[9px] font-semibold uppercase tracking-wide px-2 py-[3px] rounded-l-full rounded-r-full ${TIPO_BADGE[row.tipo] ?? 'bg-gray-400'}`}>
                          {TIPO_LABEL[row.tipo] ?? row.tipo ?? '-'}
                        </div>
                      </td>
                      <td className="text-gray-400 tabular-nums">{row.serie || '-'}</td>
                      {/* Nombre = campo principal de la fila. */}
                      <td className="font-semibold text-gray-800">{row.nom || '-'}</td>
                      <td className="text-gray-600">{row.dir || '-'}</td>
                      <td className="text-gray-600">{row.dis || '-'}</td>
                      <td className="text-gray-500 tabular-nums">{row.tel || '-'}</td>
                      {/* [feat 2026-08-14] Stock global = total de unidades de prenda en vivo. Número con
                          énfasis cuando hay stock (idioma numérico del sistema); atenuado cuando es 0. */}
                      <td className={`text-right tabular-nums ${stock > 0 ? 'font-extrabold text-gray-800' : 'text-gray-300'}`}>
                        {stock.toLocaleString('es-PE')}
                      </td>
                      {/* Estado como píldora suave con punto (Activo / Inactivo). */}
                      <td className="text-center">
                        <div className={`inline-flex items-center gap-1 px-2 py-[2px] rounded-l-full rounded-r-full text-[10px] font-semibold ${activo ? 'bg-green-500/10 text-green-600' : 'bg-gray-400/10 text-gray-400'}`}>
                          <span className={`w-[6px] h-[6px] rounded-full ${activo ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          {activo ? 'Activo' : 'Inactivo'}
                        </div>
                      </td>
                    </tr>
                    )
                  })
                  : <tr><td colSpan={9} className="text-center text-gray-400 py-10"><span>No se encontraron almacenes con los filtros aplicados.</span></td></tr>
              }
            </tbody>
            {/* Pie con resumen y controles de paginación */}
            <tfoot className="sticky w-full bottom-0 bg-gray-100">
              <tr className="outline outline-1">
                <td className="h-[45px] border-t border-t-gray-600" colSpan={9}>
                  <div className="flex flex-row justify-between items-center">
                    <div>Mostrando {desde} a {hasta} de {filtradas.length} registro(s)</div>
                    <div className="flex flex-row justify-end items-center gap-2">
                      <span className="text-black/50">Página {paginaActual} de {totalPaginas}</span>
                      <button
                        onClick={irAnterior}
                        disabled={paginaActual <= 1}
                        className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex justify-center items-center cursor-pointer transition-all disabled:opacity-30 disabled:cursor-default"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                      </button>
                      <button
                        onClick={irSiguiente}
                        disabled={paginaActual >= totalPaginas}
                        className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex justify-center items-center cursor-pointer transition-all disabled:opacity-30 disabled:cursor-default"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* [refactor 2026-08-14] Pie de acciones con el átomo <Button> (patrón de las listas). */}
        <div className="flex flex-row justify-end">
          <div className="flex gap-2">
            <Button action={cargar} tipo={'default'}>Actualizar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
