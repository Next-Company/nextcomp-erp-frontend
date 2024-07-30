import { useState } from "react";
import { LoadingWindow } from "./LoadingWindow";
import { LoadingWindowContext } from "./LoadinWindowContext";

export function LoadingWindowProvider({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <LoadingWindowContext.Provider value={{ setOpen, open }}>
        {children}
        <LoadingWindow />
      </LoadingWindowContext.Provider>
    </>
  )
}