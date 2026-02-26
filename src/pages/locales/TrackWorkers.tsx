import {AdvancedMarker, APIProvider, ControlPosition, Map, MapControl, Marker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Consulta } from '../../utils/utils';

const supabase = createClient('https://tecmrahsqeoqkfqagbwp.supabase.co', 'sb_publishable_qtX58T-ZvZlkoYybfQgrAQ_lvZbbu-M')
const RECORRIDO = [
  { latitud: -12.0743177, longitud: -76.9916131 },
  { latitud: -12.0738623, longitud: -76.9919703 },
  { latitud: -12.0734069, longitud: -76.9923275 },
  { latitud: -12.0729515, longitud: -76.9926847 },
  { latitud: -12.0724961, longitud: -76.9930419 },
  { latitud: -12.0720407, longitud: -76.9933991 },
  { latitud: -12.0715853, longitud: -76.9937563 },
  { latitud: -12.0711299, longitud: -76.9941135 },
  { latitud: -12.0706745, longitud: -76.9944707 },
  { latitud: -12.0702193, longitud: -76.9948276 }  // Punto 10 (Final)
];

export function TrackWorkers__(){
  const [contador,setContador] = useState(0)
  const [position,setPosition] = useState(0)
  const [meta,setMeta] = useState(0)
  const [reposition,setReposition] = useState({
    acumulado:0,
    idanimate:null,
    contador:0,
    meta:10,
    delta:0
  })

  const animate = useCallback((delta)=>{
    let idanimate = null
    let acumulado = 0
    
    console.log("Tomate",delta)
    setReposition(prev=>{
      console.log("Lady bu",prev)
      let contador = prev.contador

      if(prev.acumulado >= 1000){
        // console.log("Ejecutando",prev.)
        if(contador >= prev.meta){
          console.log("Cancelando")
          cancelAnimationFrame(prev.idanimate)
        }else{
          contador += 1
        }
        acumulado = 0
      } else {
        console.log("Munra",prev.delta)
        acumulado += (delta - prev.delta)
        idanimate = requestAnimationFrame(animate)
      }
      return {
        ...prev,
        acumulado: acumulado,
        idanimate: idanimate,
        contador: contador,
        delta:delta
      }
    })
  },[])

  // const men = useRef(0)
  // const otro = (delta)=>{
  //   console.log("Las noticias son:",delta,delta - men.current)
  //   men.current = delta
  //   requestAnimationFrame(otro)
  // }

  const actions = ()=>{
    // setReposition(prev=>({...prev,meta:prev.meta + 10}))
    requestAnimationFrame(animate)
    // requestAnimationFrame(otro)
  }
  useEffect(()=>{

  },[])

  return(
    <div>
      <button onClick={actions}>CLickMe!</button>
      {position}
    </div>
  )
}
export function TrackWorkers_1(){
  const [position,setPosition] = useState({ latitud: -12.0743177, longitud: -76.9916131 })
  // const [contador,setContador] = useState(0)
  const contador = useRef(0)
  const [newposition,setNewPosition] = useState(0)
  const anterior = useRef(0)
  const acumulado = useRef(0)
  const pos = useRef(0)
  const frames = 20
  const pk = 1000 / frames

  console.log("Recreando componente")
  const test = useCallback(()=>{
    console.log("Recreando funcion nuevamente")
  },[])
   
  const moverSmooth = useCallback((delta)=>{
    const diferencia = delta - anterior.current
    anterior.current = delta
    acumulado.current += diferencia

    if(acumulado.current > 500){
      if(contador.current > pos.current){
        console.log("Mostrando info",diferencia)
        setNewPosition(res=>res+1)
        pos.current += 1
      } else {
        pos.current = contador.current
      }
      // position && setNewPosition(position)
      acumulado.current = 0
    }
    requestAnimationFrame(moverSmooth)
  },[])
  
  useEffect(()=>{
    requestAnimationFrame(moverSmooth)
  },[moverSmooth]) 
  // requestAnimationFrame(moverSmooth)

  // const kk = useCallback(()=>{

  // }

  const pp = async ()=>{
    const ff = RECORRIDO.shift()
    new Promise((resolve,reject)=>{
      setTimeout(async ()=>{
        // const { data, error } = await supabase
        // .from('testgps')
        // .update({ latitud: ff.latitud, longitud: ff.longitud })
        // .eq('id', 1)
        // .select()
        setPosition(ff)
        resolve('Hola')          
      },2000)
    })
    .then(resp=>{
      console.log("La respuesta es:",resp)
      if(RECORRIDO.length > 0) pp()
    })
  }
  // pp()
  return(
    <>
      <div className="directory flex flex-col m-2 rounded-md w-full relative bg-white overflow-hidden">
        {/* <button onClick={()=>setContador(num=>num+10)}>CLick Me!</button> */}
        <button onClick={()=>contador.current += 10}>CLick Me!</button>
        {newposition}
        {/* {contador} */}
        {
          // newposition && (`hola mundo : ${newposition?.latitud ?? 0}-${newposition?.longitud ?? 0}`)
        }
      </div>
    </>
  )
}

