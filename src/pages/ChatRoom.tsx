import { useState } from "react";
import { Search } from "../components/Atoms/Search/Search";
import { LoadingWindow } from "../components/LoadingWindow/LoadingWindow";
import { createPortal } from "react-dom";

export function ChatRoom(){
  const [ loading, setLoading ] = useState(false)
  return(
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <Search/>
      </div>
      {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      }
    </>
  )
}