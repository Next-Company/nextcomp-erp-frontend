import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ContextualMenuContext } from "./components/ContextMenu/ContextualMenuContext"
import { convertToHex } from "./utils/utils"
import { ModalWindowContext } from "./components/ModalWindow/ModalWindowContext"
// import { useFetch } from "./hooks/useFetch"
import { AuthPermitions } from "./contexts/contexts"
// import { createPortal } from "react-dom"
// import { LoadingWindow } from "./components/LoadingWindow/LoadingWindow"

const files_icon = {
  'folder': <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>,
  'file': <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>
}

const contextual_content = {
  context1:
    <>
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Descargar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Cambiar nombre</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-share"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3" /><path d="M16 22l5 -5" /><path d="M21 21.5v-4.5h-4.5" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Compartir</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Organizar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Información carpeta</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Cerrar sesión</div>
          </div>
        </li>
      </ul>
    </>,
  context2:
    <>
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Nueva Carpeta</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M12 11v6" /><path d="M9.5 13.5l2.5 -2.5l2.5 2.5" /></svg>
            </div>
            <div className='flex items-center text-left flex-1' data-action='subir'>Subir archivo</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Subir carpeta</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Información carpeta</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Cerrar sesión</div>
          </div>
        </li>
      </ul>
    </>
}

function Carpeta({ name, ondoubleclick, onclick }) {
  return (
    <>
      <tr className="text-left" tabIndex={-1} data-path={name.path} onClick={onclick} onDoubleClick={ondoubleclick}>
        <td className="">
          <div className="flex items-center flex-1 gap-2">
            {name.isDirectory ? files_icon['folder'] : files_icon['file']}
            <span>{name.name}</span>
          </div>
        </td>
        <td>
          {name.path}
        </td>
        <td>
          {name.size}
        </td>
        <td>
          {name.updatedAt}
        </td>
        <td>
          <ul className="flex flex-row justify-end">
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" data-path={name.path}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
              </div>
            </li>
          </ul>
        </td>
      </tr>
    </>
  )
}

function Breadcrumb({ params }) {
  const [list, setList] = useState([{ name: 'Directorio', path: '/' }, { name: 'Otro', path: '/' }])
  // console.log(convertToStr(params.directoryId))
  // console.log(params)
  return (
    <div className="text-[18px] flex flex-row items-center mb-3">
      {
        list.map((valor) => <><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg><span className="hover:bg-gray-200 cursor-pointer pl-3 pt-1 pb-1 pr-3 rounded-e-full rounded-l-full block"><strong>{valor.name}</strong></span></>)
      }
    </div>
  )
}
async function Consulta(url, method = 'GET') {
  try {
    return await fetch(url, {
      method: method,
      credentials: 'include'
    })
      .then(resp => resp.ok ? resp.json() : Promise.reject())
  } catch (error) {
    Promise.reject()
    console.log('sdofo')
    // console.log(error)
  }
}

export function Directory() {
  const [lista, setLista] = useState([{ createdAt: '', isDirectory: '', isFile: '', name: '', path: '', size: '', updateAt: '' }])
  const navigate = useNavigate()
  const params = useParams()
  const { open } = useContext(ContextualMenuContext)
  const { openModal } = useContext(ModalWindowContext)
  const { logout } = useContext(AuthPermitions)

  const onclick = (e) => {
    if (e.target.matches("div[data-action='delete']")) {
      const path_file = convertToHex(e.target.dataset.path)
      openModal({
        open: true,
        content: <div>Hola mundo</div>,
        action: async () => {
          try {
            await fetch("http://localhost:4000/directorio/delete/" + path_file, {
              method: 'POST'
            }).then(resp => {
              console.log(resp)
              navigate(params.directoryId)
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    }
  }
  const onrightclick = (e) => {
    e.preventDefault()
    const content = e.target.matches('div') ? contextual_content.context2 : contextual_content.context1
    const actions =
      e.target.matches('div')
        ? (e) => {
          if (e.target.matches("div[data-action='subir'")) {
            const filebox = document.createElement('input')
            filebox.type = 'file'
            filebox.click()
            filebox.addEventListener('change', (ec) => {
              async function subirfile() {
                try {
                  const formdata = new FormData()
                  formdata.append('filenext', filebox.files[0])
                  console.log(params.directoryId)
                  await fetch("http://localhost:4000/directorio/upload/" + params.directoryId, {
                    method: 'POST',
                    body: formdata
                  }).then(resp => {
                    console.log(resp)
                    navigate(params.directoryId)
                  })
                } catch (error) {
                  console.log(error)
                }
              }
              subirfile()
            })
          }
        }
        : (e) => {
          console.log(e.target)
        }
    open({
      position: { x: e.clientX, y: e.clientY },
      content: content,
      actions: actions
    })
  }
  const ondoubleclick = async (e) => {
    if (e.target.matches("tr *")) {
      const path = convertToHex(e.target.closest('tr').dataset.path)
      navigate(path)
    }
  }
  // const options = useMemo(() => ({
  //   url: 'http://localhost:4000/directorio/',
  //   options: {
  //     method: 'GET',
  //     credentials: 'include'
  //   }
  // }), [])
  // let lista = [{ createdAt: '', isDirectory: '', isFile: '', name: '', path: '', size: '', updateAt: '' }]
  // const { data, loading, error } = useFetch(options)
  // console.log({ data, loading, error })
  // if (data) {
  //   lista = data
  // }
  // const { data, loading, error } = useFetch({
  //   method: 'GET',
  //   url: 'http://localhost:4000/directorio/',
  //   callbackSucces: (resp) => {
  //     setLista(resp)
  //   },
  //   callbackError: () => {
  //     logout()
  //   }
  // })
  // if (data) {
  //   setLista(data)
  // }
  // useEffect(() => {

  // }, [data])
  // Consulta('http://localhost:4000/directorio').then(resp=>{
  //   setLista(resp)
  // }).catch(resp=>{
  //   console.log('hola')
  // })
  useEffect(() => {
    if (Object.keys(params).length > 0) {
      Consulta('http://localhost:4000/directorio/' + params.directoryId, 'POST').then(resp => {
        setLista(resp)
      }).catch(resp => {
        console.log('hola')
      })
    } else {
      Consulta('http://localhost:4000/directorio').then(resp => {
        setLista(resp)
      }).catch(resp => {
        console.log('hola')
      })
    }
  }, [params])

  return (
    <>
      <div onContextMenu={onrightclick} className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="text-left">
          <Breadcrumb params={params} />
          <hr />
        </div>
        <div className="bg-white text-left h-[700px] overflow-scroll scrollbar-special">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[10px] text-[12px] [&_tr:hover]:outline-red-600 [&_tr:hover]:outline-1 [&_tr:hover]:outline-double [&_tr:hover]:cursor-pointer [&_tr:hover]:bg-slate-100 focus:[&_tr:hover]:bg-blue-200 [&_tr:hover_ul]:visible focus:[&_tr]:bg-blue-200 table-fixed [&_ul]:invisible">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th>Nombre</th>
                <th className="w-[650px]">Ruta</th>
                <th>Size</th>
                <th>Ultima Modificacion</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                lista?.map((row, key) => <Carpeta key={key} name={row} onclick={onclick} ondoubleclick={ondoubleclick} />)
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* {loading && createPortal(<LoadingWindow />, document.querySelector('#root'))} */}
    </>
  )
}