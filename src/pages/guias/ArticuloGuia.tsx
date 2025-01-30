import { useContext, useEffect, useRef, useState } from "react"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"

export default function ArticuloGuia({data,setdata,position}){
  const { openModal } = useContext(ModalWindowContext)
  const [nombre,setNombre] = useState('Juan')
  const form = useRef()
  const [info,setInfo] = useState(data)
  useEffect(()=>{
    console.log("Datos del estampado :",info)
  },[])
  const mostrardetalle = (e)=>{
    const action = e.target.dataset.action
    const id = e.target.dataset.id  
    let params_modal = null

    switch (action) {
      case 'delete':
        setdata(info=>info.filter((row,id)=>id !== position))
        break;
      case 'edit':
        params_modal = {
          open:true,
          content: 
            <div className="flex-1 w-[60vw] pb-2">
              <form ref={form}>
                <div className={` flex-col gap-3 flex`}>
                  <div className="flex gap-3">
                    <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                    <Input name={'op'} title="OP" defaults={Object.keys(info).length > 0 ? info.op : null} type="text" />
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
            setNombre('Miguel')
            let consolidado = Array.from(new FormData(form.current)).reduce((carry,value)=>{
              carry[value[0]]=value[1]
              return carry
            },{})
            setInfo(consolidado)
          }
        }
        openModal(params_modal)
        
        break;
    
      default:
        break;
    }
    
  }
  return(
    <>
      <div className="border border-gray-300 bg-gray-100 rounded-xl cursor-pointer flex items-center justify-between p-2 relative mb-2" data-action="edit" onClick={mostrardetalle} data-info={JSON.stringify(info)}>
        <input type="hidden" name='info' value={JSON.stringify(info)} />
        <div>
          {/* Mi nombre es : {nombre} */}
          OP:{info.op ?? ''}/
          NroCorte:{info.nro_corte ?? ''}/
          Modelo:{info.modelo ?? ''}/
          Cliente:{info.cliente ?? ''}/
          Polos:{info.nro_polos ?? ''}/
          Paquetes:{info.nro_paquetes ?? ''}/
          Personal:{info.nro_personal ?? ''}/
          TipoEstampado:{info.tipo_estampado ?? ''}/
          NroFallados:{info.nro_fallados ?? ''}/
          Estado:{info.estado ?? ''}/
          Avance:{info.avance ?? ''}/
        </div>
        <ul className="flex flex-row justify-end">
          <li>
            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} data-id={info.idx}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
            </div>
          </li>
          <li>
            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            </div>
          </li>
          <li>
            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => { }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
            </div>
          </li>
          {/* <li>
            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => { }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
            </div>
          </li> */}
          <li>
            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}} data-id={info.idx}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
            </div>
          </li>
        </ul>
        {/* <div className="absolute right-[-14px] bg-orange-300 rounded-full border border-gray-300 w-[28px] h-[28px] z-10"></div> */}
        {/* <div className="absolute left-[-14px] bg-gray-200 rounded-full border border-gray-300 w-[28px] h-[28px] z-10 flex items-center justify-center">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-shirt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.883 3.007l.095 -.007l.112 .004l.113 .017l.113 .03l6 2a1 1 0 0 1 .677 .833l.007 .116v5a1 1 0 0 1 -.883 .993l-.117 .007h-2v7a2 2 0 0 1 -1.85 1.995l-.15 .005h-10a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7h-2a1 1 0 0 1 -.993 -.883l-.007 -.117v-5a1 1 0 0 1 .576 -.906l.108 -.043l6 -2a1 1 0 0 1 1.316 .949a2 2 0 0 0 3.995 .15l.009 -.24l.017 -.113l.037 -.134l.044 -.103l.05 -.092l.068 -.093l.069 -.08c.056 -.054 .113 -.1 .175 -.14l.096 -.053l.103 -.044l.108 -.032l.112 -.02z" /></svg>
        </div> */}
      </div>
    </>
  )
}