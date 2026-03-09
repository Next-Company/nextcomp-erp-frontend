import { useEffect, useState } from "react"
import { Input } from "../../../components/Atoms/Input/Input"
import Table from "../../../components/Atoms/Table/Table"
import LocalProveedor from "./LocaProveedor"

export default function SeccionDatosAdicionales({info,form,setorden,openModal,setOpen,locales,setLocales}){
  const [loading,setLoading] = useState(false)
  const [contador,setContador] = useState(0)
  useEffect(()=>{
  },[])
  const newlocal = ()=>{
    const PARAMS_MODAL = {
      open: true,
      header: false,
      controls: false,
      content: <LocalProveedor action={(datos)=>{
        console.log("Los datos recibidos del local son:",datos)
        setLocales([...locales,{nombre_local: datos[0][1], tipo_local: datos[1][1], direccion: datos[2][1], referencia: datos[3][1], latitud: datos[4][1], longitud: datos[5][1]}])
        setOpen(false)
      }} />,
      action: async () => {

      }
    }
    openModal(PARAMS_MODAL)
  }
  const onclick = (e) => {
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch (action) {
      case 'delete':
        
        break;
      case 'edit':{
        const PARAMS_MODAL = {
          open: true,
          header: false,
          controls: false,
          content: <LocalProveedor info={locales[position]} action={(datos)=>{
            console.log("Los datos recibidos del local son:",datos)
            setLocales(locales.map((loc, key) => key == position ? {...loc, nombre_local: datos[0][1], tipo_local: datos[1][1], direccion: datos[2][1], referencia: datos[3][1], latitud: datos[4][1], longitud: datos[5][1]} : loc))
            setOpen(false)
          }} />,
          action: async () => {}
        }
        openModal(PARAMS_MODAL)
        break;

      }
      default:
        break;
    }
  }
  return <>
    <div className={`flex flex-col gap-3 pt-3`}>
      <div className="flex flex-col gap-3">
        <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />        
      </div>
      <Table 
        actions={[
          {
            name:'add',
            trigger:newlocal,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
          },
          {
            name:'clear',
            trigger:()=>setContador(0),
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
          }
        ]}
        headcontent={
          <tr>
            <th className="lg:table-cell min-w-[300px]">NombreLocal</th>  
            <th className="lg:table-cell min-w-[200px]">Tipo</th>
            <th className="lg:table-cell min-w-[100px]">Direccion</th>
            <th className="lg:table-cell text-center">Referencia</th>
            <th className="lg:table-cell text-center">Latitud</th>
            <th className="lg:table-cell text-center">Longitud</th>
            <th className="lg:table-cell">Acciones</th>
          </tr>
        }
        bodycontent={
          info.length > 0 && info.map((local,key)=>
            <tr key={key}>
              <td className="text-center whitespace-nowrap">{local.nombre_local}</td>
              <td className="text-center whitespace-nowrap">{local.tipo_local}</td>
              <td className="text-center">{local.direccion}</td>
              <td className="text-center">{local.referencia}</td>
              <td className="text-center">{local.latitud}</td>
              <td className="text-center">{local.longitud}</td>
              <td className="text-center ">
                <ul className="flex flex-row justify-end">
                  <li>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </div>
                  </li>
                  <li>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={() => {}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                    </div>
                  </li>
                  <li>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-position={key}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
          )
        }
      />
    </div>
  </>
}