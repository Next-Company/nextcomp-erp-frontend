import { useRef, useState } from "react";
import { SideNavMobile } from "./SideNavMobileContext";
import { useNavigate } from "react-router-dom";

export default function SideNavMobileProvider({children}){
  const sidenav = useRef()
  const navigate = useNavigate()
  const openMenu =(e) => {
    sidenav.current.classList.add('translate-x-[0px]')
  }
  const closeMenu = (e) => {
    sidenav.current.classList.remove('translate-x-[0px]')
  }
  const redirect = (e) => {
    if(e.target.matches('div.nav_option')){
      sidenav.current.classList.remove('translate-x-[0px]')
      navigate(e.target.dataset.fd)
    }
  }
  return(
    <SideNavMobile.Provider value={{openMenu,closeMenu}}>
      <div ref={sidenav} className='w-[300px] rounded-r-xl translate-x-[-300px] transition-transform bg-gray-200 absolute left-0 top-0 flex-column flex-1 z-50 h-full'>
        <div className='flex items-center h-[50px] w-[100%] pl-5 pr-5 text-left' >
          <div onClick={closeMenu}>
            <svg  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>           
          </div>
        </div>
        <div className='flex-1 bg-green-500'>
          <div className='nav_option bg-gray-100 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
          <div className='nav_option bg-gray-100 border-b-[1px] h-[50px] flex justify-start pl-4 hover:bg-orange-400 items-center' data-fd='directorio'>Opcion1</div>
          <div className='nav_option bg-gray-100 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
          <div className='nav_option bg-gray-100 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
          <div className='nav_option bg-gray-100 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
          <div className='nav_option bg-gray-100 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Opcion1</div>
          <div onClick={redirect} className='nav_option bg-gray-100 border-b-[1px] h-[50px] flex justify-start pl-4 items-center' data-fd='directorio'>Directorio</div>
        </div>
        <div className='flex justify-center items-center h-[50px] bg-gray-500' onClick={closeMenu}>
          Cerrar menu
        </div>
      </div>
      {children}
    </SideNavMobile.Provider>
  )
}