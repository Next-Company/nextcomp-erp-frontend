import { useState } from "react"
import { ModalWindow } from "./ModalWindow"
import { ModalWindowContext } from "./ModalWindowContext"
import { ToastContainer } from 'react-toastify';

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
        <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </ModalWindowContext.Provider>
    </>
  )
}