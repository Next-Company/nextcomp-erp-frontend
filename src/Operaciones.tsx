import { useContext, useEffect, useState } from "react";
import { Button } from "./components/Atoms/Button/Button";
import { Search } from "./components/Atoms/Search/Search";
import { Input } from "./components/Atoms/Input/Input";
import { InputSelect } from "./components/Atoms/Input/InputSelect";
import { TextArea } from "./components/Atoms/Input/TextArea";
import OrdenProduccion from "./OrdenProduccion";
import { Consulta } from "./utils/utils";
import { AuthPermitions } from "./contexts/contexts";

// const ListaSoportes = ({ save, children })=>{
const ListaSoportes = ({ children })=>{
  const onsubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    for (const element of data.entries()) {
      console.log(element)
    }
    // save(e.target)
  }
  return (
    <>
      <div className="">
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-[18px]">Nuevo Soporte</h2>
          </div>
          <hr />
        </div>
        <form onSubmit={onsubmit} className="pt-4 flex flex-col gap-4">
          {children}
        </form>
      </div>
    </>
  )
}

const OrdenesDetalle = ({setOnedit})=>{
  return(
    <>
        <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
          <button className="group active" data-estado="ALL">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Ordenes
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group flex-row items-center gap-1" data-estado="EMIT">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Telas
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group flex-row items-center gap-1" data-estado="FNLZ">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Molde
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group" data-estado="FNLZ">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Hoja de corte
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group" data-estado="FNLZ">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Confeccion
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group" data-estado="FNLZ">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Ojal y botón
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group" data-estado="FNLZ">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Estampado
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group" data-estado="FNLZ">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Lavanderia
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group" data-estado="FNLZ">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Bordado
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group" data-estado="FNLZ">
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Acabados
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
        </ul>
        <hr/>
        <div className="flex flex-col gap-2 pt-4">
          {/* <div className="flex-1 w-full bg-red-500 h-[80px]">sd</div>
          <div className="flex-1 w-[200px] bg-red-500 h-[80px]">sdf</div> */}
          <div className="flex gap-2">
            <Input name={'idx'} defaults='' type="hidden" />
            <Input name={'oc'} defaults={'otro'} title="OC" type="number" />
            <Input name={'cliente'} defaults={'otro'} title="Cliente" type="text" />
            <Input name={'fec_emitida'} defaults="" title="FechaEmision" type="date" />
            <Input name={'fec_entrega'} defaults="" title="FechaEntrega" type="date" />
            {/* <InputSelect title={'Prioridad'} name={"prioridad"} data={[{ indice: 'ALTA', option: 'Alta', selected: true }, { indice: 'MEDIA', option: 'Media' }, { indice: 'BAJA', option: 'Baja' },]} df={'ALTA'} />
            <InputSelect title={'Categoria'} name={"categoria"} data={[{ indice: 'IMPL', option: 'Implementaciones', selected: true }, { indice: 'SOPT', option: 'Soportes' }, { indice: 'PRCT', option: 'Proyecto' },]} df={'PRCT'} /> */}
          </div>
          <div className="flex gap-2">
            <Input name={'marca'} defaults={'otro'} title="Marca" type="text" />
            <Input name={'producto'} defaults={'otro'} title="Producto" type="text" />
            <Input name={'base'} defaults={'otro'} title="Base" type="text" />
            <Input name={'modelos'} defaults={'otro'} title="Modelo" type="text" />
          </div>
          <div className="flex-1">
            {/* <TextArea name={'descripcion'} title={'Detalle'} valor={''} /> */}
          </div>
          <div className="flex justify-end gap-2">
            <Button action={()=>setOnedit(false)} type={'button'} tipo={'default'}>Cancelar</Button>
            <Button type={'submit'} tipo={'accept'}>Guardar</Button>
          </div>
        </div>
      {/* <div className="">
      </div> */}
    </>
  )
}

export default function Operaciones(){
  const [onedit,setOnedit] = useState(false)
  const [ordenes,setOrdenes] = useState([])
  const { logout, credentials } = useContext(AuthPermitions)
  useEffect(()=>{
    Consulta({
      url: 'produccion', params: {
        method: 'GET'
      }
    })
      .then(resp => {
        // console.log('Hola jupiters:', resp)
        setOrdenes(resp)
      })
      .catch(error => {
        // console.log(error)
        logout()
      })
  },[])
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Operaciones</h2>
              <div className="w-[400px]">
                <Search config={{ width: '200px' }} />
              </div>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full">
            {
              !onedit
              ?
                <>
                  <div>
                    <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                      <button className="group active" data-estado="ALL">
                        <span className="relative h-[100%] flex items-center pointer-events-none">
                          Ordenes en proceso
                          <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                        </span>
                      </button>
                      <button className="group" data-estado="EMIT">
                        <span className="relative h-[100%] flex items-center pointer-events-none">
                          Ordenes finalizas
                          <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                        </span>
                      </button>
                      <button className="group" data-estado="FNLZ">
                        <span className="relative h-[100%] flex items-center pointer-events-none">
                          Ordenes anuladas
                          <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                        </span>
                      </button>
                      <button className="group" data-estado="FNLZ">
                        <span className="relative h-[100%] flex items-center pointer-events-none">
                          Hoja de corte
                          <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                        </span>
                      </button>
                    </ul>
                  </div>
                  <hr/>
                  <div className="h-[500px] overflow-hidden">
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell">OC</th>
                          <th className="lg:table-cell">Cliente</th>
                          <th className="lg:table-cell">Fecha Emision</th>
                          <th className="lg:table-cell">Fecha Entrega</th>
                          <th className="lg:table-cell">Marca</th>
                          <th className="lg:table-cell">Producto</th>
                          <th className="lg:table-cell">Base</th>
                          <th className="lg:table-cell">Precio</th>
                          <th className="lg:table-cell">Modelo</th>
                          <th className="lg:table-cell">Total</th>
                          <th className="lg:table-cell">Dias Producción</th>
                          <th className="lg:table-cell">Accciones</th>
                        </tr>
                      </thead>
                      <tbody> 
                        {
                          ordenes.length > 0 
                          ? ordenes.map((row, key) =>(
                            <tr>
                              <td>{row.idx}</td>
                              <td>{row.cliente}</td>
                              <td>{row.fec_emitida}</td>
                              <td>{row.fec_entrega}</td>
                              <td>{row.marca}</td>
                              <td>{row.producto}</td>
                              <td>{row.base}</td>
                              <td>{row.modelos}</td>
                              <td>22</td>
                              <td>22</td>
                              <td>22</td>
                              <td>
                                <ul className="flex flex-row justify-end">
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={() => {}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => {}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={()=>{}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => {}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                    </div>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))
                          :
                            <span>Datos no encontrados</span>
                        }
                      </tbody>
                    </table>
                  </div>
                  < div className="flex justify-end mt-3 gap-2">
                    <Button action={() => { }} tipo={'default'}>Actualizar</Button>
                    <Button action={() => setOnedit(true)} tipo={'accept'}>Nuevo</Button>
                    <Button action={() => setOnedit(true)} tipo={'success'}>Incidencia</Button>
                  </div >
                </>
              :
                <div className="flex-col justify-end mt-3 gap-4">
                  <OrdenProduccion setOnedit={setOnedit}/>
                </div>
            }
          </div>
          

        </div>
      </div>
      
      {/* {loading && createPortal(<LoadingWindow />, document.querySelector('#root'))} */}
    </>
  )
}