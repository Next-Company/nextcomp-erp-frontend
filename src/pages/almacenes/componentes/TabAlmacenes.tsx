import { useContext, useEffect, useMemo, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
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
 * Patrón de UI basado en las listas existentes (p. ej. ListaProveedores).
 */

// Etiquetas legibles para el campo `tipo` de tbl2_almacen.
const TIPO_LABEL: Record<string, string> = {
  T: 'Tienda',
  A: 'Almacén',
  O: 'Local',
  C: 'Almacén proceso',
}

// Cantidad de filas por página.
const PAGE_SIZE = 10

export default function TabAlmacenes() {
  const { setOpenloader } = useContext(ModalWindowContext)

  // Data cruda traída del backend (todos los almacenes).
  const [rows, setRows] = useState<any[]>([])
  // Filtros activos.
  const [search, setSearch] = useState('')
  const [tipo, setTipo] = useState('')   // '' = todos
  // Página actual (base 1).
  const [page, setPage] = useState(1)

  // Carga inicial: trae todos los almacenes una sola vez.
  useEffect(() => {
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

  // Al cambiar cualquier filtro, se vuelve a la primera página.
  const onFiltroTexto = (e: any) => { setSearch(e.target.value); setPage(1) }
  const onFiltroTipo = (e: any) => { setTipo(e.target.value); setPage(1) }

  // Navegación de páginas (acotada al rango válido).
  const irAnterior = () => setPage((p) => Math.max(1, p - 1))
  const irSiguiente = () => setPage((p) => Math.min(totalPaginas, p + 1))

  // Índices "Mostrando X a Y de Z" para el pie.
  const desde = filtradas.length === 0 ? 0 : (paginaActual - 1) * PAGE_SIZE + 1
  const hasta = Math.min(paginaActual * PAGE_SIZE, filtradas.length)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Barra de filtros: búsqueda por texto + selección de tipo */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input
          type="text"
          value={search}
          onChange={onFiltroTexto}
          placeholder="Buscar por nombre o dirección…"
          className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400 w-[260px]"
        />
        <select
          value={tipo}
          onChange={onFiltroTipo}
          className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400"
        >
          <option value="">Todos los tipos</option>
          <option value="T">Tienda</option>
          <option value="A">Almacén</option>
          <option value="O">Local</option>
          <option value="C">Almacén proceso</option>
        </select>
        <span className="text-[12px] text-black/40 ml-auto">{filtradas.length} resultado(s)</span>
      </div>

      <div className="w-full h-[1px] bg-gray-200"></div>

      {/* Tabla paginada */}
      <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll mt-2">
        <div className="flex-1 scrollbar-special overflow-y-scroll">
          <table className="w-[100%] border-collapse [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 text-[12px] [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>
                <th className="lg:table-cell">Tipo</th>
                <th className="lg:table-cell">Serie</th>
                <th className="lg:table-cell">Nombre</th>
                <th className="lg:table-cell">Dirección</th>
                <th className="lg:table-cell">Distrito</th>
                <th className="lg:table-cell">Teléfono</th>
                <th className="lg:table-cell text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {
                visibles.length > 0
                  ? visibles.map((row, key) => (
                    <tr key={key}>
                      <td>{row.idx}</td>
                      <td>{TIPO_LABEL[row.tipo] ?? row.tipo ?? '-'}</td>
                      <td>{row.serie || '-'}</td>
                      <td className="font-bold">{row.nom || '-'}</td>
                      <td>{row.dir || '-'}</td>
                      <td>{row.dis || '-'}</td>
                      <td>{row.tel || '-'}</td>
                      <td className="text-center">
                        {String(row.estado) === '1'
                          ? <span className="text-green-600">Activo</span>
                          : <span className="text-gray-400">Inactivo</span>}
                      </td>
                    </tr>
                  ))
                  : <tr className="h-[40px]"><td colSpan={8} className="text-center"><span>Datos no encontrados</span></td></tr>
              }
            </tbody>
            {/* Pie con resumen y controles de paginación */}
            <tfoot className="sticky w-full bottom-0 bg-gray-100">
              <tr className="outline outline-1">
                <td className="h-[45px] border-t border-t-gray-600" colSpan={8}>
                  <div className="flex flex-row justify-between items-center">
                    <div>Mostrando {desde} a {hasta} de {filtradas.length} registro(s)</div>
                    <div className="flex flex-row justify-end items-center gap-2">
                      <span className="text-black/50">Página {paginaActual} de {totalPaginas}</span>
                      <button
                        onClick={irAnterior}
                        disabled={paginaActual <= 1}
                        className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex justify-center items-center cursor-pointer transition-all disabled:opacity-30 disabled:cursor-default"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                      </button>
                      <button
                        onClick={irSiguiente}
                        disabled={paginaActual >= totalPaginas}
                        className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex justify-center items-center cursor-pointer transition-all disabled:opacity-30 disabled:cursor-default"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
