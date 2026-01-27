import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "../../../components/Atoms/Button/Button"
import { Search } from "../../../components/Atoms/Search/Search"
import { Consulta } from "../../../utils/utils"
import { AuthPermitions } from "../../../contexts/contexts"

export default function ColoresBase(children){
  const { logout} = useContext(AuthPermitions)
  let {actions = ()=>{}, closemodal} = children
  let [lista,setLista] = useState([])
  let [selected,setSelected] = useState([])
  let [colores,setColores] = useState([])
  // let [selected,setSelected] = useState([])
  useEffect(()=>{
    const buscarproveedor = async ()=>{
      await Consulta({url: 'mantenimiento/getlistacolores'})
      .then(resp => {
        console.log("Obtenienendo la lista de colores:",resp)
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
    const buscarproveedor = async ()=>{
      // await Consulta({url: 'productos/searchproducto/'+ (input.value == '' ? '_' : input.value )})
      let busqueda = input.value.replace('/',"%2F")
      await Consulta({url: 'mantenimiento/getlistacolores/'+ busqueda})
      .then(resp => {
        setLista(resp.map((row)=>({...row,selected:false})))
      })
      .catch((err)=>{
      })
      .finally(()=>{
        // setOpenloader(false)
      })
    }
    buscarproveedor()
  }
  const onclick = (e)=>{
    let position = e.target.dataset.position ?? e.currentTarget.dataset.position
    let action = e.target.dataset.action ?? e.currentTarget.dataset.action
    switch(action){
      case 'add':
        // const item = lista[position]
        // if(selected.find((row)=>parseInt(row.idx) == parseInt(item.idx))){
        //   setSelected([...selected.filter(row=>parseInt(row.idx) !== parseInt(item.idx))])
        // }else{
        //   setSelected([...selected,lista[position]])
        // }
        // console.log("Agregar color:",lista[position])
        // setColores([...colores,lista[position]])

        actions(selected)
        closemodal()
        break;
      default:
        break;
    }
  }
  const addproductos = ()=>{
    closemodal()
    actions(selected)
  }
  const cerrarmodal = ()=>{
    closemodal()
  }
  const eliminarcolor = (e)=>{
    console.log("Eliminar color")
    const position = e.target.dataset.position ?? e.currentTarget.dataset.position
    const action = e.target.dataset.action ?? e.currentTarget.dataset.action
    switch(action){
      case 'delete':
        setColores(colores.filter((row,key)=>key != position))
        break;
      default:
        break;
    }
  }
  return(
    <>
      <div className="flex flex-col w-[950px]">
        <div className="flex flex-row w-full h-[550px]">
          <div className="flex flex-col mb-2 w-full">
            <div className="w-full mb-2">
              <Search config={{ width: '100%' }} action={searchproveedor} />
            </div>
            <div className="flex-1 w-full scrollbar-special rounded-md overflow-y-scroll ">
              <table className={`w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-rose-300`}>
                <thead className="text-left sticky top-0 bg-white">
                  <tr>
                    <th className="lg:table-cell">Id</th>  
                    <th className="lg:table-cell">Codigo</th>
                    <th className="lg:table-cell">Color</th>
                    <th className="lg:table-cell">Pantone</th>
                    <th className="lg:table-cell">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.length > 0 && lista.map((row,key)=>(
                    <tr className={`${selected.find((item)=>item.idx == row.idx) ? 'selected' : ''}`} key={key} data-position={key} data-action="add" onClick={onclick}>
                      <td>{row.idx}</td>
                      <td>{row.codigo}</td>
                      <td>{row.nom}</td>
                      <td>{row.code_pantone}</td>
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
          </div>
          {/* <div className="p-2 ml-2 w-[350px] h-full border scrollbar-special border-gray-200 rounded-xl pt-4 overflow-y-scroll">
            <span><strong>LISTA DE COLORES</strong></span>
            <div className="  gap-2 flex flex-col h-full mt-2">

              {colores.length > 0 && colores.map((row,key)=>(
                <div key={key} className="bg-white flex justify-between items-center cursor-pointer border-b hover:bg-gray-100 p-2 text-[12px]">
                  <span className="font-[500]">{row.nom}</span>
                  <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="delete" onClick={eliminarcolor}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                  </div>
                </div>
              ))}

            </div>
          </div> */}
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
        </div>
        <hr/> 
        <div className="w-full overflow-hidden mt-1">
          <div className=" rounded-2xl p-2 gap-2 flex flex-row text-[10px] overflow-x-auto scrollbar-special">
            {
              colores.length > 0 && colores.map((row,key)=>(
                <div key={key} className="p-2 rounded-2xl border bg-orange-200 flex gap-2">
                  <div className="w-[12px] h-[12px] rounded-full bg-gray-400 hover:bg-gray-400 justify-center items-center flex cursor-pointer" data-position={key} data-action="delete" data-id={row.id} onClick={eliminarcolor}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                  </div>
                  <span>{row.nom}</span>
                </div>
              ))
            }
          </div>
        </div> */}
        <div className="w-full flex flex-row justify-end mt-2 gap-2">
          <Button type="button" tipo="default" action={cerrarmodal}>Cancelar</Button>
          <Button type="button" tipo="default" action={addproductos}>Agregar</Button>
        </div>
      </div>
    </>
  )
}