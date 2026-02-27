import { ControlPosition, MapControl, useMap, useMapsLibrary } from "@vis.gl/react-google-maps"
import { useState } from "react"
import { Consulta } from "../../../utils/utils"
import ResultContentBox from "./ResultContentBox"

export default function ControlsMap({talleres,settalleres}) {
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