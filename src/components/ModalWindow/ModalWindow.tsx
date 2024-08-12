import { useContext, useEffect, useRef, useState } from "react"
import { ModalWindowContext } from "./ModalWindowContext"
import { Input } from "../Atoms/Input/Input"
import { Button } from "../Atoms/Button/Button"

export function ModalWindow() {
  const modalref = useRef(null)
  const { config } = useContext(ModalWindowContext)
  const [open, setOpen] = useState(true)
  const acceptFunction = () => {
    config.action()
    setOpen(false)
  }
  useEffect(() => {
    setOpen(config.open)
    // modalref.current.classList.add('other')}
  }, [config])
  // useEffect(() => {
  // }, [open])
  return (
    <>
      {/* <div ref={modalref} className={`absolute ${open ? 'z-[100] bg-gray-600/30' : 'z-[-1] other'} flex justify-center items-center opacity-[1] top-0 left-0 w-[100vw] h-[100vh] transition-all`}> */}
      <div ref={modalref} className={`absolute ${open ? 'z-[100] bg-gray-600/30' : 'z-[-1] other'} flex justify-center items-center opacity-[1] top-0 left-0 w-[100vw] h-[100vh] transition-all `} onClick={() => console.log('Presionando el fondo')}>
        <div id="conc" className="w-[500px] h-[250px] p-[5px] bg-orange-300 rounded-md flex flex-col justify-between transition-all">
          <div className="h-[45px] bg-green-400/0 rounded-t-md flex justify-between items-center border-b-[1px] border-gray-200">
            <div className="pl-3">Mensaje</div>
            <div className="flex gap-2">
              <div className="w-[30px] h-[30px] hover:bg-gray-200 rounded-full flex justify-center items-center cursor-pointer transition-[background-color]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"></path>
                </svg>
              </div>
              <div className="w-[30px] h-[30px] rounded-full hover:bg-gray-200 flex justify-center items-center cursor-pointer transition-[background-color]">
                <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z" className="style-scope yt-icon"></path></g></svg>
              </div>
            </div>
          </div>
          <div className="flex-1 p-2 flex flex-col">
            <div className="flex-1">
              <strong className="">Pregunta</strong>
              <title>Pregunta</title>
              <p className="text-[14px]">{config.content}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={acceptFunction}>Aceptar</button>
              <button onClick={() => setOpen(false)}>Cancelar</button>
              <Button />
            </div>

          </div>
          <div className="h-[40px] bg-green-400/0 rounded-b-md flex justify-center items-center border-t-[1px] border-gray-200">
          </div>
        </div>
      </div>
    </>
  )
}