import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonLoader } from "../../components/Atoms/Button/ButtonLoader";


function SeccionOrden({info,form,setorden}){
  // const { setOpenloader } = useContext(ModalWindowContext)
  // const [dataimg,setDataimg] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    // const handleSalamandra = (event) => {
    //   setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
    // };
    // form.current.addEventListener("salamandra", handleSalamandra);
  },[])

  const consultaruc = ()=>{
    // setOpenloader(true)
    setLoading(true)
    fetch('https://jsjfact.com/_consulta/consulta_masiva.php?RUX='+'20522094120')
    .then(resp=>resp.json())
    .then(data=>{
      console.log("La data es:",data)
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
        {/* <div className="flex flex-col">
        </div> */}
        <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos principales del proveedor</span>
        </div>
        <hr/> 
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 align-top justify-start items-start">
            <div className="w-[15%]">
              <Input name={'ruc'} title="NroRUC" defaults={info.length > 0 ? info[0].ruc : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
            </div>
            <ButtonLoader task={()=>{}} type="button" loading={loading} tipo={'success'}>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12a9 9 0 1 0 -9 9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h7.9" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
            </ButtonLoader>
          </div>
        </div>
        <div className="w-[45%]">
          <Input name={'nom'} title="RazonSocial" defaults={info.length > 0 ? info[0].nom : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
        </div>
        <div className="w-[20%]">
          <Input name={'giro'} title="Giro" defaults={info.length > 0 ? info[0].giro : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <div className="w-[60%]">
          <Input name={'direccion'} title="Direccion" defaults={info.length > 0 ? info[0].direccion : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <hr className="m-0"/>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-[20%]">
              <Input name={'telefono'} title="Telefono" defaults={info.length > 0 ? info[0].telefono : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
            <div className="w-[35%]">
              <Input name={'correo'} title="Correo" defaults={info.length > 0 ? info[0].correo : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
            <div className="w-[40%]">
              <Input name={'web'} title="Web" defaults={info.length > 0 ? info[0].web : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
          </div>
        </div>
        <div className="w-[60%]">
          <Input name={'det'} title="Detalle" defaults={info.length > 0 ? info[0].det : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <div className="w-[400px]">
          <InputSelect title={'Categoria'} name={"cat"} data={
            [
              { indice: '0', option: 'NINGUNO', selected: true  },
              { indice: '1', option: 'TRANSPORTISTA' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].cat : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
          />
        </div>
        <hr className="m-0"/>
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
  const navigate = useNavigate()

  const onsubmit = async (e) => {
    e.preventDefault()
    let url_save = '', method = 'GET'
    let data = undefined

    for (const element of form.current.querySelectorAll("input[verify='true']")) {
      if(element.tagName == 'INPUT' && element.value == ''){
        console.log("El input problematico es :",element)
        toast.error('Debe ingresar la información correspondiente al campo seleccionado. Por favor verifique.', { theme: "colored" })
        return 0
      }
    }

    if(position == 0){
      url_save = urlparams.id ? 'proveedores/updateproveedor/' + urlparams.id : 'proveedores/saveproveedor'
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
            toast.success(resp.message, { theme: "colored" })
            navigate("/main/proveedores/")
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
    if(urlparams.id){
      setOpenloader(true)
      Consulta({url: 'proveedores/getproveedorbyid/' + urlparams.id,})
        .then(resp => {
          console.log("Mostrando informacion :",resp)
          setOrden(resp)
        })
        .catch((err)=>{
          setOpenloader(false)
          toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          setOpenloader(false)
        })
    }else{
      // Promise.all([
      //   Consulta({url:'ordenes/getfasesproduccion'}),
      //   Consulta({url:'ordenes/getmaterialesproduccion'})  
      // ])
    }
  },[])
  const cancelarcreacion = ()=>{
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea descartar los cambios realizados?.<br/> Cualquier modificacion realizada se perderá.</div>,
      action: ()=>{
        navigate('/main/proveedores/')
      }
    })
  }
  return (
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px] pr-1">Proveedores /</h2>
              <span className="text-blue-500 font-bold">
                {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].nom}`
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
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%] bg-"></span>
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
            <form ref={form} onSubmit={onsubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-special">
                {
                  position == 0 && <SeccionOrden info={orden} form={form} setorden={setOrden}/>
                }
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={cancelarcreacion} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}