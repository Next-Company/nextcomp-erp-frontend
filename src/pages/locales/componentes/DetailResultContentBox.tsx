import { useEffect, useRef, useState } from "react"
import { Consulta } from "../../../utils/utils"

export default function DetailResultContentBox({info,setshowdetail}) {
  console.log()
  const [tabposition,setTabposition] = useState('1')
  const [procesos,setProcesos] = useState([])
  const [loading,setLoading] = useState(false)
  const contenedor = useRef(null)
  // const [info,setInfo] = useState(taller)
  // const [tallerid,setTallerId] = useState(taller.idx)
  const closeDetailResult = ()=>{
    setshowdetail(false)
  }
  useEffect(()=>{
    console.log("Dentro de la seccion detalle del taller!!!")
    const callback = (entries,observer)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting){
          console.log("Salio de la vista",entry)
          entry.target.querySelector('.title_special').classList.remove('op0')
        }else{
          console.log("otra opcion de intersected")
          entry.target.querySelector('.title_special').classList.add('op0')
        }
      })
    }
    const options = {
      root: document.querySelector('.bobr'),
      threshold:1.0
    }
    const io = new IntersectionObserver(callback,options)
    if(contenedor.current) io.observe(document.querySelector('.head_detail'))
    return ()=>{
      io.disconnect()
    }
  },[])
  useEffect(()=>{
    console.log("Buscando nueva informacion del taller",info)
    // setLoading(true)

    // Consulta({url:'locales/getprocesosencurso/1'})
    // .then(resp=>{

    // })
    // .catch(err=>{

    // })
    // .finally(()=>{
    //   setLoading(false)
    // })
    setLoading(true)
    const pp = Consulta({url:'locales/getprocesosencurso/1'})
    pp.then(resp=>{
      console.log("aasdffd",resp)
      setProcesos(resp)
      setLoading(false)
    })
    // console.log("asfas",pp)
  },[info])
  return(
    <>
      <div className={`bobr viewtransition absolute top-[50px] right-0 bottom-[20px] bg-white w-[400px] rounded-[20px] overflow-hidden shadow-2xl`} style={{transform:'translateX(420px)'}}>
        <div ref={contenedor} className='w-full h-full text-[14px] overflow-y-auto overflow-x-hidden scrollbar-special'>
          <div className='head_detail realtive h-[200px] bg-emerald-300 bg-no-repeat bg-cover' style={{backgroundImage:"url('https://picsum.photos/400/300')"}}>
            <div className='absolute w-[38px] h-[38px] bg-white rounded-full flex flex-row justify-center items-center cursor-pointer right-4 top-2 hover:bg-gray-100 z-20' onClick={closeDetailResult}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </div>
            <div className="absolute text-[18px] w-full z-10 bg-white top-0 p-4 font-bold title_special op0">{info.nombre_local}</div>
          </div>
          <div className='px-5 pt-5 pb-2 text-left'>
            <div className='text-[20px]' style={{fontWeight:'500'}}>{info.nombre_local}</div>
            <div className='pt-2'>4,0 {`(1495)`}</div>
          </div>
          <div className="sticky top-[50px] bg-white">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-[25px] [&_button]:pr-[25px] [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${tabposition == '1' ? 'active' : ''}`} data-tabposition="1" onClick={()=>setTabposition('1')}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  General
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${tabposition == '2' ? 'active' : ''}`} data-tabposition="2" onClick={()=>setTabposition('2')}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Servicios
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${tabposition == '3' ? 'active' : ''}`} data-tabposition="3" onClick={()=>setTabposition('3')}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Pedidos
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${tabposition == '4' ? 'active' : ''}`} data-tabposition="4" onClick={()=>setTabposition('4')}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Auditorias
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${tabposition == '5' ? 'active' : ''}`} data-tabposition="5" onClick={()=>setTabposition('5')}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Otros
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
          </div>
          <hr/>
          <div>
            {
              tabposition == '1' && <div className='w-full'>
                <ul className='[&_li]:px-[20px] [&_li]:py-[10px] [&_li:hover]:bg-gray-100 [&_li]:cursor-pointer my-4'>
                  <li className='flex flex-row gap-4 items-center text-left'>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>
                    </div>
                    <span>{info.direccion}</span>
                  </li>
                  <li className='flex flex-row gap-4 items-center'>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                    </div>
                    <span>-</span>
                  </li>
                  <li className='flex flex-row gap-4 items-center'>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"/></svg>
                    </div>
                    <span>{info.web ?? '-'}</span>
                  </li>
                  <li className='flex flex-row gap-4 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
                    <span>{info.telefono ?? '-'}</span>
                  </li>
                </ul>
                <hr />
              </div>
            }
            {
              tabposition == '2' && <div className='h-[800px] w-full p-2 flex flex-col gap-2'>
                {
                  loading 
                  ? 
                    'Cargando...'
                  :
                  procesos[0].map(row=>
                    <div className='rounded-2xl bg-gray-400 text-[12px] p-3 flex flex-col gap-2'>
                      <div className='[&_div:first-child]:text-[10px] [&_div:first-child]:font-black text-left'>
                        <div>Tipo</div>
                        <div>{row.tipo}</div>
                      </div>
                      <div className='[&_div:first-child]:text-[10px] [&_div:first-child]:font-black text-left'>
                        <div>Proveedor</div>
                        <div>{row.proveedor.slice(0,45) + '...'}</div>
                      </div>
                      {/* <div className='flex gap-3'>
                        <div className='[&_div:first-child]:text-[10px] [&_div:first-child]:font-black text-left'>
                          <div>FecEmision</div>
                          <div>{row.fec_emision}</div>
                        </div>
                        <div className='[&_div:first-child]:text-[10px] [&_div:first-child]:font-black text-left'>
                          <div>FecRetorno</div>
                          <div>{row.fec_retorno}</div>
                        </div>
                        <div className='[&_div:first-child]:text-[10px] [&_div:first-child]:font-black text-left'>
                          <div>Responsable</div>
                          <div>{row.responsable}</div>
                        </div>
                      </div> */}
                    </div>
                  )
                }
              </div>
            }
            {
              tabposition == '3' && <div className='h-[800px] w-full'>
                Contenido3
              </div>
            }
            {
              tabposition == '4' && <div className='h-[800px] w-full'>
                Contenido4
              </div>
            }
          </div>
          <div className="">
            {/* <div className="sticky top-0">
              
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}