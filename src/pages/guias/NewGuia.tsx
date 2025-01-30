import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";

export default function NewGuia(){
  const [estampado,setEstampado] = useState([])
  const urlparams = useParams()
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const navigate = useNavigate()
  const onsubmit = (e)=>{
    e.preventDefault()
    // console.log(JSON.stringify(Array.from(new FormData(form.current)).map(row=>JSON.parse(row[1]))))
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        // const data = new FormData(form.current)
        const data = new FormData()
        urlparams.id && data.append('id',urlparams.id)
        data.append('info',JSON.stringify(Array.from(new FormData(form.current)).map(row=>JSON.parse(row[1]))))
        await Consulta({url: 'produccion/guardarestampado/',params:{
          method:'PUT',
          body:data
        }})
        .then(resp => {
          setOpenloader(false)
          navigate('/main/estampado/inicio')
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
        await Consulta({url: 'produccion/estampado/' + urlparams.id,})
          .then(resp => {
            setEstampado(resp)
            // console.log()
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
    // setRegistros([...registros,{}])
    setEstampado([...estampado,{}])
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
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} className="flex flex-col flex-1 overflow-hidden">
              {
                estampado.length > 0
                ? <div>Cuerpo guia</div>
                : <div>De click al boton agregar para ingresar un nuevo registro</div>
              }
              {/* {
                registros.length > 0 
                ? registros.map(row=> <Estampado/>)
                : <div>De click al boton agregar para ingresar un nuevo registro</div>
              } */}
              {/* <FormFase info={estampado}/> */}
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/estampado/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button action={nuevoregistro} type={'button'} tipo={'accept'}>Agregar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}