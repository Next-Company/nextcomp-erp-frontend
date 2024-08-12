import { useContext } from "react"
import { ModalWindowContext } from "./components/ModalWindow/ModalWindowContext"

async function EliminarItem(id) {
  return await fetch(`http://localhost:4000/soporte/` + id, {
    method: 'DELETE'
  })
    .then(resp => resp.json())
}

export function Table({ setedit, info, setselect, setmodal }) {
  const { openModal, config } = useContext(ModalWindowContext)
  const onclick = async (id) => {
    await EliminarItem(id)
      .then(resp => {
        // setedit(false)
        console.log(resp)
      })
  }
  const editarFila = (id) => {
    const select = info.find(row => row.idx == id)
    setselect(select)
    setedit(false)
  }
  const newFila = () => {
    setselect({})
    setedit(false)
  }
  const showModal = () => {
    openModal({
      open: true,
      content: <div>Hola mundo as asdfa</div>,
      action: async () => {

      }
    })
  }
  return (
    <>
      <div className="bg-white text-left h-[500px] overflow-scroll scrollbar-special">
        {/* <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[5px] [&_tr:nth-child(even)]:bg-[rgb(233,233,233)] text-[12px] [&_tr:hover]:outline-red-600 [&_tr:hover]:outline-1 [&_tr:hover]:outline-double [&_tr:hover]:cursor-pointer"> */}
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[8px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer [&_tr:hover_ul]:visible [&_ul]:invisible">
          <thead>
            <tr className="sticky top-0 bg-white">
              <th>Id</th>
              <th>Asunto</th>
              <th>Emisión</th>
              <th>Avance</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              info.map((row, id) =>
                <tr key={id}>
                  <td>{row.idx}</td>
                  <td>{row.asunto}</td>
                  <td>{row.created_at}</td>
                  {/* <td>{row.avance}</td> */}
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-[150px] h-1 rounded-full bg-gray-200">
                        {/* <div className={`w-[${((row.avance / 150)*100).toFixed(0)}px] h-1 rounded-full bg-red-500`}></div> */}
                        <div className={`w-[${((parseFloat(row.avance) * 150) / 100).toFixed(0)}px] h-1 rounded-full bg-red-500`}></div>
                        {/* <div className={`w-[38px] h-1 rounded-full bg-red-500`}></div> */}
                      </div>
                      <span><strong>{row.avance}%</strong></span>
                    </div>
                  </td>
                  <td><div className={`w-[45px] h-[15px] ${row.prioridad == 'ALTA' ? 'bg-red-400' : row.prioridad == 'MEDIA' ? 'bg-orange-400' : 'bg-green-400'}  text-[8px] text-white flex justify-center items-center`}>{row.prioridad}</div></td>
                  <td>{row.estado}</td>
                  <td>
                    <ul className="flex flex-row justify-end">
                      <li>
                        {/* <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" data-path={name.path}> */}
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={setmodal}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={showModal}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => editarFila(row.idx)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white hover:bg-blue-700" onClick={newFila}>Nuevo</button>
      </div>
    </>
  )
}