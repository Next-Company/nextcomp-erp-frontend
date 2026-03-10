import { useState } from "react"
import { Button } from "../../../components/Atoms/Button/Button"
import { InputTest } from "../../../components/Atoms/Input/InputTest"
import { InputSelect } from "../../../components/Atoms/Input/InputSelect"
import { Input } from "../../../components/Atoms/Input/Input"

function CombosInsumos(children){
  const {actions,closemodal,insumos = [],c_insumos=[],setcorte,position_corte,position_combo,info} = children
  const [insu,setInsu] = useState(c_insumos ?? [])
  
  console.log('Los insumos de los combos son:',c_insumos,info)
  const onclickinsumos = (e)=>{
    const action = e.target.dataset.action
    const id = parseInt(e.target.dataset.id)
    switch (action) {
      case 'select':
        setInsu(row=>row.includes(id) ? row.filter(item=>item !== id) : [...row,id])
        setcorte(corte=>corte.map((row,key)=>{
          return {
            ...row,
            combos: (
              key == position_corte 
              ? row.combos.map((row2,key2)=>(
                key2 == position_combo 
                ? {...row2,insumos: ((row2.insumos ?? []).includes(id) ? (row2.insumos ?? []).filter(item=>item !== id) : [...(row2.insumos ?? []),id]) }
                : row2
              ))
              : row.combos
            )
          }
        }))
        break;
    
      default:
        break;
    }
  }
  return(
    <>
      <div className='h-[650px] w-[1100px] flex flex-col overflow-hidden'>
        <hr />
        <div className="flex-1 scrollbar-special rounded-md overflow-y-scroll bg-gray-200 mb-2">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr.selected:nth-child(n)]:bg-green-200">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>
                <th className="lg:table-cell">Articulo</th>
                <th className="lg:table-cell">Unidad</th>
                <th className="lg:table-cell">Color</th>
                <th className="lg:table-cell">Talla</th>
                <th className="lg:table-cell ">Comprometido</th>
                <th className="lg:table-cell">Stock</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                insumos.length > 0 && insumos.map((row,key)=>(
                  <tr key={key} className={`focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent [&_select]:text-center [&_select]:p-[2px] [&_select]:w-full [&_select]:bg-transparent focus-visible:[&select]:outline-[0px] focus-visible:[&select]:bg-gray-200 focus-visible:[&select]:border-black focus-visible:[&select]:bg-transparent focus:[&_select]:outline-none
                    ${insu && (insu.includes(parseInt(row.id_subprod_CAB)) ? 'selected' : '' )}
                  `}>
                    <td className="text-center">{row.id_subprod_CAB}</td>
                    <td className="text-center">{row.producto}</td>
                    <td className="text-center">-</td>
                    <td className="text-center">{row.color}</td>
                    <td className="text-center">{row.talla}</td>
                    <td className="text-center">{row.cantidad}</td>
                    <td className="text-center">{row.stock ?? 0}</td>
                    <td className="w-[150px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={()=>{}} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review" onClick={onclickinsumos} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="select" onClick={onclickinsumos} data-position={key} data-id={row.id_subprod_CAB}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
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
      </div>
    </>
  )
}

function CuerpoCorte(children){
  let {info,setcorte,position,quitar,form,setopen,openmodal,insumos,tallaslist} = children
  const [active,setActive] = useState(1)
  const onclick = (e)=>{
    const position = e.target.dataset.position
    const id = e.target.dataset.id
    setcorte(corte=>corte.reduce((c,v)=>{
      c.push({...v,combos:v.idx == id ? v.combos.filter((row,key)=>key !== parseInt(position)) : v.combos})
      return c
    },[]))
  }
  const editvalue = (e)=>{
    const indice = e.target.dataset.position
    const id = info.idx
    const name = e.target.dataset.name
    console.log("La informacion del corte es:",info)

    let total = 0
    // if(['st','xs','s','m','l','xl','xxl'].includes(name)){
    if(tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').includes(name)){
      // total = ['st','xs','s','m','l','xl','xxl'].reduce((c,v)=>{
      total = tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{
        if(v !== name){
          c += parseInt(info.combos[indice][v])
        }
        return c
      },0)
      total += parseInt(e.target.value)

      setcorte(corte=>corte.reduce((c,v)=>{
        c.push({...v,combos:v.idx == id ? v.combos.map((row,key)=>key == parseInt(indice) ? ({...row,[e.target.dataset.name]:e.target.value,cantidad_combo:total}) : row ) : v.combos})
        return c
      },[]))
    }else{
      setcorte(corte=>corte.reduce((c,v)=>{
        c.push({...v,combos:v.idx == id ? v.combos.map((row,key)=>key == parseInt(indice) ? ({...row,[e.target.dataset.name]:e.target.value}) : row ) : v.combos})
        return c
      },[]))
    }
  }
  const agregarcombo = (e)=>{
    const id = e.target.dataset.id
    setcorte(corte=>corte.reduce((c,v)=>{
      const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
        c[v] = 0
        return c
      },{}) ?? {}
      // c.push({...v,combos:v.idx == id ? [...v.combos,{id_hojacorte_CAB:'',color_combo:'',st:0,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0,insumos:[]}] : v.combos})
      c.push({...v,combos:v.idx == id ? [...v.combos,{id_hojacorte_CAB:'',color_combo:'',...initialcombos,cantidad_combo:0,insumos:[]}] : v.combos})
      return c
    },[]))

  }
  const deletecorte = (e)=>{
    const position = e.target.dataset.position
    setcorte(corte=>corte.filter((row,key)=>key !== parseInt(position)))
  }
  const add_insumo = (e)=>{
    const c_insumos = e.target.dataset.insumos ?? []
    const position_combo = e.target.dataset.position ?? -1
    openmodal({
      open:true,
      content: <CombosInsumos actions={(items)=>{  
        console.log("Informacion de los insumos:",items)
        // const id = e.target.dataset.id
        // setcorte(corte=>corte.reduce((c,v)=>{
        //   c.push({...v,combos:v.idx == id ? [...v.combos,...items.filter(item=>!v.combos.map(combo=>combo.idx_color).includes(item.idx)).map(item=>({id_hojacorte_CAB:'',idx_color:item.idx,color_combo:item.nom,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0}))] : v.combos})
        //   return c
        // },[]))
        // setopen(false)
      }}
        closemodal={()=>setopen(false)}
        insumos={insumos}
        c_insumos={JSON.parse(c_insumos)}
        info={info}
        setcorte={setcorte}
        position_combo={position_combo}
        position_corte={position}
      />,
      controls: true,
      header: false,
      action:async ()=>{
      }
    })

  }
  return <>
    <div key={position}>
      {/* <InputTest name={'numero_corte'} defaults={Object.keys(info).length > 0 && info.numero_corte ? info.numero_corte : null} title="#HojaCorte" type="text" /> */}
      <ul className="list-none [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button]:w-full [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50 relative">
        <div className="relative">
          <div className="absolute h-full flex flex-row items-center top-0 right-[20px]">
            <ul className="flex flex-row justify-end">
              <li className="cursor-pointer">
                <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete_combo_orden" onClick={()=>quitar(position)} data-position={position}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </div>
              </li>
            </ul>
          </div>
          <button type="button" className={`group active`} data-estado={0} onClick={()=>setActive(active*-1)}>
            <span className="relative h-[100%] w-full flex items-center pointer-events-none">
              # HojaCorte {Object.keys(info).length > 0 && info.numero_corte ? info.numero_corte : ''}
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
        </div>
      </ul>
      {/* /////////////////// */}
      <div id="cuerpo_ingresos" data-position={position} className={`flex-1 scrollbar-special overflow-y-scroll ${active == -1 ? 'h-0' : 'h-[400px] min-h-[200px]'} transition-all`}>
        <div className="p-2">
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <InputTest name={'idx'} defaults={Object.keys(info).length > 0 && info.idx ? info.idx : null} title="#HojaCorte" type="hidden" />
              <InputTest name={'numero_corte'} defaults={Object.keys(info).length > 0 && info.numero_corte ? info.numero_corte : null} title="#HojaCorte" type="text" />
            </div>
            <InputSelect title={'Estado'} name={"estado_corte"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: '-', option: 'NO CORRESPONDE' }]} df={Object.keys(info).length > 0 ? info.estado_corte : null} formref={form}/>
            <Input name={'fec_emision'} defaults={Object.keys(info).length > 0 && info.fec_emision ? info.fec_emision : null} title="FechaCreación" type="date" />
          </div>
          <div className="h-[300px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] mt-2">
            <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
              <thead className="text-left sticky top-0 bg-white">
                <tr>
                  <th className="lg:table-cell w-[500px]">ColorCombo</th>  
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <th className="lg:table-cell">{talla.toUpperCase()}</th>
                    )
                  }
                  {/* <th className="lg:table-cell">S/T</th>
                  <th className="lg:table-cell">XS / 26</th>
                  <th className="lg:table-cell">S / 28</th>
                  <th className="lg:table-cell">M / 30</th>
                  <th className="lg:table-cell">L / 32</th>
                  <th className="lg:table-cell">XL / 34</th>
                  <th className="lg:table-cell">XXL / 36</th> */}
                  <th className="lg:table-cell">CantidadCombo</th>
                  <th className="lg:table-cell">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(info).length > 0 && info.combos && info.combos.map((row,key)=>(
                    <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                      <td><input type="text" onChange={editvalue} data-name="color_combo" data-position={key} value={row.color_combo} /></td>
                      {/* <td className="text-center">{row.color_combo}</td> */}
                      {
                        tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                          <td><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla] ?? 0}/></td>    
                        )
                      }
                      {/* <td><input data-name="st" type="number" onChange={editvalue} data-position={key} value={row.st}/></td>
                      <td><input data-name="xs" type="number" onChange={editvalue} data-position={key} value={row.xs}/></td>
                      <td><input data-name="s" type="number" onChange={editvalue} data-position={key} value={row.s}/></td>
                      <td><input data-name="m" type="number" onChange={editvalue} data-position={key} value={row.m}/></td>
                      <td><input data-name="l" type="number" onChange={editvalue} data-position={key} value={row.l}/></td>
                      <td><input data-name="xl" type="number" onChange={editvalue} data-position={key} value={row.xl}/></td>
                      <td><input data-name="xxl" type="number" onChange={editvalue} data-position={key} value={row.xxl}/></td> */}
                      <td><input data-name="cantidad_combo" type="number" onChange={(editvalue)} data-position={key} value={row.cantidad_combo}/></td>
                      <td className="w-[250px]">
                        <ul className="flex flex-row justify-end">
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete_combo_orden" onClick={onclick} data-position={key} data-id={info.idx}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={add_insumo} data-insumos={JSON.stringify(row.insumos)} data-position={key}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-join"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7h5l3.5 5h9.5" /><path d="M3 17h5l3.495 -5" /><path d="M18 15l3 -3l-3 -3" /></svg>
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              <tfoot className="sticky bottom-0 bg-white">
                <tr>
                  <td colSpan={tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').length} className="text-right"></td>
                  <td className="text-center font-black">TOTAL</td>
                  {/* <td className="text-center text-[15px] font-black">{info.combos.reduce((c,v)=>c + (v.cantidad_combo ?? 0),0)}</td> */}
                  <td className="text-center text-[15px] font-black">{info.combos.reduce((c,v)=>parseInt(c) + (parseInt(v.cantidad_combo) ?? 0),0)}</td>
                  <td></td>
                  {/* <td></td> */}
                </tr>
                <tr>
                  <td colSpan={10} >
                    <div className="flex flex-row justify-center">
                      <div onClick={agregarcombo} data-id={info.idx} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-full text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                        +
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {/* /////////////////// */}
      <hr/>
    </div>
  </>
}

