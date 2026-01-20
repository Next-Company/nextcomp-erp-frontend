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
import ReviewEstampado from "../estampado/ReviewEstampado"

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

const model = {fracciones_despacho:[
    {concepto:'INGRESO',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0},
    {concepto:'CAIDOS',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0},
    {concepto:'INCOMPLETOS',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad:0},
  ]
}

function CuerpoDespachoTest({position,data,setregistros,registros}){
  const [ingreso,setIngreso] = useState(data.fracciones_despacho.length > 0 ? data : model)
  // const [ingreso,setIngreso] = useState([])
  console.log("Nuevo reenderizado del componente CuerpoDespachoTest", data)
  useEffect(()=>{
    console.log("La info recibida es:",data)
    if(data.fracciones_despacho.length > 0) setIngreso(data)
  },[data])

  const editvalue = (e)=>{
    const grupo = parseInt(e.target.dataset.grupo)
    const name = e.target.dataset.name
    const value = parseInt(e.target.value)
    // setData([...data.map((row,key)=> key == parseInt(position) ? {...row,[name]:parseInt(e.target.value)} : row)])
    console.log("Dentro de la edicion de cantidades despachos",grupo,name,value)
    
    setregistros(registros.map((row,key)=>key == position 
      ? {...row,fracciones_despacho: row.fracciones_despacho.length > 0
        ? row.fracciones_despacho.map((row2,key2)=>key2 == grupo ? {...row2,[name]:value} : row2) 
        : model.fracciones_despacho.map((row2,key2)=>key2 == grupo ? {...row2,[name]:value} : row2)
        } 
      : row))
    // console.log("INfo del reduce :",ingreso.despachos[0].fracciones.filter(row=>row.talla == 'xs'))
  }
  console.log("INfo del mango :",data)
  // console.log("INfo del reduce :",Object.values(data.despachos[0].fracciones.filter(row=>row.talla == 'xs')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0)) 
  return(
    <>
    <div className="scrollbar-special overflow-y-scroll mt-2 mb-2">
      <div className="flex flex-row justify-between px-4 rounded-lg bg-cyan-100 p-1 h-[40px] items-center"><strong>{data.articulo}</strong><strong className="italic text-[20px]">{data.cantidad}</strong></div>
      {/* <div className="flex flex-row justify-center bg-cyan-100 p-1 h-[40px] items-center"><strong>{data.articulo}</strong></div> */}
      {/* <div className="flex flex-row justify-center bg-cyan-100 p-1"><strong></strong><strong>{data.cantidad}</strong></div> */}
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
            <th className="lg:table-cell">CantidadIngreso</th>
            {/* <th className="lg:table-cell">Acciones</th> */}
          </tr>
        </thead>
        <tbody>
          {
            ingreso.fracciones_despacho.map((row,key)=>(
              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent h-[45px]">
                <td><input type="text" onChange={editvalue} data-name="color_combo" data-grupo={key} value={row.concepto} /></td>
                <td><input data-name="xs" type="number" onChange={editvalue} data-grupo={key}  value={row.xs}/></td>
                <td><input data-name="s" type="number" onChange={editvalue} data-grupo={key} value={row.s}/></td>
                <td><input data-name="m" type="number" onChange={editvalue} data-grupo={key} value={row.m}/></td>
                <td><input data-name="l" type="number" onChange={editvalue} data-grupo={key} value={row.l}/></td>
                <td><input data-name="xl" type="number" onChange={editvalue} data-grupo={key}  value={row.xl}/></td>
                <td><input data-name="xxl" type="number" onChange={editvalue} data-grupo={key} value={row.xxl}/></td>
                <td><input data-name="cantidad" type="number" onChange={(editvalue)} data-grupo={key}  value={['xs','s','m','l','xl','xxl'].reduce((c,v)=>{
                  c += row[v] ?? 0
                  return c
                },0)}/></td>
                {/* <td><input data-name="cantidad" type="number" onChange={(editvalue)} data-grupo={key}  value={row.cantidad}/></td> */}
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr className="h-[45px] font-bold">
            <td>SUBTOTAL:</td>
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xs),0)}</td>
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.s),0)}</td>
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.m),0)}</td>
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.l),0)}</td>
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xl),0)}</td>
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xxl),0)}</td>
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xs)+parseInt(v.s)+parseInt(v.m)+parseInt(v.l)+parseInt(v.xl)+parseInt(v.xxl),0)}</td>
          </tr>
          <tr className="h-[45px] font-bold">
            <td>SALDO:</td>
            {/* <td>{ingreso.despachos.reduce((c,v)=>c+Object.values(v.fracciones.filter(row=>row.talla == 'xs')[0]).reduce((c2,v2)=>c2+v2[1]+v2[2]+v2[3],0),0)}</td> */}
            <td>{(data.fracciones.filter(row=>row.talla == 'xs')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'xs')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0) ,0) : 0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 's')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 's')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0) ,0) : 0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'm')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'm')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0) ,0) : 0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'l')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'l')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0) ,0) : 0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'xl')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'xl')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0) ,0) : 0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'xxl')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'xxl')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0) ,0) : 0)}</td>
            <td>{data.fracciones.reduce((c,v)=>c+v.cantidad,0) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? v1.fracciones.reduce((c,v)=>c + v.caidos + v.despachos + v.incompletos,0) : 0 ),0) : 0)}</td>
          </tr>
          <tr className="h-[45px] font-bold">
            <td>DIFERENCIA:</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'xs')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'xs')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xs),0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 's')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 's')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.s),0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'm')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'm')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.m),0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'l')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'l')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.l),0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'xl')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'xl')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xl),0)}</td>
            <td>{(data.fracciones.filter(row=>row.talla == 'xxl')[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == 'xxl')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xxl),0)}</td>
            <td>{data.fracciones.reduce((c,v)=>c+v.cantidad,0) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? v1.fracciones.reduce((c,v)=>c + v.caidos + v.despachos + v.incompletos,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v.xs)+parseInt(v.s)+parseInt(v.m)+parseInt(v.l)+parseInt(v.xl)+parseInt(v.xxl),0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    </>
  )
}

