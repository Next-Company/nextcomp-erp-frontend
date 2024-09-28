import { useState } from "react";
import { SideNavMobile } from "./SideNavMobileContext";

export default function SideNavMobileProvider({children}){
  const [open,setOpen] = useState(false)
  return(
    <SideNavMobile.Provider value={{open}}>
      <div>
        <div onClick={closeMenu} ref={sidenav} className='w-[300px] rounded-r-xl translate-x-[-300px] transition-transform h-full bg-gray-200 absolute left-0 top-0 flex-column'>
          <div className='flex items-center h-[50px] w-[100%] pl-5 pr-5 text-left' >
            <div onClick={closeMenu}>
              <svg  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>           
            </div>
          </div>
          <div className='flex-1' >
            <div onClick={closeMenu} className='nav_option bg-red-400 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
            <div className='nav_option bg-red-400 border-b-[1px] h-[50px] flex justify-start pl-4 hover:bg-orange-400 items-center' data-fd='directorio'>Opcion1</div>
            <div className='nav_option bg-red-400 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
            <div className='nav_option bg-red-400 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
            <div className='nav_option bg-red-400 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
            <div className='nav_option bg-red-400 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
            <div onClick={closeMenu} className='nav_option bg-red-400 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
          </div>
          <div className='flex justify-center items-center h-[50px] '>
            Cerrar menu
          </div>
        </div>
        {children}
      </div>
    </SideNavMobile.Provider>
  )
}