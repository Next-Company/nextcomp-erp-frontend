import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { toast } from "react-toastify"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
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

const CuerpoServicio = ({info,openloader,myfase,fase})=>{
  // const {openModal,setOpen} = useContext(ModalWindowContext)
  console.log("El cuerpo del servicio es:",info)
  const onclick = (e)=>{
    const action = e.target.dataset.action
    const id = e.target.dataset.id
    // console.log("Los datos recuperados son :",action,id)
    switch(action){
      case 'download':
        openloader(true)
        Consulta({
          url: "produccion/exportguia/" + id + "/1", params: {
            method: 'GET'
          }
        })
          .then(resp => {
            openloader(false)
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
            openloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })
        break
      case 'show':
        console.log("Mostrando la vista rapida del reporte")
        break
      default:
        break
    }
  }
  return(
    <>
      {/* <div className="flex-1 bg-green-300"> */}
        <div className="px-2 py-1">
          {/*<div className={` ${info.estado == 'FINALIZADO' ? 'bg-slate-500' : colorfase[info.servicio]} text-white rounded-xl p-3 relative z-10 cursor-pointer hover:opacity-80`}>*/}
          <div className={`${colorfase[info.servicio]} text-white rounded-xl p-3 relative z-10 cursor-pointer hover:opacity-80`}>
            <div className="font-extrabold pt-1 pb-2 flex flex-row justify-between">
              {/* <div className="text-[10px] text-left">PROV: {info.proveedor}<br/>GUIA: #{info.idx}</div> */}
              <div className="text-[10px] text-left">PROV: {info.proveedor}</div>
              <div className="text-[10px] w-[100px] text-right">{info.estado}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-[10px] text-left"><span className="font-extrabold">GUIA:</span> #{info.idx}</div>
              <div className="text-[10px] text-left"><span className="font-extrabold">CANT.:</span> {info.cantidad_servicio}</div>
              <div className="text-[10px] text-left"><span className="font-extrabold">CORTE:</span> -</div>
              <div className="text-[10px] text-left"><span className="font-extrabold">EMISION:</span> {info.fec_emision}</div>
              <div className="text-[10px] text-left"><span className="font-extrabold">RETORNO:</span> {info.fec_retorno}</div>
              <div className="text-[10px] text-left"><span className="font-extrabold">DIAS:</span> {info.dias_pendientes}</div>
            </div>
            <div>
              <ul className="flex flex-row justify-end">
                <li>
                  <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                  </div>
                </li>
                <li>
                  <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-id={info.idx} data-action="download" onClick={onclick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                  </div>
                </li>
                <li>
                  <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-id={info.idx} data-action="show" onClick={onclick} >
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
          </div>

        </div>
        {/* <div className="px-2 py-1">
          <div className="rounded-xl h-[100px] w-full bg-gray-300">guia</div>
        </div>
        <div className="px-2 py-1">
          <div className="rounded-xl h-[100px] w-full bg-gray-300">guia</div>
        </div> */}
      {/* </div> */}
    </>
  )
}
const CuerpoDespacho = ({info,openloader})=>{
  const {openModal,setOpen} = useContext(ModalWindowContext)
  const onclick = (e)=>{
    const action = e.target.dataset.action
    const id = e.target.dataset.id
    const idguia = e.target.dataset.idguia
    switch(action){
      case 'download':
        openloader(true)
        Consulta({url: `produccion/verdespacho/${id}/${idguia}/2`})
          .then(resp => {
            openloader(false)
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
            openloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })

      break;
    }
  }
  return(
    <>
      <div className={`relative z-10 flex flex-row gap-2 flex-1 h-[90px]`}>
        {
          info.length > 0 && info.map(row=>
            <div className={`${row.fase ? 'bg-orange-400' : 'bg-gray-400' } rounded-xl p-3 relative z-10 flex-1 cursor-pointer hover:opacity-90`}>
              <div className="flex flex-row justify-center text-[11px]">
                <div><strong>#GUIA: {row.nro_guia}</strong></div>
              </div>
              <div className="flex flex-row justify-between text-[11px]">
                <div><strong>CANT.:</strong> {row.despacho} und.</div>
                <div><strong>FECHA:</strong> {row.fecha_ingreso}</div>
              </div>
              <div className="flex flex-row justify-end">
                <ul className="flex flex-row justify-end">
                  <li>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="download" data-idguia={row.idguia} data-id={row.id} onClick={onclick}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                    </div>
                  </li>
                  <li>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="show" onClick={()=>{}} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                    </div>
                  </li>
                  <li>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default function StatusGeneral({id,openmodal}){
  const [loading,setLoading] = useState(true)
  const [info,setInfo] = useState([])
  const [openloader,setOpenloader] = useState(false)
  const contenedor = useRef()
  const [tabstate,setTabstate] = useState(true)
  const [zoom,setZoom] = useState(false)
  const imagemain = useRef(null)

  const onclick = (e) => {
    const action = e.target.dataset.action
    const id = e.target.dataset.id
    const params_modal = null
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
      Consulta({url:'ordenes/getstatusgeneral2/' + id,params:{
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
    
    const KeyHandler = (e)=>{
      console.log("Imprimiendo nuevo evento de teclado",e.key)
      if(e.key == 'Escape') openmodal(false)
    }
    document.addEventListener('keyup',KeyHandler)
    return ()=>{
      document.removeEventListener('keyup',KeyHandler)
    }
  },[])
  const zoomimage = (e) => {
    imagemain.current.focus()
    setZoom(!zoom)
  }
  const imageout = (e) => {
    console.log("Saliendo de la imagen")
    setZoom(!zoom)
  }
  const onerror = (e) => {
    // e.target.src = 'https://jsjfact.com/facturador/imagenez/op_166.png'
    e.target.src = 'https://jsjfact.com/facturador/imagenez/default_clothe_next.jpg'
    // e.target.classList.add('animate-pulse')
    // setTimeout(() => {
    //   e.target.classList.remove('animate-pulse')
    // }, 1000)
  }
  const opendetail = (e)=>{
    // let parent = e.target.closest("div")
    console.log("asdfasd:",e.currentTarget,e.currentTarget.parentElement.parentElement)
    let parent = e.currentTarget.parentElement.parentElement
    parent.classList.toggle("showdata")
  }
  const vistarapida = useRef()
  const [vistaopen,setVistaopen] = useState(0)
  const [faseactive,setFaseActive] = useState('')
  const mostrarsaldo = (fase)=>{
    setFaseActive(fase)
  }
  return(
    <>
      <div className="flex flex-col pb-4 relative">
      	<div ref={vistarapida} className="absolute w-[100px] hidden h-[100px] bg-orange-300 z-[100] translate-y-[300px] transition-l">vista rapida de guia e ingreso</div>
        <div ref={imagemain} onBlur={imageout} className={`absolute w-[600px] h-[600px] ${zoom ? 'z-[100]' : 'z-[-1]'} rounded-full bg-slate-400 overflow-hidden flex flex-row items-center] transition-all ${zoom ? 'scale-100' : 'scale-50 opacity-0'}`} style={{left:'calc(50% - 300px)',top:'calc(50% - 300px)'}} tabIndex={-1}>
          <img src={`https://jsjfact.com/facturador/imagenez/op_${id}.jpg`} onError={onerror}/>
        </div>
        <div ref={contenedor} className="flex flex-col text-[12px] w-[100vw] pl-2 pr-2 focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black [&_input]:text-center [&_input]:p-[2px]">
          {
            loading
            ? 
              <div className={`flex justify-center w-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 loading"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 1 0 9 9" /></svg>
              </div>
            :
              <div className="relative">

                <div className="relative z-0">
                  <div className="flex flex-row justify-center items-center mb-2">
                    <div className="flex flex-row items-center gap-2 relative w-full">
                      <div className="w-[100px] h-[100px] rounded-full bg-[#d1d1d1] overflow-hidden relative z-10 cursor-zoom-in hover:border-[2px] hover:border-blue-600 transition-all flex flex-row items-center" onClick={zoomimage}>
                        <img src={`https://jsjfact.com/facturador/imagenez/op_${id}.jpg`} onError={onerror}/>
                      </div>
                      <div className="flex flex-row justify-between items-center flex-1">
                        <div className="flex flex-col justify-start relative z-10">
                          <div className="text-left"><strong>OC: </strong>{info[0][0].oc}</div>
                          <div className="font-extrabold text-[20px] relative z-10">{info[0][0].producto} {info[0][0].marca} {info[0][0].modelos}</div>
                        </div>
                        <div className="flex flex-row relative z-10 gap-6 pr-4">
                          <div className="flex flex-col">
                            <div className="text-[10px] font-bold">PRODUCCION</div>
                            <div className="text-[20px] italic font-black">{info[0][0].combos.reduce((c,v)=>v.cantidad_combo + c,0) ?? info[2][0].combos.reduce((c,v)=>v.cantidad_combo + c,0)}</div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-[10px] font-bold">D.PENDIENTES</div>
                            <div className={`text-[20px] italic font-black ${parseInt(info[0][0].dias_pendientes) < 0 ? 'text-red-500' : 'text-black'}`}>{info[0][0].dias_pendientes}</div>
                          </div>
                        </div>

                      </div>
                      <div className="right-0 h-[65px] rounded-md absolute bg-gray-200 z-0 left-[20px]"></div>
                    </div>
                  </div>
                </div>

                <div className="relative z-1 flex flex-row px-2 border-b-[1.5px] border-b-gray-400">
                  <div className={`flex flex-row relative flex-1 cursor-pointer group ${tabstate ? 'z-10' : 'z-0'}`} onClick={() => setTabstate(true)}>
                    <div className={`h-[40px] rounded-tl-lg w-[500px] flex flex-row items-center justify-start font-black pl-4 flex-1 ${ tabstate ? 'bg-gray-400' : 'group-hover:bg-gray-300 bg-gray-200 opacity-70'} `}>
                      <div className="bg-red-500 h-[8px] w-[8px] rounded-full mr-2"></div>
                      STATUS INICIAL
                    </div>
                    <div className="h-[40px] w-[30px] bg-white"></div>
                    <div className={`h-[40px] w-[60px] border-l-[30px] ${ tabstate ? 'border-gray-400' : 'border-gray-200 group-hover:border-l-gray-300 group-hover:border-b-gray-300 opacity-70' } border-b-[20px] border-t-[20px] border-r-[30px] border-t-transparent border-r-transparent absolute right-[-30px] top-0`}></div>
                  </div>
                  <div className={`flex flex-row flex-1 relative cursor-pointer group ${tabstate ? 'z-0' : 'z-10'}`} onClick={() => setTabstate(false)}>
                    <div className={`h-[40px] w-[60px] border-l-[30px] ${ tabstate ? 'border-gray-200 group-hover:border-r-gray-300 group-hover:border-b-gray-300 opacity-70' : 'border-gray-400' } border-b-[20px] border-t-[20px] border-r-[30px] border-t-transparent border-l-transparent absolute left-[-30px] top-0`}></div>
                    <div className="h-[40px] w-[30px] bg-white"></div>
                    <div className={`h-[40px] rounded-tr-lg w-[500px] flex flex-row items-center justify-end font-black pr-4 flex-1 ${ tabstate ? 'group-hover:bg-gray-300 bg-gray-200 opacity-70' : 'bg-gray-400'}`}>
                      STATUS ACTUAL
                      <div className="bg-red-500 h-[8px] w-[8px] rounded-full ml-2"></div>
                    </div>
                  </div>
                </div>
                <hr/>

                <div className="relative h-[550px] flex flex-col overflow-hidden p-2 z-1">
                  <div className={`absolute top-0 left-0 w-full h-full ${tabstate ? 'z-10' : 'z-0 hidden'} flex-1 overflow-y-scroll scrollbar-special`}>

                    <div className={`bg-slate-500 text-white rounded-md p-3 relative z-10 mt-2`}>
                      <div className="font-extrabold pt-1 pb-2 flex flex-row justify-between">
                        <div className="text-[14px] w-[100px] text-left">--</div>
                        <div className="flex-1">ORDEN</div>
                        <div className="text-[10px] w-[100px] text-right">PENDIENTE</div>
                      </div>
                      <div className="flex flex-row justify-center gap-3">
                        {
                          info[0][0].combos.map(c=><div className="flex flex-col items-center">
                          <div className="text-[10px] font-bold">COMBO {c.color_combo}</div>
                          <div className="text-[14px] font-bold">{c.cantidad_combo}</div>
                        </div>)
                        }
                      </div>
                      <div>
                        <ul className="flex flex-row justify-end">
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="download">
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
                    </div>

                    {
                      info[1].length > 0 && info[1].map(molde=><div className={`bg-amber-500 text-white rounded-md p-3 relative z-10 mt-2`}>
                        <div className="font-extrabold pt-1 pb-2 flex flex-row justify-between">
                          <div className="text-[14px] w-[100px] text-left">--</div>
                          <div className="flex-1">MOLDE</div>
                          <div className="text-[10px] w-[100px] text-right">{molde.estado_molde}</div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col items-center">
                            <div className="text-[10px] font-bold">RESPONSABLE</div>
                            <div className="text-[14px] font-bold">{molde.responsable}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-[10px] font-bold">MOLDE</div>
                            <div className="text-[14px] font-bold">{molde.molde}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-[10px] font-bold">MUESTRA</div>
                            <div className="text-[14px] font-bold">{molde.muestra}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-[10px] font-bold">LAVADO</div>
                            <div className="text-[14px] font-bold">{molde.lavado}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-[10px] font-bold">APROBACION</div>
                            <div className="text-[14px] font-bold">{molde.cliente_corte}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-[10px] font-bold">TIZADO</div>
                            <div className={`text-[14px] font-bold text-white`}>{molde.tizado}</div>
                          </div>
                        </div>
                        <div>
                          <ul className="flex flex-row justify-end">
                            <li>
                              <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                              </div>
                            </li>
                            <li>
                              <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="download">
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
                      </div>
                      )
                    }
                    {
                      info[2].length > 0 && info[2].map((corte,key)=><div className={`bg-cyan-500 text-white rounded-md p-3 relative z-10 mt-2`}>
                        <div className="font-extrabold pt-1 pb-2 flex flex-row justify-between">
                          <div className="text-[14px] w-[100px] text-left">#{corte.numero_corte}</div>
                          <div className="flex-1">CORTE {key + 1}</div>
                          <div className="text-[10px] w-[100px] text-right">{corte.estado_corte}</div>
                        </div>
                        <div className="flex flex-row justify-center gap-4">
                          {
                            corte.combos.map(c=><div className="flex flex-col items-center">
                            <div className="text-[10px] font-bold">COMBO {c.color_combo}</div>
                            <div className="text-[14px] font-bold">{c.cantidad_combo}</div>
                          </div>)
                          }
                          
                        </div>
                        <div>
                          <ul className="flex flex-row justify-end">
                            <li>
                              <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                              </div>
                            </li>
                            <li>
                              <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="download">
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
                      </div>

                      )
                    }
                  </div>
                  <div className={`absolute top-0 left-0 w-full h-full ${tabstate ? 'z-0 hidden' : 'z-10'} flex-1 overflow-y-scroll scrollbar-special`}>
                    <div className=" relative z-0">
                      <div className="relative z-[10]">
                        {
                          Object.keys(info[4]).length > 0 && Object.keys(info[4]).map((item,key)=>
                            <div className={`w-full flex flex-row border-b-[2px] border-dashed border-gray-500 ${info[5][item] ? '' : 'grayscale opacity-[.7]'} hover:grayscale-0 hover:opacity-[1]`} >
                              <div className="flex-1 flex flex-col">
                                {/* <div className="px-4 border-[1px] w-full">
                                  <div className="h-[20px] bg-yellow-300">
                                    {item == faseactive ? 'dentro' : 'fuera'}
                                    DISPONIBLE: 23324
                                    SALDO: 23423
                                  </div>
                                </div> */}
                                <div className={`flex-1 ${key%2 ? 'bg-orange-100' : 'bg-orange-100'} flex flex-col justify-center relative`} >
                                  {
                                    info[4][item].map(row=><CuerpoServicio info={row} openloader={setOpenloader} myfase={item} fase={faseactive}/>)
                                  }
                                </div>
                              </div>
                              <div className={`w-[35px] min-h-[150px] ${colorfase[item]}`} style={{display: 'flex',justifyContent: 'center',writingMode: 'vertical-lr',alignItems: 'center',padding: '10px',fontSize: '12px',textOrientation: 'upright',fontWeight: '900',zIndex: '20'}}>
                                {item}
                                {/* <div className="cursor-pointer" onClick={()=>mostrarsaldo(item)}>
                                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                </div> */}
                              </div>
                              <div className={`flex-1 ${key%2 ? 'bg-orange-100' : 'bg-orange-100'} flex flex-col justify-center`}>
                                {
                                  info[4][item].length > 0 && info[4][item].map(row=>
                                    <div className="px-2 py-1 h-[110px] flex flex-row justify-center items-center">
                                      {
                                        row.despachos && <CuerpoDespacho info={row.despachos} openloader={setOpenloader}/>
                                      }
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {
                  openloader && <div className="absolute top-0 w-full h-full bg-gray-300 z-1000 flex flex-col items-center justify-center opacity-50" style={{zIndex:'100'}}>
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
