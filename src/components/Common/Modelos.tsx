import { useContext, useEffect, useState } from "react"
import { Search } from "../Atoms/Search/Search"
import { Consulta } from "../../utils/utils"
import { AuthPermitions } from "../../contexts/contexts"

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
  'TRANSITO':'bg-teal-500',
}

export default function Modelos(children){
  const { logout} = useContext(AuthPermitions)
  let {actions = ()=>{}} = children
  let [lista,setLista] = useState([])
  useEffect(()=>{
    const buscarproveedor = async ()=>{
      await Consulta({url: 'ordenes/getordenes/' + 'EN PROCESO'})
      .then(resp => {
        console.log("La info de modelo es:",resp)
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
  
  const searchordenes = (input)=>{
    // console.log("EL valor consultado es:",input.value)
    // console.log("La ruta de consulta es :",'produccion/searchordenes/'+input.value)  
    const buscarproveedor = async ()=>{
      // await Consulta({url: 'ordenes/getordenes/'+ input.value})
      await Consulta({url: 'ordenes/getordenes/'+ input.value + ' EN PROCESO'})
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
    let action = e.target.dataset.action ?? e.currentTarget.dataset.action
    let position = e.target.dataset.position ?? e.currentTarget.dataset.position
    switch(action){
      case 'add':
        actions(lista[position])
        break;
      default:
        break;
    }
  }
  return(
    <>
      <div className="flex flex-col mb-2">
        <div className="w-full mb-2">
          <Search config={{ width: '100%' }} action={searchordenes} />
        </div>
        <div className="h-[550px] w-[1100px] scrollbar-special rounded-md overflow-y-scroll ">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">OC</th>
                <th className="lg:table-cell">IdCorte</th>
                <th className="lg:table-cell">NroCorte</th>
                <th className="lg:table-cell">Cliente</th>
                <th className="lg:table-cell">Marca</th>
                <th className="lg:table-cell">Producto</th>
                <th className="lg:table-cell">Modelo</th>
                {/* <th className="lg:table-cell">Total</th> */}
                <th className="lg:table-cell">FaseActual</th>
                {/* <th className="lg:table-cell text-center">Accciones</th> */}
              </tr>
            </thead>
            <tbody>
              {lista.length > 0 && lista.map((row,key)=>(
                <tr key={key} data-position={key} data-action="add" onClick={onclick}>
                  <td className="h-[50px]">{row.oc}</td>
                  <td>{row.id_corte}</td>
                  <td>{row.numero_corte}</td>
                  <td><strong>{row.cliente.substr(0,30)}</strong></td>
                  <td>{row.marca}</td>
                  <td>{row.producto}</td>
                  <td>{row.modelos}</td>
                  <td><div className={`min-w-[40px] text-white text-center text-[8px] rounded-l-full text-nowrap px-2 rounded-r-full ${colorfase[row.status_servicio ? row.status_servicio : row.status] ?? 'bg-gray-400'}`}>{row.status_servicio ? row.status_servicio : row.status}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}