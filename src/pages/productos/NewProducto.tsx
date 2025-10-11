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

function SeccionOrden({info,form,setorden,setopen,openmodal,combos,setcombos}){
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
  const agregarcolor = (e)=>{
    openmodal({
      open:true,
      content: <Colores actions={(items)=>{  
        console.log("Informacion de los insumos:",items)
        const id = e.target.dataset.id

        setcombos({color:'Rojo',talla:'XL'})
        // setcorte(corte=>corte.reduce((c,v)=>{
        //   // items.map(item=>{id_hojacorte_CAB:'',idx_color:item.idx,color_combo:item.nom,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0})
        //   // c.push({...v,combos:v.idx == id ? [...v.combos,{id_hojacorte_CAB:'',idx_color:'',color_combo:'',xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0}] : v.combos})
        //   c.push({...v,combos:v.idx == id ? [...v.combos,...items.filter(item=>!v.combos.map(combo=>combo.idx_color).includes(item.idx)).map(item=>({id_hojacorte_CAB:'',idx_color:item.idx,color_combo:item.nom,xs:0,s:0,m:0,l:0,xl:0,xxl:0,cantidad_combo:0}))] : v.combos})
        //   return c
        // },[]))
        // setopen(false)
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
  return <>
    <div className={`flex flex-col gap-3 pt-3`}>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      <div className="flex flex-col gap-3">
        <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
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
          <Input name={'precio'} title="Densidad" defaults={info.length > 0 ? info[0].densidad : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
        <div className="w-[30%]">
          <Input name={'marca'} title="Composicion" defaults={info.length > 0 ? info[0].composicion : null} type="text" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      <div className="flex flex-col gap-3">
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
        <div className="flex gap-3 w-full">
          <div className="w-[45%]">
            <Input name={'proveedor'} title="Proveedor" defaults={info.length > 0 ? info[0].proveedor : null} type="text" action={nuevoproveedor} mode={'static'} placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
          </div>
          <div className="w-[20%]">
            <Input name={'precio'} title="Precio" defaults={info.length > 0 ? info[0].precio : null} type="number" placeholder={'Seleccione el rubro correpondiente al producto.'} verify="true"/>
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
            <div className="flex gap-3">
              <Input name={'proveedor'} title="Color" defaults={info.length > 0 ? info[0].proveedor : null} type="text" action={agregarcolor} mode={'static'} verify="true"/>
              <InputSelect title={'Tipo'} name={"tipo"} formref={form} data={
                [
                  { indice: 'I', option: '28', selected: true },
                  { indice: 'I', option: '30' },
                  { indice: 'I', option: '32' },
                  { indice: 'I', option: '36' },
                  { indice: 'I', option: 'XS' },
                  { indice: 'I', option: 'S' },
                  { indice: 'I', option: 'M' },
                  { indice: 'I', option: 'L' },
                  { indice: 'I', option: 'XL' },
                  { indice: 'I', option: 'XXL' }
                ]} 
                df={Object.keys(info).length > 0 ? info[0].tipo : null} 
              />
            </div>
          ))
        }
        <div className="flex flex-row justify-center mt-3">
          <div onClick={agregarcolor} className="bg-green-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
            +
          </div>
        </div>

        <table className="w-[100%] border-collapse hidden border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
          <thead className="text-left sticky top-0 bg-white">
            <tr>
              <th className="lg:table-cell w-[500px]">Color</th>
              <th className="lg:table-cell">Talla</th>
              <th className="lg:table-cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              // info.length > 0 && info[0].combos && info[0].combos.length > 0 && info[0].combos.map((row,key)=>(
              combos.length > 0 && combos.map((row,key)=>(
                <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                  {/* <td><input type="text" onChange={(editvalue)} data-name="color" data-position={key} value={row.color} /></td> */}
                  <td>
                    <Input name={'proveedor'} title="Color" defaults={info.length > 0 ? info[0].proveedor : null} type="text" action={agregarcolor} mode={'static'} verify="true"/>
                  </td>
                  {/* <td><input type="text" onChange={(editvalue)} data-name="talla" data-position={key} value={row.talla} /></td> */}
                  <td>
                    <InputSelect title={'Tipo'} name={"tipo"} formref={form} data={
                      [
                        { indice: 'I', option: '28', selected: true },
                        { indice: 'I', option: '30', selected: true },
                        { indice: 'I', option: '32', selected: true },
                        { indice: 'I', option: '36', selected: true },
                        { indice: 'I', option: 'XS', selected: true },
                        { indice: 'I', option: 'S', selected: true },
                        { indice: 'I', option: 'M', selected: true },
                        { indice: 'I', option: 'L', selected: true },
                        { indice: 'I', option: 'XL', selected: true },
                        { indice: 'I', option: 'XXL', selected: true }
                      ]} 
                      df={Object.keys(info).length > 0 ? info[0].tipo : null} 
                    />
                  </td>
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
                  <div onClick={agregarcolor} className="bg-green-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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

export function NewProducto() {
  const form = useRef()
  const urlparams = useParams()
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const [position, setPosition] = useState(0)
  const [orden, setOrden] = useState([])
  const [combos, setCombos] = useState([{color:'ROJO',talla:'XS'}])
  const navigate = useNavigate()

  const onsubmit = async (e) => {
    e.preventDefault()
    let url_save = '', method = 'GET'
    let data = undefined

    if(position == 0){
      url_save = urlparams.id ? 'productos/updateProducto' : 'productos/generateProducto'
      method = urlparams.id ? 'PUT' : 'POST'
      data = new FormData(e.target)
    }
    if(position == 2){
      url_save = 'ordenes/saveFaseMolde'
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
    // const handleSalamandra = (event) => {
    //   console.log("INof origen del select:",event.detail,event.detail.target.closest('div#cuerpo_ingresos'))
    //   if(event.detail.name == 'estado_corte'){
    //     const padre = event.detail.target.closest('div#cuerpo_ingresos')
    //     const indice = padre.dataset.position
    //     setCorte(corte=>corte.map((row,key)=>key == indice ? {...row,['estado_corte']:event.detail.valor} : row))
    //   }
    //   if(event.detail.name == 'tipo'){
    //     setOrden(orden => ([{ ...orden[0], tipo: event.detail.indice}]))
    //   }
    // };
    // form.current.addEventListener("salamandra", handleSalamandra);

    if(urlparams.id){
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'productos/searchproductobyid/' + urlparams.id,})
          .then(resp => {
            console.log("Mostrando informacion :",resp)
            setOrden(resp)
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
    }
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
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
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
              <button className={`group flex-row items-center gap-1 ${position == 2 && 'active'} ${!urlparams.id && 'pointer-events-none'}`} onClick={() => setPosition(2)} data-estado="FNLZ">
                <span className="relative h-[100%] flex items-center pointer-events-none">
                  Datos adicionales
                  <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                </span>
              </button>
            </ul>
            <hr />
            <form ref={form} onSubmit={onsubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-special">
                {
                  position == 0 && <SeccionOrden info={orden} form={form} setorden={setOrden} setopen={setOpen} openmodal={openModal} combos={combos} setcombos={setCombos} />
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