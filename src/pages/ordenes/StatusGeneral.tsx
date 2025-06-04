import { useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
const colorfase = {
  'ORDENES':'bg-green-400',
  'CONFECCION':'bg-purple-400',
  'ESTAMPADO':'bg-gray-400',
  'ACABADOS':'bg-red-400',
  'LAVANDERIA':'bg-green-400',
  'MOLDES':'bg-orange-400',
  'OJAL':'bg-blue-400',
  'CORTE':'bg-rose-400',
  'BORDADO':'bg-yellow-400',
  'FINALIZADO':'bg-gray-400'
}
export default function StatusGeneral({id}){
  const [loading,setLoading] = useState(true)
  const [info,setInfo] = useState([])
  const contenedor = useRef()
  useEffect(()=>{
    const action = async ()=>{
      setLoading(true)
      Consulta({url:'ordenes/getstatusgeneral/' + id,params:{
        method:'POST'
      }})
      .then(resp=>{
        console.log("La informacion general es:",resp)
        setInfo(resp)
        setLoading(false)
      })
      .catch(error=>{

      })
    }
    action()
  },[])
  return(
    <>
      <div className="flex flex-col pb-4">
        <div ref={contenedor} className="flex flex-col text-[12px] w-[1100px] pl-2 pr-2 focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black [&_input]:text-center [&_input]:p-[2px]">
          {
            loading
            ? 
              <div className={`flex justify-center w-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 loading"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 1 0 9 9" /></svg>
              </div>
            :
            <>
              <div>
                <div className="flex flex-row justify-between items-center mb-2">
                  <div className="flex flex-row">
                    <div className="font-bold">OC:</div>
                    <div>234234</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-[100px] h-[100px] rounded-full bg-orange-400 overflow-hidden">
                      <img src="https://jsjfact.com/facturador/imagenez/20522094120_pantalon_rubro.png" />
                    </div>
                    <div className="font-bold">{info[0][0].producto} {info[0][0].marca} {info[0][0].modelos}</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="font-bold">#CORTE:</div>
                    <div>234234</div>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row justify-between flex-1">
                    <div className="text-left">
                      <div>POLO - TRIPACK MAYO 2025</div>
                      <div>MARCA: ELENEX</div>
                      <div>RUTA:MOLDE-CONFECCON-ESTAMAD-LANVADERIA</div>
                      <div>ESTADO:LAVANDERIA</div>
                    </div>
                    <div className="text-right">
                      <div>POLO - TRIPACK MAYO 2025</div>
                      <div>MARCA: ELENEX</div>
                      <div>RUTA:MOLDE-CONFECCON-ESTAMAD-LANVADERIA</div>
                      <div>ESTADO:LAVANDERIA</div>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <h3>Historial de Servicios</h3>
                </div>
              </div>
              <div className="overflow-y-auto h-[400px] scrollbar-special relative">
                <div className="relative z-[10]">
                {
                  info.length > 0
                  ?
                  Object.keys(info[1]).map(key=>{
                    return <>
                      <div className="p-4 text-[12px] font-extrabold"><span className="bg-white p-[2px]">{key.split('-').reverse().join('/')}</span></div>
                      {
                        info[1][key].map(item=><div className={`${colorfase[item.servicio]} text-white rounded-md p-3`}>
                          <div className="font-extrabold pt-1 pb-2 flex flex-row justify-between">
                            <div className="text-[10px] w-[100px] text-left">{item.tiempo_produccion}</div>
                            <div className="flex-1">{item.servicio}</div>
                            <div className="text-[10px] w-[100px] text-right">{item.estado}</div>
                            {/* <div className="flex flex-col items-center justify-center">
                            </div> */}
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-bold">Proveedor</div>
                              <div className="text-[14px] font-bold">{item.proveedor}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-bold">FecEmision</div>
                              <div className="text-[14px] font-bold">{item.fec_emision_guia}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-bold">FecRetorno</div>
                              <div className="text-[14px] font-bold">{item.fec_retorno_guia}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-bold">Costo</div>
                              <div className="text-[14px] font-bold">{item.costo}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-bold">Cantidad</div>
                              <div className="text-[14px] font-bold">{item.cantidad_servicio}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-bold">DiasPendiente</div>
                              <div className={`text-[14px] font-bold ${parseInt(item.dias_pendientes) < 0 ? 'text-red-500' : 'text-white'}`}>{item.dias_pendientes}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-bold">Ingresos</div>
                              <div className="text-[14px] font-bold">{item.ingresos}</div>
                            </div>
                            {/* {item.servicio} - {item.modelo} */}
                          </div>
                          <div>
                            <ul className="flex flex-row justify-end">
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="show" onClick={()=>{}} >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" onClick={() => { }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}} >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                </div>
                              </li>
                            </ul>

                          </div>
                        </div>)
                      }
                    </>
                  })
                  :
                  <div></div>
                }
                  <div className="w-full h-[50px] top-0 flex flex-row justify-center z-0">
                    <div className="border-[.5px] border-dashed border-gray-400"></div>
                  </div>
                </div>
                <div className="absolute w-full h-full top-0 flex flex-row justify-center z-0">
                  <div className="border-[.5px] border-dashed border-gray-400"></div>
                </div>
              </div>
            </>
          }
          
        </div>
      </div>
    </>
  )
}