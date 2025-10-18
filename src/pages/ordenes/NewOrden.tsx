import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { InputMultiSelect } from "../../components/Atoms/Input/InputMultiSelect";
import { TextArea } from "../../components/Atoms/Input/TextArea";
import Proveedores from "../../components/Common/Proveedores";
import Pedidos from "../../components/Common/Pedidos";
import { InputTest } from "../../components/Atoms/Input/InputTest";
import Productos from "../../components/Common/Productos";
import Recetas from "../../components/Common/Recetas";
import Colores from "../../components/Common/Colores";

function InsumosCombos({orden,setorden,insumo,actions}){
  const [info,setInfo] = useState(orden)
  // const [info,setInfo] = useState([{...orden[0],combos:( orden[0].combos ? orden[0].combos.filter(c=>parseInt(c.cantidad_combos) > 0) : [] )}])
  // const [info,setInfo] = useState(orden.filter(row=>parseInt(row.combos.cantidad_combo) > 0))
  console.log("Reenderizado del componente InsumosCombos")
  // const [selected,setSelected] = useState([])
  const addcombos = (e)=>{
    const position = e.target.dataset.position
    const selected = e.target.dataset.selected
    console.log("Los valores del combo seleccionado son:",insumo,position,selected)
    console.log('Validacion boleana :',selected,selected ? 'hola' : 'adios')
    if(parseInt(selected)){
      // console.log("Dentro de true",info)
      setInfo(cc=>[{...cc[0],combos:cc[0].combos.map((row,key)=>key == parseInt(position) ? ({...row,insumos:(row.insumos && row.insumos.length > 0) ? row.insumos.filter(ids=>parseInt(ids) !== parseInt(insumo)) : [] }) : row)}])
    }else{
      // console.log("Dentro de false",info)
      setInfo(cc=>[{...cc[0],combos:cc[0].combos.map((row,key)=>key == parseInt(position) ? {...row,insumos:( (row.insumos && row.insumos.length > 0)? [...row.insumos,insumo] : [insumo] )} : row)}])  
    }
  }
  const updatecombos = ()=>{
    actions(info)
  }
  console.log("La informacion de info vinculo recibida es:",info,insumo)
  return(
    <>
      <div className='h-[500px] w-[1000px] flex flex-col'>
        <div className="flex-1">
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr.selected:nth-child(n)]:bg-green-200 [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell w-[200px]">ColorCombo</th>  
                <th className="lg:table-cell">XS / 26</th>
                <th className="lg:table-cell">S / 28</th>
                <th className="lg:table-cell">M / 30</th>
                <th className="lg:table-cell">L / 32</th>
                <th className="lg:table-cell">XL / 34</th>
                <th className="lg:table-cell">XXL / 36</th>
                <th className="lg:table-cell">Cantidad</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(info[0]).length > 0 && info[0].combos && info[0].combos.map((row,key)=>(
                  <tr key={key} className={`focus-visible:[&_input]:outline-[0px] group focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent ${(row.insumos && row.insumos.includes(insumo)) ? 'selected' : ''}`}>
                  {/* <tr key={key} className={`focus-visible:[&_input]:outline-[0px] group focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent ${row.insumos.includes(insumo) ? 'selected' : ''}`}> */}
                    {/* <td><input type="text" onChange={editvalue} data-name="color_combo" data-position={key} value={row.color_combo} /></td> */}
                    <td className="text-center w-[200px]">{row.color_combo}</td>
                    <td>{row.xs}</td>
                    <td>{row.s}</td>
                    <td>{row.m}</td>
                    <td>{row.l}</td>
                    <td>{row.xl}</td>
                    <td>{row.xxl}</td>
                    <td>{row.cantidad_combo}</td>
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
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-position={key} data-action="edit" data-selected={(row.insumos && row.insumos.includes(insumo)) ? 1 : 0} onClick={addcombos}>
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
          <Button action={updatecombos} type={'button'} tipo={'default'}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}

function ImageUpload({actions,setopen,setdataimg,dataimg,id}){
  const image = useRef(null)
  const showimage = (e)=>{
    const file = e.target.files
    console.log("El archivo seleccionado es:", file, file.length)
    setdataimg(file ? file : [])
    // let file = inputfile.current.files[0]
    // inputfile.current.click()
    image.current.src = URL.createObjectURL(file[0])
    // console.log("El archivo seleccionado es:", file)
  }
  const errorimg = (e)=>{

  }
  const eraserImage = ()=>{
    setdataimg([])
    image.current.src = ''
  }
  return(
    <>
      <div className="w-[800px]">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-[320px] h-[320px] bg-orange-300 rounded-full overflow-hidden flex flex-row justify-center items-center">
            {/* <img ref={image} className="w-full h-full object-cover"/> */}
            <img ref={image} src={dataimg.length > 0 ? URL.createObjectURL(dataimg[0]) : ''} onError={errorimg} className="w-full h-full object-cover"/>
          </div>
          <div className="bg-gray-300 w-full h-[50px] flex justify-between items-center rounded-md px-3">
            <input type="file" name="" onChange={showimage} id="" />
            <Button action={eraserImage} type={'button'} tipo="default">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
            </Button>
            
            {/* <Button action={()=>inputfile.current.click()} type={'button'} tipo={'default'}>Click Me!!</Button> */}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-3 mt-3">
          <Button action={()=>setopen(false)} type={'button'} tipo={'default'}>Cancelar</Button>
          <Button action={()=>setopen(false)} type={'button'} tipo={'default'}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}

function CuerpoCorte({info,setcorte,position,quitar,form,setopen,openmodal}){
  console.log("El chapuloin colorado 2: ",info)
  const [active,setActive] = useState(-1)
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
    if(['xs','s','m','l','xl','xxl'].includes(name)){
      total = ['xs','s','m','l','xl','xxl'].reduce((c,v)=>{
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

    // if(['xs','s','m','l','xl','xxl'].includes(name)){


    // }else{

    // }
    // setcorte(corte=>corte.reduce((c,v)=>{
    //   c.push({...v,combos:v.idx == id ? v.combos.map((row,key)=>key == parseInt(indice) ? ({...row,[e.target.dataset.name]:e.target.value}) : row ) : v.combos})
    //   return c
    // },[]))
  }
  const agregarcombo = (e)=>{
    openmodal({
      open:true,
      content: <Colores actions={(items)=>{  
        console.log("Informacion de los insumos:",items)
        const id = e.target.dataset.id
        setcorte(corte=>corte.reduce((c,v)=>{
          // items.map(item=>{id_hojacorte_CAB:'',idx_color:item.idx,color_combo:item.nom,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0})
          // c.push({...v,combos:v.idx == id ? [...v.combos,{id_hojacorte_CAB:'',idx_color:'',color_combo:'',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0}] : v.combos})
          c.push({...v,combos:v.idx == id ? [...v.combos,...items.filter(item=>!v.combos.map(combo=>combo.idx_color).includes(item.idx)).map(item=>({id_hojacorte_CAB:'',idx_color:item.idx,color_combo:item.nom,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0}))] : v.combos})
          return c
        },[]))
        setopen(false)
      }}
        closemodal={()=>setopen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })

    // const id = e.target.dataset.id
    // setcorte(corte=>corte.reduce((c,v)=>{
    //   c.push({...v,combos:v.idx == id ? [...v.combos,{id_hojacorte_CAB:'',color_combo:'',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0}] : v.combos})
    //   return c
    // },[]))

  }
  const deletecorte = (e)=>{
    const position = e.target.dataset.position
    setcorte(corte=>corte.filter((row,key)=>key !== parseInt(position)))
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
      <div id="cuerpo_ingresos" data-position={position} className={`flex-1 scrollbar-special overflow-y-scroll ${active == -1 ? 'h-0' : 'h-[300px]'} transition-all`}>
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
                  <th className="lg:table-cell">XS / 26</th>
                  <th className="lg:table-cell">S / 28</th>
                  <th className="lg:table-cell">M / 30</th>
                  <th className="lg:table-cell">L / 32</th>
                  <th className="lg:table-cell">XL / 34</th>
                  <th className="lg:table-cell">XXL / 36</th>
                  <th className="lg:table-cell">CantidadCombo</th>
                  <th className="lg:table-cell">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(info).length > 0 && info.combos && info.combos.map((row,key)=>(
                    <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                      {/* <td><input type="text" onChange={editvalue} data-name="color_combo" data-position={key} value={row.color_combo} /></td> */}
                      <td className="text-center">{row.color_combo}</td>
                      <td><input data-name="xs" type="number" onChange={editvalue} data-position={key} value={row.xs}/></td>
                      <td><input data-name="s" type="number" onChange={editvalue} data-position={key} value={row.s}/></td>
                      <td><input data-name="m" type="number" onChange={editvalue} data-position={key} value={row.m}/></td>
                      <td><input data-name="l" type="number" onChange={editvalue} data-position={key} value={row.l}/></td>
                      <td><input data-name="xl" type="number" onChange={editvalue} data-position={key} value={row.xl}/></td>
                      <td><input data-name="xxl" type="number" onChange={editvalue} data-position={key} value={row.xxl}/></td>
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
                            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
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
                  <td colSpan={6} className="text-right"></td>
                  <td className="text-center font-black">TOTAL</td>
                  <td className="text-center text-[15px] font-black">{info.combos.reduce((c,v)=>c + (v.cantidad_combo ?? 0),0)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={10} >
                    <div className="flex flex-row justify-center">
                      <div onClick={agregarcombo} data-id={info.idx} className="bg-green-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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

function SeccionMateriales({info,orden}){
  console.log("Info materiales:",orden)
  return <>
    <div className={`flex flex-col gap-3 pt-4`}>
      <div className="flex gap-3">
        <Input name={'idx'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null}  type="hidden" />
        <Input name={'id_cab_orden'} defaults={orden ?? null}  type="hidden" />
      </div>
      <div className="flex gap-3">
        <InputSelect title={'Estado'} name={"estado_materiales"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }]} df={info.length > 0 ? info[0].estado_materiales : null} />
      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_materiales" />
      </div>
    </div>
  </>
}

function SeccionCorte({info,setcorte,form,setopen,openmodal}){
  // console.log("El chapuloin colorado : ",info)
  // useEffect(()=>{
  //   form.current.addEve
  // },[])
  const addcorte = ()=>{
    setcorte(info=>([...info,{idx:'',numero_corte:'',estado_corte:'PENDIENTE',fec_emision:null,combos:[]}]))
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
        info.length > 0 && info.map((row,key)=><CuerpoCorte info={row} setcorte={setcorte} position={key} quitar={deletecorte2} form={form} setopen={setopen} openmodal={openmodal} />)
        // info.length > 0 && info.map((row,key)=><div key={key} className="w-[100px] h-[80px] bg-red-300">
        //   <input type="text" value={Object.keys(row).length > 0 ? row.numero_corte : ''} />
        // </div>)
        // info.length > 0 && info.map((row,key)=><Test info={row} position={key} />)

        // info.length > 0 && info.map((row,key)=><InputTest name={'numero_corte'} defaults={Object.keys(row).length > 0 && row.numero_corte ? row.numero_corte : null} title="#HojaCorte" type="text" />)
      }
      <div className="sticky bottom-0">
        <div className="flex gap-3 flex-wrap justify-end">
          {/* <Button type="button" tipo="default" action={deletecorte}>Eliminar</Button> */}
          <Button type="button" tipo="default" action={addcorte}>Agregar nuevo corte</Button>
        </div>
      </div>
    </div>
  </>
}

function SeccionMolde({info,orden}){
  console.log("Info molde:",orden)
  return <>
    <div className={`flex flex-col gap-3 pt-4`}>
      <div className="flex gap-3">
        <Input name={'idx'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null}  type="hidden" />
        <Input name={'id_cab_orden'} defaults={orden ?? null}  type="hidden" />
        <Input name={'responsable'} defaults={info.length > 0 && info[0].responsable ? info[0].responsable : null} title="Responsable" type="text" />
        <Input name={'molde'} defaults={info.length > 0 && info[0].molde ? info[0].molde : null}  title="Molde" type="text" />
        <Input name={'muestra'} defaults={info.length > 0 && info[0].muestra ? info[0].muestra : null} title="Muestra" type="text" />
        <Input name={'lavado'} defaults={info.length > 0 && info[0].lavado ? info[0].lavado : null} title="Lavado" type="text" />
      </div>
      <div className="flex gap-3">
        <Input name={'cliente_corte'} defaults={info.length > 0 && info[0].cliente_corte ? info[0].cliente_corte : null} title="Aprobación Cliente" type="text" />
        {/* <Input name={'tizado'} defaults={info.length > 0 && info[0].tizado ? info[0].tizado : null} title="Tizado" type="text" /> */}
        <InputSelect title={'Tizado'} name={"tizado"} data={
          [
            { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true  },
            { indice: 'OBSERVADO', option: 'OBSERVADO' },
            { indice: 'FINALIZADO', option: 'FINALIZADO' },
          ]} 
          df={Object.keys(info).length > 0 ? info[0].tizado : null} 
        />
        <InputSelect title={'Estado'} name={"estado_molde"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: '-', option: 'NO CORRESPONDE' }]} df={info.length > 0 ? info[0].estado_molde : null} />
      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_molde" />
      </div>
    </div>
  </>
}

function SeccionOrden({info,form,setorden,setopen,openmodal,fases,materiales,dataimg,setDataimg,setinsumos,insumos,requerimientos,setrequerimientos}){
  const [tipopedido,setTipopedido] = useState(1)
  const [panelactive,setPanelActive] = useState(0)
  // const [dataimg,setDataimg] = useState([])
  useEffect(()=>{
    const handleSalamandra = (event) => {
      setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
    };
    form.current.addEventListener("salamandra", handleSalamandra);
  },[])

  const onclick = (e)=>{
    const position = e.target.dataset.position
    setorden(orden => ([{...orden[0], combos: orden[0].combos.filter((row,key)=>key !== parseInt(position)) }]))
  }
  const editvalue = (e)=>{
    const indice = e.target.dataset.position
    const name = e.target.dataset.name
    let total = 0
    console.log("La info cargada es la siguiente:",info)

    if(['xs','s','m','l','xl','xxl'].includes(name)){
      total = ['xs','s','m','l','xl','xxl'].reduce((c,v)=>{
        if(v !== name){
          c += parseInt(info[0].combos[indice][v])
        }
        return c
      },0)
      total += parseInt(e.target.value)
      console.log("El total es el siguiente:",total)
      setorden(orden => ([{...orden[0], combos: orden[0].combos.map((row,key)=>key == indice ? {...row,[e.target.dataset.name]:e.target.value,cantidad_combo:total} : row) }]))
    }else{
      setorden(orden => ([{...orden[0], combos: orden[0].combos.map((row,key)=>key == indice ? {...row,[e.target.dataset.name]:e.target.value} : row) }]))
    }
  }
  const agregarcombo = ()=>{
    console.log("info combos:",info)
    if(!(info.length > 0) || !info[0].combos){
      setorden([{combos: [{id_orden_CAB: null,xs:0,s:0,m:0,l:0,xl:0,xxl:0, color_combo: '', cantidad_combo: 0}] }])
    }else{
      setorden(orden => ([{ ...orden[0], combos: [...orden[0].combos,{id_orden_CAB: null, color_combo: '',xs:0,s:0,m:0,l:0,xl:0,xxl:0, cantidad_combo: 0 }] }]))
    }
  }
  const onclickinsumos = (e)=>{
    const position = e.target.dataset.position
    const valor = insumos[parseInt(position)]?.id_subprod_CAB
    const action = e.target.dataset.action
    switch (action) {
      case 'review':
        console.log('Informacion del insumo es:',insumos,valor)
        break;
      case 'delete':
        setinsumos([...insumos.filter((row,key)=>key !== parseInt(position))])
        setorden(orden=>[{...orden[0],combos:orden[0].combos.map(row=>({...row,insumos:((row.insumos && row.insumos.length > 0 && row.insumos.includes(valor)) ? row.insumos.filter(ins=>parseInt(ins) !== parseInt(valor)) : (row.insumos ?? []) )}))}])
        break;
      case 'edit':
        openmodal({
          open:true,
          content: <InsumosCombos orden={info} setorden={setorden} insumo={valor} actions={(combos)=>{  
            setorden(combos)
            // console.log("Informacion de los insumos:",items)
            setopen(false)
            // setinsumos([...insumos,...items.map(row=>({id_producto_CAB:row.id_producto_CAB,id_subprod_CAB:row.idxsub,producto:row.producto,color:row.color,idx_color:row.idx_color,talla:row.talla,idx_talla:row.idx_talla,cantidad:0}))])
          }}
            // closemodal={()=>setopen(false)}
          />,
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
  const editvalueinsumos = (e)=>{
    const name = e.target.dataset.name
    const position = e.target.dataset.position
    if(name == 'fases'){
      setinsumos([...insumos.map((row,key)=> key == parseInt(position) ? {...insumos[position],fases:[parseInt(e.target.value)]} : row )])
    }else{
      setinsumos([...insumos.map((row,key)=> key == parseInt(position) ? {...insumos[position],cantidad:e.target.value} : row )])
    }
    console.log("La lista de insumos es:",insumos)
  }
  const agregarinsumos = ()=>{
    openmodal({
      open:true,
      content: <Productos actions={(items)=>{  
        console.log("Informacion de los insumos:",items)
        setopen(false)
        setinsumos([...insumos,...items.map(row=>({id_producto_CAB:row.id_producto_CAB,id_subprod_CAB:row.idxsub,producto:row.producto,color:row.color,idx_color:row.idx_color,talla:row.talla,idx_talla:row.idx_talla,cantidad:0}))])
      }}
        // closemodal={()=>setopen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
  }
  const onclickpedidos = (e)=>{
    const position = e.target.dataset.position
    setrequerimientos([...requerimientos.filter((row,key)=>key !== parseInt(position))])
  } 
  const agregarpedido = ()=>{
    openmodal({
      open:true,
      content: <Pedidos actions={(item)=>{  
        console.log("Informacion del requerimiento:",item)
        setopen(false)
        // setrequerimientos([...requerimientos,...item.map(row=>({idx:row.idx,orden_ref:row.orden_ref,fec_emision:row.fec_emision,fec_entrega:row.fec_entrega,proveedor:row.proveedor,forma_pago:row.forma_pago,estado:row.estado}))])
        setrequerimientos([...requerimientos,{id_pedido_CAB:item.idx,orden_ref:item.orden_ref,fec_emision:item.fec_emision,fec_retorno:item.fec_retorno,proveedor:item.proveedor,forma_pago:item.forma_pago,estado:item.estado}

        ])
      }}
        // closemodal={()=>setopen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
  }
  const searchpedido = () => {
    const params_modal = {
      open: true,
      content: <Pedidos actions={(item) => {
        setorden(orden => ([{ ...orden[0], id_pedido_origen: item.idx, nro_pedido_origen: item.orden_ref }]))
        setopen(false)
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openmodal(params_modal)
  }
  const nuevoproveedor = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Proveedores actions={(item)=>{  
        console.log("Info del provedor:",item)
        setorden(orden=>([{...orden[0],id_cliente_CAB:item.idx ,cliente:item.nom.substr(0,49)}]))
        setopen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openmodal(params_modal)
  }
  const loadimage = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <ImageUpload actions={() => {
      }} setopen={setopen} setdataimg={setDataimg} dataimg={dataimg} id={info.length > 0 ? info[0].idx : 0} />,
      controls: false,
      header: false,
      action: () => {
      }
    }
    openmodal(params_modal)
  }
  const changepanel = (position)=>{
    setPanelActive(position)
  }
  const searchproducto = ()=>{
    openmodal({
      open:true,
      content: <Recetas actions={(items)=>{  
        console.log("Informacion de los insumos:",items)
        setopen(false)
        // setorden([{...info[0],id_receta:items[0].id_producto_CAB,producto:items[0].producto,tipoProduccion:items[0].tipoProduccion,tipoFabricacion:items[0].tipoFabricacion,marca:items[0].marca,modelos:items[0].modelo,base:items[0].estilo,presentacion:items[0].presentacion}])

        // setorden([{...info[0],id_receta:items[0].id_producto_CAB,producto:(items[0].rubro + ' ' + items[0].presentacion + ' ' + items[0].modelo),tipo_produccion:items[0].tipoProduccion,tipo_fabricacion:items[0].tipoFabricacion,marca:items[0].marca,modelos:items[0].modelo,base:items[0].estilo,presentacion:items[0].presentacion,rubro:items[0].rubro}])

        setorden([{...info[0],id_receta:items[0].id_producto_CAB,tipo_produccion:items[0].tipoProduccion,tipo_fabricacion:items[0].tipoFabricacion,marca:items[0].marca,modelos:items[0].modelo,base:items[0].estilo,presentacion:items[0].presentacion,rubro:items[0].rubro}])

        // setinsumos([...insumos,...items.map(row=>({id_producto:row.id_producto_CAB,id_subprod:row.idxsub,producto:row.producto,color:row.color,idx_color:row.idx_color,talla:row.talla,idx_talla:row.idx_talla,cantidad:0}))])
      }}
        closemodal={()=>setopen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
  }
  const translateClasses = ['', 'translate-x-[100%]', 'translate-x-[200%]', 'translate-x-[300%]'];
  return <>
    <div className={`flex flex-col gap-3 pt-4`}>
      <div className="flex flex-col gap-3">
        {/* <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        <div className="w-[500px]">
          <Input name={'oc'} title="OP" defaults={info.length > 0 ? info[0].oc : null} type="text" verify="true"/>
        </div>
        <Input name={'id_cliente_CAB'} defaults={info.length > 0 ? info[0].id_cliente_CAB : null} type="hidden" verify="true"/>
        <Input name={'id_receta'} defaults={info.length > 0 ? info[0].id_receta : null} type="hidden" verify="true"/>
        <div className="w-[350px]">
          <Input name={'cliente'} title="Cliente" defaults={info.length > 0 ? info[0].cliente : null} type="text" action={nuevoproveedor} mode={'static'} verify="true"/>
        </div>
        <div className="flex gap-3 w-[50%]">
          <Input name={'fec_emitida'} defaults={info.length > 0 ? info[0].fec_emitida : null} title="FechaEmision" type="date" verify="true"/>
          <Input name={'fec_entrega'} defaults={info.length > 0 ? info[0].fec_entrega : null} title="FechaComercial" type="date" verify="true"/>
        </div>
        <div className="w-[450px]">
          <Input name={'producto'} defaults={info.length > 0 ? info[0].producto : null} title="Producto" type="text" action={searchproducto} mode={'static'} />
        </div> */}
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
        <div className="w-[350px]">
          <Input name={'cliente'} title="Cliente" defaults={info.length > 0 ? info[0].cliente : null} type="text" action={nuevoproveedor} mode={'static'} verify="true" placeholder={'Numero de la orden'}/>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-3 w-[30%]">
            <Input name={'fec_emitida'} defaults={info.length > 0 ? info[0].fec_emitida : null} title="FechaEmision" type="date" verify="true" placeholder={'Numero de la orden'}/>
            {/* <Input name={'fec_entrega'} defaults={info.length > 0 ? info[0].fec_entrega : null} title="FechaComercial" type="date" verify="true"/> */}
          </div>
          <div className="flex gap-3 w-[30%]">
            {/* <Input name={'fec_emitida'} defaults={info.length > 0 ? info[0].fec_emitida : null} title="FechaEmision" type="date" verify="true"/> */}
            <Input name={'fec_entrega'} defaults={info.length > 0 ? info[0].fec_entrega : null} title="FechaComercial" type="date" verify="true" placeholder={'Numero de la orden'}/>
          </div>
        </div>
        <div className="w-[500px]">
          <InputSelect title={'MotivoProduccion'} name={"motivo"} data={
            [
              { indice: 'REPO', option: 'REPOSICION', selected: true },
              { indice: 'CAMP', option: 'CAMPAÑA'},
              { indice: 'TMPO', option: 'TEMPORADA' },
              { indice: 'COLC', option: 'COLECCION' },
              { indice: 'OTRS', option: 'OTROS' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].mnotivo : null}
            placeholder={'Numero de la orden: CAMP,REPO,TMPO,COLC,OTRS'} 
          />
        </div>
        <div className="flex-1 w-[600px]">
          {
            fases.length > 0
            ? <InputMultiSelect title={'Ruta'} name={"ruta_proceso"} data={fases.map(fase=>({indice:fase.ruta,option:fase.ruta}))} df={info.length > 0 ? info[0].ruta_proceso : null} placeholder={'Numero de la orden'}/>
            : <Input name={''} defaults={null} title="Ruta" type="text" />
          }
        </div>
        <div className="flex gap-3 w-[70%]">
          <InputSelect title={'TipoProduccion'} name={"tipo_produccion"} data={
            [
              { indice: 'NCNL', option: 'NACIONAL', selected: true  },
              { indice: 'IMPT', option: 'IMPORTADO' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].tipo_produccion : null} placeholder={'Numero de la orden'}
          />
          <InputSelect title={'TipoFabricacion'} name={"tipo_fabricacion"} formref={form} data={
            [
              { indice: 'PT', option: 'PUNTO', selected: true  },
              { indice: 'PL', option: 'PLANO' },
              { indice: 'FT', option: 'FANTASIA' }
            ]} 
            df={Object.keys(info).length > 0 ? info[0].tipo_fabricacion : null} placeholder={'Numero de la orden'} 
          />
          <InputSelect title={'TipoPedido'} name={"modalidad_pedido"} formref={form} data={
            [
              { indice: 'ORDN', option: 'ORDEN', selected: true  },
              { indice: 'STK', option: 'STOCK PROPIO' }
            ]} 
            df={Object.keys(info).length > 0 ? info[0].modalidad_pedido : null} placeholder={'Numero de la orden'}
          />
          {/* {
            tipopedido
            ?
            <>
              <Input name={'id_pedido_origen'} defaults={info.length > 0 ? info[0].id_pedido_origen : null} type="hidden"/>
              <Input name={'nro_pedido_origen'} title={'NroPedido'} defaults={info.length > 0 ? info[0].nro_pedido_origen : null} type="text" action={searchpedido} mode={'static'} />
            </>
            :
            <>
              <Input name={'nro_pedido_adi'} title={'DocReferencia'} defaults={info.length > 0 ? info[0].nro_pedido_adi : null} type="text" />
            </>
          } */}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Info de la prenda</span>
        </div>
        <hr/> 
        <div className="flex flex-col gap-3 w-[64%]">
          <Input name={'producto'} defaults={info.length > 0 ? info[0].producto : null} title="Descripcion" type="hidden" />
          <div className="w-[350px]">
            <Input name={'id_receta'} title="IdReceta" defaults={info.length > 0 ? info[0].id_receta : null} type="text" action={searchproducto} mode={'static'} verify="true" placeholder={'Numero de la orden'}/>
          </div>
          {/* <div className="w-[550px]">
          </div> */}
          <div className="flex gap-3 w-[760px]">
            <Input name={'presentacion'} defaults={info.length > 0 ? info[0].presentacion : null} title="TipoTela" type="text" placeholder={'Numero de la orden'}/>
            <Input name={'base'} defaults={info.length > 0 ? info[0].base : null} title="Base" type="text" placeholder={'Numero de la orden'}/>
          </div>
          {/* <div className="w-[580px]">
            <Input name={'base'} defaults={info.length > 0 ? info[0].base : null} title="Base" type="text" />
          </div> */}
        </div>
        <div className="flex gap-3">
          <div className="w-[350px]">
            <Input name={'rubro'} defaults={info.length > 0 ? info[0].rubro : null} title="Articulo" type="text" placeholder={'Numero de la orden'}/>
          </div>
          <div className="w-[350px]">
            <Input name={'marca'} defaults={info.length > 0 ? info[0].marca : null} title="Marca" type="text" placeholder={'Numero de la orden'}/>
          </div>
        <div className="w-[450px]">
            <Input name={'modelos'} defaults={info.length > 0 ? info[0].modelos : null} title="Modelo" type="text" placeholder={'Numero de la orden'}/>
          </div>  
        </div>
        
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
      </div>
      <hr/>
      {/* <div className="flex gap-3 flex-wrap"> */}
      <div className="flex flex-col gap-3">
        {/* <div className="w-[200px]">
          <Input name={'curva'} defaults={info.length > 0 ? info[0].curva : null} title="Curva" type="text" placeholder={'Numero de la orden'}/>
        </div> */}
        <div className="flex-1 min-w-[300px] flex flex-row gap-3">
          <Input name={'curva'} defaults={info.length > 0 ? info[0].curva : null} title="Curva" type="text" placeholder={'Numero de la orden'}/>
          <Input name={'precio'} defaults={info.length > 0 ? info[0].precio : null} title="Precio" type="number" placeholder={'Numero de la orden'}/>
          {/* <div className="flex-1 min-w-[500px]">
            {
              fases.length > 0
              ? <InputMultiSelect title={'Ruta'} name={"ruta_proceso"} data={fases.map(fase=>({indice:fase.ruta,option:fase.ruta}))} df={info.length > 0 ? info[0].ruta_proceso : null} />
              : <Input name={''} defaults={null} title="Ruta" type="text" />
            }
          </div> */}
          <div className="flex-1 min-w-[400px]">
            {
              materiales.length > 0
              ? <InputMultiSelect title={'MaterialesProduccion'} name={"materiales_produccion"} data={materiales.map(fase=>({indice:fase.idx,option:fase.descripcion}))} df={info.length > 0 ? info[0].materiales_produccion : null} placeholder={'Numero de la orden'}/>
              : <Input name={''} defaults={null} title="MaterialesProduccion" type="text" />
            }
          </div>
          <InputSelect title={'Estado'} name={"estado_orden"} data={[{ indice: 'EN PROCESO', option: 'EN PROCESO' }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: 'ANULADO', option: 'ANULADO' }]} df={info.length > 0 ? info[0].estado_orden : null} placeholder={'Numero de la orden'}/>
          <div>
            <Button action={loadimage} type={'button'} tipo={'accept'}>
              <div className="flex flex-row items-center gap-2 justify-between">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.813 11.612c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.986 4.986l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l.292 -.293l.106 -.095c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.674 4.675a4 4 0 0 1 -3.775 3.599l-.206 .005h-12a4 4 0 0 1 -3.98 -3.603l6.687 -6.69l.106 -.095zm9.187 -9.612a4 4 0 0 1 3.995 3.8l.005 .2v9.585l-3.293 -3.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-.307 .306l-2.293 -2.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-5.307 5.306v-9.585a4 4 0 0 1 3.8 -3.995l.2 -.005h12zm-2.99 5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" /></svg>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
      </div>
      <hr/>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-between p-1 bg-gray-200 rounded-l-full rounded-r-full relative">
          <div className={`w-[180px] h-[14px] text-center text-[9px] rounded-l-full rounded-r-full bg-red-600 ${translateClasses[panelactive] || ''} transition-all cursor-pointer absolute`}></div>
          <div className={`w-[180px] text-center text-[9px] rounded-l-full rounded-r-full cursor-pointer z-10 ${panelactive == 0 && 'text-white'} transition-all`} onClick={()=>changepanel(0)} data-position="1">Combos</div>
          <div className={`w-[180px] text-center text-[9px] rounded-l-full rounded-r-full cursor-pointer z-10 ${panelactive == 1 && 'text-white'} transition-all`} onClick={()=>changepanel(1)} data-position="0">Insumos</div>
          <div className={`w-[180px] text-center text-[9px] rounded-l-full rounded-r-full  cursor-pointer z-10 ${panelactive == 2 && 'text-white'} transition-all`} onClick={()=>changepanel(2)} data-position="2">Rutas</div>
          <div className={`w-[180px] text-center text-[9px] rounded-l-full rounded-r-full  cursor-pointer z-10 ${panelactive == 3 && 'text-white'} transition-all`} onClick={()=>changepanel(3)} data-position="3">Requerimientos</div>
        </div>
      </div>
      <div className="overflow-hidden">
        {/* ////////////////////////////
        SECCION COMBOS DE LA ORDEN
        //////////////////////////// 
        // */}
        <div className={`h-[500px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 0 && 'hidden'}`}>
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell w-[500px]">Color</th>
                <th className="lg:table-cell">XS / 26</th>
                <th className="lg:table-cell">S / 28</th>
                <th className="lg:table-cell">M / 30</th>
                <th className="lg:table-cell">L / 32</th>
                <th className="lg:table-cell">XL / 34</th>
                <th className="lg:table-cell">XXL / 36</th>  
                <th className="lg:table-cell">CantidadTotal</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                info.length > 0 && info[0].combos && info[0].combos.length > 0 && info[0].combos.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td><input type="text" onChange={(editvalue)} data-name="color_combo" data-position={key} value={row.color_combo} /></td>
                    <td><input data-name="xs" type="number" onChange={editvalue} data-position={key} value={row.xs}/></td>
                    <td><input data-name="s" type="number" onChange={editvalue} data-position={key} value={row.s}/></td>
                    <td><input data-name="m" type="number" onChange={editvalue} data-position={key} value={row.m}/></td>
                    <td><input data-name="l" type="number" onChange={editvalue} data-position={key} value={row.l}/></td>
                    <td><input data-name="xl" type="number" onChange={editvalue} data-position={key} value={row.xl}/></td>
                    <td><input data-name="xxl" type="number" onChange={editvalue} data-position={key} value={row.xxl}/></td>
                    <td><input data-name="cantidad_combo" type="number" onChange={(editvalue)} data-position={key} value={row.cantidad_combo}/></td>
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
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
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
              <tr className="h-[45px] bg-white">
                <td className="font-bold text-center text-[14px]">TOTAL</td>
                <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.xs),0) : 0) : 0}</td>
                <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.s),0) : 0) : 0}</td>
                <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.m),0) : 0) : 0}</td>
                <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.l),0) : 0) : 0}</td>
                <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.xl),0) : 0) : 0}</td>
                <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.xxl),0) : 0) : 0}</td>
                <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.xs)+parseInt(v.s)+parseInt(v.m)+parseInt(v.l)+parseInt(v.xl)+parseInt(v.xxl),0) : 0) : 0}</td>
                <td className="font-bold text-center text-[14px]"></td>
              </tr>
              <tr className="bg-white">
                <td colSpan={10} >
                  <div className="flex flex-row justify-center">
                    <div onClick={agregarcombo} className="bg-green-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
                {/* /////////////////////////////
        SECCION INSUMOS DE LA PRODUCCION
        ////////////////////////////////
        // */}
        <div className={`h-[500px] flex-1 scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 1 && 'hidden'}`}>
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>
                <th className="lg:table-cell w-[500px]">Articulo</th>
                <th className="lg:table-cell ">Fase</th>
                <th className="lg:table-cell">Unidad</th>
                <th className="lg:table-cell">Color</th>
                <th className="lg:table-cell">Talla</th>
                <th className="lg:table-cell w-[150px]">Consumo</th>
                <th className="lg:table-cell w-[150px]">Comprometido</th>
                <th className="lg:table-cell">Stock</th>
                <th className="lg:table-cell">PorLlegar</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                insumos.length > 0 && insumos.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent [&_select]:text-center [&_select]:p-[2px] [&_select]:w-full [&_select]:bg-transparent focus-visible:[&select]:outline-[0px] focus-visible:[&select]:bg-gray-200 focus-visible:[&select]:border-black focus-visible:[&select]:bg-transparent focus:[&_select]:outline-none">
                    <td className="text-center">{row.id_subprod_CAB}</td>
                    <td className="text-center">{row.producto}</td>
                    <td className="text-center">
                      {/* <InputSelect title={'MotivoProduccion'} name={"motivo"} data={
                        [
                          { indice: 'REPO', option: 'REPOSICION', selected: true },
                          { indice: 'CAMP', option: 'CAMPAÑA'},
                          { indice: 'TMPO', option: 'TEMPORADA' },
                          { indice: 'COLC', option: 'COLECCION' },
                          { indice: 'OTRS', option: 'OTROS' },
                        ]} 
                        df={Object.keys(info).length > 0 ? info[0].mnotivo : null} 
                      /> */}
                      <select onChange={editvalueinsumos} data-name="fases" data-position={key} defaultValue={row.tipodoc}>
                        {
                          fases.map(fs=>
                            (
                              row.fases?.includes(fs.id) ? <option value={fs.id} selected>{fs.ruta}</option> : <option value={fs.id}>{fs.ruta}</option>
                            )
                          )
                        }
                      </select>
                    </td>
                    <td className="text-center">-</td>
                    <td className="text-center">{row.color}</td>
                    <td className="text-center">{row.talla}</td>
                    <td className="text-center"><input data-name="cantidad" type="number" onChange={editvalueinsumos} data-position={key} value={row.cantidad} step={0.001}/></td>
                    <td className="text-center">
                      {
                        info[0].combos 
                        ? info[0].combos.reduce((c,v) =>{
                            c = c + ((v.insumos && v.insumos.includes(row.id_subprod_CAB)) ? parseFloat(v.cantidad_combo)*parseFloat(row.cantidad) : 0)
                            return c
                          },0) 
                        : 0
                      }
                    </td>
                    {/* <td className="text-center">{JSON.stringify(info[0].combos.map(row=>row.cantidad_combo))}</td> */}
                    <td className="text-center">0</td>
                    <td className="text-center">0</td>
                    <td className="w-[250px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclickinsumos} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review" onClick={onclickinsumos} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={onclickinsumos} data-position={key}>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-join-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7h1.948c1.913 0 3.705 .933 4.802 2.5a5.861 5.861 0 0 0 4.802 2.5h6.448" /><path d="M3 17h1.95a5.854 5.854 0 0 0 4.798 -2.5a5.854 5.854 0 0 1 4.798 -2.5h5.454" /><path d="M18 15l3 -3l-3 -3" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot className="sticky bottom-0">
              <tr className="h-[45px] bg-white">
                <td className="font-bold text-center text-[14px]">TOTAL</td>
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]"></td>
                {/* <td className="font-bold text-center text-[14px]">{info.length > 0 ? (info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v.xs)+parseInt(v.s)+parseInt(v.m)+parseInt(v.l)+parseInt(v.xl)+parseInt(v.xxl),0) : 0) : 0}</td> */}
                <td className="font-bold text-center text-[14px]">{insumos.length > 0 ? insumos.reduce((c,v)=>c+parseFloat(v.cantidad),0) : 0}</td>
                <td className="font-bold text-center text-[14px]"></td>
              </tr>
              <tr className="bg-white">
                <td colSpan={11} >
                  <div className="flex flex-row justify-center">
                    <div onClick={agregarinsumos} className="bg-green-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* ////////////////////////////
        SECCION FASES DE PRODUCCION
        //////////////////////////// 
        // */}
        <div className={`h-[500px] flex-1 scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 2 && 'hidden'}`}>
          Configuracion de las fases de produccion
        </div>
        {/* ///////////////////////////////
        SECCION REQUERIMIENTOS DE LA ORDEN
        ///////////////////////////////////
        // */}
        <div className={`h-[500px] flex-1 scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 3 && 'hidden'}`}>
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell text-center">Id</th>
                <th className="lg:table-cell text-center">NrorRequerimiento</th>
                <th className="lg:table-cell text-center">FechaEmision</th>
                <th className="lg:table-cell text-center">FechaDespacho</th>
                <th className="lg:table-cell text-center">Proveedor</th>
                <th className="lg:table-cell text-center">Pago</th>
                <th className="lg:table-cell text-center">Estado</th>
                <th className="lg:table-cell text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                requerimientos.length > 0 && requerimientos.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td className="text-center">{row?.id_pedido_CAB ?? ''}</td>
                    <td className="text-center">{row?.orden_ref ?? ''}</td>
                    <td className="text-center">{row?.fec_emision ?? ''}</td>
                    <td className="text-center">{row?.fec_retorno ?? ''}</td>
                    <td className="text-center">{row?.proveedor ?? ''}</td>
                    <td className="text-center">{row?.forma_pago ?? ''}</td>
                    <td className="text-center">{row?.estado ?? ''}</td>
                    <td className="w-[250px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclickpedidos} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
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
              <tr className="bg-white">
                <td colSpan={10} >
                  <div className="flex flex-row justify-center">
                    <div onClick={agregarpedido} className="bg-green-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_ordenes" />
      </div>
    </div>
  </>
}

