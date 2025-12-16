import { useContext, useEffect, useRef, useState } from "react";
import { Search } from "../../components/Atoms/Search/Search";
import { Consulta } from "../../utils/utils";
import { createHashRouter, Form, useNavigate } from "react-router-dom";
import { Button } from "../../components/Atoms/Button/Button";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";

const CuerpoInforme = ({cuerpo})=>{
  return(
    <>
      <iframe src="http://192.168.18.20:4000/produccion/informe/12" className="w-[60vw] h-[60vh]"></iframe>
      {/* <div dangerouslySetInnerHTML={{ __html: cuerpo }} /> */}
    </>
  )
}
export default function InformeCaja(){
  const [info,setInfo] = useState([])
  const [estado,setEstado] = useState(0)
  const [movimientos,setMovimientos] = useState([])
  const [cajas,setCajas] = useState([])
  const navigate = useNavigate()
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  const [ing,setIng] = useState(-1)
  const [egre,setEgre] = useState(-1)
  const [apertura,setApertura] = useState(0)
  const [caja,setCaja] = useState(0)
  const form = useRef()

  const onclick = (e) => {
    const action = e.target.dataset.action
    const id = e.target.dataset.id  
    let params_modal = null
    switch (action) {
      case 'delete':
        if(estado == 1){
          params_modal = {
            open:true,
            content: <div>Desea eliminar el registro seleccionado?. Tenga en cuenta de que el <br/> proceso no es reversible.</div>,
            controls: true,
            header: false,
            action:()=>{
              setOpenloader(true)    
              Consulta({
                url: 'cobros/deletecobro/' + id, params: {
                  method: 'DELETE'
                }
              })
                .then(resp => {
                  console.log("Info del servicidor :",resp)
                  // setOrdenes(resp)
                  toast.success('Abono de letra eliminado con éxito!', { theme: "colored" })
                  // setRefresh(true)
                  recargarinfo()
                  setOpenloader(false)
                })
                .catch(() => {
                  setOpenloader(false)
                  // logout()
                })
                .finally(()=>{
                  setOpenloader(false)
                })
            }
          }
          openModal(params_modal)
        }
        break;
      case 'abonar':
        navigate("/main/cobros/nuevocobro/"+ id + "/otro")
        break;
      default:
        break;
    } 
  }

  useEffect(()=>{
    const data = new FormData()
    setOpenloader(true)
    Consulta({url: 'caja/0/' + (new Date()).toLocaleDateString().split('/').reverse().map((item,key)=>key > 0 ? ('00' + item).slice(-2) : item).join('-')})
    .then(resp => {
      setOpenloader(false)
      setCajas([...cajas,...resp.cajas])
      setMovimientos(resp.movimientos)
      setApertura(resp.apertura)
      console.log("Informe de los movimientos :",resp.movimientos)
      console.log("Informe de los movimientos :",resp.apertura)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
    })
    form.current.addEventListener('salamandra',(e)=>{
      // console.log("El dato del evento:",e.detail)
      setCaja(e.detail.indice)
    })
  },[])

  useEffect(()=>{
    setOpenloader(true)
    Consulta({url: 'caja/' + caja + '/' + (new Date()).toLocaleDateString().split('/').reverse().map((item,key)=>key > 0 ? ('00' + item).slice(-2) : item).join('-')})
    .then(resp => {
      setOpenloader(false)
      setCajas([...cajas,...resp.cajas])
      setMovimientos(resp.movimientos)
      setApertura(resp.apertura)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
    })
  },[caja])

  const filtrarestado = (e)=>{
    const estado = e.target.dataset.estado
    setOpenloader(true)
    let url = undefined
    switch (parseInt(estado)) {
      case 0:
        url = 'cobros/getlista/'
        break;
      case 1:
        url = 'cobros/getabonos/'
        break;
      default:
        break;
    }
    Consulta({
      url: url, params: {
        method: 'GET'
      }
    })
    .then(resp => {
      console.log("Obligaciones consultadas:",resp)
      setOpenloader(false)
      setInfo(resp)
      // if(parseInt(estado) == 3){
      // }else{
      //   setInfo(resp)
      // }
      setEstado(estado)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(()=>{
      setOpenloader(false)
    })
  }

  const recargarinfo = ()=>{
    const data = new FormData()
    setOpenloader(true)
    Consulta({url: estado ? 'cobros/getabonos' : 'cobros/getlista'})
    .then(resp => {
      console.log(resp)
      setOpenloader(false)
      setInfo(resp)  
    })
    .catch((error) => {
      console.log(error)
      // logout()
      // toast.error('Error en la consulta de base', { theme: "colored" })
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
      // setOpenloader(false)
    })
  }
  const busquedaglobal = async (input) => {
    let ruta_consulta = ''
    setOpenloader(true)
    Consulta({url: 'cobros/getlista/' + input.value })
      .then(resp => {
        console.log(resp)
        setOpenloader(false)
        setInfo(resp)
      })
      .catch((error) => {
        console.log("El mnesaje de error es:", error)
      })
      .finally(() => {
        console.log("Horror en la consulta de base de datos")
        setOpenloader(false)
      })
  }

  const onchange = (e)=>{
    console.log("El objecto disparador es:",e.target)
    setOpenloader(true)
    Consulta({url: 'caja/' + caja + '/' + e.target.value})
    .then(resp => {
      setOpenloader(false)
      setCajas([...cajas,...resp.cajas])
      setMovimientos(resp.movimientos)
      setApertura(resp.apertura)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
    })
  }

  return(
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
        <div className="flex flex-col flex-1 pl-2 pr-2 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Informe Caja</h2>
              <div className="w-[500px] mb-1">
                <Search config={{ width: '200px' }} action={busquedaglobal} />
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <div className="mt-2">
            {/* <hr /> */}
            <div className="mt-2 mb-2">
              <form ref={form} className="w-full flex gap-2" onChange={onchange}>
              {
                // cajas.length > 0 ? <InputSelect title={'Tipo Operación'} name={"tipo_operacion"} data={cajas.map((row,key)=>({indice:`${row.idx}`,option:row.nombre,selected:(key == 0 ? true : false)})) } df={Object.keys(info).length > 0 ? info.tipo_operacion : null} /> : <InputSelect title={'Tipo Operación'} name={"tipo_operacion"} data={[{indice:'',option:'',selected:true}]} df={Object.keys(info).length > 0 ? info.tipo_operacion : null} />
                cajas.length > 0 && <InputSelect title={'Caja'} name={"nom_caja"} data={[{indice:'0',option:'TODOS',selected:true},...cajas.map((row,key)=>({indice:`${row.idx}`,option:row.nombre,selected:false}))] } df={null} formref={form} />
              }
              <Input name={'fec_operacion'} defaults={(new Date()).toLocaleDateString().split('/').reverse().map((item,key)=>key > 0 ? ('00' + item).slice(-2) : item).join('-')} title="FechaOperación" type="date" />
              </form>
            </div>
          </div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll mt-2 relative">
            {/* ///////////////////////////////
            SECCION RESUMEN DE MOVIMIENTOS
            /////////////////////////////// */}
            <div>
              {/* /////////////////////////
              SECCION SALDO INICIAL
              ///////////////////////////// */}
              <ul className="list-none [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button]:w-full [&_button.active]:text-green-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-green-50">
                <button className={`group ${estado == 0 ? 'active' : ''}`} data-estado={0}>
                  <span className="relative h-[100%] w-full flex items-center pointer-events-none">
                    Apertura
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-green-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
              <div className={`flex-1 scrollbar-special overflow-y-scroll`}>
                <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                  <tbody>
                    <tr className="">
                      <td className="font-bold" colSpan={6}></td>
                      <td className="font-black">TOTAL:</td>
                      <td className="font-black">0</td>
                      <td className="font-black">0</td>
                      <td className="font-black">
                        {
                          movimientos.length > 0 ? movimientos[0].saldo_inicial.toLocaleString('es-PE', {
                            style: 'currency',
                            currency: 'PEN',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2  
                          }) : 0
                        }
                      </td> 
                      <td className="w-[250px]">
                        <ul className="flex flex-row justify-end">
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={0} data-origen={estado ? 'abonos' : 'obligaciones'}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={0}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={0}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={0}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* /////////////////////////
              SECCION MOVIMIENTOS INGRESOS
              ///////////////////////////// */}
              <hr />
              <ul className="list-none [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button]:w-full [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                <button className={`group ${estado == 0 ? 'active' : ''}`} data-estado={0} onClick={()=>setIng(ing=>ing*-1)}>
                  <span className="relative h-[100%] w-full flex items-center pointer-events-none">
                    Ingresos
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
              <div id="cuerpo_ingresos" className={`flex-1 scrollbar-special overflow-y-scroll ${ing < 0 ? 'h-[0px]' : 'h-[250px]'} transition-all`}>
                <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                  <thead className="text-left sticky top-0 bg-white">
                    <tr>
                      <th className="lg:table-cell w-[400px]">Concepto</th>
                      <th className="lg:table-cell">Ruc</th>
                      <th className="lg:table-cell w-[350px]">Proveedor</th>
                      <th className="lg:table-cell">TipoDoc</th>
                      <th className="lg:table-cell">Serie</th>
                      <th className="lg:table-cell">Numero</th>
                      <th className="lg:table-cell">AdqNoGra</th>
                      <th className="lg:table-cell">BaseImponible</th>
                      <th className="lg:table-cell">Igv</th>
                      <th className="lg:table-cell">Importe</th>
                      <th className="lg:table-cell text-center">Accciones</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        movimientos.length > 0 && movimientos.filter(row=>row.monto > 0).map(mov=>
                          <tr className="">
                            <td className="font-bold">{mov.detalle_mov}</td>
                            <td>{mov.doc_cliente}</td>
                            <td>{mov.nom_cliente}</td>
                            <td className="font-black text-green-600">{mov.tipdoc_ref}</td>
                            <td className="font-black text-green-600">{mov.serie}</td>
                            <td className="font-black text-green-600">{mov.numero}</td>
                            <td className="font-black">{mov.vta_no_gra}</td>
                            <td className="font-black text-red-600">{mov.vta_gra}</td>
                            <td className="font-black text-red-600">{mov.tot_igv}</td>
                            <td className="font-black text-red-600">{mov.monto}</td> 
                            <td className="">
                              <ul className="flex flex-row justify-end">
                                <li>
                                  <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={0} data-origen={estado ? 'abonos' : 'obligaciones'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                  </div>
                                </li>
                                <li>
                                  <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={0}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                  </div>
                                </li>
                                <li>
                                  <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={0}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                  </div>
                                </li>
                                <li>
                                  <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                  </div>
                                </li>
                                <li>
                                  <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={0}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                  </div>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        )
                      }
                  </tbody>
                </table>
              </div>
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                <tbody>
                  <tr className="">
                    <td className="font-bold" colSpan={6}></td>
                    <td className="font-black">TOTAL:</td>
                    <td className="font-black">
                      {
                        movimientos.filter(row=>row.monto > 0).length > 0 ? movimientos.filter(row=>row.monto > 0).reduce((carry,value)=>{return 0},0) : 0
                      }
                    </td>
                    <td className="font-black">
                      {
                        movimientos.filter(row=>row.monto > 0).length > 0 ? movimientos.filter(row=>row.monto > 0).reduce((carry,value)=>{return 0},0) : 0
                      }
                    </td>
                    <td className="font-black">
                      {
                        movimientos.filter(row=>row.monto > 0).length > 0 ? movimientos.filter(row=>row.monto > 0).reduce((carry,value)=>{carry += value.monto; return carry},0).toLocaleString('es-PE', {
                          style: 'currency',
                          currency: 'PEN',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2  
                        }) : 0
                      }
                    </td>
                    <td className="w-[250px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={0} data-origen={estado ? 'abonos' : 'obligaciones'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* /////////////////////////
              SECCION MOVIMIENTOS EGRESOS
              ///////////////////////////// */}
              <hr />
              <ul className="list-none [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button]:w-full [&_button.active]:text-red-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-red-50">
                <button className={`group ${estado == 0 ? 'active' : ''}`} data-estado={0} onClick={()=>setEgre(egre=>egre*-1)}>
                  <span className="relative h-[100%] w-full flex items-center pointer-events-none">
                    Egresos
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-red-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
              <div id="cuerpo_egresos" className={`flex-1 scrollbar-special overflow-y-scroll ${egre < 0 ? 'h-[0px]' : 'h-[250px]'} transition-all`}>
                <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                  <thead className="text-left sticky top-0 bg-white">
                    <tr>
                      <th className="lg:table-cell w-[400px]">Concepto</th>
                      <th className="lg:table-cell">Ruc</th>
                      <th className="lg:table-cell w-[350px]">Proveedor</th>
                      <th className="lg:table-cell">TipoDoc</th>
                      <th className="lg:table-cell">Serie</th>
                      <th className="lg:table-cell">Numero</th>
                      <th className="lg:table-cell">AdqNoGra</th>
                      <th className="lg:table-cell">BaseImponible</th>
                      <th className="lg:table-cell">Igv</th>
                      <th className="lg:table-cell">Importe</th>
                      <th className="lg:table-cell text-center">Accciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      movimientos.length > 0 && movimientos.filter(row=>row.monto < 0).map(mov=>
                        <tr className="">
                          <td className="font-bold">{mov.detalle_mov}</td>
                          <td>{mov.doc_cliente}</td>
                          <td>{mov.nom_cliente}</td>
                          <td className="font-black text-green-600">{mov.tipdoc_ref}</td>
                          <td className="font-black text-green-600">{mov.serie}</td>
                          <td className="font-black text-green-600">{mov.numero}</td>
                          <td className="font-black">{mov.vta_no_gra}</td>
                          <td className="font-black text-red-600">{mov.vta_gra}</td>
                          <td className="font-black text-red-600">{mov.tot_igv}</td>
                          <td className="font-black text-red-600">{mov.monto}</td> 
                          <td className="w-[250px]">
                            <ul className="flex flex-row justify-end">
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={0} data-origen={estado ? 'abonos' : 'obligaciones'}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={0}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={0}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={0}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                <tbody>
                  <tr className="">
                    <td className="font-bold" colSpan={6}></td>
                    <td className="font-black">TOTAL:</td>
                    <td className="font-black">
                      {
                        movimientos.filter(row=>row.monto < 0).length > 0 ? movimientos.filter(row=>row.monto < 0).reduce((carry,value)=>{return 0},0) : 0
                      }
                    </td>
                    <td className="font-black">
                      {
                        movimientos.filter(row=>row.monto < 0).length > 0 ? movimientos.filter(row=>row.monto < 0).reduce((carry,value)=>{return 0},0) : 0
                      }
                    </td>
                    <td className="font-black">
                      {
                        movimientos.filter(row=>row.monto < 0).length > 0 ? movimientos.filter(row=>row.monto < 0).reduce((carry,value)=>{carry += value.monto; return carry},0).toLocaleString('es-PE', {
                          style: 'currency',
                          currency: 'PEN',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2  
                        }) : 0
                      }
                    </td>
                    <td className="w-[250px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={0} data-origen={estado ? 'abonos' : 'obligaciones'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="h-[50px] bg-blue-300 sticky bottom-0">
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                <tbody>
                  <tr className="">
                    <td className="font-bold" colSpan={6}></td>
                    <td className="font-black">SALDO FINAL:</td>
                    <td className="font-black text-red-600">
                      {
                        movimientos.length > 0 ? movimientos.reduce((carry,value)=>{return 0},0) : 0
                      }
                    </td>
                    <td className="font-black text-red-600">
                      {
                        movimientos.length > 0 ? movimientos.reduce((carry,value)=>{return 0},0) : 0
                      }
                    </td>
                    <td className="font-black text-red-600">
                      {
                        movimientos.length > 0 ? (movimientos[0].saldo_inicial + movimientos.reduce((carry,value)=>{carry += parseFloat(value.monto); return carry},0)).toFixed(2) : 0
                      }
                    </td>
                    <td className="w-[250px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={0} data-origen={estado ? 'abonos' : 'obligaciones'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={0}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="flex flex-row justify-end mt-2">
            
            <div className="flex gap-2">
              <Button action={recargarinfo} tipo={'default'}>Actualizar</Button>
            </div>
          </div >
        </div>
      {/* </div> */}
    </>
  )
}