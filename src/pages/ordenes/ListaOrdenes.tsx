import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Search } from "../../components/Atoms/Search/Search";
import { useNavigate } from "react-router-dom";
import { AuthPermitions } from "../../contexts/contexts";
import { Consulta } from "../../utils/utils";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";
import StatusGeneral from "./StatusGeneral";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import { ButtonLoader } from "../../components/Atoms/Button/ButtonLoader";
import { ContextualMenuContext } from "../../components/ContextMenu/ContextualMenuContext";

const colorfase = {
  'ORDENES':'bg-green-500',
  'CONFECCION':'bg-purple-500',
  'ESTAMPADO':'bg-gray-500',
  'ACABADOS':'bg-red-500',
  'LAVANDERIA':'bg-green-500',
  'MOLDES':'bg-orange-500',
  'OJAL':'bg-blue-500',
  'CORTE':'bg-rose-400',
  'BORDADO':'bg-yellow-500',
  'FINALIZADO':'bg-gray-400',
  'TRANSITO':'bg-black'
}

const SkeletonScreen = ()=>{
  const lista = ['','','','','','','','','','','','','','','']
  return(
    <>
      {
        lista.map(row=>(
          <div className={`bg-gray-200 rounded-t-xl rounded-bl-xl rounded-br-xl p-3 relative cursor-pointer hover:opacity-80 mb-[34px] mt-2 z-0`} data-action="show" onClick={()=>{}}>
            <div className="flex flex-row items-center gap-2">
              <div className={`bg-gray-300 rounded-full h-[40px] w-[40px] flex flex-row justify-center items-center`}></div>
              <div className="text-black text-[14px] font-bold flex-1"><div className="w-[120px] h-[30px] bg-gray-300 rounded-sm"></div></div>
              <div className="text-black text-[20px] flex flex-row gap-4">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="text-[8px]"><div className="w-[60px] h-[10px] rounded-xl bg-gray-300"></div></div>
                  <div className="italic font-extrabold"><div className="w-[40px] h-[20px] bg-gray-300 rounded-sm"></div></div>
                </div> 
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="text-[8px]"><div className="w-[60px] h-[10px] rounded-xl bg-gray-300"></div></div>
                  <div className="italic font-extrabold"><div className="w-[40px] h-[20px] bg-gray-300 rounded-sm"></div></div>
                </div> 
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="text-[8px]"><div className="w-[60px] h-[10px] rounded-xl bg-gray-300"></div></div>
                  <div className="italic font-extrabold"><div className="w-[40px] h-[20px] bg-gray-300 rounded-sm"></div></div>
                </div> 
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="text-[8px]"><div className="w-[60px] h-[10px] rounded-xl bg-gray-300"></div></div>
                  <div className="italic font-extrabold"><div className="w-[40px] h-[20px] bg-gray-300 rounded-sm"></div></div>
                </div> 
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="text-[8px]"><div className="w-[60px] h-[10px] rounded-xl bg-gray-300"></div></div>
                  <div className="italic font-extrabold"><div className="w-[40px] h-[20px] bg-gray-300 rounded-sm"></div></div>
                </div>
                <div className="flex flex-row items-center">
                  <ul className="flex flex-row justify-end gap-2">
                    <li><div className="rounded-full w-9 h-9 bg-gray-300 transition-colors flex justify-center items-center" data-action="download" onClick={()=>{}}></div></li>
                    <li><div className="rounded-full w-9 h-9 bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}}></div></li>
                    <li><div className="rounded-full w-9 h-9 bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}></div></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[-26px] h-[25px] bg-gray-200 ml-4 mr-4 rounded-b-xl p-2 left-0 right-0 flex flex-row items-center gap-2">
              <div className={`text-black text-center text-[10px] h-[12px] flex flex-row bg-gray-300 rounded-lg overflow-hidden transition-all stages flex-1`}>
              </div>
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border"></div>
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border"></div>
            </div>
          </div>
        ))
      }
    </>
  )
}

