import { Header } from "./Header";
import { Modal } from "./Modal";
import { Sidenav } from "./Sidenav";
import { Soporte } from "./Soporte";

export function Dasboard(){
  return(
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative">
        <Header/>
        <div className="flex flex-1 overflow-hidden bg-[rgba(255,90,0,.12)]">
          <Sidenav/>
          <Soporte/>
        </div>
        <Modal/>
      </div>
    </>
  )
}