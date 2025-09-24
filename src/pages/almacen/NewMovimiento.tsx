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
import Pedidos from "../../components/Common/Pedidos"
import Modelos from "../../components/Common/Modelos"
import ProductosLote from "../../components/Common/ProductosLote"
import Almacenes from "../../components/Common/Almacenes"

export default function NewMovimiento(){
  const [tipo,setTipo] = useState(0)
  const [motivo,setMotivo] = useState('mst')
  const [searchParams,setSearchParams] = useSearchParams()
  const urlparams = useParams()
  const [info,setInfo] = useState({tipo_operacion:'9'})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const navigate = useNavigate()

  console.log("Los search params recibidos:",searchParams.get('nombre'))

  const onsubmit = (e)=>{
    e.preventDefault()
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

    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de la guia de inventario?</div>,
      action: async () => {
        const data = new FormData()
        urlparams.id && data.append('id',urlparams.id)
        data.append('info',JSON.stringify(Object.fromEntries(new FormData(form.current))))
        data.append('detalle',JSON.stringify(registros.filter(row=>row.despacho > 0)))

        console.log("Detalle de la lista de articuos :",registros)
        setOpenloader(true)
        await Consulta({url: 'almacen/savedespacho/',params:{
          method:'POST',
          body:data
        }})
        .then(resp => {
          console.log("Habner por donde esta yendo:",resp)
          setOpenloader(false)
          if(resp.ok){
            // navigate('/main/pedidos/')
            toast.success('Nuevo retiro generado con éxito!!', { theme: "colored" })
          }else{
            toast.error(resp.message, { theme: "colored" })
            return
          }
        })
        .catch(async (err)=>{
          console.log("Recibiendo el error del servidor:",err)
          // let pepe = await err.json()
          // console.log("El error recibido es:",pepe)
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
      setOpenloader(true)
      const pp = async () => {
        // await Consulta({url: 'produccion/retiros/' + urlparams.id,})
        // await Consulta({url: 'almacen/getmovimientobyid/' + urlparams.id,})
        await Consulta({url: 'almacen/getdespacho/' + urlparams.id,})
          .then(resp => {
            console.log("Busqueda info pedido:",resp)
            setInfo({...info,tipo_operacion:resp.cab.tipomov,fec_emision:resp.cab.fec_emision,fec_retorno:resp.cab.fec_emision,id_modelo:resp.cab.id_modelo,modelos:resp.cab.modelos,id_pedido_origen:resp.cab.id_pedido_origen,nro_pedido_origen:resp.cab.id_pedido_origen,id_proveedor_CAB:resp.cab.id_proveedor_CAB,proveedor:resp.cab.Raz_social_DOC,ruc:resp.cab.Nro_Doc_Prov,orden_ref:resp.cab.nro_requerimiento,oc:resp.cab.oc,nro_corte:resp.cab.nro_corte,responsable:'CARLOS',Suc_Tienda:resp.cab.Suc_Tienda,almacen:resp.cab.almacen})
            setRegistros(resp.det)
            // setTipo(resp[0].tipo == 'TELAS' ? 0 : 1)
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
    }
    const handleInputChange = (event) => {
      // setTipo(event.detail.valor == 'PEDIDOS' ? 1 : 0)
      console.log("Hola Ivon",event.detail.valor,event.detail)
      if(event.detail.name == 'motivo'){
        setMotivo(event.detail.indice)
      }
      if(event.detail.name == 'tipo_operacion'){
        setTipo(event.detail.valor == 'INGRESOS' ? 0 : 1)
      }
      // setRegistros([])
    };
    form.current.addEventListener("salamandra", handleInputChange);

    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])

  const searchproductoIngreso = ()=>{
    openModal({
      open:true,
      content: <ProductosLote almacen={588} actions={(items)=>{  
        console.log("La informacion del producto seleccionado es:",items)
        setOpen(false)
        // setRegistros([...registros,...items.map(row=>({item:0,id_producto_CAB:row.idxsub,producto:row.producto,color:row.color,rollos:0,cantidad:0,unidad:'KG',despacho:0,precio:0,idx_color:row.idx_color,idx_producto:row.id_producto_CAB,idxsub:row.idxsub,talla:row.talla}))])

        // [
        //   {
        //       "id_producto_CAB": 316319,
        //       "cod_producto": "0900019104570",
        //       "tipo": "I",
        //       "det": "BULL DENIM RIGIDO PPT",
        //       "producto": "BULL DENIM RIGIDO PPT",
        //       "rubro": "TELA",
        //       "temporada": "",
        //       "estilo": "",
        //       "precio": 10,
        //       "presentacion": "",
        //       "marca": "",
        //       "modelo": "",
        //       "idx_color": "408",
        //       "color": "PPT",
        //       "idx_talla": "26",
        //       "talla": "S/T",
        //       "condicion": "primera",
        //       "idxsub": "15494",
        //       "sku2": null,
        //       "selected": false
        //   }
        // ]

    // [
        //   {
      //       "idx_prod": 311863,
      //       "codigo": "0900019103440",
      //       "idx_subprod": 14590,
      //       "producto": "JERSEY 2 CABOS 28/1 ANCHO 1.61",
      //       "idx_CAB_COLOR": 34,
      //       "color": "NEGRO",
      //       "idx_talla": 26,
      //       "talla": "S/T",
      //       "lote": "116",
      //       "stock": 73.52999877929688,
      //       "selected": false
        //   }
        // ]

        setRegistros([...registros,...items.map(row=>(
          {
            id_subprod:row.idx_subprod,
            id_producto_DET:row.idx_prod,
            producto:row.producto,
            idx_color:row.idx_CAB_COLOR,
            color:row.color,
            cantidad:0,
            despacho:0,
            precio:0,
            idx_talla:row.idx_talla,
            talla:row.talla,
            lote:row.lote,
            unidad:row.unidad,
            metros:0,
            rollos:0,
            tipo:row.tipo
          }))
        ])
        // setRegistros([...registros,...items.map(row=>(
        //   {
        //     id_subprod:row.idx_subprod,
        //     id_producto_DET:row.idx_prod,
        //     producto:row.producto,
        //     color:row.color,
        //     cantidad:0,
        //     despacho:0,
        //     precio:0,
        //     idx_color:row.idx_CAB_COLOR,
        //     idx_producto:row.id_producto_CAB,
        //     idxsub:row.idxsub,
        //     talla:row.talla
        //   }))
        // ])
        // /////////////////////////////////////////////////////////
      }}
        closemodal={()=>setOpen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
  }
  const searchproductoEgreso = ()=>{
    openModal({
      open:true,
      content: <ProductosLote actions={(items)=>{  
        console.log("La informacion del producto seleccionado es:",items)
        setOpen(false)
        setRegistros([...registros,...items.map(row=>(
          {
            id_subprod:row.idx_subprod,
            id_producto_DET:row.idx_prod,
            producto:row.producto,
            idx_color:row.idx_CAB_COLOR,
            color:row.color,
            cantidad:0,
            despacho:0,
            precio:0,
            idx_talla:row.idx_talla,
            talla:row.talla,
            lote:row.lote,
            unidad:row.unidad,
            metros:0,
            rollos:0,
            tipo:row.tipo
          }))
        ])
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
    setRegistros([...registros,{item:0,id_producto_CAB:'',producto:'',color:'',rollos:0,cantidad:0,unidad:'KG',precio:0, despacho:0}])
  }

  const onclick = (e)=>{
    const action = e.target.dataset.action
    const position = e.target.dataset.position
    switch(action){

      case 'delete':
        setRegistros(registros.filter((row,key)=>key !== parseInt(position) ))
        console.log("Eliminado registros de la fila ",position)
        break;
      default :
    }
  }
  const editvalue = (e)=>{
    const column = e.target.dataset.name
    const position = e.target.dataset.position
    if(column == 'color'){
      setRegistros([...registros.map((item,key)=> position == key ? {...item, color: e.target.value, idx_color:'',id_subprod: ''}:item)])
    }else{
      setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'sinlote' ? e.target.checked : e.target.value)}:item)])
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
  const nuevatienda = ()=>{
    let params_modal = null
    params_modal = {
      open:true,
      content: <Almacenes actions={(item)=>{  
        console.log("El item seleccionado es: ",item)
        setInfo(info=>({...info,Suc_Tienda:item.idx,almacen:item.nom}))
        setOpen(false)
      }}/>,
      controls: true,
      header: false,
      action:()=>{}
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
        Consulta({ url: 'almacen/disponibilidadreq/' + item.idx })
          .then(resp => {
            if(resp.ok){
              // console.log("La informacion del pedido consultado es:", resp,resp[0].idx)
              let cabecera = resp.info[0]
              let detalle = resp.info[1]
              setInfo(info => ({ ...info, id_pedido_origen: item.idx, nro_pedido_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor, orden_ref: item.orden_ref, oc: cabecera.oc, nro_corte: cabecera.nro_corte, ruc: cabecera.ruc }))
              setRegistros([...detalle.filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
                row = { ...row, id_item: row.idx, despacho: 0, stock: row.stock, lote: cabecera.idx }
                Reflect.deleteProperty(row, 'idx')
                return row
              })])
            }else{
              toast.error(resp.message, { theme: "colored" })
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
  const searchmodelo = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Modelos actions={(item) => {
        // console.log("El pedidos seleccionado matemia es :",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'almacen/disponibilidadmod/' + item.idx })
          .then(resp => {
            console.log("La disponibilidad es la siguiente:",resp)
            if(resp.ok){
              let cabecera = resp.info[0]
              let detalle = resp.info[1]
              setInfo(info => ({ ...info, id_pedido_origen: cabecera.idx, nro_pedido_origen: cabecera.idx, id_proveedor_CAB: cabecera.id_proveedor_CAB, proveedor: cabecera.Raz_social_DOC, orden_ref: cabecera.orden_ref, oc: cabecera.oc, nro_corte: cabecera.nro_corte, ruc: cabecera.Nro_Doc_Prov, modelos:cabecera.modelos, id_modelo: cabecera.idorden }))
              setRegistros([...detalle.filter(row => !registros.map(rr => rr.id_item).includes(row.idx)).map(row => {
                row = { ...row, id_item: row.idx, despacho: 0, stock: row.stock, lote: cabecera.idx }
                Reflect.deleteProperty(row, 'idx')
                return row
              })])
            }else{
              toast.error(resp.message, { theme: "colored" })
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
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px]">Movimientos /</h2>
              <span className="text-blue-500 font-bold">
                Nuevo movimiento
              </span>
            </div>
            <hr />
          </div>
          <div className="text-left overflow-scroll scrollbar-special h-full flex flex-col flex-1 pt-2">

            <form ref={form} onSubmit={onsubmit} onChange={()=>{}} onInputCapture={onchange}>
              <div className={` flex-col gap-3 flex`}>

                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <div className="w-[340px]">
                    <InputSelect title={'TipoMov'} name={"tipo_operacion"} data={
                      [
                        { indice: '9', option: 'INGRESOS', selected: true }, 
                        { indice: '10', option: 'RETIROS' }, 
                      ]} 
                      df={Object.keys(info).length > 0 ? info.tipo_operacion : null} formref={form} 
                    />
                  </div>
                  <Input name={'fec_emision'} defaults={Object.keys(info).length > 0 && info.fec_emision ? info.fec_emision : null} title="FechaEmisión" type="date" verify="true"/>
                  <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden"/>
                  <div className="w-[500px]">
                    <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} verify="true"/>
                  </div>
                  <Input name={'Suc_Tienda'} defaults={Object.keys(info).length > 0 ? info.Suc_Tienda : null} type="hidden" />                  
                  <Input name={'almacen'} title="Almacen" defaults={Object.keys(info).length > 0 ? info.almacen : null} type="text" action={nuevatienda} mode={'static'} verify="true"/>
                  {/* <Input name={'oc'} defaults={Object.keys(info).length > 0 && info.oc ? info.oc : null} title="NroOrden" type="text" />
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="GiradoPor" type="text" verify="true"/> */}
                </div>
                <div className="flex gap-3">
                  <InputSelect title={'Motivo'} name={"motivo"} data={
                    [
                      { indice: 'mst', option: 'MUESTRA', selected: true }, 
                      { indice: 'ajt', option: 'AJUSTE' }, 
                      { indice: 'acb', option: 'ACABADOS' },
                      { indice: 'crt', option: 'CORTE' }
                    ]} 
                    df={Object.keys(info).length > 0 ? info.motivo : null} formref={form} 
                  />
                  {/* {
                    motivo == 'crt' &&
                  } */}
                  <Input name={'id_orden'} defaults={Object.keys(info).length > 0 && info.id_orden ? info.id_orden : null} type="hidden" />
                  <Input name={'modelo'} defaults={Object.keys(info).length > 0 && info.modelo ? info.modelo : null} title="Modelo" type="text" />
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="GiradoPor" type="text" verify="true"/>
                  {/* <div className="w-[500px]">
                    <Input name={'Suc_Tienda'} defaults={Object.keys(info).length > 0 ? info.Suc_Tienda : null} type="hidden" />                  
                    <Input name={'almacen'} title="Almacen" defaults={Object.keys(info).length > 0 ? info.almacen : null} type="text" action={nuevatienda} mode={'static'} verify="true"/>
                  </div> */}
                </div>
                <div>
                  <span className="flex flex-row items-center gap-2">
                    Detalle
                  </span>                  
                  <div className="h-[370px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell w-[500px]">Descripcion</th>  
                          <th className="lg:table-cell">Unidad</th>
                          <th className="lg:table-cell">Color</th>
                          <th className="lg:table-cell">Talla</th>
                          <th className="lg:table-cell">Lote</th>
                          <th className="lg:table-cell">SN/Lote</th>
                          <th className="lg:table-cell">Rollos</th>
                          <th className="lg:table-cell">Metros</th>
                          <th className="lg:table-cell">Despacho</th>
                          <th className="lg:table-cell">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          registros.length > 0 && registros.map((row,key)=>(
                            <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                              <td className="text-center">{row.producto}</td>
                              <td className="text-center">{row.unidad}</td>
                              <td className="text-center w-[100px]">
                                {
                                  tipo 
                                  ? row.color
                                  : <input type="text" onChange={editvalue} data-position={key} data-name="color" value={row.color} />
                                }
                              </td>
                              {/* <td className="text-center">{row.color}</td> */}
                              <td className="text-center">{row.talla}</td>
                              <td className="text-center">{row.lote}</td>
                              {/* <td className="w-[120px]"><input type="number" onChange={editvalue} data-position={key} data-name="lote" value={row.lote} /></td> */}
                              <td className="text-center"><input type="checkbox" id="sinlote" onChange={editvalue} data-position={key} data-name="sinlote" checked={row.sinlote} /></td>
                              <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="rollos" value={row.rollos} step={'0.01'} /></td>
                              <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="metros" value={row.metros} step={'0.01'} /></td>
                              <td className="w-[100px]"><input type="number" onChange={editvalue} data-position={key} data-name="despacho" value={row.despacho} step={'0.01'} /></td>
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
                      <tfoot className="sticky bottom-0 bg-white">
                        <tr>
                          <td colSpan={3} className="text-right"></td>
                          <td className="text-center"><strong className="text-[14px]">TOTAL: </strong></td>
                          {/* <td className="text-center text-[14px] font-bold">
                            {registros.reduce((acc,row)=> acc + (parseFloat(row.cantidad)),0).toFixed(2)}
                          </td> */}
                          <td className="text-center">-</td>
                          <td className="text-center">-</td>
                          <td className="text-center">0</td>
                          <td className="text-center">0</td>
                          <td className="text-center">0</td>
                          {/* <td className="text-center"></td> */}
                          {/* <td className="text-center text-[14px] font-bold">
                            {registros.reduce((acc,row)=> acc + parseFloat(row.despacho) ,0).toFixed(2)}
                          </td> */}
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan={10} >
                            <div className="flex flex-row justify-center gap-2">
                              <div onClick={tipo ? searchproductoEgreso : searchproductoIngreso} className={`${tipo ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} w-[150px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer `}>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                              </div>
                              {/* <div onClick={searchproducto} className="bg-blue-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-blue-600">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                              </div> */}
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
              <div className="flex justify-end gap-2 mt-2 p-1">
                <div className="flex justify-end gap-2">
                  <Button action={() => navigate('/main/almacen/movimientos')} type={'button'} tipo={'default'}>Cancelar</Button>
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
