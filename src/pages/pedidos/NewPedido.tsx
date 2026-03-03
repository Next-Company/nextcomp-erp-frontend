import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button } from "../../components/Atoms/Button/Button"
import { useContext, useEffect, useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext"
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input"
import { InputSelect } from "../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../components/Atoms/Input/TextArea"
import Proveedores from "../../components/Common/Proveedores"
import Productos from "../../components/Common/Productos"

const CuerpoInforme = ({info,tipo})=>{
  const [ruta,setRuta] = useState("")
  useEffect(()=>{
    console.log("El tipo de pedido es:",tipo)
    const crear = async ()=>{
      // await Consulta({url: `${tipo ? 'produccion/vistapreviapedido/avios' : 'produccion/vistapreviapedido/telas'}`,params:{
      // await Consulta({url: `${tipo ? 'produccion/vistapreviapedidoavios/avios' : 'produccion/vistapreviapedido/telas' }`,params:{
      await Consulta({url: `${tipo ? 'produccion/vistarapidapedidoavios/download' : 'produccion/vistapreviapedido/telas' }`,params:{
        method:'POST',
        body:info
      }})
      .then(resp => {
        console.log("La info del reporte es:",resp)
        const binaryString = window.atob(resp.data);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        const file = window.URL.createObjectURL(new Blob([bytes], {type: "application/pdf"}))
        // console.log("La ruta es:",file)
        setRuta(file)
      })
      .catch((err)=>{
        // setOpenloader(false)
        // toast.error('Se produjo un error!!', { theme: "colored" })
      })
    }
    crear()
  },[])
  return(
    <>
      {/* <iframe src="http://192.168.18.20:4000/produccion/vistapreviapedido/telas" className="w-[21.5cm] h-[60vh]"></iframe> */}
      <iframe src={ruta} className="w-[60vw] h-[80vh]"></iframe>
    </>
  )
}

export default function NewPedido(){
  const [tipo,setTipo] = useState(0)
  const [searchParams,setSearchParams] = useSearchParams()
  const urlparams = useParams()
  const [info,setInfo] = useState({tipo:'TELAS'})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const navigate = useNavigate()

  console.log("Los search params recibidos:",searchParams.get('nombre'))

  const onsubmit = (e)=>{
    e.preventDefault()
    // let condiciones = [{name:'',altura:0,color:'magenta'},{name:'',altura:0,color:'magenta'}]
    console.log("El de talle de fracciones :",registros)
    for(const element of form.current.querySelectorAll("input[verify='true']")){
      if(element && element.value == ''){
        toast.error('Alguno de los campos del formulario son obligatorios. Por favor verifique.', { theme: "colored" })
        return
      }
    }
    if(registros.length == 0){
      toast.error('Debe ingresar al menos un artículo!!', { theme: "colored" })
      return
    }
    // if(tipo == 1 && (registros.filter(row=>parseFloat(row.cantidad) == 0 || parseFloat(row.precio) == 0).length > 0)){
    if(tipo == 1 && registros.filter(row=>parseFloat(row.cantidad) == 0 ).length > 0){
      toast.error('Debe ingresar la cantidad y el precio del articulo.', { theme: "colored" })
      return
    }
    if(tipo == 1 && (registros.filter(row=>parseFloat(row.conversion) == 0).length > 0)){
      toast.error('Debe ingresar el valor de conversión para los articulos ingresados.', { theme: "colored" })
      return
    }

    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del pedido ingresado?</div>,
      action: async () => {
        const data = new FormData()
        urlparams.id && data.append('id',urlparams.id)
        data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('detalle',JSON.stringify(registros))

        console.log("Detalle de la lista de articuos :",registros)
        setOpenloader(true)
        // await Consulta({url:['produccion/guardarpedidotelas/','produccion/guardarpedidoavios/','produccion/guardarpedidoadicionales/'][tipo] tipo ? 'produccion/guardarpedidoavios/' : 'produccion/guardarpedidotelas/',params:{
        await Consulta({url:['produccion/guardarpedidotelas/','produccion/guardarpedidoavios/','produccion/guardarpedidoadicionales/'][tipo],params:{
          method:'PUT',
          body:data
        }})
        .then(resp => {
          console.log("La respuestad del servidor es:",resp)
          setOpenloader(false)
          if(resp.ok){
            navigate('/main/pedidos/')
            toast.success('Nuevo pedido guardado con éxito!!', { theme: "colored" })
          }else{
            toast.error(resp.message, { theme: "colored" })
          }
        })
        .catch((err)=>{
          setOpenloader(false)
          toast.error('Se produjo un error!!', { theme: "colored" })
        })
        .finally(()=>{
          setOpenloader(false)
        })
      }
    })
  }
  useEffect(()=>{
    if(urlparams.id){
      const TIPO_PEDIDO = {'TELAS':0,'AVIOS':1,'ADICIONALES':2}
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/pedido/' + urlparams.id,})
          .then(resp => {
            console.log("Busqueda info pedido:",resp)
            setInfo(resp[0])
            setRegistros(resp[1])
            // setTipo(resp[0].tipo == 'TELAS' ? 0 : 1)
            setTipo(TIPO_PEDIDO[resp[0].tipo])
            setOpenloader(false)
          })
          .catch((err)=>{
            setOpenloader(false)
          })
          .finally(()=>{
            setOpenloader(false)
          })
      }
      pp()
    }else{
      // setOpenloader(true)
      // Consulta({url: 'produccion/nuevopedido'})
      //   .then(resp => {
      //     console.log("Busqueda info pedido:",resp)
      //     setInfo({...info,orden_ref: resp[0].correlativo})
      //     setTipo(resp[0].tipo == 'TELAS' ? 0 : 1)
      //     setOpenloader(false)
      //   })
      //   .catch((err)=>{
      //     setOpenloader(false)
      //   })
    }
    const handleInputChange = (event) => {
      // setTipo(event.detail.valor == 'PEDIDOS' ? 1 : 0)
      console.log("Hola Ivon",event.detail.valor)
      setTipo(event.detail.valor == 'TELAS' ? 0 : (event.detail.valor == 'AVIOS' ? 1 : 2))
      setRegistros([])
    };
    form.current.addEventListener("salamandra", handleInputChange);

    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])

  const searchproducto = ()=>{
    openModal({
      open:true,
      content: <Productos actions={(items)=>{  
        setOpen(false)
        console.log("Los items seleccionados son: ",items)
        setRegistros([
          ...registros,
          ...items.map(row=>({
            item:0,
            id_producto_CAB:row.id_producto_CAB,
            id_subprod_CAB:row.idxsub,
            producto:row.producto,
            modelo:row.modelo,
            corte:row.corte,
            color:row.color,
            rollos:0,
            cantidad:0,
            unidad:'KG',
            conversion:0,
            precio:0,
            idx_color:row.idx_color,
            idx_producto:row.id_producto_CAB,
            idxsub:row.idxsub,
            origen:'automatico'
          }))
        ])
        // setRegistros([
        //   ...registros,
        //   ...items.map(row=>({
        //     item:0,
        //     id_producto_CAB:row.idxsub,
        //     producto:row.producto,
        //     modelo:row.modelo,
        //     corte:row.corte,
        //     color:row.color,
        //     rollos:0,
        //     cantidad:0,
        //     unidad:'KG',
        //     conversion:0,
        //     precio:0,
        //     idx_color:row.idx_color,
        //     idx_producto:row.id_producto_CAB,
        //     idxsub:row.idxsub,
        //     origen:'automatico'
        //   }))
        // ])
      }}
        closemodal={()=>setOpen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
  }
  const nuevoproducto = ()=>{
    setRegistros([...registros,{item:0,id_producto_CAB:'',producto:'',modelo:'',corte:'',color:'',rollos:0,cantidad:0,unidad:'KG',precio:0,origen:'manual'}])
    // if(tipo == 1){
    //   setRegistros([...registros,{item:0,id_producto_CAB:'',producto:'',modelo:'',corte:'',color:'',rollos:0,cantidad:0,unidad:'KG',precio:0}])
    // }else{
    //   openModal({
    //     open:true,
    //     content: <Productos actions={(items)=>{  
    //       setOpen(false)
    //       setRegistros([...registros,...items.map(row=>({item:0,id_producto_CAB:row.idxsub,producto:row.producto,modelo:row.modelo,corte:row.corte,color:row.color,rollos:0,cantidad:0,unidad:'KG',precio:0}))])
    //     }}
    //       closemodal={()=>setOpen(false)}
    //     />,
    //     controls: false,
    //     header: false,
    //     action:async ()=>{
    //     }
    //   })
    // }
  }

  const onclick = (e)=>{
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch(action){
      case 'delete':
        setRegistros(registros.filter((row,key)=>key !== parseInt(position) ))
        console.log("Eliminado registros de la fila ",position)
        break;
      case 'clone':{
        if(tipo == 0){
          const copia = registros.filter((row,key)=>key == parseInt(position))[0]
          // setRegistros(registros.filter((row,key)=>key !== parseInt(position) ))
          setRegistros([...registros,copia])
        }
        break;
      }
      default :
    }
  }
  const editvalue = (e)=>{
    const column = e.target.dataset.name
    const position = e.target.dataset.position
  
    if(tipo == 0){
      if(column == 'color'){
        setRegistros([...registros.map((item,key)=> position == key ? {...item, color: e.target.value, idx_color:'', id_producto_CAB:''}:item)])
      } else if(column == 'producto'){
        setRegistros([...registros.map((item,key)=> position == key ? {...item, producto: e.target.value, idx_producto:''}:item)])
      } else{
        setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'anulado' ? e.target.checked : e.target.value)}:item)])
      }
    }else{
      setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'anulado' ? e.target.checked : e.target.value)}:item)])
    }
    
  }
  const nuevoproveedor = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Proveedores actions={(item)=>{  
        console.log("El item seleccionado es: ",item)
        setInfo(info=>({...info,id_proveedor_CAB:item.idx,proveedor:item.nom,ruc:item.ruc}))
        setOpen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{
      }
    }
    openModal(params_modal)
  }

  const vistaprevia = async ()=>{
    const data = new FormData()

    console.log("INfo form",Object.fromEntries(new FormData(form.current)))
    // urlparams.id && data.append('id',urlparams.id)
    data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
    data.append('detalle',JSON.stringify(registros))
    // data.append('tipo',`${tipo}`)

    const params_modal = {
      open:true,
      content: <CuerpoInforme info={data} tipo={tipo} />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    }
    openModal(params_modal)   
  }
  const listafacturas = async ()=>{
    const data = new FormData()
    data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
    data.append('detalle',JSON.stringify(registros))
    const params_modal = {
      open:true,
      content: <CuerpoInforme info={data} tipo={tipo} />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    }
    openModal(params_modal)   
  }
  return(
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Pedidos /</h2>
              <span className="text-blue-500 font-bold">
                Nuevo pedido
                {/* {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].oc + '-' + orden[0].producto + '-' + orden[0].base + '-' + orden[0].modelos}`
                  : "Nueva Orden"
                } */}
              </span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full flex flex-col flex-1 pt-2">

            <form ref={form} onSubmit={onsubmit} onChange={()=>{}} onInputCapture={onchange}>
              <div className={` flex-col gap-3 flex`}>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
                </div>
                <hr/> 
                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'orden_ref'} defaults={Object.keys(info).length > 0 && info.orden_ref ? info.orden_ref : null} title="NroOrden" type="hidden" />
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden"/>
                  <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} verify="true" placeholder="Nuevo proveedor" />
                  <Input name={'fec_emision'} defaults={Object.keys(info).length > 0 && info.fec_emision ? info.fec_emision : null} title="FechaEmisión" type="date" verify="true" placeholder="Texto complementario"/>
                  {/* <Input name={'proveedor'} defaults={Object.keys(info).length > 0 && info.proveedor ? info.proveedor : null} title="Proveedor" type="text" /> */}
                  <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                  <Input name={'fec_retorno'} defaults={Object.keys(info).length > 0 && info.fec_retorno ? info.fec_retorno : null} title="FechaEntrega" type="date" verify="true" placeholder="Texto complementario"/>
                  <InputSelect title={'Emisor'} name={"emisor"} data={
                    [
                      { indice: 'NEXT', option: 'NEXT', selected: true }, 
                      { indice: 'ELENEX', option: 'ELENEXT' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.tipo : null} 
                    placeholder={'Info referencial'}
                  />
                </div>
                <div className="flex gap-3">
                  <Input name={'forma_pago'} defaults={Object.keys(info).length > 0 && info.forma_pago ? info.forma_pago : null} title="FormaPago" type="text" verify="true" placeholder={'Info referencial'}/>
                  <InputSelect title={'TipoPedido'} formref={form} name={"tipo"} data={
                    [
                      { indice: 'TELAS', option: 'TELAS', selected: true }, 
                      { indice: 'AVIOS', option: 'AVIOS' }, 
                      { indice: 'ADICIONALES', option: 'ADICIONALES' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.tipo : null} 
                    placeholder={'Info referencial'}
                  />
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="GiradoPor" type="text" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'nro_contacto'} defaults={Object.keys(info).length > 0 && info.nro_contacto ? info.nro_contacto : null} title="NroContacto" type="text" verify="true" placeholder={'Info referencial'}/>
                  <Input name={'produccion'} defaults={Object.keys(info).length > 0 && info.produccion ? info.produccion : null} title="Produccion" type="text" placeholder={'Info referencial'}/>
                </div>
                <div className="flex gap-3">
                  <InputSelect title={'Moneda'} name={"moneda"} data={
                    [
                      { indice: 'S', option: 'SOLES', selected: true }, 
                      { indice: 'USD', option: 'DOLARES' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.moneda : null} 
                    placeholder={"Nuevo tipo de moneda"}
                  />
                  <InputSelect title={'AfectoRetención'} name={"afec_retencion"} data={
                    [
                      { indice: '0', option: 'NO APLICA', selected: true }, 
                      { indice: '1', option: 'APLICA' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.afec_retencion : null} 
                    placeholder={'Info referencial'}
                  />
                  <InputSelect title={'IGV'} name={"igv"} data={
                    [
                      { indice: '0', option: 'INAFECTO', selected: true }, 
                      { indice: '1', option: 'AFECTO' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.igv : null} 
                    placeholder={'Info referencial'}
                  />
                  <InputSelect title={'Estado'} name={"estado"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'TRANSITO', option: 'TRANSITO' }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: 'ANULADO', option: 'ANULADO' }]} df={Object.keys(info).length > 0 ? info.estado : null} placeholder={'Info referencial'}/>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                  <span className="inline-block align-middle text-[12px]">Datos de los artículos a solicitar</span>
                </div>
                <div>
                  <div className="h-[370px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell w-[500px]">Descripcion</th>  
                          <th className="lg:table-cell">Modelo</th>
                          <th className="lg:table-cell">#Corte</th>
                          <th className="lg:table-cell">Color</th>
                          <th className="lg:table-cell">Rollos</th>
                          <th className="lg:table-cell">Cantidad</th>
                          <th className="lg:table-cell">Unidad</th>
                          {
                            tipo == 1 && <th className="lg:table-cell">Conversion(UND)</th>
                          }
                          <th className="lg:table-cell">Precio</th>
                          <th className="lg:table-cell">Importe</th>
                          <th className="lg:table-cell">Anulado</th>
                          <th className="lg:table-cell">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registros.length > 0 && registros.map((row,key)=>(
                            <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                              {/* <td className="text-center">{row.producto}</td> */}
                              {
                                tipo == 2
                                ? <td><input type="text" onChange={editvalue} data-position={key} data-name="producto" value={row.producto} /></td>
                                : <td className="text-center">{row.producto}</td>
                              }
                              {/* {
                                tipo == 2 || row.origen == 'manual'
                                ? <td><input type="text" onChange={editvalue} data-position={key} data-name="producto" value={row.producto} /></td>
                                : <td className="text-center">{row.producto}</td>
                              } */}
                              <td><input type="text" onChange={editvalue} data-position={key} data-name="modelo" value={row.modelo} /></td>
                              <td><input type="text" onChange={editvalue} data-position={key} data-name="corte" value={row.corte} /></td>
                              <td><input type="text" onChange={editvalue} data-position={key} data-name="color" value={row.color} /></td>
                              <td><input type="number" onChange={editvalue} data-position={key} data-name="rollos" value={row.rollos} /></td>
                              <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" value={row.cantidad} /></td>
                              <td><input type="text" onChange={editvalue} data-position={key} data-name="unidad" value={row.unidad} /></td>
                              {
                                tipo == 1 && <td><input type="number" onChange={editvalue} data-position={key} data-name="conversion" value={row.conversion} /></td>
                              }
                              <td><input type="number" onChange={editvalue} data-position={key} step=".001" data-name="precio" value={row.precio} /></td>
                              <td><input type="number" readOnly onChange={editvalue} data-position={key} data-name="importe" value={(row.cantidad*row.precio).toFixed(3)} /></td>
                              <td><input type="checkbox" id="anulado" onChange={editvalue} data-position={key} data-name="anulado" checked={row.anulado}  /></td>
                              <td className="w-[250px]">
                                <ul className="flex flex-row justify-end">
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="clone" onClick={onclick} data-position={key}>
                                      <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
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
                      <tfoot className="sticky bottom-0 bg-white">
                        <tr>
                          <td colSpan={4} className="text-right"></td>
                          <td className="text-center"><strong className="text-[14px]">TOTAL: </strong></td>
                          <td className="text-center text-[14px] font-bold">
                            {registros.reduce((acc,row)=> acc + (parseFloat(row.cantidad)),0).toFixed(3)}
                          </td>
                          <td className="text-center">-</td>
                          <td className="text-center">-</td>
                          {/* <td className="text-center">-</td> */}
                          <td className="text-center text-[14px] font-bold">
                            {registros.reduce((acc,row)=> acc + (parseFloat(row.cantidad) * parseFloat(row.precio)),0).toFixed(3)}
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan={12} >
                            <div className="flex flex-row justify-center gap-2">
                              {
                                tipo == 0 && <div onClick={searchproducto} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                                  <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                                </div>
                              }
                              {
                                tipo == 1 && <div onClick={searchproducto} className="bg-blue-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-blue-600">
                                  <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                </div>
                              }
                              {
                                tipo == 2 && <div onClick={nuevoproducto} className="bg-orange-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-orange-600">
                                  <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                </div>
                              }
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div>
                  <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-2 p-1">
                <div className="flex flex-row gap-2">
                  {/* <Button action={showinforme} tipo={'success'}>Informe</Button> */}
                  <div>
                    <Button action={vistaprevia} type={'button'} tipo={'accept'}>
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-eye-spark"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.669 17.994q -5.18 -.18 -8.669 -5.994q 3.6 -6 9 -6t 9 6" /><path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5" /></svg>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button action={() => navigate('/main/pedidos/')} type={'button'} tipo={'default'}>Cancelar</Button>
                  <Button type={'submit'} tipo={'success'}>Guardar</Button>
                </div>  
                {/* <Button action={nuevoproveedor} type={'button'} tipo={'default'}>Proveedor</Button> */}
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}
