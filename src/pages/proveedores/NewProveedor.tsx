import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonLoader } from "../../components/Atoms/Button/ButtonLoader";
import SeccionDatosPrincipales from "./componentes/SeccionDatosPrincipales";
import SeccionDatosAdicionales from "./componentes/SeccionDatosAdicionales";

export function NewProveedor() {
  const form = useRef()
  const urlparams = useParams()
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const [position, setPosition] = useState(0)
  const [orden, setOrden] = useState([])
  const [locales, setLocales] = useState([])
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
            // navigate("/main/proveedores/")
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
          setOrden(resp.result)
          setLocales(resp.locales)
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
              {/* <button className={`group flex-row items-center gap-1 ${position == 1 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(1)} data-estado="FNLZ"> */}
              <button className={`group flex-row items-center gap-1 ${position == 1 && 'active'}`} onClick={() => setPosition(1)} data-estado="FNLZ">
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
                  position == 0 && <SeccionDatosPrincipales info={orden} form={form} setorden={setOrden}/>
                }
                {
                  position == 1 && <SeccionDatosAdicionales info={locales} form={form} setorden={setOrden} openModal={openModal} setOpen={setOpen} locales={locales} setLocales={setLocales}/>
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