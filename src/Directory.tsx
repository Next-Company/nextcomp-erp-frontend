const apiUrl = import.meta.env.VITE_API_URL
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ContextualMenuContext } from "./components/ContextMenu/ContextualMenuContext"
import { Consulta, convertToHex, convertToStr } from "./utils/utils"
import { ModalWindowContext } from "./components/ModalWindow/ModalWindowContext"
import { AuthPermitions } from "./contexts/contexts"
import { toast } from "react-toastify"
import { Input } from "./components/Atoms/Input/Input"
import { Search } from "./components/Atoms/Search/Search"

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
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Ocultar</div>
          </div>
        </li>
      </ul>
    </>,
  context2:
    <>
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_div]:pointer-events-none'>
        <li data-action='new_folder'>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Nueva Carpeta</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_div]:pointer-events-none'>
        <li data-action='subir'>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M12 11v6" /><path d="M9.5 13.5l2.5 -2.5l2.5 2.5" /></svg>
            </div>
            <div className='flex items-center text-left flex-1'>Subir archivo</div>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Ocultar</div>
          </div>
        </li>
      </ul>
    </>
}

function Carpeta({ name, ondoubleclick, onclick }) {
  const { openModal, config } = useContext(ModalWindowContext)
  const configurarPermisos = (e) => {
    openModal({
      open: true,
      header: false,
      content: <>
        <div>Desea continuar con el registro del soporte ingresado?</div>
      </>,
      controls: false,
      action: async () => {
      }
    })
  }
  return (
    <>
      <tr className="text-left" tabIndex={-1} data-path={name.path} data-directory={name.isDirectory ? 1 : 0} data-name={name.name} onClick={onclick} onDoubleClick={ondoubleclick}>
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
              {/* <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" data-path={name.path} onClick={borrarDirectorio}> */}
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" data-path={name.path} data-dirpath={name.dirpath} data-directory={name.isDirectory ? 1 : 0}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download" data-path={name.path} data-dirpath={name.dirpath} data-directory={name.isDirectory ? 1 : 0} data-name={name.name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" data-path={name.path} data-dirpath={name.dirpath} data-directory={name.isDirectory ? 1 : 0} data-name={name.name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="authorization" data-path={name.path} data-dirpath={name.dirpath} data-directory={name.isDirectory ? 1 : 0}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock-cog"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10c.564 0 1.074 .234 1.437 .61" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /><path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19.001 15.5v1.5" /><path d="M19.001 21v1.5" /><path d="M22.032 17.25l-1.299 .75" /><path d="M17.27 20l-1.3 .75" /><path d="M15.97 17.25l1.3 .75" /><path d="M20.733 20l1.3 .75" /></svg>
              </div>
            </li>
          </ul>
        </td>
      </tr>
    </>
  )
}

function Breadcrumb({ params }) {
  // const [list, setList] = useState([{ name: 'Directorio', path: '/' }, { name: 'Otro', path: '/' }])
  const [list, setList] = useState([{ name: 'Directorio', path: '/' }])
  // console.log(convertToStr(params.directoryId))
  // console.log(params)
  return (
    // <div className="flex gap-2 justify-between">
    <div className="flex gap-2">
      <div className="text-[18px] flex flex-row items-center mb-3 flex-1">
        {
          list.map((valor, key) =>
            <>
              {
                key > 0 && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
              }
              <span className="hover:bg-gray-200 cursor-pointer pl-3 pt-1 pb-1 pr-3 rounded-e-full rounded-l-full block">
                <strong>{valor.name}</strong>
              </span>
            </>)
        }
      </div>
      <div className="w-[400px]">
        <Search config={{ width: '200px' }} />
      </div>
    </div>
  )
}

export function Directory() {
  const [lista, setLista] = useState([{ createdAt: '', isDirectory: '', isFile: '', name: '', path: '', size: '', updateAt: '' }])
  const navigate = useNavigate()
  const params = useParams()
  const { open } = useContext(ContextualMenuContext)
  const { openModal } = useContext(ModalWindowContext)
  const { logout } = useContext(AuthPermitions)
  const gdrive = useRef()

  const onclick = (e) => {
    if (e.target.matches("div[data-action='delete']")) {
      const data = new FormData()
      const path_file = convertToHex(e.target.dataset.path)
      const path = Object.keys(params).length > 0 ? params.directoryId : ''
      // const dir_path = convertToHex(e.target.dataset.dirpath)
      data.append('tipo', e.target.dataset.directory)
      console.log('Dentro del click :', params)
      openModal({
        open: true,
        content: <div>Desea proceder con la eliminación del registro seleccionado?</div>,
        controls: true,
        action: async (container) => {
          await Consulta({
            url: 'directorio/' + path_file,
            params: {
              method: 'DELETE',
              body: data
            }
          }).then(resp => {
            console.log(resp)
            console.log(params.directoryId)

            Consulta({ url: 'directorio/' + path, params: { method: path == '' ? 'GET' : 'POST' } }).then(resp => {
              setLista(resp)
            }).catch(resp => {
              logout()
            })
            toast.success(resp.message, { theme: "colored" })
            // resp.ok 
            // ? toast.success('Soporte eliminado con éxito!!',{theme: "colored"})
            // : toast.error('Ocurrión un problema durante la tarea',{theme: "colored"})
          })
        }

      })
    }
    if (e.target.matches("div[data-action='download']")) {
      let info = convertToHex(JSON.stringify({ name: e.target.dataset.name, path: e.target.dataset.path }))
      openModal({
        open: true,
        content: <div>Desea proceder con la descarga del archivo seleccionado?</div>,
        controls: true,
        action: async () => {
          window.location.href = apiUrl + 'directorio/download/' + info.toString()
        }

      })
    }
    if (e.target.matches("div[data-action='edit']")) {
      // const data = new FormData()
      const path_file = convertToHex(e.target.dataset.path)
      const dir_path = convertToHex(e.target.dataset.dirpath)

      openModal({
        open: true,
        header: false,
        controls: true,
        content:
          <div className="w-full h-[200px]">
            <form action="">
              Nuevo nombre
              <Input name="new_name" title="Nombre carpeta" type="text" defaults="" />
            </form>
          </div>,
        action: async (container) => {
          const data = new FormData(container.querySelector('form'))
          const path = Object.keys(params).length > 0 ? params.directoryId : ''
          data.append('path', path)
          data.append('name', e.target.dataset.name)
          data.append('tipo', e.target.dataset.directory)
          await Consulta({
            url: 'directorio/rename/',
            params: {
              method: 'POST',
              body: data
            }
          }).then(resp => {
            Consulta({ url: 'directorio/' + path, params: { method: path == '' ? 'GET' : 'POST' } }).then(resp => {
              setLista(resp)
            }).catch(resp => {
              logout()
            })
            // navigate(params.directoryId)
            toast.success('Carperta creada con éxito!!', { theme: "colored" })

            // resp.ok 
            // ? toast.success('Soporte eliminado con éxito!!',{theme: "colored"})
            // : toast.error('Ocurrión un problema durante la tarea',{theme: "colored"})
          })
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
          if (e.target.matches("li[data-action='subir'")) {
            const filebox = document.createElement('input')
            filebox.type = 'file'
            filebox.multiple = true
            // filebox.webkitdirectory = true
            filebox.click()
            filebox.addEventListener('change', (ec) => {
              async function subirfile() {
                try {
                  const data = new FormData()
                  const path = Object.keys(params).length > 0 ? params.directoryId : ''
                  console.log(filebox.files)
                  for (const element of filebox.files) {
                    data.append('filenext', element)
                  }
                  data.append('path', path)
                  await Consulta({
                    url: 'directorio/upload/',
                    params: {
                      method: 'POST',
                      body: data
                    }
                  }).then(resp => {
                    Consulta({ url: 'directorio/' + path, params: { method: path == '' ? 'GET' : 'POST' } }).then(resp => {
                      setLista(resp)
                    }).catch(resp => {
                      logout()
                    })
                    toast.success('Carperta creada con éxito!!', { theme: "colored" })
                  })
                } catch (error) {
                  console.log(error)
                }
              }
              subirfile()
            })
          }
          if (e.target.matches("li[data-action='new_folder'")) {
            openModal({
              open: true,
              header: false,
              controls: true,
              content:
                <div className="w-full h-[200px]">
                  <form action="">
                    Nuevo nombre
                    <Input name="name" title="Nombre carpeta" type="text" defaults="" />
                  </form>
                </div>,
              action: async (container) => {
                const data = new FormData(container.querySelector('form'))
                const path = Object.keys(params).length > 0 ? params.directoryId : ''
                data.append('path', path)
                console.log('Nueva direccion:', convertToStr(path))
                // console.log('Datos de la variable directorio :',params.directoryId ? params.directoryId : '/')
                // toast.success('Carperta creada con éxito!!', { theme: "colored" })
                // toast.success('')
                await Consulta({
                  url: 'directorio/create/',
                  params: {
                    method: 'POST',
                    body: data
                  }
                }).then(resp => {
                  console.log(resp)
                  Consulta({ url: 'directorio/' + path, params: { method: path == '' ? 'GET' : 'POST' } }).then(resp => {
                    setLista(resp)
                  }).catch(resp => {
                    logout()
                  })
                  toast.success('Carperta creada con éxito!!', { theme: "colored" })
                })
              }
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
      const tipo = parseInt(e.target.closest('tr').dataset.directory)
      console.log(tipo)
      if(tipo){
        navigate('/main/directorio/' + path)
      }else{
        let info = convertToHex(JSON.stringify({ name: e.target.closest('tr').dataset.name, path: e.target.closest('tr').dataset.path }))
        window.location.href = apiUrl + 'directorio/download/' + info.toString()
      }
    }
  }
  const onmouseover = (e) => {
    if (e.target.closest('div.directory')) {
      // console.log('hola mundo')
    }
  }
  const ondragover = (e) => {
    console.log("sosteniendo archivos sobre el contenedor")
    gdrive.current.classList.remove('oculto')
  }
  const ondragleave = (e) => {
    console.log("sosteniendo archivos sobre el contenedor")
    gdrive.current.classList.add('oculto')
  }
  useEffect(() => {
    if (Object.keys(params).length > 0) {
      Consulta({ url: 'directorio/' + params.directoryId, params: { method: 'POST' } }).then(resp => {
        setLista(resp)
      }).catch(resp => {
        console.log('hola')
        logout()
      })
    } else {
      Consulta({
        url: 'directorio/', params: {
          method: 'GET'
        }
      }).then(resp => {
        setLista(resp)
      }).catch(resp => {
        console.log('hola')
      })
    }
  }, [params])

  return (
    <>
      <div onContextMenu={onrightclick} onMouseOver={onmouseover} onDragOver={ondragover} onDragLeave={ondragleave} className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="p-2">

          <div className="text-left">
            <Breadcrumb params={params} />
            <hr />
          </div>
          <div className="bg-white text-left overflow-scroll scrollbar-special">
            {/* <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tbody_tr]:border-b [&_td]:p-[10px] text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer [&_tbody_tr:hover]:bg-slate-100 focus:[&_tbody_tr:hover]:bg-blue-200 [&_tbody_tr:hover_ul]:visible focus:[&_tr]:bg-blue-200 table-fixed [&_ul]:invisible"> */}
            <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer [&_tr:hover_ul]:visible [&_ul]:invisible">
              <thead className="text-left sticky top-0 bg-white">
                <tr>
                  <th>Nombre</th>
                  <th className="w-[650px]">Ruta</th>
                  <th>Size</th>
                  <th>Ultima Modificacion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  lista?.map((row, key) => <Carpeta key={key} name={row} onclick={onclick} ondoubleclick={ondoubleclick} />)
                }
              </tbody>
            </table>
          </div>

          <div className="absolute bottom-0 border-red-500 flex w-full justify-center items-center">
            <div className="transition-all oculto" ref={gdrive}>
              <div className="bg-blue-600 w-[330px] h-[80px] rounded-full flex flex-col justify-center items-center text-white animate-bounce">
                Suelta los archivos para subirlos a
                <div className="flex justify-center items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-database-import"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" /><path d="M4 6v6c0 1.657 3.582 3 8 3c.856 0 1.68 -.05 2.454 -.144m5.546 -2.856v-6" /><path d="M4 12v6c0 1.657 3.582 3 8 3c.171 0 .341 -.002 .51 -.006" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /></svg>
                  <span>Mi unidad</span>
                </div>
                <div className="absolute top-[-50px] bg-blue-600 h-10 w-20 rounded-full flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-big-up text-white z-10 relative"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" /></svg>
                  <div className="absolute top-[-15px] left-[15px] bg-blue-600 h-12 w-12 rounded-full z-[1px]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      {/* {loading && createPortal(<LoadingWindow />, document.querySelector('#root'))} */}
    </>
  )
}