import { useState } from "react";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { Sidenav } from "./Sidenav";
import { Soporte } from "./Soporte";
import { Directory } from "./Directory";
import { Outlet } from "react-router-dom";

const componentMap = {
  Soporte: <Soporte/>,
  Directory: <Directory/>
}
export function Dasboard(){
  // const [content,setContent] = useState('Directory')
  return(
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative">
        <Header/>
        <div className="flex flex-1 overflow-hidden bg-[rgba(255,90,0,.12)]">
          <Sidenav/>
          <Outlet/>
          {/* <Sidenav setcontent={setContent}/> */}
          {/* {componentMap[content]} */}
        </div>
        <Modal/>
      </div>
    </>
  )
}