import { useContext } from "react"
import { ModalWindowContext } from "./components/ModalWindow/ModalWindowContext"
import { toast } from 'react-toastify';
import { Consulta } from "./utils/utils";
import { Search } from "./components/Atoms/Search/Search";
import { Button } from "./components/Atoms/Button/Button";

export function Table({ setedit, info, setselect, setrefresh, loading }) {
  const { openModal } = useContext(ModalWindowContext)
  
  const eliminarSoporte = async (id) => {
    openModal({
      open: true,
      title: 'Pregunta',
      header: false,
      controls: true,
      content: <div className="text-[14px] h-[100%] flex items-center justify-center">¿Desea eliminar el soporte seleccionado?</div>,
      action: async () => {
        await Consulta({
          url: 'soporte/' + id, 
          params: {
            method: 'DELETE'
          }
        })
          .then(resp => {
            console.log(resp)
            setrefresh(true)
            toast.success('Soporte eliminado con éxito!!',{theme: "colored"})
            // resp.ok 
            // ? toast.success('Soporte eliminado con éxito!!',{theme: "colored"})
            // : toast.error('Ocurrión un problema durante la tarea',{theme: "colored"})
          })
      }
    })
  }

  const verEstado = (row) => {
    openModal({
      open: true,
      header: true,
      title: 'Estado soporte',
      content: 
      <div className="w-[900px] h-[500px] text-left">
        <form className="pt-4 [&_input]:border-b [&_input]:p-1 [&_input]:text-[14px] [&_input]:outline-0 [&_input:focus-visible]:border-blue-700 [&_label]:text-[12px] [&_label]:font-medium flex flex-col text-left gap-4">
            <div className="lg:w-[50%] md:w-full columns-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor=""><strong>Asunto:</strong></label>
                <input name='asunto' className="" type="text" defaultValue={row.asunto} onKeyDown={()=>{return false;}}/>
              </div>
              <div className="break-before-column">
                <div className="flex flex-col h-[50px]">
                  <label className="block" htmlFor=""><strong>Prioridad:</strong></label>
                  <input name='prioridad' className="" type="text" defaultValue={row.prioridad}/>
                </div>
              </div>
            </div>
            <div className="col-1">
              <div className="flex flex-col">
                <label htmlFor=""><strong>Detalle soporte:</strong></label>
                <textarea name="descripcion" className="border rounded-sm p-2" rows={10} id="" defaultValue={row.descripcion}></textarea>
              </div>
            </div>
            {/* <div className="col-1">
              <button onClick={() => setModal(false)} className="bg-blue-600 text-white hover:bg-blue-700">Cerrar</button>
              <button onClick={() => setModal(false)} className="bg-blue-600 text-white hover:bg-blue-700">Cerrar</button>
            </div> */}
          </form>
      </div>
      ,
      action: async () => {

      }
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
      <div className="flex flex-col gap-2">
        {/* <div className="flex justify-between items-center mb-3"> */}
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[18px]">Soportes registrados</h2>
          <div className="w-[400px]">
            <Search config = {{width:'200px'}} />
          </div>
        </div>
        <hr />
      </div>
      <div>
        <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-50 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_span.colored]:transition-[width] [&_button.active:hover]:bg-blue-50">
          <button className="active otro">
            <span className="relative h-[100%] flex items-center">
              Todos
              <span className="absolute bottom-0 border-b-[3px] border-b-blue-500 flex items-center w-[100%] h-[100%] colored"></span>
            </span>
          </button>
          <button>Pendientes</button>
          <button>Terminados</button>
        </ul>
      </div>
      <hr />
      <div className="bg-white text-left h-[80%] overflow-scroll scrollbar-special flex-1">
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer [&_tr:hover_ul]:visible [&_ul]:invisible">
          <thead>
            <tr className="sticky top-0 bg-white">
              <th>Id</th>
              <th>Asunto</th>
              <th>Usuario</th>
              <th>Emisión</th>
              <th>Avance</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              info && info.map((row, id) =>
                <tr key={id}>
                  <td>{row.idx}</td>
                  <td>{row.asunto}</td>
                  <td>ADMIN</td>
                  <td>{row.created_at}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-[150px] h-1 rounded-full bg-gray-200">
                        <div className={`w-[${((parseFloat(row.avance) * 150) / 100).toFixed(0)}px] h-1 rounded-full bg-green-500`}></div>
                      </div>
                      <span><strong>{row.avance}%</strong></span>
                    </div>
                  </td>
                  <td><div className={`w-[45px] h-[15px] ${row.prioridad == 'ALTA' ? 'bg-red-400' : row.prioridad == 'MEDIA' ? 'bg-orange-400' : 'bg-green-400'}  text-[8px] text-white flex justify-center items-center`}>{row.prioridad}</div></td>
                  <td>{row.estado}</td>
                  <td>
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={() => eliminarSoporte(row.idx)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => verEstado(row)}>
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
      <hr/>
      <div className="flex justify-end mt-3 gap-2">
        <Button action={()=>{setrefresh(true)}} tipo={'default'}>Actualizar</Button>
        <Button action={newFila} tipo={'accept'}>Nuevo</Button>
      </div>
    </>
  )
}