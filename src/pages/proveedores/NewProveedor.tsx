import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonLoader } from "../../components/Atoms/Button/ButtonLoader";


function SeccionOrden({info,form,setorden,setopen,openmodal,fases,materiales,dataimg,setDataimg}){
  // const [dataimg,setDataimg] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    // const handleSalamandra = (event) => {
    //   setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
    // };
    // form.current.addEventListener("salamandra", handleSalamandra);
  },[])

  const onclick = (e)=>{
    const position = e.target.dataset.position
    setorden(orden => ([{...orden[0], combos: orden[0].combos.filter((row,key)=>key !== parseInt(position)) }]))
  }
  const consultaruc = ()=>{
    setLoading(true)
    Consulta({url:'https://jsjfact.com/_consulta/consulta_masiva.php?RUX='+'20522094120'})
    .then(resp=>{
      console.log("La respuesta es:",resp)
      setLoading(false)
    })
    .catch(()=>{
      console.log("Se produjo un error en la consulta")
    })
    
  }
  // const nuevamarca = ()=>{
  //   let params_modal = null
  //   params_modal = {
  //     open:true,
  //     content: <Marca actions={(item)=>{
  //       setorden(orden=>([{...orden[0],marca:item.nom}]))
  //       setopen(false)
  //     }}/>,
  //     controls: true,
  //     header: false,
  //     action:()=>{
  //     }
  //   }
  //   openmodal(params_modal)
  // }
  return <>
    <div className={`flex flex-col gap-3 pt-3`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 align-top justify-start items-start">
            <div className="w-[15%]">
              <Input name={'ruc'} title="NroRUC" defaults={info.length > 0 ? info[0].ruc : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
            </div>
            <ButtonLoader task={consultaruc} loading={false} type="button" loading={laoding} tipo={'success'}>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12a9 9 0 1 0 -9 9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h7.9" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
            </ButtonLoader>
          </div>
        </div>
        <div className="w-[45%]">
          <Input name={'nom'} title="RazonSocial" defaults={info.length > 0 ? info[0].nom : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
        </div>
        <div className="w-[20%]">
          <Input name={'giro'} title="Giro" defaults={info.length > 0 ? info[0].giro : null} type="text" verify="true" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <div className="w-[60%]">
          <Input name={'direccion'} title="Direccion" defaults={info.length > 0 ? info[0].direccion : null} type="text" verify="true" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <hr className="m-0"/>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">

            <div className="w-[20%]">
              <Input name={'telefono'} title="Telefono" defaults={info.length > 0 ? info[0].telefono : null} type="text" verify="true" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
            <div className="w-[35%]">
              <Input name={'correo'} title="Correo" defaults={info.length > 0 ? info[0].correo : null} type="text" verify="true" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
            <div className="w-[40%]">
              <Input name={'web'} title="Web" defaults={info.length > 0 ? info[0].web : null} type="text" verify="true" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>

          </div>
        </div>
        <div className="w-[60%]">
          <Input name={'det'} title="Detalle" defaults={info.length > 0 ? info[0].det : null} type="text" verify="true" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <div className="w-[400px]">
          <InputSelect title={'Categoria'} name={"cat"} formref={form} data={
            [
              { indice: 'P', option: 'NINGUNO', selected: true  },
              { indice: 'I', option: 'TRANSPORTISTA' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].cat : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
          />
        </div>
      </div>
    </div>
  </>
}

export function NewProveedor() {
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

  const onsubmit = async (e) => {
    e.preventDefault()
    let url_save = '', method = 'GET'
    let data = undefined

    if(position == 0){
      url_save = urlparams.id ? 'productos/updateProducto' : 'productos/generateProducto'
      method = urlparams.id ? 'PUT' : 'POST'
      data = new FormData(e.target)
    }
    const PARAMS_MODAL = {
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de los datos ingresados?</div>,
      action: async () => {
        setOpenloader(true)
        await Consulta({
          url: url_save,
          params: {
            method: method, body: data
          }
        })
        .then(resp => {
          console.log("La informacion recibida es:",resp)
          if(resp.ok){
            // navigate("/main/ordenes/")
            toast.success('Los datos ingresados fueron registrados con éxito!!', { theme: "colored" })
          }else{
            toast.error(resp.message, { theme: "colored" })
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
      }
      if(event.detail.name == 'tipo'){
        setOrden(orden => ([{ ...orden[0], tipo: event.detail.indice}]))
      }
    };
    form.current.addEventListener("salamandra", handleSalamandra);

    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'productos/searchproductobyid/' + urlparams.id,})
          .then(resp => {
            console.log("Mostrando informacion :",resp)

            setOrden(resp)
            // setMolde(resp[1])
            // setCorte(resp[2])
            // setMateriales(resp[3])
            // setFases(resp[4])
            // setMaterialesRef(resp[5])
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
        Consulta({url:'ordenes/getmaterialesproduccion'})  
      ])
      .then(resp=>{
        console.log("El resultado de la consulta es:",resp)
        setFases(resp[0])
        setMaterialesRef(resp[1])
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        setOpenloader(false)
      })
    }
  },[])
  const testkey2 = (e)=>{
    // console.log("El target de testkey2 es:",e.target)
    console.log("Dentro del evento keychange")
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
  }
  const testkey = (e)=>{
    console.log("Dentro de otro evento")
    // console.log("El targe dl evento key es:",e.target.name)
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
  }
  const cancelarcreacion = ()=>{
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea descartar los cambios realizados?.<br/> Cualquier modificacion realizada se perderá.</div>,
      action: ()=>{
        navigate('/main/recetas/')
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
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px] pr-1">Proveedores /</h2>
              <span className="text-blue-500 font-bold">
                {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].nom + ' ' + orden[0].marca}`
                  : "Nuevo proveedor"
                }
              </span>
            </div>
            <hr />
          </div>

          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button:hover]:text-gray-700 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button.active:hover]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${position == 0 && 'active'}`} onClick={() => setPosition(0)} data-estado="ALL">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Datos principales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 2 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Datos adicionales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} onChange={testkey2} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-special">
                {
                  position == 0 && <SeccionOrden info={orden} form={form} setorden={setOrden} setopen={setOpen} openmodal={openModal} fases={fases} materiales={materialesref} dataimg={dataimg} setDataimg={setDataimg}/>
                }
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={cancelarcreacion} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}