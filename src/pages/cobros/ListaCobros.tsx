import { useContext, useEffect, useState } from "react";
import { Search } from "../../components/Atoms/Search/Search";
import { Consulta } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Atoms/Button/Button";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";
import { colortipoabono } from "../../utils/utils";
import { colorfase } from "../../utils/utils";

const CuerpoInforme = ({cuerpo})=>{
  return(
    <>
      <iframe src="http://192.168.18.20:4000/produccion/informe/12" className="w-[60vw] h-[60vh]"></iframe>
      {/* <div dangerouslySetInnerHTML={{ __html: cuerpo }} /> */}
    </>
  )
}
export default function ListaCobros(){
  const [info,setInfo] = useState([])
  const [estado,setEstado] = useState(0)
  const navigate = useNavigate()
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  // const [refresh,setRefresh] = useState(false)

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
    Consulta({url: 'cobros/getlista'})
    .then(resp => {
      setOpenloader(false)
      setInfo(resp)  
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
      // setOpenloader(false)
    })
  },[])

  const filtrarestado = (e)=>{
    const estado = e.target.dataset.estado

    // setEstado(estado)
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
  const nuevoabono = ()=>{
    navigate('/main/pagos/nuevo')
  }
  const showinforme = (e)=>{
    const params_modal = {
      open:true,
      content: <CuerpoInforme cuerpo={""} />,
      controls: true,
      header: false,
      action:async ()=>{
      }
    }
    openModal(params_modal)
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

  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="flex flex-col flex-1 pl-2 pr-2 pt-2 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Cuentas por cobrar</h2>
              <div className="w-[500px]">
                <Search config={{ width: '200px' }} action={busquedaglobal} />
              </div>
            </div>
          </div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll mt-2">
            <hr />
            <div>
              <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                <button className={`group ${estado == 0 ? 'active' : ''}`} data-estado={0} onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Cartera
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className={`group ${estado == 1 ? 'active' : ''}`} data-estado={1} onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Abonos
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
            </div>
            <hr />
            <div className="flex-1 scrollbar-special overflow-y-scroll">
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                <thead className="text-left sticky top-0 bg-white">
                  <tr>
                    {
                      estado == 0
                      ?
                      <>
                        <th className="lg:table-cell">#</th>
                        <th className="lg:table-cell">Documento</th>
                        <th className="lg:table-cell">Cliente</th>
                        <th className="lg:table-cell">FechaEmision</th>
                        <th className="lg:table-cell">Moneda</th>
                        <th className="lg:table-cell">VentasGravadas</th>
                        <th className="lg:table-cell">Igv</th>
                        <th className="lg:table-cell">Total</th>
                        <th className="lg:table-cell">Cancelado</th>
                        <th className="lg:table-cell">Saldo</th>
                      </>
                      :
                      <>
                        <th className="lg:table-cell">#</th>
                        <th className="lg:table-cell">FacturasRef</th>
                        <th className="lg:table-cell">EntidadBancaria</th>
                        <th className="lg:table-cell">MetodoPago</th>
                        <th className="lg:table-cell">DocumentoPago</th>
                        <th className="lg:table-cell">Moneda</th>
                        <th className="lg:table-cell">Importe</th>
                        <th className="lg:table-cell">Cancelado</th>
                        <th className="lg:table-cell">Saldo</th>
                      </>
                    }
                    <th className="lg:table-cell text-center">Accciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    info.length > 0
                      ? 
                      info.map((row, key) => (
                        <tr key={key} className="">
                          {
                            parseInt(estado) == 0 &&
                            <>
                              <td>{key + 1}</td>
                              <td>{row.DOCUMENTO + '-' + row.NUMERO}</td>
                              <td className="font-bold">{row.cliente.substr(0,45) ?? '-'}</td>
                              <td>{row.fec_ope}</td>
                              <td>{row.tip_mon}</td>
                              <td className="font-black text-green-600">{row.vta_gra.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-black text-green-600">{row.sum_igv.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-black text-green-600">{row.tot_vta.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-black">S/.0</td>
                              <td className="font-black text-red-600">{row.tot_vta.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                            </>
                          }
                          {
                            parseInt(estado) == 1 &&
                            <>
                              <td>{key + 1}</td>
                              <td>{row.facturas}</td>
                              <td>{row.entidad_bancaria}</td>
                              <td>{row.tipo_operacion}</td>
                              <td>{row.num_operacion}</td>
                              <td>{row.moneda == 'S' ? 'PEN' : 'USD'}</td>
                              <td className="font-black text-green-600">{(row.facturas_importe ?? 0).toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-black text-green-600">{(row.importe ?? 0).toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}
                              </td>
                              <td className="font-black text-red-600">{(row.facturas_importe - row.importe).toLocaleString('es-PE', {
                                style: 'currency',
                                currency: 'PEN',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}
                              </td>
                            </>
                          }
                          <td className="w-[250px]">
                            <ul className="flex flex-row justify-end">
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx} data-origen={estado ? 'abonos' : 'obligaciones'}>
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
                                  {
                                    estado == 1
                                    ?
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                    :
                                      <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M3 10h18" /><path d="M16 19h6" /><path d="M19 16l3 3l-3 3" /><path d="M7.005 15h.005" /><path d="M11 15h2" /></svg>
                                  }
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
                    <td className="h-[45px] border-t border-t-gray-600" colSpan={estado == 3 ? 13 : 12}>
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
            <div className="flex flex-row justify-end mt-2">
              <div className="flex gap-2">
                <Button action={recargarinfo} tipo={'default'}>Actualizar</Button>
                {/* <Button action={nuevoabono} tipo={'accept'}>Nuevo</Button> */}
              </div>
            </div >
          </div>
        </div>
      </div>
    </>
  )
}