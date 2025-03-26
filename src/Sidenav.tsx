import { useRef, useEffect, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { AuthPermitions } from "./contexts/contexts";


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
  const {credentials} = useContext(AuthPermitions)
  // console.log("Mostrando sidenav credentials:",JSON.parse(credentials))
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
            {/* <li data-fd='home' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur __web-inspector-hide-shortcut__"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path></svg>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex text-nowrap">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Colaboradores
              </div>
            </li> */}
            {
              JSON.parse(credentials).idx !== 12 && <li data-fd='directorio' className="group/sub">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>
                {/* <a href="">
                  Directorio
                </a> */}
                <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                  <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                  Directorio
                </div>
              </li>
            }
            {/* <li data-fd='home' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Papelera
              </div>
            </li> */}
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
            <li data-fd='estampado/inicio' className="group/sub">
              <NavLink
                to="estampado/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="pointer-events-none icon icon-tabler icons-tabler-outline icon-tabler-paint"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" /><path d="M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Estampado
              </div>
            </li>
            <li data-fd='muestras/inicio' className="group/sub">
              <NavLink
                to="muestras/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-toilet-paper"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 10m-3 0a3 7 0 1 0 6 0a3 7 0 1 0 -6 0" /><path d="M21 10c0 -3.866 -1.343 -7 -3 -7" /><path d="M6 3h12" /><path d="M21 10v10l-3 -1l-3 2l-3 -3l-3 2v-10" /><path d="M6 10h.01" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Muestras
              </div>
            </li>
            <li data-fd='guias/inicio' className="group/sub">
              <NavLink
                to="guias/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-note"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 20l7 -7" /><path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Guias
              </div>
            </li>
            <li data-fd='pedidos/inicio' className="group/sub">
              <NavLink
                to="pedidos/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Pedidos
              </div>
            </li>
            <li data-fd='despachos/inicio' className="group/sub">
              <NavLink
                to="despachos/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Ingresos
              </div>
            </li>
            <li data-fd='pagos/inicio' className="group/sub">
              <NavLink
                to="pagos/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-dollar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" /><path d="M9 18h4" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
                {/* <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057z" /></svg> */}
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Pagos
              </div>
            </li>
            <li className="group/sub">
              <NavLink
                to="informes/inicio" 
                className={ ({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-checkup-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14h.01" /><path d="M9 17h.01" /><path d="M12 16l1 1l3 -3" /></svg>
              </NavLink>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Informes
              </div>
            </li>
            {/* <li className="has-[a.active]:bg-[rgb(232,232,232)] group/sub has-[a.active]:text-black/50 has-[a.active]:rounded-lg"> */}
            {
              JSON.parse(credentials).idx !== 12 && <li data-fd='operaciones/inicio' className="has-[a.active]:bg-[rgb(232,232,232)] group/sub has-[a.active]:text-black/50 has-[a.active]:rounded-lg">
                <NavLink
                  to="operaciones/inicio" 
                  className={ ({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "default"
                  }
                > 
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-building-factory-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21h18" /><path d="M5 21v-12l5 4v-4l5 4h4" /><path d="M19 21v-8l-1.436 -9.574a.5 .5 0 0 0 -.495 -.426h-1.145a.5 .5 0 0 0 -.494 .418l-1.43 8.582" /><path d="M9 17h1" /><path d="M14 17h1" /></svg>
                </NavLink>
                <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                  <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                  Operaciones
                </div>
              </li>
            }
            
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