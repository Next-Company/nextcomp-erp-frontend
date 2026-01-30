import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import SeccionCorte from "./components/SeccionCorte";
import SeccionMolde from "./components/SeccionMolde";
import SeccionMateriales from "./components/SeccionMateriales";
import SeccionOrden from "./components/SeccionOrden";
import SeccionConfiguracion from "./components/SeccionConfiguracion";


export function NewOrden() {
  const form = useRef()
  const urlparams = useParams()
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const [position, setPosition] = useState(0)
  const [orden, setOrden] = useState([])
  const [molde, setMolde] = useState([])
  const [corte, setCorte] = useState([])
  const [avios, setAvios] = useState([])
  const [materiales, setMateriales] = useState([])
  const [dataimg, setDataimg] = useState([])
  const navigate = useNavigate()
  const [tipopedido,setTipopedido] = useState(1)
  const [fases,setFases] = useState([])
  const [materialesref,setMaterialesRef] = useState([])
  const [insumos,setInsumos] = useState([])
  const [requerimientos,setRequerimientos] = useState([])
  const [tallaslist,setTallaslist] = useState([])
  const [modelos,setModelos] = useState([])
  let disponible = useRef(null)
  
  console.log("Info del corte :",orden)

  const onsubmit = async (e) => {
    e.preventDefault()
    let url_save = ''
    let data = undefined

    if(position == 0){
      
      url_save = urlparams.id ? 'ordenes/updateFaseOrden' : 'ordenes/saveFaseOrden'

      for (const element of form.current.querySelectorAll("input[verify='true']")) {
        if(element.tagName == 'INPUT' && element.value == ''){
          console.log("El input problematico es :",element)
          toast.error('Debe ingresar la información correspondiente al campo seleccionado. Por favor verifique.', { theme: "colored" })
          return 0
        }
      }
      if(form.current.elements['materiales_produccion'].value == '[]' || form.current.elements['materiales_produccion'].value == null){
        toast.error('Debe seleccionar al menos un material de produccion.', { theme: "colored" })
        return
      }
      if(form.current.elements['ruta_proceso'].value == '[]' || form.current.elements['ruta_proceso'].value == null){
        toast.error('Debe seleccionar al menos una ruta de proceso.', { theme: "colored" })
        return
      }
      if(insumos.filter(row=>row.cantidad == 0).length > 0){
        toast.error('Debe detallar la cantidad para cada insumo registrado', { theme: "colored" })
        return
      }
      if(!(requerimientos.length > 0) && tipopedido){
        toast.error('Debe ingresar los requerimientos vinculados a la orden.', { theme: "colored" })
        return
      }

      data = new FormData(e.target)
      dataimg.length > 0 && data.append('filenext', dataimg[0])
      orden.length > 0 && data.append('combos',JSON.stringify(orden[0].combos))
      data.append('insumos',JSON.stringify(insumos))
      data.append('requerimientos',JSON.stringify(requerimientos))
      // insumos.length > 0 && data.append('insumos',JSON.stringify(insumos))
      // requerimientos.length > 0 && data.append('requerimientos',JSON.stringify(requerimientos))
    }
    if(position == 2){
      url_save = 'ordenes/saveFaseMolde'
      data = new FormData(e.target)
      data.append('id',urlparams.id)
    }
    if(position == 3){
      console.log("Info del corte :",corte)
      url_save = 'ordenes/saveFaseCorte'
      // console.log("Info corte actualizado:",corte)
      data = new FormData()
      data.append('info',JSON.stringify(corte))
      data.append('id',urlparams.id)
      data.append('tallasbase',JSON.stringify(tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-')))
    }
    if(position == 4){
      console.log("Info de matariales :",materiales)
      url_save = 'ordenes/saveFaseMateriales'
      data = new FormData(e.target)
      data.append('id',urlparams.id)
    }
    if(position == 5){
      url_save = 'ordenes/saveFaseFraccionamiento'
      data = new FormData()
      const validacion = Object.keys(disponible.current).reduce((c,v)=>c + (disponible.current[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0)

      if(validacion !== 0) {
        toast.error('El saldo pendiente debe queda en 0. Por favor verifique.', { theme: "colored" })
        return 0
      }
      data.append('info',JSON.stringify(modelos))
      data.append('tallasbase',JSON.stringify(tallaslist.filter(row=>row.selected)[0]))
      data.append('idreceta',orden[0]?.id_receta ?? '')
      data.append('id',urlparams.id)
    }
    const PARAMS_MODAL = {
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de la orden registrada?</div>,
      action: async () => {
        setOpenloader(true)
        await Consulta({
          url: url_save,
          params: {
            method: urlparams.id ? 'PUT' : 'POST', 
            // method: 'POST', 
            body: data
          }
        })
        .then(resp => {
          if(resp.ok){
            // navigate("/main/ordenes/")
            toast.success('La orden ingresada fue guardada con éxito!!', { theme: "colored" })
          }else{
            toast.error(resp.mensaje, { theme: "colored" })
          }
        })
        .catch((err)=>{
          toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          setOpenloader(false)
        })
      }
    }
    openModal(PARAMS_MODAL)
  }

  useEffect(()=>{
    const handleSalamandra = (event) => {
      console.log("INof origen del select:",event.detail,event.detail.target.closest('div#cuerpo_ingresos'))
      if(event.detail.name == 'estado_corte'){
        const padre = event.detail.target.closest('div#cuerpo_ingresos')
        const indice = padre.dataset.position
        setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,['estado_corte']:event.detail.valor} : row))
      }else{
        setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
      }
    };
    form.current.addEventListener("salamandra", handleSalamandra);

    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/getordenesbyid/' + urlparams.id,})
          .then(resp => {
            setOrden(resp[0])
            setMolde(resp[1])
            setCorte(resp[2])
            setMateriales(resp[3])
            setFases(resp[4])
            setMaterialesRef(resp[5])
            setInsumos(resp[6])
            setRequerimientos(resp[7])
            setTallaslist(resp[8])
            setModelos(resp[9])
            disponible.current = resp[10]
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
    }else{
      setOpenloader(true)
      Promise.all([
        Consulta({url:'ordenes/getfasesproduccion'}),
        Consulta({url:'ordenes/getmaterialesproduccion'}),
        Consulta({url:'ordenes/getCorrelativoProduccionPreview/ORDEN'}),
        Consulta({url:'ordenes/getPlantillasTallas'})
      ])
      .then(resp=>{
        console.log("El resultado de la consulta es:",resp)
        setTallaslist(resp[3])
        // setTallaslist(resp[3].map((item,key)=>key == 0 ? {...item,selected:true} : item))
        setFases(resp[0])
        setMaterialesRef(resp[1])
        setOrden([{oc:resp[2].resp}])
        // setTallaslist(resp[3])
        
        // console.log("El correlativo actual es:",resp[2])
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        setOpenloader(false)
      })

      // Consulta({url:'ordenes/getfasesproduccion'})
      // .then(resp=>{ 
      //   console.log("Las fases de produccion son :",resp)
      //   setFases(resp)
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
      // .finally(()=>{
      //   setOpenloader(false)
      // })
    }
  },[])
  const testkey2 = (e)=>{
    // console.log("El target de testkey2 es:",e.target)
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
  }
  const testkey = (e)=>{
    // console.log("El targe dl evento key es:",e.target.name)
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
    // for(let element of form.current.querySelectorAll("input[data-group='combo'")){
    //   acumulador += element.value == '' ? 0 : parseInt(element.value)
    // }
    // form.current.querySelector("input[name='acumulado']").value = acumulador
  }
  const cancelarorden = ()=>{
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea descartar los cambios realizados?.<br/> Cualquier modificacion realizada se perderá.</div>,
      action: ()=>{
        navigate('/main/ordenes/')
      }
    })
  }
  const actualizarcombos = ()=>{
    const pp = async () => {
      setOpenloader(true)
      await Consulta({url: 'ordenes/updatecombos/combos'})
        .then(resp => {
          console.log("Opportunity never die!!!!",resp)
        })
        .catch((err)=>{
          setOpenloader(false)
          toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          setOpenloader(false)
        })
    }
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea proceder con la actualizaion de los combos de la orden?.</div>,
      action: ()=>{
        pp()
      }
    })
  }
  return (
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center gap-2">
              <h2 className="font-medium text-[16px]">Operaciones /</h2>
              <span className="text-blue-500 font-bold">
                {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].oc + '-' + orden[0].producto + '-' + (orden[0].base ?? '') + '-' + orden[0].modelos}`
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
              <button className={`group ${position == 4 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(4)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Materiales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 5 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(5)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Fraccionamiento
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} onChange={testkey2} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-special">
                {
                  position == 0 && <SeccionOrden info={orden} form={form} setorden={setOrden} setopen={setOpen} openmodal={openModal} fases={fases} materiales={materialesref} dataimg={dataimg} setDataimg={setDataimg} setinsumos={setInsumos} insumos={insumos} requerimientos={requerimientos} setrequerimientos={setRequerimientos} tallaslist={tallaslist} settallaslist={setTallaslist}/>
                }
                {
                  position == 2 && <SeccionMolde info={molde} orden={urlparams.id} />
                }
                {
                  position == 3 && <SeccionCorte info={corte} setcorte={setCorte} form={form} setopen={setOpen} openmodal={openModal} orden={orden} insumos={insumos} tallaslist={tallaslist}/>
                }
                {
                  position == 4 && <SeccionMateriales info={materiales} orden={urlparams.id}/>
                }
                {
                  position == 5 && <SeccionConfiguracion setopen={setOpen} openmodal={openModal} tallaslist={tallaslist} orden={urlparams.id} setOpenloader={setOpenloader} modelos={modelos} setModelos={setModelos} disponible={disponible.current}/>
                }
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={cancelarorden} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}
