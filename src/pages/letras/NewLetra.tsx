import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Proveedores from "../../components/Common/Proveedores"
import { useNavigate, useParams } from "react-router-dom";

export default function NewLetra(){
  const urlparams = useParams()
  const [info,setInfo] = useState([])
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const navigate = useNavigate()

  const onsubmit = (e)=>{
    e.preventDefault()
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de la letra ingresada?</div>,
      action: async () => {
        setOpenloader(true)
        const data = new FormData()
        urlparams.id && data.append('id',urlparams.id)
        data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
        await Consulta({url: 'letras/saveLetra/',params:{
          method:'PUT',
          body:data
        }})
        .then(resp => {
          setOpenloader(false)
          navigate('/main/letras/inicio')
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
  useEffect(()=>{
    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'letras/getLetraById/' + urlparams.id,})
          .then(resp => {
            console.log("info guia :",resp)
            setInfo(resp[0])
            setOpenloader(false)
          })
          .catch((err)=>{
            setOpenloader(false)
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
      pp()
    }
  },[])
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
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Letras /</h2>
              <span className="text-blue-500 font-bold">
                Nueva Letra
              </span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1 pt-2">

            <form ref={form} onSubmit={onsubmit}>
              <div className={` flex-col gap-3 flex`}>
                <div className="flex flex-row gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                  <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} />
                  <Input name={'fec_emision'} title="FecEmision" defaults={Object.keys(info).length > 0 ? info.fec_emision : null} type="date" />
                  <Input name={'fec_vencimiento'} title="FecVencimiento" defaults={Object.keys(info).length > 0 ? info.fec_vencimiento : null} type="date" />
                </div>
                <div className="flex flex-row gap-3">
                  <Input name={'num_letra'} title="NumeroLetra" defaults={Object.keys(info).length > 0 ? info.num_letra : null} type="text" />
                  <Input name={'documentos_ref'} title="DocumentosRef" defaults={Object.keys(info).length > 0 ? info.documentos_ref : null} type="text" />
                  <Input name={'importe'} title="Importe" defaults={Object.keys(info).length > 0 ? info.importe : null} type="number" />
                  <InputSelect title={'Estado'} name={"estado"} data={
                    [
                      { indice: 'EMIT', option: 'PENDIENTE', selected: true }, 
                      { indice: 'TERM', option: 'FINALIZADO' }, 
                      { indice: 'ANUL', option: 'ANULADO' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.estado : null} 
                  />
                </div>
                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={() => navigate('/main/letras/inicio')} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}