function CuerpoIngresos({registros,setregistros,setopen}){
  const [copia,setCopia] = useState([])
  useEffect(()=>{
    console.log("Imprimierdo mi primer efecto",registros)
    setCopia(JSON.parse(JSON.stringify(registros)).reduce((c,v)=>{
      if(v.fracciones_despacho.length > 0){
        v.fracciones_despacho = [
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.cantidad
            return cc
          },{concepto:'INGRESO'}),
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.caidos
            return cc
          },{concepto:'CAIDOS'}),
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.incompletos
            return cc
          },{concepto:'INCOMPLETOS'}),
        ]
      }
      c.push(v)
      return c
    },[]))
  },[])
  // console.log("La info de la copia es :",copia)
  const actualizar = ()=>{
    // if(1){
    //   toast.error('No se han realizado cambios en el despacho. Por favor verifique.', { theme: "colored" })
    //   return 0
    // }
    console.log("Banana:",copia)
    const kk = copia.map(row=>
      ({...row,
        despacho:row.fracciones_despacho.length > 0 
            ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt(row.fracciones_despacho[0][v]),0) 
            : 0,
        caidos:row.fracciones_despacho.length > 0 
            ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt((row.fracciones_despacho[1])[v]),0) 
            : 0,
        incompletos:row.fracciones_despacho.length > 0 
            ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt((row.fracciones_despacho[2])[v]),0) 
            : 0,
        fracciones_despacho: row.fracciones_despacho.length > 0
        ? ['xs','s','m','l','xl','xxl'].map(item=>({talla:item,cantidad:row.fracciones_despacho[0][item],caidos:row.fracciones_despacho[1][item],incompletos:row.fracciones_despacho[2][item]}))
        : []
      }))
      console.log("Enoelmaiz :",kk)

    // setregistros(reg=>[...reg.filter((row,key)=>row.id_combo !== kk[0].id_combo),kk[0]])
    setregistros(reg=>reg.map((row,key)=>{
      // return row.id_combo === kk[0].id_combo ? {...row,fracciones_despacho:kk[0].fracciones_despacho} : row 
      return row.id_combo == kk[0].id_combo ? kk[0] : row 
    }))
    setopen(false)
  }
  return(
    <>
      <div className="flex flex-col w-[1100px] h-[500px]">
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
function CuerpoIngresosXPQ({registros,setregistros,setopen}){
  const [copia,setCopia] = useState([])
  useEffect(()=>{
    console.log("Imprimierdo mi primer efecto",registros)
    setCopia(JSON.parse(JSON.stringify(registros)).reduce((c,v)=>{
      if(v.fracciones_despacho.length > 0){
        v.fracciones_despacho = [
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.cantidad
            return cc
          },{concepto:'INGRESO'}),
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.caidos
            return cc
          },{concepto:'CAIDOS'}),
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.incompletos
            return cc
          },{concepto:'INCOMPLETOS'}),
        ]
      }
      c.push(v)
      return c
    },[]))
  },[])
  // console.log("La info de la copia es :",copia)
  const actualizar = ()=>{
    console.log("Banana:",copia)
    const kk = copia.map(row=>
      ({...row,
        despacho:row.fracciones_despacho.length > 0 
            ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt(row.fracciones_despacho[0][v]),0) 
            : 0,
        caidos:row.fracciones_despacho.length > 0 
            ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt((row.fracciones_despacho[1])[v]),0) 
            : 0,
        incompletos:row.fracciones_despacho.length > 0 
            ? ['xs','s','m','l','xl','xxl'].reduce((c,v)=>c+parseInt((row.fracciones_despacho[2])[v]),0) 
            : 0,
        fracciones_despacho: row.fracciones_despacho.length > 0
        ? ['xs','s','m','l','xl','xxl'].map(item=>({talla:item,cantidad:row.fracciones_despacho[0][item],caidos:row.fracciones_despacho[1][item],incompletos:row.fracciones_despacho[2][item]}))
        : []
      }))
      console.log("Enoelmaiz :",kk)

    setregistros(reg=>reg.map((row,key)=>{
      return row.id_item == kk[0].id_item ? kk[0] : row 
    }))
    setopen(false)
  }
  return(
    <>
      <div className="flex flex-col w-[1100px] h-[500px]">
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

export default function NewDespacho() {
  // const [estampado,setEstampado] = useState([])
  const [tipo, setTipo] = useState(2)
  const urlparams = useParams()
  const [info, setInfo] = useState({ idx: null, tipo: '', fec_despacho: '', fec_emision_guia: '', ruc: '', id_pedido_origen: '', nro_pedido_origen: '', id_guia_origen: '', nro_guia_origen: '', id_proveedor_CAB: '', proveedor: '', responsable: '', nro_guia: '', facturado:'1', fase:'1', distribucion: 'TLL', subtipo:'' })
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros, setRegistros] = useState([])
  const [facturas, setFacturas] = useState([])
  const [panelactive, setPanelActive] = useState(0)
  const navigate = useNavigate()

  const onsubmit = (e) => {
    e.preventDefault()
    const fase = parseInt(form.current.elements.fase.value)
    console.log("La otra info del formulario es:",info)
    console.log("Los datos del formulario son:", registros)
    // console.log("El estado de la fase es:",form.current.elements.fase.value)
    if(registros.length > 0 && tipo == 2 && fase == 0){
      if(registros.filter(row=>row.fracciones_despacho.length > 0).length > 0){
        toast.error('Si piensa registrar algún despacho seleccione primero la fase de despacho.', { theme: "colored" })
        return 0
      }
      if (registros.map(row => row.despacho ?? 0).reduce((a, b) => a + b) > 0 || registros.map(row => row.caidos ?? 0).reduce((a, b) => a + b) > 0 || registros.map(row => row.incompletos ?? 0).reduce((a, b) => a + b) > 0) {
        toast.error('Si piensa registrar algún despacho seleccione primero la fase de despacho.', { theme: "colored" })
        return 0
      }
    }
    if(tipo == 1 && registros.reduce((c,v)=>c + (v.despacho ?? 0),0) <= 0){
      toast.error('No ha registro ningún importe de ingreso. Por favor verifique.', { theme: "colored" })
      return 0
    }

    if(registros.length > 0 && tipo == 2 && fase == 1){
      if(registros.filter(row=>row.fracciones_despacho.length > 0).length == 0){
        // toast.error('No se puede guardar un despacho sin despachar ninguna cantidad!!', { theme: "colored" })
        // return 0
      }
      if (registros.map(row => row.despacho ?? 0).reduce((a, b) => a + b) == 0 && registros.map(row => row.caidos ?? 0).reduce((a, b) => a + b) == 0 && registros.map(row => row.incompletos ?? 0).reduce((a, b) => a + b) == 0) {
        // toast.error('No se puede guardar un despacho sin despachar ninguna cantidad!!', { theme: "colored" })
        // return 0
      }
    }
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
        data.append('detalle', fase ? JSON.stringify(registros.filter(row => (row.despacho ?? 0) > 0 || (row.caidos ?? 0) > 0 || (row.incompletos ?? 0) > 0)) : JSON.stringify(registros))
        data.append('facturas', JSON.stringify(facturas))
        data.append('subtipo', info.subtipo)

        // const ruta = tipo == 1 ? 'produccion/guardardespachopedido/' : (info.distribucion !== 'PQT' ? 'produccion/guardardespachoguia/' : 'produccion/guardardespachoguiaxpq/')
        const ruta = (tipo == 1 ? 'produccion/guardardespachopedido/' : {'PQT':'produccion/guardardespachoguia/','TLL':'produccion/guardardespachoguia/','GLB':'produccion/guardardespachoguiaglb/'}[info.distribucion])
        await Consulta({
          // url: 'produccion/guardardespacho/', params: {
          url: ruta, params: {
            method: 'PUT',
            body: data
          }
        })
          .then(resp => {
            console.log("Info respues:",resp)
            setOpenloader(false)
            if(resp.ok){
              navigate('/main/despachos/')
              toast.success(resp.message, { theme: "colored" })
            }else{
              toast.error(resp.message, { theme: "colored" })  
            }
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

        console.log("Los registros enviados a la modal son lo siguientes:", registros[position])
        openModal({
          open: true,
          header: false,
          controls: false,
          content: <CuerpoIngresosXPQ registros={[registros[position]]} setregistros={setRegistros} setopen={setOpen}/>,
          action: async () => {}
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
            setInfo(info => ({ ...info, id_guia_origen: item.idx, nro_guia_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor, distribucion: item.distribucion }))
            console.log("Los registros de la guia son:", resp[1])
            // setRegistros(resp[1].map(row => ({ ...row, despacho: 0, caidos: 0 })))
            setRegistros(resp[1].map(row => {
              row = { ...row, id_item: row.idx, despacho: 0, caidos: 0, incompletos: 0 }
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
      controls: false,
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
        console.log("La informacion del encabezado es: ",item)
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
            console.log("Respuesta info pedido:",resp)
            // setInfo(info => ({ ...info, id_pedido_origen: item.idx, nro_pedido_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor }))
            setInfo(info => ({ ...info, id_pedido_origen: item.idx, nro_pedido_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor,subtipo:resp[0].tipo}))

            // setRegistros([...registros, ...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
            //   row = { ...row, id_item: row.idx }
            //   Reflect.deleteProperty(row, 'idx')
            //   return row
            // })])
            if((info.id_pedido_origen ?? 0) !== item.idx){
              setRegistros(resp[1].map(row => {
                row = { ...row, id_item: row.idx }
                Reflect.deleteProperty(row, 'idx')
                return row
              }))
            }else{
              setRegistros([...resp[1].filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
                row = { ...row, id_item: row.idx }
                Reflect.deleteProperty(row, 'idx')
                return row
              })])
            }

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
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
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
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
                </div>
                <hr/> 
                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'distribucion'} defaults={Object.keys(info).length > 0 ? info.distribucion : null} type="hidden" />
                  <InputSelect title={'OrigenDespacho'} formref={form} name={"tipo"} data={
                    [
                      { indice: 'SERVICIOS', option: 'SERVICIOS', selected: true },
                      { indice: 'PEDIDOS', option: 'PEDIDOS' },
                      { indice: 'MUESTRA_PROTOTIPO', option: 'MUESTRA_PROTOTIPO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.tipo : null}
                    placeholder="Texto complementario"
                  />
                  <Input name={'fec_despacho'} defaults={Object.keys(info).length > 0 && info.fec_despacho ? info.fec_despacho : null} title="FechaEmisionIngreso" type="date" placeholder="Texto complementario"/>
                  <Input name={'fec_emision_guia'} defaults={Object.keys(info).length > 0 && info.fec_emision_guia ? info.fec_emision_guia : null} title="FechaEmisionGuia" type="date" placeholder="Texto complementario"/>
                  <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                  {
                    tipo == 1
                      ?
                      <>
                        <Input name={'id_pedido_origen'} defaults={Object.keys(info).length > 0 ? info.id_pedido_origen : null} type="hidden" placeholder="Texto complementario"/>
                        <Input name={'nro_pedido_origen'} title={`${tipo == 1 ? 'IdPedido' : (tipo == 2 ? 'IdServicio' : 'IdMuestra')}`} defaults={Object.keys(info).length > 0 ? info.nro_pedido_origen : null} type="text" action={searchpedido} mode={'static'} placeholder="Texto complementario"/>
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
                  <div className="w-[500px]">
                    <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} placeholder="Texto complementario"/>
                  </div>
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="Recepcionado Por" type="text" placeholder="Texto complementario"/>
                  <Input name={'nro_guia'} defaults={Object.keys(info).length > 0 && info.nro_guia ? info.nro_guia : null} title="NroGuiaReferencia" type="text" placeholder="Texto complementario"/>
                  <InputSelect title={'EsFacturado'} name={"facturado"} data={
                    [
                      { indice: '1', option: 'SI', selected: true },
                      { indice: '0', option: 'NO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.facturado : null}
                    placeholder="Texto complementario"
                  />
                  <InputSelect title={'Fase'} name={"fase"} data={
                    [
                      { indice: '1', option: 'INGRESO', selected: true },
                      { indice: '0', option: 'CONTEO' },
                    ]}
                    df={Object.keys(info).length > 0 ? info.fase : null}
                    placeholder="Texto complementario"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
                </div>
                <hr/> 
                <div>
                  <div className="flex flex-row justify-center">
                    <div className="flex flex-row justify-between p-1 bg-gray-200 rounded-l-full rounded-r-full relative">
                      <div className={`w-[250px] h-[14px] text-center text-[9px] rounded-l-full rounded-r-full ${!panelactive ? 'bg-green-600' : 'bg-red-600 translate-x-full'} transition-all cursor-pointer absolute`}></div>
                      <div className={`w-[250px] text-center text-[9px] rounded-l-full rounded-r-full cursor-pointer z-10 ${!panelactive && 'text-white'} transition-all`} onClick={changepanel} data-position="0">Artículos</div>
                      <div className={`w-[250px] text-center text-[9px] rounded-l-full rounded-r-full  cursor-pointer z-10 ${panelactive && 'text-white'} transition-all`} onClick={changepanel} data-position="1">Facturas</div>
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
                                      <td>{row.xs}</td>
                                      <td>{row.s}</td>
                                      <td>{row.m}</td>
                                      <td>{row.l}</td>
                                      <td>{row.xl}</td>
                                      <td>{row.xxl}</td>
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
                                      <td className="w-[150px]"><input type="number" onChange={editvalue} data-position={key} step={0.01} data-name="despacho" defaultValue={row.despacho ?? 0} /></td>
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
                                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={tipo == 2 ? onclick : ()=>{}} data-position={key} data-combo={row.id_combo}>
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
                                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}} data-position={key}>
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
                                <div onClick={nuevoregistro} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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
      {/* </div> */}
    </>
  )
}
