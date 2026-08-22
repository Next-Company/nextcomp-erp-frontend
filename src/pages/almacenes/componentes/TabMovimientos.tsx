import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { Search } from "../../../components/Atoms/Search/Search"
import { Button } from "../../../components/Atoms/Button/Button"
import { toast } from "react-toastify"

/**
 * [feat 2026-08-07] Pestaña "Movimientos": ESCRITURA de stock de prendas replicando el POS.
 *
 * Fuente = GET /almacen/stockprendalive (stock EN VIVO desde tbl2_almacen_det, la MISMA fuente que
 *   mueve el POS — NO el inventario físico periódico de la pestaña "Productos"). Cada fila cruda es
 *   (variante, almacén): { id_producto_CAB, id_color, id_talla, talla, condicion, producto, codigo,
 *   marca, color, id_almacen, almacen, almacen_tipo, id_subprod_CAB, stock }.
 *
 * Operaciones (POST /almacen/movimientoprenda) — modelo 1 fila = 1 unidad:
 *   - Ingreso (INGR): suma N unidades a un almacén.
 *   - Retiro (RETR): resta N unidades de un almacén (soft-delete, valida stock).
 *   - Traslado (ENVI): mueve N unidades de un almacén a otro.
 *
 * v1: el selector de variante se arma desde el stock en vivo (cubre Retiro/Traslado y el Ingreso de
 *   reposición). El ingreso de una variante que nunca tuvo stock queda para una iteración siguiente.
 */

const TIPO_ALMACEN_LABEL: Record<string, string> = { T: 'Tienda', A: 'Almacén', O: 'Local', C: 'Almacén proceso' }
// [refactor 2026-08-14] Mismo idioma de color por tipo de almacén que Almacenes/Productos (coherencia
//   de módulo): se usa como PUNTO de color junto al nombre del almacén para lectura de un vistazo.
const TIPO_DOT: Record<string, string> = { T: 'bg-blue-500', A: 'bg-purple-500', O: 'bg-orange-500', C: 'bg-gray-500' }
// Píldora suave para la condición (primera/segunda) — refina el color semántico del sistema.
const condBadgeClass = (label: string) =>
  label === 'Primera' ? 'bg-emerald-500/10 text-emerald-600'
    : label === 'Segunda' ? 'bg-amber-500/10 text-amber-600'
      : 'bg-gray-400/10 text-gray-500'

type Operacion = 'INGR' | 'RETR' | 'ENVI'
const OPERACIONES: { id: Operacion; label: string; hint: string }[] = [
  { id: 'INGR', label: 'Ingreso', hint: 'Sumar unidades a un almacén' },
  { id: 'RETR', label: 'Retiro', hint: 'Restar unidades de un almacén' },
  { id: 'ENVI', label: 'Traslado', hint: 'Mover unidades de un almacén a otro' },
]

// Una variante+almacén seleccionable (fila cruda del stock en vivo).
interface FilaLive {
  id_producto_CAB: any
  id_color: any
  id_talla: any
  talla: string
  condicion: string
  producto: string
  codigo: string
  marca: string
  color: string
  id_almacen: any
  almacen: string
  almacen_tipo: string
  id_subprod_CAB: any
  stock: number
}

const condLabel = (c: any) => {
  const s = (c ?? '').toString().trim().toLowerCase()
  if (s.startsWith('prim')) return 'Primera'
  if (s.startsWith('seg')) return 'Segunda'
  return (c ?? '').toString() || '—'
}

