import { useState } from "react";
import { Button } from "./components/Atoms/Button/Button";
import { Search } from "./components/Atoms/Search/Search";
import { Input } from "./components/Atoms/Input/Input";
import { InputSelect } from "./components/Atoms/Input/InputSelect";
import { TextArea } from "./components/Atoms/Input/TextArea";

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
      <div className="">
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
      </div>
    </>
  )
}

export default function Operaciones(){
  const [onedit,setOnedit] = useState(false)
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
                        <th className="lg:table-cell">Dias Pendientes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        // lista?.map((row, key) => <Carpeta key={key} name={row} onclick={onclick} ondoubleclick={ondoubleclick} />)
                      }
                    </tbody>
                  </table>
                  < div className="flex justify-end mt-3 gap-2" >
                    <Button action={() => { }} tipo={'default'}>Actualizar</Button>
                    <Button action={() => setOnedit(true)} tipo={'accept'}>Nuevo</Button>
                  </div >
                </>
              :
                <OrdenesDetalle setOnedit={setOnedit}/>
            }
          </div>
          

        </div>
      </div>
      
      {/* {loading && createPortal(<LoadingWindow />, document.querySelector('#root'))} */}
    </>
  )
}