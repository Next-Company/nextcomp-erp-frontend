import { useContext, useEffect } from "react";
import { Header } from "./Header";
import { AuthPermitions } from "./contexts/contexts";
import { Outlet, useNavigate } from "react-router-dom";
export function Config() {
  const { isAuthenticated, logout, credentials } = useContext(AuthPermitions)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("redirigiendo")
      navigate("/")
    }
  }, [isAuthenticated, navigate])
  return (
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative ">
        <Header logout={logout} credentials={credentials} />
        <div className="flex-col flex-1 w-[80%] h-[500px] m-auto bg-white p-[35px]">
          <div id="header">
            <div className="flex pb-4 gap-2">
              <div className="w-[45px] h-[45px] rounded-full bg-slate-400"></div>
              <div className="flex-row">
                <div>Juanjhon(juanjhonv)</div>
                <div>Tu cuenta personal</div>
              </div>
            </div>
          </div>
          <hr />
          <div id="body" className="flex">
            <aside className="w-[280px] text-left p-4">
              <code className="text-[12px]"><strong>Access</strong></code>
              <ul className="flex flex-col [&_li]:rounded-md [&_li]:p-2 [&_li:hover]:bg-gray-100 [&_li:hover]:cursor-pointer [&_a]:pointer-events-none">
                <li onClick={() => navigate('settings')}>Perfil público</li>
                <li>Cuenta</li>
                <li>Apariencia</li>
                <li>Accesibilidad</li>
                <li>Notificaciones</li>
              </ul>
              <hr className="pb-1" />
              <code className="text-[12px]"><strong>Settings</strong></code>
              <ul className="flex flex-col [&_li]:rounded-md [&_li]:p-2 [&_li:hover]:bg-gray-100 [&_li:hover]cursor-pointer">
                <li>Planes y pagos</li>
                <li>Correos</li>
                <li>Sesiones</li>
                <li>Empresa</li>
                <li>Apariencia</li>
              </ul>
            </aside>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}