import { useContext, useEffect, useRef, useState } from "react"
import { ModalWindowContext } from "./ModalWindowContext"
import { Button } from "../Atoms/Button/Button"

export function ModalWindow() {
  const modalref = useRef(null)
  const { config } = useContext(ModalWindowContext)
  const [content, setContent] = useState(config.content)
  const [open, setOpen] = useState(true)

  const onclick = (e) => {
    e.stopPropagation()
    if (e.target.matches('div.close-modal')) {
      setOpen(false)
    }
  }

  const acceptFunction = (e) => {
    e.stopPropagation()
    config.action(modalref.current)
    setOpen(false)
  }
  const actionBackground = (e) => {
    e.target.querySelector('div#conc').classList.add('bouncing')
  }
  const onanimationend = (e) => {
    e.target.classList.remove('bouncing')
  }
  const cerrarModal = (e) => {
    e.stopPropagation()
    setOpen(false)
  }
  useEffect(() => {
    setOpen(config.open)
    setContent(content => content = config.content)
    return () => {
      setContent(content => content = <><div></div></>)
    }
  }, [config])
  useEffect(() => {
    modalref.current.focus()
  }, [open])
  return (
    <>
      <div ref={modalref} className={`absolute ${open ? 'z-[100] bg-black/50' : 'z-[-1] other'} flex justify-center items-center opacity-[1] top-0 left-0 w-[100vw] h-[100vh] transition-all text-[14px]`} onClick={actionBackground} tabIndex={-1}>
        <div id="conc" onAnimationEnd={onanimationend} className="min-w-[500px] min-h-[250px] p-[5px] bg-white rounded-md flex flex-col justify-between transition-all" onClick={onclick}>
          {
            (config.header && true)
              ? <header className={`h-[45px] bg-green-400/0 ${(config.header ?? true) ? 'block' : 'hidden'} rounded-t-md flex justify-between items-center border-b-[1px] border-gray-200`}>
                <div className="pl-3">{config.title ?? ''}</div>
                <div className="flex gap-2">
                  <div className="w-[30px] h-[30px] hover:bg-gray-200 rounded-full flex justify-center items-center cursor-pointer transition-[background-color]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"></path>
                    </svg>
                  </div>
                  <div className="w-[30px] h-[30px] rounded-full hover:bg-gray-200 flex justify-center items-center cursor-pointer transition-[background-color] close-modal">
                    <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z" className="style-scope yt-icon"></path></g></svg>
                  </div>
                </div>
              </header>
              :
              <header className={`h-[45px] bg-green-400/0 rounded-t-md flex justify-end items-center`}>
                <div className="flex gap-2">
                  <div className="w-[30px] h-[30px] rounded-full hover:bg-gray-200 flex justify-center items-center cursor-pointer transition-[background-color] close-modal">
                    <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z" className="style-scope yt-icon"></path></g></svg>
                  </div>
                </div>
              </header>
          }

          <section className="flex-1 p-2 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              {/* <strong className="">Pregunta</strong>
              <title>Pregunta</title> */}
              {/* {open && config.content} */}
              {/* {config.content} */}
              {content}
            </div>
            {/* <div className={`flex gap-1 [&_button]:flex-1 ${(config.controls && 'true') ? 'block' : 'hidden' }`}> */}
            <div className={`flex gap-1 justify-end ${(config.controls && 'true') ? 'block' : 'hidden'}`}>
              <Button action={cerrarModal} tipo={'default'}>Cancelar</Button>
              <Button action={acceptFunction} tipo={'default'}>Aceptar</Button>
            </div>
          </section>
          {/* <footer className="h-[40px] bg-green-400/0 rounded-b-md flex justify-center items-center border-t-[1px] border-gray-200">
          </footer> */}
        </div>
      </div>
    </>
  )
}