import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Proveedores from "../../components/Common/Proveedores"
import Guias from "../../components/Common/Guias"
import Pedidos from "../../components/Common/Pedidos"

const colorfase = {
  'CONFECCION': 'bg-purple-500',
  'ESTAMPADO': 'bg-gray-500',
  'ACABADOS': 'bg-red-500',
  'LAVANDERIA': 'bg-green-500',
  'MOLDES': 'bg-orange-500',
  'OJAL BOTON': 'bg-blue-500',
  'CORTE': 'bg-rose-400',
  'BORDADO': 'bg-yellow-500',
}

const model = {fracciones:[
    {concepto:'INGRESO',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0},
    {concepto:'CAIDOS',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0},
  ]
}

function CuerpoDespachoTest({position,data,setregistros,registros}){
  const [ingreso,setIngreso] = useState(data.fracciones.length > 0 ? data : model)
  console.log("Nuevo reenderizado del componente CuerpoDespachoTest")
  useEffect(()=>{
    console.log("La info recibida es:",data)
    if(data.fracciones.length > 0) setIngreso(data)
  },[data])

  const editvalue = (e)=>{
    let grupo = parseInt(e.target.dataset.grupo)
    let name = e.target.dataset.name
    let value = parseInt(e.target.value)
    // setData([...data.map((row,key)=> key == parseInt(position) ? {...row,[name]:parseInt(e.target.value)} : row)])
    console.log("Dentro de la edicion de cantidades despachos",grupo,name,value)
    
    setregistros(registros.map((row,key)=>key == position 
      ? {...row,fracciones: row.fracciones.length > 0
        ? row.fracciones.map((row2,key2)=>key2 == grupo ? {...row2,[name]:value} : row2) 
        : model.fracciones.map((row2,key2)=>key2 == grupo ? {...row2,[name]:value} : row2)
        } 
      : row))
  }
  return(
    <>
    <div className="scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] mt-2">
      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
        <thead className="text-left sticky top-0 bg-white">
          <tr>
            <th className="lg:table-cell">Concepto</th>  
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
            ingreso.fracciones.map((row,key)=>(
              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                <td><input type="text" onChange={editvalue} data-name="color_combo" data-grupo={key} value={row.concepto} /></td>
                <td><input data-name="xs" type="number" onChange={editvalue} data-grupo={key} value={row.xs}/></td>
                <td><input data-name="s" type="number" onChange={editvalue} data-grupo={key} value={row.s}/></td>
                <td><input data-name="m" type="number" onChange={editvalue} data-grupo={key} value={row.m}/></td>
                <td><input data-name="l" type="number" onChange={editvalue} data-grupo={key} value={row.l}/></td>
                <td><input data-name="xl" type="number" onChange={editvalue} data-grupo={key} value={row.xl}/></td>
                <td><input data-name="xxl" type="number" onChange={editvalue} data-grupo={key} value={row.xxl}/></td>
                <td><input data-name="cantidad" type="number" onChange={(editvalue)} data-grupo={key} value={0}/></td>
                <td className="">
                  <ul className="flex flex-row justify-end">
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete_combo_orden" data-position={key} data-id={0}>
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
      </table>
    </div>

    </>
  )
}

function CuerpoIngresos({registros,setregistros,setopen}){
  const [copia,setCopia] = useState([])
  useEffect(()=>{
    console.log("Imprimierdo mi primer efecto")
    setCopia(registros)
  },[])
  console.log("La info de la copia es :",copia)
  const actualizar = ()=>{
    // console.log("El calculado es:", ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt(copia[0].fracciones[0][v]),0),copia[0].fracciones[0],copia[0].fracciones[0]['s'])
    // let pp = copia.map(row=>row.fracciones[0])
    // console.log("Valor del map :",pp)
    setregistros(copia.map(row=>({...row,despacho:row.fracciones.length > 0 ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt(row.fracciones[0][v]),0) : 0,caidos:row.fracciones.length > 0 ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt((row.fracciones[1])[v]),0) : 0})))
    setopen(false)
  }
  return(
    <>
      <div className="flex flex-col w-[1200px] h-[650px]">
        <div className="flex-1 overflow-y-auto scrollbar-special ">
        {
          copia.length > 0 && copia.map((row,key)=><CuerpoDespachoTest position={key} data={row} setregistros={setCopia} registros={copia}/>)
        }
        </div>
        <div className="p-2 flex flex-row justify-end gap-2">
          <Button tipo={'default'} type={'button'} action={()=>setopen(false)}>Cancelar</Button>
          <Button tipo={'default'} type={'button'} action={actualizar}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}

function CuerpoCorte({info,setcorte,position,quitar,form}){
  console.log("El chapuloin colorado 2: ",info)
  const [active,setActive] = useState(1)
  const [data,setData] = useState([
    {concepto:'INGRESSOS','xs':0,'s':0,'m':0,'l':0,'xl':0,'xxl':0},
    {concepto:'CAIDOS','xs':0,'s':0,'m':0,'l':0,'xl':0,'xxl':0},
  ])
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
    console.log("La informacion del corte es:",indice,id,name)

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
    <div key={position} className="w-[1100px]">
      {/* <InputTest name={'numero_corte'} defaults={Object.keys(info).length > 0 && info.numero_corte ? info.numero_corte : null} title="#HojaCorte" type="text" /> */}
      <ul className="list-none [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button]:w-full [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50 relative">
        <div className="relative">
          <button type="button" className={`group active`} data-estado={0} onClick={()=>setActive(active*-1)}>
            <span className="relative h-[100%] w-full flex items-center justify-between pointer-events-none">
              <div># LENCERIA ELENEX BALDUR HUMO</div>
              <div>XS: 33</div>
              <div>S: 33</div>
              <div>M: 33</div>
              <div>L: 33</div>
              <div>XL: 33</div>
              <div>XXL: 33</div>
              
              {/* # HojaCorte {Object.keys(info).length > 0 && info.numero_corte ? info.numero_corte : ''} */}
              <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
            </span>
          </button>
        </div>
      </ul>
      {/* /////////////////// */}
      <div id="cuerpo_ingresos" data-position={position} className={`flex-1 scrollbar-special overflow-y-scroll ${active == -1 ? 'h-0' : 'h-[200px]'} transition-all`}>
        <div className="p-2">
          <div className="scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] mt-2">
            <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
              <thead className="text-left sticky top-0 bg-white">
                <tr>
                  <th className="lg:table-cell">Concepto</th>  
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
                  data.length > 0 && data.map((row,key)=>(
                    <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                      <td><input type="text" onChange={editvalue} data-name="color_combo" data-position={key} value={row.concepto} /></td>
                      <td><input data-name="xs" type="number" onChange={editvalue} data-position={key} value={row.xs}/></td>
                      <td><input data-name="s" type="number" onChange={editvalue} data-position={key} value={row.s}/></td>
                      <td><input data-name="m" type="number" onChange={editvalue} data-position={key} value={row.m}/></td>
                      <td><input data-name="l" type="number" onChange={editvalue} data-position={key} value={row.l}/></td>
                      <td><input data-name="xl" type="number" onChange={editvalue} data-position={key} value={row.xl}/></td>
                      <td><input data-name="xxl" type="number" onChange={editvalue} data-position={key} value={row.xxl}/></td>
                      <td><input data-name="cantidad_combo" type="number" onChange={(editvalue)} data-position={key} value={0}/></td>
                      <td className="">
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
            </table>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  </>
}


export default function NewDespacho() {
  // const [estampado,setEstampado] = useState([])
  const [tipo, setTipo] = useState(2)
  const urlparams = useParams()
  const [info, setInfo] = useState({ idx: null, tipo: '', fec_despacho: '', fec_emision_guia: '', ruc: '', id_pedido_origen: '', nro_pedido_origen: '', id_guia_origen: '', nro_guia_origen: '', id_proveedor_CAB: '', proveedor: '', responsable: '', nro_guia: '', facturado:'1' })
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros, setRegistros] = useState([])
  const [facturas, setFacturas] = useState([])
  const [panelactive, setPanelActive] = useState(0)
  const navigate = useNavigate()

  const onsubmit = (e) => {
    e.preventDefault()
    if(registros.length > 0){
      // if (registros.map(row => row.despacho ?? 0).reduce((a, b) => a + b) == 0 && registros.map(row => row.caidos ?? 0).reduce((a, b) => a + b) == 0) {
      if (registros.map(row => row.despacho ?? 0).reduce((a, b) => a + b) == 0) {
        toast.error('No se puede guardar un despacho sin despachar ninguna cantidad!!', { theme: "colored" })
        return 0
      }
    }
    console.log("Los datos del formulario son:", registros)

    for (const element of form.current.elements) {
      if(['responsable','nro_guia'].includes(element.name) && element.value == ''){
        toast.error(`El campo ${element.name} no ha sido completado. Por favor verifique.`, { theme: "colored" })
        return 0
      }
    }
    if(form.current.elements.facturado.value == 1 && !facturas.length > 0){
      toast.error(`No ha ingresado ningun registro referenta a la factura del proveedor. Por favor verifique.`, { theme: "colored" })
      return 0
    }

    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del despacho ingresado?</div>,
      action: async () => {
        setOpenloader(true)
        const data = new FormData()
        urlparams.id && data.append('id', urlparams.id)
        data.append('info', JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('detalle', JSON.stringify(registros.filter(row => (row.despacho ?? 0) > 0 || (row.caidos ?? 0) > 0)))
        data.append('facturas', JSON.stringify(facturas))

        await Consulta({
          url: 'produccion/guardardespacho/', params: {
            method: 'PUT',
            body: data
          }
        })
          .then(resp => {
            setOpenloader(false)
            // navigate('/main/despachos/')
            toast.success('Estampado guardado con éxito!!', { theme: "colored" })
          })
          .catch((err) => {
            setOpenloader(false)
            // toast.error('Se produjo un error!!', { theme: "colored" })
          })
          .finally(() => {
            setOpenloader(false)
          })
      }
    })
  }
  useEffect(() => {
    const handleInputChange = (event) => {
      // setTipo(event.detail.valor == 'PEDIDOS' ? 1 : 0)
      console.log("Hola Ivon")
      setTipo(event.detail.valor == 'PEDIDOS' ? 1 : (event.detail.valor == 'SERVICIOS' ? 2 : 0))
      setRegistros([])
    };
    form.current.addEventListener("salamandra", handleInputChange);

    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  }, [])
  useEffect(() => {
    if (urlparams.id) {
      setOpenloader(true)
      const pp = async () => {
        await Consulta({ url: 'produccion/despacho/' + urlparams.id, })
          .then(resp => {
            console.log("Los datos del despacho son:", resp)
            setInfo(resp[0])
            setRegistros(resp[1])
            resp[2] && setFacturas(resp[2])
            setTipo(resp[0].tipo == 'PEDIDOS' ? 1 : (resp[0].tipo == 'SERVICIOS' ? 2 : 0))
            setOpenloader(false)
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }
      pp()
    }
    if (urlparams.idmuestra) {
      setOpenloader(true)
      Consulta({ url: 'produccion/guia/' + urlparams.idmuestra })
        .then(resp => {
          setOpenloader(false)
          console.log("Despacho directo:", resp)
          // setInfo(resp[0])
          setTipo(resp[0].tipo)
          setInfo(info => ({ ...info,tipo:resp[0].tipo, id_guia_origen: resp[0].idx, nro_guia_origen: resp[0].idx, id_proveedor_CAB: resp[0].id_proveedor_CAB, proveedor: resp[0].proveedor }))
          // setRegistros([...registros, ...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
          //   row = { ...row, id_item: row.idx }
          //   Reflect.deleteProperty(row, 'idx')
          //   return row
          // })])
          setRegistros(resp[1].map(row => {
            row = { ...row, id_item: row.idx }
            Reflect.deleteProperty(row, 'idx')
            return row
          }))
        })
        .catch((err) => {
          // setOpenloader(false)
        })
        .finally(() => {
          // setOpenloader(false)
        })
    }
  }, [setOpenloader, urlparams])

  const nuevoregistro = () => {
    setFacturas([...facturas, { tipodoc: 1, moneda: 'MN', serie: '', numero: '', fec_emision: '', unidades: 0, importe_bruto: 0, base_imponible: 0, monto_inafecto: 0, igv: 0, importe_total: 0 }])
  }

  const onclick = (e) => {

    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch (action) {
      case 'delete':
        setFacturas(facturas.filter((row, key) => key !== parseInt(position)))
        break;
      case 'edit':
        openModal({
          open: true,
          header: false,
          controls: false,
          content: <CuerpoIngresos registros={registros} setregistros={setRegistros} setopen={setOpen}/>,
          // <div className="h-[600px] overflow-y-auto scrollbar-special">
          //   {/* {
          //     registros.length > 0 && registros.map((row,key)=><CuerpoDespachoTest position={key} data={row} setregistros={setRegistros} registros={registros}/>)
          //   } */}
          // </div>,
          action: async () => {

          }
        })
        break;
      default:
    }

    console.log("La accion seleccionada es la siguiente:", action)

  }
  const editfacturas = (e) => {
    const column = e.target.dataset.name
    const position = e.target.dataset.position
    // console.log("Los nuevos registros son:",[...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'isprototipo' ? e.target.checked : e.target.value)}:item)])
    // setFacturas([...facturas.map((item, key) => position == key ? { ...item, [column]: (column == 'isprototipo' ? e.target.checked : e.target.value) } : item)])
    setFacturas([...facturas.map((item, key) => position == key ? { ...item, [column]: e.target.value } : item)])
  }
  const editvalue = (e) => {
    const column = e.target.dataset.name
    console.log("El campo afectado es el siguiente :", column, "SDSDF : ", e.target.checked)
    const position = e.target.dataset.position
    // let articulo = registros[parseInt(e.target.dataset.position)]
    console.log("Los nuevos registros son:", [...registros.map((item, key) => position == key ? { ...item, [column]: (column == 'isprototipo' ? e.target.checked : e.target.value) } : item)])
    setRegistros([...registros.map((item, key) => position == key ? { ...item, [column]: (column == 'isprototipo' ? e.target.checked : e.target.value) } : item)])
  }

  const nuevoproveedor = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Proveedores actions={(item) => {
        console.log("El item seleccionado es: ", item)
        setInfo(info => ({ ...info, id_proveedor_CAB: item.idx, proveedor: item.nom, ruc: item.ruc }))
        setOpen(false)
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  const searchguia = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Guias actions={(item) => {
        // console.log("El item seleccionado es: ",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'produccion/guia/' + item.idx })
          .then(resp => {
            // console.log("PPPDPDPDPDPDPDPPD:",resp)
            setInfo(info => ({ ...info, id_guia_origen: item.idx, nro_guia_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor }))
            console.log("Los registros de la guia son:", resp[1])
            // setRegistros(resp[1].map(row => ({ ...row, despacho: 0, caidos: 0 })))
            setRegistros(resp[1].map(row => {
              row = { ...row, id_item: row.idx, despacho: 0, caidos: 0 }
              Reflect.deleteProperty(row, 'idx')
              return row
            }))
            // setRegistros(resp[1])
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  const searchmuestra = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Guias tipo={tipo == 2 ? 'SERVICIOS' : 'MUESTRA_PROTOTIPO'} actions={(item) => {
        // console.log("El item seleccionado es: ",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'produccion/guia/' + item.idx })
          .then(resp => {
            setInfo(info => ({ ...info, id_guia_origen: item.idx, nro_guia_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor }))
            // setRegistros(resp[1].map(row => ({ ...row, despacho: 0, caidos: 0 })))
            setRegistros([...registros, ...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
              row = { ...row, id_item: row.idx }
              Reflect.deleteProperty(row, 'idx')
              return row
            })])
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  const searchpedido = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Pedidos actions={(item) => {
        console.log("El pedidos seleccionado matemia es :",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'produccion/pedido/' + item.idx })
          .then(resp => {
            // setInfo(info => ({ ...info, id_pedido_origen: item.idx, nro_pedido_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor }))
            setInfo(info => ({ ...info, id_pedido_origen: item.idx, nro_pedido_origen: item.idx }))
            setRegistros([...registros, ...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
              row = { ...row, id_item: row.idx }
              Reflect.deleteProperty(row, 'idx')
              return row
            })])
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }} />,
      controls: true,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }

  const onchange = (e) => {
    console.log("Cambiando tipo de pedido")
    // console.log("VA o neleet")
    // console.log("Otros cambios adicionales")
  }
  const changepanel = (e) => {
    const position = parseInt(e.target.dataset.position)
    setPanelActive(position)
  }
  useEffect(() => {
    console.log("Los items ingresados son:", registros)
  }, [registros])
  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Ingresos /</h2>
              <span className="text-blue-500 font-bold">Nuevo Ingreso</span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full flex flex-col flex-1 pt-2 overflow-x-hidden">
            <form ref={form} onSubmit={onsubmit} onChange={() => { }} onInputCapture={onchange}>
              <div className={` flex-col gap-3 flex`}>
                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <InputSelect title={'OrigenDespacho'} formref={form} name={"tipo"} data={
                    [
                      { indice: 'SERVICIOS', option: 'SERVICIOS', selected: true },
                      { indice: 'PEDIDOS', option: 'PEDIDOS' },
                      { indice: 'MUESTRA_PROTOTIPO', option: 'MUESTRA_PROTOTIPO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.tipo : null}
                  />
                  <Input name={'fec_despacho'} defaults={Object.keys(info).length > 0 && info.fec_despacho ? info.fec_despacho : null} title="FechaEmisionIngreso" type="date" />
                  <Input name={'fec_emision_guia'} defaults={Object.keys(info).length > 0 && info.fec_emision_guia ? info.fec_emision_guia : null} title="FechaEmisionGuia" type="date" />
                  <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                  {
                    tipo == 1
                      ?
                      <>
                        <Input name={'id_pedido_origen'} defaults={Object.keys(info).length > 0 ? info.id_pedido_origen : null} type="hidden" />
                        <Input name={'nro_pedido_origen'} title={`${tipo == 1 ? 'IdPedido' : (tipo == 2 ? 'IdServicio' : 'IdMuestra')}`} defaults={Object.keys(info).length > 0 ? info.nro_pedido_origen : null} type="text" action={searchpedido} mode={'static'} />
                      </>
                      :
                      <>
                        <Input name={'id_guia_origen'} defaults={Object.keys(info).length > 0 ? info.id_guia_origen : null} type="hidden" />
                        {
                          tipo == 2
                            ?
                            <>
                              <Input name={'nro_guia_origen'} title={`${tipo == 2 ? 'IdServicio' : 'IdMuestra'}`} defaults={Object.keys(info).length > 0 ? info.nro_guia_origen : null} type="text" action={searchguia} mode={'static'} />
                            </>
                            :
                            <>
                              <Input name={'nro_guia_origen'} title={`${tipo == 2 ? 'IdServicio' : 'IdMuestra'}`} defaults={Object.keys(info).length > 0 ? info.nro_guia_origen : null} type="text" action={searchmuestra} mode={'static'} />
                            </>
                        }
                      </>
                  }
                </div>
                <div className="flex gap-3">
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                  <div className="w-[600px]">
                    <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} />
                  </div>
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="Recepcionado Por" type="text" />
                  <Input name={'nro_guia'} defaults={Object.keys(info).length > 0 && info.nro_guia ? info.nro_guia : null} title="NroGuiaReferencia" type="text" />
                  <InputSelect title={'EsFacturado'} name={"facturado"} data={
                    [
                      { indice: '1', option: 'SI', selected: true },
                      { indice: '0', option: 'NO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.facturado : null}
                  />
                </div>
                <div>
                  <div className="flex flex-row justify-center">
                    <div className="flex flex-row justify-between p-1 bg-gray-200 rounded-l-full rounded-r-full relative">
                      <div className={`w-[120px] h-[14px] text-center text-[9px] rounded-l-full rounded-r-full ${!panelactive ? 'bg-green-600' : 'bg-red-600 translate-x-full'} transition-all cursor-pointer absolute`}></div>
                      <div className={`w-[120px] text-center text-[9px] rounded-l-full rounded-r-full cursor-pointer z-10 ${!panelactive && 'text-white'} transition-all`} onClick={changepanel} data-position="0">Artículos</div>
                      <div className={`w-[120px] text-center text-[9px] rounded-l-full rounded-r-full  cursor-pointer z-10 ${panelactive && 'text-white'} transition-all`} onClick={changepanel} data-position="1">Facturas</div>
                    </div>
                  </div>

                  <div className={`w-[200%] h-[400px] ${panelactive && 'translate-x-[-50%]'} flex flex-row transition-all overflow-hidden`}>
                    {/* PANEL ARTICULOS */}
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
                                  <th className="lg:table-cell">XS / 26</th>
                                  <th className="lg:table-cell">S / 28</th>
                                  <th className="lg:table-cell">M / 30</th>
                                  <th className="lg:table-cell">L / 32</th>
                                  <th className="lg:table-cell">XL / 34</th>
                                  <th className="lg:table-cell">XXL / 36</th>
                                  <th className="lg:table-cell">Cantidad</th>
                                  {
                                    !urlparams.id && registros.length > 0 && registros[0].despachos.map((row) => <th className="lg:table-cell"><span className="font-extrabold">{row.fec_despacho}</span></th>)

                                  }
                                  <th className="lg:table-cell">Saldo</th>
                                  <th className="lg:table-cell">Ingreso</th>
                                  <th className="lg:table-cell">Caidos</th>
                                  <th className="lg:table-cell">Acciones</th>
                                </>
                                :
                                <>
                                  <th className="lg:table-cell w-[500px]">Descripción</th>
                                  <th className="lg:table-cell">Color</th>
                                  <th className="lg:table-cell">Rollos</th>
                                  <th className="lg:table-cell">Cantidad</th>
                                  <th className="lg:table-cell">Unidad</th>
                                  <th className="lg:table-cell">Precio</th>
                                  <th className="lg:table-cell">Ingreso</th>
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
                                      <td>{row.xs}</td>
                                      <td>{row.s}</td>
                                      <td>{row.m}</td>
                                      <td>{row.l}</td>
                                      <td>{row.xl}</td>
                                      <td>{row.xxl}</td>
                                      <td>{row.cantidad}</td>
                                      {
                                        !urlparams.id && row.despachos.map(item=><td className="text-blue-600 font-black">{item.cantidad_despacho}</td>)
                                      }
                                      {
                                        !urlparams.id
                                        ? <td>{row.cantidad - row.despachos.reduce((carry,item)=>{
                                          carry += parseFloat(item.cantidad_despacho)
                                          return carry
                                        },0) - row.despacho}</td>
                                        : <td>{row.cantidad - row.despacho}</td>
                                      }
                                      <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="despacho" value={row.despacho ?? 0} /></td>
                                      <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="caidos" value={row.caidos ?? 0} /></td>
                                    </>
                                    :
                                    <>
                                      <td><input type="text" onChange={editvalue} data-name="producto" data-position={key} defaultValue={row.producto} /></td>
                                      <td><input type="text" onChange={editvalue} data-position={key} data-name="color" defaultValue={row.color} /></td>
                                      <td><input type="number" onChange={editvalue} data-position={key} data-name="rollos" defaultValue={row.rollos} /></td>
                                      <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" defaultValue={row.cantidad} /></td>
                                      <td><input type="text" onChange={editvalue} data-position={key} data-name="unidad" defaultValue={row.unidad} /></td>
                                      <td><input type="number" onChange={editvalue} data-position={key} data-name="precio" defaultValue={row.precio} /></td>
                                      <td className="w-[150px]"><input type="number" onChange={editvalue} data-position={key} step={0.01} data-name="despacho" defaultValue={row.despacho ?? 0} /></td>
                                    </>
                                }
                                <td className="w-[250px]">
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
                                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={() => { }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-position={key}>
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
                                <td className="text-center" colSpan={tipo == 1 ? 2 : 9}></td>
                                <td className="text-center"><strong className="text-[14px]">TOTAL:</strong></td>
                                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                                  return carry + parseFloat(value.cantidad)
                                }, 0).toFixed(2)}</td>
                                {
                                  !urlparams.id && registros.length > 0 && registros[0].despachos.map((item,key) => <td className="text-center text-[16px] italic text-blue-600 font-black">{registros.reduce((carry,value)=>{
                                    carry += parseFloat(value.despachos[key].cantidad_despacho)
                                    // carry += 22
                                    return carry
                                  },0)}</td>)
                                }
                                {
                                  !urlparams.id
                                  ? <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                                    return carry + parseFloat(value.cantidad ?? 0) - parseFloat(value.despachos.reduce((carry,item)=>{
                                      carry += parseFloat(item.cantidad_despacho)
                                      return carry
                                    },0)) - parseFloat(value.despacho ?? 0)
                                  }, 0)}</td>
                                  : <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                                    return carry + parseFloat(value.cantidad ?? 0) - parseFloat(value.despacho ?? 0)
                                  }, 0)}</td>
                                }
                                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                                  return carry + parseFloat(value.despacho  ?? 0)
                                }, 0)}</td>
                                <td className="text-center text-[16px] italic">{registros.reduce((carry, value) => {
                                  return carry + parseFloat(value.caidos  ?? 0)
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
                    {/* PANEL FACTURAS */}
                    <div className="flex-1 h-[100%] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2">
                      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                        <thead className="text-left sticky top-0 bg-white">
                          <tr>
                            <th className="lg:table-cell">TipoDoc</th>
                            <th className="lg:table-cell">Moneda</th>
                            <th className="lg:table-cell">Serie</th>
                            <th className="lg:table-cell">Numero</th>
                            <th className="lg:table-cell">FecEmisión</th>
                            <th className="lg:table-cell">TotalUnidades</th>
                            <th className="lg:table-cell">ImporteBruto</th>
                            <th className="lg:table-cell">BaseImponible</th>
                            <th className="lg:table-cell">MontoInafecto</th>
                            <th className="lg:table-cell">Igv</th>
                            <th className="lg:table-cell">MontoTotal</th>
                            <th className="lg:table-cell">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            facturas.length > 0 && facturas.map((row, key) => (
                              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent [&_td]:text-center [&_select]:text-center [&_select]:p-[2px] [&_select]:w-full [&_select]:bg-transparent focus-visible:[&select]:outline-[0px] focus-visible:[&select]:bg-gray-200 focus-visible:[&select]:border-black focus-visible:[&select]:bg-transparent focus:[&_select]:outline-none">
                                <td>
                                  <select onChange={editfacturas} data-name="tipodoc" data-position={key} defaultValue={row.tipodoc}>
                                    <option value="1" selected={row.tipodoc == '1' && true}>FACTURA</option>
                                    <option value="2" selected={row.tipodoc == '2' && true}>NOTA CREDITO</option>
                                    <option value="3" selected={row.tipodoc == '3' && true}>NOTA DEBITO</option>
                                  </select>
                                </td>
                                <td className="w-[100px]">
                                  <select onChange={editfacturas} data-name="moneda" data-position={key} defaultValue={row.moneda}>
                                    <option value="MN" selected={row.tipodoc == 'MN' && true}>SOLES</option>
                                    <option value="USD" selected={row.tipodoc == 'USD' && true}>DOLARES</option>
                                  </select>
                                </td>
                                <td><input type="text" onChange={editfacturas} data-name="serie" data-position={key} defaultValue={row.serie} /></td>
                                <td><input type="text" onChange={editfacturas} data-position={key} data-name="numero" defaultValue={row.numero} /></td>
                                <td><input type="date" onChange={editfacturas} data-position={key} data-name="fec_emision" defaultValue={row.fec_emision} /></td>
                                <td><input type="number" onChange={editfacturas} data-position={key} data-name="unidades" defaultValue={row.unidades} /></td>
                                <td><input type="number" onChange={editfacturas} data-position={key} data-name="importe_bruto" step={0.01} defaultValue={row.importe_bruto} /></td>
                                <td><input type="number" onChange={editfacturas} data-position={key} data-name="base_imponible" step={0.01} defaultValue={row.base_imponible} /></td>
                                <td><input type="number" onChange={editfacturas} data-position={key} data-name="monto_inafecto" step={0.01} defaultValue={row.monto_inafecto} /></td>
                                <td><input type="number" onChange={editfacturas} data-position={key} data-name="igv" step={0.01} defaultValue={row.igv} /></td>
                                <td><input type="number" onChange={editfacturas} data-position={key} data-name="importe_total" step={0.01} defaultValue={row.importe_total} /></td>
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
                                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={() => { }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-position={key}>
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
                          <tr>
                            <td colSpan={12} >
                              <div className="flex flex-row justify-center">
                                <div onClick={nuevoregistro} className="bg-green-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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
                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-2 p-1">
                <div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button action={() => navigate('/main/despachos/')} type={'button'} tipo={'default'}>Cancelar</Button>
                  <Button type={'submit'} tipo={'success'}>Guardar</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}