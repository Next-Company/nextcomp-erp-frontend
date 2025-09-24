import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import { toast } from "react-toastify";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "../../components/Atoms/Input/TextArea";
import Proveedores from "../../components/Common/Proveedores";
import Pedidos from "../../components/Common/Pedidos";
import { InputTest } from "../../components/Atoms/Input/InputTest";
import Rubros from "../../components/Common/Rubros";
import UnidadesMedida from "../../components/Common/Unidades";
import Estilos from "../../components/Common/Estilos";
import Presentacion from "../../components/Common/Presentacion";
import Marca from "../../components/Common/Marca";

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

function CuerpoCorte({info,setcorte,position,quitar,form}){
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
    const id = e.target.dataset.id
    setcorte(corte=>corte.reduce((c,v)=>{
      c.push({...v,combos:v.idx == id ? [...v.combos,{id_hojacorte_CAB:'',color_combo:'',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0}] : v.combos})
      return c
    },[]))
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
                      <td><input type="text" onChange={editvalue} data-name="color_combo" data-position={key} value={row.color_combo} /></td>
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

function SeccionCorte({info,setcorte,form}){
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
        info.length > 0 && info.map((row,key)=><CuerpoCorte info={row} setcorte={setcorte} position={key} quitar={deletecorte2} form={form}/>)
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
        <Input name={'tizado'} defaults={info.length > 0 && info[0].tizado ? info[0].tizado : null} title="Tizado" type="text" />
        <InputSelect title={'Estado'} name={"estado_molde"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: '-', option: 'NO CORRESPONDE' }]} df={info.length > 0 ? info[0].estado_molde : null} />
      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_molde" />
      </div>
    </div>
  </>
}

