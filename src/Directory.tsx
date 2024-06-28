import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Carpeta({name,ondoubleclick}){
  return(
    <>
      <tr className="text-left" tabIndex={-1} data-path={name.path} onDoubleClick={ondoubleclick}>
        <td className="">
          <div className="flex items-center flex-1 gap-2">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>
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

function ContextualMenu({pos,visi}){
  const [position,setPosition] = useState(pos)
  const context_menu = useRef()
  useEffect(()=>{
    context_menu.current.style.left = `${position.x}px`
    // console.log(context_menu.current)
  },[position])
  // context_menu.current.classList.add(`left-[${pos.x}px] top-[${pos.y}px]`)
  // const [visible,setVisible] = useState(false)
  return(
    <div ref={context_menu} className="config w-[320px] h-[320px] pt-2 pb-2 bg-white rounded-md absolute shadow-lg shadow-gray-400/50 border z-50 flex flex-col gap-2 left-[100px] focus:opacity-100 transition-opacity" tabIndex={-1}>  
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center flex-1'>
        <li>
          <div className='flex gap-2 p-3'>
            <div>
              <div className='rounded-full w-9 h-9 bg-slate-300'></div>
            </div>
            <div className='flex flex-col text-left [&_div:last-child]:text-[12px]'>
              <div>View Profile</div>
              <div>u/Stunning_Homework22</div>
            </div>
          </div>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-2 p-3'>
            <div>
              <svg fill="currentColor" height="20" icon-name="settings-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" className="__web-inspector-hide-shortcut__">
                <path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 0 1-.992-1.137v-1.073a.97.97 0 0 0-.627-.878A.98.98 0 0 0 6.1 17l-.755.753a1.149 1.149 0 0 1-1.521.1 10.16 10.16 0 0 1-1.671-1.671 1.149 1.149 0 0 1 .1-1.523L3 13.906a.97.97 0 0 0 .176-1.069.98.98 0 0 0-.887-.649H1.216A1.145 1.145 0 0 1 .079 11.2a9.1 9.1 0 0 1 0-2.393 1.145 1.145 0 0 1 1.137-.992h1.073a.97.97 0 0 0 .878-.627A.979.979 0 0 0 3 6.1l-.754-.754a1.15 1.15 0 0 1-.1-1.522 10.16 10.16 0 0 1 1.673-1.676 1.155 1.155 0 0 1 1.522.1L6.1 3a.966.966 0 0 0 1.068.176.98.98 0 0 0 .649-.887V1.216A1.145 1.145 0 0 1 8.8.079a9.129 9.129 0 0 1 2.393 0 1.144 1.144 0 0 1 .991 1.137v1.073a.972.972 0 0 0 .628.878A.977.977 0 0 0 13.905 3l.754-.754a1.152 1.152 0 0 1 1.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 0 1-.1 1.522L17 6.1a.967.967 0 0 0-.176 1.068.98.98 0 0 0 .887.649h1.073a1.145 1.145 0 0 1 1.137.991 9.096 9.096 0 0 1 0 2.392 1.145 1.145 0 0 1-1.137.992h-1.073A1.041 1.041 0 0 0 17 13.905l.753.755a1.149 1.149 0 0 1 .1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 0 1-1.522-.1L13.906 17a.97.97 0 0 0-1.069-.176.981.981 0 0 0-.65.887v1.073a1.144 1.144 0 0 1-.99 1.137A9.431 9.431 0 0 1 10 20Zm-.938-1.307a7.638 7.638 0 0 0 1.875 0v-.982a2.292 2.292 0 0 1 3.853-1.6l.693.694a8.796 8.796 0 0 0 1.326-1.326l-.694-.694a2.29 2.29 0 0 1 1.6-3.851h.982a7.746 7.746 0 0 0 0-1.876h-.982a2.213 2.213 0 0 1-2.034-1.4 2.223 2.223 0 0 1 .438-2.451l.694-.693a8.76 8.76 0 0 0-1.327-1.326l-.692.694a2.22 2.22 0 0 1-2.434.445 2.221 2.221 0 0 1-1.419-2.041v-.979a7.638 7.638 0 0 0-1.875 0v.982a2.213 2.213 0 0 1-1.4 2.034 2.23 2.23 0 0 1-2.456-.438l-.693-.694a8.757 8.757 0 0 0-1.326 1.327l.694.692a2.216 2.216 0 0 1 .445 2.434 2.22 2.22 0 0 1-2.041 1.418h-.982a7.746 7.746 0 0 0 0 1.876h.982a2.213 2.213 0 0 1 2.034 1.4 2.223 2.223 0 0 1-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 0 1 2.433-.445 2.22 2.22 0 0 1 1.418 2.041v.983ZM10 13.229a3.23 3.23 0 1 1 0-6.458 3.23 3.23 0 0 1 0 6.458Zm0-5.208a1.979 1.979 0 1 0 0 3.958 1.979 1.979 0 0 0 0-3.958Z"></path>
              </svg>
            </div>
            <div className='flex flex-col items-center text-left'>Configuración</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-2 p-3'>
            <div>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Cerrar sesión</div>
          </div>
        </li>
      </ul>
    </div>
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
async function Consulta(){
  try {
    return await fetch('http://localhost:4000/directorio')
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
function convertToHex(str) {
  let hex = '';
  for(let i = 0; i < str.length; i++) {
    hex += ''+str.charCodeAt(i).toString(16);
  }
  return hex;
}
function convertToStr(hex) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
export function Directory(){
  const [lista,setLista] = useState([{createdAt:'',isDirectory:'',isFile:'',name:'',path:'',size:'',updateAt:''}])
  let positioncontext = useRef({x:0,y:0})
  const navigate = useNavigate()
  const params = useParams()

  const onrightclick = (e)=>{
    e.preventDefault()
    // console.log(e.target.closest('.directory').querySelector)
    // console.log(e.clientX)
    const actualizar_pos = (ref)=>{
      // ref.current.style
    }
    positioncontext.current = {x:e.clientX,y:e.clientY}
    // console.log(e.clientX)
    // e.target.closest('.directory').querySelector('.config').classList.remove('invisible')
    // e.target.closest('.directory').querySelector('.config').focus()
  }
  const ondoubleclick = async (e)=>{
    if(e.target.matches("tr *")){
      const path = convertToHex(e.target.closest('tr').dataset.path)
      console.log(path)
      navigate(path)
      // try {
      //   const result = await fetch("http://localhost:4000/directorio/"+path,{
      //     method:'POST'
      //   }).then(resp=>resp.ok?resp.json():Promise.reject())
      //   setLista(result)
      // } catch (error) {
      //   console.log(error)
      // }
    }
  }

  useEffect(()=>{
    Consulta().then(resp=>{
      // console.log(resp)
      setLista(resp)
    }).catch(resp=>{
      console.log('hola')
    })
  },[])

  return(
    <>
        
      <div onContextMenu={onrightclick} className="directory flex flex-col p-4 bg-white w-full relative">
        {/* <ContextualMenu pos={{x:250,y:200}} visi={''}/> */}
        <ContextualMenu pos={positioncontext.current} visi={''}/>
        {/* <div className="absolute w-80 h-80 bg-white shadow-lg rounded-md">
        </div> */}
        <div className="text-left">
          <Breadcrumb params={params}/>
          {/* <span className="">Directorio</span>   */}
          <hr />
        </div>
        <div className="bg-white text-left h-[700px] overflow-scroll scrollbar-special">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[10px] text-[12px] [&_tr:hover]:outline-red-600 [&_tr:hover]:outline-1 [&_tr:hover]:outline-double [&_tr:hover]:cursor-pointer [&_tr:hover]:bg-slate-100 focus:[&_tr:hover]:bg-blue-200 [&_tr:hover_ul]:visible focus:[&_tr]:bg-blue-200 table-fixed [&_ul]:invisible">
            <thead className="text-left">
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