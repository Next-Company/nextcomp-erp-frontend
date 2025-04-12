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
import Productos from "../../components/Common/Productos"

const CuerpoInforme = ({info,tipo})=>{
  let [ruta,setRuta] = useState("")
  useEffect(()=>{
    console.log("El tipo de pedido es:",tipo)
    let crear = async ()=>{
      // await Consulta({url: `${tipo ? 'produccion/vistapreviapedido/avios' : 'produccion/vistapreviapedido/telas'}`,params:{
      await Consulta({url: `${tipo ? 'produccion/vistapreviapedido/avios' : 'produccion/vistapreviapedido/telas' }`,params:{
        method:'POST',
        body:info
      }})
      .then(resp => {
        console.log("La info del reporte es:",resp)
        let binaryString = window.atob(resp.data);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        let file = window.URL.createObjectURL(new Blob([bytes], {type: "application/pdf"}))
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
  const urlparams = useParams()
  const [info,setInfo] = useState({})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const form = useRef()
  const [registros,setRegistros] = useState([])
  const navigate = useNavigate()

  const onsubmit = (e)=>{
    e.preventDefault()
    // let condiciones = [{name:'',altura:0,color:'magenta'},{name:'',altura:0,color:'magenta'}]
    console.log("El de talle de fracciones :",registros)
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
        await Consulta({url: 'produccion/guardarpedido/',params:{
          method:'PUT',
          body:data
        }})
        .then(resp => {
          setOpenloader(false)
          navigate('/main/pedidos/')
          toast.success('Estampado guardado con éxito!!', { theme: "colored" })
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
      setOpenloader(true)
      const pp = async () => {
        await Consulta({url: 'produccion/pedido/' + urlparams.id,})
          .then(resp => {
            console.log("Busqueda info pedido:",resp)
            setInfo(resp[0])
            setRegistros(resp[1])
            setTipo(resp[0].tipo == 'TELAS' ? 0 : 1)
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
      setOpenloader(true)
      Consulta({url: 'produccion/nuevopedido'})
        .then(resp => {
          console.log("Busqueda info pedido:",resp)
          setInfo({...info,orden_ref: resp[0].correlativo})
          setTipo(resp[0].tipo == 'TELAS' ? 0 : 1)
          setOpenloader(false)
        })
        .catch((err)=>{
          setOpenloader(false)
        })
    }
    const handleInputChange = (event) => {
      // setTipo(event.detail.valor == 'PEDIDOS' ? 1 : 0)
      console.log("Hola Ivon",event.detail.valor)
      setTipo(event.detail.valor == 'TELAS' ? 0 : 1)
      // setRegistros([])
    };
    form.current.addEventListener("salamandra", handleInputChange);

    return () => {
      if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])

  const nuevoproducto = ()=>{
    openModal({
      open:true,
      content: <Productos actions={(items)=>{  
        setOpen(false)
        // setRegistros([...registros,...items.map(row=>({item:0,id_producto_CAB:row.idxsub,producto:row.producto,color:row.color,rollos:0,cantidad:0,unidad:'',precio:0}))])}
        // setRegistros([...registros,...items.filter(row=>!registros.map(row2=>row2.id_producto_CAB).includes(row.idxsub)).map(row=>({item:0,id_producto_CAB:row.idxsub,producto:row.producto,color:row.color,rollos:0,cantidad:0,unidad:'',precio:0}))])
        setRegistros([...registros,...items.map(row=>({item:0,id_producto_CAB:row.idxsub,producto:row.producto,color:row.color,rollos:0,cantidad:0,unidad:'KG',precio:0}))])
      }}
        closemodal={()=>setOpen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
    // setRegistros([...registros,{item:0,producto:'',color:'',rollos:0,cantidad:0,unidad:'',precio:0}])
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
    let column = e.target.dataset.name
    let position = e.target.dataset.position
    
    // let info = []
    // if(column == 'precio'){
    //   info = [...registros.map((item,key)=> position == key ? {...item,[column]: parseFloat(e.target.value),['importe']:parseFloat(e.target.value)*parseFloat(item.cantidad)}:item)]
    // }else if(column == 'cantidad'){
    //   info = [...registros.map((item,key)=> position == key ? {...item,[column]: parseFloat(e.target.value),['importe']:parseFloat(e.target.value)*parseFloat(item.precio)}:item)]
    // }else{
    //   info = [...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'isprototipo' ? e.target.checked : e.target.value)}:item)]

    // }
    // console.log("Capturando edicion de campo :",registros,info)
    // setRegistros(info)
    setRegistros([...registros.map((item,key)=> position == key ? {...item,[column]: (column == 'anulado' ? e.target.checked : e.target.value)}:item)])
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
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
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

                <div className="flex gap-3">
                  <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
                  <Input name={'orden_ref'} defaults={Object.keys(info).length > 0 && info.orden_ref ? info.orden_ref : null} title="NroOrden" type="text" />
                  <Input name={'fec_emision'} defaults={Object.keys(info).length > 0 && info.fec_emision ? info.fec_emision : null} title="FechaEmisión" type="date" />
                  {/* <Input name={'proveedor'} defaults={Object.keys(info).length > 0 && info.proveedor ? info.proveedor : null} title="Proveedor" type="text" /> */}
                  <Input name={'ruc'} defaults={Object.keys(info).length > 0 ? info.ruc : null} type="hidden" />
                  <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                  <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} />
                  <Input name={'fec_retorno'} defaults={Object.keys(info).length > 0 && info.fec_retorno ? info.fec_retorno : null} title="FechaEntrega" type="date" />
                  
                </div>
                <div className="flex gap-3">
                  <Input name={'forma_pago'} defaults={Object.keys(info).length > 0 && info.forma_pago ? info.forma_pago : null} title="FormaPago" type="text" />
                  <InputSelect title={'TipoPedido'} formref={form} name={"tipo"} data={
                    [
                      { indice: 'TELAS', option: 'TELAS', selected: true }, 
                      { indice: 'AVIOS', option: 'AVIOS' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.tipo : null} 
                  />
                  <Input name={'responsable'} defaults={Object.keys(info).length > 0 && info.responsable ? info.responsable : null} title="GiradoPor" type="text" />
                  <Input name={'nro_contacto'} defaults={Object.keys(info).length > 0 && info.nro_contacto ? info.nro_contacto : null} title="NroContacto" type="text" />
                  <Input name={'produccion'} defaults={Object.keys(info).length > 0 && info.produccion ? info.produccion : null} title="Produccion" type="text" />
                </div>
                <div className="flex gap-3">
                  <InputSelect title={'Moneda'} name={"moneda"} data={
                    [
                      { indice: 'S', option: 'SOLES', selected: true }, 
                      { indice: 'USD', option: 'DOLARES' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.moneda : null} 
                  />
                  <InputSelect title={'IGV'} name={"igv"} data={
                    [
                      { indice: '0', option: 'INAFECTO', selected: true }, 
                      { indice: '1', option: 'AFECTO' }, 
                    ]} 
                    df={Object.keys(info).length > 0 ? info.igv : null} 
                  />
                  <InputSelect title={'Estado'} name={"estado"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: 'ANULADO', option: 'ANULADO' }]} df={Object.keys(info).length > 0 ? info.estado : null} />
                </div>
                <div>
                  <span>Artículos</span>                  
                  <div className="h-[370px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
                    <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr>
                          <th className="lg:table-cell w-[500px]">Descripcion</th>  
                          <th className="lg:table-cell">Color</th>
                          <th className="lg:table-cell">Rollos</th>
                          <th className="lg:table-cell">Cantidad</th>
                          <th className="lg:table-cell">Unidad</th>
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
                              <td><input type="text" onChange={editvalue} data-position={key} data-name="producto" value={row.producto} /></td>
                              <td><input type="text" onChange={editvalue} data-position={key} data-name="color" value={row.color} /></td>
                              <td><input type="number" onChange={editvalue} data-position={key} data-name="rollos" value={row.rollos} /></td>
                              <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" value={row.cantidad} /></td>
                              <td><input type="text" onChange={editvalue} data-position={key} data-name="unidad" value={row.unidad} /></td>
                              <td><input type="number" onChange={editvalue} data-position={key} step=".01" data-name="precio" value={row.precio} /></td>
                              <td><input type="number" readOnly onChange={editvalue} data-position={key} data-name="importe" value={(row.cantidad*row.precio).toFixed(2)} /></td>
                              <td><input type="checkbox" id="anulado" onChange={editvalue} data-position={key} data-name="anulado" checked={row.anulado}  /></td>
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
                        <tr>
                          <td colSpan={10} >
                            <div className="flex flex-row justify-center">
                              <div onClick={nuevoproducto} className="bg-green-500 w-[100px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
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
      </div>
    </>
  )
}
// Componente InputSelect
// export function InputSelect({ title, name, data, df }) {
//   // ... (resto del código)

//   const onSelectChange = (key) => {
//     setSelect(key);
//     const event = new CustomEvent("inputSelectChange", {
//       detail: { value: info[key].indice },
//     });
//     ref_menu.current.dispatchEvent(event); // Disparamos el evento en un elemento del DOM
//   };

//   // ... (resto del código)
// }

// // Componente padre
// function MiFormulario() {
//   const handleInputChange = (event) => {
//     console.log("Valor seleccionado en el formulario:", event.detail.value);
//   };

//   useEffect(() => {
//     const menu = ref_menu.current; // Obtén una referencia al elemento donde se dispara el evento
//     menu.addEventListener("inputSelectChange", handleInputChange); // Escuchamos el evento personalizado

//     return () => {
//       menu.removeEventListener("inputSelectChange", handleInputChange); // Limpiamos el listener al desmontar el componente
//     };
//   }, []);

//   return (
//     <form ref={ref_form}>
//       <InputSelect title="Mi InputSelect" name="miInput" data={data} df={df} ref={ref_menu} />
//       {/* ... otros elementos del formulario */}
//     </form>
//   );
// }