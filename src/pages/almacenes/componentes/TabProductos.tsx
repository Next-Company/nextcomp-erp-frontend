import { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify"

/**
 * [feat 2026-07-02] Pestaña "Productos": lista de variantes (producto+color+talla) con su
 * stock total y, al desplegar, el desglose de stock por almacén.
 *
 * Fuente de datos: GET /almacen/stockporalmacen — devuelve UNA fila por (variante, almacén)
 * con existencias. Aquí se agrupan por variante (id_subprod_CAB) para construir la lista
 * maestra y el detalle almacén→stock. Como son pocas decenas de miles de filas a lo sumo,
 * el filtrado y la paginación se resuelven en el cliente, igual que en TabAlmacenes.
 */

// Etiquetas legibles para el campo `tipo` del almacén (tbl2_almacen).
const TIPO_ALMACEN_LABEL: Record<string, string> = {
  T: 'Tienda',
  A: 'Almacén',
  O: 'Local',
  C: 'Almacén proceso',
}

// Cantidad de variantes por página.
const PAGE_SIZE = 10

// Formatea una cantidad de stock (quita decimales redundantes: 5.00 -> 5, 5.50 -> 5.5).
const fmtStock = (n: number) => {
  const v = Number(n) || 0
  return Number.isInteger(v) ? String(v) : String(parseFloat(v.toFixed(3)))
}

// Estructura agrupada por variante que consume la tabla.
interface Variante {
  id_subprod_CAB: any
  producto: string
  color: string
  talla: string
  tipo: string
  unidad: string
  total: number
  almacenes: { id_almacen: any; almacen: string; almacen_tipo: string; stock: number }[]
}

export default function TabProductos() {
  const { setOpenloader } = useContext(ModalWindowContext)

  // Data cruda del backend: una fila por (variante, almacén).
  const [rows, setRows] = useState<any[]>([])
  // Filtro de texto.
  const [search, setSearch] = useState('')
  // Página actual (base 1).
  const [page, setPage] = useState(1)
  // Variantes desplegadas (por id_subprod_CAB).
  const [abiertas, setAbiertas] = useState<Set<any>>(new Set())

  // Carga inicial: trae todo el stock una sola vez.
  useEffect(() => {
    setOpenloader(true)
    Consulta({ url: 'almacen/stockporalmacen' })
      .then((resp) => {
        setRows(Array.isArray(resp) ? resp : [])
      })
      .catch(() => {
        toast.error('Error al cargar el stock de productos', { theme: 'colored' })
      })
      .finally(() => {
        setOpenloader(false)
      })
  }, [])

  // Agrupa las filas crudas por variante, acumulando el stock por almacén y el total.
  const variantes = useMemo<Variante[]>(() => {
    const mapa = new Map<any, Variante>()
    for (const r of rows) {
      const key = r.id_subprod_CAB
      let v = mapa.get(key)
      if (!v) {
        v = {
          id_subprod_CAB: key,
          producto: r.producto ?? '',
          color: r.color ?? '',
          talla: r.talla ?? '',
          tipo: r.tipo ?? '',
          unidad: r.unidad ?? '',
          total: 0,
          almacenes: [],
        }
        mapa.set(key, v)
      }
      const stock = Number(r.stock) || 0
      v.total += stock
      v.almacenes.push({
        id_almacen: r.id_almacen,
        almacen: r.almacen ?? '',
        almacen_tipo: r.almacen_tipo ?? '',
        stock,
      })
    }
    return Array.from(mapa.values())
  }, [rows])

  // Aplica el filtro de texto (producto / color / talla / tipo).
  const filtradas = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (q === '') return variantes
    return variantes.filter((v) =>
      `${v.producto} ${v.color} ${v.talla} ${v.tipo}`.toLowerCase().includes(q)
    )
  }, [variantes, search])

  // Paginación.
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE))
  const paginaActual = Math.min(page, totalPaginas)
  const visibles = filtradas.slice((paginaActual - 1) * PAGE_SIZE, paginaActual * PAGE_SIZE)

  const onFiltroTexto = (e: any) => { setSearch(e.target.value); setPage(1) }
  const irAnterior = () => setPage((p) => Math.max(1, p - 1))
  const irSiguiente = () => setPage((p) => Math.min(totalPaginas, p + 1))

  // Alterna el despliegue de una variante.
  const toggle = (key: any) => {
    setAbiertas((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const desde = filtradas.length === 0 ? 0 : (paginaActual - 1) * PAGE_SIZE + 1
  const hasta = Math.min(paginaActual * PAGE_SIZE, filtradas.length)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Barra de filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input
          type="text"
          value={search}
          onChange={onFiltroTexto}
          placeholder="Buscar por producto, color, talla o tipo…"
          className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400 w-[300px]"
        />
        <span className="text-[12px] text-black/40 ml-auto">{filtradas.length} variante(s)</span>
      </div>

      <div className="w-full h-[1px] bg-gray-200"></div>

      {/* Tabla paginada con acordeón por variante */}
      <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll mt-2">
        <div className="flex-1 scrollbar-special overflow-y-scroll">
          <table className="w-[100%] border-collapse [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tbody_tr.fila-variante]:border-b [&_td]:p-[6px] [&_tbody_tr.fila-variante:hover]:bg-gray-300 text-[12px]">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="w-[30px]"></th>
                <th className="lg:table-cell">Producto</th>
                <th className="lg:table-cell">Color</th>
                <th className="lg:table-cell">Talla</th>
                <th className="lg:table-cell">Tipo</th>
                <th className="lg:table-cell text-center">Almacenes</th>
                <th className="lg:table-cell text-right">Stock total</th>
              </tr>
            </thead>
            <tbody>
              {
                visibles.length > 0
                  ? visibles.map((v, key) => {
                    const isOpen = abiertas.has(v.id_subprod_CAB)
                    return (
                      <Fragment key={key}>
                        <tr
                          className={`fila-variante cursor-pointer ${key % 2 === 0 ? 'bg-gray-100' : ''}`}
                          onClick={() => toggle(v.id_subprod_CAB)}
                        >
                          <td className="text-center">
                            <span className={`inline-block transition-transform ${isOpen ? 'rotate-90' : ''}`}>▸</span>
                          </td>
                          <td className="font-bold">{v.producto || '-'}</td>
                          <td>{v.color || '-'}</td>
                          <td>{v.talla || '-'}</td>
                          <td>{v.tipo || '-'}</td>
                          <td className="text-center">{v.almacenes.length}</td>
                          <td className="text-right font-semibold">{fmtStock(v.total)} {v.unidad}</td>
                        </tr>
                        {
                          isOpen && (
                            <tr key={`${key}-det`} className="bg-white">
                              <td></td>
                              <td colSpan={6} className="pt-0 pb-2">
                                <div className="rounded border border-gray-200 overflow-hidden">
                                  <table className="w-full border-collapse text-[11px] [&_td]:p-[5px] [&_tr:not(:last-child)]:border-b [&_tr]:border-gray-100">
                                    <thead className="bg-gray-50 text-black/50">
                                      <tr>
                                        <th className="text-left p-[5px] font-[600]">Almacén</th>
                                        <th className="text-left p-[5px] font-[600]">Tipo</th>
                                        <th className="text-right p-[5px] font-[600]">Stock</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {v.almacenes.map((a, k) => (
                                        <tr key={k}>
                                          <td>{a.almacen || '-'}</td>
                                          <td className="text-black/50">{TIPO_ALMACEN_LABEL[a.almacen_tipo] ?? a.almacen_tipo ?? '-'}</td>
                                          <td className="text-right font-semibold">{fmtStock(a.stock)} {v.unidad}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </Fragment>
                    )
                  })
                  : <tr className="h-[40px]"><td colSpan={7} className="text-center"><span>Datos no encontrados</span></td></tr>
              }
            </tbody>
            {/* Pie con resumen y controles de paginación */}
            <tfoot className="sticky w-full bottom-0 bg-gray-100">
              <tr className="outline outline-1">
                <td className="h-[45px] border-t border-t-gray-600" colSpan={7}>
                  <div className="flex flex-row justify-between items-center">
                    <div>Mostrando {desde} a {hasta} de {filtradas.length} variante(s)</div>
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
