import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Proveedores from "../../components/Common/Proveedores"

export default function SeguimientoGuia(){
  const [estampado,setEstampado] = useState([])
  const urlparams = useParams()
  const [info,setInfo] = useState({id_proveedor_CAB:null,proveedor:''})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const navigate = useNavigate()

  const onsubmit = (e)=>{
    e.preventDefault()
    // let condiciones = [{name:'',altura:0,color:'magenta'},{name:'',altura:0,color:'magenta'}]
    console.log("El de talle de fracciones :",registros)
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        const data = new FormData()
        urlparams.id && data.append('id',urlparams.id)
        data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('detalle',JSON.stringify(registros))

        await Consulta({url: 'produccion/guardarguia/',params:{
          method:'PUT',
          body:data
        }})
        .then(resp => {
          setOpenloader(false)
          navigate('/main/guias/inicio')
          toast.success('Estampado guardado con éxito!!', { theme: "colored" })
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
  const testkey = ()=>{
    
  }
  useEffect(()=>{
    if(urlparams.id){
      // setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/guia/' + urlparams.id,})
          .then(resp => {
            console.log("info guia :",resp)
            setInfo(resp[0])
            // setRegistros(resp[1])
            setOpenloader(false)
            console.log("Opportynity never die!!!!",resp)
          })
          .catch((err)=>{
            setOpenloader(false)
            // toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
      // pp()
    }
  },[])

  const nuevoregistro = ()=>{
    console.log("Registros actuales :",registros)
    setRegistros([...registros,{item:0,articulo:'',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0}])
  }

  const onclick = (e)=>{
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch(action){

      case 'delete':
        setRegistros(registros.filter((row,key)=>key !== parseInt(position) ))
        console.log("Eliminado registros de la fila ",position)
        break;
      default :
    }

    console.log("La accion seleccionada es la siguiente:",action)

  }
  const editvalue = (e)=>{
    let column = e.target.dataset.name
    console.log("El campo afectado es el siguiente :",column,"SDSDF : ",e.target.checked)
    let position = e.target.dataset.position
    let tallas = ['xs','s','m','l','xl','xxl'].filter(row=>row !== column)
    let total = Object.entries(registros[position]).filter(row=>tallas.includes(row[0])).reduce((carry,row)=>{carry+=parseInt(row[1]);return carry;},0) + parseInt(e.target.value)
    setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'isprototipo' ? e.target.checked : e.target.value),cantidad:total}:item)])
  }

  const nuevoproveedor = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Proveedores actions={(item)=>{  
        console.log("El item seleccionado es: ",item)
        setInfo(info=>({...info,id_proveedor_CAB:item.idx,proveedor:item.nom}))
        setOpen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }
  useEffect(()=>{
    console.log("Los valores del nuevo registro son:",registros)
  },[registros])
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Guias /</h2>
              <span className="text-blue-500 font-bold">Seguimientos</span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1 pt-2">

            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} >
              <div className={` flex-col gap-3 flex`}>
                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'orden_ref'} title="OP/OC" defaults={Object.keys(info).length > 0 ? info.orden_ref : null} type="text" />
                  <InputSelect title={'Tipo'} name={"tipo"} data={
                    [
                      { indice: 'SERVICIOS', option: 'SERVICIOS', selected: true }, 
                      { indice: 'MUESTRA/PROTOTIPO', option: 'MUESTRA/PROTOTIPO' }, 
                      { indice: 'ACABADOS', option: 'ACABADOS' },
                      { indice: 'REPARACION', option: 'REPARACION' },
                      { indice: 'PRESTAMO', option: 'PRESTAMO' },
                    ]} 
                    df={Object.keys(info).length > 0 ? info.tipo : null} 
                  />
                  <InputSelect title={'Servicio'} name={"servicio"} data={
                    [
                      { indice: 'CONFECCION', option: 'CONFECCION', selected: true }, 
                      { indice: 'OJAL', option: 'OJAL' }, 
                      { indice: 'ESTAMPADO', option: 'ESTAMPADO' },
                      { indice: 'LAVANDERIA', option: 'LAVANDERIA' },
                      { indice: 'BORDADO', option: 'BORDADO' },
                      { indice: 'ACABADOS', option: 'ACABADOS' },
                    ]} 
                    df={Object.keys(info).length > 0 ? info.servicio : null} 
                  />
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                  <Input name={'modelo'} title="Modelo" defaults={Object.keys(info).length > 0 ? info.modelo : null} type="text" />
                  <Input name={'marca'} title="Marca" defaults={Object.keys(info).length > 0 ? info.marca : null} type="text" />                  
                  <Input name={'producto'} title="Producto" defaults={Object.keys(info).length > 0 ? info.producto : null} type="text" />
                </div>
                <div className="flex flex-row gap-3">
                  <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} />
                  <Input name={'fec_emision'} title="FecEmision" defaults={Object.keys(info).length > 0 ? info.fec_emision : null} type="date" />
                  <Input name={'fec_retorno'} title="FecRetorno" defaults={Object.keys(info).length > 0 ? info.fec_retorno : null} type="date" />
                  <Input name={'costo'} title="Costo" defaults={Object.keys(info).length > 0 ? info.costo : null} type="number" />
                  <Input name={'fec_recepcion'} title="FecRecepcion" defaults={Object.keys(info).length > 0 ? info.fec_recepcion : null} type="date" />
                </div>
                <div className="flex flex-row gap-3">
                  <InputSelect title={'Estado'} name={"estado"} data={
                    [
                      { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, 
                      { indice: 'FINALIZADO', option: 'FINALIZADO' }, 
                      { indice: 'ANULADO', option: 'ANULADO' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.estado : null} 
                  />
                  <Input name={'responsable'} title="Responsable" defaults={Object.keys(info).length > 0 ? info.responsable : null} type="text" />
                  <Input name={'motivo_traslado'} title="Motivo traslado" defaults={Object.keys(info).length > 0 ? info.motivo_traslado : null} type="text" />
                </div>
                <div className="flex flex-row gap-3">
                  {/* <div></div> */}
                  <div className="relative pl-4 border-l-[.2px] border-dashed border-red-500 flex flex-col gap-2 flex-1">
                    <div className="h-[100px] rounded-md bg-orange-300 relative flex flex-col items-center justify-center cursor-pointer hover:box-shadow-lg">
                      <div className="absolute w-[15px] h-[15px] rounded-full bg-red-500 left-[-24px]">
                        <span className="font-bold text-[10px] text-center">24/04/2025</span>
                      </div>
                    </div>
                    <div className="h-[100px] rounded-md bg-orange-300"></div>
                  </div>
                </div>
                {/* <div className="flex flex-row gap-3">
                  <div></div>
                  <div className="relative pl-4 border-l-[.2px] border-dashed border-red-500 flex flex-col gap-2 flex-1">
                    <div className="h-[100px] rounded-md bg-orange-300 relative flex flex-col items-center justify-center cursor-pointer hover:box-shadow-lg">
                      <div className="absolute w-[15px] h-[15px] rounded-full bg-red-500 left-[-24px]">
                        <span className="font-bold text-[10px] text-center">24/04/2025</span>
                      </div>
                    </div>
                    <div className="h-[100px] rounded-md bg-orange-300"></div>
                  </div>
                </div> */}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/guias/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}