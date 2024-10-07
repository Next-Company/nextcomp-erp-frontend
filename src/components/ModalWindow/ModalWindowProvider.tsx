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
  useEffect(()=>{
    // console.log(config)
    // return () => console.log(config)
  },[config])
  return (
    <>
      <ModalWindowContext.Provider value={{ openModal, config, setOpenloader, openloader}}>
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
        {/* <div className="bg-gray-600/40 absolute top-0 w-full h-full flex justify-center items-center"> */}
        <LoadingWindow/>
        {/* <div className="bg-white/40 absolute top-0 w-full h-full flex justify-center items-center">
          <div className="loader_juan scale-50 rotate-90">
            <div className="w-[50px] h-[50px] bg-yellow-500 rounded-full"></div>
            <div className="w-[70px] h-[70px] bg-orange-500 rounded-full"></div>
            <div className="w-[80px] h-[80px] bg-red-500 rounded-full"></div>
            <div className="w-[70px] h-[70px] bg-blue-400 rounded-full"></div>
            <div className="w-[50px] h-[50px] bg-green-400 rounded-full"></div>
          </div>
        </div> */}
      </ModalWindowContext.Provider>
    </>
  )
}