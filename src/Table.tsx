import { createSearchParams } from "react-router-dom"

async function EliminarItem(id){
  return await fetch(`http://localhost:4000/soporte/`+id,{
    method:'DELETE'
  })
  .then(resp=>resp.json())
}

export function Table({setedit,info}){
  const onclick = async (id)=>{
    await EliminarItem(id)
    .then(resp=>{
      // setedit(false)
      console.log(resp)
    })   
  }
  const editarFila = ()=>{
    setedit(false)
  }
  return(
    <>
      <div className="bg-white text-left h-[500px] overflow-scroll scrollbar-special">
        {/* <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[5px] [&_tr:nth-child(even)]:bg-[rgb(233,233,233)] text-[12px] [&_tr:hover]:outline-red-600 [&_tr:hover]:outline-1 [&_tr:hover]:outline-double [&_tr:hover]:cursor-pointer"> */}
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[8px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer">
          <thead>
            <tr className="sticky top-0 bg-white">
              <th>Id</th>
              <th>Asunto</th>
              <th>Emisión</th>
              <th>Avance</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              info.map((row,id)=>
                <tr key={id}>
                  <td>{row.idx}</td>
                  <td>{row.asunto}</td>
                  <td>{row.created_at}</td>
                  {/* <td>{row.avance}</td> */}
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-[150px] h-1 rounded-full bg-gray-200">
                        <div className="w-[20px] h-1 rounded-full bg-red-500"></div>
                      </div>
                      <span><strong>{row.avance}%</strong></span>
                    </div>
                  </td>
                  <td>{row.prioridad}</td>
                  <td>{row.estado}</td>
                  <td>
                    <div className="flex justify-center" onClick={()=>editarFila()}>
                      <div className="w-7 h-7 rounded-full p-1 flex justify-center items-center bg-gray-200 relative [&_div]:hover:w-[200px] [&_div]:hover:visible [&_div]:hover:opacity-100 [&_div]:hover:bg-green-200">
                        <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical z-10"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        <div className="h-7 rounded-full bg-gray-200 flex justify-between p-1 transition-all opacity-0 w-[0px] invisible absolute right-[0px]">
                          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical z-10"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        {/* <button>Cancelar</button> */}
        <button className="bg-blue-600 text-white hover:bg-blue-700" onClick={()=>setedit(false)}>Nuevo</button>
      </div>
    </>
  )
}