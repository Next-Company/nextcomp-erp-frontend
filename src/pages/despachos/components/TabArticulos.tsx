import { useContext } from "react"
import DespachosContext from "../context/DespachosContexto"
import VentanaIngresos from "./VentanaIngresos"
import { VentanaRollos } from "./VentanaRollos"

export default function TabArticulos(){
  const {tipo,registros,urlparams,setRegistros,colorfase,setOpen,openModal,tallasbase} = useContext(DespachosContext)
  console.log("Nuevo reendierizado aidicional",tallasbase,registros,tallasbase)
  const editvalue = (e) => {
    const column = e.target.dataset.name
    console.log("El campo afectado es el siguiente :", column, "SDSDF : ", e.target.checked)
    const position = e.target.dataset.position
    // let articulo = registros[parseInt(e.target.dataset.position)]
    console.log("Los nuevos registros son:", [...registros.map((item, key) => position == key ? { ...item, [column]: (column == 'isprototipo' ? e.target.checked : e.target.value) } : item)])
    setRegistros([...registros.map((item, key) => position == key ? { ...item, [column]: (column == 'isprototipo' ? e.target.checked : e.target.value) } : item)])
  }
  const onclick = (e)=> {
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch (action) {
      case 'edit':
        if(tipo == 2) {
          console.log("Los registros enviados a la modal son lo siguientes:", registros[position])
          openModal({
            open: true,
            header: false,
            controls: false,
            content: <VentanaIngresos registros={[registros[position]]} setregistros={setRegistros} setopen={setOpen} tallasbase={tallasbase}/>,
            action: async () => {}
          })
        } else {
          let params_modal = null
          params_modal = {
            open:true,
            content: <VentanaRollos 
              actions={(info)=>{  
                console.log("La informacion de la lista es:",position,info,registros)
                // setRegistros(row=>[...row.map((v,p)=>p==position ? {...v,info_rollos:info,rollo:60,peso:info.reduce((c,v)=>c+v,0)} : v)])
                setRegistros([...registros.map((v,p)=> p == parseInt(position) ? {...v,info_rollos:info,rollos:info.length,peso:info.reduce((c,v)=>c+parseFloat(v.peso),0),despacho:info.reduce((c,v)=>c+parseFloat(v.cantidad),0).toFixed(2)} : v)])
                setOpen(false)
              }}
              // info={registros[position]?.info_rollos ?? []}
              info={registros[position]?.info_rollos ?? []}
            />,
            controls: false,
            header: false,
            action:()=>{
            }
          }
          openModal(params_modal)
        }
        break;
      default:
    }
  }
  return(
    <div className="flex-1 h-[100%] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2">
      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
        <thead className="text-left sticky top-0 bg-white">
          <tr>
            {
              tipo !== 1
                ?
                <>
                  <th className="lg:table-cell">Id</th>
                  <th className="lg:table-cell">Servicio</th>
                  <th className="lg:table-cell">Descripción</th>
                  <th className="lg:table-cell">Modelo</th>
                  {
                    tallasbase.map(talla=>
                      <th className="lg:table-cell">{talla.toUpperCase()}</th>
                    )
                  }
                  {/* <th className="lg:table-cell">XS / 26</th>
                  <th className="lg:table-cell">S / 28</th>
                  <th className="lg:table-cell">M / 30</th>
                  <th className="lg:table-cell">L / 32</th>
                  <th className="lg:table-cell">XL / 34</th>
                  <th className="lg:table-cell">XXL / 36</th> */}

                  <th className="lg:table-cell">Cantidad</th>
                  {
                    registros.length > 0 && registros[0].despachos.map((row) => <th className="lg:table-cell"><span className="font-extrabold">{row.fec_despacho}</span></th>)
                  }
                  <th className="lg:table-cell">Saldo</th>
                  <th className="lg:table-cell">Ingreso</th>
                  <th className="lg:table-cell">Caidos</th>
                  <th className="lg:table-cell">Incompletos</th>
                  <th className="lg:table-cell">Acciones</th>
                </>
                :
                <>
                  <th className="lg:table-cell w-[350px]">Descripción</th>
                  <th className="lg:table-cell w-[100px]">Color</th>
                  <th className="lg:table-cell">Rollos</th>
                  <th className="lg:table-cell">Cantidad</th>
                  <th className="lg:table-cell">Unidad</th>
                  <th className="lg:table-cell">Conversion</th>
                  <th className="lg:table-cell">Precio</th>
                  {/* <th className="lg:table-cell">Entregado</th> */}
                  {
                    registros.length > 0 && !urlparams.id && registros[0].despachos.map((row) => <th className="lg:table-cell w-[80px]"><span className="font-extrabold">{row.fec_despacho}</span></th>)
                  }
                  <th className="lg:table-cell w-[100px]">Pendiente</th>
                  <th className="lg:table-cell w-[60px]">Ingreso</th>
                  <th className="lg:table-cell">Acciones</th>
                </>
            }

          </tr>
        </thead>
        <tbody>
          {
            registros.length > 0 && registros.map((row, key) => (
              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent [&_td]:text-center">
                {
                  tipo !== 1
                    ?
                    <>
                      <td>{row.idx}</td>
                      <td><div className={`w-full bg- text-white text-center text-[8px] rounded-l-full rounded-r-full ${colorfase[row.servicio]}`}>{row.servicio}</div></td>
                      <td>{row.articulo}</td>
                      <td>{row.modelo}</td>
                      {
                        tallasbase.length > 0 && tallasbase.map(talla=>
                          <td>{row[talla]}</td>
                        )
                      }
                      {/* <td>{row.xs}</td>
                      <td>{row.s}</td>
                      <td>{row.m}</td>
                      <td>{row.l}</td>
                      <td>{row.xl}</td>
                      <td>{row.xxl}</td> */}

                      <td>{row.cantidad}</td>
                      {
                        row.despachos.map(item=><td className="text-blue-600 font-black">{item.cantidad_despacho + item.cantidad_caidos + item.cantidad_incompletos}</td>)
                      }
                      {
                        !urlparams.id
                        ? <td>{row.cantidad - row.despachos.reduce((carry,item)=>{
                          carry += parseFloat(item.cantidad_despacho) + parseFloat(item.cantidad_caidos) + parseFloat(item.cantidad_incompletos)
                          return carry
                        },0) - row.despacho - row.caidos - row.incompletos}</td>
                        : <td>{row.cantidad - row.despachos.reduce((carry,item)=>{
                          carry += parseFloat(item.cantidad_despacho) + parseFloat(item.cantidad_caidos) + parseFloat(item.cantidad_incompletos)
                          return carry
                        },0) - row.despacho - row.caidos - row.incompletos}</td>
                      }
                      <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="despacho" value={row.despacho ?? 0} /></td>
                      <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="caidos" value={row.caidos ?? 0} /></td>
                      <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="incompletos" value={row.incompletos ?? 0} /></td>
                    </>
                    :
                    <>
                      <td><input type="text" onChange={editvalue} data-name="producto" data-position={key} defaultValue={row.producto} /></td>
                      <td><input type="text" onChange={editvalue} data-position={key} data-name="color" defaultValue={row.color} /></td>
                      <td><input type="number" onChange={editvalue} data-position={key} data-name="rollos" defaultValue={row.rollos} /></td>
                      <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" defaultValue={row.cantidad} /></td>
                      <td><input type="text" onChange={editvalue} data-position={key} data-name="unidad" defaultValue={row.unidad} /></td>
                      <td><input type="text" onChange={editvalue} data-position={key} data-name="conversion" defaultValue={row.conversion} /></td>
                      <td><input type="number" onChange={editvalue} data-position={key} data-name="precio" defaultValue={row.precio} /></td>
                      {
                        !urlparams.id && row.despachos.map(item=><td className="text-blue-600 font-black">{item.cantidad_despacho + item.cantidad_caidos + item.cantidad_incompletos}</td>)
                      }
                      {/* <td>{row.ingresos}</td> */}
                      {
                        !urlparams.id ? <td>{(row.cantidad*parseFloat(row.conversion ?? 1) - (row.despachos.length > 0 ? row.despachos.reduce((c,v)=>(c+v.cantidad_despacho),0) : 0)).toFixed(2)
                        }</td>
                        : <td>0</td>
                      }
                      
                      {/* <td>0</td> */}
                      {/* <td className="w-[150px]"><input type="number" onChange={editvalue} data-position={key} step={0.01} data-name="despacho" defaultValue={row.despacho ?? 0} /></td> */}
                      <td className="w-[150px]">{row.despacho ?? 0}</td>
                    </>
                }
                <td className="w-[150px]">
                  <ul className="flex flex-row justify-end">
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" data-position={key}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-position={key} data-combo={row.id_combo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          }
        </tbody>
        <tfoot className="sticky bottom-0">
          <tr className={`focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent bg-white`}>
            {/* <td className="text-center" colSpan={tipo !== 1 ? 9 : 4}></td> */}
            {
              tipo !== 1
              ?
              <>
                <td className="text-center" colSpan={tipo == 1 ? 2 : 10}></td>
                <td className="text-center"><strong className="text-[14px]">TOTAL:</strong></td>
                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                  return carry + parseFloat(value.cantidad)
                }, 0).toFixed(2)}</td>
                {
                  !urlparams.id && registros.length > 0 && registros[0].despachos.map((item,key) => <td className="text-center text-[16px] italic text-blue-600 font-black">{registros.reduce((carry,value)=>{
                    carry += parseFloat(value.despachos[key].cantidad_despacho) + parseFloat(value.despachos[key].cantidad_caidos) + parseFloat(value.despachos[key].cantidad_incompletos)
                    // carry += 22
                    return carry
                  },0)}</td>)
                }
                {
                  !urlparams.id
                  ? <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                    return carry + parseFloat(value.cantidad ?? 0) - parseFloat(value.despachos.reduce((carry,item)=>{
                      carry += parseFloat(item.cantidad_despacho) + parseFloat(item.cantidad_caidos) + parseFloat(item.cantidad_incompletos)
                      return carry
                    },0)) - parseFloat(value.despacho ?? 0) - parseFloat(value.caidos ?? 0) - parseFloat(value.incompletos ?? 0)
                  }, 0)}</td>
                  : <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                    return carry + parseFloat(value.cantidad ?? 0) - parseFloat(value.despacho ?? 0) - parseFloat(value.caidos ?? 0) - parseFloat(value.incompletos ?? 0)
                  }, 0)}</td>
                }
                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                  return carry + parseFloat(value.despacho  ?? 0)
                }, 0)}</td>
                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                  return carry + parseFloat(value.caidos  ?? 0)
                }, 0)}</td>
                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                  return carry + parseFloat(value.incompletos ?? 0)
                }, 0)}</td>
                {/* <td className="text-center text-[16px] italic">0</td> */}
                <td className="text-center"></td>
                {/* <td className="text-center"></td> */}
              </>
              :
              <>
                <td className="text-center" colSpan={tipo == 1 ? 2 : 9}></td>
                <td className="text-center"><strong className="text-[14px]">TOTAL:</strong></td>
                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                  return carry + parseFloat(value.cantidad)
                }, 0).toFixed(2)}</td>
                <td className="text-center text-[16px] italic">-</td>
                <td className="text-center text-[16px] italic">-</td>
                <td className="text-center text-[16px] italic">-</td>
                {/* <td className="text-center text-[16px] italic">-</td> */}
                {
                  !urlparams.id && (registros[0]?.despachos?.map(row=><td className="text-center">-</td>) ?? '')
                }
                <td className="text-center">-</td>
                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                  return carry + parseFloat(value.despacho  ?? 0)
                }, 0)}</td>
                <td className="text-center"></td>
              </>
            }
          </tr>
        </tfoot>
      </table>
    </div>
  )
}