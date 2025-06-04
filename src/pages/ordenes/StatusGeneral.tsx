import { useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { toast } from "react-toastify"
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
  const [openloader,setOpenloader] = useState(false)
  const contenedor = useRef()

  const onclick = (e) => {
    const action = e.target.dataset.action
    const id = e.target.dataset.id
    let params_modal = null
    switch (action) {
      case 'delete':
        break;
      case 'download':
        const desc = async () => {
          setOpenloader(true)
          Consulta({
            url: "produccion/exportguia/" + id, params: {
              method: 'POST'
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
        break;
      default:
        break;
    }
  }

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
              <div className="relative">
                <div className="relative z-0">
                  <div className="flex flex-row justify-center items-center mb-2">
                    {/* <div className="flex flex-row">
                      <div className="font-bold">OC:</div>
                      <div>234234</div>
                    </div> */}
                    <div className="flex flex-row items-center gap-2 relative w-full">
                      <div className="w-[100px] h-[100px] rounded-full bg-orange-400 overflow-hidden relative z-10">
                        <img src="https://jsjfact.com/facturador/imagenez/20522094120_pantalon_rubro.png" />
                      </div>
                      <div className="flex flex-row justify-between items-center flex-1">
                        <div className="flex flex-col justify-start relative z-10">
                          <div className="text-left"><strong>OC: </strong>{info[0][0].oc}</div>
                          <div className="font-extrabold text-[20px] relative z-10">{info[0][0].producto} {info[0][0].marca} {info[0][0].modelos}</div>
                        </div>
                        <div className="flex flex-row relative z-10 gap-6 pr-4">
                          <div className="flex flex-col">
                            <div className="text-[10px] font-bold">T.COMBOS</div>
                            <div className="text-[20px] italic font-black">{info[0][0].total_orden}</div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-[10px] font-bold">C.CORTE</div>
                            <div className="text-[20px] italic font-black">{info[0][0].total_corte}</div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-[10px] font-bold">D.PENDIENTES</div>
                            <div className={`text-[20px] italic font-black ${parseInt(info[0][0].dias_pendientes) < 0 ? 'text-red-500' : 'text-black'}`}>{info[0][0].dias_pendientes}</div>
                          </div>
                        </div>
                        {/* <div className={`relative z-10 text-[20px] italic pr-4 ${parseInt(info[0][0].dias_pendientes) < 0 ? 'text-red-500' : 'text-black'} font-bold`}>-234</div> */}
                      </div>
                      <div className="right-0 h-[65px] rounded-md absolute bg-gray-200 z-0 left-[20px]"></div>
                    </div>
                    {/* <div className="flex flex-row">
                      <div className="font-bold">#CORTE:</div>
                      <div>234234</div>
                    </div> */}
                  </div>
                  <div className="flex flex-row gap-2 mb-4">
                    <div className="flex flex-row justify-between flex-1 px-4">
                      <div className="text-left">
                        <div className="flex flex-row gap-2">
                          <div className="font-bold">CLIENTE:</div>
                          <div>{info[0][0].cliente}</div>
                        </div>
                        <div className="flex flex-row gap-2">
                          <div className="font-bold">MARCA:</div>
                          <div>{info[0][0].marca}</div>
                        </div>
                        <div className="flex flex-row gap-2">
                          <div className="font-bold">MODELO:</div>
                          <div>{info[0][0].modelos}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex flex-row justify-end gap-2">
                          <div className="font-bold">FEC.EMISION:</div>
                          <div>{info[0][0].fec_emitida.split('-').reverse().join('/')}</div>
                        </div>
                        <div className="flex flex-row justify-end gap-2">
                          <div className="font-bold">FEC.COMERCIAL:</div>
                          <div>{info[0][0].fec_entrega.split('-').reverse().join('/')}</div>
                        </div>
                        <div className="flex flex-row justify-end gap-2">
                          <div className="font-bold">CORTE:</div>
                          <div>{info[0][0].numero_corte}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <hr className="border-dashed" />
                    <div className="p-2">
                      <h3 className="font-bold">HISTORIAL DE SERVICIOS</h3>
                    </div>
                  </div>
                </div>
                {/* <div className="overflow-y-auto h-[400px] scrollbar-special relative z-0"> */}
                <div className="overflow-y-auto max-h-[400px] scrollbar-special relative z-0">
                  <div className="relative z-[10]">
                    {
                      info.length > 0
                      ?
                      Object.keys(info[1]).map(key=>{
                        return <>
                          <div className="p-4 text-[12px] font-extrabold relative z-10"><span className="bg-white p-[2px]">{key.split('-').reverse().join('/')}</span></div>
                          <div className="flex flex-col gap-2">
                          {
                            info[1][key].map(item=><div className={`${item.estado == 'FINALIZADO' ? 'bg-gray-400' : colorfase[item.servicio]} text-white rounded-md p-3 relative z-10`}>
                              <div className="font-extrabold pt-1 pb-2 flex flex-row justify-between">
                                <div className="text-[14px] w-[100px] text-left">#{item.idx}</div>
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
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={item.idx}>
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
                          </div>
                        </>
                      })
                      :
                      <div></div>
                    }
                    <div className="w-full top-0 h-[30px] flex flex-col justify-center items-center z-0">
                      {/* <div className="border-[.5px] border-dashed h-[30px] border-gray-400"></div> */}
                      {/* <div className="w-[15px] h-[15px] border-[4px] border-gray-500 rounded-full"></div> */}
                    </div>
                    <div className="absolute w-full top-0 bottom-0 flex flex-row justify-center z-0">
                      <div className="border-[.5px] border-dashed border-gray-400"></div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="w-[15px] h-[15px] border-[4px] border-gray-500 rounded-full"></div>
                  </div>
                  {/* <div className="absolute w-full top-0 bottom-0 flex flex-row justify-center z-0">
                    <div className="border-[.5px] border-dashed border-gray-400"></div>
                  </div> */}
                </div>
                {
                  openloader && <div className="absolute top-0 w-full h-full bg-gray-300 z-1000 flex flex-col items-center justify-center opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 loading"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                </div>
                }
              </div>
          }
        </div>
      </div>
    </>
  )
}