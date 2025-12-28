import {AdvancedMarker, APIProvider, ControlPosition, Map, MapControl, Marker, Pin} from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { toast } from 'react-toastify';
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

const ResultContentBox = ({result})=>{
  const [infoproveedor,setInfoProveedor] = useState([])
  const [showdetail,setShowdetail] = useState(false)
  useEffect(()=>{

  },[])
  const showinfo = ()=>{
    setShowdetail(true)
  }
  return(
    <>
      <div className='bg-white w-[410px] h-full flex flex-col shadow-2xl'>
        <div className='h-[100px]'></div>
        <div className='flex-1 overflow-y-auto scrollbar-special'>
          { 
            result && result.map((row,key)=>
              <div key={key} className='p-4 min-h-[150px] cursor-pointer border-b-[1px] border-b-gray-300 hover:bg-gray-100' onClick={showinfo}>
                <div className='flex flex-row gap-2'>
                  <div className='flex-1 text-left'>
                    <div className='capitalize text-[16px] font-bold text-wrap'>{row.nom}</div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className='bg-gray-200 rounded-lg w-[80px] h-[80px]'></div>
                </div>
              </div>
            )
          }
          <div className={`absolute top-[50px] ${!showdetail ? 'hidden' : ''} right-0 bottom-[20px] bg-white w-[400px] rounded-[20px] overflow-hidden shadow-2xl`} style={{transform:'translateX(420px)'}}>
            <div className='w-full'>
              <div className='realtive h-[200px] bg-emerald-300'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ControlsMap = ()=>{
  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState([])
  const [showresultbox,setShowresultbox] = useState(false)
  const [search,setSearch] = useState('')

  const clickActions = async (e)=>{
    console.log("Dentro de los clickactions!")
    setLoading(true)
    try {
      await Consulta({url: 'gpstracker/getinfo/' + search})
      .then((resp)=>{
        setResult(resp)
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
  return(
    <>      
      <MapControl position={ControlPosition.TOP_LEFT}>
        <div className={`map_controller absolute left-0 top-0 bottom-0`}>
          {
          showresultbox && <ResultContentBox result={result} />
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
        <div className="p-2">
          <div className='p-3 cursor-pointer hover:bg-gray-200 h-[30px] rounded-full bg-white border shadow-md flex flex-row justify-center items-center text-[14px] font-bold' style={{boxShadow:'0 1px 2px rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 icon icon-tabler icons-tabler-outline icon-tabler-building-store"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /></svg>
            Tiendas</div>
        </div>
      </MapControl>
      <MapControl position={ControlPosition.TOP_LEFT}>
        <div className="p-2">
          <div className='p-3 cursor-pointer hover:bg-gray-200 h-[30px] rounded-full bg-white border shadow-md flex flex-row justify-center items-center text-[14px] font-bold' style={{boxShadow:'0 1px 2px rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 icon icon-tabler icons-tabler-outline icon-tabler-wash-hand"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.486 8.965c.168 .02 .34 .033 .514 .035c.79 .009 1.539 -.178 2 -.5c.426 -.296 .777 -.5 1.5 -.5h1" /><path d="M16 8l.615 .034c.552 .067 1.046 .23 1.385 .466c.461 .322 1.21 .509 2 .5c.17 0 .339 -.014 .503 -.034" /><path d="M14 10.5l.586 .578a1.516 1.516 0 0 0 2 0c.476 -.433 .55 -1.112 .176 -1.622l-1.762 -2.456c-.37 -.506 -1.331 -1 -2 -1h-3.117a1 1 0 0 0 -.992 .876l-.499 3.986a3.857 3.857 0 0 0 2.608 4.138a2.28 2.28 0 0 0 3 -2.162v-2.338z" /><path d="M3 6l1.721 10.329a2 2 0 0 0 1.973 1.671h10.612a2 2 0 0 0 1.973 -1.671l1.721 -10.329" /></svg>
            Proveedores
          </div>
        </div>
      </MapControl>
    </>

  )
}


export default function TrackWorkers(){
  // Estado del componente o custom hook
  console.log("Reenderizado del modulo")
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
      <div className="directory flex flex-col m-2 rounded-md w-full relative border bg-white overflow-hidden">
        <APIProvider apiKey={'AIzaSyAoogN_c7uL6osdLW6doI3NJjA_8I_fJwY'}>
        {/* <APIProvider apiKey={'Your API key here'}> */}
          {/* <Map defaultZoom={10} defaultCenter={{lat: 53.54992, lng: 10.00678}}> */}
          {/* <Map mapId='f85e5903510adef7379942d5' defaultZoom={10} defaultCenter={{lat: -12.07147840019903, lng: -76.99764673360458}} center={position}> */}
          <Map mapId='f85e5903510adef7379942d5' disableDefaultUI={true} defaultZoom={15} defaultCenter={{lat: -12.07147840019903, lng: -76.99764673360458}}>
            {
              <ControlsMap/>
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
      </div>
    </>
  )
}


