import { useState } from "react";
import { Search } from "../components/Atoms/Search/Search";
import { LoadingWindow } from "../components/LoadingWindow/LoadingWindow";
import { createPortal } from "react-dom";
import { InputG } from "../components/Atoms/Input/InputG";
import { InputTest } from "../components/Atoms/Input/InputTest";

export function Agenda() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[18px]">Agenda</h2>
          <div className="w-[400px]">
            <Search config={{ width: '200px' }} />
          </div>
        </div>
        <InputG>Documento</InputG>
        <div className="flex">
          <InputTest>Cambio</InputTest>
          <InputTest>Cambio</InputTest>
        </div>
        {/* <section className="grid grid-flow-col [&_div]:border-purple-500 [&_div]:border-[1px]">
          <div>ds</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section> */}
      </div>
      {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      }
    </>
  )
}