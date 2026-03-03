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
import Guias from "../../components/Common/Guias"
import Pedidos from "../../components/Common/Pedidos"
import DespachosContext from "./context/DespachosContexto"
import TabArticulos from "./components/TabArticulos"
import TabFacturas from "./components/TabFacturas"

const colorfase = {
  'CONFECCION': 'bg-purple-500',
  'ESTAMPADO': 'bg-gray-500',
  'ACABADOS': 'bg-red-500',
  'LAVANDERIA': 'bg-green-500',
  'MOLDES': 'bg-orange-500',
  'OJAL BOTON': 'bg-blue-500',
  'CORTE': 'bg-rose-400',
  'BORDADO': 'bg-yellow-500',
}

export default function NewDespacho() {
  const [tipo, setTipo] = useState(2)
  const urlparams = useParams()
  const [info, setInfo] = useState({ idx: null, tipo: '', fec_despacho: '', fec_emision_guia: '', ruc: '', id_pedido_origen: '', nro_pedido_origen: '', id_guia_origen: '', nro_guia_origen: '', id_proveedor_CAB: '', proveedor: '', responsable: '', nro_guia: '', facturado:'1', fase:'1', distribucion: 'TLL', subtipo:'' })
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros, setRegistros] = useState([])
  const [facturas, setFacturas] = useState([])
  const [panelactive, setPanelActive] = useState(0)
  const navigate = useNavigate()
  const [tallasbase,setTallasbase] = useState(['st','xs','s','m','l','xl','xxl'])

  const onsubmit = (e) => {
    e.preventDefault()
    const fase = parseInt(form.current.elements.fase.value)
    console.log("La otra info del formulario es:",info)
    console.log("Los datos del formulario son:", registros)
    // console.log("El estado de la fase es:",form.current.elements.fase.value)
    if(registros.length > 0 && tipo == 2 && fase == 0){
      if(registros.filter(row=>row.fracciones_despacho.length > 0).length > 0){
        toast.error('Si piensa registrar algún despacho seleccione primero la fase de despacho.', { theme: "colored" })
        return 0
      }
      if (registros.map(row => row.despacho ?? 0).reduce((a, b) => a + b) > 0 || registros.map(row => row.caidos ?? 0).reduce((a, b) => a + b) > 0 || registros.map(row => row.incompletos ?? 0).reduce((a, b) => a + b) > 0) {
        toast.error('Si piensa registrar algún despacho seleccione primero la fase de despacho.', { theme: "colored" })
        return 0
      }
    }
    if(tipo == 1 && registros.reduce((c,v)=>c + (v.despacho ?? 0),0) <= 0){
      toast.error('No ha registro ningún importe de ingreso. Por favor verifique.', { theme: "colored" })
      return 0
    }

    if(registros.length > 0 && tipo == 2 && fase == 1){
      if(registros.filter(row=>row.fracciones_despacho.length > 0).length == 0){
        // toast.error('No se puede guardar un despacho sin despachar ninguna cantidad!!', { theme: "colored" })
        // return 0
      }
      if (registros.map(row => row.despacho ?? 0).reduce((a, b) => a + b) == 0 && registros.map(row => row.caidos ?? 0).reduce((a, b) => a + b) == 0 && registros.map(row => row.incompletos ?? 0).reduce((a, b) => a + b) == 0) {
        // toast.error('No se puede guardar un despacho sin despachar ninguna cantidad!!', { theme: "colored" })
        // return 0
      }
    }
    for (const element of form.current.elements) {
      if(['responsable','nro_guia'].includes(element.name) && element.value == ''){
        toast.error(`El campo ${element.name} no ha sido completado. Por favor verifique.`, { theme: "colored" })
        return 0
      }
    }
    if(form.current.elements.facturado.value == 1 && !facturas.length > 0){
      toast.error(`No ha ingresado ningun registro referenta a la factura del proveedor. Por favor verifique.`, { theme: "colored" })
      return 0
    }
    
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del despacho ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        const data = new FormData()
        urlparams.id && data.append('id', urlparams.id)
        data.append('info', JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('detalle', fase ? JSON.stringify(registros.filter(row => (row.despacho ?? 0) > 0 || (row.caidos ?? 0) > 0 || (row.incompletos ?? 0) > 0)) : JSON.stringify(registros))
        data.append('facturas', JSON.stringify(facturas))
        data.append('subtipo', info.subtipo)

        // const ruta = tipo == 1 ? 'produccion/guardardespachopedido/' : (info.distribucion !== 'PQT' ? 'produccion/guardardespachoguia/' : 'produccion/guardardespachoguiaxpq/')
        const ruta = (tipo == 1 ? 'produccion/guardardespachopedido/' : {'PQT':'produccion/guardardespachoguia/','TLL':'produccion/guardardespachoguia/','GLB':'produccion/guardardespachoguiaglb/'}[info.distribucion])
        await Consulta({
          // url: 'produccion/guardardespacho/', params: {
          url: ruta, params: {
            method: 'PUT',
            body: data
          }
        })
          .then(resp => {
            console.log("Info respues:",resp)
            setOpenloader(false)
            if(resp.ok){
              navigate('/main/despachos/')
              toast.success(resp.message, { theme: "colored" })
            }else{
              toast.error(resp.message, { theme: "colored" })  
            }
          })
          .catch((err) => {
            setOpenloader(false)
            // toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(() => {
            setOpenloader(false)
          })
      }
    })
  }
  useEffect(() => {
    const handleInputChange = (event) => {
      // setTipo(event.detail.valor == 'PEDIDOS' ? 1 : 0)
      console.log("Hola Ivon")
      setTipo(event.detail.valor == 'PEDIDOS' ? 1 : (event.detail.valor == 'SERVICIOS' ? 2 : 0))
      setRegistros([])
    };
    form.current.addEventListener("salamandra", handleInputChange);

    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  }, [])
  useEffect(() => {
    if (urlparams.id) {
      setOpenloader(true)
      const pp = async () => {
        await Consulta({ url: 'produccion/despacho/' + urlparams.id, })
          .then(resp => {
            console.log("Los datos del despacho son:", resp)
            setInfo(resp[0])
            setRegistros(resp[1])
            resp[2] && setFacturas(resp[2])
            setTipo(resp[0].tipo == 'PEDIDOS' ? 1 : (resp[0].tipo == 'SERVICIOS' ? 2 : 0))
            setOpenloader(false)
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }
      pp()
    }
    if (urlparams.idmuestra) {
      setOpenloader(true)
      Consulta({ url: 'produccion/guia/' + urlparams.idmuestra })
        .then(resp => {
          setOpenloader(false)
          console.log("Despacho directo:", resp)
          // setInfo(resp[0])
          setTipo(resp[0].tipo)
          setInfo(info => ({ ...info,tipo:resp[0].tipo, id_guia_origen: resp[0].idx, nro_guia_origen: resp[0].idx, id_proveedor_CAB: resp[0].id_proveedor_CAB, proveedor: resp[0].proveedor }))
          // setRegistros([...registros, ...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
          //   row = { ...row, id_item: row.idx }
          //   Reflect.deleteProperty(row, 'idx')
          //   return row
          // })])
          setRegistros(resp[1].map(row => {
            row = { ...row, id_item: row.idx }
            Reflect.deleteProperty(row, 'idx')
            return row
          }))
        })
        .catch((err) => {
          // setOpenloader(false)
        })
        .finally(() => {
          // setOpenloader(false)
        })
    }
  }, [setOpenloader, urlparams])

  const nuevoregistro = () => {
    setFacturas([...facturas, { tipodoc: 1, moneda: 'MN', serie: '', numero: '', fec_emision: '', unidades: 0, importe_bruto: 0, base_imponible: 0, monto_inafecto: 0, igv: 0, importe_total: 0 }])
  }

  const nuevoproveedor = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Proveedores actions={(item) => {
        console.log("El item seleccionado es: ", item)
        setInfo(info => ({ ...info, id_proveedor_CAB: item.idx, proveedor: item.nom, ruc: item.ruc }))
        setOpen(false)
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  const searchguia = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Guias actions={(item) => {
        // console.log("El item seleccionado es: ",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'produccion/guia/' + item.idx })
          .then(resp => {
            console.log("La info de la sandia enero es:",resp)
            setInfo(info => ({ ...info, id_guia_origen: item.idx, nro_guia_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor, distribucion: item.distribucion }))
            console.log("Los registros de la guia son:", resp[1])
            // setRegistros(resp[1].map(row => ({ ...row, despacho: 0, caidos: 0 })))
            setRegistros(resp[1].map(row => {
              row = { ...row, id_item: row.idx, despacho: 0, caidos: 0, incompletos: 0 }
              Reflect.deleteProperty(row, 'idx')
              return row
            }))
            console.log("Info de bobesponja es:",resp[6].tallas.map(row=>row.desc))
            setTallasbase(tallasbase=>resp[6].tallas.map(row=>row.desc))
            // setRegistros(resp[1])
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }} />,
      controls: false,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  const searchmuestra = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Guias tipo={tipo == 2 ? 'SERVICIOS' : 'MUESTRA_PROTOTIPO'} actions={(item) => {
        console.log("La informacion del encabezado es: ",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'produccion/guia/' + item.idx })
          .then(resp => {
            setInfo(info => ({ ...info, id_guia_origen: item.idx, nro_guia_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor }))
            // setRegistros(resp[1].map(row => ({ ...row, despacho: 0, caidos: 0 })))
            setRegistros([...registros, ...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
              row = { ...row, id_item: row.idx }
              Reflect.deleteProperty(row, 'idx')
              return row
            })])
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  const searchpedido = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Pedidos actions={(item) => {
        console.log("El pedidos seleccionado matemia es :",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'produccion/pedido/' + item.idx })
          .then(resp => {
            console.log("Respuesta info pedido:",resp)
            if(!resp[1].length){
              toast.error('Se detectan inconsistencias con el pedidos seleccionado. Por favor verifique.',{theme:'colored'})
            }
            // setInfo(info => ({ ...info, id_pedido_origen: item.idx, nro_pedido_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor }))
            setInfo(info => ({ ...info, id_pedido_origen: item.idx, nro_pedido_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor,subtipo:resp[0].tipo}))

            // setRegistros([...registros, ...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
            //   row = { ...row, id_item: row.idx }
            //   Reflect.deleteProperty(row, 'idx')
            //   return row
            // })])
            if((info.id_pedido_origen ?? 0) !== item.idx){
              setRegistros(resp[1].map(row => {
                row = { ...row, id_item: row.idx }
                Reflect.deleteProperty(row, 'idx')
                return row
              }))
            }else{
              setRegistros([...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
                row = { ...row, id_item: row.idx }
                Reflect.deleteProperty(row, 'idx')
                return row
              })])
            }

          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }

  const onchange = (e) => {
    console.log("Cambiando tipo de pedido")
    // console.log("VA o neleet")
    // console.log("Otros cambios adicionales")
  }
  const changepanel = (e) => {
    const position = parseInt(e.target.dataset.position)
    setPanelActive(position)
  }
  useEffect(() => {
    console.log("Los items ingresados son:", registros)
  }, [registros])
  return (
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
      <DespachosContext.Provider value={{tipo,registros,urlparams,setRegistros,colorfase,facturas,setFacturas,onclick,nuevoregistro,setOpen,openModal,tallasbase}}>
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Ingresos /</h2>
              <span className="text-blue-500 font-bold">Nuevo Ingreso</span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full flex flex-col flex-1 pt-2 overflow-x-hidden">
            <form ref={form} onSubmit={onsubmit} onChange={() => { }} onInputCapture={onchange}>
              <div className={` flex-col gap-3 flex`}>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
                </div>
                <hr/> 
                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'distribucion'} defaults={Object.keys(info).length > 0 ? info.distribucion : null} type="hidden" />
                  <InputSelect title={'OrigenDespacho'} formref={form} name={"tipo"} data={
                    [
                      { indice: 'SERVICIOS', option: 'SERVICIOS', selected: true },
                      { indice: 'PEDIDOS', option: 'PEDIDOS' },
                      { indice: 'MUESTRA_PROTOTIPO', option: 'MUESTRA_PROTOTIPO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.tipo : null}
                    placeholder="Texto complementario"
                  />
                  <Input name={'fec_despacho'} defaults={Object.keys(info).length > 0 && info.fec_despacho ? info.fec_despacho : null} title="FechaEmisionIngreso" type="date" placeholder="Texto complementario"/>
                  <Input name={'fec_emision_guia'} defaults={Object.keys(info).length > 0 && info.fec_emision_guia ? info.fec_emision_guia : null} title="FechaEmisionGuia" type="date" placeholder="Texto complementario"/>
                  <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                  {
                    tipo == 1
                      ?
                      <>
                        <Input name={'id_pedido_origen'} defaults={Object.keys(info).length > 0 ? info.id_pedido_origen : null} type="hidden" placeholder="Texto complementario"/>
                        <Input name={'nro_pedido_origen'} title={`${tipo == 1 ? 'IdPedido' : (tipo == 2 ? 'IdServicio' : 'IdMuestra')}`} defaults={Object.keys(info).length > 0 ? info.nro_pedido_origen : null} type="text" action={searchpedido} mode={'static'} placeholder="Texto complementario"/>
                      </>
                      :
                      <>
                        <Input name={'id_guia_origen'} defaults={Object.keys(info).length > 0 ? info.id_guia_origen : null} type="hidden" />
                        {
                          tipo == 2
                            ?
                            <>
                              <Input name={'nro_guia_origen'} title={`${tipo == 2 ? 'IdServicio' : 'IdMuestra'}`} defaults={Object.keys(info).length > 0 ? info.nro_guia_origen : null} type="text" action={searchguia} mode={'static'} />
                            </>
                            :
                            <>
                              <Input name={'nro_guia_origen'} title={`${tipo == 2 ? 'IdServicio' : 'IdMuestra'}`} defaults={Object.keys(info).length > 0 ? info.nro_guia_origen : null} type="text" action={searchmuestra} mode={'static'} />
                            </>
                        }
                      </>
                  }
                </div>
                <div className="flex gap-3">
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                  <div className="w-[500px]">
                    <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} placeholder="Texto complementario"/>
                  </div>
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="Recepcionado Por" type="text" placeholder="Texto complementario"/>
                  <Input name={'nro_guia'} defaults={Object.keys(info).length > 0 && info.nro_guia ? info.nro_guia : null} title="NroGuiaReferencia" type="text" placeholder="Texto complementario"/>
                  <InputSelect title={'EsFacturado'} name={"facturado"} data={
                    [
                      { indice: '1', option: 'SI', selected: true },
                      { indice: '0', option: 'NO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.facturado : null}
                    placeholder="Texto complementario"
                  />
                  <InputSelect title={'Fase'} name={"fase"} data={
                    [
                      { indice: '1', option: 'INGRESO', selected: true },
                      { indice: '0', option: 'CONTEO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.fase : null}
                    placeholder="Texto complementario"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
                </div>
                <hr/> 
                <div>
                  <div className="flex flex-row justify-center">
                    <div className="flex flex-row justify-between p-1 bg-gray-200 rounded-l-full rounded-r-full relative">
                      <div className={`w-[250px] h-[14px] text-center text-[9px] rounded-l-full rounded-r-full ${!panelactive ? 'bg-green-600' : 'bg-red-600 translate-x-full'} transition-all cursor-pointer absolute`}></div>
                      <div className={`w-[250px] text-center text-[9px] rounded-l-full rounded-r-full cursor-pointer z-10 ${!panelactive && 'text-white'} transition-all`} onClick={changepanel} data-position="0">Artículos</div>
                      <div className={`w-[250px] text-center text-[9px] rounded-l-full rounded-r-full  cursor-pointer z-10 ${panelactive && 'text-white'} transition-all`} onClick={changepanel} data-position="1">Facturas</div>
                    </div>
                  </div>
                  <div className={`w-[200%] h-[400px] ${panelactive && 'translate-x-[-50%]'} flex flex-row transition-all overflow-hidden`}>
                    {/* <div>{JSON.stringify(registros)}</div> */}
                    <TabArticulos/>
                    <TabFacturas/>
                  </div>
                </div>
                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-2 p-1">
                <div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button action={() => navigate('/main/despachos/')} type={'button'} tipo={'default'}>Cancelar</Button>
                  <Button type={'submit'} tipo={'success'}>Guardar</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DespachosContext.Provider>
      {/* </div> */}
    </>
  )
}
