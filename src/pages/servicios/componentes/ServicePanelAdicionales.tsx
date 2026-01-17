import { useContext } from "react"
import ServiceContext from "../contexto/ServicioContext"

export default function ServicePanelAdicionales(){
  const { panelactive, adicionales, setAdicionales } = useContext(ServiceContext)
  const nuevoregistro = ()=>{
    setAdicionales([...adicionales,{id_servicio_CAB:'',descripcion:'',cantidad:0,unidad:'UND',costo:0}])
  }
  const onclick = (e)=>{
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch(action){
      case 'delete':
        setAdicionales(adicionales.filter((row,key)=>key !== parseInt(position)))
        break;
      case 'clone':
        let copia = adicionales.filter((row,key)=>key == parseInt(position))[0]
        setAdicionales([...adicionales,copia])
        break;
      default :
    }
  }
  const editvalue = (e)=>{
    let column = e.target.dataset.name
    let position = e.target.dataset.position
    setAdicionales([...adicionales.map((item,key)=> position == key ? {...item,[column]: e.target.value} : item)])
    // if(tipo == 0){
    //   if(column == 'color'){
    //     setAdicionales([...adicionales.map((item,key)=> position == key ? {...item, color: e.target.value, idx_color:'', id_producto_CAB:''}:item)])
    //   } else if(column == 'producto'){
    //     setAdicionales([...adicionales.map((item,key)=> position == key ? {...item, producto: e.target.value, idx_producto:''}:item)])
    //   } else{
    //     setAdicionales([...adicionales.map((item,key)=> position == key ? {...item,[column]: (column == 'anulado' ? e.target.checked : e.target.value)}:item)])
    //   }
    // }else{
    //   setAdicionales([...adicionales.map((item,key)=> position == key ? {...item,[column]: (column == 'anulado' ? e.target.checked : e.target.value)}:item)])
    // }
  }
  const searchservicio = ()=>{
 
  }
  return(
    <div className={`h-[450px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 1 && 'hidden'}`}> 
      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
        <thead className="text-left sticky top-0 bg-white">
          <tr>
            <th className="lg:table-cell w-[500px]">Descripcion</th>  
            <th className="lg:table-cell">Cantidad</th>
            <th className="lg:table-cell">Unidad</th>
            <th className="lg:table-cell">Precio</th>
            <th className="lg:table-cell">Importe</th>
            <th className="lg:table-cell">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            adicionales.length > 0 && adicionales.map((row,key)=>(
              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                <td><input type="text" onChange={editvalue} data-position={key} data-name="descripcion" value={row.descripcion} /></td>
                <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" value={row.cantidad} /></td>
                <td><input type="text" onChange={editvalue} data-position={key} data-name="unidad" value={row.unidad} /></td>
                <td><input type="number" onChange={editvalue} data-position={key} step=".001" data-name="costo" value={row.costo} /></td>
                <td><input type="number" readOnly onChange={editvalue} data-position={key} data-name="importe" value={(row.cantidad*row.costo).toFixed(3)} /></td>
                <td className="w-[250px]">
                  <ul className="flex flex-row justify-end">
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="clone" onClick={onclick} data-position={key}>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          }
        </tbody>
        <tfoot className="sticky bottom-0 bg-white">
          <tr>
            <td className="text-center"><strong className="text-[14px]">TOTAL: </strong></td>
            <td className="text-center text-[14px] font-bold">
              {adicionales.reduce((acc,row)=> acc + (parseFloat(row.cantidad)),0).toFixed(3)}
            </td>
            <td className="text-center">-</td>
            <td className="text-center">-</td>
            <td className="text-center text-[14px] font-bold">
              {adicionales.reduce((acc,row)=> acc + (parseFloat(row.cantidad) * parseFloat(row.costo)),0).toFixed(3)}
            </td>
            <td></td>
            {/* <td></td> */}
          </tr>
          <tr>
            <td colSpan={12} >
              <div className="flex flex-row justify-center gap-2">
                <div onClick={nuevoregistro} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">+</div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}