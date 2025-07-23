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

export function SuggestBox({title}) {
  return <div className="absolute rounded-md bg-gray-800 h-8 whitespace-nowrap text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
    <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
    {title}
  </div>
}

export function Sidenav() {
  const { credentials } = useContext(AuthPermitions)
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
      <nav className="lg:flex lg:flex-col text-[12px] flex-none gap-y-3 w-[15%] relative transition-[width] group collapsee [&.collapsee]:w-[55px] bg-[rgb(253,253,253)] sm:hidden border-r-[1px] ">
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


          {/* <ul id="sidenav" className={`[&_li]:flex [&_li]:justify-center [&_li]:cursor-pointer [&_li]:gap-2 [&_li]:items-center [&_svg]:h-[20px] [&_li]:h-[45px] [&_li]:p-2 [&_li]:text-black/50 [&_li:hover]:text-black/50 [&_li:hover]:bg-[rgb(232,232,232)] [&_li]:rounded-lg flex flex-col gap-1 
          [&>a.active]:bg-red-400 [&>a:hover]:bg-red-400
          `} onClick={onccc}> */}
          <ul id="sidenav" className={`[&_li]:flex [&_li]:justify-center [&_li]:cursor-pointer [&_li]:gap-2 [&_li]:items-center [&_svg]:h-[20px] [&_li]:h-[45px] [&_li]:p-2 [&_li]:text-black/50 [&_li:hover]:text-black/50 [&_li:hover]:bg-[rgb(232,232,232)] [&_li]:rounded-lg flex flex-col gap-1`} onClick={onccc}>

            {/* <li data-fd='home' className="group/sub">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="bag oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>
              <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex text-nowrap">
                <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                Inicio
              </div>
            </li> */}
            {/* <NavLink
              to="home"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="bag oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>
                <SuggestBox title="Inicio" />
              </div>
            </NavLink> */}
            {
              JSON.parse(credentials).idx !== 12 && <NavLink
                to="directorio"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "default"
                }
              >
                <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>
                  <SuggestBox title="Directorio" />
                </div>
              </NavLink>
            }
            {/* <NavLink
              to="calendar"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path></svg>
                <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                  <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                  Calendario
                </div>
              </div>
            </NavLink> */}
            {/* <NavLink
              to="estampado/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none icon icon-tabler icons-tabler-outline icon-tabler-paint"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" /><path d="M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>
                <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                  <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                  Estampado
                </div>
              </div>
            </NavLink> */}
            <NavLink
              to="pedidos/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                <SuggestBox title="Pedidos" />
              </div>
            </NavLink>
            <NavLink
              to="ordenes/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-building-factory"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21c1.147 -4.02 1.983 -8.027 2 -12h6c.017 3.973 .853 7.98 2 12" /><path d="M12.5 13h4.5c.025 2.612 .894 5.296 2 8" /><path d="M9 5a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1" /><path d="M3 21l19 0" /></svg>
                <SuggestBox title="Producción" />
              </div>
            </NavLink>
            <NavLink
              to="guias/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-note"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 20l7 -7" /><path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" /></svg>
                <SuggestBox title="Guias" />
              </div>
            </NavLink>
            <NavLink
              to="muestras/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-toilet-paper"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 10m-3 0a3 7 0 1 0 6 0a3 7 0 1 0 -6 0" /><path d="M21 10c0 -3.866 -1.343 -7 -3 -7" /><path d="M6 3h12" /><path d="M21 10v10l-3 -1l-3 2l-3 -3l-3 2v-10" /><path d="M6 10h.01" /></svg>
                <SuggestBox title="Muestras y Complementos" />
              </div>
            </NavLink>
            <NavLink
              to="despachos/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg>
                <SuggestBox title="Ingresos" />
              </div>
            </NavLink>
            <NavLink
              to="letras/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-dollar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h12.5" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
                <SuggestBox title="Letras" />
              </div>
            </NavLink>
            <NavLink
              to="prestamos/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" /><path d="M4 10l0 11" /><path d="M20 10l0 11" /><path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" /></svg>
                <SuggestBox title="Prestamos" />
              </div>
            </NavLink>
            <NavLink
              to="pagos/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-dollar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" /><path d="M9 18h4" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
                <SuggestBox title="Cuentas por pagar" />
              </div>
            </NavLink>
            <NavLink
              to="cobros/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8" /><path d="M9 18h2" /><path d="M15 19l2 2l4 -4" /></svg>
                <SuggestBox title="Cuentas por cobrar" />
              </div>
            </NavLink>
            <NavLink
              to="caja"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cash-register"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 15h-2.5c-.398 0 -.779 .158 -1.061 .439c-.281 .281 -.439 .663 -.439 1.061c0 .398 .158 .779 .439 1.061c.281 .281 .663 .439 1.061 .439h1c.398 0 .779 .158 1.061 .439c.281 .281 .439 .663 .439 1.061c0 .398 -.158 .779 -.439 1.061c-.281 .281 -.663 .439 -1.061 .439h-2.5" /><path d="M19 21v1m0 -8v1" /><path d="M13 21h-7c-.53 0 -1.039 -.211 -1.414 -.586c-.375 -.375 -.586 -.884 -.586 -1.414v-10c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h2m12 3.12v-1.12c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-2" /><path d="M16 10v-6c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-4c-.53 0 -1.039 .211 -1.414 .586c-.375 .375 -.586 .884 -.586 1.414v6m8 0h-8m8 0h1m-9 0h-1" /><path d="M8 14v.01" /><path d="M8 17v.01" /><path d="M12 13.99v.01" /><path d="M12 17v.01" /></svg>
                <SuggestBox title="Caja" />
              </div>
            </NavLink>
            {/* <NavLink
              to="informes/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-checkup-list"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14h.01" /><path d="M9 17h.01" /><path d="M12 16l1 1l3 -3" /></svg>
                <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                  <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                  Informes
                </div>
              </div>
            </NavLink> */}
            {/* <NavLink
              to="soporte/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "default"
              }
            >
              <div className="w-full h-[45px] flex flex-row justify-center items-center rounded-lg group/sub relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-hours-24"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 13c.325 2.532 1.881 4.781 4 6" /><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2" /><path d="M4 5v4h4" /><path d="M12 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2" /><path d="M18 15v2a1 1 0 0 0 1 1h1" /><path d="M21 15v6" /></svg>
                <div className="absolute h-8 rounded-md bg-gray-800 text-white hidden items-center left-[55px] z-20 p-2 group-hover/sub:flex">
                  <div className="absolute border-r-[6px] border-r-gray-800 border-b-[6px] border-b-transparent border-t-[6px] border-t-transparent left-[-5px]"></div>
                  Soporte
                </div>
              </div>
            </NavLink> */}
          </ul>
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