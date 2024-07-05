import { useContext, useEffect, useRef, useState } from "react"
import { ModalWindowContext } from "./ModalWindowContext"

export function ModalWindow(){
  const modalref = useRef(null)
  const {config} = useContext(ModalWindowContext)
  const [open,setOpen] = useState(false)
  const efecto = ()=>{
    console.log('hoal mudno')
    // modalref.current.querySelector('#conc').classList.toggle('other')
    // modalref.current.classList.toggle('other')
    setOpen(false)
  }
  useEffect(()=>{
    setOpen(config.open)
    // modalref.current.classList.add('other')
  },[config])
  useEffect(()=>{
    // modalref.current.classList.toggle('other')
  },[open])
  return(
    <>
      {/* <div ref={modalref} className={`absolute ${open ? 'z-[100] bg-gray-600/30' : 'z-[-1] other'} flex justify-center items-center opacity-[1] top-0 left-0 w-[100vw] h-[100vh] transition-all`}> */}
      <div ref={modalref} className={`absolute ${open ? 'z-[100] bg-gray-600/30' : 'z-[-1] other'} flex justify-center items-center opacity-[1] top-0 left-0 w-[100vw] h-[100vh] transition-all `}>
        <div id="conc" className="w-[450px] h-[280px] bg-white rounded-md p-3 flex flex-col justify-between transition-all">
          <div>
            {config.content}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={config.action}>Aceptar</button>
            <button onClick={()=>setOpen(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </>
  )
}