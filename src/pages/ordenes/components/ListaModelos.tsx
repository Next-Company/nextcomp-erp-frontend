import { useState } from "react"
import { Button } from "../../../components/Atoms/Button/Button"

export default function ListaModelos(children){
  const {modelos,actions,pricemodel} = children
const [models,setModels] = useState(modelos)
  console.log("Hola desde la listra de modelos")
  // const {modelos,setmodelos,info=[]} = children
  const addmodelo = (e) => {
    const position = parseInt(e.target.dataset.position)
    console.log("Dentro de add modelos",modelos,position)
    setModels(row=>[...row.map((modelo,key)=> key == position ? {...modelo,selected:!modelo?.selected,pricemodel:pricemodel} : modelo)])
  }
  const guardar = () => {
    actions(models)
  }
  return(
    <>
      <div className='h-[550px] w-[900px] flex flex-col overflow-hidden'>
        <div className="flex-1 scrollbar-special rounded-md overflow-y-scroll">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr.selected:nth-child(n)]:bg-green-200 [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell w-[200px]">#</th>  
                <th className="lg:table-cell">Modelo</th>
                <th className="lg:table-cell">Color</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                models.length > 0 && models.map((row,key)=>(
                  <tr key={key} className={`focus-visible:[&_input]:outline-[0px] group focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent ${row?.selected ? 'selected' : ''}`}>
                    {/* <td className="text-center">{row?.selected ? 'selected' : ''}</td> */}
                    <td className="text-center">{row.selected}</td>
                    <td className="text-center">{row.articulo.toUpperCase()}</td>
                    <td className="text-center">{row.color.toUpperCase()}</td>
                    <td className="w-[150px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete_combo_orden" onClick={()=>{}} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="edit" onClick={addmodelo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>  
        <div className="flex flex-row justify-end gap-3 mt-3">
          <Button action={()=>{}} type={'button'} tipo={'default'}>Cancelar</Button>
          <Button action={guardar} type={'button'} tipo={'default'}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}