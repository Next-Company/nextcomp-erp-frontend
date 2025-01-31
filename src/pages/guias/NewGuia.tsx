import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"

export default function NewGuia(){
  const [estampado,setEstampado] = useState([])
  const urlparams = useParams()
  const [info,setInfo] = useState({})
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const navigate = useNavigate()

  const onsubmit = (e)=>{
    e.preventDefault()
    // let condiciones = [{name:'',altura:0,color:'magenta'},{name:'',altura:0,color:'magenta'}]

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
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/guia/' + urlparams.id,})
          .then(resp => {
            console.log("info guia :",resp)
            setInfo(resp[0])
            setRegistros(resp[1])
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
      pp()
    }
  },[])

  const nuevoregistro = ()=>{
    console.log("Registros actuales :",registros)
    setRegistros([...registros,{item:0,articulo:'',cantidad:0}])
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
    // let id = e.target.dataset.id
    let column = e.target.dataset.name
    let position = e.target.dataset.position
    let articulo = registros[parseInt(e.target.dataset.position)]
    
    setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]:e.target.value}:item)])
    // setRegistros([...registros.filter(item=>item.id !== id),{descripcion:e.target.textContent,cantidad:item.cantidad}])
    console.log("Modificicando contenido",e.target.value)
  }

  const search_proveedor = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: 
        <div className="flex-1 w-[60vw] pb-2">
          <form ref={form}>
            <div className={` flex-col gap-3 flex`}>
              <div className="flex gap-3">
                <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                <Input name={'orden_ref'} title="OP" defaults={Object.keys(info).length > 0 ? info.orden_ref : null} type="text" />
                <Input name={'nro_corte'} title="NroCorte" defaults={Object.keys(info).length > 0 ? info.nro_corte : null} type="text" />
                <Input name={'modelo'} title="Modelo" defaults={Object.keys(info).length > 0 ? info.modelo : null} type="text" />
                <Input name={'cliente'} title="Cliente" defaults={Object.keys(info).length > 0 ? info.cliente : null} type="text" />              
              </div>
              <div className="flex gap-3">
                <InputSelect title={'Marca'} name={"marca"} data={
                  [
                    { indice: 'PRIORITY', option: 'PRIORITY', selected: true }, 
                    { indice: 'MECHANIC', option: 'MECHANIC' }, 
                    { indice: 'XTRMZ', option: 'XTRMZ' }, 
                    { indice: 'HIDRAULIO', option: 'HIDRAULIO' }, 
                    { indice: 'ESSENCE', option: 'ESSENCE' }, 
                    { indice: 'ONE', option: 'ONE' }, 
                    { indice: 'ELENEX', option: 'ELENEX' },
                    { indice: 'NEXT', option: 'NEXT' },
                    { indice: 'TOPITOP', option: 'TOPITOP' },
                    { indice: 'DC-VL-QK-OAK-DKV', option: 'DC-VL-QK-OAK-DKV' },
                    { indice: 'DC-VL-QK-OAK', option: 'DC-VL-QK-OAK' },
                    { indice: 'DKV-VL-OAK-QK', option: 'DKV-VL-OAK-QK' }
                  ]} 
                  df={Object.keys(info).length > 0 ? info.marca : null} 
                />
              </div>
              <div className="flex flex-row gap-3">
                <Input name={'nro_paquetes'} title="Paquetes" defaults={Object.keys(info).length > 0 ? info.nro_paquetes : null} type="number" />
                <Input name={'nro_polos'} title="Polos" defaults={Object.keys(info).length > 0 ? info.nro_polos : null} type="number" />
                <Input name={'nro_personal'} title="Personal" defaults={Object.keys(info).length > 0 ? info.nro_personal : null} type="number" />
                <Input name={'tipo_estampado'} defaults={Object.keys(info).length > 0 ? info.tipo_estampado : null} title="TipoEstampado" type="text" />
                <Input name={'nro_fallados'} title="NroFallados" defaults={Object.keys(info).length > 0 ? info.nro_fallados : null} type="number" />
              </div>
              <div className="flex flex-col gap-3">
                <InputSelect title={'Estado'} name={"estado"} data={[{ indice: 'PEND', option: 'PENDIENTE' }, { indice: 'FNLZ', option: 'FINALIZADO' }, { indice: 'ANUL', option: 'ANULADO' }]} df={Object.keys(info).length > 0 ? info.estado : null}/>
                <Input name={'avance'} title="Avance(%)" defaults={Object.keys(info).length > 0 ? info.avance : null} type="number" />
              </div>
              <div>
                <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={8} />
              </div>
            </div>
          </form>
        </div>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }

  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Guia /</h2>
              <span className="text-blue-500 font-bold">
                Nueva guia
                {/* {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].oc + '-' + orden[0].producto + '-' + orden[0].base + '-' + orden[0].modelos}`
                  : "Nueva Orden"
                } */}
              </span>
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
                  <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" />
                </div>
                <div className="flex flex-row gap-3">
                  <Input name={'fec_emision'} title="FecEmision" defaults={Object.keys(info).length > 0 ? info.fec_emision : null} type="date" />
                  <Input name={'fec_retorno'} title="FecRetorno" defaults={Object.keys(info).length > 0 ? info.fec_retorno : null} type="date" />
                  <Input name={'costo'} title="Costo" defaults={Object.keys(info).length > 0 ? info.costo : null} type="number" />
                  <Input name={'fec_recepcion'} title="FecRecepcion" defaults={Object.keys(info).length > 0 ? info.fec_recepcion : null} type="date" />
                  <InputSelect title={'Estado'} name={"estado"} data={
                    [
                      { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, 
                      { indice: 'FINALIZADO', option: 'FINALIZADO' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.estado : null} 
                  />
                </div>
                <div>
                  <span>Artículos:</span>
                  <div className="h-[350px] scrollbar-special rounded-md overflow-y-scroll border-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          {/* <th className="lg:table-cell">Item</th> */}
                          <th className="lg:table-cell">Descripcion</th>
                          <th className="lg:table-cell">QtnSalida</th>
                          <th className="lg:table-cell">Acciones</th>
                          {/* <th className="lg:table-cell">QtnIngreso</th>
                          <th className="lg:table-cell">Responsable</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registros.length > 0 && registros.map((row,key)=>(
                            <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                              {/* <td contentEditable="true" onKeyDown={editcontext} data-position={key}>{row.descripcion}</td>
                              <td className="w-[200px]" contentEditable="true">asdfasdf</td> */}
                              <td><input type="text" onChange={editvalue} data-name="articulo" data-position={key} defaultValue={row.articulo} /></td>
                              <td><input type="number" onChange={editvalue} data-name="cantidad" data-position={key} defaultValue={row.cantidad} /></td>
                              <td className="w-[200px]"></td>
                              <td className="w-[250px]">
                                <ul className="flex flex-row justify-end">
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                    </div>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))
                          // ? 
                          // : <tr></tr>

                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={8} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/guias/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button action={nuevoregistro} type={'button'} tipo={'accept'}>Agregar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
            {/* <form ref={form} className="flex flex-col flex-1 overflow-hidden">
              {
                estampado.length > 0
                ? <div>Cuerpo guia</div>
                : <div>De click al boton agregar para ingresar un nuevo registro</div>
              }
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/guias/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button action={nuevoregistro} type={'button'} tipo={'accept'}>Agregar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </>
  )
}