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
import Rubros from "../../components/Common/Rubros";
import UnidadesMedida from "../../components/Common/Unidades";
import Marca from "../../components/Common/Marca";
import Colores from "../../components/Common/Colores";
import { InputMultiSelect } from "../../components/Atoms/Input/InputMultiSelect";
import { InputTest } from "../../components/Atoms/Input/InputTest";

function SeccionOrden({info,form,setorden,setopen,openmodal,combos,setcombos,tallas,position}){
  console.log("Reenderizado de la seccion orden")
  const [tipopedido,setTipopedido] = useState(1)
  // const [dataimg,setDataimg] = useState([])
  // useEffect(()=>{
  //   const handleSalamandra = (event) => {
  //     setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
  //   };
  //   form.current.addEventListener("salamandra", handleSalamandra);
  // },[])

  const onclick = (e)=>{
    const position = e.target.dataset.position
    const action = e.target.dataset.action
    if(action == 'delete'){
      setcombos(combos.filter((row,key)=>key !== parseInt(position)))
      // setorden(orden => ([{...orden[0], combos: orden[0].combos.filter((row,key)=>key !== parseInt(position)) }]))
    }
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
  const agregarcolor = (position)=>{
    console.log("La posicion de la fila es la siguiente:",position)
    openmodal({
      open:true,
      content: <Colores actions={(items)=>{  
        console.log("La informaciondel color seleccionado es:",items)
        console.log("El reordenamiento es:",position,combos.map((c,p)=>(p == parseInt(position) ? {color:items[0].nom,talla:c.talla} : c)))
        setcombos(combos.map((c,p)=>(p == parseInt(position) ? {idcolor:items[0].idx,color:items[0].nom,talla:c.talla} : c)))
        // setcombos([...combos,{color:items[0].nom,talla:'["XS","S","M","L","XL","XXL"]'}])
        setopen(false)
      }}
        closemodal={()=>setopen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
  }
  const agregarfila = ()=>{
    openmodal({
      open:true,
      content: <Colores actions={(items)=>{  
        setcombos([...combos,{idcolor:items[0].idx,color:items[0].nom,talla:'["XS","S","M","L","XL","XXL"]'}])
        setopen(false)
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
    <div className={`flex flex-col gap-3 pt-3 ${position !== 0 && 'hidden'}`}>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      <div className="flex flex-col gap-3">
        <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        {/* <Input name={'imageslist'} defaults={info.length > 0 ? info[0].imageslist : null} type="hidden" /> */}
        {/* <div className="flex flex-col">
        </div> */}
        <div className="w-[400px]">
          <InputSelect title={'Tipo'} name={"tipo"} formref={form} data={
            [
              { indice: 'I', option: 'INSUMO', selected: true },
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
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      <div className="flex flex-col gap-3">
        <Input name={'RUBROS'} defaults={info.length > 0 ? info[0].RUBROS : null} type="hidden" verify="true"/>
        <div className="w-[35%]">
          <Input name={'rubro'} title="Rubro" defaults={info.length > 0 ? info[0].rubro : null} type="text" action={nuevorubro} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <div className="w-[20%]">
          <Input name={'codUnidadMedida'} title="Medida" defaults={info.length > 0 ? info[0].codUnidadMedida : null} type="text" action={nuevaunidad} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
      </div>
      <div className="w-[30%]">
        <Input name={'marca'} title="Marca" defaults={info.length > 0 ? info[0].marca : null} type="text" action={nuevamarca} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
      </div>
      <div className="flex w-[100%] gap-3">
        <div className="w-[20%]">
          <Input name={'densidad'} title="Densidad" defaults={info.length > 0 ? (info[0].densidad ?? 0) : 0} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <div className="w-[30%]">
          <Input name={'composicion'} title="Composicion" defaults={info.length > 0 ? (info[0].composicion ?? 0) : 0} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      <div className="flex flex-col gap-3 w-[100%]">
        <div className="flex gap-3">
          <div className="w-[20%]">
            <InputSelect title={'Es Fraccionable'} name={"fraccionable"} formref={form} data={
              [
                { indice: '1', option: 'SI', selected: true  },
                { indice: '0', option: 'NO' },
              ]} 
              df={Object.keys(info).length > 0 ? info[0].fraccionable : null} placeholder={'Seleccione el rubro correpondiente al producto.'}
            />
          </div>
          <div className="w-[20%]">
            <Input name={'minimo'} title="StockMinimo" defaults={info.length > 0 ? info[0].minimo : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
          </div>
        </div>
        {/* <Input name={'costo'} title="Costo" defaults={0} type="hidden" placeholder={'Seleccione el rubro correpondiente al producto.'}/> */}
        {/* <div className="w-[25%]">
          <Input name={'costo'} title="Costo" defaults={info.length > 0 ? info[0].costo : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div> */}
        <Input name={'PROVEEDORES'} defaults={info.length > 0 ? (info[0].PROVEEDORES ?? 0) : null} type="hidden" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        <div className="flex gap-3 w-full">
          <div className="w-[45%]">
            <Input name={'proveedor'} title="Proveedor" defaults={info.length > 0 ? info[0].proveedor : null} type="text" action={nuevoproveedor} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
          </div>
          <div className="w-[20%]">
            {/* <Input name={'precio'} title="CostoPromedio" defaults={info.length > 0 ? info[0].precio : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/> */}
            <Input name={'costo'} title="Costo" defaults={info.length > 0 ? info[0].costo : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      {/* <div className="h-[300px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> */}
      <div className="scrollbar-special rounded-md border-b-[.2px] mt-2">
        {
          combos.length > 0 && combos.map((row,key)=>(
            <>
            <div className="flex gap-3">
              <InputTest name={'color'} title="Color" defaults={row.color} type="text" action={()=>agregarcolor(key)} mode={'static'} />
              <InputMultiSelect title={'Talla'} name={"talla"} data={
                  tallas.map(row=>({indice: row.idx, option:row.detalle}))
                }
                df={row.talla} formref={form} params={{'height':'200px'}} position={key}
              />
              <div className="flex items-center [&_li:hover]:cursor-pointer">
                <ul className="flex flex-row justify-end">
                  <li>
                    <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <hr> */}
            <hr className="mt-2 mb-2" />
            </>
          ))
        }
        <div className="flex flex-row justify-center mt-3">
          <div onClick={agregarfila} className="bg-green-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
            +
          </div>
        </div>

      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_ordenes" />
      </div>
    </div>
  </>
}

function SeccionAdicionales(children){
  const {lista,setLista, setOrden, orden, position} = children
  // const [lista,setLista] = useState([])
  console.log("Reenderizado de la seccion adicionales",orden)
  const deleteimage = (e)=>{
    const position = parseInt(e.target.dataset.position)
    setLista(lista.filter((row,key)=>key!==position))
  }
  const cargafile = (e)=>{
    console.log("Comienza la carga de imagenes",e.target.files)
    // setOrden(info=> ({...info, imageslist: [...info.imageslist, e.target.files[0].fileName]}))
    // if(e.target.files[0] instanceof File){
    //   console.log("File validado como instancia de file")
    // }
    setLista([...lista,e.target.files[0]])
    e.target.value = ""
  }
  return(
    <>
      <div className={`flex flex-col gap-2 h-full ${position !== 1 && 'hidden'}`}>
        <div className="w-full h-full rounded-2xl pt-2 relative overflow-hidden flex flex-col gap-0">
          <div className="flex-1 rounded-t-2xl bg-gray-100 p-4 flex gap-4 flex-wrap justify-start items-baseline">
            {
              lista.map((row,key)=>
                <div className="w-[150px] h-[150px] bg-gray-200 rounded-xl relative">
                  <img src={ (row instanceof File) ? URL.createObjectURL(row) : 'https://jsjfact.com/facturador/imagenez/' + row} className="w-full h-full rounded-xl" />
                  <div className="absolute w-7 h-7 rounded-full shadow-md flex justify-center items-center right-[-6px] top-[-6px] bg-white cursor-pointer hover:bg-gray-300" onClick={deleteimage} data-position={key}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                  </div>
                </div>
              )
            }
          </div>
          <div className="rounded-b-2xl bg-gray-200 p-3 flex justify-between items-center">
            <input type="file" name="imagen" onChange={cargafile} />
            <Button type={'button'} tipo="default">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function NewProducto() {
  const form = useRef()
  const urlparams = useParams()
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const [position, setPosition] = useState(0)
  const [orden, setOrden] = useState([{tipo:'I'}])
  const [combos, setCombos] = useState([])
  const [tallas, setTallas] = useState([])
  const [listaimg,setListaimg] = useState([])
  const navigate = useNavigate()

  console.log("Reenderizado del componente producto")

  const onsubmit = async (e) => {
    e.preventDefault()
    const count = 1
    let url_save = '', method = 'GET'
    let data = undefined

    for(const element of form.current.querySelectorAll("input[verify='true']")){
      // console.log("El input a verificar es:",element)
      if(element.value == ''){
        toast.error('Debe ingresar los datos del input' + element.name, { theme: "colored" })
        return 0
      }
    }
    console.log("Los combos a registrar son:",combos)
    url_save = urlparams.id ? 'productos/updateProducto' : 'productos/generateProducto'
    method = urlparams.id ? 'PUT' : 'POST'
    data = new FormData(e.target)
    data.append('combos',JSON.stringify(combos))
    console.log("Filtro de imagenes:",listaimg.filter(row=> !(row instanceof File)))
    listaimg.length > 0 && data.append('imageslist',JSON.stringify(listaimg.filter(row=> !(row instanceof File))))
    for(const file of [...listaimg]){
      if(file instanceof File) data.append('filenext',file)
    }

    // if(position == 0){
    // }
    const PARAMS_MODAL = {
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro de los datos ingresados?</div>,
      action: async () => {
        setOpenloader(true)
        console.log("La ruta s la siguei:",url_save)
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
      // setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
      console.log("La info del multiselect es:",event.detail)
      setCombos(combo=>combo.map((c,p)=>(p == parseInt(event.detail.position) ? {idcolor:c.idcolor,color:c.color,talla:JSON.stringify(event.detail.valor.map(row=>row.option))} : c) ))

      // setCombos(combos.map((c,p)=>(p == parseInt(event.detail.position) ? {color:c.color,talla:JSON.stringify(event.datail.valor.map(row=>row.option))} : c) ))
    };
    form.current.addEventListener("salamandra", handleSalamandra);

    if(urlparams.id){
      setOpenloader(true)
      Promise.all([
        Consulta({url: 'productos/searchproductobyid/' + urlparams.id,}),
        Consulta({url: 'mantenimiento/getlistatallas/'})  
      ])
      .then(resp=>{
        setOrden(resp[0])
        setCombos(resp[0][1].map(row=>({idcolor:row.idcolor,color:row.color,talla:JSON.stringify(row.tallas)})))
        setTallas(resp[1])
        console.log("La lista de imagenes es la siguiente:",resp[0][0].imageslist ? resp[0][0].imageslist : [])
        setListaimg(resp[0][0].imageslist ? resp[0][0].imageslist : [])
      })
      .catch((err)=>{
        setOpenloader(false)
        toast.error('Se produjo un error!!', { theme: "colored" })
      })
      .finally(()=>{
        setOpenloader(false)
      })
    }else{
      Consulta({url: 'mantenimiento/getlistatallas/'})
      .then(resp=>{
        // console.log("La lista de tallas es:",resp)
        setTallas(resp)
      })
      .catch(err=>{

      })
    }
    // return ()=>form.current.removeEventListener("salamandra")
  },[])
  const cancelarcreacion = ()=>{
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea descartar los cambios realizados?.<br/> Cualquier modificacion realizada se perderá.</div>,
      action: ()=>{
        navigate('/main/productos/')
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
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
        <div className="pl-2 pr-2 pt-2 flex flex-col flex-1 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center">
              <h2 className="font-medium text-[16px] pr-1">Productos /</h2>
              <span className="text-blue-500 font-bold">
                {
                  urlparams.id && orden.length > 0
                  ? `${orden[0].nom + ' ' + orden[0].marca}`
                  : "Nuevo Producto"
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
              <button className={`group flex-row items-center gap-1 ${position == 1 && 'active'}`} onClick={() => setPosition(1)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Datos adicionales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-special">
                <SeccionOrden info={orden} form={form} setorden={setOrden} setopen={setOpen} openmodal={openModal} combos={combos} setcombos={setCombos} tallas={tallas} position={position}/>
                <SeccionAdicionales lista={listaimg} setLista={setListaimg} orden={orden} setOrden={setOrden} position={position}/>


                {/* {
                  position == 0 && <SeccionOrden info={orden} form={form} setorden={setOrden} setopen={setOpen} openmodal={openModal} combos={combos} setcombos={setCombos} tallas={tallas} position={position}/>
                }
                {
                  position == 1 && <SeccionAdicionales lista={listaimg} setLista={setListaimg} orden={orden} setOrden={setOrden} position={position}/>
                } */}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button action={cancelarcreacion} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'success'}>Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </>
  )
}