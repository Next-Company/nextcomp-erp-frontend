import { useContext, useEffect, useRef, useState } from "react"
import { Search } from "../Atoms/Search/Search"
import { Consulta } from "../../utils/utils"
import { AuthPermitions } from "../../contexts/contexts"
import { colortipodoc } from "../../utils/utils";

export default function Facturas(children){
  const { logout} = useContext(AuthPermitions)
  let {actions = ()=>{},idproveedor} = children
  let [lista,setLista] = useState([])
  useEffect(()=>{
    const buscarproveedor = async ()=>{
      await Consulta({url: 'letras/getfacturasbyproveedor/' + idproveedor})
      .then(resp => {
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
    const buscarproveedor = async ()=>{
      await Consulta({url: 'produccion/searchproveedor/'+ (input.value == '' ? '_' : input.value )})
      .then(resp => {
        setLista(resp)
      })
      .catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
      })
    }
    buscarproveedor()
  }
  const onclick = (e)=>{
    let action = e.target.dataset.action
    switch(action){
      case 'add':
        // actions(lista[e.target.dataset.position])
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
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr]:h-[49px]">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>
                <th className="lg:table-cell">NroPedido</th>
                <th className="lg:table-cell">TipoDoc</th>
                <th className="lg:table-cell">Moneda</th>
                <th className="lg:table-cell">Serie</th>
                <th className="lg:table-cell">Numero</th>
                <th className="lg:table-cell">FecEmision</th>
                <th className="lg:table-cell">ImporteBruto</th>
                <th className="lg:table-cell">BaseImponible</th>
                <th className="lg:table-cell">MontoInafecto</th>
                <th className="lg:table-cell">Igv</th>
                <th className="lg:table-cell">ImporteTotal</th>
              </tr>
            </thead>
            <tbody>
              {lista.length > 0 && lista.map((row,key)=>(
                <tr key={key}>
                  <td className="text-center">{row.idx}</td>
                  <td className="text-center">{row.orden_ref}</td>
                  <td><div className={`text-white text-center text-[8px] rounded-l-full rounded-r-full ${colortipodoc[['FACTURA','NOTA CREDITO','NOTA DEBITO'][parseInt(row.tipodoc) - 1]]}`}>{['FACTURA','NOTA CREDIDO','NOTA DEBITO'][parseInt(row.tipodoc) - 1]}</div></td>
                  <td className="text-center">{row.moneda}</td>
                  <td className="text-center">{row.serie}</td>
                  <td className="text-center">{row.numero}</td>
                  <td className="text-center">{row.fec_emision}</td>
                  <td className="text-center">{row.importe_bruto}</td>
                  <td className="text-center">{row.base_imponible}</td>
                  <td className="text-center">{row.monto_inafecto}</td>
                  <td className="text-center">{row.igv}</td>
                  <td className="text-center">{row.tipodoc == '2' ? row.importe_total*-1 : row.importe_total}</td>
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