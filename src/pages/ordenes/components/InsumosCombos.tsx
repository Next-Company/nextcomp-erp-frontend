import { useState } from "react"
import { Button } from "../../../components/Atoms/Button/Button"

export default function InsumosCombos({tallasbase,orden,setorden,insumo,actions}){
  const [info,setInfo] = useState(orden)
  console.log("Reenderizado del componente InsumosCombos")
  const addcombos = (e)=>{
    const position = e.target.dataset.position
    const selected = e.target.dataset.selected
    console.log("Los valores del combo seleccionado son:",insumo,position,selected)
    console.log('Validacion boleana :',selected,selected ? 'hola' : 'adios')
    if(parseInt(selected)){
      // console.log("Dentro de true",info)
      setInfo(cc=>[{...cc[0],combos:cc[0].combos.map((row,key)=>key == parseInt(position) ? ({...row,insumos:(row.insumos && row.insumos.length > 0) ? row.insumos.filter(ids=>parseInt(ids) !== parseInt(insumo)) : [] }) : row)}])
    }else{
      // console.log("Dentro de false",info)
      setInfo(cc=>[{...cc[0],combos:cc[0].combos.map((row,key)=>key == parseInt(position) ? {...row,insumos:( (row.insumos && row.insumos.length > 0)? [...row.insumos,parseInt(insumo)] : [parseInt(insumo)] )} : row)}])  
    }
  }
  const updatecombos = ()=>{
    actions(info)
  }
  console.log("La informacion de info vinculo recibida es:",info,insumo)
  return(
    <>
      <div className='h-[650px] w-[1100px] flex flex-col overflow-hidden'>
        <div className="flex-1 scrollbar-special rounded-md overflow-y-scroll">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr.selected:nth-child(n)]:bg-green-200 [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell w-[200px]">ColorCombo</th>  
                {
                  tallasbase && tallasbase.tallas.map(row=><th className="lg:table-cell">{row.desc.toUpperCase()}</th>)
                }
                <th className="lg:table-cell">Cantidad</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(info[0]).length > 0 && info[0].combos && info[0].combos.map((row,key)=>(
                  <tr key={key} className={`focus-visible:[&_input]:outline-[0px] group focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent ${(row.insumos && row.insumos.includes(parseInt(insumo))) ? 'selected' : ''}`}>
                  {/* <tr key={key} className={`focus-visible:[&_input]:outline-[0px] group focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent ${row.insumos.includes(insumo) ? 'selected' : ''}`}> */}
                    {/* <td><input type="text" onChange={editvalue} data-name="color_combo" data-position={key} value={row.color_combo} /></td> */}
                    <td className="text-center w-[200px]">{row.color_combo}</td>
                    {
                      tallasbase && tallasbase.tallas.map(talla=><td>{row[talla.desc] ?? 0}</td>)
                    }
                    <td>{row.cantidad_combo}</td>
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
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="edit" data-selected={(row.insumos && row.insumos.includes(insumo)) ? 1 : 0} onClick={addcombos}>
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
          <Button action={updatecombos} type={'button'} tipo={'default'}>Aceptar</Button>
        </div>
      </div>  
    </>
  )
}