import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/Atoms/Button/Button";
import Productos from "../../../components/Common/Productos";
import Pedidos from "../../../components/Common/Pedidos";
import Proveedores from "../../../components/Common/Proveedores";
import Recetas from "../../../components/Common/Recetas";
import Marca from "../../../components/Common/Marca";
import { Input } from "../../../components/Atoms/Input/Input";
import { InputSelect } from "../../../components/Atoms/Input/InputSelect";
import { InputMultiSelect } from "../../../components/Atoms/Input/InputMultiSelect";
import { TextArea } from "../../../components/Atoms/Input/TextArea";
import Insumos from "../../../components/Common/Insumos";
import InsumosCombos from "./InsumosCombos";
import TallasCombos from "./TallasCombos";

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



export default function SeccionOrden({info,form,setorden,setopen,openmodal,fases,materiales,dataimg,setDataimg,setinsumos,insumos,requerimientos,setrequerimientos,tallaslist,settallaslist}){
  console.log("Reenderizado del componente SeccionOrden",tallaslist)
  const [tipopedido,setTipopedido] = useState(1)
  const [panelactive,setPanelActive] = useState(0)
  // const [dataimg,setDataimg] = useState([])
  useEffect(()=>{
    const handleSalamandra = (event) => {
      switch(event.detail.name){
        case 'tipopedido':
          setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
          break;
        case 'tallasbase':
          settallaslist(info=>info.map(row=> ({...row,selected: row.idx == event.detail.indice ? true : false }) ))
          break;
      }
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

    if(tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').includes(name)){
    // if(['st','xs','s','m','l','xl','xxl'].includes(name)){
      // total = ['st','xs','s','m','l','xl','xxl'].reduce((c,v)=>{
      total = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
        if(v !== name){
          c += parseInt(info[0].combos[indice][v])
        }
        return c
      },0) ?? 0
      total += parseInt(e.target.value)
      console.log("El total es el siguiente:",total)
      setorden(orden => ([{...orden[0], combos: orden[0].combos.map((row,key)=>key == indice ? {...row,[e.target.dataset.name]:e.target.value,cantidad_combo:total} : row) }]))
    }else{
      setorden(orden => ([{...orden[0], combos: orden[0].combos.map((row,key)=>key == indice ? {...row,[e.target.dataset.name]:e.target.value} : row) }]))
    }
  }
  const agregarcombo = ()=>{
    console.log("info combos:",info)
    const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
      c[v] = 0
      return c
    },{}) ?? {}
    if(!(info.length > 0) || !info[0].combos){
      // setorden([{combos: [{id_orden_CAB: null,st:0,xs:0,s:0,m:0,l:0,xl:0,xxl:0, color_combo: '', cantidad_combo: 0}] }])
      setorden([{combos: [{id_orden_CAB: null,...initialcombos, color_combo: '', cantidad_combo: 0}] }])
    }else{
      // setorden(orden => ([{ ...orden[0], combos: [...orden[0].combos,{id_orden_CAB: null, color_combo: '',st:0,xs:0,s:0,m:0,l:0,xl:0,xxl:0, cantidad_combo: 0 }] }]))
      setorden(orden => ([{ ...orden[0], combos: [...orden[0].combos,{id_orden_CAB: null, color_combo: '',...initialcombos, cantidad_combo: 0 }] }]))
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
            console.log("Info combos:",combos)
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
      case 'tallas':
        openmodal({
          open:true,
          content: <TallasCombos tallasbase={tallaslist.find(row=>row.selected)} data={insumos.filter((row,key)=>key == position)[0]} actions={(info)=>{  
            // setinsumos(insumos.map(row=>({...row,'listatallas':info,'combostalla':info.join(',')})))
            setinsumos(insumos.map((row,key)=>key == position ? {...row,'listatallas':info,'combostalla':info.map(talla=>talla.toUpperCase()).join(',')} : row))
            setopen(false)
          }}
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
      content: <Insumos actions={(items)=>{  
        console.log("Informacion de los insumos:",items)
        setopen(false)
        setinsumos([...insumos,...items.map(row=>({id_producto_CAB:row.id_producto_CAB,id_subprod_CAB:row.idxsub,producto:row.producto,color:row.color,idx_color:row.idx_color,talla:row.talla,idx_talla:row.idx_talla,cantidad:0,stock:row.stock}))])
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

        setorden([{...info[0],id_receta:items[0].id_producto_CAB,tipo_produccion:items[0].tipoProduccion,tipo_fabricacion:items[0].tipoFabricacion,modelos:items[0].modelo,base:items[0].base,estilo:items[0].estilo,presentacion:items[0].presentacion,rubro:items[0].rubro,producto:(items[0].rubro + ' ' + items[0].presentacion + ' ' + items[0].modelo)}])

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
          
          <InputSelect title={'TipoPedido'} name={"modalidad_pedido"} formref={form} data={
            [
              { indice: 'ORDN', option: 'ORDEN', selected: true  },
              { indice: 'STK', option: 'STOCK PROPIO' }
            ]} 
            df={Object.keys(info).length > 0 ? info[0].modalidad_pedido : null} placeholder={'Numero de la orden'}
          />
        </div>
        <div className="flex gap-3">
          <div className="w-[30%]">
            <Input name={'marca'} title="Marca" defaults={info.length > 0 ? info[0].marca : null} type="text" action={nuevamarca} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Info de la prenda</span>
        </div>
        <hr/> 
        <div className="flex flex-col gap-3 w-[64%]">
          {/* <Input name={'producto'} defaults={info.length > 0 ? info[0].producto : null} title="Producto" type="text" action={searchproducto} mode={'static'} /> */}
          <Input name={'producto'} defaults={info.length > 0 ? info[0].producto : null} title="Descripcion" type="hidden" />
          <div className="w-[350px]">
            <Input name={'id_receta'} title="IdReceta" defaults={info.length > 0 ? info[0].id_receta : null} type="text" action={searchproducto} mode={'static'} verify="true" placeholder={'Numero de la orden'}/>
          </div>
          {/* <div className="w-[550px]">
          </div> */}
          <div className="flex gap-3 w-[1200px]">
            <Input name={'presentacion'} defaults={info.length > 0 ? info[0].presentacion : null} title="TipoTela" type="text" placeholder={'Numero de la orden'} readonly={true}/>
            <Input name={'base'} defaults={info.length > 0 ? info[0].base : null} title="Base" type="text" placeholder={'Numero de la orden'} readonly={true}/>
            <Input name={'estilo'} defaults={info.length > 0 ? info[0].estilo : null} title="Estilo" type="text" placeholder={'Estilo de la prenda'} readonly={true}/>
            <Input name={'tipo_fabricacion'} defaults={info.length > 0 ? info[0].tipo_fabricacion : null} title="TipoFabricacion" type="text" placeholder={'Tipo de fabricacion'} readonly={true}/>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-[450px]">
            <Input name={'rubro'} defaults={info.length > 0 ? info[0].rubro : null} title="Articulo" type="text" placeholder={'Numero de la orden'} readonly={true}/>
          </div>
        <div className="w-[450px]">
            <Input name={'modelos'} defaults={info.length > 0 ? info[0].modelos : null} title="Modelo" type="text" placeholder={'Numero de la orden'} readonly={true}/>
          </div>  
        </div>
        
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
      </div>
      <hr/>
      <div className="flex flex-col gap-3">
        <div className="flex-1 min-w-[300px] flex flex-row gap-3">
          <Input name={'curva'} defaults={info.length > 0 ? info[0].curva : null} title="Curva" type="text" placeholder={'Numero de la orden'}/>
          <Input name={'precio'} defaults={info.length > 0 ? info[0].precio : null} title="Precio" type="number" placeholder={'Numero de la orden'}/>
          <div className="w-[400px]">
            {
              tallaslist.length > 0
              ? <InputSelect title={'TallasFormato'} name={"tallasbase"} data={tallaslist.map(row=>({indice:row.idx,option:row.tallasformateado}))} df={info.length > 0 ? info[0].tallasbase : null} formref={form} />
              : <Input name={''} defaults={null} title="Ruta" type="text" />
            }
          </div>
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
        {/* <div className="w-[400px]">
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
                {
                  tallaslist.length > 0 && tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map((talla,key)=>(
                    <th key={key} className="lg:table-cell text-center">{talla.toUpperCase()}</th>
                  ))
                }
                <th className="lg:table-cell">CantidadTotal</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                info.length > 0 && info[0].combos && info[0].combos.length > 0 && info[0].combos.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td><input type="text" onChange={(editvalue)} data-name="color_combo" data-position={key} value={row.color_combo} /></td>
                    { 
                      tallaslist.length > 0 && tallaslist.filter(talla=>talla.selected)[0].tallasformateado.split('-').map((talla_split,key_talla)=>(
                        <td key={key_talla}>
                          <input type="number" onChange={(editvalue)} data-name={talla_split.trim()} data-position={key} value={row[talla_split.trim()] ?? 0} />
                        </td>
                      ))
                    }
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
                {
                  tallaslist.length > 0 && tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map((talla,key_talla)=>(
                    <td key={key_talla} className="font-bold text-center text-[14px]">
                      {
                        info.length > 0 
                        ? info[0].combos ? info[0].combos.reduce((c,v)=>c+parseInt(v[talla.trim()] ?? 0),0) : 0 
                        : 0
                      }
                    </td>
                  ))
                }
                <td className="font-bold text-center text-[14px]">
                  {
                    info.length > 0 
                    ? 
                      (
                        info[0].combos 
                        ? info[0].combos.reduce((c,v)=>{
                            const acumulado = tallaslist.filter(row=>row.selected)[0]?.tallasformateado.split('-').reduce((acc,talla_split)=>{
                              acc = acc + parseInt(v[talla_split.trim()] ?? 0) 
                              return acc
                            },0) ?? 0
                            c = c + acumulado
                            return c
                          },0) 
                        : 0
                      ) 
                    : 0
                  }
                </td>
                <td className="font-bold text-center text-[14px]"></td>
              </tr>
              <tr className="bg-white">
                <td colSpan={10} >
                  <div className="flex flex-row justify-center">
                    <div onClick={agregarcombo} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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
        // /*/}
        <div className={`h-[500px] flex-1 scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2 ${panelactive !== 1 && 'hidden'}`}>
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell">Id</th>
                <th className="lg:table-cell w-[500px]">Articulo</th>
                <th className="lg:table-cell">Fase</th>
                <th className="lg:table-cell">CombosTalla</th>
                <th className="lg:table-cell">Unidad</th>
                <th className="lg:table-cell">Color</th>
                <th className="lg:table-cell">Talla</th>
                <th className="lg:table-cell w-[150px]">Consumo</th>
                <th className="lg:table-cell w-[150px]">Comprometido</th>
                <th className="lg:table-cell">Stock</th>
                {/* <th className="lg:table-cell">PorLlegar</th> */}
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
                    <td className="text-center">{row.combostalla ?? '-'}</td>
                    <td className="text-center">-</td>
                    <td className="text-center">{row.color}</td>
                    <td className="text-center">{row.talla}</td>
                    <td className="text-center"><input data-name="cantidad" type="number" onChange={editvalueinsumos} data-position={key} value={row.cantidad} step={0.001}/></td>
                    <td className="text-center">
                      {
                        info[0].combos 
                        ? info[0].combos.reduce((c,v) =>{
                            c = c + 
                              (
                                (v.insumos && v.insumos.includes(parseInt(row.id_subprod_CAB))) 
                                  ? (row.listatallas?.length > 0 ? row.listatallas.reduce((c,t)=>c+v[t],0) : parseFloat(v.cantidad_combo)) * parseFloat(row.cantidad) 
                                  : 0
                              )
                            return c
                          },0) 
                        : 0
                      }
                    </td>
                    {/* <td className="text-center">{JSON.stringify(info[0].combos.map(row=>row.cantidad_combo))}</td> */}
                    <td className="text-center">{row.stock ?? 0}</td>
                    {/* <td className="text-center">0</td> */}
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-join-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7h1.948c1.913 0 3.705 .933 4.802 2.5a5.861 5.861 0 0 0 4.802 2.5h6.448" /><path d="M3 17h1.95a5.854 5.854 0 0 0 4.798 -2.5a5.854 5.854 0 0 1 4.798 -2.5h5.454" /><path d="M18 15l3 -3l-3 -3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="tallas" onClick={onclickinsumos} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-ruler"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1" /><path d="M4 8l2 0" /><path d="M4 12l3 0" /><path d="M4 16l2 0" /><path d="M8 4l0 2" /><path d="M12 4l0 3" /><path d="M16 4l0 2" /></svg>
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
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]">TOTAL</td>
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]"></td>
                <td className="font-bold text-center text-[14px]">{insumos.length > 0 ? insumos.reduce((c,v)=>c+parseFloat(v.cantidad),0) : 0}</td>
                <td className="font-bold text-center text-[14px]"></td>
              </tr>
              <tr className="bg-white">
                <td colSpan={11} >
                  <div className="flex flex-row justify-center">
                    <div onClick={agregarinsumos} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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
                    <div onClick={agregarpedido} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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
