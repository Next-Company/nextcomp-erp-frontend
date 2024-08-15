import { useState } from "react";
import { Search } from "../components/Atoms/Search/Search";
import { LoadingWindow } from "../components/LoadingWindow/LoadingWindow";
import { createPortal } from "react-dom";
import { InputG } from "../components/Atoms/Input/InputG";

export function ChatRoom(){
  const [ loading, setLoading ] = useState(false)
  return(
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="directory flex flex-col gap-4 p-4 m-3 rounded-md bg-white w-[400px] relative">
          {/* <Search/>
          <InputG/> */}
        </div>
      </div>
      {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      }
    </>
  )
}