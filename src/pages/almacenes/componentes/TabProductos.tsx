import { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify"

/**
 * [feat 2026-07-02] Pestaña "Productos": stock de prendas.
 *
 * [reenfoque 2026-07-03] Fuente: GET /almacen/stockporalmacen — stock de PRENDAS por tienda
 *   tomado del último INVENTARIO FÍSICO (modalidad total + estado PROSC) de cada almacén.
 *   Cada fila cruda es (variante, almacén, condición): { id_producto_CAB, id_subprod_CAB, producto,
 *   color, talla, tipo, unidad, marca, precio, condicion, id_almacen, almacen, almacen_tipo, stock,
 *   fecha_inventario, fecha_ultimo_ingreso, cantidad_ultimo_ingreso }.
 *
 * [feat 2026-07-06] Se muestra por TIENDA el ÚLTIMO ingreso de la prenda (fecha + cantidad de ese
 *   ingreso): el más reciente entre las variantes de la prenda en esa tienda. Fuente distinta al
 *   stock (bitácora de movimientos vs inventario físico); puede ser NULL si no hay ingresos.
 *
 * [ui 2026-07-03] Jerarquía:
 *   1) Lista maestra por PRENDA (con marca, precio de venta y stock total).
 *   2) Al desplegar: acordeón por TIENDA (con su fecha de inventario, último ingreso y subtotal).
 *   3) Al desplegar una tienda: DOS matrices, una por CONDICIÓN (Primera / Segunda), con COLORES
 *      en el eje Y (filas) y TALLAS en el eje X (columnas); cada celda es la cantidad contada.
 *   + Filtro por color (selector): reduce las prendas y, dentro, deja solo la fila de ese color.
 *
 * OJO: el stock es "según el último inventario físico" de cada tienda, NO en tiempo real; por
 * eso se muestra la fecha (y se resalta si es antigua). El filtrado/paginación son en cliente.
 */

// Etiquetas legibles para el `tipo` del almacén (tbl2_almacen).
const TIPO_ALMACEN_LABEL: Record<string, string> = {
  T: 'Tienda', A: 'Almacén', O: 'Local', C: 'Almacén proceso',
}

// Cantidad de prendas por página.
const PAGE_SIZE = 10

// Umbral (días) para marcar un inventario como "antiguo".
const DIAS_INVENTARIO_ANTIGUO = 180

// Normaliza el valor crudo de `condicion` a una etiqueta legible y su orden de aparición.
const condicionLabel = (c: any): string => {
  const s = (c ?? '').toString().trim().toLowerCase()
  if (!s) return 'Sin condición'
  if (s.startsWith('prim') || s === '1') return 'Primera'
  if (s.startsWith('seg') || s === '2') return 'Segunda'
  return c.toString()
}
const CONDICION_ORDER: Record<string, number> = { 'Primera': 0, 'Segunda': 1, 'Sin condición': 9 }
const condicionSort = (a: string, b: string) =>
  (CONDICION_ORDER[a] ?? 5) - (CONDICION_ORDER[b] ?? 5) || a.localeCompare(b)

// Orden natural de tallas por letra; lo demás cae a numérico o alfabético.
const TALLA_RANK: Record<string, number> = {
  'S/T': 0, 'S/N': 0, 'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5, 'XXL': 6, '2XL': 6, 'XXXL': 7, '3XL': 7,
}
const tallaSort = (a: string, b: string) => {
  const ra = TALLA_RANK[(a || '').toUpperCase()]
  const rb = TALLA_RANK[(b || '').toUpperCase()]
  if (ra != null && rb != null) return ra - rb
  const na = parseFloat(a), nb = parseFloat(b)
  const aNum = !isNaN(na), bNum = !isNaN(nb)
  if (aNum && bNum) return na - nb
  if (ra != null) return -1
  if (rb != null) return 1
  if (aNum) return -1
  if (bNum) return 1
  return String(a).localeCompare(String(b))
}

// Formatea stock (quita decimales redundantes: 5.00 -> 5, 5.50 -> 5.5).
const fmtStock = (n: number) => {
  const v = Number(n) || 0
  return Number.isInteger(v) ? String(v) : String(parseFloat(v.toFixed(3)))
}
// Formatea precio de venta.
const fmtPrecio = (n: any) => {
  const v = Number(n)
  return isNaN(v) || n == null ? '—' : `S/ ${v.toFixed(2)}`
}

// Formatea la fecha del inventario (solo fecha) y calcula si es antigua.
const parseFecha = (s: any): Date | null => {
  if (!s) return null
  const d = new Date(s)
  return isNaN(d.getTime()) ? null : d
}
const fmtFecha = (s: any) => {
  const d = parseFecha(s)
  return d ? d.toLocaleDateString('es-PE') : (s ? String(s) : '—')
}
const esAntiguo = (s: any) => {
  const d = parseFecha(s)
  if (!d) return false
  return (Date.now() - d.getTime()) / 86400000 > DIAS_INVENTARIO_ANTIGUO
}

const cellKey = (color: string, talla: string) => `${color} ${talla}`

// Una matriz color×talla de UNA condición dentro de una tienda.
interface MatrizCond {
  condicion: string
  colores: string[]           // eje Y
  tallas: string[]            // eje X
  celdas: Map<string, number> // (color,talla) -> cantidad
  total: number
}

interface Tienda {
  id_almacen: any
  almacen: string
  almacen_tipo: string
  fecha_inventario: any
  fecha_ultimo_ingreso: any        // [feat 2026-07-06] fecha del último ingreso de la prenda a esta tienda
  cantidad_ultimo_ingreso: any     // [feat 2026-07-06] cantidad de ese último ingreso
  total: number
  condiciones: MatrizCond[]   // una matriz por condición (Primera, Segunda…)
}

interface Prenda {
  id_producto_CAB: any
  producto: string
  marca: string
  precio: any
  tipo: string
  unidad: string
  total: number
  tiendas: Tienda[]
  coloresAll: Set<string>
  buscable: string
}

/**
 * [ui 2026-07-03] Aplica el filtro de color a una prenda y devuelve la "vista" a pintar.
 * Con color='' devuelve la prenda completa. Con un color, deja solo tiendas/condiciones que lo
 * tienen y, en cada matriz, únicamente la fila de ese color y sus tallas con cantidad.
 */
const construirVista = (p: Prenda, color: string): { tiendas: Tienda[]; total: number } => {
  const tiendas = p.tiendas
    .map((t): Tienda | null => {
      const condiciones = t.condiciones
        .map((m): MatrizCond | null => {
          const colores = color ? (m.colores.includes(color) ? [color] : []) : m.colores
          if (colores.length === 0) return null
          const tallas = color
            ? m.tallas.filter((ta) => colores.some((co) => (m.celdas.get(cellKey(co, ta)) || 0) > 0))
            : m.tallas
          let total = 0
          for (const co of colores) for (const ta of tallas) total += m.celdas.get(cellKey(co, ta)) || 0
          return { ...m, colores, tallas, total }
        })
        .filter((m): m is MatrizCond => m !== null)
      if (condiciones.length === 0) return null
      const total = condiciones.reduce((s, m) => s + m.total, 0)
      return { ...t, condiciones, total }
    })
    .filter((t): t is Tienda => t !== null)
  const total = tiendas.reduce((s, t) => s + t.total, 0)
  return { tiendas, total }
}

export default function TabProductos() {
  const { setOpenloader } = useContext(ModalWindowContext)

  const [rows, setRows] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [colorFiltro, setColorFiltro] = useState('')
  const [page, setPage] = useState(1)
  const [prendasAbiertas, setPrendasAbiertas] = useState<Set<any>>(new Set())
  const [tiendasAbiertas, setTiendasAbiertas] = useState<Set<string>>(new Set())

  useEffect(() => {
    setOpenloader(true)
    Consulta({ url: 'almacen/stockporalmacen' })
      .then((resp) => setRows(Array.isArray(resp) ? resp : []))
      .catch(() => toast.error('Error al cargar el stock de productos', { theme: 'colored' }))
      .finally(() => setOpenloader(false))
  }, [])

  // Agrupa: prenda -> tienda -> condición -> matriz (color, talla) -> cantidad.
  const prendas = useMemo<Prenda[]>(() => {
    const mapa = new Map<any, {
      id_producto_CAB: any; producto: string; marca: string; precio: any; tipo: string; unidad: string; total: number
      tiendasMap: Map<any, {
        id_almacen: any; almacen: string; almacen_tipo: string; fecha_inventario: any
        fecha_ultimo_ingreso: any; cantidad_ultimo_ingreso: any; total: number
        condMap: Map<string, { condicion: string; coloresSet: Set<string>; tallasSet: Set<string>; celdas: Map<string, number>; total: number }>
      }>
    }>()

    for (const r of rows) {
      const pk = r.id_producto_CAB
      let p = mapa.get(pk)
      if (!p) {
        p = { id_producto_CAB: pk, producto: r.producto ?? '', marca: r.marca ?? '', precio: r.precio ?? null, tipo: r.tipo ?? '', unidad: r.unidad ?? '', total: 0, tiendasMap: new Map() }
        mapa.set(pk, p)
      }
      const stock = Number(r.stock) || 0
      p.total += stock

      let t = p.tiendasMap.get(r.id_almacen)
      if (!t) {
        t = { id_almacen: r.id_almacen, almacen: r.almacen ?? '', almacen_tipo: r.almacen_tipo ?? '', fecha_inventario: r.fecha_inventario ?? null, fecha_ultimo_ingreso: null, cantidad_ultimo_ingreso: null, total: 0, condMap: new Map() }
        p.tiendasMap.set(r.id_almacen, t)
      }
      t.total += stock

      // [feat 2026-07-06] Último ingreso de la prenda a la tienda = el más reciente entre sus variantes.
      //   Cada fila trae el último ingreso de SU variante/condición; nos quedamos con el de fecha mayor.
      if (r.fecha_ultimo_ingreso) {
        const fNueva = parseFecha(r.fecha_ultimo_ingreso)
        const fActual = parseFecha(t.fecha_ultimo_ingreso)
        if (fNueva && (!fActual || fNueva.getTime() > fActual.getTime())) {
          t.fecha_ultimo_ingreso = r.fecha_ultimo_ingreso
          t.cantidad_ultimo_ingreso = r.cantidad_ultimo_ingreso ?? null
        }
      }

      const cond = condicionLabel(r.condicion)
      let m = t.condMap.get(cond)
      if (!m) {
        m = { condicion: cond, coloresSet: new Set(), tallasSet: new Set(), celdas: new Map(), total: 0 }
        t.condMap.set(cond, m)
      }
      const color = r.color ?? '-'
      const talla = r.talla ?? '-'
      m.total += stock
      m.coloresSet.add(color)
      m.tallasSet.add(talla)
      const k = cellKey(color, talla)
      m.celdas.set(k, (m.celdas.get(k) || 0) + stock)
    }

    return Array.from(mapa.values()).map((p) => {
      const tiendas: Tienda[] = Array.from(p.tiendasMap.values())
        .map((t) => ({
          id_almacen: t.id_almacen,
          almacen: t.almacen,
          almacen_tipo: t.almacen_tipo,
          fecha_inventario: t.fecha_inventario,
          fecha_ultimo_ingreso: t.fecha_ultimo_ingreso,
          cantidad_ultimo_ingreso: t.cantidad_ultimo_ingreso,
          total: t.total,
          condiciones: Array.from(t.condMap.values())
            .map((m) => ({
              condicion: m.condicion,
              colores: Array.from(m.coloresSet).sort((a, b) => a.localeCompare(b)),
              tallas: Array.from(m.tallasSet).sort(tallaSort),
              celdas: m.celdas,
              total: m.total,
            }))
            .sort((a, b) => condicionSort(a.condicion, b.condicion)),
        }))
        .sort((a, b) => a.almacen.localeCompare(b.almacen))
      const coloresAll = new Set<string>()
      tiendas.forEach((t) => t.condiciones.forEach((m) => m.colores.forEach((c) => coloresAll.add(c))))
      const buscable = `${p.producto} ${p.marca} ${p.tipo} ${tiendas.map((t) => t.almacen).join(' ')} ${Array.from(coloresAll).join(' ')}`.toLowerCase()
      return { id_producto_CAB: p.id_producto_CAB, producto: p.producto, marca: p.marca, precio: p.precio, tipo: p.tipo, unidad: p.unidad, total: p.total, tiendas, coloresAll, buscable }
    })
  }, [rows])

  const coloresDisponibles = useMemo(() => {
    const s = new Set<string>()
    for (const r of rows) if (r.color) s.add(r.color)
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [rows])

  const filtradas = useMemo(() => {
    const q = search.trim().toLowerCase()
    return prendas.filter((p) => {
      if (q && !p.buscable.includes(q)) return false
      if (colorFiltro && !p.coloresAll.has(colorFiltro)) return false
      return true
    })
  }, [prendas, search, colorFiltro])

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE))
  const paginaActual = Math.min(page, totalPaginas)
  const visibles = filtradas.slice((paginaActual - 1) * PAGE_SIZE, paginaActual * PAGE_SIZE)

  const onFiltroTexto = (e: any) => { setSearch(e.target.value); setPage(1) }
  const onFiltroColor = (e: any) => { setColorFiltro(e.target.value); setPage(1) }
  const irAnterior = () => setPage((p) => Math.max(1, p - 1))
  const irSiguiente = () => setPage((p) => Math.min(totalPaginas, p + 1))

  const togglePrenda = (key: any) => {
    setPrendasAbiertas((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }
  const toggleTienda = (key: string) => {
    setTiendasAbiertas((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const desde = filtradas.length === 0 ? 0 : (paginaActual - 1) * PAGE_SIZE + 1
  const hasta = Math.min(paginaActual * PAGE_SIZE, filtradas.length)

  // Render de una matriz color×talla (una condición).
  const renderMatriz = (m: MatrizCond, unidad: string) => (
    <div className="overflow-x-auto">
      <div className="px-2 py-1 text-[11px] font-semibold text-black/60 bg-white flex justify-between">
        <span>Condición: {m.condicion}</span>
        <span>{fmtStock(m.total)} {unidad}</span>
      </div>
      <table className="min-w-full border-collapse text-[11px] [&_td]:p-[5px] [&_th]:p-[5px] [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap [&_tbody_tr:not(:last-child)]:border-b [&_tbody_tr]:border-gray-100">
        <thead className="bg-white text-black/50">
          <tr>
            <th className="text-left font-[600] sticky left-0 bg-white">Color \ Talla</th>
            {m.tallas.map((ta) => (<th key={ta} className="text-right font-[600]">{ta || '-'}</th>))}
            <th className="text-right font-[600] border-l border-gray-200">Total</th>
          </tr>
        </thead>
        <tbody>
          {m.colores.map((co) => {
            const rowTotal = m.tallas.reduce((s, ta) => s + (m.celdas.get(cellKey(co, ta)) || 0), 0)
            return (
              <tr key={co}>
                <td className="text-left font-medium sticky left-0 bg-white">{co || '-'}</td>
                {m.tallas.map((ta) => {
                  const v = m.celdas.get(cellKey(co, ta)) || 0
                  return (
                    <td key={ta} className={`text-right ${v === 0 ? 'text-black/25' : ''}`}>
                      {v === 0 ? '—' : fmtStock(v)}
                    </td>
                  )
                })}
                <td className="text-right font-semibold border-l border-gray-200">{fmtStock(rowTotal)}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot className="bg-gray-50 text-black/60">
          <tr className="border-t border-gray-200">
            <td className="font-[600] sticky left-0 bg-gray-50">Total</td>
            {m.tallas.map((ta) => {
              const colTotal = m.colores.reduce((s, co) => s + (m.celdas.get(cellKey(co, ta)) || 0), 0)
              return <td key={ta} className="text-right font-semibold">{fmtStock(colTotal)}</td>
            })}
            <td className="text-right font-bold border-l border-gray-200">{fmtStock(m.total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Barra de filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <input
          type="text"
          value={search}
          onChange={onFiltroTexto}
          placeholder="Buscar por prenda, marca, tienda o color…"
          className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400 w-[280px]"
        />
        <select
          value={colorFiltro}
          onChange={onFiltroColor}
          className="border border-gray-300 rounded px-2 py-1 text-[12px] outline-none focus:border-blue-400 max-w-[200px] bg-white"
          title="Filtrar por color"
        >
          <option value="">Todos los colores</option>
          {coloresDisponibles.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
        {colorFiltro && (
          <button type="button" onClick={() => { setColorFiltro(''); setPage(1) }} className="text-[12px] text-blue-600 hover:underline">limpiar</button>
        )}
        <span className="text-[12px] text-black/40 ml-auto">{filtradas.length} prenda(s)</span>
      </div>

      <div className="w-full h-[1px] bg-gray-200"></div>

      {/* Tabla paginada con acordeón por prenda */}
      <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll mt-2">
        <div className="flex-1 scrollbar-special overflow-y-scroll">
          <table className="w-[100%] border-collapse [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tbody_tr.fila-prenda]:border-b [&_td]:p-[6px] [&_tbody_tr.fila-prenda:hover]:bg-gray-300 text-[12px]">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="w-[30px]"></th>
                <th className="lg:table-cell">Prenda</th>
                <th className="lg:table-cell">Marca</th>
                <th className="lg:table-cell text-right">Precio venta</th>
                <th className="lg:table-cell text-center">Tiendas</th>
                <th className="lg:table-cell text-right">Stock total</th>
              </tr>
            </thead>
            <tbody>
              {
                visibles.length > 0
                  ? visibles.map((p, key) => {
                    const isOpen = prendasAbiertas.has(p.id_producto_CAB)
                    const vista = construirVista(p, colorFiltro)
                    return (
                      <Fragment key={key}>
                        <tr
                          className={`fila-prenda cursor-pointer ${key % 2 === 0 ? 'bg-gray-100' : ''}`}
                          onClick={() => togglePrenda(p.id_producto_CAB)}
                        >
                          <td className="text-center">
                            <span className={`inline-block transition-transform ${isOpen ? 'rotate-90' : ''}`}>▸</span>
                          </td>
                          <td className="font-bold">{p.producto || '-'}</td>
                          <td>{p.marca || '-'}</td>
                          <td className="text-right">{fmtPrecio(p.precio)}</td>
                          <td className="text-center">{vista.tiendas.length}</td>
                          <td className="text-right font-semibold">{fmtStock(vista.total)} {p.unidad}</td>
                        </tr>
                        {
                          isOpen && (
                            <tr key={`${key}-det`} className="bg-white">
                              <td></td>
                              <td colSpan={5} className="pt-0 pb-2">
                                {/* Nivel 2: acordeón por tienda */}
                                <div className="flex flex-col gap-1">
                                  {vista.tiendas.map((t) => {
                                    const tKey = `${p.id_producto_CAB}::${t.id_almacen}`
                                    const tOpen = tiendasAbiertas.has(tKey)
                                    const antiguo = esAntiguo(t.fecha_inventario)
                                    return (
                                      <div key={tKey} className="rounded border border-gray-200 overflow-hidden">
                                        <button
                                          type="button"
                                          onClick={() => toggleTienda(tKey)}
                                          className="w-full flex items-center justify-between gap-2 px-2 py-[6px] bg-gray-50 hover:bg-gray-100 text-left"
                                        >
                                          <span className="flex items-center gap-2 min-w-0">
                                            <span className={`inline-block transition-transform text-black/50 ${tOpen ? 'rotate-90' : ''}`}>▸</span>
                                            <span className="font-semibold truncate">{t.almacen || '-'}</span>
                                            <span className="text-black/40 shrink-0">{TIPO_ALMACEN_LABEL[t.almacen_tipo] ?? t.almacen_tipo ?? ''}</span>
                                          </span>
                                          <span className="flex items-center gap-3 shrink-0">
                                            {/* [feat 2026-07-06] Último ingreso de la prenda a esta tienda (fecha + cantidad). */}
                                            {t.fecha_ultimo_ingreso && (
                                              <span className="text-black/40" title="Fecha y cantidad del último ingreso de esta prenda a la tienda">
                                                últ. ingr. {fmtFecha(t.fecha_ultimo_ingreso)}
                                                {t.cantidad_ultimo_ingreso != null ? ` (+${fmtStock(Number(t.cantidad_ultimo_ingreso))})` : ''}
                                              </span>
                                            )}
                                            <span
                                              className={antiguo ? 'text-amber-600' : 'text-black/40'}
                                              title={antiguo ? 'Inventario antiguo' : 'Fecha del último inventario'}
                                            >
                                              inv. {fmtFecha(t.fecha_inventario)}{antiguo ? ' ⚠' : ''}
                                            </span>
                                            <span className="font-semibold">{fmtStock(t.total)} {p.unidad}</span>
                                          </span>
                                        </button>
                                        {
                                          tOpen && (
                                            <div className="flex flex-col divide-y divide-gray-200">
                                              {/* Nivel 3: una matriz por condición (Primera / Segunda) */}
                                              {t.condiciones.map((m) => (
                                                <Fragment key={m.condicion}>{renderMatriz(m, p.unidad)}</Fragment>
                                              ))}
                                            </div>
                                          )
                                        }
                                      </div>
                                    )
                                  })}
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </Fragment>
                    )
                  })
                  : <tr className="h-[40px]"><td colSpan={6} className="text-center"><span>Datos no encontrados</span></td></tr>
              }
            </tbody>
            <tfoot className="sticky w-full bottom-0 bg-gray-100">
              <tr className="outline outline-1">
                <td className="h-[45px] border-t border-t-gray-600" colSpan={6}>
                  <div className="flex flex-row justify-between items-center">
                    <div>Mostrando {desde} a {hasta} de {filtradas.length} prenda(s)</div>
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
