import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ModalContext } from "./contexts/contexts"
import { ContextualMenuContext } from "./components/ContextMenu/ContextualMenuContext"
import { convertToHex } from "./utils/utils"

const files_icon = {
  'folder':<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>,
  'file':<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>
}

const contextual_content = {
  context1 : 
    <>
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Descargar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
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
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-share"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3" /><path d="M16 22l5 -5" /><path d="M21 21.5v-4.5h-4.5" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Compartir</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Organizar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
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
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
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
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Descargar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
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
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-share"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3" /><path d="M16 22l5 -5" /><path d="M21 21.5v-4.5h-4.5" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Compartir</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Organizar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
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
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Cerrar sesión</div>
          </div>
        </li>
      </ul>
    </>
}

function Carpeta({name,ondoubleclick}){
  return(
    <>
      <tr className="text-left" tabIndex={-1} data-path={name.path} onDoubleClick={ondoubleclick}>
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
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
              </div>
            </li>
            <li>
              <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
              </div>
            </li>
          </ul>
        </td>
      </tr>
    </>
  )
}

function Breadcrumb({params}){
  const [list,setList] = useState([{name:'Directorio',path:'/'},{name:'Otro',path:'/'}])
  // console.log(convertToStr(params.directoryId))
  // console.log(params)
  return(
    <div className="text-[18px] flex flex-row items-center mb-3">
      {
        list.map((valor)=><><svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg><span className="hover:bg-gray-200 cursor-pointer pl-3 pt-1 pb-1 pr-3 rounded-e-full rounded-l-full block"><strong>{valor.name}</strong></span></>)
      }
    </div>
  )
}
async function Consulta(url,method = 'GET'){
  try {
    return await fetch(url,{
      method: method
    })
    .then(resp=>resp.ok ? resp.json() : Promise.reject())
  } catch (error) {
    Promise.reject()
    console.log('sdofo')
    // console.log(error)
  }
  // const onclick = (e)=>{
  //   if(e.target.matches("tr")){
  //     e.target.focus()
  //   }
  // }
}

export function Directory(){
  const [lista,setLista] = useState([{createdAt:'',isDirectory:'',isFile:'',name:'',path:'',size:'',updateAt:''}])
  const navigate = useNavigate()
  const params = useParams()
  const {open} = useContext(ContextualMenuContext)

  const onrightclick = (e)=>{
    e.preventDefault()
    open({
      position:{x:e.clientX,y:e.clientY},
      content: contextual_content.context1,
      actions: {
        descargar: (e)=>{
          alert("Descargando")
        }
      }
    })
  }
  const ondoubleclick = async (e)=>{
    if(e.target.matches("tr *")){
      const path = convertToHex(e.target.closest('tr').dataset.path)
      navigate(path)
    }
  }

  useEffect(()=>{
    Consulta('http://localhost:4000/directorio').then(resp=>{
      // console.log(resp)
      setLista(resp)
    }).catch(resp=>{
      console.log('hola')
    })
  },[])
  useEffect(()=>{
    if(Object.keys(params).length > 0){
      Consulta('http://localhost:4000/directorio/'+params.directoryId,'POST').then(resp=>{
        // console.log(resp)
        setLista(resp)
      }).catch(resp=>{
        console.log('hola')
      })
    }else{
      Consulta('http://localhost:4000/directorio').then(resp=>{
        // console.log(resp)
        setLista(resp)
      }).catch(resp=>{
        console.log('hola')
      })
    }
  },[params])

  return(
    <>
      <div onContextMenu={onrightclick} className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="text-left">
          <Breadcrumb params={params}/>
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
                lista.map((row,key)=><Carpeta key={key} name={row} ondoubleclick={ondoubleclick}/>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}