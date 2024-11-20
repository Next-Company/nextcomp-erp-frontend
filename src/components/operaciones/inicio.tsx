import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../Atoms/Button/Button";
import { Search } from "../Atoms/Search/Search";
import { useNavigate } from "react-router-dom";
import { AuthPermitions } from "../../contexts/contexts";
import { Consulta } from "../../utils/utils";
import { ModalWindowContext } from "../ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";

export default function Inicio() {
  const [ordenes, setOrdenes] = useState([])
  const { logout, credentials } = useContext(AuthPermitions)
  const { openModal, config, setOpenloader, openloader } = useContext(ModalWindowContext)
  const [ refresh, setRefresh ] = useState(false)
  const navigate = useNavigate()

  const onclick = (e) => {
    const action = e.target.dataset.action
    const id = e.target.dataset.id
    let params_modal = null
    switch (action) {
      case 'delete':
        params_modal = {
          open:true,
          content: <div>Desea eliminar el registro seleccionado?. Tenga en cuenta de que el <br/> proceso no es reversible.</div>,
          controls: true,
          header: true,
          action:()=>{
            setOpenloader(true)
            Consulta({
              url: 'produccion/' + id, params: {
                method: 'DELETE'
              }
            })
              .then(resp => {
                // setOrdenes(resp)
                toast.success('Orden eliminada con éxito!', { theme: "colored" })
                setRefresh(true)
                setOpenloader(false)
              })
              .catch(() => {
                setOpenloader(false)
                logout()
              })
              .finally(()=>{
                setOpenloader(false)
              })
          }
        }
        openModal(params_modal)
        break;
      case 'edit':
        navigate("/main/operaciones/nuevo/"+ id)
        // params_modal = {
        //   open:true,
        //   content: <div>Desea eliminar el registro seleccionado?. Tenga en cuenta de que el <br/> proceso no es reversible.</div>,
        //   controls: true,
        //   header: true,
        //   action:()=>{

        //   }
        // }
        break;
    
      default:
        break;
    } 
  }
  // params: {
  //   method: 'POST', body: data
  // }

  const busqueda_search = (e)=>{
    if(e.code == 'Enter'){
      let data = new FormData()
      if(e.target.value == ''){
        data.append("params",'')
      }else{
        data.append("params",JSON.stringify([{oc:e.target.value}]))
      }
      setOpenloader(true)
      Consulta({
        url: 'produccion/busqueda', params: {
          method: 'POST',
          body:data
        }
      })
        .then(resp => {
          setOrdenes(resp)
          setOpenloader(false)
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error en la consulta de base', { theme: "colored" })
          // logout()
        })
        .finally(()=>{
          console.log("Horror en la consulta de base de datos")
          setOpenloader(false)
        })
    }
  }

  useEffect(() => {
    console.log("Empezando el primer rendeizado")
    setOpenloader(true)
    Consulta({
      url: 'produccion', params: {
        method: 'GET'
      }
    })
      .then(resp => {
        console.log(resp)
        setOrdenes(resp)
        setOpenloader(false)
        
      })
      .catch((error) => {
        console.log(error)
        toast.error('Error en la consulta de base', { theme: "colored" })
        // logout()
      })
      .finally(()=>{
        console.log("Horror en la consulta de base de datos")
        setOpenloader(false)
      })
  }, [])
  useEffect(() => {
    if(refresh){
      setOpenloader(true)
      Consulta({
        url: 'produccion', params: {
          method: 'GET'
        }
      })
        .then(resp => {
          setOrdenes(resp)
          setOpenloader(false)
          setRefresh(false)
        })
        .catch(() => {
          console.log("error")
          logout()
          setOpenloader(false)
        })
        .finally(()=>{
          // console.log("error")
          setOpenloader(false)
        })
    }
  }, [refresh])
  const menu = useRef()
  const calculo = (e)=>{
    const estado = e.target.dataset.estado
    const data = new FormData()
    data.append("params",JSON.stringify([{estado_orden:estado}]))
    if(!e.target.classList.contains('active')){
      for(const element of menu.current.querySelectorAll('button')){
        element.classList.remove('active')
      }
      e.target.classList.add("active")
    }
    setOpenloader(true)
      Consulta({
        url: 'produccion/busqueda', params: {
          method: 'POST',
          body: data
        }
      })
        .then(resp => {
          setOrdenes(resp)
          setOpenloader(false)
          setRefresh(false)
        })
        .catch(() => {
          console.log("error")
          logout()
          setOpenloader(false)
        })
        .finally(()=>{
          setOpenloader(false)
        })
  }
  return (
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">

        <div className="flex flex-col flex-1 pl-2 pr-2 pt-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Producción</h2>
              <div className="w-[400px]">
                <Search config={{ width: '200px' }} action={busqueda_search} />
              </div>
            </div>
            <hr />
          </div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll">
            <div>
              <ul ref={menu} className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                <button className="group active" data-estado="EN PROCESO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes en proceso
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className="group" data-estado="FINALIZADO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes finalizadas
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className="group" data-estado="ANULADO" onClick={calculo}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Órdenes anuladas
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
            </div>
            <hr />
            <div className="flex-1 scrollbar-special overflow-y-scroll">
              <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible">
                <thead className="text-left sticky top-0 bg-white">
                  <tr>
                    {/* <th className="lg:table-cell">#</th> */}
                    <th className="lg:table-cell">OC</th>
                    <th className="lg:table-cell">Cliente</th>
                    <th className="lg:table-cell">Fecha Emision</th>
                    <th className="lg:table-cell">Fecha Entrega</th>
                    <th className="lg:table-cell">Marca</th>
                    <th className="lg:table-cell">Producto</th>
                    <th className="lg:table-cell">Base</th>
                    <th className="lg:table-cell">Precio</th>
                    <th className="lg:table-cell">Modelo</th>
                    {/* <th className="lg:table-cell">Total</th> */}
                    <th className="lg:table-cell">FaseActual</th>
                    <th className="lg:table-cell">Accciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ordenes.length > 0
                      ? ordenes.map((row, key) => (
                        <tr>
                          {/* <td>{row.idx}</td> */}
                          <td>{row.oc}</td>
                          <td>{row.cliente}</td>
                          <td>{row.fec_emitida}</td>
                          <td>{row.fec_entrega}</td>
                          <td>{row.marca}</td>
                          <td>{row.producto}</td>
                          <td>{row.base}</td>
                          <td>{row.precio}</td>
                          <td>{row.modelos}</td>
                          <td><div className="bg-orange-400 text-white text-center text-[10px] rounded-l-full rounded-r-full">{row.status}</div></td>
                          <td>
                            <ul className="flex flex-row justify-end">
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => { }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" onClick={() => { }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                </div>
                              </li>
                              <li>
                                <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-id={row.idx}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
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
              </table>
            </div>
            {/* <div className="flex flex-col items-center p-2 gap-2"> */}
            <div className="flex flex-row justify-between p-2">
              <div className="flex justify-between items-center p-3 gap-2">
                <div>
                  Se recuperaron <strong>120</strong> registros
                </div>
                <div className="flex flex-row">
                  <div className="bg-blue-500 text-white p-1 pl-2 pr-2 rounded-full cursor-pointer hover:bg-blue-400">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                  </div>
                  <div className="bg-blue-500 text-white p-1 pl-2 pr-2 rounded-full cursor-pointer hover:bg-blue-400">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
                  </div>
                </div>
              </div>
              <div className="flex p-2">
                <Button action={() => setRefresh(true)} tipo={'default'}>Actualizar</Button>
                <Button action={() => navigate('/main/operaciones/nuevo')} tipo={'accept'}>Nuevo</Button>
              </div>
            </div >

          </div>
        </div>
      </div>

    </>
  )
}