export function NewOrden() {
  const form = useRef()
  const urlparams = useParams()
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const [position, setPosition] = useState(0)
  const [orden, setOrden] = useState([])
  const [molde, setMolde] = useState([])
  const [corte, setCorte] = useState([])
  const [avios, setAvios] = useState([])
  const [materiales, setMateriales] = useState([])
  const [dataimg, setDataimg] = useState([])
  const navigate = useNavigate()
  const [tipopedido,setTipopedido] = useState(1)
  const [fases,setFases] = useState([])
  const [materialesref,setMaterialesRef] = useState([])
  const [insumos,setInsumos] = useState([])
  const [requerimientos,setRequerimientos] = useState([])
  
  console.log("Info del corte :",orden)

  const onsubmit = async (e) => {
    e.preventDefault()
    let url_save = ''
    let data = undefined

    if(position == 0){
      
      url_save = urlparams.id ? 'ordenes/updateFaseOrden' : 'ordenes/saveFaseOrden'

      for (const element of form.current.querySelectorAll("input[verify='true']")) {
        if(element.tagName == 'INPUT' && element.value == ''){
          console.log("El input problematico es :",element)
          toast.error('Debe ingresar la información correspondiente al campo seleccionado. Por favor verifique.', { theme: "colored" })
          return 0
        }
      }
      if(form.current.elements['materiales_produccion'].value == '[]' || form.current.elements['materiales_produccion'].value == null){
        toast.error('Debe seleccionar al menos un material de produccion.', { theme: "colored" })
        return
      }
      if(form.current.elements['ruta_proceso'].value == '[]' || form.current.elements['ruta_proceso'].value == null){
        toast.error('Debe seleccionar al menos una ruta de proceso.', { theme: "colored" })
        return
      }
      if(insumos.filter(row=>row.cantidad == 0).length > 0){
        toast.error('Debe detallar la cantidad para cada insumo registrado', { theme: "colored" })
        return
      }
      if(!(requerimientos.length > 0) && tipopedido){
        toast.error('Debe ingresar los requerimientos vinculados a la orden.', { theme: "colored" })
        return
      }

      data = new FormData(e.target)
      dataimg.length > 0 && data.append('filenext', dataimg[0])
      orden.length > 0 && data.append('combos',JSON.stringify(orden[0].combos))
      data.append('insumos',JSON.stringify(insumos))
      data.append('requerimientos',JSON.stringify(requerimientos))
      // insumos.length > 0 && data.append('insumos',JSON.stringify(insumos))
      // requerimientos.length > 0 && data.append('requerimientos',JSON.stringify(requerimientos))
    }
    if(position == 2){
      url_save = 'ordenes/saveFaseMolde'
      data = new FormData(e.target)
      data.append('id',urlparams.id)
    }
    if(position == 3){
      console.log("Info del corte :",corte)
      url_save = 'ordenes/saveFaseCorte'
      // console.log("Info corte actualizado:",corte)
      data = new FormData()
      data.append('info',JSON.stringify(corte))
      data.append('id',urlparams.id)
    }
    if(position == 4){
      console.log("Info de matariales :",materiales)
      url_save = 'ordenes/saveFaseMateriales'
      data = new FormData(e.target)
      data.append('id',urlparams.id)
    }
    const PARAMS_MODAL = {
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de la orden registrada?</div>,
      action: async () => {
        setOpenloader(true)
        await Consulta({
          url: url_save,
          params: {
            method: urlparams.id ? 'PUT' : 'POST', 
            // method: 'POST', 
            body: data
          }
        })
        .then(resp => {
          if(resp.ok){
            // navigate("/main/ordenes/")
            toast.success('La orden ingresada fue guardada con éxito!!', { theme: "colored" })
          }else{
            toast.error(resp.mensaje, { theme: "colored" })
          }
        })
        .catch((err)=>{
          toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          setOpenloader(false)
        })
      }
    }
    openModal(PARAMS_MODAL)
  }

  useEffect(()=>{
    const handleSalamandra = (event) => {
      console.log("INof origen del select:",event.detail,event.detail.target.closest('div#cuerpo_ingresos'))
      if(event.detail.name == 'estado_corte'){
        const padre = event.detail.target.closest('div#cuerpo_ingresos')
        const indice = padre.dataset.position
        setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,['estado_corte']:event.detail.valor} : row))
      }else{
        setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
      }
    };
    form.current.addEventListener("salamandra", handleSalamandra);

    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/getordenesbyid/' + urlparams.id,})
          .then(resp => {
            // console.log(resp)
            // setOpenloader(false)
            console.log("Mostrando informacion :",resp)

            setOrden(resp[0])
            setMolde(resp[1])
            setCorte(resp[2])
            setMateriales(resp[3])
            setFases(resp[4])
            setMaterialesRef(resp[5])
            setInsumos(resp[6])
            setRequerimientos(resp[7])

          })
          .catch((err)=>{
            setOpenloader(false)
            toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
      pp()
    }else{
      setOpenloader(true)
      Promise.all([
        Consulta({url:'ordenes/getfasesproduccion'}),
        Consulta({url:'ordenes/getmaterialesproduccion'}),
        Consulta({url:'ordenes/getCorrelativoProduccionPreview/ORDEN'})
      ])
      .then(resp=>{
        console.log("El resultado de la consulta es:",resp)
        setFases(resp[0])
        setMaterialesRef(resp[1])
        setOrden([{oc:resp[2].resp}])
        // console.log("El correlativo actual es:",resp[2])
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        setOpenloader(false)
      })

      // Consulta({url:'ordenes/getfasesproduccion'})
      // .then(resp=>{ 
      //   console.log("Las fases de produccion son :",resp)
      //   setFases(resp)
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
      // .finally(()=>{
      //   setOpenloader(false)
      // })
    }



  },[])
  const testkey2 = (e)=>{
    // console.log("El target de testkey2 es:",e.target)
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
  }
  const testkey = (e)=>{
    // console.log("El targe dl evento key es:",e.target.name)
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
    // for(let element of form.current.querySelectorAll("input[data-group='combo'")){
    //   acumulador += element.value == '' ? 0 : parseInt(element.value)
    // }
    // form.current.querySelector("input[name='acumulado']").value = acumulador
  }

  const printpedido = (e)=>{
    const desc = async ()=>{
      setOpenloader(true)
      await fetch("http://192.168.18.20:4000/produccion/export",{
        method:'POST',
        credentials: 'include'
      })
      .then(resp=>{
        return resp.json()
      })
      .then(resp=>{
        setOpenloader(false)
        // console.log("El verdadero",resp)

        const binaryString = window.atob(resp.data);
        // console.log(binaryString)
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        const file = window.URL.createObjectURL(new Blob([bytes], {type: "application/pdf"}))

        const link = document.createElement('a')
        link.href = file
        link.target = 'blank'
        link.click()
      })
      .catch((err)=>{
        setOpenloader(false)
        toast.error('Se produjo un error!!', { theme: "colored" })
      })

    }
    desc()
  }
  const cancelarorden = ()=>{
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea descartar los cambios realizados?.<br/> Cualquier modificacion realizada se perderá.</div>,
      action: ()=>{
        navigate('/main/ordenes/')
      }
    })
  }
  const actualizarcombos = ()=>{
    const pp = async () => {
      setOpenloader(true)
      await Consulta({url: 'ordenes/updatecombos/combos'})
        .then(resp => {
          console.log("Opportunity never die!!!!",resp)
        })
        .catch((err)=>{
          setOpenloader(false)
          toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          setOpenloader(false)
        })
    }
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea proceder con la actualizaion de los combos de la orden?.</div>,
      action: ()=>{
        pp()
      }
    })
  }
  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center gap-2">
              <h2 className="font-medium text-[16px]">Operaciones /</h2>
              <span className="text-blue-500 font-bold">
                {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].oc + '-' + orden[0].producto + '-' + (orden[0].base ?? '') + '-' + orden[0].modelos}`
                  : "Nueva Orden"
                }
              </span>
            </div>
            <hr />
          </div>

          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button:hover]:text-gray-700 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button.active:hover]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${position == 0 && 'active'}`} onClick={() => setPosition(0)} data-estado="ALL">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Ordenes
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 2 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Molde
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 3 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(3)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Hoja de corte
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group ${position == 4 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(4)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Materiales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} onChange={testkey2} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-special">
                {
                  position == 0 && <SeccionOrden info={orden} form={form} setorden={setOrden} setopen={setOpen} openmodal={openModal} fases={fases} materiales={materialesref} dataimg={dataimg} setDataimg={setDataimg} setinsumos={setInsumos} insumos={insumos} requerimientos={requerimientos} setrequerimientos={setRequerimientos}/>
                }
                {
                  position == 2 && <SeccionMolde info={molde} orden={urlparams.id} />
                }
                {
                  position == 3 && <SeccionCorte info={corte} setcorte={setCorte} form={form} setopen={setOpen} openmodal={openModal}/>
                }
                {
                  position == 4 && <SeccionMateriales info={materiales} orden={urlparams.id}/>
                }
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={cancelarorden} type={'button'} tipo={'default'}>Cancelar</Button>
                {/* <Button action={() => printpedido()} type={'button'} tipo={'default'}>Print</Button> */}
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
