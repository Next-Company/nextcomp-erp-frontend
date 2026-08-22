import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { Button } from "../../../components/Atoms/Button/Button"
import { toast } from "react-toastify"

/**
 * [feat 2026-08-14] Pestaña "Movimiento por lector": Ingreso / Traslado / Retiro de stock de prendas
 * ESCANEANDO el EAN-13 de la etiqueta. El EAN se guarda en tbl2_subproductos.sku (775 + 0062 +
 * últimos 5 del idx del subproducto + control), así que la resolución es un match directo por `sku`
 * (GET /almacen/resolvercodigo?sku=). Cada lectura = 1 unidad de esa variante; al confirmar se envía
 * UN POST a /almacen/movimientoprenda con la canasta agrupada y la operación elegida.
 *
 * [feat 2026-08-14] Generalizada de "Ingreso por lector": el código de barras solo identifica la
 * VARIANTE, nunca el almacén, así que los almacenes se fijan por sesión (como el POS fija la tienda):
 *   - Ingreso (INGR): destino.
 *   - Traslado (ENVI): origen + destino (distintos).
 *   - Retiro (RETR): origen.
 * Para ENVI/RETR se muestra y valida el stock DISPONIBLE en el origen (GET /almacen/stockvariante);
 * el backend además valida con FOR UPDATE al confirmar (doble red).
 */

type Operacion = 'INGR' | 'ENVI' | 'RETR'
const OPERACIONES: { id: Operacion; label: string; hint: string }[] = [
  { id: 'INGR', label: 'Ingreso', hint: 'Sumar unidades a un almacén' },
  { id: 'ENVI', label: 'Traslado', hint: 'Mover unidades de un almacén a otro' },
  { id: 'RETR', label: 'Retiro', hint: 'Restar unidades de un almacén' },
]

const TIPO_ALMACEN_LABEL: Record<string, string> = { T: 'Tienda', A: 'Almacén', O: 'Local', C: 'Almacén proceso' }
// Prefijo GS1 de la empresa (país 775 + empresa 0062). Solo se resuelven códigos con este prefijo.
const PREFIJO_EAN = '7750062'

const condLabel = (c: any) => {
  const s = (c ?? '').toString().trim().toLowerCase()
  if (s.startsWith('prim')) return 'Primera'
  if (s.startsWith('seg')) return 'Segunda'
  return (c ?? '').toString() || '—'
}
const condBadgeClass = (label: string) =>
  label === 'Primera' ? 'bg-emerald-500/10 text-emerald-600'
    : label === 'Segunda' ? 'bg-amber-500/10 text-amber-600'
      : 'bg-gray-400/10 text-gray-500'

// Valida un EAN-13 (13 dígitos + dígito de control correcto). Evita procesar lecturas mal leídas.
const eanValido = (code: string): boolean => {
  if (!/^\d{13}$/.test(code)) return false
  const d = code.split('').map(Number)
  let sum = 0
  for (let i = 0; i < 12; i++) sum += d[i] * (i % 2 === 0 ? 1 : 3)
  return (10 - (sum % 10)) % 10 === d[12]
}

interface Linea {
  sku: string
  id_subprod_CAB: number
  id_cabprod: any
  id_color: any
  id_talla: any
  talla: string
  condicion: string
  producto: string
  color: string
  marca: string
  cantidad: number
}