const DetailResultContextBox = ({setshowdetail})=>{
  const [tabposition,setTabposition] = useState('1')
  const [procesos,setProcesos] = useState([])
  const closeDetailResult = ()=>{
    setshowdetail(false)
  }
  useEffect(()=>{
    const pp = Consulta({url:'locales/getprocesosencurso/1'})
    pp.then(resp=>{
      console.log("aasdffd",resp)
      setProcesos(resp)
    })
    console.log("asfas",pp)
  },[])
  return(
    <>
      <div className={`absolute top-[50px] right-0 bottom-[20px] bg-white w-[400px] rounded-[20px] overflow-hidden shadow-2xl`} style={{transform:'translateX(420px)'}}>
        <div className='w-full h-full text-[14px] overflow-y-auto overflow-x-hidden scrollbar-special'>
          <div className='realtive h-[200px] bg-emerald-300 bg-no-repeat bg-cover' style={{backgroundImage:"url('https://picsum.photos/400/300')"}}>
            <div className='absolute w-[38px] h-[38px] bg-white rounded-full flex flex-row justify-center items-center cursor-pointer shadow-xl right-4 top-4 hover:bg-gray-100' onClick={closeDetailResult}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </div>
          </div>
          <div>
            <div className='px-5 pt-5 pb-2 text-left'>
              <div className='text-[22px]' style={{fontWeight:'500'}}>Telas Aladin</div>
              <div className='pt-2'>4,0 {`(1495)`}</div>
            </div>
            <div>
              <div>
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
                      <li className='flex flex-row gap-4 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>
                        <span>Av. San Luis 2599, San Borja 15037</span>
                      </li>
                      <li className='flex flex-row gap-4 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                        <span>Abre a las 9:00 am</span>
                      </li>
                      <li className='flex flex-row gap-4 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"/></svg>
                        <span>telasaladino.com</span>
                      </li>
                      <li className='flex flex-row gap-4 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
                        <span>(01) 4310548</span>
                      </li>
                    </ul>
                    <hr />
                  </div>
                }
                {
                  tabposition == '2' && <div className='h-[800px] w-full p-2 flex flex-col gap-2'>
                    {
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
                          <div className='flex gap-3'>
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
                          </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const ResultContentBox = ({result,changepositionmap})=>{
  const [infoproveedor,setInfoProveedor] = useState([])
  const [showdetail,setShowdetail] = useState(false)
  useEffect(()=>{

  },[])
  const showinfo = (e)=>{
    const id = e.target.dataset.id
    const info = result[id].info[0]
    setShowdetail(true)
    changepositionmap({lat:info.latitud,lng:info.longitud})
  }
  return(
    <>
      <div className='bg-white w-[410px] h-full flex flex-col shadow-2xl'>
        <div className='h-[100px]'></div>
        <div className='flex-1 overflow-y-auto scrollbar-special'>
          { 
            result && result.map((row,key)=>
              <div key={key} className='p-4 min-h-[150px] cursor-pointer border-b-[1px] border-b-gray-300 hover:bg-gray-100' data-id={key} onClick={showinfo}>
                <div className='flex flex-row gap-2 pointer-events-none'>
                  <div className='flex-1 text-left'>
                    <div className='capitalize text-[16px] font-bold text-wrap'>{row.nom}</div>
                    <div>{row.idx}</div>
                    <div>{JSON.stringify(row)}</div>
                    <div></div>
                  </div>
                  {/* <div className='bg-gray-200 rounded-lg w-[80px] h-[80px]'></div> */}
                </div>
              </div>
            )
          }
          {showdetail && <DetailResultContextBox setshowdetail={setShowdetail} />}
          {/* <div className={`absolute top-[50px] ${!showdetail ? 'hidden' : ''} right-0 bottom-[20px] bg-white w-[400px] rounded-[20px] overflow-hidden shadow-2xl`} style={{transform:'translateX(420px)'}}>
            <div className='w-full'>
              <div className='realtive h-[200px] bg-emerald-300 '>
                <div className='absolute w-[40px] h-[40px] bg-white rounded-full flex flex-row justify-center items-center cursor-pointer shadow-xl right-4 top-4 hover:bg-gray-100'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

const ControlsMap = ({talleres,settalleres})=>{
  const map = useMap()
  const core = useMapsLibrary('core')
  const [loading,setLoading] = useState(false)
  // const [result,setResult] = useState([])
  const [showresultbox,setShowresultbox] = useState(false)
  const [search,setSearch] = useState('')

  const clickActions = async (e)=>{
    console.log("Dentro de los clickactions!")
    setLoading(true)
    try {
      await Consulta({url: 'locales/getlocalesseguimiento/' + search})
      .then((resp)=>{
        settalleres(resp)
        setShowresultbox(true)
        console.log("El resultado de la consulta es:",resp)
      })
      .catch((err)=>{
        console.log("Otro mensaje de error",err)
      })
      
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false) 
    }
  }
  const clearsearch = ()=>{
    setShowresultbox(false)
  }
  
  const onchange = (e)=>{
    setSearch(e.target.value)
    console.log("Mostradno filtro ingresado:",e.target.value)
  }
  const changepositionmap = (new_position)=>{
    const projection = map.getProjection()
    const worldPoint = projection.fromLatLngToPoint(new_position)
    const scale = Math.pow(2, map.getZoom());
    const pixelOffset = new core.Point(350 / scale, 0);
    const newWorldPoint = new core.Point(worldPoint.x - pixelOffset.x, worldPoint.y + pixelOffset.y)
    const newCenter = projection.fromPointToLatLng(newWorldPoint);
    map?.panTo(newCenter);
  }
  return(
    <>      
      <MapControl position={ControlPosition.TOP_LEFT}>
        <div className={`map_controller absolute left-0 top-0 bottom-0`}>
          {
          showresultbox && <ResultContentBox result={talleres} changepositionmap={changepositionmap} />
          }
        </div>
      </MapControl>
      <MapControl position={ControlPosition.TOP_LEFT}>
        <div className={`w-[380px] has-[:focus]:h-[400px] has-[:focus]:rounded-[20px] has-[:focus]:border-gray-300 has-[:focus]:bg-white overflow-hidden m-[15px] z-[10] ${!showresultbox && 'shadow-lg'} rounded-full`}>
          <div className='rounded-full bg-white border border-gray-300 py-3 px-[18px] flex flex-row items-center gap-6 has-[:focus]:rounded-none has-[:focus]:border-0 has-[:focus]:border-b-[1px]'>
            <div className='flex flex-col gap-[3px] [&_div]:h-[2px] [&_div]:w-[20px] [&_div]:bg-gray-500'>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className='flex-1'>
              <input className='my-input w-full h-[25px] text-[15px] placeholder:text-gray-500 focus:outline-none' placeholder='Buscar en' value={search} onChange={onchange} type='text' />
            </div>
            <div className='cursor-pointer'>
              {loading 
                ?
                  <div className={`${loading ? 'circle_loading' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                  </div>
                :
                  <div onClick={clickActions}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                  </div>
              }
            </div>
            {
              showresultbox && <div onClick={clearsearch} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
              </div>
            }
          </div>
        </div>
      </MapControl>
      <MapControl position={ControlPosition.TOP_LEFT}>
        <div className="p-4">
          <div className='p-3 cursor-pointer hover:bg-gray-200 h-[30px] rounded-full bg-white border shadow-md flex flex-row justify-center items-center text-[14px] font-bold' style={{boxShadow:'0 1px 2px rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 icon icon-tabler icons-tabler-outline icon-tabler-building-store"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /></svg>
            Tiendas</div>
        </div>
      </MapControl>
      <MapControl position={ControlPosition.TOP_LEFT}>
        <div className="p-4">
          <div className='p-3 cursor-pointer hover:bg-gray-200 h-[30px] rounded-full bg-white border shadow-md flex flex-row justify-center items-center text-[14px] font-bold' style={{boxShadow:'0 1px 2px rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 icon icon-tabler icons-tabler-outline icon-tabler-wash-hand"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.486 8.965c.168 .02 .34 .033 .514 .035c.79 .009 1.539 -.178 2 -.5c.426 -.296 .777 -.5 1.5 -.5h1" /><path d="M16 8l.615 .034c.552 .067 1.046 .23 1.385 .466c.461 .322 1.21 .509 2 .5c.17 0 .339 -.014 .503 -.034" /><path d="M14 10.5l.586 .578a1.516 1.516 0 0 0 2 0c.476 -.433 .55 -1.112 .176 -1.622l-1.762 -2.456c-.37 -.506 -1.331 -1 -2 -1h-3.117a1 1 0 0 0 -.992 .876l-.499 3.986a3.857 3.857 0 0 0 2.608 4.138a2.28 2.28 0 0 0 3 -2.162v-2.338z" /><path d="M3 6l1.721 10.329a2 2 0 0 0 1.973 1.671h10.612a2 2 0 0 0 1.973 -1.671l1.721 -10.329" /></svg>
            Talleres
          </div>
        </div>
      </MapControl>
    </>

  )
}

export default function TrackWorkers(){
  // Estado del componente o custom hook
  console.log("Reenderizado del modulo")
  const [talleres,setTalleres] = useState([])
  const [defaultposition,setDefaultPosition] = useState({lat: -12.07147840019903, lng: -76.99764673360458}) 
  const [markerState, setMarkerState] = useState({
    // Posición actual (donde se dibuja el marcador)
    currentPosition: { lat: 0, lng: 0 }, 
    // La última coordenada conocida y su tiempo de recepción
    startPoint: { lat: 0, lng: 0, timestamp: 0 }, 
    // La siguiente coordenada a la que se dirige el marcador
    endPoint: { lat: 0, lng: 0, timestamp: 0 }, 
    // Duración estimada del movimiento (e.g., 2 segundos)
    duration: 2000, 
    // ID del rAF para poder cancelarlo
    animationFrameId: null, 
  });
  const lerp = (a, b, t) => a + (b - a) * t;
  const animateMarker = useCallback((timestamp) => {
    setMarkerState(prevState => {
      console.log("Dentro de la animacion",)
      const { startPoint, endPoint, duration, animationFrameId } = prevState;

      
      // Si no hay un punto final o el punto de inicio es inválido, detener la animación
      if (!endPoint.timestamp || startPoint.timestamp === 0) {
        cancelAnimationFrame(animationFrameId);
        return prevState;
      }

      // 1. Calcular el tiempo transcurrido REAL desde que se recibió el endPoint
      // El 'timestamp' del rAF no es útil aquí. Usamos el tiempo real para sincronizar.
      const timeElapsed = timestamp - startPoint.timestamp;
      console.log("Variables de timeElapsed :",timestamp,startPoint.timestamp)
      // 2. Calcular el progreso (t) como un valor entre 0 y 1
      // Usamos 'Math.min' para asegurar que el progreso no exceda 1 (100%)
      const progress = Math.min(1, timeElapsed / duration);
      console.log("Valor de progress :",progress)

      // Si la pestaña estuvo en segundo plano, 'timeElapsed' será un valor muy grande,
      // y 'progress' saltará inmediatamente a 1 (o cerca de 1), resolviendo la desincronización.

      let newPosition;
      let nextAnimationFrameId = animationFrameId;

      if (progress < 1) {
        // 3. Interpolación: Calcular la nueva Latitud y Longitud
        const newLat = lerp(startPoint.lat, endPoint.lat, progress);
        const newLng = lerp(startPoint.lng, endPoint.lng, progress);
        newPosition = { lat: newLat, lng: newLng };

        // Continuar animando
        nextAnimationFrameId = requestAnimationFrame(animateMarker);
        
      } else {
        // 4. Animación Completa: Establecer la posición final
        newPosition = { lat: endPoint.lat, lng: endPoint.lng };
        // Detener la animación hasta que se reciba el siguiente punto
        cancelAnimationFrame(animationFrameId);
        nextAnimationFrameId = null;

        // *Opcional: aquí podrías revisar si tienes más puntos en una cola
        // y comenzar la animación al siguiente punto*
      }

      return { 
        ...prevState, 
        currentPosition: newPosition,
        animationFrameId: nextAnimationFrameId 
      };
    });
  },[]);
  const handleNewServerPosition = useCallback((newCoords) => {
    setMarkerState(prevState => {
      console.log("El estado anterior es:",prevState)
      // La coordenada anterior se convierte en el nuevo punto de partida
      // const newStartPoint = prevState.endPoint.timestamp === 0 
      //   ? { ...newCoords, timestamp: performance.now() - prevState.duration }
      //   : prevState.endPoint;
      const newStartPoint = prevState.endPoint.timestamp === 0 
        ? { ...newCoords, timestamp: performance.now() }
        : prevState.endPoint;

      // La nueva coordenada del servidor es el objetivo
      // const newEndPoint = { ...newCoords, timestamp: Date.now() };
      const newEndPoint = { ...newCoords, timestamp: performance.now() };

      console.log("Duracion respuesta del servidor:",newEndPoint.timestamp - newStartPoint.timestamp)

      // Si ya hay una animación en curso, la detenemos
      if (prevState.animationFrameId) {
        console.log("DEntro de cancel animation")
        cancelAnimationFrame(prevState.animationFrameId);
      }
      
      // Iniciar la nueva animación
      const newAnimationId = requestAnimationFrame(animateMarker);
      console.log("El id de la animacion es:",newAnimationId,180588)

      return { 
        ...prevState,
        startPoint: newStartPoint,
        endPoint: newEndPoint,
        animationFrameId: newAnimationId,
        // duration:performance.now()
      };
    });
  },[]);
  // const [position,setPosition] = useState({lat:-12.0743177,lng:-76.9916131})
  
  useEffect(()=>{
    console.log("Ejecutando el efecto neuvamenteo")
    const handleRealtimeChanges = (payload) => {
      handleNewServerPosition({lat:payload.new.latitud,lng:payload.new.longitud})
      // console.log('Cambio recibido:', payload)
      // setTimeout(()=>{
      //   setPosition({lat:payload.new.latitud,lng:payload.new.longitud})
      // },2000)
      // setMarkerState({
      //   currentPosition: { lat: payload.new.latitud, lng: payload.new.longitud }, 
      //   startPoint: { lat: 0, lng: 0, timestamp: 0 }, 
      //   endPoint: { lat: 0, lng: 0, timestamp: 0 }, 
      //   duration: 2000, 
      //   animationFrameId: null
      // })
    }

    // Suscripción para escuchar cambios en la tabla 'nombre_de_mi_tabla'
    const channel = supabase
      .channel('schema-db-changes') // Nombre único para tu canal
      .on(
        'postgres_changes', // Tipo de evento para cambios en la base de datos
        { 
          event: '*', // Escuchar todos los eventos (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'testgps' // Reemplaza con el nombre de tu tabla
        },
        handleRealtimeChanges
      )
      .subscribe()

    // Opcional: Asegúrate de eliminar el canal cuando ya no sea necesario 
    // (p. ej., al desmontar un componente en React/Vue)
    return () => {
      console.log("Removiendo canal")
      supabase.removeChannel(channel)
    }
  },[])
  return(
    <>
      {/* <div className="directory flex flex-col m-2 rounded-md w-full relative border bg-white overflow-hidden"> */}
      <div className='notpadding h-full'>
        <APIProvider apiKey={'AIzaSyAoogN_c7uL6osdLW6doI3NJjA_8I_fJwY'}>
        {/* <APIProvider apiKey={'Your API key here'}> */}
          {/* <Map defaultZoom={10} defaultCenter={{lat: 53.54992, lng: 10.00678}}> */}
          {/* 3f1c80801592fe5c50c80d70 */}
          <Map mapId='f85e5903510adef7379942d5' disableDefaultUI={true} defaultZoom={15} defaultCenter={{lat: -12.07147840019903, lng: -76.99764673360458}} >
          {/* <Map mapId='f85e5903510adef7379942d5' disableDefaultUI={true} defaultZoom={15} defaultCenter={defaultposition}> */}
            {
              <ControlsMap talleres={talleres} settalleres={setTalleres}/>
            }
            {
              markerState.currentPosition.lat !== 0 &&
              <AdvancedMarker 
                position={markerState.currentPosition} 
              >
                <div className='w-[25px] h-[25px] bg-red-500 rounded-full'>
                </div>
              </AdvancedMarker>
            }
            {
              talleres.length > 0 && talleres.map(taller=>
                <AdvancedMarker position={{lat: taller.info[0].latitud, lng: taller.info[0].longitud}}>
                  <div className='w-[25px] h-[25px] bg-white rounded-full'>
                    {/* <img src={'/src/assets/elenex.svg'} width={32} height={32} /> */}
                    {/* <div className='w-[50px] h-[50px] rounded-full bg-purple-400'></div> */}
                    <Pin
                      // background={'#0f9d58'}
                      // borderColor={'#006425'}
                      glyphColor={'black'}
                      glyphText={'Telas Aladino'}
                    />
                    {/* <div>Telas Aladino</div> */}
                  </div>
                </AdvancedMarker>
              )
            }

            <AdvancedMarker 
              position={{lat: -12.07147840019903, lng: -76.99764673360458}} 
            >
              {/* <img src={'./src/assets/elenex.svg'} width={32} height={32} /> */}
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
              {/* <Pin
                background={'#0f9d58'}
                borderColor={'#006425'}
                glyphColor={'#60d98f'}
              /> */}
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.113461866735673, lng: -76.99149822994535}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.066662951826835, lng: -77.01363371945794}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.231033838620396, lng: -76.9106640720046}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            {/* <AdvancedMarker 
              position={{lat: -12.055156819369076, lng: -76.97134263637695}} 
            > */}
            <AdvancedMarker 
              position={{lat: -12.05515681, lng: -76.97134263}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full relative'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
                <div className='absolute bg-orange-400 w-[100px] h-[100px]'></div>
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.084073218673883, lng: -77.01383923063428}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.180259020257592, lng: -76.94211653469253}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.066772095149142, lng: -77.01354243616402}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.055594746880518, lng: -77.10222622912386}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.067448564564154, lng: -77.01331740757472}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.00643910266651, lng: -77.00393967859632}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -11.936736938802214, lng: -77.06523677114856}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
          </Map>
        </APIProvider>        
      {/* </div> */}
      </div>
    </>
  )
}


