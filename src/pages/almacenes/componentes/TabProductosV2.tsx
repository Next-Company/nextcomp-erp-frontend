import { useContext, useEffect, useMemo, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify"

/**
 * [feat 2026-08-08] Rediseño de la pestaña "Productos": UNA TABLA POR PRODUCTO en formato
 * matriz Variante × Almacén (reemplaza los acordeones anidados de 3 niveles del TabProductos original).
 *
 * Fuente = GET /almacen/stockprendamatriz (stock EN VIVO liviano desde tbl2_almacen_det, la misma
 *   fuente que escribe el POS y la pestaña Movimientos) — NO el inventario físico periódico. Cada fila
 *   cruda es (variante, almacén): { id_producto_CAB, producto, marca, precio, id_color, color,
 *   id_talla, talla, condicion, id_almacen, almacen, almacen_tipo, stock }.
 *
 * Por cada producto se pinta una tabla: filas = variante (Color · Talla · Condición), columnas =
 *   almacenes con stock, celda = unidades, con totales por fila y por columna. Búsqueda + paginación
 *   en cliente. Solo lectura.
 */

const TIPO_ALMACEN_ABBR: Record<string, string> = { T: 'Tienda', A: 'Almacén', O: 'Local', C: 'Proceso' }
const PAGE_SIZE = 8

const condicionLabel = (c: any): string => {
  const s = (c ?? '').toString().trim().toLowerCase()
  if (!s) return '—'
  if (s.startsWith('prim') || s === '1') return 'Primera'
  if (s.startsWith('seg') || s === '2') return 'Segunda'
  return c.toString()
}

// Orden natural de tallas por letra; el resto cae a numérico o alfabético.
const TALLA_RANK: Record<string, number> = {
  'S/T': 0, 'S/N': 0, 'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5, 'XXL': 6, '2XL': 6, 'XXXL': 7, '3XL': 7,
}
const tallaSort = (a: string, b: string) => {
  const ra = TALLA_RANK[(a || '').toUpperCase()], rb = TALLA_RANK[(b || '').toUpperCase()]
  if (ra != null && rb != null) return ra - rb
  const na = parseFloat(a), nb = parseFloat(b)
  if (!isNaN(na) && !isNaN(nb)) return na - nb
  if (ra != null) return -1
  if (rb != null) return 1
  return String(a).localeCompare(String(b))
}

const fmtStock = (n: number) => {
  const v = Number(n) || 0
  return Number.isInteger(v) ? String(v) : String(parseFloat(v.toFixed(3)))
}
const fmtPrecio = (n: any) => {
  const v = Number(n)
  return isNaN(v) || n == null ? '—' : `S/ ${v.toFixed(2)}`
}

interface Almacen { id: any; nom: string; tipo: string }
interface Variante {
  key: string
  color: string
  talla: string
  condicion: string
  cells: Map<any, number>   // id_almacen -> stock
  total: number
}
interface Producto {
  id: any
  producto: string
  marca: string
  precio: any
  total: number
  almacenes: Almacen[]       // columnas (con stock)
  variantes: Variante[]      // filas
  buscable: string
}

export default function TabProductosV2() {
  const { setOpenloader } = useContext(ModalWindowContext)
  const [rows, setRows] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setOpenloader(true)
    Consulta({ url: 'almacen/stockprendamatriz' })
      .then((r) => setRows(Array.isArray(r) ? r : []))
      .catch(() => toast.error('Error al cargar el stock', { theme: 'colored' }))
      .finally(() => setOpenloader(false))
  }, [])

  // Agrupa: producto -> { almacenes (columnas), variantes (filas) -> celdas por almacén }.
  const productos = useMemo<Producto[]>(() => {
    const mapa = new Map<any, {
      id: any; producto: string; marca: string; precio: any; total: number
      almMap: Map<any, Almacen>
      varMap: Map<string, Variante>
    }>()

    for (const r of rows) {
      const pk = r.id_producto_CAB
      let p = mapa.get(pk)
      if (!p) {
        p = { id: pk, producto: r.producto ?? '', marca: r.marca ?? '', precio: r.precio ?? null, total: 0, almMap: new Map(), varMap: new Map() }
        mapa.set(pk, p)
      }
      const stock = Number(r.stock) || 0
      p.total += stock

      if (!p.almMap.has(r.id_almacen)) {
        p.almMap.set(r.id_almacen, { id: r.id_almacen, nom: r.almacen ?? '', tipo: r.almacen_tipo ?? '' })
      }

      const color = r.color || '—', talla = r.talla || '—', cond = condicionLabel(r.condicion)
      const vk = `${color}|${talla}|${cond}`
      let v = p.varMap.get(vk)
      if (!v) {
        v = { key: vk, color, talla, condicion: cond, cells: new Map(), total: 0 }
        p.varMap.set(vk, v)
      }
      v.cells.set(r.id_almacen, (v.cells.get(r.id_almacen) || 0) + stock)
      v.total += stock
    }

    return Array.from(mapa.values()).map((p) => {
      const almacenes = Array.from(p.almMap.values()).sort((a, b) => a.nom.localeCompare(b.nom))
      const variantes = Array.from(p.varMap.values()).sort((a, b) =>
        a.color.localeCompare(b.color) || tallaSort(a.talla, b.talla) || a.condicion.localeCompare(b.condicion))
      const buscable = `${p.producto} ${p.marca} ${almacenes.map((a) => a.nom).join(' ')} ${variantes.map((v) => v.color + ' ' + v.talla).join(' ')}`.toLowerCase()
      return { id: p.id, producto: p.producto, marca: p.marca, precio: p.precio, total: p.total, almacenes, variantes, buscable }
    }).sort((a, b) => a.producto.localeCompare(b.producto))
  }, [rows])

  const filtradas = useMemo(() => {
    const q = search.trim().toLowerCase()
    return q ? productos.filter((p) => p.buscable.includes(q)) : productos
  }, [productos, search])

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE))
  const paginaActual = Math.min(page, totalPaginas)
  const visibles = filtradas.slice((paginaActual - 1) * PAGE_SIZE, paginaActual * PAGE_SIZE)
  const desde = filtradas.length === 0 ? 0 : (paginaActual - 1) * PAGE_SIZE + 1
  const hasta = Math.min(paginaActual * PAGE_SIZE, filtradas.length)

  // Totales por columna (almacén) de un producto.
  const totalPorAlmacen = (p: Producto, almId: any) =>
    p.variantes.reduce((s, v) => s + (v.cells.get(almId) || 0), 0)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Buscar por prenda, marca, color, talla o almacén…"
          className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400 w-[320px]"
        />
        <span className="text-[12px] text-black/40 ml-auto">{filtradas.length} prenda(s) · stock en vivo</span>
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      {/* Lista de productos, cada uno con su tabla matriz */}
      <div className="flex-1 overflow-y-auto scrollbar-special mt-2 flex flex-col gap-4 pb-4">
        {visibles.length === 0 ? (
          <div className="text-center text-black/40 py-8">Sin stock en vivo</div>
        ) : visibles.map((p) => (
          <div key={p.id} className="border border-gray-200 rounded-md overflow-hidden">
            {/* Cabecera del producto */}
            <div className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="font-bold text-[13px] truncate">{p.producto || '—'}</span>
                {p.marca && <span className="text-[11px] text-black/45">{p.marca}</span>}
              </div>
              <div className="flex items-baseline gap-3 shrink-0 text-[12px]">
                <span className="text-black/45">P. venta: {fmtPrecio(p.precio)}</span>
                <span className="font-semibold">Total: {fmtStock(p.total)}</span>
              </div>
            </div>

            {/* Matriz variante × almacén */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-[11px] [&_td]:p-[6px] [&_th]:p-[6px] [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap">
                <thead className="bg-white text-black/50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left font-[600] sticky left-0 bg-white z-10 min-w-[190px]">Variante</th>
                    {p.almacenes.map((a) => (
                      <th key={a.id} className="text-right font-[600] min-w-[70px]" title={`${a.nom} (${TIPO_ALMACEN_ABBR[a.tipo] ?? a.tipo})`}>
                        {a.nom}
                      </th>
                    ))}
                    <th className="text-right font-[700] border-l border-gray-200 bg-gray-50 min-w-[60px]">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {p.variantes.map((v, i) => (
                    <tr key={v.key} className={`border-b border-gray-100 ${i % 2 ? 'bg-gray-50/40' : ''}`}>
                      <td className="text-left font-medium sticky left-0 bg-inherit z-10">
                        <span>{v.color}</span>
                        <span className="text-black/40"> · {v.talla} · {v.condicion}</span>
                      </td>
                      {p.almacenes.map((a) => {
                        const val = v.cells.get(a.id) || 0
                        return (
                          <td key={a.id} className={`text-right tabular-nums ${val === 0 ? 'text-black/20' : ''}`}>
                            {val === 0 ? '—' : fmtStock(val)}
                          </td>
                        )
                      })}
                      <td className="text-right font-semibold tabular-nums border-l border-gray-200 bg-gray-50">{fmtStock(v.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100 text-black/70">
                  <tr className="border-t border-gray-300">
                    <td className="font-[700] sticky left-0 bg-gray-100 z-10">TOTAL</td>
                    {p.almacenes.map((a) => (
                      <td key={a.id} className="text-right font-semibold tabular-nums">{fmtStock(totalPorAlmacen(p, a.id))}</td>
                    ))}
                    <td className="text-right font-bold tabular-nums border-l border-gray-300">{fmtStock(p.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex flex-row justify-between items-center h-[45px] border-t border-gray-300 bg-gray-100 px-2 text-[12px]">
        <div>Mostrando {desde} a {hasta} de {filtradas.length} prenda(s)</div>
        <div className="flex items-center gap-2">
          <span className="text-black/50">Página {paginaActual} de {totalPaginas}</span>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={paginaActual <= 1}
            className="w-[30px] h-[30px] rounded-full hover:bg-gray-300 flex justify-center items-center disabled:opacity-30 disabled:cursor-default transition-all"
          >‹</button>
          <button
            onClick={() => setPage((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual >= totalPaginas}
            className="w-[30px] h-[30px] rounded-full hover:bg-gray-300 flex justify-center items-center disabled:opacity-30 disabled:cursor-default transition-all"
          >›</button>
        </div>
      </div>
    </div>
  )
}
