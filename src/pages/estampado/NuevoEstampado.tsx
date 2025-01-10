import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useEffect, useRef, useState } from "react"
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import { Consulta } from "../../utils/utils"

function FormFase({info}) {
  // const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  // useEffect(()=>{
  //   console.log("Cargando informacion de detalle orden")
  // },[])
  return(
    <div className="flex-1 overflow-y-scroll scrollbar-special">
      <div className={` flex-col gap-3 pt-4 flex`}>
        <div className="flex gap-3">
          <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
          <Input name={'op'} title="OP" defaults={info.length > 0 ? info[0].op : null} type="text" />
          <Input name={'nro_corte'} title="NroCorte" defaults={info.length > 0 ? info[0].nro_corte : null} type="text" />
          <Input name={'nro_polos'} title="Polos" defaults={info.length > 0 ? info[0].nro_polos : null} type="number" />
          <Input name={'nro_paquetes'} title="Paquetes" defaults={info.length > 0 ? info[0].nro_paquetes : null} type="number" />
          <Input name={'fec_inicio'} title="FechaInicio" defaults={info.length > 0 ? info[0].fec_inicio : null} type="date" />
          <Input name={'fec_termino'} title="FechaTermino" defaults={info.length > 0 ? info[0].fec_termino : null} type="date" />
        </div>
        <div className="flex flex-col gap-3">
          <Input name={'modelo'} title="Modelo" defaults={info.length > 0 ? info[0].modelo : null} type="text" />
          <Input name={'nro_personal'} title="Personal" defaults={info.length > 0 ? info[0].nro_personal : null} type="number" />
          <Input name={'tipo_estampado'} defaults={info.length > 0 ? info[0].tipo_estampado : null} title="TipoEstampado" type="text" />
          <InputSelect title={'Estado'} name={"estado"} data={[{ indice: 'PEND', option: 'PENDIENTE' }, { indice: 'FNLZ', option: 'FINALIZADO' }, { indice: 'ANUL', option: 'ANULADO' }]} df={info.length > 0 ? info[0].estado : null}/>
        </div>
        <div>
          <TextArea title="Observaciones" name="observaciones" rows={8} />
        </div>
      </div>
    </div>
  )
}

export default function NuevoEstampado(){
  const [estampado,setEstampado] = useState([])
  const urlparams = useParams()
  console.log("Estruendo:",urlparams)
  const form = useRef()
  const navigate = useNavigate()
  const onsubmit = (e)=>{
    e.preventDefault()
    console.log("Ejecutando el submit")
    const pp = async () => {
      const data = new FormData(form.current)
      await Consulta({url: 'produccion/guardarestampado/',params:{
        method:'PUT',
        body:data
      }})
        .then(resp => {
          // setEstampado(resp)
          console.log("Datos del estampado guardado :",resp)
        })
        .catch((err)=>{
          // setOpenloader(false)
          // toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          // setOpenloader(false)
        })
    }
    pp()
  }
  const testkey = ()=>{
    
  }
  useEffect(()=>{
    if(urlparams.id){
      // setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/estampado/' + urlparams.id,})
          .then(resp => {
            setEstampado(resp)
            console.log("Opportynity never die!!!!",resp)
          })
          .catch((err)=>{
            // setOpenloader(false)
            // toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(()=>{
            // setOpenloader(false)
          })
      }
      pp()
    }
  },[])
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Operaciones /</h2>
              <span className="text-blue-500 font-bold">
                Nuevo Estampado
                {/* {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].oc + '-' + orden[0].producto + '-' + orden[0].base + '-' + orden[0].modelos}`
                  : "Nueva Orden"
                } */}
              </span>
            </div>
            <hr />
          </div>

          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1">
            
            <hr />
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} className="flex flex-col flex-1 overflow-hidden">
              {/* <FormFase position={position} info={orden} /> */}
              <FormFase info={estampado}/>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/estampado/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}