import { Header } from "./Header";
import { Modal } from "./Modal";
export function Config(){
  return(
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px] relative">
        <Header/>
        <div className="flex flex-1 overflow-hidden bg-[rgba(255,90,0,.12)]">
          <h1>Config</h1>
        </div>
        <Modal/>
      </div>
    </>
  )
}