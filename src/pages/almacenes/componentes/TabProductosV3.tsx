import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { Search } from "../../../components/Atoms/Search/Search"
import { Button } from "../../../components/Atoms/Button/Button"
import { toast } from "react-toastify"

/**
 * [feat 2026-08-08] Pestaña "Productos" — drill-down de 3 niveles (master-detail):
 *   1) Lista de PRODUCTOS (compacta). Colapsada muestra un preview de las tiendas donde hay stock.
 *   2) Al desplegar un producto → lista de TIENDAS en vertical, cada una con su TOTAL.
 *   3) Al desplegar una tienda → matriz COLORES (filas) × TALLAS (columnas) con las cantidades.
 *      Si la tienda tiene varias condiciones (primera/segunda/caído), se muestra una matriz por condición.
 *
 * Fuente = GET /almacen/stockprendamatriz (stock EN VIVO desde tbl2_almacen_det). Agrupado y filtrado
 * en cliente. Solo lectura.
 */

const TIPO_ALMACEN_ABBR: Record<string, string> = { T: 'Tienda', A: 'Almacén', O: 'Local', C: 'Proceso' }
// [refactor 2026-08-14] Mismo idioma de badges por tipo que la pestaña "Almacenes" (coherencia de
//   módulo): categórico = píldora rellena de color. Familias de color alineadas a `colorfase`.
const TIPO_BADGE: Record<string, string> = {
  T: 'bg-blue-500',    // Tienda
  A: 'bg-purple-500',  // Almacén
  O: 'bg-orange-500',  // Local
  C: 'bg-gray-500',    // Proceso
}
const MAX_PREVIEW = 8

const condicionLabel = (c: any): string => {
  const s = (c ?? '').toString().trim().toLowerCase()
  if (!s) return 'Sin condición'
  if (s.startsWith('prim') || s === '1') return 'Primera'
  if (s.startsWith('seg') || s === '2') return 'Segunda'
  return c.toString()
}
const CONDICION_ORDER: Record<string, number> = { 'Primera': 0, 'Segunda': 1, 'Sin condición': 9 }

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
const ck = (color: string, talla: string) => `${color}|||${talla}`

interface CondMatriz { condicion: string; colores: string[]; tallas: string[]; celdas: Map<string, number>; total: number }
interface Tienda { id: any; nom: string; tipo: string; total: number; condiciones: CondMatriz[] }
interface Producto {
  id: any; producto: string; marca: string; precio: any; total: number
  tiendas: Tienda[]
  buscable: string
}

type OrdenId = 'stock' | 'nombre'

