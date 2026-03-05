import TableContext from "./Context/TableContext"

const HeadTable = ({children})=>{
  return(
    <thead className="text-left sticky top-0 bg-white">
      {children}
    </thead>
  )
}
const BodyTable = ({children})=>{
  return(
    <tbody>
      {children}
    </tbody>
  )
}
const FooterTable = ({children})=>{
  return(
    <footer>
      {children}
    </footer>
  )
}
export default function Table(children){
const {agregarmodelo = ()=>{},onclick = ()=>{},actions = [],bodycontent = <></>,headcontent = <></>,footercontent = <></>} = children
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
            </ul>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl">
          <div className="h-[450px] scrollbar-special overflow-y-scroll border-t-[.2px] border rounded-xl bg-gray-200">
            <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr:nth-child(2n)]:bg-white">
              <HeadTable>{headcontent}</HeadTable>
              <BodyTable>{bodycontent}</BodyTable>
              <FooterTable>{footercontent}</FooterTable>
            </table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  )
}