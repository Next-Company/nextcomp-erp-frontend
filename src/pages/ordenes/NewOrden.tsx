import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { InputMultiSelect } from "../../components/Atoms/Input/InputMultiSelect";
import { TextArea } from "../../components/Atoms/Input/TextArea";
import { OrdenPedidoAvios } from "../../templates/OrdenPedidoAvios";
import { OrdenPedidoTelas } from "../../templates/OrdenPedidoTelas";

const listTables = [
  'tbl2_fases_prod_ordenes',
  'tbl2_fases_prod_telas',
  'tbl2_fases_prod_molde',
  'tbl2_fases_prod_hojacorte',
  'tbl2_fases_prod_confeccion',
  'tbl2_fases_prod_ojalboton',
  'tbl2_fases_prod_estampado',
  'tbl2_fases_prod_lavanderia',
  'tbl2_fases_prod_bordado',
  'tbl2_fases_prod_acabados'
]
function FormFase({ position, info}) {
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  useEffect(()=>{
    console.log("Cargando informacion de detalle orden")
    
  },[])

  const printpedidoavios = ()=>{
    openModal({
      open: true,
      header: false,
      controls: false,
      content: <OrdenPedidoAvios />,
      action: async () => {
      }
    })
  }
  const printpedidotelas = ()=>{
    openModal({
      open: true,
      header: false,
      controls: false,
      content: <OrdenPedidoTelas />,
      action: async () => {
      }
    })
  }

  return(
    <div className="flex-1 overflow-y-scroll scrollbar-special">
      <div className={` flex-col gap-3 pt-4 ${position == 0 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
          <Input name={'oc'} title="OC" defaults={info.length > 0 ? info[0].oc : null} type="text" />
          <Input name={'cliente'} title="Cliente" defaults={info.length > 0 ? info[0].cliente : null} type="text" />
          <Input name={'fec_emitida'} defaults={info.length > 0 ? info[0].fec_emitida : null} title="FechaEmision" type="date" />
          <Input name={'fec_entrega'} defaults={info.length > 0 ? info[0].fec_entrega : null} title="FechaEntrega" type="date" />
        </div>
        <div className="flex gap-3">
          <Input name={'orden_pedido'} title="OrdenPedido" defaults={info.length > 0 ? info[0].orden_pedido : null} type="text" />
          <Input name={'marca'} defaults={info.length > 0 ? info[0].marca : null} title="Marca" type="text" />
          <Input name={'producto'} defaults={info.length > 0 ? info[0].producto : null} title="Producto" type="text" />
          <Input name={'base'} defaults={info.length > 0 ? info[0].base : null} title="Base" type="text" />
          <Input name={'precio'} defaults={info.length > 0 ? info[0].precio : null} title="Precio" type="number" />
          <Input name={'modelos'} defaults={info.length > 0 ? info[0].modelos : null} title="Modelo" type="text" />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo1_orden'} defaults={info.length > 0 ? info[0].combo1_orden : null} dataset={[{group:'combo'}]} title="Combo1" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo2_orden'} defaults={info.length > 0 ? info[0].combo2_orden : null} dataset={[{group:'combo'}]} title="Combo2" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo3_orden'} defaults={info.length > 0 ? info[0].combo3_orden : null} dataset={[{group:'combo'}]} title="Combo3" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo4_orden'} defaults={info.length > 0 ? info[0].combo4_orden : null} dataset={[{group:'combo'}]} title="Combo4" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo5_orden'} defaults={info.length > 0 ? info[0].combo5_orden : null} dataset={[{group:'combo'}]} title="Combo5" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo6_orden'} defaults={info.length > 0 ? info[0].combo6_orden : null} dataset={[{group:'combo'}]} title="Combo6" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo7_orden'} defaults={info.length > 0 ? info[0].combo7_orden : null} dataset={[{group:'combo'}]} title="Combo7" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo8_orden'} defaults={info.length > 0 ? info[0].combo8_orden : null} dataset={[{group:'combo'}]} title="Combo8" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo9_orden'} defaults={info.length > 0 ? info[0].combo9_orden : null} dataset={[{group:'combo'}]} title="Combo9" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo10_orden'} defaults={info.length > 0 ? info[0].combo10_orden : null} dataset={[{group:'combo'}]} title="Combo10" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo11_orden'} defaults={info.length > 0 ? info[0].combo11_orden : null} dataset={[{group:'combo'}]} title="Combo11" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo12_orden'} defaults={info.length > 0 ? info[0].combo12_orden : null} dataset={[{group:'combo'}]} title="Combo12" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo13_orden'} defaults={info.length > 0 ? info[0].combo13_orden : null} dataset={[{group:'combo'}]} title="Combo13" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo14_orden'} defaults={info.length > 0 ? info[0].combo14_orden : null} dataset={[{group:'combo'}]} title="Combo14" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'acumulado'} defaults={0} title="Total" type="number" style={{pointerEvents:'none'}} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <InputSelect title={'Estado'} name={"estado_orden"} data={[{ indice: 'EN PROCESO', option: 'EN PROCESO' }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: 'ANULADO', option: 'ANULADO' }]} df={info.length > 0 ? info[0].estado_orden : null}/>
          </div>
        </div>
      </div>
      {/* FASE DE TELAS */}
      <div className={` flex-col gap-3 pt-4 ${position == 1 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          <Input name={'orden_pedido'} defaults={info.length > 0 && info[0].orden_pedido ? info[0].orden_pedido : null} title="Orden Pedido" type="text" />
          <Input name={'fec_pedido'} defaults={info.length > 0 && info[0].fec_pedido ? info[0].fec_pedido : null} title="FechaPedido" type="date" />
          <Input name={'proveedor'} defaults={info.length > 0 && info[0].proveedor ? info[0].proveedor : null} title="Proveedor" type="text" />
          <Input name={'tela'} defaults={info.length > 0 && info[0].tela ? info[0].tela : null} title="Tela" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'articulo'} defaults={info.length > 0 && info[0].articulo ? info[0].articulo : null} title="Articulo" type="text" />
          <Input name={'guia_ingreso'} defaults={info.length > 0 && info[0].guia_ingreso ? info[0].guia_ingreso : null} title="GuiaIngreso" type="text" />
          <InputSelect title={'Estado'} name={"estado_telas"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: '-', option: 'NO CORRESPONDE' }]} df={info.length > 0 ? info[0].estado_telas : null} />
        </div>
        <div>
          <TextArea title="Observaciones" name="observaciones_fase_telas" rows={8} />
        </div>
        <div className="flex flex-row justify-end">
          {/* <button type="button">Exportar</button> */}
          <Button action={() => printpedidoavios()} type={'button'} tipo={'default'}>Exportar pedido avios</Button>
          <Button action={() => printpedidotelas()} type={'button'} tipo={'default'}>Exportar pedido telas</Button>
          {/* <Button action={() => console.log('otro pedido')} type={'button'} tipo={'default'} >Multinivel</Button> */}
        </div>
      </div>
      {/* FASE DE MOLDE */}
      <div className={` flex-col gap-3 pt-4 ${position == 2 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3">
          {/* <Input name={'id_cab_orden'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null}  type="hidden" /> */}
          <Input name={'responsable'} defaults={info.length > 0 && info[0].responsable ? info[0].responsable : null} title="Responsable" type="text" />
          <Input name={'molde'} defaults={info.length > 0 && info[0].molde ? info[0].molde : null}  title="Molde" type="text" />
          <Input name={'muestra'} defaults={info.length > 0 && info[0].muestra ? info[0].muestra : null} title="Muestra" type="text" />
          <Input name={'lavado'} defaults={info.length > 0 && info[0].lavado ? info[0].lavado : null} title="Lavado" type="text" />
        </div>
        <div className="flex gap-3">
          <Input name={'cliente_corte'} defaults={info.length > 0 && info[0].cliente_corte ? info[0].cliente_corte : null} title="Cliente" type="text" />
          <Input name={'tizado'} defaults={info.length > 0 && info[0].tizado ? info[0].tizado : null} title="Tizado" type="text" />
          <InputSelect title={'Estado'} name={"estado_molde"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: '-', option: 'NO CORRESPONDE' }]} df={info.length > 0 ? info[0].estado_molde : null} />
          {/* <Input name={'estado_molde'} defaults={info.length > 0 && info[0].estado_molde ? info[0].estado_molde : null} title="Estado" type="text" /> */}
        </div>
        <div>
          <TextArea title="Observaciones" name="observaciones_fase_molde" />
        </div>
      </div>
      {/* FASE DE CORTE */}
      <div className={` flex-col gap-3 pt-4 ${position == 3 ? 'flex' : 'hidden'}`}>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <Input name={'numero_corte'} defaults={info.length > 0 && info[0].numero_corte ? info[0].numero_corte : null} title="#HojaCorte" type="text" />
          </div>
          <div className="flex-1 min-w-[350px]">
            <InputMultiSelect title={'Ruta'} name={"ruta_proceso"} data={[{ indice: 'CORTE', option: 'CORTE'},{ indice: 'MOLDE', option: 'MOLDE'},{ indice: 'CONFECCION', option: 'CONFECCION' }, { indice: 'OJAL Y BOTON', option: 'OJAL Y BOTON' }, { indice: 'ESTAMPADO', option: 'ESTAMPADO' }, { indice: 'LAVANDERIA', option: 'LAVANDERIA' }, { indice: 'BORDADO', option: 'BORDADO' }, { indice: 'ACABADOS', option: 'ACABADOS' }]} df={info.length > 0 ? info[0].ruta_proceso : null} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo1_corte'} defaults={info.length > 0 && info[0].combo1_corte ? info[0].combo1_corte : null} title="Combo1" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo2_corte'} defaults={info.length > 0 && info[0].combo2_corte ? info[0].combo2_corte : null} title="Combo2" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo3_corte'} defaults={info.length > 0 && info[0].combo3_corte ? info[0].combo3_corte : null} title="Combo3" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo4_corte'} defaults={info.length > 0 && info[0].combo4_corte ? info[0].combo4_corte : null} title="Combo4" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo5_corte'} defaults={info.length > 0 && info[0].combo5_corte ? info[0].combo5_corte : null} title="Combo5" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo6_corte'} defaults={info.length > 0 && info[0].combo6_corte ? info[0].combo6_corte : null} title="Combo6" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo7_corte'} defaults={info.length > 0 && info[0].combo7_corte ? info[0].combo7_corte : null} title="Combo7" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo8_corte'} defaults={info.length > 0 && info[0].combo8_corte ? info[0].combo8_corte : null} title="Combo8" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo9_corte'} defaults={info.length > 0 && info[0].combo9_corte ? info[0].combo9_corte : null} title="Combo9" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo10_corte'} defaults={info.length > 0 && info[0].combo10_corte ? info[0].combo10_corte : null} title="Combo10" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo11_corte'} defaults={info.length > 0 && info[0].combo11_corte ? info[0].combo11_corte : null} title="Combo11" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo12_corte'} defaults={info.length > 0 && info[0].combo12_corte ? info[0].combo12_corte : null} title="Combo12" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo13_corte'} defaults={info.length > 0 && info[0].combo13_corte ? info[0].combo13_corte : null} title="Combo13" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input name={'combo14_corte'} defaults={info.length > 0 && info[0].combo14_corte ? info[0].combo14_corte : null} title="Combo14" type="number" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <InputSelect title={'Estado'} name={"estado_corte"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: '-', option: 'NO CORRESPONDE' }]} df={info.length > 0 ? info[0].estado_corte : null} />
          </div>
        </div>
        <div>
          <TextArea title="Observaciones" name="observaciones_fase_corte" />
        </div>
      </div>
    </div>
  )
}

export function NewOrden() {
  const form = useRef()
  const urlparams = useParams()
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  const [orden, setOrden] = useState([])
  const [position, setPosition] = useState(0)
  const navigate = useNavigate()

  const onsubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('table',listTables[position])
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
            navigate("/main/ordenes/inicio")
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

  useEffect(()=>{
    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/' + urlparams.id,})
          .then(resp => {
            // console.log(resp)
            // setOpenloader(false)
            setOrden(resp)
            console.log("Opportynity never die!!!!",resp)
          })
          .catch((err)=>{
            setOpenloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
      pp()
    }
  },[])
  const testkey = (e)=>{
    let acumulador = 0
    for(let element of form.current.querySelectorAll("input[data-group='combo'")){
      acumulador += element.value == '' ? 0 : parseInt(element.value)
    }
    form.current.querySelector("input[name='acumulado']").value = acumulador
  }

  const printpedido = (e)=>{
    const desc = async ()=>{
      setOpenloader(true)
      await fetch("http://192.168.18.20:4000/produccion/export",{
        method:'POST',
        credentials: 'include'
      })
      .then(resp=>{
        return resp.json()
      })
      .then(resp=>{
        setOpenloader(false)
        // console.log("El verdadero",resp)

        let binaryString = window.atob(resp.data);
        // console.log(binaryString)
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        let file = window.URL.createObjectURL(new Blob([bytes], {type: "application/pdf"}))

        let link = document.createElement('a')
        link.href = file
        link.target = 'blank'
        link.click()
      })
      .catch((err)=>{
        setOpenloader(false)
        toast.error('Se produjo un error!!', { theme: "colored" })
      })

    }
    desc()
  }


  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Operaciones /</h2>
              <span className="text-blue-500 font-bold">
                {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].oc + '-' + orden[0].producto + '-' + orden[0].base + '-' + orden[0].modelos}`
                  : "Nueva Orden"
                }
              </span>
            </div>
            <hr />
          </div>

          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button:hover]:text-gray-700 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button.active:hover]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${position == 0 && 'active'}`} onClick={() => setPosition(0)} data-estado="ALL">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Ordenes
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 1 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(1)} data-estado="EMIT">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Telas
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 2 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Molde
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 3 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(3)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Hoja de corte
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} className="flex flex-col flex-1 overflow-hidden">
              <FormFase position={position} info={orden} />
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/operaciones/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                {/* <Button action={() => printpedido()} type={'button'} tipo={'default'}>Print</Button> */}
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}