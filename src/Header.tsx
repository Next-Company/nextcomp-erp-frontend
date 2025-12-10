import { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SideNavMobile } from './components/SideNavMobile/SideNavMobileContext'

const Menu = ({info})=>{
  return(
    <>
      <section className='absolute min-w-[200px] invisible group-hover:visible top-[50px] left-[0px] bg-[#ede8e4] shadow-xl flex flex-col z-[100] rounded-md py-2'>
        {
          info.map(row=>{
            return(
              <>
                {
                  row.items.map(item=>(
                    <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer'>
                      <li data-action='new_folder' onClick={item.action}>
                        <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
                          <div className="pl-1"></div>
                          <div className='flex flex-col items-center text-left'>{item.title}</div>
                        </div>
                      </li>
                    </ul>
                  ))
                }
                {row.division && <hr className='border-gray-300'/>}
              </>
            )
          })
        }
      </section>
    </>
  )
}

export function Header({ logout, credentials }) {
  // const { isAuthenticated, logout } = useContext(AuthPermitions)
  // const [isvisible, setIsvisible] = useState(false)
  // console.log("Mis credenciales son :",credentials)
  const user = credentials !== '' ? JSON.parse(credentials) : {}
  const navigate = useNavigate()
  // const sidenav = useRef()
  const onclick = (e) => {
    console.log(e.target)
    if (e.target.matches('.avatar')) {
      e.target.querySelector('.config').classList.remove('invisible')
      e.target.querySelector('.config').focus()
    }
    if (e.target.matches('.settings, .settings *')) {
      navigate('/config')
    }
  }
  const onblur = (e) => {
    if (e.target.matches('.config')) {
      e.target.classList.add('invisible')
    }
  }
  const { openMenu, closeMenu } = useContext(SideNavMobile)
  return (
    <>
      <div className="flex items-center justify-between h-[50px] bg-white border-b pl-5 pr-5">
        <div className='lg:hidden cursor-pointer' onClick={openMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </div>
        <div className="flex items-center gap-5 cursor-pointer">
          {/* <div className='sm:hidden lg:block' onClick={openMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
          </div> */}
          <svg id="Capa_1" className="w-[30px]" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.84 124.51"><defs></defs><path className="cls-1" style={{ fillRule: 'evenodd' }} d="M297.91,309.05,312,300.88l13.1,16.46-27.23,15.75L253.3,307.32V255.89l44.61-25.71,27.23,15.7L312,262.33l-14.13-8.17-23.77,13.75v3.3h32.05V292H274.14v3.3Zm-.27,34.81-27-15.53-27-15.6V250.48l27-15.54,27-15.59,27,15.59,27,15.54v62.25l-27,15.6Zm41.09-86.24v52.57l-20.9-26.31Z" transform="translate(-243.72 -219.35)" /></svg>
          <div className="flex flex-row justify-between items-center">
            <ul className="list-none min-w-[300px] flex [&_div.button:hover]:bg-gray-100 [&_div.button]:cursor-pointer [&_div.button]:text-nowrap [&_div.button]:pl-5 [&_div.button]:pr-5 [&_div.button]:flex [&_div.button]:justify-center [&_div.button]:items-center [&_div.button]:h-[50px] [&_div.button.active]:text-blue-500 [&_div.button]:text-gray-600 [&_div.button]:rounded-none [&_div.button:hover]:outline-none [&_div.button]:font-[inherit] [&_div.button]:font-semibold [&_div.button.active:hover]:bg-blue-50">
              <div className={`button group relative`} onClick={()=>{}}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Producción
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
                <Menu info={
                  [
                    {
                      items: [
                        { title:'Nueva Carpeta', action:()=>{}, submenu:[] }
                      ],
                      division:true
                    },
                    {
                      items: [
                        { title:'Subir archivo', action:()=>{}, submenu:[] },
                        { title:'Subir carpeta', action:()=>{}, submenu:[] },
                        { title:'Informacion carpeta', action:()=>{}, submenu:[] }
                      ],
                      division:true
                    },
                    {
                      items: [
                        { title:'Ocultar', action:()=>{}, submenu:[] }
                      ],
                      division:false
                    }
                  ]
                }/>
              </div>
              <div className={`button group relative`} onClick={()=>{}}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Solicitudes
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
                {/* <Menu info={
                  [
                    {
                      items: [
                        { title:'Nueva Carpeta', action:()=>{}, submenu:[] }
                      ],
                      division:true
                    },
                    {
                      items: [
                        { title:'Subir archivo', action:()=>{}, submenu:[] },
                        { title:'Subir carpeta', action:()=>{}, submenu:[] },
                        { title:'Informacion carpeta', action:()=>{}, submenu:[] }
                      ],
                      division:true
                    },
                    {
                      items: [
                        { title:'Ocultar', action:()=>{}, submenu:[] }
                      ],
                      division:false
                    }
                  ]
                }/> */}
              </div>
              <div className={`button group relative`} onClick={()=>{}}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Logística
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
		<Menu info={
                  [
                    {
                      items: [
                        { title:'Movimientos de almacen', action:()=>navigate("/main/almacen/movimientos"), submenu:[] }
                      ],
                      division:true
                    },
                    {
                      items: [
                        { title:'Vista de inventario', action:()=>navigate("/main/almacen/inventario"), submenu:[] } 
                      ],
                      division:true
                    } 
                  ]
                }/>
              </div>
              <div className={`button group relative`} onClick={()=>{}}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Matenimiento
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
                <Menu info={
                  [
                    // {
                    //   items: [
                    //     { title:'General', action:()=>{}, submenu:[] }
                    //   ],
                    //   division:true
                    // },
                    {
                      items: [
                        { title:'Recetas', action:()=>navigate("/main/recetas"), submenu:[] },
                        { title:'Avios e Insumos', action:()=>navigate("/main/productos"), submenu:[] },
                        { title:'Proveedores', action:()=>navigate("/main/proveedores"), submenu:[] },
                        // { title:'Tallas y Colores', action:()=>{}, submenu:[] },
                        { title:'Atributos', action:()=>navigate("/main/mantenimiento"), submenu:[] },
                      ],
                      division:false
                    }
                  ]
                }/>
              </div>
              <div className={`button group relative`} onClick={()=>{}}>
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Reportes
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
                {/* <Menu info={
                  [
                    {
                      items: [
                        { title:'Nueva Carpeta', action:()=>{}, submenu:[] }
                      ],
                      division:true
                    },
                    {
                      items: [
                        { title:'Subir archivo', action:()=>{}, submenu:[] },
                        { title:'Subir carpeta', action:()=>{}, submenu:[] },
                        { title:'Informacion carpeta', action:()=>{}, submenu:[] }
                      ],
                      division:true
                    },
                    {
                      items: [
                        { title:'Ocultar', action:()=>{}, submenu:[] }
                      ],
                      division:false
                    }
                  ]
                }/> */}
              </div>
            </ul>
          </div>

        </div>
        <div onClick={onclick} className="avatar rounded-full w-8 h-8 bg-gray-300 cursor-pointer relative hover:outline-4 hover:outline hover:outline-gray-200">
          <div className="config w-[320px] h-[520px] pt-2 pb-2 bg-white rounded-md absolute right-2 top-10 shadow-lg shadow-gray-400/50 border z-50 flex flex-col gap-2 invisible opacity-0 focus:opacity-100 transition-opacity" tabIndex={-1} onBlur={onblur}>
            <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center flex-1'>
              <li>
                <div className='flex gap-2 p-3'>
                  <div>
                    <div className='rounded-full w-9 h-9 bg-slate-300'></div>
                  </div>
                  <div className='flex flex-col text-left [&_div:last-child]:text-[12px]'>
                    <div>View Profile</div>
                    <div>{user.nom + '/' + user.cor}</div>
                  </div>
                </div>
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <hr />
            <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
              <li>
                <div className='flex gap-2 p-3 w-[100%] settings'>
                  <div>
                    <svg fill="currentColor" height="20" icon-name="settings-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" className="__web-inspector-hide-shortcut__">
                      <path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 0 1-.992-1.137v-1.073a.97.97 0 0 0-.627-.878A.98.98 0 0 0 6.1 17l-.755.753a1.149 1.149 0 0 1-1.521.1 10.16 10.16 0 0 1-1.671-1.671 1.149 1.149 0 0 1 .1-1.523L3 13.906a.97.97 0 0 0 .176-1.069.98.98 0 0 0-.887-.649H1.216A1.145 1.145 0 0 1 .079 11.2a9.1 9.1 0 0 1 0-2.393 1.145 1.145 0 0 1 1.137-.992h1.073a.97.97 0 0 0 .878-.627A.979.979 0 0 0 3 6.1l-.754-.754a1.15 1.15 0 0 1-.1-1.522 10.16 10.16 0 0 1 1.673-1.676 1.155 1.155 0 0 1 1.522.1L6.1 3a.966.966 0 0 0 1.068.176.98.98 0 0 0 .649-.887V1.216A1.145 1.145 0 0 1 8.8.079a9.129 9.129 0 0 1 2.393 0 1.144 1.144 0 0 1 .991 1.137v1.073a.972.972 0 0 0 .628.878A.977.977 0 0 0 13.905 3l.754-.754a1.152 1.152 0 0 1 1.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 0 1-.1 1.522L17 6.1a.967.967 0 0 0-.176 1.068.98.98 0 0 0 .887.649h1.073a1.145 1.145 0 0 1 1.137.991 9.096 9.096 0 0 1 0 2.392 1.145 1.145 0 0 1-1.137.992h-1.073A1.041 1.041 0 0 0 17 13.905l.753.755a1.149 1.149 0 0 1 .1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 0 1-1.522-.1L13.906 17a.97.97 0 0 0-1.069-.176.981.981 0 0 0-.65.887v1.073a1.144 1.144 0 0 1-.99 1.137A9.431 9.431 0 0 1 10 20Zm-.938-1.307a7.638 7.638 0 0 0 1.875 0v-.982a2.292 2.292 0 0 1 3.853-1.6l.693.694a8.796 8.796 0 0 0 1.326-1.326l-.694-.694a2.29 2.29 0 0 1 1.6-3.851h.982a7.746 7.746 0 0 0 0-1.876h-.982a2.213 2.213 0 0 1-2.034-1.4 2.223 2.223 0 0 1 .438-2.451l.694-.693a8.76 8.76 0 0 0-1.327-1.326l-.692.694a2.22 2.22 0 0 1-2.434.445 2.221 2.221 0 0 1-1.419-2.041v-.979a7.638 7.638 0 0 0-1.875 0v.982a2.213 2.213 0 0 1-1.4 2.034 2.23 2.23 0 0 1-2.456-.438l-.693-.694a8.757 8.757 0 0 0-1.326 1.327l.694.692a2.216 2.216 0 0 1 .445 2.434 2.22 2.22 0 0 1-2.041 1.418h-.982a7.746 7.746 0 0 0 0 1.876h.982a2.213 2.213 0 0 1 2.034 1.4 2.223 2.223 0 0 1-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 0 1 2.433-.445 2.22 2.22 0 0 1 1.418 2.041v.983ZM10 13.229a3.23 3.23 0 1 1 0-6.458 3.23 3.23 0 0 1 0 6.458Zm0-5.208a1.979 1.979 0 1 0 0 3.958 1.979 1.979 0 0 0 0-3.958Z"></path>
                    </svg>
                  </div>
                  <div className='flex items-center text-left select-none flex-1'>Configuración</div>
                </div>
              </li>
            </ul>
            <hr />
            <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
              <li>
                <div onClick={logout} className='flex gap-2 p-3 w-[100%]'>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
                  </div>
                  <div className='flex items-center text-left select-none flex-1'>Cerrar sesión</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
