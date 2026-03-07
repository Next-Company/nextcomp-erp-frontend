import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import Proveedores from "../../components/Common/Proveedores"
import Ordenes from "../../components/Common/Ordenes"
import SeccionPrincipal from "./componentes/SeccionDatos"
import SeccionDescuentos from "./componentes/SeccionDescuentos"
import SeccionReprogramacion from "./componentes/SeccionReprogramacion"

export default function NewGuia(){
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
  const [tallasbase,setTallasbase] = useState([])
  // const [infop,setInfop] = useState([])
  const [servicio,setServicio] = useState('CONFECCION')
  const [condicionpago,setCondicionPago] = useState(0)
  const [positiontab,setPositionTab] = useState(0)
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
          // navigate('/main/guias/')
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
      setCondicionPago(4)
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/guia/' + urlparams.id,})
          .then(resp => {
            console.log("info guia :",resp)
            setInfo(resp[0])
            resp[0].distribucion !== 'PQT' ? setRegistros(resp[1]) : setPaquetes(resp[1])
            setCondicionPago(parseInt(resp[0].condicion_pago))
            setDistribucion(resp[0].distribucion)
            setPenalidades(resp[2])
            penalidadestipo.current = resp[3]
            setFases(resp[4])
	          setReprogramacion(resp[5])
            setServicio(resp[0].servicio ?? 'CONFECCION')
            setOpenloader(false)
            setTallasbase(resp[6].tallas.map(row=>row.desc))
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
      if(event.detail.name == 'condicion_pago'){
        setCondicionPago(event.detail.indice)
      }
    };
    form.current.addEventListener("salamandra", handleInputChange);
    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])

  const nuevoregistro = ()=>{
    console.log("Registros actuales :",registros)
    const tallasinit = tallasbase.reduce((c,v)=>{
      c[v] = 0
      return c
    },{})
    setRegistros([...registros,{item:0,articulo:'',disponible_total:0,...tallasinit,cantidad:0}])
  }
  const nuevopaquete= ()=>{
    const tallasinit = tallasbase.reduce((c,v)=>{
      c[v] = 0
      return c
    },{})
    setPaquetes([...paquetes,{item:0,articulo: (info.producto ?? '') + ' ' + (info.modelo ?? '') + ` PAQUETE ${paquetes.length + 1}`,...tallasinit,cantidad:0}])
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
    // const tallas = ['xs','s','m','l','xl','xxl'].filter(row=>row !== column)
    const tallas = tallasbase.filter(row=>row !== column)

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
    const tallas = tallasbase.filter(row=>row !== column)
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
        setTallasbase(item.tallasbase.map(row=>row.desc))
        // Consulta({url:'ordenes/extraeritemscaja/' + item.idx + '/' + item.id_corte})
        // Consulta({url:'ordenes/extraermodelosdisponible/' + item.idx })
        Consulta({url:'ordenes/extraerdisponible/' + item.idx + '/' + item.id_corte })
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
  // const opendescuentos = ()=>{
  //   let params_modal = null
  //   params_modal = {
  //     open:true,
  //     content: <SeccionDescuentos idguia={urlparams.id ?? 0} penalidadestipo={penalidadestipo} penalidades={penalidades} setpenalidades={setPenalidades} />,
  //     controls: false,
  //     header: false,
  //     action:()=>{
  //     }
  //   }
  //   openModal(params_modal)
  // }
  // const openreprogramacion = ()=>{
  //   let params_modal = null
  //   params_modal = {
  //     open:true,
  //     content: <SeccionReprogramacion idguia={urlparams.id ?? 0} reprogramacion={reprogramacion} setreprogramacion={setReprogramacion} />,
  //     controls: false,
  //     header: false,
  //     action:()=>{
  //     }
  //   }
  //   openModal(params_modal)
  // }
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
          
          <div className="text-left  h-full flex flex-col flex-1 overflow-hidden">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button:hover]:text-gray-700 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button.active:hover]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${positiontab == 0 && 'active'}`} onClick={() => setPositionTab(0)} data-estado="ALL">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Datos principales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%] bg-"></span>
                </span>
              </button>
              {/* <button className={`group flex-row items-center gap-1 ${position == 1 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => {}} data-estado="FNLZ"> */}
              <button className={`group flex-row items-center gap-1 ${positiontab == 1 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPositionTab(1)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Penalidades
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${positiontab == 2 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPositionTab(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Reprogramaciones
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} className="overflow-y-scroll scrollbar-special">
              <div className={`${positiontab !== 0 && 'hidden'}`}>
                <SeccionPrincipal 
                  info={info}
                  fases={fases}
                  condicionpago={condicionpago}
                  form={form}
                  listaordenes={listaordenes}
                  nuevoproveedor={nuevoproveedor}
                  distribucion={distribucion}
                  nuevoregistro={nuevoregistro}
                  setCondicionPago={setCondicionPago}
                  tallasbase={tallasbase}
                  registros={registros}
                  editvalue={editvalue}
                  urlparams={urlparams}
                  paquetes={paquetes}
                  editpaquete={editpaquete}
                  nuevopaquete={nuevopaquete}
                  onclick={onclick}
                />
              </div>
              <div className={`${positiontab !== 1 && 'hidden'}`}>
                <SeccionDescuentos idguia={urlparams.id ?? 0} penalidadestipo={penalidadestipo} penalidades={penalidades} setpenalidades={setPenalidades} />
              </div>
              <div className={`${positiontab !== 2 && 'hidden'}`}>
                <SeccionReprogramacion idguia={urlparams.id ?? 0} reprogramacion={reprogramacion} setreprogramacion={setReprogramacion} />
              </div>
            </form>
          </div>
          <div className="flex justify-end gap-2 mt-3">
            {/* <div className="flex flex-row gap-1">
              {
                urlparams.id && <>
                  <Button type={'button'} tipo={'accept'} action={opendescuentos}>{`Configurar penalidades - Total: S/.${penalidades.length > 0 ? penalidades.reduce((carry,row)=>{carry += row.importe; return carry;},0).toFixed(2) : 0.00}`}</Button>
                  <Button type={'button'} tipo={'warning'} action={openreprogramacion}>{`Reprogramacion de despacho`}</Button>
                </>                   
              }
            </div> */}
            <div className="flex flex-row gap-2">
              <Button action={cancelarguia} type={'button'} tipo={'default'}>Cancelar</Button>
              <Button action={onsubmit} type={'button'} tipo={'success'}>Guardar</Button>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}
