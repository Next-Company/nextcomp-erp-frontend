import { useContext, useEffect } from "react";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { AuthPermitions } from "./contexts/contexts";
import { useNavigate } from "react-router-dom";
export function Config(){
  const { isAuthenticated, logout, credentials } = useContext(AuthPermitions)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("redirigiendo")
      navigate("/")
    }
  }, [isAuthenticated, navigate])
  return(
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative bg-gray-100/50">
        <Header logout={logout} credentials = {credentials}/>
        <div className="flex-col flex-1 w-[60%] h-[500px] m-auto bg-white p-[35px]">
          <div id="header">
            <div className="flex pb-4 gap-2">
              <div className="w-[50px] h-[50px] rounded-full bg-slate-400"></div>
              <div className="flex-row">
                <div>Juanjhon(juanjhonv)</div>
                <div>Tu cuenta personal</div>
              </div>
            </div>
          </div>
          <hr />
          <div id="body" className="flex">
            <aside className="w-[250px] text-left p-4">
              <ul className="flex-col gap-4 [&_li]:block [&_li]:text-red-400">
                <li>Perfil publico</li>
                <li><a href="#">Cuenta</a></li>
                <li><a href="#">Apariencia</a></li>
                <li><a href="#">Accesibilidad</a></li>
                <li><a href="#">Notificaciones</a></li>
              </ul>
              <hr />
              <code className="top-2 text-[12px]">Access</code>
              <ul>
                <li><a href="#">Planes y pagos</a></li>
                <li><a href="#">Correos</a></li>
                <li><a href="#">Sesiones</a></li>
                <li><a href="#">Empresa</a></li>
                <li><a href="#">Apariencia</a></li>
              </ul>
            </aside>
            <div className="flex-1 text-left [&_input]:border-black [&_input]:border-[1px] p-4">
              <span className="text-[30px]">Public Profile</span>
              <form action="">
                <div>
                  <label htmlFor="nombre">Name</label>
                  <input name="nombre" type="text" />
                </div>
                <div>
                  <label htmlFor="nombre">Name</label>
                  <input name="nombre" type="text" />
                </div>
                <div>
                  <label htmlFor="nombre">Name</label>
                  <input name="nombre" type="text" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}