import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import { TextArea } from "../../../components/Atoms/Input/TextArea";
import { Consulta } from "../../../utils/utils";
import { toast } from "react-toastify";
import Recetas from "../../../components/Common/Recetas";
import Colores from "../../../components/Common/Colores";
import ColoresBase from "./ColoresBase";

const ListaCombos = (children) => {
  const {combos,tallaslist} = children
  return(
    <>
      <div className="w-[60vw] h-[500px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] mt-2">
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
          <thead className="text-left sticky top-0 bg-white">
            <tr>
              <th className="lg:table-cell w-[500px]">ColorCombo</th>  
              {
                tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                  <th className="lg:table-cell">{talla.toUpperCase()}</th>
                )
              }
              <th className="lg:table-cell">CantidadCombo</th>
              <th className="lg:table-cell">Acciones</th>
              <th className="lg:table-cell">Condiciones </th>
            </tr>
          </thead>
          <tbody>
            {
              combos && combos.map((row,key)=>(
                <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                  <td>{row.articulo}</td>
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <td>{row[talla]}</td>    
                    )
                  }
                  <td><input data-name="cantidad_combo" type="number" onChange={(editvalue)} data-position={key} value={row.cantidad_combo}/></td>
                  <td className="w-[250px]">
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete_combo_orden" onClick={()=>{}} data-position={key} data-id={0}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="divie" onClick={()=>{}} data-insumos={JSON.stringify(row.insumos)} data-position={key}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cube-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.83 16.809c.11 -.248 .17 -.52 .17 -.801v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-3.012 1.725m-2.547 1.458l-1.441 .825c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l5.544 -3.174" /><path d="M12 22v-10" /><path d="M14.532 10.538l6.198 -3.578" /><path d="M3.27 6.96l8.73 5.04" /><path d="M3 3l18 18" /></svg>

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
    </>
  )
}

export default function SeccionConfiguracion(children:any) {
  const {openmodal,setOpenloader,tallaslist,orden,setopen,modelos,setModelos,disponible} = children
  const info = []

  const editvalue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.dataset.position)
    const value = e.target.value
    const name = e.target.dataset.name
    setModelos([...modelos.map((row,key)=>key == position ? {...row,[name]:value} : row)])
  }
  const onclick = async (e) => {
    const position = parseInt(e.target.dataset.position)
    const action = e.target.dataset.action
    switch(action){
      case 'delete':
        setModelos([...modelos.filter((row,key)=>key !== position)])
        break;
      case 'vincular':
        vincularcolores(e)
        break;
      default:
        break;
    }
  }
  const agregarmodelo = ()=>{
    const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
      c[v] = 0
      return c
    },{}) ?? {}
    setModelos([...modelos,{idprod:'',articulo:'',...initialcombos,cantidad_combo:0}])
    // openmodal({
    //   open:true,
    //   content: <Recetas 
    //     actions={(item)=>{  
    //       console.log("Informacion de los insumos:",item)
    //       setopen(false)
    //       const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
    //         c[v] = 0
    //         return c
    //       },{}) ?? {}
    //       setModelos([...modelos,{idprod:item[0].id_producto_CAB,articulo:item[0].producto,...initialcombos,cantidad_combo:0}])
    //     }}
    //     closemodal={()=>setopen(false)}
    //   />,
    //   controls: false,
    //   header: false,
    //   action:async ()=>{
    //   }
    // })
  }
  const vincularcolores = async (e) => {
    const position = e.currentTarget.getAttribute('data-position')
    openmodal({
      open:true,
      content: <ColoresBase 
        actions={(item)=>{  
          console.log("Camaron de la isla:",item)
          setModelos([...modelos.map((row,key)=>key == position ? {...row,color:item.nom,idcolor:item.idx} : row)])
          // setModelos([...modelos.filter((modelo)=>modelo.idprod !== item.id_producto_CAB),{...item}])
          // console.log("Informacion de los insumos:",item)
          // setopen(false)
          // const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
          //   c[v] = 0
          //   return c
          // },{}) ?? {}
          // setModelos([...modelos,{idprod:item[0].id_producto_CAB,articulo:item[0].producto,...initialcombos,cantidad_combo:0}])
        }}
        closemodal={()=>setopen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
  }
  return <>
    <div className={`flex flex-col gap-3`}>
      <div className="flex flex-col gap-3"></div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
        </div>
        <hr/> 
        <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        <div className="w-[500px]">
          <Input name={'oc'} title="OP" defaults={info.length > 0 ? info[0].oc : null} type="text" verify="true" placeholder={'Numero de la orden'}/>
        </div>
        <Input name={'id_cliente_CAB'} defaults={info.length > 0 ? info[0].id_cliente_CAB : null} type="hidden" verify="true"/>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <div className="h-[500px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px]">
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
          <thead className="text-left sticky top-0 bg-white">
            <tr>
              <th className="lg:table-cell min-w-[300px]">Modelo</th>  
              <th className="lg:table-cell min-w-[300px]">Color</th>  
              {
                tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                  <th className="lg:table-cell">{talla.toUpperCase()}</th>
                )
              }
              <th className="lg:table-cell text-center">Disponible</th>
              <th className="lg:table-cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              modelos && modelos.map((row,key)=>(
                <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                  <td><input data-name="articulo" type="text" onChange={editvalue} data-position={key} value={row.articulo}/></td>
                  {/* <td className="text-center whitespace-nowrap">{row.articulo}</td> */}
                  <td className="text-center whitespace-nowrap">{row.color}</td>
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <td className="text-center"><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla]}/></td>    
                    )
                  }
                  <td className="text-center">{tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,talla)=>c+parseInt(row[talla]||0),0)}</td>
                  <td className="w-[250px]">
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="divie" onClick={()=>{}} data-insumos={JSON.stringify(row.insumos)} data-position={key}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-vector-spline"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 4a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M3 18a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M17 5c-6.627 0 -12 5.373 -12 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="vincular" onClick={onclick} data-position={key}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-color-swatch"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2" /><path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9" /><path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" /><path d="M17 17l0 .01" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot className="sticky bottom-0 bg-white">
            <tr className="h-[50px] text-[14px]">
              <td></td>
              <td className="text-center font-extrabold">DISPONIBLE</td>
              {
                tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                // Object.keys({...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}).map(talla=>
                  // <td className="text-center font-extrabold">{disponible[talla]}</td>
                  <td className="text-center font-extrabold">{
                    {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla]
                  }</td>
                )
                // Object.keys(disponible).map(talla=>
                //   <td className="text-center font-extrabold">{disponible[talla]}</td>
                // )
              }
              <td className="text-center font-extrabold">{Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0)}</td>
              <td></td>
            </tr>
            <tr className="h-[50px] text-[14px]">
              <td></td>
              <td className="text-center font-extrabold">TOTAL</td>
              {
                tallaslist.filter(r=>r.selected)[0].tallasformateado.split('-').map(talla=>
                  <td className={`text-center font-extrabold ${disponible[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0) < 0 ? 'text-red-600' : ''}`}>
                    {
                      // disponible[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0)
                      {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0)
                    }
                  </td>
                )
              }
              {/* <td className="text-center font-extrabold">{Object.values(disponible).reduce((c,v)=>c + v,0) - 10}</td> */}
              <td className={`text-center font-extrabold ${Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0) < 0 ? 'text-red-600' : ''}`}>
                {
                  Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0)
                }
              </td>
            </tr>
            <tr>
              <td colSpan={11} >
                <div className="flex flex-row justify-center">
                  <div onClick={agregarmodelo} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-full text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                    +
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </>
}