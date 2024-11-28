import React, { MouseEventHandler, useEffect, useState } from "react"
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  task?: MouseEventHandler,
  tipo: string,
  loading: boolean
}

const ContentButtonLoader = ({content,estado})=>{
  return(
    <>
      <div className="relative">
        <div className={`${estado && 'opacity-0 scale-0'} transition`}>
          {content}
        </div>
        <div className={`${!estado && 'opacity-0 scale-0' } flex justify-center transition absolute top-0 w-full`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 loading"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 1 0 9 9" /></svg>
        </div>
      </div>
    </>
  )
}

export function ButtonLoader({task = ()=>{}, type, tipo, loading = false, children}:Props) {
  // const [estado,setEstado] = useState(loading)
  const eventclick = (e)=>{
    // setEstado(!estado)
    task(e)
  }
  // console.log("Reenderizando boton",loading,estado)
  const buttons = {
    default: <button onClick={eventclick} type={type} className={`bt-vite ${loading && 'pointer-events-none'}`}><ContentButtonLoader content={children} estado={loading}/></button>, 
    accept: <button onClick={eventclick} type={type} className="bg-blue-700 border-blue-700 border-[1px] text-white rounded-[8px] border-transparent pt-[0.6em] pb-[0.6em] pl-[1.2em] pr-[1.2em] text-[1em] cursor-pointer transition-all hover:border-blue-600 hover:border-[1px] hover:bg-blue-600"><ContentButtonLoader content={children} estado={loading}/></button>,
    success: <button onClick={eventclick} type={type} className="bg-green-700 border-green-700 border-[1px] text-white rounded-[8px] border-transparent pt-[0.6em] pb-[0.6em] pl-[1.2em] pr-[1.2em] text-[1em] cursor-pointer transition-all hover:border-green-600 hover:border-[1px] hover:bg-green-600"><ContentButtonLoader content={children} estado={loading}/></button>,
    warning: <button onClick={eventclick} type={type} className="bg-orange-700 border-orange-700 border-[1px] text-white rounded-[8px] border-transparent pt-[0.6em] pb-[0.6em] pl-[1.2em] pr-[1.2em] text-[1em] cursor-pointer transition-all hover:border-orange-600 hover:border-[1px] hover:bg-orange-600"><ContentButtonLoader content={children} estado={loading}/></button>
  }
  // useEffect(()=>{
  //   setEstado(loading)
  // },[loading]) 
  return (
    <>
      {buttons[tipo]}
    </>
  )
}