import { useContext, useEffect, useState } from "react";
import { Search } from "../../components/Atoms/Search/Search";
import { Consulta } from "../../utils/utils";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../components/Atoms/Button/Button";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";
import { colortipoabono } from "../../utils/utils";
import { colorfase } from "../../utils/utils";

const VerificarEstado = ()=>{
  console.log("Verificando estado de pago de las ordenes")
}

const CuerpoInforme = ({cuerpo})=>{
  return(
    <>
      <iframe src="http://192.168.18.20:4000/produccion/informe/12" className="w-[60vw] h-[60vh]"></iframe>
      {/* <div dangerouslySetInnerHTML={{ __html: cuerpo }} /> */}
    </>
  )
}
export default function ListaPagos(){
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const [info,setInfo] = useState([])
  const [estado,setEstado] = useState(0)
  const navigate = useNavigate()
  const { openModal, config, setOpenloader } = useContext(ModalWindowContext)
  // const [refresh,setRefresh] = useState(false)

  useEffect(()=>{
    let url_ = 'abonos/servicios/'
    let estado_ = 0
    let position = searchParams.get('search');
    console.log("El parametro de consulta es el siguiente :",searchParams,position)
    if(position){
      switch (parseInt(position)) {
        case 0:
          url_ = 'abonos/servicios/'
          estado_ = 0
          break;
        case 1:
          url_ = 'abonos/letras'
          estado_ = 1
          break;
        case 2:
          // url_ = 'abonos/100'
          break;
        case 3:
          url_ = 'prestamos'
          estado_ = 3
          break;
        case 4:
          // url_ = 'abonos/100'
          break;
        case 5:
          url_ = 'abonos/getabonoslist/100'
          estado_ = 4
          break;
        default:
          break;
      }
    }
    setOpenloader(true)
    Consulta({
      // url: 'abonos/100', params: {
      url: url_, params: {
        method: 'GET'
      }
    })
    .then(resp => {
      console.log("Respuesta lista servicios a pagar:",resp)
      setOpenloader(false)
      setEstado(estado_)
      if(parseInt(position) == 3){
        setInfo(resp[0])
      }else{
        setInfo(resp)
      }
      // setInfo(resp)  
    })
    .catch((error) => {
      console.log(error)
      // logout()
      // toast.error('Error en la consulta de base', { theme: "colored" })
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
      // setOpenloader(false)
    })
  },[])

  const onclick = (e) => {
    const action = e.target.dataset.action
    const id = e.target.dataset.id  
    let params_modal = null
    switch (action) {
      case 'delete':
        if(estado == 5){
          let rutaDelete = ''
          switch(e.target.dataset.origenabono){
            case 'SERV':
              rutaDelete = 'abonos/deleteabonoServicio/'
              break
            case 'CRED':
              rutaDelete = 'abonos/deleteabonoLetra/'
              break
            case 'PRES':
              rutaDelete = 'abonos/deleteabonoPrestamo/'
              break
            default:
              break
          }
          params_modal = {
            open:true,
            content: <div>Desea eliminar el registro seleccionado?. Tenga en cuenta de que el <br/> proceso no es reversible.</div>,
            controls: true,
            header: false,
            action:()=>{
              setOpenloader(true)    
              Consulta({
                url: rutaDelete + id, params: {
                  method: 'DELETE'
                }
              })
                .then(resp => {
                  console.log("Info del servicidor :",resp)
                  // setOrdenes(resp)
                  toast.success('Abono de letra eliminado con éxito!', { theme: "colored" })
                  // setRefresh(true)
                  recargarinfo()
                  setOpenloader(false)
                })
                .catch(() => {
                  setOpenloader(false)
                  // logout()
                })
                .finally(()=>{
                  setOpenloader(false)
                })
            }
          }
          openModal(params_modal)
        }
        break;
      case 'download':
        params_modal = {
          open:true,
          content: <div>Desea continuar con la descarga de la guia de traslado interno?.<br/>  Tenga en cuenta de que el proceso puede tardar unos minutos.</div>,
          controls: true,
          header: false,
          action:()=>{
            const desc = async ()=>{
              setOpenloader(true)
              await fetch("http://192.168.18.20:4000/produccion/exportguia/"+id,{
                method:'POST',
                credentials: 'include'
              })
              .then(resp=>{
                if(resp.ok){
                  return resp.json()
                }else{
                  if(resp.status == 401){
                    navigate('/')
                  }
                }
              })
              .then(resp=>{
                setOpenloader(false)
                let binaryString = window.atob(resp.data);
                let binaryLen = binaryString.length;
                let bytes = new Uint8Array(binaryLen);
                for (let i = 0; i < binaryLen; i++) {
                    let ascii = binaryString.charCodeAt(i);
                    bytes[i] = ascii;
                }
                let file = window.URL.createObjectURL(new Blob([bytes], {type: "application/pdf"}))
        
                let link = document.createElement('a')
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
        }
        openModal(params_modal)
        break;
      case 'abonar':
        switch(parseInt(estado)){
          case 0 :
            navigate("/main/pagos/nuevopagoservicio/"+ id + "/servicios")
            break
          case 1 :
            navigate("/main/pagos/nuevopagoletra/"+ id + "/letras")
            break
          case 2 :
            break
          case 3 :
            navigate("/main/pagos/nuevopagoprestamo/"+ id + "/prestamos")
            break
          default:
            break
        }
        break;
      // case 'edit_pago':
      //   navigate("/main/pagos/nuevo/"+ id )
      //   break;
      // case 'add_pago':
      //   navigate("/main/pagos/nuevo/"+ id + "/" + 18)
      //   break;
      default:
        break;
    } 
  }

  const filtrarestado = (e)=>{
    const estado = e.target.dataset.estado
    // setEstado(estado)
    setOpenloader(true)
    // let url = parseInt(estado) == 1 ? 'abonos/100' : 'abonos/servicios/100'
    let url = undefined
    switch (parseInt(estado)) {
      case 0:
        url = 'abonos/servicios/'
        break;
      case 1:
        url = 'abonos/letras'
        break;
      case 2:
        // url = 'abonos/100'
        break;
      case 3:
        url = 'prestamos/'
        break;
      case 4:
        // url = 'abonos/100'
        break;
      case 5:
        url = 'abonos/getabonoslist/100'
        break;
      default:
        break;
    }
    Consulta({
      url: url, params: {
        method: 'GET'
      }
    })
    .then(resp => {
      console.log("Obligaciones consultadas:",resp)
      setOpenloader(false)
      if(parseInt(estado) == 3){
        setInfo(resp[0])
      }else{
        setInfo(resp)
      }
      setEstado(estado)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(()=>{
      setOpenloader(false)
    })
  }

  const recargarinfo = ()=>{
    const data = new FormData()
    let url_ = ''
    let position = searchParams.get('search');
    setOpenloader(true)

    if(position){
      switch (parseInt(position)) {
        case 0:
          url_ = 'abonos/servicios/'
          break;
        case 1:
          url_ = 'abonos/letras'
          break;
        case 2:
          // url_ = 'abonos/100'
          break;
        case 3:
          url_ = 'prestamos'
          break;
        case 4:
          // url_ = 'abonos/100'
          break;
        case 5:
          url_ = 'abonos/getabonoslist/100'
          break;
        default:
          break;
      }
    }

    Consulta({
      url: url_, params: {
        method: 'GET'
      }
    })
    .then(resp => {
      console.log(resp)
      setOpenloader(false)
      setInfo(resp)  
    })
    .catch((error) => {
      console.log(error)
      // logout()
      // toast.error('Error en la consulta de base', { theme: "colored" })
    })
    .finally(()=>{
      console.log("Horror en la consulta de base de datos")
      // setOpenloader(false)
    })
  }
  const nuevoabono = ()=>{
    navigate('/main/pagos/nuevo')
  }
  const showinforme = (e)=>{
    const params_modal = {
      open:true,
      content: <CuerpoInforme cuerpo={""} />,
      controls: true,
      header: false,
      action:async ()=>{
      }
    }
    openModal(params_modal)
  }
  const busquedaglobal = async (input) => {
    let ruta_consulta = ''
    switch(parseInt(estado)){
      case 0 :
        ruta_consulta = "abonos/servicios/"+ input.value 
        break
      case 1 :
        ruta_consulta = "abonos/letras/"
        break
      case 2 :
        break
      case 3 :
        ruta_consulta = "prestamos/"
        break
      default:
        break
    }
    setOpenloader(true)
    Consulta({
      url: ruta_consulta , params: {
        method: 'GET'
      }
    })
      .then(resp => {
        console.log(resp)
        setOpenloader(false)
        setInfo(resp)
      })
      .catch((error) => {
        console.log("El mnesaje de error es:", error)
      })
      .finally(() => {
        console.log("Horror en la consulta de base de datos")
        setOpenloader(false)
      })
  }

  return(
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
      
        <div className="flex flex-col flex-1 pl-2 pr-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]"><strong>Cuentas por pagar</strong></h2>
              <div className="w-[500px] mb-1">
                <Search config={{ width: '200px' }} action={busquedaglobal} />
              </div>
            </div>
            {/* <hr /> */}
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-hidden">
            {/* <hr /> */}
            <div>
              <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                <button className={`group ${estado == 0 ? 'active' : ''}`} data-estado={0} onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Servicios
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className={`group ${estado == 1 ? 'active' : ''}`} data-estado={1} onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Letras
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className={`group ${estado == 3 ? 'active' : ''}`} data-estado={3} onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Prestamos
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                {/* <button className={`group ${estado == 4 ? 'active' : ''}`} data-estado={4} onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Adicionales
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button> */}
                <button className={`group ${estado == 5 ? 'active' : ''}`} data-estado={5} onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Pagos
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
            </div>
            <hr />
            <div className="flex-1 scrollbar-special overflow-y-scroll">
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
                <thead className="text-left sticky top-0 bg-white">
                  <tr>
                    {
                      parseInt(estado) == 0 && <>
                        {/* <th className="lg:table-cell">IdServ</th>
                        <th className="lg:table-cell">Origen</th>
                        <th className="lg:table-cell">Proveedor</th>
                        <th className="lg:table-cell">Producto</th>
                        <th className="lg:table-cell">Marca</th>
                        <th className="lg:table-cell">Modelo</th>
                        <th className="lg:table-cell">Costo</th>
                        <th className="lg:table-cell">Cantidad</th>
                        <th className="lg:table-cell">Ingresos</th>
                        <th className="lg:table-cell">Importe</th>
                        <th className="lg:table-cell">Saldo</th> */}
                        <th className="lg:table-cell">#</th>
                        <th className="lg:table-cell">Ruc</th>
                        <th className="lg:table-cell">Proveedor</th>
                        <th className="lg:table-cell">Cantidad</th>
                        <th className="lg:table-cell">Ingresos</th>
                        <th className="lg:table-cell">Importe</th>
                        <th className="lg:table-cell">Saldo</th>
                        <th className="lg:table-cell text-center">Accciones</th>
                      </>
                    }
                    {
                      parseInt(estado) == 1 && <>
                        <th className="lg:table-cell">Id</th>
                        <th className="lg:table-cell">NroLetra</th>
                        <th className="lg:table-cell">Proveedor</th>
                        <th className="lg:table-cell">DocumentosRef</th>
                        <th className="lg:table-cell">Moneda</th>
                        <th className="lg:table-cell">FecEmisión</th>
                        <th className="lg:table-cell">FecVigencia</th>
                        <th className="lg:table-cell">Importe</th>
                        <th className="lg:table-cell">DiaPendientes</th>
                        <th className="lg:table-cell">Saldo</th>
                        <th className="lg:table-cell text-center">Accciones</th>
                      </>
                    }
                    {
                      parseInt(estado) == 3 && <>
                        <th className="lg:table-cell">Id</th>
                        <th className="lg:table-cell">Proveedor</th>
                        <th className="lg:table-cell">Deudor</th>
                        <th className="lg:table-cell">Moneda</th>
                        <th className="lg:table-cell">TCEA</th>
                        <th className="lg:table-cell">PlazoPago</th>
                        <th className="lg:table-cell">NroCuotas</th>
                        <th className="lg:table-cell">FecSolicitud</th>
                        <th className="lg:table-cell">MontoPrestamo</th>
                        <th className="lg:table-cell">Abono</th>
                        <th className="lg:table-cell">Saldo</th>
                        <th className="lg:table-cell text-center">Accciones</th>
                      </>
                    }
                    {
                      parseInt(estado) == 5 && <>
                        <th className="lg:table-cell">Id</th>
                        <th className="lg:table-cell">OrigenAbono</th>
                        <th className="lg:table-cell">Banco</th>
                        <th className="lg:table-cell">IdRef</th>
                        <th className="lg:table-cell">TipoOperación</th>
                        <th className="lg:table-cell">NumOperación</th>
                        <th className="lg:table-cell">Proveedor</th>
                        <th className="lg:table-cell">Moneda</th>
                        <th className="lg:table-cell">Importe</th>
                        <th className="lg:table-cell">FechaPago</th>
                        <th className="lg:table-cell text-center">Accciones</th>
                      </>
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    info.length > 0
                      ? info.map((row, key) => (
                        <tr key={key} className="">
                          {
                            parseInt(estado) == 0 && <>
                              {/* <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')}`}>{row.idx}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')}`}><div className={`w-[80px] text-white text-center text-[8px] rounded-l-full rounded-r-full ${colorfase[row.servicio]}`}>{row.servicio}</div></td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')}`}>{row.proveedor.length > 40 ? row.proveedor.substr(0,40) : row.proveedor}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')}`}>{row.producto}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')}`}>{row.marca}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')}`}>{row.modelo}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>S/.{row.costo}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>{row.cantidad}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>{row.despacho}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>S/.{row.importe.toFixed(2)}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>S/.{(row.importe - row.cancelado).toFixed(2)}</td> */}
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>{key + 1}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>{row.ruc}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')}`}>{row.proveedor.length > 50 ? row.proveedor.substr(0,50) : row.proveedor}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>{row.cantidad}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>{row.despacho}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>S/.{row.importe.toFixed(2)}</td>
                              <td className={`${row.despacho < 1 ? 'text-red-600' : (row.despacho >= row.cantidad ? 'text-green-600' : '')} font-extrabold`}>S/.{(row.importe - row.cancelado - row.descuentos).toFixed(2)}</td>
                            </>
                          }
                          {
                            parseInt(estado) == 1 && <>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>{row.idx}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>{row.num_letra}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>{!row.proveedor ? '' : (row.proveedor.length > 40 ? row.proveedor.substr(0, 40) + '...' : row.proveedor)}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>{row.facturas_ref !== '' ? row.facturas_ref : row.documentos_ref}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>{row.moneda}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>{row.fec_emision}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>{row.fec_vencimiento}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>S/.{row.importe}</td>
                              <td className={`${row.dias_pendientes < 0 ? 'text-red-600' : row.dias_pendientes > 0 && 'text-green-600'} font-extrabold`}>{row.dias_pendientes}</td>
                              <td className={`${row.dias_pendientes < 0 && 'text-red-600'}`}>S/.{row.importe - row.cancelado}</td>
                            </>
                          }
                          {
                            parseInt(estado) == 3 && <>
                              <td>{row.idx}</td>
                              <td>{row.proveedor.length > 40 ? row.proveedor.substr(0, 40) + '...' : row.proveedor}</td>
                              <td>{row.cliente}</td>
                              <td className="font-extrabold">{row.moneda}</td>
                              <td>{row.tcea}</td>
                              <td>{row.plazo_pago}</td>
                              <td className="font-bold">{row.numero_cuotas}</td>
                              <td>{row.fec_solicitud_prestamo}</td>
                              {/* <td>{''}</td> */}
                              <td className="font-extrabold">{row.monto_prestamo.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: row.moneda,
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-extrabold">{row.abono.toLocaleString('es-PE', {
                                style: 'currency',
                                currency: row.moneda,
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                              <td className="font-extrabold">{(row.monto_prestamo - row.abono).toLocaleString('es-PE', {
                                style: 'currency',
                                currency: row.moneda,
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                              })}</td>
                            </>
                          }
                          {
                            parseInt(estado) == 5 && <>
                              <td className="text-center">{row.idx}</td>
                              <td><div className={`w-[80px] bg- text-white text-center text-[8px] rounded-l-full rounded-r-full ${colortipoabono[row.tipo]}`}>{row.tipo == 'SERV' ? 'SERVICIO' : (row.tipo == 'CRED' ? 'LETRA' : 'PRESTAMO')}</div></td>
                              <td>{row.entidad_bancaria}</td>
                              <td>{row.idref}</td>
                              <td>{row.tipo_operacion}</td>
                              <td>{row.num_operacion}</td>
                              <td>{row.proveedor}</td>
                              <td>{row.moneda == 'S' ? 'SOLES' : 'DOLARES'}</td>
                              <td><strong>S/.{row.importe}</strong></td>
                              <td>{row.fec_pago}</td>
                            </>
                          }
                          <td className="w-[250px]">
                            <ul className="flex flex-row justify-end">
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx} data-origenabono={estado == 5 ? row.tipo : ''}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="review" data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action={`abonar`} onClick={onclick} data-id={row.idx ?? 0}>
                                  {
                                    parseInt(estado) == 5
                                    ?
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                    :
                                      <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M3 10h18" /><path d="M16 19h6" /><path d="M19 16l3 3l-3 3" /><path d="M7.005 15h.005" /><path d="M11 15h2" /></svg>
                                  }
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))
                      :
                      <tr className="h-[40px]"><td colSpan={13} className="text-center"><span>Datos no encontrados</span></td></tr>
                  }
                </tbody>
                <tfoot className="sticky w-full bottom-0 bg-gray-100 ">
                  <tr>
                    <td className="h-[45px] border-t border-t-gray-600" colSpan={estado == 3 ? 13 : 12}>
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          Showing 1 to 4 of 4 entries (filtered from 57 total entries)
                        </div>
                        <div className="flex flex-row justify-end items-center gap-2">
                          <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                          </div>
                          <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex flex-row justify-end mt-2">
              <div className="flex gap-2">
                <Button action={recargarinfo} tipo={'default'}>Actualizar</Button>
                {/* <Button action={nuevoabono} tipo={'accept'}>Nuevo</Button> */}
              </div>
            </div >
          </div>
        </div>
      {/* </div> */}
    </>
  )
}