const contextual_content = {
  context1:
    <>
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Descargar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Cambiar nombre</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-share"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3" /><path d="M16 22l5 -5" /><path d="M21 21.5v-4.5h-4.5" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Compartir</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Organizar</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Información carpeta</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Ocultar</div>
          </div>
        </li>
      </ul>
    </>,
  context2:
    <>
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_div]:pointer-events-none'>
        <li data-action='edit'>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Editar orden</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_div]:pointer-events-none'>
        <li data-action='subir'>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M12 11v6" /><path d="M9.5 13.5l2.5 -2.5l2.5 2.5" /></svg>
            </div>
            <div className='flex items-center text-left flex-1'>Subir archivo</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Subir carpeta</div>
          </div>
        </li>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Información carpeta</div>
          </div>
        </li>
      </ul>
      <hr />
      <ul className='[&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center'>
        <li>
          <div className='flex gap-4 p-2 select-none cursor-pointer w-[100%]'>
            <div className="pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
            </div>
            <div className='flex flex-col items-center text-left'>Ocultar</div>
          </div>
        </li>
      </ul>
    </>
}

const ExportFilters = ({ close, update }) => {
  const [stage, setStage] = useState(1)
  const [laoding, setLoading] = useState(false)
  const form_export = useRef()
  const form_import = useRef()
  const exportletra = () => {
    setLoading(true)
    Consulta({
      url: 'reports/resumenconsolidado',
      params: {
        body: new FormData(form_export.current),
        method: 'POST'
      }
    })
      .then(resp => {
        // loader(false)
        // setLoading(false)
        const hexString = resp.data;
        const bytes = new Uint8Array(hexString.length / 2)
        for (let i = 0; i < hexString.length; i += 2) {
          bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        const file = window.URL.createObjectURL(new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }))
        window.open(file,'_blank')
        // const a = document.createElement("a");
        // a.classList.add("pdf_link")
        // a.href = file;
        // a.download = resp.name;
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a)
      })
      .catch((error) => {
        console.log("El mnesaje de error es:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const importletra = (e) => {
    e.preventDefault()
    console.log(Object.fromEntries(new FormData(form_import.current)))
    setLoading(true)
    Consulta({url:'reports/import',params:{
      method:'POST',
      body:new FormData(form_import.current)
    }})
    .then(resp=>{
      console.log(resp)
      close(false)
      // setLoading(false)
      update()
    })
    .catch(err=>{ 
      console.log(err)
    })
    .finally(()=>{
      console.log("Finaliza la consulta")
      setLoading(false)
    })
  }
  return (
    <>
      <div className="w-[800px] h-[500px] overflow-hidden flex flex-col">
        
        <div className="border-t-[.2px] border-b-[.2px] border-gray-300">
          <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
            <button className={`group ${stage == 1 ? 'active' : ''}`} data-stage="1" onClick={()=>setStage(1)}>
              <span className="relative h-[100%] flex items-center pointer-events-none">
                Exportar
                <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
              </span>
            </button>
            <button className={`group ${stage == 2 ? 'active' : ''}`} data-stage="2" onClick={()=>setStage(2)}>
              <span className="relative h-[100%] flex items-center pointer-events-none">
                Importar
                <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
              </span>
            </button>
          </ul>
        </div>
        <div className="flex-1">
          <div className={`w-[200%] h-[100%] flex flex-row ${stage == 1 ? 'translate-x-0' : 'translate-x-[-50%]'} transition-transform duration-200`}>
            {/* EXPORTAR */}
            <div className="flex-1 h-full flex flex-col">
              <div className="w-full pt-2 flex-1">
                <div>
                  <form ref={form_export} className="flex flex-col gap-2">
                    <Input name={'proveedor'} title="Proveedor" type="text" />
                    <Input name={'fec_desde'} title="FechaDesde" type="date" />
                    <Input name={'fec_hasta'} title="FechaHasta" type="date" />
                    <InputSelect title={'Estado'} name={"estado"} data={
                      [
                        { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, 
                        { indice: 'TERMINADO', option: 'TERMINADO' }, 
                      ]} 
                      df={null} 
                    />
                  </form>
                </div>
              </div>
              <div className="flex flex-row justify-end gap-2 pb-2">
                <Button tipo="default" action={()=>close(false)} type="button">Cancelar</Button>
                {/* <Button action={exportletra} tipo="success" type="button">Exportar</Button> */}
                <ButtonLoader task={exportletra} tipo={'success'} type="button" loading={laoding}>Exportar</ButtonLoader>
              </div>
            </div>
            {/* IMPORTAR */}
            <div className="flex-1 flex flex-col">
              <form ref={form_import} onSubmit={importletra} className="flex flex-col gap-2 h-full">
                <div className="flex-1 p-2">
                  <input type="file" name="filenext" accept=".xlsx,application/vnd.ms-excels" required className="w-full h-[40px] border-[.2px] border-gray-200 bg-zinc-300 cursor-pointer"/>
                </div>
                <div className="flex flex-row justify-between items-center gap-2 pb-2">
                  <a href="http://192.168.18.20:4000/templates/plantilla_letras.xlsx" target="_blank" download={'nueva_imagen'}>* Descargar plantilla</a>
                  <div className="flex flex-row gap-2">
                    <Button tipo="default" action={()=>close(false)} type="button">Cancelar</Button>
                    {/* <ButtonLoader task={importletra} tipo={'accept'} type="submit" loading={laoding}>Importar</ButtonLoader> */}
                    <ButtonLoader tipo={'accept'} type="submit" loading={laoding}>Importar</ButtonLoader>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default function ListaOrdenes() {
  const [ ordenes, setOrdenes ] = useState([])
  const [ position, setPosition ] = useState(0)
  const [ rango, setRango ] = useState(30)
  const { logout, credentials } = useContext(AuthPermitions)
  const { open } = useContext(ContextualMenuContext)
  const { openModal, config, setOpenloader, openloader, setOpen} = useContext(ModalWindowContext)
  const [ refresh, setRefresh ] = useState(false)
  const [ estado, setEstado ] = useState('EN PROCESO')
  const [ gridcol, setGridCol ] = useState(2)
  const navigate = useNavigate()

  const onclick = (e) => {
    console.log("el culpable ",e.target,e.currentTarget)

    const action = e.target.dataset.action ?? e.currentTarget.dataset.action
    const id = e.target.dataset.id ?? e.currentTarget.dataset.id

    let params_modal = null
    switch (action) {
      case 'delete':
        params_modal = {
          open:true,
          content: <div>Desea eliminar la orden de producción seleccionada?. Tenga en cuenta de que el <br/> proceso no es reversible.</div>,
          controls: true,
          // header: true,
          action:()=>{
            setOpenloader(true)
            Consulta({
              url: 'ordenes/' + id, params: {
                method: 'DELETE'
              }
            })
              .then(resp => {
                // setOrdenes(resp)
                toast.success('Orden eliminada con éxito!', { theme: "colored" })
                setRefresh(true)
                setOpenloader(false)
              })
              .catch(() => {
                setOpenloader(false)
                logout()
              })
              .finally(()=>{
                setOpenloader(false)
              })
          }
        }
        openModal(params_modal)
        break;
      case 'edit':
        navigate("/main/ordenes/nuevo/"+ id)
        break;
      case 'show':
        // navigate("/main/ordenes/nuevo/"+ id)
        // alert("Hola mudno como estamos")
        openModal({
          open: true,
          header: false,
          controls: true,
          content: <StatusGeneral id={id} openmodal={openModal}/>,
          // content: <div>hola</div>,
          action: async () => {
          }
        })

        break;
      case 'download':
        params_modal = {
          open: true,
          content: <div>Desea continuar con la descarga de la guia de traslado interno?.<br />  Tenga en cuenta de que el proceso puede tardar unos minutos.</div>,
          controls: true,
          header: false,
          action: () => {
            const desc = async () => {
              setOpenloader(true)

              Consulta({
                // url: "ordenes/printsugerido/" + id
                url: "ordenes/printhojacorte/" + id
              })
                .then(resp => {
                  setOpenloader(false)
                  const binaryString = window.atob(resp.data);
                  const binaryLen = binaryString.length;
                  const bytes = new Uint8Array(binaryLen);
                  for (let i = 0; i < binaryLen; i++) {
                    const ascii = binaryString.charCodeAt(i);
                    bytes[i] = ascii;
                  }
                  const file = window.URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }))
                  window.open(file,'_blank')
                  // const link = document.createElement('a')
                  // link.href = file
                  // link.target = 'blank'
                  // link.click()
                })
                .catch((err) => {
                  setOpenloader(false)
                  toast.error('Se produjo un error!!', { theme: "colored" })
                })
            }
            desc()
          }
        }
        openModal(params_modal)
        break;
      default:
        break;
    } 
  }
  const busqueda_search = async (e,setDisabled)=>{
    console.log('El comando presionado es :',e.code,'-',e.keyCode)
    setOpenloader(true)
    setDisabled(true)
    Consulta({
      url: 'ordenes/getordenes/' + e.value + ` ${estado}`
    })
    .then(resp => {
      console.log('Resultado de busqueda de orden:',resp)
      setOrdenes(resp)
      setOpenloader(false)
      setDisabled(false)
      return 'hola juan'
    })
    .catch((error) => {
      console.log(error)
      toast.error('Error en la consulta de base', { theme: "colored" })
      // logout()
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
      setOpenloader(false)
    })
  }

  useEffect(() => {
    console.log("Empezando el primer rendeizado")
    setOpenloader(true)
    Consulta({url: 'ordenes/getordenes/' + ` ${estado}`})
      .then(resp => {
        console.log(resp)
        setOrdenes(resp)
        setOpenloader(false)
      })
      .catch((error) => {
        console.log(error)
        // logout()
        toast.error('Error en la consulta de base', { theme: "colored" })
      })
      .finally(()=>{
        console.log("Horror en la consulta de base de datos")
        setOpenloader(false)
      })
  }, [])
  useEffect(() => {
    if(refresh){
      setOpenloader(true)
      Consulta({url: 'ordenes/getordenes/' + ` ${estado}`})
        .then(resp => {
          setOrdenes(resp)
          setOpenloader(false)
          setRefresh(false)
        })
        .catch(() => {
          console.log("error")
          logout()
          setOpenloader(false)
        })
        .finally(()=>{
          // console.log("error")
          setOpenloader(false)
        })
    }
  }, [refresh])
  const menu = useRef()
  const calculo = (e)=>{
    const estado_orden = e.target.dataset.estado
    if(!e.target.classList.contains('active')){
      for(const element of menu.current.querySelectorAll('button')){
        element.classList.remove('active')
      }
      e.target.classList.add("active")
    }
    setEstado(estado_orden)
    setOpenloader(true)
    Consulta({url: 'ordenes/getordenes/' + ` ${estado_orden}`})
    .then(resp => {
      setOrdenes(resp)
      setOpenloader(false)
      setRefresh(false)
    })
    .catch(() => {
      console.log("error")
      logout()
      setOpenloader(false)
    })
    .finally(()=>{
      setOpenloader(false)
    })
  }
  // const calculo_ = (e)=>{
  //   const estado = e.target.dataset.estado
  //   const data = new FormData()
  //   data.append("params",JSON.stringify([{estado_orden:estado}]))
  //   if(!e.target.classList.contains('active')){
  //     for(const element of menu.current.querySelectorAll('button')){
  //       element.classList.remove('active')
  //     }
  //     e.target.classList.add("active")
  //   }
  //   setOpenloader(true)
  //     Consulta({
  //       url: 'produccion/busqueda', params: {
  //         method: 'POST',
  //         body: data
  //       }
  //     })
  //       .then(resp => {
  //         setOrdenes(resp)
  //         setOpenloader(false)
  //         setRefresh(false)
  //       })
  //       .catch(() => {
  //         console.log("error")
  //         logout()
  //         setOpenloader(false)
  //       })
  //       .finally(()=>{
  //         setOpenloader(false)
  //       })
  // }
  const recargarinfo = ()=>{
    setPosition(0)
    setRefresh(true)
  }
  // const moveback = ()=>{
  //   if(position > 0){
  //     setPosition(position=>position - 1)
  //   }
  //   console.log("Hacia atras : ",position)
  // }
  // const moveforward = ()=>{
  //   if(position < Math.ceil(ordenes.length / rango) - 1){
  //     setPosition(position=>position + 1)
  //   }
  //   console.log("Hacia adelante : ",position)
  // }
  const regulalizzet = ()=>{
    console.log("dentro de lizzet")
    setOpenloader(true)
    Consulta({url: 'ordenes/lizzet/22'})
    .then(resp => {
      console.log(resp)
      setOpenloader(false)
    })
    .catch(() => {
      console.log("error")
      logout()
      setOpenloader(false)
    })
    .finally(()=>{
      setOpenloader(false)
    })
  }
  const exportarexcel = () => {
    openModal({
      open: true,
      header: false,
      controls: false,
      // content: <ExportFilters close={setOpen} loader={setOpenloader} update={recargarinfo}/>,
      content: <ExportFilters close={setOpen} update={recargarinfo}/>,
      // content: <div>Ventana de exportado de informcaion de orden</div>,
      action: async () => {}
    })
  }

  const onrightclick = (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    const content = e.target.matches('div') ? contextual_content.context2 : contextual_content.context1
    const actions =
      e.target.matches('div')
        ? (e) => {
          if (e.target.matches("li[data-action='edit'")) {
            navigate("/main/ordenes/nuevo/"+ id)
          }
        }
        : (e) => {
          console.log(e.target)
        }
    open({
      position: { x: e.clientX, y: e.clientY },
      content: content,
      actions: actions
    })
  }
  const [vista,setVista] = useState('1')
  return (
    <>
      {/* <div className="directory flex flex-col h-full lg:p-4 sm:p-1 rounded-md w-full relative bg-white"> */}

        <div className="flex flex-col flex-1 pl-2 pr-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]"><strong>Producción</strong></h2>
              <div className="w-[400px] mb-1">
                <Search config={{ width: '200px' }} action={busqueda_search} />
              </div>
            </div>
            {/* <hr /> */}
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll">
            <div className="flex flex-row justify-between items-center">
              <ul ref={menu} className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                <button className={`group ${estado == 'EN PROCESO' && 'active'}`} data-estado="EN PROCESO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes en proceso
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className={`group ${estado == 'FINALIZADO' && 'active'}`} data-estado="FINALIZADO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes finalizadas
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className={`group ${estado == 'ANULADO' && 'active'}`} data-estado="ANULADO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes anuladas
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
              <div className="flex flex-row gap-2">
                <div className={`cursor-pointer ${vista == '0' ? 'bg-gray-400' : 'hover:bg-gray-300' } transition-all rounded-full w-9 h-9 flex flex-row justify-center items-center`} onClick={()=>setVista('0')}>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="pointer-events-none icon icon-tabler icons-tabler-outline icon-tabler-layout-grid"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
                </div>
                <div className={`cursor-pointer ${vista == '1' ? 'bg-gray-400' : 'hover:bg-gray-300'} rounded-full w-9 h-9 flex flex-row justify-center items-center`} onClick={()=>setVista('1')}>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="pointer-events-none icon icon-tabler icons-tabler-filled icon-tabler-layout-grid"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 3a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" /><path d="M19 3a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" /><path d="M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" /><path d="M19 13a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z" /></svg>
                </div>
                <div className={`cursor-pointer ${vista == '2' ? 'bg-gray-400' : 'hover:bg-gray-300'} rounded-full w-9 h-9 flex flex-row justify-center items-center`} onClick={()=>setVista('2')}>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-table"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 11h4a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-2a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-6a1 1 0 0 1 1 -1z" /><path d="M21 12v6a3 3 0 0 1 -2.824 2.995l-.176 .005h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1z" /><path d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v2a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h6z" /><path d="M9 4v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a3 3 0 0 1 2.824 -2.995l.176 -.005h2a1 1 0 0 1 1 1z" /></svg>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex-1 scrollbar-special overflow-y-scroll">
              {vista == '2'
              ?
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:nth-child(n):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1s [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr:hover_td_div.stages]:scale-[1.2] [&_tbody_tr:hover_td_div.stages]:translate-x-[-25px]">
                <thead className="text-left sticky top-0 bg-white">
                  <tr>
                    <th className="lg:table-cell">OC</th>
                    <th className="lg:table-cell">Cliente</th>
                    <th className="lg:table-cell">FecEmision</th>
                    <th className="lg:table-cell">FecComercial</th>
                    <th className="lg:table-cell">Marca</th>
                    <th className="lg:table-cell">Producto</th>
                    <th className="lg:table-cell">Modelo</th>
                    <th className="lg:table-cell">Sugerido/Liquidación</th>
                    <th className="lg:table-cell">DiasProducción</th>
                    <th className="lg:table-cell">DiasPendientes</th>
                    <th className="lg:table-cell">FaseActual</th>
                    <th className="lg:table-cell text-center">Accciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ordenes.length > 0
                      ? ordenes.map((row, key) => (
                        <tr key={key} data-action="show" onClick={onclick} data-id={row.idx} className="hover">
                          <td>{row.oc}</td>
                          <td className="font-bold">{row.cliente.substr(0,30)}</td>
                          <td>{row.fec_emitida_orden}</td>
                          <td>{row.fec_entrega_orden}</td>
                          <td>{row.marca}</td>
                          <td>{row.producto}</td>
                          <td>{row.modelos}</td>
                          <td className={`font-black ${row.total_corte > 0 ? 'text-blue-500' : 'text-green-500'}  text-center`}>{row.total_corte > 0 ? row.total_corte : row.total_orden}</td>
                          <td className="font-black text-center">{row.dias_produccion}</td>
                          <td className={`text-center font-black ${row.dias_pendientes < 0 ? 'text-red-500' : 'text-black'}`}>{row.dias_pendientes}</td>
                          <td>  
                            <div className={`text-black text-center text-[10px] flex flex-row border-[.2px] border-gray-500 rounded-lg overflow-hidden transition-all stages`}>
                              {
                                row.ruta_test.map(item=><div className={`px-2 flex flex-row flex-1 items-center justify-center pointer-events-none ${item.estado ? (item.pendiente ? (item.cadudo ? 'bg-red-500' : 'bg-amber-500') : item.color) + ' text-white' : 'bg-gray-200 text-gray-500'} text-nowrap`}>
                                  {item.fase}
                                </div>)
                              }
                            </div>
                          </td>
                          <td className="">
                            <ul className="flex flex-row justify-end">
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}} data-id={row.idx}>
                                  <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cancel"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M18.364 5.636l-12.728 12.728" /></svg>
                                </div>
                              </li>
                              {
                                ![429].includes(JSON.parse(credentials)) && <li>
                                  <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                  </div>
                                </li>
                              }
                              {
                                ![429].includes(JSON.parse(credentials)) && <li>
                                  <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-id={row.idx}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                  </div>
                                </li>
                              }
                            </ul>
                          </td>
                        </tr>
                      ))
                      :
                      <tr className="h-[40px]"><td colSpan={13} className="text-center"><span>Datos no encontrados</span></td></tr>
                  }
                </tbody>
                <tfoot className="sticky w-full bottom-0 bg-gray-100 ">
                  <tr>
                    <td className="h-[45px] border-t border-t-gray-600 z-50" colSpan={12}>
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          Showing 1 to 4 of 4 entries (filtered from 57 total entries)
                        </div>
                        <div className="flex flex-row justify-end items-center gap-2">
                          <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                          </div>
                          <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              :
              <div className={`grid ${vista == '1' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-2`}>
                {
              ordenes.length > 0
                ? ordenes.map((row, key) => (
                  <div className={`${row.running_state == 'OFF' && 'bg-gray-300'} ${row.running_state == 'PAUSE' && 'bg-amber-300'} ${row.running_state == 'STOP' && 'bg-red-400'} ${row.running_state == 'PLAY' && 'bg-green-200'} rounded-t-xl rounded-bl-xl rounded-br-xl p-3 relative cursor-pointer hover:opacity-80 mb-[34px] mt-2 hover:bg-gray-500 z-0 pt-[15px]`} data-action="show" onClick={onclick} data-id={row.idx} onContextMenu={onrightclick}>

                    {/* <div>Condiciones de desarrollo</div> */}
                    {/* <div className="absolute top-[7px] h-[1px] ml-2 mr-2 bg-orange-300 rounded-full left-0 right-0 flex flex-row items-center gap-2"></div> */}
                    <div className="absolute top-[7px] h-[1px] ml-3 mr-3 rounded-full left-0 right-0 flex flex-row items-center gap-2 border-dashed border-purple-500 border-t-[1px]"></div>
                    {/* <div className="h-[1px] ml-1 mr-1 rounded-full left-0 right-0 flex flex-row items-center gap-2 pb-3"></div> */}

                    <div className="flex flex-row items-center gap-2">
                      <div className={`bg-white ${row.running_state == 'OFF' && 'text-gray-500'} ${row.running_state == 'PAUSE' && 'text-amber-500'} ${row.running_state == 'STOP' && 'text-red-500'} ${row.running_state == 'PLAY' && 'text-green-500'}  rounded-full h-[40px] w-[40px] flex flex-row justify-center items-center`}>
                        {
                          row.running_state == 'OFF' && <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        }
                        {
                          row.running_state == 'PAUSE' && <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>
                        }
                        {
                          row.running_state == 'STOP' && <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-player-stop"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z" /></svg>
                        }
                        {
                          row.running_state == 'PLAY' && <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>
                        }
                      </div>
                      <div className="flex-1 flex flex-col justify-center items-left">
                        <div className="text-[8px]">ARTICULO</div>
                        <div className="text-black text-[14px] font-bold">{row.tipo_produccion !== 'IMPT' ? (row.marca + ' ' +row.rubro + ' ' + row.presentacion + ' ' +row.modelos) : (row.marca + ' ' + row.producto + ' ' + row.modelos)}</div>
                      </div>
                      <div className="text-black text-[20px] flex flex-row gap-4">
                        <div className="flex flex-col justify-center items-center">
                          <div className="text-[8px]">SUGERIDO</div>
                          <div className="italic font-extrabold">{row.total_orden}</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="text-[8px]">LIQUIDACION</div>
                          <div className={`italic font-extrabold ${row.total_corte > 0 ? 'text-blue-500' : 'text-black'}  text-center`}>{row.total_corte}</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="text-[8px]">DIAS PROD.</div>
                          <div className="italic font-extrabold">{row.dias_produccion}</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="text-[8px]">DIAS FALT.</div>
                          <div className={`text-center italic font-extrabold ${row.dias_pendientes < 0 ? 'text-red-500' : 'text-black'}`}>{row.dias_pendientes}</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="text-[8px]">#ORDEN</div>
                          <div className="italic font-extrabold">{row.oc}</div>
                        </div>
                        <div className="flex flex-row items-center">
                          <ul className="flex flex-row justify-end">
                            <li>
                              <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={row.idx}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                              </div>
                            </li>
                            {
                              ![429].includes(JSON.parse(credentials)) && <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx}>
                                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-printer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4" /></svg>
                                </div>
                              </li>
                            }
                            {
                              ![429].includes(JSON.parse(credentials)) && <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                </div>
                              </li>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="hidden">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-id={33} data-action="download" onClick={onclick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-id={33} data-action="show" onClick={onclick} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" onClick={() => { }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-500 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute bottom-[-26px] h-[25px] bg-gray-300 ml-4 mr-4 rounded-b-xl p-2 left-0 right-0 flex flex-row items-center gap-2">
                      <div className={`text-black text-center text-[10px] h-[12px] flex flex-row border-[.2px] border-gray-500 rounded-lg overflow-hidden transition-all stages flex-1`}>
                        {
                         row.ruta_test.map(item=><div className={`px-2 flex flex-row flex-1 items-center justify-center pointer-events-none ${item.estado ? (item.pendiente ? (item.cadudo ? 'bg-red-500' : 'bg-amber-500') : item.color) + ' text-white' : 'bg-gray-200 text-gray-500'} text-nowrap border-r border-r-gray-400`}>
                           {item.fase}
                         </div>)
                        }
                      </div>
                      <div className="w-[10px] h-[10px] rounded-full bg-amber-400 border border-gray-500"></div>
                      <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border border-gray-500"></div>
                      <div className="w-[10px] h-[10px] rounded-full bg-gray-300 border border-gray-500"></div>
                    </div>
                  </div>
                ))
                : 
                openloader && ordenes.length == 0 && <SkeletonScreen/>
                // <SkeletonScreen/>
                }
              </div>
              }
            </div>
            <div className="flex flex-row justify-end mt-2 gap-2">
	            <Button action={exportarexcel} tipo={'success'}>Acciones</Button>
              <Button action={recargarinfo} tipo={'default'}>Actualizar</Button>
              <Button action={() => navigate('/main/ordenes/nuevo')} tipo={'accept'}>Nuevo</Button>
            </div >
          </div>
        </div>
      {/* </div> */}
    </>
  )
}
