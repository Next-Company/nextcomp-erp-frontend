import TableContext from "./Context/TableContext"

const HeadTable = ({children})=>{
  return(
    children
  )
}
const BodyTable = ({children})=>{
  return(
    <TableContext.Provider value={{}}>
      {children}
    </TableContext.Provider>
  )
}
const FooterTable = ({children})=>{
  return(
    <TableContext.Provider value={{}}>
      {children}
    </TableContext.Provider>
  )
}
export default function Table(children){
const {agregarmodelo = ()=>{},onclick = ()=>{},actions = [],bodycontent,headcontent} = children
  // const [bodycontent,setBodycontent] = useState('')
  // const 
  return(
    <TableContext.Provider value={{HeadTable}}>
      <div>
        <div className="flex flex-row justify-between rounded-full mb-2">
          <div className="w-[400px]">
            <div className="flex items-center border rounded-full gap-3 bg-gray-200 pl-4 p-1 pr-4 has-[:focus]:bg-white has-[:focus]:shadow-md transition-all" onClick={onclick}>
              {
                0
                ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
              }
              <input type="searh" className={`h-[30px] flex-1 bg-transparent focus:outline-none`} placeholder="Busqueda soporte" />
            </div>
          </div>
          <div>
            <ul className="flex w-[150px] flex-row justify-end rounded-full p-[2px] gap-2 [&_div]:cursor-pointer border bg-gray-200">
              {
                actions.map((action,key)=>
                  <li key={key}>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action={action.name} onClick={action.trigger} data-position={key}>
                      {action.icon}
                    </div>
                  </li>
                )
              }
              {/* <li>
                <div className="rounded-full w-9 h-9 hover:bg-white hover:text-red-600 transition-colors flex justify-center items-center" data-action="clear" onClick={onclick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
                </div>
              </li>
              <li>
                <div className="rounded-full w-9 h-9 hover:bg-white transition-colors flex justify-center items-center" data-action="add" onClick={agregarmodelo}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl">
          <div className="h-[450px] scrollbar-special overflow-y-scroll border-t-[.2px] border rounded-xl bg-gray-200">
            <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr:nth-child(2n)]:bg-white">
              {/* <thead className="text-left sticky top-0 bg-white">
                <tr>
                  <th className="lg:table-cell min-w-[300px]">Modelo</th>  
                  <th className="lg:table-cell min-w-[200px]">Color</th>
                  <th className="lg:table-cell min-w-[100px]">UsaReceta</th>
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <th className="lg:table-cell">{talla.toUpperCase()}</th>
                    )
                  }
                  <th className="lg:table-cell text-center">Disponible</th>
                  <th className="lg:table-cell">Acciones</th>
                </tr>
              </thead> */}
              <HeadTable>{headcontent}</HeadTable>
              <BodyTable>{bodycontent}</BodyTable>
              {/* <tbody>
                {
                  modelos && modelos.map((row,key)=>(
                    <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                      <td><input data-name="articulo" type="text" onChange={editvalue} data-position={key} value={row.articulo}/></td>
                      <td className="text-center whitespace-nowrap">{row.color}</td>
                      <td className="text-center ">
                        <input type="checkbox" onChange={onchange} data-position={key}/>
                      </td>
                      {
                        tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                          <td className="text-center"><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla]}/></td>    
                        )
                      }
                      <td className="text-center">{tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,talla)=>c+parseInt(row[talla]||0),0)}</td>
                      <td className="w-[250px]">
                        <ul className="flex flex-row justify-end">
                          {
                            actions.map((action)=>
                              <li key={key}>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action={action.name} onClick={onclick} data-position={key}>
                                  {action.icon}
                                </div>
                              </li>
                            )
                          }
                        </ul>
                      </td>
                    </tr>
                  ))
                }
              </tbody> */}
              {/* <tfoot className="sticky bottom-0 bg-white">
                <tr className="h-[50px] text-[14px]">
                  <td></td>
                  <td></td>
                  <td className="text-center font-extrabold">DISPONIBLE</td>
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <td className="text-center font-extrabold">{
                        {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla]
                      }</td>
                    )
                  }
                  <td className="text-center font-extrabold">{Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0)}</td>
                  <td></td>
                </tr>
                <tr className="h-[50px] text-[14px]">
                  <td></td>
                  <td></td>
                  <td className="text-center font-extrabold">TOTAL</td>
                  {
                    tallaslist.filter(r=>r.selected)[0].tallasformateado.split('-').map(talla=>
                      <td className={`text-center font-extrabold ${disponible[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0) < 0 ? 'text-red-600' : ''}`}>
                        {
                          {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0)
                        }
                      </td>
                    )
                  }
                  <td className={`text-center font-extrabold ${Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0) < 0 ? 'text-red-600' : ''}`}>
                    {
                      Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0)
                    }
                  </td>
                  <td></td>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  )
}