import { useEffect, useState } from "react"

function Carpeta({name}){
  return(
    <>
      {/* <div className="flex items-center gap-2 cursor-pointer border-b hover:bg-slate-200 p-3">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>
        <span>{name}</span>
      </div> */}
      <tr className="text-left">
        <td className="flex gap-5">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>
          {name.name}
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
      </tr>
    </>
  )
}
async function Consulta(){
  try {
    return await fetch('http://localhost:4000/directorio')
    .then(resp=>resp.ok ? resp.json() : Promise.reject())
  } catch (error) {
    console.log(error)
  }
}
export function Directory(){
  const [lista,setLista] = useState([1,2,3])
  useEffect(()=>{
    Consulta().then(resp=>{
      console.log(resp)
      setLista(resp)
    })
  },[])
  return(
    <>
        
      <div className="flex flex-col p-4 bg-white w-full">
        <div className="text-left">
          <span className=""><a href="">Directorio/</a></span>
          <hr />
        </div>
        <div className="bg-white text-left h-[700px] overflow-scroll scrollbar-special">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[10px] text-[12px] [&_tr:hover]:outline-red-600 [&_tr:hover]:outline-1 [&_tr:hover]:outline-double [&_tr:hover]:cursor-pointer [&_tr:hover]:bg-slate-200">
            <thead className="text-left">
              <tr>
                <th>Nombre</th>
                <th>Ruta</th>
                <th>Size</th>
                <th>Ultima Modificacion</th>
              </tr>
            </thead>
            <tbody>
              {
                lista.map((row,key)=><Carpeta key={key} name={row}/>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}