export default function TabIngresoLector() {
  const { setOpenloader } = useContext(ModalWindowContext)

  const [almacenes, setAlmacenes] = useState<any[]>([])
  const [operacion, setOperacion] = useState<Operacion>('INGR')
  const [almOrigen, setAlmOrigen] = useState<any>('')   // ENVI / RETR
  const [almDestino, setAlmDestino] = useState<any>('')  // INGR / ENVI
  const [observaciones, setObservaciones] = useState('')
  const [canasta, setCanasta] = useState<Linea[]>([])
  const [historial, setHistorial] = useState<string[]>([]) // skus en orden de lectura (para deshacer)
  const [disponibles, setDisponibles] = useState<Record<string, number>>({}) // sku -> stock en origen
  const [scan, setScan] = useState('')
  const [estado, setEstado] = useState<{ tipo: 'ok' | 'error' | 'info'; msg: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const cacheRef = useRef<Map<string, any>>(new Map()) // sku -> variante ya resuelta
  const inputRef = useRef<HTMLInputElement>(null)

  const usaOrigen = operacion === 'ENVI' || operacion === 'RETR'
  const usaDestino = operacion === 'INGR' || operacion === 'ENVI'

  // Almacenes para los selects (una sola vez).
  useEffect(() => {
    Consulta({ url: 'almacen/listaralmacenesall' })
      .then((r) => setAlmacenes(Array.isArray(r) ? r : []))
      .catch(() => {})
  }, [])

  const focus = () => inputRef.current?.focus()
  useEffect(() => { focus() }, [])

  // Consulta el stock disponible de una variante en el ORIGEN (para ENVI/RETR).
  const fetchDisponible = (l: Pick<Linea, 'sku' | 'id_cabprod' | 'id_color' | 'id_talla' | 'condicion'>) => {
    if (!almOrigen) return
    const qs = new URLSearchParams({
      prod: String(l.id_cabprod), color: String(l.id_color), talla: String(l.id_talla),
      cond: String(l.condicion), almacen: String(almOrigen),
    })
    Consulta({ url: `almacen/stockvariante?${qs.toString()}` })
      .then((r: any) => setDisponibles((d) => ({ ...d, [l.sku]: Number(r?.stock) || 0 })))
      .catch(() => {})
  }

  // Al cambiar operación u origen, recalcula los disponibles de las líneas actuales.
  useEffect(() => {
    setDisponibles({})
    if (usaOrigen && almOrigen) canasta.forEach((l) => fetchDisponible(l))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operacion, almOrigen])

  // Suma 1 unidad de la variante a la canasta (agrupa por sku) y registra la lectura en el historial.
  const agregar = (v: any, code: string) => {
    setCanasta((prev) => {
      const i = prev.findIndex((l) => l.sku === code)
      if (i >= 0) { const n = [...prev]; n[i] = { ...n[i], cantidad: n[i].cantidad + 1 }; return n }
      return [...prev, {
        sku: code, id_subprod_CAB: v.id_subprod_CAB, id_cabprod: v.id_cabprod, id_color: v.id_color,
        id_talla: v.id_talla, talla: v.talla, condicion: v.condicion, producto: v.producto,
        color: v.color, marca: v.marca, cantidad: 1,
      }]
    })
    setHistorial((h) => [...h, code])
    // Para ENVI/RETR, trae el disponible en origen si aún no lo tenemos.
    if (usaOrigen && almOrigen && disponibles[code] == null) {
      fetchDisponible({ sku: code, id_cabprod: v.id_cabprod, id_color: v.id_color, id_talla: v.id_talla, condicion: v.condicion })
    }
  }

  // Procesa una lectura: valida, resuelve por sku (con caché) y suma a la canasta.
  const procesar = (raw: string) => {
    const code = (raw || '').trim()
    if (!code) return
    if (!code.startsWith(PREFIJO_EAN) || !eanValido(code)) {
      setEstado({ tipo: 'error', msg: `Código inválido o ajeno: ${code}` })
      return
    }
    const cached = cacheRef.current.get(code)
    if (cached) {
      agregar(cached, code)
      setEstado({ tipo: 'ok', msg: `${cached.producto} · ${cached.color || '—'} · T${cached.talla || '—'}` })
      return
    }
    setEstado({ tipo: 'info', msg: `Resolviendo ${code}…` })
    Consulta({ url: `almacen/resolvercodigo?sku=${encodeURIComponent(code)}` })
      .then((r: any) => {
        if (r?.ok && r.variante) {
          cacheRef.current.set(code, r.variante)
          agregar(r.variante, code)
          setEstado({ tipo: 'ok', msg: `${r.variante.producto} · ${r.variante.color || '—'} · T${r.variante.talla || '—'}` })
        } else {
          setEstado({ tipo: 'error', msg: r?.message ? `${r.message}: ${code}` : `No encontrado: ${code}` })
        }
      })
      .catch(() => setEstado({ tipo: 'error', msg: 'Error al resolver el código' }))
  }

  const onScanSubmit = (e: any) => { e.preventDefault(); procesar(scan); setScan(''); focus() }
  // Auto-procesa cuando el lector completa un EAN-13 (13 dígitos) aunque no envíe Enter.
  const onScanChange = (e: any) => {
    const v = e.target.value
    const digits = v.replace(/\D/g, '')
    if (digits.length >= 13) { procesar(digits.slice(0, 13)); setScan(''); return }
    setScan(v)
  }

  const setCantidad = (sku: string, val: number) =>
    setCanasta((prev) => prev.map((l) => (l.sku === sku ? { ...l, cantidad: Math.max(1, val || 1) } : l)))
  const quitar = (sku: string) => setCanasta((prev) => prev.filter((l) => l.sku !== sku))

  // Deshace la ÚLTIMA lectura: resta 1 a la variante escaneada al final (la quita si llega a 0).
  const deshacer = () => {
    if (historial.length === 0) return
    const last = historial[historial.length - 1]
    setHistorial((h) => h.slice(0, -1))
    setCanasta((prev) => prev
      .map((l) => (l.sku === last ? { ...l, cantidad: l.cantidad - 1 } : l))
      .filter((l) => l.cantidad > 0))
    focus()
  }
  const vaciar = () => { setCanasta([]); setHistorial([]); focus() }

  const onOperacion = (op: Operacion) => { setOperacion(op); focus() }

  const totalUnidades = canasta.reduce((s, l) => s + l.cantidad, 0)
  // ¿Alguna línea excede el disponible en origen (ENVI/RETR)?
  const hayExceso = usaOrigen && canasta.some((l) => disponibles[l.sku] != null && l.cantidad > disponibles[l.sku])

  const opLabel = OPERACIONES.find((o) => o.id === operacion)?.label ?? ''

  const validar = (): string | null => {
    if (canasta.length === 0) return 'La canasta está vacía: escanea al menos un producto.'
    if (usaDestino && !almDestino) return 'Selecciona el almacén destino.'
    if (usaOrigen && !almOrigen) return 'Selecciona el almacén origen.'
    if (operacion === 'ENVI' && String(almOrigen) === String(almDestino)) return 'El origen y el destino deben ser distintos.'
    if (hayExceso) return 'Hay líneas que superan el stock disponible en el origen.'
    return null
  }

  const confirmar = () => {
    const err = validar()
    if (err) { toast.warn(err, { theme: 'colored' }); return }
    const payload: any = {
      operacion,
      observaciones: observaciones || null,
      articulos: canasta.map((l) => ({ id_subprod_CAB: l.id_subprod_CAB, cantidad: l.cantidad })),
    }
    if (usaDestino) payload.almacen_destino = almDestino
    if (usaOrigen) payload.almacen_origen = almOrigen

    setSubmitting(true)
    setOpenloader(true)
    Consulta({
      url: 'almacen/movimientoprenda',
      params: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
    })
      .then((r: any) => {
        if (r?.ok) {
          toast.success(r.message ?? `${opLabel} registrado (${totalUnidades} u).`, { theme: 'colored' })
          setCanasta([]); setHistorial([]); setDisponibles({}); setObservaciones(''); focus()
        } else {
          toast.error(r?.message ?? `No se pudo registrar el ${opLabel.toLowerCase()}`, { theme: 'colored' })
        }
      })
      .catch(() => toast.error(`Error al registrar el ${opLabel.toLowerCase()}`, { theme: 'colored' }))
      .finally(() => { setSubmitting(false); setOpenloader(false) })
  }

  // Opciones de destino: para ENVI se excluye el origen.
  const opcionesDestino = almacenes.filter((a) => operacion !== 'ENVI' || String(a.idx) !== String(almOrigen))

  return (
    <div className="flex flex-col flex-1 pl-2 pr-2 h-full">
      {/* Cabecera canónica */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[16px] flex flex-row"><strong>Movimiento por lector</strong></h2>
          <span className="text-[12px] text-black/40">1 lectura = 1 unidad · escribe stock en vivo</span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 shrink-0" />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Selector de operación */}
        <div className="flex gap-1 mt-2 shrink-0 max-w-[420px]">
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
        <div className="text-[11px] text-black/50 mt-1 shrink-0">{OPERACIONES.find((o) => o.id === operacion)?.hint}</div>

        {/* Config de la sesión: almacenes + observaciones */}
        <div className="flex flex-wrap items-end gap-3 mt-2 shrink-0 text-[12px]">
          {usaOrigen && (
            <label className="flex flex-col gap-1">
              <span className="text-black/60">Almacén origen</span>
              <select
                value={almOrigen}
                onChange={(e) => setAlmOrigen(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-[12px] bg-white outline-none focus:border-blue-400 min-w-[220px]"
              >
                <option value="">— seleccionar —</option>
                {almacenes.map((a) => (
                  <option key={a.idx} value={a.idx}>{a.nom} ({TIPO_ALMACEN_LABEL[a.tipo] ?? a.tipo})</option>
                ))}
              </select>
            </label>
          )}
          {usaDestino && (
            <label className="flex flex-col gap-1">
              <span className="text-black/60">Almacén destino</span>
              <select
                value={almDestino}
                onChange={(e) => setAlmDestino(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-[12px] bg-white outline-none focus:border-blue-400 min-w-[220px]"
              >
                <option value="">— seleccionar —</option>
                {opcionesDestino.map((a) => (
                  <option key={a.idx} value={a.idx}>{a.nom} ({TIPO_ALMACEN_LABEL[a.tipo] ?? a.tipo})</option>
                ))}
              </select>
            </label>
          )}
          <label className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <span className="text-black/60">Observaciones (opcional)</span>
            <input
              type="text"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              maxLength={100}
              className="border border-gray-300 rounded px-2 py-1 text-[12px] bg-white outline-none focus:border-blue-400"
            />
          </label>
        </div>

        {/* Campo de escaneo — foco permanente para el lector HID */}
        <form onSubmit={onScanSubmit} className="mt-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-black/50 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7v-1a2 2 0 0 1 2 -2h2"/><path d="M4 17v1a2 2 0 0 0 2 2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v1"/><path d="M16 20h2a2 2 0 0 0 2 -2v-1"/><path d="M5 11h1v2h-1z"/><path d="M10 11l0 2"/><path d="M14 11h1v2h-1z"/><path d="M19 11l0 2"/></svg>
            </span>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              autoFocus
              value={scan}
              onChange={onScanChange}
              placeholder="Escanea el código de barras…  (o teclea el EAN y Enter)"
              className="flex-1 border-2 border-blue-300 rounded-md px-3 py-2 text-[15px] tabular-nums outline-none focus:border-blue-500"
            />
          </div>
          {/* Avisos de almacenes faltantes (no bloquean escanear, sí confirmar). */}
          {usaOrigen && !almOrigen && <div className="mt-1 text-[12px] text-amber-600">⚠ Elige el <b>almacén origen</b>.</div>}
          {usaDestino && !almDestino && <div className="mt-1 text-[12px] text-amber-600">⚠ Elige el <b>almacén destino</b>.</div>}
          {/* Estado de la última lectura */}
          {estado && (
            <div className={`mt-1 text-[12px] ${estado.tipo === 'ok' ? 'text-green-600' : estado.tipo === 'error' ? 'text-red-600' : 'text-black/50'}`}>
              {estado.tipo === 'ok' ? '✓ ' : estado.tipo === 'error' ? '✕ ' : '… '}{estado.msg}
            </div>
          )}
        </form>

        {/* Canasta */}
        <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-special mt-2 border border-gray-200 rounded-md">
          <table className="w-full border-collapse text-[12px] [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_th]:px-[10px] [&_th]:text-left [&_td]:px-[10px] [&_td]:py-2 [&_td]:align-middle [&_tbody_tr]:border-b [&_tbody_tr]:border-gray-100">
            <thead className="sticky top-0 bg-white text-black/50">
              <tr>
                <th>Producto</th><th>Color</th><th>Talla</th><th>Cond.</th><th>SKU</th>
                {usaOrigen && <th className="text-right">Disp. origen</th>}
                <th className="text-center">Cantidad</th><th className="text-center">—</th>
              </tr>
            </thead>
            <tbody>
              {canasta.length === 0
                ? <tr><td colSpan={usaOrigen ? 8 : 7} className="text-center text-black/40 py-10">Aún no hay lecturas. Escanea un código para empezar.</td></tr>
                : canasta.map((l) => {
                  const cond = condLabel(l.condicion)
                  const disp = disponibles[l.sku]
                  const excede = usaOrigen && disp != null && l.cantidad > disp
                  return (
                    <tr key={l.sku} className={`hover:bg-gray-50 ${excede ? 'bg-red-50' : ''}`}>
                      <td className="font-semibold text-gray-800">{l.producto}</td>
                      <td className="text-gray-600">{l.color || '—'}</td>
                      <td className="text-gray-600">{l.talla || '—'}</td>
                      <td><span className={`inline-flex px-2 py-[2px] rounded-l-full rounded-r-full text-[10px] font-semibold ${condBadgeClass(cond)}`}>{cond}</span></td>
                      <td className="text-gray-400 tabular-nums">{l.sku}</td>
                      {usaOrigen && (
                        <td className={`text-right tabular-nums ${excede ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                          {disp == null ? '…' : disp}
                        </td>
                      )}
                      <td>
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setCantidad(l.sku, l.cantidad - 1)} className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-600">−</button>
                          <input
                            type="number" min={1} value={l.cantidad}
                            onChange={(e) => setCantidad(l.sku, parseInt(e.target.value))}
                            className={`w-[52px] text-center border rounded px-1 py-[2px] text-[12px] tabular-nums font-extrabold outline-none ${excede ? 'border-red-400 text-red-600' : 'border-gray-300 focus:border-blue-400'}`}
                          />
                          <button onClick={() => setCantidad(l.sku, l.cantidad + 1)} className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-600">+</button>
                        </div>
                      </td>
                      <td className="text-center">
                        <button onClick={() => quitar(l.sku)} title="Quitar" className="w-7 h-7 rounded-full hover:bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0"/><path d="M10 11l0 6"/><path d="M14 11l0 6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/></svg>
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        {/* Pie: totales + acciones */}
        <div className="flex flex-row justify-between items-center mt-2 shrink-0 text-[12px] gap-2 flex-wrap">
          <span className="text-black/60">
            {canasta.length} variante(s) · <b className="font-extrabold text-gray-800">{totalUnidades}</b> unidad(es)
            {hayExceso && <span className="text-red-600 font-semibold"> · ⚠ supera el stock disponible</span>}
          </span>
          <div className="flex items-center gap-2">
            <Button action={deshacer} tipo={'default'}>Deshacer última</Button>
            <Button action={vaciar} tipo={'default'}>Vaciar</Button>
            <button
              onClick={confirmar}
              disabled={submitting || canasta.length === 0 || hayExceso}
              className="px-3 py-2 text-[13px] rounded-[8px] bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-40 disabled:cursor-default transition-colors"
            >
              {submitting ? 'Registrando…' : `Confirmar ${opLabel.toLowerCase()} (${totalUnidades} u)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
