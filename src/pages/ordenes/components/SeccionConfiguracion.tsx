import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import ColoresBase from "./ColoresBase";
import { InputSelect } from "../../../components/Atoms/Input/InputSelect";

function FraccionadoByModelo(children:any){
  const {tallaslist,modelos,editvalue,onclick,disponible,agregarmodelo} = children
  return(
    <>
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
                  <td className="text-center font-extrabold">{
                    {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla]
                  }</td>
                )
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
    </>
  )
}
function FraccionadoByReceta(children:any){
  const {tallaslist,modelos,editvalue,onclick,disponible,disponible_detalle} = children
  return(
    <>
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
                  <td className="text-center font-extrabold">{
                    {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla]
                  }</td>
                )
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
                      {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0)
                    }
                  </td>
                )
              }
              <td className={`text-center font-extrabold ${Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0) < 0 ? 'text-red-600' : ''}`}>
                {
                  Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0)
                }
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default function SeccionConfiguracion(children:any) {
  const {openmodal,setOpenloader,info,tallaslist,orden,setopen,setorden,modelos,setModelos,disponible,corte,disponible_detalle} = children
  const [usareceta,setUsaReceta] = useState(0)
  const contenedor = useRef(null)

  useEffect(()=>{
    contenedor.current.addEventListener('salamandra',event=>{
      switch(event.detail.name){
        case 'condicion':
          console.log("Dento de la condicon la infor es:",event.detail.valor,corte,disponible_detalle,tallaslist)
          setUsaReceta(event.detail.valor == 'SI' ? 1 : 0)
          if(event.detail.valor == 'SI'){

            // const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
            //   c[v] = 0
            //   return c
            // },{}) ?? {}

            const tallasbase = tallaslist.find(row=>row.selected)


            const k = disponible_detalle.map(row=>{
              return {
                idreceta:row.id_receta,
                articulo:row.modelos,
                ...tallasbase.tallas.map(row=>row.desc).reduce((c,v)=>{
                  c[v] = row.fracciones.find(k=>k.talla == v)?.['cantidad'] ?? 0
                  return c;
                },{}),
                // ...row.fracciones.reduce((c,v)=>{
                //   c[v.talla]=v.cantidad;return c;
                // },{}),
                cantidad_combo:row.cantidad_combo
              }
            })

            setModelos(k)

            // setModelos(disponible_detalle.map(row=>({idprod:row.id_receta,articulo:row.modelos,...row.fracciones.reduce((c,v)=>{c[v.talla]=v.cantidad;return c;},{}),cantidad_combo:row.cantidad_combo})))
            // setModelos([...modelos,{idprod:'',articulo:'',...initialcombos,cantidad_combo:0}])
          } else {
            setModelos([])
          }
          break;
        default :
          break;
      }
    })
  },[])
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
    console.log('La infor de la orde es la siguiente:',info)
    const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
      c[v] = 0
      return c
    },{}) ?? {}
    setModelos([...modelos,{articulo:'',...initialcombos,cantidad_combo:0}])
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
        <div className="flex flex-row gap-3">
          <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
          {/* <div className="w-[400px]" ref={contenedor}>
            <InputSelect 
              title={'FraccionadoXModelo'}
              name={"fraccionado"} 
              data={
                [
                  { indice: 0, option: 'NO' }, 
                  { indice: 1, option: 'SI' } 
                ]
              } 
              df={info.length > 0 ? info[0].fraccionado : null} placeholder={'Numero de la orden'}
            />
          </div> */}
          <div className="w-[400px]" ref={contenedor}>
            <InputSelect 
              title={'UsaReceta'}
              name={"condicion"} 
              data={
                [
                  { indice: 0, option: 'NO' }, 
                  { indice: 1, option: 'SI' } 
                ]
              } 
              df={info.length > 0 ? info[0].estado_orden : null} formref={contenedor} placeholder={'Numero de la orden'}
            />
          </div>
        </div> 
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      {
        usareceta
        ? <FraccionadoByReceta tallaslist={tallaslist} modelos={modelos} editvalue={editvalue} onclick={onclick} disponible={disponible} disponible_detalle={disponible_detalle} />
        : <FraccionadoByModelo tallaslist={tallaslist} modelos={modelos} editvalue={editvalue} onclick={onclick} disponible={disponible} agregarmodelo={agregarmodelo} />
      }
      
    </div>
  </>
}