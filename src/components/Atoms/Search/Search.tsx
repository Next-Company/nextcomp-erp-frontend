import { useRef } from "react"

export function Search(children){
  const { config,action = ()=>{} } = children
  const textsearch = useRef()
  const onclick = (e) => {
  }
  let timer = useRef(null)
  const onkeydown = (e)=>{
    if((e.keyCode > 40 && e.keyCode < 113) || e.keyCode == 8 || e.keyCode == 32){
      if(timer) clearTimeout(timer.current)
      timer.current = setTimeout(()=>{
        action(e.target)
      },250)
    }
  }
  return( 
    <>
        <div className="flex items-center border-[1px] rounded-full gap-3 bg-gray-200 pl-4 p-1 pr-4 has-[:focus]:bg-white has-[:focus]:shadow-md transition-all" onClick={onclick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
          <input onKeyDown={onkeydown} ref={textsearch.current} type="searh" className="h-[30px] flex-1 bg-transparent focus:outline-none" placeholder="Busqueda soporte" />
          {/* <input type="searh" className="h-[30px] flex-1 focus:outline-none bg-gray-200 focus:bg-white transition-all" placeholder="Busqueda soporte" /> */}
        </div>
    </>
  )
}