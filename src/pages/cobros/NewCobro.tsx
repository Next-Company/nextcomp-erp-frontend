import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { createRef, useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Guias from "../../components/Common/Guias"
import Pagos from "../../components/Common/Pagos"
import Cuentas from "../../components/Common/Cuentas"
import Facturas from "../../components/Common/Facturas"
import Clientes from "../../components/Common/Clientes"

const colorfase = {
  'TELAS': 'bg-orange-500',
  'AVIOS': 'bg-violet-500'
}
export default function NewCobro(){
  const [tipo,setTipo] = useState(0)
  const urlparams = useParams()
  const [info,setInfo] = useState({})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const [selected,setSelected] = useState([])
  const navigate = useNavigate()

  const onsubmit = (e)=>{
    e.preventDefault()
    if(!urlparams.id && selected.length == 0){
      toast.error('Debe seleccionar primero un servicio de la lista.', { theme: "colored" })
      return
    }

    let data = Object.fromEntries(new FormData(form.current))
    new Promise((resolve, reject) => {
      Object.keys(data).forEach((item)=>{
        if(['cuenta_corriente','fec_pago','num_operacion','pago',].includes(item) && data[item] == ''){
          reject(item)
        }
      })
      resolve(1)
    })
    .then(item=>{
      openModal({
        open: true,
        header: false,
        controls: true,
        content: <div>Desea continuar con el registro pago ingresado?</div>,
        action: async () => {
          setOpenloader(true)
          const data = new FormData()
          urlparams.id && ( !urlparams.tipo && data.append('id',urlparams.id) )
          data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
          data.append('detalle',JSON.stringify(registros))
          // data.append('detalle',urlparams.id ? JSON.stringify(registros) : JSON.stringify(selected))
  
          await Consulta({url: 'cobros/savecobro',params:{
            method:'PUT',
            body:data
          }})
          .then(resp => {
            console.log("RESPUES DEL PROCESO DE PAGO :",resp)
            if(resp.ok){
              console.log('Registro,',resp)
              setOpenloader(false)
              // navigate('/main/pagos/')
              toast.success('Estampado guardado con éxito!!', { theme: "colored" })
            }else{
              throw Error(resp.message)
              // return Promise.reject("error") 
            }
          })
          .catch((err)=>{
            setOpenloader(false)
            toast.error(err.message, { theme: "colored" })
          })
          .finally(()=>{
            setOpenloader(false)
          })
        }
      })

    })
    .catch(item=>{
      toast.error(`El campo ${item} se encuentra vacio. Por favor verifique,`, { theme: "colored" })
    })
    
  }
  const onclick = (e) => {
    const action = e.target.dataset.action
    const position = parseInt(e.target.dataset.position)
    let params_modal = null
    switch(action){
      case 'review':
        params_modal = {
          open: true,
          content: <Facturas actions={(item) => {}} idpedido={registros[position].idpedido} />,
          controls: true,
          header: false,
          action: () => {
          }
        }
        openModal(params_modal)
        break;
      case 'download':
        break;
      default :
        break;
    }
  }
  const nuevocliente = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Clientes actions={(item) => {
        setOpen(false)
        setInfo(info => ({ ...info, id_cliente_CAB: item.idx, cliente: item.nom }))
        // setOpenloader(false)

      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  useEffect(()=>{
    
    if(urlparams.id && urlparams.tipo){
      setOpenloader(true)
      Consulta({url: 'cobros/getlistabyid/' +  urlparams.id})
      .then(resp => {
        console.log("Informacion de la factura a abonar:",resp)
        setOpenloader(false)
        setInfo({...info,cliente:resp[0].cliente})
        setRegistros(resp)
      })
      .catch((error) => {
        console.log("El mnesaje de error es:", error)
      })
      .finally(() => {
        console.log("Horror en la consulta de base de datos")
        setOpenloader(false)
      })
    }else{
      // setOpenloader(true)
      // Consulta({url: 'abonos/getabono/' + urlparams.id,})
      // .then(resp => {
      //   console.log("Los datos del abono son los siguientes:",resp)
      //   setRegistros(resp[1])
      //   setInfo(resp[0])
      //   setOpenloader(false)
      // })
      // .catch((err)=>{
      //   setOpenloader(false)
      // })
      // .finally(()=>{
      //   setOpenloader(false)
      // })
    }

    const handleInputChange = (event) => {
      setTipo(event.detail.valor == 'SERVICIOS' ? 0 : 1)
      // setRegistros([])
    };
    form.current.addEventListener("salamandra", handleInputChange);
    
    return () => {
      if(form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])

  const vistapagos = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Pagos idref={urlparams.id} actions={(item)=>{  
        console.log("El item seleccionado es: ",item)
        setOpen(false)
        setOpenloader(true)
        Consulta({url: 'abonos/getsaldos/' + item.idx})
        .then(resp => {
          setInfo(info=>({...info,id_proveedor_CAB:item.idx,proveedor:item.nom,ruc:item.ruc}))
          setRegistros(resp)
          // console.log(resp)
        })
        .catch((err)=>{
          setOpenloader(false)
        })
        .finally(()=>{
          setOpenloader(false)
        })
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }
  const nuevacuenta = ()=>{
      let params_modal = null
      params_modal = {
        open:true,
        content: <Cuentas actions={(item)=>{  
          setInfo(info=>({...info,id_cuenta_CAB:item.idx,cuenta_corriente:item.nom}))
          setOpen(false)
        }}/>,
        controls: true,
        header: false,
        action:()=>{
        }
      }
      openModal(params_modal)
    }
  const onchange = (e)=>{
  }
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px] pr-2">Abono a facturas /</h2>
              <span className="text-blue-500 font-bold">
                Nuevo Abonos
              </span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full flex flex-col flex-1 pt-2">
            <form ref={form} onSubmit={onsubmit} onChange={()=>{}} onInputCapture={onchange}>
              <div className={` flex-col gap-3 flex`}>
                <div className="flex flex-row gap-3">
                  <Input name={'idx'} title="" defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'cliente'} title="Cliente" defaults={Object.keys(info).length > 0 ? info.cliente : null} type="text" />
                  <Input name={'fec_pago'} defaults={Object.keys(info).length > 0 && info.fec_pago ? info.fec_pago : null} title="FechaPago" type="date" />
                  <InputSelect title={'Moneda'} name={"moneda"} data={
                    [
                      { indice: 'S', option: 'SOLES', selected: true },
                      { indice: 'D', option: 'DOLARES'},
                    ]} 
                    df={Object.keys(info).length > 0 ? info.moneda : null} 
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <InputSelect title={'MetodoPago'} name={"tipo_operacion"} data={
                    [
                      { indice: 'LETRA', option: 'LETRA', selected: true },
                      { indice: 'TRANSFERENCIA', option: 'TRANSFERENCIA'},
                      { indice: 'FACTURA DESCUENTO', option: 'FACTURA DESCUENTO'},
                      { indice: 'DEPOSITO', option: 'DEPOSITO'},
                    ]} 
                    df={Object.keys(info).length > 0 ? info.documento : null} 
                  />
                  <Input name={'documento_ref'} title="ReferenciaPago" defaults={Object.keys(info).length > 0 ? info.num_operacion : null} type="text" />
                  <InputSelect title={'Entidad Bancaria'} name={"entidad_bancaria"} data={
                    [
                      { indice: 'MIBANCO', option: 'MIBANCO', selected: true },
                      { indice: 'BCP', option: 'BANCO DE CREDITO'},
                      { indice: 'SCB', option: 'SCOTIABANK PERU'},
                      { indice: 'BBVA', option: 'BBVA'},
                      { indice: 'BANCOM', option: 'BANCOM'},
                      { indice: 'CTB', option: 'CITIBANK DEL PERU'},
                      { indice: 'BANBIF', option: 'BANBIF'},
                      { indice: 'BPP', option: 'BANCO PIPICHINCHA'},
                      { indice: 'BRP', option: 'BANCO RIPLEY'},
                      { indice: 'BCCP', option: 'BANCO CENTRAL DEL PERU'},
                      { indice: 'BF', option: 'BANCO FALABELLA'},
                      { indice: 'AGB', option: 'AGROBANCO'},
                      { indice: 'BGNB', option: 'BANCO GNB'},
                      { indice: 'BSTP', option: 'SANTANDER PERU'},
                      { indice: 'BALFIN', option: 'ALFIN BANCO'},
                      { indice: 'ICBC', option: 'ICBC PERU BANK S.A.'},
                      { indice: 'BCHN', option: 'BANK OF CHINA'},
                      { indice: 'BBCI', option: 'BANCO BCI'},
                      { indice: 'INBK', option: 'INTERBANK'} 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.entidad_bancaria : null} 
                  />
                  <Input name={'id_cuenta_CAB'} defaults={Object.keys(info).length > 0 && info.id_cuenta_CAB ? info.id_cuenta_CAB : null} title="Cuenta Corriente" type="hidden"/>
                  <Input name={'cuenta_corriente'} defaults={Object.keys(info).length > 0 && info.cuenta_corriente ? info.cuenta_corriente : null} title="Cuenta Corriente" type="text" action={nuevacuenta} mode={'static'}/>
                  <Input name={'importe'} defaults={Object.keys(info).length > 0 && info.importe ? info.importe : null} title="ImportePago" type="number"/>
                </div>
                <div>
                  {/* <span>Artículos:</span> */}
                  <div className="h-[400px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-rose-300">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell">#</th>
                          <th className="lg:table-cell">Documento</th>
                          <th className="lg:table-cell">FechaEmision</th>
                          <th className="lg:table-cell">Moneda</th>
                          <th className="lg:table-cell">VentasGravadas</th>
                          <th className="lg:table-cell">Igv</th>
                          <th className="lg:table-cell">Total</th>
                          <th className="lg:table-cell">Cancelado</th>
                          <th className="lg:table-cell">Saldo</th>
                          <th className="lg:table-cell text-center">Accciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registros.length > 0 && registros.map((row, key) => (
                            <tr key={key} className="">
                              <td>{key + 1}</td>
                              <td className="text-center">{row.DOCUMENTO + '-' + row.NUMERO}</td>
                              {/* <td className="font-bold">{row.cliente.substr(0,45) ?? '-'}</td> */}
                              <td className="text-center">{row.fec_ope}</td>
                              <td className="text-center">{row.tip_mon}</td>
                              <td className="font-black text-center text-green-600">{row.vta_gra.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-black text-center text-green-600">{row.sum_igv.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-black text-center text-green-600">{row.tot_vta.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-black text-center">S/.0</td>
                              <td className="font-black text-center text-red-600">{row.tot_vta.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="w-[250px]">
                                <ul className="flex flex-row justify-end">
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx} >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={row.idx}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={row.idx}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={row.idx ?? 0}>
                                      <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M3 10h18" /><path d="M16 19h6" /><path d="M19 16l3 3l-3 3" /><path d="M7.005 15h.005" /><path d="M11 15h2" /></svg>
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
              <div className="flex justify-between gap-2 mt-2 p-1">
                <div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button action={() => navigate('/main/cobros/')} type={'button'} tipo={'default'}>Cancelar</Button>
                  <Button type={'submit'} tipo={'success'}>Guardar</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}