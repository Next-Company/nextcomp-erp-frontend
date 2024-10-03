import { useContext, useRef } from "react";
import { Button } from "./components/Atoms/Button/Button";
import { Input } from "./components/Atoms/Input/Input";
import { InputSelect } from "./components/Atoms/Input/InputSelect";
import { Consulta } from "./utils/utils";
import { toast } from "react-toastify";
import { ModalWindowContext } from "./components/ModalWindow/ModalWindowContext";

export default function OrdenProduccion({setOnedit}){
  const form = useRef()
  const { openModal, config } = useContext(ModalWindowContext)
  // const onsubmit = (e)=>{
  //   e.preventDefault()
  //   Consulta({
  //     url:"produccion", params:{
  //       method:'POST', body:
  //     }
  //   })
  //   .then((resp)=>{
  //     if(resp.ok){
  //       toast.success('Soporte guardado con éxito!!', { theme: "colored" })
  //     }

  //   })
  //   .catch(erro=>{

  //   })
  // }
  const onsubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        await Consulta({
          url: 'produccion/',
          params: {
            method: 'POST', body: data
          }
        })
          .then(resp => {
            // console.log(resp)
            toast.success('Soporte guardado con éxito!!', { theme: "colored" })
            setOnedit(false)
          })
      }
    })
  }
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
            {/* <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg> */}
            <span className="relative h-[100%] flex items-center pointer-events-none">
              Telas
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
          <div className="flex justify-center items-center h-[50px] pl-4 pr-4">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </div>
          <button className="group flex-row items-center gap-1" data-estado="FNLZ">
            {/* <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg> */}
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
        <form ref={form} onSubmit={onsubmit}>
          <div className="flex flex-col gap-3 pt-4">
              <div className="flex gap-3">
                <Input name={'idx'} defaults='' type="hidden" />
                <Input name={'oc'} defaults={'otro'} title="OC" type="number" />
                <Input name={'cliente'} defaults={'otro'} title="Cliente" type="text" />
                <Input name={'fec_emitida'} defaults="" title="FechaEmision" type="date" />
                <Input name={'fec_entrega'} defaults="" title="FechaEntrega" type="date" />
                <InputSelect title={'Categoria'} name={"categoria"} data={[{ indice: 'IMPL', option: 'CONFECCION', selected: true }, { indice: 'SOPT', option: 'OJAL Y BOTON' }, { indice: 'PRCT', option: 'ESTAMPADO' }, { indice: 'PRCT', option: 'LAVANDERIA' }, { indice: 'PRCT', option: 'BORDADO' }, { indice: 'PRCT', option: 'ACABADOS' }]} df={'PRCT'} />
              </div>
              <div className="flex gap-3">
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
        </form>
      {/* <div className="">
      </div> */}
    </>
  )
}