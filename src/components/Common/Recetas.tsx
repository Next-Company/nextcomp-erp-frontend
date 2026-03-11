import { useContext, useEffect, useRef, useState } from "react"
import { Search } from "../Atoms/Search/Search"
import { Consulta } from "../../utils/utils"
import { Button } from "../Atoms/Button/Button"
import { AuthPermitions } from "../../contexts/contexts"

export default function Recetas(children){
  const { logout} = useContext(AuthPermitions)
  const {actions = ()=>{}, closemodal} = children
  const [lista,setLista] = useState([])
  const [selected,setSelected] = useState([])
  useEffect(()=>{
    const buscarproveedor = async ()=>{
      await Consulta({url: 'productos/recetaslist'})
      .then(resp => {
        console.log("La respuesta de la consulta de es de a cco:",resp)
        setLista(resp.map((row)=>({...row,selected:false})))
        // setLista(resp[0])
        // setOpenloader(false)
        // navigate('/main/guias/inicio')
        // toast.success('Estampado guardado con éxito!!', { theme: "colored" })
      })
      .catch((err)=>{
        // console.log("Mensaje de error es :",err)
        if(JSON.parse(err).statuscode == 401){
          logout()
        }
        // setOpenloader(false)
        // toast.error('Se produjo un error!!', { theme: "colored" })
      })
      .finally(()=>{
        // setOpenloader(false)
      })
    }
    buscarproveedor()
  },[])
  
  const searchproveedor = (input)=>{
    console.log("Dentro de search proveedor")
    const buscarproveedor = async ()=>{
      // await Consulta({url: 'productos/searchproducto/'+ (input.value == '' ? '_' : input.value )})
      await Consulta({url: 'productos/recetaslist/'+ input.value})
      .then(resp => {
        setLista(resp.map((row)=>({...row,selected:false})))
        // setLista(resp)
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
      })
    }
    buscarproveedor()
  }
  const onclick = (e)=>{
    const position = e.target.dataset.position ?? e.currentTarget.dataset.position
    const action = e.target.dataset.action ?? e.currentTarget.dataset.action
    // console.log("La informacion es:",lista,lista[position])
    switch(action){
      case 'add':
        const item = lista[position]
        setSelected([lista[position]])
        break;
      default:
        break;
    }
  }
  const addproductos = ()=>{
    actions(selected)
  }
  const cerrarmodal = ()=>{
    closemodal()
  }
  return(
    <>
      <div className="flex flex-col mb-2">
        <div className="w-full mb-2">
          <Search config={{ width: '100%' }} action={searchproveedor} />
        </div>
        <div className="h-[600px] w-[1100px] scrollbar-special rounded-md overflow-y-scroll ">
          <table className={`w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-rose-300`}>
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>  
                <th className="lg:table-cell">Codigo</th>
                <th className="lg:table-cell">Producto</th>
                <th className="lg:table-cell">Estilo</th>
                <th className="lg:table-cell">Presentacion</th>
                <th className="lg:table-cell">Marca</th>
                <th className="lg:table-cell">Modelo</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.length > 0 && lista.map((row,key)=>(
                <tr className={`${selected.find((item)=>item.id_producto_CAB == row.id_producto_CAB) ? 'selected' : ''}`} key={key} data-position={key} data-action="add" onClick={onclick}>
                  <td>{row.id_producto_CAB}</td>
                  <td>{row.cod_producto}</td>
                  <td>{row.producto}</td>
                  <td>{row.estilo}</td>
                  <td>{row.presentacion}</td>
                  <td>{row.marca}</td>
                  <td>{row.modelo}</td>
                  <td className="w-[150px]">
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
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="add" onClick={onclick}>
                          <svg  xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-end mt-2 gap-2">
          <Button type="button" tipo="default" action={cerrarmodal}>Cancelar</Button>
          <Button type="button" tipo="default" action={addproductos}>Agregar</Button>
        </div>
      </div>
    </>
  )
}