import { Header } from "./Header";
import { Sidenav } from "./Sidenav";
import { Outlet, useNavigate } from "react-router-dom";
import { ContextualMenuProvider } from "./components/ContextMenu/ContextualMenuProvider";
import { AuthPermitions } from "./contexts/contexts";
import { createContext, useContext, useEffect } from "react";
import SideNavMobileProvider from "./components/SideNavMobile/SideNavMobileProvider";
import { ModalWindowProvider } from "./components/ModalWindow/ModalWindowProvider";

export function Dasboard() {
  const { isAuthenticated, logout, credentials } = useContext(AuthPermitions)
  const navigate = useNavigate()

  // const SideNavMobile = createContext(null)
  // console.log("entrando a children")
  // console.log(JSON.parse(credentials))
  useEffect(() => {
    console.log("El valo de isAuthenticated es:",isAuthenticated)
    if (!isAuthenticated) {
      console.log("redirigiendo")
      navigate("/")
    }
  }, [isAuthenticated, navigate])
  return (
    <>
      <ModalWindowProvider>
        <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative">
          <ContextualMenuProvider>
            <SideNavMobileProvider>
              <Header logout={logout} credentials={credentials} />
              <div className="relative flex flex-1 h-full overflow-hidden bg-[rgba(146,146,146,0.12)]">
                <Sidenav />
                <Outlet />
              </div>
            </SideNavMobileProvider>
          </ContextualMenuProvider>
        </div>
      </ModalWindowProvider>
    </>
  )
}