import { useEffect, useRef, useState } from "react"
import { Search } from "../Atoms/Search/Search"
import { Consulta } from "../../utils/utils"
import { Button } from "../Atoms/Button/Button"

const colorfase = {
  'CONFECCION':'bg-purple-500',
  'ESTAMPADO':'bg-gray-500',
  'ACABADOS':'bg-red-500',
  'LAVANDERIA':'bg-green-500',
  'MOLDES':'bg-orange-500',
  'OJAL':'bg-blue-500',
  'CORTE':'bg-rose-400',
  'BORDADO':'bg-yellow-500',
}
export default function Guias(children){
  const [selected,setSelected] = useState([])
  let {actions = ()=>{},tipo='SERVICIOS'} = children
  let [lista,setLista] = useState([])
  let [loading,setLoading] = useState(false)
  useEffect(()=>{
    const buscarguia = async ()=>{
      setLoading(true)
      await Consulta({url: `${tipo == 'SERVICIOS' ? 'produccion/getListaGuias' : 'produccion/getListaMuestras'}`})
      .then(resp => {
        setLista(resp)
        // setOpenloader(false)
        // navigate('/main/guias/inicio')
        // toast.success('Estampado guardado con éxito!!', { theme: "colored" })
      })
      .catch((err)=>{
        // setOpenloader(false)
        // toast.error('Se produjo un error!!', { theme: "colored" })
      })
      .finally(()=>{
        // setOpenloader(false)
        setLoading(false)
      })
    }
    buscarguia()
  },[])
  
  const searchproveedor = (input)=>{
    const buscarguia = async ()=>{
      let url = input.value == '' ? 'produccion/getListaGuias/PENDIENTE' : 'produccion/searchguia/'+input.value+' PENDIENTE'
      // await Consulta({url: 'produccion/searchguia/'+ (input.value == '' ? '_' : input.value )})
      setLoading(true)
      await Consulta({url})
      .then(resp => {
        console.log("Resultado seatch guia:",resp)
        setLoading(false)
      if(tipo == 'SERVICIOS'){
        setLista(resp.filter(row=>row.tipo == tipo))
      }else{
        setLista(resp.filter(row=>row.tipo !== 'SERVICIOS'))
      }
        // setOpenloader(false)
        // navigate('/main/guias/inicio')
        // toast.success('Estampado guardado con éxito!!', { theme: "colored" })
      })
      .catch((err)=>{
        // setOpenloader(false)
        // toast.error('Se produjo un error!!', { theme: "colored" })
      })
      .finally(()=>{
        // setOpenloader(false)
        setLoading(false)
      })
    }
    buscarguia()
  }
  const onclick = (e)=>{
    // let action = e.target.dataset.action
    let action = e.target.dataset.action ?? e.currentTarget.dataset.action
    let position = e.target.dataset.position ?? e.currentTarget.dataset.position
    console.log("La accion es la siguiente:",action,selected,selected.filter(row=>row==position))

    if(tipo == 'SERVICIOS'){
      selected.filter(row=>row==position).length > 0 ? setSelected(items=>items.filter(row=>row!==parseInt(position))) : setSelected(items=>[...items,parseInt(position)])
    }else{
      switch(action){
        case 'add':
          console.log("Agregando al proveedor",lista[position])
          actions(lista[position])
          break;
        default:
          break;
      }
    }
  }
  return(
    <>
      <div className="flex flex-col">
        <div className="w-full mb-2">
          <Search config={{ width: '100%' }} action={searchproveedor} />
        </div>
        <div className="h-[600px] w-[1150px] scrollbar-special rounded-md overflow-y-scroll relative">
          <table className={`w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-red-300`}>
            <thead className="text-left sticky top-0 bg-white">
              <tr>
              {
                tipo == 'SERVICIOS'
                ? 
                  <>
                    <th className="lg:table-cell">OC/OP</th>  
                    <th className="lg:table-cell">NroGuia</th>  
                    <th className="lg:table-cell">Servicio</th>
                    <th className="lg:table-cell">Proveedor</th>
                    <th className="lg:table-cell">Producto</th>
                    <th className="lg:table-cell">Marca</th>
                    <th className="lg:table-cell">Modelo</th>
                    <th className="lg:table-cell">Cantidad</th>
                    {/* <th className="lg:table-cell">Estado</th> */}
                  </>
                :
                  <>
                    {/* <th className="lg:table-cell">OC/OP</th> */}
                    <th className="lg:table-cell">NroGuia</th>
                    {/* <th className="lg:table-cell">Servicio</th> */}
                    <th className="lg:table-cell">Proveedor</th>
                    <th className="lg:table-cell">Producto</th>
                    <th className="lg:table-cell">Marca</th>
                    <th className="lg:table-cell">Modelo</th>
                    {/* <th className="lg:table-cell">Estado</th> */}
                  </>
              }
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.length > 0 && lista.map((row,key)=>(
                <tr onClick={onclick} data-position={key} data-action="add" className={`${selected.find(item=>item==key) ? 'selected' : ''}`}>
                  {
                    tipo == 'SERVICIOS'
                    ?
                      <>
                        <td>{row.orden_ref}</td>
                        <td>{`${row.idx}`.padStart(8,'0')}</td>
                        {/* <td>{row.servicio}</td> */}
                        <td><div className={`w-[80px] bg- text-white text-center text-[8px] rounded-l-full rounded-r-full ${colorfase[row.servicio]}`}>{row.servicio}</div></td>
                        <td>{row.proveedor ? (row.proveedor.length >= 45 ? row.proveedor.substr(0,45) + '...' : row.proveedor) : ''}</td>
                        <td>{row.producto}</td>
                        <td>{row.marca}</td>
                        <td>{row.modelo}</td>
                        <td>{row.cantidad_servicio}</td>
                      </>
                    :
                      <>
                        {/* <td>{row.orden_ref}</td> */}
                        <td>{`${row.idx}`.padStart(8,'0')}</td>
                        {/* <td>{row.servicio}</td> */}
                        {/* <td><div className={`w-[80px] bg- text-white text-center text-[8px] rounded-l-full rounded-r-full ${colorfase[row.servicio]}`}>{row.servicio}</div></td> */}
                        <td>{row.proveedor ? (row.proveedor.length >= 45 ? row.proveedor.substr(0,45) + '...' : row.proveedor) : ''}</td>
                        <td>{row.producto}</td>
                        <td>{row.marca}</td>
                        <td>{row.modelo}</td>
                      </>
                  }
                  
                  {/* <td>
                    {
                      row.estado == 'PENDIENTE'
                      ?
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="text-red-500 icon icon-tabler icons-tabler-outline icon-tabler-progress-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /><path d="M9 12l2 2l4 -4" /></svg>
                      :
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="text-green-700 icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>
                    }
                  </td> */}
                  <td className="w-[250px]">
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="add" onClick={onclick}>
                          <svg  xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <tfoot className="sticky bottom-0">
              <tr>
                <td colSpan={9} >
                  <div className="flex flex-row justify-center">
                    <div onClick={nuevoregistro} className="bg-green-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot> */}
          </table>
          {
            loading && <div className="absolute top-0 w-[100%] h-[100%] bg-white/50 flex flex-row justify-center items-center">Cargando...</div>
          }
        </div>
        <div className="flex flex-row justify-end gap-2 mt-2">
          <Button type="button" tipo="default" action={()=>{}}>Cancelar</Button>
          <Button type="button" tipo="default" action={()=>{}}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}
