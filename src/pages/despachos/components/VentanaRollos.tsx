import { useState } from "react"
import { Button } from "../../../components/Atoms/Button/Button"

export function VentanaRollos(children){
  const {actions,info=[]} = children
  const [lista,setLista] = useState(info)
  const addrollo = ()=>{
    setLista([...lista,{peso:0,partida:'',cantidad:0}])
  }
  const onclick = (e)=>{
    const action = e.target.dataset.action ?? ''
    const position = e.target.dataset.position ?? -1
    console.log("La posiconi es:",position,action)
    switch (action) {
      case 'delete':
        // setLista(row=>row.map((v,k)=>k == position ?) )
        setLista(row=>row.filter((v,k)=>k !== parseInt(position)))
        break;
    
      default:
        break;
    }
  }
  return(
    <>
      <div className="flex flex-col mb-2">
        <div className="h-[500px] w-[1000px] scrollbar-special rounded-md overflow-y-scroll">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">#</th>  
                <th className="lg:table-cell">Peso</th>
                <th className="lg:table-cell">Partida</th>
                <th className="lg:table-cell">Cantidad</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.length > 0 && lista.map((row,key)=>(
                <tr key={key} data-position={key} data-action="add" onClick={()=>{}} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                  <td className="w-[100px]">{key + 1}</td>
                  <td className=""><input type="number" onChange={(e)=>setLista(lista=>lista.map((row,pos)=>(pos == key ? {...row,peso:e.target.value} : row )))} data-position={key} data-name="peso" value={row.peso} step={'0.01'} /></td>
                  <td className=""><input type="text" onChange={(e)=>setLista(lista=>lista.map((row,pos)=>(pos == key ? {...row,partida:e.target.value} : row )))} data-position={key} data-name="partida" value={row.partida} /></td>
                  <td className=""><input type="number" onChange={(e)=>setLista(lista=>lista.map((row,pos)=>(pos == key ? {...row,cantidad:e.target.value} : row )))} data-position={key} data-name="cantidad" value={row.cantidad} step={'0.01'} /></td>
                  <td className="w-[250px]">
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-position={key} data-action="add" onClick={onclick}>
                          <svg  xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 bg-white">
              <tr>
                <td colSpan={5} >
                  <div className="flex flex-row justify-center gap-2">
                    <div onClick={addrollo} className={`bg-blue-500 hover:bg-blue-600 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer `}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex flex-row justify-end gap-3 mt-3">
          <Button action={()=>{}} type={'button'} tipo={'default'}>Cancelar</Button>
          <Button action={()=>actions(lista)} type={'button'} tipo={'default'}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}