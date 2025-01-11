import { useRef, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";


function ChatUser() {
  return (
    <>
      <div className="flex justify-start gap-3 items-center hover:rounded-md hover:bg-slate-200 p-2 cursor-pointer">
        <div className="rounded-full bg-slate-400 w-7 h-7"></div>
        <span>Name Usuario</span>
        {/* <div className=""></div> */}
      </div>
    </>
  )
}

export function Sidenav() {
  const scroll_sidenav = useRef();
  const navigate = useNavigate()
  const onccc = (e) => {
    if (e.target.matches('li')) {
      navigate(e.target.dataset.fd)
      // setcontent(e.target.dataset.fd)
    }
  }
  const onclick = (e) => {
    // console.log(e.target)
    if (e.target.matches('.navclose')) {
      e.target.closest('nav').classList.toggle('collapsee')
    }
  }
  const onscroll = (e) => {
    scroll_sidenav.current.style.top = `${(e.target.clientHeight / e.target.scrollHeight) * e.target.scrollTop}px`
  }
  const mouseenter = (e) => {
    if (e.target.matches('.pepe')) {
      // scroll_sidenav.current.style.height = `${(e.target.clientHeight / e.target.scrollHeight) * e.target.clientHeight}px`
      // scroll_sidenav.current.classList.add('vanish_scroll')
    }
  }
  const onanimationend = (e) => {
    if (e.target.matches('.personal_scroll')) {
      e.target.classList.remove('vanish_scroll')
    }
  }
  useEffect(() => {

  }, [])
  return (
    <>
      {/* <nav className="flex flex-col text-[12px] flex-none gap-y-3 w-[15%] overflow-hidden relative transition-[width] group collapsee [&.collapsee]:w-[55px] bg-[rgb(253,253,253)]"> */}
      <nav className="lg:flex lg:flex-col text-[12px] flex-none gap-y-3 w-[15%] relative transition-[width] group collapsee [&.collapsee]:w-[55px] bg-[rgb(253,253,253)] sm:hidden border-r-[1px]">
        <div
          className="block w-[6px] rounded-xl right-0 absolute bg-gray-400 opacity-0 personal_scroll"
          ref={scroll_sidenav}
          onAnimationEnd={onanimationend}
        ></div>
        <div
          // className="flex flex-col gap-3 flex-1 overflow-y-scroll mr-[-17px] p-1 pepe"
          className="flex flex-col gap-3 flex-1 p-1 pepe"
          // className="flex flex-col gap-3 flex-1 p-1 pepe"
          onScroll={onscroll}
          onMouseEnter={mouseenter}
        >
          <div className="flex justify-center">
            {/* <div className="cursor-pointer navclose text-black/50" onClick={onclick}>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
            </div> */}
          </div>
          {/* <ul className="[&_li]:flex [&_li]:justify-center [&_li]:cursor-pointer [&_li]:gap-2 [&_li]:items-center [&_svg]:h-[20px] [&_li]:h-[45px] [&_li]:p-2 [&_li]:text-black/50 [&_li:hover]:text-black/50 [&_li:hover]:bg-[rgb(232,232,232)] [&_li:hover]:rounded-lg flex flex-col gap-1 group-[.collapsee]:[&_a]:hidden [&_a]:cursor-default" onClick={onccc}> */}
          <ul id="sidenav" className="[&_li]:flex [&_li]:justify-center [&_li]:cursor-pointer [&_li]:gap-2 [&_li]:items-center [&_svg]:h-[20px] [&_li]:h-[45px] [&_li]:p-2 [&_li]:text-black/50 [&_li:hover]:text-black/50 [&_li:hover]:bg-[rgb(232,232,232)] [&_li:hover]:rounded-lg flex flex-col gap-1" onClick={onccc}>
            <li data-fd='home' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="bag oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>
              {/* <a href="/">
                Dasboard
              </a> */}
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex text-nowrap">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Inicio
              </div>
            </li>
            <li data-fd='home' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur __web-inspector-hide-shortcut__"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path></svg>
              {/* <a href="">
                Equipo
              </a> */}
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex text-nowrap">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Colaboradores
              </div>
            </li>
            <li data-fd='directorio' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>
              {/* <a href="">
                Directorio
              </a> */}
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Directorio
              </div>
            </li>
            <li data-fd='home' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              {/* <a href="">
                Papelera
              </a> */}
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Papelera
              </div>
            </li>
            <li data-fd='home' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path></svg>
              {/* <a href="">
                Calendario
              </a> */}
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Calendario
              </div>
            </li>
            <li data-fd='estampado' className="group/sub">
              <NavLink
                to="estampado/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-paint"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" /><path d="M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Estampado
              </div>
            </li>
            <li className="has-[a.active]:bg-[rgb(232,232,232)] group/sub has-[a.active]:text-black/50 has-[a.active]:rounded-lg">
              <NavLink
                to="operaciones/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Operaciones
              </div>
            </li>
            {/* <li data-fd='operaciones/inicio' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Operaciones
              </div>
            </li> */}
            
              <li className="">
                <NavLink
                  to="soporte/" 
                  className={ ({ isActive, isPending }) => isPending ? "pending hover:text-red-500" : isActive ? "active bg-[rgb(232,232,232)] text-black/50 rounded-lg" : "default" }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-hours-24"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 13c.325 2.532 1.881 4.781 4 6" /><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2" /><path d="M4 5v4h4" /><path d="M12 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2" /><path d="M18 15v2a1 1 0 0 0 1 1h1" /><path d="M21 15v6" /></svg>
                </NavLink>
                <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                  <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                  Soporte
                </div>
              </li>
            
            {/* <li data-fd='Soporte' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-hours-24"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 13c.325 2.532 1.881 4.781 4 6" /><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2" /><path d="M4 5v4h4" /><path d="M12 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2" /><path d="M18 15v2a1 1 0 0 0 1 1h1" /><path d="M21 15v6" /></svg>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Soporte
              </div>
            </li> */}

            <li data-fd='home' className="group/sub">
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path></svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coins"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" /><path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" /><path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" /><path d="M3 6v10c0 .888 .772 1.45 2 2" /><path d="M3 11c0 .888 .772 1.45 2 2" /></svg>
              {/* <a href="">
                Caja
              </a> */}
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Caja
              </div>
            </li>
            {/* <li className="has-[a.active]:bg-[rgb(232,232,232)] has-[a.active]:text-black/50 has-[a.active]:rounded-lg">
              <NavLink
                to="operaciones/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coins"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" /><path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" /><path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" /><path d="M3 6v10c0 .888 .772 1.45 2 2" /><path d="M3 11c0 .888 .772 1.45 2 2" /></svg>
              </NavLink>
            </li>
            <li className="has-[a.active]:bg-[rgb(232,232,232)] has-[a.active]:text-black/50 has-[a.active]:rounded-lg">
              <NavLink
                to="soporte"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coins"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" /><path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" /><path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" /><path d="M3 6v10c0 .888 .772 1.45 2 2" /><path d="M3 11c0 .888 .772 1.45 2 2" /></svg>
              </NavLink>
            </li> */}
          </ul>
          <div className="bg-white border-t-[1px] border-t-gray-300 rounded-lg border-b-[2px] border-b-white h-[300px]"></div>
          {/* <div className="group-[.collapsee]:[&_>div]:p-0 group-[.collapsee]:[&_div>span]:hidden">
            <ChatUser />
            <ChatUser />
          </div> */}
        </div>
        <div className="border-t h-14 p-3">
          {/* <span className="before:content-['\eb7d']">Vista colapsada</span> */}
        </div>
      </nav>
    </>
  )
}



{/* <NavLink
  to="/messages"
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  }}
>
  Messages
</NavLink>
<NavLink
  to="/messages"
  style="{()=>{}"
>
  
</NavLink> */}