export default function TabProductosV3() {
  const { setOpenloader } = useContext(ModalWindowContext)
  const [rows, setRows] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [orden, setOrden] = useState<OrdenId>('stock')
  const [prodAbiertos, setProdAbiertos] = useState<Set<any>>(new Set())
  const [tiendasAbiertas, setTiendasAbiertas] = useState<Set<string>>(new Set())
  // [refactor 2026-08-14] Paginación CLÁSICA en servidor: página actual, tamaño de página (default 10)
  //   y total de productos (del backend). `rows` contiene SOLO el detalle de la página actual (se
  //   REEMPLAZA en cada carga, no se acumula). reqRef descarta respuestas viejas ante tecleo rápido.
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [total, setTotal] = useState(0)
  const reqRef = useRef(0)

  // Pide la página (pageN, sizeN) al backend con los filtros actuales y REEMPLAZA el detalle.
  const fetchPagina = (pageN: number, sizeN: number) => {
    const myReq = ++reqRef.current
    setOpenloader(true)
    const qs = new URLSearchParams({ page: String(pageN), size: String(sizeN), search: search.trim(), orden })
    Consulta({ url: `almacen/stockprendapaginado?${qs.toString()}` })
      .then((r: any) => {
        if (myReq !== reqRef.current) return // llegó una respuesta más nueva; ignorar esta
        setRows(Array.isArray(r?.items) ? r.items : [])
        // El backend solo manda el total en la página 1 (en las demás viene -1 = "sin cambios");
        //   se conserva el que ya se tenía al navegar entre páginas.
        const t = Number(r?.total)
        if (t >= 0) setTotal(t)
      })
      .catch(() => toast.error('Error al cargar el stock', { theme: 'colored' }))
      .finally(() => { if (myReq === reqRef.current) setOpenloader(false) })
  }

  // Botón "Actualizar": recarga la página actual con los filtros actuales.
  const cargar = () => fetchPagina(page, size)

  // Carga cada vez que cambia la página, el tamaño, la búsqueda o el orden. Los cambios de
  //   búsqueda/orden/tamaño reinician a la página 1 desde sus handlers, así que aquí solo se dispara
  //   la consulta. (Cubre también la carga inicial.)
  useEffect(() => { fetchPagina(page, size) }, [page, size, search, orden])

  // Agrupa: producto -> tienda -> condición -> matriz (color, talla) -> cantidad.
  const productos = useMemo<Producto[]>(() => {
    const mapa = new Map<any, {
      id: any; producto: string; marca: string; precio: any; total: number
      tiendasMap: Map<any, {
        id: any; nom: string; tipo: string; total: number
        condMap: Map<string, { coloresSet: Set<string>; tallasSet: Set<string>; celdas: Map<string, number>; total: number }>
      }>
    }>()

    for (const r of rows) {
      const pk = r.id_producto_CAB
      let p = mapa.get(pk)
      if (!p) {
        p = { id: pk, producto: r.producto ?? '', marca: r.marca ?? '', precio: r.precio ?? null, total: 0, tiendasMap: new Map() }
        mapa.set(pk, p)
      }
      const stock = Number(r.stock) || 0
      p.total += stock

      let t = p.tiendasMap.get(r.id_almacen)
      if (!t) { t = { id: r.id_almacen, nom: r.almacen ?? '', tipo: r.almacen_tipo ?? '', total: 0, condMap: new Map() }; p.tiendasMap.set(r.id_almacen, t) }
      t.total += stock

      const cond = condicionLabel(r.condicion)
      let c = t.condMap.get(cond)
      if (!c) { c = { coloresSet: new Set(), tallasSet: new Set(), celdas: new Map(), total: 0 }; t.condMap.set(cond, c) }
      const color = r.color || '—', talla = r.talla || '—'
      c.total += stock
      c.coloresSet.add(color); c.tallasSet.add(talla)
      const k = ck(color, talla)
      c.celdas.set(k, (c.celdas.get(k) || 0) + stock)
    }

    return Array.from(mapa.values()).map((p) => {
      const tiendas: Tienda[] = Array.from(p.tiendasMap.values())
        .map((t) => ({
          id: t.id, nom: t.nom, tipo: t.tipo, total: t.total,
          condiciones: Array.from(t.condMap.entries())
            .map(([cond, c]) => ({
              condicion: cond,
              colores: Array.from(c.coloresSet).sort((a, b) => a.localeCompare(b)),
              tallas: Array.from(c.tallasSet).sort(tallaSort),
              celdas: c.celdas,
              total: c.total,
            }))
            .sort((a, b) => (CONDICION_ORDER[a.condicion] ?? 5) - (CONDICION_ORDER[b.condicion] ?? 5) || a.condicion.localeCompare(b.condicion)),
        }))
        .sort((a, b) => b.total - a.total || a.nom.localeCompare(b.nom))
      const buscable = `${p.producto} ${p.marca} ${tiendas.map((t) => t.nom).join(' ')}`.toLowerCase()
      return { id: p.id, producto: p.producto, marca: p.marca, precio: p.precio, total: p.total, tiendas, buscable }
    })
  }, [rows])

  // [refactor 2026-08-14] Con paginación en servidor NO se filtra en cliente (el backend ya aplicó la
  //   búsqueda). Solo se ORDENA la página acumulada con el mismo criterio con que el servidor eligió
  //   las páginas, para que el orden global se mantenga consistente entre lotes.
  const filtradas = useMemo(() => {
    const arr = productos.slice()
    arr.sort(orden === 'stock' ? (a, b) => b.total - a.total || a.producto.localeCompare(b.producto)
      : (a, b) => a.producto.localeCompare(b.producto))
    return arr
  }, [productos, orden])

  // [refactor 2026-08-14] Cálculos de paginación clásica (en unidades de PRODUCTO, que es como pagina
  //   el backend). `total` viene del servidor; `filtradas.length` es lo pintado en esta página.
  const totalPaginas = Math.max(1, Math.ceil(total / size))
  const desde = total === 0 ? 0 : (page - 1) * size + 1
  const hasta = Math.min((page - 1) * size + filtradas.length, total)

  // Handlers de filtros: cualquier cambio reinicia a la página 1 (el efecto de carga hace el resto).
  const onBuscar = (input: any) => { setSearch(input?.value ?? ''); setPage(1) }
  const onOrden = (value: OrdenId) => { setOrden(value); setPage(1) }
  const onSize = (value: number) => { setSize(value); setPage(1) }
  const irAnterior = () => setPage((p) => Math.max(1, p - 1))
  const irSiguiente = () => setPage((p) => Math.min(totalPaginas, p + 1))

  const toggleProd = (id: any) => setProdAbiertos((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleTienda = (key: string) => setTiendasAbiertas((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n })

  // Nivel 3: matriz colores (filas) × tallas (columnas) de UNA condición dentro de una tienda.
  const renderMatriz = (m: CondMatriz, mostrarCond: boolean) => (
    <div className="overflow-x-auto">
      {mostrarCond && (
        <div className="px-2 py-1 text-[10px] font-semibold text-black/50 bg-white flex justify-between">
          <span>Condición: {m.condicion}</span><span>{fmtStock(m.total)} u</span>
        </div>
      )}
      <table className="min-w-full border-collapse text-[11px] [&_td]:p-[5px] [&_th]:p-[5px] [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap">
        <thead className="bg-white text-black/50">
          <tr className="border-b border-gray-200">
            <th className="text-left font-[600] sticky left-0 bg-white z-10 min-w-[130px]">Color \ Talla</th>
            {m.tallas.map((ta) => <th key={ta} className="text-right font-[600] min-w-[52px]">{ta}</th>)}
            <th className="text-right font-[700] border-l border-gray-200 bg-gray-50 min-w-[52px]">Total</th>
          </tr>
        </thead>
        <tbody>
          {m.colores.map((co, i) => {
            const rowTotal = m.tallas.reduce((s, ta) => s + (m.celdas.get(ck(co, ta)) || 0), 0)
            return (
              <tr key={co} className={`border-b border-gray-100 ${i % 2 ? 'bg-gray-50/40' : ''}`}>
                <td className="text-left font-medium sticky left-0 bg-inherit z-10">{co}</td>
                {m.tallas.map((ta) => {
                  const v = m.celdas.get(ck(co, ta)) || 0
                  return <td key={ta} className={`text-right tabular-nums ${v === 0 ? 'text-black/20' : ''}`}>{v === 0 ? '—' : fmtStock(v)}</td>
                })}
                <td className="text-right font-semibold tabular-nums border-l border-gray-200 bg-gray-50">{fmtStock(rowTotal)}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot className="bg-gray-100 text-black/70">
          <tr className="border-t border-gray-300">
            <td className="font-[700] sticky left-0 bg-gray-100 z-10">TOTAL</td>
            {m.tallas.map((ta) => {
              const colTotal = m.colores.reduce((s, co) => s + (m.celdas.get(ck(co, ta)) || 0), 0)
              return <td key={ta} className="text-right font-semibold tabular-nums">{fmtStock(colTotal)}</td>
            })}
            <td className="text-right font-bold tabular-nums border-l border-gray-300">{fmtStock(m.total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 pl-2 pr-2 h-full">
      {/* Cabecera: título + búsqueda (mismo layout que Órdenes de servicio / Almacenes). */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[16px] flex flex-row"><strong>Stock de productos</strong></h2>
          <div className="w-[500px] mb-1 flex justify-end">
            <div className="w-[260px]">
              <Search config={{ width: '250px' }} action={onBuscar} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200 shrink-0" />

      {/* [fix 2026-08-14] Envoltura de altura ACOTADA (patrón probado de guías/Almacenes): un único
          contenedor flex-1 overflow-hidden dentro del cual la lista es la ÚNICA zona con scroll. Sin
          esta envoltura, los paneles desplegados crecían sin límite y se solapaban con la paginación
          en vez de correrse hacia abajo y hacer scroll. */}
      <div className="flex flex-col flex-1 overflow-hidden">

      {/* Barra compacta: orden + contador (stock en vivo). */}
      <div className="flex items-center gap-2 mt-2 mb-1 shrink-0 text-[12px]">
        <label className="text-black/50 flex items-center gap-1">
          Ordenar:
          <select
            value={orden}
            onChange={(e) => onOrden(e.target.value as OrdenId)}
            className="border border-gray-300 rounded-full px-3 py-[5px] text-[12px] bg-gray-200 outline-none focus:bg-white focus:shadow-md transition-all"
          >
            <option value="stock">Mayor stock</option>
            <option value="nombre">Nombre (A–Z)</option>
          </select>
        </label>
        <span className="text-black/40 ml-auto">{total} prenda(s) · stock en vivo</span>
      </div>

      {/* Nivel 1: lista de productos de la PÁGINA actual (paginación clásica en servidor). El scroll
          vertical vive solo en este contenedor por si la página no entra completa. */}
      <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-special mt-2 flex flex-col gap-1.5 pb-3">
        {filtradas.length === 0 ? (
          <div className="text-center text-black/40 py-8">Sin stock en vivo</div>
        ) : filtradas.map((p) => {
          const abierto = prodAbiertos.has(p.id)
          const preview = p.tiendas.slice(0, MAX_PREVIEW)
          const restantes = p.tiendas.length - preview.length
          return (
            <div key={p.id} className="shrink-0 border border-gray-200 rounded-md overflow-hidden">
              {/* Fila producto */}
              <button type="button" onClick={() => toggleProd(p.id)} className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className={`inline-block transition-transform text-black/40 ${abierto ? 'rotate-90' : ''}`}>▸</span>
                    <span className="font-semibold text-[13px] truncate">{p.producto || '—'}</span>
                    {p.marca && <span className="text-[11px] text-black/40 shrink-0">{p.marca}</span>}
                  </div>
                  <div className="flex items-baseline gap-3 shrink-0 text-[12px]">
                    <span className="text-black/40">{fmtPrecio(p.precio)}</span>
                    <span className="text-black/45">{p.tiendas.length} tienda(s)</span>
                    <span className="font-extrabold text-gray-800">{fmtStock(p.total)} u</span>
                  </div>
                </div>
                {/* Preview de tiendas (solo colapsado). Punto de color = tipo de almacén (mismo idioma). */}
                {!abierto && (
                  <div className="flex flex-wrap gap-1 mt-1.5 pl-5">
                    {preview.map((t) => (
                      <span key={t.id} className="inline-flex items-center gap-1 text-[11px] bg-gray-100 text-black/70 rounded px-1.5 py-[1px]" title={TIPO_ALMACEN_ABBR[t.tipo] ?? t.tipo}>
                        <span className={`w-[6px] h-[6px] rounded-full shrink-0 ${TIPO_BADGE[t.tipo] ?? 'bg-gray-400'}`}></span>
                        <span className="truncate max-w-[150px]">{t.nom}</span>
                        <span className="font-bold text-black/90 tabular-nums">{fmtStock(t.total)}</span>
                      </span>
                    ))}
                    {restantes > 0 && <span className="text-[11px] text-black/40 px-1 py-[1px]">+{restantes} más</span>}
                  </div>
                )}
              </button>

              {/* Nivel 2: lista de tiendas (al desplegar el producto) */}
              {abierto && (
                <div className="border-t border-gray-200 flex flex-col divide-y divide-gray-100 bg-white">
                  {p.tiendas.map((t) => {
                    const tKey = `${p.id}|${t.id}`
                    const tAbierta = tiendasAbiertas.has(tKey)
                    const variasCond = t.condiciones.length > 1
                    return (
                      <div key={t.id}>
                        <button type="button" onClick={() => toggleTienda(tKey)} className="w-full flex items-center justify-between gap-2 px-3 py-[7px] pl-6 hover:bg-gray-50 text-left transition-colors">
                          <span className="flex items-center gap-2 min-w-0">
                            <span className={`inline-block transition-transform text-black/40 ${tAbierta ? 'rotate-90' : ''}`}>▸</span>
                            <span className="font-medium text-[12px] truncate">{t.nom || '—'}</span>
                            <span className={`shrink-0 text-white text-[8px] font-semibold uppercase tracking-wide px-1.5 py-[1px] rounded-l-full rounded-r-full ${TIPO_BADGE[t.tipo] ?? 'bg-gray-400'}`}>{TIPO_ALMACEN_ABBR[t.tipo] ?? t.tipo}</span>
                          </span>
                          <span className="font-extrabold text-[12px] text-gray-800 shrink-0 tabular-nums">{fmtStock(t.total)} u</span>
                        </button>
                        {/* Nivel 3: matriz colores × tallas (al desplegar la tienda) */}
                        {tAbierta && (
                          <div className="pl-6 pr-2 pb-2 flex flex-col divide-y divide-gray-200">
                            {t.condiciones.map((m) => <div key={m.condicion}>{renderMatriz(m, variasCond)}</div>)}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* [refactor 2026-08-14] Pie con PAGINACIÓN CLÁSICA (servida por el backend): selector de
          cantidad por página + rango mostrado + controles de página. */}
      <div className="flex flex-row justify-between items-center h-[48px] shrink-0 border-t border-gray-300 bg-gray-100 px-2 text-[12px] gap-2">
        <div className="flex items-center gap-2">
          <label className="text-black/50 flex items-center gap-1">
            Mostrar:
            <select
              value={size}
              onChange={(e) => onSize(Number(e.target.value))}
              className="border border-gray-300 rounded-full px-2 py-[4px] text-[12px] bg-white outline-none focus:shadow-md transition-all"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
          <span className="text-black/60">Mostrando {desde}–{hasta} de {total} prenda(s)</span>
        </div>
        <div className="flex items-center gap-2">
          <Button action={cargar} tipo={'default'}>Actualizar</Button>
          <span className="text-black/50">Página {page} de {totalPaginas}</span>
          <button onClick={irAnterior} disabled={page <= 1}
            className="w-[30px] h-[30px] rounded-full hover:bg-gray-300 flex justify-center items-center disabled:opacity-30 disabled:cursor-default transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
          </button>
          <button onClick={irSiguiente} disabled={page >= totalPaginas}
            className="w-[30px] h-[30px] rounded-full hover:bg-gray-300 flex justify-center items-center disabled:opacity-30 disabled:cursor-default transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
          </button>
        </div>
      </div>
      </div>{/* /envoltura de altura acotada */}
    </div>
  )
}
