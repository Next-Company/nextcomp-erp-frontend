import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import { toast } from "react-toastify";
import { Button } from "../../../components/Atoms/Button/Button";

const INITIAL_PRICE = {precio1:[0,0],precio2:[0,0],precio3:[0,0],precio4:[0,0],precio5:[0,0],precio6:[0,0]}

function ListaModelos(children){
  const {modelos,setmodelos,info=[]} = children
  const addmodelo = ()=>{

  }
  useEffect(()=>{
    console.log("La lista de modelos es:", modelos)
  },[])
  return(
    <>
      <div className='h-[550px] w-[900px] flex flex-col overflow-hidden'>
        <div className="flex-1 scrollbar-special rounded-md overflow-y-scroll">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr.selected:nth-child(n)]:bg-green-200 [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell w-[200px]">#</th>  
                <th className="lg:table-cell">Modelo</th>
                <th className="lg:table-cell">Color</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                modelos.length > 0 && modelos.map((row,key)=>(
                  <tr key={key} className={`focus-visible:[&_input]:outline-[0px] group focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent ${info.includes(row.desc) ? 'selected' : ''}`}>
                    <td className="text-center">{key + 1}</td>
                    <td className="text-center">{row.articulo.toUpperCase()}</td>
                    <td className="text-center">{row.color.toUpperCase()}</td>
                    <td className="w-[150px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete_combo_orden" onClick={()=>{}} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="edit" data-selected={info.includes(row.desc) ? 1 : 0} data-talla={row.desc} onClick={addmodelo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>  
        <div className="flex flex-row justify-end gap-3 mt-3">
          <Button action={()=>{}} type={'button'} tipo={'default'}>Cancelar</Button>
          <Button action={()=>{}} type={'button'} tipo={'default'}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}
function TemplatePrecios(children){
  const {orden, position, info, onclick} = children
  return(
    <>
      <div key={position} className="p-4 border rounded-3xl bg-gray-100 relative">
        <div className="flex flex-row items-center">
          <h2 className="font-bold">Modelo #{position + 1}</h2>
          <h3 className="text-[12px]"> - Modelos() - Total:</h3>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
            <span className="inline-block align-middle text-[12px]">Lista de precios en <strong>soles</strong> para tiendas de los mall y gamarra.</span>
          </div>
          <hr/>
          <div className="flex flex-row gap-3">
            <Input name={'idx'} defaults={orden.length > 0 ? orden[0].idx : null} type="hidden" />
            <Input name={'precio1_a'} dataset={[{origen:'precio1'},{position:0}]} title="Hangta(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio1?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio mall'}/>
            <Input name={'precio2_a'} dataset={[{origen:'precio2'},{position:0}]} title="Retail(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio2?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio mall'}/>
            <Input name={'precio3_a'} dataset={[{origen:'precio3'},{position:0}]} title="Promo(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio3?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio mall'}/>
            <Input name={'precio4_a'} dataset={[{origen:'precio4'},{position:0}]} title="Unidad(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio4?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio gamarra'}/>
            <Input name={'precio5_a'} dataset={[{origen:'precio5'},{position:0}]} title="PorMayor(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio5?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio gamarra'}/>
            <Input name={'precio6_a'} dataset={[{origen:'precio6'},{position:0}]} title="Distribuidor(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio6?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio gamarra'}/>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-2 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
            <span className="inline-block align-middle text-[12px]">Lista de precios en <strong>dolares</strong> para las tiendas de tumbes.</span>
          </div>
          <hr/>
          <div className="flex flex-row gap-3">
            <Input name={'idx'} defaults={orden.length > 0 ? orden[0].idx : null} type="hidden" />
            <Input name={'precio1_b'} dataset={[{origen:'precio1'},{position:1}]} title="Hangta($)" defaults={orden.length > 0 ? orden[0].precios?.precio1?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio2_b'} dataset={[{origen:'precio2'},{position:1}]} title="Retail($)" defaults={orden.length > 0 ? orden[0].precios?.precio2?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio3_b'} dataset={[{origen:'precio3'},{position:1}]} title="Promo($)" defaults={orden.length > 0 ? orden[0].precios?.precio3?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio4_b'} dataset={[{origen:'precio4'},{position:1}]} title="Unidad($)" defaults={orden.length > 0 ? orden[0].precios?.precio4?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio5_b'} dataset={[{origen:'precio5'},{position:1}]} title="PorMayor($)" defaults={orden.length > 0 ? orden[0].precios?.precio5?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio6_b'} dataset={[{origen:'precio6'},{position:1}]} title="Distribuidor($)" defaults={orden.length > 0 ? orden[0].precios?.precio6?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-row gap-2 p-1 border rounded-full bg-white">
          <div className="rounded-full w-9 h-9 hover:text-red-600 hover:bg-gray-300 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="eliminar" onClick={onclick} data-position={position}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
          </div>
          <div className="rounded-full w-9 h-9 hover:bg-gray-300 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="vincular" onClick={onclick} data-position={position}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>
          </div>
          <div className="rounded-full w-9 h-9 hover:bg-gray-300 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="agregar" onClick={onclick} data-position={position}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-grid-add"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M14 17h6m-3 -3v6" /></svg>
          </div>
          {/* <div className="absolute top-full right-1 border rounded-3xl bg-white w-[300px] h-[200px]"></div> */}
        </div>
      </div>
    </>
  )
}

export default function SeccionPrecios(children:any) {
  const {orden, setorden, setopen, openmodal, modelos} = children
  const [info,setInfo] = useState([INITIAL_PRICE])

  useEffect(()=>{
    console.log("La lista de modelos es:",modelos)
  },[])

  const onchange = (e)=>{
    console.log("EL input referen es:",e.target.dataset.origen)
    const origen = e.target.dataset.origen
    const position = parseInt(e.target.dataset.position)
    const valor = parseFloat(e.target.value)
    // {precio1:[23,14],precio2:[13.23,89.34]}

    console.log("La infor de orden es:",orden)
    if(orden[0].precios){
      const p = orden[0].precios?.[origen] ?? [0,0]
      p[position] = valor
      setorden([{...orden[0],precios:{...orden[0].precios,[origen]:p}}])
    } else {
      const p = [0,0]
      p[position] = valor
      setorden([{...orden[0],precios:{[origen]:p}}])
    }
  }
  const onclick = (e)=>{
    const action = e.target.dataset.action;
    const position = parseInt(e.target.dataset.position);
    console.log("La accion es la siguiente:",action,position)
    // console.e
    switch(action){
      case 'eliminar':
        if(position){
          openmodal({
            open:true,
            content: <div>Desea elminar el modelo de precios seleccionado?.<br/> Cualquier modificacion realizada se perderá.</div>,
            controls: true,
            header: false,
            action:async ()=>{
              setInfo(info.filter((row,key)=>key !== position))
            }
          })
        }
        break;
      case 'agregar':
        setInfo([...info,INITIAL_PRICE])
        break;
      case 'vincular':
        openmodal({
          open:true,
          content: <ListaModelos modelos={modelos} setmodelos={()=>{}} info={[]} />,
          controls: false,
          header: false,
          action:async ()=>{
          }
        })
        break;
      default:
        break;
    }
  }
  return <>
    <form onChange={onchange} className={`flex flex-col gap-3 p-1`}>
      <div className="flex flex-col gap-3"></div>
      {
        info.map((row,key)=><TemplatePrecios info={row} position={key} orden={orden} onclick={onclick} />)
      }
    </form>
  </>
}