import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Search } from "../../components/Atoms/Search/Search";
import { useNavigate } from "react-router-dom";
import { AuthPermitions } from "../../contexts/contexts";
import { Consulta } from "../../utils/utils";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";
import StatusGeneral from "./StatusGeneral";

const colorfase = {
  'ORDENES':'bg-green-500',
  'CONFECCION':'bg-purple-500',
  'ESTAMPADO':'bg-gray-500',
  'ACABADOS':'bg-red-500',
  'LAVANDERIA':'bg-green-500',
  'MOLDES':'bg-orange-500',
  'OJAL':'bg-blue-500',
  'CORTE':'bg-rose-400',
  'BORDADO':'bg-yellow-500',
  'FINALIZADO':'bg-gray-400',
  'TRANSITO':'bg-black'
}

export default function ListaOrdenes() {
  const [ ordenes, setOrdenes ] = useState([])
  const [ position, setPosition ] = useState(0)
  const [ rango, setRango ] = useState(30)
  const { logout, credentials } = useContext(AuthPermitions)
  const { openModal, config, setOpenloader, openloader } = useContext(ModalWindowContext)
  const [ refresh, setRefresh ] = useState(false)
  const [ estado, setEstado ] = useState('EN PROCESO')
  const navigate = useNavigate()

  const onclick = (e) => {
    console.log("el culpable ",e.target,e.currentTarget)

    const action = e.target.dataset.action ?? e.currentTarget.dataset.action
    const id = e.target.dataset.id ?? e.currentTarget.dataset.id

    let params_modal = null
    switch (action) {
      case 'delete':
        params_modal = {
          open:true,
          content: <div>Desea eliminar la orden de producción seleccionada?. Tenga en cuenta de que el <br/> proceso no es reversible.</div>,
          controls: true,
          // header: true,
          action:()=>{
            setOpenloader(true)
            Consulta({
              url: 'ordenes/' + id, params: {
                method: 'DELETE'
              }
            })
              .then(resp => {
                // setOrdenes(resp)
                toast.success('Orden eliminada con éxito!', { theme: "colored" })
                setRefresh(true)
                setOpenloader(false)
              })
              .catch(() => {
                setOpenloader(false)
                logout()
              })
              .finally(()=>{
                setOpenloader(false)
              })
          }
        }
        openModal(params_modal)
        break;
      case 'edit':
        navigate("/main/ordenes/nuevo/"+ id)
        break;
      case 'show':
        // navigate("/main/ordenes/nuevo/"+ id)
        // alert("Hola mudno como estamos")
        openModal({
          open: true,
          header: false,
          controls: true,
          content: <StatusGeneral id={id} openmodal={openModal}/>,
          action: async () => {
          }
        })

        break;
      case 'download':
        params_modal = {
          open: true,
          content: <div>Desea continuar con la descarga de la guia de traslado interno?.<br />  Tenga en cuenta de que el proceso puede tardar unos minutos.</div>,
          controls: true,
          header: false,
          action: () => {
            const desc = async () => {
              setOpenloader(true)

              Consulta({
                url: "ordenes/printsugerido/" + id
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
      default:
        break;
    } 
  }
  const busqueda_search = async (e)=>{
    console.log('El comando presionado es :',e.code,'-',e.keyCode)
    setOpenloader(true)
    Consulta({
      url: 'ordenes/getordenes/' + e.value + ` ${estado}`
    })
    .then(resp => {
      console.log('Resultado de busqueda de orden:',resp)
      setOrdenes(resp)
      setOpenloader(false)
    })
    .catch((error) => {
      console.log(error)
      toast.error('Error en la consulta de base', { theme: "colored" })
      // logout()
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
      setOpenloader(false)
    })
  }

  useEffect(() => {
    console.log("Empezando el primer rendeizado")
    setOpenloader(true)
    Consulta({url: 'ordenes/getordenes/' + ` ${estado}`})
      .then(resp => {
        console.log(resp)
        setOrdenes(resp)
        setOpenloader(false)
      })
      .catch((error) => {
        console.log(error)
        // logout()
        toast.error('Error en la consulta de base', { theme: "colored" })
      })
      .finally(()=>{
        console.log("Horror en la consulta de base de datos")
        setOpenloader(false)
      })
  }, [])
  useEffect(() => {
    if(refresh){
      setOpenloader(true)
      Consulta({url: 'ordenes/getordenes/' + ` ${estado}`})
        .then(resp => {
          setOrdenes(resp)
          setOpenloader(false)
          setRefresh(false)
        })
        .catch(() => {
          console.log("error")
          logout()
          setOpenloader(false)
        })
        .finally(()=>{
          // console.log("error")
          setOpenloader(false)
        })
    }
  }, [refresh])
  const menu = useRef()
  const calculo = (e)=>{
    const estado_orden = e.target.dataset.estado
    if(!e.target.classList.contains('active')){
      for(const element of menu.current.querySelectorAll('button')){
        element.classList.remove('active')
      }
      e.target.classList.add("active")
    }
    setEstado(estado)
    setOpenloader(true)
    Consulta({url: 'ordenes/getordenes/' + ` ${estado_orden}`})
    .then(resp => {
      setOrdenes(resp)
      setOpenloader(false)
      setRefresh(false)
    })
    .catch(() => {
      console.log("error")
      logout()
      setOpenloader(false)
    })
    .finally(()=>{
      setOpenloader(false)
    })
  }
  // const calculo_ = (e)=>{
  //   const estado = e.target.dataset.estado
  //   const data = new FormData()
  //   data.append("params",JSON.stringify([{estado_orden:estado}]))
  //   if(!e.target.classList.contains('active')){
  //     for(const element of menu.current.querySelectorAll('button')){
  //       element.classList.remove('active')
  //     }
  //     e.target.classList.add("active")
  //   }
  //   setOpenloader(true)
  //     Consulta({
  //       url: 'produccion/busqueda', params: {
  //         method: 'POST',
  //         body: data
  //       }
  //     })
  //       .then(resp => {
  //         setOrdenes(resp)
  //         setOpenloader(false)
  //         setRefresh(false)
  //       })
  //       .catch(() => {
  //         console.log("error")
  //         logout()
  //         setOpenloader(false)
  //       })
  //       .finally(()=>{
  //         setOpenloader(false)
  //       })
  // }
  const recargarinfo = ()=>{
    setPosition(0)
    setRefresh(true)
  }
  // const moveback = ()=>{
  //   if(position > 0){
  //     setPosition(position=>position - 1)
  //   }
  //   console.log("Hacia atras : ",position)
  // }
  // const moveforward = ()=>{
  //   if(position < Math.ceil(ordenes.length / rango) - 1){
  //     setPosition(position=>position + 1)
  //   }
  //   console.log("Hacia adelante : ",position)
  // }
  const regulalizzet = ()=>{
    console.log("dentro de lizzet")
    setOpenloader(true)
    Consulta({url: 'ordenes/lizzet/22'})
    .then(resp => {
      console.log(resp)
      setOpenloader(false)
    })
    .catch(() => {
      console.log("error")
      logout()
      setOpenloader(false)
    })
    .finally(()=>{
      setOpenloader(false)
    })
  }
  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">

        <div className="flex flex-col flex-1 pl-2 pr-2 pt-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Producción</h2>
              <div className="w-[400px]">
                <Search config={{ width: '200px' }} action={busqueda_search} />
              </div>
            </div>
            <hr />
          </div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll">
            <div>
              <ul ref={menu} className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                <button className={`group ${estado == 'EN PROCESO' && 'active'}`} data-estado="EN PROCESO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes en proceso
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className={`group ${estado == 'FINALIZADO' && 'active'}`} data-estado="FINALIZADO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes finalizadas
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className={`group ${estado == 'ANULADO' && 'active'}`} data-estado="ANULADO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes anuladas
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
            </div>
            <hr />
            <div className="flex-1 scrollbar-special overflow-y-scroll">
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:nth-child(n):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1s [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr:hover_td_div.stages]:scale-[1.2] [&_tbody_tr:hover_td_div.stages]:translate-x-[50px]">
                <thead className="text-left sticky top-0 bg-white">
                  <tr>
                    <th className="lg:table-cell">OC</th>
                    <th className="lg:table-cell">Cliente</th>
                    <th className="lg:table-cell">FecEmision</th>
                    <th className="lg:table-cell">FecComercial</th>
                    <th className="lg:table-cell">Marca</th>
                    <th className="lg:table-cell">Producto</th>
                    <th className="lg:table-cell">Modelo</th>
                    <th className="lg:table-cell">Sugerido/Liquidación</th>
                    <th className="lg:table-cell">DiasProducción</th>
                    <th className="lg:table-cell">DiasPendientes</th>
                    <th className="lg:table-cell">FaseActual</th>
                    <th className="lg:table-cell text-center">Accciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ordenes.length > 0
                      // ? ordenes.filter((row,key)=>key > rango*position && key <= rango*(position+1)).map((row, key) => (
                      ? ordenes.map((row, key) => (
                        <tr key={key} data-action="show" onClick={onclick} data-id={row.idx} className="hover">
                          {/* <td>{row.idx}</td> */}
                          <td>{row.oc}</td>
                          <td className="font-bold">{row.cliente.substr(0,30)}</td>
                          <td>{row.fec_emitida_orden}</td>
                          <td>{row.fec_entrega_orden}</td>
                          <td>{row.marca}</td>
                          <td>{row.producto}</td>
                          <td>{row.modelos}</td>
                          <td className={`font-black ${row.total_corte > 0 ? 'text-blue-500' : 'text-green-500'}  text-center`}>{row.total_corte > 0 ? row.total_corte : row.total_orden}</td>
                          <td className="font-black text-center">{row.dias_produccion}</td>
                          <td className={`text-center font-black ${row.dias_pendientes < 0 ? 'text-red-500' : 'text-black'}`}>{row.dias_pendientes}</td>
                                            
                          {/* <td onClick={()=>alert("HOla mudno")}>
                            <div className={`px-[5px] text-white text-center text-[8px] rounded-l-full rounded-r-full ${colorfase[row.estado_orden == 'FINALIZADO' ? 'FINALIZADO' : (row.nro_guias > 0 ? row.status_servicio : row.status)] ?? 'bg-gray-400'} flex flex-row justify-center`}>
                              {
                                ['CONFECCION','ESTAMPADO','BORDADO','ESTAMPADO','LAVANDERIA','OJAL','ACABADOS'].map(item=><div className="border-[1px] border-black px-1">{item}</div>)

                              }
                            </div>
                          </td> */}
                          <td>  
                            {/* <div className={`text-black text-center text-[8px] flex flex-row [&_div]:border-gray-500 [&_div:nth-child(2n)]:border-x-[1px] [&_div:nth-child(2n)]:border-white border-[1px] border-black rounded-lg overflow-hidden hover:scale-[1.5] transition-all`}> */}
                            <div className={`text-black text-center text-[10px] flex flex-row border-[.2px] border-gray-500 rounded-lg overflow-hidden transition-all stages`}>
                              {
                                // row.ruta_proceso && JSON.parse(row.ruta_proceso).map(item=><div className="px-2 flex-1 text-white bg-gray-400">{item}</div>)
                                // row.ruta_final.map(item=><div className={`px-2 flex-1 text-white ${row.servicio == 'MOLDE' ? 'bg-[#c3c3c3]' : 'bg-gray-500'}`}>{item}</div>)
                                row.ruta_test.map(item=><div className={`px-2 flex flex-row flex-1 items-center justify-center pointer-events-none ${item.estado ? (item.pendiente ? (item.cadudo ? 'bg-red-500' : 'bg-amber-500') : item.color) + ' text-white' : 'bg-gray-200 text-gray-500'} text-nowrap`}>
                                  {item.fase}
                                  {/* {item.cadudo &&
                                  <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" /></svg>
                                  } */}
                                </div>)

                              }
                            </div>
                          </td>

                          <td className="">
                            <ul className="flex flex-row justify-end">
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="show" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))
                      :
                      <tr className="h-[40px]"><td colSpan={13} className="text-center"><span>Datos no encontrados</span></td></tr>
                  }
                </tbody>
                <tfoot className="sticky w-full bottom-0 bg-gray-100 ">
                  <tr>
                    <td className="h-[45px] border-t border-t-gray-600 z-50" colSpan={12}>
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          Showing 1 to 4 of 4 entries (filtered from 57 total entries)
                        </div>
                        <div className="flex flex-row justify-end items-center gap-2">
                          <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                          </div>
                          <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* <div className="flex flex-col items-center p-2 gap-2"> */}
            <div className="flex flex-row justify-end mt-2 gap-2">
              {/* <Button action={regulalizzet} tipo={'warning'} type="button">Inventario</Button> */}
              <Button action={recargarinfo} tipo={'default'}>Actualizar</Button>
              <Button action={() => navigate('/main/ordenes/nuevo')} tipo={'accept'}>Nuevo</Button>
            </div >

          </div>
        </div>
        {/* <div className="w-[200x] h-[60px] bg-slate-500 absolute bottom-4 left-4 z-40">Lista de observacione</div> */}
      </div>

    </>
  )
}
