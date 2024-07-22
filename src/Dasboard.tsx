import { Header } from "./Header";
import { Sidenav } from "./Sidenav";
import { Outlet, useNavigate } from "react-router-dom";
import { ContextualMenuProvider } from "./components/ContextMenu/ContextualMenuProvider";
import { AuthPermitions } from "./contexts/contexts";
import { useContext, useEffect } from "react";

export function Dasboard() {
  const { isAuthenticated, logout } = useContext(AuthPermitions)
  const navigate = useNavigate()
  console.log("entrando a children")
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("redirigiendo")
      navigate("/")
    }
  }, [isAuthenticated, navigate])
  return (
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative">
        <ContextualMenuProvider>
          <Header logout={logout} />
          <div className="relative flex flex-1 overflow-hidden bg-[rgba(187,187,187,0.12)]">
            <Sidenav />
            <Outlet />
          </div>
        </ContextualMenuProvider>
      </div>
    </>
  )
}