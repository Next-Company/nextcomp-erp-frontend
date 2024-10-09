import { useContext, useRef, useState } from "react";
import { Button } from "../Atoms/Button/Button";
import { Input } from "../Atoms/Input/Input";
import { InputSelect } from "../Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { Search } from "../Atoms/Search/Search";
import { useNavigate } from "react-router-dom";
import { InputMultiSelect } from "../Atoms/Input/InputMultiSelect";

function FormFase({ position, info}) {
  // contenido[position]
  return(
    <>
      <div className={` flex-col gap-3 pt-4 ${position == 0 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'idx'} defaults='' type="hidden" />
          <Input name={'oc'} defaults={'otro'} title="OC" type="text" />
          {/* <Input name={'cliente'} defaults={'otro'} title="Cliente" type="text" /> */}
          <InputSelect title={'Cliente'} name={"cliente"} data={[{ indice: 'ESTILOS', option: 'ESTILOS', selected: true }, { indice: 'NEXT COMPANY', option: 'NEXT COMPANY' }]} df={'PRCT'} />
          <Input name={'fec_emitida'} defaults="" title="FechaEmision" type="date" />
          <Input name={'fec_entrega'} defaults="" title="FechaEntrega" type="date" />
          <InputSelect title={'Categoria'} name={"categoria"} data={[{ indice: 'IMPL', option: 'CONFECCION', selected: true }, { indice: 'SOPT', option: 'OJAL Y BOTON' }, { indice: 'PRCT', option: 'ESTAMPADO' }, { indice: 'PRCT', option: 'LAVANDERIA' }, { indice: 'PRCT', option: 'BORDADO' }, { indice: 'PRCT', option: 'ACABADOS' }]} df={'PRCT'} />
        </div>
        <div className="flex gap-3">
          <Input name={'marca'} title="Marca" type="text" />
          <Input name={'producto'} defaults={'otro'} title="Producto" type="text" />
          <Input name={'base'} defaults={'otro'} title="Base" type="text" />
          <Input name={'modelos'} defaults={'otro'} title="Modelo" type="text" />
        </div>
        {/* <div className="flex-col gap-3 w-[250px]"> */}
        {/* <div className="flex gap-3 flex-wrap justify-start"> */}
          
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo1_orden'} title="Combo1" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo2_orden'} title="Combo2" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo3_orden'} title="Combo3" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo4_orden'} title="Combo4" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo5_orden'} title="Combo5" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo6_orden'} title="Combo6" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo7_orden'} title="Combo7" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo8_orden'} title="Combo8" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo9_orden'} title="Combo9" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo10_orden'} title="Combo10" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo11_orden'} title="Combo11" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo12_orden'} title="Combo12" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo13_orden'} title="Combo13" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo14_orden'} title="Combo14" type="number" />
          </div>
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 1 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'orden_pedido'} defaults={'otro'} title="Orden Pedido" type="text" />
          <Input name={'fec_pedido'} defaults="" title="FechaPedido" type="date" />
          <Input name={'proveedor'} defaults={'otro'} title="Proveedor" type="text" />
          <Input name={'tela'} defaults={'otro'} title="Tela" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'articulo'} defaults={'otro'} title="Articulo" type="text" />
          <Input name={'guia_ingreso'} defaults={'otro'} title="GuiaIngreso" type="text" />
          <Input name={'estado_telas'} defaults={'otro'} title="Estado" type="text" />
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 2 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'responsable'} defaults={'otro'} title="Responsable" type="text" />
          <Input name={'molde'} defaults="" title="Molde" type="date" />
          <Input name={'muestra'} defaults={'otro'} title="Muestra" type="text" />
          <Input name={'lavado'} defaults={'otro'} title="Lavado" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cliente_corte'} defaults={'otro'} title="ClienteCorte" type="text" />
          <Input name={'tizado'} defaults={'otro'} title="Tizado" type="text" />
          <Input name={'estado_molde'} defaults={'otro'} title="Estado" type="text" />
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 3 ? 'flex' : 'hidden'}`}>
        {/* <div className="flex gap-3">
          
        </div> */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <Input name={'nro_corte'} defaults={'otro'} title="#HojaCorte" type="text" />
          </div>
          {/* <div className="flex-1 min-w-[350px]">
            <InputMultiSelect title={'RutaProceso'} name={"cliente"} data={[
              { indice: 'CONFECCION', option: 'CONFECCION', selected: true }, 
              { indice: 'OJAL_BOTON', option: 'OJAL_BOTON' },
              { indice: 'ESTAMPADO', option: 'ESTAMPADO' },
              { indice: 'LAVANDERIA', option: 'LAVANDERIA' },
              { indice: 'BORDADO', option: 'BORDADO' },
              { indice: 'ACABADOS', option: 'ACABADOS' },
              ]} df={'PRCT'} 
            />
          </div> */}
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo1_corte'} defaults={'otro'} title="Combo1" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo2_corte'} defaults={'otro'} title="Combo2" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo3_corte'} defaults={'otro'} title="Combo3" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo4_corte'} defaults={'otro'} title="Combo4" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo5_corte'} defaults={'otro'} title="Combo5" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo6_corte'} defaults={'otro'} title="Combo6" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo7_corte'} defaults={'otro'} title="Combo7" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo8_corte'} defaults={'otro'} title="Combo8" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo9_corte'} defaults={'otro'} title="Combo9" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo10_corte'} defaults={'otro'} title="Combo10" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo11_corte'} defaults={'otro'} title="Combo11" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo12_corte'} defaults={'otro'} title="Combo12" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo13_corte'} defaults={'otro'} title="Combo13" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo14_corte'} defaults={'otro'} title="Combo14" type="number" />
          </div>
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 4 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'responsable_confeccion'} defaults={'otro'} title="Responsable" type="text" />
          <Input name={'precio_confeccion'} defaults="" title="Precio" type="number" />
          <Input name={'fec_salida_confeccion'} defaults="" title="FechaSalida" type="date" />
          <Input name={'guia_salida_confeccion'} defaults={'otro'} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_confeccion'} defaults="" title="CantidaSalida" type="number" />
          <Input name={'fec_ingreso_confeccion'} defaults="" title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_confeccion'} defaults={'otro'} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_confeccion'} defaults="" title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_confeccion'} defaults="" title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_confeccion'} defaults="" title="FallasConfeccion" type="number" />
          <Input name={'fallas_tela_confeccion'} defaults="" title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_confeccion'} defaults="" title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_confeccion'} defaults={'otro'} title="Auditoria" type="text" />
          <Input name={'estado_confeccion'} defaults={'otro'} title="Estado" type="text" />
        </div>
      </div>
      <div className={` flex-col gap-3 pt-4 ${position == 5 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'responsable_ojalboton'} defaults={'otro'} title="Responsable" type="text" />
          <Input name={'precio_ojalboton'} defaults="" title="Precio" type="number" />
          <Input name={'fec_salida_ojalboton'} defaults="" title="FechaSalida" type="date" />
          <Input name={'guia_salida_ojalboton'} defaults={'otro'} title="GuiaSalida" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cantidad_salida_ojalboton'} defaults="" title="CantidaSalida" type="number" />
          <Input name={'fec_ingreso_ojalboton'} defaults="" title="FechaIngreso" type="date" />
          <Input name={'guia_ingreso_ojalboton'} defaults={'otro'} title="GuiaIngreso" type="text" />
          <Input name={'cantidad_ingreso_ojalboton'} defaults="" title="CantidadIngreso" type="number" />
          <Input name={'fec_termino_ojalboton'} defaults="" title="FechaTermino" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'fallas_ojalboton'} defaults="" title="FallasConfeccion" type="number" />
          <Input name={'fallas_tela_ojalboton'} defaults="" title="FallasTelas" type="number" />
          <Input name={'piezas_incomp_ojalboton'} defaults="" title="PiezasIncompletas" type="number" />
          <Input name={'auditoria_ojalboton'} defaults={'otro'} title="Auditoria" type="text" />
          <Input name={'estado_ojalboton'} defaults={'otro'} title="Estado" type="text" />
        </div>
      </div>
    </>
  )
}

export function NuevaOrdenProduccion() {
  const form = useRef()
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  const [orden, setOrden] = useState([])
  const [position, setPosition] = useState(0)
  const [estado, setEstado] = useState('ALL')
  const navigate = useNavigate()

  const onsubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        await Consulta({
          url: 'produccion/',
          params: {
            method: 'POST', body: data
          }
        })
          .then(resp => {
            setOpenloader(false)
            navigate("/main/operaciones/inicio")
            toast.success('Soporte guardado con éxito!!', { theme: "colored" })
          })
          .catch((err)=>{
            setOpenloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
    })
  }
  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Operaciones / Nueva Orden</h2>
              <div className="w-[400px]">
                <Search config={{ width: '200px' }} />
              </div>
            </div>
            <hr />
          </div>

          <div className="text-left overflow-scroll scrollbar-special h-full">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button:hover]:text-gray-700 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button.active:hover]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${position == 0 && 'active'}`} onClick={() => setPosition(0)} data-estado="ALL">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Ordenes
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 1 && 'active'}`} onClick={() => setPosition(1)} data-estado="EMIT">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Telas
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 2 && 'active'}`} onClick={() => setPosition(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Molde
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 3 && 'active'}`} onClick={() => setPosition(3)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Hoja de corte
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 4 && 'active'}`} onClick={() => setPosition(4)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Confeccion
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 5 && 'active'}`} onClick={() => setPosition(5)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Ojal y botón
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 6 && 'active'}`} onClick={() => setPosition(6)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Estampado
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 7 && 'active'}`} onClick={() => setPosition(7)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Lavanderia
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 8 && 'active'}`} onClick={() => setPosition(8)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Bordado
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 9 && 'active'}`} onClick={() => setPosition(9)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Acabados
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit}>
              <FormFase position={position} info={orden} />
              <div className="flex justify-end gap-2">
                <Button action={() => navigate('/main/operaciones/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'accept'}>Guardar</Button>
              </div>
            </form>
            
          </div>

        </div>
      </div>
    </>
  )
}