export default function SeccionCorte(children){
  let {info,setcorte,form,setopen,openmodal,orden,insumos,tallaslist} = children
  // useEffect(()=>{
  //   form.current.addEve
  // },[])
  const addcorte = ()=>{
    // setcorte(info=>([...info,{idx:'',numero_corte:'',estado_corte:'PENDIENTE',fec_emision:null,combos:[]}]))
    // setcorte(orden[0].combos.map(row=>({idx:'',numnero_corte:''})))
    setcorte(info=>([...info,{idx:'',numero_corte:'',estado_corte:'PENDIENTE',fec_emision:null,combos:orden[0].combos }]) )
  }
  const deletecorte = ()=>{
    setcorte(corte=>corte.filter((row,key)=>key !== 0))
  }
  const deletecorte2 = (indice)=>{
    setcorte(corte=>corte.filter((row,key)=>key !== indice))
  }
  return <>
    <div className={`flex flex-col gap-3 pt-2`}>
      {
        info.length > 0 && info.map((row,key)=><CuerpoCorte info={row} setcorte={setcorte} position={key} quitar={deletecorte2} form={form} setopen={setopen} openmodal={openmodal} insumos={insumos} tallaslist={tallaslist}/>)
      }
      <div className="sticky bottom-0">
        <div className="flex gap-3 flex-wrap justify-end">
          <Button type="button" tipo="default" action={addcorte}>Agregar nuevo corte</Button>
        </div>
      </div>
    </div>
  </>
}