export default function TabMovimientos() {
  const { setOpenloader } = useContext(ModalWindowContext)

  // [refactor 2026-08-14] `rows` = filas de la PÁGINA actual (paginación EN SERVIDOR). La búsqueda
  //   también se resuelve en el backend. `size` default 10.
  const [rows, setRows] = useState<FilaLive[]>([])
  const [almacenes, setAlmacenes] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [total, setTotal] = useState(0)
  const reqRef = useRef(0)

  const [operacion, setOperacion] = useState<Operacion>('INGR')
  const [sel, setSel] = useState<FilaLive | null>(null) // variante+almacén seleccionada
  const [almDestino, setAlmDestino] = useState<any>('')  // almacén destino (INGR / ENVI)
  const [cantidad, setCantidad] = useState<string>('1')
  const [observaciones, setObservaciones] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [stockDestino, setStockDestino] = useState<number | null>(null)

  // Almacenes para los selects de destino: se cargan UNA sola vez (lista pequeña, no paginada).
  useEffect(() => {
    Consulta({ url: 'almacen/listaralmacenesall' })
      .then((r) => setAlmacenes(Array.isArray(r) ? r : []))
      .catch(() => {})
  }, [])

  // [refactor 2026-08-14] Pide una PÁGINA del stock en vivo al backend (con búsqueda) y REEMPLAZA las
  //   filas. reqRef descarta respuestas viejas ante tecleo rápido. El total solo llega en la página 1.
  const fetchPagina = (pageN: number, sizeN: number) => {
    const myReq = ++reqRef.current
    setOpenloader(true)
    const qs = new URLSearchParams({ page: String(pageN), size: String(sizeN), search: search.trim() })
    Consulta({ url: `almacen/stockprendalivepaginado?${qs.toString()}` })
      .then((r: any) => {
        if (myReq !== reqRef.current) return
        setRows(Array.isArray(r?.items) ? r.items : [])
        const t = Number(r?.total)
        if (t >= 0) setTotal(t)
      })
      .catch(() => toast.error('Error al cargar el stock en vivo', { theme: 'colored' }))
      .finally(() => { if (myReq === reqRef.current) setOpenloader(false) })
  }

  // Recarga la lista (tras registrar un movimiento y por el botón "Actualizar").
  const cargar = () => fetchPagina(page, size)

  // Carga ante cambios de página, tamaño o búsqueda (cubre la carga inicial).
  useEffect(() => { fetchPagina(page, size) }, [page, size, search])

  // [refactor 2026-08-14] Stock en vivo del almacén DESTINO para la variante seleccionada — CONSULTA
  //   PUNTUAL bajo demanda: con la lista paginada ya no está garantizada en el arreglo cargado.
  useEffect(() => {
    if (!sel || !almDestino) { setStockDestino(null); return }
    let cancel = false
    const qs = new URLSearchParams({
      prod: String(sel.id_producto_CAB), color: String(sel.id_color), talla: String(sel.id_talla),
      cond: String(sel.condicion), almacen: String(almDestino),
    })
    Consulta({ url: `almacen/stockvariante?${qs.toString()}` })
      .then((r: any) => { if (!cancel) setStockDestino(Number(r?.stock) || 0) })
      .catch(() => { if (!cancel) setStockDestino(null) })
    return () => { cancel = true }
  }, [sel, almDestino])

  const seleccionar = (r: FilaLive) => {
    setSel(r)
    setCantidad('1')
    // Por defecto, para INGR el destino es el mismo almacén de la fila; para ENVI se deja vacío.
    setAlmDestino(operacion === 'INGR' ? r.id_almacen : '')
  }

  const onOperacion = (op: Operacion) => {
    setOperacion(op)
    if (sel) setAlmDestino(op === 'INGR' ? sel.id_almacen : '')
  }

  const puedeEnviar = (): string | null => {
    if (!sel) return 'Selecciona una prenda del listado.'
    const n = parseInt(cantidad)
    if (!(n > 0)) return 'La cantidad debe ser mayor a 0.'
    if (operacion === 'RETR' && n > sel.stock) return `No puedes retirar ${n}: solo hay ${sel.stock} en ${sel.almacen}.`
    if (operacion === 'ENVI') {
      if (n > sel.stock) return `No puedes trasladar ${n}: solo hay ${sel.stock} en ${sel.almacen}.`
      if (!almDestino) return 'Selecciona el almacén destino.'
      if (String(almDestino) === String(sel.id_almacen)) return 'El almacén destino debe ser distinto al origen.'
    }
    if (operacion === 'INGR' && !almDestino) return 'Selecciona el almacén destino.'
    return null
  }

  const enviar = () => {
    const err = puedeEnviar()
    if (err) { toast.warn(err, { theme: 'colored' }); return }
    const n = parseInt(cantidad)
    const articulo = {
      id_subprod_CAB: sel!.id_subprod_CAB ?? undefined,
      id_cabprod: sel!.id_producto_CAB,
      id_color: sel!.id_color,
      id_talla: sel!.id_talla,
      talla: sel!.talla,
      condicion: sel!.condicion,
      cantidad: n,
    }
    const payload: any = { operacion, observaciones: observaciones || null, articulos: [articulo] }
    if (operacion === 'INGR') payload.almacen_destino = almDestino
    if (operacion === 'RETR') payload.almacen_origen = sel!.id_almacen
    if (operacion === 'ENVI') { payload.almacen_origen = sel!.id_almacen; payload.almacen_destino = almDestino }

    setSubmitting(true)
    Consulta({
      url: 'almacen/movimientoprenda',
      params: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
    })
      .then((resp: any) => {
        if (resp?.ok) {
          toast.success(resp.message ?? 'Movimiento registrado', { theme: 'colored' })
          setSel(null); setCantidad('1'); setObservaciones('')
          cargar()
        } else {
          toast.error(resp?.message ?? 'No se pudo registrar el movimiento', { theme: 'colored' })
        }
      })
      .catch(() => toast.error('Error al registrar el movimiento', { theme: 'colored' }))
      .finally(() => setSubmitting(false))
  }

  const almacenesDestino = useMemo(
    () => almacenes.filter((a) => (operacion !== 'ENVI') || String(a.idx) !== String(sel?.id_almacen)),
    [almacenes, operacion, sel])

  // [refactor 2026-08-14] Paginación clásica (en unidades de fila variante×almacén, como pagina el
  //   backend). `total` viene del servidor; `rows.length` es lo pintado en esta página.
  const totalPaginas = Math.max(1, Math.ceil(total / size))
  const desde = total === 0 ? 0 : (page - 1) * size + 1
  const hasta = Math.min((page - 1) * size + rows.length, total)
  const onBuscar = (input: any) => { setSearch(input?.value ?? ''); setPage(1) }
  const onSize = (v: number) => { setSize(v); setPage(1) }
  const irAnterior = () => setPage((p) => Math.max(1, p - 1))
  const irSiguiente = () => setPage((p) => Math.min(totalPaginas, p + 1))

  return (
    <div className="flex flex-col flex-1 pl-2 pr-2 h-full">
      {/* Cabecera canónica (mismo layout que las demás pestañas del módulo). */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[16px] flex flex-row"><strong>Movimientos de stock</strong></h2>
          <div className="w-[500px] mb-1 flex justify-end">
            <div className="w-[260px]">
              <Search config={{ width: '250px' }} action={onBuscar} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 shrink-0" />

      {/* Dos paneles: izq = selector de stock en vivo; der = formulario de operación. */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-h-0 overflow-hidden mt-2">

        {/* Izquierda: selector de variante desde el stock en vivo */}
        <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0 overflow-auto scrollbar-special border border-gray-200 rounded-md">
            <table className="w-full border-collapse text-[12px] [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_th]:px-[10px] [&_th]:text-left [&_td]:px-[10px] [&_td]:py-2 [&_td]:align-middle [&_tbody_tr]:border-b [&_tbody_tr]:border-gray-100">
              <thead className="sticky top-0 bg-white text-black/50">
                <tr>
                  <th>Prenda</th><th>Color</th><th>Talla</th><th>Cond.</th><th>Almacén</th><th className="text-right">Stock</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0
                  ? <tr><td colSpan={6} className="text-center text-black/40 py-8">Sin stock en vivo</td></tr>
                  : rows.map((r, i) => {
                    const activo = sel &&
                      String(r.id_producto_CAB) === String(sel.id_producto_CAB) &&
                      String(r.id_color) === String(sel.id_color) &&
                      String(r.id_talla) === String(sel.id_talla) &&
                      String(r.condicion) === String(sel.condicion) &&
                      String(r.id_almacen) === String(sel.id_almacen)
                    const cond = condLabel(r.condicion)
                    return (
                      <tr
                        key={i}
                        onClick={() => seleccionar(r)}
                        className={`cursor-pointer transition-colors ${activo ? 'bg-blue-100 hover:bg-blue-100' : i % 2 === 0 ? 'bg-gray-50 hover:bg-blue-50' : 'hover:bg-blue-50'}`}
                      >
                        <td className="font-semibold text-gray-800">{r.producto}</td>
                        <td className="text-gray-600">{r.color || '—'}</td>
                        <td className="text-gray-600">{r.talla || '—'}</td>
                        <td>
                          <span className={`inline-flex px-2 py-[2px] rounded-l-full rounded-r-full text-[10px] font-semibold ${condBadgeClass(cond)}`}>{cond}</span>
                        </td>
                        <td>
                          <span className="inline-flex items-center gap-1.5">
                            <span className={`w-[6px] h-[6px] rounded-full shrink-0 ${TIPO_DOT[r.almacen_tipo] ?? 'bg-gray-400'}`}></span>
                            <span className="text-gray-700">{r.almacen}</span>
                          </span>
                        </td>
                        <td className={`text-right tabular-nums ${r.stock > 0 ? 'font-extrabold text-gray-800' : 'text-gray-300'}`}>{r.stock}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          {/* Pie del panel izquierdo: PAGINACIÓN CLÁSICA (servida por backend) + Actualizar. */}
          <div className="flex flex-row justify-between items-center mt-2 shrink-0 text-[12px] gap-2 flex-wrap">
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
              <span className="text-black/50">{desde}–{hasta} de {total}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button action={cargar} tipo={'default'}>Actualizar</Button>
              <span className="text-black/50">Pág. {page}/{totalPaginas}</span>
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
        </div>

      {/* Derecha: panel de operación */}
      <div className="lg:w-[360px] shrink-0 border border-gray-200 rounded p-3 flex flex-col gap-3 bg-gray-50 overflow-auto">
        {/* Selector de operación */}
        <div className="flex gap-1">
          {OPERACIONES.map((op) => (
            <button
              key={op.id}
              onClick={() => onOperacion(op.id)}
              title={op.hint}
              className={`flex-1 px-2 py-[6px] text-[12px] rounded border transition-colors ${
                operacion === op.id ? 'bg-blue-500 text-white border-blue-500 font-semibold' : 'bg-white text-black/60 border-gray-300 hover:border-blue-300'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
        <div className="text-[11px] text-black/50 -mt-1">{OPERACIONES.find((o) => o.id === operacion)?.hint}</div>

        {/* Variante seleccionada */}
        {!sel ? (
          <div className="text-[12px] text-black/40 border border-dashed border-gray-300 rounded p-3 text-center">
            Selecciona una prenda del listado de la izquierda.
          </div>
        ) : (
          <div className="text-[12px] bg-white border border-gray-200 rounded p-2">
            <div className="font-semibold">{sel.producto}</div>
            <div className="text-black/60">{sel.color || '—'} · Talla {sel.talla || '—'} · {condLabel(sel.condicion)}</div>
            <div className="mt-1 flex justify-between">
              <span className="text-black/50">{operacion === 'INGR' ? 'Almacén de la fila' : 'Origen'}: <b>{sel.almacen}</b> <span className="text-black/40">({TIPO_ALMACEN_LABEL[sel.almacen_tipo] ?? sel.almacen_tipo})</span></span>
              <span className="text-black/50">stock: <b>{sel.stock}</b></span>
            </div>
          </div>
        )}

        {/* Almacén destino (INGR / ENVI) */}
        {sel && (operacion === 'INGR' || operacion === 'ENVI') && (
          <label className="text-[12px] flex flex-col gap-1">
            <span className="text-black/60">{operacion === 'ENVI' ? 'Almacén destino' : 'Almacén destino del ingreso'}</span>
            <select
              value={almDestino}
              onChange={(e) => setAlmDestino(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-[12px] bg-white outline-none focus:border-blue-400"
            >
              <option value="">— seleccionar —</option>
              {almacenesDestino.map((a) => (
                <option key={a.idx} value={a.idx}>{a.nom} ({TIPO_ALMACEN_LABEL[a.tipo] ?? a.tipo})</option>
              ))}
            </select>
            {(operacion === 'INGR' || operacion === 'ENVI') && almDestino && stockDestino != null && (
              <span className="text-[11px] text-black/45">Stock actual en destino: <b>{stockDestino}</b> → quedará <b>{operacion === 'INGR' || operacion === 'ENVI' ? stockDestino + (parseInt(cantidad) || 0) : stockDestino}</b></span>
            )}
          </label>
        )}

        {/* Cantidad */}
        {sel && (
          <label className="text-[12px] flex flex-col gap-1">
            <span className="text-black/60">Cantidad de unidades</span>
            <input
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white outline-none focus:border-blue-400"
            />
            {(operacion === 'RETR' || operacion === 'ENVI') && (
              <span className="text-[11px] text-black/45">Origen quedará en <b>{Math.max(0, sel.stock - (parseInt(cantidad) || 0))}</b></span>
            )}
          </label>
        )}

        {/* Observaciones */}
        {sel && (
          <label className="text-[12px] flex flex-col gap-1">
            <span className="text-black/60">Observaciones (opcional)</span>
            <input
              type="text"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              maxLength={100}
              className="border border-gray-300 rounded px-2 py-1 text-[12px] bg-white outline-none focus:border-blue-400"
            />
          </label>
        )}

        {/* Enviar */}
        <button
          onClick={enviar}
          disabled={submitting || !sel}
          className="mt-1 px-3 py-2 text-[13px] rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-default transition-colors"
        >
          {submitting ? 'Registrando…' : `Registrar ${OPERACIONES.find((o) => o.id === operacion)?.label.toLowerCase()}`}
        </button>
      </div>
      </div>{/* /dos paneles */}
    </div>
  )
}
