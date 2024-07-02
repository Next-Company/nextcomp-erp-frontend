import { useEffect, useRef } from "react"

export function ContextualMenu({params}){
  const context_menu = useRef(null)
  const onclickright = (e)=>{
    e.preventDefault()
  }
  useEffect(()=>{
    context_menu.current.style.left = `${params.position.x + 320 > window.innerWidth ? params.position.x - 320 : params.position.x}px`
    context_menu.current.style.top = `${params.position.y + 300 > window.innerHeight ? params.position.y - 300 : params.position.y}px`
    context_menu.current.classList.remove('invisible')
    context_menu.current.focus()
  },[params])
  return(
    <div ref={context_menu} onClick={params.actions} onContextMenu={onclickright} className="config w-[320px] h-[300px] pt-2 pb-2 bg-white rounded-md absolute shadow-lg shadow-gray-400/50 border flex flex-col gap-2 left-[100px] invisible opacity-0 z-[-1] focus:opacity-100 focus:z-50 transition-opacity" tabIndex={-1}>  
      {
        params.content
      }
    </div>
  )
}