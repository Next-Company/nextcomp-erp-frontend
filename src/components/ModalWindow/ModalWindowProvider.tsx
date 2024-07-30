import { useState } from "react"
import { ModalWindow } from "./ModalWindow"
import { ModalWindowContext } from "./ModalWindowContext"

export function ModalWindowProvider({ children }) {
  const [config, setParams] = useState({})
  const openModal = (pr) => {
    setParams(pr)
  }
  return (
    <>
      <ModalWindowContext.Provider value={{ openModal, config }}>
        {children}
        <ModalWindow />
      </ModalWindowContext.Provider>
    </>
  )
}