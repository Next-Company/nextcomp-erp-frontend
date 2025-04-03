import { useContext, useEffect, useRef, useState } from "react"
import { Search } from "../Atoms/Search/Search"
import { Consulta } from "../../utils/utils"
import { useNavigate } from "react-router-dom"
import { AuthPermitions } from "../../contexts/contexts"

export default function Cuentas(children){
  const { logout} = useContext(AuthPermitions)
  let {actions = ()=>{}} = children
  let [lista,setLista] = useState([])
  useEffect(()=>{
    const buscarproveedor = async ()=>{
      await Consulta({url: 'abonos/listacuentasbancos'})
      .then(resp => {
        console.log(resp)
        setLista(resp)
        // setOpenloader(false)
        // navigate('/main/guias/inicio')
        // toast.success('Estampado guardado con éxito!!', { theme: "colored" })
      })
      .catch((err)=>{
        // console.log("Mensaje de error es :",JSON.parse(err).statuscode == 401)
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
    // console.log("EL valor consultado es:",input.value)
    // console.log("La ruta de consulta es :",'produccion/searchproveedor/'+input.value)  
    const buscarproveedor = async ()=>{
      // await Consulta({url: 'abonos/listacuentasbancos/'+ (input.value == '' ? '_' : input.value )})
      await Consulta({url: 'abonos/listacuentasbancos' + (input.value !== '' ? `/${input.value}` : '' )})
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
      })
    }
    buscarproveedor()
  }
  const onclick = (e)=>{
    let action = e.target.dataset.action
    // console.log("La accion es la siguiente:",action)
    switch(action){
      case 'add':
        // console.log("Agregando al proveedor",lista[e.target.dataset.position])
        actions(lista[e.target.dataset.position])
        break;
      default:
        break;
    }
  }
  return(
    <>
      <div className="flex flex-col mb-2">
        <div className="w-full mb-2">
          <Search config={{ width: '100%' }} action={searchproveedor} />
        </div>
        <div className="h-[500px] w-[1000px] scrollbar-special rounded-md overflow-y-scroll ">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>
                <th className="lg:table-cell">Cuenta</th>
                <th className="lg:table-cell">Tipo</th>
                <th className="lg:table-cell">Moneda</th>
                <th className="lg:table-cell">NroCuenta</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.length > 0 && lista.map((row,key)=>(
                <tr key={key}>
                  <td>{row.idx}</td>
                  <td>{row.nom}</td>
                  <td>{row.tipo}</td>
                  <td>{row.moneda == 'MN' ? 'Soles' : 'Dolares'}</td>
                  <td>{row.nro_cuenta}</td>
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
        </div>
      </div>
    </>
  )
}