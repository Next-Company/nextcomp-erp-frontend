import { useEffect, useRef } from "react"

export function ContextualMenu({params}){
  const context_menu = useRef()
  const onclickright = (e)=>{
    e.preventDefault()
  }
  useEffect(()=>{
    console.log(params.actions.descargar)
    context_menu.current.style.left = `${params.position.x}px`
    context_menu.current.style.top = `${params.position.y}px`
    context_menu.current.classList.remove('invisible')
    context_menu.current.focus()
    console.log('termino el renderizado')
  },[params])
  return(
    <div ref={context_menu} onClick={params.actions.descargar} onContextMenu={onclickright} className="config w-[320px] h-[300px] pt-2 pb-2 bg-white rounded-md absolute shadow-lg shadow-gray-400/50 border flex flex-col gap-2 left-[100px] invisible opacity-0 z-[-1] focus:opacity-100 focus:z-50 transition-opacity" tabIndex={-1}>  
      {
        params.content
      }
    </div>
  )
}