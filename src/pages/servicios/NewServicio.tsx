import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Proveedores from "../../components/Common/Proveedores"
import Productos from "../../components/Common/Productos"
import ServiceContext from "./contexto/ServicioContext"
import ServicePanelAdicionales from "./componentes/ServicePanelAdicionales"
import Ordenes from "../../components/Common/Ordenes"

const TRANSLATE_CLASSES = ['', 'translate-x-[100%]', 'translate-x-[200%]', 'translate-x-[300%]'];
const CuerpoInforme = ({info,tipo})=>{
  const [ruta,setRuta] = useState("")
  useEffect(()=>{
    console.log("El tipo de pedido es:",tipo)
    const crear = async ()=>{
      await Consulta({url: `${tipo ? 'produccion/vistarapidapedidoavios/download' : 'produccion/vistapreviapedido/telas' }`,params:{
        method:'POST',
        body:info
      }})
      .then(resp => {
        console.log("La info del reporte es:",resp)
        const binaryString = window.atob(resp.data);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        const file = window.URL.createObjectURL(new Blob([bytes], {type: "application/pdf"}))
        // console.log("La ruta es:",file)
        setRuta(file)
      })
      .catch((err)=>{
        // setOpenloader(false)
        // toast.error('Se produjo un error!!', { theme: "colored" })
      })
    }
    crear()
  },[])
  return(
    <>
      {/* <iframe src="http://192.168.18.20:4000/produccion/vistapreviapedido/telas" className="w-[21.5cm] h-[60vh]"></iframe> */}
      <iframe src={ruta} className="w-[60vw] h-[80vh]"></iframe>
    </>
  )
}

