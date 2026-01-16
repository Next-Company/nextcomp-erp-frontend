import { useRef, useEffect, useContext } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

const navLinks = [
  {
    to: "directorio/",
    title: "Directorio",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>
    ),
  },
  {
    to: "pedidos/",
    title: "Requerimientos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>
    ),
  },
  {
    to: "ordenes/",
    title: "Ordenes",
    icon: (
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-building-factory"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21c1.147 -4.02 1.983 -8.027 2 -12h6c.017 3.973 .853 7.98 2 12" /><path d="M12.5 13h4.5c.025 2.612 .894 5.296 2 8" /><path d="M9 5a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1" /><path d="M3 21l19 0" /></svg>
    ),
  },
  {
    to: "guias/",
    title: "Guias",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-note"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 20l7 -7" /><path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" /></svg>
    ),
  },
  {
    to: "servicios/",
    title: "Servicios",
    icon: (
      // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-transform"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3" /><path d="M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3" /><path d="M15 18a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
    ),
  },
  {
    to: "muestras/",
    title: "Muestras y Complementos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-toilet-paper"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 10m-3 0a3 7 0 1 0 6 0a3 7 0 1 0 -6 0" /><path d="M21 10c0 -3.866 -1.343 -7 -3 -7" /><path d="M6 3h12" /><path d="M21 10v10l-3 -1l-3 2l-3 -3l-3 2v-10" /><path d="M6 10h.01" /></svg>
    ),
  },
  {
    to: "letras/",
    title: "Letras",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-dollar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h12.5" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
    ),
  },
  {
    to: "prestamos/",
    title: "Prestamos",
    icon: (
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" /><path d="M4 10l0 11" /><path d="M20 10l0 11" /><path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" /></svg>
    ),
  },
  {
    to: "pagos/",
    title: "Cuentas por pagar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-dollar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" /><path d="M9 18h4" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
    ),
  },
  {
    to: "cobros/",
    title: "Cuentas por cobrar",
    icon: (
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8" /><path d="M9 18h2" /><path d="M15 19l2 2l4 -4" /></svg>
    ),
  },
  {
    to: "caja/",
    title: "Caja",
    icon: (
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cash-register"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 15h-2.5c-.398 0 -.779 .158 -1.061 .439c-.281 .281 -.439 .663 -.439 1.061c0 .398 .158 .779 .439 1.061c.281 .281 .663 .439 1.061 .439h1c.398 0 .779 .158 1.061 .439c.281 .281 .439 .663 .439 1.061c0 .398 -.158 .779 -.439 1.061c-.281 .281 -.663 .439 -1.061 .439h-2.5" /><path d="M19 21v1m0 -8v1" /><path d="M13 21h-7c-.53 0 -1.039 -.211 -1.414 -.586c-.375 -.375 -.586 -.884 -.586 -1.414v-10c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h2m12 3.12v-1.12c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-2" /><path d="M16 10v-6c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-4c-.53 0 -1.039 .211 -1.414 .586c-.375 .375 -.586 .884 -.586 1.414v6m8 0h-8m8 0h1m-9 0h-1" /><path d="M8 14v.01" /><path d="M8 17v.01" /><path d="M12 13.99v.01" /><path d="M12 17v.01" /></svg>
    ),
  },
  {
    to: "almacen/solicitudes",
    title: "Solicitud de materiales",
    icon: (
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 19h-6a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" /><path d="M3 7l9 6l9 -6" /><path d="M15 19l2 2l4 -4" /></svg>
    ),
  },
  {
    to: "despachos/",
    title: "Ingresos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg>
    ),
  },
  {
    to: "empaquetado/",
    title: "Empaquetado",
    icon: (
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-package"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></svg>
    ),
  },
  {
    to: "almacen/movimientos",
    title: "Retiros",
    icon: (
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-package-export"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /><path d="M15 18h7" /><path d="M19 15l3 3l-3 3" /></svg>
    ),
  },
  {
    to: "almacen/inventario/",
    title: "Inventario",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-forklift"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 17l5 0" /><path d="M3 17v-6h13v6" /><path d="M5 11v-4h4" /><path d="M9 11v-6h4l3 6" /><path d="M22 15h-3v-10" /><path d="M16 13l3 0" /></svg>
    ),
  }
];

const CustomNavLink = ({ to, title, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : "default"
      }
    >
      <div className="jj w-[35px] h-[35px] rounded-full flex flex-row items-center p-[5.5px]">
        <div className="flex icon-content-nav flex-row items-center w-[24px]">
          {icon}
          <div className="pl-4 title_pill hidden text-[13px]">{title}</div>
          <SuggestBox title={title} />
        </div>
      </div>
    </NavLink>
  );
};

export function Sidenav() {
  const { credentials } = useContext(AuthPermitions)
  // console.log("Mostrando sidenav credentials:",JSON.parse(credentials))
  const scroll_sidenav = useRef();
  const ruta = useLocation()
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
  const mouseovertest = (e)=>{

  }
  useEffect(() => {
    console.log("Aqui validamos la ruta",ruta)
  }, [])
  return (
    <>
      <nav className="lg:flex lg:flex-col text-[12px] h-[100vh] flex-none gap-y-3 relative transition-[width] group collapsee [&.collapsee]:w-[100%] bg-[--main-bg-color] sm:hidden z-[2]">
        {/* <div
          className="block w-[6px] rounded-xl right-0 absolute bg-[rgba(146,146,146,0.12)] opacity-0 personal_scroll"
          ref={scroll_sidenav}
          onAnimationEnd={onanimationend}
        ></div> */}
        <div
          className="flex flex-col gap-3 flex-1 pepe h-[100vh] w-[100%] bg-[--main-bg-color] z-[1] container pt-[12px]" 
          onScroll={onscroll}
          onMouseEnter={mouseenter}
        >
          <ul id="sidenav" className={`[&_li]:flex [&_li]:justify-center [&_li]:cursor-pointer [&_li]:gap-2 [&_li]:items-center [&_svg]:h-[20px] [&_li]:h-[45px] [&_li]:p-2 [&_li]:text-black/50 [&_li:hover]:text-black/50 [&_li:hover]:bg-[rgb(232,232,232)] [&_li]:rounded-lg flex flex-col gap-1`} onClick={onccc}>
            {
              navLinks.map((link) => (
                <CustomNavLink 
                  key={link.to} 
                  to={link.to} 
                  title={link.title} 
                  icon={link.icon} 
                />
              ))
            }
          </ul>
        </div>
        {/* <div className="border-t h-14 p-3"></div> */}
      </nav>
    </>
  )
}