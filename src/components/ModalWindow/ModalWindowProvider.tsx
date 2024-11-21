import { useEffect, useState } from "react"
import { ModalWindow } from "./ModalWindow"
import { ModalWindowContext } from "./ModalWindowContext"
import { ToastContainer } from 'react-toastify';
import { LoadingWindow } from "../LoadingWindow/LoadingWindow";

export function ModalWindowProvider({ children }) {
  const [config, setParams] = useState({})
  const [openloader, setOpenloader] = useState(false)
  const openModal = (pr) => {
    setParams(pr)
  }
  useEffect(() => {
    console.log("Hola desde mi modal!")
    // console.log(config)

    // return () => console.log(config)
  })
  useEffect(() => {
    // console.log(config)
    // return () => console.log(config)
  }, [config])
  return (
    <>
      <ModalWindowContext.Provider value={{ openModal, config, setOpenloader, openloader }}>
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
        <LoadingWindow />
      </ModalWindowContext.Provider>
    </>
  )
}