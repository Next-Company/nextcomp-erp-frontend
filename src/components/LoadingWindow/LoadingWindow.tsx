import { useContext } from "react"
import { ModalWindowContext } from "../ModalWindow/ModalWindowContext"

export function LoadingWindow() {
  const {openloader} = useContext(ModalWindowContext)
  return (
    <>
      {/* <div className={`absolute w-[100vw] h-[100vh] bg-gray-500/10 top-0 flex justify-center items-center gap-3`}> */}
      <div id="cover" className={`${openloader ? 'absolute' : 'hidden'} w-[100vw] h-[100vh] bg-gray-600/40 top-0 flex justify-center items-center`}>
        {/* <svg id="loading_logo" className="w-[40px]" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.84 124.51"><defs></defs><path className="cls-1" style={{ fillRule: 'evenodd' }} d="M297.91,309.05,312,300.88l13.1,16.46-27.23,15.75L253.3,307.32V255.89l44.61-25.71,27.23,15.7L312,262.33l-14.13-8.17-23.77,13.75v3.3h32.05V292H274.14v3.3Zm-.27,34.81-27-15.53-27-15.6V250.48l27-15.54,27-15.59,27,15.59,27,15.54v62.25l-27,15.6Zm41.09-86.24v52.57l-20.9-26.31Z" transform="translate(-243.72 -219.35)" /></svg>
        Loading... */}
        {/* <div className="loader_juan scale-50 rotate-90">
          <div className="w-[50px] h-[50px] bg-yellow-500 rounded-full"></div>
          <div className="w-[70px] h-[70px] bg-orange-500 rounded-full"></div>
          <div className="w-[80px] h-[80px] bg-red-500 rounded-full"></div>
          <div className="w-[70px] h-[70px] bg-blue-400 rounded-full"></div>
          <div className="w-[50px] h-[50px] bg-green-400 rounded-full"></div>
        </div> */}
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}