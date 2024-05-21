export function Table({setedit,info}){
  return(
    <>
      <div className="bg-white text-left h-[700px] overflow-scroll scrollbar-special">
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[5px] [&_tr:nth-child(even)]:bg-[rgb(233,233,233)] text-[12px] [&_tr:hover]:outline-red-600 [&_tr:hover]:outline-1 [&_tr:hover]:outline-double [&_tr:hover]:cursor-pointer">
          <thead>
            <tr className="sticky top-0 bg-white">
              <th>Id</th>
              <th>Tipo</th>
              <th>Serie</th>
              <th>Nom</th>
              <th>Dir</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              info.map(row=>
                <tr>
                  <td>{row.idx}</td>
                  <td>{row.tipo}</td>
                  <td>{row.serie}</td>
                  <td>{row.nom}</td>
                  <td>{row.dir}</td>
                  <td>
                    <button onClick={()=>setedit(false)} className="">Edit</button>
                    <button onClick={()=>setedit(false)} className="">Delete</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}