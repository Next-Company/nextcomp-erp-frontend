import { useContext } from "react"
import ServiceContext from "../contexto/ServicioContext"

export default function ServicePanelInsumos(){
  const {panelactive,registros,tipo} = useContext(ServiceContext)
  return(
    <div className={`h-[450px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 0 && 'hidden'}`}> 
      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
        <thead className="text-left sticky top-0 bg-white">
          <tr>
            <th className="lg:table-cell w-[500px]">Descripcion</th>  
            <th className="lg:table-cell">Modelo</th>
            <th className="lg:table-cell">#Corte</th>
            <th className="lg:table-cell">Color</th>
            <th className="lg:table-cell">Rollos</th>
            <th className="lg:table-cell">Cantidad</th>
            <th className="lg:table-cell">Unidad</th>
            {
              tipo == 1 && <th className="lg:table-cell">Conversion(UND)</th>
            }
            <th className="lg:table-cell">Precio</th>
            <th className="lg:table-cell">Importe</th>
            <th className="lg:table-cell">Anulado</th>
            <th className="lg:table-cell">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            registros.length > 0 && registros.map((row,key)=>(
              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                {/* <td className="text-center">{row.producto}</td> */}
                {
                  tipo == 2
                  ? <td><input type="text" onChange={editvalue} data-position={key} data-name="producto" value={row.producto} /></td>
                  : <td className="text-center">{row.producto}</td>
                }
                {/* {
                  tipo == 2 || row.origen == 'manual'
                  ? <td><input type="text" onChange={editvalue} data-position={key} data-name="producto" value={row.producto} /></td>
                  : <td className="text-center">{row.producto}</td>
                } */}
                <td><input type="text" onChange={editvalue} data-position={key} data-name="modelo" value={row.modelo} /></td>
                <td><input type="text" onChange={editvalue} data-position={key} data-name="corte" value={row.corte} /></td>
                <td><input type="text" onChange={editvalue} data-position={key} data-name="color" value={row.color} /></td>
                <td><input type="number" onChange={editvalue} data-position={key} data-name="rollos" value={row.rollos} /></td>
                <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" value={row.cantidad} /></td>
                <td><input type="text" onChange={editvalue} data-position={key} data-name="unidad" value={row.unidad} /></td>
                {
                  tipo == 1 && <td><input type="number" onChange={editvalue} data-position={key} data-name="conversion" value={row.conversion} /></td>
                }
                <td><input type="number" onChange={editvalue} data-position={key} step=".001" data-name="precio" value={row.precio} /></td>
                <td><input type="number" readOnly onChange={editvalue} data-position={key} data-name="importe" value={(row.cantidad*row.precio).toFixed(3)} /></td>
                <td><input type="checkbox" id="anulado" onChange={editvalue} data-position={key} data-name="anulado" checked={row.anulado}  /></td>
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
            <td colSpan={4} className="text-right"></td>
            <td className="text-center"><strong className="text-[14px]">TOTAL: </strong></td>
            <td className="text-center text-[14px] font-bold">
              {registros.reduce((acc,row)=> acc + (parseFloat(row.cantidad)),0).toFixed(3)}
            </td>
            <td className="text-center">-</td>
            <td className="text-center">-</td>
            {/* <td className="text-center">-</td> */}
            <td className="text-center text-[14px] font-bold">
              {registros.reduce((acc,row)=> acc + (parseFloat(row.cantidad) * parseFloat(row.precio)),0).toFixed(3)}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={12} >
              <div className="flex flex-row justify-center gap-2">
                {
                  tipo == 0 && <div onClick={searchproducto} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                  </div>
                }
                {
                  tipo == 1 && <div onClick={searchproducto} className="bg-blue-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-blue-600">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                  </div>
                }
                {
                  tipo == 2 && <div onClick={nuevoproducto} className="bg-orange-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-orange-600">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                  </div>
                }
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}