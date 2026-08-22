import { useContext, useMemo, useState } from "react"
import { Consulta } from "../../../utils/utils"
import { ModalWindowContext } from "../../../components/ModalWindow/ModalWindowContext"
import { Button } from "../../../components/Atoms/Button/Button"
import { toast } from "react-toastify"

/**
 * [feat 2026-08-14] Pestaña "Cargar a acabados" (A2): materializa el FRACCIONAMIENTO de una orden como
 * STOCK INICIAL en el almacén ACABADOS. Flujo: fraccionamiento → (esto) → ACABADOS → traslado manual a
 * APT/fiscal (pestaña "Movimiento por lector").
 *
 * Fuente = cantidades fraccionadas (`tbl2_fases_prod_modelos_fracciones.cantidad`, lado modelos, color
 * por FK). Preview: GET /almacen/fraccionamientoacabados/:idorden. Ejecución: POST
 * /almacen/cargarfraccionamiento/:idorden (INGR a ACABADOS, idempotente por orden). Solo hacia adelante.
 */

interface ItemFracc {
  id_cabprod: any
  id_color: any
  color: string
  id_talla: any
  talla: string
  cantidad: number
  id_subprod_CAB: number | null
  sku: string | null
  en_acabados: number
}
interface Preview {
  ok: boolean
  orden?: { idx: any; oc: string; producto: string; fraccionado: any } | null
  almacen_acabados?: any
  yaCargado?: boolean
  items?: ItemFracc[]
  message?: string
}

export default function TabCargarAcabados() {
  const { setOpenloader } = useContext(ModalWindowContext)
  const [orden, setOrden] = useState('')
  const [data, setData] = useState<Preview | null>(null)
  const [cargando, setCargando] = useState(false)

  const buscar = (e?: any) => {
    if (e) e.preventDefault()
    const id = parseInt(orden)
    if (!(id > 0)) { toast.warn('Ingresa un N° de orden válido.', { theme: 'colored' }); return }
    setOpenloader(true)
    Consulta({ url: `almacen/fraccionamientoacabados/${id}` })
      .then((r: any) => setData(r))
      .catch(() => { setData(null); toast.error('Error al leer el fraccionamiento', { theme: 'colored' }) })
      .finally(() => setOpenloader(false))
  }

  const cargar = () => {
    const id = parseInt(orden)
    if (!(id > 0)) return
    setCargando(true)
    setOpenloader(true)
    Consulta({ url: `almacen/cargarfraccionamiento/${id}`, params: { method: 'POST' } })
      .then((r: any) => {
        if (r?.ok) {
          toast.success(r.message ?? 'Fraccionamiento cargado a acabados.', { theme: 'colored' })
          buscar() // refresca el preview (ahora yaCargado)
        } else {
          toast.error(r?.message ?? 'No se pudo cargar a acabados', { theme: 'colored' })
        }
      })
      .catch(() => toast.error('Error al cargar a acabados', { theme: 'colored' }))
      .finally(() => { setCargando(false); setOpenloader(false) })
  }

  const items = data?.items ?? []
  const totalUnidades = useMemo(() => items.reduce((s, it) => s + (Number(it.cantidad) || 0), 0), [items])
  const sinAlmacen = data?.ok && !data?.almacen_acabados
  const sinSku = items.some((it) => !it.id_subprod_CAB)

  return (
    <div className="flex flex-col flex-1 pl-2 pr-2 h-full">
      {/* Cabecera */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[16px] flex flex-row"><strong>Cargar a acabados</strong></h2>
          <span className="text-[12px] text-black/40">fraccionamiento → stock inicial en ACABADOS</span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 shrink-0" />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Buscador de orden */}
        <form onSubmit={buscar} className="flex items-end gap-2 mt-2 shrink-0 text-[12px]">
          <label className="flex flex-col gap-1">
            <span className="text-black/60">N° de orden</span>
            <input
              type="number"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              placeholder="Ej: 533"
              className="border border-gray-300 rounded px-2 py-1 text-[13px] bg-white outline-none focus:border-blue-400 w-[160px]"
            />
          </label>
          <Button action={buscar} tipo={'default'}>Buscar</Button>
        </form>

        {/* Info de la orden + avisos */}
        {data && !data.ok && (
          <div className="mt-3 text-[12px] text-red-600">{data.message ?? 'No se pudo leer la orden.'}</div>
        )}
        {data?.ok && data.orden && (
          <div className="mt-3 shrink-0 text-[12px] flex flex-wrap items-center gap-3">
            <span>Orden <b>#{data.orden.idx}</b> · OC <b>{data.orden.oc || '—'}</b> · <b>{data.orden.producto || '—'}</b></span>
            {data.yaCargado
              ? <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-l-full rounded-r-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600">✓ Ya cargada a acabados</span>
              : <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-l-full rounded-r-full text-[11px] font-semibold bg-amber-500/10 text-amber-600">Pendiente de cargar</span>}
          </div>
        )}
        {sinAlmacen && <div className="mt-2 text-[12px] text-red-600">⚠ No existe un almacén llamado ACABADOS en el sistema.</div>}
        {data?.ok && items.length > 0 && sinSku && (
          <div className="mt-2 text-[12px] text-amber-600">⚠ Algunas variantes no tienen subproducto/sku — se cargarán igual por sus claves (producto/color/talla).</div>
        )}

        {/* Tabla del fraccionamiento */}
        <div className="flex-1 min-h-0 overflow-y-scroll scrollbar-special mt-2 border border-gray-200 rounded-md">
          <table className="w-full border-collapse text-[12px] [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_th]:px-[10px] [&_th]:text-left [&_td]:px-[10px] [&_td]:py-2 [&_td]:align-middle [&_tbody_tr]:border-b [&_tbody_tr]:border-gray-100">
            <thead className="sticky top-0 bg-white text-black/50">
              <tr>
                <th>Color</th><th>Talla</th><th>SKU</th>
                <th className="text-right">A cargar</th><th className="text-right">Ya en acabados</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0
                ? <tr><td colSpan={5} className="text-center text-black/40 py-10">{data ? 'Sin cantidades fraccionadas para esta orden.' : 'Busca una orden para ver su fraccionamiento.'}</td></tr>
                : items.map((it, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="font-semibold text-gray-800">{it.color || '—'}</td>
                    <td className="text-gray-600 uppercase">{it.talla || '—'}</td>
                    <td className="text-gray-400 tabular-nums">{it.sku || <span className="text-amber-600">sin sku</span>}</td>
                    <td className="text-right tabular-nums font-extrabold text-gray-800">{it.cantidad}</td>
                    <td className="text-right tabular-nums text-gray-500">{it.en_acabados}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pie: total + acción */}
        <div className="flex flex-row justify-between items-center mt-2 shrink-0 text-[12px] gap-2 flex-wrap">
          <span className="text-black/60">
            {items.length} variante(s) · <b className="font-extrabold text-gray-800">{totalUnidades}</b> unidad(es) a cargar
          </span>
          <button
            onClick={cargar}
            disabled={cargando || !data?.ok || items.length === 0 || data?.yaCargado || sinAlmacen}
            className="px-3 py-2 text-[13px] rounded-[8px] bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-40 disabled:cursor-default transition-colors"
          >
            {cargando ? 'Cargando…' : `Cargar a acabados (${totalUnidades} u)`}
          </button>
        </div>
      </div>
    </div>
  )
}
