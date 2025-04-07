import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Proveedores from "../../components/Common/Proveedores"
import { useNavigate, useParams } from "react-router-dom";

export default function NewLetraV2() {
  const urlparams = useParams()
  const [info, setInfo] = useState({ idx: null, id_proveedor_CAB: null, proveedor: null, fec_emision: null, fec_vencimiento: null, num_letra: null, documentos_ref: null, importe: null, estado: 'EMIT', origen: 'SERVICIO' })
  const [origen, setOrigen] = useState('SERVICIO')
  const [registros, setRegistros] = useState([])
  const [selected, setSelected] = useState([])
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const navigate = useNavigate()

  const onsubmit = (e) => {
    e.preventDefault()
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de la letra ingresada?</div>,
      action: async () => {
        setOpenloader(true)
        const data = new FormData()
        urlparams.id && data.append('id', urlparams.id)
        data.append('info', JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('registros', JSON.stringify(registros))
        await Consulta({
          url: 'letras/saveLetra/', params: {
            method: 'PUT',
            body: data
          }
        })
          .then(resp => {
            setOpenloader(false)
            // navigate('/main/letras/inicio')
            toast.success('Estampado guardado con éxito!!', { theme: "colored" })
          })
          .catch((err) => {
            setOpenloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(() => {
            setOpenloader(false)
          })
      }
    })
  }
  const onclick = (e) => {
    // actions(lista[e.target.dataset.position])
    const item = registros[parseInt(e.target.dataset.position)]
    if (selected.find((row) => row.idx == item.idx)) {
      setSelected([...selected.filter(row => row.idx !== item.idx)])
      setInfo({ ...info, importe: parseFloat(info.importe ?? 0) - parseFloat(item.importe_total) })
    } else {
      setSelected([...selected, registros[parseInt(e.target.dataset.position)]])
      setInfo({ ...info, importe: parseFloat(info.importe ?? 0) + parseFloat(item.importe_total) })
    }
  }
  useEffect(() => {
    if (urlparams.id) {
      setOpenloader(true)
      const pp = async () => {
        await Consulta({ url: 'letras/getLetraById/' + urlparams.id, })
          .then(resp => {
            console.log("Letra info :", resp[1][0])
            setInfo(resp[0][0])
            setRegistros(resp[1])
            setOpenloader(false)
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }
      pp()
    }
    const handleInputChange = (event) => {
      // setOrigen(event.detail.valor == 'PEDIDOS' ? 1 : ( event.detail.valor == 'SERVICIOS' ? 2 : 0 ))
      console.log("El valor de origen es:", event.detail.valor)
      setOrigen(event.detail.valor)
    };
    form.current.addEventListener("salamandra", handleInputChange);

    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  }, [])
  const nuevoproveedor = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Proveedores actions={(item) => {
        console.log("El item seleccionado es: ", item)
        setOpen(false)
        setOpenloader(true)
        Consulta({ url: 'letras/getfacturasbyproveedor/' + item.idx })
          .then(resp => {
            // setRegistros(resp)
            console.log("Lista de facturas", resp)
            setInfo(info => ({ ...info, id_proveedor_CAB: item.idx, proveedor: item.nom }))
            setOpenloader(false)
            setRegistros(resp)
            // navigate('/main/guias/inicio')
          })
          .catch((err) => {
            // setOpenloader(false)
          })


      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  const listafacturas = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Proveedores actions={(item) => {
        setInfo(info => ({ ...info, id_proveedor_CAB: item.idx, proveedor: item.nom }))
        setOpen(false)
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Letras /</h2>
              <span className="text-blue-500 font-bold">
                Nueva Letra
              </span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1 pt-2">

            <form ref={form} onSubmit={onsubmit}>
              <div className={` flex-col gap-3 flex`}>
                <div className="flex flex-row gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                  <InputSelect title={'Origen'} formref={form} name={"origen"} data={
                    [
                      { indice: 'SERVICIO', option: 'SERVICIO', selected: true },
                      { indice: 'PEDIDO', option: 'PEDIDO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.origen : null}
                  />
                  <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} />
                  <Input name={'fec_emision'} title="FecEmision" defaults={Object.keys(info).length > 0 ? info.fec_emision : null} type="date" />
                  <Input name={'fec_vencimiento'} title="FecVencimiento" defaults={Object.keys(info).length > 0 ? info.fec_vencimiento : null} type="date" />
                </div>
                <div className="flex flex-row gap-3">
                  <Input name={'num_letra'} title="NumeroLetra" defaults={Object.keys(info).length > 0 ? info.num_letra : null} type="text" />
                  <InputSelect title={'Moneda'} name={"moneda"} data={
                    [
                      { indice: 'MN', option: 'SOLES', selected: true },
                      { indice: 'USD', option: 'DOLARES' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.moneda : null}
                  />
                  {
                    origen == 'PEDIDO'
                      ? <>
                        <Input name={'documentos_ref'} title="DocumentosRef" defaults={Object.keys(info).length > 0 ? info.documentos_ref : null} type="text" action={listafacturas} mode={'static'} />
                      </>
                      : <>
                        <Input name={'documentos_ref'} title="DocumentosRef" defaults={Object.keys(info).length > 0 ? info.documentos_ref : null} type="text" />
                      </>
                  }
                  <Input name={'importe'} title="Importe" defaults={Object.keys(info).length > 0 ? info.importe : null} type="number" />
                  <InputSelect title={'Estado'} name={"estado"} data={
                    [
                      { indice: 'EMIT', option: 'PENDIENTE', selected: true },
                      { indice: 'TERM', option: 'FINALIZADO' },
                      { indice: 'ANUL', option: 'ANULADO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.estado : null}
                  />
                </div>


                <div>
                  <span>Artículos:</span>
                  <div className="h-[400px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2">
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-rose-300">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell">Id</th>
                          <th className="lg:table-cell">TipoDoc</th>
                          <th className="lg:table-cell">Serie</th>
                          <th className="lg:table-cell">Numero</th>
                          <th className="lg:table-cell">FecEmision</th>
                          <th className="lg:table-cell">ImporteBruto</th>
                          <th className="lg:table-cell">BaseImponible</th>
                          <th className="lg:table-cell">MontoInafecto</th>
                          <th className="lg:table-cell">Igv</th>
                          <th className="lg:table-cell">ImporteTotal</th>
                          <th className="lg:table-cell">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registros.length > 0 && registros.map((row, key) => (
                            <tr key={key} className={`focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent ${selected.find((item) => item.idxsub == row.idxsub) ? 'selected' : ''}`}>
                              <td className="text-center">{row.idx}</td>
                              <td className="text-center">{row.tipodoc == '2' ? 'NOTA CREDITO' : 'FACTURA'}</td>
                              <td className="text-center">{row.serie}</td>
                              <td className="text-center">{row.numero}</td>
                              <td className="text-center">{row.fec_emision}</td>
                              <td className="text-center">{row.importe_bruto}</td>
                              <td className="text-center">{row.base_imponible}</td>
                              <td className="text-center">{row.monto_inafecto}</td>
                              <td className="text-center">{row.igv}</td>
                              <td className="text-center">{row.importe_total}</td>
                              <td className="w-[250px]">
                                <ul className="flex flex-row justify-end">
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={() => { }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={onclick} data-position={key} data-action="add">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                                    </div>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/letras/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}