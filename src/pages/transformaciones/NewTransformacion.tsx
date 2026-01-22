import { createMemoryRouter, useAsyncError, useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Proveedores from "../../components/Common/Proveedores"
import Ordenes from "../../components/Common/Ordenes"

const VentanaDescuentos = ({idguia,penalidadestipo,penalidades,setpenalidades})=>{
  const { openModal,setOpen } = useContext(ModalWindowContext)
  const [registros,setRegistros] = useState(penalidades)

  const nuevoregistro = ()=>{
    console.log("Registros actuales :",registros)
    setRegistros([...registros,{idguia:idguia,idx:'',penalidad:'',observacion:'',importe:0}])
  }
  useEffect(()=>{
    console.log("Lista de penalidades :",penalidadestipo.current)
  },[])
  const onclick = (e)=>{
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch(action){
      case 'delete':
        setRegistros(registros.filter((row,key)=>key !== parseInt(position) ))
        break;
      default :
    }
  }
  const editvalue = (e)=>{
    if(e.target.dataset.name == 'penalidad'){
      setRegistros(registros.map((row,key)=>key == e.target.dataset.position ? {...row,idx:e.target.value,penalidad:e.target.options[e.target.selectedIndex].text} : row))
    }else{
      setRegistros(registros.map((row,key)=>key == e.target.dataset.position ? {...row,[e.target.dataset.name]:e.target.dataset.name == 'observacion' ? e.target.value : parseFloat(e.target.value)} : row))
    }
  } 
  const agregar = ()=>{
    setpenalidades(registros)
    setOpen(false)
  }
  return(
    <div className="flex flex-col gap-2 w-[950px]">
      <div className="flex justify-start items-center">
        <h2 className="font-medium text-[16px] pr-2">Registro de descuentos /</h2>
        <span className="text-blue-500 font-bold">
          Nueva Penalidad
        </span>
      </div>
      <div>
        <div className="h-[350px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 mb-2"> 
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-rose-300">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Penalidad</th>  
                <th className="lg:table-cell">Observacion</th>  
                <th className="lg:table-cell">Importe</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                registros.length > 0 && registros.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td>
                      {
                        penalidadestipo.current.length > 0 &&
                        <select onChange={editvalue} data-name="penalidad" data-position={key} className="w-full bg-transparent h-[40px] outline-none text-center">
                          <option key={-1} defaultValue={''}></option>
                          {
                            penalidadestipo.current.map((item, index) => <option key={index} value={item.idx} selected={item.idx == row.idx ? true : false } defaultValue={item.idx ?? null}>{item.penalidad}</option>)
                          }
                        </select> 
                      }
                    </td>
                    <td><input className="h-[40px]" type="text" onChange={editvalue} data-position={key} data-name="observacion" defaultValue={row.observacion ?? ''} /></td>
                    <td><input className="h-[40px]" type="number" onChange={editvalue} data-position={key} data-name="importe" step={0.01} defaultValue={row.importe ?? 0} /></td>
                    <td className="w-[180px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={row.idx}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot className="sticky bottom-0">
              <tr>
                <td colSpan={10} >
                  <div className="flex flex-row justify-center">
                    <div onClick={nuevoregistro} className="bg-green-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type={'button'} tipo={'default'} action={()=>openModal(false)}>Cancelar</Button>
        <Button type={'button'} tipo={'default'} action={agregar}>Guardar</Button>
      </div>
    </div>
  )
}

const VentanaReprogramacion = ({idguia,reprogramacion,setreprogramacion})=>{
  const { openModal,setOpen } = useContext(ModalWindowContext)
  const [registros,setRegistros] = useState(reprogramacion)

  const nuevoregistro = ()=>{
    console.log("Registros actuales :",registros)
    setRegistros([...registros,{idguia:idguia,idx:'',fecha_entrega:'',observacion:''}])
  }
  const onclick = (e)=>{
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch(action){
      case 'delete':
        setRegistros(registros.filter((row,key)=>key !== parseInt(position) ))
        break;
      default :
    }
  }
  const editvalue = (e)=>{
    setRegistros(registros.map((row,key)=>key == e.target.dataset.position ? {...row,[e.target.dataset.name]:e.target.dataset.name == 'observacion' ? e.target.value : e.target.value} : row))
  } 
  const agregar = ()=>{
    setreprogramacion(registros)
    setOpen(false)
  }
  return(
    <div className="flex flex-col gap-2 w-[950px]">
      <div className="flex justify-start items-center">
        <h2 className="font-medium text-[16px] pr-2">Registro de reprogramación /</h2>
        <span className="text-blue-500 font-bold">
          Nueva Reprogramación
        </span>
      </div>
      <div>
        <div className="h-[350px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 mb-2"> 
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-rose-300">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">NuevaFecha</th>  
                <th className="lg:table-cell">Observacion</th>  
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                registros.length > 0 && registros.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td><input className="h-[40px]" type="date" onChange={editvalue} data-position={key} data-name="fecha_entrega" value={row.fecha_entrega ?? 0} /></td>
                    <td><input className="h-[40px]" type="text" onChange={editvalue} data-position={key} data-name="observacion" value={row.observacion ?? ''} /></td>
                    <td className="w-[180px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={row.idx}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot className="sticky bottom-0">
              <tr>
                <td colSpan={10} >
                  <div className="flex flex-row justify-center">
                    <div onClick={nuevoregistro} className="bg-green-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type={'button'} tipo={'default'} action={()=>openModal(false)}>Cancelar</Button>
        <Button type={'button'} tipo={'default'} action={agregar}>Guardar</Button>
      </div>
    </div>
  )
}

export default function NewTransformacion(){
  const [estampado,setEstampado] = useState([])
  const urlparams = useParams()
  const [info,setInfo] = useState({id_proveedor_CAB:null,proveedor:''})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const [paquetes,setPaquetes] = useState([])
  const penalidadestipo = useRef([])
  const [penalidades,setPenalidades] = useState([])
  const [reprogramacion,setReprogramacion] = useState([])
  const [fases,setFases] = useState([])
  const [distribucion,setDistribucion] = useState('TLL')
  // const [infop,setInfop] = useState([])
  const [servicio,setServicio] = useState('CONFECCION')
  const navigate = useNavigate()

  const onsubmit = (e)=>{
    e.preventDefault()
    console.log("Info guia:",Object.fromEntries(new FormData(form.current)))
    // let condiciones = [{name:'',altura:0,color:'magenta'},{name:'',altura:0,color:'magenta'}]
    console.log("El de talle de fracciones :",registros)
    /* for (const element of form.current.elements) {
      if(element.name == 'id_orden_CAB' && element.value == ''){
        toast.error('Debe vincular primero la guia a una orden de producción. Por favor verifique.', { theme: "colored" })
        return 0
      }
    }*/
    console.log("Los elementos a validar son los siguientes:",form.current.querySelectorAll("input[verify='true']"))
    for (const element of form.current.querySelectorAll("input[verify='true']")) {
      if(element.tagName == 'INPUT' && element.value == ''){
        console.log("El input problematico es :",element)
        toast.error('Debe ingresar la información correspondiente al campo seleccionado. Por favor verifique.', { theme: "colored" })
        return 0
      }
    }
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        const data = new FormData()
        const rutas = {
          'GLB':'produccion/guardarguiaglb/',
          'TLL':'produccion/guardarguia/',
          'PQT':'produccion/guardarguiaxpq/',
        }
        urlparams.id && data.append('id',urlparams.id)
        data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('detalle', (distribucion !== 'PQT' ? JSON.stringify(registros) : JSON.stringify(paquetes)))
        penalidades.length > 0 && data.append('penalidades',JSON.stringify(penalidades))
        reprogramacion.length > 0 && data.append('reprogramacion',JSON.stringify(reprogramacion))

        await Consulta({url: rutas[distribucion],params:{
          method:'PUT',
          body:data
        }})
        .then(resp => {
          console.log("Respuesta de la consulta :",resp)
          setOpenloader(false)
          navigate('/main/guias/')
          if(resp.ok){
            toast.success('La guia de servicio fue generada con éxito!!', { theme: "colored" })
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
        await Consulta({url: 'produccion/guia/' + urlparams.id,})
          .then(resp => {
            console.log("info guia :",resp)
            setInfo(resp[0])
            resp[0].distribucion !== 'PQT' ? setRegistros(resp[1]) : setPaquetes(resp[1])

            setDistribucion(resp[0].distribucion)
            setPenalidades(resp[2])
            penalidadestipo.current = resp[3]
            setFases(resp[4])
            setReprogramacion(resp[5])
            setServicio(resp[0].servicio ?? 'CONFECCION')
            setOpenloader(false)

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
    }else{
      setOpenloader(true)
      Consulta({url:'ordenes/getfasesproduccion/SERVICIO'})
      .then(resp=>{
        console.log("Las fases de produccion son :",resp)
        setFases(resp)
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        setOpenloader(false)
      })
    }
    const handleInputChange = (event) => {
      console.log("Hola Ivon",event.detail.valor,event.detail)
      if(event.detail.name == 'servicio'){
        setServicio(event.detail.valor)
      }
      if(event.detail.name == 'distribucion'){
        // setDistribucion(event.detail.valor == 'PAQUETES' ? 'PQT' : 'TLL')
        setDistribucion({GLOBALES:'GLB',TALLAS:'TLL',PAQUETES:'PQT'}[event.detail.valor])
      }
    };
    form.current.addEventListener("salamandra", handleInputChange);
    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])

  
  const nuevoregistro = ()=>{
    console.log("Registros actuales :",registros)
    setRegistros([...registros,{item:0,articulo:'',disponible_total:0,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0}])
  }
  const nuevopaquete= ()=>{
    setPaquetes([...paquetes,{item:0,articulo: (info.producto ?? '') + ' ' + (info.modelo ?? '') + ` PAQUETE ${paquetes.length + 1}`,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0}])
  }

  const onclick = (e)=>{
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch(action){

      case 'delete':
        if(distribucion !== 'PQT'){
          setRegistros(registros.filter((row,key)=>key !== parseInt(position) ))
          console.log("Eliminado registros de la fila ",position)
        } else {
          setPaquetes(paquetes.filter((row,key)=>key !== parseInt(position) ))
        }
        break;
      default :
    }

    console.log("La accion seleccionada es la siguiente:",action)

  }
  const editvalue = (e)=>{
    const column = e.target.dataset.name
    let total = 0
    console.log("El campo afectado es el siguiente :",column,"SDSDF : ",e.target.checked)
    const position = e.target.dataset.position
    const tallas = ['xs','s','m','l','xl','xxl'].filter(row=>row !== column)

    if(column !== 'isprototipo'){
      total = Object.entries(registros[position]).filter(row=>tallas.includes(row[0])).reduce((carry,row)=>{
        carry+=parseInt(row[1]);
        return carry;
      },0) + (!['articulo','isprototipo'].includes(column) ? parseInt(e.target.value) : 0)
      setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'isprototipo' ? e.target.checked : e.target.value),cantidad:total}:item)])
    }else{
      setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'isprototipo' ? e.target.checked : e.target.value)}:item)])
    }
  }
  const editpaquete = (e)=>{
    const column = e.target.dataset.name
    const position = e.target.dataset.position
    const tallas = ['xs','s','m','l','xl','xxl'].filter(row=>row !== column)
    const total = Object.entries(paquetes[position]).filter(row=>tallas.includes(row[0])).reduce((carry,row)=>{
      carry+=parseInt(row[1]);
      return carry;
    },0) + (column !== 'articulo' ? parseInt(e.target.value) : 0)
    setPaquetes([...paquetes.map((item,key)=> position == key ? {...item,[column]: e.target.value,cantidad:total}:item)])
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
  const listaordenes = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Ordenes mode={1} actions={(item)=>{
        console.log("INfor de la orden es:",item)
        setOpen(false)
        setOpenloader(true)
        Consulta({url:'ordenes/extraeritemscaja/' + item.idx + '/' + item.id_corte})
        .then((resp)=>{
          console.log("Los registros de la orden son :",resp)
          if(resp.length > 0){
            setInfo(info=>({...info,id_orden_CAB:item.idx,id_corte_CAB:item.id_corte,orden_ref:item.oc,marca:item.marca,modelo:item.modelos,producto:item.producto}))
            setRegistros(resp)
          }else{
            toast.warning('No se encontraron datos disponibles.', { theme: "colored" })
          }
          console.log("Resultado del proceso de extraccion :",resp)
        })
        .catch((error)=>{
          console.log("Error con la consulta",error)
        })
        .finally(()=>{
          setOpenloader(false)
        })
        console.log("Evento del input select otra vez",event.detail)


      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }
  const opendescuentos = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <VentanaDescuentos idguia={urlparams.id ?? 0} penalidadestipo={penalidadestipo} penalidades={penalidades} setpenalidades={setPenalidades} />,
      controls: false,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }
  const openreprogramacion = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <VentanaReprogramacion idguia={urlparams.id ?? 0} reprogramacion={reprogramacion} setreprogramacion={setReprogramacion} />,
      controls: false,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }
  const cancelarguia = ()=>{
    openModal({
      header:false,
      open:true,
      content: <div>Desea cancelar el registro de la guia?.<br/> Cualquier cambio realizado se perderá si da a aceptar.</div>,
      controls: true,
      action:()=>{
        navigate('/main/guias/')
      }
    })
  }
  // useEffect(()=>{
  //   console.log("Los valores del nuevo registro son:",registros)
  // },[registros])
  return(
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-[500px]">

          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Guias /</h2>
              <span className="text-blue-500 font-bold">Nueva guia</span>
            </div>
            <hr />
          </div>

          <div className="text-left  h-full flex flex-col flex-1 pt-2 overflow-hidden">
            <form ref={form} onSubmit={onsubmit} className="overflow-y-scroll scrollbar-special">
              <div className={` flex-col gap-3 h-full flex`}>
                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'id_orden_CAB'} defaults={Object.keys(info).length > 0 ? info.id_orden_CAB : null} type="hidden" verify="true" />
                  <Input name={'tipo'} defaults={'SERVICIOS'} type="hidden" placeholder={'Info referencial'}/>
                  <Input name={'id_corte_CAB'} defaults={Object.keys(info).length > 0 ? info.id_corte_CAB : null} type="hidden"/>
                  <div className="w-[300px]">
                    {
                      fases.length > 0
                      ? <InputSelect title={'Servicio'} name={"servicio"} data={fases.map(fase=>({indice:fase.ruta,option:fase.ruta}))} formref={form} df={Object.keys(info).length > 0 ? info.servicio : null} placeholder={'Info referencial'}
                      />
                      : <Input name={''} defaults={null} type="text" title="Servicio" />
                    }
                  </div>
                  <Input name={'orden_ref'} title="OP/OC" defaults={Object.keys(info).length > 0 ? info.orden_ref : null} type="text" action={listaordenes} mode={'static'} verify="true" placeholder={'Info referencial'}/>
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" verify="true"/>
                  <Input name={'modelo'} title="Modelo" defaults={Object.keys(info).length > 0 ? info.modelo : null} type="text" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'marca'} title="Marca" defaults={Object.keys(info).length > 0 ? info.marca : null} type="text" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'producto'} title="Producto" defaults={Object.keys(info).length > 0 ? info.producto : null} type="text" verify="true" placeholder={'Info referencial'}/>
                </div>
                <div className="flex flex-row gap-3">
                  <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} verify="true" placeholder={'Info referencial'}/>
                  <Input name={'fec_emision'} title="FecEmision" defaults={Object.keys(info).length > 0 ? info.fec_emision : null} type="date" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'fec_retorno'} title="FecRetorno" defaults={Object.keys(info).length > 0 ? info.fec_retorno : null} type="date" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'costo'} title="Costo" defaults={Object.keys(info).length > 0 ? info.costo : null} type="number" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'fec_recepcion'} title="FecRecepcion" defaults={Object.keys(info).length > 0 ? info.fec_recepcion : null} type="date" placeholder={'Info referencial'}/>
                </div>
                <div className="flex flex-row gap-3">
                  <Input name={'responsable'} title="Responsable" defaults={Object.keys(info).length > 0 ? info.responsable : null} type="text" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'motivo_traslado'} title="Motivo traslado" defaults={Object.keys(info).length > 0 ? info.motivo_traslado : null} type="text" verify="true" placeholder={'Info referencial'}/>
                  <InputSelect title={'Estado'} name={"estado"} data={
                    [
                      { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, 
                      { indice: 'FINALIZADO', option: 'FINALIZADO' }, 
                      { indice: 'ANULADO', option: 'ANULADO' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.estado : null} 
                    placeholder={'Info referencial'}
                  />
                  <InputSelect title={'TipoDistribucion'} formref={form} name={"distribucion"} data={
                    [
                      { indice: 'TLL', option: 'TALLAS', selected: true }, 
                      { indice: 'GLB', option: 'GLOBALES' }, 
                      { indice: 'PQT', option: 'PAQUETES' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.distribucion : null} 
                    placeholder={'Info referencial'}
                  />
                </div>
                <div className={`${distribucion == 'PQT' && 'hidden'}`}>
                  <span>Artículos:</span>
                  <div className="h-[380px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell w-[500px]">Descripcion</th>
                          {/* {!urlparams.id && <th className="lg:table-cell">Disponible</th>} */}
                          <th className="lg:table-cell">Disponible</th>
                          <th className="lg:table-cell">XS / 26</th>
                          <th className="lg:table-cell">S / 28</th>
                          <th className="lg:table-cell">M / 30</th>
                          <th className="lg:table-cell">L / 32</th>
                          <th className="lg:table-cell">XL / 34</th>
                          <th className="lg:table-cell">XXL / 36</th>
                          <th className="lg:table-cell">Cantidad</th>
                          <th className="lg:table-cell">Adicional</th>
                          <th className="lg:table-cell">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registros.length > 0 && registros.map((row,key)=>(
                            <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                              <td><input type="text" onChange={editvalue} data-name="articulo" data-position={key} value={row.articulo} /></td>
                              {/* {!urlparams.id && <td className="text-center w-[150px]">{row.disponible_total}</td>} */}
                              <td className="text-center w-[150px]">{urlparams.id ? (row.disponible_total + row.cantidad) : row.disponible_total}</td>
                              <td><input data-name="xs" type="number" onChange={editvalue} data-position={key} value={row.xs} className="fracciones"/></td>
                              <td><input data-name="s" type="number" onChange={editvalue} data-position={key} value={row.s} className="fracciones"/></td>
                              <td><input data-name="m" type="number" onChange={editvalue} data-position={key} value={row.m} className="fracciones"/></td>
                              <td><input data-name="l" type="number" onChange={editvalue} data-position={key} value={row.l} className="fracciones"/></td>
                              <td><input data-name="xl" type="number" onChange={editvalue} data-position={key} value={row.xl} className="fracciones"/></td>
                              <td><input data-name="xxl" type="number" onChange={editvalue} data-position={key} value={row.xxl} className="fracciones"/></td>
                              <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" value={row.cantidad} className="fracciones"/></td>
                              <td><input type="checkbox" id="isprototipo" onChange={editvalue} data-position={key} data-name="isprototipo" checked={row.isprototipo} className="fracciones"/></td>
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
                        }
                      </tbody>
                      <tfoot className="sticky bottom-0">
                        <tr>
                          <td colSpan={11} >
                            <div className="flex flex-row justify-center">
                              <div onClick={nuevoregistro} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                                +
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg> */}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className={`${distribucion !== 'PQT' && 'hidden'}`}>
                  <span>Paquetes:</span>
                  <div className="h-[380px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell w-[500px]">Paquete</th>
                          <th className="lg:table-cell">XS / 26</th>
                          <th className="lg:table-cell">S / 28</th>
                          <th className="lg:table-cell">M / 30</th>
                          <th className="lg:table-cell">L / 32</th>
                          <th className="lg:table-cell">XL / 34</th>
                          <th className="lg:table-cell">XXL / 36</th>
                          <th className="lg:table-cell">Cantidad</th>
                          <th className="lg:table-cell">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          paquetes.length > 0 && paquetes.map((row,key)=>(
                            <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                              <td><input type="text" onChange={editpaquete} data-name="articulo" data-position={key} value={row.articulo} /></td>
                              <td><input data-name="xs" type="number" onChange={editpaquete} data-position={key} value={row.xs} className="fracciones"/></td>
                              <td><input data-name="s" type="number" onChange={editpaquete} data-position={key} value={row.s} className="fracciones"/></td>
                              <td><input data-name="m" type="number" onChange={editpaquete} data-position={key} value={row.m} className="fracciones"/></td>
                              <td><input data-name="l" type="number" onChange={editpaquete} data-position={key} value={row.l} className="fracciones"/></td>
                              <td><input data-name="xl" type="number" onChange={editpaquete} data-position={key} value={row.xl} className="fracciones"/></td>
                              <td><input data-name="xxl" type="number" onChange={editpaquete} data-position={key} value={row.xxl} className="fracciones"/></td>
                              <td><input type="number" onChange={editpaquete} data-position={key} data-name="cantidad" value={row.cantidad} className="fracciones"/></td>
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
                        }
                      </tbody>
                      <tfoot className="sticky bottom-0">
                        <tr>
                          <td colSpan={10} >
                            <div className="flex flex-row justify-center">
                              <div onClick={nuevopaquete} className="bg-blue-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-blue-600">
                                +
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
                </div>
                <div className="flex justify-between gap-2 mt-2">
                  {/* <Button action={formatotallas} type={'button'} tipo={'accept'}>Formato</Button> */}
                  <div className="flex flex-row gap-1">
                    {
                      urlparams.id && <>
                        <Button type={'button'} tipo={'accept'} action={opendescuentos}>{`Configurar penalidades - Total: S/.${penalidades.length > 0 ? penalidades.reduce((carry,row)=>{carry += row.importe; return carry;},0).toFixed(2) : 0.00}`}</Button>
                        <Button type={'button'} tipo={'warning'} action={openreprogramacion}>{`Reprogramacion de despacho`}</Button>
                      </>                   
                    }
                  </div>
                  <div className="flex flex-row gap-2">
                    {/* <Button action={() => navigate('/main/guias/')} type={'button'} tipo={'default'}>Cancelar</Button> */}
                    <Button action={cancelarguia} type={'button'} tipo={'default'}>Cancelar</Button>
                    <Button type={'submit'} tipo={'success'}>Guardar</Button>
                  </div>
                  {/* <Button action={nuevoproveedor} type={'button'} tipo={'default'}>Proveedor</Button> */}
                </div>

              </div>

              
              
            </form>
          </div>




        </div>

      {/* </div> */}
    </>
  )
}