export default function NewServicio(){
  // const ServiceProvider = useContext(Se)
  const [tipo,setTipo] = useState(0)
  const [searchParams,setSearchParams] = useSearchParams()
  const urlparams = useParams()
  const [info,setInfo] = useState({tipo:'PRODUCCION'})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const [panelactive,setPanelActive] = useState(0)
  const [adicionales,setAdicionales] = useState([])
  const [condicionpago,setCondicionPago] = useState(1)
  const navigate = useNavigate()

  console.log("Los search params recibidos:",searchParams.get('nombre'))

  const onsubmit = (e)=>{
    e.preventDefault()
    console.log("El de talle de fracciones :",registros)
    for(const element of form.current.querySelectorAll("input[verify='true']")){
      if(element && element.value == ''){
        toast.error('Alguno de los campos del formulario son obligatorios. Por favor verifique.', { theme: "colored" })
        return
      }
    }
    console.log("INfo adicionales:",adicionales,registros,adicionales.length,registros.length)
    if(registros.length == 0 && adicionales.length == 0){
      toast.error('Debe ingresar al menos un registro!!', { theme: "colored" })
      return
    }
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de la orden de servicio ingresada?</div>,
      action: async () => {
        const data = new FormData()
        urlparams.id && data.append('id',urlparams.id)
        data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('insumos',JSON.stringify(registros))
        data.append('adicionales',JSON.stringify(adicionales))

        console.log("Detalle de la lista de articuos :",registros)
        setOpenloader(true)
        // await Consulta({url:['produccion/guardarpedidotelas/','produccion/guardarpedidoavios/','produccion/guardarpedidoadicionales/'][tipo],params:{
        await Consulta({url: urlparams.id ? 'servicios/updateServicio/' +  urlparams.id : 'servicios/saveServicio/',params:{
          method: urlparams.id ? 'PUT' : 'POST',
          body:data
        }})
        .then(resp => {
          setOpenloader(false)
          if(resp.ok){
            // navigate('/main/servicios/')
            toast.success('Nueva orden de servicio guardado con éxito!!', { theme: "colored" })
          }else{
            toast.error(resp.message, { theme: "colored" })
          }
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
        await Consulta({url: 'servicios/getservicio/' + urlparams.id,})
          .then(resp => {
            setInfo(resp[0])
            setRegistros(resp[1])
            setAdicionales(resp[2])
            setTipo(resp[0].tipo == 'PRODUCCION' ? 0 : 1)
          })
          .catch((err)=>{
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
      pp()
    }
    const handleInputChange = (event) => {
      console.log("Hola Ivon",event.detail)
      if(event.detail.name == 'condicion_pago'){
        setCondicionPago(event.detail.indice)
        // setTipo(event.detail.valor == 'PRODUCCION' ? 0 : 1)
      }
    };
    form.current.addEventListener("salamandra", handleInputChange);
    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])
  const nuevoproveedor = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Proveedores actions={(item)=>{  
        console.log("El item seleccionado es: ",item)
        setInfo(info=>({...info,id_proveedor_CAB:item.idx,proveedor:item.nom,ruc:item.ruc}))
        setOpen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }
  const listaordenes = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Ordenes mode={1} actions={(item)=>{
        console.log("INfor de la orden es:",item)
        setInfo(info=>({...info,id_orden_CAB:item.idx,orden_ref:item.oc}))
        setOpen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }
  const changepanel = (position)=>{
    setPanelActive(position)
  }
  return(
    <>
      <ServiceContext.Provider value={{panelactive,adicionales,setAdicionales}}>
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Orden de servicio /</h2>
              <span className="text-blue-500 font-bold">
                Nueva orden
              </span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full flex flex-col flex-1 pt-2">
            <form ref={form} onSubmit={onsubmit} onChange={()=>{}}>
              <div className={`flex-col gap-3 flex`}>
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
                </div>
                <hr/> 
                <div className="flex flex-col gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <div className="w-[40%] flex gap-3">
                    <InputSelect title={'TipoServicio'} formref={form} name={"tipo"} data={
                      [
                        { indice: 'PRODUCCION', option: 'PRODUCCION', selected: true }, 
                        { indice: 'TRANSFORMACION', option: 'TRANSFORMACIÓN' },
                      ]} 
                      df={Object.keys(info).length > 0 ? info.tipo : null} 
                      placeholder={'Info referencial'}
                    />
                    <Input name={'id_orden_CAB'} defaults={Object.keys(info).length > 0 ? info.id_orden_CAB : null} type="hidden" verify="true" />
                    <Input name={'orden_ref'} title="OP/OC" defaults={Object.keys(info).length > 0 ? info.orden_ref : null} type="text" action={listaordenes} mode={'static'} verify="true" placeholder={'Info referencial'}/>
                  </div>
                  {/* <div>
                  </div> */}
                  <div className="w-[75%] flex gap-3">
                    <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                    <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden"/>
                    <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} verify="true" placeholder="Nuevo proveedor" />
                    <Input name={'fec_emision'} defaults={Object.keys(info).length > 0 && info.fec_emision ? info.fec_emision : null} title="FechaEmisión" type="date" verify="true" placeholder="Texto complementario"/>
                    <Input name={'fec_retorno'} defaults={Object.keys(info).length > 0 && info.fec_retorno ? info.fec_retorno : null} title="FechaEntrega" type="date" verify="true" placeholder="Texto complementario"/>
                  </div>
                  <div className="w-[40%]">
                    <Input name={'destino'} defaults={Object.keys(info).length > 0 && info.destino ? info.destino : null} title="Destino" type="text" verify="true" placeholder={'Info referencial'}/>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
                </div>
                <hr/> 
                <div className="flex gap-3">
                  <div className="w-[450px]">
                    <InputSelect title={'CondiciónPago'} formref={form} name={"condicion_pago"} data={
                      [
                        { indice: 1, option: 'PAGO CONTRA ENTREGA', selected: true }, 
                        { indice: 2, option: 'PAGO PROGRAMADO' },
                        { indice: 3, option: 'PAGO SEMANAL' },
                        { indice: 4, option: 'PAGO CON ADELANTO + PROGRAMACION' },
                      ]} 
                      df={Object.keys(info).length > 0 ? info.condicion_pago : null} 
                      placeholder={'Info referencial'}
                    />
                  </div>
                  {
                    condicionpago == 4 && <div className="w-[300px]"><Input name={'porcentaje_adelanto'} defaults={Object.keys(info).length > 0 && info.porcentaje_adelanto ? info.porcentaje_adelanto : null} title="PorcentajeAdelanto(%)" type="number" verify="true" placeholder={'Info referencial'}/></div>
                  }
                  {
                    [2,4].includes(condicionpago) && <div className="w-[300px]"><Input name={'programacion'} defaults={Object.keys(info).length > 0 && info.programacion ? info.programacion : null} title="Programacion(Dias)" type="number" verify="true" placeholder={'Info referencial'}/></div>
                  }
                </div>
                <div className="flex gap-3 ">
                  <Input name={'nro_contacto'} defaults={Object.keys(info).length > 0 && info.nro_contacto ? info.nro_contacto : null} title="NroContacto" type="text" verify="true" placeholder={'Info referencial'}/>
                  <InputSelect title={'IGV(18%)'} name={"igv"} data={
                    [
                      { indice: '0', option: 'APLICA', selected: true }, 
                      { indice: '1', option: 'NO APLICA' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.igv : null} 
                    placeholder={'Info referencial'}
                  />
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="GiradoPor" type="text" verify="true" placeholder={'Info referencial'}/>
                  <InputSelect title={'Moneda'} name={"moneda"} data={
                    [
                      { indice: 'S', option: 'SOLES', selected: true }, 
                      { indice: 'USD', option: 'DOLARES' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.moneda : null} 
                    placeholder={"Nuevo tipo de moneda"}
                  />
                </div>
                <div className="flex gap-3 w-[45%]">
                  <InputSelect title={'AfectoRetención'} name={"afec_retencion"} data={
                    [
                      { indice: '0', option: 'NO APLICA', selected: true }, 
                      { indice: '1', option: 'APLICA' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.afec_retencion : null} 
                    placeholder={'Info referencial'}
                  />
                    <InputSelect title={'Estado'} name={"estado"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: 'ANULADO', option: 'ANULADO' }]} df={Object.keys(info).length > 0 ? info.estado : null} placeholder={'Info referencial'}/>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de los artículos a solicitar</span>
                </div>
                <hr/> 
                <div className="flex flex-row justify-center">
                  <div className="flex flex-row justify-between p-1 bg-gray-200 rounded-l-full rounded-r-full relative">
                    <div className={`w-[280px] h-[14px] text-center text-[9px] rounded-l-full rounded-r-full bg-orange-500 ${TRANSLATE_CLASSES[panelactive] || ''} transition-all cursor-pointer absolute`}></div>
                    <div className={`w-[280px] text-center text-[9px] rounded-l-full rounded-r-full cursor-pointer z-10 ${panelactive == 0 && 'text-white'} transition-all`} onClick={()=>changepanel(0)} data-position="1">Insumos</div>
                    <div className={`w-[280px] text-center text-[9px] rounded-l-full rounded-r-full cursor-pointer z-10 ${panelactive == 1 && 'text-white'} transition-all`} onClick={()=>changepanel(1)} data-position="0">Servicios adicionales</div>
                  </div>
                </div>
                <div>
                  {/* ////////////////////////////
                  SECCION INSUMOS DEL SERVICIO
                  ///////////////////////////////
                  // */}
                  <div className={`h-[450px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 0 && 'hidden'}`}> 
                  </div>
                  {/* ////////////////////////////
                  SECCION SERVICIOS ADICIONALES
                  ///////////////////////////////
                  // */}
                  <ServicePanelAdicionales />
                </div>
                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-2 p-1">
                <div className="flex flex-row gap-2">
                  <div>
                    {/* <Button action={vistaprevia} type={'button'} tipo={'accept'}>
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-eye-spark"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.669 17.994q -5.18 -.18 -8.669 -5.994q 3.6 -6 9 -6t 9 6" /><path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5" /></svg>
                    </Button> */}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button action={() => navigate('/main/servicios/')} type={'button'} tipo={'default'}>Cancelar</Button>
                  <Button type={'submit'} tipo={'success'}>Guardar</Button>
                </div>  
              </div>
            </form>
          </div>
        </div>
      </ServiceContext.Provider>
    </>
  )
}