function SeccionOrden({info,form,setorden,setopen,openmodal,fases,materiales,dataimg,setDataimg}){
  const [tipopedido,setTipopedido] = useState(1)
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
        setorden(orden=>([{...orden[0],PROVEEDORES:item.idx ,proveedor:item.nom.substr(0,49)}]))
        setopen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openmodal(params_modal)
  }
  const nuevorubro = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Rubros actions={(item)=>{  
        setorden(orden=>([{...orden[0],RUBROS:item.idx,rubro:item.nom}]))
        setopen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openmodal(params_modal)
  }
  const nuevaunidad = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <UnidadesMedida actions={(item)=>{
        setorden(orden=>([{...orden[0],codUnidadMedida:item.codigo}]))
        setopen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openmodal(params_modal)
  }
  const nuevoestilo = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Estilos actions={(item)=>{
        setorden(orden=>([{...orden[0],estilo:item.nom}]))
        setopen(false)
      }}/>,
      controls: false,
      header: false,
      action:()=>{
      }
    }
    openmodal(params_modal)
  }
  const nuevapresentacion = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Presentacion actions={(item)=>{
        setorden(orden=>([{...orden[0],presentacion:item.nom}]))
        setopen(false)
      }}/>,
      controls: false,
      header: false,
      action:()=>{
      }
    }
    openmodal(params_modal)
  }
  const nuevamarca = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Marca actions={(item)=>{
        setorden(orden=>([{...orden[0],marca:item.nom}]))
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
  return <>
    <div className={`flex flex-col gap-3 pt-3`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        </div>
        <div className="w-[400px]">
          <InputSelect title={'Tipo'} name={"tipo"} formref={form} data={
            [
              { indice: 'P', option: 'PRODUCTO', selected: true  },
              { indice: 'I', option: 'INSUMO' },
              { indice: 'A', option: 'AVIO' }
            ]} 
            df={Object.keys(info).length > 0 ? info[0].tipo : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
          />
        </div>
        <div className="w-[50%]">
          <Input name={'nom'} title="Nombre" defaults={info.length > 0 ? info[0].nom : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
        </div>
        <div className="w-[60%]">
          <Input name={'det'} title="Detalle" defaults={info.length > 0 ? info[0].det : null} type="text" verify="true" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
      </div>
      {/* <div className="h-[20px]"></div> */}
      <hr className="m-0"/>
      <div className="flex flex-col gap-3">
        <Input name={'RUBROS'} defaults={info.length > 0 ? info[0].RUBROS : null} type="hidden" verify="true"/>
        <div className="w-[35%]">
          <Input name={'rubro'} title="Rubro" defaults={info.length > 0 ? info[0].rubro : null} type="text" action={nuevorubro} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <div className="w-[20%]">
          <Input name={'codUnidadMedida'} title="Medida" defaults={info.length > 0 ? info[0].codUnidadMedida : null} type="text" action={nuevaunidad} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <div className="flex gap-3">
          <div className="w-[24%]">
            <InputSelect title={'Plan'} name={"tipoPlan"} formref={form} data={
              [
                { indice: 'CLA', option: 'CLASICO', selected: true  },
                { indice: 'MOD', option: 'MODA' },
              ]} 
              df={Object.keys(info).length > 0 ? info[0].tipoPlan : null} placeholder={'Seleccione el rubro correpondiente al producto.'} 
            />
          </div>
        </div>
        <div className="w-[25%]">
          <InputSelect title={'Genero'} name={"genero"} formref={form} data={
            [
              { indice: 'CAB', option: 'CABALLERO', selected: true  },
              { indice: 'DAM', option: 'DAMA' },
              { indice: 'NIO', option: 'NIÑO' },
              { indice: 'NIA', option: 'NIÑA' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].genero : null} placeholder={'Seleccione el rubro correpondiente al producto.'}
          />
        </div>
        <div className="w-[35%]">
          <InputSelect title={'Fabricacion'} name={"tipoFabricacion"} formref={form} data={
            [
              { indice: 'PT', option: 'PUNTO', selected: true  },
              { indice: 'PL', option: 'PLANO' },
              { indice: 'FT', option: 'FANTASIA' },
              { indice: 'PC', option: 'PLANO COMPLEMENTO' }
            ]} 
            df={Object.keys(info).length > 0 ? info[0].tipoFabricacion : null} placeholder={'Seleccione el rubro correpondiente al producto.'}
          />
        </div>
        <div className="w-[30%]">
          <InputSelect title={'Temporada'} name={"temporada"} formref={form} data={
            [
              { indice: 'PV', option: 'PRIMAVERA-VERANO', selected: true  },
              { indice: 'OI', option: 'OTOÑO-INVIERNO' },
              { indice: 'TT', option: 'TERMINO TEMPORADA' }
            ]} 
            df={Object.keys(info).length > 0 ? info[0].temporada : null} placeholder={'Seleccione el rubro correpondiente al producto.'}
          />
        </div>
        <div className="w-[35%]">
          <InputSelect title={'TipoProduccion'} name={"tipoProduccion"} formref={form} data={
            [
              { indice: 'NCNL', option: 'NACIONAL', selected: true  },
              { indice: 'IMPT', option: 'IMPORTADO' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].tipoProduccion : null} placeholder={'Seleccione el rubro correpondiente al producto.'}
          />
        </div>
      </div>
      <hr/>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="w-[30%]">
            <Input name={'marca'} title="Marca" defaults={info.length > 0 ? info[0].marca : null} type="text" action={nuevamarca} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
          </div>
        </div>
        <div className="w-[35%]">
          <Input name={'presentacion'} title="Presentacion" defaults={info.length > 0 ? info[0].presentacion : null} type="text" action={nuevapresentacion} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
      </div>
      <div className="w-[24%]">
        <Input name={'modelo'} title="Modelo" defaults={info.length > 0 ? info[0].modelo : null} type="text" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-[20%]">
          <Input name={'estilo'} title="Estilo" defaults={info.length > 0 ? info[0].estilo : null} type="text" action={nuevoestilo} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <div className="w-[18%]">
          <InputSelect title={'Es Fraccionable'} name={"fraccionable"} formref={form} data={
            [
              { indice: '1', option: 'SI', selected: true  },
              { indice: '0', option: 'NO' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].fraccionable : null} placeholder={'Seleccione el rubro correpondiente al producto.'}
          />
        </div>
        <div className="w-[25%]">
          <Input name={'costo'} title="Costo" defaults={info.length > 0 ? info[0].costo : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <Input name={'PROVEEDORES'} defaults={info.length > 0 ? info[0].PROVEEDORES : null} type="hidden" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        <div className="w-[45%]">
          <Input name={'proveedor'} title="Proveedor" defaults={info.length > 0 ? info[0].proveedor : null} type="text" action={nuevoproveedor} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <div className="w-[20%]">
          <Input name={'precio'} title="Precio" defaults={info.length > 0 ? info[0].precio : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
      </div>
      <div className="h-[300px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2">
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
          <thead className="text-left sticky top-0 bg-white">
            <tr>
              <th className="lg:table-cell w-[500px]">Color</th>
              <th className="lg:table-cell">Talla</th>
              <th className="lg:table-cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              info.length > 0 && info[0].combos && info[0].combos.length > 0 && info[0].combos.map((row,key)=>(
                <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                  <td><input type="text" onChange={(editvalue)} data-name="color" data-position={key} value={row.color} /></td>
                  <td><input type="text" onChange={(editvalue)} data-name="talla" data-position={key} value={row.talla} /></td>
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
            <tr className="bg-white">
              <td colSpan={10} >
                <div className="flex flex-row justify-center">
                  <div onClick={()=>{}} className="bg-green-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                    +
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div>
        <TextArea title="Observaciones" name="observaciones_fase_ordenes" />
      </div>
    </div>
  </>
}

export function NewReceta() {
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

  const onsubmit = async (e) => {
    e.preventDefault()
    let url_save = '', method = 'GET'
    let data = undefined

    if(position == 0){
      url_save = urlparams.id ? 'productos/updateProducto' : 'productos/generateProducto'
      method = urlparams.id ? 'PUT' : 'POST'

      // for (const element of form.current.querySelectorAll("input[verify='true']")) {
      //   if(element.tagName == 'INPUT' && element.value == ''){
      //     console.log("El input problematico es :",element)
      //     toast.error('Debe ingresar la información correspondiente al campo seleccionado. Por favor verifique.', { theme: "colored" })
      //     return 0
      //   }
      // }
      // if(form.current.elements['materiales_produccion'].value == '[]' || form.current.elements['materiales_produccion'].value == null){
      //   toast.error('Debe seleccionar al menos un material de produccion.', { theme: "colored" })
      //   return
      // }
      // if(form.current.elements['ruta_proceso'].value == '[]' || form.current.elements['ruta_proceso'].value == null){
      //   toast.error('Debe seleccionar al menos una ruta de proceso.', { theme: "colored" })
      //   return
      // }

      data = new FormData(e.target)
      // dataimg.length > 0 && data.append('filenext', dataimg[0])
      // orden.length > 0 && data.append('combos',JSON.stringify(orden[0].combos))
    }
    if(position == 2){
      url_save = 'ordenes/saveFaseMolde'
      data = new FormData(e.target)
      data.append('id',urlparams.id)
    }
    if(position == 3){
      console.log("Info del corte :",corte)
      url_save = 'ordenes/saveFaseCorte'
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
      content: <div>Desea continuar con el registro de los datos ingresados?</div>,
      action: async () => {
        setOpenloader(true)
        await Consulta({
          url: url_save,
          params: {
            method: method, body: data
          }
        })
        .then(resp => {
          console.log("La informacion recibida es:",resp)
          if(resp.ok){
            // navigate("/main/ordenes/")
            toast.success('Los datos ingresados fueron registrados con éxito!!', { theme: "colored" })
          }else{
            toast.error(resp.message, { theme: "colored" })
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
      }
      if(event.detail.name == 'tipo'){
        setOrden(orden => ([{ ...orden[0], tipo: event.detail.indice}]))
      }
    };
    form.current.addEventListener("salamandra", handleSalamandra);

    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'productos/searchproductobyid/' + urlparams.id,})
          .then(resp => {
            console.log("Mostrando informacion :",resp)

            setOrden(resp)
            // setMolde(resp[1])
            // setCorte(resp[2])
            // setMateriales(resp[3])
            // setFases(resp[4])
            // setMaterialesRef(resp[5])
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
        Consulta({url:'ordenes/getmaterialesproduccion'})  
      ])
      .then(resp=>{
        console.log("El resultado de la consulta es:",resp)
        setFases(resp[0])
        setMaterialesRef(resp[1])
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        setOpenloader(false)
      })
    }
  },[])
  const testkey2 = (e)=>{
    // console.log("El target de testkey2 es:",e.target)
    console.log("Dentro del evento keychange")
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
  }
  const testkey = (e)=>{
    console.log("Dentro de otro evento")
    // console.log("El targe dl evento key es:",e.target.name)
    if(position == 3 && ['numero_corte','fec_emision'].includes(e.target.name)){
      const padre = e.target.closest('div#cuerpo_ingresos')
      const indice = parseInt(padre.dataset.position)
      setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,[e.target.name]:e.target.value} : row))
    }
  }
  const cancelarcreacion = ()=>{
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea descartar los cambios realizados?.<br/> Cualquier modificacion realizada se perderá.</div>,
      action: ()=>{
        navigate('/main/recetas/')
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
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px] pr-1">Recetas /</h2>
              <span className="text-blue-500 font-bold">
                {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].nom + ' ' + orden[0].marca}`
                  : "Nueva Receta"
                }
              </span>
            </div>
            <hr />
          </div>

          <div className="text-left overflow-hidden scrollbar-special h-full flex flex-col flex-1">
            <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button:hover]:text-gray-700 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button.active:hover]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
              <button className={`group ${position == 0 && 'active'}`} onClick={() => setPosition(0)} data-estado="ALL">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Datos principales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
              <button className={`group flex-row items-center gap-1 ${position == 2 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Datos adicionales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} onKeyUp={testkey} onChange={testkey2} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-special">
                {
                  position == 0 && <SeccionOrden info={orden} form={form} setorden={setOrden} setopen={setOpen} openmodal={openModal} fases={fases} materiales={materialesref} dataimg={dataimg} setDataimg={setDataimg}/>
                }
                {
                  position == 2 && <SeccionMolde info={molde} orden={urlparams.id} />
                }
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={cancelarcreacion} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}