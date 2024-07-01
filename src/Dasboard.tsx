import { useState } from "react";
import { Header } from "./Header";
import { Sidenav } from "./Sidenav";
import { Outlet } from "react-router-dom";
// import { ModalContext } from "./contexts/contexts";
import { ContextualMenuProvider } from "./components/ContextMenu/ContextualMenuProvider";

export function Dasboard(){
  return(
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative">
        <ContextualMenuProvider>
          <Header/>
          <div className="relative flex flex-1 overflow-hidden bg-[rgba(187,187,187,0.12)]">
            <Sidenav/>
            <Outlet/>
          </div>
        </ContextualMenuProvider>
      </div>
    </>
  )
}