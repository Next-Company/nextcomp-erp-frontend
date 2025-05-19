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
import { colorfase } from "../../utils/utils"
import Pagos from "../../components/Common/Pagos"
import Cuentas from "../../components/Common/Cuentas"

export default function NewPagoServicio(){
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
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro pago ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        const data = new FormData()
        urlparams.id && ( !urlparams.altura && data.append('id',urlparams.id) )
        data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('detalle',urlparams.id ? JSON.stringify(registros) : JSON.stringify(selected))

        await Consulta({url: 'abonos/saveabono/',params:{
          method:'PUT',
          body:data
        }})
        .then(resp => {
          setOpenloader(false)
          navigate('/main/pagos/')
          toast.success('Estampado guardado con éxito!!', { theme: "colored" })
        })
        .catch((err)=>{
          setOpenloader(false)
          // toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          setOpenloader(false)
        })
      }
    })
  }
  const testkey = ()=>{
    
  }
  const onclick = (e) => {
    const action = e.target.dataset.action
    const position = parseInt(e.target.dataset.position)
    let params_modal = null
    switch(action){
      case 'review':
        break;
      case 'download':
        params_modal = {
          open: true,
          content: <div>Desea continuar con la descarga del pedido de insumos?.<br />  Tenga en cuenta de que el proceso puede tardar unos minutos.</div>,
          controls: true,
          header: false,
          action: () => {
            const desc = async () => {
              const data = new FormData()
              data.append('id', registros[position].idx)
              // const tipo = info.filter(row => row.idx == id)[0].tipo

              setOpenloader(true)
              Consulta({
                url: `produccion/vistapreviapedido/telas`, params: {
                  method: 'POST',
                  body: data
                }
              })
                .then(resp => {
                  setOpenloader(false)
                  const binaryString = window.atob(resp.data);
                  const binaryLen = binaryString.length;
                  const bytes = new Uint8Array(binaryLen);
                  for (let i = 0; i < binaryLen; i++) {
                    const ascii = binaryString.charCodeAt(i);
                    bytes[i] = ascii;
                  }
                  const file = window.URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }))
                  const link = document.createElement('a')
                  link.href = file
                  link.target = 'blank'
                  link.click()
                })
                .catch((err) => {
                  setOpenloader(false)
                  toast.error('Se produjo un error!!', { theme: "colored" })
                })
            }
            desc()
          }
        }
        openModal(params_modal)
        break;
      default :
        break;
    }
  }
  useEffect(()=>{
    console.log("Info urlparams:",urlparams)
    // if(urlparams.id){
    //   setOpenloader(true)
    //     Consulta({url: 'abonos/statusdetalle/' + urlparams.id,})
    //     .then(resp => {
    //       let total_pagar = resp.filter(row=>!row.isprototipo).reduce((carry,item)=>{carry += item.costo*(item.despacho - item.caidos);return carry;},0)
    //       setRegistros(resp)
    //       setInfo({...info,id_proveedor_CAB:resp[0].id_proveedor_CAB,proveedor:resp[0].proveedor,importe:total_pagar,saldo:total_pagar - resp[0].cancelado,pago:0})
    //       setOpenloader(false)
    //     })
    //     .catch((err)=>{
    //       setOpenloader(false)
    //     })
    //     .finally(()=>{
    //       setOpenloader(false)
    //     })
    // }

    if(urlparams.id && urlparams.tipo){
      setOpenloader(true)
      Consulta({url: 'abonos/serviciostatusdetalle/' + urlparams.id,})
      .then(resp => {
        let total_pagar = resp.filter(row=>!row.isprototipo).reduce((carry,item)=>{carry += item.costo*(item.despacho - item.caidos);return carry;},0)
        setRegistros(resp)
        setInfo({...info,id_proveedor_CAB:resp[0].id_proveedor_CAB,proveedor:resp[0].proveedor,importe:total_pagar,saldo:total_pagar - resp[0].cancelado,pago:0})
        setOpenloader(false)
      })
      .catch((err)=>{
        setOpenloader(false)
      })
      .finally(()=>{
        setOpenloader(false)
      })
    }else{
      setOpenloader(true)
      Consulta({url: 'abonos/getabono/' + urlparams.id,})
      .then(resp => {
        console.log("Los datos del abono son los siguientes:",resp)
        setRegistros(resp[1])
        setInfo(resp[0])
        setOpenloader(false)
      })
      .catch((err)=>{
        setOpenloader(false)
      })
      .finally(()=>{
        setOpenloader(false)
      })
    }

    const handleInputChange = (event) => {
      setTipo(event.detail.valor == 'SERVICIOS' ? 0 : 1)
      setRegistros([])
    };
    form.current.addEventListener("salamandra", handleInputChange);
    
    return () => {
      if(form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])

  const editvalue = (e)=>{
    let column = e.target.dataset.name
    console.log("El campo afectado es el siguiente :",column,"SDSDF : ",e.target.checked)
    let position = e.target.dataset.position
    setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'isprototipo' ? e.target.checked : e.target.value)}:item)])
  }

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
  const searchguia = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Guias actions={(item)=>{  
        // console.log("El item seleccionado es: ",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({url: 'produccion/guia/' + item.idx})
        .then(resp => {
          setInfo(info=>({...info,id_guia_origen:item.idx,nro_guia_origen:item.idx,id_proveedor_CAB:item.id_proveedor_CAB,proveedor:item.proveedor}))
          setRegistros(resp[1])
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
    console.log("Cambiando tipo de pedido")
    // console.log("VA o neleet")
    // console.log("Otros cambios adicionales")
  }
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px] pr-2">Abonos a servicio /</h2>
              <span className="text-blue-500 font-bold">
                Nuevo Abono
              </span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full flex flex-col flex-1 pt-2">
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} onChange={()=>{}} onInputCapture={onchange}>
              <div className={` flex-col gap-3 flex`}>
                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <InputSelect title={'Origen'} formref={form} name={"tipo"} data={
                    [
                      { indice: 'SERV', option: 'SERVICIOS', selected: true },
                      { indice: 'PEDD', option: 'PEDIDOS'},
                    ]} 
                    df={Object.keys(info).length > 0 ? info.tipo : null} 
                  />
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
                  {/* <Input name={'fec_despacho'} defaults={Object.keys(info).length > 0 && info.fec_despacho ? info.fec_despacho : null} title="FechaEmisionDespacho" type="date" /> */}
                  <Input name={'id_cuenta_CAB'} defaults={Object.keys(info).length > 0 && info.id_cuenta_CAB ? info.id_cuenta_CAB : null} title="Cuenta Corriente" type="hidden"/>
                  <Input name={'cuenta_corriente'} defaults={Object.keys(info).length > 0 && info.cuenta_corriente ? info.cuenta_corriente : null} title="Cuenta Corriente" type="text" action={nuevacuenta} mode={'static'}/>
                  <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                  <InputSelect title={'Tipo Operación'} name={"tipo_operacion"} data={
                    [
                      { indice: 'TRANSFERENCIA', option: 'TRANSFERENCIA', selected: true },
                      { indice: 'DEPOSITO', option: 'DEPOSITO'},
                      { indice: 'CHEQUE', option: 'CHEQUE'},
                      { indice: 'EFECTIVO', option: 'EFECTIVO'},
                    ]} 
                    df={Object.keys(info).length > 0 ? info.tipo_operacion : null} 
                  />
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                  <Input name="proveedor" title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text"/>
                </div>
                <div className="flex gap-3">
                  <Input name={'num_operacion'} defaults={Object.keys(info).length > 0 && info.num_operacion ? info.num_operacion : null} title="Número Operación" type="text" />
                  <InputSelect title={'Moneda'} name={"moneda"} data={
                    [
                      { indice: 'S', option: 'SOLES', selected: true },
                      { indice: 'D', option: 'DOLARES'},
                    ]} 
                    df={Object.keys(info).length > 0 ? info.moneda : null} 
                  />
                  <Input name={'fec_pago'} defaults={Object.keys(info).length > 0 && info.fec_pago ? info.fec_pago : null} title="FechaPago" type="date" />
                  <Input name={'importe'} defaults={Object.keys(info).length > 0 && info.importe ? info.importe : null} title="ImportePago" type="number"/>
                  {
                    urlparams.tipo
                    &&
                    <>
                      <Input name={'saldo'} defaults={Object.keys(info).length > 0 && info.saldo ? info.saldo : null} title="Saldo" type="number" action={vistapagos} mode={'static'}/>
                      <Input name={'pago'} defaults={Object.keys(info).length > 0 && info.pago ? info.pago : null} title="Pago" type="number"/>
                    </>
                  }
                  
                </div>
                <div>
                  {/* <span>Artículos:</span> */}
                  <div className="h-[400px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-rose-300">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell">Id</th>
                          {/* <th className="lg:table-cell">HDC</th> */}
                          <th className="lg:table-cell">Servicio</th>
                          <th className="lg:table-cell">Producto</th>
                          <th className="lg:table-cell">Marca</th>
                          <th className="lg:table-cell">Modelo</th>
                          <th className="lg:table-cell">Costo</th>
                          <th className="lg:table-cell">Guias</th>
                          <th className="lg:table-cell">Cantidad</th>
                          <th className="lg:table-cell">Despacho</th>
                          <th className="lg:table-cell">Caidos</th>
                          <th className="lg:table-cell">Total</th>
                          <th className="lg:table-cell">Acciones</th>                          
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registros.length > 0 && registros.map((row,key)=>(
                            <tr key={key} className={`${selected.find((item)=>item.idx == row.idx) ? 'selected' : ''} focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent [&_td]:text-center`}>
                              <td>{row.idx}</td>
                              {/* <td>#{row.orden_ref}</td> */}
                              <td><div className={`w-full bg- text-white text-center text-[8px] rounded-l-full rounded-r-full ${colorfase[row.servicio]}`}>{row.servicio}</div></td>
                              <td>{row.articulo}</td>
                              <td>{row.marca}</td>
                              <td>{row.modelo}</td>
                              <td>S/.{row.costo}</td>
                              <td>{row.id_despacho}</td>
                              <td>{row.cantidad}</td>
                              <td>{row.despacho}</td>
                              <td>{row.caidos}</td>
                              <td>{row.despacho - row.caidos}</td>
                              <td className="w-[250px]">
                                <ul className="flex flex-row justify-end">
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} data-position={key}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download" onClick={onclick}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="add" onClick={()=>{}}>
                                      <svg  xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
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
                  <Button action={() => navigate('/main/pagos/')} type={'button'} tipo={'default'}>Cancelar</Button>
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